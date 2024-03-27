"use client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearSelectedExam, setQuestionsRedux } from "@/app/GlobalRedux/Features/counter/CounterSlice"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"
import QuestionPanel from "@/app/elements/QuestionPanel"
import Timer from "@/app/elements/Timer"
import toast, { ToastBar, Toaster } from 'react-hot-toast';

export default function Home({params}:{params:{id:number}})
{
    const data = useAuth();
    const dispatch = useDispatch();
    const examDetails= useSelector((state)=>state.examBank.selectedExam);
    const [loaded,setLoaded] = useState(false);
    async function downloadQuestions()
    {
        try {
          const response = await axios.get(`https://exambackend-kok8.onrender.com/exam/allQues?key=${examDetails.hashID}`,{
              headers: {
                Authorization: data.userId,
              },
            })
            
            dispatch(setQuestionsRedux(response.data.data.question));
            setLoaded(true);
            toast.success('Questions loaded successfully!');
        } catch (error) {
            toast.error('Failed to load questions.');
        }
    }
    function clearExam(){
      dispatch(clearSelectedExam())
    }
    useEffect(()=>{
        downloadQuestions();
        return (()=>{
          clearExam();
        })
    },[])
    return (
    <div className="flex flex-row ">
    { loaded && <QuestionPanel/>}
    <Timer/>
    <Toaster/>
    </div>
    )
}