import {
  faClock,
  faStar,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopularBook from "../ui/PopularBook";
import MenuList from "../ui/menuList";
import { Fragment, useEffect, useState } from "react";
import HorizontalCard from "../ui/horizontalCard";
import myPic from "../../images/my-pic.jpg";
import { BooksClient } from "../../web-api-client";
import { PopularBooks } from "../../types/interfaces/PopularBooks";
import VerticalCard from "../ui/VerticalCard";
import { Book } from "../../types/interfaces/Book";

export default function Home() {
  const [popularBooks, setPopularBooks] = useState<PopularBooks[] | undefined>(
    undefined
  );
  const [allBooks, setAllBooks] = useState<Book[] | undefined>(undefined);
  const [mostPopularBook, setMostPopularBook] = useState<
    PopularBooks | undefined
  >(undefined);
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

  useEffect(() => {
    const client = new BooksClient();

    // Popular books data
    client
      .getPopularBooks()
      .then((res) => {
        setPopularBooks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    if (activeIndex === 0) {
      // all books data
      client
        .getAllBooks()
        .then((res) => {
          console.log(res);
          res.data?.length === 0
            ? setAllBooks(undefined)
            : setAllBooks(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      //get book by genre
      client
        .getBooksByGenre(listValues[activeIndex])
        .then((res) => {
          console.log(res);
          res.data?.length === 0
            ? setAllBooks(undefined)
            : setAllBooks(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    client
      .getMostPopularBook()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [activeIndex]);

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
          {popularBooks ? (
            popularBooks.map((book) => (
              <div key={book.id} className="col-lg-3 col-md-4 col-sm-6 col-12">
                <PopularBook bookVal={book} />
              </div>
            ))
          ) : (
            <h2 className="text-center playfair">
              no available books at the moment !
            </h2>
          )}
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
              {allBooks ? (
                allBooks.map((book) => (
                  <HorizontalCard bookDetails={book} key={book.id} />
                ))
              ) : (
                <h2 className="pt-3 playfair text-danger">
                  no available books at the moment !
                </h2>
              )}
            </div>
          </div>
        </div>

        {/* comments and book clubs  */}
        <aside className="col-xl-4 col-12">
          <h3 className="text-capitalize fw-bold h5 playfair py-2">
            <FontAwesomeIcon icon={faStar} className="me-2 fw-light" />
            trendy book
          </h3>

          <div className="d-flex justify-content-between align-items-center flex-column flex-xl-column flex-md-row gap-5">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 w-100">
              <VerticalCard />
            </div>
          </div>

          <h5 className="playfair fw-bold py-4">
            <FontAwesomeIcon
              icon={faClock}
              className="me-2 fw-light bg-transparent"
            />
            Recent Reviews on the trendy book
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
                        <div className="w-100 d-flex justify-content-between align-items-center flex-column flex-sm-row">
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <h2 className="times normal-font text-nowrap m-0 ">
                              @bookworm42
                            </h2>
                            <p className="small-font m-0 opacity-75 times ">
                              about 2 years ago
                            </p>
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
