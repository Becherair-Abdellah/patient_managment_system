import React from 'react'
import { Badge } from './ui/badge'
import { IoCalendarOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
const CustomBadge = ({status}) => {
  return (
<>
{status === 'scheduled' &&     <Badge className="mr-5 text-xs p-1 px-2 bg-green-200 border-none text-green-600 space-x-2"variant="outline">
    <IoCalendarOutline  className='mr-2' size={17}/>
Scheduled 
</Badge>}

{status === 'pending' &&     <Badge className="mr-5 text-xs p-1 px-2 bg-blue-200 border-none text-blue-800 space-x-2"variant="outline">
    <CgSandClock  className='mr-2' size={17}/>
Pending 
</Badge>}

{status === 'canceled' &&     <Badge className="mr-5 text-xs p-1 px-2 bg-red-200 border-none text-red-800 space-x-2"variant="outline">
    <MdCancel  className='mr-2' size={17}/>
Cancelled
</Badge>}
</>
  )
}

export default CustomBadge
