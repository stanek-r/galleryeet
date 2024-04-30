import { useParams } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Button, CloudflareImage, Typography, useImageDialog, useQuery, useRequest } from 'gtomy-lib';
import { GalleryeetFullContentDto } from '../../models/content.dto';
import { twMerge } from 'tailwind-merge';

export interface GalleryItemProps {
  content: GalleryeetFullContentDto;
  showTitle?: boolean;
}

export function GalleryItem({ content, showTitle }: GalleryItemProps) {
  const { openDialog, DialogElement } = useImageDialog({
    imageId: content.imageId,
    videoId: content.videoId,
    title: content.title,
  });

  return (
    <div className="flex h-96 w-1/4 items-center justify-center p-2">
      <DialogElement />
      {content.imageId && (
        <CloudflareImage
          imageId={content.imageId}
          className={twMerge('max-w-full cursor-zoom-in', showTitle ? 'h-[332px]' : 'h-[368px]')}
          onClick={openDialog}
        />
      )}
      {content.videoId && <Button onClick={openDialog}>Video</Button>}
      {showTitle && (
        <Typography size="2xl" weight="semibold" className="mt-1 text-center">
          {content.title}
        </Typography>
      )}
    </div>
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
