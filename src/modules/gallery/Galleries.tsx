import { CloudflareImage, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { useNavigate } from 'react-router-dom';

export function Galleries() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullGalleryDto[]>({
    queryKey: ['galleryeet', 'galleries'],
    queryFn: () => get('/galleries'),
    fallbackValue: [],
  });
  const navigate = useNavigate();

  return (
    <QueryWrapper>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {t('gallery.title')}
        </Typography>
        {data.length === 0 && <Typography>{t('gallery.noGalleries')}</Typography>}
        {data
          .filter((gallery) => gallery.galleryId !== 'instax')
          .map((gallery) => (
            <div
              key={gallery.galleryId}
              className="flex cursor-pointer gap-4"
              onClick={() => navigate(gallery.galleryId)}
            >
              <CloudflareImage imageId={gallery.thumbnail.imageId!} srcType="miniature" height={64} />
              <div className="flex flex-col py-2">
                <Typography size="lg" weight="medium">
                  {gallery.title}
                </Typography>
                <Typography>{gallery.description}</Typography>
              </div>
            </div>
          ))}
      </>
    </QueryWrapper>
  );
}
