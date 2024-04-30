import { Link, useNavigate, useParams } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { Button, ErrorState, SingleFormFile, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetContentDto } from '../../models/content.dto';
import { AddPhoto } from './AddPhoto';
import { useState } from 'react';

export interface AddPhotoForm {
  title: string | null;
  photo: SingleFormFile | null;
}

export function EditGallery() {
  const { t } = useTranslation('galleryeet');
  const { galleryId } = useParams();
  const { get, put, delete: deleteRequest } = useRequest();
  const { QueryWrapper, data, refetch } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', galleryId],
    queryFn: () => get('/galleries/' + galleryId),
    fallbackValue: null,
  });
  const [error, setError] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const onUpload = async (content: GalleryeetContentDto) => {
    if (data == null) {
      return;
    }
    await put(`/gallery/${galleryId}`, {
      contentIds: [...data.contents.map((prevContent) => prevContent.contentId), content.contentId],
    }).catch((e) => {
      setError(e);
      return null;
    });
    await refetch();
  };

  const deleteContent = async (contentId: string) => {
    setSubmitting(true);
    await deleteRequest(`/content/${contentId}`, { params: { type: 'gallery', typeId: galleryId } }).catch((e) =>
      setError(e)
    );
    setSubmitting(false);
  };

  const deleteGallery = (galleryId: string) => {
    deleteRequest(`/galleries/${galleryId}`)
      .then(() => {
        setError(null);
        navigate('/admin/galleries');
      })
      .catch((e) => setError(e));
  };

  return (
    <>
      <div>
        <Button as={Link} to="/admin/galleries">
          {t('back')}
        </Button>
        <Button onClick={() => deleteGallery(galleryId!)} color="error">
          {t('admin.delete')}
        </Button>
      </div>
      <QueryWrapper>
        <>
          <AddPhoto onUpload={onUpload} />
          {error && <ErrorState error={error} />}
          <Typography>{data?.galleryId}</Typography>
          <Typography>{data?.title}</Typography>
          <Typography>{data?.description}</Typography>
          <Typography>{data?.createdAt}</Typography>
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
