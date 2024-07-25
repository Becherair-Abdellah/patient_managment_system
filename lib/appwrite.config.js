import * as sdk from 'node-appwrite'
import config from './appwrite-config-export';
import { Account,Client } from 'appwrite';
const client = new Client()
.setEndpoint(config.ENDPOINT)
.setProject(config.NEXT_PUBLIC_PROJECT_ID)

// export const databases = new sdk.Databases(client);
// export const users = new sdk.Users(client);
// export const messaging = new sdk.Messaging(client);
// export const storage = new sdk.Storage(client);
export const account = new Account(client);
