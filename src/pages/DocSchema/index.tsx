import React, { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_DOCSCHEMA } from "../../data/queries";
import { IDocSchema } from "../../data/types";
// import DocumentList from "../../components/DocumentList";

const DocumentsPage = () => {
  const { data, loading, error } = useQuery<IDocSchema[]>(GET_DOCSCHEMA);

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>:( Error</>;
  }

  return (
    <>
      {data && data.map((schema) => <p>{schema.label}</p>)}
    </>
  );
};

export default DocumentsPage;
