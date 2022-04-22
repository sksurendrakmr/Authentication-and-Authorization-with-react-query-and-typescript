import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../hooks/auth/useAuth";

const INVALID_NAME = "Please enter a name";
const INVALID_EMAIL = "Please provide a valid email id";
const INVALID_PASSWORD = "Please enter a password";

type SignupFormType = {
  name: string;
  email: string;
  password: string;
};

const initialValues: SignupFormType = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required(INVALID_NAME),
  email: Yup.string().email(INVALID_EMAIL).required(INVALID_EMAIL),
  password: Yup.string().required(INVALID_PASSWORD),
});

export const SignupForm = () => {
  const { signup } = useAuth();

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data: SignupFormType) => {
      signup(data);
    },
  });
  return <></>;
};
