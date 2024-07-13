import { Button } from "./ui/button"
import Image from "next/image"
import loader from '../app/assets/icon/loader.svg'
function SubmitButton({isLoading,className,children}) {
  return (
   <Button type="submit" disabled={isLoading} className={className}>
    {isLoading?
    (
        <div className="flex items-center gap-4">
            <Image
            src={loader}
            width={24}
            height={24}
            className="animate-spin"
            alt="loader"
            />
            Loading ...
        </div>
    ):children}
   </Button>
  )
}

export default SubmitButton
