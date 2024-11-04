import { Link, useParams } from 'react-router-dom';
import { Button, QueryWrapper, RequirePermission, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetFullPostDto } from '../../models/post.dto';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dayjs from 'dayjs';
import { Fragment, useMemo } from 'react';
import { GalleryItem } from '../../components/GalleryItem';
import './Post.css';
import { GalleryeetContentDto } from '../../models/content.dto';

export function Post() {
  const { t } = useTranslation('galleryeet');
  const { postId } = useParams();
  const { get } = useRequest();
  const { data, wrapperProps } = useQuery<GalleryeetFullPostDto | null>({
    queryKey: ['galleryeet', 'posts', postId],
    queryFn: () => get('/posts/' + postId),
  });

  const contents: (string | GalleryeetContentDto[])[] = useMemo(() => {
    if (data == null) {
      return [];
    }
    const splitContent = data.content.split(';;;;;');
    const ret: (string | GalleryeetContentDto[])[] = [];
    for (const ct of splitContent) {
      if (ct.startsWith('content:')) {
        const content = ct.replace('content:', '');
        const splitContent2 = content.split(';');
        const images = splitContent2.map((ct2) => {
          const imageContent = data.contents.find((c) => c.contentId === ct2);
          if (imageContent == null) {
            return null;
          }
          return imageContent;
        });
        ret.push(images.filter((ct2) => ct2 != null));
      } else {
        ret.push(ct);
      }
    }
    return ret;
  }, [data]);

  return (
    <QueryWrapper {...wrapperProps}>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {data?.title}
        </Typography>
        <Typography size="2xl" weight="medium" className="text-center">
          {t('posts.published')}
          {dayjs(data?.createdAt).format('D.M.YYYY HH:mm')}
        </Typography>
        <div className="divider"></div>
        <div className="flex gap-4">
          <Button as={Link} to="/posts">
            {t('back')}
          </Button>
          <RequirePermission minimalRole="owner">
            <Button as={Link} to={`/admin/edit-post/${postId}`}>
              {t('admin.edit')}
            </Button>
          </RequirePermission>
        </div>
        {contents.map((content, index) => {
          if (typeof content === 'string') {
            return (
              <Markdown key={index} remarkPlugins={[remarkGfm]} className="my-posts">
                {content}
              </Markdown>
            );
          }
          return (
            <div key={index} className="flex flex-wrap">
              {content.map((c) => (
                <GalleryItem key={c.contentId} content={c} size="wide" disableHeightLimit />
              ))}
            </div>
          );
        })}
        {/*TODO: comments*/}
        {/*<div className="divider"></div>*/}
        <div className="h-12"></div>
      </>
    </QueryWrapper>
  );
}
