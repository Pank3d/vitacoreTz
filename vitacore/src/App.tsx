import { useEffect, useState } from "react";
import { dataInter } from "./shared/type";
import { getInfo } from "./shared/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const [gariDate, setGariDate] = useState<dataInter[]>([]);
  const [grif, setGrif] = useState<string[]>([]);
  const [sliz, setSliz] = useState<string[]>([]);
  const [puff, setPuff] = useState<string[]>([]);
  const [raven, setRaven] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInfo();
        setGariDate(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (gariDate.length === 0) return;

    const grifMembers = gariDate.filter(
      (member: dataInter) =>
        member.house === "Gryffindor" &&
        member.hogwartsStudent === true/*  &&
        member.dateOfBirth !== null */
    );
    const grifDatesOfBirth = grifMembers.map((member: dataInter) =>
       (member.dateOfBirth)  
    );

    const slizMembers = gariDate.filter(
      (member: dataInter) =>
        member.house === "Slytherin" &&
        member.hogwartsStudent === true /* &&
        member.dateOfBirth !== null */
    );
    const slizDatesOfBirth = slizMembers.map((member: dataInter) =>
       (member.dateOfBirth)  
    );

    const ravenMembers = gariDate.filter(
      (member: dataInter) =>
        member.house === "Ravenclaw" &&
        member.hogwartsStudent === true /* &&
        member.dateOfBirth !== null */
    );
    const ravenDatesOfBirth = ravenMembers.map((member: dataInter) =>
       (member.dateOfBirth)  
    );

    const puffMembers = gariDate.filter(
      (member: dataInter) =>
        member.house === "Hufflepuff" &&
        member.hogwartsStudent === true /* &&
        member.dateOfBirth !== null */
    );
    const puffDatesOfBirth = puffMembers.map((member: dataInter) =>
       (member.dateOfBirth)  
    );

    setGrif(grifDatesOfBirth || []);
    setSliz(slizDatesOfBirth || []);
    setRaven(ravenDatesOfBirth || []);
    setPuff(puffDatesOfBirth || []);
  }, [gariDate]);

  console.log("факультет гриф", grif);
  console.log("факультет слизи", sliz);
  console.log("факультет raven", raven);
  console.log("факультет пуфф", puff);
  console.log(startDate);
  console.log(endDate);

  const allData = [
    { faculty: "Gryffindor", count: grif.length },
    { faculty: "Slytherin", count: sliz.length },
    { faculty: "Ravenclaw", count: raven.length },
    { faculty: "Hufflepuff", count: puff.length },
  ];

  return (
    <>
      <div>
        <p>от</p>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate || ""}
        />
        <p>до</p>
        <input
          type="date"
          value={endDate || ""}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      {endDate === "" && startDate === "" ? (
        <>
          <BarChart width={600} height={400} data={allData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="faculty" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </>
      ) : (
        <>Тут будут отсортированные данные</>
      )}
    </>
  );
}

export default App;
