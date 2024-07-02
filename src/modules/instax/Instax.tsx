import { Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { GalleryItem } from '../../components/GalleryItem';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export function Instax() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', 'instax'],
    queryFn: () => get('/galleries/instax'),
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
          {t('instax.title')}
        </Typography>
        <div className="divider"></div>
        <div className="flex">
          {contents.map((content) => (
            <GalleryItem key={content.contentId} content={content} size="wide" showTitle />
          ))}
        </div>
      </>
    </QueryWrapper>
  );
}
