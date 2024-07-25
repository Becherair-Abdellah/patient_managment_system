import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const CustomAlert = ({title,discr,icon,state}) => {
  return (
    <Alert className={state === 'failure' ?"bg-red-50 text-red-500 border-none":"bg-green-50 text-green-500 border-none"} >
   {icon}
    <AlertTitle >{title}</AlertTitle>
    <AlertDescription>
      {discr}
    </AlertDescription>
  </Alert>
  
  )
}

export default CustomAlert
