import { Button, ErrorState, Typography, useQuery, useRequest } from 'gtomy-lib';
import { GalleryeetGalleryDto } from '../../models/gallery.dto';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Galleries() {
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
        Admin
      </Typography>
      <div>
        <Button as={Link} to="/admin">
          Back
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
                  View
                </Button>
                <Button onClick={() => deleteGallery(gallery.galleryId)} color="error">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </>
      </QueryWrapper>
    </>
  );
}
