import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required(),
});

export default validationSchema;
