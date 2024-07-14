import { ID, Query } from 'node-appwrite'
import { users } from '../appwrite.config'
export const createuser = async (user)=>{
    
    try{
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        return newUser;
    
    }
    catch (error) {
        console.log(error);
        if(error && error?.code === 409){
             const documents = await users.list([
                Query.equal('email',[user.email])
             ]);
             return documents?.users[0];
        }

    }
}
export const getUser = async (userId)=>{
    try{
        const user = await users.get(userId);
        return user;

    }catch (error){
        console.log(error);
    }

}