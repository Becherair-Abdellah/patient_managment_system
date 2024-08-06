import { ID, Query } from "node-appwrite";
import {
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET,
  ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID
} from "../appwrite-config-export";
import { createAdminClient } from "../appwrite.config";
// get all patients
export const getStatusData = async () => {
  const { database } = await createAdminClient();
  try {
    // scheduled appointmnets
    const total_scheduled_appointmnets = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
      [Query.equal("status", "scheduled")]
    );
    // pending appointmnets
    const total_pending_appointmnets = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
      [Query.equal("status", "pending")]
    );
    // canceled appointmnets
    const total_canceled_appointmnets = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
      [Query.equal("status", "canceled")]
    );
    return {
      scheduled_appointments: total_scheduled_appointmnets.total,
      pending_appointments: total_pending_appointmnets.total,
      canceled_appointmnets: total_canceled_appointmnets.total,
    };
  } catch (error) {
    console.log(error);
  }
};

// get patients
export const getPatients = async () => {
  try {
    const { database } = await createAdminClient();
    const total_patients = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_PATIENT_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );
    return total_patients;
  } catch (error) {
    console.log(error);
  }
};
// get appointments
export const getAppointmnets = async (pageSize,offset) => {
  try {
    const { database } = await createAdminClient();
    // scheduled appointmnets
    const appointments = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,[
        Query.limit(pageSize),
        Query.offset(offset),
        Query.orderDesc("$createdAt")
      ]
    );
    return appointments;
  } catch (error) {
    console.log(error);
  }
};

// update appointments 
export const update_appointment = async (documentId,Updateddata) => {
    try {
      const { database } = await createAdminClient();
      // scheduled appointments
      const appointment = await database.updateDocument(
        NEXT_PUBLIC_DATABASE_ID,
        NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
        documentId,
        Updateddata
      );
      return appointment;
    } catch (error) {
      console.log(error);
    }
  };


export const cancel_appointment = async (documentId,Updateddata) => {
    try {
      const { database } = await createAdminClient();
      // scheduled appointments
      const appointment = await database.updateDocument(
        NEXT_PUBLIC_DATABASE_ID,
        NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
        documentId,
        Updateddata
      );
      return appointment;
    } catch (error) {
      console.log(error);
    }
  };

export const register_doctor = async ({name,email,phone,photo})=>{
  try {
    const { database } = await createAdminClient();
    const {storage} = await createAdminClient();
    const file = await storage.createFile(NEXT_PUBLIC_BUCKET,ID.unique(),photo[0]);
    const doctor = await database.createDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
      ID.unique(),
      {
        name: name,
        email:email,
        phone:phone,
        photo:file?.$id
        ? `${ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET}/files/${file.$id}/view?project=${NEXT_PUBLIC_PROJECT_ID}`
        : null,

      }
    );
    return doctor;
  } catch (error) {
    console.log(error);
  }
}
export const edit_doctor = async ({name,email,phone,photo},DoctorId)=>{
  try {
    const { database } = await createAdminClient();
    const {storage} = await createAdminClient();
    // scheduled appointments
    let file;
    if(photo){
      file = await storage.createFile(NEXT_PUBLIC_BUCKET,ID.unique(),photo[0]);
    }
    const doctor = await database.updateDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_DOCTOR_COLLECTION_ID,DoctorId,
      {
        name: name,
        email:email,
        phone:phone,
        photo:file?.$id
        ? `${ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET}/files/${file.$id}/view?project=${NEXT_PUBLIC_PROJECT_ID}`
        : null,

      }
    );
    return doctor;
  } catch (error) {
    console.log(error);
  }
}
export const delete_doctor = async (DoctorId)=>{
  try {
    const { database } = await createAdminClient();
    const doctor = await database.deleteDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_DOCTOR_COLLECTION_ID,DoctorId
    );
    return doctor;
  } catch (error) {
    console.log(error);
  }
}
// get appointments
export const getDoctors = async (pageSize,offset) => {
  try {
    const { database } = await createAdminClient();
    // scheduled appointmnets
    const appointments = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_DOCTOR_COLLECTION_ID,[
        Query.limit(pageSize),
        Query.offset(offset),
        Query.orderDesc("$createdAt")
      ]
    );
    return appointments;
  } catch (error) {
    console.log(error);
  }
};
