import { Typography, useTranslation } from 'gtomy-lib';
import { Corousel } from '../components/Corousel';

export function HomePage() {
  const { t } = useTranslation('galleryeet');

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="w-full space-y-2 text-center lg:w-4/5">
        <Typography as="h1" size="7xl" weight="bold">
          {t('title')}
        </Typography>
        <Typography as="h2" size="2xl" weight="semibold">
          {t('subtitle')}
        </Typography>
      </div>
      <Corousel />
      <div className="flex w-full flex-col gap-2 text-center lg:w-4/5">
        <Typography size="lg">{t('description')}</Typography>
      </div>
    </div>
  );
}
