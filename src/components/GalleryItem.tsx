import { Button, CloudflareImage, Typography, useImageDialog } from 'gtomy-lib';
import { GalleryeetFullContentDto } from '../models/content.dto';
import { twMerge } from 'tailwind-merge';

export interface GalleryItemProps {
  content: GalleryeetFullContentDto;
  showTitle?: boolean;
  size?: 'wide' | 'normal';
}

export function GalleryItem({ content, showTitle, size = 'normal' }: GalleryItemProps) {
  const { openDialog, DialogElement } = useImageDialog({
    imageId: content.imageId,
    videoId: content.videoId,
    title: content.title,
    effect: 'blur',
  });

  return (
    <div
      className={twMerge(
        'flex h-96 flex-col items-center justify-center p-2',
        size === 'normal' ? 'w-full md:w-1/2 lg:w-1/4' : 'w-full lg:w-1/3'
      )}
    >
      <DialogElement />
      {content.imageId && (
        <CloudflareImage
          imageId={content.imageId}
          className={twMerge('max-w-full cursor-zoom-in object-contain', showTitle ? 'h-[332px]' : 'h-[368px]')}
          onClick={openDialog}
          srcType="miniature"
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
