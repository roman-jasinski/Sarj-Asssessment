import { AuthFormField } from "../types/auth";

export const authFormFields: AuthFormField[] = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
];
