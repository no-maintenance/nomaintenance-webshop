import {flattenConnection} from '@shopify/hydrogen';
import type {FulfillmentStatus} from '@shopify/hydrogen/customer-account-api-types';

import type {OrderCardFragment} from '~/__generated__/customer-accountapi.generated';
import {Link} from '~/components/Link';
import {Text} from '~/components/Text';
import {statusMessage} from '~/lib/utils';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {Badge} from '~/components/ui/badge';

import {Button} from './ui/button';

export function OrderCard({order}: {order: OrderCardFragment}) {
  if (!order?.id) return null;
  const [legacyOrderId, key] = order!.id!.split('/').pop()!.split('?');
  const url = key
    ? `/account/orders/${legacyOrderId}?${key}`
    : `/account/orders/${legacyOrderId}`;
  const lineItems = flattenConnection(order?.lineItems);
  const fulfillmentStatus = flattenConnection(order?.fulfillments)[0]?.status;
  return (
    <Link to={url} prefetch="intent" className={'h-full'}>
      <Card className={'h-full flex flex-col'}>
        <CardHeader className={'flex-1'}>
          <CardTitle>
            {lineItems.length > 1
              ? `${lineItems[0].title} +${lineItems.length - 1} more`
              : lineItems[0].title}
          </CardTitle>
          <CardDescription asChild>
            <dl>
              <dt className="sr-only">Order ID</dt>
              <dd>
                <Text size="fine" color="subtle">
                  Order No. {order.number}
                </Text>
              </dd>
              <dt className="sr-only">Order Date</dt>
              <dd>
                <Text size="fine" color="subtle">
                  {new Date(order.processedAt).toDateString()}
                </Text>
              </dd>
              <>
                {fulfillmentStatus && (
                  <>
                    <dt className="sr-only">Fulfillment Status</dt>
                    <dd className="mt-2">
                      <Badge
                        variant={
                          fulfillmentStatus === 'SUCCESS'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {statusMessage(fulfillmentStatus as FulfillmentStatus)}
                      </Badge>
                    </dd>
                  </>
                )}
              </>
            </dl>
          </CardDescription>
        </CardHeader>
        <CardFooter className={'flex-shrink-0'}>
          <Button variant={'link'}>View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export const ORDER_CARD_FRAGMENT = `#graphql
fragment OrderCard on Order {
  id
  orderNumber
  processedAt
  financialStatus
  fulfillmentStatus
  currentTotalPrice {
    amount
    currencyCode
  }
  lineItems(first: 2) {
    edges {
      node {
        variant {
          image {
            url
            altText
            height
            width
          }
        }
        title
      }
    }
  }
}
`;
