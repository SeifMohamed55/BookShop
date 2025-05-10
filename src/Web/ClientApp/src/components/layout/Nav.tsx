import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faRightToBracket,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleXmark,
  faEye,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userDataProvider";
import Cookies from "js-cookie";
import { LogoutClient } from "../../web-api-client";
import toast from "react-hot-toast";

export default function Nav() {
  const context = useContext(UserContext);
  const navigator = useNavigate();

  if (!context) {
    throw new Error("UserContext must be used within a UserDataProvider");
  }

  const { userData, setUserData } = context;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    document.body.style.overflow = isProfileOpen ? "hidden" : "auto";
  }, [isProfileOpen]);

  const handleLogout = () => {
    const client = new LogoutClient();
    client
      .logoutUser(undefined)
      .then((res) => {
        console.log(res);
        Cookies.remove("isSignedIn");
        localStorage.clear();
        setUserData(null);
        setIsSignedIn(false);
        setIsProfileOpen(false);
        navigator("/login");
        toast.success(res.message || "user logged out successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <header className="position-relative border-bottom">
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow container"
        light
      >
        <NavbarBrand className="playfair fw-bold me-5">
          <FontAwesomeIcon icon={faBookOpen} className="me-2" />
          MyBookShelf
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} className="flex-column flex-sm-row" navbar>
          <div className="navbar-nav flex-column flex-sm-row flex-grow-1 align-items-stretch align-items-sm-center gap-2 gap-sm-4 py-2">
            <NavItem className="w-100 text-center text-sm-start">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style mx-auto d-block nav-responsive ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={faEye} className="me-lg-2" />
                <span className="d-none d-lg-inline">Discover</span>
              </NavLink>
            </NavItem>
            <NavItem className="w-100 text-center text-sm-start">
              <NavLink
                to="/book-clubs"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style mx-auto d-block nav-responsive ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={faUserGroup} className="me-lg-2" />
                <span className="d-none d-lg-inline">Book Clubs</span>
              </NavLink>
            </NavItem>
            <NavItem className="w-100 text-center text-sm-start">
              <NavLink
                to="/my-books"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style mx-auto d-block nav-responsive ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={faBook} className="me-lg-2" />
                <span className="d-none d-lg-inline">My Books</span>
              </NavLink>
            </NavItem>

            {!userData && (
              <>
                <NavItem className="w-100 text-center text-sm-start">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `text-dark mx-auto nav-font nav-style d-block nav-responsive ${
                        isActive ? "nav-active" : ""
                      }`
                    }
                  >
                    <span className="d-md-inline">Register</span>
                  </NavLink>
                </NavItem>
                <NavItem className="w-100 text-center text-sm-start">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `text-dark nav-font mx-auto nav-style d-block nav-responsive ${
                        isActive ? "nav-active" : ""
                      }`
                    }
                  >
                    <span className="d-md-inline">Login</span>
                  </NavLink>
                </NavItem>
              </>
            )}

            {userData && (
              <NavItem className="ms-sm-auto mx-auto mt-sm-0 position-relative">
                <figure className="mb-0">
                  <img
                    src={userData?.imageUrl}
                    alt="user profile"
                    width={40}
                    height={40}
                    className="rounded-circle ratio-1x1 pointer"
                    onClick={toggleProfile}
                  />
                </figure>

                {/* Profile Popup Positioned Relative to Image */}
                <div
                  className={`profile-div position-absolute ${
                    isProfileOpen
                      ? "profile-scale-open"
                      : "profile-scale-closed"
                  }`}
                >
                  <div className="closing-section text-end pe-2 pt-1">
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={() => setIsProfileOpen(false)}
                      className="pointer"
                    />
                  </div>
                  <div className="d-flex justify-content-between flex-column gap-2 p-3 w-100 h-100">
                    <div className="border-bottom w-100">
                      <p className="playfair fw-semibold m-0">
                        {userData?.fullName}
                      </p>
                      <p className="times small-font opacity-75 m-0 py-1">
                        {userData?.email}
                      </p>
                    </div>
                    <div className="border-bottom w-100 profile-hover">
                      <Link
                        to="/profile"
                        className="times fw-semibold text-capitalize pb-1 m-0 w-100 d-block pointer text-decoration-none text-black"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Profile
                      </Link>
                    </div>
                    <p
                      onClick={handleLogout}
                      className="times fw-semibold text-capitalize m-0 pointer profile-hover"
                    >
                      <FontAwesomeIcon
                        icon={faRightToBracket}
                        className="me-2"
                      />
                      Log out
                    </p>
                  </div>
                </div>
              </NavItem>
            )}
          </div>
        </Collapse>
      </Navbar>
    </header>
  );
}
