import type {
  GetEntitiesQuery,
  type HeroesFragment,
  LockFragment,
} from '~/__generated__/hygraph.generated';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {
  Countdown,
  CounterSize,
  Timer,
  useCountdown,
} from '~/components/Countdown';
import {cn, isAfterDate} from '~/lib/utils';
import React, {Suspense, useEffect, useMemo, useState} from 'react';
import {HeroFactory} from '~/components/Hero';
import {Heading, PageHeader} from '~/components/Text';
import {Await, Form, useActionData} from '@remix-run/react';
import {BlockFactory} from '~/components/blocks/BlockFactory';
import {ClientOnly} from '~/lib/client-only';
import {Button} from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {useForm} from 'react-hook-form';
import {KLAVIYO_BASE_URL, KLAVIYO_COMPANY_ID} from '~/lib/const';
import {Link} from '~/components/Link';
import {useMediaQuery} from 'usehooks-ts';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {toast} from '~/components/ui/use-toast';
import {AppointmentForm, newsletterSchema} from '~/components/blocks/FormBlock';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import type {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form as HookForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import {Input} from '~/components/ui/input';
import {Checkbox} from '~/components/ui/checkbox';
import {useBaseLayoutData} from '~/routes/($locale)+/_layout';
import {AnimatePresence, m, useAnimationControls} from 'framer-motion';
import {useCopyToClipboard} from 'react-use';
import logo from '~/assets/logo.png?url';
import {useFocus} from '~/hooks/useFocus';

function CustomLockScreen({
  lock,
  sections,
}: {
  lock: LockFragment;
  sections: Promise<GetEntitiesQuery>;
}) {
  const {background, scheduledUnlockTime, alwaysUnlockOnTime} = lock;
  return (
    <>
      {lock.customLockScreen?.heroes && (
        <HeroFactory
          reverseLayout={!!lock.customLockScreen?.mirrorLayout}
          heroes={lock.customLockScreen.heroes as HeroesFragment[]}
        />
      )}
      {lock.customLockScreen?.displayTitle && lock.customLockScreen?.title && (
        <PageHeader variant={'page'} heading={lock.customLockScreen.title} />
      )}
      <div
        className={cn(
          !lock.customLockScreen?.heroes &&
            !lock.customLockScreen?.displayTitle &&
            !lock.customLockScreen?.title &&
            'pt-gutter mt-gutter',
        )}
      >
        <Suspense fallback={null}>
          <Await resolve={sections}>
            {(b) => b && <BlockFactory blocks={b as GetEntitiesQuery} />}
          </Await>
        </Suspense>
      </div>
      <Countdown
        launchDate={scheduledUnlockTime}
        isLiveAtInit={isAfterDate(scheduledUnlockTime)}
      >
        {({timeLeft, isLive}) => {
          if (isLive && alwaysUnlockOnTime) {
            window.location.reload();
          }
          return null;
        }}
      </Countdown>
    </>
  );
}

function CountdownLockScreen({lock}: {lock: LockFragment}) {
  const {background, scheduledUnlockTime, alwaysUnlockOnTime} = lock;
  return (
    <div className=" flex items-center flex-col justify-center min-h-screen relative">
      <div
        className={
          'relative h-full max-h-screen flex-1 w-full block md:pt-0 pt-32 md:flex md:flex-col items-center justify-center md:min-h-[620px] overflow-hidden'
        }
      >
        <div className={'block'}>
          {background && (
            <HygraphMultiMedia
              className={'absolute top-0 left-0 h-full w-full object-cover'}
              media={[background]}
            />
          )}
        </div>
        <div
          className={
            'absolute max-w-[500px] pt-16 lg:pt-20 xl:pt-24  md:pr-10 md:right-0 md:top-0 right-1/2 translate-x-1/2 md:-translate-x-0 bottom-40 text-white text-mid max-w-full px-gutter w-full md:w-auto md:text-left text-center'
          }
        >
          <h1 className={'text-heading uppercase mt-2 block font-semibold'}>
            Web Shop is Closed
          </h1>
          <NewsletterPopup />
          <div className={'md:hidden block pt-16'}>
            <AppointmentDrawer />
          </div>
        </div>
        <div
          className={
            'absolute bottom-1/2 left-1/2 -translate-x-1/2  translate-y-1/2'
          }
        >
          <ClientOnly
            fallback={
              <div
                className={
                  'xl:h-[86px] lg:h-[70px] sm:h-[108px] h-[93px] w-full'
                }
              ></div>
            }
          >
            {() => (
              <Countdown
                launchDate={scheduledUnlockTime}
                isLiveAtInit={isAfterDate(scheduledUnlockTime)}
              >
                {({timeLeft, isLive}) => {
                  if (isLive) {
                    window.location.reload();
                  }
                  return (
                    <div>
                      <Timer time={timeLeft} size={CounterSize.Large} />
                      <div className={'text-center'}>
                        <h2
                          className={
                            'font-light tracking-widest uppercase text-background text-mid'
                          }
                        >
                          Until Our Private Sale Begins
                        </h2>
                      </div>
                    </div>
                  );
                }}
              </Countdown>
            )}
          </ClientOnly>
        </div>
        <div className={'absolute bottom-28 md:block hidden'}>
          <AppointmentPopup />
        </div>
      </div>
    </div>
  );
}

function PasswordLockScreen({lock}: {lock: LockFragment}) {
  const {
    background,
    scheduledUnlockTime,
    alwaysUnlockOnTime,
    password,
    alwaysUnlockForAuthenticatedUser,
  } = lock;
  const controls = useAnimationControls();
  const {hasLockPassword} = useBaseLayoutData();
  const [timeLeft, isLive] = useCountdown(scheduledUnlockTime);
  const isProtected = useMemo(() => {
    if (
      (hasLockPassword && alwaysUnlockForAuthenticatedUser) ||
      (alwaysUnlockOnTime && isLive) ||
      (isLive && !password) ||
      (!scheduledUnlockTime && hasLockPassword && password) ||
      (isLive && hasLockPassword)
    ) {
      return false;
    }
    return true;
  }, [isLive, hasLockPassword]);
  useEffect(() => {
    const queueExitAnimation = async () => {
      await controls.start({opacity: 0, transition: {duration: 0.5}});
      window.location.reload();
    };
    if (!isProtected) {
      queueExitAnimation();
    }
  }, [isProtected]);

  const [pastDate, setPastDate] = useState<boolean>(
    isAfterDate(scheduledUnlockTime),
  );
  return (
    <m.div animate={controls}>
      <img
        alt={'logo for No Maintenance'}
        className={
          'mx-auto md:absolute top-0 left-0 block w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] z-10'
        }
        src={logo}
      />
      <section
        className={
          'px-gutter text-background text-center space-y-8 md:space-y-12 w-full  md:pt-80'
        }
      >
        <div className={'space-y-6'}>
          <Heading
            as={'h1'}
            className={'tracking-widest uppercase mx-auto text-center'}
          >
            Summer &#39;24
          </Heading>
          <PasswordForm lock={lock} />
        </div>

        {isLive ? (
          <hgroup>
            <Heading
              as={'h2'}
              className={'uppercase text-oversize font-semibold'}
            >
              Now Live
            </Heading>
            <h3
              className={
                'font-light tracking-widest uppercase text-background text-mid'
              }
            >
              Register for the mailing list to receive access
            </h3>
          </hgroup>
        ) : (
          <div className={'xl:h-[86px] lg:h-[71px] h-[108px] w-full'}>
            <ClientOnly fallback={null}>
              {() => <Counter lock={lock} />}
            </ClientOnly>
          </div>
        )}
        <NewsletterForm password={lock.password} submitBtn={'Submit'} />
        <AppointmentResponsiveDialog />
      </section>
    </m.div>
  );
}

function Counter({lock}: {lock: LockFragment}) {
  const {scheduledUnlockTime} = lock;
  return (
    <Countdown
      launchDate={scheduledUnlockTime}
      isLiveAtInit={isAfterDate(scheduledUnlockTime)}
    >
      {({timeLeft, isLive}) => {
        return (
          <div>
            <Timer time={timeLeft} size={CounterSize.Large} />
            <div className={'text-center'}>
              <h2
                className={
                  'font-light tracking-widest uppercase text-background text-mid'
                }
              >
                Time Until Private Sale
              </h2>
            </div>
          </div>
        );
      }}
    </Countdown>
  );
}

function PasswordForm({lock}: {lock: LockFragment}) {
  const {hasLockPassword} = useBaseLayoutData();
  const controls = useAnimationControls();
  const actionData = useActionData();
  const [pwRef, setFocus] = useFocus<HTMLInputElement>();

  const [hasPw, setHasPw] = useState<boolean>(hasLockPassword);

  useEffect(() => {
    if (pwRef?.current) {
      pwRef.current.value = '';
    }
    if (actionData?.status === 200) {
      setHasPw(true);
    } else {
      if (actionData?.status === 401 || actionData?.status === 500) {
        setFocus();
        controls.start({
          x: [0, -5, 5, -5, 5, 0],
          transition: {duration: 0.3},
        });
      }
      if (actionData?.status === 401) {
        toast({
          variant: 'destructive',
          title: 'Incorrect Password',
          description: 'Please double check your password and try again.',
        });
      }
    }
  }, [actionData]);

  return (
    <div className={'transition-all'}>
      {hasPw ? (
        <p className={'max-w-lg w-full mx-auto'}>
          You have now unlocked sale access and are in the queue. Please check
          back here when the sale begins.
        </p>
      ) : (
        <m.div animate={controls} className=" w-full  max-w-2xl mx-auto">
          <Form method={'post'} className={'space-y-4'}>
            <input type={'hidden'} name={'lock_id'} value={lock.id} />
            <FormItem>
              <Input
                ref={pwRef}
                type={'password'}
                name={'password'}
                className={
                  'border-l-0 border-r-0 border-t-0 rounded-none text-lead !placeholder-background pl-0 focus:pl-3'
                }
                placeholder="Enter Password"
              />
            </FormItem>
            <Button
              type="submit"
              size="lg"
              className={
                'w-full  bg-background hover:bg-transparent hover:text-background text-foreground border-background hover:border'
              }
            >
              Enter The Sale
            </Button>
          </Form>
        </m.div>
      )}
    </div>
  );
}

export function LockScreen({
  lock,
  sections,
}: {
  lock: LockFragment;
  sections: Promise<GetEntitiesQuery> | null;
}) {
  const Switcher = () => {
    if (lock.customLockScreen) {
      return <CustomLockScreen lock={lock} sections={sections} />;
    }
    if (lock.password) {
      return <PasswordLockScreen lock={lock} />;
    }

    return <CountdownLockScreen lock={lock} />;
  };
  return (
    <div className={'bg-foreground min-h-screen'}>
      <Switcher />
    </div>
  );
}

const AppointmentResponsiveDialog = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className={
              'text-heading font-semibold underline decoration-1 underline-offset-8 uppercase text-background'
            }
          >
            Book an Appointment to Shop in Person
          </button>
        </DialogTrigger>
        <DialogContent variant="wide">
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
            <DialogDescription>
              Our showroom is open by appointment only, Monday through Thursday.
              To schedule your visit, please contact us with your preferred date
              and time.
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm submitBtn={'Book Now'} />
        </DialogContent>
      </Dialog>
    );
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className={
            'text-mid font-light tracking-widest mx-auto underline decoration-1 underline-offset-8 uppercase text-background'
          }
        >
          Book an Appointment to Shop in Person
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Book An Appointment</DrawerTitle>
          <DrawerDescription>
            Our showroom is open by appointment only, Monday through Thursday.
            To schedule your visit, please contact us with your preferred date
            and time.
          </DrawerDescription>
        </DrawerHeader>
        <div className={'max-h-[75vh] overflow-y-auto px-gutter'}>
          <AppointmentForm submitBtn={'Book Now'} />
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
const AppointmentPopup = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={
            'text-heading font-semibold underline decoration-1 underline-offset-8 uppercase text-background'
          }
        >
          Book an Appointment to Shop in Person
        </button>
      </DialogTrigger>
      <DialogContent variant="wide">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>
            Our showroom is open by appointment only, Monday through Thursday.
            To schedule your visit, please contact us with your preferred date
            and time.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm submitBtn={'Book Now'} />
      </DialogContent>
    </Dialog>
  );
};

