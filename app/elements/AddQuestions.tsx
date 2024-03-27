"use client"
import { Button } from "@/components/ui/button";
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import InputTile from "./InputTile";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

export default function AddQuestions({hash}:{hash:String})
{
    const data = useAuth();
    const [questionLength,setQuestionLength] = useState(0);
    const [questions,setQuestions] = useState([]);
    // const dispatch= useDispatch();
    type ques={
        question:String, 
        image: String,
        optionA: String,
        optionB: String,
        optionC: String,
        optionD: String,
    }
    const doc:any = {
        question:"", 
        image: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
    }
    async function submit()
  {
    console.log(questions);
    // console.log(hash);
    try {
        const response = await axios.post("https://exambackend-kok8.onrender.com/exam/addQues",{hashID:hash,questions:questions},{
        headers: {
          Authorization: data.userId,
        },
      });
      toast.success('Questions submitted successfully!'); // Add success toast on submit
    } catch (error) {
      console.error("Error submitting questions:", error);
      toast.error('Failed to submit questions.'); // Add error toast on failure
    }
  }
  async function downlaodQuestions(hash){
    // console.log("responsed",hash);
    try {
        const response = hash && await axios.get(`https://exambackend-kok8.onrender.com/exam/allQues?key=${hash}`,{
            headers: {
              Authorization: data.userId,
            },
          });
        //   console.log("responsedddddd",response);
        if (response && response.data && response.data.data && response.data.data.question) {
            setQuestions(response.data.data.question);
            toast.success('Questions downloaded successfully!'); // Add success toast on download
        }
    } catch (error) {
      console.error("Error downloading questions:", error);
      toast.error('Failed to download questions.'); // Add error toast on failure
    }
    //  console.log("questions",questions)
  }
  useEffect(()=>{
    downlaodQuestions(hash);
  },[hash])
    return (
        <>
         <div className="p-4">
      <div className=" flex  items-center  justify-between px-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 truncate  text-3xl  tracking-tight">
            Exam Bank
          </h2>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className=" ml-3">
                <button
                  onClick={()=>setQuestions([...questions,doc])}
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                 Add Questions +
                </button>
          </span>
        </div>
      </div>
    </div>
        <div>
            {
                questions.map((item,index) => {
                    return  <InputTile key={index} array={questions} arrayIndex ={index} setFunction={setQuestions}/>
                })
            }
            {
                questions && <Button onClick={submit}>Sumbit</Button>
            }
        </div>
        <Toaster position="top-right" /> {/* Add Toaster component to display toasts */}
        </>
    )
}