"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useAuth } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

export default function GiveExam()
{
  const data = useAuth();
  async function submit()
  {
      try {
        const response = await axios.post("https://exambackend-kok8.onrender.com/exam/giveExam",{hash},{
          headers: {
            Authorization: data.userId,
          },
        });
        toast.success('Exam submitted successfully!'); // Show success toast
        console.log(response);
      } catch (error) {
        toast.error('Failed to submit exam.'); // Show error toast if submission fails
        console.error(error);
      }
  }
  const [hash,setHash]= useState("");
  return (
  <div className="flex flex-col gap-2 sm:m-2">
       <Input type="text" placeholder="Enter secret key " value={hash}  onChange={(e)=>setHash(e.target.value)}/>
       <DialogClose><Button onClick={submit}>Submit</Button></DialogClose>
       <Toaster position="top-right" /> {/* Add Toaster component to display toasts */}
  </div>
  )
}