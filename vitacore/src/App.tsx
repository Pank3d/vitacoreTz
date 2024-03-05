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

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    const formattedDay = date.getDate().toString().padStart(2, "0");
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const formattedYear = date.getFullYear();
    return `${formattedYear}.${formattedMonth}.${formattedDay}`;
  };

  const filterDataByDate = (
    data: any[],
    startDate: string,
    endDate: string
  ) => {
    return data.filter((item) => {
      const formateDate = formatDate(item);
      const itemDate = new Date(formateDate).getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      return itemDate >= start && itemDate <= end;
    });
  };

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
