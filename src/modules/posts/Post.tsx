import { useParams } from 'react-router-dom';
import { Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { GalleryeetFullPostDto } from '../../models/post.dto';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dayjs from 'dayjs';
import { Fragment, useMemo } from 'react';
import { GalleryItem } from '../../components/GalleryItem';
import './Post.css';

export function Post() {
  const { t } = useTranslation('galleryeet');
  const { postId } = useParams();
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullPostDto | null>({
    queryKey: ['galleryeet', 'posts', postId],
    queryFn: () => get('/posts/' + postId),
    fallbackValue: null,
  });

  const contents: (string | JSX.Element)[] = useMemo(() => {
    if (data == null) {
      return [];
    }
    const splitContent = data.content.split(';;;;;');
    const ret: (string | JSX.Element)[] = [];
    for (const ct of splitContent) {
      if (ct.startsWith('content:')) {
        const content = ct.replace('content:', '');
        const imageContent = data.contents.find((c) => c.title === content);
        if (imageContent == null) {
          continue;
        }
        ret.push(<GalleryItem key={imageContent.contentId} content={imageContent} size="wide" />);
      } else {
        ret.push(ct);
      }
    }
    return ret;
  }, [data]);

  return (
    <QueryWrapper>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {data?.title}
        </Typography>
        <Typography size="2xl" weight="medium" className="text-center">
          {t('posts.published')}
          {dayjs(data?.createdAt).format('D.M.YYYY HH:mm')}
        </Typography>
        <div className="divider"></div>
        {contents.map((content, index) => {
          if (typeof content === 'string') {
            return (
              <Markdown key={index} remarkPlugins={[remarkGfm]} className="my-posts">
                {content}
              </Markdown>
            );
          }
          return <Fragment key={index}>{content}</Fragment>;
        })}
        <div className="divider"></div>
        <div className="h-12"></div>
      </>
    </QueryWrapper>
  );
}
