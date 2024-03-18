import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'

export interface CounterState {
  createdExams: Object[],
  givenExams: Object[]
}

const initialState: CounterState = {
  createdExams: [],
  givenExams:[]
}

export const bank = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMyExams: (state, action: PayloadAction<Object>)=>{
      state.givenExams=action.payload as any;
    },
    setCreatedExams:(state,action:PayloadAction<Object>)=>{
      state.createdExams=[action.payload,...state.createdExams]
    }
  },
})
export const { } = bank.actions

export default bank.reducer