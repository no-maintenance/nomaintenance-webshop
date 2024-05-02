import {Button} from './ui/button';
import {PageHeader, Text} from './Text';
import {Link} from '~/components/Link';
import {FeaturedSection} from '~/components/FeaturedShopifyContent';

export function NotFound({type = 'page'}: {type?: string}) {
  const heading = `We’ve lost this ${type}`;
  const description = `We couldn’t find the ${type} you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <>
      <PageHeader heading={heading} className={'justify-center mb-12'}>
        <Text width="narrow" as="p">
          {description}
        </Text>
        <Link to={'/'}>
          <Button size={'lg'} variant="outline">
            Take me to the home page
          </Button>
        </Link>
      </PageHeader>
      <FeaturedSection />
    </>
  );
}

export function GenericError({
  error,
}: {
  error?: {message: string; stack?: string};
}) {
  const heading = `Something’s wrong here.`;
  let description = `We found an error while loading this page.`;

  // TODO hide error in prod?
  if (error) {
    description += `\n${error.message}`;
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return (
    <>
      <PageHeader heading={heading}>
        <Text width="narrow" as="p">
          {description}
        </Text>
        {error?.stack && (
          <pre
            style={{
              padding: '2rem',
              background: 'hsla(10, 50%, 50%, 0.1)',
              color: 'red',
              overflow: 'auto',
              maxWidth: '100%',
            }}
            dangerouslySetInnerHTML={{
              __html: addLinksToStackTrace(error.stack),
            }}
          />
        )}
        <Button width="auto" variant="inverted" to={'/'}>
          Take me to the home page
        </Button>
      </PageHeader>
      <FeaturedSection />
    </>
  );
}

function addLinksToStackTrace(stackTrace: string) {
  return stackTrace?.replace(
    /^\s*at\s?.*?[(\s]((\/|\w\:).+)\)\n/gim,
    (all, m1) =>
      all.replace(
        m1,
        `<a href="vscode://file${m1}" class="hover:underline">${m1}</a>`,
      ),
  );
}
