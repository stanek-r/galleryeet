import { Button, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';
import { GalleryeetPostDto } from '../../models/post.dto';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export function Posts() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetPostDto[]>({
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
        {posts.map((post) => (
          <>
            <div className="divider"></div>
            <div key={post.postId} className="flex gap-4 p-2 hover:opacity-60">
              <div className="flex flex-col">
                <Typography>{post.title}</Typography>
                <Typography>{dayjs(post.createdAt).format('D.M.YYYY HH:mm')}</Typography>
              </div>
              <Button as={Link} to={post.postId}>
                {t('view')}
              </Button>
            </div>
          </>
        ))}
        <div className="h-12"></div>
      </>
    </QueryWrapper>
  );
}
