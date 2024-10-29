import {
  Await,
  Form,
  Outlet,
  useLoaderData,
  useMatches,
  useNavigate,
  useOutlet,
} from '@remix-run/react';
import {Suspense} from 'react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {flattenConnection} from '@shopify/hydrogen';

import type {
  CustomerDetailsFragment,
  OrderCardFragment,
} from '~/__generated__/customer-accountapi.generated';
import {Text, PageHeader} from '~/components/Text';
import {FeaturedCollections} from '~/components/FeaturedShopifyContent';
import {CACHE_NONE, routeHeaders} from '~/lib/cache';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {localizePath, useLocale, useTranslation} from '~/i18n';
import {Dialog} from '~/components/ui/dialog';
import {AccountDetails} from '~/components/AccountDetails';
import {AccountAddressBook} from '~/components/AccountAddressBook';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {Button} from '~/components/ui/button';
import {OrderCard} from '~/components/OrderCard';

import {getFeaturedData, type FeaturedData} from '~/routes/featured-products';

import {doLogout} from './logout';
import {Link} from '~/components/Link';

export const headers = routeHeaders;

export async function loader({context}: LoaderFunctionArgs) {
  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  );

  /**
   * If the customer failed to load, we assume their access token is invalid.
   */
  if (errors?.length || !data?.customer) {
    throw await doLogout(context);
  }

  const customer = data?.customer;

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}.`
      : `Welcome to your account.`
    : 'Account Details';

  return defer(
    {
      customer,
      heading,
      featuredDataPromise: getFeaturedData(context.storefront, context.i18n),
    },
    {
      headers: {
        'Cache-Control': CACHE_NONE,
      },
    },
  );
}

export default function Authenticated() {
  const data = useLoaderData<typeof loader>();
  const outlet = useOutlet();
  const matches = useMatches();
  const navigate = useNavigate();
  const i18n = useLocale();
  const goBackUrl = localizePath('/account', i18n);
  const goBack = () => navigate(goBackUrl);
  const renderOutletInModal = matches.some((match) => {
    const handle = match?.handle as {renderInModal?: boolean};
    return handle?.renderInModal;
  });
  if (outlet) {
    if (renderOutletInModal) {
      return (
        <>
          <Dialog open={true} onOpenChange={() => goBack()}>
            <Outlet context={{customer: data.customer}} />
          </Dialog>
          <Account {...data} />
        </>
      );
    } else {
      return <Outlet context={{customer: data.customer}} />;
    }
  }

  return <Account {...data} />;
}

interface AccountType {
  customer: CustomerDetailsFragment;
  featuredDataPromise: Promise<FeaturedData>;
  heading: string;
}

function Account({customer, heading, featuredDataPromise}: AccountType) {
  const orders = flattenConnection(customer.orders);
  const addresses = flattenConnection(customer.addresses);
  const {t} = useTranslation();

  return (
    <>
      <PageHeader heading={heading}>
        <Form method="post" action={'/account/logout'}>
          <button type="submit" className="text-foreground/50">
            {t('account.home.menu.logout')}
          </button>
        </Form>
      </PageHeader>
      {orders && <AccountOrderHistory orders={orders} />}
      <AccountDetails customer={customer} />
      <AccountAddressBook addresses={addresses} customer={customer} />
      {!orders.length && (
        <Suspense>
          <Await
            resolve={featuredDataPromise}
            errorElement="There was a problem loading featured products."
          >
            {(data) => (
              <>
                <FeaturedCollections
                  title="Popular Collections"
                  collections={data.featuredCollections}
                />
                <ProductSwimlane products={data.featuredProducts} />
              </>
            )}
          </Await>
        </Suspense>
      )}
    </>
  );
}

type OrderCardsProps = {
  orders: OrderCardFragment[];
};

function AccountOrderHistory({orders}: OrderCardsProps) {
  const {t} = useTranslation();
  return (
    <div className="mt-6">
      <div className="grid w-full gap-4 px-gutter max-w-screen-2xl">
        <h2 className="font-bold text-lead">{t('account.home.menu.orders')}</h2>
        {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
      </div>
    </div>
  );
}

function EmptyOrders() {
  const {t} = useTranslation();
  const i18n = useLocale();
  return (
    <div>
      <Text className="mb-1" size="fine" width="narrow" as="p">
        {t('account.home.emptyOrders')}
      </Text>
      <div className="w-48">
        <Link to={localizePath('/', i18n)}>
          <Button className="w-full mt-2 text-sm" variant="outline">
            {t('account.home.startShopping')}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Orders({orders}: OrderCardsProps) {
  return (
    <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false sm:grid-cols-2 md:grid-cols-3">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}
