import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import Footer from "./footer";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="d-flex flex-column justify-content-between min-vh-100">
        <NavMenu />
        <Container tag="main">{this.props.children}</Container>
        <Footer />
      </div>
    );
  }
}
