import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import PopularBook from "../ui/PopularBook";

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
            <p className="text-center times h5 opacity-75">
              Track your reading journey, discover new books, and connect with a
              community of fellow book lovers.
            </p>
          </div>
        </section>
        <section className="container py-5">
          <h2 className="py-3">
            <FontAwesomeIcon icon={faArrowTrendUp} className="me-2 fw-light" />
            <span className="playfair fw-bold">Popular Books</span>
          </h2>
          <div className="row  g-5">
            {Array.from({ length: 5 }).map((book) => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <PopularBook />
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }
}
