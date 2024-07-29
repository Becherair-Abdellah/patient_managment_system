import { NextResponse } from "next/server";


const page = async () => {

  const getAuth = async ()=>{
    try {
      const response = await fetch("http://localhost:3000/api/user",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
      },
      });

      const data = await response.json();
      console.log("IS WORK NOW BRO",typeof data);
    } catch (error) {
      console.log(data);
    }
  }
  getAuth()
  return (
    <div>
      Register Page
    </div>
  )
}

export default page
