import { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <main className="">
        <section className="hero py-5 ">
          <div className="container d-flex justify-content-between align-items-center flex-column gap-3 py-5">
            <h1 className="playfair fw-bold header-font">
              Your Digital Bookshelf
            </h1>
            <p className="text-center inter h5 opacity-75">
              Track your reading journey, discover new books, and connect with a
              community of fellow book lovers.
            </p>
          </div>
        </section>
      </main>
    );
  }
}
