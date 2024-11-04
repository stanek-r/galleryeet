import { QueryWrapper, Typography, useBreakpoint, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { GalleryeetPostDto } from '../../models/post.dto';
import { useMemo } from 'react';

export function NewestPosts() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { data, wrapperProps } = useQuery<GalleryeetPostDto[]>({
    queryKey: ['galleryeet', 'posts'],
    queryFn: () => get('/posts'),
  });
  const { isOverBreakpoint } = useBreakpoint('lg');

  const posts = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data
      .toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
      .slice(0, isOverBreakpoint ? 4 : 3);
  }, [data, isOverBreakpoint]);

  return (
    <section className="min-h-52 w-full px-4">
      <Typography size="3xl" weight="semibold">
        {t('posts.homepageLastPosts')}
      </Typography>
      <QueryWrapper {...wrapperProps}>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.postId}
              to={`/posts/${post.postId}`}
              className="overflow-hidden rounded-lg shadow-lg hover:opacity-75"
            >
              <div className="flex flex-col gap-1 p-6">
                <Typography size="2xl" weight="semibold">
                  {post.title}
                </Typography>
                <Typography>{dayjs(post.createdAt).format('D.M.YYYY HH:mm')}</Typography>
              </div>
            </Link>
          ))}
        </div>
      </QueryWrapper>
    </section>
  );
}
