import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_SKELETON_DOCUMENT_DATA, GET_DOCSCHEMA } from "../../data/queries";
import { IDocument, IDocumentState } from "../../data/types";
import DocumentList from "../../components/DocumentList";

const DocumentsPage = () => {
  let { schemaId } = useParams<{ schemaId: string }>();

  const { data, loading, error } = useQuery<IDocumentState>(
    GET_SKELETON_DOCUMENT_DATA
  );
  const { data: schemaData } = useQuery(GET_DOCSCHEMA);

  const [searchFilter, setSearchFilter] = useState('')

  
  
  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>:( Error</>;
  }

  const currentSchema = data?.docschema.find((s) => s.id === +schemaId);

  return (
    <>
      <ul>
        {data?.docschema &&
          data.docschema.map((ds) => (
            <li key={ds.id}>
              <Link to={`/documents/${ds.id}`}>{ds.label}</Link>
            </li>
          ))}
      </ul>

      <form>
            <input onChange={e => setSearchFilter(e.target.value)} />
      </form>

      <>
        <Link to={`/document/create/${schemaId || ""}`}>
          New {currentSchema?.label}
        </Link>

        {currentSchema && (
          <ul>
            <DocumentList
              query={{
                type: [currentSchema.id],
                limit: 0,
                find: searchFilter
              }}
              render={({ row }: { row: IDocument }) => (
                <li key={`doc${row.id}`}>
                  {row.title} <Link to={`/document/${row.id}`}>Edit</Link>
                </li>
              )}
            />
          </ul>
        )}
      </>
    </>
  );
};

export default DocumentsPage;
