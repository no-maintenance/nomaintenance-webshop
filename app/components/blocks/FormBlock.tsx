import type {BlockProps} from '~/components/blocks/BlockFactory';
import {useSettings} from '~/components/blocks/BlockFactory';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {Input} from '../ui/input';
import {Button} from '~/components/ui/button';
import {Textarea} from '~/components/ui/textarea';
import {SpacingWrapper} from '~/components/blocks/CustomizedSection';
import {Sizes} from '~/__generated__/hygraph.generated';
import {Popover, PopoverContent, PopoverTrigger} from '~/components/ui/popover';
import {cn} from '~/lib/utils';
import {CalendarIcon} from 'lucide-react';
import {format} from 'date-fns';
import {Calendar} from '~/components/ui/calendar';
import {Checkbox} from '~/components/ui/checkbox';
import {Link} from '~/components/Link';
import React from 'react';
import {InputWrapper} from '~/components/Form';
import clsx from 'clsx';
import {KLAVIYO_BASE_URL, KLAVIYO_COMPANY_ID} from '~/lib/const';
import {toast} from '~/components/ui/use-toast';

export function FormBlock({
  type,
  variant = 'standalone',
}: BlockProps<'Form'> & {
  variant?: 'default' | 'standalone' | 'embedded';
}) {
  const settings = useSettings();
  const {horizontalPadding, verticalPadding} = settings;
  const FormSwitcher = () => {
    switch (type) {
      case 'contact':
        return <ContactForm />;
      case 'appointments':
        return <AppointmentForm />;
      case 'newsletter':
        return <NewsletterForm />;
      default:
        return null;
    }
  };
  if (variant === 'standalone')
    return (
      <SpacingWrapper
        spacing={{horizontalPadding, verticalPadding: Sizes.None}}
        asChild
      >
        <div className={'max-w-3xl mx-auto px-gutter'}>
          <FormSwitcher />
        </div>
      </SpacingWrapper>
    );
  return <FormSwitcher />;
}

const contactFormSchema = z.object({
  name: z.string({
    required_error: 'Please include a name for us to address you',
  }),
  email: z
    .string({
      required_error: 'Please include an email for us to contact you.',
    })
    .email(),
  order: z.string(),
  subject: z.string(),
  message: z.string(),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      order: '',
      subject: '',
      message: '',
    },
  });
  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>First, Last Name</FormLabel>
              <FormControl>
                <Input placeholder="John Cena" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="support@nomaintenance.us" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({field}) => (
            <FormItem>
              <FormLabel>Order Number</FormLabel>
              <FormControl>
                <Input placeholder="#NM23814" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({field}) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({field}) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={'lg'}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

const appointmentFormSchema = z.object({
  name: z.string({
    required_error: 'Please include a name for us to address you',
  }),
  email: z
    .string({
      required_error: 'Please include an email for us to contact you.',
    })
    .email(),
  phone: z.string(),
  appointment: z.date({
    required_error: 'A preferred appointment time is required.',
  }),
  size: z.string({
    required_error:
      'Please include the party size. We can update this value later.',
  }),
  message: z.string(),
});

export function AppointmentForm() {
  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      size: '',
      message: '',
    },
  });
  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>First, Last Name</FormLabel>
              <FormControl>
                <Input placeholder="John Cena" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="support@nomaintenance.us" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({field}) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1-647-415-2313" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({field}) => (
            <FormItem>
              <FormLabel>Party Size</FormLabel>
              <FormControl>
                <Input placeholder="3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointment"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Availability</FormLabel>
              <FormDescription>
                We are available from 9 - 5 every day. Please provide 1 or more
                days that you&apos;re available for an appointment, then we will
                confirm a time for you to come in.
              </FormDescription>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal capitalize',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({field}) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={'lg'}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

const newsletterSchema = z.object({
  email: z
    .string({
      required_error: 'Please include an email for us to contact you.',
    })
    .email(),
  consent: z.boolean({
    required_error:
      'Please review and accept the terms and conditions to continue.',
  }),
});

export function NewsletterForm({
  hasSubmitBtn = true,
  id,
}: {
  hasSubmitBtn?: boolean;
  id?: string;
}) {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      consent: false,
    },
  });
  const isLoading = false;

  function onSubmit(data: z.infer<typeof newsletterSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  // const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
  //   const url = `${KLAVIYO_BASE_URL}/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`;
  //   const options = {
  //     method: 'POST',
  //     headers: {revision: '2023-02-22', 'content-type': 'application/json'},
  //     body: JSON.stringify({
  //       data: {
  //         type: 'subscription',
  //         attributes: {
  //           list_id: 'Wimtnj',
  //           custom_source: id,
  //           email: data.email,
  //         },
  //       },
  //     }),
  //   };
  //   fetch(url, options)
  //     .then((res) => {
  //       if (res.ok) {
  //         // analytics.trackEvent(AnalyticsFormEvents.MainNewsletterSignup, {
  //         //   location: 'footer',
  //         //   componentID: '9c448a26-16bf-4011-ba0a-1d651eebd649',
  //         // });
  //         // setSubmissionState('success');
  //         toast({
  //           title: 'You have been subscribed to our newsletter.',
  //           description:
  //             'We will keep you posted on upcoming promotions and releases.',
  //         });
  //       } else {
  //         toast({
  //           title: 'Uh oh! Something went wrong.',
  //           description: 'There was a problem with your request.',
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       toast({
  //         title: 'Uh oh! Something went wrong.',
  //         description: 'There was a problem with your request.',
  //       });
  //       // @TODO add sentry error
  //       console.error('error:' + err);
  //     });
  // };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              {/*<FormLabel>First, Last Name</FormLabel>*/}
              <FormControl>
                <div className={'relative'}>
                  <InputWrapper
                    showErrorMsg={false}
                    id={'email'}
                    label={'Newsletter'}
                  >
                    <input
                      data-1p-ignore
                      id={'email'}
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </InputWrapper>
                  {hasSubmitBtn && (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={
                        'absolute right-0 bottom-0 py-2 lg:pb-[6px] transform px-2'
                      }
                    >
                      {isLoading ? <p>Loading...</p> : 'Submit'}
                    </button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({field}) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to receive the newsletter. See more about our{' '}
                  <Link className={'underline'} to={'/policies/privacy-policy'}>
                    Privacy Policy
                  </Link>
                  .
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<button*/}
        {/*  type="submit"*/}
        {/*  disabled={isLoading}*/}
        {/*  className={' right-0 bottom-0 py-2 lg:pb-[6px] transform px-2'}*/}
        {/*>*/}
        {/*  {isLoading ? <p>Loading...</p> : 'Submit'}*/}
        {/*</button>*/}
      </form>
    </Form>
  );
}
