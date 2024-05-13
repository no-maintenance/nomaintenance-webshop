import {type ComponentProps, useEffect, useRef} from 'react';

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {CartForm} from '@shopify/hydrogen';
import type {BaseI18n, I18n} from '~/i18n';
import {localizePath, navigateToLocale, useLocale} from '~/i18n';
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
import {Localizations} from '~/components/LocaleSelector';

const FormSchema = z.object({
  language: z.string().optional(),
  country: z.string().optional(),
});

export const CountrySelector = () => (
  <Localizations>
    {({localizations}) => <CountrySelect localizations={localizations} />}
  </Localizations>
);

function CountrySelect({
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
  }, [fetcher]);
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
          defaultValue={JSON.stringify({
            isDefault: Boolean(country?.isDefault),
            code: country.code,
          })}
          control={form.control}
          name="country"
          render={({field}) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue />
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
      </form>
    </Form>
  );
}
