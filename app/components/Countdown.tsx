import type {ReactNode} from 'react';
import {useMemo, useEffect, useState, createElement, Fragment} from 'react';

import {cn} from '~/lib/utils';

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
};
export const Countdown = ({
  launchDate,
  isLiveAtInit,
  children,
}: CountdownProps) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(launchDate) - +new Date();
    const timeLeft: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } =
      difference > 0
        ? {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          }
        : {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isLive, setIsLive] = useState<boolean>(isLiveAtInit);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
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
}: TimerProps) {
  switch (variant) {
    case TimerVariants.Ticker:
    default:
      return <VerboseTimer time={time} size={size} />;
  }
}
function VerboseTimer({time, size}: Omit<TimerProps, 'variant'>) {
  const {days, hours, minutes, seconds} = time;
  const labelStyles = cn('hidden', CounterSize.Large === size && 'lg:inline');
  const separatorStyles = cn('separator lg:pl-2');
  return (
    <div
      className={cn(
        size === CounterSize.Large && 'timer-large',
        size === CounterSize.Small && 'timer-small',
        !days && 'with-seconds',
        'flex justify-center py-2 md:pb-8 flex-nowrap text-white font-bold timer',
      )}
    >
      <div>
        {days ? (
          <>
            <h3 className={'uppercase pt-2 lg:pt-1 whitespace-nowrap'}>
              {addZeroes(days)}
              <span className={labelStyles}>{days === 1 ? 'Day' : 'Days'}</span>
            </h3>
            <div className={separatorStyles}>:</div>
          </>
        ) : (
          <></>
        )}
      </div>
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

function addZeroes(t: string | number) {
  return <span className={'ticker'}>{('0' + t).slice(-2)}</span>;
}
