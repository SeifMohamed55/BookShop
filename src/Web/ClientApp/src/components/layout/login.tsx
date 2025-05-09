import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { LoginClient, LoginCommand } from "../../web-api-client";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userDataProvider";
import Cookies from "js-cookie";
const Login = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within a UserDataProvider");
  }

  const { userData, setUserData } = context;
  useEffect(() => {
    if (userData) {
      localStorage.setItem("fullName", userData.fullName as string);
      localStorage.setItem("email", userData.email as string);
      localStorage.setItem("id", userData.id as string);
      localStorage.setItem("imageUrl", userData.imageUrl as string);
    }
  }, [userData]);
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
            .email("email field have invalid format")
            .required("email field is required"),
          password: Yup.string()
            .required("password field is required")
            .min(6, "password must be more than 5 characters"),
          rememberMe: Yup.boolean(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const finalValues: LoginCommand = new LoginCommand(values);
          const client = new LoginClient();
          client
            .loginUser(finalValues)
            .then((res) => {
              console.log(res);
              setUserData({ ...res.data });
              Cookies.set("isSignedIn", "true"); // ✅ Add this line
              toast.success(res.message || "User Logged in Successfully");
            })
            .catch((err) => {
              if (err) {
                toast.error(err.message);
              } else {
                toast.error("something went wrong try again later");
              }
            });
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
                checked={values.rememberMe}
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
              <Link to="/register" className="text-decoration-none ms-2">
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
