import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';

import {Link} from '~/components/Link';
import {Section} from '~/components/Text';
import {routeHeaders} from '~/lib/cache';
import {seoPayload} from '~/lib/seo.server';
import type {NonNullableFields} from '~/lib/types';

export const headers = routeHeaders;

export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const data = await storefront.query(POLICIES_QUERY);

  invariant(data, 'No data returned from Shopify API');
  const policies = Object.values(
    data.shop as NonNullableFields<typeof data.shop>,
  ).filter(Boolean);

  if (policies.length === 0) {
    throw new Response('Not found', {status: 404});
  }

  const seo = seoPayload.policies({policies, url: request.url});

  return json({
    policies,
    seo,
  });
}

export default function Policies() {
  const {policies} = useLoaderData<typeof loader>();

  return (
    <>
      <Section padding="x" className="mb-24">
        <div
          className={
            ' flex items-center justify-center relative max-w-screen-2xl mx-8 md:mx-24 sm:mx-16 mt-16 '
          }
        >
          <ul className={'space-y-8 md:space-y-4 flex-1 '}>
            {policies.map((policy) => {
              return (
                policy && (
                  <li key={policy.id}>
                    <Link
                      to={`/policies/${policy.handle}`}
                      className={
                        'font-medium text-display  animated-underline uppercase'
                      }
                    >
                      {policy.title}
                    </Link>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </Section>
    </>
  );
}

const POLICIES_QUERY = `#graphql
fragment PolicyIndex on ShopPolicy {
    id
    title
    handle
}

query PoliciesIndex {
    shop {
        privacyPolicy {
            ...PolicyIndex
        }
        shippingPolicy {
            ...PolicyIndex
        }
        termsOfService {
            ...PolicyIndex
        }
        refundPolicy {
            ...PolicyIndex
        }
        subscriptionPolicy {
            id
            title
            handle
        }
    }
}
`;
