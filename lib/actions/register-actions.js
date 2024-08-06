import { ID } from "node-appwrite"
// import { account } from "../appwrite.config";
import { createAdminClient } from "../appwrite.config";
export const register = async({email,name,password})=>{
    try {
        const {account} = await createAdminClient();
        const user = await account.create(ID.unique(),email,password,name);
       const session =  await account.createEmailPasswordSession(email,password);
        return session;
    } catch (error) {
        console.log(error);
    }
}
export const getAccount = async ()=>{
    try {
        const {account} = await createAdminClient();
        const userAccount = await account.get();
        return userAccount;
    } catch (error) {
        console.log(error);
    }
}

export const verificationAccount = async ()=>{
    try {
        const {account} = await createAdminClient();
     const verification =  await account.createVerification('http://localhost:3000/');
     return verification;
    } catch (error) {
        console.log(error);
    }
}
export const updateVerificationAccount = async ({userId,secret})=>{
    try {
        const updateVerification = await account.updateVerification(userId,secret)
    } catch (error) {
        console.log(error);
    }
}