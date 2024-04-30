import {
  Button,
  ErrorState,
  FormFileInput,
  FormTextInput,
  SingleFormFile,
  Typography,
  useBlobstorage,
  useQuery,
  useRequest,
  useTranslation,
} from 'gtomy-lib';
import { Link } from 'react-router-dom';
import { GalleryeetFullGalleryDto } from '../../models/gallery.dto';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GalleryeetContentDto, GalleryeetCreateContentDto } from '../../models/content.dto';

interface AddInstaxPhoto {
  title: string | null;
  photo: SingleFormFile | null;
}

export function Instax() {
  const { t } = useTranslation('galleryeet');
  const { get, delete: deleteRequest, put, post } = useRequest();
  const { QueryWrapper, data, refetch } = useQuery<GalleryeetFullGalleryDto | null>({
    queryKey: ['galleryeet', 'galleries', 'instax'],
    queryFn: () => get('/galleries/instax'),
    fallbackValue: null,
  });
  const [error, setError] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { error: blobstorageError, uploadImage } = useBlobstorage();
  const { handleSubmit, control } = useForm<AddInstaxPhoto>({
    defaultValues: {
      photo: null,
    },
  });

  const onSubmit = async (form: AddInstaxPhoto) => {
    if (data == null) {
      return;
    }
    const image = await uploadImage(form.photo!.file);
    if (!image) {
      return;
    }
    const content = await post<GalleryeetContentDto>('/content', {
      title: form.title,
      imageId: image.id,
    } as GalleryeetCreateContentDto).catch((e) => {
      setError(e);
      return null;
    });
    if (!content) {
      return;
    }
    await put('/gallery/instax', {
      contentIds: [...data.contents.map((prevContent) => prevContent.contentId), content.contentId],
    }).catch((e) => {
      setError(e);
      return null;
    });
    await refetch();
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
      <div>
        <Button as={Link} to="/admin">
          {t('back')}
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput control={control} name="title" label={t('admin.inputTitle')} rules={{ required: true }} />
        <FormFileInput
          name="photo"
          label={t('admin.photo')}
          control={control}
          multiple={false}
          rules={{ required: true }}
        />
        <Button type="submit">{t('admin.add')}</Button>
      </form>
      {blobstorageError && <ErrorState error={blobstorageError} />}
      {error && <ErrorState error={error} />}
      <QueryWrapper>
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
      </QueryWrapper>
    </>
  );
}
