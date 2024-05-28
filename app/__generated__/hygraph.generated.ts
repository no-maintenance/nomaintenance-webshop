import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Hex: { input: any; output: any; }
  Json: { input: any; output: any; }
  Long: { input: any; output: any; }
  RGBAHue: { input: any; output: any; }
  RGBATransparency: { input: any; output: any; }
  RichTextAST: { input: any; output: any; }
};

export type Aggregate = {
  __typename?: 'Aggregate';
  count: Scalars['Int']['output'];
};

export enum AlternateSectionLayout {
  Default = 'default',
  Duplex = 'duplex',
  Duplex1_1 = 'duplex1_1',
  DuplexTile = 'duplexTile',
  Swimlanes = 'swimlanes'
}

export type Archive = Entity & Node & {
  __typename?: 'Archive';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Archive>;
  entries: Array<ArchiveEntries>;
  /** List of Archive versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  layouts: Array<Layout>;
  media: Array<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type ArchiveCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ArchiveDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type ArchiveEntriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type ArchiveHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type ArchiveLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type ArchiveMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetWhereInput>;
};


export type ArchivePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ArchiveScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ArchiveUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ArchiveConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ArchiveWhereUniqueInput;
};

/** A connection to a list of items. */
export type ArchiveConnection = {
  __typename?: 'ArchiveConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ArchiveEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ArchiveCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  entries?: InputMaybe<ArchiveEntriesCreateManyInlineInput>;
  layouts?: InputMaybe<LayoutCreateManyInlineInput>;
  media?: InputMaybe<AssetCreateManyInlineInput>;
  slug: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ArchiveCreateManyInlineInput = {
  /** Connect multiple existing Archive documents */
  connect?: InputMaybe<Array<ArchiveWhereUniqueInput>>;
  /** Create and connect multiple existing Archive documents */
  create?: InputMaybe<Array<ArchiveCreateInput>>;
};

export type ArchiveCreateOneInlineInput = {
  /** Connect one existing Archive document */
  connect?: InputMaybe<ArchiveWhereUniqueInput>;
  /** Create and connect one Archive document */
  create?: InputMaybe<ArchiveCreateInput>;
};

/** An edge in a connection. */
export type ArchiveEdge = {
  __typename?: 'ArchiveEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Archive;
};

/** Identifies documents */
export type ArchiveManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ArchiveWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ArchiveWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ArchiveWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ArchiveWhereStageInput>;
  documentInStages_none?: InputMaybe<ArchiveWhereStageInput>;
  documentInStages_some?: InputMaybe<ArchiveWhereStageInput>;
  /** All values in which the union is empty */
  entries_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  entries_some?: InputMaybe<ArchiveEntriesWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ArchiveOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ArchiveUpdateInput = {
  entries?: InputMaybe<ArchiveEntriesUpdateManyInlineInput>;
  layouts?: InputMaybe<LayoutUpdateManyInlineInput>;
  media?: InputMaybe<AssetUpdateManyInlineInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArchiveUpdateManyInlineInput = {
  /** Connect multiple existing Archive documents */
  connect?: InputMaybe<Array<ArchiveConnectInput>>;
  /** Create and connect multiple Archive documents */
  create?: InputMaybe<Array<ArchiveCreateInput>>;
  /** Delete multiple Archive documents */
  delete?: InputMaybe<Array<ArchiveWhereUniqueInput>>;
  /** Disconnect multiple Archive documents */
  disconnect?: InputMaybe<Array<ArchiveWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Archive documents */
  set?: InputMaybe<Array<ArchiveWhereUniqueInput>>;
  /** Update multiple Archive documents */
  update?: InputMaybe<Array<ArchiveUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Archive documents */
  upsert?: InputMaybe<Array<ArchiveUpsertWithNestedWhereUniqueInput>>;
};

export type ArchiveUpdateManyInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArchiveUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ArchiveUpdateManyInput;
  /** Document search */
  where: ArchiveWhereInput;
};

export type ArchiveUpdateOneInlineInput = {
  /** Connect existing Archive document */
  connect?: InputMaybe<ArchiveWhereUniqueInput>;
  /** Create and connect one Archive document */
  create?: InputMaybe<ArchiveCreateInput>;
  /** Delete currently connected Archive document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Archive document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Archive document */
  update?: InputMaybe<ArchiveUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Archive document */
  upsert?: InputMaybe<ArchiveUpsertWithNestedWhereUniqueInput>;
};

export type ArchiveUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ArchiveUpdateInput;
  /** Unique document search */
  where: ArchiveWhereUniqueInput;
};

export type ArchiveUpsertInput = {
  /** Create document if it didn't exist */
  create: ArchiveCreateInput;
  /** Update document if it exists */
  update: ArchiveUpdateInput;
};

export type ArchiveUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ArchiveUpsertInput;
  /** Unique document search */
  where: ArchiveWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ArchiveWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type ArchiveWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ArchiveWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ArchiveWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ArchiveWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ArchiveWhereStageInput>;
  documentInStages_none?: InputMaybe<ArchiveWhereStageInput>;
  documentInStages_some?: InputMaybe<ArchiveWhereStageInput>;
  /** All values in which the union is empty */
  entries_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  entries_some?: InputMaybe<ArchiveEntriesWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ArchiveWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ArchiveWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ArchiveWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ArchiveWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ArchiveWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Archive record uniquely */
export type ArchiveWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Asset system model */
export type Asset = Entity & Node & {
  __typename?: 'Asset';
  /** Recommended max. length is 125 characters */
  alt?: Maybe<Scalars['String']['output']>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Asset>;
  fallbackLock: Array<Lock>;
  featuredImageEditorial: Array<Editorial>;
  featuredImageEvent: Array<Event>;
  featuredImagePage: Array<Page>;
  /** The file name */
  fileName: Scalars['String']['output'];
  /** The file handle */
  handle: Scalars['String']['output'];
  /** The height of the file */
  height?: Maybe<Scalars['Float']['output']>;
  /** List of Asset versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  imageSeo: Array<Seo>;
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Asset>;
  mediaArchive: Array<Archive>;
  mediaCombinedListing: Array<CombinedListing>;
  mediaEvent: Array<Event>;
  mediaGallery: Array<Gallery>;
  mediaMixedMedia: Array<MixedMedia>;
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']['output']>;
  /** Optional. Include a "portrait" asset to render on select components when the user's device orientation is "portrait" */
  portrait?: Maybe<Asset>;
  portraitAsset: Array<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** The file size */
  size?: Maybe<Scalars['Float']['output']>;
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  /** Returns information you need to upload the asset. The type of upload is dependant on what you pass into asset creations as upload type. */
  upload?: Maybe<AssetUpload>;
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String']['output'];
  /** The file width */
  width?: Maybe<Scalars['Float']['output']>;
};


/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Asset system model */
export type AssetFallbackLockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<LockOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LockWhereInput>;
};


/** Asset system model */
export type AssetFeaturedImageEditorialArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<EditorialOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EditorialWhereInput>;
};


/** Asset system model */
export type AssetFeaturedImageEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<EventOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereInput>;
};


/** Asset system model */
export type AssetFeaturedImagePageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<PageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PageWhereInput>;
};


/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


/** Asset system model */
export type AssetImageSeoArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<SeoOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SeoWhereInput>;
};


/** Asset system model */
export type AssetLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  locales?: Array<Locale>;
};


/** Asset system model */
export type AssetMediaArchiveArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ArchiveOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ArchiveWhereInput>;
};


/** Asset system model */
export type AssetMediaCombinedListingArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<CombinedListingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CombinedListingWhereInput>;
};


/** Asset system model */
export type AssetMediaEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<EventOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereInput>;
};


/** Asset system model */
export type AssetMediaGalleryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<GalleryOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GalleryWhereInput>;
};


/** Asset system model */
export type AssetMediaMixedMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<MixedMediaOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MixedMediaWhereInput>;
};


/** Asset system model */
export type AssetPortraitArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


/** Asset system model */
export type AssetPortraitAssetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetWhereInput>;
};


/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetUrlArgs = {
  transformation?: InputMaybe<AssetTransformationInput>;
};

export type AssetConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AssetWhereUniqueInput;
};

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AssetEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AssetCreateInput = {
  /** alt input for default locale (en) */
  alt?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fallbackLock?: InputMaybe<LockCreateManyInlineInput>;
  featuredImageEditorial?: InputMaybe<EditorialCreateManyInlineInput>;
  featuredImageEvent?: InputMaybe<EventCreateManyInlineInput>;
  featuredImagePage?: InputMaybe<PageCreateManyInlineInput>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  imageSeo?: InputMaybe<SeoCreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<AssetCreateLocalizationsInput>;
  mediaArchive?: InputMaybe<ArchiveCreateManyInlineInput>;
  mediaCombinedListing?: InputMaybe<CombinedListingCreateManyInlineInput>;
  mediaEvent?: InputMaybe<EventCreateManyInlineInput>;
  mediaGallery?: InputMaybe<GalleryCreateManyInlineInput>;
  mediaMixedMedia?: InputMaybe<MixedMediaCreateManyInlineInput>;
  portrait?: InputMaybe<AssetCreateOneInlineInput>;
  portraitAsset?: InputMaybe<AssetCreateManyInlineInput>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCreateLocalizationDataInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput;
  locale: Locale;
};

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
};

export type AssetCreateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Create and connect multiple existing Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
};

export type AssetCreateOneInlineInput = {
  /** Connect one existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
};

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Asset;
};

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  fallbackLock_every?: InputMaybe<LockWhereInput>;
  fallbackLock_none?: InputMaybe<LockWhereInput>;
  fallbackLock_some?: InputMaybe<LockWhereInput>;
  featuredImageEditorial_every?: InputMaybe<EditorialWhereInput>;
  featuredImageEditorial_none?: InputMaybe<EditorialWhereInput>;
  featuredImageEditorial_some?: InputMaybe<EditorialWhereInput>;
  featuredImageEvent_every?: InputMaybe<EventWhereInput>;
  featuredImageEvent_none?: InputMaybe<EventWhereInput>;
  featuredImageEvent_some?: InputMaybe<EventWhereInput>;
  featuredImagePage_every?: InputMaybe<PageWhereInput>;
  featuredImagePage_none?: InputMaybe<PageWhereInput>;
  featuredImagePage_some?: InputMaybe<PageWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  imageSeo_every?: InputMaybe<SeoWhereInput>;
  imageSeo_none?: InputMaybe<SeoWhereInput>;
  imageSeo_some?: InputMaybe<SeoWhereInput>;
  mediaArchive_every?: InputMaybe<ArchiveWhereInput>;
  mediaArchive_none?: InputMaybe<ArchiveWhereInput>;
  mediaArchive_some?: InputMaybe<ArchiveWhereInput>;
  mediaCombinedListing_every?: InputMaybe<CombinedListingWhereInput>;
  mediaCombinedListing_none?: InputMaybe<CombinedListingWhereInput>;
  mediaCombinedListing_some?: InputMaybe<CombinedListingWhereInput>;
  mediaEvent_every?: InputMaybe<EventWhereInput>;
  mediaEvent_none?: InputMaybe<EventWhereInput>;
  mediaEvent_some?: InputMaybe<EventWhereInput>;
  mediaGallery_every?: InputMaybe<GalleryWhereInput>;
  mediaGallery_none?: InputMaybe<GalleryWhereInput>;
  mediaGallery_some?: InputMaybe<GalleryWhereInput>;
  mediaMixedMedia_every?: InputMaybe<MixedMediaWhereInput>;
  mediaMixedMedia_none?: InputMaybe<MixedMediaWhereInput>;
  mediaMixedMedia_some?: InputMaybe<MixedMediaWhereInput>;
  portrait?: InputMaybe<AssetWhereInput>;
  portraitAsset_every?: InputMaybe<AssetWhereInput>;
  portraitAsset_none?: InputMaybe<AssetWhereInput>;
  portraitAsset_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  upload?: InputMaybe<AssetUploadWhereInput>;
};

export enum AssetOrderByInput {
  AltAsc = 'alt_ASC',
  AltDesc = 'alt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Identifies documents */
export type AssetSingleRelationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  upload?: InputMaybe<AssetUploadWhereInput>;
};

/** Transformations for Assets */
export type AssetTransformationInput = {
  document?: InputMaybe<DocumentTransformationInput>;
  image?: InputMaybe<ImageTransformationInput>;
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetUpdateInput = {
  /** alt input for default locale (en) */
  alt?: InputMaybe<Scalars['String']['input']>;
  fallbackLock?: InputMaybe<LockUpdateManyInlineInput>;
  featuredImageEditorial?: InputMaybe<EditorialUpdateManyInlineInput>;
  featuredImageEvent?: InputMaybe<EventUpdateManyInlineInput>;
  featuredImagePage?: InputMaybe<PageUpdateManyInlineInput>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  imageSeo?: InputMaybe<SeoUpdateManyInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<AssetUpdateLocalizationsInput>;
  mediaArchive?: InputMaybe<ArchiveUpdateManyInlineInput>;
  mediaCombinedListing?: InputMaybe<CombinedListingUpdateManyInlineInput>;
  mediaEvent?: InputMaybe<EventUpdateManyInlineInput>;
  mediaGallery?: InputMaybe<GalleryUpdateManyInlineInput>;
  mediaMixedMedia?: InputMaybe<MixedMediaUpdateManyInlineInput>;
  portrait?: InputMaybe<AssetUpdateOneInlineInput>;
  portraitAsset?: InputMaybe<AssetUpdateManyInlineInput>;
  /** Use this to define if its a reupload for the asset */
  reUpload?: InputMaybe<Scalars['Boolean']['input']>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AssetUpdateLocalizationDataInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  /** Use this to define if its a reupload for the asset */
  reUpload?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']['input']>;
};

export type AssetUpdateLocalizationInput = {
  data: AssetUpdateLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<AssetUpsertLocalizationInput>>;
};

export type AssetUpdateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetConnectInput>>;
  /** Create and connect multiple Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
  /** Delete multiple Asset documents */
  delete?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Disconnect multiple Asset documents */
  disconnect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Update multiple Asset documents */
  update?: InputMaybe<Array<AssetUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Asset documents */
  upsert?: InputMaybe<Array<AssetUpsertWithNestedWhereUniqueInput>>;
};

export type AssetUpdateManyInput = {
  /** alt input for default locale (en) */
  alt?: InputMaybe<Scalars['String']['input']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<AssetUpdateManyLocalizationsInput>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AssetUpdateManyLocalizationDataInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AssetUpdateManyLocalizationInput = {
  data: AssetUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateManyLocalizationInput>>;
};

export type AssetUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AssetUpdateManyInput;
  /** Document search */
  where: AssetWhereInput;
};

export type AssetUpdateOneInlineInput = {
  /** Connect existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
  /** Delete currently connected Asset document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Asset document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Asset document */
  update?: InputMaybe<AssetUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Asset document */
  upsert?: InputMaybe<AssetUpsertWithNestedWhereUniqueInput>;
};

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AssetUpdateInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** Asset Upload */
export type AssetUpload = {
  __typename?: 'AssetUpload';
  /** Asset Upload Error */
  error?: Maybe<AssetUploadError>;
  /** Expiry Timestamp */
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  /** Asset Request Data for upload */
  requestPostData?: Maybe<AssetUploadRequestPostData>;
  /** Asset Request Data for upload */
  status?: Maybe<AssetUploadStatus>;
};

/** Represents asset upload error */
export type AssetUploadError = {
  __typename?: 'AssetUploadError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

/** Asset Upload Request Post Data */
export type AssetUploadRequestPostData = {
  __typename?: 'AssetUploadRequestPostData';
  /** The algorithm to use in the form field. This value should be passed in the `X-Amz-Algorithm` form field. */
  algorithm: Scalars['String']['output'];
  /** The credential to use in the form field. This value should be passed in the `X-Amz-Credential` form field. */
  credential: Scalars['String']['output'];
  /** The date the request was signed, formatted as YYYYMMDDTHHMMSSZ. This value should be passed in the `X-Amz-Date` header. */
  date: Scalars['String']['output'];
  /** The key to use in the form field. This value should be passed in the `Key` form field. */
  key: Scalars['String']['output'];
  /** The policy to use in the form field. This value should be passed in the `Policy` form field. */
  policy: Scalars['String']['output'];
  /** The security token to use in the form field. This field is optional only pass it if its not null. This value should be passed in the `X-Amz-Security-Token` form field if not null. */
  securityToken?: Maybe<Scalars['String']['output']>;
  /** The signature to use in the form field. This value should be passed in the `X-Amz-Signature` form field. */
  signature: Scalars['String']['output'];
  /** The URL to which the file should be uploaded with a POST request. */
  url: Scalars['String']['output'];
};

/** System Asset Upload Status */
export enum AssetUploadStatus {
  AssetCreatePending = 'ASSET_CREATE_PENDING',
  AssetErrorUpload = 'ASSET_ERROR_UPLOAD',
  AssetUpdatePending = 'ASSET_UPDATE_PENDING',
  AssetUploadComplete = 'ASSET_UPLOAD_COMPLETE'
}

/** Identifies documents */
export type AssetUploadWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetUploadWhereInput>>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  expiresAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  expiresAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  expiresAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  expiresAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  expiresAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  expiresAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  expiresAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  status?: InputMaybe<AssetUploadStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<AssetUploadStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
};

/** Identifies documents */
export type AssetUploadWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetUploadWhereInput>>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  expiresAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  expiresAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  expiresAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  expiresAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  expiresAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  expiresAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  expiresAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  status?: InputMaybe<AssetUploadStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<AssetUploadStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
};

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  create: AssetCreateInput;
  /** Update document if it exists */
  update: AssetUpdateInput;
};

export type AssetUpsertLocalizationInput = {
  create: AssetCreateLocalizationDataInput;
  locale: Locale;
  update: AssetUpdateLocalizationDataInput;
};

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AssetUpsertInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AssetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  alt?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  alt_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  alt_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  alt_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  alt_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  alt_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  alt_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  alt_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  alt_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  alt_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  fallbackLock_every?: InputMaybe<LockWhereInput>;
  fallbackLock_none?: InputMaybe<LockWhereInput>;
  fallbackLock_some?: InputMaybe<LockWhereInput>;
  featuredImageEditorial_every?: InputMaybe<EditorialWhereInput>;
  featuredImageEditorial_none?: InputMaybe<EditorialWhereInput>;
  featuredImageEditorial_some?: InputMaybe<EditorialWhereInput>;
  featuredImageEvent_every?: InputMaybe<EventWhereInput>;
  featuredImageEvent_none?: InputMaybe<EventWhereInput>;
  featuredImageEvent_some?: InputMaybe<EventWhereInput>;
  featuredImagePage_every?: InputMaybe<PageWhereInput>;
  featuredImagePage_none?: InputMaybe<PageWhereInput>;
  featuredImagePage_some?: InputMaybe<PageWhereInput>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  fileName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  fileName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  fileName_starts_with?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  handle_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  handle_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  handle_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  handle_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  handle_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  handle_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  handle_starts_with?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than the given value. */
  height_gt?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than or equal the given value. */
  height_gte?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are contained in given list. */
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  /** All values less than the given value. */
  height_lt?: InputMaybe<Scalars['Float']['input']>;
  /** All values less than or equal the given value. */
  height_lte?: InputMaybe<Scalars['Float']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  height_not?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are not contained in given list. */
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  imageSeo_every?: InputMaybe<SeoWhereInput>;
  imageSeo_none?: InputMaybe<SeoWhereInput>;
  imageSeo_some?: InputMaybe<SeoWhereInput>;
  mediaArchive_every?: InputMaybe<ArchiveWhereInput>;
  mediaArchive_none?: InputMaybe<ArchiveWhereInput>;
  mediaArchive_some?: InputMaybe<ArchiveWhereInput>;
  mediaCombinedListing_every?: InputMaybe<CombinedListingWhereInput>;
  mediaCombinedListing_none?: InputMaybe<CombinedListingWhereInput>;
  mediaCombinedListing_some?: InputMaybe<CombinedListingWhereInput>;
  mediaEvent_every?: InputMaybe<EventWhereInput>;
  mediaEvent_none?: InputMaybe<EventWhereInput>;
  mediaEvent_some?: InputMaybe<EventWhereInput>;
  mediaGallery_every?: InputMaybe<GalleryWhereInput>;
  mediaGallery_none?: InputMaybe<GalleryWhereInput>;
  mediaGallery_some?: InputMaybe<GalleryWhereInput>;
  mediaMixedMedia_every?: InputMaybe<MixedMediaWhereInput>;
  mediaMixedMedia_none?: InputMaybe<MixedMediaWhereInput>;
  mediaMixedMedia_some?: InputMaybe<MixedMediaWhereInput>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  mimeType_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  mimeType_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  mimeType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  mimeType_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  mimeType_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  mimeType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  mimeType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  mimeType_starts_with?: InputMaybe<Scalars['String']['input']>;
  portrait?: InputMaybe<AssetWhereInput>;
  portraitAsset_every?: InputMaybe<AssetWhereInput>;
  portraitAsset_none?: InputMaybe<AssetWhereInput>;
  portraitAsset_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  size?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than the given value. */
  size_gt?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than or equal the given value. */
  size_gte?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are contained in given list. */
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  /** All values less than the given value. */
  size_lt?: InputMaybe<Scalars['Float']['input']>;
  /** All values less than or equal the given value. */
  size_lte?: InputMaybe<Scalars['Float']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  size_not?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are not contained in given list. */
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  upload?: InputMaybe<AssetUploadWhereInput>;
  width?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than the given value. */
  width_gt?: InputMaybe<Scalars['Float']['input']>;
  /** All values greater than or equal the given value. */
  width_gte?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are contained in given list. */
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  /** All values less than the given value. */
  width_lt?: InputMaybe<Scalars['Float']['input']>;
  /** All values less than or equal the given value. */
  width_lte?: InputMaybe<Scalars['Float']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  width_not?: InputMaybe<Scalars['Float']['input']>;
  /** All values that are not contained in given list. */
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AssetWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AssetWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long']['output'];
};

export type Block = Entity & {
  __typename?: 'Block';
  content?: Maybe<ContentContent>;
  contentStyle?: Maybe<ContentStyle>;
  /** Customize the colors and spacing for this block. Overrides the default (global) options, and the page (layout) options */
  displayOptions?: Maybe<DisplayOption>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  internalName?: Maybe<Scalars['String']['output']>;
  /** System stage field */
  stage: Stage;
};


export type BlockContentArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type BlockDisplayOptionsArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type BlockConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: BlockWhereUniqueInput;
};

/** A connection to a list of items. */
export type BlockConnection = {
  __typename?: 'BlockConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<BlockEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type BlockCreateInput = {
  content?: InputMaybe<ContentContentCreateOneInlineInput>;
  contentStyle?: InputMaybe<ContentStyle>;
  displayOptions?: InputMaybe<DisplayOptionCreateOneInlineInput>;
  internalName?: InputMaybe<Scalars['String']['input']>;
};

export type BlockCreateManyInlineInput = {
  /** Create and connect multiple existing Block documents */
  create?: InputMaybe<Array<BlockCreateInput>>;
};

export type BlockCreateOneInlineInput = {
  /** Create and connect one Block document */
  create?: InputMaybe<BlockCreateInput>;
};

export type BlockCreateWithPositionInput = {
  /** Document to create */
  data: BlockCreateInput;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
};

/** An edge in a connection. */
export type BlockEdge = {
  __typename?: 'BlockEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Block;
};

/** Identifies documents */
export type BlockManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<BlockWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<BlockWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<BlockWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  /** All values in which the union is connected to the given models */
  content?: InputMaybe<ContentContentWhereInput>;
  contentStyle?: InputMaybe<ContentStyle>;
  /** All values that are contained in given list. */
  contentStyle_in?: InputMaybe<Array<InputMaybe<ContentStyle>>>;
  /** Any other value that exists and is not equal to the given value. */
  contentStyle_not?: InputMaybe<ContentStyle>;
  /** All values that are not contained in given list. */
  contentStyle_not_in?: InputMaybe<Array<InputMaybe<ContentStyle>>>;
  /** All values in which the union is empty */
  content_empty?: InputMaybe<Scalars['Boolean']['input']>;
  displayOptions?: InputMaybe<DisplayOptionWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export enum BlockOrderByInput {
  ContentStyleAsc = 'contentStyle_ASC',
  ContentStyleDesc = 'contentStyle_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC'
}

export type BlockParent = LockedSection;

export type BlockParentConnectInput = {
  LockedSection?: InputMaybe<LockedSectionConnectInput>;
};

export type BlockParentCreateInput = {
  LockedSection?: InputMaybe<LockedSectionCreateInput>;
};

export type BlockParentCreateManyInlineInput = {
  /** Create and connect multiple existing BlockParent documents */
  create?: InputMaybe<Array<BlockParentCreateInput>>;
};

export type BlockParentCreateOneInlineInput = {
  /** Create and connect one BlockParent document */
  create?: InputMaybe<BlockParentCreateInput>;
};

export type BlockParentCreateWithPositionInput = {
  LockedSection?: InputMaybe<LockedSectionCreateWithPositionInput>;
};

export type BlockParentUpdateInput = {
  LockedSection?: InputMaybe<LockedSectionUpdateInput>;
};

export type BlockParentUpdateManyInlineInput = {
  /** Create and connect multiple BlockParent component instances */
  create?: InputMaybe<Array<BlockParentCreateWithPositionInput>>;
  /** Delete multiple BlockParent documents */
  delete?: InputMaybe<Array<BlockParentWhereUniqueInput>>;
  /** Update multiple BlockParent component instances */
  update?: InputMaybe<Array<BlockParentUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple BlockParent component instances */
  upsert?: InputMaybe<Array<BlockParentUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type BlockParentUpdateManyWithNestedWhereInput = {
  LockedSection?: InputMaybe<LockedSectionUpdateManyWithNestedWhereInput>;
};

export type BlockParentUpdateOneInlineInput = {
  /** Create and connect one BlockParent document */
  create?: InputMaybe<BlockParentCreateInput>;
  /** Delete currently connected BlockParent document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single BlockParent document */
  update?: InputMaybe<BlockParentUpdateWithNestedWhereUniqueInput>;
  /** Upsert single BlockParent document */
  upsert?: InputMaybe<BlockParentUpsertWithNestedWhereUniqueInput>;
};

export type BlockParentUpdateWithNestedWhereUniqueAndPositionInput = {
  LockedSection?: InputMaybe<LockedSectionUpdateWithNestedWhereUniqueAndPositionInput>;
};

export type BlockParentUpdateWithNestedWhereUniqueInput = {
  LockedSection?: InputMaybe<LockedSectionUpdateWithNestedWhereUniqueInput>;
};

export type BlockParentUpsertWithNestedWhereUniqueAndPositionInput = {
  LockedSection?: InputMaybe<LockedSectionUpsertWithNestedWhereUniqueAndPositionInput>;
};

export type BlockParentUpsertWithNestedWhereUniqueInput = {
  LockedSection?: InputMaybe<LockedSectionUpsertWithNestedWhereUniqueInput>;
};

export type BlockParentWhereInput = {
  LockedSection?: InputMaybe<LockedSectionWhereInput>;
};

export type BlockParentWhereUniqueInput = {
  LockedSection?: InputMaybe<LockedSectionWhereUniqueInput>;
};

export type BlockUpdateInput = {
  content?: InputMaybe<ContentContentUpdateOneInlineInput>;
  contentStyle?: InputMaybe<ContentStyle>;
  displayOptions?: InputMaybe<DisplayOptionUpdateOneInlineInput>;
  internalName?: InputMaybe<Scalars['String']['input']>;
};

export type BlockUpdateManyInlineInput = {
  /** Create and connect multiple Block component instances */
  create?: InputMaybe<Array<BlockCreateWithPositionInput>>;
  /** Delete multiple Block documents */
  delete?: InputMaybe<Array<BlockWhereUniqueInput>>;
  /** Update multiple Block component instances */
  update?: InputMaybe<Array<BlockUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple Block component instances */
  upsert?: InputMaybe<Array<BlockUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type BlockUpdateManyInput = {
  contentStyle?: InputMaybe<ContentStyle>;
  internalName?: InputMaybe<Scalars['String']['input']>;
};

export type BlockUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: BlockUpdateManyInput;
  /** Document search */
  where: BlockWhereInput;
};

export type BlockUpdateOneInlineInput = {
  /** Create and connect one Block document */
  create?: InputMaybe<BlockCreateInput>;
  /** Delete currently connected Block document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Block document */
  update?: InputMaybe<BlockUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Block document */
  upsert?: InputMaybe<BlockUpsertWithNestedWhereUniqueInput>;
};

export type BlockUpdateWithNestedWhereUniqueAndPositionInput = {
  /** Document to update */
  data?: InputMaybe<BlockUpdateInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: BlockWhereUniqueInput;
};

export type BlockUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: BlockUpdateInput;
  /** Unique document search */
  where: BlockWhereUniqueInput;
};

export type BlockUpsertInput = {
  /** Create document if it didn't exist */
  create: BlockCreateInput;
  /** Update document if it exists */
  update: BlockUpdateInput;
};

export type BlockUpsertWithNestedWhereUniqueAndPositionInput = {
  /** Document to upsert */
  data?: InputMaybe<BlockUpsertInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: BlockWhereUniqueInput;
};

export type BlockUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: BlockUpsertInput;
  /** Unique document search */
  where: BlockWhereUniqueInput;
};

/** Identifies documents */
export type BlockWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<BlockWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<BlockWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<BlockWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  /** All values in which the union is connected to the given models */
  content?: InputMaybe<ContentContentWhereInput>;
  contentStyle?: InputMaybe<ContentStyle>;
  /** All values that are contained in given list. */
  contentStyle_in?: InputMaybe<Array<InputMaybe<ContentStyle>>>;
  /** Any other value that exists and is not equal to the given value. */
  contentStyle_not?: InputMaybe<ContentStyle>;
  /** All values that are not contained in given list. */
  contentStyle_not_in?: InputMaybe<Array<InputMaybe<ContentStyle>>>;
  /** All values in which the union is empty */
  content_empty?: InputMaybe<Scalars['Boolean']['input']>;
  displayOptions?: InputMaybe<DisplayOptionWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
};

/** References Block record uniquely */
export type BlockWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum ButtonStyle {
  Inline = 'inline',
  Inverted = 'inverted',
  Primary = 'primary'
}

export type Collection = Entity & Node & {
  __typename?: 'Collection';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  customizedSections: Array<CustomizedSection>;
  /** Get the document in other stages */
  documentInStages: Array<Collection>;
  gid: Scalars['String']['output'];
  heroes: Array<Layout>;
  /** List of Collection versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  layouts: Array<Layout>;
  legacyResourceId: Scalars['String']['output'];
  lock?: Maybe<Lock>;
  lockExemption?: Maybe<Lock>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  title: Scalars['String']['output'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type CollectionCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CollectionCustomizedSectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CustomizedSectionWhereInput>;
};


export type CollectionDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type CollectionHeroesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type CollectionHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type CollectionLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type CollectionLockArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CollectionLockExemptionArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CollectionPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CollectionScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type CollectionUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type CollectionConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: CollectionWhereUniqueInput;
};

/** A connection to a list of items. */
export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<CollectionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type CollectionCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizedSections?: InputMaybe<CustomizedSectionCreateManyInlineInput>;
  gid: Scalars['String']['input'];
  heroes?: InputMaybe<LayoutCreateManyInlineInput>;
  layouts?: InputMaybe<LayoutCreateManyInlineInput>;
  legacyResourceId: Scalars['String']['input'];
  lock?: InputMaybe<LockCreateOneInlineInput>;
  lockExemption?: InputMaybe<LockCreateOneInlineInput>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CollectionCreateManyInlineInput = {
  /** Connect multiple existing Collection documents */
  connect?: InputMaybe<Array<CollectionWhereUniqueInput>>;
  /** Create and connect multiple existing Collection documents */
  create?: InputMaybe<Array<CollectionCreateInput>>;
};

export type CollectionCreateOneInlineInput = {
  /** Connect one existing Collection document */
  connect?: InputMaybe<CollectionWhereUniqueInput>;
  /** Create and connect one Collection document */
  create?: InputMaybe<CollectionCreateInput>;
};

/** An edge in a connection. */
export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Collection;
};

/** Identifies documents */
export type CollectionManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CollectionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CollectionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CollectionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  customizedSections_every?: InputMaybe<CustomizedSectionWhereInput>;
  customizedSections_none?: InputMaybe<CustomizedSectionWhereInput>;
  customizedSections_some?: InputMaybe<CustomizedSectionWhereInput>;
  documentInStages_every?: InputMaybe<CollectionWhereStageInput>;
  documentInStages_none?: InputMaybe<CollectionWhereStageInput>;
  documentInStages_some?: InputMaybe<CollectionWhereStageInput>;
  gid?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  gid_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  gid_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  gid_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  gid_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  gid_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  gid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  gid_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  gid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  gid_starts_with?: InputMaybe<Scalars['String']['input']>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  legacyResourceId?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  legacyResourceId_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  legacyResourceId_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  legacyResourceId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  legacyResourceId_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  legacyResourceId_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  legacyResourceId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  legacyResourceId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  legacyResourceId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  legacyResourceId_starts_with?: InputMaybe<Scalars['String']['input']>;
  lock?: InputMaybe<LockWhereInput>;
  lockExemption?: InputMaybe<LockWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum CollectionOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  GidAsc = 'gid_ASC',
  GidDesc = 'gid_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LegacyResourceIdAsc = 'legacyResourceId_ASC',
  LegacyResourceIdDesc = 'legacyResourceId_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CollectionUpdateInput = {
  customizedSections?: InputMaybe<CustomizedSectionUpdateManyInlineInput>;
  gid?: InputMaybe<Scalars['String']['input']>;
  heroes?: InputMaybe<LayoutUpdateManyInlineInput>;
  layouts?: InputMaybe<LayoutUpdateManyInlineInput>;
  legacyResourceId?: InputMaybe<Scalars['String']['input']>;
  lock?: InputMaybe<LockUpdateOneInlineInput>;
  lockExemption?: InputMaybe<LockUpdateOneInlineInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CollectionUpdateManyInlineInput = {
  /** Connect multiple existing Collection documents */
  connect?: InputMaybe<Array<CollectionConnectInput>>;
  /** Create and connect multiple Collection documents */
  create?: InputMaybe<Array<CollectionCreateInput>>;
  /** Delete multiple Collection documents */
  delete?: InputMaybe<Array<CollectionWhereUniqueInput>>;
  /** Disconnect multiple Collection documents */
  disconnect?: InputMaybe<Array<CollectionWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Collection documents */
  set?: InputMaybe<Array<CollectionWhereUniqueInput>>;
  /** Update multiple Collection documents */
  update?: InputMaybe<Array<CollectionUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Collection documents */
  upsert?: InputMaybe<Array<CollectionUpsertWithNestedWhereUniqueInput>>;
};

export type CollectionUpdateManyInput = {
  legacyResourceId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CollectionUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: CollectionUpdateManyInput;
  /** Document search */
  where: CollectionWhereInput;
};

export type CollectionUpdateOneInlineInput = {
  /** Connect existing Collection document */
  connect?: InputMaybe<CollectionWhereUniqueInput>;
  /** Create and connect one Collection document */
  create?: InputMaybe<CollectionCreateInput>;
  /** Delete currently connected Collection document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Collection document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Collection document */
  update?: InputMaybe<CollectionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Collection document */
  upsert?: InputMaybe<CollectionUpsertWithNestedWhereUniqueInput>;
};

export type CollectionUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: CollectionUpdateInput;
  /** Unique document search */
  where: CollectionWhereUniqueInput;
};

export type CollectionUpsertInput = {
  /** Create document if it didn't exist */
  create: CollectionCreateInput;
  /** Update document if it exists */
  update: CollectionUpdateInput;
};

export type CollectionUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: CollectionUpsertInput;
  /** Unique document search */
  where: CollectionWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CollectionWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type CollectionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CollectionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CollectionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CollectionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  customizedSections_every?: InputMaybe<CustomizedSectionWhereInput>;
  customizedSections_none?: InputMaybe<CustomizedSectionWhereInput>;
  customizedSections_some?: InputMaybe<CustomizedSectionWhereInput>;
  documentInStages_every?: InputMaybe<CollectionWhereStageInput>;
  documentInStages_none?: InputMaybe<CollectionWhereStageInput>;
  documentInStages_some?: InputMaybe<CollectionWhereStageInput>;
  gid?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  gid_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  gid_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  gid_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  gid_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  gid_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  gid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  gid_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  gid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  gid_starts_with?: InputMaybe<Scalars['String']['input']>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  legacyResourceId?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  legacyResourceId_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  legacyResourceId_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  legacyResourceId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  legacyResourceId_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  legacyResourceId_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  legacyResourceId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  legacyResourceId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  legacyResourceId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  legacyResourceId_starts_with?: InputMaybe<Scalars['String']['input']>;
  lock?: InputMaybe<LockWhereInput>;
  lockExemption?: InputMaybe<LockWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CollectionWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CollectionWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CollectionWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CollectionWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<CollectionWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Collection record uniquely */
export type CollectionWhereUniqueInput = {
  gid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  __typename?: 'Color';
  css: Scalars['String']['output'];
  hex: Scalars['Hex']['output'];
  rgba: Rgba;
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: InputMaybe<Scalars['Hex']['input']>;
  rgba?: InputMaybe<RgbaInput>;
};

export type CombinedListing = Entity & Node & {
  __typename?: 'CombinedListing';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  description?: Maybe<RichText>;
  /** Get the document in other stages */
  documentInStages: Array<CombinedListing>;
  editorial?: Maybe<Editorial>;
  event: Array<Event>;
  /** (incomplete) If true, the products linked in this combined listing, will be part of a combined product page.  */
  hasCombinedProductPage?: Maybe<Scalars['Boolean']['output']>;
  /** List of CombinedListing versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  media: Array<Asset>;
  products: Array<Product>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type CombinedListingCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CombinedListingDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type CombinedListingEditorialArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CombinedListingEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereInput>;
};


export type CombinedListingHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type CombinedListingMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetWhereInput>;
};


export type CombinedListingProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ProductOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProductWhereInput>;
};


export type CombinedListingPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CombinedListingScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type CombinedListingUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type CombinedListingConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: CombinedListingWhereUniqueInput;
};

/** A connection to a list of items. */
export type CombinedListingConnection = {
  __typename?: 'CombinedListingConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<CombinedListingEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type CombinedListingCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['RichTextAST']['input']>;
  editorial?: InputMaybe<EditorialCreateOneInlineInput>;
  event?: InputMaybe<EventCreateManyInlineInput>;
  hasCombinedProductPage?: InputMaybe<Scalars['Boolean']['input']>;
  media?: InputMaybe<AssetCreateManyInlineInput>;
  products?: InputMaybe<ProductCreateManyInlineInput>;
  slug: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CombinedListingCreateManyInlineInput = {
  /** Connect multiple existing CombinedListing documents */
  connect?: InputMaybe<Array<CombinedListingWhereUniqueInput>>;
  /** Create and connect multiple existing CombinedListing documents */
  create?: InputMaybe<Array<CombinedListingCreateInput>>;
};

export type CombinedListingCreateOneInlineInput = {
  /** Connect one existing CombinedListing document */
  connect?: InputMaybe<CombinedListingWhereUniqueInput>;
  /** Create and connect one CombinedListing document */
  create?: InputMaybe<CombinedListingCreateInput>;
};

/** An edge in a connection. */
export type CombinedListingEdge = {
  __typename?: 'CombinedListingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CombinedListing;
};

/** Identifies documents */
export type CombinedListingManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CombinedListingWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CombinedListingWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CombinedListingWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<CombinedListingWhereStageInput>;
  documentInStages_none?: InputMaybe<CombinedListingWhereStageInput>;
  documentInStages_some?: InputMaybe<CombinedListingWhereStageInput>;
  editorial?: InputMaybe<EditorialWhereInput>;
  event_every?: InputMaybe<EventWhereInput>;
  event_none?: InputMaybe<EventWhereInput>;
  event_some?: InputMaybe<EventWhereInput>;
  hasCombinedProductPage?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  hasCombinedProductPage_not?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  products_every?: InputMaybe<ProductWhereInput>;
  products_none?: InputMaybe<ProductWhereInput>;
  products_some?: InputMaybe<ProductWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum CombinedListingOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  HasCombinedProductPageAsc = 'hasCombinedProductPage_ASC',
  HasCombinedProductPageDesc = 'hasCombinedProductPage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CombinedListingUpdateInput = {
  description?: InputMaybe<Scalars['RichTextAST']['input']>;
  editorial?: InputMaybe<EditorialUpdateOneInlineInput>;
  event?: InputMaybe<EventUpdateManyInlineInput>;
  hasCombinedProductPage?: InputMaybe<Scalars['Boolean']['input']>;
  media?: InputMaybe<AssetUpdateManyInlineInput>;
  products?: InputMaybe<ProductUpdateManyInlineInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CombinedListingUpdateManyInlineInput = {
  /** Connect multiple existing CombinedListing documents */
  connect?: InputMaybe<Array<CombinedListingConnectInput>>;
  /** Create and connect multiple CombinedListing documents */
  create?: InputMaybe<Array<CombinedListingCreateInput>>;
  /** Delete multiple CombinedListing documents */
  delete?: InputMaybe<Array<CombinedListingWhereUniqueInput>>;
  /** Disconnect multiple CombinedListing documents */
  disconnect?: InputMaybe<Array<CombinedListingWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing CombinedListing documents */
  set?: InputMaybe<Array<CombinedListingWhereUniqueInput>>;
  /** Update multiple CombinedListing documents */
  update?: InputMaybe<Array<CombinedListingUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple CombinedListing documents */
  upsert?: InputMaybe<Array<CombinedListingUpsertWithNestedWhereUniqueInput>>;
};

export type CombinedListingUpdateManyInput = {
  description?: InputMaybe<Scalars['RichTextAST']['input']>;
  hasCombinedProductPage?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CombinedListingUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: CombinedListingUpdateManyInput;
  /** Document search */
  where: CombinedListingWhereInput;
};

export type CombinedListingUpdateOneInlineInput = {
  /** Connect existing CombinedListing document */
  connect?: InputMaybe<CombinedListingWhereUniqueInput>;
  /** Create and connect one CombinedListing document */
  create?: InputMaybe<CombinedListingCreateInput>;
  /** Delete currently connected CombinedListing document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected CombinedListing document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single CombinedListing document */
  update?: InputMaybe<CombinedListingUpdateWithNestedWhereUniqueInput>;
  /** Upsert single CombinedListing document */
  upsert?: InputMaybe<CombinedListingUpsertWithNestedWhereUniqueInput>;
};

export type CombinedListingUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: CombinedListingUpdateInput;
  /** Unique document search */
  where: CombinedListingWhereUniqueInput;
};

export type CombinedListingUpsertInput = {
  /** Create document if it didn't exist */
  create: CombinedListingCreateInput;
  /** Update document if it exists */
  update: CombinedListingUpdateInput;
};

export type CombinedListingUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: CombinedListingUpsertInput;
  /** Unique document search */
  where: CombinedListingWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CombinedListingWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type CombinedListingWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CombinedListingWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CombinedListingWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CombinedListingWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<CombinedListingWhereStageInput>;
  documentInStages_none?: InputMaybe<CombinedListingWhereStageInput>;
  documentInStages_some?: InputMaybe<CombinedListingWhereStageInput>;
  editorial?: InputMaybe<EditorialWhereInput>;
  event_every?: InputMaybe<EventWhereInput>;
  event_none?: InputMaybe<EventWhereInput>;
  event_some?: InputMaybe<EventWhereInput>;
  hasCombinedProductPage?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  hasCombinedProductPage_not?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  products_every?: InputMaybe<ProductWhereInput>;
  products_none?: InputMaybe<ProductWhereInput>;
  products_some?: InputMaybe<ProductWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CombinedListingWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CombinedListingWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CombinedListingWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CombinedListingWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<CombinedListingWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References CombinedListing record uniquely */
export type CombinedListingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type ConnectPositionInput = {
  /** Connect document after specified document */
  after?: InputMaybe<Scalars['ID']['input']>;
  /** Connect document before specified document */
  before?: InputMaybe<Scalars['ID']['input']>;
  /** Connect document at last position */
  end?: InputMaybe<Scalars['Boolean']['input']>;
  /** Connect document at first position */
  start?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * - (Collections) List View => Render Collection items in a list
 * - (Collection) Feed => Basic Grid of Product Cards; Default for collections
 * - (Collection) Quick Buy => Render a Collection of "Enriched Products" as a duplex with a product selector and add to cart button.
 */
export enum ContentStyle {
  Cards = 'Cards',
  Carousel = 'Carousel',
  Duplex = 'Duplex',
  Gallery = 'Gallery',
  Grid = 'Grid',
  Hero = 'Hero',
  List = 'List',
  QuickBuy = 'QuickBuy',
  Sticky = 'Sticky',
  Swimlane = 'Swimlane',
  Tiles = 'Tiles'
}

export type CountdownComponent = Entity & {
  __typename?: 'CountdownComponent';
  countdown?: Maybe<Lock>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  preview?: Maybe<CountdownConfigurationPreview>;
  /** System stage field */
  stage: Stage;
};


export type CountdownComponentCountdownArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CountdownComponentPreviewArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type CountdownComponentConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: CountdownComponentWhereUniqueInput;
};

/** A connection to a list of items. */
export type CountdownComponentConnection = {
  __typename?: 'CountdownComponentConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<CountdownComponentEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type CountdownComponentCreateInput = {
  countdown?: InputMaybe<LockCreateOneInlineInput>;
  preview?: InputMaybe<CountdownConfigurationPreviewCreateOneInlineInput>;
};

export type CountdownComponentCreateManyInlineInput = {
  /** Create and connect multiple existing CountdownComponent documents */
  create?: InputMaybe<Array<CountdownComponentCreateInput>>;
};

export type CountdownComponentCreateOneInlineInput = {
  /** Create and connect one CountdownComponent document */
  create?: InputMaybe<CountdownComponentCreateInput>;
};

export type CountdownComponentCreateWithPositionInput = {
  /** Document to create */
  data: CountdownComponentCreateInput;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
};

/** An edge in a connection. */
export type CountdownComponentEdge = {
  __typename?: 'CountdownComponentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CountdownComponent;
};

/** Identifies documents */
export type CountdownComponentManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CountdownComponentWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CountdownComponentWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CountdownComponentWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  countdown?: InputMaybe<LockWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values in which the union is connected to the given models */
  preview?: InputMaybe<CountdownConfigurationPreviewWhereInput>;
  /** All values in which the union is empty */
  preview_empty?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CountdownComponentOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC'
}

export type CountdownComponentUpdateInput = {
  countdown?: InputMaybe<LockUpdateOneInlineInput>;
  preview?: InputMaybe<CountdownConfigurationPreviewUpdateOneInlineInput>;
};

export type CountdownComponentUpdateManyInlineInput = {
  /** Create and connect multiple CountdownComponent component instances */
  create?: InputMaybe<Array<CountdownComponentCreateWithPositionInput>>;
  /** Delete multiple CountdownComponent documents */
  delete?: InputMaybe<Array<CountdownComponentWhereUniqueInput>>;
  /** Update multiple CountdownComponent component instances */
  update?: InputMaybe<Array<CountdownComponentUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple CountdownComponent component instances */
  upsert?: InputMaybe<Array<CountdownComponentUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type CountdownComponentUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: InputMaybe<Scalars['String']['input']>;
};

export type CountdownComponentUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: CountdownComponentUpdateManyInput;
  /** Document search */
  where: CountdownComponentWhereInput;
};

export type CountdownComponentUpdateOneInlineInput = {
  /** Create and connect one CountdownComponent document */
  create?: InputMaybe<CountdownComponentCreateInput>;
  /** Delete currently connected CountdownComponent document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single CountdownComponent document */
  update?: InputMaybe<CountdownComponentUpdateWithNestedWhereUniqueInput>;
  /** Upsert single CountdownComponent document */
  upsert?: InputMaybe<CountdownComponentUpsertWithNestedWhereUniqueInput>;
};

export type CountdownComponentUpdateWithNestedWhereUniqueAndPositionInput = {
  /** Document to update */
  data?: InputMaybe<CountdownComponentUpdateInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: CountdownComponentWhereUniqueInput;
};

export type CountdownComponentUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: CountdownComponentUpdateInput;
  /** Unique document search */
  where: CountdownComponentWhereUniqueInput;
};

export type CountdownComponentUpsertInput = {
  /** Create document if it didn't exist */
  create: CountdownComponentCreateInput;
  /** Update document if it exists */
  update: CountdownComponentUpdateInput;
};

export type CountdownComponentUpsertWithNestedWhereUniqueAndPositionInput = {
  /** Document to upsert */
  data?: InputMaybe<CountdownComponentUpsertInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: CountdownComponentWhereUniqueInput;
};

export type CountdownComponentUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: CountdownComponentUpsertInput;
  /** Unique document search */
  where: CountdownComponentWhereUniqueInput;
};

/** Identifies documents */
export type CountdownComponentWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CountdownComponentWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CountdownComponentWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CountdownComponentWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  countdown?: InputMaybe<LockWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values in which the union is connected to the given models */
  preview?: InputMaybe<CountdownConfigurationPreviewWhereInput>;
  /** All values in which the union is empty */
  preview_empty?: InputMaybe<Scalars['Boolean']['input']>;
};

/** References CountdownComponent record uniquely */
export type CountdownComponentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Override the default appearance of a section using the available options */
export type CustomizedSection = Entity & Node & {
  __typename?: 'CustomizedSection';
  /** Assign an alternate layout to this section. Only some options work for specific content types, which are outlined in the brackets. */
  alternateLayout?: Maybe<AlternateSectionLayout>;
  content?: Maybe<CustomizedSectionContent>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<CustomizedSection>;
  heading?: Maybe<Scalars['String']['output']>;
  /** List of CustomizedSection versions */
  history: Array<Version>;
  /** Uses a suitable default if no option is provided. */
  horizontalPadding?: Maybe<Sizes>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  internalName?: Maybe<Scalars['String']['output']>;
  layouts: Array<Layout>;
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<CustomizedSection>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Where applicable, enable this option to switch the order that elements appear on the page. */
  reverseLayout?: Maybe<Scalars['Boolean']['output']>;
  scheduledIn: Array<ScheduledOperation>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  theme?: Maybe<Theme>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  /** Override the default padding above and below the section using this option. */
  verticalPadding?: Maybe<Sizes>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionContentArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  locales?: Array<Locale>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionThemeArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Override the default appearance of a section using the available options */
export type CustomizedSectionUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type CustomizedSectionConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: CustomizedSectionWhereUniqueInput;
};

/** A connection to a list of items. */
export type CustomizedSectionConnection = {
  __typename?: 'CustomizedSectionConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<CustomizedSectionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type CustomizedSectionContent = Collection | MixedMedia;

export type CustomizedSectionContentConnectInput = {
  Collection?: InputMaybe<CollectionConnectInput>;
  MixedMedia?: InputMaybe<MixedMediaConnectInput>;
};

export type CustomizedSectionContentCreateInput = {
  Collection?: InputMaybe<CollectionCreateInput>;
  MixedMedia?: InputMaybe<MixedMediaCreateInput>;
};

export type CustomizedSectionContentCreateManyInlineInput = {
  /** Connect multiple existing CustomizedSectionContent documents */
  connect?: InputMaybe<Array<CustomizedSectionContentWhereUniqueInput>>;
  /** Create and connect multiple existing CustomizedSectionContent documents */
  create?: InputMaybe<Array<CustomizedSectionContentCreateInput>>;
};

export type CustomizedSectionContentCreateOneInlineInput = {
  /** Connect one existing CustomizedSectionContent document */
  connect?: InputMaybe<CustomizedSectionContentWhereUniqueInput>;
  /** Create and connect one CustomizedSectionContent document */
  create?: InputMaybe<CustomizedSectionContentCreateInput>;
};

export type CustomizedSectionContentUpdateInput = {
  Collection?: InputMaybe<CollectionUpdateInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateInput>;
};

export type CustomizedSectionContentUpdateManyInlineInput = {
  /** Connect multiple existing CustomizedSectionContent documents */
  connect?: InputMaybe<Array<CustomizedSectionContentConnectInput>>;
  /** Create and connect multiple CustomizedSectionContent documents */
  create?: InputMaybe<Array<CustomizedSectionContentCreateInput>>;
  /** Delete multiple CustomizedSectionContent documents */
  delete?: InputMaybe<Array<CustomizedSectionContentWhereUniqueInput>>;
  /** Disconnect multiple CustomizedSectionContent documents */
  disconnect?: InputMaybe<Array<CustomizedSectionContentWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing CustomizedSectionContent documents */
  set?: InputMaybe<Array<CustomizedSectionContentWhereUniqueInput>>;
  /** Update multiple CustomizedSectionContent documents */
  update?: InputMaybe<Array<CustomizedSectionContentUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple CustomizedSectionContent documents */
  upsert?: InputMaybe<Array<CustomizedSectionContentUpsertWithNestedWhereUniqueInput>>;
};

export type CustomizedSectionContentUpdateManyWithNestedWhereInput = {
  Collection?: InputMaybe<CollectionUpdateManyWithNestedWhereInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateManyWithNestedWhereInput>;
};

export type CustomizedSectionContentUpdateOneInlineInput = {
  /** Connect existing CustomizedSectionContent document */
  connect?: InputMaybe<CustomizedSectionContentWhereUniqueInput>;
  /** Create and connect one CustomizedSectionContent document */
  create?: InputMaybe<CustomizedSectionContentCreateInput>;
  /** Delete currently connected CustomizedSectionContent document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected CustomizedSectionContent document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single CustomizedSectionContent document */
  update?: InputMaybe<CustomizedSectionContentUpdateWithNestedWhereUniqueInput>;
  /** Upsert single CustomizedSectionContent document */
  upsert?: InputMaybe<CustomizedSectionContentUpsertWithNestedWhereUniqueInput>;
};

export type CustomizedSectionContentUpdateWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpdateWithNestedWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateWithNestedWhereUniqueInput>;
};

export type CustomizedSectionContentUpsertWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpsertWithNestedWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaUpsertWithNestedWhereUniqueInput>;
};

export type CustomizedSectionContentWhereInput = {
  Collection?: InputMaybe<CollectionWhereInput>;
  MixedMedia?: InputMaybe<MixedMediaWhereInput>;
};

export type CustomizedSectionContentWhereUniqueInput = {
  Collection?: InputMaybe<CollectionWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaWhereUniqueInput>;
};

export type CustomizedSectionCreateInput = {
  alternateLayout?: InputMaybe<AlternateSectionLayout>;
  content?: InputMaybe<CustomizedSectionContentCreateOneInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** heading input for default locale (en) */
  heading?: InputMaybe<Scalars['String']['input']>;
  horizontalPadding?: InputMaybe<Sizes>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  layouts?: InputMaybe<LayoutCreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<CustomizedSectionCreateLocalizationsInput>;
  reverseLayout?: InputMaybe<Scalars['Boolean']['input']>;
  slug: Scalars['String']['input'];
  theme?: InputMaybe<ThemeCreateOneInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  verticalPadding?: InputMaybe<Sizes>;
};

export type CustomizedSectionCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  heading?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CustomizedSectionCreateLocalizationInput = {
  /** Localization input */
  data: CustomizedSectionCreateLocalizationDataInput;
  locale: Locale;
};

export type CustomizedSectionCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<CustomizedSectionCreateLocalizationInput>>;
};

export type CustomizedSectionCreateManyInlineInput = {
  /** Connect multiple existing CustomizedSection documents */
  connect?: InputMaybe<Array<CustomizedSectionWhereUniqueInput>>;
  /** Create and connect multiple existing CustomizedSection documents */
  create?: InputMaybe<Array<CustomizedSectionCreateInput>>;
};

export type CustomizedSectionCreateOneInlineInput = {
  /** Connect one existing CustomizedSection document */
  connect?: InputMaybe<CustomizedSectionWhereUniqueInput>;
  /** Create and connect one CustomizedSection document */
  create?: InputMaybe<CustomizedSectionCreateInput>;
};

/** An edge in a connection. */
export type CustomizedSectionEdge = {
  __typename?: 'CustomizedSectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CustomizedSection;
};

/** Identifies documents */
export type CustomizedSectionManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CustomizedSectionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CustomizedSectionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CustomizedSectionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  alternateLayout?: InputMaybe<AlternateSectionLayout>;
  /** All values that are contained in given list. */
  alternateLayout_in?: InputMaybe<Array<InputMaybe<AlternateSectionLayout>>>;
  /** Any other value that exists and is not equal to the given value. */
  alternateLayout_not?: InputMaybe<AlternateSectionLayout>;
  /** All values that are not contained in given list. */
  alternateLayout_not_in?: InputMaybe<Array<InputMaybe<AlternateSectionLayout>>>;
  /** All values in which the union is connected to the given models */
  content?: InputMaybe<CustomizedSectionContentWhereInput>;
  /** All values in which the union is empty */
  content_empty?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<CustomizedSectionWhereStageInput>;
  documentInStages_none?: InputMaybe<CustomizedSectionWhereStageInput>;
  documentInStages_some?: InputMaybe<CustomizedSectionWhereStageInput>;
  horizontalPadding?: InputMaybe<Sizes>;
  /** All values that are contained in given list. */
  horizontalPadding_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  /** Any other value that exists and is not equal to the given value. */
  horizontalPadding_not?: InputMaybe<Sizes>;
  /** All values that are not contained in given list. */
  horizontalPadding_not_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  reverseLayout?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  reverseLayout_not?: InputMaybe<Scalars['Boolean']['input']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<ThemeWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  verticalPadding?: InputMaybe<Sizes>;
  /** All values that are contained in given list. */
  verticalPadding_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  /** Any other value that exists and is not equal to the given value. */
  verticalPadding_not?: InputMaybe<Sizes>;
  /** All values that are not contained in given list. */
  verticalPadding_not_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
};

export enum CustomizedSectionOrderByInput {
  AlternateLayoutAsc = 'alternateLayout_ASC',
  AlternateLayoutDesc = 'alternateLayout_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  HeadingAsc = 'heading_ASC',
  HeadingDesc = 'heading_DESC',
  HorizontalPaddingAsc = 'horizontalPadding_ASC',
  HorizontalPaddingDesc = 'horizontalPadding_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ReverseLayoutAsc = 'reverseLayout_ASC',
  ReverseLayoutDesc = 'reverseLayout_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VerticalPaddingAsc = 'verticalPadding_ASC',
  VerticalPaddingDesc = 'verticalPadding_DESC'
}

export type CustomizedSectionUpdateInput = {
  alternateLayout?: InputMaybe<AlternateSectionLayout>;
  content?: InputMaybe<CustomizedSectionContentUpdateOneInlineInput>;
  /** heading input for default locale (en) */
  heading?: InputMaybe<Scalars['String']['input']>;
  horizontalPadding?: InputMaybe<Sizes>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  layouts?: InputMaybe<LayoutUpdateManyInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<CustomizedSectionUpdateLocalizationsInput>;
  reverseLayout?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<ThemeUpdateOneInlineInput>;
  verticalPadding?: InputMaybe<Sizes>;
};

export type CustomizedSectionUpdateLocalizationDataInput = {
  heading?: InputMaybe<Scalars['String']['input']>;
};

export type CustomizedSectionUpdateLocalizationInput = {
  data: CustomizedSectionUpdateLocalizationDataInput;
  locale: Locale;
};

export type CustomizedSectionUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<CustomizedSectionCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<CustomizedSectionUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<CustomizedSectionUpsertLocalizationInput>>;
};

export type CustomizedSectionUpdateManyInlineInput = {
  /** Connect multiple existing CustomizedSection documents */
  connect?: InputMaybe<Array<CustomizedSectionConnectInput>>;
  /** Create and connect multiple CustomizedSection documents */
  create?: InputMaybe<Array<CustomizedSectionCreateInput>>;
  /** Delete multiple CustomizedSection documents */
  delete?: InputMaybe<Array<CustomizedSectionWhereUniqueInput>>;
  /** Disconnect multiple CustomizedSection documents */
  disconnect?: InputMaybe<Array<CustomizedSectionWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing CustomizedSection documents */
  set?: InputMaybe<Array<CustomizedSectionWhereUniqueInput>>;
  /** Update multiple CustomizedSection documents */
  update?: InputMaybe<Array<CustomizedSectionUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple CustomizedSection documents */
  upsert?: InputMaybe<Array<CustomizedSectionUpsertWithNestedWhereUniqueInput>>;
};

export type CustomizedSectionUpdateManyInput = {
  alternateLayout?: InputMaybe<AlternateSectionLayout>;
  /** heading input for default locale (en) */
  heading?: InputMaybe<Scalars['String']['input']>;
  horizontalPadding?: InputMaybe<Sizes>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<CustomizedSectionUpdateManyLocalizationsInput>;
  reverseLayout?: InputMaybe<Scalars['Boolean']['input']>;
  verticalPadding?: InputMaybe<Sizes>;
};

export type CustomizedSectionUpdateManyLocalizationDataInput = {
  heading?: InputMaybe<Scalars['String']['input']>;
};

export type CustomizedSectionUpdateManyLocalizationInput = {
  data: CustomizedSectionUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type CustomizedSectionUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<CustomizedSectionUpdateManyLocalizationInput>>;
};

export type CustomizedSectionUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: CustomizedSectionUpdateManyInput;
  /** Document search */
  where: CustomizedSectionWhereInput;
};

export type CustomizedSectionUpdateOneInlineInput = {
  /** Connect existing CustomizedSection document */
  connect?: InputMaybe<CustomizedSectionWhereUniqueInput>;
  /** Create and connect one CustomizedSection document */
  create?: InputMaybe<CustomizedSectionCreateInput>;
  /** Delete currently connected CustomizedSection document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected CustomizedSection document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single CustomizedSection document */
  update?: InputMaybe<CustomizedSectionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single CustomizedSection document */
  upsert?: InputMaybe<CustomizedSectionUpsertWithNestedWhereUniqueInput>;
};

export type CustomizedSectionUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: CustomizedSectionUpdateInput;
  /** Unique document search */
  where: CustomizedSectionWhereUniqueInput;
};

export type CustomizedSectionUpsertInput = {
  /** Create document if it didn't exist */
  create: CustomizedSectionCreateInput;
  /** Update document if it exists */
  update: CustomizedSectionUpdateInput;
};

export type CustomizedSectionUpsertLocalizationInput = {
  create: CustomizedSectionCreateLocalizationDataInput;
  locale: Locale;
  update: CustomizedSectionUpdateLocalizationDataInput;
};

export type CustomizedSectionUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: CustomizedSectionUpsertInput;
  /** Unique document search */
  where: CustomizedSectionWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CustomizedSectionWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type CustomizedSectionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CustomizedSectionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CustomizedSectionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CustomizedSectionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  alternateLayout?: InputMaybe<AlternateSectionLayout>;
  /** All values that are contained in given list. */
  alternateLayout_in?: InputMaybe<Array<InputMaybe<AlternateSectionLayout>>>;
  /** Any other value that exists and is not equal to the given value. */
  alternateLayout_not?: InputMaybe<AlternateSectionLayout>;
  /** All values that are not contained in given list. */
  alternateLayout_not_in?: InputMaybe<Array<InputMaybe<AlternateSectionLayout>>>;
  /** All values in which the union is connected to the given models */
  content?: InputMaybe<CustomizedSectionContentWhereInput>;
  /** All values in which the union is empty */
  content_empty?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<CustomizedSectionWhereStageInput>;
  documentInStages_none?: InputMaybe<CustomizedSectionWhereStageInput>;
  documentInStages_some?: InputMaybe<CustomizedSectionWhereStageInput>;
  heading?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  heading_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  heading_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  heading_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  heading_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  heading_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  heading_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  heading_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  heading_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  heading_starts_with?: InputMaybe<Scalars['String']['input']>;
  horizontalPadding?: InputMaybe<Sizes>;
  /** All values that are contained in given list. */
  horizontalPadding_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  /** Any other value that exists and is not equal to the given value. */
  horizontalPadding_not?: InputMaybe<Sizes>;
  /** All values that are not contained in given list. */
  horizontalPadding_not_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  reverseLayout?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  reverseLayout_not?: InputMaybe<Scalars['Boolean']['input']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<ThemeWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  verticalPadding?: InputMaybe<Sizes>;
  /** All values that are contained in given list. */
  verticalPadding_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  /** Any other value that exists and is not equal to the given value. */
  verticalPadding_not?: InputMaybe<Sizes>;
  /** All values that are not contained in given list. */
  verticalPadding_not_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CustomizedSectionWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CustomizedSectionWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CustomizedSectionWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CustomizedSectionWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<CustomizedSectionWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References CustomizedSection record uniquely */
export type CustomizedSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type DisplayOption = Entity & {
  __typename?: 'DisplayOption';
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** System stage field */
  stage: Stage;
  theme?: Maybe<Theme>;
};


export type DisplayOptionThemeArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type DisplayOptionConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: DisplayOptionWhereUniqueInput;
};

/** A connection to a list of items. */
export type DisplayOptionConnection = {
  __typename?: 'DisplayOptionConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<DisplayOptionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type DisplayOptionCreateInput = {
  theme?: InputMaybe<ThemeCreateOneInlineInput>;
};

export type DisplayOptionCreateManyInlineInput = {
  /** Create and connect multiple existing DisplayOption documents */
  create?: InputMaybe<Array<DisplayOptionCreateInput>>;
};

export type DisplayOptionCreateOneInlineInput = {
  /** Create and connect one DisplayOption document */
  create?: InputMaybe<DisplayOptionCreateInput>;
};

export type DisplayOptionCreateWithPositionInput = {
  /** Document to create */
  data: DisplayOptionCreateInput;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
};

/** An edge in a connection. */
export type DisplayOptionEdge = {
  __typename?: 'DisplayOptionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: DisplayOption;
};

/** Identifies documents */
export type DisplayOptionManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DisplayOptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DisplayOptionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DisplayOptionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  theme?: InputMaybe<ThemeWhereInput>;
};

export enum DisplayOptionOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC'
}

export type DisplayOptionParent = Block;

export type DisplayOptionParentConnectInput = {
  Block?: InputMaybe<BlockConnectInput>;
};

export type DisplayOptionParentCreateInput = {
  Block?: InputMaybe<BlockCreateInput>;
};

export type DisplayOptionParentCreateManyInlineInput = {
  /** Create and connect multiple existing DisplayOptionParent documents */
  create?: InputMaybe<Array<DisplayOptionParentCreateInput>>;
};

export type DisplayOptionParentCreateOneInlineInput = {
  /** Create and connect one DisplayOptionParent document */
  create?: InputMaybe<DisplayOptionParentCreateInput>;
};

export type DisplayOptionParentCreateWithPositionInput = {
  Block?: InputMaybe<BlockCreateWithPositionInput>;
};

export type DisplayOptionParentUpdateInput = {
  Block?: InputMaybe<BlockUpdateInput>;
};

export type DisplayOptionParentUpdateManyInlineInput = {
  /** Create and connect multiple DisplayOptionParent component instances */
  create?: InputMaybe<Array<DisplayOptionParentCreateWithPositionInput>>;
  /** Delete multiple DisplayOptionParent documents */
  delete?: InputMaybe<Array<DisplayOptionParentWhereUniqueInput>>;
  /** Update multiple DisplayOptionParent component instances */
  update?: InputMaybe<Array<DisplayOptionParentUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple DisplayOptionParent component instances */
  upsert?: InputMaybe<Array<DisplayOptionParentUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type DisplayOptionParentUpdateManyWithNestedWhereInput = {
  Block?: InputMaybe<BlockUpdateManyWithNestedWhereInput>;
};

export type DisplayOptionParentUpdateOneInlineInput = {
  /** Create and connect one DisplayOptionParent document */
  create?: InputMaybe<DisplayOptionParentCreateInput>;
  /** Delete currently connected DisplayOptionParent document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single DisplayOptionParent document */
  update?: InputMaybe<DisplayOptionParentUpdateWithNestedWhereUniqueInput>;
  /** Upsert single DisplayOptionParent document */
  upsert?: InputMaybe<DisplayOptionParentUpsertWithNestedWhereUniqueInput>;
};

export type DisplayOptionParentUpdateWithNestedWhereUniqueAndPositionInput = {
  Block?: InputMaybe<BlockUpdateWithNestedWhereUniqueAndPositionInput>;
};

export type DisplayOptionParentUpdateWithNestedWhereUniqueInput = {
  Block?: InputMaybe<BlockUpdateWithNestedWhereUniqueInput>;
};

export type DisplayOptionParentUpsertWithNestedWhereUniqueAndPositionInput = {
  Block?: InputMaybe<BlockUpsertWithNestedWhereUniqueAndPositionInput>;
};

export type DisplayOptionParentUpsertWithNestedWhereUniqueInput = {
  Block?: InputMaybe<BlockUpsertWithNestedWhereUniqueInput>;
};

export type DisplayOptionParentWhereInput = {
  Block?: InputMaybe<BlockWhereInput>;
};

export type DisplayOptionParentWhereUniqueInput = {
  Block?: InputMaybe<BlockWhereUniqueInput>;
};

export type DisplayOptionUpdateInput = {
  theme?: InputMaybe<ThemeUpdateOneInlineInput>;
};

export type DisplayOptionUpdateManyInlineInput = {
  /** Create and connect multiple DisplayOption component instances */
  create?: InputMaybe<Array<DisplayOptionCreateWithPositionInput>>;
  /** Delete multiple DisplayOption documents */
  delete?: InputMaybe<Array<DisplayOptionWhereUniqueInput>>;
  /** Update multiple DisplayOption component instances */
  update?: InputMaybe<Array<DisplayOptionUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple DisplayOption component instances */
  upsert?: InputMaybe<Array<DisplayOptionUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type DisplayOptionUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: InputMaybe<Scalars['String']['input']>;
};

export type DisplayOptionUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: DisplayOptionUpdateManyInput;
  /** Document search */
  where: DisplayOptionWhereInput;
};

export type DisplayOptionUpdateOneInlineInput = {
  /** Create and connect one DisplayOption document */
  create?: InputMaybe<DisplayOptionCreateInput>;
  /** Delete currently connected DisplayOption document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single DisplayOption document */
  update?: InputMaybe<DisplayOptionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single DisplayOption document */
  upsert?: InputMaybe<DisplayOptionUpsertWithNestedWhereUniqueInput>;
};

export type DisplayOptionUpdateWithNestedWhereUniqueAndPositionInput = {
  /** Document to update */
  data?: InputMaybe<DisplayOptionUpdateInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: DisplayOptionWhereUniqueInput;
};

export type DisplayOptionUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: DisplayOptionUpdateInput;
  /** Unique document search */
  where: DisplayOptionWhereUniqueInput;
};

export type DisplayOptionUpsertInput = {
  /** Create document if it didn't exist */
  create: DisplayOptionCreateInput;
  /** Update document if it exists */
  update: DisplayOptionUpdateInput;
};

export type DisplayOptionUpsertWithNestedWhereUniqueAndPositionInput = {
  /** Document to upsert */
  data?: InputMaybe<DisplayOptionUpsertInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: DisplayOptionWhereUniqueInput;
};

export type DisplayOptionUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: DisplayOptionUpsertInput;
  /** Unique document search */
  where: DisplayOptionWhereUniqueInput;
};

/** Identifies documents */
export type DisplayOptionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DisplayOptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DisplayOptionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DisplayOptionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  theme?: InputMaybe<ThemeWhereInput>;
};

/** References DisplayOption record uniquely */
export type DisplayOptionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum DocumentFileTypes {
  /** Automatically selects the best format for the image based on the browser's capabilities. */
  AutoImage = 'autoImage',
  Avif = 'avif',
  Bmp = 'bmp',
  Gif = 'gif',
  Heic = 'heic',
  Jpg = 'jpg',
  Png = 'png',
  Svg = 'svg',
  Tiff = 'tiff',
  Webp = 'webp'
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * JPG:	autoImage, bmp, gif, jpg, png, webp, tiff
   * PNG:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * SVG:	autoImage, bmp, gif, jpg, png, webp, tiff
   * WEBP:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * GIF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * TIFF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * AVIF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * PDF: 	autoImage, gif, jpg, png, webp, tiff
   *
   */
  format?: InputMaybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: InputMaybe<DocumentOutputInput>;
};

export type DocumentVersion = {
  __typename?: 'DocumentVersion';
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['Json']['output']>;
  id: Scalars['ID']['output'];
  revision: Scalars['Int']['output'];
  stage: Stage;
};

export type Editorial = Entity & Node & {
  __typename?: 'Editorial';
  archive: Array<Archive>;
  artistStatement?: Maybe<EditorialArtistStatementRichText>;
  combinedListings: Array<CombinedListing>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  credits: Array<Person>;
  /** Get the document in other stages */
  documentInStages: Array<Editorial>;
  event?: Maybe<Event>;
  /** Used as preview text on CTAs. */
  excerpt?: Maybe<RichText>;
  /** Image or Video */
  featuredMedia?: Maybe<Asset>;
  heroes: Array<Layout>;
  /** List of Editorial versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Editorial>;
  lock?: Maybe<Lock>;
  lockExemption?: Maybe<Lock>;
  mainContent?: Maybe<EditorialMainContentRichText>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  seo?: Maybe<Seo>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type EditorialArchiveArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ArchiveWhereInput>;
};


export type EditorialCombinedListingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<CombinedListingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CombinedListingWhereInput>;
};


export type EditorialCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type EditorialCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EditorialCreditsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<PersonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PersonWhereInput>;
};


export type EditorialDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type EditorialEventArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EditorialFeaturedMediaArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type EditorialHeroesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type EditorialHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type EditorialLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  locales?: Array<Locale>;
};


export type EditorialLockArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EditorialLockExemptionArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EditorialPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type EditorialPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EditorialScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type EditorialSeoArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EditorialUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type EditorialUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type EditorialArtistStatementRichText = {
  __typename?: 'EditorialArtistStatementRichText';
  /** Returns HTMl representation */
  html: Scalars['String']['output'];
  json: Scalars['RichTextAST']['output'];
  /** Returns Markdown representation */
  markdown: Scalars['String']['output'];
  /** @deprecated Please use the 'json' field */
  raw: Scalars['RichTextAST']['output'];
  references: Array<EditorialArtistStatementRichTextEmbeddedTypes>;
  /** Returns plain-text contents of RichText */
  text: Scalars['String']['output'];
};


export type EditorialArtistStatementRichTextReferencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type EditorialArtistStatementRichTextEmbeddedTypes = Form;

export type EditorialConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: EditorialWhereUniqueInput;
};

/** A connection to a list of items. */
export type EditorialConnection = {
  __typename?: 'EditorialConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<EditorialEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type EditorialCreateInput = {
  archive?: InputMaybe<ArchiveCreateManyInlineInput>;
  artistStatement?: InputMaybe<Scalars['RichTextAST']['input']>;
  combinedListings?: InputMaybe<CombinedListingCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  credits?: InputMaybe<PersonCreateManyInlineInput>;
  event?: InputMaybe<EventCreateOneInlineInput>;
  /** excerpt input for default locale (en) */
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  featuredMedia?: InputMaybe<AssetCreateOneInlineInput>;
  heroes?: InputMaybe<LayoutCreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<EditorialCreateLocalizationsInput>;
  lock?: InputMaybe<LockCreateOneInlineInput>;
  lockExemption?: InputMaybe<LockCreateOneInlineInput>;
  /** mainContent input for default locale (en) */
  mainContent?: InputMaybe<Scalars['RichTextAST']['input']>;
  seo?: InputMaybe<SeoCreateOneInlineInput>;
  slug: Scalars['String']['input'];
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EditorialCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  mainContent?: InputMaybe<Scalars['RichTextAST']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EditorialCreateLocalizationInput = {
  /** Localization input */
  data: EditorialCreateLocalizationDataInput;
  locale: Locale;
};

export type EditorialCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<EditorialCreateLocalizationInput>>;
};

export type EditorialCreateManyInlineInput = {
  /** Connect multiple existing Editorial documents */
  connect?: InputMaybe<Array<EditorialWhereUniqueInput>>;
  /** Create and connect multiple existing Editorial documents */
  create?: InputMaybe<Array<EditorialCreateInput>>;
};

export type EditorialCreateOneInlineInput = {
  /** Connect one existing Editorial document */
  connect?: InputMaybe<EditorialWhereUniqueInput>;
  /** Create and connect one Editorial document */
  create?: InputMaybe<EditorialCreateInput>;
};

/** An edge in a connection. */
export type EditorialEdge = {
  __typename?: 'EditorialEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Editorial;
};

export type EditorialMainContentRichText = {
  __typename?: 'EditorialMainContentRichText';
  /** Returns HTMl representation */
  html: Scalars['String']['output'];
  json: Scalars['RichTextAST']['output'];
  /** Returns Markdown representation */
  markdown: Scalars['String']['output'];
  /** @deprecated Please use the 'json' field */
  raw: Scalars['RichTextAST']['output'];
  references: Array<EditorialMainContentRichTextEmbeddedTypes>;
  /** Returns plain-text contents of RichText */
  text: Scalars['String']['output'];
};


export type EditorialMainContentRichTextReferencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type EditorialMainContentRichTextEmbeddedTypes = Asset | Form | Gallery;

/** Identifies documents */
export type EditorialManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<EditorialWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<EditorialWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<EditorialWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  archive_every?: InputMaybe<ArchiveWhereInput>;
  archive_none?: InputMaybe<ArchiveWhereInput>;
  archive_some?: InputMaybe<ArchiveWhereInput>;
  combinedListings_every?: InputMaybe<CombinedListingWhereInput>;
  combinedListings_none?: InputMaybe<CombinedListingWhereInput>;
  combinedListings_some?: InputMaybe<CombinedListingWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  credits_every?: InputMaybe<PersonWhereInput>;
  credits_none?: InputMaybe<PersonWhereInput>;
  credits_some?: InputMaybe<PersonWhereInput>;
  documentInStages_every?: InputMaybe<EditorialWhereStageInput>;
  documentInStages_none?: InputMaybe<EditorialWhereStageInput>;
  documentInStages_some?: InputMaybe<EditorialWhereStageInput>;
  event?: InputMaybe<EventWhereInput>;
  featuredMedia?: InputMaybe<AssetWhereInput>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  lock?: InputMaybe<LockWhereInput>;
  lockExemption?: InputMaybe<LockWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  seo?: InputMaybe<SeoWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum EditorialOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type EditorialUpdateInput = {
  archive?: InputMaybe<ArchiveUpdateManyInlineInput>;
  artistStatement?: InputMaybe<Scalars['RichTextAST']['input']>;
  combinedListings?: InputMaybe<CombinedListingUpdateManyInlineInput>;
  credits?: InputMaybe<PersonUpdateManyInlineInput>;
  event?: InputMaybe<EventUpdateOneInlineInput>;
  /** excerpt input for default locale (en) */
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  featuredMedia?: InputMaybe<AssetUpdateOneInlineInput>;
  heroes?: InputMaybe<LayoutUpdateManyInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<EditorialUpdateLocalizationsInput>;
  lock?: InputMaybe<LockUpdateOneInlineInput>;
  lockExemption?: InputMaybe<LockUpdateOneInlineInput>;
  /** mainContent input for default locale (en) */
  mainContent?: InputMaybe<Scalars['RichTextAST']['input']>;
  seo?: InputMaybe<SeoUpdateOneInlineInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditorialUpdateLocalizationDataInput = {
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  mainContent?: InputMaybe<Scalars['RichTextAST']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditorialUpdateLocalizationInput = {
  data: EditorialUpdateLocalizationDataInput;
  locale: Locale;
};

export type EditorialUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<EditorialCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<EditorialUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<EditorialUpsertLocalizationInput>>;
};

export type EditorialUpdateManyInlineInput = {
  /** Connect multiple existing Editorial documents */
  connect?: InputMaybe<Array<EditorialConnectInput>>;
  /** Create and connect multiple Editorial documents */
  create?: InputMaybe<Array<EditorialCreateInput>>;
  /** Delete multiple Editorial documents */
  delete?: InputMaybe<Array<EditorialWhereUniqueInput>>;
  /** Disconnect multiple Editorial documents */
  disconnect?: InputMaybe<Array<EditorialWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Editorial documents */
  set?: InputMaybe<Array<EditorialWhereUniqueInput>>;
  /** Update multiple Editorial documents */
  update?: InputMaybe<Array<EditorialUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Editorial documents */
  upsert?: InputMaybe<Array<EditorialUpsertWithNestedWhereUniqueInput>>;
};

export type EditorialUpdateManyInput = {
  artistStatement?: InputMaybe<Scalars['RichTextAST']['input']>;
  /** excerpt input for default locale (en) */
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<EditorialUpdateManyLocalizationsInput>;
  /** mainContent input for default locale (en) */
  mainContent?: InputMaybe<Scalars['RichTextAST']['input']>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditorialUpdateManyLocalizationDataInput = {
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  mainContent?: InputMaybe<Scalars['RichTextAST']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditorialUpdateManyLocalizationInput = {
  data: EditorialUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type EditorialUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<EditorialUpdateManyLocalizationInput>>;
};

export type EditorialUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: EditorialUpdateManyInput;
  /** Document search */
  where: EditorialWhereInput;
};

export type EditorialUpdateOneInlineInput = {
  /** Connect existing Editorial document */
  connect?: InputMaybe<EditorialWhereUniqueInput>;
  /** Create and connect one Editorial document */
  create?: InputMaybe<EditorialCreateInput>;
  /** Delete currently connected Editorial document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Editorial document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Editorial document */
  update?: InputMaybe<EditorialUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Editorial document */
  upsert?: InputMaybe<EditorialUpsertWithNestedWhereUniqueInput>;
};

export type EditorialUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: EditorialUpdateInput;
  /** Unique document search */
  where: EditorialWhereUniqueInput;
};

export type EditorialUpsertInput = {
  /** Create document if it didn't exist */
  create: EditorialCreateInput;
  /** Update document if it exists */
  update: EditorialUpdateInput;
};

export type EditorialUpsertLocalizationInput = {
  create: EditorialCreateLocalizationDataInput;
  locale: Locale;
  update: EditorialUpdateLocalizationDataInput;
};

export type EditorialUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: EditorialUpsertInput;
  /** Unique document search */
  where: EditorialWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type EditorialWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type EditorialWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<EditorialWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<EditorialWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<EditorialWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  archive_every?: InputMaybe<ArchiveWhereInput>;
  archive_none?: InputMaybe<ArchiveWhereInput>;
  archive_some?: InputMaybe<ArchiveWhereInput>;
  combinedListings_every?: InputMaybe<CombinedListingWhereInput>;
  combinedListings_none?: InputMaybe<CombinedListingWhereInput>;
  combinedListings_some?: InputMaybe<CombinedListingWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  credits_every?: InputMaybe<PersonWhereInput>;
  credits_none?: InputMaybe<PersonWhereInput>;
  credits_some?: InputMaybe<PersonWhereInput>;
  documentInStages_every?: InputMaybe<EditorialWhereStageInput>;
  documentInStages_none?: InputMaybe<EditorialWhereStageInput>;
  documentInStages_some?: InputMaybe<EditorialWhereStageInput>;
  event?: InputMaybe<EventWhereInput>;
  featuredMedia?: InputMaybe<AssetWhereInput>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  lock?: InputMaybe<LockWhereInput>;
  lockExemption?: InputMaybe<LockWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  seo?: InputMaybe<SeoWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type EditorialWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<EditorialWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<EditorialWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<EditorialWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<EditorialWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Editorial record uniquely */
export type EditorialWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** An object with an ID */
export type Entity = {
  /** The id of the object. */
  id: Scalars['ID']['output'];
  /** The Stage of an object */
  stage: Stage;
};

/** This enumeration holds all typenames that implement the Entity interface. Components and models implement the Entity interface. */
export enum EntityTypeName {
  Archive = 'Archive',
  /** Asset system model */
  Asset = 'Asset',
  Block = 'Block',
  Collection = 'Collection',
  CombinedListing = 'CombinedListing',
  CountdownComponent = 'CountdownComponent',
  /** Override the default appearance of a section using the available options */
  CustomizedSection = 'CustomizedSection',
  DisplayOption = 'DisplayOption',
  Editorial = 'Editorial',
  Event = 'Event',
  Form = 'Form',
  Gallery = 'Gallery',
  Hero = 'Hero',
  Layout = 'Layout',
  Link = 'Link',
  Lock = 'Lock',
  LockedSection = 'LockedSection',
  MixedMedia = 'MixedMedia',
  Navigation = 'Navigation',
  Page = 'Page',
  Person = 'Person',
  Product = 'Product',
  /** Scheduled Operation system model */
  ScheduledOperation = 'ScheduledOperation',
  /** Scheduled Release system model */
  ScheduledRelease = 'ScheduledRelease',
  Seo = 'Seo',
  Theme = 'Theme',
  /** User system model */
  User = 'User'
}

/** Allows to specify input to query models and components directly */
export type EntityWhereInput = {
  /** The ID of an object */
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Locale>;
  stage: Stage;
  /** The Type name of an object */
  typename: EntityTypeName;
};

export type Event = Entity & Node & {
  __typename?: 'Event';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  date?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<RichText>;
  /** Get the document in other stages */
  documentInStages: Array<Event>;
  editorial?: Maybe<Editorial>;
  /** Used as preview text on CTAs. */
  excerpt?: Maybe<RichText>;
  /** Image/video for Hero Banner */
  featuredMedia?: Maybe<Asset>;
  hasReleasePage: Scalars['Boolean']['output'];
  heroes: Array<Layout>;
  /** List of Event versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  layouts: Array<Layout>;
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Event>;
  lock?: Maybe<Lock>;
  media: Array<Asset>;
  products: Array<EventProducts>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** A unique Identifier for this event */
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type EventCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type EventCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EventDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type EventEditorialArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EventFeaturedMediaArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type EventHeroesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type EventHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type EventLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type EventLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  locales?: Array<Locale>;
};


export type EventLockArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EventMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetWhereInput>;
};


export type EventProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type EventPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type EventPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type EventScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type EventUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type EventUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type EventConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: EventWhereUniqueInput;
};

/** A connection to a list of items. */
export type EventConnection = {
  __typename?: 'EventConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<EventEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type EventCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['RichTextAST']['input']>;
  editorial?: InputMaybe<EditorialCreateOneInlineInput>;
  /** excerpt input for default locale (en) */
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  featuredMedia?: InputMaybe<AssetCreateOneInlineInput>;
  hasReleasePage: Scalars['Boolean']['input'];
  heroes?: InputMaybe<LayoutCreateManyInlineInput>;
  layouts?: InputMaybe<LayoutCreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<EventCreateLocalizationsInput>;
  lock?: InputMaybe<LockCreateOneInlineInput>;
  media?: InputMaybe<AssetCreateManyInlineInput>;
  products?: InputMaybe<EventProductsCreateManyInlineInput>;
  slug: Scalars['String']['input'];
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EventCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EventCreateLocalizationInput = {
  /** Localization input */
  data: EventCreateLocalizationDataInput;
  locale: Locale;
};

export type EventCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<EventCreateLocalizationInput>>;
};

export type EventCreateManyInlineInput = {
  /** Connect multiple existing Event documents */
  connect?: InputMaybe<Array<EventWhereUniqueInput>>;
  /** Create and connect multiple existing Event documents */
  create?: InputMaybe<Array<EventCreateInput>>;
};

export type EventCreateOneInlineInput = {
  /** Connect one existing Event document */
  connect?: InputMaybe<EventWhereUniqueInput>;
  /** Create and connect one Event document */
  create?: InputMaybe<EventCreateInput>;
};

/** An edge in a connection. */
export type EventEdge = {
  __typename?: 'EventEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Event;
};

/** Identifies documents */
export type EventManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<EventWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<EventWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<EventWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  documentInStages_every?: InputMaybe<EventWhereStageInput>;
  documentInStages_none?: InputMaybe<EventWhereStageInput>;
  documentInStages_some?: InputMaybe<EventWhereStageInput>;
  editorial?: InputMaybe<EditorialWhereInput>;
  featuredMedia?: InputMaybe<AssetWhereInput>;
  hasReleasePage?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  hasReleasePage_not?: InputMaybe<Scalars['Boolean']['input']>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  lock?: InputMaybe<LockWhereInput>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  /** All values in which the union is empty */
  products_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  products_some?: InputMaybe<EventProductsWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum EventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  HasReleasePageAsc = 'hasReleasePage_ASC',
  HasReleasePageDesc = 'hasReleasePage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type EventUpdateInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['RichTextAST']['input']>;
  editorial?: InputMaybe<EditorialUpdateOneInlineInput>;
  /** excerpt input for default locale (en) */
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  featuredMedia?: InputMaybe<AssetUpdateOneInlineInput>;
  hasReleasePage?: InputMaybe<Scalars['Boolean']['input']>;
  heroes?: InputMaybe<LayoutUpdateManyInlineInput>;
  layouts?: InputMaybe<LayoutUpdateManyInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<EventUpdateLocalizationsInput>;
  lock?: InputMaybe<LockUpdateOneInlineInput>;
  media?: InputMaybe<AssetUpdateManyInlineInput>;
  products?: InputMaybe<EventProductsUpdateManyInlineInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EventUpdateLocalizationDataInput = {
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EventUpdateLocalizationInput = {
  data: EventUpdateLocalizationDataInput;
  locale: Locale;
};

export type EventUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<EventCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<EventUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<EventUpsertLocalizationInput>>;
};

export type EventUpdateManyInlineInput = {
  /** Connect multiple existing Event documents */
  connect?: InputMaybe<Array<EventConnectInput>>;
  /** Create and connect multiple Event documents */
  create?: InputMaybe<Array<EventCreateInput>>;
  /** Delete multiple Event documents */
  delete?: InputMaybe<Array<EventWhereUniqueInput>>;
  /** Disconnect multiple Event documents */
  disconnect?: InputMaybe<Array<EventWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Event documents */
  set?: InputMaybe<Array<EventWhereUniqueInput>>;
  /** Update multiple Event documents */
  update?: InputMaybe<Array<EventUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Event documents */
  upsert?: InputMaybe<Array<EventUpsertWithNestedWhereUniqueInput>>;
};

export type EventUpdateManyInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['RichTextAST']['input']>;
  /** excerpt input for default locale (en) */
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  hasReleasePage?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<EventUpdateManyLocalizationsInput>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EventUpdateManyLocalizationDataInput = {
  excerpt?: InputMaybe<Scalars['RichTextAST']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EventUpdateManyLocalizationInput = {
  data: EventUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type EventUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<EventUpdateManyLocalizationInput>>;
};

export type EventUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: EventUpdateManyInput;
  /** Document search */
  where: EventWhereInput;
};

export type EventUpdateOneInlineInput = {
  /** Connect existing Event document */
  connect?: InputMaybe<EventWhereUniqueInput>;
  /** Create and connect one Event document */
  create?: InputMaybe<EventCreateInput>;
  /** Delete currently connected Event document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Event document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Event document */
  update?: InputMaybe<EventUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Event document */
  upsert?: InputMaybe<EventUpsertWithNestedWhereUniqueInput>;
};

export type EventUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: EventUpdateInput;
  /** Unique document search */
  where: EventWhereUniqueInput;
};

export type EventUpsertInput = {
  /** Create document if it didn't exist */
  create: EventCreateInput;
  /** Update document if it exists */
  update: EventUpdateInput;
};

export type EventUpsertLocalizationInput = {
  create: EventCreateLocalizationDataInput;
  locale: Locale;
  update: EventUpdateLocalizationDataInput;
};

export type EventUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: EventUpsertInput;
  /** Unique document search */
  where: EventWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type EventWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type EventWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<EventWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<EventWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<EventWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  documentInStages_every?: InputMaybe<EventWhereStageInput>;
  documentInStages_none?: InputMaybe<EventWhereStageInput>;
  documentInStages_some?: InputMaybe<EventWhereStageInput>;
  editorial?: InputMaybe<EditorialWhereInput>;
  featuredMedia?: InputMaybe<AssetWhereInput>;
  hasReleasePage?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  hasReleasePage_not?: InputMaybe<Scalars['Boolean']['input']>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  lock?: InputMaybe<LockWhereInput>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  /** All values in which the union is empty */
  products_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  products_some?: InputMaybe<EventProductsWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type EventWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<EventWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<EventWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<EventWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<EventWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Event record uniquely */
export type EventWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Customize the behaviour of the footer. Defaults to "Full" if no option is provided. */
export enum FooterStyle {
  Default = 'default',
  Minimal = 'minimal'
}

export type Form = Entity & Node & {
  __typename?: 'Form';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Form>;
  /** List of Form versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** used internally for identification purposes. */
  internalName?: Maybe<Scalars['String']['output']>;
  layouts: Array<Layout>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  submitButtonLabel: Scalars['String']['output'];
  type?: Maybe<FormTypes>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type FormCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type FormDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type FormHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type FormLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type FormPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type FormScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type FormUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type FormConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: FormWhereUniqueInput;
};

/** A connection to a list of items. */
export type FormConnection = {
  __typename?: 'FormConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<FormEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type FormCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  layouts?: InputMaybe<LayoutCreateManyInlineInput>;
  submitButtonLabel: Scalars['String']['input'];
  type?: InputMaybe<FormTypes>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FormCreateManyInlineInput = {
  /** Connect multiple existing Form documents */
  connect?: InputMaybe<Array<FormWhereUniqueInput>>;
  /** Create and connect multiple existing Form documents */
  create?: InputMaybe<Array<FormCreateInput>>;
};

export type FormCreateOneInlineInput = {
  /** Connect one existing Form document */
  connect?: InputMaybe<FormWhereUniqueInput>;
  /** Create and connect one Form document */
  create?: InputMaybe<FormCreateInput>;
};

/** An edge in a connection. */
export type FormEdge = {
  __typename?: 'FormEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Form;
};

/** Identifies documents */
export type FormManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<FormWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<FormWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<FormWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<FormWhereStageInput>;
  documentInStages_none?: InputMaybe<FormWhereStageInput>;
  documentInStages_some?: InputMaybe<FormWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  submitButtonLabel?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  submitButtonLabel_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  submitButtonLabel_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  submitButtonLabel_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  submitButtonLabel_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  submitButtonLabel_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  submitButtonLabel_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  submitButtonLabel_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  submitButtonLabel_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  submitButtonLabel_starts_with?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<FormTypes>;
  /** All values that are contained in given list. */
  type_in?: InputMaybe<Array<InputMaybe<FormTypes>>>;
  /** Any other value that exists and is not equal to the given value. */
  type_not?: InputMaybe<FormTypes>;
  /** All values that are not contained in given list. */
  type_not_in?: InputMaybe<Array<InputMaybe<FormTypes>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum FormOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SubmitButtonLabelAsc = 'submitButtonLabel_ASC',
  SubmitButtonLabelDesc = 'submitButtonLabel_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export enum FormTypes {
  Appointments = 'appointments',
  Contact = 'contact',
  Newsletter = 'newsletter'
}

export type FormUpdateInput = {
  internalName?: InputMaybe<Scalars['String']['input']>;
  layouts?: InputMaybe<LayoutUpdateManyInlineInput>;
  submitButtonLabel?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<FormTypes>;
};

export type FormUpdateManyInlineInput = {
  /** Connect multiple existing Form documents */
  connect?: InputMaybe<Array<FormConnectInput>>;
  /** Create and connect multiple Form documents */
  create?: InputMaybe<Array<FormCreateInput>>;
  /** Delete multiple Form documents */
  delete?: InputMaybe<Array<FormWhereUniqueInput>>;
  /** Disconnect multiple Form documents */
  disconnect?: InputMaybe<Array<FormWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Form documents */
  set?: InputMaybe<Array<FormWhereUniqueInput>>;
  /** Update multiple Form documents */
  update?: InputMaybe<Array<FormUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Form documents */
  upsert?: InputMaybe<Array<FormUpsertWithNestedWhereUniqueInput>>;
};

export type FormUpdateManyInput = {
  submitButtonLabel?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<FormTypes>;
};

export type FormUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: FormUpdateManyInput;
  /** Document search */
  where: FormWhereInput;
};

export type FormUpdateOneInlineInput = {
  /** Connect existing Form document */
  connect?: InputMaybe<FormWhereUniqueInput>;
  /** Create and connect one Form document */
  create?: InputMaybe<FormCreateInput>;
  /** Delete currently connected Form document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Form document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Form document */
  update?: InputMaybe<FormUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Form document */
  upsert?: InputMaybe<FormUpsertWithNestedWhereUniqueInput>;
};

export type FormUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: FormUpdateInput;
  /** Unique document search */
  where: FormWhereUniqueInput;
};

export type FormUpsertInput = {
  /** Create document if it didn't exist */
  create: FormCreateInput;
  /** Update document if it exists */
  update: FormUpdateInput;
};

export type FormUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: FormUpsertInput;
  /** Unique document search */
  where: FormWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type FormWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type FormWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<FormWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<FormWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<FormWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<FormWhereStageInput>;
  documentInStages_none?: InputMaybe<FormWhereStageInput>;
  documentInStages_some?: InputMaybe<FormWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  submitButtonLabel?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  submitButtonLabel_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  submitButtonLabel_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  submitButtonLabel_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  submitButtonLabel_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  submitButtonLabel_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  submitButtonLabel_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  submitButtonLabel_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  submitButtonLabel_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  submitButtonLabel_starts_with?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<FormTypes>;
  /** All values that are contained in given list. */
  type_in?: InputMaybe<Array<InputMaybe<FormTypes>>>;
  /** Any other value that exists and is not equal to the given value. */
  type_not?: InputMaybe<FormTypes>;
  /** All values that are not contained in given list. */
  type_not_in?: InputMaybe<Array<InputMaybe<FormTypes>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type FormWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<FormWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<FormWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<FormWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<FormWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Form record uniquely */
export type FormWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
};

export type Gallery = Entity & Node & {
  __typename?: 'Gallery';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Gallery>;
  /** List of Gallery versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  internalName?: Maybe<Scalars['String']['output']>;
  layouts: Array<Layout>;
  media: Array<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type GalleryCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type GalleryDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type GalleryHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type GalleryLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type GalleryMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetWhereInput>;
};


export type GalleryPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type GalleryScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type GalleryUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type GalleryConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: GalleryWhereUniqueInput;
};

/** A connection to a list of items. */
export type GalleryConnection = {
  __typename?: 'GalleryConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<GalleryEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type GalleryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  layouts?: InputMaybe<LayoutCreateManyInlineInput>;
  media?: InputMaybe<AssetCreateManyInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GalleryCreateManyInlineInput = {
  /** Connect multiple existing Gallery documents */
  connect?: InputMaybe<Array<GalleryWhereUniqueInput>>;
  /** Create and connect multiple existing Gallery documents */
  create?: InputMaybe<Array<GalleryCreateInput>>;
};

export type GalleryCreateOneInlineInput = {
  /** Connect one existing Gallery document */
  connect?: InputMaybe<GalleryWhereUniqueInput>;
  /** Create and connect one Gallery document */
  create?: InputMaybe<GalleryCreateInput>;
};

/** An edge in a connection. */
export type GalleryEdge = {
  __typename?: 'GalleryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Gallery;
};

/** Identifies documents */
export type GalleryManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<GalleryWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<GalleryWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<GalleryWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<GalleryWhereStageInput>;
  documentInStages_none?: InputMaybe<GalleryWhereStageInput>;
  documentInStages_some?: InputMaybe<GalleryWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum GalleryOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type GalleryUpdateInput = {
  internalName?: InputMaybe<Scalars['String']['input']>;
  layouts?: InputMaybe<LayoutUpdateManyInlineInput>;
  media?: InputMaybe<AssetUpdateManyInlineInput>;
};

export type GalleryUpdateManyInlineInput = {
  /** Connect multiple existing Gallery documents */
  connect?: InputMaybe<Array<GalleryConnectInput>>;
  /** Create and connect multiple Gallery documents */
  create?: InputMaybe<Array<GalleryCreateInput>>;
  /** Delete multiple Gallery documents */
  delete?: InputMaybe<Array<GalleryWhereUniqueInput>>;
  /** Disconnect multiple Gallery documents */
  disconnect?: InputMaybe<Array<GalleryWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Gallery documents */
  set?: InputMaybe<Array<GalleryWhereUniqueInput>>;
  /** Update multiple Gallery documents */
  update?: InputMaybe<Array<GalleryUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Gallery documents */
  upsert?: InputMaybe<Array<GalleryUpsertWithNestedWhereUniqueInput>>;
};

export type GalleryUpdateManyInput = {
  internalName?: InputMaybe<Scalars['String']['input']>;
};

export type GalleryUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: GalleryUpdateManyInput;
  /** Document search */
  where: GalleryWhereInput;
};

export type GalleryUpdateOneInlineInput = {
  /** Connect existing Gallery document */
  connect?: InputMaybe<GalleryWhereUniqueInput>;
  /** Create and connect one Gallery document */
  create?: InputMaybe<GalleryCreateInput>;
  /** Delete currently connected Gallery document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Gallery document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Gallery document */
  update?: InputMaybe<GalleryUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Gallery document */
  upsert?: InputMaybe<GalleryUpsertWithNestedWhereUniqueInput>;
};

export type GalleryUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: GalleryUpdateInput;
  /** Unique document search */
  where: GalleryWhereUniqueInput;
};

export type GalleryUpsertInput = {
  /** Create document if it didn't exist */
  create: GalleryCreateInput;
  /** Update document if it exists */
  update: GalleryUpdateInput;
};

export type GalleryUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: GalleryUpsertInput;
  /** Unique document search */
  where: GalleryWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type GalleryWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type GalleryWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<GalleryWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<GalleryWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<GalleryWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<GalleryWhereStageInput>;
  documentInStages_none?: InputMaybe<GalleryWhereStageInput>;
  documentInStages_some?: InputMaybe<GalleryWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type GalleryWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<GalleryWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<GalleryWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<GalleryWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<GalleryWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Gallery record uniquely */
export type GalleryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum Global {
  Global = 'global'
}

export enum GridTypes {
  Spaced = 'spaced',
  Sticky = 'sticky',
  Tiles = 'tiles'
}

/** Customize the behaviour of the header. */
export enum HeaderStyle {
  Default = 'default',
  Fluid = 'fluid',
  Minimal = 'minimal',
  MinimalNewsletterCta = 'minimalNewsletterCta',
  None = 'none'
}

export type Hero = Entity & {
  __typename?: 'Hero';
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** System stage field */
  stage: Stage;
};

/** A connection to a list of items. */
export type HeroConnection = {
  __typename?: 'HeroConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<HeroEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type HeroCreateInput = {
  /** No fields in create input */
  _?: InputMaybe<Scalars['String']['input']>;
};

export type HeroCreateWithPositionInput = {
  /** Document to create */
  data: HeroCreateInput;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
};

/** An edge in a connection. */
export type HeroEdge = {
  __typename?: 'HeroEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Hero;
};

/** Identifies documents */
export type HeroManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<HeroWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<HeroWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<HeroWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
};

export enum HeroOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC'
}

export type HeroUpdateInput = {
  /** No fields in update input */
  _?: InputMaybe<Scalars['String']['input']>;
};

export type HeroUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: InputMaybe<Scalars['String']['input']>;
};

export type HeroUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: HeroUpdateManyInput;
  /** Document search */
  where: HeroWhereInput;
};

export type HeroUpdateWithNestedWhereUniqueAndPositionInput = {
  /** Document to update */
  data?: InputMaybe<HeroUpdateInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: HeroWhereUniqueInput;
};

export type HeroUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: HeroUpdateInput;
  /** Unique document search */
  where: HeroWhereUniqueInput;
};

export type HeroUpsertInput = {
  /** Create document if it didn't exist */
  create: HeroCreateInput;
  /** Update document if it exists */
  update: HeroUpdateInput;
};

export type HeroUpsertWithNestedWhereUniqueAndPositionInput = {
  /** Document to upsert */
  data?: InputMaybe<HeroUpsertInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: HeroWhereUniqueInput;
};

export type HeroUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: HeroUpsertInput;
  /** Unique document search */
  where: HeroWhereUniqueInput;
};

/** Identifies documents */
export type HeroWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<HeroWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<HeroWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<HeroWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
};

/** References Hero record uniquely */
export type HeroWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ImageBlurInput = {
  /** The amount of blurring to apply to the image. The value must be an integer from 1 to 20. */
  amount: Scalars['Int']['input'];
};

/** Adds a border to the image. */
export type ImageBorderInput = {
  /** The background color of the border. The value must be a valid hex color code. Or one of the supported color names. */
  background: Scalars['String']['input'];
  /** The color of the border. The value must be a valid hex color code. Or one of the supported color names. */
  color: Scalars['String']['input'];
  /** The width of the border in pixels. The value must be an integer from 1 to 1000. */
  width: Scalars['Int']['input'];
};

export type ImageCompressInput = {
  /** Preserves the metadata of the image. */
  metadata: Scalars['Boolean']['input'];
};

/**
 * Crops the image to the specified dimensions.
 * The starting points for X and Y coordinates are [0,0], aligning with the top-left corner of the image.
 * The width and height parameters determine the size in pixels of the cropping rectangle.
 * The output will include only the portion of the image within the designated crop area.
 */
export type ImageCropInput = {
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height: Scalars['Int']['input'];
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width: Scalars['Int']['input'];
  /** The x coordinate of the image. The value must be an integer from 0 to 10000. */
  x: Scalars['Int']['input'];
  /** The y coordinate of the image. The value must be an integer from 0 to 10000. */
  y: Scalars['Int']['input'];
};

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
  Crop = 'crop',
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
  Max = 'max',
  /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
  Scale = 'scale'
}

export type ImageQualityInput = {
  /** The quality of the image. The value must be an integer from 1 to 100. */
  value: Scalars['Int']['input'];
};

export type ImageResizeInput = {
  /** The default value for the fit parameter is fit:clip. */
  fit?: InputMaybe<ImageFit>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type ImageSharpenInput = {
  /** The amount of sharpening to apply to the image. The value must be an integer from 1 to 20. */
  amount: Scalars['Int']['input'];
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Blurs the image. */
  blur?: InputMaybe<ImageBlurInput>;
  /** Adds a border to the image. */
  border?: InputMaybe<ImageBorderInput>;
  /** Compresses the image. */
  compress?: InputMaybe<ImageCompressInput>;
  /** Crops the image to the specified dimensions. */
  crop?: InputMaybe<ImageCropInput>;
  /**
   * Changes the quality of the image. The value must be an integer from 1 to 100.
   * Only supported for the following formats jpeg, jpg, webp, gif, heif, tiff, avif.
   */
  quality?: InputMaybe<ImageQualityInput>;
  /** Resizes the image */
  resize?: InputMaybe<ImageResizeInput>;
  /** Sharpens the image. */
  sharpen?: InputMaybe<ImageSharpenInput>;
};

export type Layout = Entity & Node & {
  __typename?: 'Layout';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Optionally display the title on this webpage */
  displayTitle?: Maybe<Scalars['Boolean']['output']>;
  /** Get the document in other stages */
  documentInStages: Array<Layout>;
  /** Customize the behaviour of the footer. Defaults to "Full" if no option is provided. */
  footerStyle?: Maybe<FooterStyle>;
  /** Customize the behaviour of the header. */
  headerStyle?: Maybe<HeaderStyle>;
  heroes: Array<LayoutHero>;
  /** List of Layout versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Layout>;
  /** Where this page layout is being used as a lock screen */
  locks: Array<Lock>;
  /** When there are more than 2 attached references — i.e The "Sticky scrolling layout" — reverse the layout */
  mirrorLayout?: Maybe<Scalars['Boolean']['output']>;
  /** The following pages use this as their layout */
  pages: Array<Page>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  sections: Array<LayoutSections>;
  /** System stage field */
  stage: Stage;
  theme?: Maybe<Theme>;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type LayoutCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type LayoutCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LayoutDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type LayoutHeroesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type LayoutHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type LayoutLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  locales?: Array<Locale>;
};


export type LayoutLocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<LockOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LockWhereInput>;
};


export type LayoutPagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<PageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PageWhereInput>;
};


export type LayoutPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type LayoutPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LayoutScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type LayoutSectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type LayoutThemeArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LayoutUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type LayoutUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type LayoutConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: LayoutWhereUniqueInput;
};

/** A connection to a list of items. */
export type LayoutConnection = {
  __typename?: 'LayoutConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<LayoutEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type LayoutCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  displayTitle?: InputMaybe<Scalars['Boolean']['input']>;
  footerStyle?: InputMaybe<FooterStyle>;
  headerStyle?: InputMaybe<HeaderStyle>;
  heroes?: InputMaybe<LayoutHeroCreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<LayoutCreateLocalizationsInput>;
  locks?: InputMaybe<LockCreateManyInlineInput>;
  mirrorLayout?: InputMaybe<Scalars['Boolean']['input']>;
  pages?: InputMaybe<PageCreateManyInlineInput>;
  sections?: InputMaybe<LayoutSectionsCreateManyInlineInput>;
  theme?: InputMaybe<ThemeCreateOneInlineInput>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type LayoutCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type LayoutCreateLocalizationInput = {
  /** Localization input */
  data: LayoutCreateLocalizationDataInput;
  locale: Locale;
};

export type LayoutCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<LayoutCreateLocalizationInput>>;
};

export type LayoutCreateManyInlineInput = {
  /** Connect multiple existing Layout documents */
  connect?: InputMaybe<Array<LayoutWhereUniqueInput>>;
  /** Create and connect multiple existing Layout documents */
  create?: InputMaybe<Array<LayoutCreateInput>>;
};

export type LayoutCreateOneInlineInput = {
  /** Connect one existing Layout document */
  connect?: InputMaybe<LayoutWhereUniqueInput>;
  /** Create and connect one Layout document */
  create?: InputMaybe<LayoutCreateInput>;
};

/** An edge in a connection. */
export type LayoutEdge = {
  __typename?: 'LayoutEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Layout;
};

export type LayoutHero = Collection | Editorial | Event | MixedMedia | Page | Product;

export type LayoutHeroConnectInput = {
  Collection?: InputMaybe<CollectionConnectInput>;
  Editorial?: InputMaybe<EditorialConnectInput>;
  Event?: InputMaybe<EventConnectInput>;
  MixedMedia?: InputMaybe<MixedMediaConnectInput>;
  Page?: InputMaybe<PageConnectInput>;
  Product?: InputMaybe<ProductConnectInput>;
};

export type LayoutHeroCreateInput = {
  Collection?: InputMaybe<CollectionCreateInput>;
  Editorial?: InputMaybe<EditorialCreateInput>;
  Event?: InputMaybe<EventCreateInput>;
  MixedMedia?: InputMaybe<MixedMediaCreateInput>;
  Page?: InputMaybe<PageCreateInput>;
  Product?: InputMaybe<ProductCreateInput>;
};

export type LayoutHeroCreateManyInlineInput = {
  /** Connect multiple existing LayoutHero documents */
  connect?: InputMaybe<Array<LayoutHeroWhereUniqueInput>>;
  /** Create and connect multiple existing LayoutHero documents */
  create?: InputMaybe<Array<LayoutHeroCreateInput>>;
};

export type LayoutHeroCreateOneInlineInput = {
  /** Connect one existing LayoutHero document */
  connect?: InputMaybe<LayoutHeroWhereUniqueInput>;
  /** Create and connect one LayoutHero document */
  create?: InputMaybe<LayoutHeroCreateInput>;
};

export type LayoutHeroUpdateInput = {
  Collection?: InputMaybe<CollectionUpdateInput>;
  Editorial?: InputMaybe<EditorialUpdateInput>;
  Event?: InputMaybe<EventUpdateInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateInput>;
  Page?: InputMaybe<PageUpdateInput>;
  Product?: InputMaybe<ProductUpdateInput>;
};

export type LayoutHeroUpdateManyInlineInput = {
  /** Connect multiple existing LayoutHero documents */
  connect?: InputMaybe<Array<LayoutHeroConnectInput>>;
  /** Create and connect multiple LayoutHero documents */
  create?: InputMaybe<Array<LayoutHeroCreateInput>>;
  /** Delete multiple LayoutHero documents */
  delete?: InputMaybe<Array<LayoutHeroWhereUniqueInput>>;
  /** Disconnect multiple LayoutHero documents */
  disconnect?: InputMaybe<Array<LayoutHeroWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing LayoutHero documents */
  set?: InputMaybe<Array<LayoutHeroWhereUniqueInput>>;
  /** Update multiple LayoutHero documents */
  update?: InputMaybe<Array<LayoutHeroUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple LayoutHero documents */
  upsert?: InputMaybe<Array<LayoutHeroUpsertWithNestedWhereUniqueInput>>;
};

export type LayoutHeroUpdateManyWithNestedWhereInput = {
  Collection?: InputMaybe<CollectionUpdateManyWithNestedWhereInput>;
  Editorial?: InputMaybe<EditorialUpdateManyWithNestedWhereInput>;
  Event?: InputMaybe<EventUpdateManyWithNestedWhereInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateManyWithNestedWhereInput>;
  Page?: InputMaybe<PageUpdateManyWithNestedWhereInput>;
  Product?: InputMaybe<ProductUpdateManyWithNestedWhereInput>;
};

export type LayoutHeroUpdateOneInlineInput = {
  /** Connect existing LayoutHero document */
  connect?: InputMaybe<LayoutHeroWhereUniqueInput>;
  /** Create and connect one LayoutHero document */
  create?: InputMaybe<LayoutHeroCreateInput>;
  /** Delete currently connected LayoutHero document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected LayoutHero document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single LayoutHero document */
  update?: InputMaybe<LayoutHeroUpdateWithNestedWhereUniqueInput>;
  /** Upsert single LayoutHero document */
  upsert?: InputMaybe<LayoutHeroUpsertWithNestedWhereUniqueInput>;
};

export type LayoutHeroUpdateWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpdateWithNestedWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialUpdateWithNestedWhereUniqueInput>;
  Event?: InputMaybe<EventUpdateWithNestedWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpdateWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpdateWithNestedWhereUniqueInput>;
};

export type LayoutHeroUpsertWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpsertWithNestedWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialUpsertWithNestedWhereUniqueInput>;
  Event?: InputMaybe<EventUpsertWithNestedWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaUpsertWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpsertWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpsertWithNestedWhereUniqueInput>;
};

export type LayoutHeroWhereInput = {
  Collection?: InputMaybe<CollectionWhereInput>;
  Editorial?: InputMaybe<EditorialWhereInput>;
  Event?: InputMaybe<EventWhereInput>;
  MixedMedia?: InputMaybe<MixedMediaWhereInput>;
  Page?: InputMaybe<PageWhereInput>;
  Product?: InputMaybe<ProductWhereInput>;
};

export type LayoutHeroWhereUniqueInput = {
  Collection?: InputMaybe<CollectionWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialWhereUniqueInput>;
  Event?: InputMaybe<EventWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaWhereUniqueInput>;
  Page?: InputMaybe<PageWhereUniqueInput>;
  Product?: InputMaybe<ProductWhereUniqueInput>;
};

/** Identifies documents */
export type LayoutManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LayoutWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LayoutWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LayoutWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  displayTitle?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  displayTitle_not?: InputMaybe<Scalars['Boolean']['input']>;
  documentInStages_every?: InputMaybe<LayoutWhereStageInput>;
  documentInStages_none?: InputMaybe<LayoutWhereStageInput>;
  documentInStages_some?: InputMaybe<LayoutWhereStageInput>;
  footerStyle?: InputMaybe<FooterStyle>;
  /** All values that are contained in given list. */
  footerStyle_in?: InputMaybe<Array<InputMaybe<FooterStyle>>>;
  /** Any other value that exists and is not equal to the given value. */
  footerStyle_not?: InputMaybe<FooterStyle>;
  /** All values that are not contained in given list. */
  footerStyle_not_in?: InputMaybe<Array<InputMaybe<FooterStyle>>>;
  headerStyle?: InputMaybe<HeaderStyle>;
  /** All values that are contained in given list. */
  headerStyle_in?: InputMaybe<Array<InputMaybe<HeaderStyle>>>;
  /** Any other value that exists and is not equal to the given value. */
  headerStyle_not?: InputMaybe<HeaderStyle>;
  /** All values that are not contained in given list. */
  headerStyle_not_in?: InputMaybe<Array<InputMaybe<HeaderStyle>>>;
  /** All values in which the union is empty */
  heroes_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  heroes_some?: InputMaybe<LayoutHeroWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  locks_every?: InputMaybe<LockWhereInput>;
  locks_none?: InputMaybe<LockWhereInput>;
  locks_some?: InputMaybe<LockWhereInput>;
  mirrorLayout?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  mirrorLayout_not?: InputMaybe<Scalars['Boolean']['input']>;
  pages_every?: InputMaybe<PageWhereInput>;
  pages_none?: InputMaybe<PageWhereInput>;
  pages_some?: InputMaybe<PageWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  /** All values in which the union is empty */
  sections_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  sections_some?: InputMaybe<LayoutSectionsWhereInput>;
  theme?: InputMaybe<ThemeWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum LayoutOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DisplayTitleAsc = 'displayTitle_ASC',
  DisplayTitleDesc = 'displayTitle_DESC',
  FooterStyleAsc = 'footerStyle_ASC',
  FooterStyleDesc = 'footerStyle_DESC',
  HeaderStyleAsc = 'headerStyle_ASC',
  HeaderStyleDesc = 'headerStyle_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MirrorLayoutAsc = 'mirrorLayout_ASC',
  MirrorLayoutDesc = 'mirrorLayout_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type LayoutSections = Archive | Collection | CustomizedSection | Event | Form | Gallery | Lock | MixedMedia | Product;

export type LayoutSectionsConnectInput = {
  Archive?: InputMaybe<ArchiveConnectInput>;
  Collection?: InputMaybe<CollectionConnectInput>;
  CustomizedSection?: InputMaybe<CustomizedSectionConnectInput>;
  Event?: InputMaybe<EventConnectInput>;
  Form?: InputMaybe<FormConnectInput>;
  Gallery?: InputMaybe<GalleryConnectInput>;
  Lock?: InputMaybe<LockConnectInput>;
  MixedMedia?: InputMaybe<MixedMediaConnectInput>;
  Product?: InputMaybe<ProductConnectInput>;
};

export type LayoutSectionsCreateInput = {
  Archive?: InputMaybe<ArchiveCreateInput>;
  Collection?: InputMaybe<CollectionCreateInput>;
  CustomizedSection?: InputMaybe<CustomizedSectionCreateInput>;
  Event?: InputMaybe<EventCreateInput>;
  Form?: InputMaybe<FormCreateInput>;
  Gallery?: InputMaybe<GalleryCreateInput>;
  Lock?: InputMaybe<LockCreateInput>;
  MixedMedia?: InputMaybe<MixedMediaCreateInput>;
  Product?: InputMaybe<ProductCreateInput>;
};

export type LayoutSectionsCreateManyInlineInput = {
  /** Connect multiple existing LayoutSections documents */
  connect?: InputMaybe<Array<LayoutSectionsWhereUniqueInput>>;
  /** Create and connect multiple existing LayoutSections documents */
  create?: InputMaybe<Array<LayoutSectionsCreateInput>>;
};

export type LayoutSectionsCreateOneInlineInput = {
  /** Connect one existing LayoutSections document */
  connect?: InputMaybe<LayoutSectionsWhereUniqueInput>;
  /** Create and connect one LayoutSections document */
  create?: InputMaybe<LayoutSectionsCreateInput>;
};

export type LayoutSectionsUpdateInput = {
  Archive?: InputMaybe<ArchiveUpdateInput>;
  Collection?: InputMaybe<CollectionUpdateInput>;
  CustomizedSection?: InputMaybe<CustomizedSectionUpdateInput>;
  Event?: InputMaybe<EventUpdateInput>;
  Form?: InputMaybe<FormUpdateInput>;
  Gallery?: InputMaybe<GalleryUpdateInput>;
  Lock?: InputMaybe<LockUpdateInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateInput>;
  Product?: InputMaybe<ProductUpdateInput>;
};

export type LayoutSectionsUpdateManyInlineInput = {
  /** Connect multiple existing LayoutSections documents */
  connect?: InputMaybe<Array<LayoutSectionsConnectInput>>;
  /** Create and connect multiple LayoutSections documents */
  create?: InputMaybe<Array<LayoutSectionsCreateInput>>;
  /** Delete multiple LayoutSections documents */
  delete?: InputMaybe<Array<LayoutSectionsWhereUniqueInput>>;
  /** Disconnect multiple LayoutSections documents */
  disconnect?: InputMaybe<Array<LayoutSectionsWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing LayoutSections documents */
  set?: InputMaybe<Array<LayoutSectionsWhereUniqueInput>>;
  /** Update multiple LayoutSections documents */
  update?: InputMaybe<Array<LayoutSectionsUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple LayoutSections documents */
  upsert?: InputMaybe<Array<LayoutSectionsUpsertWithNestedWhereUniqueInput>>;
};

export type LayoutSectionsUpdateManyWithNestedWhereInput = {
  Archive?: InputMaybe<ArchiveUpdateManyWithNestedWhereInput>;
  Collection?: InputMaybe<CollectionUpdateManyWithNestedWhereInput>;
  CustomizedSection?: InputMaybe<CustomizedSectionUpdateManyWithNestedWhereInput>;
  Event?: InputMaybe<EventUpdateManyWithNestedWhereInput>;
  Form?: InputMaybe<FormUpdateManyWithNestedWhereInput>;
  Gallery?: InputMaybe<GalleryUpdateManyWithNestedWhereInput>;
  Lock?: InputMaybe<LockUpdateManyWithNestedWhereInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateManyWithNestedWhereInput>;
  Product?: InputMaybe<ProductUpdateManyWithNestedWhereInput>;
};

export type LayoutSectionsUpdateOneInlineInput = {
  /** Connect existing LayoutSections document */
  connect?: InputMaybe<LayoutSectionsWhereUniqueInput>;
  /** Create and connect one LayoutSections document */
  create?: InputMaybe<LayoutSectionsCreateInput>;
  /** Delete currently connected LayoutSections document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected LayoutSections document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single LayoutSections document */
  update?: InputMaybe<LayoutSectionsUpdateWithNestedWhereUniqueInput>;
  /** Upsert single LayoutSections document */
  upsert?: InputMaybe<LayoutSectionsUpsertWithNestedWhereUniqueInput>;
};

export type LayoutSectionsUpdateWithNestedWhereUniqueInput = {
  Archive?: InputMaybe<ArchiveUpdateWithNestedWhereUniqueInput>;
  Collection?: InputMaybe<CollectionUpdateWithNestedWhereUniqueInput>;
  CustomizedSection?: InputMaybe<CustomizedSectionUpdateWithNestedWhereUniqueInput>;
  Event?: InputMaybe<EventUpdateWithNestedWhereUniqueInput>;
  Form?: InputMaybe<FormUpdateWithNestedWhereUniqueInput>;
  Gallery?: InputMaybe<GalleryUpdateWithNestedWhereUniqueInput>;
  Lock?: InputMaybe<LockUpdateWithNestedWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpdateWithNestedWhereUniqueInput>;
};

export type LayoutSectionsUpsertWithNestedWhereUniqueInput = {
  Archive?: InputMaybe<ArchiveUpsertWithNestedWhereUniqueInput>;
  Collection?: InputMaybe<CollectionUpsertWithNestedWhereUniqueInput>;
  CustomizedSection?: InputMaybe<CustomizedSectionUpsertWithNestedWhereUniqueInput>;
  Event?: InputMaybe<EventUpsertWithNestedWhereUniqueInput>;
  Form?: InputMaybe<FormUpsertWithNestedWhereUniqueInput>;
  Gallery?: InputMaybe<GalleryUpsertWithNestedWhereUniqueInput>;
  Lock?: InputMaybe<LockUpsertWithNestedWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaUpsertWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpsertWithNestedWhereUniqueInput>;
};

export type LayoutSectionsWhereInput = {
  Archive?: InputMaybe<ArchiveWhereInput>;
  Collection?: InputMaybe<CollectionWhereInput>;
  CustomizedSection?: InputMaybe<CustomizedSectionWhereInput>;
  Event?: InputMaybe<EventWhereInput>;
  Form?: InputMaybe<FormWhereInput>;
  Gallery?: InputMaybe<GalleryWhereInput>;
  Lock?: InputMaybe<LockWhereInput>;
  MixedMedia?: InputMaybe<MixedMediaWhereInput>;
  Product?: InputMaybe<ProductWhereInput>;
};

export type LayoutSectionsWhereUniqueInput = {
  Archive?: InputMaybe<ArchiveWhereUniqueInput>;
  Collection?: InputMaybe<CollectionWhereUniqueInput>;
  CustomizedSection?: InputMaybe<CustomizedSectionWhereUniqueInput>;
  Event?: InputMaybe<EventWhereUniqueInput>;
  Form?: InputMaybe<FormWhereUniqueInput>;
  Gallery?: InputMaybe<GalleryWhereUniqueInput>;
  Lock?: InputMaybe<LockWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaWhereUniqueInput>;
  Product?: InputMaybe<ProductWhereUniqueInput>;
};

export type LayoutUpdateInput = {
  displayTitle?: InputMaybe<Scalars['Boolean']['input']>;
  footerStyle?: InputMaybe<FooterStyle>;
  headerStyle?: InputMaybe<HeaderStyle>;
  heroes?: InputMaybe<LayoutHeroUpdateManyInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<LayoutUpdateLocalizationsInput>;
  locks?: InputMaybe<LockUpdateManyInlineInput>;
  mirrorLayout?: InputMaybe<Scalars['Boolean']['input']>;
  pages?: InputMaybe<PageUpdateManyInlineInput>;
  sections?: InputMaybe<LayoutSectionsUpdateManyInlineInput>;
  theme?: InputMaybe<ThemeUpdateOneInlineInput>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LayoutUpdateLocalizationDataInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LayoutUpdateLocalizationInput = {
  data: LayoutUpdateLocalizationDataInput;
  locale: Locale;
};

export type LayoutUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<LayoutCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<LayoutUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<LayoutUpsertLocalizationInput>>;
};

export type LayoutUpdateManyInlineInput = {
  /** Connect multiple existing Layout documents */
  connect?: InputMaybe<Array<LayoutConnectInput>>;
  /** Create and connect multiple Layout documents */
  create?: InputMaybe<Array<LayoutCreateInput>>;
  /** Delete multiple Layout documents */
  delete?: InputMaybe<Array<LayoutWhereUniqueInput>>;
  /** Disconnect multiple Layout documents */
  disconnect?: InputMaybe<Array<LayoutWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Layout documents */
  set?: InputMaybe<Array<LayoutWhereUniqueInput>>;
  /** Update multiple Layout documents */
  update?: InputMaybe<Array<LayoutUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Layout documents */
  upsert?: InputMaybe<Array<LayoutUpsertWithNestedWhereUniqueInput>>;
};

export type LayoutUpdateManyInput = {
  displayTitle?: InputMaybe<Scalars['Boolean']['input']>;
  footerStyle?: InputMaybe<FooterStyle>;
  headerStyle?: InputMaybe<HeaderStyle>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<LayoutUpdateManyLocalizationsInput>;
  mirrorLayout?: InputMaybe<Scalars['Boolean']['input']>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LayoutUpdateManyLocalizationDataInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LayoutUpdateManyLocalizationInput = {
  data: LayoutUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type LayoutUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<LayoutUpdateManyLocalizationInput>>;
};

export type LayoutUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: LayoutUpdateManyInput;
  /** Document search */
  where: LayoutWhereInput;
};

export type LayoutUpdateOneInlineInput = {
  /** Connect existing Layout document */
  connect?: InputMaybe<LayoutWhereUniqueInput>;
  /** Create and connect one Layout document */
  create?: InputMaybe<LayoutCreateInput>;
  /** Delete currently connected Layout document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Layout document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Layout document */
  update?: InputMaybe<LayoutUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Layout document */
  upsert?: InputMaybe<LayoutUpsertWithNestedWhereUniqueInput>;
};

export type LayoutUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: LayoutUpdateInput;
  /** Unique document search */
  where: LayoutWhereUniqueInput;
};

export type LayoutUpsertInput = {
  /** Create document if it didn't exist */
  create: LayoutCreateInput;
  /** Update document if it exists */
  update: LayoutUpdateInput;
};

export type LayoutUpsertLocalizationInput = {
  create: LayoutCreateLocalizationDataInput;
  locale: Locale;
  update: LayoutUpdateLocalizationDataInput;
};

export type LayoutUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: LayoutUpsertInput;
  /** Unique document search */
  where: LayoutWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type LayoutWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type LayoutWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LayoutWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LayoutWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LayoutWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  displayTitle?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  displayTitle_not?: InputMaybe<Scalars['Boolean']['input']>;
  documentInStages_every?: InputMaybe<LayoutWhereStageInput>;
  documentInStages_none?: InputMaybe<LayoutWhereStageInput>;
  documentInStages_some?: InputMaybe<LayoutWhereStageInput>;
  footerStyle?: InputMaybe<FooterStyle>;
  /** All values that are contained in given list. */
  footerStyle_in?: InputMaybe<Array<InputMaybe<FooterStyle>>>;
  /** Any other value that exists and is not equal to the given value. */
  footerStyle_not?: InputMaybe<FooterStyle>;
  /** All values that are not contained in given list. */
  footerStyle_not_in?: InputMaybe<Array<InputMaybe<FooterStyle>>>;
  headerStyle?: InputMaybe<HeaderStyle>;
  /** All values that are contained in given list. */
  headerStyle_in?: InputMaybe<Array<InputMaybe<HeaderStyle>>>;
  /** Any other value that exists and is not equal to the given value. */
  headerStyle_not?: InputMaybe<HeaderStyle>;
  /** All values that are not contained in given list. */
  headerStyle_not_in?: InputMaybe<Array<InputMaybe<HeaderStyle>>>;
  /** All values in which the union is empty */
  heroes_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  heroes_some?: InputMaybe<LayoutHeroWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  locks_every?: InputMaybe<LockWhereInput>;
  locks_none?: InputMaybe<LockWhereInput>;
  locks_some?: InputMaybe<LockWhereInput>;
  mirrorLayout?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  mirrorLayout_not?: InputMaybe<Scalars['Boolean']['input']>;
  pages_every?: InputMaybe<PageWhereInput>;
  pages_none?: InputMaybe<PageWhereInput>;
  pages_some?: InputMaybe<PageWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  /** All values in which the union is empty */
  sections_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  sections_some?: InputMaybe<LayoutSectionsWhereInput>;
  theme?: InputMaybe<ThemeWhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type LayoutWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LayoutWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LayoutWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LayoutWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<LayoutWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Layout record uniquely */
export type LayoutWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Link = Entity & {
  __typename?: 'Link';
  /** Pass any arbitrary URL to use for the link . If an entry is also linked, it will take precedence over the URL */
  externalTarget?: Maybe<Scalars['String']['output']>;
  hasTargetBlank: Scalars['Boolean']['output'];
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** Reference an existing content entry as a page link */
  internalTarget?: Maybe<LinkInternalTarget>;
  label?: Maybe<Scalars['String']['output']>;
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Link>;
  /** The rel attribute defines the relationship between a linked resource and the current document. */
  rel?: Maybe<Scalars['String']['output']>;
  /** System stage field */
  stage: Stage;
  /** The title attribute is used to provide additional information to help clarify or further describe the purpose of a link. It pops up in the context menu on hover. */
  title?: Maybe<Scalars['String']['output']>;
};


export type LinkInternalTargetArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LinkLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  locales?: Array<Locale>;
};

export type LinkConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: LinkWhereUniqueInput;
};

/** A connection to a list of items. */
export type LinkConnection = {
  __typename?: 'LinkConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<LinkEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type LinkCreateInput = {
  externalTarget?: InputMaybe<Scalars['String']['input']>;
  hasTargetBlank: Scalars['Boolean']['input'];
  internalTarget?: InputMaybe<LinkInternalTargetCreateOneInlineInput>;
  /** label input for default locale (en) */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<LinkCreateLocalizationsInput>;
  rel?: InputMaybe<Scalars['String']['input']>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LinkCreateLocalizationDataInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LinkCreateLocalizationInput = {
  /** Localization input */
  data: LinkCreateLocalizationDataInput;
  locale: Locale;
};

export type LinkCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<LinkCreateLocalizationInput>>;
};

export type LinkCreateManyInlineInput = {
  /** Create and connect multiple existing Link documents */
  create?: InputMaybe<Array<LinkCreateInput>>;
};

export type LinkCreateOneInlineInput = {
  /** Create and connect one Link document */
  create?: InputMaybe<LinkCreateInput>;
};

export type LinkCreateWithPositionInput = {
  /** Document to create */
  data: LinkCreateInput;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
};

/** An edge in a connection. */
export type LinkEdge = {
  __typename?: 'LinkEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Link;
};

export type LinkInternalTarget = Collection | Editorial | Event | Page | Product;

export type LinkInternalTargetConnectInput = {
  Collection?: InputMaybe<CollectionConnectInput>;
  Editorial?: InputMaybe<EditorialConnectInput>;
  Event?: InputMaybe<EventConnectInput>;
  Page?: InputMaybe<PageConnectInput>;
  Product?: InputMaybe<ProductConnectInput>;
};

export type LinkInternalTargetCreateInput = {
  Collection?: InputMaybe<CollectionCreateInput>;
  Editorial?: InputMaybe<EditorialCreateInput>;
  Event?: InputMaybe<EventCreateInput>;
  Page?: InputMaybe<PageCreateInput>;
  Product?: InputMaybe<ProductCreateInput>;
};

export type LinkInternalTargetCreateManyInlineInput = {
  /** Connect multiple existing LinkInternalTarget documents */
  connect?: InputMaybe<Array<LinkInternalTargetWhereUniqueInput>>;
  /** Create and connect multiple existing LinkInternalTarget documents */
  create?: InputMaybe<Array<LinkInternalTargetCreateInput>>;
};

export type LinkInternalTargetCreateOneInlineInput = {
  /** Connect one existing LinkInternalTarget document */
  connect?: InputMaybe<LinkInternalTargetWhereUniqueInput>;
  /** Create and connect one LinkInternalTarget document */
  create?: InputMaybe<LinkInternalTargetCreateInput>;
};

export type LinkInternalTargetUpdateInput = {
  Collection?: InputMaybe<CollectionUpdateInput>;
  Editorial?: InputMaybe<EditorialUpdateInput>;
  Event?: InputMaybe<EventUpdateInput>;
  Page?: InputMaybe<PageUpdateInput>;
  Product?: InputMaybe<ProductUpdateInput>;
};

export type LinkInternalTargetUpdateManyInlineInput = {
  /** Connect multiple existing LinkInternalTarget documents */
  connect?: InputMaybe<Array<LinkInternalTargetConnectInput>>;
  /** Create and connect multiple LinkInternalTarget documents */
  create?: InputMaybe<Array<LinkInternalTargetCreateInput>>;
  /** Delete multiple LinkInternalTarget documents */
  delete?: InputMaybe<Array<LinkInternalTargetWhereUniqueInput>>;
  /** Disconnect multiple LinkInternalTarget documents */
  disconnect?: InputMaybe<Array<LinkInternalTargetWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing LinkInternalTarget documents */
  set?: InputMaybe<Array<LinkInternalTargetWhereUniqueInput>>;
  /** Update multiple LinkInternalTarget documents */
  update?: InputMaybe<Array<LinkInternalTargetUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple LinkInternalTarget documents */
  upsert?: InputMaybe<Array<LinkInternalTargetUpsertWithNestedWhereUniqueInput>>;
};

export type LinkInternalTargetUpdateManyWithNestedWhereInput = {
  Collection?: InputMaybe<CollectionUpdateManyWithNestedWhereInput>;
  Editorial?: InputMaybe<EditorialUpdateManyWithNestedWhereInput>;
  Event?: InputMaybe<EventUpdateManyWithNestedWhereInput>;
  Page?: InputMaybe<PageUpdateManyWithNestedWhereInput>;
  Product?: InputMaybe<ProductUpdateManyWithNestedWhereInput>;
};

export type LinkInternalTargetUpdateOneInlineInput = {
  /** Connect existing LinkInternalTarget document */
  connect?: InputMaybe<LinkInternalTargetWhereUniqueInput>;
  /** Create and connect one LinkInternalTarget document */
  create?: InputMaybe<LinkInternalTargetCreateInput>;
  /** Delete currently connected LinkInternalTarget document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected LinkInternalTarget document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single LinkInternalTarget document */
  update?: InputMaybe<LinkInternalTargetUpdateWithNestedWhereUniqueInput>;
  /** Upsert single LinkInternalTarget document */
  upsert?: InputMaybe<LinkInternalTargetUpsertWithNestedWhereUniqueInput>;
};

export type LinkInternalTargetUpdateWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpdateWithNestedWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialUpdateWithNestedWhereUniqueInput>;
  Event?: InputMaybe<EventUpdateWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpdateWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpdateWithNestedWhereUniqueInput>;
};

export type LinkInternalTargetUpsertWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpsertWithNestedWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialUpsertWithNestedWhereUniqueInput>;
  Event?: InputMaybe<EventUpsertWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpsertWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpsertWithNestedWhereUniqueInput>;
};

export type LinkInternalTargetWhereInput = {
  Collection?: InputMaybe<CollectionWhereInput>;
  Editorial?: InputMaybe<EditorialWhereInput>;
  Event?: InputMaybe<EventWhereInput>;
  Page?: InputMaybe<PageWhereInput>;
  Product?: InputMaybe<ProductWhereInput>;
};

export type LinkInternalTargetWhereUniqueInput = {
  Collection?: InputMaybe<CollectionWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialWhereUniqueInput>;
  Event?: InputMaybe<EventWhereUniqueInput>;
  Page?: InputMaybe<PageWhereUniqueInput>;
  Product?: InputMaybe<ProductWhereUniqueInput>;
};

/** Identifies documents */
export type LinkManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LinkWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LinkWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LinkWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  externalTarget?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  externalTarget_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  externalTarget_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  externalTarget_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  externalTarget_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  externalTarget_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  externalTarget_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  externalTarget_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  externalTarget_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  externalTarget_starts_with?: InputMaybe<Scalars['String']['input']>;
  hasTargetBlank?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  hasTargetBlank_not?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values in which the union is connected to the given models */
  internalTarget?: InputMaybe<LinkInternalTargetWhereInput>;
  /** All values in which the union is empty */
  internalTarget_empty?: InputMaybe<Scalars['Boolean']['input']>;
  rel?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  rel_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  rel_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  rel_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  rel_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  rel_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  rel_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  rel_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  rel_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  rel_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export enum LinkOrderByInput {
  ExternalTargetAsc = 'externalTarget_ASC',
  ExternalTargetDesc = 'externalTarget_DESC',
  HasTargetBlankAsc = 'hasTargetBlank_ASC',
  HasTargetBlankDesc = 'hasTargetBlank_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  RelAsc = 'rel_ASC',
  RelDesc = 'rel_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type LinkParent = MixedMedia | Navigation;

export type LinkParentConnectInput = {
  MixedMedia?: InputMaybe<MixedMediaConnectInput>;
  Navigation?: InputMaybe<NavigationConnectInput>;
};

export type LinkParentCreateInput = {
  MixedMedia?: InputMaybe<MixedMediaCreateInput>;
  Navigation?: InputMaybe<NavigationCreateInput>;
};

export type LinkParentCreateManyInlineInput = {
  /** Connect multiple existing LinkParent documents */
  connect?: InputMaybe<Array<LinkParentWhereUniqueInput>>;
  /** Create and connect multiple existing LinkParent documents */
  create?: InputMaybe<Array<LinkParentCreateInput>>;
};

export type LinkParentCreateOneInlineInput = {
  /** Connect one existing LinkParent document */
  connect?: InputMaybe<LinkParentWhereUniqueInput>;
  /** Create and connect one LinkParent document */
  create?: InputMaybe<LinkParentCreateInput>;
};

export type LinkParentUpdateInput = {
  MixedMedia?: InputMaybe<MixedMediaUpdateInput>;
  Navigation?: InputMaybe<NavigationUpdateInput>;
};

export type LinkParentUpdateManyInlineInput = {
  /** Connect multiple existing LinkParent documents */
  connect?: InputMaybe<Array<LinkParentConnectInput>>;
  /** Create and connect multiple LinkParent documents */
  create?: InputMaybe<Array<LinkParentCreateInput>>;
  /** Delete multiple LinkParent documents */
  delete?: InputMaybe<Array<LinkParentWhereUniqueInput>>;
  /** Disconnect multiple LinkParent documents */
  disconnect?: InputMaybe<Array<LinkParentWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing LinkParent documents */
  set?: InputMaybe<Array<LinkParentWhereUniqueInput>>;
  /** Update multiple LinkParent documents */
  update?: InputMaybe<Array<LinkParentUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple LinkParent documents */
  upsert?: InputMaybe<Array<LinkParentUpsertWithNestedWhereUniqueInput>>;
};

export type LinkParentUpdateManyWithNestedWhereInput = {
  MixedMedia?: InputMaybe<MixedMediaUpdateManyWithNestedWhereInput>;
  Navigation?: InputMaybe<NavigationUpdateManyWithNestedWhereInput>;
};

export type LinkParentUpdateOneInlineInput = {
  /** Connect existing LinkParent document */
  connect?: InputMaybe<LinkParentWhereUniqueInput>;
  /** Create and connect one LinkParent document */
  create?: InputMaybe<LinkParentCreateInput>;
  /** Delete currently connected LinkParent document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected LinkParent document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single LinkParent document */
  update?: InputMaybe<LinkParentUpdateWithNestedWhereUniqueInput>;
  /** Upsert single LinkParent document */
  upsert?: InputMaybe<LinkParentUpsertWithNestedWhereUniqueInput>;
};

export type LinkParentUpdateWithNestedWhereUniqueInput = {
  MixedMedia?: InputMaybe<MixedMediaUpdateWithNestedWhereUniqueInput>;
  Navigation?: InputMaybe<NavigationUpdateWithNestedWhereUniqueInput>;
};

export type LinkParentUpsertWithNestedWhereUniqueInput = {
  MixedMedia?: InputMaybe<MixedMediaUpsertWithNestedWhereUniqueInput>;
  Navigation?: InputMaybe<NavigationUpsertWithNestedWhereUniqueInput>;
};

export type LinkParentWhereInput = {
  MixedMedia?: InputMaybe<MixedMediaWhereInput>;
  Navigation?: InputMaybe<NavigationWhereInput>;
};

export type LinkParentWhereUniqueInput = {
  MixedMedia?: InputMaybe<MixedMediaWhereUniqueInput>;
  Navigation?: InputMaybe<NavigationWhereUniqueInput>;
};

export type LinkUpdateInput = {
  externalTarget?: InputMaybe<Scalars['String']['input']>;
  hasTargetBlank?: InputMaybe<Scalars['Boolean']['input']>;
  internalTarget?: InputMaybe<LinkInternalTargetUpdateOneInlineInput>;
  /** label input for default locale (en) */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Manage document localizations */
  localizations?: InputMaybe<LinkUpdateLocalizationsInput>;
  rel?: InputMaybe<Scalars['String']['input']>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LinkUpdateLocalizationDataInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LinkUpdateLocalizationInput = {
  data: LinkUpdateLocalizationDataInput;
  locale: Locale;
};

export type LinkUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<LinkCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<LinkUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<LinkUpsertLocalizationInput>>;
};

export type LinkUpdateManyInlineInput = {
  /** Create and connect multiple Link component instances */
  create?: InputMaybe<Array<LinkCreateWithPositionInput>>;
  /** Delete multiple Link documents */
  delete?: InputMaybe<Array<LinkWhereUniqueInput>>;
  /** Update multiple Link component instances */
  update?: InputMaybe<Array<LinkUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple Link component instances */
  upsert?: InputMaybe<Array<LinkUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type LinkUpdateManyInput = {
  externalTarget?: InputMaybe<Scalars['String']['input']>;
  hasTargetBlank?: InputMaybe<Scalars['Boolean']['input']>;
  /** label input for default locale (en) */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<LinkUpdateManyLocalizationsInput>;
  rel?: InputMaybe<Scalars['String']['input']>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LinkUpdateManyLocalizationDataInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type LinkUpdateManyLocalizationInput = {
  data: LinkUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type LinkUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<LinkUpdateManyLocalizationInput>>;
};

export type LinkUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: LinkUpdateManyInput;
  /** Document search */
  where: LinkWhereInput;
};

export type LinkUpdateOneInlineInput = {
  /** Create and connect one Link document */
  create?: InputMaybe<LinkCreateInput>;
  /** Delete currently connected Link document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Link document */
  update?: InputMaybe<LinkUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Link document */
  upsert?: InputMaybe<LinkUpsertWithNestedWhereUniqueInput>;
};

export type LinkUpdateWithNestedWhereUniqueAndPositionInput = {
  /** Document to update */
  data?: InputMaybe<LinkUpdateInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: LinkWhereUniqueInput;
};

export type LinkUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: LinkUpdateInput;
  /** Unique document search */
  where: LinkWhereUniqueInput;
};

export type LinkUpsertInput = {
  /** Create document if it didn't exist */
  create: LinkCreateInput;
  /** Update document if it exists */
  update: LinkUpdateInput;
};

export type LinkUpsertLocalizationInput = {
  create: LinkCreateLocalizationDataInput;
  locale: Locale;
  update: LinkUpdateLocalizationDataInput;
};

export type LinkUpsertWithNestedWhereUniqueAndPositionInput = {
  /** Document to upsert */
  data?: InputMaybe<LinkUpsertInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: LinkWhereUniqueInput;
};

export type LinkUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: LinkUpsertInput;
  /** Unique document search */
  where: LinkWhereUniqueInput;
};

/** Identifies documents */
export type LinkWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LinkWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LinkWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LinkWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  externalTarget?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  externalTarget_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  externalTarget_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  externalTarget_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  externalTarget_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  externalTarget_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  externalTarget_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  externalTarget_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  externalTarget_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  externalTarget_starts_with?: InputMaybe<Scalars['String']['input']>;
  hasTargetBlank?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  hasTargetBlank_not?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values in which the union is connected to the given models */
  internalTarget?: InputMaybe<LinkInternalTargetWhereInput>;
  /** All values in which the union is empty */
  internalTarget_empty?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  label_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  label_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  label_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  label_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  label_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  label_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  label_starts_with?: InputMaybe<Scalars['String']['input']>;
  rel?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  rel_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  rel_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  rel_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  rel_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  rel_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  rel_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  rel_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  rel_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  rel_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
};

/** References Link record uniquely */
export type LinkWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Locale system enumeration */
export enum Locale {
  /** System locale */
  En = 'en'
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  __typename?: 'Location';
  distance: Scalars['Float']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};


/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput;
};

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type Lock = Entity & Node & {
  __typename?: 'Lock';
  /** By enabling this option, the page is unlocked for a user that has entered a password, regardless of the scheduled lock time. */
  alwaysUnlockForAuthenticatedUser: Scalars['Boolean']['output'];
  /** By enabling this option, even if a page is password protected, it will be unlocked at scheduled unlock time. */
  alwaysUnlockOnTime: Scalars['Boolean']['output'];
  /** Add a background image or video for the default lock screen. */
  background?: Maybe<Asset>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Optionally create a Lock Screen. */
  customLockScreen?: Maybe<Layout>;
  /** Get the document in other stages */
  documentInStages: Array<Lock>;
  event?: Maybe<Event>;
  exemptions: Array<LockExemptionExemptions>;
  /** List of Lock versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  internalName?: Maybe<Scalars['String']['output']>;
  /** Toggle the lock on and off. */
  isEnabled: Scalars['Boolean']['output'];
  /** Apply lock to the entire webshop. While GLOBAL is enabled, you can bypass the lock on specific pages using exemptions; while disabled, you can still enable a lock on specific page using "Single Page Locks" */
  isGlobal: Scalars['Boolean']['output'];
  layouts: Array<Layout>;
  pageLocks: Array<LockPageLocks>;
  /** Leave blank to disable password protection. */
  password?: Maybe<Scalars['String']['output']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  scheduledUnlockTime?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type LockBackgroundArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type LockCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LockCustomLockScreenArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LockDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type LockEventArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LockExemptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type LockHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type LockLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type LockPageLocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type LockPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LockScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type LockUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type LockConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: LockWhereUniqueInput;
};

/** A connection to a list of items. */
export type LockConnection = {
  __typename?: 'LockConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<LockEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type LockCreateInput = {
  alwaysUnlockForAuthenticatedUser: Scalars['Boolean']['input'];
  alwaysUnlockOnTime: Scalars['Boolean']['input'];
  background?: InputMaybe<AssetCreateOneInlineInput>;
  clu2jp8090atk07lfhdzoagfy?: InputMaybe<CountdownComponentCreateManyInlineInput>;
  clubqsy1f01kq06n3a1k39lar?: InputMaybe<LockedSectionCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customLockScreen?: InputMaybe<LayoutCreateOneInlineInput>;
  event?: InputMaybe<EventCreateOneInlineInput>;
  exemptions?: InputMaybe<LockExemptionExemptionsCreateManyInlineInput>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  isEnabled: Scalars['Boolean']['input'];
  isGlobal: Scalars['Boolean']['input'];
  layouts?: InputMaybe<LayoutCreateManyInlineInput>;
  pageLocks?: InputMaybe<LockPageLocksCreateManyInlineInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  scheduledUnlockTime?: InputMaybe<Scalars['DateTime']['input']>;
  slug: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type LockCreateManyInlineInput = {
  /** Connect multiple existing Lock documents */
  connect?: InputMaybe<Array<LockWhereUniqueInput>>;
  /** Create and connect multiple existing Lock documents */
  create?: InputMaybe<Array<LockCreateInput>>;
};

export type LockCreateOneInlineInput = {
  /** Connect one existing Lock document */
  connect?: InputMaybe<LockWhereUniqueInput>;
  /** Create and connect one Lock document */
  create?: InputMaybe<LockCreateInput>;
};

/** An edge in a connection. */
export type LockEdge = {
  __typename?: 'LockEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Lock;
};

/** Identifies documents */
export type LockManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LockWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LockWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LockWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  alwaysUnlockForAuthenticatedUser?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  alwaysUnlockForAuthenticatedUser_not?: InputMaybe<Scalars['Boolean']['input']>;
  alwaysUnlockOnTime?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  alwaysUnlockOnTime_not?: InputMaybe<Scalars['Boolean']['input']>;
  background?: InputMaybe<AssetWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  customLockScreen?: InputMaybe<LayoutWhereInput>;
  documentInStages_every?: InputMaybe<LockWhereStageInput>;
  documentInStages_none?: InputMaybe<LockWhereStageInput>;
  documentInStages_some?: InputMaybe<LockWhereStageInput>;
  event?: InputMaybe<EventWhereInput>;
  /** All values in which the union is empty */
  exemptions_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  exemptions_some?: InputMaybe<LockExemptionExemptionsWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isEnabled_not?: InputMaybe<Scalars['Boolean']['input']>;
  isGlobal?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isGlobal_not?: InputMaybe<Scalars['Boolean']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  /** All values in which the union is empty */
  pageLocks_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  pageLocks_some?: InputMaybe<LockPageLocksWhereInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  password_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  password_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  password_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  password_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  password_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  password_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  password_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  password_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  password_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledUnlockTime?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  scheduledUnlockTime_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  scheduledUnlockTime_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  scheduledUnlockTime_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  scheduledUnlockTime_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  scheduledUnlockTime_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  scheduledUnlockTime_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  scheduledUnlockTime_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum LockOrderByInput {
  AlwaysUnlockForAuthenticatedUserAsc = 'alwaysUnlockForAuthenticatedUser_ASC',
  AlwaysUnlockForAuthenticatedUserDesc = 'alwaysUnlockForAuthenticatedUser_DESC',
  AlwaysUnlockOnTimeAsc = 'alwaysUnlockOnTime_ASC',
  AlwaysUnlockOnTimeDesc = 'alwaysUnlockOnTime_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  IsEnabledAsc = 'isEnabled_ASC',
  IsEnabledDesc = 'isEnabled_DESC',
  IsGlobalAsc = 'isGlobal_ASC',
  IsGlobalDesc = 'isGlobal_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ScheduledUnlockTimeAsc = 'scheduledUnlockTime_ASC',
  ScheduledUnlockTimeDesc = 'scheduledUnlockTime_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type LockUpdateInput = {
  alwaysUnlockForAuthenticatedUser?: InputMaybe<Scalars['Boolean']['input']>;
  alwaysUnlockOnTime?: InputMaybe<Scalars['Boolean']['input']>;
  background?: InputMaybe<AssetUpdateOneInlineInput>;
  clu2jp8090atk07lfhdzoagfy?: InputMaybe<CountdownComponentUpdateManyInlineInput>;
  clubqsy1f01kq06n3a1k39lar?: InputMaybe<LockedSectionUpdateManyInlineInput>;
  customLockScreen?: InputMaybe<LayoutUpdateOneInlineInput>;
  event?: InputMaybe<EventUpdateOneInlineInput>;
  exemptions?: InputMaybe<LockExemptionExemptionsUpdateManyInlineInput>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isGlobal?: InputMaybe<Scalars['Boolean']['input']>;
  layouts?: InputMaybe<LayoutUpdateManyInlineInput>;
  pageLocks?: InputMaybe<LockPageLocksUpdateManyInlineInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  scheduledUnlockTime?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type LockUpdateManyInlineInput = {
  /** Connect multiple existing Lock documents */
  connect?: InputMaybe<Array<LockConnectInput>>;
  /** Create and connect multiple Lock documents */
  create?: InputMaybe<Array<LockCreateInput>>;
  /** Delete multiple Lock documents */
  delete?: InputMaybe<Array<LockWhereUniqueInput>>;
  /** Disconnect multiple Lock documents */
  disconnect?: InputMaybe<Array<LockWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Lock documents */
  set?: InputMaybe<Array<LockWhereUniqueInput>>;
  /** Update multiple Lock documents */
  update?: InputMaybe<Array<LockUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Lock documents */
  upsert?: InputMaybe<Array<LockUpsertWithNestedWhereUniqueInput>>;
};

export type LockUpdateManyInput = {
  alwaysUnlockForAuthenticatedUser?: InputMaybe<Scalars['Boolean']['input']>;
  alwaysUnlockOnTime?: InputMaybe<Scalars['Boolean']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isGlobal?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  scheduledUnlockTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type LockUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: LockUpdateManyInput;
  /** Document search */
  where: LockWhereInput;
};

export type LockUpdateOneInlineInput = {
  /** Connect existing Lock document */
  connect?: InputMaybe<LockWhereUniqueInput>;
  /** Create and connect one Lock document */
  create?: InputMaybe<LockCreateInput>;
  /** Delete currently connected Lock document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Lock document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Lock document */
  update?: InputMaybe<LockUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Lock document */
  upsert?: InputMaybe<LockUpsertWithNestedWhereUniqueInput>;
};

export type LockUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: LockUpdateInput;
  /** Unique document search */
  where: LockWhereUniqueInput;
};

export type LockUpsertInput = {
  /** Create document if it didn't exist */
  create: LockCreateInput;
  /** Update document if it exists */
  update: LockUpdateInput;
};

export type LockUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: LockUpsertInput;
  /** Unique document search */
  where: LockWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type LockWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type LockWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LockWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LockWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LockWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  alwaysUnlockForAuthenticatedUser?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  alwaysUnlockForAuthenticatedUser_not?: InputMaybe<Scalars['Boolean']['input']>;
  alwaysUnlockOnTime?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  alwaysUnlockOnTime_not?: InputMaybe<Scalars['Boolean']['input']>;
  background?: InputMaybe<AssetWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  customLockScreen?: InputMaybe<LayoutWhereInput>;
  documentInStages_every?: InputMaybe<LockWhereStageInput>;
  documentInStages_none?: InputMaybe<LockWhereStageInput>;
  documentInStages_some?: InputMaybe<LockWhereStageInput>;
  event?: InputMaybe<EventWhereInput>;
  /** All values in which the union is empty */
  exemptions_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  exemptions_some?: InputMaybe<LockExemptionExemptionsWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isEnabled_not?: InputMaybe<Scalars['Boolean']['input']>;
  isGlobal?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isGlobal_not?: InputMaybe<Scalars['Boolean']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  /** All values in which the union is empty */
  pageLocks_empty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Matches if the union contains at least one connection to the provided item to the filter */
  pageLocks_some?: InputMaybe<LockPageLocksWhereInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  password_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  password_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  password_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  password_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  password_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  password_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  password_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  password_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  password_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledUnlockTime?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  scheduledUnlockTime_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  scheduledUnlockTime_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  scheduledUnlockTime_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  scheduledUnlockTime_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  scheduledUnlockTime_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  scheduledUnlockTime_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  scheduledUnlockTime_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type LockWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LockWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LockWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LockWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<LockWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Lock record uniquely */
export type LockWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type LockedSection = Entity & {
  __typename?: 'LockedSection';
  countdown?: Maybe<Lock>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  postLaunch?: Maybe<Block>;
  preview?: Maybe<Block>;
  /** System stage field */
  stage: Stage;
};


export type LockedSectionCountdownArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LockedSectionPostLaunchArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LockedSectionPreviewArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type LockedSectionConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: LockedSectionWhereUniqueInput;
};

/** A connection to a list of items. */
export type LockedSectionConnection = {
  __typename?: 'LockedSectionConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<LockedSectionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type LockedSectionCreateInput = {
  countdown?: InputMaybe<LockCreateOneInlineInput>;
  postLaunch?: InputMaybe<BlockCreateOneInlineInput>;
  preview?: InputMaybe<BlockCreateOneInlineInput>;
};

export type LockedSectionCreateManyInlineInput = {
  /** Create and connect multiple existing LockedSection documents */
  create?: InputMaybe<Array<LockedSectionCreateInput>>;
};

export type LockedSectionCreateOneInlineInput = {
  /** Create and connect one LockedSection document */
  create?: InputMaybe<LockedSectionCreateInput>;
};

export type LockedSectionCreateWithPositionInput = {
  /** Document to create */
  data: LockedSectionCreateInput;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
};

/** An edge in a connection. */
export type LockedSectionEdge = {
  __typename?: 'LockedSectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: LockedSection;
};

/** Identifies documents */
export type LockedSectionManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LockedSectionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LockedSectionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LockedSectionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  countdown?: InputMaybe<LockWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  postLaunch?: InputMaybe<BlockWhereInput>;
  preview?: InputMaybe<BlockWhereInput>;
};

export enum LockedSectionOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC'
}

export type LockedSectionUpdateInput = {
  countdown?: InputMaybe<LockUpdateOneInlineInput>;
  postLaunch?: InputMaybe<BlockUpdateOneInlineInput>;
  preview?: InputMaybe<BlockUpdateOneInlineInput>;
};

export type LockedSectionUpdateManyInlineInput = {
  /** Create and connect multiple LockedSection component instances */
  create?: InputMaybe<Array<LockedSectionCreateWithPositionInput>>;
  /** Delete multiple LockedSection documents */
  delete?: InputMaybe<Array<LockedSectionWhereUniqueInput>>;
  /** Update multiple LockedSection component instances */
  update?: InputMaybe<Array<LockedSectionUpdateWithNestedWhereUniqueAndPositionInput>>;
  /** Upsert multiple LockedSection component instances */
  upsert?: InputMaybe<Array<LockedSectionUpsertWithNestedWhereUniqueAndPositionInput>>;
};

export type LockedSectionUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: InputMaybe<Scalars['String']['input']>;
};

export type LockedSectionUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: LockedSectionUpdateManyInput;
  /** Document search */
  where: LockedSectionWhereInput;
};

export type LockedSectionUpdateOneInlineInput = {
  /** Create and connect one LockedSection document */
  create?: InputMaybe<LockedSectionCreateInput>;
  /** Delete currently connected LockedSection document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single LockedSection document */
  update?: InputMaybe<LockedSectionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single LockedSection document */
  upsert?: InputMaybe<LockedSectionUpsertWithNestedWhereUniqueInput>;
};

export type LockedSectionUpdateWithNestedWhereUniqueAndPositionInput = {
  /** Document to update */
  data?: InputMaybe<LockedSectionUpdateInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: LockedSectionWhereUniqueInput;
};

export type LockedSectionUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: LockedSectionUpdateInput;
  /** Unique document search */
  where: LockedSectionWhereUniqueInput;
};

export type LockedSectionUpsertInput = {
  /** Create document if it didn't exist */
  create: LockedSectionCreateInput;
  /** Update document if it exists */
  update: LockedSectionUpdateInput;
};

export type LockedSectionUpsertWithNestedWhereUniqueAndPositionInput = {
  /** Document to upsert */
  data?: InputMaybe<LockedSectionUpsertInput>;
  /** Position in the list of existing component instances, will default to appending at the end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Unique component instance search */
  where: LockedSectionWhereUniqueInput;
};

export type LockedSectionUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: LockedSectionUpsertInput;
  /** Unique document search */
  where: LockedSectionWhereUniqueInput;
};

/** Identifies documents */
export type LockedSectionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LockedSectionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LockedSectionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LockedSectionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  countdown?: InputMaybe<LockWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  postLaunch?: InputMaybe<BlockWhereInput>;
  preview?: InputMaybe<BlockWhereInput>;
};

/** References LockedSection record uniquely */
export type LockedSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type MixedMedia = Entity & Node & {
  __typename?: 'MixedMedia';
  body?: Maybe<MixedMediaBodyRichText>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  customizedSections: Array<CustomizedSection>;
  /** Get the document in other stages */
  documentInStages: Array<MixedMedia>;
  heroes: Array<Layout>;
  /** List of MixedMedia versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  layouts: Array<Layout>;
  link?: Maybe<Link>;
  /** Attaching multiple images to this field will load an image slider */
  media: Array<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type MixedMediaCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type MixedMediaCustomizedSectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CustomizedSectionWhereInput>;
};


export type MixedMediaDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type MixedMediaHeroesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type MixedMediaHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type MixedMediaLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type MixedMediaLinkArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type MixedMediaMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetWhereInput>;
};


export type MixedMediaPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type MixedMediaScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type MixedMediaUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type MixedMediaBodyRichText = {
  __typename?: 'MixedMediaBodyRichText';
  /** Returns HTMl representation */
  html: Scalars['String']['output'];
  json: Scalars['RichTextAST']['output'];
  /** Returns Markdown representation */
  markdown: Scalars['String']['output'];
  /** @deprecated Please use the 'json' field */
  raw: Scalars['RichTextAST']['output'];
  references: Array<MixedMediaBodyRichTextEmbeddedTypes>;
  /** Returns plain-text contents of RichText */
  text: Scalars['String']['output'];
};


export type MixedMediaBodyRichTextReferencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MixedMediaBodyRichTextEmbeddedTypes = Asset | Collection | Form | Lock | Page | Product;

export type MixedMediaConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: MixedMediaWhereUniqueInput;
};

/** A connection to a list of items. */
export type MixedMediaConnection = {
  __typename?: 'MixedMediaConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<MixedMediaEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type MixedMediaCreateInput = {
  body?: InputMaybe<Scalars['RichTextAST']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizedSections?: InputMaybe<CustomizedSectionCreateManyInlineInput>;
  heroes?: InputMaybe<LayoutCreateManyInlineInput>;
  layouts?: InputMaybe<LayoutCreateManyInlineInput>;
  link?: InputMaybe<LinkCreateOneInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<MixedMediaCreateLocalizationsInput>;
  media?: InputMaybe<AssetCreateManyInlineInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MixedMediaCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MixedMediaCreateLocalizationInput = {
  /** Localization input */
  data: MixedMediaCreateLocalizationDataInput;
  locale: Locale;
};

export type MixedMediaCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<MixedMediaCreateLocalizationInput>>;
};

export type MixedMediaCreateManyInlineInput = {
  /** Connect multiple existing MixedMedia documents */
  connect?: InputMaybe<Array<MixedMediaWhereUniqueInput>>;
  /** Create and connect multiple existing MixedMedia documents */
  create?: InputMaybe<Array<MixedMediaCreateInput>>;
};

export type MixedMediaCreateOneInlineInput = {
  /** Connect one existing MixedMedia document */
  connect?: InputMaybe<MixedMediaWhereUniqueInput>;
  /** Create and connect one MixedMedia document */
  create?: InputMaybe<MixedMediaCreateInput>;
};

/** An edge in a connection. */
export type MixedMediaEdge = {
  __typename?: 'MixedMediaEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: MixedMedia;
};

/** Identifies documents */
export type MixedMediaManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<MixedMediaWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<MixedMediaWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<MixedMediaWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  customizedSections_every?: InputMaybe<CustomizedSectionWhereInput>;
  customizedSections_none?: InputMaybe<CustomizedSectionWhereInput>;
  customizedSections_some?: InputMaybe<CustomizedSectionWhereInput>;
  documentInStages_every?: InputMaybe<MixedMediaWhereStageInput>;
  documentInStages_none?: InputMaybe<MixedMediaWhereStageInput>;
  documentInStages_some?: InputMaybe<MixedMediaWhereStageInput>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  link?: InputMaybe<LinkWhereInput>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum MixedMediaOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MixedMediaUpdateInput = {
  body?: InputMaybe<Scalars['RichTextAST']['input']>;
  customizedSections?: InputMaybe<CustomizedSectionUpdateManyInlineInput>;
  heroes?: InputMaybe<LayoutUpdateManyInlineInput>;
  layouts?: InputMaybe<LayoutUpdateManyInlineInput>;
  link?: InputMaybe<LinkUpdateOneInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<MixedMediaUpdateLocalizationsInput>;
  media?: InputMaybe<AssetUpdateManyInlineInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MixedMediaUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<MixedMediaCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
};

export type MixedMediaUpdateManyInlineInput = {
  /** Connect multiple existing MixedMedia documents */
  connect?: InputMaybe<Array<MixedMediaConnectInput>>;
  /** Create and connect multiple MixedMedia documents */
  create?: InputMaybe<Array<MixedMediaCreateInput>>;
  /** Delete multiple MixedMedia documents */
  delete?: InputMaybe<Array<MixedMediaWhereUniqueInput>>;
  /** Disconnect multiple MixedMedia documents */
  disconnect?: InputMaybe<Array<MixedMediaWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing MixedMedia documents */
  set?: InputMaybe<Array<MixedMediaWhereUniqueInput>>;
  /** Update multiple MixedMedia documents */
  update?: InputMaybe<Array<MixedMediaUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple MixedMedia documents */
  upsert?: InputMaybe<Array<MixedMediaUpsertWithNestedWhereUniqueInput>>;
};

export type MixedMediaUpdateManyInput = {
  body?: InputMaybe<Scalars['RichTextAST']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MixedMediaUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: MixedMediaUpdateManyInput;
  /** Document search */
  where: MixedMediaWhereInput;
};

export type MixedMediaUpdateOneInlineInput = {
  /** Connect existing MixedMedia document */
  connect?: InputMaybe<MixedMediaWhereUniqueInput>;
  /** Create and connect one MixedMedia document */
  create?: InputMaybe<MixedMediaCreateInput>;
  /** Delete currently connected MixedMedia document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected MixedMedia document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single MixedMedia document */
  update?: InputMaybe<MixedMediaUpdateWithNestedWhereUniqueInput>;
  /** Upsert single MixedMedia document */
  upsert?: InputMaybe<MixedMediaUpsertWithNestedWhereUniqueInput>;
};

export type MixedMediaUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: MixedMediaUpdateInput;
  /** Unique document search */
  where: MixedMediaWhereUniqueInput;
};

export type MixedMediaUpsertInput = {
  /** Create document if it didn't exist */
  create: MixedMediaCreateInput;
  /** Update document if it exists */
  update: MixedMediaUpdateInput;
};

export type MixedMediaUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: MixedMediaUpsertInput;
  /** Unique document search */
  where: MixedMediaWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type MixedMediaWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type MixedMediaWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<MixedMediaWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<MixedMediaWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<MixedMediaWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  customizedSections_every?: InputMaybe<CustomizedSectionWhereInput>;
  customizedSections_none?: InputMaybe<CustomizedSectionWhereInput>;
  customizedSections_some?: InputMaybe<CustomizedSectionWhereInput>;
  documentInStages_every?: InputMaybe<MixedMediaWhereStageInput>;
  documentInStages_none?: InputMaybe<MixedMediaWhereStageInput>;
  documentInStages_some?: InputMaybe<MixedMediaWhereStageInput>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  link?: InputMaybe<LinkWhereInput>;
  media_every?: InputMaybe<AssetWhereInput>;
  media_none?: InputMaybe<AssetWhereInput>;
  media_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type MixedMediaWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<MixedMediaWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<MixedMediaWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<MixedMediaWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<MixedMediaWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References MixedMedia record uniquely */
export type MixedMediaWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create one archive */
  createArchive?: Maybe<Archive>;
  /** Create an asset. Use the returned info to finish the creation process by uploading the asset. */
  createAsset?: Maybe<Asset>;
  /** Create one collection */
  createCollection?: Maybe<Collection>;
  /** Create one combinedListing */
  createCombinedListing?: Maybe<CombinedListing>;
  /** Create one customizedSection */
  createCustomizedSection?: Maybe<CustomizedSection>;
  /** Create one editorial */
  createEditorial?: Maybe<Editorial>;
  /** Create one event */
  createEvent?: Maybe<Event>;
  /** Create one form */
  createForm?: Maybe<Form>;
  /** Create one gallery */
  createGallery?: Maybe<Gallery>;
  /** Create one layout */
  createLayout?: Maybe<Layout>;
  /** Create one lock */
  createLock?: Maybe<Lock>;
  /** Create one mixedMedia */
  createMixedMedia?: Maybe<MixedMedia>;
  /** Create one navigation */
  createNavigation?: Maybe<Navigation>;
  /** Create one page */
  createPage?: Maybe<Page>;
  /** Create one person */
  createPerson?: Maybe<Person>;
  /** Create one product */
  createProduct?: Maybe<Product>;
  /** Create one scheduledRelease */
  createScheduledRelease?: Maybe<ScheduledRelease>;
  /** Create one seo */
  createSeo?: Maybe<Seo>;
  /** Create one theme */
  createTheme?: Maybe<Theme>;
  /** Delete one archive from _all_ existing stages. Returns deleted document. */
  deleteArchive?: Maybe<Archive>;
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<Asset>;
  /** Delete one collection from _all_ existing stages. Returns deleted document. */
  deleteCollection?: Maybe<Collection>;
  /** Delete one combinedListing from _all_ existing stages. Returns deleted document. */
  deleteCombinedListing?: Maybe<CombinedListing>;
  /** Delete one customizedSection from _all_ existing stages. Returns deleted document. */
  deleteCustomizedSection?: Maybe<CustomizedSection>;
  /** Delete one editorial from _all_ existing stages. Returns deleted document. */
  deleteEditorial?: Maybe<Editorial>;
  /** Delete one event from _all_ existing stages. Returns deleted document. */
  deleteEvent?: Maybe<Event>;
  /** Delete one form from _all_ existing stages. Returns deleted document. */
  deleteForm?: Maybe<Form>;
  /** Delete one gallery from _all_ existing stages. Returns deleted document. */
  deleteGallery?: Maybe<Gallery>;
  /** Delete one layout from _all_ existing stages. Returns deleted document. */
  deleteLayout?: Maybe<Layout>;
  /** Delete one lock from _all_ existing stages. Returns deleted document. */
  deleteLock?: Maybe<Lock>;
  /**
   * Delete many Archive documents
   * @deprecated Please use the new paginated many mutation (deleteManyArchivesConnection)
   */
  deleteManyArchives: BatchPayload;
  /** Delete many Archive documents, return deleted documents */
  deleteManyArchivesConnection: ArchiveConnection;
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  deleteManyAssets: BatchPayload;
  /** Delete many Asset documents, return deleted documents */
  deleteManyAssetsConnection: AssetConnection;
  /**
   * Delete many Collection documents
   * @deprecated Please use the new paginated many mutation (deleteManyCollectionsConnection)
   */
  deleteManyCollections: BatchPayload;
  /** Delete many Collection documents, return deleted documents */
  deleteManyCollectionsConnection: CollectionConnection;
  /**
   * Delete many CombinedListing documents
   * @deprecated Please use the new paginated many mutation (deleteManyCombinedListingsConnection)
   */
  deleteManyCombinedListings: BatchPayload;
  /** Delete many CombinedListing documents, return deleted documents */
  deleteManyCombinedListingsConnection: CombinedListingConnection;
  /**
   * Delete many CustomizedSection documents
   * @deprecated Please use the new paginated many mutation (deleteManyCustomizedSectionsConnection)
   */
  deleteManyCustomizedSections: BatchPayload;
  /** Delete many CustomizedSection documents, return deleted documents */
  deleteManyCustomizedSectionsConnection: CustomizedSectionConnection;
  /**
   * Delete many Editorial documents
   * @deprecated Please use the new paginated many mutation (deleteManyEditorialsConnection)
   */
  deleteManyEditorials: BatchPayload;
  /** Delete many Editorial documents, return deleted documents */
  deleteManyEditorialsConnection: EditorialConnection;
  /**
   * Delete many Event documents
   * @deprecated Please use the new paginated many mutation (deleteManyEventsConnection)
   */
  deleteManyEvents: BatchPayload;
  /** Delete many Event documents, return deleted documents */
  deleteManyEventsConnection: EventConnection;
  /**
   * Delete many Form documents
   * @deprecated Please use the new paginated many mutation (deleteManyFormsConnection)
   */
  deleteManyForms: BatchPayload;
  /** Delete many Form documents, return deleted documents */
  deleteManyFormsConnection: FormConnection;
  /**
   * Delete many Gallery documents
   * @deprecated Please use the new paginated many mutation (deleteManyGalleriesConnection)
   */
  deleteManyGalleries: BatchPayload;
  /** Delete many Gallery documents, return deleted documents */
  deleteManyGalleriesConnection: GalleryConnection;
  /**
   * Delete many Layout documents
   * @deprecated Please use the new paginated many mutation (deleteManyLayoutsConnection)
   */
  deleteManyLayouts: BatchPayload;
  /** Delete many Layout documents, return deleted documents */
  deleteManyLayoutsConnection: LayoutConnection;
  /**
   * Delete many Lock documents
   * @deprecated Please use the new paginated many mutation (deleteManyLocksConnection)
   */
  deleteManyLocks: BatchPayload;
  /** Delete many Lock documents, return deleted documents */
  deleteManyLocksConnection: LockConnection;
  /**
   * Delete many MixedMedia documents
   * @deprecated Please use the new paginated many mutation (deleteManyMixedMediasConnection)
   */
  deleteManyMixedMedias: BatchPayload;
  /** Delete many MixedMedia documents, return deleted documents */
  deleteManyMixedMediasConnection: MixedMediaConnection;
  /**
   * Delete many Navigation documents
   * @deprecated Please use the new paginated many mutation (deleteManyNavigationsConnection)
   */
  deleteManyNavigations: BatchPayload;
  /** Delete many Navigation documents, return deleted documents */
  deleteManyNavigationsConnection: NavigationConnection;
  /**
   * Delete many Page documents
   * @deprecated Please use the new paginated many mutation (deleteManyPagesConnection)
   */
  deleteManyPages: BatchPayload;
  /** Delete many Page documents, return deleted documents */
  deleteManyPagesConnection: PageConnection;
  /**
   * Delete many Person documents
   * @deprecated Please use the new paginated many mutation (deleteManyPeopleConnection)
   */
  deleteManyPeople: BatchPayload;
  /** Delete many Person documents, return deleted documents */
  deleteManyPeopleConnection: PersonConnection;
  /**
   * Delete many Product documents
   * @deprecated Please use the new paginated many mutation (deleteManyProductsConnection)
   */
  deleteManyProducts: BatchPayload;
  /** Delete many Product documents, return deleted documents */
  deleteManyProductsConnection: ProductConnection;
  /**
   * Delete many Seo documents
   * @deprecated Please use the new paginated many mutation (deleteManySeosConnection)
   */
  deleteManySeos: BatchPayload;
  /** Delete many Seo documents, return deleted documents */
  deleteManySeosConnection: SeoConnection;
  /**
   * Delete many Theme documents
   * @deprecated Please use the new paginated many mutation (deleteManyThemesConnection)
   */
  deleteManyThemes: BatchPayload;
  /** Delete many Theme documents, return deleted documents */
  deleteManyThemesConnection: ThemeConnection;
  /** Delete one mixedMedia from _all_ existing stages. Returns deleted document. */
  deleteMixedMedia?: Maybe<MixedMedia>;
  /** Delete one navigation from _all_ existing stages. Returns deleted document. */
  deleteNavigation?: Maybe<Navigation>;
  /** Delete one page from _all_ existing stages. Returns deleted document. */
  deletePage?: Maybe<Page>;
  /** Delete one person from _all_ existing stages. Returns deleted document. */
  deletePerson?: Maybe<Person>;
  /** Delete one product from _all_ existing stages. Returns deleted document. */
  deleteProduct?: Maybe<Product>;
  /** Delete and return scheduled operation */
  deleteScheduledOperation?: Maybe<ScheduledOperation>;
  /** Delete one scheduledRelease from _all_ existing stages. Returns deleted document. */
  deleteScheduledRelease?: Maybe<ScheduledRelease>;
  /** Delete one seo from _all_ existing stages. Returns deleted document. */
  deleteSeo?: Maybe<Seo>;
  /** Delete one theme from _all_ existing stages. Returns deleted document. */
  deleteTheme?: Maybe<Theme>;
  /** Publish one archive */
  publishArchive?: Maybe<Archive>;
  /** Publish one asset */
  publishAsset?: Maybe<Asset>;
  /** Publish one collection */
  publishCollection?: Maybe<Collection>;
  /** Publish one combinedListing */
  publishCombinedListing?: Maybe<CombinedListing>;
  /** Publish one customizedSection */
  publishCustomizedSection?: Maybe<CustomizedSection>;
  /** Publish one editorial */
  publishEditorial?: Maybe<Editorial>;
  /** Publish one event */
  publishEvent?: Maybe<Event>;
  /** Publish one form */
  publishForm?: Maybe<Form>;
  /** Publish one gallery */
  publishGallery?: Maybe<Gallery>;
  /** Publish one layout */
  publishLayout?: Maybe<Layout>;
  /** Publish one lock */
  publishLock?: Maybe<Lock>;
  /**
   * Publish many Archive documents
   * @deprecated Please use the new paginated many mutation (publishManyArchivesConnection)
   */
  publishManyArchives: BatchPayload;
  /** Publish many Archive documents */
  publishManyArchivesConnection: ArchiveConnection;
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  publishManyAssets: BatchPayload;
  /** Publish many Asset documents */
  publishManyAssetsConnection: AssetConnection;
  /**
   * Publish many Collection documents
   * @deprecated Please use the new paginated many mutation (publishManyCollectionsConnection)
   */
  publishManyCollections: BatchPayload;
  /** Publish many Collection documents */
  publishManyCollectionsConnection: CollectionConnection;
  /**
   * Publish many CombinedListing documents
   * @deprecated Please use the new paginated many mutation (publishManyCombinedListingsConnection)
   */
  publishManyCombinedListings: BatchPayload;
  /** Publish many CombinedListing documents */
  publishManyCombinedListingsConnection: CombinedListingConnection;
  /**
   * Publish many CustomizedSection documents
   * @deprecated Please use the new paginated many mutation (publishManyCustomizedSectionsConnection)
   */
  publishManyCustomizedSections: BatchPayload;
  /** Publish many CustomizedSection documents */
  publishManyCustomizedSectionsConnection: CustomizedSectionConnection;
  /**
   * Publish many Editorial documents
   * @deprecated Please use the new paginated many mutation (publishManyEditorialsConnection)
   */
  publishManyEditorials: BatchPayload;
  /** Publish many Editorial documents */
  publishManyEditorialsConnection: EditorialConnection;
  /**
   * Publish many Event documents
   * @deprecated Please use the new paginated many mutation (publishManyEventsConnection)
   */
  publishManyEvents: BatchPayload;
  /** Publish many Event documents */
  publishManyEventsConnection: EventConnection;
  /**
   * Publish many Form documents
   * @deprecated Please use the new paginated many mutation (publishManyFormsConnection)
   */
  publishManyForms: BatchPayload;
  /** Publish many Form documents */
  publishManyFormsConnection: FormConnection;
  /**
   * Publish many Gallery documents
   * @deprecated Please use the new paginated many mutation (publishManyGalleriesConnection)
   */
  publishManyGalleries: BatchPayload;
  /** Publish many Gallery documents */
  publishManyGalleriesConnection: GalleryConnection;
  /**
   * Publish many Layout documents
   * @deprecated Please use the new paginated many mutation (publishManyLayoutsConnection)
   */
  publishManyLayouts: BatchPayload;
  /** Publish many Layout documents */
  publishManyLayoutsConnection: LayoutConnection;
  /**
   * Publish many Lock documents
   * @deprecated Please use the new paginated many mutation (publishManyLocksConnection)
   */
  publishManyLocks: BatchPayload;
  /** Publish many Lock documents */
  publishManyLocksConnection: LockConnection;
  /**
   * Publish many MixedMedia documents
   * @deprecated Please use the new paginated many mutation (publishManyMixedMediasConnection)
   */
  publishManyMixedMedias: BatchPayload;
  /** Publish many MixedMedia documents */
  publishManyMixedMediasConnection: MixedMediaConnection;
  /**
   * Publish many Navigation documents
   * @deprecated Please use the new paginated many mutation (publishManyNavigationsConnection)
   */
  publishManyNavigations: BatchPayload;
  /** Publish many Navigation documents */
  publishManyNavigationsConnection: NavigationConnection;
  /**
   * Publish many Page documents
   * @deprecated Please use the new paginated many mutation (publishManyPagesConnection)
   */
  publishManyPages: BatchPayload;
  /** Publish many Page documents */
  publishManyPagesConnection: PageConnection;
  /**
   * Publish many Person documents
   * @deprecated Please use the new paginated many mutation (publishManyPeopleConnection)
   */
  publishManyPeople: BatchPayload;
  /** Publish many Person documents */
  publishManyPeopleConnection: PersonConnection;
  /**
   * Publish many Product documents
   * @deprecated Please use the new paginated many mutation (publishManyProductsConnection)
   */
  publishManyProducts: BatchPayload;
  /** Publish many Product documents */
  publishManyProductsConnection: ProductConnection;
  /**
   * Publish many Seo documents
   * @deprecated Please use the new paginated many mutation (publishManySeosConnection)
   */
  publishManySeos: BatchPayload;
  /** Publish many Seo documents */
  publishManySeosConnection: SeoConnection;
  /**
   * Publish many Theme documents
   * @deprecated Please use the new paginated many mutation (publishManyThemesConnection)
   */
  publishManyThemes: BatchPayload;
  /** Publish many Theme documents */
  publishManyThemesConnection: ThemeConnection;
  /** Publish one mixedMedia */
  publishMixedMedia?: Maybe<MixedMedia>;
  /** Publish one navigation */
  publishNavigation?: Maybe<Navigation>;
  /** Publish one page */
  publishPage?: Maybe<Page>;
  /** Publish one person */
  publishPerson?: Maybe<Person>;
  /** Publish one product */
  publishProduct?: Maybe<Product>;
  /** Publish one seo */
  publishSeo?: Maybe<Seo>;
  /** Publish one theme */
  publishTheme?: Maybe<Theme>;
  /** Schedule to publish one archive */
  schedulePublishArchive?: Maybe<Archive>;
  /** Schedule to publish one asset */
  schedulePublishAsset?: Maybe<Asset>;
  /** Schedule to publish one collection */
  schedulePublishCollection?: Maybe<Collection>;
  /** Schedule to publish one combinedListing */
  schedulePublishCombinedListing?: Maybe<CombinedListing>;
  /** Schedule to publish one customizedSection */
  schedulePublishCustomizedSection?: Maybe<CustomizedSection>;
  /** Schedule to publish one editorial */
  schedulePublishEditorial?: Maybe<Editorial>;
  /** Schedule to publish one event */
  schedulePublishEvent?: Maybe<Event>;
  /** Schedule to publish one form */
  schedulePublishForm?: Maybe<Form>;
  /** Schedule to publish one gallery */
  schedulePublishGallery?: Maybe<Gallery>;
  /** Schedule to publish one layout */
  schedulePublishLayout?: Maybe<Layout>;
  /** Schedule to publish one lock */
  schedulePublishLock?: Maybe<Lock>;
  /** Schedule to publish one mixedMedia */
  schedulePublishMixedMedia?: Maybe<MixedMedia>;
  /** Schedule to publish one navigation */
  schedulePublishNavigation?: Maybe<Navigation>;
  /** Schedule to publish one page */
  schedulePublishPage?: Maybe<Page>;
  /** Schedule to publish one person */
  schedulePublishPerson?: Maybe<Person>;
  /** Schedule to publish one product */
  schedulePublishProduct?: Maybe<Product>;
  /** Schedule to publish one seo */
  schedulePublishSeo?: Maybe<Seo>;
  /** Schedule to publish one theme */
  schedulePublishTheme?: Maybe<Theme>;
  /** Unpublish one archive from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishArchive?: Maybe<Archive>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAsset?: Maybe<Asset>;
  /** Unpublish one collection from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishCollection?: Maybe<Collection>;
  /** Unpublish one combinedListing from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishCombinedListing?: Maybe<CombinedListing>;
  /** Unpublish one customizedSection from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishCustomizedSection?: Maybe<CustomizedSection>;
  /** Unpublish one editorial from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishEditorial?: Maybe<Editorial>;
  /** Unpublish one event from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishEvent?: Maybe<Event>;
  /** Unpublish one form from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishForm?: Maybe<Form>;
  /** Unpublish one gallery from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishGallery?: Maybe<Gallery>;
  /** Unpublish one layout from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishLayout?: Maybe<Layout>;
  /** Unpublish one lock from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishLock?: Maybe<Lock>;
  /** Unpublish one mixedMedia from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishMixedMedia?: Maybe<MixedMedia>;
  /** Unpublish one navigation from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishNavigation?: Maybe<Navigation>;
  /** Unpublish one page from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishPage?: Maybe<Page>;
  /** Unpublish one person from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishPerson?: Maybe<Person>;
  /** Unpublish one product from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishProduct?: Maybe<Product>;
  /** Unpublish one seo from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishSeo?: Maybe<Seo>;
  /** Unpublish one theme from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishTheme?: Maybe<Theme>;
  /** Unpublish one archive from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishArchive?: Maybe<Archive>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAsset?: Maybe<Asset>;
  /** Unpublish one collection from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishCollection?: Maybe<Collection>;
  /** Unpublish one combinedListing from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishCombinedListing?: Maybe<CombinedListing>;
  /** Unpublish one customizedSection from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishCustomizedSection?: Maybe<CustomizedSection>;
  /** Unpublish one editorial from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishEditorial?: Maybe<Editorial>;
  /** Unpublish one event from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishEvent?: Maybe<Event>;
  /** Unpublish one form from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishForm?: Maybe<Form>;
  /** Unpublish one gallery from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishGallery?: Maybe<Gallery>;
  /** Unpublish one layout from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishLayout?: Maybe<Layout>;
  /** Unpublish one lock from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishLock?: Maybe<Lock>;
  /**
   * Unpublish many Archive documents
   * @deprecated Please use the new paginated many mutation (unpublishManyArchivesConnection)
   */
  unpublishManyArchives: BatchPayload;
  /** Find many Archive documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyArchivesConnection: ArchiveConnection;
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  unpublishManyAssets: BatchPayload;
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAssetsConnection: AssetConnection;
  /**
   * Unpublish many Collection documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCollectionsConnection)
   */
  unpublishManyCollections: BatchPayload;
  /** Find many Collection documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyCollectionsConnection: CollectionConnection;
  /**
   * Unpublish many CombinedListing documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCombinedListingsConnection)
   */
  unpublishManyCombinedListings: BatchPayload;
  /** Find many CombinedListing documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyCombinedListingsConnection: CombinedListingConnection;
  /**
   * Unpublish many CustomizedSection documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCustomizedSectionsConnection)
   */
  unpublishManyCustomizedSections: BatchPayload;
  /** Find many CustomizedSection documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyCustomizedSectionsConnection: CustomizedSectionConnection;
  /**
   * Unpublish many Editorial documents
   * @deprecated Please use the new paginated many mutation (unpublishManyEditorialsConnection)
   */
  unpublishManyEditorials: BatchPayload;
  /** Find many Editorial documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyEditorialsConnection: EditorialConnection;
  /**
   * Unpublish many Event documents
   * @deprecated Please use the new paginated many mutation (unpublishManyEventsConnection)
   */
  unpublishManyEvents: BatchPayload;
  /** Find many Event documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyEventsConnection: EventConnection;
  /**
   * Unpublish many Form documents
   * @deprecated Please use the new paginated many mutation (unpublishManyFormsConnection)
   */
  unpublishManyForms: BatchPayload;
  /** Find many Form documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyFormsConnection: FormConnection;
  /**
   * Unpublish many Gallery documents
   * @deprecated Please use the new paginated many mutation (unpublishManyGalleriesConnection)
   */
  unpublishManyGalleries: BatchPayload;
  /** Find many Gallery documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyGalleriesConnection: GalleryConnection;
  /**
   * Unpublish many Layout documents
   * @deprecated Please use the new paginated many mutation (unpublishManyLayoutsConnection)
   */
  unpublishManyLayouts: BatchPayload;
  /** Find many Layout documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyLayoutsConnection: LayoutConnection;
  /**
   * Unpublish many Lock documents
   * @deprecated Please use the new paginated many mutation (unpublishManyLocksConnection)
   */
  unpublishManyLocks: BatchPayload;
  /** Find many Lock documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyLocksConnection: LockConnection;
  /**
   * Unpublish many MixedMedia documents
   * @deprecated Please use the new paginated many mutation (unpublishManyMixedMediasConnection)
   */
  unpublishManyMixedMedias: BatchPayload;
  /** Find many MixedMedia documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyMixedMediasConnection: MixedMediaConnection;
  /**
   * Unpublish many Navigation documents
   * @deprecated Please use the new paginated many mutation (unpublishManyNavigationsConnection)
   */
  unpublishManyNavigations: BatchPayload;
  /** Find many Navigation documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyNavigationsConnection: NavigationConnection;
  /**
   * Unpublish many Page documents
   * @deprecated Please use the new paginated many mutation (unpublishManyPagesConnection)
   */
  unpublishManyPages: BatchPayload;
  /** Find many Page documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyPagesConnection: PageConnection;
  /**
   * Unpublish many Person documents
   * @deprecated Please use the new paginated many mutation (unpublishManyPeopleConnection)
   */
  unpublishManyPeople: BatchPayload;
  /** Find many Person documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyPeopleConnection: PersonConnection;
  /**
   * Unpublish many Product documents
   * @deprecated Please use the new paginated many mutation (unpublishManyProductsConnection)
   */
  unpublishManyProducts: BatchPayload;
  /** Find many Product documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyProductsConnection: ProductConnection;
  /**
   * Unpublish many Seo documents
   * @deprecated Please use the new paginated many mutation (unpublishManySeosConnection)
   */
  unpublishManySeos: BatchPayload;
  /** Find many Seo documents that match criteria in specified stage and unpublish from target stages */
  unpublishManySeosConnection: SeoConnection;
  /**
   * Unpublish many Theme documents
   * @deprecated Please use the new paginated many mutation (unpublishManyThemesConnection)
   */
  unpublishManyThemes: BatchPayload;
  /** Find many Theme documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyThemesConnection: ThemeConnection;
  /** Unpublish one mixedMedia from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishMixedMedia?: Maybe<MixedMedia>;
  /** Unpublish one navigation from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishNavigation?: Maybe<Navigation>;
  /** Unpublish one page from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishPage?: Maybe<Page>;
  /** Unpublish one person from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishPerson?: Maybe<Person>;
  /** Unpublish one product from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishProduct?: Maybe<Product>;
  /** Unpublish one seo from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishSeo?: Maybe<Seo>;
  /** Unpublish one theme from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishTheme?: Maybe<Theme>;
  /** Update one archive */
  updateArchive?: Maybe<Archive>;
  /** Update one asset */
  updateAsset?: Maybe<Asset>;
  /** Update one collection */
  updateCollection?: Maybe<Collection>;
  /** Update one combinedListing */
  updateCombinedListing?: Maybe<CombinedListing>;
  /** Update one customizedSection */
  updateCustomizedSection?: Maybe<CustomizedSection>;
  /** Update one editorial */
  updateEditorial?: Maybe<Editorial>;
  /** Update one event */
  updateEvent?: Maybe<Event>;
  /** Update one form */
  updateForm?: Maybe<Form>;
  /** Update one gallery */
  updateGallery?: Maybe<Gallery>;
  /** Update one layout */
  updateLayout?: Maybe<Layout>;
  /** Update one lock */
  updateLock?: Maybe<Lock>;
  /**
   * Update many archives
   * @deprecated Please use the new paginated many mutation (updateManyArchivesConnection)
   */
  updateManyArchives: BatchPayload;
  /** Update many Archive documents */
  updateManyArchivesConnection: ArchiveConnection;
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  updateManyAssets: BatchPayload;
  /** Update many Asset documents */
  updateManyAssetsConnection: AssetConnection;
  /**
   * Update many collections
   * @deprecated Please use the new paginated many mutation (updateManyCollectionsConnection)
   */
  updateManyCollections: BatchPayload;
  /** Update many Collection documents */
  updateManyCollectionsConnection: CollectionConnection;
  /**
   * Update many combinedListings
   * @deprecated Please use the new paginated many mutation (updateManyCombinedListingsConnection)
   */
  updateManyCombinedListings: BatchPayload;
  /** Update many CombinedListing documents */
  updateManyCombinedListingsConnection: CombinedListingConnection;
  /**
   * Update many customizedSections
   * @deprecated Please use the new paginated many mutation (updateManyCustomizedSectionsConnection)
   */
  updateManyCustomizedSections: BatchPayload;
  /** Update many CustomizedSection documents */
  updateManyCustomizedSectionsConnection: CustomizedSectionConnection;
  /**
   * Update many editorials
   * @deprecated Please use the new paginated many mutation (updateManyEditorialsConnection)
   */
  updateManyEditorials: BatchPayload;
  /** Update many Editorial documents */
  updateManyEditorialsConnection: EditorialConnection;
  /**
   * Update many events
   * @deprecated Please use the new paginated many mutation (updateManyEventsConnection)
   */
  updateManyEvents: BatchPayload;
  /** Update many Event documents */
  updateManyEventsConnection: EventConnection;
  /**
   * Update many forms
   * @deprecated Please use the new paginated many mutation (updateManyFormsConnection)
   */
  updateManyForms: BatchPayload;
  /** Update many Form documents */
  updateManyFormsConnection: FormConnection;
  /**
   * Update many galleries
   * @deprecated Please use the new paginated many mutation (updateManyGalleriesConnection)
   */
  updateManyGalleries: BatchPayload;
  /** Update many Gallery documents */
  updateManyGalleriesConnection: GalleryConnection;
  /**
   * Update many layouts
   * @deprecated Please use the new paginated many mutation (updateManyLayoutsConnection)
   */
  updateManyLayouts: BatchPayload;
  /** Update many Layout documents */
  updateManyLayoutsConnection: LayoutConnection;
  /**
   * Update many locks
   * @deprecated Please use the new paginated many mutation (updateManyLocksConnection)
   */
  updateManyLocks: BatchPayload;
  /** Update many Lock documents */
  updateManyLocksConnection: LockConnection;
  /**
   * Update many mixedMedias
   * @deprecated Please use the new paginated many mutation (updateManyMixedMediasConnection)
   */
  updateManyMixedMedias: BatchPayload;
  /** Update many MixedMedia documents */
  updateManyMixedMediasConnection: MixedMediaConnection;
  /**
   * Update many navigations
   * @deprecated Please use the new paginated many mutation (updateManyNavigationsConnection)
   */
  updateManyNavigations: BatchPayload;
  /** Update many Navigation documents */
  updateManyNavigationsConnection: NavigationConnection;
  /**
   * Update many pages
   * @deprecated Please use the new paginated many mutation (updateManyPagesConnection)
   */
  updateManyPages: BatchPayload;
  /** Update many Page documents */
  updateManyPagesConnection: PageConnection;
  /**
   * Update many people
   * @deprecated Please use the new paginated many mutation (updateManyPeopleConnection)
   */
  updateManyPeople: BatchPayload;
  /** Update many Person documents */
  updateManyPeopleConnection: PersonConnection;
  /**
   * Update many products
   * @deprecated Please use the new paginated many mutation (updateManyProductsConnection)
   */
  updateManyProducts: BatchPayload;
  /** Update many Product documents */
  updateManyProductsConnection: ProductConnection;
  /**
   * Update many seos
   * @deprecated Please use the new paginated many mutation (updateManySeosConnection)
   */
  updateManySeos: BatchPayload;
  /** Update many Seo documents */
  updateManySeosConnection: SeoConnection;
  /**
   * Update many themes
   * @deprecated Please use the new paginated many mutation (updateManyThemesConnection)
   */
  updateManyThemes: BatchPayload;
  /** Update many Theme documents */
  updateManyThemesConnection: ThemeConnection;
  /** Update one mixedMedia */
  updateMixedMedia?: Maybe<MixedMedia>;
  /** Update one navigation */
  updateNavigation?: Maybe<Navigation>;
  /** Update one page */
  updatePage?: Maybe<Page>;
  /** Update one person */
  updatePerson?: Maybe<Person>;
  /** Update one product */
  updateProduct?: Maybe<Product>;
  /** Update one scheduledRelease */
  updateScheduledRelease?: Maybe<ScheduledRelease>;
  /** Update one seo */
  updateSeo?: Maybe<Seo>;
  /** Update one theme */
  updateTheme?: Maybe<Theme>;
  /** Upsert one archive */
  upsertArchive?: Maybe<Archive>;
  /** Upsert one asset */
  upsertAsset?: Maybe<Asset>;
  /** Upsert one collection */
  upsertCollection?: Maybe<Collection>;
  /** Upsert one combinedListing */
  upsertCombinedListing?: Maybe<CombinedListing>;
  /** Upsert one customizedSection */
  upsertCustomizedSection?: Maybe<CustomizedSection>;
  /** Upsert one editorial */
  upsertEditorial?: Maybe<Editorial>;
  /** Upsert one event */
  upsertEvent?: Maybe<Event>;
  /** Upsert one form */
  upsertForm?: Maybe<Form>;
  /** Upsert one gallery */
  upsertGallery?: Maybe<Gallery>;
  /** Upsert one layout */
  upsertLayout?: Maybe<Layout>;
  /** Upsert one lock */
  upsertLock?: Maybe<Lock>;
  /** Upsert one mixedMedia */
  upsertMixedMedia?: Maybe<MixedMedia>;
  /** Upsert one navigation */
  upsertNavigation?: Maybe<Navigation>;
  /** Upsert one page */
  upsertPage?: Maybe<Page>;
  /** Upsert one person */
  upsertPerson?: Maybe<Person>;
  /** Upsert one product */
  upsertProduct?: Maybe<Product>;
  /** Upsert one seo */
  upsertSeo?: Maybe<Seo>;
  /** Upsert one theme */
  upsertTheme?: Maybe<Theme>;
};


export type MutationCreateArchiveArgs = {
  data: ArchiveCreateInput;
};


export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};


export type MutationCreateCollectionArgs = {
  data: CollectionCreateInput;
};


export type MutationCreateCombinedListingArgs = {
  data: CombinedListingCreateInput;
};


export type MutationCreateCustomizedSectionArgs = {
  data: CustomizedSectionCreateInput;
};


export type MutationCreateEditorialArgs = {
  data: EditorialCreateInput;
};


export type MutationCreateEventArgs = {
  data: EventCreateInput;
};


export type MutationCreateFormArgs = {
  data: FormCreateInput;
};


export type MutationCreateGalleryArgs = {
  data: GalleryCreateInput;
};


export type MutationCreateLayoutArgs = {
  data: LayoutCreateInput;
};


export type MutationCreateLockArgs = {
  data: LockCreateInput;
};


export type MutationCreateMixedMediaArgs = {
  data: MixedMediaCreateInput;
};


export type MutationCreateNavigationArgs = {
  data: NavigationCreateInput;
};


export type MutationCreatePageArgs = {
  data: PageCreateInput;
};


export type MutationCreatePersonArgs = {
  data: PersonCreateInput;
};


export type MutationCreateProductArgs = {
  data: ProductCreateInput;
};


export type MutationCreateScheduledReleaseArgs = {
  data: ScheduledReleaseCreateInput;
};


export type MutationCreateSeoArgs = {
  data: SeoCreateInput;
};


export type MutationCreateThemeArgs = {
  data: ThemeCreateInput;
};


export type MutationDeleteArchiveArgs = {
  where: ArchiveWhereUniqueInput;
};


export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};


export type MutationDeleteCollectionArgs = {
  where: CollectionWhereUniqueInput;
};


export type MutationDeleteCombinedListingArgs = {
  where: CombinedListingWhereUniqueInput;
};


export type MutationDeleteCustomizedSectionArgs = {
  where: CustomizedSectionWhereUniqueInput;
};


export type MutationDeleteEditorialArgs = {
  where: EditorialWhereUniqueInput;
};


export type MutationDeleteEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationDeleteFormArgs = {
  where: FormWhereUniqueInput;
};


export type MutationDeleteGalleryArgs = {
  where: GalleryWhereUniqueInput;
};


export type MutationDeleteLayoutArgs = {
  where: LayoutWhereUniqueInput;
};


export type MutationDeleteLockArgs = {
  where: LockWhereUniqueInput;
};


export type MutationDeleteManyArchivesArgs = {
  where?: InputMaybe<ArchiveManyWhereInput>;
};


export type MutationDeleteManyArchivesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ArchiveManyWhereInput>;
};


export type MutationDeleteManyAssetsArgs = {
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyCollectionsArgs = {
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationDeleteManyCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationDeleteManyCombinedListingsArgs = {
  where?: InputMaybe<CombinedListingManyWhereInput>;
};


export type MutationDeleteManyCombinedListingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CombinedListingManyWhereInput>;
};


export type MutationDeleteManyCustomizedSectionsArgs = {
  where?: InputMaybe<CustomizedSectionManyWhereInput>;
};


export type MutationDeleteManyCustomizedSectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CustomizedSectionManyWhereInput>;
};


export type MutationDeleteManyEditorialsArgs = {
  where?: InputMaybe<EditorialManyWhereInput>;
};


export type MutationDeleteManyEditorialsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EditorialManyWhereInput>;
};


export type MutationDeleteManyEventsArgs = {
  where?: InputMaybe<EventManyWhereInput>;
};


export type MutationDeleteManyEventsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventManyWhereInput>;
};


export type MutationDeleteManyFormsArgs = {
  where?: InputMaybe<FormManyWhereInput>;
};


export type MutationDeleteManyFormsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FormManyWhereInput>;
};


export type MutationDeleteManyGalleriesArgs = {
  where?: InputMaybe<GalleryManyWhereInput>;
};


export type MutationDeleteManyGalleriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GalleryManyWhereInput>;
};


export type MutationDeleteManyLayoutsArgs = {
  where?: InputMaybe<LayoutManyWhereInput>;
};


export type MutationDeleteManyLayoutsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutManyWhereInput>;
};


export type MutationDeleteManyLocksArgs = {
  where?: InputMaybe<LockManyWhereInput>;
};


export type MutationDeleteManyLocksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LockManyWhereInput>;
};


export type MutationDeleteManyMixedMediasArgs = {
  where?: InputMaybe<MixedMediaManyWhereInput>;
};


export type MutationDeleteManyMixedMediasConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MixedMediaManyWhereInput>;
};


export type MutationDeleteManyNavigationsArgs = {
  where?: InputMaybe<NavigationManyWhereInput>;
};


export type MutationDeleteManyNavigationsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NavigationManyWhereInput>;
};


export type MutationDeleteManyPagesArgs = {
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationDeleteManyPagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationDeleteManyPeopleArgs = {
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationDeleteManyPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationDeleteManyProductsArgs = {
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationDeleteManyProductsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationDeleteManySeosArgs = {
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationDeleteManySeosConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationDeleteManyThemesArgs = {
  where?: InputMaybe<ThemeManyWhereInput>;
};


export type MutationDeleteManyThemesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ThemeManyWhereInput>;
};


export type MutationDeleteMixedMediaArgs = {
  where: MixedMediaWhereUniqueInput;
};


export type MutationDeleteNavigationArgs = {
  where: NavigationWhereUniqueInput;
};


export type MutationDeletePageArgs = {
  where: PageWhereUniqueInput;
};


export type MutationDeletePersonArgs = {
  where: PersonWhereUniqueInput;
};


export type MutationDeleteProductArgs = {
  where: ProductWhereUniqueInput;
};


export type MutationDeleteScheduledOperationArgs = {
  where: ScheduledOperationWhereUniqueInput;
};


export type MutationDeleteScheduledReleaseArgs = {
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationDeleteSeoArgs = {
  where: SeoWhereUniqueInput;
};


export type MutationDeleteThemeArgs = {
  where: ThemeWhereUniqueInput;
};


export type MutationPublishArchiveArgs = {
  to?: Array<Stage>;
  where: ArchiveWhereUniqueInput;
};


export type MutationPublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishCollectionArgs = {
  to?: Array<Stage>;
  where: CollectionWhereUniqueInput;
};


export type MutationPublishCombinedListingArgs = {
  to?: Array<Stage>;
  where: CombinedListingWhereUniqueInput;
};


export type MutationPublishCustomizedSectionArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where: CustomizedSectionWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishEditorialArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where: EditorialWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishEventArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where: EventWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishFormArgs = {
  to?: Array<Stage>;
  where: FormWhereUniqueInput;
};


export type MutationPublishGalleryArgs = {
  to?: Array<Stage>;
  where: GalleryWhereUniqueInput;
};


export type MutationPublishLayoutArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where: LayoutWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishLockArgs = {
  to?: Array<Stage>;
  where: LockWhereUniqueInput;
};


export type MutationPublishManyArchivesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ArchiveManyWhereInput>;
};


export type MutationPublishManyArchivesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<ArchiveManyWhereInput>;
};


export type MutationPublishManyAssetsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyCollectionsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationPublishManyCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationPublishManyCombinedListingsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<CombinedListingManyWhereInput>;
};


export type MutationPublishManyCombinedListingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<CombinedListingManyWhereInput>;
};


export type MutationPublishManyCustomizedSectionsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<CustomizedSectionManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyCustomizedSectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<CustomizedSectionManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyEditorialsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<EditorialManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyEditorialsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<EditorialManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyEventsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<EventManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyEventsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<EventManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyFormsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<FormManyWhereInput>;
};


export type MutationPublishManyFormsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<FormManyWhereInput>;
};


export type MutationPublishManyGalleriesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<GalleryManyWhereInput>;
};


export type MutationPublishManyGalleriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<GalleryManyWhereInput>;
};


export type MutationPublishManyLayoutsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<LayoutManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyLayoutsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<LayoutManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyLocksArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<LockManyWhereInput>;
};


export type MutationPublishManyLocksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<LockManyWhereInput>;
};


export type MutationPublishManyMixedMediasArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<MixedMediaManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyMixedMediasConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<MixedMediaManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyNavigationsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<NavigationManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyNavigationsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<NavigationManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyPagesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationPublishManyPagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationPublishManyPeopleArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationPublishManyPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationPublishManyProductsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationPublishManyProductsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationPublishManySeosArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<SeoManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManySeosConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<SeoManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishManyThemesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ThemeManyWhereInput>;
};


export type MutationPublishManyThemesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  to?: Array<Stage>;
  where?: InputMaybe<ThemeManyWhereInput>;
};


export type MutationPublishMixedMediaArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where: MixedMediaWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishNavigationArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where: NavigationWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishPageArgs = {
  to?: Array<Stage>;
  where: PageWhereUniqueInput;
};


export type MutationPublishPersonArgs = {
  to?: Array<Stage>;
  where: PersonWhereUniqueInput;
};


export type MutationPublishProductArgs = {
  to?: Array<Stage>;
  where: ProductWhereUniqueInput;
};


export type MutationPublishSeoArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  to?: Array<Stage>;
  where: SeoWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationPublishThemeArgs = {
  to?: Array<Stage>;
  where: ThemeWhereUniqueInput;
};


export type MutationSchedulePublishArchiveArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: ArchiveWhereUniqueInput;
};


export type MutationSchedulePublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSchedulePublishCollectionArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: CollectionWhereUniqueInput;
};


export type MutationSchedulePublishCombinedListingArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: CombinedListingWhereUniqueInput;
};


export type MutationSchedulePublishCustomizedSectionArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: CustomizedSectionWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSchedulePublishEditorialArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: EditorialWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSchedulePublishEventArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: EventWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSchedulePublishFormArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: FormWhereUniqueInput;
};


export type MutationSchedulePublishGalleryArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: GalleryWhereUniqueInput;
};


export type MutationSchedulePublishLayoutArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: LayoutWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSchedulePublishLockArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: LockWhereUniqueInput;
};


export type MutationSchedulePublishMixedMediaArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: MixedMediaWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSchedulePublishNavigationArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: NavigationWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSchedulePublishPageArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: PageWhereUniqueInput;
};


export type MutationSchedulePublishPersonArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: PersonWhereUniqueInput;
};


export type MutationSchedulePublishProductArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: ProductWhereUniqueInput;
};


export type MutationSchedulePublishSeoArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: SeoWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSchedulePublishThemeArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  to?: Array<Stage>;
  where: ThemeWhereUniqueInput;
};


export type MutationScheduleUnpublishArchiveArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: ArchiveWhereUniqueInput;
};


export type MutationScheduleUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: AssetWhereUniqueInput;
};


export type MutationScheduleUnpublishCollectionArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: CollectionWhereUniqueInput;
};


export type MutationScheduleUnpublishCombinedListingArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: CombinedListingWhereUniqueInput;
};


export type MutationScheduleUnpublishCustomizedSectionArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: CustomizedSectionWhereUniqueInput;
};


export type MutationScheduleUnpublishEditorialArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: EditorialWhereUniqueInput;
};


export type MutationScheduleUnpublishEventArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: EventWhereUniqueInput;
};


export type MutationScheduleUnpublishFormArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: FormWhereUniqueInput;
};


export type MutationScheduleUnpublishGalleryArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: GalleryWhereUniqueInput;
};


export type MutationScheduleUnpublishLayoutArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: LayoutWhereUniqueInput;
};


export type MutationScheduleUnpublishLockArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: LockWhereUniqueInput;
};


export type MutationScheduleUnpublishMixedMediaArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: MixedMediaWhereUniqueInput;
};


export type MutationScheduleUnpublishNavigationArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: NavigationWhereUniqueInput;
};


export type MutationScheduleUnpublishPageArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: PageWhereUniqueInput;
};


export type MutationScheduleUnpublishPersonArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: PersonWhereUniqueInput;
};


export type MutationScheduleUnpublishProductArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: ProductWhereUniqueInput;
};


export type MutationScheduleUnpublishSeoArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: SeoWhereUniqueInput;
};


export type MutationScheduleUnpublishThemeArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  releaseId?: InputMaybe<Scalars['String']['input']>;
  where: ThemeWhereUniqueInput;
};


export type MutationUnpublishArchiveArgs = {
  from?: Array<Stage>;
  where: ArchiveWhereUniqueInput;
};


export type MutationUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: AssetWhereUniqueInput;
};


export type MutationUnpublishCollectionArgs = {
  from?: Array<Stage>;
  where: CollectionWhereUniqueInput;
};


export type MutationUnpublishCombinedListingArgs = {
  from?: Array<Stage>;
  where: CombinedListingWhereUniqueInput;
};


export type MutationUnpublishCustomizedSectionArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: CustomizedSectionWhereUniqueInput;
};


export type MutationUnpublishEditorialArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: EditorialWhereUniqueInput;
};


export type MutationUnpublishEventArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: EventWhereUniqueInput;
};


export type MutationUnpublishFormArgs = {
  from?: Array<Stage>;
  where: FormWhereUniqueInput;
};


export type MutationUnpublishGalleryArgs = {
  from?: Array<Stage>;
  where: GalleryWhereUniqueInput;
};


export type MutationUnpublishLayoutArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: LayoutWhereUniqueInput;
};


export type MutationUnpublishLockArgs = {
  from?: Array<Stage>;
  where: LockWhereUniqueInput;
};


export type MutationUnpublishManyArchivesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ArchiveManyWhereInput>;
};


export type MutationUnpublishManyArchivesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ArchiveManyWhereInput>;
};


export type MutationUnpublishManyAssetsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyCollectionsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationUnpublishManyCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationUnpublishManyCombinedListingsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<CombinedListingManyWhereInput>;
};


export type MutationUnpublishManyCombinedListingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<CombinedListingManyWhereInput>;
};


export type MutationUnpublishManyCustomizedSectionsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CustomizedSectionManyWhereInput>;
};


export type MutationUnpublishManyCustomizedSectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CustomizedSectionManyWhereInput>;
};


export type MutationUnpublishManyEditorialsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EditorialManyWhereInput>;
};


export type MutationUnpublishManyEditorialsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EditorialManyWhereInput>;
};


export type MutationUnpublishManyEventsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EventManyWhereInput>;
};


export type MutationUnpublishManyEventsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EventManyWhereInput>;
};


export type MutationUnpublishManyFormsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<FormManyWhereInput>;
};


export type MutationUnpublishManyFormsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<FormManyWhereInput>;
};


export type MutationUnpublishManyGalleriesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<GalleryManyWhereInput>;
};


export type MutationUnpublishManyGalleriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<GalleryManyWhereInput>;
};


export type MutationUnpublishManyLayoutsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LayoutManyWhereInput>;
};


export type MutationUnpublishManyLayoutsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LayoutManyWhereInput>;
};


export type MutationUnpublishManyLocksArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<LockManyWhereInput>;
};


export type MutationUnpublishManyLocksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<LockManyWhereInput>;
};


export type MutationUnpublishManyMixedMediasArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MixedMediaManyWhereInput>;
};


export type MutationUnpublishManyMixedMediasConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<MixedMediaManyWhereInput>;
};


export type MutationUnpublishManyNavigationsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<NavigationManyWhereInput>;
};


export type MutationUnpublishManyNavigationsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<NavigationManyWhereInput>;
};


export type MutationUnpublishManyPagesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationUnpublishManyPagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationUnpublishManyPeopleArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationUnpublishManyPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationUnpublishManyProductsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationUnpublishManyProductsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationUnpublishManySeosArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationUnpublishManySeosConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationUnpublishManyThemesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ThemeManyWhereInput>;
};


export type MutationUnpublishManyThemesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ThemeManyWhereInput>;
};


export type MutationUnpublishMixedMediaArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: MixedMediaWhereUniqueInput;
};


export type MutationUnpublishNavigationArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: NavigationWhereUniqueInput;
};


export type MutationUnpublishPageArgs = {
  from?: Array<Stage>;
  where: PageWhereUniqueInput;
};


export type MutationUnpublishPersonArgs = {
  from?: Array<Stage>;
  where: PersonWhereUniqueInput;
};


export type MutationUnpublishProductArgs = {
  from?: Array<Stage>;
  where: ProductWhereUniqueInput;
};


export type MutationUnpublishSeoArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']['input']>;
  where: SeoWhereUniqueInput;
};


export type MutationUnpublishThemeArgs = {
  from?: Array<Stage>;
  where: ThemeWhereUniqueInput;
};


export type MutationUpdateArchiveArgs = {
  data: ArchiveUpdateInput;
  where: ArchiveWhereUniqueInput;
};


export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpdateCollectionArgs = {
  data: CollectionUpdateInput;
  where: CollectionWhereUniqueInput;
};


export type MutationUpdateCombinedListingArgs = {
  data: CombinedListingUpdateInput;
  where: CombinedListingWhereUniqueInput;
};


export type MutationUpdateCustomizedSectionArgs = {
  data: CustomizedSectionUpdateInput;
  where: CustomizedSectionWhereUniqueInput;
};


export type MutationUpdateEditorialArgs = {
  data: EditorialUpdateInput;
  where: EditorialWhereUniqueInput;
};


export type MutationUpdateEventArgs = {
  data: EventUpdateInput;
  where: EventWhereUniqueInput;
};


export type MutationUpdateFormArgs = {
  data: FormUpdateInput;
  where: FormWhereUniqueInput;
};


export type MutationUpdateGalleryArgs = {
  data: GalleryUpdateInput;
  where: GalleryWhereUniqueInput;
};


export type MutationUpdateLayoutArgs = {
  data: LayoutUpdateInput;
  where: LayoutWhereUniqueInput;
};


export type MutationUpdateLockArgs = {
  data: LockUpdateInput;
  where: LockWhereUniqueInput;
};


export type MutationUpdateManyArchivesArgs = {
  data: ArchiveUpdateManyInput;
  where?: InputMaybe<ArchiveManyWhereInput>;
};


export type MutationUpdateManyArchivesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: ArchiveUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ArchiveManyWhereInput>;
};


export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyInput;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: AssetUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyCollectionsArgs = {
  data: CollectionUpdateManyInput;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationUpdateManyCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: CollectionUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CollectionManyWhereInput>;
};


export type MutationUpdateManyCombinedListingsArgs = {
  data: CombinedListingUpdateManyInput;
  where?: InputMaybe<CombinedListingManyWhereInput>;
};


export type MutationUpdateManyCombinedListingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: CombinedListingUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CombinedListingManyWhereInput>;
};


export type MutationUpdateManyCustomizedSectionsArgs = {
  data: CustomizedSectionUpdateManyInput;
  where?: InputMaybe<CustomizedSectionManyWhereInput>;
};


export type MutationUpdateManyCustomizedSectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: CustomizedSectionUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CustomizedSectionManyWhereInput>;
};


export type MutationUpdateManyEditorialsArgs = {
  data: EditorialUpdateManyInput;
  where?: InputMaybe<EditorialManyWhereInput>;
};


export type MutationUpdateManyEditorialsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: EditorialUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EditorialManyWhereInput>;
};


export type MutationUpdateManyEventsArgs = {
  data: EventUpdateManyInput;
  where?: InputMaybe<EventManyWhereInput>;
};


export type MutationUpdateManyEventsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: EventUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventManyWhereInput>;
};


export type MutationUpdateManyFormsArgs = {
  data: FormUpdateManyInput;
  where?: InputMaybe<FormManyWhereInput>;
};


export type MutationUpdateManyFormsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: FormUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FormManyWhereInput>;
};


export type MutationUpdateManyGalleriesArgs = {
  data: GalleryUpdateManyInput;
  where?: InputMaybe<GalleryManyWhereInput>;
};


export type MutationUpdateManyGalleriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: GalleryUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GalleryManyWhereInput>;
};


export type MutationUpdateManyLayoutsArgs = {
  data: LayoutUpdateManyInput;
  where?: InputMaybe<LayoutManyWhereInput>;
};


export type MutationUpdateManyLayoutsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: LayoutUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutManyWhereInput>;
};


export type MutationUpdateManyLocksArgs = {
  data: LockUpdateManyInput;
  where?: InputMaybe<LockManyWhereInput>;
};


export type MutationUpdateManyLocksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: LockUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LockManyWhereInput>;
};


export type MutationUpdateManyMixedMediasArgs = {
  data: MixedMediaUpdateManyInput;
  where?: InputMaybe<MixedMediaManyWhereInput>;
};


export type MutationUpdateManyMixedMediasConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: MixedMediaUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MixedMediaManyWhereInput>;
};


export type MutationUpdateManyNavigationsArgs = {
  data: NavigationUpdateManyInput;
  where?: InputMaybe<NavigationManyWhereInput>;
};


export type MutationUpdateManyNavigationsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: NavigationUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NavigationManyWhereInput>;
};


export type MutationUpdateManyPagesArgs = {
  data: PageUpdateManyInput;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationUpdateManyPagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: PageUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationUpdateManyPeopleArgs = {
  data: PersonUpdateManyInput;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationUpdateManyPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: PersonUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PersonManyWhereInput>;
};


export type MutationUpdateManyProductsArgs = {
  data: ProductUpdateManyInput;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationUpdateManyProductsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: ProductUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProductManyWhereInput>;
};


export type MutationUpdateManySeosArgs = {
  data: SeoUpdateManyInput;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationUpdateManySeosConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: SeoUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationUpdateManyThemesArgs = {
  data: ThemeUpdateManyInput;
  where?: InputMaybe<ThemeManyWhereInput>;
};


export type MutationUpdateManyThemesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  data: ThemeUpdateManyInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ThemeManyWhereInput>;
};


export type MutationUpdateMixedMediaArgs = {
  data: MixedMediaUpdateInput;
  where: MixedMediaWhereUniqueInput;
};


export type MutationUpdateNavigationArgs = {
  data: NavigationUpdateInput;
  where: NavigationWhereUniqueInput;
};


export type MutationUpdatePageArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
};


export type MutationUpdatePersonArgs = {
  data: PersonUpdateInput;
  where: PersonWhereUniqueInput;
};


export type MutationUpdateProductArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
};


export type MutationUpdateScheduledReleaseArgs = {
  data: ScheduledReleaseUpdateInput;
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationUpdateSeoArgs = {
  data: SeoUpdateInput;
  where: SeoWhereUniqueInput;
};


export type MutationUpdateThemeArgs = {
  data: ThemeUpdateInput;
  where: ThemeWhereUniqueInput;
};


export type MutationUpsertArchiveArgs = {
  upsert: ArchiveUpsertInput;
  where: ArchiveWhereUniqueInput;
};


export type MutationUpsertAssetArgs = {
  upsert: AssetUpsertInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpsertCollectionArgs = {
  upsert: CollectionUpsertInput;
  where: CollectionWhereUniqueInput;
};


export type MutationUpsertCombinedListingArgs = {
  upsert: CombinedListingUpsertInput;
  where: CombinedListingWhereUniqueInput;
};


export type MutationUpsertCustomizedSectionArgs = {
  upsert: CustomizedSectionUpsertInput;
  where: CustomizedSectionWhereUniqueInput;
};


export type MutationUpsertEditorialArgs = {
  upsert: EditorialUpsertInput;
  where: EditorialWhereUniqueInput;
};


export type MutationUpsertEventArgs = {
  upsert: EventUpsertInput;
  where: EventWhereUniqueInput;
};


export type MutationUpsertFormArgs = {
  upsert: FormUpsertInput;
  where: FormWhereUniqueInput;
};


export type MutationUpsertGalleryArgs = {
  upsert: GalleryUpsertInput;
  where: GalleryWhereUniqueInput;
};


export type MutationUpsertLayoutArgs = {
  upsert: LayoutUpsertInput;
  where: LayoutWhereUniqueInput;
};


export type MutationUpsertLockArgs = {
  upsert: LockUpsertInput;
  where: LockWhereUniqueInput;
};


export type MutationUpsertMixedMediaArgs = {
  upsert: MixedMediaUpsertInput;
  where: MixedMediaWhereUniqueInput;
};


export type MutationUpsertNavigationArgs = {
  upsert: NavigationUpsertInput;
  where: NavigationWhereUniqueInput;
};


export type MutationUpsertPageArgs = {
  upsert: PageUpsertInput;
  where: PageWhereUniqueInput;
};


export type MutationUpsertPersonArgs = {
  upsert: PersonUpsertInput;
  where: PersonWhereUniqueInput;
};


export type MutationUpsertProductArgs = {
  upsert: ProductUpsertInput;
  where: ProductWhereUniqueInput;
};


export type MutationUpsertSeoArgs = {
  upsert: SeoUpsertInput;
  where: SeoWhereUniqueInput;
};


export type MutationUpsertThemeArgs = {
  upsert: ThemeUpsertInput;
  where: ThemeWhereUniqueInput;
};

export type Navigation = Entity & Node & {
  __typename?: 'Navigation';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Navigation>;
  /** List of Navigation versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  links: Array<Link>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  slug?: Maybe<Scalars['String']['output']>;
  /** System stage field */
  stage: Stage;
  /** Use this field to assign a navigation as the "header" or the "footer" for the website */
  staticNavigation?: Maybe<StaticNavigation>;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type NavigationCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type NavigationDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type NavigationHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type NavigationLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<LinkOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LinkWhereInput>;
};


export type NavigationPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type NavigationScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type NavigationUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type NavigationConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: NavigationWhereUniqueInput;
};

/** A connection to a list of items. */
export type NavigationConnection = {
  __typename?: 'NavigationConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<NavigationEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type NavigationCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  links?: InputMaybe<LinkCreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<NavigationCreateLocalizationsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  staticNavigation?: InputMaybe<StaticNavigation>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NavigationCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NavigationCreateLocalizationInput = {
  /** Localization input */
  data: NavigationCreateLocalizationDataInput;
  locale: Locale;
};

export type NavigationCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<NavigationCreateLocalizationInput>>;
};

export type NavigationCreateManyInlineInput = {
  /** Connect multiple existing Navigation documents */
  connect?: InputMaybe<Array<NavigationWhereUniqueInput>>;
  /** Create and connect multiple existing Navigation documents */
  create?: InputMaybe<Array<NavigationCreateInput>>;
};

export type NavigationCreateOneInlineInput = {
  /** Connect one existing Navigation document */
  connect?: InputMaybe<NavigationWhereUniqueInput>;
  /** Create and connect one Navigation document */
  create?: InputMaybe<NavigationCreateInput>;
};

/** An edge in a connection. */
export type NavigationEdge = {
  __typename?: 'NavigationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Navigation;
};

/** Identifies documents */
export type NavigationManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<NavigationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<NavigationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<NavigationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<NavigationWhereStageInput>;
  documentInStages_none?: InputMaybe<NavigationWhereStageInput>;
  documentInStages_some?: InputMaybe<NavigationWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  links_every?: InputMaybe<LinkWhereInput>;
  links_none?: InputMaybe<LinkWhereInput>;
  links_some?: InputMaybe<LinkWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  staticNavigation?: InputMaybe<StaticNavigation>;
  /** All values that are contained in given list. */
  staticNavigation_in?: InputMaybe<Array<InputMaybe<StaticNavigation>>>;
  /** Any other value that exists and is not equal to the given value. */
  staticNavigation_not?: InputMaybe<StaticNavigation>;
  /** All values that are not contained in given list. */
  staticNavigation_not_in?: InputMaybe<Array<InputMaybe<StaticNavigation>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum NavigationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  StaticNavigationAsc = 'staticNavigation_ASC',
  StaticNavigationDesc = 'staticNavigation_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type NavigationUpdateInput = {
  links?: InputMaybe<LinkUpdateManyInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<NavigationUpdateLocalizationsInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  staticNavigation?: InputMaybe<StaticNavigation>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<NavigationCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
};

export type NavigationUpdateManyInlineInput = {
  /** Connect multiple existing Navigation documents */
  connect?: InputMaybe<Array<NavigationConnectInput>>;
  /** Create and connect multiple Navigation documents */
  create?: InputMaybe<Array<NavigationCreateInput>>;
  /** Delete multiple Navigation documents */
  delete?: InputMaybe<Array<NavigationWhereUniqueInput>>;
  /** Disconnect multiple Navigation documents */
  disconnect?: InputMaybe<Array<NavigationWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Navigation documents */
  set?: InputMaybe<Array<NavigationWhereUniqueInput>>;
  /** Update multiple Navigation documents */
  update?: InputMaybe<Array<NavigationUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Navigation documents */
  upsert?: InputMaybe<Array<NavigationUpsertWithNestedWhereUniqueInput>>;
};

export type NavigationUpdateManyInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: NavigationUpdateManyInput;
  /** Document search */
  where: NavigationWhereInput;
};

export type NavigationUpdateOneInlineInput = {
  /** Connect existing Navigation document */
  connect?: InputMaybe<NavigationWhereUniqueInput>;
  /** Create and connect one Navigation document */
  create?: InputMaybe<NavigationCreateInput>;
  /** Delete currently connected Navigation document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Navigation document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Navigation document */
  update?: InputMaybe<NavigationUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Navigation document */
  upsert?: InputMaybe<NavigationUpsertWithNestedWhereUniqueInput>;
};

export type NavigationUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: NavigationUpdateInput;
  /** Unique document search */
  where: NavigationWhereUniqueInput;
};

export type NavigationUpsertInput = {
  /** Create document if it didn't exist */
  create: NavigationCreateInput;
  /** Update document if it exists */
  update: NavigationUpdateInput;
};

export type NavigationUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: NavigationUpsertInput;
  /** Unique document search */
  where: NavigationWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type NavigationWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type NavigationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<NavigationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<NavigationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<NavigationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<NavigationWhereStageInput>;
  documentInStages_none?: InputMaybe<NavigationWhereStageInput>;
  documentInStages_some?: InputMaybe<NavigationWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  links_every?: InputMaybe<LinkWhereInput>;
  links_none?: InputMaybe<LinkWhereInput>;
  links_some?: InputMaybe<LinkWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  staticNavigation?: InputMaybe<StaticNavigation>;
  /** All values that are contained in given list. */
  staticNavigation_in?: InputMaybe<Array<InputMaybe<StaticNavigation>>>;
  /** Any other value that exists and is not equal to the given value. */
  staticNavigation_not?: InputMaybe<StaticNavigation>;
  /** All values that are not contained in given list. */
  staticNavigation_not_in?: InputMaybe<Array<InputMaybe<StaticNavigation>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type NavigationWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<NavigationWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<NavigationWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<NavigationWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<NavigationWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Navigation record uniquely */
export type NavigationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  staticNavigation?: InputMaybe<StaticNavigation>;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID']['output'];
  /** The Stage of an object */
  stage: Stage;
};

export type Page = Entity & Node & {
  __typename?: 'Page';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Page>;
  featuredMedia?: Maybe<Asset>;
  heroes: Array<Layout>;
  /** List of Page versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** used internally for identification purposes. */
  internalName?: Maybe<Scalars['String']['output']>;
  layout?: Maybe<Layout>;
  lock?: Maybe<Lock>;
  lockExemption?: Maybe<Lock>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  seo?: Maybe<Seo>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  staticPage?: Maybe<StaticPage>;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type PageCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PageDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type PageFeaturedMediaArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type PageHeroesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type PageHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type PageLayoutArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PageLockArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PageLockExemptionArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PagePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PageScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type PageSeoArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PageUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type PageConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: PageWhereUniqueInput;
};

/** A connection to a list of items. */
export type PageConnection = {
  __typename?: 'PageConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<PageEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type PageCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  featuredMedia?: InputMaybe<AssetCreateOneInlineInput>;
  heroes?: InputMaybe<LayoutCreateManyInlineInput>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  layout?: InputMaybe<LayoutCreateOneInlineInput>;
  lock?: InputMaybe<LockCreateOneInlineInput>;
  lockExemption?: InputMaybe<LockCreateOneInlineInput>;
  seo?: InputMaybe<SeoCreateOneInlineInput>;
  slug: Scalars['String']['input'];
  staticPage?: InputMaybe<StaticPage>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PageCreateManyInlineInput = {
  /** Connect multiple existing Page documents */
  connect?: InputMaybe<Array<PageWhereUniqueInput>>;
  /** Create and connect multiple existing Page documents */
  create?: InputMaybe<Array<PageCreateInput>>;
};

export type PageCreateOneInlineInput = {
  /** Connect one existing Page document */
  connect?: InputMaybe<PageWhereUniqueInput>;
  /** Create and connect one Page document */
  create?: InputMaybe<PageCreateInput>;
};

/** An edge in a connection. */
export type PageEdge = {
  __typename?: 'PageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Page;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** Number of items in the current page. */
  pageSize?: Maybe<Scalars['Int']['output']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Identifies documents */
export type PageManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PageWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PageWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<PageWhereStageInput>;
  documentInStages_none?: InputMaybe<PageWhereStageInput>;
  documentInStages_some?: InputMaybe<PageWhereStageInput>;
  featuredMedia?: InputMaybe<AssetWhereInput>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  layout?: InputMaybe<LayoutWhereInput>;
  lock?: InputMaybe<LockWhereInput>;
  lockExemption?: InputMaybe<LockWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  seo?: InputMaybe<SeoWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  staticPage?: InputMaybe<StaticPage>;
  /** All values that are contained in given list. */
  staticPage_in?: InputMaybe<Array<InputMaybe<StaticPage>>>;
  /** Any other value that exists and is not equal to the given value. */
  staticPage_not?: InputMaybe<StaticPage>;
  /** All values that are not contained in given list. */
  staticPage_not_in?: InputMaybe<Array<InputMaybe<StaticPage>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum PageOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  StaticPageAsc = 'staticPage_ASC',
  StaticPageDesc = 'staticPage_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PageUpdateInput = {
  featuredMedia?: InputMaybe<AssetUpdateOneInlineInput>;
  heroes?: InputMaybe<LayoutUpdateManyInlineInput>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  layout?: InputMaybe<LayoutUpdateOneInlineInput>;
  lock?: InputMaybe<LockUpdateOneInlineInput>;
  lockExemption?: InputMaybe<LockUpdateOneInlineInput>;
  seo?: InputMaybe<SeoUpdateOneInlineInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  staticPage?: InputMaybe<StaticPage>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageUpdateManyInlineInput = {
  /** Connect multiple existing Page documents */
  connect?: InputMaybe<Array<PageConnectInput>>;
  /** Create and connect multiple Page documents */
  create?: InputMaybe<Array<PageCreateInput>>;
  /** Delete multiple Page documents */
  delete?: InputMaybe<Array<PageWhereUniqueInput>>;
  /** Disconnect multiple Page documents */
  disconnect?: InputMaybe<Array<PageWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Page documents */
  set?: InputMaybe<Array<PageWhereUniqueInput>>;
  /** Update multiple Page documents */
  update?: InputMaybe<Array<PageUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Page documents */
  upsert?: InputMaybe<Array<PageUpsertWithNestedWhereUniqueInput>>;
};

export type PageUpdateManyInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: PageUpdateManyInput;
  /** Document search */
  where: PageWhereInput;
};

export type PageUpdateOneInlineInput = {
  /** Connect existing Page document */
  connect?: InputMaybe<PageWhereUniqueInput>;
  /** Create and connect one Page document */
  create?: InputMaybe<PageCreateInput>;
  /** Delete currently connected Page document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Page document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Page document */
  update?: InputMaybe<PageUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Page document */
  upsert?: InputMaybe<PageUpsertWithNestedWhereUniqueInput>;
};

export type PageUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: PageUpdateInput;
  /** Unique document search */
  where: PageWhereUniqueInput;
};

export type PageUpsertInput = {
  /** Create document if it didn't exist */
  create: PageCreateInput;
  /** Update document if it exists */
  update: PageUpdateInput;
};

export type PageUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: PageUpsertInput;
  /** Unique document search */
  where: PageWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type PageWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type PageWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PageWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PageWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<PageWhereStageInput>;
  documentInStages_none?: InputMaybe<PageWhereStageInput>;
  documentInStages_some?: InputMaybe<PageWhereStageInput>;
  featuredMedia?: InputMaybe<AssetWhereInput>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  layout?: InputMaybe<LayoutWhereInput>;
  lock?: InputMaybe<LockWhereInput>;
  lockExemption?: InputMaybe<LockWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  seo?: InputMaybe<SeoWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  staticPage?: InputMaybe<StaticPage>;
  /** All values that are contained in given list. */
  staticPage_in?: InputMaybe<Array<InputMaybe<StaticPage>>>;
  /** Any other value that exists and is not equal to the given value. */
  staticPage_not?: InputMaybe<StaticPage>;
  /** All values that are not contained in given list. */
  staticPage_not_in?: InputMaybe<Array<InputMaybe<StaticPage>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type PageWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PageWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PageWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PageWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<PageWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Page record uniquely */
export type PageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  staticPage?: InputMaybe<StaticPage>;
};

export type Person = Entity & Node & {
  __typename?: 'Person';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Person>;
  editorial?: Maybe<Editorial>;
  /** List of Person versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  role?: Maybe<Scalars['String']['output']>;
  scheduledIn: Array<ScheduledOperation>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type PersonCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PersonDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type PersonEditorialArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PersonHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type PersonPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PersonScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type PersonUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type PersonConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: PersonWhereUniqueInput;
};

/** A connection to a list of items. */
export type PersonConnection = {
  __typename?: 'PersonConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<PersonEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type PersonCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  editorial?: InputMaybe<EditorialCreateOneInlineInput>;
  name: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PersonCreateManyInlineInput = {
  /** Connect multiple existing Person documents */
  connect?: InputMaybe<Array<PersonWhereUniqueInput>>;
  /** Create and connect multiple existing Person documents */
  create?: InputMaybe<Array<PersonCreateInput>>;
};

export type PersonCreateOneInlineInput = {
  /** Connect one existing Person document */
  connect?: InputMaybe<PersonWhereUniqueInput>;
  /** Create and connect one Person document */
  create?: InputMaybe<PersonCreateInput>;
};

/** An edge in a connection. */
export type PersonEdge = {
  __typename?: 'PersonEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Person;
};

/** Identifies documents */
export type PersonManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PersonWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PersonWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PersonWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<PersonWhereStageInput>;
  documentInStages_none?: InputMaybe<PersonWhereStageInput>;
  documentInStages_some?: InputMaybe<PersonWhereStageInput>;
  editorial?: InputMaybe<EditorialWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  role?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  role_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  role_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  role_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  role_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  role_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  role_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  role_starts_with?: InputMaybe<Scalars['String']['input']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum PersonOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  RoleAsc = 'role_ASC',
  RoleDesc = 'role_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PersonUpdateInput = {
  editorial?: InputMaybe<EditorialUpdateOneInlineInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type PersonUpdateManyInlineInput = {
  /** Connect multiple existing Person documents */
  connect?: InputMaybe<Array<PersonConnectInput>>;
  /** Create and connect multiple Person documents */
  create?: InputMaybe<Array<PersonCreateInput>>;
  /** Delete multiple Person documents */
  delete?: InputMaybe<Array<PersonWhereUniqueInput>>;
  /** Disconnect multiple Person documents */
  disconnect?: InputMaybe<Array<PersonWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Person documents */
  set?: InputMaybe<Array<PersonWhereUniqueInput>>;
  /** Update multiple Person documents */
  update?: InputMaybe<Array<PersonUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Person documents */
  upsert?: InputMaybe<Array<PersonUpsertWithNestedWhereUniqueInput>>;
};

export type PersonUpdateManyInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type PersonUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: PersonUpdateManyInput;
  /** Document search */
  where: PersonWhereInput;
};

export type PersonUpdateOneInlineInput = {
  /** Connect existing Person document */
  connect?: InputMaybe<PersonWhereUniqueInput>;
  /** Create and connect one Person document */
  create?: InputMaybe<PersonCreateInput>;
  /** Delete currently connected Person document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Person document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Person document */
  update?: InputMaybe<PersonUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Person document */
  upsert?: InputMaybe<PersonUpsertWithNestedWhereUniqueInput>;
};

export type PersonUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: PersonUpdateInput;
  /** Unique document search */
  where: PersonWhereUniqueInput;
};

export type PersonUpsertInput = {
  /** Create document if it didn't exist */
  create: PersonCreateInput;
  /** Update document if it exists */
  update: PersonUpdateInput;
};

export type PersonUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: PersonUpsertInput;
  /** Unique document search */
  where: PersonWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type PersonWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type PersonWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PersonWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PersonWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PersonWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<PersonWhereStageInput>;
  documentInStages_none?: InputMaybe<PersonWhereStageInput>;
  documentInStages_some?: InputMaybe<PersonWhereStageInput>;
  editorial?: InputMaybe<EditorialWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  role?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  role_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  role_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  role_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  role_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  role_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  role_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  role_starts_with?: InputMaybe<Scalars['String']['input']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type PersonWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PersonWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PersonWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PersonWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<PersonWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Person record uniquely */
export type PersonWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Based on the color-scheme property; Follows the inheritance pattern outlined in the spec for prefers-color-scheme.
 *
 * see https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
 * https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme#color_scheme_inheritance
 */
export enum PrefersColor {
  Dark = 'dark',
  Light = 'light',
  Normal = 'normal'
}

export type Product = Entity & Node & {
  __typename?: 'Product';
  combinedListings: Array<CombinedListing>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Product>;
  event: Array<Event>;
  gid: Scalars['String']['output'];
  heroes: Array<Layout>;
  /** List of Product versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  layouts: Array<Layout>;
  legacyResourceId: Scalars['String']['output'];
  lock?: Maybe<Lock>;
  lockExemption?: Maybe<Lock>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type ProductCombinedListingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<CombinedListingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CombinedListingWhereInput>;
};


export type ProductCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ProductDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type ProductEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereInput>;
};


export type ProductHeroesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type ProductHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type ProductLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LayoutWhereInput>;
};


export type ProductLockArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ProductLockExemptionArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ProductPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ProductScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ProductUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ProductConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ProductWhereUniqueInput;
};

/** A connection to a list of items. */
export type ProductConnection = {
  __typename?: 'ProductConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ProductEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ProductCreateInput = {
  combinedListings?: InputMaybe<CombinedListingCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  event?: InputMaybe<EventCreateManyInlineInput>;
  gid: Scalars['String']['input'];
  heroes?: InputMaybe<LayoutCreateManyInlineInput>;
  layouts?: InputMaybe<LayoutCreateManyInlineInput>;
  legacyResourceId: Scalars['String']['input'];
  lock?: InputMaybe<LockCreateOneInlineInput>;
  lockExemption?: InputMaybe<LockCreateOneInlineInput>;
  slug: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProductCreateManyInlineInput = {
  /** Connect multiple existing Product documents */
  connect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  /** Create and connect multiple existing Product documents */
  create?: InputMaybe<Array<ProductCreateInput>>;
};

export type ProductCreateOneInlineInput = {
  /** Connect one existing Product document */
  connect?: InputMaybe<ProductWhereUniqueInput>;
  /** Create and connect one Product document */
  create?: InputMaybe<ProductCreateInput>;
};

/** An edge in a connection. */
export type ProductEdge = {
  __typename?: 'ProductEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Product;
};

/** Identifies documents */
export type ProductManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ProductWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ProductWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  combinedListings_every?: InputMaybe<CombinedListingWhereInput>;
  combinedListings_none?: InputMaybe<CombinedListingWhereInput>;
  combinedListings_some?: InputMaybe<CombinedListingWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ProductWhereStageInput>;
  documentInStages_none?: InputMaybe<ProductWhereStageInput>;
  documentInStages_some?: InputMaybe<ProductWhereStageInput>;
  event_every?: InputMaybe<EventWhereInput>;
  event_none?: InputMaybe<EventWhereInput>;
  event_some?: InputMaybe<EventWhereInput>;
  gid?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  gid_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  gid_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  gid_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  gid_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  gid_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  gid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  gid_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  gid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  gid_starts_with?: InputMaybe<Scalars['String']['input']>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  legacyResourceId?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  legacyResourceId_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  legacyResourceId_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  legacyResourceId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  legacyResourceId_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  legacyResourceId_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  legacyResourceId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  legacyResourceId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  legacyResourceId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  legacyResourceId_starts_with?: InputMaybe<Scalars['String']['input']>;
  lock?: InputMaybe<LockWhereInput>;
  lockExemption?: InputMaybe<LockWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ProductOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  GidAsc = 'gid_ASC',
  GidDesc = 'gid_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LegacyResourceIdAsc = 'legacyResourceId_ASC',
  LegacyResourceIdDesc = 'legacyResourceId_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProductUpdateInput = {
  combinedListings?: InputMaybe<CombinedListingUpdateManyInlineInput>;
  event?: InputMaybe<EventUpdateManyInlineInput>;
  gid?: InputMaybe<Scalars['String']['input']>;
  heroes?: InputMaybe<LayoutUpdateManyInlineInput>;
  layouts?: InputMaybe<LayoutUpdateManyInlineInput>;
  legacyResourceId?: InputMaybe<Scalars['String']['input']>;
  lock?: InputMaybe<LockUpdateOneInlineInput>;
  lockExemption?: InputMaybe<LockUpdateOneInlineInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProductUpdateManyInlineInput = {
  /** Connect multiple existing Product documents */
  connect?: InputMaybe<Array<ProductConnectInput>>;
  /** Create and connect multiple Product documents */
  create?: InputMaybe<Array<ProductCreateInput>>;
  /** Delete multiple Product documents */
  delete?: InputMaybe<Array<ProductWhereUniqueInput>>;
  /** Disconnect multiple Product documents */
  disconnect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Product documents */
  set?: InputMaybe<Array<ProductWhereUniqueInput>>;
  /** Update multiple Product documents */
  update?: InputMaybe<Array<ProductUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Product documents */
  upsert?: InputMaybe<Array<ProductUpsertWithNestedWhereUniqueInput>>;
};

export type ProductUpdateManyInput = {
  legacyResourceId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProductUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ProductUpdateManyInput;
  /** Document search */
  where: ProductWhereInput;
};

export type ProductUpdateOneInlineInput = {
  /** Connect existing Product document */
  connect?: InputMaybe<ProductWhereUniqueInput>;
  /** Create and connect one Product document */
  create?: InputMaybe<ProductCreateInput>;
  /** Delete currently connected Product document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Product document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Product document */
  update?: InputMaybe<ProductUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Product document */
  upsert?: InputMaybe<ProductUpsertWithNestedWhereUniqueInput>;
};

export type ProductUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ProductUpdateInput;
  /** Unique document search */
  where: ProductWhereUniqueInput;
};

export type ProductUpsertInput = {
  /** Create document if it didn't exist */
  create: ProductCreateInput;
  /** Update document if it exists */
  update: ProductUpdateInput;
};

export type ProductUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ProductUpsertInput;
  /** Unique document search */
  where: ProductWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ProductWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type ProductWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ProductWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ProductWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  combinedListings_every?: InputMaybe<CombinedListingWhereInput>;
  combinedListings_none?: InputMaybe<CombinedListingWhereInput>;
  combinedListings_some?: InputMaybe<CombinedListingWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ProductWhereStageInput>;
  documentInStages_none?: InputMaybe<ProductWhereStageInput>;
  documentInStages_some?: InputMaybe<ProductWhereStageInput>;
  event_every?: InputMaybe<EventWhereInput>;
  event_none?: InputMaybe<EventWhereInput>;
  event_some?: InputMaybe<EventWhereInput>;
  gid?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  gid_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  gid_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  gid_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  gid_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  gid_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  gid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  gid_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  gid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  gid_starts_with?: InputMaybe<Scalars['String']['input']>;
  heroes_every?: InputMaybe<LayoutWhereInput>;
  heroes_none?: InputMaybe<LayoutWhereInput>;
  heroes_some?: InputMaybe<LayoutWhereInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  layouts_every?: InputMaybe<LayoutWhereInput>;
  layouts_none?: InputMaybe<LayoutWhereInput>;
  layouts_some?: InputMaybe<LayoutWhereInput>;
  legacyResourceId?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  legacyResourceId_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  legacyResourceId_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  legacyResourceId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  legacyResourceId_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  legacyResourceId_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  legacyResourceId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  legacyResourceId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  legacyResourceId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  legacyResourceId_starts_with?: InputMaybe<Scalars['String']['input']>;
  lock?: InputMaybe<LockWhereInput>;
  lockExemption?: InputMaybe<LockWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ProductWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ProductWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ProductWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ProductWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ProductWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Product record uniquely */
export type ProductWhereUniqueInput = {
  gid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type PublishLocaleInput = {
  /** Locales to publish */
  locale: Locale;
  /** Stages to publish selected locales to */
  stages: Array<Stage>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a single archive */
  archive?: Maybe<Archive>;
  /** Retrieve document version */
  archiveVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple archives */
  archives: Array<Archive>;
  /** Retrieve multiple archives using the Relay connection interface */
  archivesConnection: ArchiveConnection;
  /** Retrieve a single asset */
  asset?: Maybe<Asset>;
  /** Retrieve document version */
  assetVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple assets */
  assets: Array<Asset>;
  /** Retrieve multiple assets using the Relay connection interface */
  assetsConnection: AssetConnection;
  /** Retrieve a single collection */
  collection?: Maybe<Collection>;
  /** Retrieve document version */
  collectionVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple collections */
  collections: Array<Collection>;
  /** Retrieve multiple collections using the Relay connection interface */
  collectionsConnection: CollectionConnection;
  /** Retrieve a single combinedListing */
  combinedListing?: Maybe<CombinedListing>;
  /** Retrieve document version */
  combinedListingVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple combinedListings */
  combinedListings: Array<CombinedListing>;
  /** Retrieve multiple combinedListings using the Relay connection interface */
  combinedListingsConnection: CombinedListingConnection;
  /** Retrieve a single customizedSection */
  customizedSection?: Maybe<CustomizedSection>;
  /** Retrieve document version */
  customizedSectionVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple customizedSections */
  customizedSections: Array<CustomizedSection>;
  /** Retrieve multiple customizedSections using the Relay connection interface */
  customizedSectionsConnection: CustomizedSectionConnection;
  /** Retrieve a single editorial */
  editorial?: Maybe<Editorial>;
  /** Retrieve document version */
  editorialVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple editorials */
  editorials: Array<Editorial>;
  /** Retrieve multiple editorials using the Relay connection interface */
  editorialsConnection: EditorialConnection;
  /** Fetches an object given its ID */
  entities?: Maybe<Array<Entity>>;
  /** Retrieve a single event */
  event?: Maybe<Event>;
  /** Retrieve document version */
  eventVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple events */
  events: Array<Event>;
  /** Retrieve multiple events using the Relay connection interface */
  eventsConnection: EventConnection;
  /** Retrieve a single form */
  form?: Maybe<Form>;
  /** Retrieve document version */
  formVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple forms */
  forms: Array<Form>;
  /** Retrieve multiple forms using the Relay connection interface */
  formsConnection: FormConnection;
  /** Retrieve multiple galleries */
  galleries: Array<Gallery>;
  /** Retrieve multiple galleries using the Relay connection interface */
  galleriesConnection: GalleryConnection;
  /** Retrieve a single gallery */
  gallery?: Maybe<Gallery>;
  /** Retrieve document version */
  galleryVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single layout */
  layout?: Maybe<Layout>;
  /** Retrieve document version */
  layoutVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple layouts */
  layouts: Array<Layout>;
  /** Retrieve multiple layouts using the Relay connection interface */
  layoutsConnection: LayoutConnection;
  /** Retrieve a single lock */
  lock?: Maybe<Lock>;
  /** Retrieve document version */
  lockVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple locks */
  locks: Array<Lock>;
  /** Retrieve multiple locks using the Relay connection interface */
  locksConnection: LockConnection;
  /** Retrieve a single mixedMedia */
  mixedMedia?: Maybe<MixedMedia>;
  /** Retrieve document version */
  mixedMediaVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple mixedMedias */
  mixedMedias: Array<MixedMedia>;
  /** Retrieve multiple mixedMedias using the Relay connection interface */
  mixedMediasConnection: MixedMediaConnection;
  /** Retrieve a single navigation */
  navigation?: Maybe<Navigation>;
  /** Retrieve document version */
  navigationVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple navigations */
  navigations: Array<Navigation>;
  /** Retrieve multiple navigations using the Relay connection interface */
  navigationsConnection: NavigationConnection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Retrieve a single page */
  page?: Maybe<Page>;
  /** Retrieve document version */
  pageVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple pages */
  pages: Array<Page>;
  /** Retrieve multiple pages using the Relay connection interface */
  pagesConnection: PageConnection;
  /** Retrieve multiple people */
  people: Array<Person>;
  /** Retrieve multiple people using the Relay connection interface */
  peopleConnection: PersonConnection;
  /** Retrieve a single person */
  person?: Maybe<Person>;
  /** Retrieve document version */
  personVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single product */
  product?: Maybe<Product>;
  /** Retrieve document version */
  productVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple products */
  products: Array<Product>;
  /** Retrieve multiple products using the Relay connection interface */
  productsConnection: ProductConnection;
  /** Retrieve a single scheduledOperation */
  scheduledOperation?: Maybe<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations */
  scheduledOperations: Array<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations using the Relay connection interface */
  scheduledOperationsConnection: ScheduledOperationConnection;
  /** Retrieve a single scheduledRelease */
  scheduledRelease?: Maybe<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases */
  scheduledReleases: Array<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases using the Relay connection interface */
  scheduledReleasesConnection: ScheduledReleaseConnection;
  /** Retrieve a single seo */
  seo?: Maybe<Seo>;
  /** Retrieve document version */
  seoVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple seos */
  seos: Array<Seo>;
  /** Retrieve multiple seos using the Relay connection interface */
  seosConnection: SeoConnection;
  /** Retrieve a single theme */
  theme?: Maybe<Theme>;
  /** Retrieve document version */
  themeVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple themes */
  themes: Array<Theme>;
  /** Retrieve multiple themes using the Relay connection interface */
  themesConnection: ThemeConnection;
  /** Retrieve a single user */
  user?: Maybe<User>;
  /** Retrieve multiple users */
  users: Array<User>;
  /** Retrieve multiple users using the Relay connection interface */
  usersConnection: UserConnection;
};


export type QueryArchiveArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ArchiveWhereUniqueInput;
};


export type QueryArchiveVersionArgs = {
  where: VersionWhereInput;
};


export type QueryArchivesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ArchiveOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ArchiveWhereInput>;
};


export type QueryArchivesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ArchiveOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ArchiveWhereInput>;
};


export type QueryAssetArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AssetWhereUniqueInput;
};


export type QueryAssetVersionArgs = {
  where: VersionWhereInput;
};


export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryCollectionArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: CollectionWhereUniqueInput;
};


export type QueryCollectionVersionArgs = {
  where: VersionWhereInput;
};


export type QueryCollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CollectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<CollectionWhereInput>;
};


export type QueryCollectionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CollectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<CollectionWhereInput>;
};


export type QueryCombinedListingArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: CombinedListingWhereUniqueInput;
};


export type QueryCombinedListingVersionArgs = {
  where: VersionWhereInput;
};


export type QueryCombinedListingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CombinedListingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<CombinedListingWhereInput>;
};


export type QueryCombinedListingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CombinedListingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<CombinedListingWhereInput>;
};


export type QueryCustomizedSectionArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: CustomizedSectionWhereUniqueInput;
};


export type QueryCustomizedSectionVersionArgs = {
  where: VersionWhereInput;
};


export type QueryCustomizedSectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CustomizedSectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<CustomizedSectionWhereInput>;
};


export type QueryCustomizedSectionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CustomizedSectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<CustomizedSectionWhereInput>;
};


export type QueryEditorialArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: EditorialWhereUniqueInput;
};


export type QueryEditorialVersionArgs = {
  where: VersionWhereInput;
};


export type QueryEditorialsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<EditorialOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<EditorialWhereInput>;
};


export type QueryEditorialsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<EditorialOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<EditorialWhereInput>;
};


export type QueryEntitiesArgs = {
  locales?: InputMaybe<Array<Locale>>;
  where: Array<EntityWhereInput>;
};


export type QueryEventArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: EventWhereUniqueInput;
};


export type QueryEventVersionArgs = {
  where: VersionWhereInput;
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<EventOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<EventOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryFormArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: FormWhereUniqueInput;
};


export type QueryFormVersionArgs = {
  where: VersionWhereInput;
};


export type QueryFormsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<FormOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<FormWhereInput>;
};


export type QueryFormsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<FormOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<FormWhereInput>;
};


export type QueryGalleriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<GalleryOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<GalleryWhereInput>;
};


export type QueryGalleriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<GalleryOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<GalleryWhereInput>;
};


export type QueryGalleryArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: GalleryWhereUniqueInput;
};


export type QueryGalleryVersionArgs = {
  where: VersionWhereInput;
};


export type QueryLayoutArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: LayoutWhereUniqueInput;
};


export type QueryLayoutVersionArgs = {
  where: VersionWhereInput;
};


export type QueryLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<LayoutOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<LayoutWhereInput>;
};


export type QueryLayoutsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<LayoutOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<LayoutWhereInput>;
};


export type QueryLockArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: LockWhereUniqueInput;
};


export type QueryLockVersionArgs = {
  where: VersionWhereInput;
};


export type QueryLocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<LockOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<LockWhereInput>;
};


export type QueryLocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<LockOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<LockWhereInput>;
};


export type QueryMixedMediaArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: MixedMediaWhereUniqueInput;
};


export type QueryMixedMediaVersionArgs = {
  where: VersionWhereInput;
};


export type QueryMixedMediasArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<MixedMediaOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<MixedMediaWhereInput>;
};


export type QueryMixedMediasConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<MixedMediaOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<MixedMediaWhereInput>;
};


export type QueryNavigationArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: NavigationWhereUniqueInput;
};


export type QueryNavigationVersionArgs = {
  where: VersionWhereInput;
};


export type QueryNavigationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<NavigationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<NavigationWhereInput>;
};


export type QueryNavigationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<NavigationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<NavigationWhereInput>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
  locales?: Array<Locale>;
  stage?: Stage;
};


export type QueryPageArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: PageWhereUniqueInput;
};


export type QueryPageVersionArgs = {
  where: VersionWhereInput;
};


export type QueryPagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<PageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<PageWhereInput>;
};


export type QueryPagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<PageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<PageWhereInput>;
};


export type QueryPeopleArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<PersonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<PersonWhereInput>;
};


export type QueryPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<PersonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<PersonWhereInput>;
};


export type QueryPersonArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: PersonWhereUniqueInput;
};


export type QueryPersonVersionArgs = {
  where: VersionWhereInput;
};


export type QueryProductArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ProductWhereUniqueInput;
};


export type QueryProductVersionArgs = {
  where: VersionWhereInput;
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ProductOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ProductWhereInput>;
};


export type QueryProductsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ProductOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ProductWhereInput>;
};


export type QueryScheduledOperationArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledOperationWhereUniqueInput;
};


export type QueryScheduledOperationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledOperationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledReleaseArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledReleaseWhereUniqueInput;
};


export type QueryScheduledReleasesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QueryScheduledReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QuerySeoArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: SeoWhereUniqueInput;
};


export type QuerySeoVersionArgs = {
  where: VersionWhereInput;
};


export type QuerySeosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<SeoOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<SeoWhereInput>;
};


export type QuerySeosConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<SeoOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<SeoWhereInput>;
};


export type QueryThemeArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ThemeWhereUniqueInput;
};


export type QueryThemeVersionArgs = {
  where: VersionWhereInput;
};


export type QueryThemesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ThemeOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ThemeWhereInput>;
};


export type QueryThemesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ThemeOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<ThemeWhereInput>;
};


export type QueryUserArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  __typename?: 'RGBA';
  a: Scalars['RGBATransparency']['output'];
  b: Scalars['RGBAHue']['output'];
  g: Scalars['RGBAHue']['output'];
  r: Scalars['RGBAHue']['output'];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  a: Scalars['RGBATransparency']['input'];
  b: Scalars['RGBAHue']['input'];
  g: Scalars['RGBAHue']['input'];
  r: Scalars['RGBAHue']['input'];
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  __typename?: 'RichText';
  /** Returns HTMl representation */
  html: Scalars['String']['output'];
  /** Returns Markdown representation */
  markdown: Scalars['String']['output'];
  /** Returns AST representation */
  raw: Scalars['RichTextAST']['output'];
  /** Returns plain-text contents of RichText */
  text: Scalars['String']['output'];
};

/** Scheduled Operation system model */
export type ScheduledOperation = Entity & Node & {
  __typename?: 'ScheduledOperation';
  affectedDocuments: Array<ScheduledOperationAffectedDocument>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Operation description */
  description?: Maybe<Scalars['String']['output']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledOperation>;
  /** Operation error message */
  errorMessage?: Maybe<Scalars['String']['output']>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Raw operation payload including all details, this field is subject to change */
  rawPayload: Scalars['Json']['output'];
  /** The release this operation is scheduled for */
  release?: Maybe<ScheduledRelease>;
  /** System stage field */
  stage: Stage;
  /** operation Status */
  status: ScheduledOperationStatus;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Operation system model */
export type ScheduledOperationAffectedDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


/** Scheduled Operation system model */
export type ScheduledOperationCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Scheduled Operation system model */
export type ScheduledOperationPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationReleaseArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledOperationAffectedDocument = Archive | Asset | Collection | CombinedListing | CustomizedSection | Editorial | Event | Form | Gallery | Layout | Lock | MixedMedia | Navigation | Page | Person | Product | Seo | Theme;

export type ScheduledOperationConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledOperationWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledOperationConnection = {
  __typename?: 'ScheduledOperationConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledOperationEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledOperationCreateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationCreateOneInlineInput = {
  /** Connect one existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
};

/** An edge in a connection. */
export type ScheduledOperationEdge = {
  __typename?: 'ScheduledOperationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ScheduledOperation;
};

/** Identifies documents */
export type ScheduledOperationManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']['input']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']['input']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledOperationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Operation Status */
export enum ScheduledOperationStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledOperationUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationConnectInput>>;
  /** Disconnect multiple ScheduledOperation documents */
  disconnect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledOperation documents */
  set?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationUpdateOneInlineInput = {
  /** Connect existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
  /** Disconnect currently connected ScheduledOperation document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type ScheduledOperationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']['input']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']['input']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledOperation record uniquely */
export type ScheduledOperationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Scheduled Release system model */
export type ScheduledRelease = Entity & Node & {
  __typename?: 'ScheduledRelease';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Release description */
  description?: Maybe<Scalars['String']['output']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledRelease>;
  /** Release error message */
  errorMessage?: Maybe<Scalars['String']['output']>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** Whether scheduled release should be run */
  isActive: Scalars['Boolean']['output'];
  /** Whether scheduled release is implicit */
  isImplicit: Scalars['Boolean']['output'];
  /** Operations to run with this release */
  operations: Array<ScheduledOperation>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Release date and time */
  releaseAt?: Maybe<Scalars['DateTime']['output']>;
  /** System stage field */
  stage: Stage;
  /** Release Status */
  status: ScheduledReleaseStatus;
  /** Release Title */
  title?: Maybe<Scalars['String']['output']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Release system model */
export type ScheduledReleaseCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


/** Scheduled Release system model */
export type ScheduledReleaseOperationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Scheduled Release system model */
export type ScheduledReleasePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledReleaseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledReleaseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledReleaseConnection = {
  __typename?: 'ScheduledReleaseConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledReleaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledReleaseCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScheduledReleaseCreateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Create and connect multiple existing ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
};

export type ScheduledReleaseCreateOneInlineInput = {
  /** Connect one existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
};

/** An edge in a connection. */
export type ScheduledReleaseEdge = {
  __typename?: 'ScheduledReleaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ScheduledRelease;
};

/** Identifies documents */
export type ScheduledReleaseManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']['input']>;
  isImplicit?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']['input']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledReleaseOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  IsImplicitAsc = 'isImplicit_ASC',
  IsImplicitDesc = 'isImplicit_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ReleaseAtAsc = 'releaseAt_ASC',
  ReleaseAtDesc = 'releaseAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Release Status */
export enum ScheduledReleaseStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledReleaseUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScheduledReleaseUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseConnectInput>>;
  /** Create and connect multiple ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
  /** Delete multiple ScheduledRelease documents */
  delete?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Disconnect multiple ScheduledRelease documents */
  disconnect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledRelease documents */
  set?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Update multiple ScheduledRelease documents */
  update?: InputMaybe<Array<ScheduledReleaseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ScheduledRelease documents */
  upsert?: InputMaybe<Array<ScheduledReleaseUpsertWithNestedWhereUniqueInput>>;
};

export type ScheduledReleaseUpdateManyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScheduledReleaseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ScheduledReleaseUpdateManyInput;
  /** Document search */
  where: ScheduledReleaseWhereInput;
};

export type ScheduledReleaseUpdateOneInlineInput = {
  /** Connect existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
  /** Delete currently connected ScheduledRelease document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected ScheduledRelease document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single ScheduledRelease document */
  update?: InputMaybe<ScheduledReleaseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ScheduledRelease document */
  upsert?: InputMaybe<ScheduledReleaseUpsertWithNestedWhereUniqueInput>;
};

export type ScheduledReleaseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ScheduledReleaseUpdateInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

export type ScheduledReleaseUpsertInput = {
  /** Create document if it didn't exist */
  create: ScheduledReleaseCreateInput;
  /** Update document if it exists */
  update: ScheduledReleaseUpdateInput;
};

export type ScheduledReleaseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ScheduledReleaseUpsertInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

/** Identifies documents */
export type ScheduledReleaseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']['input']>;
  isImplicit?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']['input']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledRelease record uniquely */
export type ScheduledReleaseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

/**
 * "Single mode": only a single day can be selected
 * "Multiple mode": allow selection of multiple days
 * "Range mode": allow the selection of range of days
 *
 */
export enum SelectionMode {
  Multiple = 'multiple',
  Range = 'range',
  Single = 'single'
}

export type Seo = Entity & Node & {
  __typename?: 'Seo';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** The ideal length for a meta description is 160 characters. Google generally truncates them to ~ 155–160 characters.  */
  description: Scalars['String']['output'];
  /** Get the document in other stages */
  documentInStages: Array<Seo>;
  editorials: Array<Editorial>;
  /** The title template has the following format `{title} | No Maintenance` */
  hasTitleTemplate?: Maybe<Scalars['Boolean']['output']>;
  /** List of Seo versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  image?: Maybe<Asset>;
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Seo>;
  /** Instruct Search engines not to index this page. (in most cases these value should be FALSE) */
  noIndex: Scalars['Boolean']['output'];
  pages: Array<Page>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The ideal length for a title is no more than 70 characters. If you use the title template, try to keep it under 53 characters. */
  title: Scalars['String']['output'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type SeoCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type SeoCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type SeoDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type SeoEditorialsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<EditorialOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EditorialWhereInput>;
};


export type SeoHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type SeoImageArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type SeoLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  locales?: Array<Locale>;
};


export type SeoPagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<PageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PageWhereInput>;
};


export type SeoPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type SeoPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type SeoScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type SeoUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


export type SeoUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type SeoConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: SeoWhereUniqueInput;
};

/** A connection to a list of items. */
export type SeoConnection = {
  __typename?: 'SeoConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<SeoEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type SeoCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** description input for default locale (en) */
  description: Scalars['String']['input'];
  editorials?: InputMaybe<EditorialCreateManyInlineInput>;
  hasTitleTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<AssetCreateOneInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<SeoCreateLocalizationsInput>;
  noIndex: Scalars['Boolean']['input'];
  pages?: InputMaybe<PageCreateManyInlineInput>;
  /** title input for default locale (en) */
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SeoCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SeoCreateLocalizationInput = {
  /** Localization input */
  data: SeoCreateLocalizationDataInput;
  locale: Locale;
};

export type SeoCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<SeoCreateLocalizationInput>>;
};

export type SeoCreateManyInlineInput = {
  /** Connect multiple existing Seo documents */
  connect?: InputMaybe<Array<SeoWhereUniqueInput>>;
  /** Create and connect multiple existing Seo documents */
  create?: InputMaybe<Array<SeoCreateInput>>;
};

export type SeoCreateOneInlineInput = {
  /** Connect one existing Seo document */
  connect?: InputMaybe<SeoWhereUniqueInput>;
  /** Create and connect one Seo document */
  create?: InputMaybe<SeoCreateInput>;
};

/** An edge in a connection. */
export type SeoEdge = {
  __typename?: 'SeoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Seo;
};

/** Identifies documents */
export type SeoManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SeoWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SeoWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SeoWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<SeoWhereStageInput>;
  documentInStages_none?: InputMaybe<SeoWhereStageInput>;
  documentInStages_some?: InputMaybe<SeoWhereStageInput>;
  editorials_every?: InputMaybe<EditorialWhereInput>;
  editorials_none?: InputMaybe<EditorialWhereInput>;
  editorials_some?: InputMaybe<EditorialWhereInput>;
  hasTitleTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  hasTitleTemplate_not?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<AssetWhereInput>;
  noIndex?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  noIndex_not?: InputMaybe<Scalars['Boolean']['input']>;
  pages_every?: InputMaybe<PageWhereInput>;
  pages_none?: InputMaybe<PageWhereInput>;
  pages_some?: InputMaybe<PageWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum SeoOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  HasTitleTemplateAsc = 'hasTitleTemplate_ASC',
  HasTitleTemplateDesc = 'hasTitleTemplate_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NoIndexAsc = 'noIndex_ASC',
  NoIndexDesc = 'noIndex_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type SeoUpdateInput = {
  /** description input for default locale (en) */
  description?: InputMaybe<Scalars['String']['input']>;
  editorials?: InputMaybe<EditorialUpdateManyInlineInput>;
  hasTitleTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<AssetUpdateOneInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<SeoUpdateLocalizationsInput>;
  noIndex?: InputMaybe<Scalars['Boolean']['input']>;
  pages?: InputMaybe<PageUpdateManyInlineInput>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SeoUpdateLocalizationDataInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SeoUpdateLocalizationInput = {
  data: SeoUpdateLocalizationDataInput;
  locale: Locale;
};

export type SeoUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<SeoCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<SeoUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<SeoUpsertLocalizationInput>>;
};

export type SeoUpdateManyInlineInput = {
  /** Connect multiple existing Seo documents */
  connect?: InputMaybe<Array<SeoConnectInput>>;
  /** Create and connect multiple Seo documents */
  create?: InputMaybe<Array<SeoCreateInput>>;
  /** Delete multiple Seo documents */
  delete?: InputMaybe<Array<SeoWhereUniqueInput>>;
  /** Disconnect multiple Seo documents */
  disconnect?: InputMaybe<Array<SeoWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Seo documents */
  set?: InputMaybe<Array<SeoWhereUniqueInput>>;
  /** Update multiple Seo documents */
  update?: InputMaybe<Array<SeoUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Seo documents */
  upsert?: InputMaybe<Array<SeoUpsertWithNestedWhereUniqueInput>>;
};

export type SeoUpdateManyInput = {
  /** description input for default locale (en) */
  description?: InputMaybe<Scalars['String']['input']>;
  hasTitleTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<SeoUpdateManyLocalizationsInput>;
  noIndex?: InputMaybe<Scalars['Boolean']['input']>;
  /** title input for default locale (en) */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SeoUpdateManyLocalizationDataInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SeoUpdateManyLocalizationInput = {
  data: SeoUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type SeoUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<SeoUpdateManyLocalizationInput>>;
};

export type SeoUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: SeoUpdateManyInput;
  /** Document search */
  where: SeoWhereInput;
};

export type SeoUpdateOneInlineInput = {
  /** Connect existing Seo document */
  connect?: InputMaybe<SeoWhereUniqueInput>;
  /** Create and connect one Seo document */
  create?: InputMaybe<SeoCreateInput>;
  /** Delete currently connected Seo document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Seo document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Seo document */
  update?: InputMaybe<SeoUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Seo document */
  upsert?: InputMaybe<SeoUpsertWithNestedWhereUniqueInput>;
};

export type SeoUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: SeoUpdateInput;
  /** Unique document search */
  where: SeoWhereUniqueInput;
};

export type SeoUpsertInput = {
  /** Create document if it didn't exist */
  create: SeoCreateInput;
  /** Update document if it exists */
  update: SeoUpdateInput;
};

export type SeoUpsertLocalizationInput = {
  create: SeoCreateLocalizationDataInput;
  locale: Locale;
  update: SeoUpdateLocalizationDataInput;
};

export type SeoUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: SeoUpsertInput;
  /** Unique document search */
  where: SeoWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type SeoWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type SeoWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SeoWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SeoWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SeoWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  documentInStages_every?: InputMaybe<SeoWhereStageInput>;
  documentInStages_none?: InputMaybe<SeoWhereStageInput>;
  documentInStages_some?: InputMaybe<SeoWhereStageInput>;
  editorials_every?: InputMaybe<EditorialWhereInput>;
  editorials_none?: InputMaybe<EditorialWhereInput>;
  editorials_some?: InputMaybe<EditorialWhereInput>;
  hasTitleTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  hasTitleTemplate_not?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<AssetWhereInput>;
  noIndex?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  noIndex_not?: InputMaybe<Scalars['Boolean']['input']>;
  pages_every?: InputMaybe<PageWhereInput>;
  pages_none?: InputMaybe<PageWhereInput>;
  pages_some?: InputMaybe<PageWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type SeoWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SeoWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SeoWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SeoWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<SeoWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Seo record uniquely */
export type SeoWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum Sizes {
  Default = 'default',
  Large = 'large',
  Medium = 'medium',
  None = 'none',
  Small = 'small'
}

/** Stage system enumeration */
export enum Stage {
  /** The Draft is the default stage for all your content. */
  Draft = 'DRAFT',
  /** The Published stage is where you can publish your content to. */
  Published = 'PUBLISHED'
}

export enum StaticNavigation {
  Footer = 'footer',
  Header = 'header'
}

/** Assign this as a static page. */
export enum StaticPage {
  Editorial = 'editorial',
  FrontPage = 'frontPage'
}

export enum SystemDateTimeFieldVariation {
  Base = 'BASE',
  Combined = 'COMBINED',
  Localization = 'LOCALIZATION'
}

export type Theme = Entity & Node & {
  __typename?: 'Theme';
  /** Background color for sections. */
  background?: Maybe<Color>;
  border?: Maybe<Color>;
  /** Background for Card elements */
  card?: Maybe<Color>;
  /** Text color for Cards */
  cardForeground?: Maybe<Color>;
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Used for error text and destructive actions */
  destructive?: Maybe<Color>;
  destructiveForeground?: Maybe<Color>;
  /** Get the document in other stages */
  documentInStages: Array<Theme>;
  /** Main text color for readability. */
  foreground?: Maybe<Color>;
  /** Assign this theme as a global theme to be used across the webshop. Defaults are set according to spec for the browser's built-in "prefers-color-scheme" property. */
  globalDefault?: Maybe<PrefersColor>;
  /** List of Theme versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  inputColor?: Maybe<Color>;
  /** used internally for identification purposes. */
  internalName?: Maybe<Scalars['String']['output']>;
  /** Muted color for things like the skeleton element. */
  muted?: Maybe<Color>;
  mutedForeground?: Maybe<Color>;
  /** Primary colors for buttons and other attention-grabbing elements. */
  primary?: Maybe<Color>;
  primaryForeground?: Maybe<Color>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  radius?: Maybe<Sizes>;
  /** Used for focus ring. */
  ring?: Maybe<Color>;
  scheduledIn: Array<ScheduledOperation>;
  /** Secondary brand color for complementary accents. */
  secondary?: Maybe<Color>;
  secondaryForeground?: Maybe<Color>;
  slug: Scalars['String']['output'];
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type ThemeCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ThemeDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};


export type ThemeHistoryArgs = {
  limit?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
  stageOverride?: InputMaybe<Stage>;
};


export type ThemePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ThemeScheduledInArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ThemeUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']['input']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ThemeConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ThemeWhereUniqueInput;
};

/** A connection to a list of items. */
export type ThemeConnection = {
  __typename?: 'ThemeConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ThemeEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ThemeCreateInput = {
  background?: InputMaybe<ColorInput>;
  border?: InputMaybe<ColorInput>;
  card?: InputMaybe<ColorInput>;
  cardForeground?: InputMaybe<ColorInput>;
  clv4vzx4z0bqk07n0b10phvj6?: InputMaybe<CustomizedSectionCreateManyInlineInput>;
  clveucwv3066f07lq2n7e1zwc?: InputMaybe<LayoutCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  destructive?: InputMaybe<ColorInput>;
  destructiveForeground?: InputMaybe<ColorInput>;
  foreground?: InputMaybe<ColorInput>;
  globalDefault?: InputMaybe<PrefersColor>;
  inputColor?: InputMaybe<ColorInput>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  muted?: InputMaybe<ColorInput>;
  mutedForeground?: InputMaybe<ColorInput>;
  primary?: InputMaybe<ColorInput>;
  primaryForeground?: InputMaybe<ColorInput>;
  radius?: InputMaybe<Sizes>;
  ring?: InputMaybe<ColorInput>;
  secondary?: InputMaybe<ColorInput>;
  secondaryForeground?: InputMaybe<ColorInput>;
  setting?: InputMaybe<DisplayOptionCreateOneInlineInput>;
  slug: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ThemeCreateManyInlineInput = {
  /** Connect multiple existing Theme documents */
  connect?: InputMaybe<Array<ThemeWhereUniqueInput>>;
  /** Create and connect multiple existing Theme documents */
  create?: InputMaybe<Array<ThemeCreateInput>>;
};

export type ThemeCreateOneInlineInput = {
  /** Connect one existing Theme document */
  connect?: InputMaybe<ThemeWhereUniqueInput>;
  /** Create and connect one Theme document */
  create?: InputMaybe<ThemeCreateInput>;
};

/** An edge in a connection. */
export type ThemeEdge = {
  __typename?: 'ThemeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Theme;
};

/** Identifies documents */
export type ThemeManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ThemeWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ThemeWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ThemeWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ThemeWhereStageInput>;
  documentInStages_none?: InputMaybe<ThemeWhereStageInput>;
  documentInStages_some?: InputMaybe<ThemeWhereStageInput>;
  globalDefault?: InputMaybe<PrefersColor>;
  /** All values that are contained in given list. */
  globalDefault_in?: InputMaybe<Array<InputMaybe<PrefersColor>>>;
  /** Any other value that exists and is not equal to the given value. */
  globalDefault_not?: InputMaybe<PrefersColor>;
  /** All values that are not contained in given list. */
  globalDefault_not_in?: InputMaybe<Array<InputMaybe<PrefersColor>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  radius?: InputMaybe<Sizes>;
  /** All values that are contained in given list. */
  radius_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  /** Any other value that exists and is not equal to the given value. */
  radius_not?: InputMaybe<Sizes>;
  /** All values that are not contained in given list. */
  radius_not_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ThemeOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  GlobalDefaultAsc = 'globalDefault_ASC',
  GlobalDefaultDesc = 'globalDefault_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  RadiusAsc = 'radius_ASC',
  RadiusDesc = 'radius_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ThemeUpdateInput = {
  background?: InputMaybe<ColorInput>;
  border?: InputMaybe<ColorInput>;
  card?: InputMaybe<ColorInput>;
  cardForeground?: InputMaybe<ColorInput>;
  clv4vzx4z0bqk07n0b10phvj6?: InputMaybe<CustomizedSectionUpdateManyInlineInput>;
  clveucwv3066f07lq2n7e1zwc?: InputMaybe<LayoutUpdateManyInlineInput>;
  destructive?: InputMaybe<ColorInput>;
  destructiveForeground?: InputMaybe<ColorInput>;
  foreground?: InputMaybe<ColorInput>;
  globalDefault?: InputMaybe<PrefersColor>;
  inputColor?: InputMaybe<ColorInput>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  muted?: InputMaybe<ColorInput>;
  mutedForeground?: InputMaybe<ColorInput>;
  primary?: InputMaybe<ColorInput>;
  primaryForeground?: InputMaybe<ColorInput>;
  radius?: InputMaybe<Sizes>;
  ring?: InputMaybe<ColorInput>;
  secondary?: InputMaybe<ColorInput>;
  secondaryForeground?: InputMaybe<ColorInput>;
  setting?: InputMaybe<DisplayOptionUpdateOneInlineInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type ThemeUpdateManyInlineInput = {
  /** Connect multiple existing Theme documents */
  connect?: InputMaybe<Array<ThemeConnectInput>>;
  /** Create and connect multiple Theme documents */
  create?: InputMaybe<Array<ThemeCreateInput>>;
  /** Delete multiple Theme documents */
  delete?: InputMaybe<Array<ThemeWhereUniqueInput>>;
  /** Disconnect multiple Theme documents */
  disconnect?: InputMaybe<Array<ThemeWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Theme documents */
  set?: InputMaybe<Array<ThemeWhereUniqueInput>>;
  /** Update multiple Theme documents */
  update?: InputMaybe<Array<ThemeUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Theme documents */
  upsert?: InputMaybe<Array<ThemeUpsertWithNestedWhereUniqueInput>>;
};

export type ThemeUpdateManyInput = {
  background?: InputMaybe<ColorInput>;
  border?: InputMaybe<ColorInput>;
  card?: InputMaybe<ColorInput>;
  cardForeground?: InputMaybe<ColorInput>;
  destructive?: InputMaybe<ColorInput>;
  destructiveForeground?: InputMaybe<ColorInput>;
  foreground?: InputMaybe<ColorInput>;
  inputColor?: InputMaybe<ColorInput>;
  muted?: InputMaybe<ColorInput>;
  mutedForeground?: InputMaybe<ColorInput>;
  primary?: InputMaybe<ColorInput>;
  primaryForeground?: InputMaybe<ColorInput>;
  radius?: InputMaybe<Sizes>;
  ring?: InputMaybe<ColorInput>;
  secondary?: InputMaybe<ColorInput>;
  secondaryForeground?: InputMaybe<ColorInput>;
};

export type ThemeUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ThemeUpdateManyInput;
  /** Document search */
  where: ThemeWhereInput;
};

export type ThemeUpdateOneInlineInput = {
  /** Connect existing Theme document */
  connect?: InputMaybe<ThemeWhereUniqueInput>;
  /** Create and connect one Theme document */
  create?: InputMaybe<ThemeCreateInput>;
  /** Delete currently connected Theme document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected Theme document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single Theme document */
  update?: InputMaybe<ThemeUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Theme document */
  upsert?: InputMaybe<ThemeUpsertWithNestedWhereUniqueInput>;
};

export type ThemeUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ThemeUpdateInput;
  /** Unique document search */
  where: ThemeWhereUniqueInput;
};

export type ThemeUpsertInput = {
  /** Create document if it didn't exist */
  create: ThemeCreateInput;
  /** Update document if it exists */
  update: ThemeUpdateInput;
};

export type ThemeUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ThemeUpsertInput;
  /** Unique document search */
  where: ThemeWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ThemeWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type ThemeWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ThemeWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ThemeWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ThemeWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ThemeWhereStageInput>;
  documentInStages_none?: InputMaybe<ThemeWhereStageInput>;
  documentInStages_some?: InputMaybe<ThemeWhereStageInput>;
  globalDefault?: InputMaybe<PrefersColor>;
  /** All values that are contained in given list. */
  globalDefault_in?: InputMaybe<Array<InputMaybe<PrefersColor>>>;
  /** Any other value that exists and is not equal to the given value. */
  globalDefault_not?: InputMaybe<PrefersColor>;
  /** All values that are not contained in given list. */
  globalDefault_not_in?: InputMaybe<Array<InputMaybe<PrefersColor>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  internalName_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  internalName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  internalName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  internalName_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  radius?: InputMaybe<Sizes>;
  /** All values that are contained in given list. */
  radius_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  /** Any other value that exists and is not equal to the given value. */
  radius_not?: InputMaybe<Sizes>;
  /** All values that are not contained in given list. */
  radius_not_in?: InputMaybe<Array<InputMaybe<Sizes>>>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ThemeWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ThemeWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ThemeWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ThemeWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ThemeWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Theme record uniquely */
export type ThemeWhereUniqueInput = {
  globalDefault?: InputMaybe<PrefersColor>;
  id?: InputMaybe<Scalars['ID']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export enum TypeFeed {
  Automated = 'automated',
  Manual = 'manual'
}

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: Locale;
  /** Stages to unpublish selected locales from */
  stages: Array<Stage>;
};

/** User system model */
export type User = Entity & Node & {
  __typename?: 'User';
  /** The time the document was created */
  createdAt: Scalars['DateTime']['output'];
  /** Get the document in other stages */
  documentInStages: Array<User>;
  /** The unique identifier */
  id: Scalars['ID']['output'];
  /** Flag to determine if user is active or not */
  isActive: Scalars['Boolean']['output'];
  /** User Kind. Can be either MEMBER, PAT or PUBLIC */
  kind: UserKind;
  /** The username */
  name: Scalars['String']['output'];
  /** Profile Picture url */
  picture?: Maybe<Scalars['String']['output']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']['output'];
};


/** User system model */
export type UserDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean']['input'];
  inheritLocale?: Scalars['Boolean']['input'];
  stages?: Array<Stage>;
};

export type UserConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: UserWhereUniqueInput;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<UserEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type UserCreateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateOneInlineInput = {
  /** Connect one existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: User;
};

/** System User Kind */
export enum UserKind {
  AppToken = 'APP_TOKEN',
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC',
  Webhook = 'WEBHOOK'
}

/** Identifies documents */
export type UserManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
};

export enum UserOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  KindAsc = 'kind_ASC',
  KindDesc = 'kind_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PictureAsc = 'picture_ASC',
  PictureDesc = 'picture_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type UserUpdateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserConnectInput>>;
  /** Disconnect multiple User documents */
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing User documents */
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserUpdateOneInlineInput = {
  /** Connect existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
  /** Disconnect currently connected User document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

/** This contains a set of filters that can be used to compare values internally */
export type UserWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifies documents */
export type UserWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']['input']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']['input']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']['input']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']['input']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']['input']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']['input']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<UserWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References User record uniquely */
export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Version = {
  __typename?: 'Version';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  revision: Scalars['Int']['output'];
  stage: Stage;
};

export type VersionWhereInput = {
  id: Scalars['ID']['input'];
  revision: Scalars['Int']['input'];
  stage: Stage;
};

export enum _FilterKind {
  And = 'AND',
  Not = 'NOT',
  Or = 'OR',
  Contains = 'contains',
  ContainsAll = 'contains_all',
  ContainsNone = 'contains_none',
  ContainsSome = 'contains_some',
  EndsWith = 'ends_with',
  Eq = 'eq',
  EqNot = 'eq_not',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  JsonPathExists = 'json_path_exists',
  JsonValueRecursive = 'json_value_recursive',
  Lt = 'lt',
  Lte = 'lte',
  NotContains = 'not_contains',
  NotEndsWith = 'not_ends_with',
  NotIn = 'not_in',
  NotStartsWith = 'not_starts_with',
  RelationalEvery = 'relational_every',
  RelationalNone = 'relational_none',
  RelationalSingle = 'relational_single',
  RelationalSome = 'relational_some',
  Search = 'search',
  StartsWith = 'starts_with',
  UnionEmpty = 'union_empty',
  UnionEvery = 'union_every',
  UnionNone = 'union_none',
  UnionSingle = 'union_single',
  UnionSome = 'union_some'
}

export enum _MutationInputFieldKind {
  Enum = 'enum',
  Relation = 'relation',
  RichText = 'richText',
  RichTextWithEmbeds = 'richTextWithEmbeds',
  Scalar = 'scalar',
  Union = 'union',
  Virtual = 'virtual'
}

export enum _MutationKind {
  Create = 'create',
  Delete = 'delete',
  DeleteMany = 'deleteMany',
  Publish = 'publish',
  PublishMany = 'publishMany',
  SchedulePublish = 'schedulePublish',
  ScheduleUnpublish = 'scheduleUnpublish',
  Unpublish = 'unpublish',
  UnpublishMany = 'unpublishMany',
  Update = 'update',
  UpdateMany = 'updateMany',
  Upsert = 'upsert'
}

export enum _OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum _RelationInputCardinality {
  Many = 'many',
  One = 'one'
}

export enum _RelationInputKind {
  Create = 'create',
  Update = 'update'
}

export enum _RelationKind {
  Regular = 'regular',
  Union = 'union'
}

export enum _SystemDateTimeFieldVariation {
  Base = 'base',
  Combined = 'combined',
  Localization = 'localization'
}

export type ArchiveEntries = Editorial;

export type ArchiveEntriesConnectInput = {
  Editorial?: InputMaybe<EditorialConnectInput>;
};

export type ArchiveEntriesCreateInput = {
  Editorial?: InputMaybe<EditorialCreateInput>;
};

export type ArchiveEntriesCreateManyInlineInput = {
  /** Connect multiple existing archiveEntries documents */
  connect?: InputMaybe<Array<ArchiveEntriesWhereUniqueInput>>;
  /** Create and connect multiple existing archiveEntries documents */
  create?: InputMaybe<Array<ArchiveEntriesCreateInput>>;
};

export type ArchiveEntriesCreateOneInlineInput = {
  /** Connect one existing archiveEntries document */
  connect?: InputMaybe<ArchiveEntriesWhereUniqueInput>;
  /** Create and connect one archiveEntries document */
  create?: InputMaybe<ArchiveEntriesCreateInput>;
};

export type ArchiveEntriesUpdateInput = {
  Editorial?: InputMaybe<EditorialUpdateInput>;
};

export type ArchiveEntriesUpdateManyInlineInput = {
  /** Connect multiple existing archiveEntries documents */
  connect?: InputMaybe<Array<ArchiveEntriesConnectInput>>;
  /** Create and connect multiple archiveEntries documents */
  create?: InputMaybe<Array<ArchiveEntriesCreateInput>>;
  /** Delete multiple archiveEntries documents */
  delete?: InputMaybe<Array<ArchiveEntriesWhereUniqueInput>>;
  /** Disconnect multiple archiveEntries documents */
  disconnect?: InputMaybe<Array<ArchiveEntriesWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing archiveEntries documents */
  set?: InputMaybe<Array<ArchiveEntriesWhereUniqueInput>>;
  /** Update multiple archiveEntries documents */
  update?: InputMaybe<Array<ArchiveEntriesUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple archiveEntries documents */
  upsert?: InputMaybe<Array<ArchiveEntriesUpsertWithNestedWhereUniqueInput>>;
};

export type ArchiveEntriesUpdateManyWithNestedWhereInput = {
  Editorial?: InputMaybe<EditorialUpdateManyWithNestedWhereInput>;
};

export type ArchiveEntriesUpdateOneInlineInput = {
  /** Connect existing archiveEntries document */
  connect?: InputMaybe<ArchiveEntriesWhereUniqueInput>;
  /** Create and connect one archiveEntries document */
  create?: InputMaybe<ArchiveEntriesCreateInput>;
  /** Delete currently connected archiveEntries document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected archiveEntries document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single archiveEntries document */
  update?: InputMaybe<ArchiveEntriesUpdateWithNestedWhereUniqueInput>;
  /** Upsert single archiveEntries document */
  upsert?: InputMaybe<ArchiveEntriesUpsertWithNestedWhereUniqueInput>;
};

export type ArchiveEntriesUpdateWithNestedWhereUniqueInput = {
  Editorial?: InputMaybe<EditorialUpdateWithNestedWhereUniqueInput>;
};

export type ArchiveEntriesUpsertWithNestedWhereUniqueInput = {
  Editorial?: InputMaybe<EditorialUpsertWithNestedWhereUniqueInput>;
};

export type ArchiveEntriesWhereInput = {
  Editorial?: InputMaybe<EditorialWhereInput>;
};

export type ArchiveEntriesWhereUniqueInput = {
  Editorial?: InputMaybe<EditorialWhereUniqueInput>;
};

export type ContentContent = Form | Gallery | Lock | MixedMedia;

export type ContentContentConnectInput = {
  Form?: InputMaybe<FormConnectInput>;
  Gallery?: InputMaybe<GalleryConnectInput>;
  Lock?: InputMaybe<LockConnectInput>;
  MixedMedia?: InputMaybe<MixedMediaConnectInput>;
};

export type ContentContentCreateInput = {
  Form?: InputMaybe<FormCreateInput>;
  Gallery?: InputMaybe<GalleryCreateInput>;
  Lock?: InputMaybe<LockCreateInput>;
  MixedMedia?: InputMaybe<MixedMediaCreateInput>;
};

export type ContentContentCreateManyInlineInput = {
  /** Connect multiple existing contentContent documents */
  connect?: InputMaybe<Array<ContentContentWhereUniqueInput>>;
  /** Create and connect multiple existing contentContent documents */
  create?: InputMaybe<Array<ContentContentCreateInput>>;
};

export type ContentContentCreateOneInlineInput = {
  /** Connect one existing contentContent document */
  connect?: InputMaybe<ContentContentWhereUniqueInput>;
  /** Create and connect one contentContent document */
  create?: InputMaybe<ContentContentCreateInput>;
};

export type ContentContentUpdateInput = {
  Form?: InputMaybe<FormUpdateInput>;
  Gallery?: InputMaybe<GalleryUpdateInput>;
  Lock?: InputMaybe<LockUpdateInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateInput>;
};

export type ContentContentUpdateManyInlineInput = {
  /** Connect multiple existing contentContent documents */
  connect?: InputMaybe<Array<ContentContentConnectInput>>;
  /** Create and connect multiple contentContent documents */
  create?: InputMaybe<Array<ContentContentCreateInput>>;
  /** Delete multiple contentContent documents */
  delete?: InputMaybe<Array<ContentContentWhereUniqueInput>>;
  /** Disconnect multiple contentContent documents */
  disconnect?: InputMaybe<Array<ContentContentWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing contentContent documents */
  set?: InputMaybe<Array<ContentContentWhereUniqueInput>>;
  /** Update multiple contentContent documents */
  update?: InputMaybe<Array<ContentContentUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple contentContent documents */
  upsert?: InputMaybe<Array<ContentContentUpsertWithNestedWhereUniqueInput>>;
};

export type ContentContentUpdateManyWithNestedWhereInput = {
  Form?: InputMaybe<FormUpdateManyWithNestedWhereInput>;
  Gallery?: InputMaybe<GalleryUpdateManyWithNestedWhereInput>;
  Lock?: InputMaybe<LockUpdateManyWithNestedWhereInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateManyWithNestedWhereInput>;
};

export type ContentContentUpdateOneInlineInput = {
  /** Connect existing contentContent document */
  connect?: InputMaybe<ContentContentWhereUniqueInput>;
  /** Create and connect one contentContent document */
  create?: InputMaybe<ContentContentCreateInput>;
  /** Delete currently connected contentContent document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected contentContent document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single contentContent document */
  update?: InputMaybe<ContentContentUpdateWithNestedWhereUniqueInput>;
  /** Upsert single contentContent document */
  upsert?: InputMaybe<ContentContentUpsertWithNestedWhereUniqueInput>;
};

export type ContentContentUpdateWithNestedWhereUniqueInput = {
  Form?: InputMaybe<FormUpdateWithNestedWhereUniqueInput>;
  Gallery?: InputMaybe<GalleryUpdateWithNestedWhereUniqueInput>;
  Lock?: InputMaybe<LockUpdateWithNestedWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaUpdateWithNestedWhereUniqueInput>;
};

export type ContentContentUpsertWithNestedWhereUniqueInput = {
  Form?: InputMaybe<FormUpsertWithNestedWhereUniqueInput>;
  Gallery?: InputMaybe<GalleryUpsertWithNestedWhereUniqueInput>;
  Lock?: InputMaybe<LockUpsertWithNestedWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaUpsertWithNestedWhereUniqueInput>;
};

export type ContentContentWhereInput = {
  Form?: InputMaybe<FormWhereInput>;
  Gallery?: InputMaybe<GalleryWhereInput>;
  Lock?: InputMaybe<LockWhereInput>;
  MixedMedia?: InputMaybe<MixedMediaWhereInput>;
};

export type ContentContentWhereUniqueInput = {
  Form?: InputMaybe<FormWhereUniqueInput>;
  Gallery?: InputMaybe<GalleryWhereUniqueInput>;
  Lock?: InputMaybe<LockWhereUniqueInput>;
  MixedMedia?: InputMaybe<MixedMediaWhereUniqueInput>;
};

export type CountdownConfigurationPreview = Layout | Page;

export type CountdownConfigurationPreviewConnectInput = {
  Layout?: InputMaybe<LayoutConnectInput>;
  Page?: InputMaybe<PageConnectInput>;
};

export type CountdownConfigurationPreviewCreateInput = {
  Layout?: InputMaybe<LayoutCreateInput>;
  Page?: InputMaybe<PageCreateInput>;
};

export type CountdownConfigurationPreviewCreateManyInlineInput = {
  /** Connect multiple existing countdownConfigurationPreview documents */
  connect?: InputMaybe<Array<CountdownConfigurationPreviewWhereUniqueInput>>;
  /** Create and connect multiple existing countdownConfigurationPreview documents */
  create?: InputMaybe<Array<CountdownConfigurationPreviewCreateInput>>;
};

export type CountdownConfigurationPreviewCreateOneInlineInput = {
  /** Connect one existing countdownConfigurationPreview document */
  connect?: InputMaybe<CountdownConfigurationPreviewWhereUniqueInput>;
  /** Create and connect one countdownConfigurationPreview document */
  create?: InputMaybe<CountdownConfigurationPreviewCreateInput>;
};

export type CountdownConfigurationPreviewUpdateInput = {
  Layout?: InputMaybe<LayoutUpdateInput>;
  Page?: InputMaybe<PageUpdateInput>;
};

export type CountdownConfigurationPreviewUpdateManyInlineInput = {
  /** Connect multiple existing countdownConfigurationPreview documents */
  connect?: InputMaybe<Array<CountdownConfigurationPreviewConnectInput>>;
  /** Create and connect multiple countdownConfigurationPreview documents */
  create?: InputMaybe<Array<CountdownConfigurationPreviewCreateInput>>;
  /** Delete multiple countdownConfigurationPreview documents */
  delete?: InputMaybe<Array<CountdownConfigurationPreviewWhereUniqueInput>>;
  /** Disconnect multiple countdownConfigurationPreview documents */
  disconnect?: InputMaybe<Array<CountdownConfigurationPreviewWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing countdownConfigurationPreview documents */
  set?: InputMaybe<Array<CountdownConfigurationPreviewWhereUniqueInput>>;
  /** Update multiple countdownConfigurationPreview documents */
  update?: InputMaybe<Array<CountdownConfigurationPreviewUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple countdownConfigurationPreview documents */
  upsert?: InputMaybe<Array<CountdownConfigurationPreviewUpsertWithNestedWhereUniqueInput>>;
};

export type CountdownConfigurationPreviewUpdateManyWithNestedWhereInput = {
  Layout?: InputMaybe<LayoutUpdateManyWithNestedWhereInput>;
  Page?: InputMaybe<PageUpdateManyWithNestedWhereInput>;
};

export type CountdownConfigurationPreviewUpdateOneInlineInput = {
  /** Connect existing countdownConfigurationPreview document */
  connect?: InputMaybe<CountdownConfigurationPreviewWhereUniqueInput>;
  /** Create and connect one countdownConfigurationPreview document */
  create?: InputMaybe<CountdownConfigurationPreviewCreateInput>;
  /** Delete currently connected countdownConfigurationPreview document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected countdownConfigurationPreview document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single countdownConfigurationPreview document */
  update?: InputMaybe<CountdownConfigurationPreviewUpdateWithNestedWhereUniqueInput>;
  /** Upsert single countdownConfigurationPreview document */
  upsert?: InputMaybe<CountdownConfigurationPreviewUpsertWithNestedWhereUniqueInput>;
};

export type CountdownConfigurationPreviewUpdateWithNestedWhereUniqueInput = {
  Layout?: InputMaybe<LayoutUpdateWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpdateWithNestedWhereUniqueInput>;
};

export type CountdownConfigurationPreviewUpsertWithNestedWhereUniqueInput = {
  Layout?: InputMaybe<LayoutUpsertWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpsertWithNestedWhereUniqueInput>;
};

export type CountdownConfigurationPreviewWhereInput = {
  Layout?: InputMaybe<LayoutWhereInput>;
  Page?: InputMaybe<PageWhereInput>;
};

export type CountdownConfigurationPreviewWhereUniqueInput = {
  Layout?: InputMaybe<LayoutWhereUniqueInput>;
  Page?: InputMaybe<PageWhereUniqueInput>;
};

export type EventProducts = CombinedListing | Product;

export type EventProductsConnectInput = {
  CombinedListing?: InputMaybe<CombinedListingConnectInput>;
  Product?: InputMaybe<ProductConnectInput>;
};

export type EventProductsCreateInput = {
  CombinedListing?: InputMaybe<CombinedListingCreateInput>;
  Product?: InputMaybe<ProductCreateInput>;
};

export type EventProductsCreateManyInlineInput = {
  /** Connect multiple existing eventProducts documents */
  connect?: InputMaybe<Array<EventProductsWhereUniqueInput>>;
  /** Create and connect multiple existing eventProducts documents */
  create?: InputMaybe<Array<EventProductsCreateInput>>;
};

export type EventProductsCreateOneInlineInput = {
  /** Connect one existing eventProducts document */
  connect?: InputMaybe<EventProductsWhereUniqueInput>;
  /** Create and connect one eventProducts document */
  create?: InputMaybe<EventProductsCreateInput>;
};

export type EventProductsUpdateInput = {
  CombinedListing?: InputMaybe<CombinedListingUpdateInput>;
  Product?: InputMaybe<ProductUpdateInput>;
};

export type EventProductsUpdateManyInlineInput = {
  /** Connect multiple existing eventProducts documents */
  connect?: InputMaybe<Array<EventProductsConnectInput>>;
  /** Create and connect multiple eventProducts documents */
  create?: InputMaybe<Array<EventProductsCreateInput>>;
  /** Delete multiple eventProducts documents */
  delete?: InputMaybe<Array<EventProductsWhereUniqueInput>>;
  /** Disconnect multiple eventProducts documents */
  disconnect?: InputMaybe<Array<EventProductsWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing eventProducts documents */
  set?: InputMaybe<Array<EventProductsWhereUniqueInput>>;
  /** Update multiple eventProducts documents */
  update?: InputMaybe<Array<EventProductsUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple eventProducts documents */
  upsert?: InputMaybe<Array<EventProductsUpsertWithNestedWhereUniqueInput>>;
};

export type EventProductsUpdateManyWithNestedWhereInput = {
  CombinedListing?: InputMaybe<CombinedListingUpdateManyWithNestedWhereInput>;
  Product?: InputMaybe<ProductUpdateManyWithNestedWhereInput>;
};

export type EventProductsUpdateOneInlineInput = {
  /** Connect existing eventProducts document */
  connect?: InputMaybe<EventProductsWhereUniqueInput>;
  /** Create and connect one eventProducts document */
  create?: InputMaybe<EventProductsCreateInput>;
  /** Delete currently connected eventProducts document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected eventProducts document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single eventProducts document */
  update?: InputMaybe<EventProductsUpdateWithNestedWhereUniqueInput>;
  /** Upsert single eventProducts document */
  upsert?: InputMaybe<EventProductsUpsertWithNestedWhereUniqueInput>;
};

export type EventProductsUpdateWithNestedWhereUniqueInput = {
  CombinedListing?: InputMaybe<CombinedListingUpdateWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpdateWithNestedWhereUniqueInput>;
};

export type EventProductsUpsertWithNestedWhereUniqueInput = {
  CombinedListing?: InputMaybe<CombinedListingUpsertWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpsertWithNestedWhereUniqueInput>;
};

export type EventProductsWhereInput = {
  CombinedListing?: InputMaybe<CombinedListingWhereInput>;
  Product?: InputMaybe<ProductWhereInput>;
};

export type EventProductsWhereUniqueInput = {
  CombinedListing?: InputMaybe<CombinedListingWhereUniqueInput>;
  Product?: InputMaybe<ProductWhereUniqueInput>;
};

export type LockExemptionExemptions = Collection | Editorial | Page | Product;

export type LockExemptionExemptionsConnectInput = {
  Collection?: InputMaybe<CollectionConnectInput>;
  Editorial?: InputMaybe<EditorialConnectInput>;
  Page?: InputMaybe<PageConnectInput>;
  Product?: InputMaybe<ProductConnectInput>;
};

export type LockExemptionExemptionsCreateInput = {
  Collection?: InputMaybe<CollectionCreateInput>;
  Editorial?: InputMaybe<EditorialCreateInput>;
  Page?: InputMaybe<PageCreateInput>;
  Product?: InputMaybe<ProductCreateInput>;
};

export type LockExemptionExemptionsCreateManyInlineInput = {
  /** Connect multiple existing lockExemptionExemptions documents */
  connect?: InputMaybe<Array<LockExemptionExemptionsWhereUniqueInput>>;
  /** Create and connect multiple existing lockExemptionExemptions documents */
  create?: InputMaybe<Array<LockExemptionExemptionsCreateInput>>;
};

export type LockExemptionExemptionsCreateOneInlineInput = {
  /** Connect one existing lockExemptionExemptions document */
  connect?: InputMaybe<LockExemptionExemptionsWhereUniqueInput>;
  /** Create and connect one lockExemptionExemptions document */
  create?: InputMaybe<LockExemptionExemptionsCreateInput>;
};

export type LockExemptionExemptionsUpdateInput = {
  Collection?: InputMaybe<CollectionUpdateInput>;
  Editorial?: InputMaybe<EditorialUpdateInput>;
  Page?: InputMaybe<PageUpdateInput>;
  Product?: InputMaybe<ProductUpdateInput>;
};

export type LockExemptionExemptionsUpdateManyInlineInput = {
  /** Connect multiple existing lockExemptionExemptions documents */
  connect?: InputMaybe<Array<LockExemptionExemptionsConnectInput>>;
  /** Create and connect multiple lockExemptionExemptions documents */
  create?: InputMaybe<Array<LockExemptionExemptionsCreateInput>>;
  /** Delete multiple lockExemptionExemptions documents */
  delete?: InputMaybe<Array<LockExemptionExemptionsWhereUniqueInput>>;
  /** Disconnect multiple lockExemptionExemptions documents */
  disconnect?: InputMaybe<Array<LockExemptionExemptionsWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing lockExemptionExemptions documents */
  set?: InputMaybe<Array<LockExemptionExemptionsWhereUniqueInput>>;
  /** Update multiple lockExemptionExemptions documents */
  update?: InputMaybe<Array<LockExemptionExemptionsUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple lockExemptionExemptions documents */
  upsert?: InputMaybe<Array<LockExemptionExemptionsUpsertWithNestedWhereUniqueInput>>;
};

export type LockExemptionExemptionsUpdateManyWithNestedWhereInput = {
  Collection?: InputMaybe<CollectionUpdateManyWithNestedWhereInput>;
  Editorial?: InputMaybe<EditorialUpdateManyWithNestedWhereInput>;
  Page?: InputMaybe<PageUpdateManyWithNestedWhereInput>;
  Product?: InputMaybe<ProductUpdateManyWithNestedWhereInput>;
};

export type LockExemptionExemptionsUpdateOneInlineInput = {
  /** Connect existing lockExemptionExemptions document */
  connect?: InputMaybe<LockExemptionExemptionsWhereUniqueInput>;
  /** Create and connect one lockExemptionExemptions document */
  create?: InputMaybe<LockExemptionExemptionsCreateInput>;
  /** Delete currently connected lockExemptionExemptions document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected lockExemptionExemptions document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single lockExemptionExemptions document */
  update?: InputMaybe<LockExemptionExemptionsUpdateWithNestedWhereUniqueInput>;
  /** Upsert single lockExemptionExemptions document */
  upsert?: InputMaybe<LockExemptionExemptionsUpsertWithNestedWhereUniqueInput>;
};

export type LockExemptionExemptionsUpdateWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpdateWithNestedWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialUpdateWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpdateWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpdateWithNestedWhereUniqueInput>;
};

export type LockExemptionExemptionsUpsertWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpsertWithNestedWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialUpsertWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpsertWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpsertWithNestedWhereUniqueInput>;
};

export type LockExemptionExemptionsWhereInput = {
  Collection?: InputMaybe<CollectionWhereInput>;
  Editorial?: InputMaybe<EditorialWhereInput>;
  Page?: InputMaybe<PageWhereInput>;
  Product?: InputMaybe<ProductWhereInput>;
};

export type LockExemptionExemptionsWhereUniqueInput = {
  Collection?: InputMaybe<CollectionWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialWhereUniqueInput>;
  Page?: InputMaybe<PageWhereUniqueInput>;
  Product?: InputMaybe<ProductWhereUniqueInput>;
};

export type LockPageLocks = Collection | Editorial | Page | Product;

export type LockPageLocksConnectInput = {
  Collection?: InputMaybe<CollectionConnectInput>;
  Editorial?: InputMaybe<EditorialConnectInput>;
  Page?: InputMaybe<PageConnectInput>;
  Product?: InputMaybe<ProductConnectInput>;
};

export type LockPageLocksCreateInput = {
  Collection?: InputMaybe<CollectionCreateInput>;
  Editorial?: InputMaybe<EditorialCreateInput>;
  Page?: InputMaybe<PageCreateInput>;
  Product?: InputMaybe<ProductCreateInput>;
};

export type LockPageLocksCreateManyInlineInput = {
  /** Connect multiple existing lockPageLocks documents */
  connect?: InputMaybe<Array<LockPageLocksWhereUniqueInput>>;
  /** Create and connect multiple existing lockPageLocks documents */
  create?: InputMaybe<Array<LockPageLocksCreateInput>>;
};

export type LockPageLocksCreateOneInlineInput = {
  /** Connect one existing lockPageLocks document */
  connect?: InputMaybe<LockPageLocksWhereUniqueInput>;
  /** Create and connect one lockPageLocks document */
  create?: InputMaybe<LockPageLocksCreateInput>;
};

export type LockPageLocksUpdateInput = {
  Collection?: InputMaybe<CollectionUpdateInput>;
  Editorial?: InputMaybe<EditorialUpdateInput>;
  Page?: InputMaybe<PageUpdateInput>;
  Product?: InputMaybe<ProductUpdateInput>;
};

export type LockPageLocksUpdateManyInlineInput = {
  /** Connect multiple existing lockPageLocks documents */
  connect?: InputMaybe<Array<LockPageLocksConnectInput>>;
  /** Create and connect multiple lockPageLocks documents */
  create?: InputMaybe<Array<LockPageLocksCreateInput>>;
  /** Delete multiple lockPageLocks documents */
  delete?: InputMaybe<Array<LockPageLocksWhereUniqueInput>>;
  /** Disconnect multiple lockPageLocks documents */
  disconnect?: InputMaybe<Array<LockPageLocksWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing lockPageLocks documents */
  set?: InputMaybe<Array<LockPageLocksWhereUniqueInput>>;
  /** Update multiple lockPageLocks documents */
  update?: InputMaybe<Array<LockPageLocksUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple lockPageLocks documents */
  upsert?: InputMaybe<Array<LockPageLocksUpsertWithNestedWhereUniqueInput>>;
};

export type LockPageLocksUpdateManyWithNestedWhereInput = {
  Collection?: InputMaybe<CollectionUpdateManyWithNestedWhereInput>;
  Editorial?: InputMaybe<EditorialUpdateManyWithNestedWhereInput>;
  Page?: InputMaybe<PageUpdateManyWithNestedWhereInput>;
  Product?: InputMaybe<ProductUpdateManyWithNestedWhereInput>;
};

export type LockPageLocksUpdateOneInlineInput = {
  /** Connect existing lockPageLocks document */
  connect?: InputMaybe<LockPageLocksWhereUniqueInput>;
  /** Create and connect one lockPageLocks document */
  create?: InputMaybe<LockPageLocksCreateInput>;
  /** Delete currently connected lockPageLocks document */
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Disconnect currently connected lockPageLocks document */
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  /** Update single lockPageLocks document */
  update?: InputMaybe<LockPageLocksUpdateWithNestedWhereUniqueInput>;
  /** Upsert single lockPageLocks document */
  upsert?: InputMaybe<LockPageLocksUpsertWithNestedWhereUniqueInput>;
};

export type LockPageLocksUpdateWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpdateWithNestedWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialUpdateWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpdateWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpdateWithNestedWhereUniqueInput>;
};

export type LockPageLocksUpsertWithNestedWhereUniqueInput = {
  Collection?: InputMaybe<CollectionUpsertWithNestedWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialUpsertWithNestedWhereUniqueInput>;
  Page?: InputMaybe<PageUpsertWithNestedWhereUniqueInput>;
  Product?: InputMaybe<ProductUpsertWithNestedWhereUniqueInput>;
};

export type LockPageLocksWhereInput = {
  Collection?: InputMaybe<CollectionWhereInput>;
  Editorial?: InputMaybe<EditorialWhereInput>;
  Page?: InputMaybe<PageWhereInput>;
  Product?: InputMaybe<ProductWhereInput>;
};

export type LockPageLocksWhereUniqueInput = {
  Collection?: InputMaybe<CollectionWhereUniqueInput>;
  Editorial?: InputMaybe<EditorialWhereUniqueInput>;
  Page?: InputMaybe<PageWhereUniqueInput>;
  Product?: InputMaybe<ProductWhereUniqueInput>;
};


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "BlockParent": [
      "LockedSection"
    ],
    "CustomizedSectionContent": [
      "Collection",
      "MixedMedia"
    ],
    "DisplayOptionParent": [
      "Block"
    ],
    "EditorialArtistStatementRichTextEmbeddedTypes": [
      "Form"
    ],
    "EditorialMainContentRichTextEmbeddedTypes": [
      "Asset",
      "Form",
      "Gallery"
    ],
    "Entity": [
      "Archive",
      "Asset",
      "Block",
      "Collection",
      "CombinedListing",
      "CountdownComponent",
      "CustomizedSection",
      "DisplayOption",
      "Editorial",
      "Event",
      "Form",
      "Gallery",
      "Hero",
      "Layout",
      "Link",
      "Lock",
      "LockedSection",
      "MixedMedia",
      "Navigation",
      "Page",
      "Person",
      "Product",
      "ScheduledOperation",
      "ScheduledRelease",
      "Seo",
      "Theme",
      "User"
    ],
    "LayoutHero": [
      "Collection",
      "Editorial",
      "Event",
      "MixedMedia",
      "Page",
      "Product"
    ],
    "LayoutSections": [
      "Archive",
      "Collection",
      "CustomizedSection",
      "Event",
      "Form",
      "Gallery",
      "Lock",
      "MixedMedia",
      "Product"
    ],
    "LinkInternalTarget": [
      "Collection",
      "Editorial",
      "Event",
      "Page",
      "Product"
    ],
    "LinkParent": [
      "MixedMedia",
      "Navigation"
    ],
    "MixedMediaBodyRichTextEmbeddedTypes": [
      "Asset",
      "Collection",
      "Form",
      "Lock",
      "Page",
      "Product"
    ],
    "Node": [
      "Archive",
      "Asset",
      "Collection",
      "CombinedListing",
      "CustomizedSection",
      "Editorial",
      "Event",
      "Form",
      "Gallery",
      "Layout",
      "Lock",
      "MixedMedia",
      "Navigation",
      "Page",
      "Person",
      "Product",
      "ScheduledOperation",
      "ScheduledRelease",
      "Seo",
      "Theme",
      "User"
    ],
    "ScheduledOperationAffectedDocument": [
      "Archive",
      "Asset",
      "Collection",
      "CombinedListing",
      "CustomizedSection",
      "Editorial",
      "Event",
      "Form",
      "Gallery",
      "Layout",
      "Lock",
      "MixedMedia",
      "Navigation",
      "Page",
      "Person",
      "Product",
      "Seo",
      "Theme"
    ],
    "archiveEntries": [
      "Editorial"
    ],
    "contentContent": [
      "Form",
      "Gallery",
      "Lock",
      "MixedMedia"
    ],
    "countdownConfigurationPreview": [
      "Layout",
      "Page"
    ],
    "eventProducts": [
      "CombinedListing",
      "Product"
    ],
    "lockExemptionExemptions": [
      "Collection",
      "Editorial",
      "Page",
      "Product"
    ],
    "lockPageLocks": [
      "Collection",
      "Editorial",
      "Page",
      "Product"
    ]
  }
};
      export default result;
    
export type CollectionFragment = { __typename?: 'Collection', gid: string };

export type EditorialContentFragment = { __typename?: 'EditorialMainContentRichText', json: any, references: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | { __typename?: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename?: 'Gallery', id: string, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> }> };

export type FormFragment = { __typename?: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string };

export type GalleryFragment = { __typename?: 'Gallery', id: string, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> };

type Heroes_Collection_Fragment = { __typename: 'Collection', id: string, gid: string };

type Heroes_Editorial_Fragment = { __typename: 'Editorial', id: string, title?: string | null, slug: string, excerpt?: { __typename?: 'RichText', html: string } | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null };

type Heroes_Event_Fragment = { __typename: 'Event', id: string, title?: string | null, date?: any | null, hasReleasePage: boolean, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, excerpt?: { __typename?: 'RichText', html: string } | null };

type Heroes_MixedMedia_Fragment = { __typename: 'MixedMedia', id: string, title?: string | null, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, excerpt?: { __typename?: 'MixedMediaBodyRichText', html: string } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> };

type Heroes_Page_Fragment = { __typename: 'Page', id: string, title?: string | null, slug: string, staticPage?: StaticPage | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null };

type Heroes_Product_Fragment = { __typename: 'Product', id: string, gid: string };

export type HeroesFragment = Heroes_Collection_Fragment | Heroes_Editorial_Fragment | Heroes_Event_Fragment | Heroes_MixedMedia_Fragment | Heroes_Page_Fragment | Heroes_Product_Fragment;

export type ProductGidFragment = { __typename?: 'Product', gid: string };

export type LayoutFragment = { __typename?: 'Layout', id: string, headerStyle?: HeaderStyle | null, footerStyle?: FooterStyle | null, title?: string | null, displayTitle?: boolean | null, mirrorLayout?: boolean | null, theme?: { __typename?: 'Theme', slug: string } | null, heroes: Array<{ __typename: 'Collection', id: string, gid: string } | { __typename: 'Editorial', id: string, title?: string | null, slug: string, excerpt?: { __typename?: 'RichText', html: string } | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Event', id: string, title?: string | null, date?: any | null, hasReleasePage: boolean, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, excerpt?: { __typename?: 'RichText', html: string } | null } | { __typename: 'MixedMedia', id: string, title?: string | null, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, excerpt?: { __typename?: 'MixedMediaBodyRichText', html: string } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> } | { __typename: 'Page', id: string, title?: string | null, slug: string, staticPage?: StaticPage | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Product', id: string, gid: string }>, sections: Array<{ __typename: 'Archive', id: string, stage: Stage } | { __typename: 'Collection', id: string, stage: Stage } | { __typename: 'CustomizedSection', id: string, stage: Stage } | { __typename: 'Event', id: string, stage: Stage } | { __typename: 'Form', id: string, stage: Stage } | { __typename: 'Gallery', id: string, stage: Stage } | { __typename: 'Lock', id: string, stage: Stage } | { __typename: 'MixedMedia', id: string, stage: Stage } | { __typename: 'Product', id: string, stage: Stage }> };

export type LayoutContentFragment = { __typename?: 'Layout', id: string, title?: string | null, displayTitle?: boolean | null, mirrorLayout?: boolean | null, heroes: Array<{ __typename: 'Collection', id: string, gid: string } | { __typename: 'Editorial', id: string, title?: string | null, slug: string, excerpt?: { __typename?: 'RichText', html: string } | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Event', id: string, title?: string | null, date?: any | null, hasReleasePage: boolean, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, excerpt?: { __typename?: 'RichText', html: string } | null } | { __typename: 'MixedMedia', id: string, title?: string | null, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, excerpt?: { __typename?: 'MixedMediaBodyRichText', html: string } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> } | { __typename: 'Page', id: string, title?: string | null, slug: string, staticPage?: StaticPage | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Product', id: string, gid: string }>, sections: Array<{ __typename: 'Archive', id: string, stage: Stage } | { __typename: 'Collection', id: string, stage: Stage } | { __typename: 'CustomizedSection', id: string, stage: Stage } | { __typename: 'Event', id: string, stage: Stage } | { __typename: 'Form', id: string, stage: Stage } | { __typename: 'Gallery', id: string, stage: Stage } | { __typename: 'Lock', id: string, stage: Stage } | { __typename: 'MixedMedia', id: string, stage: Stage } | { __typename: 'Product', id: string, stage: Stage }> };

type Entity_Archive_Fragment = { __typename: 'Archive', id: string, stage: Stage };

type Entity_Asset_Fragment = { __typename: 'Asset', id: string, stage: Stage };

type Entity_Block_Fragment = { __typename: 'Block', id: string, stage: Stage };

type Entity_Collection_Fragment = { __typename: 'Collection', id: string, stage: Stage };

type Entity_CombinedListing_Fragment = { __typename: 'CombinedListing', id: string, stage: Stage };

type Entity_CountdownComponent_Fragment = { __typename: 'CountdownComponent', id: string, stage: Stage };

type Entity_CustomizedSection_Fragment = { __typename: 'CustomizedSection', id: string, stage: Stage };

type Entity_DisplayOption_Fragment = { __typename: 'DisplayOption', id: string, stage: Stage };

type Entity_Editorial_Fragment = { __typename: 'Editorial', id: string, stage: Stage };

type Entity_Event_Fragment = { __typename: 'Event', id: string, stage: Stage };

type Entity_Form_Fragment = { __typename: 'Form', id: string, stage: Stage };

type Entity_Gallery_Fragment = { __typename: 'Gallery', id: string, stage: Stage };

type Entity_Hero_Fragment = { __typename: 'Hero', id: string, stage: Stage };

type Entity_Layout_Fragment = { __typename: 'Layout', id: string, stage: Stage };

type Entity_Link_Fragment = { __typename: 'Link', id: string, stage: Stage };

type Entity_Lock_Fragment = { __typename: 'Lock', id: string, stage: Stage };

type Entity_LockedSection_Fragment = { __typename: 'LockedSection', id: string, stage: Stage };

type Entity_MixedMedia_Fragment = { __typename: 'MixedMedia', id: string, stage: Stage };

type Entity_Navigation_Fragment = { __typename: 'Navigation', id: string, stage: Stage };

type Entity_Page_Fragment = { __typename: 'Page', id: string, stage: Stage };

type Entity_Person_Fragment = { __typename: 'Person', id: string, stage: Stage };

type Entity_Product_Fragment = { __typename: 'Product', id: string, stage: Stage };

type Entity_ScheduledOperation_Fragment = { __typename: 'ScheduledOperation', id: string, stage: Stage };

type Entity_ScheduledRelease_Fragment = { __typename: 'ScheduledRelease', id: string, stage: Stage };

type Entity_Seo_Fragment = { __typename: 'Seo', id: string, stage: Stage };

type Entity_Theme_Fragment = { __typename: 'Theme', id: string, stage: Stage };

type Entity_User_Fragment = { __typename: 'User', id: string, stage: Stage };

export type EntityFragment = Entity_Archive_Fragment | Entity_Asset_Fragment | Entity_Block_Fragment | Entity_Collection_Fragment | Entity_CombinedListing_Fragment | Entity_CountdownComponent_Fragment | Entity_CustomizedSection_Fragment | Entity_DisplayOption_Fragment | Entity_Editorial_Fragment | Entity_Event_Fragment | Entity_Form_Fragment | Entity_Gallery_Fragment | Entity_Hero_Fragment | Entity_Layout_Fragment | Entity_Link_Fragment | Entity_Lock_Fragment | Entity_LockedSection_Fragment | Entity_MixedMedia_Fragment | Entity_Navigation_Fragment | Entity_Page_Fragment | Entity_Person_Fragment | Entity_Product_Fragment | Entity_ScheduledOperation_Fragment | Entity_ScheduledRelease_Fragment | Entity_Seo_Fragment | Entity_Theme_Fragment | Entity_User_Fragment;

export type LinkFragment = { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null };

export type LockFragment = { __typename?: 'Lock', slug: string, id: string, isEnabled: boolean, isGlobal: boolean, password?: string | null, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean, pageLocks: Array<{ __typename?: 'Collection', slug: string } | { __typename?: 'Editorial', slug: string } | { __typename?: 'Page', slug: string } | { __typename?: 'Product', slug: string }>, exemptions: Array<{ __typename?: 'Collection', slug: string } | { __typename?: 'Editorial', slug: string } | { __typename?: 'Page', slug: string } | { __typename?: 'Product', slug: string }>, background?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, customLockScreen?: { __typename?: 'Layout', id: string, headerStyle?: HeaderStyle | null, footerStyle?: FooterStyle | null, title?: string | null, displayTitle?: boolean | null, mirrorLayout?: boolean | null, theme?: { __typename?: 'Theme', slug: string } | null, heroes: Array<{ __typename: 'Collection', id: string, gid: string } | { __typename: 'Editorial', id: string, title?: string | null, slug: string, excerpt?: { __typename?: 'RichText', html: string } | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Event', id: string, title?: string | null, date?: any | null, hasReleasePage: boolean, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, excerpt?: { __typename?: 'RichText', html: string } | null } | { __typename: 'MixedMedia', id: string, title?: string | null, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, excerpt?: { __typename?: 'MixedMediaBodyRichText', html: string } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> } | { __typename: 'Page', id: string, title?: string | null, slug: string, staticPage?: StaticPage | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Product', id: string, gid: string }>, sections: Array<{ __typename: 'Archive', id: string, stage: Stage } | { __typename: 'Collection', id: string, stage: Stage } | { __typename: 'CustomizedSection', id: string, stage: Stage } | { __typename: 'Event', id: string, stage: Stage } | { __typename: 'Form', id: string, stage: Stage } | { __typename: 'Gallery', id: string, stage: Stage } | { __typename: 'Lock', id: string, stage: Stage } | { __typename: 'MixedMedia', id: string, stage: Stage } | { __typename: 'Product', id: string, stage: Stage }> } | null };

export type LockSectionFragment = { __typename?: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean };

export type NavigationFragment = { __typename?: 'Navigation', slug?: string | null, id: string, title?: string | null, links: Array<{ __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null }> };

export type PersonFragment = { __typename?: 'Person', name: string, role?: string | null };

export type ProductFragment = { __typename?: 'Product', title?: string | null, gid: string };

export type ResponsiveAssetFragment = { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null };

export type AssetDetailsFragment = { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string };

export type SeoFragment = { __typename?: 'Seo', title: string, hasTitleTemplate?: boolean | null, description: string, noIndex: boolean, image?: { __typename?: 'Asset', url: string, height?: number | null, width?: number | null, alt?: string | null } | null };

export type ThemeFragment = { __typename?: 'Theme', radius?: Sizes | null, id: string, slug: string, foreground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, background?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, card?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, cardForeground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, primary?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, secondary?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, muted?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, mutedForeground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, destructive?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, destructiveForeground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, border?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, ring?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, inputColor?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null };

export type ColorSchemeFragment = { __typename?: 'Theme', foreground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, background?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, card?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, cardForeground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, primary?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, secondary?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, muted?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, mutedForeground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, destructive?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, destructiveForeground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, border?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, ring?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, inputColor?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null };

export type EventBlockFragment = { __typename?: 'Event', id: string, title?: string | null, date?: any | null, hasReleasePage: boolean, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, excerpt?: { __typename?: 'RichText', raw: any } | null };

export type MixedMediaFragment = { __typename?: 'MixedMedia', id: string, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, body?: { __typename?: 'MixedMediaBodyRichText', json: any, references: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | { __typename: 'Collection' } | { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean } | { __typename: 'Page', id: string } | { __typename: 'Product' }> } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> };

export type RichTextFragment = { __typename?: 'MixedMediaBodyRichText', json: any, references: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | { __typename: 'Collection' } | { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean } | { __typename: 'Page', id: string } | { __typename: 'Product' }> };

type Block_Archive_Fragment = { __typename: 'Archive', id: string, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }>, entries: Array<{ __typename?: 'Editorial', id: string, title?: string | null, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null }> };

type Block_Asset_Fragment = { __typename?: 'Asset', id: string };

type Block_Block_Fragment = { __typename?: 'Block', id: string };

type Block_Collection_Fragment = { __typename: 'Collection', id: string, gid: string };

type Block_CombinedListing_Fragment = { __typename?: 'CombinedListing', id: string };

type Block_CountdownComponent_Fragment = { __typename?: 'CountdownComponent', id: string };

type Block_CustomizedSection_Fragment = { __typename: 'CustomizedSection', id: string, reverseLayout?: boolean | null, alternateLayout?: AlternateSectionLayout | null, heading?: string | null, verticalPadding?: Sizes | null, horizontalPadding?: Sizes | null, theme?: { __typename?: 'Theme', slug: string } | null, content?: { __typename: 'Collection', id: string, gid: string } | { __typename: 'MixedMedia', id: string, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, body?: { __typename?: 'MixedMediaBodyRichText', json: any, references: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | { __typename: 'Collection' } | { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean } | { __typename: 'Page', id: string } | { __typename: 'Product' }> } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> } | null };

type Block_DisplayOption_Fragment = { __typename?: 'DisplayOption', id: string };

type Block_Editorial_Fragment = { __typename?: 'Editorial', id: string };

type Block_Event_Fragment = { __typename: 'Event', id: string };

type Block_Form_Fragment = { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string };

type Block_Gallery_Fragment = { __typename: 'Gallery', id: string, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> };

type Block_Hero_Fragment = { __typename?: 'Hero', id: string };

type Block_Layout_Fragment = { __typename?: 'Layout', id: string };

type Block_Link_Fragment = { __typename?: 'Link', id: string };

type Block_Lock_Fragment = { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean };

type Block_LockedSection_Fragment = { __typename?: 'LockedSection', id: string };

type Block_MixedMedia_Fragment = { __typename: 'MixedMedia', id: string, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, body?: { __typename?: 'MixedMediaBodyRichText', json: any, references: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | { __typename: 'Collection' } | { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean } | { __typename: 'Page', id: string } | { __typename: 'Product' }> } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> };

type Block_Navigation_Fragment = { __typename?: 'Navigation', id: string };

type Block_Page_Fragment = { __typename?: 'Page', id: string };

type Block_Person_Fragment = { __typename?: 'Person', id: string };

type Block_Product_Fragment = { __typename: 'Product', id: string, gid: string };

type Block_ScheduledOperation_Fragment = { __typename?: 'ScheduledOperation', id: string };

type Block_ScheduledRelease_Fragment = { __typename?: 'ScheduledRelease', id: string };

type Block_Seo_Fragment = { __typename?: 'Seo', id: string };

type Block_Theme_Fragment = { __typename?: 'Theme', id: string };

type Block_User_Fragment = { __typename?: 'User', id: string };

export type BlockFragment = Block_Archive_Fragment | Block_Asset_Fragment | Block_Block_Fragment | Block_Collection_Fragment | Block_CombinedListing_Fragment | Block_CountdownComponent_Fragment | Block_CustomizedSection_Fragment | Block_DisplayOption_Fragment | Block_Editorial_Fragment | Block_Event_Fragment | Block_Form_Fragment | Block_Gallery_Fragment | Block_Hero_Fragment | Block_Layout_Fragment | Block_Link_Fragment | Block_Lock_Fragment | Block_LockedSection_Fragment | Block_MixedMedia_Fragment | Block_Navigation_Fragment | Block_Page_Fragment | Block_Person_Fragment | Block_Product_Fragment | Block_ScheduledOperation_Fragment | Block_ScheduledRelease_Fragment | Block_Seo_Fragment | Block_Theme_Fragment | Block_User_Fragment;

export type BlockSettingsFragment = { __typename?: 'CustomizedSection', reverseLayout?: boolean | null, alternateLayout?: AlternateSectionLayout | null, heading?: string | null, verticalPadding?: Sizes | null, horizontalPadding?: Sizes | null, theme?: { __typename?: 'Theme', slug: string } | null };

export type SpacingFragment = { __typename?: 'CustomizedSection', verticalPadding?: Sizes | null, horizontalPadding?: Sizes | null };

type BlockPrimitive_Archive_Fragment = { __typename: 'Archive', id: string, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }>, entries: Array<{ __typename?: 'Editorial', id: string, title?: string | null, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null }> };

type BlockPrimitive_Collection_Fragment = { __typename: 'Collection', id: string, gid: string };

type BlockPrimitive_CustomizedSection_Fragment = { __typename: 'CustomizedSection' };

type BlockPrimitive_Event_Fragment = { __typename: 'Event', id: string };

type BlockPrimitive_Form_Fragment = { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string };

type BlockPrimitive_Gallery_Fragment = { __typename: 'Gallery', id: string, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> };

type BlockPrimitive_Lock_Fragment = { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean };

type BlockPrimitive_MixedMedia_Fragment = { __typename: 'MixedMedia', id: string, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, body?: { __typename?: 'MixedMediaBodyRichText', json: any, references: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | { __typename: 'Collection' } | { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean } | { __typename: 'Page', id: string } | { __typename: 'Product' }> } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> };

type BlockPrimitive_Product_Fragment = { __typename: 'Product', gid: string, id: string };

export type BlockPrimitiveFragment = BlockPrimitive_Archive_Fragment | BlockPrimitive_Collection_Fragment | BlockPrimitive_CustomizedSection_Fragment | BlockPrimitive_Event_Fragment | BlockPrimitive_Form_Fragment | BlockPrimitive_Gallery_Fragment | BlockPrimitive_Lock_Fragment | BlockPrimitive_MixedMedia_Fragment | BlockPrimitive_Product_Fragment;

export type GetEditorialQueryVariables = Exact<{
  where: EditorialWhereUniqueInput;
}>;


export type GetEditorialQuery = { __typename?: 'Query', editorial?: { __typename?: 'Editorial', title?: string | null, id: string, publishedAt?: any | null, seo?: { __typename?: 'Seo', title: string, hasTitleTemplate?: boolean | null, description: string, noIndex: boolean, image?: { __typename?: 'Asset', url: string, height?: number | null, width?: number | null, alt?: string | null } | null } | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, credits: Array<{ __typename?: 'Person', name: string, role?: string | null }>, artistStatement?: { __typename?: 'EditorialArtistStatementRichText', json: any, references: Array<{ __typename?: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string }> } | null, excerpt?: { __typename?: 'RichText', text: string } | null, mainContent?: { __typename?: 'EditorialMainContentRichText', html: string, json: any, references: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | { __typename?: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename?: 'Gallery', id: string, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> }> } | null } | null };

export type GetEntitiesQueryVariables = Exact<{
  where: Array<EntityWhereInput> | EntityWhereInput;
}>;


export type GetEntitiesQuery = { __typename?: 'Query', entities?: Array<{ __typename: 'Archive', id: string, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }>, entries: Array<{ __typename?: 'Editorial', id: string, title?: string | null, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null }> } | { __typename?: 'Asset', id: string } | { __typename?: 'Block', id: string } | { __typename: 'Collection', id: string, gid: string } | { __typename?: 'CombinedListing', id: string } | { __typename?: 'CountdownComponent', id: string } | { __typename: 'CustomizedSection', id: string, reverseLayout?: boolean | null, alternateLayout?: AlternateSectionLayout | null, heading?: string | null, verticalPadding?: Sizes | null, horizontalPadding?: Sizes | null, theme?: { __typename?: 'Theme', slug: string } | null, content?: { __typename: 'Collection', id: string, gid: string } | { __typename: 'MixedMedia', id: string, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, body?: { __typename?: 'MixedMediaBodyRichText', json: any, references: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | { __typename: 'Collection' } | { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean } | { __typename: 'Page', id: string } | { __typename: 'Product' }> } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> } | null } | { __typename?: 'DisplayOption', id: string } | { __typename?: 'Editorial', id: string } | { __typename: 'Event', id: string } | { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename: 'Gallery', id: string, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> } | { __typename?: 'Hero', id: string } | { __typename?: 'Layout', id: string } | { __typename?: 'Link', id: string } | { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean } | { __typename?: 'LockedSection', id: string } | { __typename: 'MixedMedia', id: string, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, body?: { __typename?: 'MixedMediaBodyRichText', json: any, references: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | { __typename: 'Collection' } | { __typename: 'Form', id: string, type?: FormTypes | null, submitButtonLabel: string } | { __typename: 'Lock', id: string, isEnabled: boolean, isGlobal: boolean, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean } | { __typename: 'Page', id: string } | { __typename: 'Product' }> } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> } | { __typename?: 'Navigation', id: string } | { __typename?: 'Page', id: string } | { __typename?: 'Person', id: string } | { __typename: 'Product', id: string, gid: string } | { __typename?: 'ScheduledOperation', id: string } | { __typename?: 'ScheduledRelease', id: string } | { __typename?: 'Seo', id: string } | { __typename?: 'Theme', id: string } | { __typename?: 'User', id: string }> | null };

export type GetGlobalsQueryVariables = Exact<{
  locksWhere: LockWhereInput;
  layoutsWhere: LayoutWhereInput;
}>;


export type GetGlobalsQuery = { __typename?: 'Query', locks: Array<{ __typename?: 'Lock', slug: string, id: string, isEnabled: boolean, isGlobal: boolean, password?: string | null, scheduledUnlockTime?: any | null, alwaysUnlockForAuthenticatedUser: boolean, alwaysUnlockOnTime: boolean, pageLocks: Array<{ __typename?: 'Collection', slug: string } | { __typename?: 'Editorial', slug: string } | { __typename?: 'Page', slug: string } | { __typename?: 'Product', slug: string }>, exemptions: Array<{ __typename?: 'Collection', slug: string } | { __typename?: 'Editorial', slug: string } | { __typename?: 'Page', slug: string } | { __typename?: 'Product', slug: string }>, background?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, customLockScreen?: { __typename?: 'Layout', id: string, headerStyle?: HeaderStyle | null, footerStyle?: FooterStyle | null, title?: string | null, displayTitle?: boolean | null, mirrorLayout?: boolean | null, theme?: { __typename?: 'Theme', slug: string } | null, heroes: Array<{ __typename: 'Collection', id: string, gid: string } | { __typename: 'Editorial', id: string, title?: string | null, slug: string, excerpt?: { __typename?: 'RichText', html: string } | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Event', id: string, title?: string | null, date?: any | null, hasReleasePage: boolean, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, excerpt?: { __typename?: 'RichText', html: string } | null } | { __typename: 'MixedMedia', id: string, title?: string | null, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, excerpt?: { __typename?: 'MixedMediaBodyRichText', html: string } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> } | { __typename: 'Page', id: string, title?: string | null, slug: string, staticPage?: StaticPage | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Product', id: string, gid: string }>, sections: Array<{ __typename: 'Archive', id: string, stage: Stage } | { __typename: 'Collection', id: string, stage: Stage } | { __typename: 'CustomizedSection', id: string, stage: Stage } | { __typename: 'Event', id: string, stage: Stage } | { __typename: 'Form', id: string, stage: Stage } | { __typename: 'Gallery', id: string, stage: Stage } | { __typename: 'Lock', id: string, stage: Stage } | { __typename: 'MixedMedia', id: string, stage: Stage } | { __typename: 'Product', id: string, stage: Stage }> } | null }>, layouts: Array<{ __typename?: 'Layout', id: string, headerStyle?: HeaderStyle | null, footerStyle?: FooterStyle | null, theme?: { __typename?: 'Theme', slug: string } | null }> };

export type GetLayoutConfigQueryVariables = Exact<{
  where: LayoutWhereInput;
}>;


export type GetLayoutConfigQuery = { __typename?: 'Query', layouts: Array<{ __typename?: 'Layout', id: string, headerStyle?: HeaderStyle | null, footerStyle?: FooterStyle | null, theme?: { __typename?: 'Theme', slug: string } | null }> };

export type LayoutConfigFragment = { __typename?: 'Layout', id: string, headerStyle?: HeaderStyle | null, footerStyle?: FooterStyle | null, theme?: { __typename?: 'Theme', slug: string } | null };

export type GetNavigationQueryVariables = Exact<{
  where: NavigationWhereUniqueInput;
}>;


export type GetNavigationQuery = { __typename?: 'Query', navigation?: { __typename?: 'Navigation', slug?: string | null, id: string, title?: string | null, links: Array<{ __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null }> } | null };

export type GetNavigationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNavigationsQuery = { __typename?: 'Query', header?: { __typename?: 'Navigation', slug?: string | null, id: string, title?: string | null, links: Array<{ __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null }> } | null, footer?: { __typename?: 'Navigation', slug?: string | null, id: string, title?: string | null, links: Array<{ __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null }> } | null };

export type GetOnPageShopDataQueryVariables = Exact<{
  productsWhere?: InputMaybe<ProductWhereInput>;
  collectionsInfo?: InputMaybe<CollectionWhereInput>;
  collectionsFeed?: InputMaybe<CollectionWhereInput>;
}>;


export type GetOnPageShopDataQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', gid: string }>, collectionsInfo: Array<{ __typename?: 'Collection', gid: string }>, collectionsFeed: Array<{ __typename?: 'Collection', gid: string }> };

export type CollectionGidFragment = { __typename?: 'Collection', gid: string };

export type GetPageQueryVariables = Exact<{
  where: PageWhereUniqueInput;
}>;


export type GetPageQuery = { __typename?: 'Query', page?: { __typename?: 'Page', id: string, seo?: { __typename?: 'Seo', title: string, hasTitleTemplate?: boolean | null, description: string, noIndex: boolean, image?: { __typename?: 'Asset', url: string, height?: number | null, width?: number | null, alt?: string | null } | null } | null, layout?: { __typename?: 'Layout', id: string, title?: string | null, displayTitle?: boolean | null, mirrorLayout?: boolean | null, heroes: Array<{ __typename: 'Collection', id: string, gid: string } | { __typename: 'Editorial', id: string, title?: string | null, slug: string, excerpt?: { __typename?: 'RichText', html: string } | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Event', id: string, title?: string | null, date?: any | null, hasReleasePage: boolean, slug: string, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null, excerpt?: { __typename?: 'RichText', html: string } | null } | { __typename: 'MixedMedia', id: string, title?: string | null, link?: { __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null } | null, excerpt?: { __typename?: 'MixedMediaBodyRichText', html: string } | null, media: Array<{ __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null }> } | { __typename: 'Page', id: string, title?: string | null, slug: string, staticPage?: StaticPage | null, featuredMedia?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string, portrait?: { __typename: 'Asset', id: string, alt?: string | null, mimeType?: string | null, height?: number | null, width?: number | null, url: string, image: string, thumbnail: string, small: string, medium: string, large: string, xlarge: string } | null } | null } | { __typename: 'Product', id: string, gid: string }>, sections: Array<{ __typename: 'Archive', id: string, stage: Stage } | { __typename: 'Collection', id: string, stage: Stage } | { __typename: 'CustomizedSection', id: string, stage: Stage } | { __typename: 'Event', id: string, stage: Stage } | { __typename: 'Form', id: string, stage: Stage } | { __typename: 'Gallery', id: string, stage: Stage } | { __typename: 'Lock', id: string, stage: Stage } | { __typename: 'MixedMedia', id: string, stage: Stage } | { __typename: 'Product', id: string, stage: Stage }> } | null } | null };

export type GetStaticNavigationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStaticNavigationsQuery = { __typename?: 'Query', header?: { __typename?: 'Navigation', slug?: string | null, id: string, title?: string | null, links: Array<{ __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null }> } | null, footer?: { __typename?: 'Navigation', slug?: string | null, id: string, title?: string | null, links: Array<{ __typename?: 'Link', label?: string | null, title?: string | null, id: string, rel?: string | null, hasTargetBlank: boolean, externalTarget?: string | null, internalTarget?: { __typename: 'Collection', slug: string } | { __typename: 'Editorial', slug: string } | { __typename: 'Event', slug: string } | { __typename: 'Page', slug: string, staticPage?: StaticPage | null } | { __typename: 'Product', slug: string } | null }> } | null };

export type GetThemesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetThemesQuery = { __typename?: 'Query', normal?: { __typename?: 'Theme', slug: string } | null, light?: { __typename?: 'Theme', slug: string } | null, dark?: { __typename?: 'Theme', slug: string } | null, themes: Array<{ __typename?: 'Theme', radius?: Sizes | null, id: string, slug: string, foreground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, background?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, card?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, cardForeground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, primary?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, secondary?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, muted?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, mutedForeground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, destructive?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, destructiveForeground?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, border?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, ring?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null, inputColor?: { __typename?: 'Color', rgba: { __typename?: 'RGBA', r: any, g: any, b: any, a: any } } | null }> };

export const CollectionFragmentDoc = gql`
    fragment Collection on Collection {
  gid
}
    `;
export const AssetDetailsFragmentDoc = gql`
    fragment AssetDetails on Asset {
  __typename
  id
  alt
  mimeType
  height
  width
  url
  image: url(
    transformation: {document: {output: {format: autoImage}}, image: {compress: {metadata: true}}}
  )
  thumbnail: url(
    transformation: {document: {output: {format: autoImage}}, image: {resize: {fit: max, width: 32}, compress: {metadata: true}}}
  )
  small: url(
    transformation: {document: {output: {format: autoImage}}, image: {resize: {fit: max, width: 400}, compress: {metadata: true}}}
  )
  medium: url(
    transformation: {document: {output: {format: autoImage}}, image: {resize: {fit: max, width: 680}, compress: {metadata: true}}}
  )
  large: url(
    transformation: {document: {output: {format: autoImage}}, image: {resize: {fit: max, width: 960}, compress: {metadata: true}}}
  )
  xlarge: url(
    transformation: {document: {output: {format: autoImage}}, image: {resize: {fit: max, width: 1980}, compress: {metadata: true}}}
  )
}
    `;
export const ResponsiveAssetFragmentDoc = gql`
    fragment ResponsiveAsset on Asset {
  ...AssetDetails
  portrait {
    ...AssetDetails
  }
}
    `;
export const GalleryFragmentDoc = gql`
    fragment Gallery on Gallery {
  id
  media(first: 50) {
    ...ResponsiveAsset
  }
}
    `;
export const FormFragmentDoc = gql`
    fragment Form on Form {
  id
  type
  submitButtonLabel
}
    `;
export const EditorialContentFragmentDoc = gql`
    fragment EditorialContent on EditorialMainContentRichText {
  json
  references {
    ... on Asset {
      ...ResponsiveAsset
    }
    ... on Gallery {
      ...Gallery
    }
    ... on Form {
      id
      ...Form
    }
  }
}
    `;
export const LayoutConfigFragmentDoc = gql`
    fragment LayoutConfig on Layout {
  id
  headerStyle
  footerStyle
  theme {
    slug
  }
}
    `;
export const LinkFragmentDoc = gql`
    fragment Link on Link {
  label
  title
  id
  rel
  hasTargetBlank
  externalTarget
  internalTarget {
    __typename
    ... on Page {
      slug
      staticPage
    }
    ... on Product {
      slug
    }
    ... on Collection {
      slug
    }
    ... on Editorial {
      slug
    }
    ... on Event {
      slug
    }
  }
}
    `;
export const ProductGidFragmentDoc = gql`
    fragment ProductGid on Product {
  gid
}
    `;
export const HeroesFragmentDoc = gql`
    fragment Heroes on LayoutHero {
  __typename
  ... on Entity {
    id
  }
  ... on MixedMedia {
    id
    link {
      ...Link
    }
    title
    excerpt: body {
      html
    }
    media {
      ...ResponsiveAsset
    }
  }
  ... on Product {
    ...ProductGid
  }
  ... on Page {
    id
    title
    slug
    staticPage
    featuredMedia {
      ...ResponsiveAsset
    }
  }
  ... on Collection {
    gid
  }
  ... on Event {
    id
    title
    date
    hasReleasePage
    slug
    featuredMedia {
      ...ResponsiveAsset
    }
    excerpt {
      html
    }
  }
  ... on Editorial {
    title
    id
    excerpt {
      html
    }
    featuredMedia {
      ...ResponsiveAsset
    }
    slug
  }
}
    `;
export const EntityFragmentDoc = gql`
    fragment Entity on Entity {
  __typename
  id
  stage
}
    `;
export const LayoutContentFragmentDoc = gql`
    fragment LayoutContent on Layout {
  id
  title
  displayTitle
  mirrorLayout
  heroes {
    ...Heroes
  }
  sections {
    ... on Entity {
      ...Entity
    }
  }
}
    `;
export const LayoutFragmentDoc = gql`
    fragment Layout on Layout {
  ...LayoutConfig
  ...LayoutContent
}
    `;
export const LockFragmentDoc = gql`
    fragment Lock on Lock {
  slug
  id
  isEnabled
  isGlobal
  pageLocks {
    ... on Page {
      slug
    }
    ... on Product {
      slug
    }
    ... on Collection {
      slug
    }
    ... on Editorial {
      slug
    }
  }
  exemptions {
    ... on Page {
      slug
    }
    ... on Product {
      slug
    }
    ... on Collection {
      slug
    }
    ... on Editorial {
      slug
    }
  }
  background {
    ...ResponsiveAsset
  }
  customLockScreen {
    ...Layout
  }
  password
  scheduledUnlockTime
  alwaysUnlockForAuthenticatedUser
  alwaysUnlockOnTime
}
    `;
export const NavigationFragmentDoc = gql`
    fragment Navigation on Navigation {
  slug
  id
  title
  links {
    ...Link
  }
}
    `;
export const PersonFragmentDoc = gql`
    fragment Person on Person {
  name
  role
}
    `;
export const ProductFragmentDoc = gql`
    fragment Product on Product {
  title
  gid
}
    `;
export const SeoFragmentDoc = gql`
    fragment Seo on Seo {
  title
  hasTitleTemplate
  description
  noIndex
  image {
    url
    height
    width
    alt
  }
}
    `;
export const ColorSchemeFragmentDoc = gql`
    fragment ColorScheme on Theme {
  foreground {
    rgba {
      r
      g
      b
      a
    }
  }
  background {
    rgba {
      r
      g
      b
      a
    }
  }
  card {
    rgba {
      r
      g
      b
      a
    }
  }
  cardForeground {
    rgba {
      r
      g
      b
      a
    }
  }
  primary {
    rgba {
      r
      g
      b
      a
    }
  }
  secondary {
    rgba {
      r
      g
      b
      a
    }
  }
  muted {
    rgba {
      r
      g
      b
      a
    }
  }
  mutedForeground {
    rgba {
      r
      g
      b
      a
    }
  }
  destructive {
    rgba {
      r
      g
      b
      a
    }
  }
  destructiveForeground {
    rgba {
      r
      g
      b
      a
    }
  }
  border {
    rgba {
      r
      g
      b
      a
    }
  }
  ring {
    rgba {
      r
      g
      b
      a
    }
  }
  inputColor {
    rgba {
      r
      g
      b
      a
    }
  }
}
    `;
export const ThemeFragmentDoc = gql`
    fragment Theme on Theme {
  radius
  id
  slug
  ...ColorScheme
}
    `;
export const EventBlockFragmentDoc = gql`
    fragment EventBlock on Event {
  id
  title
  date
  hasReleasePage
  slug
  featuredMedia {
    ...ResponsiveAsset
  }
  excerpt {
    raw
  }
}
    `;
export const LockSectionFragmentDoc = gql`
    fragment LockSection on Lock {
  id
  isEnabled
  isGlobal
  scheduledUnlockTime
  alwaysUnlockForAuthenticatedUser
  alwaysUnlockOnTime
}
    `;
export const RichTextFragmentDoc = gql`
    fragment RichText on MixedMediaBodyRichText {
  json
  references {
    __typename
    ... on Asset {
      ...ResponsiveAsset
    }
    ... on Form {
      id
      ...Form
    }
    ... on Page {
      id
    }
    ... on Lock {
      id
      ...LockSection
    }
  }
}
    `;
export const MixedMediaFragmentDoc = gql`
    fragment MixedMedia on MixedMedia {
  id
  link {
    ...Link
  }
  body {
    ...RichText
  }
  media {
    ...ResponsiveAsset
  }
}
    `;
export const BlockPrimitiveFragmentDoc = gql`
    fragment BlockPrimitive on LayoutSections {
  __typename
  ... on Collection {
    id
    gid
  }
  ... on Product {
    gid
    id
  }
  ... on Form {
    id
    ...Form
  }
  ... on Lock {
    id
    ...LockSection
  }
  ... on MixedMedia {
    id
    ...MixedMedia
  }
  ... on Gallery {
    ...Gallery
  }
  ... on Archive {
    id
    media {
      ...ResponsiveAsset
    }
    entries {
      ... on Editorial {
        id
        title
        slug
        featuredMedia {
          ...ResponsiveAsset
        }
      }
    }
  }
  ... on Event {
    id
  }
}
    `;
export const SpacingFragmentDoc = gql`
    fragment Spacing on CustomizedSection {
  verticalPadding
  horizontalPadding
}
    `;
export const BlockSettingsFragmentDoc = gql`
    fragment BlockSettings on CustomizedSection {
  ...Spacing
  reverseLayout
  alternateLayout
  heading
  theme {
    slug
  }
}
    `;
export const BlockFragmentDoc = gql`
    fragment Block on Entity {
  id
  ...BlockPrimitive
  ... on CustomizedSection {
    __typename
    id
    theme {
      slug
    }
    ...BlockSettings
    content {
      ...BlockPrimitive
    }
  }
}
    `;
export const CollectionGidFragmentDoc = gql`
    fragment CollectionGid on Collection {
  gid
}
    `;
export const GetEditorialDocument = gql`
    query GetEditorial($where: EditorialWhereUniqueInput!) {
  editorial(where: $where) {
    title
    id
    seo {
      ...Seo
    }
    featuredMedia {
      ...ResponsiveAsset
    }
    credits {
      ...Person
    }
    artistStatement {
      json
      references {
        ... on Form {
          id
          ...Form
        }
      }
    }
    excerpt {
      text
    }
    mainContent {
      html
      ...EditorialContent
    }
    publishedAt(variation: BASE)
  }
}
    ${SeoFragmentDoc}
${ResponsiveAssetFragmentDoc}
${AssetDetailsFragmentDoc}
${PersonFragmentDoc}
${FormFragmentDoc}
${EditorialContentFragmentDoc}
${GalleryFragmentDoc}`;
export const GetEntitiesDocument = gql`
    query GetEntities($where: [EntityWhereInput!]!) {
  entities(where: $where) {
    ...Block
  }
}
    ${BlockFragmentDoc}
${BlockPrimitiveFragmentDoc}
${FormFragmentDoc}
${LockSectionFragmentDoc}
${MixedMediaFragmentDoc}
${LinkFragmentDoc}
${RichTextFragmentDoc}
${ResponsiveAssetFragmentDoc}
${AssetDetailsFragmentDoc}
${GalleryFragmentDoc}
${BlockSettingsFragmentDoc}
${SpacingFragmentDoc}`;
export const GetGlobalsDocument = gql`
    query GetGlobals($locksWhere: LockWhereInput!, $layoutsWhere: LayoutWhereInput!) {
  locks(where: $locksWhere) {
    ...Lock
  }
  layouts(first: 1, where: $layoutsWhere) {
    ...LayoutConfig
  }
}
    ${LockFragmentDoc}
${ResponsiveAssetFragmentDoc}
${AssetDetailsFragmentDoc}
${LayoutFragmentDoc}
${LayoutConfigFragmentDoc}
${LayoutContentFragmentDoc}
${HeroesFragmentDoc}
${LinkFragmentDoc}
${ProductGidFragmentDoc}
${EntityFragmentDoc}`;
export const GetLayoutConfigDocument = gql`
    query GetLayoutConfig($where: LayoutWhereInput!) {
  layouts(where: $where) {
    ...LayoutConfig
  }
}
    ${LayoutConfigFragmentDoc}`;
export const GetNavigationDocument = gql`
    query GetNavigation($where: NavigationWhereUniqueInput!) {
  navigation(where: $where) {
    ...Navigation
  }
}
    ${NavigationFragmentDoc}
${LinkFragmentDoc}`;
export const GetNavigationsDocument = gql`
    query GetNavigations {
  header: navigation(where: {staticNavigation: header}) {
    ...Navigation
  }
  footer: navigation(where: {staticNavigation: footer}) {
    ...Navigation
  }
}
    ${NavigationFragmentDoc}
${LinkFragmentDoc}`;
export const GetOnPageShopDataDocument = gql`
    query GetOnPageShopData($productsWhere: ProductWhereInput, $collectionsInfo: CollectionWhereInput, $collectionsFeed: CollectionWhereInput) {
  products(where: $productsWhere) {
    gid
  }
  collectionsInfo: collections(where: $collectionsInfo) {
    gid
  }
  collectionsFeed: collections(where: $collectionsFeed) {
    gid
  }
}
    `;
export const GetPageDocument = gql`
    query GetPage($where: PageWhereUniqueInput!) {
  page(where: $where) {
    seo {
      ...Seo
    }
    id
    layout {
      ...LayoutContent
    }
  }
}
    ${SeoFragmentDoc}
${LayoutContentFragmentDoc}
${HeroesFragmentDoc}
${LinkFragmentDoc}
${ResponsiveAssetFragmentDoc}
${AssetDetailsFragmentDoc}
${ProductGidFragmentDoc}
${EntityFragmentDoc}`;
export const GetStaticNavigationsDocument = gql`
    query GetStaticNavigations {
  header: navigation(where: {staticNavigation: header}) {
    ...Navigation
  }
  footer: navigation(where: {staticNavigation: footer}) {
    ...Navigation
  }
}
    ${NavigationFragmentDoc}
${LinkFragmentDoc}`;
export const GetThemesDocument = gql`
    query GetThemes {
  normal: theme(where: {globalDefault: normal}) {
    slug
  }
  light: theme(where: {globalDefault: light}) {
    slug
  }
  dark: theme(where: {globalDefault: dark}) {
    slug
  }
  themes(first: 20) {
    ...Theme
  }
}
    ${ThemeFragmentDoc}
${ColorSchemeFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetEditorial(variables: GetEditorialQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetEditorialQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEditorialQuery>(GetEditorialDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEditorial', 'query', variables);
    },
    GetEntities(variables: GetEntitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetEntitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEntitiesQuery>(GetEntitiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEntities', 'query', variables);
    },
    GetGlobals(variables: GetGlobalsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetGlobalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGlobalsQuery>(GetGlobalsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGlobals', 'query', variables);
    },
    GetLayoutConfig(variables: GetLayoutConfigQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetLayoutConfigQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLayoutConfigQuery>(GetLayoutConfigDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetLayoutConfig', 'query', variables);
    },
    GetNavigation(variables: GetNavigationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetNavigationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNavigationQuery>(GetNavigationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNavigation', 'query', variables);
    },
    GetNavigations(variables?: GetNavigationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetNavigationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNavigationsQuery>(GetNavigationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNavigations', 'query', variables);
    },
    GetOnPageShopData(variables?: GetOnPageShopDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetOnPageShopDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOnPageShopDataQuery>(GetOnPageShopDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOnPageShopData', 'query', variables);
    },
    GetPage(variables: GetPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPageQuery>(GetPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPage', 'query', variables);
    },
    GetStaticNavigations(variables?: GetStaticNavigationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetStaticNavigationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStaticNavigationsQuery>(GetStaticNavigationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetStaticNavigations', 'query', variables);
    },
    GetThemes(variables?: GetThemesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetThemesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetThemesQuery>(GetThemesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetThemes', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;