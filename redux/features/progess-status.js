
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    basic: false,
    schedule: false,
    success: false,
  };
export const progress_status = createSlice({
    name: "nbr_product",
    initialState,
    reducers:{
        basic_action: (state)=>{
            state.basic = !state.basic
            return state;
        },
        schedule_action: (state)=>{
            state.schedule = !state.schedule
            return state;
        },
        success_action: (state)=>{
            state.success = !state.success
            return state;
        },
    },
});
export const {basic_action,schedule_action,success_action} = progress_status.actions;
export default progress_status.reducer;
