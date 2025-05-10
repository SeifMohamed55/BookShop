import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./Layout";
import "./custom.scss";
import { Toaster } from "react-hot-toast";
import React, { Component } from "react";

export default class App extends Component {
  static displayName = App.name;

  // Helper function to recursively render routes
  renderRoutes = (routes) => {
    return routes.map(({ element, children, ...rest }, index) => (
      <Route key={index} {...rest} element={element}>
        {children && this.renderRoutes(children)}
      </Route>
    ));
  };

  render() {
    return (
      <Layout>
        <Routes>{this.renderRoutes(AppRoutes)}</Routes>
        <Toaster />
      </Layout>
    );
  }
}
