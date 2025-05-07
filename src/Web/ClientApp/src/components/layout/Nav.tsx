import { NavLink } from "react-router-dom"; // Use NavLink directly from react-router-dom
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
  faSignal,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow "
        light
      >
        <NavbarBrand to="/" className="playfair fw-bold me-4">
          <FontAwesomeIcon icon={faBookOpen} className="me-2" /> MyBookShelf
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={isOpen} className="flex-column flex-sm-row" navbar>
          <ul className="navbar-nav flex-column flex-sm-row flex-grow-1 align-items-stretch align-items-sm-center gap-2 gap-sm-4 py-2">
            <NavItem className="w-100 text-center text-sm-start">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block w-100 ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={faEye} className="me-md-2" />
                <span className="d-none d-md-inline">Discover</span>
              </NavLink>
            </NavItem>
            <NavItem className="w-100 text-center text-sm-start">
              <NavLink
                to="/my-books"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block w-100 ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={faBook} className="me-md-2" />
                <span className="d-none d-md-inline">My Books</span>
              </NavLink>
            </NavItem>
            <NavItem className="w-100 text-center text-sm-start">
              <NavLink
                to="/book-clubs"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block w-100 ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={faUserGroup} className="me-md-2" />
                <span className="d-none d-md-inline">Book Clubs</span>
              </NavLink>
            </NavItem>
            <NavItem className="w-100 text-center text-sm-start">
              <NavLink
                to="/statistics"
                className={({ isActive }) =>
                  `text-dark nav-font nav-style d-block w-100 ${
                    isActive ? "nav-active" : ""
                  }`
                }
              >
                <FontAwesomeIcon icon={faSignal} className="me-md-2" />
                <span className="d-none d-md-inline">Reading Stats</span>
              </NavLink>
            </NavItem>

            {/* Profile image pushed to the right on large screens */}
            <NavItem className="ms-sm-auto mx-auto mt-sm-0">
              <figure className="mb-0">
                <img
                  src={myPic}
                  alt="user profile"
                  width={40}
                  height={40}
                  className="rounded-circle ratio-1x1"
                />
              </figure>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}
