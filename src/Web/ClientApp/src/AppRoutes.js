import Home from "./components/layout/Home";
import MyBooks from "./components/layout/MyBooks";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/my-books",
    element: <MyBooks />,
  },
];

export default AppRoutes;
