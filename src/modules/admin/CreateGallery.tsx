import {
  Button,
  ErrorState,
  FormFileInput,
  FormTextareaInput,
  FormTextInput,
  MultipleFormFile,
  SingleFormFile,
  Typography,
  useBlobstorage,
  useRequest,
  useTranslation,
} from 'gtomy-lib';
import { useForm } from 'react-hook-form';
import { GalleryeetContentDto, GalleryeetCreateContentDto } from '../../models/content.dto';
import { GalleryeetCreateGalleryDto, GalleryeetGalleryDto } from '../../models/gallery.dto';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface CreateGalleryForm {
  contents: MultipleFormFile | null;
  thumbnail: SingleFormFile | null;
  title: string | null;
  description: string | null;
}

export function CreateGallery() {
  const { t } = useTranslation('galleryeet');
  const { handleSubmit, watch, control } = useForm<CreateGalleryForm>({
    defaultValues: {
      contents: null,
      title: null,
      description: null,
    },
  });
  const { uploadImage } = useBlobstorage();
  const { post } = useRequest();
  const [error, setError] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [totalUploadCount, setTotalUploadCount] = useState<number>(0);

  const files = watch('contents.file');

  const onSubmit = async (form: CreateGalleryForm) => {
    setSubmitting(true);
    const filelist = form.contents!.file;
    const contentList: GalleryeetContentDto[] = [];
    setUploadCount(0);
    setTotalUploadCount(filelist.length);
    for (const file of filelist) {
      const image = await uploadImage(file);
      if (image == null) {
        continue;
      }
      const content = await post<GalleryeetContentDto>('/content', {
        title: file.name,
        imageId: image.id,
      } as GalleryeetCreateContentDto).catch((e) => {
        console.error(e);
        return null;
      });
      if (content == null) {
        continue;
      }
      contentList.push(content);
      setUploadCount((prev) => prev + 1);
    }
    const thumbnailImage = await uploadImage(form.thumbnail!.file);
    if (thumbnailImage) {
      const thumbnailContent = await post<GalleryeetContentDto>('/content', {
        title: thumbnailImage.filename,
        imageId: thumbnailImage.id,
      } as GalleryeetCreateContentDto).catch((e) => {
        setError(e);
        return null;
      });
      if (thumbnailContent) {
        const gallery = await post<GalleryeetGalleryDto>('/galleries', {
          title: form.title,
          contentIds: contentList.map((content) => content.contentId),
          description: form.description,
          thumbnailId: thumbnailContent.contentId,
        } as GalleryeetCreateGalleryDto).catch((e) => {
          setError(e);
          return null;
        });
        if (gallery) {
          navigate('/gallery/' + gallery.galleryId);
        }
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      <Typography as="h1" size="4xl" weight="bold" className="text-center">
        {t('admin.createGallery')}
      </Typography>
      <div className="divider"></div>
      <div>
        <Button as={Link} to="/admin">
          {t('back')}
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormTextInput name="title" label={t('admin.inputTitle')} control={control} rules={{ required: true }} />
        <FormTextareaInput name="description" label={t('admin.description')} control={control} />
        <FormFileInput
          name="contents"
          label={t('admin.contents')}
          control={control}
          multiple
          rules={{ required: true }}
        />
        <FormFileInput
          name="thumbnail"
          label={t('admin.thumbnail')}
          control={control}
          multiple={false}
          rules={{ required: true }}
        />
        {error && <ErrorState error={error} />}
        <Button type="submit" disabled={submitting} color="primary">
          {t('admin.create')}
        </Button>
        <div className="divider"></div>
        {totalUploadCount > 0 && (
          <progress
            className="progress progress-primary h-6 w-full"
            value={uploadCount}
            max={totalUploadCount}
          ></progress>
        )}
        <div className="flex flex-col gap-2">
          {[...(files ?? [])].map((file, index) => (
            <div key={`${index}-${file.name}`} className="flex justify-between gap-4">
              <Typography>{index}</Typography>
              <Typography>{file.name}</Typography>
              <Typography>{file.size}</Typography>
              <Typography>{uploadCount > index ? 'Uploaded' : 'Waiting'}</Typography>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}
