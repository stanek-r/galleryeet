import { useParams } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Typography, useQuery, useRequest } from 'gtomy-lib';

export function Gallery() {
  const { galleryId } = useParams();
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', galleryId],
    queryFn: () => get('/galleries/' + galleryId),
    fallbackValue: null,
  });
  return (
    <QueryWrapper>
      <>
        <Typography>{data?.galleryId}</Typography>
        <Typography>{data?.title}</Typography>
        <Typography>{data?.description}</Typography>
        <Typography>{data?.createdAt}</Typography>
      </>
    </QueryWrapper>
  );
}
