import { configureStore } from "@reduxjs/toolkit";
import progessStatus from "./features/progess-status";
export const store = configureStore({
    reducer: {
        progessStatus,
    },
})