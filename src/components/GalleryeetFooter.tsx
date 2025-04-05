import { Footer, FooterItem, FooterSocialItem, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';

const PROJECTS = [
  { name: 'GTomy.net', link: 'https://gtomy.net' },
  { name: 'Mythranel', link: 'https://mythranel.net' },
];

export function GalleryeetFooter() {
  const { t } = useTranslation('galleryeet');

  return (
    <Footer
      title={t('title')}
      subtitle={t('footer.subtitle')}
      height="tall"
      showSettings
      showIcon
      links={[
        {
          header: t('footer.projects'),
          links: (
            <>
              {PROJECTS.map((project) => (
                <FooterItem as="a" href={project.link} key={project.name}>
                  {project.name}
                </FooterItem>
              ))}
            </>
          ),
        },
        {
          header: t('footer.usefulLinks'),
          links: (
            <>
              <FooterItem as={Link} to="/privacy-policy">
                {t('privacy.title', { ns: 'pages' })}
              </FooterItem>
              <FooterItem as={Link} to="/admin">
                {t('admin.title')}
              </FooterItem>
            </>
          ),
        },
      ]}
      socialMedia={
        <>
          <FooterSocialItem type="bluesky" href="https://bsky.app/profile/gtomy.net" />
          <FooterSocialItem type="instagram" href="https://www.instagram.com/gtomyasek" />
          <FooterSocialItem type="threads" href="https://www.threads.net/@gtomyasek" />
          <FooterSocialItem type="youtube" href="https://youtube.com/gtomy" />
        </>
      }
    />
  );
}
