import { Button, Typography } from 'gtomy-lib';
import { Link } from 'react-router-dom';

export function Posts() {
  return (
    <>
      <Typography>Posts</Typography>
      <Button as={Link} to="test">
        Test post
      </Button>
    </>
  );
}
