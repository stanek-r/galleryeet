import { Menu, MenuItem, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';

export function GalleryeetMenu() {
  const { t } = useTranslation('galleryeet');

  return (
    <Menu showIcon showAuth>
      <MenuItem as={Link} to="/">
        {t('home')}
      </MenuItem>
    </Menu>
  );
}
