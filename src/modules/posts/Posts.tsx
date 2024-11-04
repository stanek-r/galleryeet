import { QueryWrapper, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetPostDto } from '../../models/post.dto';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function Posts() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { data, wrapperProps } = useQuery<GalleryeetPostDto[]>({
    queryKey: ['galleryeet', 'posts'],
    queryFn: () => get('/posts'),
    fallbackValue: [],
  });
  const navigate = useNavigate();
  const posts = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data.toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
  }, [data]);

  return (
    <QueryWrapper {...wrapperProps}>
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
            <div
              key={post.postId}
              className="flex cursor-pointer flex-col p-2 hover:opacity-60"
              onClick={() => navigate(post.postId)}
            >
              <Typography size="3xl" weight="medium">
                {post.title}
              </Typography>
              <Typography size="lg">{dayjs(post.createdAt).format('D.M.YYYY HH:mm')}</Typography>
            </div>
          </>
        ))}
        <div className="h-12"></div>
      </>
    </QueryWrapper>
  );
}
