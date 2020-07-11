import { gql } from "apollo-boost";

export const GET_DOCSCHEMA = gql`
  query getDocSchema{
    docschema {
      id
      label
      description
    }
  }
`;

export const GET_SKELETON_DOCUMENT_DATA = gql`
  query getSkeletonDocumentData(
    $filter: [Int] = []
    $find: String = ""
    $pg: Int = 0
    $limit: Int = 0
    $match: String = "all"
    $type: [Int]
    $cols: [String] = ["*"]
    $only: [Int] = []
    $orderby: String = "created_at"
    $dir: String = "asc"
  )  {
    docschema {
      id
      label
    }
    document(
      filter: $filter
      find: $find
      pg: $pg
      limit: $limit
      match: $match
      type: $type
      cols: $cols
      only: $only
      orderby: $orderby
      dir: $dir
    ) {
      id
      docschema
      title
      related
    }
  }
`;

export const GET_DOCUMENT_ITEMS_DATA = gql`
  query getDocumentItems(
    $filter: [Int] = []
    $find: String = ""
    $pg: Int = 0
    $limit: Int = 30
    $match: String = "all"
    $type: [Int]
    $cols: [String] = ["*"]
    $only: [Int] = []
    $orderby: String = "created_at"
    $dir: String = "asc"
  ) {
    document(
      filter: $filter
      find: $find
      pg: $pg
      limit: $limit
      match: $match
      type: $type
      cols: $cols
      only: $only
      orderby: $orderby
      dir: $dir
    ) {
      id
      docschema
      title
      excerpt
      body
      metadata
      content
      related
      created_at
      modified_at
    }
  }
`;

export const GET_DOCUMENT = gql`
  query getDocument($only: [Int]) {
    document(only: $only) {
      id
      title
      excerpt
      body
      content
      metadata
      related
      docschema
    }
  }
`;

export const SAVE_DOCUMENT = gql`
  mutation save($document: DocumentInput) {
    saveDocument(document: $document) {
      id
      title
      excerpt
      body
      related
      docschema
    }
  }
`;
