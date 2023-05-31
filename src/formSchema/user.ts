import * as yup from "yup";

export const userFormSchema = yup
  .object({
    // Prismaが生成する型と整合性を取るために nullable() を追加している
    name: yup.string().nullable(),
    no: yup.string().required(),
    email: yup
      .string()
      .email("Invalid mail format.")
      .required("email is a required field"),
    password: yup.string().min(4).required("password is a required field"),
    roleId: yup.string().required(),
    officeId: yup.string().required(),
  })
  .required();
export type UserFormData = yup.InferType<typeof userFormSchema>;

// Same as...
/*
type UserFormData = {
  name: string | null | undefined;
  email: string;
  password: string;
  roleId: string;
  officeId: string;
};
*/