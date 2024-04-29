import { Button, Typography } from 'gtomy-lib';
import { Link } from 'react-router-dom';

export function Galleries() {
  return (
    <>
      <Typography>Galleries</Typography>
      <Button as={Link} to="test">
        Test gallery
      </Button>
    </>
  );
}
