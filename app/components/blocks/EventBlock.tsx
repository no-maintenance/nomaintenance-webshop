import type {ReactNode} from 'react';
import React from 'react';

import type {
  EventBlockFragment,
  HeroesFragment,
} from '~/__generated__/hygraph.generated';
import {Heading} from '~/components/Text';
import {Link} from '~/components/Link';
import {HygraphMultiMedia} from '~/components/blocks/fragment/HygraphMedia';
import {cn, isAfterDate} from '~/lib/utils';
import {ClientOnly} from '~/lib/client-only';
import {Countdown, CounterSize, Timer} from '~/components/Countdown';
import {RichText} from '~/components/rich-text/RichText';

export function EventBlock() {
  return null;
}
// export function EventHero({...hero}: HeroComponentProps<EventBlockFragment>) {
//   const {wrapperClasses, imageClasses, textClasses} = hero;
//   const LinkWrapper = ({children}: {children: ReactNode}) =>
//     !hero.hasReleasePage ? (
//       <>{children}</>
//     ) : (
//       <Link to={`/releases/${hero.slug}`}>{children}</Link>
//     );
//   console.log('eventBlock rerendered');
//   return (
//     <section className={wrapperClasses}>
//       <LinkWrapper>
//         {hero.featuredMedia ? (
//           <HygraphMultiMedia
//             media={[hero.featuredMedia]}
//             className={imageClasses}
//           />
//         ) : (
//           <div className={cn(imageClasses, 'bg-background')}></div>
//         )}
//         <div className={cn(textClasses, 'max-w-none')}>
//           {!hero.date || isAfterDate(hero.date) ? (
//             <Heading size={'heading'} as={'h2'}>
//               {hero.title}
//               {isAfterDate(hero.date) && (
//                 <>
//                   :&nbsp;<strong>Now Live</strong>
//                 </>
//               )}
//             </Heading>
//           ) : (
//             <ClientOnly
//               fallback={
//                 <>
//                   <Heading size={'heading'} as={'h2'}>
//                     {hero.title}
//                     {isAfterDate(hero.date) && (
//                       <>
//                         :&nbsp;<strong>Now Live</strong>
//                       </>
//                     )}
//                   </Heading>
//                   <Countdown
//                     launchDate={hero.date}
//                     isLiveAtInit={isAfterDate(hero.date)}
//                   >
//                     {({timeLeft, isLive}) => {
//                       return (
//                         <>
//                           <Heading size={'heading'} as={'h2'}>
//                             {hero.title}
//                             {isLive && (
//                               <>
//                                 :&nbsp;<strong>Now Live</strong>
//                               </>
//                             )}
//                           </Heading>
//                           {isLive && (
//                             <Timer time={timeLeft} size={CounterSize.Large} />
//                           )}
//                         </>
//                       );
//                     }}
//                   </Countdown>
//                 </>
//               }
//             >
//               {() => (
//                 <Countdown
//                   launchDate={hero.date}
//                   isLiveAtInit={isAfterDate(hero.date)}
//                 >
//                   {({timeLeft, isLive}) => {
//                     return <Timer time={timeLeft} size={CounterSize.Large} />;
//                   }}
//                 </Countdown>
//               )}
//             </ClientOnly>
//           )}
//
//           <div
//             className={
//               'prose-2xl text-center w-full gutter flex justify-center'
//             }
//           >
//             {hero.excerpt && <RichText content={hero.excerpt.raw} />}
//           </div>
//         </div>
//       </LinkWrapper>
//     </section>
//   );
// }

export function EventCounter({
  size,
  hero,
}: {
  size: CounterSize;
  hero: Extract<HeroesFragment, {__typename: 'Event'}>;
}) {
  return !hero.date || isAfterDate(hero.date) ? (
    <Heading size={'heading'} as={'h2'}>
      {hero.title}
      {isAfterDate(hero.date) && (
        <>
          :&nbsp;<strong>Now Live</strong>
        </>
      )}
    </Heading>
  ) : (
    <ClientOnly
      fallback={
        <>
          <Heading size={'heading'} as={'h2'}>
            {hero.title}
            {isAfterDate(hero.date) && (
              <>
                :&nbsp;<strong>Now Live</strong>
              </>
            )}
          </Heading>
          <Countdown
            launchDate={hero.date}
            isLiveAtInit={isAfterDate(hero.date)}
          >
            {({timeLeft, isLive}) => {
              return (
                <>
                  <Heading size={'heading'} as={'h2'}>
                    {hero.title}
                    {isLive && (
                      <>
                        :&nbsp;<strong>Now Live</strong>
                      </>
                    )}
                  </Heading>
                  {isLive && <Timer time={timeLeft} size={CounterSize.Large} />}
                </>
              );
            }}
          </Countdown>
        </>
      }
    >
      {() => (
        <Countdown launchDate={hero.date} isLiveAtInit={isAfterDate(hero.date)}>
          {({timeLeft, isLive}) => {
            return <Timer time={timeLeft} size={size} />;
          }}
        </Countdown>
      )}
    </ClientOnly>
  );
}
