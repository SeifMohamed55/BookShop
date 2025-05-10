import PrivateRoute from "./components/api-authorization/privateRoute";
import BookClubsPage from "./components/layout/BookClubs";
import Home from "./components/layout/Home";
import MyBooks from "./components/layout/MyBooks";
import { Navigate } from "react-router-dom";
import Register from "./components/layout/register";
import Login from "./components/layout/login";
import Profile from "./components/layout/Profile";
import BookReader from "./components/layout/BookReader";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/book-clubs",
    element: <BookClubsPage />,
  },
  {
    path: "/my-books",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <MyBooks />,
      },
    ],
  },
  {
    path: "/profile",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/read/:id",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <BookReader />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default AppRoutes;
