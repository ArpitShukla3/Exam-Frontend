"use client"
import { useEffect, useState } from "react"
import { useDispatch, UseDispatch, useSelector } from "react-redux"
import { clearSelectedExam, setQuestionsRedux, setSelectedExam } from "@/app/GlobalRedux/Features/counter/CounterSlice"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"
import QuestionPanel from "@/app/elements/QuestionPanel"
import Timer from "@/app/elements/Timer"
export default function Home({params}:{params:{id:number}})
{
    const data = useAuth();
    const dispatch = useDispatch();
    const examDetails= useSelector((state)=>state.examBank.selectedExam);
    const [loaded,setLoaded] = useState(false);
    async function downloadQuestions()
    {
        // console.log(examDetails)
        const response = await axios.get(`http://localhost:3001/exam/allQues?key=${examDetails.hashID}`,{
            headers: {
              Authorization: data.userId,
            },
          })
          
        //   console.log(response.data.data.question);
          dispatch(setQuestionsRedux(response.data.data.question));
          setLoaded(true);
    }
    function clearExam(){
      dispatch(clearSelectedExam())
  }
    useEffect(()=>{
      // alert("You cannot reload this page again. load the page from given exam menu");  
        downloadQuestions();
        return (()=>{
          clearExam();
        })
    },[])
    return (
    <div className="flex flex-row ">
    { loaded && <QuestionPanel/>}
    <Timer/>
    </div>
    )
}