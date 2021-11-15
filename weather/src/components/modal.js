import "../modal.css";
import CTemp from "./tempSchedule";

export const Modal = ({
  active,
  setActive,
  name,
  temp,
  feel,
  maxTemp,
  minTemp,
  humidity,
  visibility,
  description,
}) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modalContent">
        <h1>{name}</h1>
        <div className="modalInfo">
          <div className="modalItem">
            <i className="bi bi-thermometer-high h2"></i>
            <h2 className="d-inline-block">
              {" "}
              <span style={{ color: "grey" }}> Temperature - </span>
              {temp}&#176;C{" "}
            </h2>
          </div>
          <div className="modalItem">
            <i className="bi bi-thermometer-half h2"></i>
            <h2 className="d-inline-block">
              {" "}
              <span style={{ color: "grey" }}>Feel like - </span>
              {feel}&#176;C{" "}
            </h2>
          </div>
          <div className="modalItem">
            <i className="bi bi-thermometer-sun h2"></i>
            <h2 className="d-inline-block">
              {" "}
              <span style={{ color: "grey" }}>Maximal temperature - </span>
              {maxTemp}&#176;C{" "}
            </h2>
          </div>
          <div className="modalItem">
            <i className="bi bi-thermometer-snow h2"></i>
            <h2 className="d-inline-block">
              {" "}
              <span style={{ color: "grey" }}>Minimal temperature - </span>
              {minTemp}&#176;C{" "}
            </h2>
          </div>
          <div className="modalItem">
            <i className="bi bi-moisture h2"></i> &nbsp;
            <h2 className="d-inline-block">
              {" "}
              <span style={{ color: "grey" }}>Humidity - </span>
              {humidity}%
            </h2>
          </div>
          <div className="modalItem">
            <i className="bi bi-eyeglasses h2"></i> &nbsp;
            <h2 className="d-inline-block">
              {" "}
              <span style={{ color: "grey" }}>Visibility - </span>
              {visibility}m{" "}
            </h2>
          </div>
          <div className="modalItem">
            <i className="bi bi-pencil-square h2"></i> &nbsp;
            <h2 className="d-inline-block">
              {" "}
              <span style={{ color: "grey" }}>Description - </span>
              {description}
            </h2>
          </div>
        </div>
        <CTemp />
        <button className="btn" onClick={() => setActive(false)}>
          Ok
        </button>
      </div>
    </div>
  );
};
