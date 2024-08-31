import { CloudflareImage, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { Corousel } from '../components/Corousel';
import { GalleryeetGalleryDto } from '../models/gallery.dto';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetGalleryDto[]>({
    queryKey: ['galleryeet', 'galleries'],
    queryFn: () => get('/galleries'),
    fallbackValue: [],
  });

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
      <QueryWrapper>
        <section>
          <Typography size="3xl" weight="semibold">
            {t('gallery.homepageLastGalleries')}
          </Typography>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((gallery) => (
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
      </QueryWrapper>
    </div>
  );
}
