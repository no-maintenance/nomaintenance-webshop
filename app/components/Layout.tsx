import {Await} from '@remix-run/react';
import {createContext, ReactNode, Suspense, useContext, useState} from 'react';
import {Aside} from '~/components/Aside';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import {
  FooterStyle,
  HeaderStyle,
  Maybe,
} from '~/__generated__/hygraph.generated';
import {Header} from '~/components/Header';
import {ChildThemeContext, ThemeConsumer} from '~/components/ui/theme';
import {useRootLoaderData} from '~/root';
import {Footer} from '~/components/Footer';
import {cn} from '~/lib/utils';

export type LayoutConfig = {
  header: HeaderStyle;
  footer: FooterStyle;
  theme: Maybe<string>;
  id: string;
};
const DEFAULT_LAYOUT: LayoutConfig = {
  theme: null,
  header: HeaderStyle.Fluid,
  footer: FooterStyle.Default,
  id: '',
};
export type LayoutProps = {
  layoutConfig?: LayoutConfig;
  children?: React.ReactNode;
};

const ConditionalThemeWrapper = ({
  theme,
  children,
}: {
  theme: Maybe<string>;
  children: ReactNode;
}) =>
  theme ? (
    <ChildThemeContext.Provider value={theme}>
      <ThemeConsumer asChild>{children}</ThemeConsumer>
    </ChildThemeContext.Provider>
  ) : (
    <>{children}</>
  );
export const LayoutContext = createContext(DEFAULT_LAYOUT);

export function Layout({
  children = null,
  layoutConfig = DEFAULT_LAYOUT,
}: LayoutProps) {
  const {navigations} = useRootLoaderData();
  return (
    <LayoutContext.Provider value={layoutConfig}>
      <ConditionalThemeWrapper theme={layoutConfig?.theme}>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          {/*<CartAside cart={cart} />*/}
          {/*<SearchAside />*/}
          <div className="">
            <a href="#mainContent" className="sr-only">
              Skip to content
            </a>
          </div>
          <Suspense
            fallback={
              <Header
                headerStyle={layoutConfig?.header}
                title={'NO MAINTENANCE'}
                menu={null}
              />
            }
          >
            <Await resolve={navigations}>
              {(nav) => {
                if (!nav.header) return <></>;
                return (
                  <Header
                    headerStyle={layoutConfig?.header}
                    title={'NO MAINTENANCE'}
                    menu={nav.header}
                  />
                );
              }}
            </Await>
          </Suspense>
          <main
            role="main"
            id="mainContent"
            className={cn(
              'flex-grow',
              layoutConfig?.header === HeaderStyle.Fluid && '-mt-nav',
            )}
          >
            {children}
          </main>
          <Suspense
            fallback={<Footer style={layoutConfig?.footer} menu={null} />}
          >
            <Await resolve={navigations}>
              {(nav) => (
                <Footer style={layoutConfig?.footer} menu={nav.footer} />
              )}
            </Await>
          </Suspense>
        </div>
      </ConditionalThemeWrapper>
    </LayoutContext.Provider>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button
                onClick={() => {
                  window.location.href = inputRef?.current?.value
                    ? `/search?q=${inputRef.current.value}`
                    : `/search`;
                }}
              >
                Search
              </button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}
