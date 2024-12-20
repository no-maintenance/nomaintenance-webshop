import type {ReactElement, ReactNode} from 'react';
import React, {cloneElement, useEffect, useRef} from 'react';
import {useFetcher} from '@remix-run/react';
import clsx from 'clsx';

import {InputWrapper} from '~/components/Form';
import {Link} from '~/components/Link';
import {Button} from '~/components/ui/button';

import type {action as backInStockAction} from '~/routes/api+/subscribe.restock';
import {useFocus} from '~/hooks/useFocus';
import {toast} from '~/components/ui/use-toast';
import {useAnalytics} from '@shopify/hydrogen';

export function KlaviyoBackInStock({
  source,
  variantId,
  cb,
}: {
  source: string;
  variantId: string;
  cb?: () => void;
}) {
  const {publish, shop, cart, prevCart} = useAnalytics();

  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher<typeof backInStockAction>();
  const isLoading = fetcher.state !== 'idle';
  const data = fetcher.data;
  useEffect(() => {
    if (formRef.current && data?.status === 'success') {
      publish('custom_back_in_stock', data);

      formRef.current.reset();
      toast({
        title: 'You are now subscribed to receive back in stock notifications',
        description:
          'We will notify you when we restock this product in your requested size.',
      });
      if (cb) cb();
    }
  }, [fetcher?.data]);

  return (
    <fetcher.Form ref={formRef} method="post" action={`/api/subscribe/restock`}>
      <input type={'hidden'} value={source} name={'source'} />
      <input type={'hidden'} value={variantId} name={'variantId'} />
      <div className={'relative'}>
        <InputWrapper
          errorMsg={data?.errors.email}
          showErrorMsg={true}
          fixedHeight={false}
          id={'email'}
        >
          <input
            data-1p-ignore
            id={'email'}
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
        </InputWrapper>
      </div>
      <div className={'text-left block pt-8'}>
        <Checkbox
          label={
            <span className={'pl-2 cursor-pointer text-fine'}>
              I would also like to opt-in to receive the newsletter. See our{' '}
              <Link className={'underline'} to={'/policies/privacy-policy'}>
                Privacy Policy
              </Link>{' '}
              for more information.
            </span>
          }
        >
          <input
            type="checkbox"
            name="consent"
            className={clsx(['bg-transparent'])}
          />
        </Checkbox>
      </div>
      <Button className={'w-full mt-8'} type="submit" disabled={isLoading}>
        {isLoading ? <p>Submitting...</p> : 'Notify Me'}
      </Button>
    </fetcher.Form>
  );
}

function Checkbox({
  hasError,
  children,
  label,
}: {
  label: ReactNode;
  hasError?: string;
  children: ReactElement;
}) {
  const [checkboxRef, setFocus] = useFocus<HTMLInputElement>();
  useEffect(() => {
    if (hasError) setFocus();
  }, [hasError]);
  const input = cloneElement(children, {
    className: 'bg-transparent',
    ref: checkboxRef,
  });
  return (
    <label
      className={clsx([hasError && 'text-destructive border-color-error'])}
    >
      {input}
      {label}
    </label>
  );
}
