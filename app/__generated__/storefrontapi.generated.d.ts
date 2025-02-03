/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type HomepageFeaturedCollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HomepageFeaturedCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
        >;
      }
    >;
  };
};

export type OrderCardFragment = Pick<
  StorefrontAPI.Order,
  'id' | 'orderNumber' | 'processedAt' | 'financialStatus' | 'fulfillmentStatus'
> & {
  currentTotalPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  lineItems: {
    edges: Array<{
      node: Pick<StorefrontAPI.OrderLineItem, 'title'> & {
        variant?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'height' | 'width'>
          >;
        }>;
      };
    }>;
  };
};

export type CollectionInfoQueryVariables = StorefrontAPI.Exact<{
  id: StorefrontAPI.Scalars['ID']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CollectionInfoQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'descriptionHtml'
    > & {
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height' | 'altText'>
      >;
    }
  >;
};

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
        attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
        cost: {
          totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
          amountPerQuantity: Pick<
            StorefrontAPI.MoneyV2,
            'currencyCode' | 'amount'
          >;
          compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
          >;
        };
        merchandise: Pick<
          StorefrontAPI.ProductVariant,
          'id' | 'availableForSale' | 'requiresShipping' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          product: Pick<
            StorefrontAPI.Product,
            'handle' | 'title' | 'id' | 'vendor'
          >;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
        };
      }
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

type Media_ExternalVideo_Fragment = {__typename: 'ExternalVideo'} & Pick<
  StorefrontAPI.ExternalVideo,
  'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
> & {previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>};

type Media_MediaImage_Fragment = {__typename: 'MediaImage'} & Pick<
  StorefrontAPI.MediaImage,
  'id' | 'mediaContentType' | 'alt'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
    >;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

type Media_Model3d_Fragment = {__typename: 'Model3d'} & Pick<
  StorefrontAPI.Model3d,
  'id' | 'mediaContentType' | 'alt'
