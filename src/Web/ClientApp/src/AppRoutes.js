import Home from "./components/layout/Home";
import MyBooks from "./components/layout/MyBooks";
import Register from "./components/layout/register";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/my-books",
    element: <MyBooks />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default AppRoutes;
