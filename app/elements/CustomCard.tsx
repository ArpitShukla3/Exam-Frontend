"use client";
import { useEffect, useState } from "react";
import "./customStyles.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import Link from "next/link";

export default function CustomCards({ isGivenExamCard }: { isGivenExamCard: boolean }) {
    type createdExamsType = { Name: string, hashID: string, endTime: string, StartTime: string, TimeLimit: string }[];
    const details = useSelector((state: RootState) => (isGivenExamCard ? state.examBank.givenExams : state.examBank.createdExams[0]));
    const type  =(isGivenExamCard) ? 'exam':"item";
    return (
        <>
            <div className="cards">
                {
                    details && details.map((item, index) => {
                        return (
                            <div className="card red" key={index}>
                                <Link href={`/${type}/${index}`}>
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
