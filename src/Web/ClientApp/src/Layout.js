import { Component } from "react";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/footer";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="d-flex flex-column justify-content-between min-vh-100">
        <Nav />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
