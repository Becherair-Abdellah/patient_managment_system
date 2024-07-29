import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaUserInjured } from "react-icons/fa";
import clsx from "clsx";
const CustomCards = ({state,total,text,icon}) => {
  // `border-none ${state ==='schedule'?bg-gray-100 p-4 text-gray-600:''}`
  return (
    <Card className={clsx('border-none bg-gray-100 p-4 text-gray-600',
      state === 'schedule' && 'bg-green-100 p-4 text-green-600',
      state === 'pending' && 'bg-blue-100 p-4 text-blue-600',
      state === 'canceled' && 'bg-red-100 p-4 text-red-600'
    )}>
      <CardContent className="flex gap-3 p-0">
        {icon}
     
        <span className="font-bold ">{total}</span>
      </CardContent>
        <CardDescription className="font-bold mt-4 text-start">
          {text}
        </CardDescription>

    </Card>
  );
};

export default CustomCards;
