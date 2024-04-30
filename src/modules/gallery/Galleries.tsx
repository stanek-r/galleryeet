import { Button, CloudflareImage, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Link } from 'react-router-dom';

export function Galleries() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullGalleryDto[]>({
    queryKey: ['galleryeet', 'galleries'],
    queryFn: () => get('/galleries'),
    fallbackValue: [],
  });
  return (
    <QueryWrapper>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {t('gallery.title')}
        </Typography>
        {data
          .filter((gallery) => gallery.galleryId !== 'instax')
          .map((gallery) => (
            <div key={gallery.galleryId} className="flex items-center justify-between gap-4">
              <div className="flex gap-4">
                <CloudflareImage imageId={gallery.thumbnail.imageId!} srcType="miniature" height={64} />
                <div>
                  <Typography>{gallery.title}</Typography>
                  <Typography>{gallery.description}</Typography>
                </div>
              </div>
              <Button as={Link} to={gallery.galleryId}>
                {t('view')}
              </Button>
            </div>
          ))}
      </>
    </QueryWrapper>
  );
}
