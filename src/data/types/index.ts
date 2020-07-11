export interface IDocument {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  related: number[];
  relatedDocs?: IDocument[];
  docschema: number | null;
  __typename?: string;
}

export enum DocumentActionType {
  FETCH_SKELETON_DOCUMENTS_SUCCESS = "FETCH_SKELETON_DOCUMENTS_SUCCESS",
  FETCH_SKELETON_DOCUMENTS_LOADING = "FETCH_SKELETON_DOCUMENTS_LOADING",
  FETCH_SKELETON_DOCUMENTS_ERROR = "FETCH_SKELETON_DOCUMENTS_ERROR",
  FETCH_FULL_DOCUMENT_ITEMS_SUCCESS = "FETCH_FULL_DOCUMENT_ITEMS_SUCCESS",
  FETCH_FULL_DOCUMENT_ITEMS_LOADING = "FETCH_FULL_DOCUMENT_ITEMS_LOADING",
  FETCH_FULL_DOCUMENT_ITEMS_ERROR = "FETCH_FULL_DOCUMENT_ITEMS_ERROR",
}

export type IDocumentsQueryParams = {
  docschema?: number[]
  type?: number[]
  find?: string
  filter?: number[]
  limit?: number
  match?: 'all' | 'any' 
  cols?: string[]
  only?: number[]
  pg?: number
  orderby?: string
  dir?: 'asc' | 'desc'
}

export interface IDocSchema {
  id: number;
  label: string;
  description: string;
}

export interface IDocumentState {
  docschema: IDocSchema[];
  document: IDocument[];
}

export interface IDocumentAction {
  type: DocumentActionType;
  payload?: any;
}

export enum statusLevels {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  SUCCESS = "success",
}

export enum statusMessages {
  SAVE_SUCCESS = "SAVE_SUCCESS",
  SAVE_ERROR = "SAVE_ERROR",
  SAVING = "SAVING",
  LOAD_SUCCESS = "LOAD_SUCCESS",
  LOAD_ERROR = "LOAD_ERROR",
  LOADING = "LOADING",
}

export enum documentActionTypes {
  DOCUMENT_LOAD = "DOCUMENT_LOAD",
  DOCUMENT_LOAD_ERROR = "DOCUMENT_LOAD_ERROR",
  DOCUMENT_LOAD_SUCCESS = "DOCUMENT_LOAD_SUCCESS",
  DOCUMENT_SAVE = "DOCUMENT_SAVE",
  DOCUMENT_SAVE_ERROR = "DOCUMENT_SAVE_ERROR",
  DOCUMENT_SAVE_SUCCESS = "DOCUMENT_SAVE_SUCCESS",
}

export interface IUseDocumentItem {
  saveDocument: (args: { variables: { document: IDocument } }) => Promise<any>;
  document?: IDocument;
  status: {
    loading?: any;
    error?: any;
  };
}
