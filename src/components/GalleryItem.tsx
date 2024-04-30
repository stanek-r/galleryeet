import { Button, CloudflareImage, Typography, useImageDialog } from 'gtomy-lib';
import { GalleryeetFullContentDto } from '../models/content.dto';
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
    <div className="flex h-96 w-1/4 flex-col items-center justify-center p-2">
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
