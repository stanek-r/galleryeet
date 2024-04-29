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
        <Typography>{t('gallery.title')}</Typography>
        {data.map((gallery) => (
          <div key={gallery.galleryId} className="flex gap-4">
            <div>
              <Typography>{gallery.title}</Typography>
              <Typography>{gallery.description}</Typography>
            </div>
            <Button as={Link} to={gallery.galleryId}></Button>
          </div>
        ))}
      </>
    </QueryWrapper>
  );
}
