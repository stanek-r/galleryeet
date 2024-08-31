import { useParams } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Typography, useQuery, useRequest } from 'gtomy-lib';
import { GalleryItem } from '../../components/GalleryItem';
import { useMemo } from 'react';

export function Gallery() {
  const { galleryId } = useParams();
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', galleryId],
    queryFn: () => get('/galleries/' + galleryId),
    fallbackValue: null,
  });
  const contents = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data.contents.toSorted((a, b) => a.order - b.order);
  }, [data]);

  return (
    <QueryWrapper>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {data?.title}
        </Typography>
        <Typography size="2xl" weight="medium" className="text-center">
          {data?.description}
        </Typography>
        <div className="divider"></div>
        <div className="flex flex-wrap">
          {contents.map((content) => (
            <GalleryItem key={content.contentId} content={content} />
          ))}
        </div>
        <div className="h-12"></div>
      </>
    </QueryWrapper>
  );
}
