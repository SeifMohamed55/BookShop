import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import TagsDiv from "./TagsDiv";
import { useEffect, useState } from "react";
import { Book } from "../../types/interfaces/Book";

const HorizontalCard = ({
  bookDetails = [] as Book,
}: {
  bookDetails: Book;
}) => {
  const navigate = useNavigate();
  const [tagValues, setTagValuse] = useState<string[] | undefined>(undefined);
  
  useEffect(() => {
    if (bookDetails.categories) setTagValuse([...bookDetails.categories]);
  }, [bookDetails]);

  const handleRead = () => {
    navigate(`/read/${bookDetails.id}`);
  };

  return (
    <div className="horizontal-card-div border p-3 d-flex align-items-start flex-md-row flex-column gap-3 rounded-2 w-100">
      <figure className="horizontal-card mx-auto overflow-hidden position-relative rounded-2">
        <img
          src={bookDetails.imagePath}
          alt="book"
          className="img-fluid"
          height={250}
        />
        <div className="layer text-white pb-4 ps-3">
          <div className="position-absolute bottom-0">
            <h6 className="small-font fw-bold text-nowrap playfair">
              {bookDetails.title}
            </h6>
            <p className="times small-font opacity-75">
              by {bookDetails.author}
            </p>
          </div>
        </div>
      </figure>
      <article className="d-flex justify-content-between flex-column gap-1 w-100">
        <div className="d-flex justify-content-between align-items-center w-100">
          <h3 className="fs-4 playfair fw-bold">{bookDetails.title}</h3>
          <div className="d-flex justify-content-between align-items-center gap-0">
            {Array.from({
              length: Math.round(bookDetails.averageRating || 0),
            }).map((_, idx) => (
              <FontAwesomeIcon
                key={idx}
                icon={faStar}
                className="text-warning"
              />
            ))}
            <span className="px-2 fw-semibold times small">
              {bookDetails.averageRating}
            </span>
          </div>
        </div>
        <p className="opacity-75 times m-0">{bookDetails.totalPages} page</p>
        {tagValues ? <TagsDiv values={tagValues} isDark={false} /> : ""}
        <p className="times normal-font fw-fw-semibold">
          {bookDetails.description}
        </p>
        <button
          onClick={handleRead}
          type="button"
          className="btn btn-primary text-capitalize fw-semibold normal-font w-100"
        >
          <FontAwesomeIcon icon={faBookOpen} className="me-2" />
          Read
        </button>
      </article>
    </div>
  );
};

export default HorizontalCard;
