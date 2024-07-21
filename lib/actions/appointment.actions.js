import { revalidatePath } from "next/cache";

const { ID, Query } = require("node-appwrite")
const { databases, messaging } = require("../appwrite.config")

const ids = {
    database_id:'669147b7000b00aa202f',
    Appointment_collection_id: '669adeef00371d8b2892',
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
export const getRecentAppointmentList = async () => {
    try {
      const appointments = await databases.listDocuments(
        ids.database_id,
        ids.Appointment_collection_id,
      [Query.limit(320)]
      );
      console.log(appointments)
      const initialCounts = {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      };
  
      const counts = appointments.documents.reduce(
        (acc, appointment) => {
          switch (appointment.status) {
            case "scheduled":
              acc.scheduledCount++;
              break;
            case "pending":
              acc.pendingCount++;
              break;
            case "cancelled":
              acc.cancelledCount++;
              break;
          }
          return acc;
        },
        initialCounts
      );
  
      const data = {
        totalCount: appointments.total,
        ...counts,
        documents: appointments.documents,
      };
  
      return data;
    } catch (error) {
      console.error(
        "An error occurred while retrieving the recent appointments:",
        error
      );
    }
};
export const updateAppointmentDocuments = async ({userId,appointmentId,appointment,type})=>{

  const updatedAppoitment = await databases.updateDocument(ids.database_id,ids.Appointment_collection_id,appointmentId,appointment);
   if(!updatedAppoitment){
    throw new Error('Appoitment Not Found');
   }
    // TODO SMS notification
    const messageContent = `${type === 'schedule'? `Your appoitment has been scheduled. Notes : ${appointment.reason}`:`Your appoitment has been Cancelled . the Reason ${appointment?.cancellationReason}` }`
    await sendSMS(userId,messageContent)
    // revalidatePath('/admin')
    return  updatedAppoitment

}
export const sendSMS = async (userId,content)=>{
  try {
    const message = await messaging.createSms(ID.unique(),content,[],[userId]);
    return message;
  } catch (error) {
    console.log(error);
  }
}