> & {
    sources: Array<Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>>;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

type Media_Video_Fragment = {__typename: 'Video'} & Pick<
  StorefrontAPI.Video,
  'id' | 'mediaContentType' | 'alt'
> & {
    sources: Array<Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>>;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

export type MediaFragment =
  | Media_ExternalVideo_Fragment
  | Media_MediaImage_Fragment
  | Media_Model3d_Fragment
  | Media_Video_Fragment;

export type ProductCardFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'totalInventory'
> & {
  media: {
    nodes: Array<
      | ({__typename: 'ExternalVideo'} & Pick<
          StorefrontAPI.ExternalVideo,
          'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
        > & {
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
      | ({__typename: 'MediaImage'} & Pick<
          StorefrontAPI.MediaImage,
          'id' | 'mediaContentType' | 'alt'
        > & {
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
            >;
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
      | ({__typename: 'Model3d'} & Pick<
          StorefrontAPI.Model3d,
          'id' | 'mediaContentType' | 'alt'
        > & {
            sources: Array<
              Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
            >;
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
      | ({__typename: 'Video'} & Pick<
          StorefrontAPI.Video,
          'id' | 'mediaContentType' | 'alt'
        > & {
            sources: Array<Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>>;
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
    >;
  };
  variants: {
    nodes: Array<
      Pick<
        StorefrontAPI.ProductVariant,
        'title' | 'id' | 'availableForSale'
      > & {
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
      }
    >;
  };
};

export type FeaturedCollectionDetailsFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
  >;
};

export type ProductVariantFragmentFragment = Pick<
  StorefrontAPI.ProductVariant,
  'id' | 'availableForSale' | 'quantityAvailable' | 'sku' | 'title'
> & {
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
  >;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  compareAtPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  unitPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
};

export type FeaturedProductsByIdsQueryVariables = StorefrontAPI.Exact<{
  ids:
    | Array<StorefrontAPI.Scalars['ID']['input']>
    | StorefrontAPI.Scalars['ID']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FeaturedProductsByIdsQuery = {
  nodes: Array<
    StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'descriptionHtml'
      > & {
        media: {
          nodes: Array<
            | ({__typename: 'ExternalVideo'} & Pick<
                StorefrontAPI.ExternalVideo,
                'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
              > & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'MediaImage'} & Pick<
                StorefrontAPI.MediaImage,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Model3d'} & Pick<
                StorefrontAPI.Model3d,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Video'} & Pick<
                StorefrontAPI.Video,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
          >;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'title' | 'id' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
            }
          >;
        };
        options: Array<
          Pick<StorefrontAPI.ProductOption, 'name' | 'id'> & {
            optionValues: Array<Pick<StorefrontAPI.ProductOptionValue, 'name'>>;
          }
        >;
      }
    >
  >;
};

export type CollectionFeedQueryVariables = StorefrontAPI.Exact<{
  id: StorefrontAPI.Scalars['ID']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
}>;

export type CollectionFeedQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'descriptionHtml'
    > & {
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height' | 'altText'>
      >;
      products: {
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            | 'id'
            | 'title'
            | 'publishedAt'
            | 'handle'
            | 'vendor'
            | 'totalInventory'
          > & {
            media: {
              nodes: Array<
                | ({__typename: 'ExternalVideo'} & Pick<
                    StorefrontAPI.ExternalVideo,
                    'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
                  > & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
                | ({__typename: 'MediaImage'} & Pick<
                    StorefrontAPI.MediaImage,
                    'id' | 'mediaContentType' | 'alt'
                  > & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'id' | 'url' | 'width' | 'height'
                        >
                      >;
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
                | ({__typename: 'Model3d'} & Pick<
                    StorefrontAPI.Model3d,
                    'id' | 'mediaContentType' | 'alt'
                  > & {
                      sources: Array<
                        Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                      >;
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
                | ({__typename: 'Video'} & Pick<
                    StorefrontAPI.Video,
                    'id' | 'mediaContentType' | 'alt'
                  > & {
                      sources: Array<
                        Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                      >;
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
              >;
            };
            variants: {
              nodes: Array<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'title' | 'id' | 'availableForSale'
                > & {
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
                }
              >;
            };
          }
        >;
      };
    }
  >;
};

export type LayoutQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type LayoutQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
      }>;
    }>;
  };
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
    }>;
  }>;
};

export type GetShopPrimaryDomainQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type GetShopPrimaryDomainQuery = {
  shop: {primaryDomain: Pick<StorefrontAPI.Domain, 'url'>};
};

export type ApiAllProductsQueryVariables = StorefrontAPI.Exact<{
  query?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['String']['input']>;
  count?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  sortKey?: StorefrontAPI.InputMaybe<StorefrontAPI.ProductSortKeys>;
}>;

export type ApiAllProductsQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'totalInventory'
      > & {
        media: {
          nodes: Array<
            | ({__typename: 'ExternalVideo'} & Pick<
                StorefrontAPI.ExternalVideo,
                'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
              > & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'MediaImage'} & Pick<
                StorefrontAPI.MediaImage,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Model3d'} & Pick<
                StorefrontAPI.Model3d,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Video'} & Pick<
                StorefrontAPI.Video,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
          >;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'title' | 'id' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
            }
          >;
        };
      }
    >;
  };
};

export type PredictiveCollectionFragment = {__typename: 'Collection'} & Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictiveProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    variants: {
      nodes: Array<
        Pick<StorefrontAPI.ProductVariant, 'id'> & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        }
      >;
    };
  };

export type PredictiveQueryFragment = {
  __typename: 'SearchQuerySuggestion';
} & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  'text' | 'styledText' | 'trackingParameters'
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars['Int']['input'];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  searchTerm: StorefrontAPI.Scalars['String']['input'];
  types?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.PredictiveSearchType>
    | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    collections: Array<
      {__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    products: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          variants: {
            nodes: Array<
              Pick<StorefrontAPI.ProductVariant, 'id'> & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'width' | 'height'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              }
            >;
          };
        }
    >;
    queries: Array<
      {__typename: 'SearchQuerySuggestion'} & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        'text' | 'styledText' | 'trackingParameters'
      >
    >;
  }>;
};

