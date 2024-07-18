'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
const ids = {
    passKey:'123456',
}
function PasskeyModal() {
    const router = useRouter();
    const [open,setOpen] = useState(true);
    const [passkey,setPasskey] = useState('');
    const [error,setError] = useState(false);
   const encryptedKey =  typeof window !== 'undefined' ? window.localStorage.getItem('accessKey'):null
   useEffect(()=>{
    const accessKey = encryptedKey && decryptKey(encryptedKey);
       if(accessKey === ids.passKey){
        setOpen(false);
        router.push('/admin')
    }else{
        setOpen(true);
    }
   },[encryptedKey])
    const validatePasskey = (e)=>{
        e.preventDefault();
        if(passkey === ids.passKey){
            const encryptedKey = encryptKey(passkey);
            localStorage.setItem('accessKey',encryptedKey);
            setOpen(false);
        }else{
            setError(true);
        }
    }
    const closeModal = ()=>{
        setOpen(false);
        router.push('/');
    }
  return (
<AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?{passkey}</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers. {error && <p className="text-red-900">we have an Error</p>}
        </AlertDialogDescription>
        <InputOTP maxLength={6} value={passkey} onChange={(value)=>setPasskey(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
      </AlertDialogHeader>
      <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>{closeModal()}}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={(e)=> validatePasskey(e)}>Enter admin  PassKey</AlertDialogAction>
    </AlertDialogFooter>
    </AlertDialogContent>
    
</AlertDialog>
  )
}

export default PasskeyModal
