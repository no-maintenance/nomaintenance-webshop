import {LoaderFunctionArgs, MetaArgs, json} from '@shopify/remix-oxygen';
import {isValidLocaleServer} from '~/i18n/isValidLocaleServer';
import {useLoaderData} from '@remix-run/react';
import {PageHeader, Section} from '~/components/Text';
import {DEFAULT_RENDERERS, RichText} from '~/components/rich-text';
import {getSeoMeta} from '@shopify/hydrogen';
import {seoPayload} from '~/lib/seo.server';

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
  console.log('article', seoPayload.article({article: page, url: request.url}));
  return json({
    editorial,
    seo: seoPayload.article({article: page, url: request.url}),
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};
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
          <RichText
            references={editorial.artistStatement.references}
            renderers={DEFAULT_RENDERERS}
            content={editorial.artistStatement.json}
          />
        </Section>
      )}
    </>
  );
}
