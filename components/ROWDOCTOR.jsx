"use client";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AddDoctorForm from "./forms/AddDoctorForm";
import { delete_doctor } from "@/lib/actions/dashboard-actions";
import CustomButton from "./CustomButton";

const ROWDOCTOR = ({ ID, NAME, EMAIL, PHONE, PHOTO, DOCTOR }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeAction, setTypeAction] = useState("");
  const [loading,setLoading] = useState(false);
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen} className=" z-[1111]">
        <AlertDialogContent className="bg-white gap-0">
          {typeAction === "delete" ? (
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                doctor and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
          ) : (
            <AddDoctorForm
              changeState={setIsOpen}
              doctor={DOCTOR}
              state={typeAction}
            />
          )}
          <AlertDialogFooter className="mt-6">
            {typeAction === 'delete' && 

            <CustomButton type="submit" text="Iam Shure" loading={loading} onClick={async() => {
                setLoading(true);
               const removedDoctor =  await delete_doctor(DOCTOR?.$id)
                if(removedDoctor){
                    setLoading(false);
                    setIsOpen(false);
                }
              }} />
            }
            <AlertDialogCancel
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-red-600 text-white  m-0 text-md w-full "
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <li className="py-4 px-2 border-b grid grid-cols-3 lg:grid-cols-4 w-full text-gray-600 font-semibold text-[14px]">
        <span className="break-all">{ID}</span>
        <span className=" break-all gap-2 items-center flex ">
          <div>
            <img
              src={PHOTO}
              width={25}
              height={25}
              alt="doctor iamge"
              className="rounded-full"
            />
          </div>
          {NAME}
        </span>

        <span className="hidden lg:grid break-all">{EMAIL}</span>

        <span className="break-all flex items-center justify-between relative">
          {PHONE}
          <DropdownMenu className="">
            <DropdownMenuTrigger className="outline-none">
              <div className=" cursor-pointer">
                <HiOutlineDotsVertical size={18} color="gray" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white absolute right-[1px] top-[1px]">
              <DropdownMenuItem
                className=" text-green-600 bg-green-200 font-bold rounded-md cursor-pointer "
                onClick={() => {
                  setIsOpen(true);
                  setTypeAction("edit");
                }}
              >
                <IoCalendarOutline className="mr-2" size={17} />
                EDIT
              </DropdownMenuItem>

              <DropdownMenuItem
                className=" rounded-md cursor-pointer font-bold bg-red-200 text-red-800 mt-1"
                onClick={() => {
                  setIsOpen(true);
                  setTypeAction("delete");
                }}
              >
                <MdCancel className="mr-2" size={17} />
                DELETE
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </li>
    </>
  );
};

export default ROWDOCTOR;
