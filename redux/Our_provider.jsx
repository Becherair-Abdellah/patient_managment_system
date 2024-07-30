'use client'
import { store } from "./store";
import { Provider } from "react-redux";
export function Our_provider({children}){
    return(
        <Provider store={store}>{children}</Provider>
    )
}