import { createAdminClient } from "../appwrite.config";

export const login = async ({email,password})=>{
    try {
        const {account} = await createAdminClient();
        const user = await account.createEmailPasswordSession(email,password);
        console.log("FROM LOGIN ACTION",user);
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const forgetpassword = async ({email})=>{
    try {
        const {account} = await createAdminClient();
        const user = await account.createRecovery(email,"http://localhost:3000/reset-password");
        console.log("FROM FORGETPASSWORD ACTION",user);
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const updatepassword = async ({userId,secret,password})=>{
    try {
        const {account} = await createAdminClient();
        const user = await account.updateRecovery(userId,secret,password)
        console.log("FROM UPDATEPASSWORD ACTION",user);
        return user;
    } catch (error) {
        console.log(error);
    }
}