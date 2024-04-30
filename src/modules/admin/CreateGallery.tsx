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
} from 'gtomy-lib';
import { useForm } from 'react-hook-form';
import { GalleryeetContentDto, GalleryeetCreateContentDto } from '../../models/content.dto';
import { GalleryeetCreateGalleryDto, GalleryeetGalleryDto } from '../../models/gallery.dto';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CreateGalleryForm {
  contents: MultipleFormFile | null;
  thumbnail: SingleFormFile | null;
  title: string | null;
  description: string | null;
}

export function CreateGallery() {
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

  const files = watch('contents.file');

  const onSubmit = async (form: CreateGalleryForm) => {
    setSubmitting(true);
    const filelist = form.contents!.file;
    const contentList: GalleryeetContentDto[] = [];
    for (const file of filelist) {
      const image = await uploadImage(file);
      if (image) {
        const content = await post<GalleryeetContentDto>('/content', {
          title: image.filename,
          imageId: image.id,
        } as GalleryeetCreateContentDto).catch((e) => {
          console.error(e);
          return null;
        });
        if (content) {
          contentList.push(content);
        }
      }
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormTextInput name="title" label="Title" control={control} rules={{ required: true }} />
      <FormTextareaInput name="description" label="Description" control={control} />
      <FormFileInput name="contents" label="Contents" control={control} multiple rules={{ required: true }} />
      <FormFileInput name="thumbnail" label="Thumbnail" control={control} multiple={false} rules={{ required: true }} />
      {error && <ErrorState error={error} />}
      <Button type="submit" disabled={submitting} color="primary">
        Create
      </Button>
      <div className="flex flex-col gap-2">
        {[...(files ?? [])].map((file, index) => (
          <div key={`${index}-${file.name}`} className="flex justify-between gap-4">
            <Typography>{index}</Typography>
            <Typography>{file.name}</Typography>
            <Typography>{file.size}</Typography>
          </div>
        ))}
      </div>
    </form>
  );
}
