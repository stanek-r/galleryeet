import { Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';

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
        {data?.contents.map((content) => (
          <div key={content.contentId} className="flex gap-4">
            <Typography>{content.title}</Typography>
            <Typography>{content.createdAt}</Typography>
          </div>
        ))}
      </>
    </QueryWrapper>
  );
}
