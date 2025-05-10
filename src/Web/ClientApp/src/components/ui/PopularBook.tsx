import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { PopularBooks } from "../../types/interfaces/PopularBooks";

const PopularBook = ({ bookVal }: { bookVal: PopularBooks }) => {
  return (
    <div className="popular-book d-flex justify-content-between align-items-center flex-column gap-1 mx-auto">
      <figure className="popular-book overflow-hidden position-relative rounded-2">
        <img
          src={bookVal.imagePath}
          alt={bookVal ? bookVal.title : "popular book"}
          className=" img-fluid"
          width={200}
        />
        <div className="layer text-white pb-4 ps-3">
          <div className="position-absolute bottom-0">
            <h6 className="h6 playfair">{bookVal.title}</h6>
            <p className="times small-font opacity-75">by {bookVal.author}</p>
          </div>
        </div>
      </figure>
      <h5 className="playfair h6 m-0">
        average rating : {bookVal.averageRating}
      </h5>
      <p className="normal-font opacity-75 m-0 times">
        total pages  : {bookVal.totalPages}
      </p>
      <div className="d-flex justify-content-between align-items-center small-font">
        {Array.from({ length: 5 }).map((star, idx) => (
          <FontAwesomeIcon key={idx} icon={faStar} className="text-warning" />
        ))}
      </div>
    </div>
  );
};

export default PopularBook;
