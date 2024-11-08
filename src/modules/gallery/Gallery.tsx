import { Link, useParams } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Button, QueryWrapper, RequirePermission, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryItem } from '../../components/GalleryItem';
import { useMemo } from 'react';

export function Gallery() {
  const { t } = useTranslation('galleryeet');
  const { galleryId } = useParams();
  const { get } = useRequest();
  const { data, wrapperProps } = useQuery<GalleryeetFullGalleryDto>({
    queryKey: ['galleryeet', 'galleries', galleryId],
    queryFn: () => get('/galleries/' + galleryId),
  });
  const contents = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data.contents.toSorted((a, b) => a.order - b.order);
  }, [data]);

  return (
    <QueryWrapper {...wrapperProps}>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {data?.title}
        </Typography>
        <Typography size="2xl" weight="medium" className="text-center">
          {data?.description}
        </Typography>
        <div className="divider"></div>
        <div className="flex gap-4">
          <Button as={Link} to="/gallery">
            {t('back')}
          </Button>
          <RequirePermission minimalRole="owner">
            <Button as={Link} to={`/admin/edit-gallery/${galleryId}`}>
              {t('admin.edit')}
            </Button>
          </RequirePermission>
        </div>
        <div className="flex flex-wrap">
          {contents.map((content) => (
            <GalleryItem key={content.contentId} content={content} />
          ))}
        </div>
        <div className="h-12"></div>
      </>
    </QueryWrapper>
  );
}
