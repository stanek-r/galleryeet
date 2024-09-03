import { CloudflareImage, Typography, useBreakpoint, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';
import { GalleryeetGalleryDto } from '../../models/gallery.dto';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export function NewestGalleries() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetGalleryDto[]>({
    queryKey: ['galleryeet', 'galleries'],
    queryFn: () => get('/galleries'),
    fallbackValue: [],
  });
  const { isOverBreakpoint } = useBreakpoint('lg');

  const galleries = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data
      .toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
      .filter((gallery) => gallery.galleryId !== 'instax')
      .slice(0, isOverBreakpoint ? 4 : 3);
  }, [data, isOverBreakpoint]);

  return (
    <section className="min-h-80 w-full px-4">
      <Typography size="3xl" weight="semibold">
        {t('gallery.homepageLastGalleries')}
      </Typography>
      <QueryWrapper>
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
      </QueryWrapper>
    </section>
  );
}
