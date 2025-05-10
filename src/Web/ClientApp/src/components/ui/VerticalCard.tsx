import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import myPic from "../../images/my-pic.jpg";
import horizontalPic from "../../images/horizontal-image.jpeg";
const VerticalCard = () => {
  return (
    <div className="vertical-card shadow rounded-2 overflow-hidden w-100">
      <figure className="position-relative">
        <img
          src={horizontalPic}
          alt=""
          className="img-fluid w-100 w-md-auto"
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
      <div className="vertical-card-div d-flex justify-content-evenly gap-3 px-2">
        <figure className="overflow-hidden position-relative rounded-2">
          <img src={myPic} alt="" className="img-fluid w-100" />
          <div className="layer text-white pb-4 ps-2">
            <div className="position-absolute bottom-0 m-0">
              <h6 className="small-font playfair text-nowrap">Atomic Habits</h6>
              <p className="times small-font opacity-75">by james Clear</p>
            </div>
          </div>
        </figure>
        <article className="d-flex justify-content-between flex-column gap-1">
          <p className="times text-capitalize normal-font fw-semibold">
            Currently Reading
          </p>
          <h4 className="playfair fs-6 fw-semibold ">The Midnight Library</h4>
          <p className="opacity-75 normal-font  times">by Matt Haig</p>
          <p className="times small-font ">We read and discuss...</p>
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
