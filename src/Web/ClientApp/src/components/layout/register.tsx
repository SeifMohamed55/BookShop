import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import React, { useState } from "react";
import { RegisterClient, RegisterCommand } from "../../web-api-client";
import toast from "react-hot-toast";

const Register = () => {
  const [validateImage, setValidateImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  function handleImage(e: React.ChangeEvent<HTMLInputElement>): void {
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    const FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(undefined);
      setValidateImage("image field is required");
      return;
    }
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      setSelectedFile(undefined);
      setValidateImage(`image must be one of this types "jpg, jpeg ,png"`);
      return;
    }
    if (file.size > FILE_SIZE) {
      setSelectedFile(undefined);
      setValidateImage("image size must be below 2MB");
      return;
    }
    setSelectedFile(file);
    setValidateImage("");
  }
  return (
    <div className="mx-auto border p-5 register rounded-2 flex justify-content-between align-items-center flex-column gap-3 my-5 w-100">
      <FontAwesomeIcon icon={faBookOpen} className="mx-auto w-100 book-style" />
      <h1 className="playfair fw-bold text-center text-capitalize py-2">
        Create an account
      </h1>
      <p className="text-center inter opacity-75 text-capitalize ">
        join bookish and start discovering great books
      </p>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required("name field is required"),
          email: Yup.string()
            .email("email field have invalid format")
            .required("email field is required"),
          password: Yup.string()
            .required("password field is required")
            .min(6, "password must be more than 5 characters"),
          confirmPassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password")], "Passwords must match"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (selectedFile) {
            const base64: string = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (typeof reader.result === "string") {
                  resolve(reader.result);
                } else {
                  reject("File reading error: not a string.");
                }
              };
              reader.onerror = reject;
              reader.readAsDataURL(selectedFile);
            });
            const finalData: RegisterCommand = new RegisterCommand({
              fullname: values.fullName,
              email: values.email,
              confirmPassword: values.confirmPassword,
              password: values.password,
              image: base64,
            });
            const Register = new RegisterClient();
            const res = Register.registerUser(finalData);
            res
              .then((success) => {
                toast.success(success.message || "Email Created Successfully");
              })
              .catch((err) => {
                if (err) {
                  toast.error(err.errors[0]);
                } else {
                  toast.error("something went wrong try again later");
                }
              });
            setValidateImage("");
          } else {
            setValidateImage("image field is required");
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="py-3 d-flex justify-content-between align-items-start gap-4 flex-column  w-100"
          >
            <div className="w-100">
              <label
                htmlFor="fullName"
                className="inter text-capitalize form-label"
              >
                full name
              </label>
              <input
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                id="fullName"
                className="form-control"
              />
              <p className="normal-font text-center pt-1 text-danger m-0">
                {errors.fullName && touched.fullName && errors.fullName}
              </p>
            </div>
            <div className="w-100">
              <label
                htmlFor="email"
                className="inter text-capitalize form-label"
              >
                Email address
              </label>
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                id="email"
                className="form-control"
              />
              <p className="normal-font text-center pt-1 text-danger m-0">
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div className="w-100">
              <label
                htmlFor="password"
                className="inter text-capitalize form-label"
              >
                password
              </label>
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                id="password"
                className="form-control"
              />
              <p className="normal-font text-center pt-1 text-danger m-0">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <div className="w-100">
              <label
                htmlFor="confirmPassword"
                className="inter text-capitalize form-label"
              >
                confirm password
              </label>
              <input
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                id="confirmPassword"
                className="form-control"
              />
              <p className="normal-font text-center pt-1 text-danger m-0">
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </p>
            </div>
            <div className="w-100">
              <label
                htmlFor="image"
                className="inter text-capitalize form-label"
              >
                profile picture
              </label>
              <input
                onChange={handleImage}
                type="file"
                id="image"
                className="form-control"
              />
              <p className="normal-font text-center pt-1 text-danger m-0">
                {validateImage}
              </p>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-dark w-100 inter text-capitalize"
            >
              create account
            </button>
            <p className="text-capitalize inter">
              already have an accout ?
              <Link to="/login" className="text-decoration-none ms-2">
                login
              </Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
