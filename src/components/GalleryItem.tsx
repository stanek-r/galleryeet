import { CloudflareImage, config, DialogElement, Typography, useImageDialog } from 'gtomy-lib';
import { GalleryeetContentDto, GalleryeetFullContentDto } from '../models/content.dto';
import { twMerge } from 'tailwind-merge';
import { MouseEventHandler, useCallback } from 'react';

export interface GalleryItemProps {
  content: GalleryeetFullContentDto | GalleryeetContentDto;
  showTitle?: boolean;
  size?: 'wide' | 'normal';
  disableHeightLimit?: boolean;
}

export function GalleryItem({ content, showTitle, size = 'normal', disableHeightLimit }: GalleryItemProps) {
  const { openDialog, dialogElementProps } = useImageDialog({
    imageId: content.videoId == null ? content.imageId : undefined,
    videoId: content.videoId,
    title: content.title,
    effect: 'blur',
  });

  const openYoutubeContent: VoidFunction = useCallback(() => {
    window.open('https://www.youtube.com/watch?v=' + content.videoId, '_blank');
  }, [content]);

  const onClick: MouseEventHandler<HTMLImageElement> = useCallback(() => {
    if (content.isYoutube) {
      openYoutubeContent();
    } else {
      openDialog();
    }
  }, [openDialog, openYoutubeContent, content]);

  const onAuxClick: MouseEventHandler<HTMLImageElement> = useCallback(
    (event) => {
      if (config.cloudFlareImagesUrl == null) {
        return;
      }
      if (event.button !== 1) {
        return;
      }
      if (content.isYoutube) {
        openYoutubeContent();
        return;
      }
      const src = `${config.cloudFlareImagesUrl}/${content.imageId}`;
      window.open(`${src}/original`, '_blank', 'noreferer');
    },
    [content, openYoutubeContent]
  );

  return (
    <div
      className={twMerge(
        'flex flex-col items-center justify-center p-2',
        size === 'normal' ? 'w-full md:w-1/2 lg:w-1/4' : 'w-full lg:w-1/3',
        !disableHeightLimit && 'h-96'
      )}
    >
      <DialogElement {...dialogElementProps} />
      {content.imageId && (
        <CloudflareImage
          imageId={content.imageId}
          className={twMerge(
            'max-w-full cursor-pointer object-contain',
            !disableHeightLimit && (showTitle ? 'h-[332px]' : 'h-[368px]')
          )}
          wrapperClassName={twMerge(
            'max-w-full cursor-pointer object-contain',
            !disableHeightLimit && (showTitle ? 'h-[332px]' : 'h-[368px]')
          )}
          onClick={onClick}
          onAuxClick={onAuxClick}
          srcType="miniature"
        />
      )}
      {showTitle && (
        <Typography size="2xl" weight="semibold" className="mt-1 text-center">
          {content.title}
        </Typography>
      )}
    </div>
  );
}
