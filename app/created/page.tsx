"use client";
import { Fragment, useEffect, useState } from "react";
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { RootState } from "../GlobalRedux/store";
import { UseDispatch,useDispatch,useSelector } from "react-redux";
import { setMyExams,setCreatedExams} from "../GlobalRedux/Features/counter/CounterSlice"
import CreateExam from "../elements/CreateExam";
import CustomCards from "../elements/CustomCard";
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

export default function Home() {
  const [loaded,setLoaded] = useState(false);
  const { userId } = useAuth();
  const dispatch = useDispatch();
  
  async function downloadData() {
    try {
      const response = await axios.get("https://exambackend-kok8.onrender.com/exam/myExamsCreated", {
        headers: {
          Authorization: userId,
        },
      });
     dispatch(setCreatedExams(response.data.data));
     setLoaded(true);
     toast.success('Data loaded successfully!'); // Add success toast on data load
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error('Failed to fetch data.'); // Add error toast on failure
    }
  }
  useEffect(() => {
    downloadData();
  }, []);

  return (
    <div className="p-4">
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
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create/Announce Exam
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Exam</DialogTitle>
                  <DialogDescription>
                    <CreateExam />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </span>
        </div>
      </div>
      <div className="p-2 lg:mt-20">
        {loaded && <CustomCards  type="item"/>}
      </div>
      <Toaster position="top-right" /> {/* Add Toaster component to display toasts */}
    </div>
  );
}