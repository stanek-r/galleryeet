import { CloudflareImage, QueryWrapper, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetGalleryDto } from '../../models/gallery.dto';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export function Galleries() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { data, wrapperProps } = useQuery<GalleryeetGalleryDto[]>({
    queryKey: ['galleryeet', 'galleries'],
    queryFn: () => get('/galleries'),
    fallbackValue: [],
  });
  const navigate = useNavigate();
  const galleries = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data
      .toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
      .filter((gallery) => gallery.galleryId !== 'instax');
  }, [data]);

  return (
    <QueryWrapper {...wrapperProps}>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {t('gallery.title')}
        </Typography>

        {galleries.length === 0 && (
          <>
            <div className="divider"></div>
            <Typography className="text-center">{t('gallery.noGalleries')}</Typography>
          </>
        )}
        {galleries.map((gallery) => (
          <>
            <div className="divider"></div>
            <div
              key={gallery.galleryId}
              className="flex cursor-pointer gap-4 p-2 hover:opacity-60"
              onClick={() => navigate(gallery.galleryId)}
            >
              <CloudflareImage
                imageId={gallery.thumbnail.imageId!}
                srcType="miniature"
                className="h-[270px] w-[405px] max-w-[50vw] shrink-0 object-contain"
                wrapperClassName="h-[270px] w-[405px] object-contain flex-shrink-0 max-w-[50vw]"
              />
              <div className="flex flex-col self-center py-2 md:self-start">
                <Typography size="3xl" weight="medium">
                  {gallery.title}
                </Typography>
                <Typography size="lg">{gallery.description}</Typography>
              </div>
            </div>
          </>
        ))}
        <div className="h-12"></div>
      </>
    </QueryWrapper>
  );
}
