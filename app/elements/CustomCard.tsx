"use client";
import { useEffect, useState } from "react";
import "./customStyles.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import Link from "next/link";
import { setSelectedExam } from "../GlobalRedux/Features/counter/CounterSlice";

export default function CustomCards({ type }: { type: string }) {  // type -> "exam","upload","item"
    type createdExamsType = { Name: string, hashID: string, endTime: string, StartTime: string, TimeLimit: string }[];
    const details = useSelector((state: RootState) => (type=="item"||type=="uploadAnswer") ? state.examBank.createdExams[0]:state.examBank.givenExams);
    // const type  =(isGivenExamCard) ? 'exam':"item";
    const dispatch = useDispatch();
    function setExam({item}:{item:Object}){
        dispatch(setSelectedExam(item))
    }
    function formatDateTime(dateTimeString) {
        // Create a new Date object from the given string
        const date = new Date(dateTimeString);
      
        // Get the year, month, and day from the Date object
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
      
        // Get the hours and minutes from the Date object
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        // Determine the ordinal suffix for the day
        const ordinalSuffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : (day % 100 - day % 10 != 10) * day % 10];
      
        // Format the date and time string
        const formattedDateTime = `${day}${ordinalSuffix} ${month}, ${year} Time: ${hours}:${minutes}`;
      
        return formattedDateTime;
      }
    return (
        <>
            <div className="cards">
                {
                    details && details.map((item, index) => {
                        return (
                            <div className="card red" key={index}>
                                <Link href={`/${type}/${index}`}  onClick={()=>setExam({item})}>
                                    <p className="tip">{item.Name}</p>
                                    <div className="second-text">
                                        <h3>Start Time :{formatDateTime(item.StartTime)}</h3>
                                        <h3>End Time : {formatDateTime(item.endTime)}</h3>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}
