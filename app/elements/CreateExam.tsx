"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useAuth } from '@clerk/clerk-react';
export default function CreateExam()
{
  const data = useAuth();
  async function submit()
  {
   const doc= { Name,
      StartTime,
      endTime,
      TimeLimit };
      const response = await axios.post("http://localhost:3001/exam/finalSubmit",{doc},{
        headers: {
          Authorization: data.userId,
        },
      });
  }
  const [Name,setName]= useState("");
  const [StartTime,setStartTime]= useState("");
  const [endTime,setendTime]= useState("");
  const [TimeLimit,setTimeLimit]= useState("");
  return (
  <div className="flex flex-col gap-2 sm:m-2">
       <Input type="text" placeholder="Name" value={Name}  onChange={(e)=>setName(e.target.value)}/>
       <Input type="datetime-local" placeholder="StartTime" value={StartTime} onChange={(e)=>setStartTime(e.target.value)}/>
       <Input type="datetime-local" placeholder="endTime" value={endTime}  onChange={(e)=>setendTime(e.target.value)}/>
       <Input type="time" placeholder="TimeLimit" value={TimeLimit} onChange={(e)=>setTimeLimit(e.target.value)}/>
       <DialogClose><Button onClick={submit}>Submit</Button></DialogClose>
  </div>
  )
}