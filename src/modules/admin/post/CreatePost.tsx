import {
  Button,
  ButtonIcon,
  DialogElement,
  ErrorState,
  FormFileInput,
  FormTextareaInput,
  FormTextInput,
  SingleFormFile,
  Typography,
  useBlobstorage,
  useDialog,
  useRequest,
  useTranslation,
} from 'gtomy-lib';
import { Link, useNavigate } from 'react-router-dom';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { GalleryeetContentDto, GalleryeetCreateContentDto } from '../../../models/content.dto';
import { GalleryeetCreatePostDto, GalleryeetPostDto } from '../../../models/post.dto';
import { CreateContentDialog } from './CreateContentDialog';
import { TrashIcon } from '@heroicons/react/24/outline';

interface CreatePostForm {
  title: string | null;
  content: string | null;
  thumbnail: SingleFormFile | null;
  contents: GalleryeetContentDto[];
}

export function CreatePost() {
  const { t } = useTranslation('galleryeet');
  const { handleSubmit, control } = useForm<CreatePostForm>({
    defaultValues: {
      title: null,
      content: null,
      thumbnail: null,
      contents: [],
    },
  });
  const { append, remove } = useFieldArray({
    control,
    name: 'contents',
  });
  const navigate = useNavigate();
  const { uploadImage } = useBlobstorage();
  const { post, delete: deleteRequest } = useRequest();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const contents = useWatch({ control, name: 'contents' });

  const { openDialog, dialogElementProps } = useDialog((props) => (
    <CreateContentDialog onCreateContent={(content) => append(content)} {...props} />
  ));

  const onSubmit = async (form: CreatePostForm) => {
    setSubmitting(true);
    setError(null);

    const thumbnailImage = await uploadImage(form.thumbnail!.file);
    if (thumbnailImage == null) {
      setSubmitting(false);
      return;
    }
    const thumbnailContent = await post<GalleryeetContentDto>('/content', {
      title: thumbnailImage.filename,
      imageId: thumbnailImage.id,
    } as GalleryeetCreateContentDto).catch((e) => {
      setError(e);
      return null;
    });
    if (thumbnailContent == null) {
      setSubmitting(false);
      return;
    }
    const createdPost = await post<GalleryeetPostDto>('/posts', {
      title: form.title,
      content: form.content,
      contentIds: form.contents.map((content) => content.contentId),
      thumbnailId: thumbnailContent.contentId,
    } as GalleryeetCreatePostDto).catch((e) => {
      setError(e);
      return null;
    });
    if (createdPost) {
      navigate('/posts/' + createdPost.postId);
    } else {
      setSubmitting(false);
    }
  };

  const removeContent = useCallback(
    (content: GalleryeetContentDto, index: number) =>
      deleteRequest(`/content/${content.contentId}`)
        .then(() => remove(index))
        .catch((e) => setError(e)),
    [deleteRequest, remove, setError]
  );

  return (
    <>
      <DialogElement {...dialogElementProps} />
      <Typography as="h1" size="4xl" weight="bold" className="text-center">
        {t('admin.createPost')}
      </Typography>
      <div className="divider"></div>
      <div>
        <Button as={Link} to="/admin">
          {t('back')}
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormTextInput name="title" label={t('admin.inputTitle')} rules={{ required: true }} control={control} />
        <FormFileInput
          name="thumbnail"
          label={t('admin.thumbnail')}
          control={control}
          multiple={false}
          rules={{ required: true }}
        />
        <FormTextareaInput name="content" label={t('admin.content')} control={control} className="h-96" />
        <div className="divider"></div>
        <div className="flex flex-col gap-2">
          {contents.map((content, index) => (
            <div className="flex justify-between gap-2" key={content.contentId}>
              <Typography>{content.contentId}</Typography>
              <Typography>{content.title}</Typography>
              <ButtonIcon size="sm" icon={TrashIcon} onClick={() => removeContent(content, index)} />
            </div>
          ))}
        </div>
        <Button onClick={openDialog}>Add content</Button>
        <div className="divider"></div>
        {error && <ErrorState error={error} />}
        <Button type="submit" disabled={submitting} color="primary">
          {t('admin.create')}
        </Button>
      </form>
    </>
  );
}
