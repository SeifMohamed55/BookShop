import { faBookmark, faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import myPic from "../../images/my-pic.jpg";

const HorizontalCard = () => {
  function handleClick(): void {}
  return (
    <div className="horizontal-card-div border p-3 d-flex align-items-start flex-md-row flex-column gap-3 rounded-2 w-100">
      <figure className="horizontal-card mx-auto overflow-hidden position-relative rounded-2">
        <img src={myPic} alt="book" className="img-fluid" height={250} />
        <div className="layer text-white pb-4 ps-3">
          <div className="position-absolute bottom-0">
            <h6 className="small-font fw-bold text-nowrap playfair">
              Atomic Habits
            </h6>
            <p className="times small-font opacity-75">by james Clear</p>
          </div>
        </div>
      </figure>
      <article className="d-flex justify-content-between flex-column gap-1">
        <div className="d-flex justify-content-between align-items-center w-100">
          <h3 className="fs-4 playfair fw-bold">{"The Midnight Library"}</h3>
          <div className="d-flex justify-content-between align-items-center gap-0">
            {Array.from({ length: 5 }).map((star, idx) => (
              <FontAwesomeIcon
                key={idx}
                icon={faStar}
                className="text-warning"
              />
            ))}
            <span className="px-2 fw-semibold times small">{4.6}</span>
          </div>
        </div>
        <p className="opacity-75 times m-0">{"Matt Haig"}</p>
        <div className="d-flex align-items-center gap-2">
          {Array.from({ length: 3 }).map((tag, idx) => (
            <div
              key={idx}
              className="px-2 rounded-pill border times text-capitalize small-font fw-semibold"
            >
              fiction
            </div>
          ))}
        </div>
        <p className="times normal-font fw-fw-semibold">
          {
            "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University."
          }
        </p>
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-dark text-capitalize fw-semibold normal-font"
        >
          <FontAwesomeIcon icon={faBookmark} className="me-3" />
          Add to library
        </button>
      </article>
    </div>
  );
};

export default HorizontalCard;
