import PrivateRoute from "./components/api-authorization/privateRoute";
import BookClubsPage from "./components/layout/BookClubs";
import Home from "./components/layout/Home";
import Login from "./components/layout/login";
import MyBooks from "./components/layout/MyBooks";
import Register from "./components/layout/register";

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
    Children: [
      {
        index: true,
        element: <MyBooks />,
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
];

export default AppRoutes;
