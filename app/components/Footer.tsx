import {Section} from '~/components/Text'; // import {KlaviyoNewsletter} from '~/components/KlavivyoForm';
import type {
  LinkFragment,
  Maybe,
  NavigationFragment,
} from '~/__generated__/hygraph.generated';
import {FooterStyle} from '~/__generated__/hygraph.generated';
import {HygraphLink} from '~/components/blocks/fragment/HygraphLink';
import {NewsletterForm} from '~/components/blocks/FormBlock';
import {cn} from '~/lib/utils';

export function Footer({
  menu,
  style,
  location,
}: {
  menu?: Maybe<NavigationFragment>;
  style: FooterStyle;
  location: 'footer' | 'hamburger';
}) {
  if (style === FooterStyle.Minimal) return <></>;

  return (
    <Section
      padding={'x'}
      as="footer"
      role="contentinfo"
      className={cn(
        location === 'footer' && 'sm:mt-8',
        'grid items-center w-full pt-8 pb-6 px-gutter gap-4 grid-cols-1 md:grid-cols-2',
      )}
    >
      {menu && <FooterMenu menu={menu} />}
      <div
        className={'col-span-2 sm:col-span-1 flex justify-center sm-max:mt-4'}
      >
        <div className={'sm:max-w-md md:max-w-sm w-full max-w-[295px]'}>
          <NewsletterForm submitBtn={'Submit'} id={'footer'} />
        </div>
      </div>
      <h6
        className={
          'col-span-2 text-mid sm:text-heading font-bold uppercase sm:mt-8 sm:mb-8b sm-max:text-center'
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
      <ul className={'gap-2 grid grid-cols-2 sm-max:max-w-[295px] mx-auto'}>
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
