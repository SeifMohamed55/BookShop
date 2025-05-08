import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";

const Register = () => {
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_SIZE = 2 * 1024 * 1024; // 2MB
  return (
    <div className="mx-auto border p-5 register rounded-2 flex justify-content-between align-items-center flex-column gap-3 my-5">
      <FontAwesomeIcon icon={faBookOpen} className="mx-auto w-100 book-style" />
      <h1 className="playfair fw-bold text-center text-capitalize py-2">
        Create an account
      </h1>
      <p className="text-center inter opacity-75 text-capitalize ">
        join bookish and start discovering great books
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          rePassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("name field is required"),
          email: Yup.string()
            .email("email field ha invalid format")
            .required("email field is required"),
          password: Yup.string()
            .required("password field is required")
            .min(6, "password must be more than 5 characters"),
          rePassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password")], "Passwords must match"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
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
                htmlFor="name"
                className="inter text-capitalize form-label"
              >
                full name
              </label>
              <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                id="name"
                className="form-control"
              />
              <p className="normal-font text-center pt-1 text-danger m-0">
                {errors.name && touched.name && errors.name}
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
                htmlFor="rePassword"
                className="inter text-capitalize form-label"
              >
                confirm password
              </label>
              <input
                value={values.rePassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                id="rePassword"
                className="form-control"
              />
              <p className="normal-font text-center pt-1 text-danger m-0">
                {errors.rePassword && touched.rePassword && errors.rePassword}
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
                type="file"
                id="image"
                className="form-control"
              />
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