export type CollectionDetailsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  filters?: StorefrontAPI.InputMaybe<
    Array<StorefrontAPI.ProductFilter> | StorefrontAPI.ProductFilter
  >;
  sortKey: StorefrontAPI.ProductCollectionSortKeys;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CollectionDetailsQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'description'
    > & {
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height' | 'altText'>
      >;
      products: {
        filters: Array<
          Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
            values: Array<
              Pick<
                StorefrontAPI.FilterValue,
                'id' | 'label' | 'count' | 'input'
              >
            >;
          }
        >;
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            | 'id'
            | 'title'
            | 'publishedAt'
            | 'handle'
            | 'vendor'
            | 'totalInventory'
          > & {
            media: {
              nodes: Array<
                | ({__typename: 'ExternalVideo'} & Pick<
                    StorefrontAPI.ExternalVideo,
                    'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
                  > & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
                | ({__typename: 'MediaImage'} & Pick<
                    StorefrontAPI.MediaImage,
                    'id' | 'mediaContentType' | 'alt'
                  > & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'id' | 'url' | 'width' | 'height'
                        >
                      >;
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
                | ({__typename: 'Model3d'} & Pick<
                    StorefrontAPI.Model3d,
                    'id' | 'mediaContentType' | 'alt'
                  > & {
                      sources: Array<
                        Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                      >;
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
                | ({__typename: 'Video'} & Pick<
                    StorefrontAPI.Video,
                    'id' | 'mediaContentType' | 'alt'
                  > & {
                      sources: Array<
                        Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                      >;
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
              >;
            };
            variants: {
              nodes: Array<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'title' | 'id' | 'availableForSale'
                > & {
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
                }
              >;
            };
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
  collections: {
    edges: Array<{node: Pick<StorefrontAPI.Collection, 'title' | 'handle'>}>;
  };
};

export type PolicyHandleFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'body' | 'handle' | 'id' | 'title' | 'url'
>;

export type PoliciesHandleQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  shippingPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  termsOfService: StorefrontAPI.Scalars['Boolean']['input'];
  refundPolicy: StorefrontAPI.Scalars['Boolean']['input'];
}>;

export type PoliciesHandleQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
  };
};

export type PolicyIndexFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'id' | 'title' | 'handle'
>;

export type PoliciesIndexQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type PoliciesIndexQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, 'id' | 'title' | 'handle'>
    >;
  };
};

export type PaginatedProductsSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  searchTerm?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type PaginatedProductsSearchQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'totalInventory'
      > & {
        media: {
          nodes: Array<
            | ({__typename: 'ExternalVideo'} & Pick<
                StorefrontAPI.ExternalVideo,
                'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
              > & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'MediaImage'} & Pick<
                StorefrontAPI.MediaImage,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Model3d'} & Pick<
                StorefrontAPI.Model3d,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Video'} & Pick<
                StorefrontAPI.Video,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
          >;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'title' | 'id' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
            }
          >;
        };
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'
    >;
  };
};

export type StoreRobotsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoreRobotsQuery = {shop: Pick<StorefrontAPI.Shop, 'id'>};

export type FeaturedItemsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  pageBy?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
}>;

export type FeaturedItemsQuery = {
  featuredCollections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
        >;
      }
    >;
  };
  featuredProducts: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'totalInventory'
      > & {
        media: {
          nodes: Array<
            | ({__typename: 'ExternalVideo'} & Pick<
                StorefrontAPI.ExternalVideo,
                'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
              > & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'MediaImage'} & Pick<
                StorefrontAPI.MediaImage,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Model3d'} & Pick<
                StorefrontAPI.Model3d,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Video'} & Pick<
                StorefrontAPI.Video,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
          >;
        };
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'title' | 'id' | 'availableForSale'
            > & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
            }
          >;
        };
      }
    >;
  };
};

