import React from "react";
import { useField } from "formik";
import styled from "styled-components";

interface ITextFieldProps {
  label: string;
  name: string;
  multiline?: boolean;
  id?: string;
  rows?: number;
}

const InputFieldContainer = styled("div")``;
const TextField: React.FC<ITextFieldProps> = ({
  label,
  multiline,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <InputFieldContainer>
      <label htmlFor={props.id || props.name}>{label}</label>
      {multiline ? (
        <textarea className="text-input multiline" {...field} {...props} />
      ) : (
        <input className="text-input" {...field} {...props} />
      )}

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </InputFieldContainer>
  );
};

export default TextField;
