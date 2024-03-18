"use client"
import CustomCards from '@/elements/CustomCard';
import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateExam from '@/elements/CreateExam';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useSelector,useDispatch } from 'react-redux';
export default function Home() {
  const [createDiaglog,setCreateDialog] =useState(false);
  const [cardDetails,setCardDetails] = useState("");
  const data = useAuth();
  async function downloadData()
  {
    setCardDetails(await axios.get("http://localhost:3001/exam/myExamsCreated",{
      headers: {
        Authorization: data.userId,
      },
    }) )
  }
    useEffect(()=>{
       downloadData();
    },[])
    return (
        <div className='p-4'>
        <div className=" flex  items-center  justify-between px-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 truncate  text-3xl  tracking-tight">
              Exam Bank
            </h2>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className=" ml-3">
            <Dialog>
               <DialogTrigger>
               <button
              onClick={()=>setCreateDialog(!createDiaglog)}
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create/Announce Exam 
              </button>
                 </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                 <DialogTitle>Create Exam </DialogTitle>
                  <DialogDescription>
                 <CreateExam />
                 </DialogDescription>
                 </DialogHeader>
                 </DialogContent>
                 </Dialog>
         
            </span>
          </div>
          </div>
         <div className='p-2 lg:mt-20 '>
        {cardDetails&&<CustomCards details ={cardDetails.data.data}/>}
         </div>
        </div>
  );
}