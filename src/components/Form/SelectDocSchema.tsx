import React from "react";
import { useField } from "formik";
import { useQuery } from "@apollo/react-hooks";

import { GET_DOCSCHEMA } from "../../data//queries";
import { IDocSchema } from "../../data/types";

interface SelectDocSchemaProps {
  name: string;
  id?: string;
  label: string;
}

interface DocSchemaData {
  docschema: IDocSchema[]
}

const SelectDocSchema: React.FC<SelectDocSchemaProps> = ({
  id,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  // const { docschema } = useDocumentList();
  const { value, ...fieldRest } = field;

  const { data, loading, error } = useQuery<DocSchemaData>(
    GET_DOCSCHEMA
  );

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <>:( Error</>;
  }

  return (
    <>
    {data?.docschema && 
    <>
      <label htmlFor={id || props.name}>{label}</label>
      <select value={value || ""} {...fieldRest} {...props}>
        {data &&
          data.docschema.map((option: { label: string; id: number }) => (
            <option value={option.id} key={option.id}>
              {option.id} - {option.label}
            </option>
          ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
        ) : null}
        </>
      }
        </>
  );
};

export default SelectDocSchema;
