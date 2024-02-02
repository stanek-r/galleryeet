import { GalleryeetMenu } from '../components/GalleryeetMenu';
import { GalleryeetFooter } from '../components/GalleryeetFooter';
import { ColumnPage, Typography } from 'gtomy-lib';
import { Corousel } from '../components/Corousel';

export function HomePage() {
  return (
    <>
      <GalleryeetMenu />
      <ColumnPage className="items-center gap-16 ">
        <div className="w-full space-y-2 lg:w-4/5 text-center">
          <Typography as="h1" size="7xl" weight="bold">
            GallerYeet
          </Typography>
          <Typography as="h2" size="2xl" weight="semibold">
            místo kde najdete fotky i videa z mých cest
          </Typography>
        </div>
        <div className="flex w-full flex-col gap-2 lg:w-4/5 text-center">
          <Typography size="lg">
            Vítejte na našem cestovatelském a fotografickém blogu! Váš průvodce světem, kde se snoubí dobrodružství s
            uměním. Na tomto blogu vás zasvětím do fascinujícího světa cestování a fotografování. Společně prozkoumáme
            nekonečné možnosti, jak zachytit krásu, kouzlo a jedinečnost míst, která navštívíme.
          </Typography>
        </div>
        <Corousel />
        <div className="flex w-full flex-col gap-2 lg:w-4/5">
          <Typography as="h2" size="3xl" weight="semibold">
            Co zde najdete?
          </Typography>
          <Typography size="lg">
            Na tomto blogu najdete cenné rady, tipy a triky pro cestování i fotografování. Budu se s vámi dělit o své
            zkušenosti z cest po celém světě, představím vám neuvěřitelné destinace, které stojí za návštěvu, a ukážu
            vám, jak své dojmy zachytit prostřednictvím fotografií.
          </Typography>
          <Typography size="lg">
            Pokud jste nadšeným cestovatelem, amatérským nebo profesionálním fotografem, nebo prostě jen milovníkem
            krásy světa kolem nás, tento blog je pro vás! Připravte se na úžasnou cestu plnou inspirace, vzrušení a
            zábavy.
          </Typography>
          <Typography size="lg">
            Těšíme se na společná dobrodružství, objevování nekonečných možností a sdílení našich vzácných zážitků z
            cest. Vstupte do světa plného barev, emocí a vzpomínek, které navždy zůstanou v našich srdcích. Vítejte na
            palubě našeho cestovatelského a fotografického blogu!
          </Typography>
        </div>
        <div className="flex w-full flex-col gap-2 lg:w-4/5">
          <Typography as="h2" size="3xl" weight="semibold">
            Co nás čeká v budoucnu?
          </Typography>
          <Typography size="lg">
            V nadcházejících týdnech a měsících se chystám navštívit několik úžasných míst, která jsem si pečlivě
            vybral, abych se s vámi mohl podělit o své zážitky, fotografie a tipy. Nejprve zamířím na Island, zemi
            ohromující přírody, gejzírů, vodopádů a polární záře. Plánuji prozkoumat tento jedinečný ostrov, navštívit
            místa jako Národní park Thingvellir, ledovec Vatnajökull či černou lávovou pláž Reynisfjara. Těšte se na
            články o mých islandských dobrodružstvích, doporučení na nejlepší trekkingové trasy a rady, jak se připravit
            na náročné klimatické podmínky.
          </Typography>
          <Typography size="lg">
            Následně vyrazím do Japonska, země plné kontrastů, která dokonale kombinuje tradiční kulturu s moderní
            technologií. Mým cílem je navštívit jak rušné metropole jako Tokio, tak i malebné vesničky a chrámy, které
            se nacházejí v horských oblastech. Chci se zúčastnit i tradičních japonských festivalů a zjistit více o
            japonské kuchyni a čajových obřadech.
          </Typography>
          <Typography size="lg">
            A konečně, jako poslední destinace mě čeká návštěva Kostariky, země deštných pralesů, pláží a bohatého
            života divokých zvířat. Plánuji strávit čas v národních parcích, jako je Manuel Antonio a Corcovado, kde se
            pokusím zahlédnout zvířata, jako jsou třeba lenochodi, kapucíni a quetzalové. Sledujte můj blog, abyste
            nezmeškali dobrodružství z těchto fascinujících destinací a získali cenné tipy pro vaše vlastní cesty.
          </Typography>
        </div>
      </ColumnPage>
      <GalleryeetFooter />
    </>
  );
}
