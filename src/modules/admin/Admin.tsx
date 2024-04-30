import { Button, Typography } from 'gtomy-lib';
import { Link } from 'react-router-dom';

export function Admin() {
  return (
    <>
      <Typography as="h1" size="4xl" weight="bold" className="text-center">
        Admin
      </Typography>
      <div className="flex gap-4">
        <Button as={Link} to="galleries">
          Galleries
        </Button>
        <Button as={Link} to="create-gallery">
          Create gallery
        </Button>
      </div>
    </>
  );
}
