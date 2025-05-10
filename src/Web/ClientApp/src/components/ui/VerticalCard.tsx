import React from 'react';
import { Card, CardBody, CardImg } from 'reactstrap';
import { BookClub } from '../../types/interfaces/BookClubData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

interface VerticalCardProps {
  bookClub: BookClub;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ bookClub }) => {
  return (
    <div className="vertical-card">
      <Card className="border-0 shadow-sm hover-card">
        <CardImg
          top
          src={bookClub.imagePath}
          alt={bookClub.name}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <CardBody>
          <h5 className="card-title playfair fw-bold">{bookClub.name}</h5>
          <p className="card-text text-muted small">{bookClub.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUsers} className="text-primary me-2" />
              <span className="small">{bookClub.numberOfMembers} members</span>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faBook} className="text-primary me-2" />
              <span className="small">{bookClub.books.length} books</span>
            </div>
          </div>
        </CardBody>
        <div className="p-3">
          <button type="button" className="btn btn-dark w-100 normal-font times">
            View Book Club
          </button>
        </div>
      </Card>
    </div>
  );
};

export default VerticalCard;
