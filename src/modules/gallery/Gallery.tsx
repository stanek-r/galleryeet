import { useParams } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Button, CloudflareImage, Typography, useImageDialog, useQuery, useRequest } from 'gtomy-lib';
import { GalleryeetFullContentDto } from '../../models/content.dto';

export interface GalleryItemProps {
  content: GalleryeetFullContentDto;
}

export function GalleryItem({ content }: GalleryItemProps) {
  const { openDialog, DialogElement } = useImageDialog({
    imageId: content.imageId,
    videoId: content.videoId,
    title: content.title,
  });

  return (
    <>
      <DialogElement />
      {content.imageId && (
        <div className="flex h-96 w-1/4 items-center justify-center p-2">
          <CloudflareImage
            imageId={content.imageId}
            className="h-[368px] max-w-full cursor-zoom-in"
            onClick={openDialog}
          />
        </div>
      )}
      {content.videoId && (
        <div className="flex h-96 w-1/4 items-center justify-center p-2">
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
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {data?.title}
        </Typography>
        <Typography size="2xl" weight="medium" className="text-center">
          {data?.description}
        </Typography>
        <div className="flex">
          {data?.contents.map((content) => <GalleryItem key={content.contentId} content={content} />)}
        </div>
      </>
    </QueryWrapper>
  );
}
