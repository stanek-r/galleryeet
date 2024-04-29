import { withColumnPage } from 'gtomy-lib';
import { Route, Routes } from 'react-router-dom';
import { Posts } from './Posts';
import { Post } from './Post';

export default function PostsModule() {
  return (
    <Routes>
      <Route path="/" element={withColumnPage(Posts)} />
      <Route path="/:postId" element={withColumnPage(Post)} />
    </Routes>
  );
}
