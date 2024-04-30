import { Button, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetGalleryDto } from '../../models/gallery.dto';
import { Link } from 'react-router-dom';

export function Galleries() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetGalleryDto[]>({
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
            <div key={gallery.galleryId} className="flex justify-between gap-4">
              <div>
                <Typography>{gallery.title}</Typography>
                <Typography>{gallery.description}</Typography>
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
