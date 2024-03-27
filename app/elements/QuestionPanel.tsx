"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionTile from "./QuestionTile";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

export default function QuestionPanel() {
  const authData = useAuth();
  const path = usePathname();
  const examID = useSelector((state) => state.examBank.selectedExam._id);
  const [data, setData] = useState(
    useSelector((state) => state.examBank.questions)
  );
  async function SubmitFinal() {
    const url =(path.split('/')[1]=='uploadAnswer')? "https://exambackend-kok8.onrender.com/exam/generateResult": "https://exambackend-kok8.onrender.com/exam/finalSubmit"; 
    try {
      const response = await axios.post(url,
       { examID: examID,doc:{examID:examID}},
        {
          headers: {
            Authorization: authData.userId,
          },
        }
      );
      toast.success('Submission successful!');
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error('Failed to submit.');
    }
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
      <Toaster/>
    </div>
  );
}
