"use client";
import { BsClipboard2DataFill } from "react-icons/bs";
import ProgressBar from "./ProgressBar";
import { IoCalendar } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { useSelector } from "react-redux";
const Status = () => {
  const basic = useSelector((state) => state.progessStatus.basic);
  const schedule = useSelector((state) => state.progessStatus.schedule);
  const success = useSelector((state) => state.progessStatus.success);
  return (
    <>
      <ProgressBar
        state={basic}
        icon={<BsClipboard2DataFill color="white" size={17} />}
      />
      <ProgressBar
        className="mt-[160px]"
        icon={<IoCalendar color="white" size={17} />}
        state={schedule}
      />
      <ProgressBar
        className="mt-[160px]"
        icon={<GoGoal color="white" size={17} />}
        withoutbar
        state={success}
      />
    </>
  );
};

export default Status;
