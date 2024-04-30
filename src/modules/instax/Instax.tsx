import { Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { GalleryItem } from '../../components/GalleryItem';

export function Instax() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', 'instax'],
    queryFn: () => get('/galleries/instax'),
    fallbackValue: null,
  });
  return (
    <QueryWrapper>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {t('instax.title')}
        </Typography>
        <div className="flex">
          {data?.contents.map((content) => <GalleryItem key={content.contentId} content={content} showTitle />)}
        </div>
      </>
    </QueryWrapper>
  );
}
