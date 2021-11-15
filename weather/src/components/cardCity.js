import { useState, useEffect } from "react";
import { connect } from "react-redux";
import sun from "../images/sun.png";
import cloud from "../images/cloud.png";
import { actionWeather } from "../action/actionWeather";
import { Modal } from "./modal";
import { actionTemperature } from "../action/actionTemperature";

const api = {
  key: "e0fd81d05dcc732e6404704e8e443793",
  base: "https://api.openweathermap.org/data/2.5/",
};

const apiTemperature = {
  key: "a7159909346f74e5ba2a15322cd8cc2e",
  base: "https://api.openweathermap.org/data/2.5/forecast?q=",
};

const CityCard = ({ onWeather, onTemperature, list }) => {
  const [city, setCity] = useState("");
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("info")) || []
  );
  const [modalActive, setModalActive] = useState(false);
  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [feel, setFeel] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [description, setDescription] = useState("");
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = time.getMonth();
  let day = time.getDate();
  let amPm = hours < 12 ? "AM" : "PM";
  hours = hours > 12 ? hours - 12 : hours;
  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  let request = async () => {
    let result = await onWeather(api.base, city, api.key);
    if (result) {
      await setCards([...cards, result]);
      setCity("");
    } else {
      alert("City is not fined");
      setCity("");
    }
  };

  let update = async (index, city) => {
    let result = await onWeather(api.base, city, api.key);
    if (result) {
      cards.splice(index - 1, 1, result);
    }
  };
  useEffect(() => {
    localStorage.setItem(
      "info",
      JSON.stringify(
        cards.filter(
          (card, index, self) =>
            index === self.findIndex((t) => t.data.name === card.data.name)
        )
      )
    );
  }, [cards]);
  return cards ? (
    <>
      <div>
        {cards
          .filter(
            (card, index, self) =>
              index === self.findIndex((t) => t.data.name === card.data.name)
          )
          .map((res, index) => (
            <>
              <div className="py-5 h-100 d-flex justify-content-center" key = {res}>
                <div className="col-md-8 " >
                  <div
                    className="card"
                    style={{
                      color: "#4B515D",
                      borderRadius: "35px",
                      height: "415px",
                      boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
                    }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex">
                        <h6 className="flex-grow-1">{res.data?.name}</h6>
                        <div className="d-flex flex-column align-items-center">
                          <h6>{day + " " + months[month] + " "}</h6>
                          <h6 className="m-0">
                            {hours + ":" + minutes + " " + amPm}
                          </h6>
                        </div>
                      </div>
                      <div className="d-flex flex-column text-center mt-5 mb-4">
                        <h6
                          className="display-4 mb-0 font-weight-bold"
                          style={{ color: "#1C2331" }}
                        >
                          {" "}
                          {Math.round(res.data?.main.temp)} &#176;C
                        </h6>
                        <span className="small" style={{ color: "#868B94" }}>
                          {res.data?.weather[0].main}
                        </span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <button
                          className="btn btn-dark d-inline"
                          onClick={() => update(index, res.data?.name)}
                        >
                          <i className="bi bi-arrow-clockwise"></i>
                        </button>
                        <button
                          className="btn btn-primary mt-1"
                          onClick={() => (
                            setModalActive(true),
                            setName(res.data.name),
                            setTemp(Math.round(res.data?.main.temp)),
                            setFeel(Math.round(res.data?.main.feels_like)),
                            setMaxTemp(Math.round(res.data?.main.temp_max)),
                            setMinTemp(Math.round(res.data?.main.temp_min)),
                            setHumidity(res.data?.main.humidity),
                            setVisibility(res.data?.visibility),
                            setDescription(
                              res.data?.weather[0].description
                                .split(/\s+/)
                                ?.map(
                                  (word) =>
                                    word[0]?.toUpperCase() + word.substring(1)
                                )
                                .join(" ")
                            ),
                            onTemperature(
                              apiTemperature.base,
                              res.data.name,
                              apiTemperature.key
                            )
                          )}
                        >
                          Details<i className="bi bi-thermometer-high"></i>
                        </button>
                      </div>
                      <div className="d-flex align-items-center">
                        <div
                          className="flex-grow-1"
                          style={{ fontSize: "1rem" }}
                        >
                          <span className="ms-1">
                            {" "}
                            <i className="bi bi-wind"></i>{" "}
                            {`${res.data?.wind.speed} m/s`} <br />
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                setCards(cards.filter((item) => item !== res))
                              }
                            >
                              <i className="bi bi-x-circle"></i>
                            </button>
                          </span>
                        </div>
                        <div>
                          <img
                            src={res.data?.main.temp > 15 ? sun : cloud}
                            width="100px"
                            alt="img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        <div className="add ">
          <div className="d-flex">
            <div className="mr-0 mr-auto ml-0 ml-auto mb-5 d-flex flex-row justify-content-center">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              <button
                className="btn btn-primary btn-sm ml-2"
                onClick={() => request(cards)}
              >
                <i className="bi bi-cloud-plus-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        name={name}
        temp={temp}
        feel={feel}
        maxTemp={maxTemp}
        minTemp={minTemp}
        humidity={humidity}
        visibility={visibility}
        description={description}
      />
    </>
  ) : (
    <div className="contentPlus">
      <div className="mr-0 mr-auto ml-0 ml-auto mb-2 d-flex flex-row justify-content-center">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button
          className="btn btn-primary btn-sm ml-2"
          onClick={() => request(cards)}
        >
          <i className="bi bi-cloud-plus-fill"></i>
        </button>
      </div>
    </div>
  );
};

const ConnectedCard = connect(null, {
  onWeather: actionWeather,
  onTemperature: actionTemperature,
})(CityCard);

export default ConnectedCard;
