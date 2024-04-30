import { Button, ErrorState, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetGalleryDto } from '../../models/gallery.dto';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Galleries() {
  const { t } = useTranslation('galleryeet');
  const { get, delete: deleteRequest } = useRequest();
  const { QueryWrapper, data, refetch } = useQuery<GalleryeetGalleryDto[]>({
    queryKey: ['galleryeet', 'galleries'],
    queryFn: () => get('/galleries'),
    fallbackValue: [],
  });
  const [error, setError] = useState<any>(null);

  const deleteGallery = (galleryId: string) => {
    deleteRequest(`/galleries/${galleryId}`)
      .then(() => {
        setError(null);
        refetch();
      })
      .catch((e) => setError(e));
  };

  return (
    <>
      <Typography as="h1" size="4xl" weight="bold" className="text-center">
        {t('admin.galleries')}
      </Typography>
      <div>
        <Button as={Link} to="/admin">
          {t('back')}
        </Button>
      </div>
      <QueryWrapper>
        <>
          {error && <ErrorState error={error} />}
          {data.map((gallery) => (
            <div key={gallery.galleryId} className="flex justify-between gap-4">
              <Typography>{gallery.title}</Typography>
              <div className="flex gap-2">
                <Button as={Link} to={`/gallery/${gallery.galleryId}`}>
                  {t('view')}
                </Button>
                <Button onClick={() => deleteGallery(gallery.galleryId)} color="error">
                  {t('admin.delete')}
                </Button>
              </div>
            </div>
          ))}
        </>
      </QueryWrapper>
    </>
  );
}
