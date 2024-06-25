import {type ComponentProps, useEffect, useRef, lazy} from 'react';
import {useMediaQuery} from 'usehooks-ts';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {IconGlobe} from '~/components/Icon';
import {Button} from '~/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {CartForm} from '@shopify/hydrogen';
import type {BaseI18n, I18n} from '~/i18n';
import {navigateToLocale, localizePath, useLocale} from '~/i18n';
import {Form, FormField, FormItem, FormLabel} from '~/components/ui/form';
import {cn, subfolderLocaleParser} from '~/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import type {Localizations as AsyncLocalizations} from '~/components/AsyncLocalizations';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import {useFetcher} from '@remix-run/react';

export const Localizations = lazy(() =>
  import('~/components/AsyncLocalizations').then((mod) => ({
    default: mod.AsyncLocalizations,
  })),
);

export function LocaleSelector({
  open,
  onChange,
}: {
  onChange: () => void;
  open: boolean;
}) {
  // const isDesktop = useMediaQuery('(min-width: 768px)'); @todo fix hydration error for useIsomorphicLayoutEffect
  const isDesktop = true;
  const title = 'Choose Country';
  const description =
    'Select your country where your order will be shipped. This will provide you the correct language, pricing and shipping costs.';
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(o) => o !== open && onChange()}>
        <DialogTrigger>
          <IconGlobe
            className={'cursor-pointer'}
            fill={'transparent'}
            width={'100%'}
            height={'100%'}
            viewBox={'0 0 24 24'}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <Localizations>
            {({localizations}) => <LocaleForm localizations={localizations} />}
          </Localizations>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(o) => o !== open && onChange()}>
      <DrawerTrigger>
        <IconGlobe
          className={'cursor-pointer'}
          fill={'transparent'}
          width={'100%'}
          height={'100%'}
          viewBox={'0 0 24 24'}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <Localizations>
          {({localizations}) => (
            <LocaleForm className="px-4" localizations={localizations} />
          )}
        </Localizations>
        <div className={'p-4'}>
          <DrawerClose asChild>
            <Button className={'w-full'} variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const FormSchema = z.object({
  language: z.string().optional(),
  country: z.string().optional(),
});

function LocaleForm({
  className,
  localizations,
}: ComponentProps<'form'> & {localizations: AsyncLocalizations | null}) {
  const i18n = useLocale();
  const {language, country, isDefault} = i18n;
  const selectedLocale = useRef<I18n>(i18n);

  const fetcher = useFetcher();
  const buyerIdentityUpdate = fetcher.data?.cart?.id;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  useEffect(() => {
    if (!buyerIdentityUpdate) {
      return;
    }
    navigateToLocale(selectedLocale.current);
  }, [buyerIdentityUpdate, fetcher]);
  if (!localizations) return <p>Loading...</p>;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const form = new FormData();
    const {country: cSelect, language} = data;
    const selectedLanguage = language ? language : i18n.language.code;
    const selectedCountry = cSelect
      ? (JSON.parse(cSelect) as BaseI18n['country'])
      : country;
    const prefix = subfolderLocaleParser({
      country: selectedCountry.code,
      language: selectedLanguage,
    });

    selectedLocale.current = {
      country: selectedCountry,
      isDefault: selectedCountry.isDefault,
      language: {
        code: selectedLanguage,
      },
      prefix,
    } as I18n;
    const variables = {
      action: CartForm.ACTIONS.BuyerIdentityUpdate,
      inputs: {
        buyerIdentity: {
          countryCode: selectedCountry?.code.toUpperCase(),
        },
        redirectTo: localizePath('/cart', selectedLocale.current),
      },
    };
    form.append('cartFormInput', JSON.stringify(variables));

    // update the country code in the cart's buyer identity
    fetcher.submit(form, {
      method: 'POST',
      action: localizePath('/cart', selectedLocale.current),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid items-start gap-4', className)}
      >
        <FormField
          defaultValue={!isDefault ? language.code : ''}
          control={form.control}
          name="language"
          render={({field}) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={'Select a Language'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'EN'}>English</SelectItem>
                  <SelectItem value={'JA'}>日本語</SelectItem>
                  <SelectItem value={'DE'}>Deutsch</SelectItem>
                  <SelectItem value={'KO'}>한국어</SelectItem>
                  <SelectItem value={'IT'}>Italiano</SelectItem>
                  <SelectItem value={'FR'}>Français</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          defaultValue={
            !isDefault
              ? JSON.stringify({
                  isDefault: Boolean(country?.isDefault),
                  code: country.code,
                })
              : ''
          }
          control={form.control}
          name="country"
          render={({field}) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  {localizations &&
                    localizations.map((country) => {
                      return (
                        <SelectItem
                          key={country.code}
                          value={JSON.stringify({
                            isDefault: Boolean(country?.isDefault),
                            code: country.code,
                          })}
                        >
                          {getUnicodeFlagIcon(country.code)}
                          &nbsp;
                          {country.name}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" className={'mt-4'}>
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
