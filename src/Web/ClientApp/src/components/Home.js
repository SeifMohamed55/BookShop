import { Component } from "react";
import VerticalCard from "./VerticalCard";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <VerticalCard />
      </div>
    );
  }
}
