import { ID } from "node-appwrite"
import { users,account } from "../appwrite.config"

export const createUser = async({name,email,phone})=>{
    try {
        const newUser = await account.create(ID.unique(),email,phone,name);
        return newUser;
    } catch (error) {
        console.log(error);
    }
}