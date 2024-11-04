import { Button, ErrorState, QueryWrapper, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { useState } from 'react';
import { GalleryeetContentDto } from '../../models/content.dto';
import { AddPhoto } from './AddPhoto';

export function Instax() {
  const { t } = useTranslation('galleryeet');
  const { get, delete: deleteRequest, post } = useRequest();
  const { data, wrapperProps, refetch } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', 'instax'],
    queryFn: () => get('/galleries/instax'),
    fallbackValue: null,
  });
  const [error, setError] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onUpload = async (content: GalleryeetContentDto) => {
    if (data == null) {
      return;
    }
    setSubmitting(true);
    await post('/galleries/instax', {
      contentId: content.contentId,
    }).catch((e) => {
      setError(e);
      return null;
    });
    await refetch();
    setSubmitting(false);
  };

  const deleteContent = async (contentId: string) => {
    setSubmitting(true);
    await deleteRequest(`/content/${contentId}`, { params: { type: 'gallery', typeId: 'instax' } }).catch((e) =>
      setError(e)
    );
    setSubmitting(false);
  };

  return (
    <>
      <Typography as="h1" size="4xl" weight="bold" className="text-center">
        {t('instax.title')}
      </Typography>
      <div className="divider"></div>
      <div>
        <Button as={Link} to="/admin">
          {t('back')}
        </Button>
      </div>
      <QueryWrapper {...wrapperProps}>
        <>
          <AddPhoto onUpload={onUpload} />
          {error && <ErrorState error={error} />}
          <div className="divider"></div>
          <div className="flex flex-col gap-2">
            {data?.contents.map((content) => (
              <div key={content.contentId} className="flex justify-between gap-2">
                <Typography>{content.title}</Typography>
                <Typography>{content.createdAt}</Typography>
                <Button onClick={() => deleteContent(content.contentId)} color="error" disabled={submitting}>
                  {t('admin.delete')}
                </Button>
              </div>
            ))}
          </div>
        </>
      </QueryWrapper>
    </>
  );
}
