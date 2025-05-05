import React from "react";
import myPic from "../images/my-pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

const VerticalCard = () => {
  return (
    <div className="vertical-card shadow rounded-2  overflow-hidden">
      <figure className="position-relative">
        <img
          src={myPic}
          alt=""
          className="object-fit-cover"
          width={280}
          height={120}
        />
        <div className="vertical-card-text  text-white  normal-font">
          <h3 className="playfair h5 fw-bold">Contemporary Fiction</h3>
          <p className="inter small-font">
            <FontAwesomeIcon icon={faUserGroup} className="me-2" />
            156 members
          </p>
        </div>
      </figure>
      <div className="d-flex justify-content-evenly gap-0">
        <figure>
          <img
            src={myPic}
            alt=""
            className="rounded-2"
            width={100}
            height={120}
          />
        </figure>
        <article className="d-flex justify-content-between  flex-column gap-1">
          <p className="inter normal-font fw-semibold">Currently Reading</p>
          <h4 className="playfair fs-6 fw-semibold ">The Midnight Library</h4>
          <p className="opacity-75 normal-font  ">by Matt Haig</p>
          <p className="inter small-font ">We read and discuss...</p>
        </article>
      </div>
      <div className="p-3">
        <button type="button" className="btn btn-dark w-100">
          {"View Book Club"}
        </button>
      </div>
    </div>
  );
};

export default VerticalCard;
