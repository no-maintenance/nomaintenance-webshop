import type {ReactNode} from 'react';
import {createContext, useContext} from 'react';

import {Event} from '~/components/blocks';

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
import {Lock} from '~/components/blocks/LockBlock';
import {ProductBlock} from '~/components/blocks/ProductBlock';
import {Gallery} from '~/components/blocks/Gallery';

export type BlockProps<T extends BlockFragment['__typename']> = Extract<
  BlockFragment,
  {__typename: T}
>;
type BlockSettings = BlockSettingsFragment & {id?: string};
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
  console.log(entities);
  return (
    <div>
      {entities &&
        entities.map((props) => {
          return (
            <BlockProvider id={props.id} key={props.id}>
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
      return <ProductBlock {...props} />;
    case 'Gallery':
      return <Gallery {...props} />;
    case 'CustomizedSection':
      return <CustomizedSection {...props} />;
    default:
      console.error('Unhandled type:', props);
      return null; // Return null or a placeholder component for unhandled types
  }
}

export function BlockProvider({
  children,
  id,
  settings = DEFAULT_BLOCK_SETTINGS,
}: {
  children: ReactNode;
  id: string;
  settings?: Partial<BlockSettings>;
}) {
  return (
    <BlockContext.Provider value={{id, ...settings}}>
      {children}
    </BlockContext.Provider>
  );
}

const BlockContext = createContext<BlockSettings>(DEFAULT_BLOCK_SETTINGS);
export const useSettings = () => useContext(BlockContext);
