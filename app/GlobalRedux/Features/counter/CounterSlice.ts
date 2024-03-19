"use client"
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'

export interface BankState {
  createdExams: Object[],
  givenExams: Object[]
}

const initialState: BankState = {
  createdExams: [],
  givenExams:[]
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
    }
  },
})
export const { setMyExams,setCreatedExams} = bank.actions

export default bank.reducer