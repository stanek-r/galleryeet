import { Footer, FooterSocialItem, useTranslation } from 'gtomy-lib';

export function GalleryeetFooter() {
  const { t } = useTranslation('galleryeet');

  return (
    <Footer
      title={t('footer')}
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