const AppointmentDrawer = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className={
            'text-mid font-light tracking-widest mx-auto underline decoration-1 underline-offset-8 uppercase text-background'
          }
        >
          Book an Appointment to Shop in Person
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Book An Appointment</DrawerTitle>
          <DrawerDescription>
            Our showroom is open by appointment only, Monday through Thursday.
            To schedule your visit, please contact us with your preferred date
            and time.
          </DrawerDescription>
        </DrawerHeader>
        <div className={'max-h-[75vh] overflow-y-auto px-gutter'}>
          <AppointmentForm submitBtn={'Book Now'} />
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<
    'unsubmitted' | 'success' | 'error'
  >('unsubmitted');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  // @todo refactor forms to create react-hook-forms helper lib
  const {
    reset,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<{email: string; consent: number}>();
  const onSubmit = (data: {email: string; consent: number}) => {
    const url = `${KLAVIYO_BASE_URL}/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`;

    const options = {
      method: 'POST',
      headers: {revision: '2023-02-22', 'content-type': 'application/json'},
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            list_id: 'Wimtnj',
            custom_source: 'popup',
            email: data.email,
          },
        },
      }),
    };
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          // analytics.trackEvent(AnalyticsFormEvents.MainNewsletterSignup, {
          //   location: 'popup',
          //   componentID: 'popup_v1.0',
          // });
          setSubmissionState('success');
          reset();
        } else {
          setSubmissionState('error');
        }
      })
      .catch((err) => {
        setSubmissionState('error');
        console.error('error:' + err);
      });
  };
  useEffect(() => {
    if (submissionState === 'success') {
      setIsOpen(false);
      toast({
        title: 'You are now subscribed to our newsletter.',
        description: 'We will keep you posted on our upcoming drops.',
      });
    }
  }, [submissionState, isOpen]);
  const ErrorHandler = () => {
    if (errors.email)
      return <p className={'text-error text-copy'}>{errors.email.message}</p>;
    if (errors.consent)
      return (
        <p className={'text-error text-copy'}>Policy consent is required.</p>
      );
    return <span className={'grow'}></span>;
  };
  if (isDesktop)
    return (
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <span
            className={
              'uppercase text-heading decoration-1 underline font-light mx-auto cursor-pointer'
            }
          >
            Sign up for our Mailing List to Receive Access
          </span>
        </DialogTrigger>
        <DialogContent variant="tall" className={'rounded-lg'}>
          <VisuallyHidden>
            <DialogTitle>Newsletter Form</DialogTitle>
          </VisuallyHidden>
          <div className={'text-center flex flex-col'}>
            <Heading as={'h2'} className={'pt-16'} size={'mid'}>
              NOMAINTENANCE
            </Heading>
            <p className={'text-lead py-16'}>
              Sign up for our newsletter to receive updates on new releases,
              restocks, and more.
            </p>
            <section className={'newsletter w-full  max-w-full h-full'}>
              <form
                className={'newsletter__form h-full flex flex-col'}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={'mb-2 flex relative'}>
                  <input
                    className={`ga-email input text-copy w-full  focus:shadow-none autofill:!bg-transparent  ${
                      errors.email
                        ? 'border-b-error focus:border-error'
                        : 'focus:border-primary'
                    }`}
                    type="email"
                    placeholder="Email Address"
                    {...register('email', {
                      required: 'Please enter your email.',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email is invalid.',
                      },
                    })}
                  />
                </div>
                <div className={'pt-4 text-left'}>
                  <label
                    className={
                      'cursor-pointer text-light text-copy inline-flex '
                    }
                  >
                    <input
                      type={'checkbox'}
                      className={`bg-transparent h-4 w-4 ${
                        errors.consent &&
                        'border-destructive ring-destructive focus:ring-destructive'
                      }`}
                      {...register('consent', {required: true})}
                    />
                    <span className={'pl-2 -mt-[3px]'}>
                      I agree to receive the newsletter. See more about our{' '}
                      <Link
                        className={'animated-underline'}
                        to={'/policies/privacy-policy'}
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
                <div className={'flex-1'}></div>
                <div className={'pt-12 relative'}>
                  <p className={' text-left text-fine font-light'}>
                    We process your personal data as stated in our{' '}
                    <Link to={'/pages/privacy-policy'}>Privacy Policy</Link>.
                    You may withdraw your consent at any time by clicking the
                    unsubscribe link at the bottom of any of our marketing
                    emails, or by emailing us at{' '}
                    <a
                      href={'mailto:support@nomaintenance.us'}
                      className={'underline '}
                    >
                      support@nomaintenance.us
                    </a>
                    .
                  </p>
                  <div className={'pt-4'}>
                    <Button
                      type="submit"
                      value={1}
                      className={
                        'w-full bg-[#6A6054] rounded text-lead py-4 text-white mb-4'
                      }
                    >
                      SUBSCRIBE
                    </Button>
                  </div>
                </div>
              </form>
              {submissionState == 'error' && (
                <p className={'text-destructive mb-4'}>
                  Sorry, we are not able to register you at this time. Please
                  try again later.
                </p>
              )}
            </section>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <span
          className={
            'uppercase text-heading decoration-1 mx-auto underline font-light cursor-pointer'
          }
        >
          Sign up for our Mailing List to Receive Access
        </span>
      </DrawerTrigger>
      <DrawerContent className={'py-gutter'}>
        <DrawerHeader className={'mt-2 mb-4'}>
          <DrawerTitle>NOMAINTENANCE</DrawerTitle>
          <DrawerDescription>
            Sign up for our newsletter to receive updates on new releases,
            restocks, and more.
          </DrawerDescription>
        </DrawerHeader>
        <form
          className={'newsletter__form px-gutter'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={'mb-2 flex relative'}>
            <input
              className={`ga-email input text-copy w-full  focus:shadow-none autofill:!bg-transparent  ${
                errors.email
                  ? 'border-b-error focus:border-destructive'
                  : 'focus:border-primary'
              }`}
              type="email"
              placeholder="Email Address"
              {...register('email', {
                required: 'Please enter your email.',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email is invalid.',
                },
              })}
            />
          </div>
          <div className={'pt-4 text-left'}>
            <label
              className={'cursor-pointer text-light text-copy inline-flex '}
            >
              <input
                type={'checkbox'}
                className={`bg-transparent h-4 w-4 ${
                  errors.consent &&
                  'border-destructive ring-destructive focus:ring-destructive'
                }`}
                {...register('consent', {required: true})}
              />
              <span className={'pl-2 -mt-[3px]'}>
                I agree to receive the newsletter. See more about our{' '}
                <Link
                  className={'animated-underline'}
                  to={'/policies/privacy-policy'}
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>
          <div className={'flex-1'}></div>
          <div className={'pt-12 relative'}>
            {submissionState == 'error' && (
              <p className={'text-destructive mb-4'}>
                Sorry, we are not able to register you at this time. Please try
                again later.
              </p>
            )}
            <p className={' text-left text-fine font-light'}>
              We process your personal data as stated in our{' '}
              <Link to={'/pages/privacy-policy'}>Privacy Policy</Link>. You may
              withdraw your consent at any time by clicking the unsubscribe link
              at the bottom of any of our marketing emails, or by emailing us at{' '}
              <a
                href={'mailto:support@nomaintenance.us'}
                className={'underline '}
              >
                support@nomaintenance.us
              </a>
              .
            </p>
            <div className={'pt-4 flex gap-4 mt-2'}>
              <Button type="submit" value={1} className={'mb-4 flex-1'}>
                SUBSCRIBE
              </Button>
              <DrawerClose className={'flex-1'} asChild>
                <Button variant={'outline'}>Close</Button>
              </DrawerClose>
            </div>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

