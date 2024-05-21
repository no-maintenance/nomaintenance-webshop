// NOTE: https://shopify.dev/docs/api/storefront/latest/queries/cart
export const CART_QUERY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    currencyCode
    amount
  }
  fragment CartLine on CartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        ...Money
      }
      amountPerQuantity {
        ...Money
      }
      compareAtAmountPerQuantity {
        ...Money
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        availableForSale
        compareAtPrice {
          ...Money
        }
        price {
          ...Money
        }
        requiresShipping
        title
        image {
          id
          url
          altText
          width
          height

        }
        product {
          handle
          title
          id
          vendor
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  fragment CartApiQuery on Cart {
    updatedAt
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      nodes {
        ...CartLine
      }
    }
    cost {
      subtotalAmount {
        ...Money
      }
      totalAmount {
        ...Money
      }
      totalDutyAmount {
        ...Money
      }
      totalTaxAmount {
        ...Money
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
  }
` as const;

export const MEDIA_FRAGMENT = `#graphql
fragment Media on Media {
    __typename
    mediaContentType
    alt
    previewImage {
        url
    }
    ... on MediaImage {
        id
        image {
            id
            url
            width
            height
        }
    }
    ... on Video {
        id
        sources {
            mimeType
            url
        }
    }
    ... on Model3d {
        id
        sources {
            mimeType
            url
        }
    }
    ... on ExternalVideo {
        id
        embedUrl
        host
    }
}
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    vendor
    media(first: 2) {
        nodes {
            ...Media
        }
    }
    variants(first: 10) {
        nodes {
            title
            id
            availableForSale
            price {
                amount
                currencyCode
            }
            compareAtPrice {
                amount
                currencyCode
            }
            selectedOptions {
                name
                value
            }
            product {
                handle
                title
            }
        }
    }
}
${MEDIA_FRAGMENT}
`;

export const FEATURED_COLLECTION_FRAGMENT = `#graphql
fragment FeaturedCollectionDetails on Collection {
    id
    title
    handle
    image {
        altText
        width
        height
        url
    }
}
`;

export const PRODUCT_VARIANT_FRAGMENT = `#graphql
fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    quantityAvailable
    selectedOptions {
        name
        value
    }
    image {
        id
        url
        altText
        width
        height
    }
    price {
        amount
        currencyCode
    }
    compareAtPrice {
        amount
        currencyCode
    }
    sku
    title
    unitPrice {
        amount
        currencyCode
    }
    product {
        title
        handle
    }
}
`;

export const PRODUCT_WIDGET_BY_IDS = `#graphql
query FeaturedProductsByIds($ids: [ID!]!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language)  {
    nodes(ids: $ids) {
        ... on Product {
            id
            title
            publishedAt
            handle
            vendor
            descriptionHtml
            media(first: 6) {
                nodes {
                    ...Media
                }
            }
            variants(first: 10) {
                nodes {
                    title
                    id
                    availableForSale
                    price {
                        amount
                        currencyCode
                    }
                    compareAtPrice {
                        amount
                        currencyCode
                    }
                    selectedOptions {
                        name
                        value
                    }
                    product {
                        handle
                        title
                    }
                }
            }
            options {
                name
                values
                id
            }
        }
    }
}
${MEDIA_FRAGMENT}
`;
export const COLLECTION_FEED_QUERY = `#graphql
query CollectionFeed(
    $id: ID!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
) @inContext(country: $country, language: $language) {
    collection(id: $id) {
        id
        handle
        title
        descriptionHtml
        image {
            id
            url
            width
            height
            altText
        }
        products(
            first: $first,
        ) {
            nodes {
                ...ProductCard
            }
        }
    }
}
${PRODUCT_CARD_FRAGMENT}
` as const;
