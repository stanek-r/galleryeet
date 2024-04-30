import { useParams } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Button, CloudflareImage, Typography, useImageDialog, useQuery, useRequest } from 'gtomy-lib';
import { GalleryeetFullContentDto } from '../../models/content.dto';

interface GalleryItemProps {
  content: GalleryeetFullContentDto;
}

function GalleryItem({ content }: GalleryItemProps) {
  const { openDialog, DialogElement } = useImageDialog({
    imageId: content.imageId,
    videoId: content.imageId,
    title: content.title,
  });

  return (
    <>
      <DialogElement />
      {content.imageId && (
        <CloudflareImage imageId={content.imageId} className="h-96 cursor-zoom-in" onClick={openDialog} />
      )}
      {content.videoId && (
        <div className="flex h-96 items-center justify-center">
          <Button onClick={openDialog}>Video</Button>
        </div>
      )}
    </>
  );
}

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
        <div className="flex gap-4">{data?.contents.map((content) => <GalleryItem content={content} />)}</div>
      </>
    </QueryWrapper>
  );
}
