import { useParams } from 'react-router-dom';

export function Post() {
  const { postId } = useParams();
  return <>Post &quot;{postId}&quot;</>;
}
