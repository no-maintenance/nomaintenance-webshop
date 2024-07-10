import {Await, useLocation, useParams} from '@remix-run/react';
import {Fragment, Suspense, useEffect, useMemo, useRef, useState} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

import Hamburger from '~/components/hamburger';
import {useTranslation} from '~/i18n';
import {cn} from '~/lib/utils';
import {Footer} from '~/components/Footer';
import {Link} from '~/components/Link';
import {Cart, CartLoading} from '~/components/Cart';
import {Drawer as OldDrawer, useDrawer} from '~/components/Drawer';
import {Heading, Text} from '~/components/Text';
import {IconAccount, IconCart, IconClose, IconSearch} from '~/components/Icon';
import {useRootLoaderData} from '~/root';
import type {
  Maybe,
  NavigationFragment,
} from '~/__generated__/hygraph.generated';
import {FooterStyle, HeaderStyle} from '~/__generated__/hygraph.generated';
import {HygraphLink} from '~/components/blocks/fragment/HygraphLink';
import {useOnKeyPress} from '~/hooks/useOnKeyPress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {useScrollPosition} from '~/hooks/useScrollPosition';
import {useIsHomePath} from '~/hooks/useIsHomePath';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import {LocaleSelector} from '~/components/LocaleSelector';
import {Button} from '~/components/ui/button';
import {Transition} from '@headlessui/react';
import logo from '~/assets/logo.png?url';

export function Header({
  title,
  menu,
  headerStyle,
}: {
  title: string;
  menu: Maybe<NavigationFragment>;
  headerStyle: HeaderStyle;
}) {
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();
  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);
  if (headerStyle === HeaderStyle.None) return;
  if (
    headerStyle === HeaderStyle.MinimalNewsletterCta ||
    headerStyle === HeaderStyle.Minimal
  )
    return <MinimalHeader headerStyle={headerStyle} />;
  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <DesktopHeader
        navStyle={headerStyle}
        shopName={title}
        menu={menu}
        openCart={openCart}
      />
    </>
  );
}

