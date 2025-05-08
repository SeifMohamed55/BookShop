import { Link, NavLink } from "react-router-dom"; // Use NavLink directly from react-router-dom
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import myPic from "../../images/my-pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faRightToBracket,
  faSignal,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleXmark,
  faEye,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

export default function Nav() {
  const [islogged, setIsLogged] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleProfile = (): void => {
    setIsProfileOpen(!isProfileOpen);
  };
  useEffect(() => {
    if (isProfileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isProfileOpen]);
  return (
    <header className="position-relative border-bottom">
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white  box-shadow container"
        light
      >
        <NavbarBrand className="playfair fw-bold me-5">
          <FontAwesomeIcon icon={faBookOpen} className="me-2" /> MyBookShelf
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={isOpen} className="flex-column flex-sm-row" navbar>
          <div className="navbar-nav flex-column flex-sm-row flex-grow-1 align-items-stretch align-items-sm-center gap-2 gap-sm-4 py-2">
            <NavItem className="w-100 text-center text-sm-start">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block nav-responsive ${
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
                to="/my-books"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block nav-responsive ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={faBook} className="me-lg-2" />
                <span className="d-none d-lg-inline">My Books</span>
              </NavLink>
            </NavItem>
            <NavItem className="w-100 text-center text-sm-start">
              <NavLink
                to="/book-clubs"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block nav-responsive ${
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
                to="/statistics"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block nav-responsive ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={faSignal} className="me-lg-2" />
                <span className="d-none d-lg-inline">Reading Stats</span>
              </NavLink>
            </NavItem>
            <NavItem
              className={`w-100 text-center text-sm-start ${
                islogged ? "d-none" : ""
              }`}
            >
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block nav-responsive ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <span className="d-md-inline">Register</span>
              </NavLink>
            </NavItem>
            <NavItem
              className={`w-100 text-center text-sm-start ${
                islogged ? "d-none" : ""
              }`}
            >
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block nav-responsive ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <span className="d-md-inline">Login</span>
              </NavLink>
            </NavItem>

            {/* Profile image pushed to the right on large screens */}
            <NavItem
              className={`ms-sm-auto mx-auto mt-sm-0 ${
                islogged ? "" : "d-none"
              }`}
            >
              <figure className="mb-0">
                <img
                  src={myPic}
                  alt="user profile"
                  width={40}
                  height={40}
                  className="rounded-circle ratio-1x1 pointer"
                  onClick={toggleProfile}
                />
              </figure>
            </NavItem>
          </div>
        </Collapse>
      </Navbar>
      <div
        className={`profile-div ${
          isProfileOpen ? "profile-scale-open" : "profile-scale-closed"
        }`}
      >
        <div className="closing-section">
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => {
              setIsProfileOpen(false);
            }}
          />
        </div>
        <div className="d-flex justify-content-between flex-column gap-2 p-3 w-100 h-100">
          <div className="border-bottom w-100">
            <p className="playfair fw-semibold m-0">Alex Johnson</p>
            <p className="times small-font opacity-75 m-0 py-1">@alexreads</p>
          </div>
          <div className="border-bottom w-100 profile-hover">
            <Link
              to={"/profile"}
              className="times fw-semibold text-capitalize pb-1 m-0 pointer text-decoration-none text-black"
            >
              <FontAwesomeIcon icon={faUser} className="me-2" />
              profile
            </Link>
          </div>
          <p
            onClick={() => {}}
            className="times fw-semibold text-capitalize m-0 pointer profile-hover "
          >
            <FontAwesomeIcon icon={faRightToBracket} className="me-2" />
            log out
          </p>
        </div>
      </div>
    </header>
  );
}
