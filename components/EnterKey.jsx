"use client";
import keyimag from "@/public/assets/access-key.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
 
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { decryptKey, encryptKey } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import { NEXT_PUBLIC_ACCESS_KEY, NEXT_PUBLIC_EMAIL, NEXT_PUBLIC_PASSWORD } from "@/lib/appwrite-config-export";
const EnterKey = () => {
  const encryptedKey = typeof window !==  undefined? localStorage.getItem('accessKey'): null
  const [error,setError] = useState(false);
  const [accesKey,setAccessKey] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const [open,setOpen]  =useState(true);
useEffect(()=>{
  const login_admin = async()=>{
    try {
      if(NEXT_PUBLIC_ACCESS_KEY === decryptKey(encryptedKey).toString()){
        setLoading(true);
        const response = await fetch("/api/login",{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "email": NEXT_PUBLIC_EMAIL,
            "password": NEXT_PUBLIC_PASSWORD,
          }),
  
        });
        const data = await response.json();
        if(data){
          setLoading(false);
          setOpen(false);
          router.push("/admin/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  login_admin();
},[encryptedKey]);

    const handleOtpChange = (value) => {
  
        setAccessKey(value);
      };

      const validateOTP = async (e)=>{
        e.preventDefault();

        if(accesKey === NEXT_PUBLIC_ACCESS_KEY){
            error?setError(false):'';
            localStorage.setItem("accessKey",encryptKey(accesKey));
            setLoading(true);
        }else{
            setError(true);
        }
      }

  return (
    <AlertDialog className="" open={open} onOpenChange={setOpen} >
      <AlertDialogContent className="bg-white rounded-md w-[95%] md:w-full">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl text-primaryColor">
          Enter Your Access Key
          </AlertDialogTitle>
          <AlertDialogDescription className="">
          Please enter your access key to access your admin dashboard.
          </AlertDialogDescription>
          <div className="w-full flex justify-center">
            <Image src={keyimag} width={150} alt="access key" />
          </div>
          <div className="w-full flex justify-center">
            <InputOTP maxLength={6} value={accesKey} onChange={handleOtpChange}  >
              <InputOTPGroup className="text-primaryColor font-bold">
                <InputOTPSlot
                  className="text-3xl border-primaryColor w-[45px] h-[45px]"
                  index={0}
                />
                <InputOTPSlot
                  className="text-3xl border-primaryColor w-[45px] h-[45px]"
                  index={1}
                />
                <InputOTPSlot
                  className="text-3xl border-primaryColor w-[45px] h-[45px]"
                  index={2}
                />
              </InputOTPGroup>
              <InputOTPSeparator className="text-primaryColor" />
              <InputOTPGroup className="text-primaryColor font-bold">
                <InputOTPSlot
                  className="text-3xl border-primaryColor w-[45px] h-[45px]"
                  index={3}
                />
                <InputOTPSlot
                  className="text-3xl border-primaryColor w-[45px] h-[45px]"
                  index={4}
                />
                <InputOTPSlot
                  className="text-3xl border-primaryColor w-[45px] h-[45px]"
                  index={5}
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </AlertDialogHeader>
        {error && <p className="text-red-600 text-center">Invalid access Key</p>}
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel onClick={()=>{router.push('/login')}}>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction className="bg-primaryColor text-white font-bold" >
            Continue
          </AlertDialogAction> */}
          <CustomButton text="Continue" loading={loading} type='submit' onClick={(e)=>validateOTP(e)} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EnterKey;
