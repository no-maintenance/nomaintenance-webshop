import type {BlockProps} from '~/components/blocks/BlockFactory';
import {Countdown, Timer} from '~/components/Countdown';
import {isAfterDate} from '~/lib/utils';
import {ClientOnly} from '~/lib/client-only';
import React from 'react';
import {Heading} from '~/components/Text';

export function Lock({scheduledUnlockTime}: BlockProps<'Lock'>) {
  return (
    <div className={'py-gutter'}>
      <ClientOnly>
        {() => (
          <Countdown
            launchDate={scheduledUnlockTime}
            isLiveAtInit={isAfterDate(scheduledUnlockTime)}
          >
            {({timeLeft, isLive}) => {
              return (
                <Timer className={'text-foreground md:pb-0'} time={timeLeft} />
              );
            }}
          </Countdown>
        )}
      </ClientOnly>
      <Heading
        size={'lead'}
        as={'h2'}
        className={'text-center font-semibold text-red-500 w-full mx-auto'}
      >
        CLOSING SOON — SALE UP TO 70% OFF
      </Heading>
    </div>
  );
}
