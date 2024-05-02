import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {json} from '@shopify/remix-oxygen';
import {isValidLocaleServer} from '~/i18n/isValidLocaleServer';
import {useLoaderData} from '@remix-run/react';
import {PageHeader, Section} from '~/components/Text';
import {DEFAULT_RENDERERS, RichText} from '~/components/rich-text';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  if (!isValidLocaleServer(context, params)) {
    throw new Response(null, {status: 404});
  }
  const {editorialHandle} = params;
  const {editorial: page} = await context.hygraph
    .query()
    .GetEditorial({where: {slug: editorialHandle}});
  if (!page) {
    throw new Response(null, {status: 404});
  }
  const {seo, ...editorial} = page;
  return json({
    editorial,
  });
}

export default function Editorial() {
  const {editorial} = useLoaderData<typeof loader>();
  return (
    <>
      <PageHeader
        className={'mx-auto'}
        variant={'blogPost'}
        heading={editorial?.title ?? ''}
      />
      <Section>
        <div className={'rte'}>
          {editorial.mainContent && (
            <RichText
              references={editorial.mainContent.references}
              content={editorial.mainContent.json}
              renderers={DEFAULT_RENDERERS}
            />
          )}
        </div>
      </Section>
      {editorial.artistStatement && (
        <Section className={'justify-center'}>
          <RichText content={editorial.artistStatement.json} />
        </Section>
      )}
    </>
  );
}
