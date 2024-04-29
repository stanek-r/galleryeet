import { Typography, useQuery, useRequest } from 'gtomy-lib';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';

export function Instax() {
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', 'instax'],
    queryFn: () => get('/galleries/instax'),
    fallbackValue: null,
  });
  return (
    <QueryWrapper>
      <>
        {data?.contents.map((content) => (
          <div key={content.contentId} className="flex gap-4">
            <Typography>{content.title}</Typography>
            <Typography>{content.createdAt}</Typography>
          </div>
        ))}
      </>
    </QueryWrapper>
  );
}
