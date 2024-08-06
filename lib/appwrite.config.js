// // import * as sdk from 'node-appwrite'
// import config from './appwrite-config-export';
// // import { Account,Client } from 'appwrite';
// import { Client ,Account} from 'node-appwrite';
// const adminClient = new Client()
// .setEndpoint(config.ENDPOINT)
// .setProject(config.NEXT_PUBLIC_PROJECT_ID)
// .setKey(config.API_KEY)

// // export const databases = new sdk.Databases(client);
// // export const users = new sdk.Users(client);
// // export const messaging = new sdk.Messaging(client);
// // export const storage = new sdk.Storage(client);
// export const account = new Account(adminClient);


// import * as sdk from 'node-appwrite'
import config from "./appwrite-config-export";
// import { Account,Client } from 'appwrite';
import { Client, Account, Databases, Storage } from "node-appwrite";

const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(config.ENDPOINT)
    .setProject(config.NEXT_PUBLIC_PROJECT_ID)
    .setKey(config.NEXT_PUBLIC_API_KEY);
    return {
        get account(){
            return new Account(client);
        },
        get database(){
            return new Databases(client)
        },
        get storage(){
            return new Storage(client)
        }
    }
};

// create session
const createSessionClient = async (request) => {
    const client = new Client()
      .setEndpoint(config.ENDPOINT)
      .setProject(config.NEXT_PUBLIC_PROJECT_ID)

      const session = request.cookies.get('session')
      if(session){
      const setSession =  client.setSession(session.value);
        
      }

      return {
          get account(){
              return new Account(client);
          }
      }
  };
export {createAdminClient,createSessionClient}
// database





