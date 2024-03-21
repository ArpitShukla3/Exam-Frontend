"use client"
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'

export interface BankState {
  createdExams: Object[],
  givenExams: Object[],
  questions:Object[],
  selectedExam:Object,

}

const initialState: BankState = {
  createdExams: [],
  givenExams:[],
  questions:[],
  selectedExam:{},

}

export const bank = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    setMyExams: (state, action: PayloadAction<Object>)=>{
      const arr=action.payload;
      state.givenExams=[...arr];
    },
    setCreatedExams:(state,action:PayloadAction<Object>)=>{
      state.createdExams=[action.payload,...state.createdExams]
    },
    setQuestionsRedux:(state,action)=>{
        state.questions=[...action.payload];
    },
    setSelectedExam:(state,action)=>{
      state.selectedExam=action.payload
    },
    clearSelectedExam:(state)=>{
      state.selectedExam={};
    }
  },
})
export const { setMyExams,setCreatedExams,setQuestionsRedux,setSelectedExam,clearSelectedExam} = bank.actions

export default bank.reducer