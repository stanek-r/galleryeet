import { Menu, MenuItem, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';

export function GalleryeetMenu() {
  const { t } = useTranslation('galleryeet');

  return (
    <Menu showIcon showAuth>
      <MenuItem as={Link} to="/">
        {t('home')}
      </MenuItem>
      <MenuItem as={Link} to="/gallery">
        {t('gallery.title')}
      </MenuItem>
      <MenuItem as={Link} to="/posts">
        {t('posts.title')}
      </MenuItem>
      <MenuItem as={Link} to="/instax">
        {t('instax.title')}
      </MenuItem>
    </Menu>
  );
}
