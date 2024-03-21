"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import QuestionTile from "./QuestionTile";

export default function QuestionPanel()
{
    const [data,setData] = useState((useSelector((state)=>state.examBank.questions)));
    useEffect(()=>{
        // console.log("data",data);
    },[])
    return (
        <div className="flex flex-col gap-3">
            {data && data.map((item,index)=>{
                return <div key={index}>
                     <QuestionTile item={item} index={index}/>
                </div>
            })} 
        </div >
    )
}