interface GeneratedQueryTypes {
  '#graphql\nquery homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)\n@inContext(country: $country, language: $language) {\n    collections(\n        first: 4,\n        sortKey: UPDATED_AT\n    ) {\n        nodes {\n            id\n            title\n            handle\n            image {\n                altText\n                width\n                height\n                url\n            }\n        }\n    }\n}\n': {
    return: HomepageFeaturedCollectionsQuery;
    variables: HomepageFeaturedCollectionsQueryVariables;
  };
  '#graphql\nquery CollectionInfo(\n    $id: ID!\n    $country: CountryCode\n    $language: LanguageCode\n) @inContext(country: $country, language: $language) {\n    collection(id: $id) {\n        id\n        handle\n        title\n        descriptionHtml\n        image {\n            id\n            url\n            width\n            height\n            altText\n        }\n    }\n}\n': {
    return: CollectionInfoQuery;
    variables: CollectionInfoQueryVariables;
  };
  '#graphql\nquery FeaturedProductsByIds($ids: [ID!]!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language)  {\n    nodes(ids: $ids) {\n        ... on Product {\n            id\n            title\n            publishedAt\n            handle\n            vendor\n            descriptionHtml\n            media(first: 6) {\n                nodes {\n                    ...Media\n                }\n            }\n            variants(first: 10) {\n                nodes {\n                    title\n                    id\n                    availableForSale\n                    price {\n                        amount\n                        currencyCode\n                    }\n                    compareAtPrice {\n                        amount\n                        currencyCode\n                    }\n                    selectedOptions {\n                        name\n                        value\n                    }\n                    product {\n                        handle\n                        title\n                    }\n                }\n            }\n            options {\n                name\n                optionValues {\n                  name\n                }\n                id\n            }\n        }\n    }\n}\n#graphql\nfragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n        url\n    }\n    ... on MediaImage {\n        id\n        image {\n            id\n            url\n            width\n            height\n        }\n    }\n    ... on Video {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on Model3d {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on ExternalVideo {\n        id\n        embedUrl\n        host\n    }\n}\n\n': {
    return: FeaturedProductsByIdsQuery;
    variables: FeaturedProductsByIdsQueryVariables;
  };
  '#graphql\nquery CollectionFeed(\n    $id: ID!\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n) @inContext(country: $country, language: $language) {\n    collection(id: $id) {\n        id\n        handle\n        title\n        descriptionHtml\n        image {\n            id\n            url\n            width\n            height\n            altText\n        }\n        products(\n            first: $first,\n        ) {\n            nodes {\n                ...ProductCard\n            }\n        }\n    }\n}\n#graphql\nfragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    media(first: 2) {\n        nodes {\n            ...Media\n        }\n    }\n    totalInventory\n    variants(first: 10) {\n        nodes {\n            title\n            id\n            availableForSale\n            price {\n                amount\n                currencyCode\n            }\n            compareAtPrice {\n                amount\n                currencyCode\n            }\n            selectedOptions {\n                name\n                value\n            }\n            product {\n                handle\n                title\n            }\n        }\n    }\n}\n#graphql\nfragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n        url\n    }\n    ... on MediaImage {\n        id\n        image {\n            id\n            url\n            width\n            height\n        }\n    }\n    ... on Video {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on Model3d {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on ExternalVideo {\n        id\n        embedUrl\n        host\n    }\n}\n\n\n': {
    return: CollectionFeedQuery;
    variables: CollectionFeedQueryVariables;
  };
  '#graphql\nquery layout(\n    $language: LanguageCode\n) @inContext(language: $language) {\n    shop {\n        ...Shop\n    }\n\n}\nfragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n        url\n    }\n    brand {\n        logo {\n            image {\n                url\n            }\n        }\n    }\n}\n': {
    return: LayoutQuery;
    variables: LayoutQueryVariables;
  };
  '#graphql\n    query getShopPrimaryDomain { shop { primaryDomain { url } } }\n    ': {
    return: GetShopPrimaryDomainQuery;
    variables: GetShopPrimaryDomainQueryVariables;
  };
  '#graphql\nquery ApiAllProducts(\n    $query: String\n    $count: Int\n    $reverse: Boolean\n    $country: CountryCode\n    $language: LanguageCode\n    $sortKey: ProductSortKeys\n) @inContext(country: $country, language: $language) {\n    products(first: $count, sortKey: $sortKey, reverse: $reverse, query: $query, ) {\n        nodes {\n            ...ProductCard\n        }\n    }\n}\n#graphql\nfragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    media(first: 2) {\n        nodes {\n            ...Media\n        }\n    }\n    totalInventory\n    variants(first: 10) {\n        nodes {\n            title\n            id\n            availableForSale\n            price {\n                amount\n                currencyCode\n            }\n            compareAtPrice {\n                amount\n                currencyCode\n            }\n            selectedOptions {\n                name\n                value\n            }\n            product {\n                handle\n                title\n            }\n        }\n    }\n}\n#graphql\nfragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n        url\n    }\n    ... on MediaImage {\n        id\n        image {\n            id\n            url\n            width\n            height\n        }\n    }\n    ... on Video {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on Model3d {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on ExternalVideo {\n        id\n        embedUrl\n        host\n    }\n}\n\n\n': {
    return: ApiAllProductsQuery;
    variables: ApiAllProductsQueryVariables;
  };
  '#graphql\nfragment PredictiveCollection on Collection {\n    __typename\n    id\n    title\n    handle\n    image {\n        url\n        altText\n        width\n        height\n    }\n    trackingParameters\n}\n\nfragment PredictiveProduct on Product {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n    variants(first: 1) {\n        nodes {\n            id\n            image {\n                url\n                altText\n                width\n                height\n            }\n            price {\n                amount\n                currencyCode\n            }\n        }\n    }\n}\nfragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n}\nquery predictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $searchTerm: String!\n    $types: [PredictiveSearchType!]\n) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n        limit: $limit,\n        limitScope: $limitScope,\n        query: $searchTerm,\n        types: $types,\n    ) {\n        collections {\n            ...PredictiveCollection\n        }\n        products {\n            ...PredictiveProduct\n        }\n        queries {\n            ...PredictiveQuery\n        }\n    }\n}\n': {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
  '#graphql\nquery CollectionDetails(\n  $handle: String!\n  $country: CountryCode\n  $language: LanguageCode\n  $filters: [ProductFilter!]\n  $sortKey: ProductCollectionSortKeys!\n  $reverse: Boolean\n  $first: Int\n  $last: Int\n  $startCursor: String\n  $endCursor: String\n) @inContext(country: $country, language: $language) {\n  collection(handle: $handle) {\n    id\n    handle\n    title\n    description\n    seo {\n      description\n      title\n    }\n    image {\n      id\n      url\n      width\n      height\n      altText\n    }\n    products(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor,\n      filters: $filters,\n      sortKey: $sortKey,\n      reverse: $reverse\n    ) {\n      filters {\n        id\n        label\n        type\n        values {\n          id\n          label\n          count\n          input\n        }\n      }\n      nodes {\n        ...ProductCard\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n  collections(first: 100) {\n    edges {\n      node {\n        title\n        handle\n      }\n    }\n  }\n}\n#graphql\nfragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    media(first: 2) {\n        nodes {\n            ...Media\n        }\n    }\n    totalInventory\n    variants(first: 10) {\n        nodes {\n            title\n            id\n            availableForSale\n            price {\n                amount\n                currencyCode\n            }\n            compareAtPrice {\n                amount\n                currencyCode\n            }\n            selectedOptions {\n                name\n                value\n            }\n            product {\n                handle\n                title\n            }\n        }\n    }\n}\n#graphql\nfragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n        url\n    }\n    ... on MediaImage {\n        id\n        image {\n            id\n            url\n            width\n            height\n        }\n    }\n    ... on Video {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on Model3d {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on ExternalVideo {\n        id\n        embedUrl\n        host\n    }\n}\n\n\n': {
    return: CollectionDetailsQuery;
    variables: CollectionDetailsQueryVariables;
  };
  '#graphql\nfragment PolicyHandle on ShopPolicy {\n    body\n    handle\n    id\n    title\n    url\n}\n\nquery PoliciesHandle(\n    $language: LanguageCode\n    $privacyPolicy: Boolean!\n    $shippingPolicy: Boolean!\n    $termsOfService: Boolean!\n    $refundPolicy: Boolean!\n) @inContext(language: $language) {\n    shop {\n        privacyPolicy @include(if: $privacyPolicy) {\n            ...PolicyHandle\n        }\n        shippingPolicy @include(if: $shippingPolicy) {\n            ...PolicyHandle\n        }\n        termsOfService @include(if: $termsOfService) {\n            ...PolicyHandle\n        }\n        refundPolicy @include(if: $refundPolicy) {\n            ...PolicyHandle\n        }\n    }\n}\n': {
    return: PoliciesHandleQuery;
    variables: PoliciesHandleQueryVariables;
  };
  '#graphql\nfragment PolicyIndex on ShopPolicy {\n    id\n    title\n    handle\n}\n\nquery PoliciesIndex {\n    shop {\n        privacyPolicy {\n            ...PolicyIndex\n        }\n        shippingPolicy {\n            ...PolicyIndex\n        }\n        termsOfService {\n            ...PolicyIndex\n        }\n        refundPolicy {\n            ...PolicyIndex\n        }\n        subscriptionPolicy {\n            id\n            title\n            handle\n        }\n    }\n}\n': {
    return: PoliciesIndexQuery;
    variables: PoliciesIndexQueryVariables;
  };
  '#graphql\nquery PaginatedProductsSearch(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $searchTerm: String\n    $startCursor: String\n) @inContext(country: $country, language: $language) {\n    products(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor,\n        sortKey: RELEVANCE,\n        query: $searchTerm\n    ) {\n        nodes {\n            ...ProductCard\n        }\n        pageInfo {\n            startCursor\n            endCursor\n            hasNextPage\n            hasPreviousPage\n        }\n    }\n}\n\n#graphql\nfragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    media(first: 2) {\n        nodes {\n            ...Media\n        }\n    }\n    totalInventory\n    variants(first: 10) {\n        nodes {\n            title\n            id\n            availableForSale\n            price {\n                amount\n                currencyCode\n            }\n            compareAtPrice {\n                amount\n                currencyCode\n            }\n            selectedOptions {\n                name\n                value\n            }\n            product {\n                handle\n                title\n            }\n        }\n    }\n}\n#graphql\nfragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n        url\n    }\n    ... on MediaImage {\n        id\n        image {\n            id\n            url\n            width\n            height\n        }\n    }\n    ... on Video {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on Model3d {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on ExternalVideo {\n        id\n        embedUrl\n        host\n    }\n}\n\n\n': {
    return: PaginatedProductsSearchQuery;
    variables: PaginatedProductsSearchQueryVariables;
  };
  '#graphql\n  query StoreRobots($country: CountryCode, $language: LanguageCode)\n   @inContext(country: $country, language: $language) {\n    shop {\n      id\n    }\n  }\n': {
    return: StoreRobotsQuery;
    variables: StoreRobotsQueryVariables;
  };
  '#graphql\nquery FeaturedItems(\n    $country: CountryCode\n    $language: LanguageCode\n    $pageBy: Int = 12\n) @inContext(country: $country, language: $language) {\n    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {\n        nodes {\n            ...FeaturedCollectionDetails\n        }\n    }\n    featuredProducts: products(first: $pageBy, query: "available_for_sale:true") {\n        nodes {\n            ...ProductCard\n        }\n    }\n}\n\n#graphql\nfragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    media(first: 2) {\n        nodes {\n            ...Media\n        }\n    }\n    totalInventory\n    variants(first: 10) {\n        nodes {\n            title\n            id\n            availableForSale\n            price {\n                amount\n                currencyCode\n            }\n            compareAtPrice {\n                amount\n                currencyCode\n            }\n            selectedOptions {\n                name\n                value\n            }\n            product {\n                handle\n                title\n            }\n        }\n    }\n}\n#graphql\nfragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n        url\n    }\n    ... on MediaImage {\n        id\n        image {\n            id\n            url\n            width\n            height\n        }\n    }\n    ... on Video {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on Model3d {\n        id\n        sources {\n            mimeType\n            url\n        }\n    }\n    ... on ExternalVideo {\n        id\n        embedUrl\n        host\n    }\n}\n\n\n#graphql\nfragment FeaturedCollectionDetails on Collection {\n    id\n    title\n    handle\n    image {\n        altText\n        width\n        height\n        url\n    }\n}\n\n': {
    return: FeaturedItemsQuery;
    variables: FeaturedItemsQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
