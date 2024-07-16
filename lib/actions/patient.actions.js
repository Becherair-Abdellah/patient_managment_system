import { ID, Query } from 'node-appwrite'
import { users,storage, databases } from '../appwrite.config'
const ids = {
    database_id:'669147b7000b00aa202f',
    collection_id: '6691490900188b4823ab',
    bucket_id:'66914ab3003076ee8058',
    endpoint: 'https://cloud.appwrite.io/v1',
    project_id: '669146de001489075b60'

}
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
export const getUser = async (userId) =>{
    try{
        const user = await users.get(userId);
        return user;

    }catch (error){
        console.log(error);
    }

}
export const registerPatient = async ({identificationDocument,...patient})=>{
 console.log(identificationDocument);
  try{
    const file = await storage.createFile(ids.bucket_id,ID.unique(),identificationDocument);
    console.log(file);
    const newPatient =await databases.createDocument(ids.database_id,ids.collection_id,ID.unique(),
    {...patient,
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ids.endpoint}/storage/buckets/${ids.bucket_id}/files/${file?.$id}/view?project=${ids.project_id}`
        
    });
    console.log(newPatient);
    return newPatient;
  }catch (error){
    console.log(error);
  }
}