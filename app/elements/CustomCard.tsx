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
                                        <h3>Start Time : {item.StartTime}</h3>
                                        <h3>End Time : {item.endTime}</h3>
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
