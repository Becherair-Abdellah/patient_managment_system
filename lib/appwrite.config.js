import * as sdk from 'node-appwrite'
const {
    PROJECT_ID,API_KEY,DATABASE_ID,PATIENT_COLLECTION_ID,APPIONTMENT_COLLECTION_ID,DOCTOR_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: PMS_BUCKET,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env;

const client = new sdk.Client();

client
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject('669146de001489075b60')
.setKey('50c642a6f7ab194ba09a8589140fe3cb4a62384337bfa139d194c6d8ae50c09901179e0005173e184d655bc18f35ae5898328f801aa54ad63383e7a864ad12759fb8a5c7d37e344a006df80cd33e033be6170e4c91c5225c844078fa768a3dcd51fe0392d258073417588f2e2929c792fc1c2e65f06792ea493e5c17b8f34618');



export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);