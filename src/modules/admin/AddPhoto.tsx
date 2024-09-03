import {
  Button,
  ErrorState,
  FormFileInput,
  FormTextInput,
  useBlobstorage,
  useRequest,
  useTranslation,
} from 'gtomy-lib';
import { GalleryeetContentDto, GalleryeetCreateContentDto } from '../../models/content.dto';
import { AddPhotoForm } from './gallery/EditGallery';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface AddPhotoProps {
  onUpload: (content: GalleryeetContentDto) => Promise<void>;
}

export function AddPhoto({ onUpload }: AddPhotoProps) {
  const { t } = useTranslation('galleryeet');
  const { post } = useRequest();
  const { error: blobstorageError, uploadImage } = useBlobstorage();
  const [error, setError] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<AddPhotoForm>({
    defaultValues: {
      photo: null,
    },
  });

  const onSubmit = async (form: AddPhotoForm) => {
    setSubmitting(true);
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
    await onUpload(content);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormTextInput control={control} name="title" label={t('admin.inputTitle')} rules={{ required: true }} />
      <FormFileInput
        name="photo"
        label={t('admin.photo')}
        control={control}
        multiple={false}
        rules={{ required: true }}
      />
      <Button type="submit" disabled={submitting}>
        {t('admin.add')}
      </Button>
      {blobstorageError && <ErrorState error={blobstorageError} />}
      {error && <ErrorState error={error} />}
    </form>
  );
}
