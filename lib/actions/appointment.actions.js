const { ID, Query } = require("node-appwrite")
const { databases } = require("../appwrite.config")

const ids = {
    database_id:'669147b7000b00aa202f',
    Appointment_collection_id: '66914945001b7168df47',
    bucket_id:'66914ab3003076ee8058',
    endpoint: 'https://cloud.appwrite.io/v1',
    project_id: '669146de001489075b60',

}
export const registerNewAppoinetment = async (appointmentData)=>{
    try{
        const newAppointment = await databases.createDocument(ids.database_id,ids.Appointment_collection_id,
            ID.unique(),appointmentData
        );
        return newAppointment;
    }
    catch (error)
    {
        console.log(error);
    }

}
export const getAppointment = async (appointmentId)=>{
    try{
        const appointment = databases.getDocument(ids.database_id,ids.Appointment_collection_id,appointmentId);
        return appointment;
    }catch (error){
        console.log(error);
    }
}
export const getRecentAppointmentList = async ()=>{
    try{
        const appointment = await databases.listDocuments(ids.database_id,ids.Appointment_collection_id,[Query.orderDesc("$createdAt")]);
        const counts = {
            scheduleCounts : 0,
            pendingCounts: 0,
            canceledCounts: 0,
        }

        const dataCounts = appointment.documents.reduce((acc,appointment)=>{
            if(appointment.status === 'scheduled'){
                acc.scheduleCounts = acc.scheduleCounts+1
            }
            if(appointment.status === 'pending'){
                acc.pendingCounts = acc.pendingCounts+1
            }
            if(appointment.status === 'canceled'){
                acc.canceledCounts = acc.canceledCounts+1
            }
            return acc
        },counts)

        const data = {
            totalCount: appointment.total,
            ...dataCounts,
            doucments:appointment.documents
        }
        console.log(data);
        
        return data;
    }
    catch(error){
        console.log(error);
    }
}