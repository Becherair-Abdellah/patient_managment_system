"use client"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import AppointmentModal from "../AppointmentModal"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns= [
  {
    header: "ID",
    cell: ({row})=> <p>{row.index +1}</p>
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell :({row})=> <p>{row.original.patient.name}</p>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell :({row})=> (
        <div>
            <StatusBadge status={row.original.status}/>
        </div>
    )
  },
  {
    accessorKey: "scheduled",
    header: "Scheduled",
    cell : ({row})=> (
        <div>
            {formatDateTime(row.original.schedule).dateTime}
        </div>
    )
  },
  {
    accessorKey: "Doctor",
    header: "Doctor",
    cell : ({row})=> (
        <div>
            {row.original.primaryPhysician}
        </div>
    )
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell : ({row : {original: data}})=> (
        <div>
            <AppointmentModal type='schedule' 
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
         />
            <AppointmentModal type='cancel' 
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            />
         
        </div>
    )
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
    
  },
]
