import {Section} from '~/components/Text';
// import {KlaviyoNewsletter} from '~/components/KlavivyoForm';
import type {
  LinkFragment,
  Maybe,
  NavigationFragment,
} from '~/__generated__/hygraph.generated';
import {FooterStyle} from '~/__generated__/hygraph.generated';
import {HygraphLink} from '~/components/blocks/fragment/HygraphLink';

export function Footer({
  menu,
  style,
}: {
  menu?: Maybe<NavigationFragment>;
  style: FooterStyle;
}) {
  if (style === FooterStyle.Minimal) return <></>;

  return (
    <Section
      padding={'x'}
      as="footer"
      role="contentinfo"
      className={`grid sm:mt-8 items-center w-full pt-8 pb-6 px-gutter gap-2 md:gap-4 grid-cols-1 md:grid-cols-2`}
    >
      {menu && <FooterMenu menu={menu} />}
      <div className={'col-span-2 sm:col-span-1 flex sm:justify-center'}>
        <div className={'sm:max-w-xs w-full max-w-[295px]'}>
          {/*<KlaviyoNewsletter hasSubmitBtn={true} />*/}
        </div>
      </div>
      <h6
        className={
          'col-span-2 text-mid sm:text-heading font-bold uppercase sm:mt-8 sm:mb-8 '
        }
      >
        © No Maintenance Corp. 2024
      </h6>
    </Section>
  );
}

function FooterMenu({menu}: {menu?: NavigationFragment}) {
  return (
    <nav>
      <ul className={'gap-2 grid grid-cols-2'}>
        {(menu?.links || []).map((item: LinkFragment, idx) => (
          <li key={item.id} className={'col-span-1 sm:col-span-2 py-1'}>
            <HygraphLink hygraphLink={item}>{item.label}</HygraphLink>
          </li>
        ))}
      </ul>
      <div
        className={'row-span-1 sm:row-span-2 w-full md:w-fit hidden md:block'}
      >
        {/*<LanguageSelector />*/}
        {/*<CountrySelector heading={'Shipping to'} />*/}
      </div>
    </nav>
  );
}
