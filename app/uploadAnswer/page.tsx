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
export default function Home() {
  const [loaded,setLoaded] = useState(false);
  const { userId } = useAuth();
  const dispatch = useDispatch();
  async function downloadData() {
    try {
      const response = await axios.get("http://localhost:3001/exam/myExamsCreated", {
        headers: {
          Authorization: userId,
        },
      });
     dispatch(setCreatedExams(response.data.data));
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
            Upload Answer Key
          </h2>
        </div>
      </div>
      <div className="p-2 lg:mt-20">
        {loaded && <CustomCards  type="uploadAnswer"/>}
      </div>
    </div>
  );
}