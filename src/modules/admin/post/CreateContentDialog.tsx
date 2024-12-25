import {
  BaseDialog,
  BaseDialogProps,
  Button,
  ErrorState,
  FormFileInput,
  FormSwitch,
  FormTextInput,
  Image,
  SingleFormFile,
  Typography,
  useBlobstorage,
  useRequest,
} from 'gtomy-lib';
import { useForm, useWatch } from 'react-hook-form';
import { GalleryeetContentDto, GalleryeetCreateContentDto } from '../../../models/content.dto';
import { useState } from 'react';

interface CreateContentForm {
  title: string | null;
  photo: SingleFormFile | null;
  videoId: string | null;
  isYoutube: boolean;
  isVideo: boolean;
}

export interface CreateContentDialogProps extends BaseDialogProps {
  onCreateContent: (content: GalleryeetContentDto) => void;
}

export function CreateContentDialog({ onCreateContent, ...props }: CreateContentDialogProps) {
  const { post } = useRequest();
  const { uploadImage } = useBlobstorage();
  const { handleSubmit, control } = useForm<CreateContentForm>({
    defaultValues: {
      title: null,
      photo: null,
      videoId: null,
      isYoutube: false,
      isVideo: false,
    },
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const { onOpenChange } = props;

  const isVideo = useWatch({
    control,
    name: 'isVideo',
  });
  const isYoutube = useWatch({ control, name: 'isYoutube' });

  const onSubmit = async (form: CreateContentForm) => {
    setSubmitting(true);
    setError(null);
    let image: Image | null = null;
    if (form.photo) {
      image = await uploadImage(form.photo.file);
    }

    const content = await post<GalleryeetContentDto>('/content', {
      title: form.title,
      imageId: image?.id,
      videoId: form.videoId ?? undefined,
      isYoutube: form.isYoutube,
    } as GalleryeetCreateContentDto).catch((e) => {
      setError(e);
      return null;
    });

    setSubmitting(false);
    if (content) {
      onCreateContent(content);
      onOpenChange?.(false);
    }
  };

  return (
    <BaseDialog {...props}>
      <Typography size="3xl">Create content</Typography>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput name="title" label="Title" control={control} rules={{ required: true }} />
        <FormSwitch name="isVideo" startElement="Photo" endElement="Video" control={control} />
        <FormFileInput
          name="photo"
          label={isVideo ? 'Thumbnail' : 'Photo'}
          multiple={false}
          control={control}
          rules={{ required: true }}
        />
        {isVideo && (
          <FormTextInput
            name="videoId"
            label={isYoutube ? 'Youtube id' : 'Cloudflare id'}
            control={control}
            rules={{ required: isVideo }}
          />
        )}
        {isVideo && <FormSwitch name="isYoutube" startElement="Cloudflare" endElement="Youtube" control={control} />}
        {error && <ErrorState error={error} />}
        <Button type="submit" color="primary" disabled={submitting}>
          Create
        </Button>
      </form>
    </BaseDialog>
  );
}
