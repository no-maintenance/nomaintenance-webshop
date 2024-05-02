import {BlockProps, useSettings} from '~/components/blocks/BlockFactory';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {
  Form,
  FormControl,
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

export function FormBlock({
  type,
  variant = 'standalone',
}: BlockProps<'Form'> & {
  variant?: 'default' | 'standalone';
}) {
  const settings = useSettings();
  const {horizontalPadding, verticalPadding} = settings;
  const FormSwitcher = () => {
    switch (type) {
      case 'contact':
        return <ContactForm />;
      case 'appointments':
        return <></>;
      case 'newsletter':
        return <></>;
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

const formSchema = z.object({
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
