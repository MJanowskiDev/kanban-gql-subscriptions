import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: any;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Int"]>;
  _gt?: InputMaybe<Scalars["Int"]>;
  _gte?: InputMaybe<Scalars["Int"]>;
  _in?: InputMaybe<Array<Scalars["Int"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Int"]>;
  _lte?: InputMaybe<Scalars["Int"]>;
  _neq?: InputMaybe<Scalars["Int"]>;
  _nin?: InputMaybe<Array<Scalars["Int"]>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["String"]>;
  _gt?: InputMaybe<Scalars["String"]>;
  _gte?: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>;
  _in?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>;
  _lt?: InputMaybe<Scalars["String"]>;
  _lte?: InputMaybe<Scalars["String"]>;
  _neq?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>;
  _nin?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "card" */
export type Card = {
  __typename?: "card";
  columnId?: Maybe<Scalars["uuid"]>;
  content: Scalars["String"];
  id: Scalars["uuid"];
};

/** aggregated selection of "card" */
export type Card_Aggregate = {
  __typename?: "card_aggregate";
  aggregate?: Maybe<Card_Aggregate_Fields>;
  nodes: Array<Card>;
};

export type Card_Aggregate_Bool_Exp = {
  count?: InputMaybe<Card_Aggregate_Bool_Exp_Count>;
};

export type Card_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Card_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<Card_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "card" */
export type Card_Aggregate_Fields = {
  __typename?: "card_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Card_Max_Fields>;
  min?: Maybe<Card_Min_Fields>;
};

/** aggregate fields of "card" */
export type Card_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Card_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "card" */
export type Card_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Card_Max_Order_By>;
  min?: InputMaybe<Card_Min_Order_By>;
};

/** input type for inserting array relation for remote table "card" */
export type Card_Arr_Rel_Insert_Input = {
  data: Array<Card_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Card_On_Conflict>;
};

