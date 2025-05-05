import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./components/layout/NavMenu";
import Footer from "./components/layout/footer";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="d-flex flex-column justify-content-between min-vh-100">
        <NavMenu />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
