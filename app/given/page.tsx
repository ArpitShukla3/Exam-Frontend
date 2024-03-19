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
import GiveExam from "../elements/GiveExam";
export default function Home() {
  const [loaded,setLoaded] = useState(false);
  const { userId } = useAuth();
  const dispatch = useDispatch();
  async function downloadData() {
    try {
      const response = await axios.get("http://localhost:3001/exam/myExamsGiven", {
        headers: {
          Authorization: userId,
        },
      });
      // console.log(response)
      // console.log(response.data.examsGiven)
     dispatch(setMyExams(response.data.examsGiven));
     setLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
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
                   + Give Exam
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter Exam Details</DialogTitle>
                  <DialogDescription>
                    <GiveExam />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </span>
        </div>
      </div>
      <div className="p-2 lg:mt-20">
        {loaded && <CustomCards  isGivenExamCard={true}/>}
      </div>
    </div>
  );
}