/** Boolean expression to filter rows from the table "card". All fields are combined with a logical 'AND'. */
export type Card_Bool_Exp = {
  _and?: InputMaybe<Array<Card_Bool_Exp>>;
  _not?: InputMaybe<Card_Bool_Exp>;
  _or?: InputMaybe<Array<Card_Bool_Exp>>;
  columnId?: InputMaybe<Uuid_Comparison_Exp>;
  content?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "card" */
export enum Card_Constraint {
  /** unique or primary key constraint on columns "id" */
  CardPkey = "card_pkey",
}

/** input type for inserting data into table "card" */
export type Card_Insert_Input = {
  columnId?: InputMaybe<Scalars["uuid"]>;
  content?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
};

/** aggregate max on columns */
export type Card_Max_Fields = {
  __typename?: "card_max_fields";
  columnId?: Maybe<Scalars["uuid"]>;
  content?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
};

/** order by max() on columns of table "card" */
export type Card_Max_Order_By = {
  columnId?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Card_Min_Fields = {
  __typename?: "card_min_fields";
  columnId?: Maybe<Scalars["uuid"]>;
  content?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
};

/** order by min() on columns of table "card" */
export type Card_Min_Order_By = {
  columnId?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "card" */
export type Card_Mutation_Response = {
  __typename?: "card_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Card>;
};

/** on_conflict condition type for table "card" */
export type Card_On_Conflict = {
  constraint: Card_Constraint;
  update_columns?: Array<Card_Update_Column>;
  where?: InputMaybe<Card_Bool_Exp>;
};

/** Ordering options when selecting data from "card". */
export type Card_Order_By = {
  columnId?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: card */
export type Card_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "card" */
export enum Card_Select_Column {
  /** column name */
  ColumnId = "columnId",
  /** column name */
  Content = "content",
  /** column name */
  Id = "id",
}

/** input type for updating data in table "card" */
export type Card_Set_Input = {
  columnId?: InputMaybe<Scalars["uuid"]>;
  content?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
};

/** Streaming cursor of the table "card" */
export type Card_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Card_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Card_Stream_Cursor_Value_Input = {
  columnId?: InputMaybe<Scalars["uuid"]>;
  content?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["uuid"]>;
};

/** update columns of table "card" */
export enum Card_Update_Column {
  /** column name */
  ColumnId = "columnId",
  /** column name */
  Content = "content",
  /** column name */
  Id = "id",
}

export type Card_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Card_Set_Input>;
  where: Card_Bool_Exp;
};

/** columns and relationships of "columns" */
export type Columns = {
  __typename?: "columns";
  /** An array relationship */
  cards: Array<Card>;
  /** An aggregate relationship */
  cards_aggregate: Card_Aggregate;
  id: Scalars["uuid"];
  name: Scalars["String"];
};

/** columns and relationships of "columns" */
export type ColumnsCardsArgs = {
  distinct_on?: InputMaybe<Array<Card_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Card_Order_By>>;
  where?: InputMaybe<Card_Bool_Exp>;
};

/** columns and relationships of "columns" */
export type ColumnsCards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Card_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Card_Order_By>>;
  where?: InputMaybe<Card_Bool_Exp>;
};

/** aggregated selection of "columns" */
export type Columns_Aggregate = {
  __typename?: "columns_aggregate";
  aggregate?: Maybe<Columns_Aggregate_Fields>;
  nodes: Array<Columns>;
};

/** aggregate fields of "columns" */
export type Columns_Aggregate_Fields = {
  __typename?: "columns_aggregate_fields";
  count: Scalars["Int"];
  max?: Maybe<Columns_Max_Fields>;
  min?: Maybe<Columns_Min_Fields>;
};

/** aggregate fields of "columns" */
export type Columns_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Columns_Select_Column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to filter rows from the table "columns". All fields are combined with a logical 'AND'. */
export type Columns_Bool_Exp = {
  _and?: InputMaybe<Array<Columns_Bool_Exp>>;
  _not?: InputMaybe<Columns_Bool_Exp>;
  _or?: InputMaybe<Array<Columns_Bool_Exp>>;
  cards?: InputMaybe<Card_Bool_Exp>;
  cards_aggregate?: InputMaybe<Card_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "columns" */
export enum Columns_Constraint {
  /** unique or primary key constraint on columns "id" */
  CardsPkey = "cards_pkey",
}

/** input type for inserting data into table "columns" */
export type Columns_Insert_Input = {
  cards?: InputMaybe<Card_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Columns_Max_Fields = {
  __typename?: "columns_max_fields";
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
};

/** aggregate min on columns */
export type Columns_Min_Fields = {
  __typename?: "columns_min_fields";
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
};

/** response of any mutation on the table "columns" */
export type Columns_Mutation_Response = {
  __typename?: "columns_mutation_response";
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"];
  /** data from the rows affected by the mutation */
  returning: Array<Columns>;
};

/** on_conflict condition type for table "columns" */
export type Columns_On_Conflict = {
  constraint: Columns_Constraint;
  update_columns?: Array<Columns_Update_Column>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

/** Ordering options when selecting data from "columns". */
export type Columns_Order_By = {
  cards_aggregate?: InputMaybe<Card_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: columns */
export type Columns_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

/** select columns of table "columns" */
export enum Columns_Select_Column {
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

/** input type for updating data in table "columns" */
export type Columns_Set_Input = {
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** Streaming cursor of the table "columns" */
export type Columns_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Columns_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Columns_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars["uuid"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** update columns of table "columns" */
export enum Columns_Update_Column {
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

export type Columns_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Columns_Set_Input>;
  where: Columns_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = "ASC",
  /** descending ordering of the cursor */
  Desc = "DESC",
}

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root";
  /** delete data from the table: "card" */
  delete_card?: Maybe<Card_Mutation_Response>;
  /** delete single row from the table: "card" */
  delete_card_by_pk?: Maybe<Card>;
  /** delete data from the table: "columns" */
  delete_columns?: Maybe<Columns_Mutation_Response>;
  /** delete single row from the table: "columns" */
  delete_columns_by_pk?: Maybe<Columns>;
  /** insert data into the table: "card" */
  insert_card?: Maybe<Card_Mutation_Response>;
  /** insert a single row into the table: "card" */
  insert_card_one?: Maybe<Card>;
  /** insert data into the table: "columns" */
  insert_columns?: Maybe<Columns_Mutation_Response>;
  /** insert a single row into the table: "columns" */
  insert_columns_one?: Maybe<Columns>;
  /** update data of the table: "card" */
  update_card?: Maybe<Card_Mutation_Response>;
  /** update single row of the table: "card" */
  update_card_by_pk?: Maybe<Card>;
  /** update multiples rows of table: "card" */
  update_card_many?: Maybe<Array<Maybe<Card_Mutation_Response>>>;
  /** update data of the table: "columns" */
  update_columns?: Maybe<Columns_Mutation_Response>;
  /** update single row of the table: "columns" */
  update_columns_by_pk?: Maybe<Columns>;
  /** update multiples rows of table: "columns" */
  update_columns_many?: Maybe<Array<Maybe<Columns_Mutation_Response>>>;
};

/** mutation root */
export type Mutation_RootDelete_CardArgs = {
  where: Card_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Card_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootDelete_ColumnsArgs = {
  where: Columns_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Columns_By_PkArgs = {
  id: Scalars["uuid"];
};

/** mutation root */
export type Mutation_RootInsert_CardArgs = {
  objects: Array<Card_Insert_Input>;
  on_conflict?: InputMaybe<Card_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Card_OneArgs = {
  object: Card_Insert_Input;
  on_conflict?: InputMaybe<Card_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ColumnsArgs = {
  objects: Array<Columns_Insert_Input>;
  on_conflict?: InputMaybe<Columns_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Columns_OneArgs = {
  object: Columns_Insert_Input;
  on_conflict?: InputMaybe<Columns_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_CardArgs = {
  _set?: InputMaybe<Card_Set_Input>;
  where: Card_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Card_By_PkArgs = {
  _set?: InputMaybe<Card_Set_Input>;
  pk_columns: Card_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Card_ManyArgs = {
  updates: Array<Card_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ColumnsArgs = {
  _set?: InputMaybe<Columns_Set_Input>;
  where: Columns_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Columns_By_PkArgs = {
  _set?: InputMaybe<Columns_Set_Input>;
  pk_columns: Columns_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Columns_ManyArgs = {
  updates: Array<Columns_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

export type Query_Root = {
  __typename?: "query_root";
  /** fetch data from the table: "card" */
  card: Array<Card>;
  /** fetch aggregated fields from the table: "card" */
  card_aggregate: Card_Aggregate;
  /** fetch data from the table: "card" using primary key columns */
  card_by_pk?: Maybe<Card>;
  /** fetch data from the table: "columns" */
  columns: Array<Columns>;
  /** fetch aggregated fields from the table: "columns" */
  columns_aggregate: Columns_Aggregate;
  /** fetch data from the table: "columns" using primary key columns */
  columns_by_pk?: Maybe<Columns>;
};

export type Query_RootCardArgs = {
  distinct_on?: InputMaybe<Array<Card_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Card_Order_By>>;
  where?: InputMaybe<Card_Bool_Exp>;
};

export type Query_RootCard_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Card_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Card_Order_By>>;
  where?: InputMaybe<Card_Bool_Exp>;
};

export type Query_RootCard_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootColumnsArgs = {
  distinct_on?: InputMaybe<Array<Columns_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Columns_Order_By>>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

export type Query_RootColumns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Columns_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Columns_Order_By>>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

export type Query_RootColumns_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "card" */
  card: Array<Card>;
  /** fetch aggregated fields from the table: "card" */
  card_aggregate: Card_Aggregate;
  /** fetch data from the table: "card" using primary key columns */
  card_by_pk?: Maybe<Card>;
  /** fetch data from the table in a streaming manner: "card" */
  card_stream: Array<Card>;
  /** fetch data from the table: "columns" */
  columns: Array<Columns>;
  /** fetch aggregated fields from the table: "columns" */
  columns_aggregate: Columns_Aggregate;
  /** fetch data from the table: "columns" using primary key columns */
  columns_by_pk?: Maybe<Columns>;
  /** fetch data from the table in a streaming manner: "columns" */
  columns_stream: Array<Columns>;
};

export type Subscription_RootCardArgs = {
  distinct_on?: InputMaybe<Array<Card_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Card_Order_By>>;
  where?: InputMaybe<Card_Bool_Exp>;
};

export type Subscription_RootCard_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Card_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Card_Order_By>>;
  where?: InputMaybe<Card_Bool_Exp>;
};

export type Subscription_RootCard_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootCard_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: Array<InputMaybe<Card_Stream_Cursor_Input>>;
  where?: InputMaybe<Card_Bool_Exp>;
};

export type Subscription_RootColumnsArgs = {
  distinct_on?: InputMaybe<Array<Columns_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Columns_Order_By>>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

export type Subscription_RootColumns_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Columns_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Columns_Order_By>>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

export type Subscription_RootColumns_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootColumns_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: Array<InputMaybe<Columns_Stream_Cursor_Input>>;
  where?: InputMaybe<Columns_Bool_Exp>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["uuid"]>;
  _gt?: InputMaybe<Scalars["uuid"]>;
  _gte?: InputMaybe<Scalars["uuid"]>;
  _in?: InputMaybe<Array<Scalars["uuid"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["uuid"]>;
  _lte?: InputMaybe<Scalars["uuid"]>;
  _neq?: InputMaybe<Scalars["uuid"]>;
  _nin?: InputMaybe<Array<Scalars["uuid"]>>;
};

export type BoardSubscriptionSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type BoardSubscriptionSubscription = {
  __typename?: "subscription_root";
  columns: Array<{
    __typename?: "columns";
    name: string;
    id: any;
    cards: Array<{ __typename?: "card"; id: any; content: string }>;
  }>;
};

export const BoardSubscriptionDocument = gql`
  subscription BoardSubscription {
    columns {
      name
      id
      cards {
        id
        content
      }
    }
  }
`;

/**
 * __useBoardSubscriptionSubscription__
 *
 * To run a query within a React component, call `useBoardSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBoardSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useBoardSubscriptionSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    BoardSubscriptionSubscription,
    BoardSubscriptionSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    BoardSubscriptionSubscription,
    BoardSubscriptionSubscriptionVariables
  >(BoardSubscriptionDocument, options);
}
export type BoardSubscriptionSubscriptionHookResult = ReturnType<
  typeof useBoardSubscriptionSubscription
>;
export type BoardSubscriptionSubscriptionResult =
  Apollo.SubscriptionResult<BoardSubscriptionSubscription>;
