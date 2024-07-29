"use client";
import { useState } from "react";
import CustomCards from "./CustomCards";
import { FaUserInjured } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { FaHourglassStart } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { getAccount } from "@/lib/actions/register-actions";
import { redirect } from "next/dist/server/api-utils";
const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("today");
  
  const renderContent =  () => {
   
    switch (activeTab) {
      case "today":
        return <p>Content for This Today</p>;
      case "week":
        return <p>Content for This Week</p>;
      case "month":
        return <p>Content for This Month</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex gap-4  mb-4 mt-4 text-gray-700">
        <button
          onClick={() => setActiveTab("today")}
          className={` font-semibold text-[16px]  ${
            activeTab === "today" ? "active" : ""
          }`}
        >
          Today
        </button>

        <button
          onClick={() => setActiveTab("week")}
          className={` font-semibold text-[16px]  ${
            activeTab === "week" ? "active" : ""
          }`}
        >
          Week
        </button>

        <button
          onClick={() => setActiveTab("month")}
          className={` font-semibold text-[16px]   ${
            activeTab === "month" ? "active" : ""
          }`}
        >
          Month
        </button>
      </div>
      <div className="max-w-4xl mx-auto mt-10 p-0">
            <div className="grid  grid-cols-2 gap-4">
                <CustomCards icon={<FaUserInjured size={25} className="" />} text="patients" total="23"/>
                <CustomCards state="schedule" icon={<IoCalendar  size={25} className="" />} text="schedule" total="4" />
                <CustomCards state="pending" icon={<FaHourglassStart  size={25} className="" />} text="pending" total="2"/>
                <CustomCards state="canceled" icon={<MdCancel  size={25} className="" />} text="pending" total="2"/>
            </div>
        </div>
    </>
  );
};

export default TabComponent;
