import { ID } from "node-appwrite"
import { account } from "../appwrite.config";

export const register = async({email,name,password})=>{
    try {
        const user = await account.create(ID.unique(),email,password,name);
        console.log("FROM REGISTER ACTION",user);
       const session =  await account.createEmailPasswordSession(email,password);
       console.log("FROM SESSION",session);
        return user;
    } catch (error) {
        console.log(error);
    }
}
export const getAccount = async ()=>{
    try {
        const userAccount = await account.get();
        console.log("FROM GETACCOUNT ACTION",userAccount)
        return userAccount;
    } catch (error) {
        console.log(error);
    }
}

export const verificationAccount = async ()=>{
    try {
     const verification =  await account.createVerification('http://localhost:3000/');
     console.log("Verfication has been sent to you email");
     return verification;
    } catch (error) {
        console.log(error);
    }
}
export const updateVerificationAccount = async ({userId,secret})=>{
    try {
        const updateVerification = await account.updateVerification(userId,secret)
        console.log("woo your email is verified");
    } catch (error) {
        console.log(error);
    }
}
export const logout = async ()=>{
    try {
        await account.deleteSession('current');
        console.log("FROM LOGOUT ACTION",account);
    } catch (error) {
        console.log(error);
    }
}