import { useParams } from 'react-router-dom';
import { Typography, useQuery, useRequest } from 'gtomy-lib';
import { GalleryeetFullPostDto } from '../../models/post.dto';

export function Post() {
  const { postId } = useParams();
  const { get } = useRequest();
  const { QueryWrapper, data } = useQuery<GalleryeetFullPostDto | null>({
    queryKey: ['galleryeet', 'posts', postId],
    queryFn: () => get('/posts/' + postId),
    fallbackValue: null,
  });
  return (
    <QueryWrapper>
      <>
        <Typography>{data?.postId}</Typography>
        <Typography>{data?.title}</Typography>
        <Typography>{data?.createdAt}</Typography>
      </>
    </QueryWrapper>
  );
}
