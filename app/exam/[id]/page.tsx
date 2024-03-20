"use client"
import { useEffect, useState } from "react"
import { useDispatch, UseDispatch, useSelector } from "react-redux"
import { setQuestionsRedux } from "@/app/GlobalRedux/Features/counter/CounterSlice"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"
import QuestionPanel from "@/app/elements/QuestionPanel"
export default function Home({params}:{params:{id:number}})
{
    const data = useAuth();
    const dispatch = useDispatch();
    const examDetails= useSelector((state)=>state.examBank.givenExams[params.id]);
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
    }
    useEffect(()=>{
        downloadQuestions();
    },[])
    return (
    <>
    <QuestionPanel/>
    </>
    )
}