import {PinterestPixel} from '~/components/analytics/PinterestPixel';
import {GoogleAnalyticsPixel} from '~/components/analytics/GoogleAnalyticsPixel';
import {CONV_ADDED_TO_CART} from '~/lib/const';
import {KlaviyoPixel} from '~/components/analytics/KlaviyoPixel';
import {FacebookPixel} from '~/components/analytics/FacebookPixel';
import {ThirdPartyAnalyticsIntegration} from '~/components/analytics/ThirdPartyAnalyticsIntegration';

export function Pixels({
  tokens,
  nonce,
}: {
  nonce?: string;
  tokens: {
    gtm?: string;
    klaviyo?: string;
    meta?: string;
    ga4?: string;
    pinterest?: string;
  };
}) {
  // if (process.env.NODE_ENV === 'development' && !process.env.DEBUG_TRACKING)
  //   return null;
  return (
    <>
      <ThirdPartyAnalyticsIntegration />
      {tokens?.ga4 && <GoogleAnalyticsPixel id={tokens.ga4} />}
      {tokens?.klaviyo && <KlaviyoPixel id={tokens.klaviyo} nonce={nonce} />}
      {tokens?.meta && <FacebookPixel id={tokens.meta} />}
      {!!tokens?.pinterest && <PinterestPixel id={tokens.pinterest} />}
    </>
  );
}
export function getAddToCartValue(v: number) {
  return CONV_ADDED_TO_CART * v;
}
