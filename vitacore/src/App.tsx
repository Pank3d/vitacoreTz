import { useContext, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { DataContext } from "./context/ContextForData";
import { filterDataByDate } from "./shared/date";

function App() {
  const { grif, sliz, raven, puff } = useContext(DataContext);
  const [startDate, setStartDate] = useState<string>("0001-01-01");
  const [endDate, setEndDate] = useState<string>(getCurrentDate());
  const [graphData, setGraphData] = useState<any[]>([]);
  const [draw, setDraw] = useState(false);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }


  
  const drawGraph = () => {
    const filteredGrif = filterDataByDate(grif, startDate, endDate);
    const filteredSliz = filterDataByDate(sliz, startDate, endDate);
    const filteredRaven = filterDataByDate(raven, startDate, endDate);
    const filteredPuff = filterDataByDate(puff, startDate, endDate);

    const filterData = [
      { faculty: "Gryffindor", count: filteredGrif.length },
      { faculty: "Slytherin", count: filteredSliz.length },
      { faculty: "Ravenclaw", count: filteredRaven.length },
      { faculty: "Hufflepuff", count: filteredPuff.length },
    ];

    setGraphData(filterData);
    setDraw(true);
  };

  const allData = [
    { faculty: "Gryffindor", count: grif.length },
    { faculty: "Slytherin", count: sliz.length },
    { faculty: "Ravenclaw", count: raven.length },
    { faculty: "Hufflepuff", count: puff.length },
  ];

  return (
    <div>
      <div>
        <p>От</p>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate || ""}
        />
        <p>До</p>
        <input
          type="date"
          value={endDate || ""}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={() => drawGraph()}>Отрисовать</button>
      </div>

      {draw ? (
        <BarChart width={600} height={400} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faculty" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      ) : (
        <BarChart width={600} height={400} data={allData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faculty" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
}

export default App;
