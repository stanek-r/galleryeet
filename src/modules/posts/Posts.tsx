import { Button, ErrorState, RequirePermission, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';
import { GalleryeetPostDto } from '../../models/post.dto';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

export function Posts() {
  const { t } = useTranslation('galleryeet');
  const { get, delete: deleteRequest } = useRequest();
  const { QueryWrapper, data, refetch } = useQuery<GalleryeetPostDto[]>({
    queryKey: ['galleryeet', 'posts'],
    queryFn: () => get('/posts'),
    fallbackValue: [],
  });
  const posts = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data.toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
  }, [data]);
  const [error, setError] = useState<any>(null);

  const deletePost = (id: string) => {
    deleteRequest(`/posts/${id}`)
      .then(() => refetch())
      .catch((e) => setError(e));
  };

  return (
    <QueryWrapper>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {t('posts.title')}
        </Typography>
        {posts.length === 0 && (
          <>
            <div className="divider"></div>
            <Typography className="text-center">{t('posts.noPosts')}</Typography>
          </>
        )}
        {error && <ErrorState error={error} />}
        {posts.map((post) => (
          <>
            <div className="divider"></div>
            <div key={post.postId} className="flex justify-between p-2 hover:opacity-60">
              <div className="flex flex-col">
                <Typography size="3xl" weight="semibold">
                  {post.title}
                </Typography>
                <Typography>{dayjs(post.createdAt).format('D.M.YYYY HH:mm')}</Typography>
              </div>
              <div className="flex gap-2">
                <Button as={Link} to={post.postId}>
                  {t('view')}
                </Button>
                <RequirePermission minimalRole="owner">
                  <Button color="error" onClick={() => deletePost(post.postId)}>
                    {t('admin.delete')}
                  </Button>
                </RequirePermission>
              </div>
            </div>
          </>
        ))}
        <div className="h-12"></div>
      </>
    </QueryWrapper>
  );
}
