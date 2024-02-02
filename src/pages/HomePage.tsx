import { GalleryeetMenu } from '../components/GalleryeetMenu';
import { GalleryeetFooter } from '../components/GalleryeetFooter';
import { ColumnPage, Typography } from 'gtomy-lib';
import { Corousel } from '../components/Corousel';

export function HomePage() {
  return (
    <>
      <GalleryeetMenu />
      <ColumnPage className="items-center gap-16 ">
        <div className="w-full space-y-2 text-center lg:w-4/5">
          <Typography as="h1" size="7xl" weight="bold">
            GallerYeet
          </Typography>
          <Typography as="h2" size="2xl" weight="semibold">
            místo kde najdete fotky i videa z mých cest
          </Typography>
        </div>
        <div className="flex w-full flex-col gap-2 text-center lg:w-4/5">
          <Typography size="lg">
            Vítejte na našem cestovatelském a fotografickém blogu! Váš průvodce světem, kde se snoubí dobrodružství s
            uměním. Na tomto blogu vás zasvětím do fascinujícího světa cestování a fotografování. Společně prozkoumáme
            nekonečné možnosti, jak zachytit krásu, kouzlo a jedinečnost míst, která navštívíme.
          </Typography>
        </div>
        <Corousel />
      </ColumnPage>
      <GalleryeetFooter />
    </>
  );
}
