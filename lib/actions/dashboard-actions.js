import { Query } from "node-appwrite";
import {
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
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
    console.log(total_patients)
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
    console.log(appointments);
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
