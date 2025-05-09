import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import bookPic from "../../images/book-image.svg";
interface HeroSectionProps {
  toggleModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ toggleModal }) => {
  return (
    <div
      className="hero-section py-5"
      style={{
        background: "linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)",
        color: "white",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={7}>
            <h1 className="playfair fw-bold display-4 mb-3">
              Join a Community of Book Lovers
            </h1>
            <p className="lead mb-4">
              Discover book clubs based on your interests, join discussions, and
              connect with readers from around the world.
            </p>
            <div className="d-flex gap-3">
              <Button color="light" className="fw-bold" onClick={toggleModal}>
                <FontAwesomeIcon icon={faPlus} className="me-2" /> Create a Book
                Club
              </Button>
              <Button color="light" outline className="fw-bold">
                <FontAwesomeIcon icon={faSearch} className="me-2" /> Browse
                Popular Clubs
              </Button>
            </div>
          </Col>
          <Col md={5} className="d-none d-md-block">
            <div className="device-mockup">
              <figure
                className="d-flex justify-content-center bg-light bg-opacity-25 rounded-4 border border-2 border-white border-opacity-25 p-4"
                style={{
                  height: "300px",
                  width: "80%",
                  margin: "0 auto",
                }}
              >
                <img
                  src={bookPic}
                  alt="book"
                  className="img-fluid text-white"
                />
              </figure>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
