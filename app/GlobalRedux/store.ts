"use client";
import { configureStore } from "@reduxjs/toolkit";
import bank from "./Features/counter/CounterSlice"
export const store =configureStore({
    reducer:{
        examBank:bank
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =typeof store.dispatch;