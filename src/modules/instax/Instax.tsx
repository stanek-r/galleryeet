import { QueryWrapper, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { GalleryItem } from '../../components/GalleryItem';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export function Instax() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { data, wrapperProps } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', 'instax'],
    queryFn: () => get('/galleries/instax'),
  });
  const contents = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data.contents.toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
  }, [data]);

  return (
    <QueryWrapper {...wrapperProps}>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {t('instax.title')}
        </Typography>
        <div className="divider"></div>
        <div className="flex flex-wrap">
          {contents.map((content) => (
            <GalleryItem key={content.contentId} content={content} size="wide" showTitle />
          ))}
        </div>
      </>
    </QueryWrapper>
  );
}
