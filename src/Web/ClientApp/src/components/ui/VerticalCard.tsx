import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { BookClub } from "../../types/interfaces/BookClub";
const VerticalCard = ({ bookClub }: { bookClub: BookClub }) => {
  return (
    <div className="vertical-card shadow rounded-2 overflow-hidden w-100">
      <figure className="position-relative">
        <img
          src={bookClub.imagePath}
          alt={bookClub.name || ""}
          className="img-fluid w-100 w-md-auto"
          width={280}
          height={120}
        />
        <div className="vertical-card-text  text-white  normal-font">
          <h3 className="playfair h5 fw-bold">{bookClub.name}</h3>
          <p className="inter small-font">
            <FontAwesomeIcon icon={faUserGroup} className="me-2" />
            {bookClub.numberOfMembers} members
          </p>
        </div>
      </figure>
      <div className="vertical-card-div d-flex justify-content-evenly gap-3 px-2">
        <figure className="overflow-hidden position-relative rounded-2">
          <img
            src={bookClub.mostPopularBook?.imagePath}
            alt={bookClub.mostPopularBook?.description}
            className="img-fluid w-100"
          />
          <div className="layer text-white pb-4 ps-2">
            <div className="position-absolute bottom-0 m-0">
              <h6 className="small-font playfair text-nowrap">
                {bookClub.mostPopularBook?.title}
              </h6>
              <p className="times small-font opacity-75">
                by {bookClub.mostPopularBook?.author}
              </p>
            </div>
          </div>
        </figure>
        <article className="d-flex justify-content-between flex-column gap-1">
          <h4 className="playfair fs-6 fw-semibold ">by : {bookClub.author}</h4>
          <p className="opacity-75 normal-font times">
            favourite book : {bookClub.mostPopularBook?.title}
          </p>
          <p className="times small-font ">{bookClub.description}</p>
        </article>
      </div>
      <div className="p-3">
        <button type="button" className="btn btn-dark w-100 normal-font times">
          {"View Book Club"}
        </button>
      </div>
    </div>
  );
};

export default VerticalCard;
