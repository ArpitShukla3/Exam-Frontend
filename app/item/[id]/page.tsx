"use client"
import AddQuestions from "@/app/elements/AddQuestions";
import { setSelectedExam } from "@/app/GlobalRedux/Features/counter/CounterSlice";
import { RootState } from "@/app/GlobalRedux/store"
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

export default function Comp({params}:{params:{id:Number}})
{
    const data = useAuth();
    const dispatch =useDispatch();
    const [ques,setQues] = useState([]);
    const [response,setResponse] = useState();
    const [examID,setExamID] = useState();
    const details  = useSelector((state:RootState) => state.examBank.createdExams)[0]; 
    async function downloadData(){
        const response = await axios.get(`http://localhost:3001/exam/examDetails?examID=${details[params.id]._id}`,{
            headers: {
              Authorization: data.userId,
            },
          });
          setResponse(response.data.data.hashID);
          // setExamID(response)
          // console.log(response);
    }
    function clearExam(){
      dispatch(setSelectedExam({}))
  }
    useEffect(()=>{
      downloadData();
      return (()=>{
        clearExam();
      })
    },[])
     
    return (
        <>
          <AddQuestions hash ={response}/>
        </>
    )
}