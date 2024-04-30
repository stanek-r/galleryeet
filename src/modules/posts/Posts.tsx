import { Button, Typography, useQuery, useRequest, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';
import { GalleryeetPostDto } from '../../models/post.dto';

export function Posts() {
  const { t } = useTranslation('galleryeet');
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetPostDto[]>({
    queryKey: ['galleryeet', 'posts'],
    queryFn: () => get('/posts'),
    fallbackValue: [],
  });
  return (
    <QueryWrapper>
      <>
        <Typography as="h1" size="4xl" weight="bold" className="text-center">
          {t('posts.title')}
        </Typography>
        {data.length === 0 && <Typography className="text-center">{t('posts.noPosts')}</Typography>}
        {data.map((post) => (
          <div key={post.postId} className="flex gap-4">
            <div>
              <Typography>{post.title}</Typography>
            </div>
            <Button as={Link} to={post.postId}>
              {t('view')}
            </Button>
          </div>
        ))}
      </>
    </QueryWrapper>
  );
}
