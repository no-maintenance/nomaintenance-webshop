import type {
  GetEntitiesQuery,
  type HeroesFragment,
  LockFragment,
} from '~/__generated__/hygraph.generated';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {
  calculateTimeLeft,
  Countdown,
  CounterSize,
  Timer,
} from '~/components/Countdown';
import {cn, isAfterDate} from '~/lib/utils';
import React, {Suspense} from 'react';
import {HeroFactory} from '~/components/Hero';
import {PageHeader} from '~/components/Text';
import {Await} from '@remix-run/react';
import {BlockFactory} from '~/components/blocks/BlockFactory';
import {ClientOnly} from '~/lib/client-only';

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
            'absolute bottom-1/2 md:bottom-20 left-1/2 -translate-x-1/2 md:-translate-y-0 translate-y-1/2'
          }
        >
          <ClientOnly
            fallback={
              <Timer time={calculateTimeLeft(scheduledUnlockTime).timeLeft} />
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
                  return <Timer time={timeLeft} size={CounterSize.Large} />;
                }}
              </Countdown>
            )}
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
