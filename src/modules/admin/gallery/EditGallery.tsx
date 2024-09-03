import { Link, useNavigate, useParams } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../../models/gallery.dto';
import {
  Button,
  ButtonIcon,
  ErrorState,
  SingleFormFile,
  Typography,
  useConfirmationDialog,
  useQuery,
  useRequest,
  useTranslation,
} from 'gtomy-lib';
import { GalleryeetContentDto } from '../../../models/content.dto';
import { AddPhoto } from '../AddPhoto';
import { useMemo, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

export interface AddPhotoForm {
  title: string | null;
  photo: SingleFormFile | null;
}

export function EditGallery() {
  const { t } = useTranslation('galleryeet');
  const { galleryId } = useParams();
  const { get, post, delete: deleteRequest, put } = useRequest();
  const { QueryWrapper, data, refetch } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', galleryId],
    queryFn: () => get('/galleries/' + galleryId),
    fallbackValue: null,
  });
  const [error, setError] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { openDialog, DialogElement } = useConfirmationDialog({
    title: t('admin.deleteGallery'),
    text: t('admin.deleteGalleryText'),
    confirm: t('admin.delete'),
    onAction: ({ onError, onClose }) => {
      deleteRequest(`/galleries/${galleryId}`)
        .then(() => {
          onClose();
          navigate('/admin/galleries');
        })
        .catch((e) => onError(e));
    },
  });

  const contents = useMemo(() => {
    if (data == null) {
      return [];
    }
    return data.contents.toSorted((a, b) => a.order - b.order);
  }, [data]);

  const onUpload = async (content: GalleryeetContentDto) => {
    if (data == null) {
      return;
    }
    setSubmitting(true);
    await post(`/galleries/${galleryId}`, {
      contentId: content.contentId,
    }).catch((e) => {
      setError(e);
      return null;
    });
    await refetch();
    setSubmitting(false);
  };

  const moveContent = async (contentId: string, moveUp: boolean) => {
    if (contents.length <= 1) {
      return;
    }
    const contentToBeMovedIndex = contents.findIndex((content) => content.contentId === contentId);
    const contentToBeMovedOrder = contents[contentToBeMovedIndex].order;
    contents[contentToBeMovedIndex].order = contents[contentToBeMovedIndex + (moveUp ? -1 : 0)].order;
    contents[contentToBeMovedIndex + (moveUp ? -1 : 0)].order = contentToBeMovedOrder;
    setSubmitting(true);
    await put(`/galleries/${galleryId}`, {
      orders: contents.map((content) => ({ contentId: content.contentId, order: content.order })),
    }).catch((e) => {
      setError(e);
      return null;
    });
    await refetch();
    setSubmitting(false);
  };

  const deleteContent = async (contentId: string) => {
    setSubmitting(true);
    await deleteRequest(`/content/${contentId}`, { params: { type: 'gallery', typeId: galleryId } }).catch((e) =>
      setError(e)
    );
    setSubmitting(false);
  };

  return (
    <>
      <DialogElement />
      <Typography as="h1" size="4xl" weight="bold" className="text-center">
        {t('admin.edit')}
      </Typography>
      <div className="divider"></div>
      <div className="flex gap-2">
        <Button as={Link} to="/gallery">
          {t('back')}
        </Button>
        <Button onClick={openDialog} color="error">
          {t('admin.delete')}
        </Button>
      </div>
      <div className="divider"></div>
      <QueryWrapper>
        <>
          <AddPhoto onUpload={onUpload} />
          {error && <ErrorState error={error} />}
          <div className="divider"></div>
          <Typography>{data?.galleryId}</Typography>
          <Typography>{data?.title}</Typography>
          <Typography>{data?.description}</Typography>
          <Typography>{data?.createdAt}</Typography>
          <div className="flex flex-col gap-2">
            {contents.map((content, index) => (
              <div key={content.contentId} className="flex justify-between gap-2">
                <Typography>
                  {content.title} ({content.order})
                </Typography>
                <Typography>{content.createdAt}</Typography>
                <ButtonIcon
                  onClick={() => moveContent(content.contentId, true)}
                  icon={ArrowUpIcon}
                  disabled={submitting || index === 0}
                />
                <ButtonIcon
                  onClick={() => moveContent(content.contentId, false)}
                  icon={ArrowDownIcon}
                  disabled={submitting || index >= contents.length - 1}
                />
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
