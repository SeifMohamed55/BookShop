import { Formik } from "formik";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { LoginClient } from "../../web-api-client";
const Login = () => {
  async function postdata(data: any) {
    const client = new LoginClient();
    const res = await client.loginUser(data);
    return res;
  }
  return (
    <div className="mx-auto border p-5 login rounded-2 flex justify-content-between align-items-center flex-column gap-3 my-5">
      <FontAwesomeIcon icon={faBookOpen} className="mx-auto w-100 book-style" />
      <h1 className="playfair fw-bold text-center text-capitalize py-2">
        Sign in to myBookShelf
      </h1>
      <p className="text-center inter opacity-75 text-capitalize ">
        Access your account to join the bookish world
      </p>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("email field ha invalid format")
            .required("email field is required"),
          password: Yup.string()
            .required("password field is required")
            .min(6, "password must be more than 5 characters"),
          rememberMe: Yup.boolean(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          console.log(await postdata(values));
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
            <div className="w-100 form-check">
              <label
                htmlFor="rememberMe"
                className="inter text-capitalize form-check-label"
              >
                remember me
              </label>
              <input
                value={values.rememberMe}
                onChange={handleChange}
                onBlur={handleBlur}
                type="checkbox"
                id="rememberMe"
                className="form-check-input"
              />
              <p className="normal-font text-center pt-1 text-danger m-0">
                {errors.rememberMe && touched.rememberMe && errors.rememberMe}
              </p>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-dark w-100 inter text-capitalize"
            >
              Sign in
            </button>
            <p className="text-capitalize inter">
              you don't have an account ?
              <Link to="/login" className="text-decoration-none ms-2">
                sign up
              </Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
