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
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { GalleryeetContentDto, GalleryeetCreateContentDto } from '../../models/content.dto';
import { GalleryeetCreatePostDto, GalleryeetPostDto } from '../../models/post.dto';

interface CreatePostForm {
  title: string | null;
  content: string | null;
  thumbnail: SingleFormFile | null;
  contents: MultipleFormFile | null;
}

export function CreatePost() {
  const { t } = useTranslation('galleryeet');
  const { handleSubmit, watch, control } = useForm<CreatePostForm>({
    defaultValues: {
      title: null,
      content: null,
      thumbnail: null,
      contents: null,
    },
  });
  const navigate = useNavigate();
  const { uploadImage } = useBlobstorage();
  const { post } = useRequest();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const [uploadCount, setUploadCount] = useState<number>(0);
  const [totalUploadCount, setTotalUploadCount] = useState<number>(0);

  const onSubmit = async (form: CreatePostForm) => {
    setSubmitting(true);
    setError(null);

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
      contentIds: contentList.map((content) => content.contentId),
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

  return (
    <>
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
        <FormTextareaInput name="content" label={t('admin.content')} control={control} rules={{ required: true }} />
        <FormFileInput name="contents" label={t('admin.contents')} control={control} multiple />
        {error && <ErrorState error={error} />}
        <Button type="submit" disabled={submitting} color="primary">
          {t('admin.create')}
        </Button>
      </form>
    </>
  );
}
