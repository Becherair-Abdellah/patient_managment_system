import * as sdk from 'node-appwrite'
import config from './appwrite-config-export';

const client = new sdk.Client();

client.setEndpoint(config.ENDPOINT).setProject(config.NEXT_PUBLIC_PROJECT_ID).setKey(config.NEXT_PUBLIC_API_KEY);
export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
export const account = new sdk.Account(client);
