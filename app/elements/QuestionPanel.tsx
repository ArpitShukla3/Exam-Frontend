"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionTile from "./QuestionTile";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function QuestionPanel() {
  const authData = useAuth();
  const path = usePathname();
  const examID = useSelector((state) => state.examBank.selectedExam._id);
  const [data, setData] = useState(
    useSelector((state) => state.examBank.questions)
  );
  async function SubmitFinal() {
    const url =(path.split('/')[1]=='uploadAnswer')? "http://localhost:3001/exam/generateResult": "http://localhost:3001/exam/finalSubmit"; 
    // const url = 
    const response = await axios.post(url,
     { examID: examID,doc:{examID:examID}},
      {
        headers: {
          Authorization: authData.userId,
        },
      }
    );
  }
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col gap-3">
      {data &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <QuestionTile item={item} index={index} />
            </div>
          );
        })}
      <Button onClick={SubmitFinal}>{(path.split('/')[1]=="uploadAnswer")?"Generate Results":"Submit Final"} </Button>
    </div>
  );
}
