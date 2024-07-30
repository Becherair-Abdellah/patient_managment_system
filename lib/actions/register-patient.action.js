import { createAdminClient } from "../appwrite.config";
import { NEXT_PUBLIC_DATABASE_ID,NEXT_PUBLIC_PATIENT_COLLECTION_ID,NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID } from "../appwrite-config-export";
import { ID } from "node-appwrite";

export const register_patient = async (data)=>{
    try {
        const {database} = await createAdminClient();
       const patient =  database.createDocument(NEXT_PUBLIC_DATABASE_ID,NEXT_PUBLIC_PATIENT_COLLECTION_ID,ID.unique(),data);
       return patient;
    } catch (error) {
        console.log(error);
    }
}

export const register_appointment = async (data)=>{
    try {
        const {database} = await createAdminClient();
       const appointment =  database.createDocument(NEXT_PUBLIC_DATABASE_ID,NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,ID.unique(),data);
       return appointment;
    } catch (error) {
        console.log(error);
    }
}


export const get_user = async ()=>{
    try {
        const {account} = await createAdminClient();
        const user = await account.get();
        return user;
        
    } catch (error) {
        console.log(error);
    }
}