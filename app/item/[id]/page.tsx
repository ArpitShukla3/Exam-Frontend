"use client"
import AddQuestions from "@/app/elements/AddQuestions";
import { setSelectedExam } from "@/app/GlobalRedux/Features/counter/CounterSlice";
import { RootState } from "@/app/GlobalRedux/store"
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

export default function Comp({params}:{params:{id:Number}})
{
    const data = useAuth();
    const dispatch = useDispatch();
    const [ques,setQues] = useState([]);
    const [response,setResponse] = useState();
    const [examID,setExamID] = useState();
    const details  = useSelector((state:RootState) => state.examBank.createdExams)[0]; 
    async function downloadData(){
        try {
            const response = await axios.get(`https://exambackend-kok8.onrender.com/exam/examDetails?examID=${details[params.id]._id}`,{
                headers: {
                  Authorization: data.userId,
                },
              });
              setResponse(response.data.data.hashID);
              toast.success('Data downloaded successfully!');
        } catch (error) {
            console.error('Failed to download data:', error);
            toast.error('Failed to download data.');
        }
    }
    function clearExam(){
      dispatch(setSelectedExam({}))
      toast('Exam cleared');
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
          <Toaster/>
        </>
    )
}