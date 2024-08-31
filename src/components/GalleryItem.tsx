import { Button, CloudflareImage, Typography, useImageDialog } from 'gtomy-lib';
import { GalleryeetContentDto, GalleryeetFullContentDto } from '../models/content.dto';
import { twMerge } from 'tailwind-merge';

export interface GalleryItemProps {
  content: GalleryeetFullContentDto | GalleryeetContentDto;
  showTitle?: boolean;
  size?: 'wide' | 'normal';
  disableHeightLimit?: boolean;
}

export function GalleryItem({ content, showTitle, size = 'normal', disableHeightLimit }: GalleryItemProps) {
  const { openDialog, DialogElement } = useImageDialog({
    imageId: content.imageId,
    videoId: content.videoId,
    title: content.title,
    effect: 'blur',
  });

  return (
    <div
      className={twMerge(
        'flex flex-col items-center justify-center p-2',
        size === 'normal' ? 'w-full md:w-1/2 lg:w-1/4' : 'w-full lg:w-1/3',
        !disableHeightLimit && 'h-96'
      )}
    >
      <DialogElement />
      {content.imageId && (
        <CloudflareImage
          imageId={content.imageId}
          className={twMerge(
            'max-w-full cursor-zoom-in object-contain',
            !disableHeightLimit && (showTitle ? 'h-[332px]' : 'h-[368px]')
          )}
          wrapperClassName={twMerge(
            'max-w-full cursor-zoom-in object-contain',
            !disableHeightLimit && (showTitle ? 'h-[332px]' : 'h-[368px]')
          )}
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
