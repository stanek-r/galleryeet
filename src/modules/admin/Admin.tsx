import { Button, Typography, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';

export function Admin() {
  const { t } = useTranslation('galleryeet');
  return (
    <>
      <Typography as="h1" size="4xl" weight="bold" className="text-center">
        {t('admin.title')}
      </Typography>
      <div className="divider"></div>
      <div className="flex gap-4">
        <Button as={Link} to="create-gallery">
          {t('admin.createGallery')}
        </Button>
        <Button as={Link} to="create-post">
          {t('admin.createPost')}
        </Button>
        <Button as={Link} to="instax">
          {t('instax.title')}
        </Button>
      </div>
    </>
  );
}
