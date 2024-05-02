import {Form} from '@remix-run/react';
import type {CustomerAddress} from '@shopify/hydrogen/customer-account-api-types';

import type {CustomerDetailsFragment} from '~/__generated__/customer-accountapi.generated';
import {Link} from '~/components/Link';
import {Text} from '~/components/Text';
import {Button} from '~/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader} from '~/components/ui/card';
import {Badge} from '~/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';

export function AccountAddressBook({
  customer,
  addresses,
}: {
  customer: CustomerDetailsFragment;
  addresses: CustomerAddress[];
}) {
  return (
    <>
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h3 className="font-bold text-lead">Address Book</h3>
        {!addresses?.length && (
          <Text className="mb-1" width="narrow" as="p" size="copy">
            You haven&apos;t saved any addresses yet.
          </Text>
        )}
        <div className="w-48">
          <Link to="address/add">
            <Button variant={'outline'}>Add an Address</Button>
          </Link>
        </div>
        {Boolean(addresses?.length) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {customer.defaultAddress && (
              <Address address={customer.defaultAddress} defaultAddress />
            )}
            {addresses
              .filter((address) => address.id !== customer.defaultAddress?.id)
              .map((address) => (
                <Address key={address.id} address={address} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}

function Address({
  address,
  defaultAddress,
}: {
  address: CustomerAddress;
  defaultAddress?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <span>{defaultAddress && <Badge>Default</Badge>}</span>
      </CardHeader>
      <CardContent>
        <ul className="flex-1 flex-row">
          {(address.firstName || address.lastName) && (
            <li>
              {'' +
                (address.firstName && address.firstName + ' ') +
                address?.lastName}
            </li>
          )}
          {address.formatted &&
            address.formatted.map((line: string) => <li key={line}>{line}</li>)}
        </ul>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row font-medium mt-6 items-baseline">
          <Link
            to={`/account/address/${encodeURIComponent(address.id)}`}
            prefetch="intent"
          >
            <Button variant={'link'}>Edit</Button>
          </Link>
          <DeleteAddress id={address.id} />
        </div>
      </CardFooter>
    </Card>
  );
}

function DeleteAddress({id}: {id: string}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'link'}>Remove</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form action="address/delete" method="delete">
          <input type="hidden" name="addressId" value={id} />
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this address?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              address from your profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant={'destructive'} type={'submit'}>
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
