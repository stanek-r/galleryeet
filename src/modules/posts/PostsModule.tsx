import { ColumnPage } from 'gtomy-lib';
import { Route, Routes } from 'react-router-dom';
import { Posts } from './Posts';
import { Post } from './Post';

export default function PostsModule() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ColumnPage>
            <Posts />
          </ColumnPage>
        }
      />
      <Route
        path="/:postId"
        element={
          <ColumnPage>
            <Post />
          </ColumnPage>
        }
      />
    </Routes>
  );
}
