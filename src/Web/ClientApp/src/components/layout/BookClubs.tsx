import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import CreateBookClubModal from "../ui/CreateBookClubModal";
import HeroSection from "../ui/HeroSection";
import FilterBar from "../ui/FilterBar";
import Slider, { Settings } from "react-slick";
import VerticalCard from "../ui/VerticalCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { BookClubsClient } from "../../web-api-client";
import { BookClub } from "../../types/interfaces/BookClubData";

const BookClubsPage: React.FC = () => {
  const [bookClub, setBookClub] = useState<BookClub[]>([]);

  useEffect(() => {
    const client = new BookClubsClient();
    client
      .getBookClubs()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  var settings: Settings = {
    dots: true,
    infinite: false,
    lazyLoad: "ondemand",
    arrows: true,
    nextArrow: <FontAwesomeIcon icon={faArrowRight} />,
    prevArrow: <FontAwesomeIcon icon={faArrowLeft} />,
    speed: 500,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const toggleModal = () => setModal(!modal);

  return (
    <div className="book-clubs-page">
      <HeroSection toggleModal={toggleModal} />

      {/* Search and Filter Section */}
      <Container className="my-5">
        <FilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Book Clubs Section */}
      </Container>

      {/* Create Book Club Modal */}
      <CreateBookClubModal isOpen={modal} toggle={toggleModal} />

      {/* slider  */}
      <Container className="my-5">
        <h2 className="playfair fw-bold mb-4">Popular Book Clubs</h2>
        <Slider {...settings}>
          {Array.from({ length: 6 }).map((item, idx) => (
            <div key={idx}>
              <VerticalCard />
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default BookClubsPage;
