import { CloudflareImage, Typography, useBreakpoint, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { Corousel } from '../components/Corousel';
import { GalleryeetGalleryDto } from '../models/gallery.dto';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { GalleryeetPostDto } from '../models/post.dto';

export function HomePage() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper: GalleriesQueryWrapper, data: galleriesData } = useQuery<GalleryeetGalleryDto[]>({
    queryKey: ['galleryeet', 'galleries'],
    queryFn: () => get('/galleries'),
    fallbackValue: [],
  });
  const { isOverBreakpoint } = useBreakpoint('lg');
  const galleries = useMemo(() => {
    if (galleriesData == null) {
      return [];
    }
    return galleriesData
      .toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
      .filter((gallery) => gallery.galleryId !== 'instax')
      .slice(0, isOverBreakpoint ? 4 : 3);
  }, [galleriesData, isOverBreakpoint]);

  const { QueryWrapper: PostsQueryWrapper, data: postsData } = useQuery<GalleryeetPostDto[]>({
    queryKey: ['galleryeet', 'posts'],
    queryFn: () => get('/posts'),
    fallbackValue: [],
  });
  const posts = useMemo(() => {
    if (postsData == null) {
      return [];
    }
    return postsData
      .toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
      .slice(0, isOverBreakpoint ? 4 : 3);
  }, [postsData, isOverBreakpoint]);

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="w-full space-y-2 text-center lg:w-4/5">
        <Typography as="h1" size="7xl" weight="bold">
          {t('title')}
        </Typography>
        <Typography as="h2" size="2xl" weight="semibold">
          {t('subtitle')}
        </Typography>
      </div>
      <Corousel />
      <div className="flex w-full flex-col gap-2 text-center lg:w-4/5">
        <Typography size="lg">{t('description')}</Typography>
      </div>
      <div className="divider"></div>
      <GalleriesQueryWrapper>
        <section>
          <Typography size="3xl" weight="semibold">
            {t('gallery.homepageLastGalleries')}
          </Typography>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {galleries.map((gallery) => (
              <Link
                key={gallery.galleryId}
                to={`/gallery/${gallery.galleryId}`}
                className="overflow-hidden rounded-lg shadow-lg hover:opacity-75"
              >
                <CloudflareImage
                  imageId={gallery.thumbnail.imageId!}
                  srcType="miniature"
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <Typography size="lg" decoration="underline">
                    {gallery.title}
                  </Typography>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </GalleriesQueryWrapper>
      <div className="divider"></div>
      <PostsQueryWrapper>
        <section>
          <Typography size="3xl" weight="semibold">
            {t('posts.homepageLastPosts')}
          </Typography>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post) => (
              <Link
                key={post.postId}
                to={`/posts/${post.postId}`}
                className="overflow-hidden rounded-lg shadow-lg hover:opacity-75"
              >
                <div className="flex gap-2 p-4">
                  <Typography size="lg" weight="semibold">
                    {post.title}
                  </Typography>
                  <Typography>{dayjs(post.createdAt).format('D.M.YYYY HH:mm')}</Typography>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </PostsQueryWrapper>
      <div className="h-12"></div>
    </div>
  );
}
