import { Button, Typography } from 'gtomy-lib';
import { Link } from 'react-router-dom';

export function Admin() {
  return (
    <>
      <Typography>Admin</Typography>
      <Button as={Link} to="galleries">
        Galleries
      </Button>
      <Button as={Link} to="create-gallery">
        Create gallery
      </Button>
    </>
  );
}
