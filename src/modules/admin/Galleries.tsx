import { Button, CloudflareImage, ErrorState, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

export function Galleries() {
  const { t } = useTranslation('galleryeet');
  const { get, delete: deleteRequest } = useRequest();
  const { QueryWrapper, data, refetch } = useQuery<GalleryeetFullGalleryDto[]>({
    queryKey: ['galleryeet', 'galleries'],
    queryFn: () => get('/galleries'),
    fallbackValue: [],
  });
  const [error, setError] = useState<any>(null);
  const galleries = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data
      .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
      .filter((gallery) => gallery.galleryId !== 'instax');
  }, [data]);

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
          {galleries.map((gallery) => (
            <>
              <div className="divider"></div>
              <div key={gallery.galleryId} className="flex items-center justify-between gap-4">
                <div className="flex gap-4">
                  <CloudflareImage imageId={gallery.thumbnail.imageId!} srcType="miniature" height={48} />
                  <div className="flex flex-col">
                    <Typography>{gallery.title}</Typography>
                    <Typography>{gallery.description}</Typography>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button as={Link} to={`/gallery/${gallery.galleryId}`}>
                    {t('view')}
                  </Button>
                  <Button as={Link} to={`/admin/edit-gallery/${gallery.galleryId}`}>
                    {t('admin.edit')}
                  </Button>
                  <Button onClick={() => deleteGallery(gallery.galleryId)} color="error">
                    {t('admin.delete')}
                  </Button>
                </div>
              </div>
            </>
          ))}
        </>
      </QueryWrapper>
    </>
  );
}
