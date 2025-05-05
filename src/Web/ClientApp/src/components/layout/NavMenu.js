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
import { Component } from "react";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <NavbarBrand to="/" className="playfair fw-bold">
            <FontAwesomeIcon icon={faBookOpen} className="me-2" /> MyBookShelf
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!this.state.collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow-1 d-flex align-items-center">
              <div className="d-flex flex-grow-1 gap-3">
                <NavItem>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-dark inter nav-font nav-style ${
                        isActive ? "nav-active" : ""
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    Discover
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/my-books"
                    className={({ isActive }) =>
                      `text-dark inter nav-font nav-style ${
                        isActive ? "nav-active" : ""
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={faBook} className="me-2" />
                    My Books
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/book-clubs"
                    className={({ isActive }) =>
                      `text-dark inter nav-font nav-style ${
                        isActive ? "nav-active" : ""
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={faUserGroup} className="me-2" />
                    Book Clubs
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/statistics"
                    className={({ isActive }) =>
                      `text-dark inter nav-font nav-style ${
                        isActive ? "nav-active" : ""
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={faSignal} className="me-2" />
                    Account
                  </NavLink>
                </NavItem>
              </div>

              {/* This pushes the image to the right end */}
              <NavItem className="ms-auto">
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
}
