import type {ReactNode} from 'react';
import {createContext, useContext} from 'react';

import {Event, Lock, Product} from '~/components/blocks';

import type {
  BlockFragment,
  BlockSettingsFragment,
  EntityWhereInput,
  GetEntitiesQuery,
} from '~/__generated__/hygraph.generated';
import {AlternateSectionLayout, Sizes} from '~/__generated__/hygraph.generated';
import {CustomizedSection} from '~/components/blocks/CustomizedSection';
import {CollectionBlock} from './CollectionBlock';
import {Archive} from '~/components/blocks/Archive';
import {FormBlock} from '~/components/blocks/FormBlock';
import {MixedMedia} from '~/components/blocks/MixedMedia';

export type BlockProps<T extends BlockFragment['__typename']> = Extract<
  BlockFragment,
  {__typename: T}
>;
const DEFAULT_BLOCK_SETTINGS = {
  reverseLayout: false,
  verticalPadding: Sizes.Default,
  horizontalPadding: Sizes.Default,
  alternateLayout: AlternateSectionLayout.Default,
  heading: null,
};
export function BlockSkeletonFactory({outline}: {outline: EntityWhereInput[]}) {
  return null;
}
export function BlockFactory({blocks}: {blocks: GetEntitiesQuery}) {
  const {entities} = blocks;
  return (
    <div>
      {entities &&
        entities.map((props) => {
          return (
            <BlockProvider key={props.id}>
              <Block {...props} />
            </BlockProvider>
          );
        })}
    </div>
  );
}
export function Block(props: BlockFragment) {
  switch (props.__typename) {
    case 'Collection':
      return <CollectionBlock {...props} />;
    case 'Archive':
      return <Archive {...props} />;
    case 'Event':
      return <Event {...props} />;
    case 'Form':
      return <FormBlock {...props} />;
    case 'Lock':
      return <Lock {...props} />;
    case 'MixedMedia':
      return <MixedMedia {...props} />;
    case 'Product':
      return <Product {...props} />;
    case 'CustomizedSection':
      return <CustomizedSection {...props} />;
    default:
      console.error('Unhandled type:', props);
      return null; // Return null or a placeholder component for unhandled types
  }
}
export function BlockProvider({
  children,
  props = DEFAULT_BLOCK_SETTINGS,
}: {
  children: ReactNode;
  props?: Partial<BlockSettingsFragment>;
}) {
  return (
    <BlockContext.Provider value={props}>{children}</BlockContext.Provider>
  );
}

const BlockContext = createContext<BlockSettingsFragment>(
  DEFAULT_BLOCK_SETTINGS,
);
export const useSettings = () => useContext(BlockContext);
