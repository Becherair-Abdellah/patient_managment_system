'use client'
import CustomButton from "./CustomButton"
import { useSelector,useDispatch } from "react-redux"
import { basic_action,success_action,schedule_action } from "@/redux/features/progess-status"
import { useRouter } from "next/navigation"
const AddNewPatient = ({url}) => {
    const basic = useSelector((state) => state.progessStatus.basic);
    const schedule = useSelector((state) => state.progessStatus.schedule);
    const success = useSelector((state) => state.progessStatus.success);
    const router = useRouter();
    const dispatch = useDispatch();
  return (
    <>
              <CustomButton
          text="Register New Patient"
          className="text-md text-white bg-primaryColor cursor-pointer w-full"
          onClick={()=>{
           {schedule?dispatch(schedule_action()):''}  // will br false
           {success?dispatch(success_action()):''}  // will br false
          {basic?dispatch(basic_action()):''}
            router.push(url);
          }}
        />
    </>
  )
}

export default AddNewPatient
