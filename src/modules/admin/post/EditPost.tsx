import { useForm } from 'react-hook-form';
import {
  Button,
  ErrorState,
  FormTextareaInput,
  FormTextInput,
  Typography,
  useQuery,
  useRequest,
  useTranslation,
} from 'gtomy-lib';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GalleryeetFullPostDto } from '../../../models/post.dto';

interface EditPostForm {
  title: string | null;
  content: string | null;
}

export function EditPost() {
  const { t } = useTranslation('galleryeet');
  const { postId } = useParams();
  const { put, get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullPostDto | null>({
    queryKey: ['galleryeet', 'posts', postId],
    queryFn: () => get('/posts/' + postId),
    fallbackValue: null,
  });

  const { handleSubmit, control, setValue } = useForm<EditPostForm>({
    defaultValues: {
      title: null,
      content: null,
    },
  });
  const [error, setError] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

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
    setSubmitting(true);
  };

  return (
    <>
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormTextInput name="title" label={t('admin.inputTitle')} rules={{ required: true }} control={control} />
          <FormTextareaInput name="content" label={t('admin.content')} control={control} className="h-96" />
          {error && <ErrorState error={error} />}
          <Button type="submit" disabled={submitting} color="primary">
            {t('admin.edit')}
          </Button>
        </form>
      </QueryWrapper>
    </>
  );
}
