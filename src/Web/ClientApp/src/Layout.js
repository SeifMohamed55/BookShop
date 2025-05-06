import { Component } from "react";
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
