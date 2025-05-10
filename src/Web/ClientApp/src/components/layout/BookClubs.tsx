import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import CreateBookClubModal from "../ui/CreateBookClubModal";
import HeroSection from "../ui/HeroSection";
import FilterBar from "../ui/FilterBar";
import Slider, { Settings } from "react-slick";
import VerticalCard from "../ui/VerticalCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { BookClubsClient } from "../../web-api-client";
import { BookClub, mapBookClubDtoToBookClub } from "../../types/interfaces/BookClubData";

const BookClubsPage: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookClubs, setBookClubs] = useState<BookClub[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookClubs = async () => {
      try {
        const client = new BookClubsClient();
        const response = await client.getBookClubs();
        if (response.data) {
          const mappedBookClubs = response.data.map(mapBookClubDtoToBookClub);
          setBookClubs(mappedBookClubs);
        } else {
          setBookClubs(undefined);
        }
      } catch (err) {
        console.error('Error fetching book clubs:', err);
        setError('Failed to load book clubs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookClubs();
  }, []);

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
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-5 text-danger">
            <p>{error}</p>
          </div>
        ) : bookClubs && bookClubs.length > 0 ? (
          <div className="mt-4">
            <h2 className="playfair fw-bold mb-4">Popular Book Clubs</h2>
            <Slider {...settings}>
              {bookClubs.map((club) => (
                <div key={club.id}>
                  <VerticalCard bookClub={club} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="text-center py-5">
            <p>No book clubs found.</p>
          </div>
        )}
      </Container>

      {/* Create Book Club Modal */}
      <CreateBookClubModal isOpen={modal} toggle={toggleModal} />
    </div>
  );
};

export default BookClubsPage;
