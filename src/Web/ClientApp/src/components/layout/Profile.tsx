import React, { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styling/Profile.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userDataProvider";
import VerticalCard from "../ui/VerticalCard";

const Profile: React.FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("UserContext must be used within a UserDataProvider");
  }

  const { userData } = context;

  const sliderSettings = {
    dots: true,
    infinite: false,
    breakpoint: 1400,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleStartReading = (bookId: number) => {
    navigate(`/read/${bookId}`);
  };

  return (
    <Container className="py-5">
      <Row className="align-items-center g-5 w-100">
        {/* User Profile Section */}
        <Col lg={4} className="mb-4 profile-section">
          <Card className="border-0 shadow-sm">
            <CardBody className="text-center">
              <div className="profile-image-container mb-4">
                <img
                  src={userData?.imageUrl || ""}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h2 className="playfair fw-bold mb-2">{userData?.fullName}</h2>
              <p className="text-muted mb-4">{userData?.email}</p>

              <div className="d-flex flex-column gap-3">
                <div className="stats-item d-flex align-items-center justify-content-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="text-primary" />
                  <span>Member since March 2024</span>
                </div>
                <div className="stats-item d-flex align-items-center justify-content-center gap-2">
                  <FontAwesomeIcon icon={faBook} className="text-primary" />
                  <span> Books added</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Purchased Books Section */}
        <Col lg={8}>
          <h3 className="playfair fw-bold mb-4">My Library</h3>
          <div className="books-slider">
            <Slider {...sliderSettings}>
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="px-2">
                  <Card className="h-100 border-0 shadow-sm hover-card"></Card>
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
