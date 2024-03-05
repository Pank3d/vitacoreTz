import React, { useEffect, useState } from "react";
import { getInfo } from "../shared/api";
import { dataInter } from "../shared/type";

export const DataContext = React.createContext<{
  gariDate: dataInter[];
  grif: string[];
  sliz: string[];
  puff: string[];
  raven: string[];
}>({
  gariDate: [],
  grif: [],
  sliz: [],
  puff: [],
  raven: [],
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gariDate, setGariDate] = useState<dataInter[]>([]);
  const [grif, setGrif] = useState<string[]>([]);
  const [sliz, setSliz] = useState<string[]>([]);
  const [puff, setPuff] = useState<string[]>([]);
  const [raven, setRaven] = useState<string[]>([]);

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
      member.hogwartsStudent === true &&
      member.dateOfBirth !== null
  );
  const grifDatesOfBirth = grifMembers.map((member: dataInter) => member.dateOfBirth);

  const slizMembers = gariDate.filter(
    (member: dataInter) =>
      member.house === "Slytherin" &&
      member.hogwartsStudent === true &&
      member.dateOfBirth !== null
  );
  const slizDatesOfBirth = slizMembers.map((member: dataInter) => member.dateOfBirth);

  const ravenMembers = gariDate.filter(
    (member: dataInter) =>
      member.house === "Ravenclaw" &&
      member.hogwartsStudent === true &&
      member.dateOfBirth !== null
  );
  const ravenDatesOfBirth = ravenMembers.map((member: dataInter) => member.dateOfBirth);
  const puffMembers = gariDate.filter(
    (member: dataInter) =>
      member.house === "Hufflepuff" &&
      member.hogwartsStudent === true &&
      member.dateOfBirth !== null
  );
  const puffDatesOfBirth = puffMembers.map((member: dataInter) => member.dateOfBirth);

  setGrif(grifDatesOfBirth || []);
  setSliz(slizDatesOfBirth || []);
  setRaven(ravenDatesOfBirth || []);
  setPuff(puffDatesOfBirth || []);
}, [gariDate]);


  return (
    <DataContext.Provider value={{gariDate, grif, sliz, puff, raven}}>
      {children}
    </DataContext.Provider>
  );
};
