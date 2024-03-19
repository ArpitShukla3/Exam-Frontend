"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useAuth } from '@clerk/clerk-react';
export default function GiveExam()
{
  const data = useAuth();
  async function submit()
  {
      const response = await axios.post("http://localhost:3001/exam/giveExam",{hash},{
        headers: {
          Authorization: data.userId,
        },
      });
      console.log(response);
  }
  const [hash,setHash]= useState("");
  return (
  <div className="flex flex-col gap-2 sm:m-2">
       <Input type="text" placeholder="Enter secret key " value={hash}  onChange={(e)=>setHash(e.target.value)}/>
       <DialogClose><Button onClick={submit}>Submit</Button></DialogClose>
  </div>
  )
}