import { createAdminClient } from "../appwrite.config";
import { NEXT_PUBLIC_DATABASE_ID,NEXT_PUBLIC_PATIENT_COLLECTION_ID,NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID } from "../appwrite-config-export";
import { ID, Query } from "node-appwrite";

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


// export const get_user = async ()=>{
//     try {
//         const {account} = await createAdminClient();
//         const user = await account.get();
//         return user;
        
//     } catch (error) {
//         console.log(error);
//     }
// }
export const getAppointment = async (appointmentId)=>{
    try {
        const {database} = await createAdminClient();
        const appointment = await database.getDocument(NEXT_PUBLIC_DATABASE_ID,NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,appointmentId);
        return appointment;
    } catch (error) {
        console.log(error);
    }
}

export const getLastAppointemnt = async (userId)=>{
    try {
        const {database} = await createAdminClient();
        const patients = await database.listDocuments(NEXT_PUBLIC_DATABASE_ID,NEXT_PUBLIC_PATIENT_COLLECTION_ID,[ Query.equal('userId', userId),
            Query.orderDesc('$createdAt')]);
        console.log(patients.documents);
        const lastAppointment = await database.listDocuments(NEXT_PUBLIC_DATABASE_ID,NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,[ Query.equal('patientId', patients.documents[0].$id),
        Query.orderDesc('$createdAt')]);
        console.log(lastAppointment.documents[0]);
        return lastAppointment.documents[0];
    } catch (error) {
        console.log(error);
    }
}