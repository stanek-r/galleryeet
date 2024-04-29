import { useParams } from 'react-router-dom';

export function Gallery() {
  const { galleryId } = useParams();
  return <>Gallery &quot;{galleryId}&quot;</>;
}
