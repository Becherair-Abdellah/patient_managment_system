'use client'
import Link from 'next/link';
import React from 'react'
import { IoLogOut } from 'react-icons/io5'

const Logout = () => { 

    const logout = async ()=>{
        try {
            const response = await fetch("http://localhost:3000/api/logout",{
                method: 'POST',            
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="m-4 w-fit h-fit cursor-pointer">
            <Link href={`/login`}  onClick={()=>{
        logout();
    }}> <IoLogOut alt="success" size={33} color="red" /></Link>
    </div>
  )
}

export default Logout
