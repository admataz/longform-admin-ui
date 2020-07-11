import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_DOCUMENT_ITEMS_DATA } from "../../data//queries";
import {
  IDocument,
  IDocumentState,
  IDocumentsQueryParams,
} from "../../data/types";

interface IDocumentListProps {
  query?: IDocumentsQueryParams;
  render?: Function;
}

const defaultRender = ({ row }: { row: IDocument }) => (
  <div key={row.id}>
    <Link to={`/document/${row.id}`}>{row.title}</Link>
  </div>
);

const DocumentList: React.FC<IDocumentListProps> = ({
  render = defaultRender,
  query: { filter, find, pg, limit, match, type, cols, only, orderby, dir } = {},
}) => {
  const { data, loading, error } = useQuery<IDocumentState>(
    GET_DOCUMENT_ITEMS_DATA,
    {
      variables: {
        filter,
        find,
        pg,
        limit,
        match,
        type,
        cols,
        only,
        orderby,
        dir,
      },
    }
  );

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>:( Error</>;
  }

  return (
    <>
      {data?.document &&
        data.document.map((row) => render({row}))}
    </>
  );
};

export default DocumentList;
