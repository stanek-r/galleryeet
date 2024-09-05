import { useForm } from 'react-hook-form';
import {
  Button,
  ButtonIcon,
  ErrorState,
  FormTextareaInput,
  FormTextInput,
  Typography,
  useDialog,
  useQuery,
  useRequest,
  useTranslation,
} from 'gtomy-lib';
import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { GalleryeetFullPostDto } from '../../../models/post.dto';
import { TrashIcon } from '@heroicons/react/24/outline';
import { GalleryeetContentDto } from '../../../models/content.dto';
import { CreateContentDialog } from './CreateContentDialog';

interface EditPostForm {
  title: string | null;
  content: string | null;
}

export function EditPost() {
  const { t } = useTranslation('galleryeet');
  const { postId } = useParams();
  const { put, get, post, delete: deleteRequest } = useRequest();
  const { QueryWrapper, data, refetch } = useQuery<GalleryeetFullPostDto | null>({
    queryKey: ['galleryeet', 'posts', postId],
    queryFn: () => get('/posts/' + postId),
    fallbackValue: null,
  });

  const { handleSubmit, control, setValue, watch } = useForm<EditPostForm>({
    defaultValues: {
      title: null,
      content: null,
    },
  });
  const [error, setError] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const uploadContent = useCallback(
    async (content: GalleryeetContentDto) => {
      await post(`/posts/${postId}`, { contentId: content.contentId }).catch((e) => setError(e));
      await refetch();
    },
    [refetch, post]
  );

  const removeContent = useCallback(
    async (contentId: string) => {
      await deleteRequest(`/content/${contentId}`, { params: { type: 'post', typeId: postId } }).catch((e) =>
        setError(e)
      );
      await refetch();
    },
    [refetch, deleteRequest, postId]
  );

  const { openDialog, DialogElement } = useDialog((props) => (
    <CreateContentDialog onCreateContent={uploadContent} {...props} />
  ));

  useEffect(() => {
    if (data == null) {
      return;
    }
    setValue('title', data.title);
    setValue('content', data.content);
  }, [data]);

  const onSubmit = async (form: EditPostForm) => {
    setSubmitting(true);
    await put('/posts/' + postId, form).catch((error) => setError(error));
    setSubmitting(false);
  };

  return (
    <>
      <DialogElement />
      <Typography as="h1" size="4xl" weight="bold" className="text-center">
        {t('admin.edit')}
      </Typography>
      <div className="divider"></div>
      <div>
        <Button as={Link} to="/posts">
          {t('back')}
        </Button>
      </div>
      <QueryWrapper>
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormTextInput name="title" label={t('admin.inputTitle')} rules={{ required: true }} control={control} />
            <FormTextareaInput name="content" label={t('admin.content')} control={control} className="h-96" />
            {error && <ErrorState error={error} />}
            <Button type="submit" disabled={submitting} color="primary">
              {t('admin.edit')}
            </Button>
          </form>
          <div className="divider"></div>
          <div className="flex flex-col gap-2">
            {data?.contents.map((content) => (
              <div className="flex justify-between gap-2" key={content.contentId}>
                <Typography>{content.contentId}</Typography>
                <Typography>{content.title}</Typography>
                <ButtonIcon size="sm" icon={TrashIcon} onClick={() => removeContent(content.contentId)} />
              </div>
            ))}
          </div>
          <Button onClick={openDialog}>Add content</Button>
        </>
      </QueryWrapper>
    </>
  );
}
