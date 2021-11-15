import {useState } from "react";
import { connect } from "react-redux";
import "../App.css";
import { VictoryChart, VictoryLine} from "victory";

export const TempSchedule = ({ list }) => {
  const [data, setData] = useState([]);
  let result = [];
  return data.length < 1 ? (
    <>
      <button
        className="btn btn-success"
        onClick={() => {
          list?.map((res, index) => {
            result.push({
              x: res.dt_txt.split(" ")[1].split(":")[0],
              y: Math.round(res.main.temp - 273.15),
            });
            setData(result);
          });
        }}
      >
        Show temperature hourly
      </button>
    </>
  ) : (
    <>
      <div className="tempContent">
        <VictoryChart>
          <VictoryLine width={100} data={data} />
        </VictoryChart>
        <button className="btn btn-danger" onClick={() => setData([])}>
          Close
        </button>
      </div>
    </>
  );
};

const CTemp = connect((state) => ({
  list: state?.temperature?.payload?.data?.list?.slice(0, 8),
}))(TempSchedule);

export default CTemp;
