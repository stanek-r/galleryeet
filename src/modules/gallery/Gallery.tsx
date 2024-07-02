import { useParams } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Typography, useQuery, useRequest } from 'gtomy-lib';
import { GalleryItem } from '../../components/GalleryItem';
import { useMemo } from 'react';
import dayjs from 'dayjs';

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
    return data.contents.sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
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
        <div className="flex">
          {contents.map((content) => (
            <GalleryItem key={content.contentId} content={content} />
          ))}
        </div>
      </>
    </QueryWrapper>
  );
}