function NewsletterForm({
  hasSubmitBtn = true,
  id,
  submitBtn,
  password,
}: {
  submitBtn: string;
  hasSubmitBtn?: boolean;
  id?: string;
  password: string;
}) {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      consent: false,
    },
  });
  const [subscribed, setSubscribed] = useState(false);
  const [copiedText, copy] = useCopyToClipboard();
  const [showCopiedToClipboardCB, setShowCopiedToClipboardCB] = useState(false);
  const isLoading = false;
  const onSubmit = (data: z.infer<typeof newsletterSchema>) => {
    const url = `${KLAVIYO_BASE_URL}/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`;
    const options = {
      method: 'POST',
      headers: {revision: '2023-02-22', 'content-type': 'application/json'},
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            list_id: 'Wimtnj',
            custom_source: id,
            email: data.email,
          },
        },
      }),
    };
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          // analytics.trackEvent(AnalyticsFormEvents.MainNewsletterSignup, {
          //   location: 'footer',
          //   componentID: '9c448a26-16bf-4011-ba0a-1d651eebd649',
          // });
          // setSubmissionState('success');
          form.reset();
          setSubscribed(true);
          toast({
            title: 'You are now subscribed to our newsletter.',
            description:
              'We will keep you posted on upcoming promotions and releases.',
          });
        } else {
          toast({
            title: 'Uh oh! Something went wrong.',
            description:
              'There was a problem with your request. Please try again later.',
          });
        }
      })
      .catch((err) => {
        toast({
          title: 'Uh oh! Something went wrong.',
          description:
            'There was a problem with your request. Please try again later.',
        });
        // @TODO add sentry error
        console.error('error:' + err);
      });
  };

  function copyPassword() {
    copy(password);
    setShowCopiedToClipboardCB(true);
    setTimeout(() => {
      setShowCopiedToClipboardCB(false);
    }, 2000);
  }

  return (
    <HookForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:h-[122px] h-[111px] space-y-4 max-w-2xl mx-auto w-full text-left"
      >
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <div className={'h-[21px]'}>
                <AnimatePresence>
                  {!subscribed && (
                    <m.div animate={{opacity: 1}} exit={{opacity: 0}}>
                      <FormLabel>
                        Sign up to receive the password for the private sale
                      </FormLabel>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              <FormControl>
                <div
                  className={
                    'border border-background text-mid flex justify-between items-center h-[41px] '
                  }
                >
                  <AnimatePresence>
                    {subscribed ? (
                      <Heading
                        as={'h3'}
                        className={
                          'font-semibold uppercase text-center mx-auto cursor-pointer h-full text-mid flex justify-center items-center'
                        }
                        onClick={() => copyPassword()}
                      >
                        <AnimatePresence>
                          {showCopiedToClipboardCB ? (
                            <m.span
                              initial={{opacity: 0}}
                              animate={{opacity: 1}}
                              exit={{opacity: 0}}
                            >
                              Copied to Clipboard
                            </m.span>
                          ) : (
                            <m.span
                              initial={{opacity: 0}}
                              animate={{opacity: 1}}
                              exit={{opacity: 0}}
                            >
                              Password: {password}
                            </m.span>
                          )}
                        </AnimatePresence>
                      </Heading>
                    ) : (
                      <>
                        <input
                          className={
                            'h-full flex-1 bg-transparent border-l-0 border-y-0 text-mid font-semibold  placeholder-background py-2 border-r border-background'
                          }
                          data-1p-ignore
                          placeholder={'Email Address'}
                          {...field}
                        />

                        <button
                          type="submit"
                          disabled={isLoading}
                          className={
                            ' px-5 outline-offset-0  h-full flex-shrink-0 font-semibold'
                          }
                        >
                          {isLoading ? <p>Loading...</p> : submitBtn}
                        </button>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={'h-[14px]'}>
          <AnimatePresence>
            {!subscribed && (
              <m.div animate={{opacity: 1}} exit={{opacity: 0}}>
                <FormField
                  control={form.control}
                  name="consent"
                  render={({field}) => (
                    <FormItem>
                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to receive the newsletter. See more about
                            our{' '}
                            <Link
                              className={'underline'}
                              to={'/policies/privacy-policy'}
                            >
                              Privacy Policy
                            </Link>
                            .
                          </FormLabel>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </HookForm>
  );
}
