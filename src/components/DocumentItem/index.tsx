import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, FormikHelpers } from "formik";

import TextField from "../Form/TextField";
import SelectDocSchema from "../Form/SelectDocSchema";
import validationSchema from "./validation";
import { IDocument } from "../../data/types";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_SKELETON_DOCUMENT_DATA,
  GET_DOCUMENT,
  SAVE_DOCUMENT,
} from "../../data/queries";

const newDocument: IDocument = {
  id: 0,
  title: "",
  excerpt: "",
  body: "",
  related: [],
  docschema: null,
};

interface IRouteParams {
  documentId?: string;
  schemaId?: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;
const StyledInputRow = styled("div")`
  margin: 8px;
  border: 1px solid #ccc;
  padding: 8px;
  box-shadow: 4px 4px 4px #efefef;
`;

const DocumentItem = () => {
  let { documentId = 0, schemaId } = useParams<IRouteParams>();
  let history = useHistory();
  const [document, setCurrentDocument] = useState<IDocument>(newDocument);

  const { data: loadedData, loading, error } = useQuery(GET_DOCUMENT, {
    variables: {
      only: [Number(documentId)],
    },
  });

  const [
    saveDocument,
    { data: savedData, error: saveError, loading: saveLoading },
  ] = useMutation(SAVE_DOCUMENT, {
    update: (store, { data: { saveDocument } }) => {
      const data: any = store.readQuery({ query: GET_SKELETON_DOCUMENT_DATA });
      data.document.push(saveDocument[0]);
      store.writeQuery({ query: GET_SKELETON_DOCUMENT_DATA, data });
    },
  });

  useEffect(() => {
    if (savedData) {
      setCurrentDocument(savedData.saveDocument[0]);
    }
  }, [savedData, setCurrentDocument]);

  useEffect(() => {
    console.log(loadedData)
    if (loadedData) {
      setCurrentDocument(loadedData.document[0]);
    }
  }, [loadedData, setCurrentDocument]);

  useEffect(() => {
    if (document?.id && !documentId) {
      history.push(`/document/${document.id}`);
    }
  }, [document, history, documentId]);

  if (schemaId && document) {
    document.docschema = +schemaId;
  }


  const handleSubmit = async (
    docData: IDocument,
    { setSubmitting }: FormikHelpers<IDocument>
  ) => {
    setSubmitting(false);
    const { __typename, ...document } = docData;

    if (document.docschema) {
      document.docschema = +document.docschema;
    }
    await saveDocument({ variables: { document } });
  };

  if (loading && !document) return <p>Loading...</p>;
  if (documentId && !document) return <p>Document not found</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {document && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={document || {}}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <StyledInputRow>
                <SelectDocSchema name="docschema" label="Select Doc Schema" />
              </StyledInputRow>

              <StyledInputRow>
                <TextField id="title" name="title" label="Title" />
              </StyledInputRow>

              <StyledInputRow>
                <TextField multiline name="excerpt" label="Excerpt" />
              </StyledInputRow>

              <StyledInputRow>
                <TextField multiline name="body" label="Body" />
              </StyledInputRow>

              <StyledInputRow>
                {document.related &&
                  document.related.map((r, i) => <p key={`k-${i}`}>{r}</p>)}
              </StyledInputRow>

              <StyledInputRow>
                <button disabled={isSubmitting} type="submit">
                  Save
                </button>
              </StyledInputRow>
            </StyledForm>
          )}
        </Formik>
      )}
    </>
  );
};

export default DocumentItem;
