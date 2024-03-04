import { useEffect, useState } from "react";
import { dataInter } from "./shared/type";
import { getInfo } from "./shared/api";

function App() {
  const [gariDate, setGariDate] = useState<dataInter[]>([]); 
  const [grif, setGrif] = useState<string[]>([]);
  const [sliz, setSliz] = useState<string[]>([]);
  const [puff, setPuff] = useState<string[]>([]);
  const [raven, setRaven] = useState<string[]>([]);
  const [student, setStudent] = useState<string[]>([]);
  

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
    const grifMembers = gariDate?.filter(
      (member: dataInter) =>
        member.house === "Gryffindor" &&
        member.hogwartsStudent === true  &&
        member.dateOfBirth !== null 
    );
    const grifDatesOfBirth = grifMembers?.map(
      (member: dataInter) => member.dateOfBirth
    );
    const slizMembers = gariDate?.filter(
      (member: dataInter) =>
        member.house === "Slytherin" &&
        member.hogwartsStudent === true &&
        member.dateOfBirth !== null
    );
    const slizDatesOfBirth = slizMembers?.map(
      (member: dataInter) => member.dateOfBirth
    );

    const ravenMembers = gariDate?.filter(
      (member: dataInter) =>
        member.house === "Gryffindor" &&
        member.hogwartsStudent === true &&
        member.dateOfBirth !== null
    );
    const ravenDatesOfBirth = ravenMembers?.map(
      (member: dataInter) => member.dateOfBirth
    );

     const puffMembers = gariDate?.filter(
       (member: dataInter) =>
         member.house === "Gryffindor" &&
         member.hogwartsStudent === true &&
         member.dateOfBirth !== null
     );
     const puffDatesOfBirth = puffMembers?.map(
       (member: dataInter) => member.dateOfBirth
     );
    
    

    const studentsMemb = gariDate.filter(
      (member:dataInter) => member.hogwartsStudent 
    )

    const studentsTrue = studentsMemb.map((member:dataInter) => member.name)



    setStudent(studentsTrue || [])
    setGrif(grifDatesOfBirth || []);
    setSliz(slizDatesOfBirth || [])
    setRaven(ravenDatesOfBirth || [])
    setPuff(puffDatesOfBirth || [])
  }, [gariDate]);

  console.log("факультет гриф", grif)
  console.log("факультет слизи", sliz)
  console.log("факультет raven", raven)
  console.log("факультет пуфф", puff)
  console.log(student)

  return <></>;
}

export default App;