export function MinimalHeader({headerStyle}: {headerStyle: HeaderStyle}) {
  return (
    <>
      <img
        className={
          'absolute top-0 md:left-0 left-1/2 md:-translate-x-0 -translate-x-1/2 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] z-10'
        }
        src={logo}
      />
      {headerStyle === HeaderStyle.MinimalNewsletterCta && (
        <div
          className={
            'absolute pt-16 lg:pt-20 xl:pt-24  whitespace-nowrap md:pr-10 md:right-0 md:top-0 right-1/2 translate-x-1/2 md:-translate-x-0 bottom-10 text-white text-mid'
          }
        >
          <Heading as={'h2'} size={'mid'} className={'font-bold uppercase '}>
            Web shop is closed
          </Heading>
          <Dialog>
            <DialogTrigger className={'underline'}>
              Sign up for early access
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>NO MAINTENANCE</DialogTitle>
                <DialogDescription>
                  Sign up for our newsletter to receive updates on new releases,
                  restocks, and more.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}

enum DropdownState {
  CLOSED,
  HAMBURGER,
  SEARCH,
  COUNTRYSELECTOR,
}

type DesktopHeaderProps = {
  openCart: () => void;
  menu: Maybe<NavigationFragment>;
  shopName: string;
  navStyle: HeaderStyle;
};

function DesktopHeader({
  menu,
  openCart,
  shopName,
  navStyle,
}: DesktopHeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<DropdownState>(
    DropdownState.CLOSED,
  );
  const predictiveSearchRef = useRef<HTMLDivElement>(null);
  const isHome = useIsHomePath();
  const location = useLocation();
  useOnKeyPress('Escape', () => setOpenDropdown(DropdownState.CLOSED));
  useOnKeyPress('k', () => setOpenDropdown(DropdownState.SEARCH), true);
  const isOpen = (o: DropdownState) => o === openDropdown;
  const toggle = (o: DropdownState) =>
    setOpenDropdown(isOpen(o) ? DropdownState.CLOSED : o);
  const scrollPosition = useScrollPosition();
  useEffect(() => {
    setOpenDropdown(DropdownState.CLOSED);
    clearAllBodyScrollLocks();
  }, [location.pathname]);
  useEffect(() => {
    if (!predictiveSearchRef.current) return;
    if (openDropdown === DropdownState.CLOSED) {
      enableBodyScroll(predictiveSearchRef.current);
    } else {
      disableBodyScroll(predictiveSearchRef.current);
    }
  }, [openDropdown]);
  const isFluidHeader = useMemo(
    () => navStyle === HeaderStyle.Fluid && scrollPosition === 0,
    [navStyle, scrollPosition],
  );
  return (
    <header
      role="banner"
      className={cn(
        'h-nav flex items-center bg-background sticky z-40 top-0 justify-between w-full gap-8 gutter py-8 transition-colors duration-500',
        isFluidHeader && 'bg-transparent',
        isFluidHeader &&
          !isOpen(DropdownState.HAMBURGER) &&
          !isOpen(DropdownState.SEARCH)
          ? 'text-background'
          : 'text-foreground',
      )}
    >
      <div className="flex gap-12 w-full items-center">
        <div className={'flex-1'}>
          <div className={'-ml-4'}>
            <Hamburger
              size={20}
              label={'main menu'}
              toggled={isOpen(DropdownState.HAMBURGER)}
              toggle={() => toggle(DropdownState.HAMBURGER)}
            />
          </div>
          <FullScreenNav open={isOpen(DropdownState.HAMBURGER)} menu={menu} />
        </div>
        <div className="flex-1 flex items-center self-center leading-[3rem] md:leading-[4rem] justify-center grow w-full h-full">
          <Link to="/">
            <Heading
              size={'mid'}
              className="text-center uppercase text-2xl  whitespace-nowrap mb-0 mt-0"
              as={isHome ? 'h1' : 'h2'}
            >
              {shopName}
            </Heading>
          </Link>
        </div>

        <nav className={'flex-1 z-60'}>
          <ul
            className={
              ' flex justify-end items-center uppercase gap-4 sm:gap-6 md:gap-10'
            }
          >
            <li
              className={cn(
                'w-6 h-6 sm:block',
                DropdownState.HAMBURGER !== openDropdown ? 'hidden' : 'block',
              )}
            >
              <LocaleSelector
                open={DropdownState.COUNTRYSELECTOR === openDropdown}
                onChange={() => toggle(DropdownState.COUNTRYSELECTOR)}
              />
            </li>
            <li className={'w-6 h-6 block '}>
              <button onClick={() => toggle(DropdownState.SEARCH)}>
                <IconSearch strokeWidth={1} width={'100%'} height={'100%'} />
              </button>
              {openDropdown === DropdownState.SEARCH && (
                <div
                  className={
                    'absolute w-full left-0  bg-background z-50 top-0 px-0 lg:px-gutter'
                  }
                >
                  <PredictiveSearchForm>
                    {({fetchResults, inputRef}) => (
                      <>
                        <div className={'flex w-full h-nav items-center'}>
                          <Button
                            variant={'ghost'}
                            className={'outline-offset-0'}
                            onClick={() =>
                              setOpenDropdown(DropdownState.CLOSED)
                            }
                          >
                            <IconClose />
                          </Button>
                          &nbsp;
                          <input
                            autoComplete="off"
                            autoFocus
                            onKeyDown={(event) => {
                              if (event.key === 'Enter')
                                window.location.href = inputRef?.current?.value
                                  ? `/search?q=${inputRef.current?.value}`
                                  : `/search`;
                            }}
                            name="q"
                            onChange={fetchResults}
                            onFocus={fetchResults}
                            placeholder="Search"
                            ref={inputRef}
                            type="search"
                            className={'flex-1 h-10'}
                          />
                          &nbsp;
                          <Button
                            variant={'ghost'}
                            className={'outline-offset-0'}
                            onClick={() => {
                              window.location.href = inputRef?.current?.value
                                ? `/search?q=${inputRef.current.value}`
                                : `/search`;
                            }}
                          >
                            Search
                          </Button>
                        </div>
                        {inputRef?.current && inputRef.current.value !== '' && (
                          <div
                            className={
                              'h-screen-no-nav overflow-auto hiddenScroll'
                            }
                          >
                            <div
                              ref={predictiveSearchRef}
                              className={'px-gutter lg:px-0'}
                            >
                              <PredictiveSearchResults />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </PredictiveSearchForm>
                </div>
              )}
            </li>
            <li className={'w-6 h-6 hidden md:block'}>
              <AccountLink />
            </li>
            <li className={'w-6 h-6'}>
              <CartCount isIcon={true} openCart={openCart} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

interface FullScreenNavProps {
  open: boolean;
  menu: Maybe<NavigationFragment>;
}

// const staggerMenuItems = stagger(0.1, {startDelay: 0.15});
//
// function useMenuAnimation(isOpen: boolean) {
//   const [scope, animate] = useAnimate();
//
//   useEffect(() => {
//     animate(
//       'ul',
//       {
//         clipPath: isOpen
//           ? 'inset(0% 0% 0% 0% round 10px)'
//           : 'inset(10% 50% 90% 50% round 10px)',
//       },
//       {
//         type: 'spring',
//         bounce: 0,
//         duration: 0.5,
//       },
//     );
//
//     animate(
//       'li',
//       isOpen
//         ? {opacity: 1, scale: 1, filter: 'blur(0px)'}
//         : {opacity: 0, scale: 0.3, filter: 'blur(20px)'},
//       {
//         duration: 0.2,
//         delay: isOpen ? staggerMenuItems : 0,
//       },
//     );
//   }, [isOpen]);
//
//   return scope;
// }

const FullScreenNav = ({open, menu}: FullScreenNavProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {navigations} = useRootLoaderData();
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.1}},
  };
  const itemVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  };
  useEffect(() => {
    if (!scrollRef.current) return;
    if (open) {
      disableBodyScroll(scrollRef.current, {reserveScrollBarGap: true});
    } else {
      enableBodyScroll(scrollRef.current);
    }
  }, [open]);
  return (
    <Transition
      show={open}
      enter="transition duration-300 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-300"
      leave="transition duration-200 ease-out"
      leaveFrom="transform opacity-300"
      leaveTo="transform  opacity-0"
      as={Fragment}
    >
      <div className="fixed inset-0 bg-background justify-center z-40">
        <div ref={scrollRef} className={'nav-offset flex flex-wrap h-full'}>
          <div className={'flex-1 gutter w-full '}>
            <div
              className={
                ' flex items-center justify-center relative max-w-screen-2xl mx-8 md:mx-24 sm:mx-16 mt-16 '
              }
            >
              <ul className="space-y-8 md:space-y-4 flex-1 ">
                {menu &&
                  menu?.links.map((link) => (
                    <li key={link.id} className={''}>
                      <HygraphLink
                        hygraphLink={link}
                        className={
                          'font-medium text-display  animated-underline uppercase'
                        }
                      >
                        {link.label}
                      </HygraphLink>
                    </li>
                  ))}
                <li className={'md:hidden block'}>
                  <Link
                    to={'/account'}
                    className={
                      'font-medium text-display  animated-underline uppercase'
                    }
                  >
                    Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={
              'flex-shrink-0 w-full hidden sm:flex justify-end flex-col'
            }
          >
            <div className={'flex-1'}></div>
            <Suspense>
              <Await resolve={navigations}>
                {(res) => {
                  return (
                    <Footer
                      location={'hamburger'}
                      style={FooterStyle.Default}
                      menu={res.footer}
                    />
                  );
                }}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </Transition>
  );
};

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRootLoaderData();
  const {t} = useTranslation();

  return (
    <OldDrawer
      open={isOpen}
      onClose={onClose}
      heading={t('layout.cart.orderSummary')}
      openFrom="right"
    >
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </OldDrawer>
  );
}

function AccountLink({
  className,
  useIcon = true,
}: {
  className?: string;
  useIcon?: boolean;
}) {
  const rootData = useRootLoaderData();
  const isLoggedIn = rootData?.isLoggedIn;
  const {t} = useTranslation();
  return (
    <Link to="/account" className={className}>
      {useIcon ? (
        <IconAccount strokeWidth={1} />
      ) : (
        <Suspense fallback={'Account'}>
          <Await resolve={isLoggedIn} errorElement={'Log In'}>
            {(isLoggedIn) =>
              isLoggedIn ? t('nav.account') : t('account.login')
            }
          </Await>
        </Suspense>
      )}
    </Link>
  );
}

function CartCount({
  openCart,
  isIcon = true,
  linkType = 'drawer',
}: {
  linkType?: 'drawer' | 'page';
  openCart: () => void;
  isIcon?: boolean;
}) {
  const rootData = useRootLoaderData();
  const params = useParams();
  const {t} = useTranslation();

  if (!isIcon) {
    return (
      <Suspense
        fallback={
          <Text
            as="span"
            onClick={openCart}
            size={'inherit'}
            className={'cursor-pointer font-normal'}
          >
            {t('layout.cart.title')}
          </Text>
        }
      >
        <Await resolve={rootData?.cart}>
          {(cart) => (
            <Text
              as="span"
              className={'cursor-pointer font-normal'}
              size={'inherit'}
              onClick={openCart}
            >
              {cart && cart?.totalQuantity > 0
                ? `Cart: ${cart.totalQuantity}`
                : 'Cart'}
            </Text>
          )}
        </Await>
      </Suspense>
    );
  } else {
    return linkType === 'drawer' ? (
      <div className={'relative'}>
        <button
          onClick={() => openCart()}
          className={
            'cursor-pointer font-normal text-inherit relative flex items-center justify-end focus:ring-ring/5 w-6 h-6'
          }
        >
          <IconCart strokeWidth={1} />

          <Suspense fallback={<Badge count={0} openCart={openCart} />}>
            <Await resolve={rootData?.cart}>
              {(cart) => (
                <Badge openCart={openCart} count={cart?.totalQuantity || 0} />
              )}
            </Await>
          </Suspense>
        </button>
      </div>
    ) : (
      <Link
        className={
          'cursor-pointer font-normal text-inherit relative flex items-center justify-end focus:ring-ring/5 w-6 h-6'
        }
        to={params.locale ? `/${params.locale}/cart` : '/cart'}
      >
        <IconCart strokeWidth={1} />
        <Suspense fallback={<Badge count={0} openCart={openCart} />}>
          <Await resolve={rootData?.cart}>
            {(cart) => (
              <Badge openCart={openCart} count={cart?.totalQuantity || 0} />
            )}
          </Await>
        </Suspense>
      </Link>
    );
  }
}

function Badge({count}: {count: number; openCart: () => void}) {
  const BadgeCounter = useMemo(
    () => (
      <div
        className={`bg-secondary text-secondary-foreground absolute text-[0.625rem]  subpixel-antialiased min-w-[0.75rem] flex items-center justify-center leading-none text-center px-[0.125rem] w-[17px] h-[17px] mr-[-10px] mt-[-5px] rounded-full top-0 right-0`}
      >
        <span className={'pb-px lg:pb-0'}>{count}</span>
      </div>
    ),
    [count],
  );

  return count === 0 ? <></> : <>{BadgeCounter}</>;
}
