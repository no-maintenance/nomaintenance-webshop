import type {
  GetEntitiesQuery,
  type HeroesFragment,
  LockFragment,
} from '~/__generated__/hygraph.generated';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {Countdown, CounterSize, Timer} from '~/components/Countdown';
import {cn, isAfterDate} from '~/lib/utils';
import React, {Suspense, useEffect, useState} from 'react';
import {HeroFactory} from '~/components/Hero';
import {Heading, PageHeader} from '~/components/Text';
import {Await} from '@remix-run/react';
import {BlockFactory} from '~/components/blocks/BlockFactory';
import {ClientOnly} from '~/lib/client-only';
import {Button} from '~/components/ui/button';
import {Dialog, DialogContent, DialogTrigger} from '~/components/ui/dialog';
import {useForm} from 'react-hook-form';
import {KLAVIYO_BASE_URL, KLAVIYO_COMPANY_ID} from '~/lib/const';
import {Link} from '~/components/Link';
import {useMediaQuery} from 'usehooks-ts';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {toast} from '~/components/ui/use-toast';

export function LockScreen({
  lock,
  sections,
}: {
  lock: LockFragment;
  sections: Promise<GetEntitiesQuery> | null;
}) {
  const {background, scheduledUnlockTime, alwaysUnlockOnTime} = lock;
  if (lock.customLockScreen) {
    return (
      <>
        {lock.customLockScreen?.heroes && (
          <HeroFactory
            reverseLayout={!!lock.customLockScreen?.mirrorLayout}
            heroes={lock.customLockScreen.heroes as HeroesFragment[]}
          />
        )}
        {lock.customLockScreen?.displayTitle &&
          lock.customLockScreen?.title && (
            <PageHeader
              variant={'page'}
              heading={lock.customLockScreen.title}
            />
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
            if (isLive) {
              window.location.reload();
            }
            return null;
          }}
        </Countdown>
      </>
    );
  }
  return (
    <div className=" flex items-center flex-col justify-center min-h-screen relative">
      <div
        className={
          'relative h-full flex-1 w-full block md:pt-0 pt-32 md:flex md:flex-col items-center justify-center md:min-h-[620px] overflow-hidden'
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
            'absolute pt-16 lg:pt-20 xl:pt-24  md:pr-10 md:right-0 md:top-0 right-1/2 translate-x-1/2 md:-translate-x-0 bottom-10 text-white text-mid max-w-full px-gutter w-full md:w-auto'
          }
        >
          <NewsletterPopup />
          <a
            rel={'noreferrer'}
            target={'_blank'}
            className={'text-heading uppercase mt-2 block font-semibold ml-6'}
            href={'https://partiful.com/e/N8J5F6nyElwaowx1X0jb'}
          >
            RSVP: Los Angeles Launch Event
          </a>
        </div>
        <div
          className={
            'absolute bottom-1/2 md:bottom-20 left-1/2 -translate-x-1/2 md:-translate-y-0 translate-y-1/2'
          }
        >
          <ClientOnly fallback={null}>
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
                            'font-bold uppercase text-background text-mid'
                          }
                        >
                          Web shop is closed
                        </h2>
                      </div>
                    </div>
                  );
                }}
              </Countdown>
            )}
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}

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
        <DialogTrigger
          className={
            'uppercase text-heading decoration-1 underline font-semibold  flex items-center cursor-pointer'
          }
        >
          Sign up for Newsletter
        </DialogTrigger>
        <DialogContent variant={'tall'} className={'rounded-lg'}>
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
      <DrawerTrigger
        className={
          'uppercase text-heading decoration-1 underline font-semibold  flex items-center cursor-pointer'
        }
      >
        Sign up for Newsletter
      </DrawerTrigger>
      <DrawerContent className={'p-gutter'}>
        <DrawerHeader className={'mt-2 mb-4'}>
          <DrawerTitle>NOMAINTENANCE</DrawerTitle>
          <DrawerDescription>
            Sign up for our newsletter to receive updates on new releases,
            restocks, and more.
          </DrawerDescription>
        </DrawerHeader>
        <form className={'newsletter__form'} onSubmit={handleSubmit(onSubmit)}>
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
