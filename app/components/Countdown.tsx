import type {ReactNode} from 'react';
import {createElement, Fragment, useEffect, useMemo, useState} from 'react';

import {cn} from '~/lib/utils';
import {Heading} from '~/components/Text';

export type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
type CountdownProps = {
  isLiveAtInit: boolean;
  launchDate: string;
  children: ({
    timeLeft,
    isLive,
  }: {
    timeLeft: Time;
    isLive: boolean;
  }) => ReactNode;
};

export enum TimerVariants {
  Ticker,
}

export enum CounterSize {
  Small,
  Large,
}

type TimerProps = {
  time: Time;
  variant?: TimerVariants;
  size?: CounterSize;
  className?: string;
};

export function calculateTimeLeft(end: string) {
  const difference = +new Date(end) - +new Date();
  let isLive = false;
  let timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    isLive = true;
    timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  return {timeLeft, isLive};
}

export const Countdown = ({
  launchDate,
  isLiveAtInit,
  children,
}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(launchDate).timeLeft,
  );
  const [isLive, setIsLive] = useState<boolean>(isLiveAtInit);
  useEffect(() => {
    const timer = setTimeout(() => {
      const {timeLeft, isLive} = calculateTimeLeft(launchDate);
      setTimeLeft(timeLeft);
      setIsLive(isLive);
    }, 1000);

    return () => clearTimeout(timer);
  });

  return createElement(
    Fragment,
    null,
    useMemo(() => {
      return children({timeLeft, isLive});
    }, [timeLeft, isLive, children]),
  );
};

export function Timer({
  time,
  variant = TimerVariants.Ticker,
  size = CounterSize.Large,
  className,
}: TimerProps) {
  switch (variant) {
    case TimerVariants.Ticker:
    default:
      return <VerboseTimer className={className} time={time} size={size} />;
  }
}

function VerboseTimer({time, size, className}: Omit<TimerProps, 'variant'>) {
  const {days, hours, minutes, seconds} = time;
  const labelStyles = cn('hidden', CounterSize.Large === size && 'lg:inline');
  const separatorStyles = cn('separator lg:pl-2');
  return (
    <div
      className={cn(
        size === CounterSize.Large && 'timer-large',
        size === CounterSize.Small && 'timer-small',
        !days && 'with-seconds',
        'flex justify-center py-2 md:pb-8 flex-nowrap text-background font-bold timer',
        className,
      )}
    >
      {days ? (
        <>
          <div>
            <h3 className={'uppercase pt-2 lg:pt-1 whitespace-nowrap'}>
              {addZeroes(days)}
              <span className={labelStyles}>{days === 1 ? 'Day' : 'Days'}</span>
            </h3>
          </div>
          <div className={separatorStyles}>:</div>
        </>
      ) : (
        <></>
      )}
      <div>
        <h3 className={'uppercase pt-2 lg:pt-1 whitespace-nowrap'}>
          {addZeroes(hours)}
          <span className={labelStyles}>{hours === 1 ? 'Hour' : 'Hours'}</span>
        </h3>
      </div>
      <div className={separatorStyles}>:</div>
      <div>
        <h3 className={'uppercase pt-2 lg:pt-1 whitespace-nowrap'}>
          {addZeroes(minutes)}
          <span className={labelStyles}>
            {minutes === 1 ? 'Minute' : 'Minutes'}
          </span>
        </h3>
      </div>
      <div className={separatorStyles}>:</div>
      <div>
        <h3 className={`uppercase pt-2 lg:pt-1 whitespace-nowrap`}>
          {addZeroes(seconds)}
          <span className={labelStyles}>Seconds</span>
        </h3>
      </div>
    </div>
  );
}

export function CompactTimer({time, size}: Omit<TimerProps, 'variant'>) {
  return (
    <div>
      <div className={'flex justify-between pt-2 pb-8'}>
        <div>
          <span className={'text-mid font-light'}>{time.days}</span>
          <Heading
            as={'h3'}
            size={'mid'}
            className={'uppercase pt-2 font-light text-mid'}
          >
            Days
          </Heading>
        </div>
        <div>
          <span className={'text-mid font-light'}>{time.hours}</span>
          <Heading
            as={'h3'}
            size={'mid'}
            className={'uppercase pt-2 font-light text-mid'}
          >
            Hours
          </Heading>
        </div>
        <div>
          <span className={'text-mid font-light'}>{time.minutes}</span>
          <Heading
            as={'h3'}
            size={'mid'}
            className={'uppercase pt-2 font-light text-mid'}
          >
            Minutes
          </Heading>
        </div>
        <div>
          <span className={'text-mid font-light'}>{time.seconds}</span>
          <Heading
            as={'h3'}
            size={'mid'}
            className={'uppercase pt-2 font-light text-mid'}
          >
            Seconds
          </Heading>
        </div>
      </div>
    </div>
  );
}

function addZeroes(t: string | number) {
  return <span className={'ticker'}>{('0' + t).slice(-2)}</span>;
}
