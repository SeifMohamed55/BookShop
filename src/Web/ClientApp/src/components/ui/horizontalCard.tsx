import { faBookmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import myPic from "../../images/my-pic.jpg";

const HorizontalCard = (): React.ReactNode => {
  function handleClick(): void {}
  return (
    <div className="border p-3 d-flex align-items-start gap-3 rounded-2">
      <figure>
        <img
          src={myPic}
          alt="book"
          className="rounded-2 object-fit-contain img-fluid"
          width={100}
          height={150}
        />
      </figure>
      <article className="d-flex justify-content-between flex-column gap-1">
        <div className="d-flex justify-content-between align-items-center w-100">
          <h3 className="fs-4 playfair fw-bold">{"The Midnight Library"}</h3>
          <div className="d-flex justify-content-between align-items-center gap-0">
            {Array.from({ length: 5 }).map((star) => (
              <FontAwesomeIcon icon={faStar} className="text-warning" />
            ))}
            <span className="px-2 fw-semibold inter small">{4.6}</span>
          </div>
        </div>
        <p className="opacity-75 inter m-0">{"Matt Haig"}</p>
        <div className="d-flex align-items-center gap-2">
          {Array.from({ length: 3 }).map((tag) => (
            <div className="px-2 rounded-pill border inter text-capitalize small-font fw-semibold">
              fiction
            </div>
          ))}
        </div>
        <p className="inter normal-font fw-fw-semibold">
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
