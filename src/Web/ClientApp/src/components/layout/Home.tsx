import {
  faClock,
  faStar,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopularBook from "../ui/PopularBook";
import MenuList from "../ui/menuList";
import { Fragment, useState } from "react";
import HorizontalCard from "../ui/horizontalCard";
import VerticalCard from "../ui/VerticalCard";
import myPic from "../../images/my-pic.jpg";

export default function Home() {
  const [listValues] = useState<string[]>([
    "all genres",
    "fiction",
    "non-fiction",
    "fantasy",
  ]);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  function handleLists(index: number): void {
    setActiveIndex(index);
  }

  return (
    <main>
      {/* hero section  */}
      <section className="hero py-5">
        <div className="container d-flex justify-content-between align-items-center flex-column gap-3 py-5">
          <h1 className="playfair fw-bold header-font text-center">
            Your Digital Bookshelf
          </h1>
          <p className="text-center times large-font opacity-75">
            Track your reading journey, discover new books, and connect with a
            community of fellow book lovers.
          </p>
        </div>
      </section>

      {/* popular books section  */}
      <section className="container-lg py-5">
        <h2 className="py-3">
          <FontAwesomeIcon icon={faArrowTrendUp} className="me-2 fw-light" />
          <span className="playfair fw-bold">Popular Books</span>
        </h2>
        <div className="row g-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <PopularBook />
            </div>
          ))}
        </div>
      </section>

      {/* Discover book section  */}
      <section className="container-lg py-5 row mx-auto g-5">
        <div className="col-xl-8 col-12">
          <div>
            <h2 className="playfair text-capitalize py-2 fw-bold">
              discover books
            </h2>
            <MenuList
              values={listValues}
              onClick={handleLists}
              activeIndex={activeIndex}
            />
            <div className="d-flex justify-content-between align-items-center gap-5 flex-column">
              {Array.from({ length: 6 }).map((card, idx) => (
                <HorizontalCard key={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* comments and book clubs  */}
        <aside className="col-xl-4 col-12">
          <h3 className="text-capitalize fw-bold h5 playfair py-2">
            <FontAwesomeIcon icon={faStar} className="me-2 fw-light" />
            book clubs
          </h3>

          <div className="d-flex justify-content-between align-items-center flex-column flex-xl-column flex-md-row gap-5">
            {Array.from({ length: 2 }).map((_, idx) => (
              <VerticalCard key={idx} />
            ))}
          </div>

          <h5 className="playfair fw-bold py-4">
            <FontAwesomeIcon
              icon={faClock}
              className="me-2 fw-light bg-transparent"
            />
            Recent Reviews
          </h5>

          <div className="py-3 comments-overview ">
            <div className="d-flex justify-content-between align-items-center flex-column gap-2">
              {Array.from({ length: 2 }).map((_, idx) => (
                <Fragment key={idx}>
                  <div className="d-flex border justify-content-between align-items-center rounded-2 flex-column">
                    <div className=" p-3 w-100 d-flex justify-content-between gap-2 flex-column flex-sm-row">
                      <figure className="mx-auto">
                        <img
                          src={myPic}
                          alt="user"
                          width={40}
                          height={40}
                          className="rounded-circle"
                        />
                      </figure>
                      <div className="d-flex justify-content-between gap-2 flex-column">
                        <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row">
                          <div className="d-flex align-items-center">
                            <h2 className="times normal-font text-nowrap m-0">
                              @bookworm42
                            </h2>
                            <span className="ms-3 small-font opacity-75 times">
                              about 2 years ago
                            </span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <FontAwesomeIcon
                                key={idx}
                                icon={faStar}
                                className="text-warning"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="times normal-gont">
                          This book completely changed my perspective on life
                          and choices. The concept of a library containing books
                          of all the possible lives you could have lived is
                          brilliantly executed.
                        </p>
                      </div>
                    </div>
                    <div className="border-top w-100">
                      <div className="d-flex justify-content-between align-items-center p-3">
                        <div className="d-flex align-items-center times like-comment-style rounded-2 p-2">
                          <FontAwesomeIcon icon={faThumbsUp} className="me-2" />{" "}
                          32
                        </div>
                        <div className="d-flex align-items-center like-comment-style rounded-2 p-2 ">
                          <FontAwesomeIcon icon={faStar} className="me-2" /> 2
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
