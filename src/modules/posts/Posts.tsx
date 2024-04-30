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
        <Typography>{t('posts.title')}</Typography>
        {data.map((post) => (
          <div key={post.postId} className="flex gap-4">
            <div>
              <Typography>{post.title}</Typography>
            </div>
            <Button as={Link} to={post.postId}></Button>
          </div>
        ))}
      </>
    </QueryWrapper>
  );
}