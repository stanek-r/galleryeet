import { Footer, FooterItem, FooterSocialItem, useTranslation } from 'gtomy-lib';
import { Link } from 'react-router-dom';

const PROJECTS = [
  { name: 'GTomy.net', link: 'https://gtomy.net' },
  { name: 'Ikki AI', link: 'https://ikki-ai.net' },
  { name: 'Mythicraft', link: 'https://mythicraft.net' },
  { name: 'SWITch', link: 'https://swit-ch.live' },
];

export function GalleryeetFooter() {
  const { t } = useTranslation('galleryeet');

  return (
    <Footer
      title={t('title')}
      subtitle={t('footer').toString()}
      height="tall"
      showSettings
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
            <FooterItem as={Link} to="/privacy-policy" target="_blank">
              {t('footer.privacy')}
            </FooterItem>
          ),
        },
      ]}
      socialMedia={
        <>
          <FooterSocialItem type="threads" href="https://www.threads.net/@gtomyasek" />
          <FooterSocialItem type="instagram" href="https://www.instagram.com/gtomyasek" />
          <FooterSocialItem type="youtube" href="https://youtube.com/gtomy" />
        </>
      }
    />
  );
}
