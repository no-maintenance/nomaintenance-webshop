import React, {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import {useFetcher} from '@remix-run/react';
import clsx from 'clsx';

import {InputWrapper} from '~/components/Form';
import {Link} from '~/components/Link';
import {Button} from '~/components/ui/button';

import type {action as backInStockAction} from '~/routes/api+/subscribe.restock';
import {useFocus} from '~/hooks/useFocus';

export function useForm<T extends typeof backInStockAction>() {
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher<T>();
  const isLoading = fetcher.state !== 'idle';
  const data = fetcher.data;
  useEffect(() => {
    if (formRef.current && data?.status === 'success') formRef.current.reset();
  }, [fetcher?.data]);
  return {formRef, fetcher, isLoading, data};
}

export function KlaviyoBackInStock({
  source,
  variantId,
}: {
  source: string;
  variantId: string;
}) {
  const {formRef, fetcher, isLoading, data} =
    useForm<typeof backInStockAction>();

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
