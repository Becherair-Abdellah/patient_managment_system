"use client";
import React, { useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import CustomBadge from "./CustomBadge";
import { FaClipboard } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CustomDropMenu from "./CustomDropMenu";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
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
} from "@/components/ui/alert-dialog";
import UpdateAppointment from "./forms/UpdateAppointment";
import { formatDateTime } from "@/lib/utils";
import CancelAppointment from "./forms/CancelAppointment";

const ROW = ({ ID, NAME, EMAIL, DOCTOR, DATE, STATUS, appointment }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [typeForm, setTypeForm] = useState("schedule");
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen} className=" z-[1111]">
        <AlertDialogContent className="bg-white gap-0">
          {typeForm === "schedule" ? (
            <UpdateAppointment
              appointment={appointment}
              changeState={setIsOpen}
            />
          ) : (
            <CancelAppointment
              appointment={appointment}
              changeState={setIsOpen}
            />
          )}

          <AlertDialogFooter>
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

      <li className="py-4 px-2 border-b grid grid-cols-smallScreenGrid md:grid-cols-mediumScreenGrid lg:grid-cols-largScreenGrid w-full text-gray-600 font-semibold text-[14px]">
        <span className="break-all">{ID}</span>
        <span className="break-all">{NAME}</span>
        <span className="hidden lg:grid break-all">{EMAIL}</span>
        <span className="hidden lg:grid break-all">
          {formatDateTime(new Date(DATE)).dateTime}
        </span>
        <span className="hidden md:flex break-all gap-2 items-center">
          <div>
            <img
              src="https://github.com/shadcn.png"
              width={25}
              height={25}
              alt="doctor iamge"
              className="rounded-full"
            />
          </div>
          {DOCTOR}
        </span>
        <span className="break-all text-end relative">
          <CustomBadge status={STATUS} />
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
                  setTypeForm("schedule");
                }}
              >
                <IoCalendarOutline className="mr-2" size={17} />
                Schedule
              </DropdownMenuItem>

              <DropdownMenuItem
                className=" rounded-md cursor-pointer font-bold bg-red-200 text-red-800 mt-1"
                onClick={() => {
                  setIsOpen(true);
                  setTypeForm("cancel");
                }}
              >
                <MdCancel className="mr-2" size={17} />
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </li>
    </>
  );
};

export default ROW;
