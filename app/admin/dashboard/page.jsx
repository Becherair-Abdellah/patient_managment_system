"use client";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import CustomCard from "./CustomCard";
import { MdOutlineSick } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { CgSandClock } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import {
  getAppointmnets,
  getPatients,
  getStatusData,
} from "@/lib/actions/dashboard-actions";
import Cards from "@/components/Cards";
import { useEffect, useState } from "react";
import ROW from "@/components/ROW";
import { FaKitMedical } from "react-icons/fa6";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import { IoMdRefresh } from "react-icons/io";
const page = () => {
   const  PAGE_SIZE = 25;
  const [patients, setPatients] = useState();
  const [appointmnets, setAppointmnets] = useState();
  const [status, setStatus] = useState();
  const [page,setPage] = useState(1);
  const [loading,setLoaing] = useState(true);
  const [nbrAppointment,setNbrAppointment] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const data_patients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const data_status = async () => {
    try {
      const data = await getStatusData();
      setStatus(data);
    } catch (error) {
      console.log(error);
    }
  };

  const data_appointments = async () => {
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const data = await getAppointmnets(PAGE_SIZE,offset);
      setAppointmnets(data);
      setLoaing(false)
      setNbrAppointment(offset);
      setTotalPages(Math.ceil(data.total / PAGE_SIZE));
    } catch (error) {
      console.log(error);
    }
  };
  // effect for get totla pateints and schedule , pending ,cancelled appointmnets
  useEffect(() => {
    data_patients();
    data_status();
  }, []);
 // effect for get appointmnets (pagination)
  useEffect(() => {
   
      data_appointments();
  }, [page]);

  // previos and next buttons
  const handleNextPage = () => {
    if (page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <main className="flex bg-gray-50 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CustomCard
          nbr={patients?.total}
          title="Patients"
          discr="all patients in your database"
          className="text-white font-bold bg-gradient-to-r from-indigo-500 to-gray-500"
          icon={<MdOutlineSick size={20} />}
        />
        <CustomCard
          nbr={status?.scheduled_appointments}
          title="Scheduled"
          discr="patients scheduled appointments"
          className="text-white font-bold bg-gradient-to-r from-indigo-500 to-green-500"
          icon={<IoCalendarOutline size={20} />}
        />
        <CustomCard
          nbr={status?.pending_appointments}
          title="Pending"
          discr="patients pending appointments"
          className="text-white font-bold bg-gradient-to-r from-indigo-500 to-blue-500"
          icon={<CgSandClock size={20} />}
        />
        <CustomCard
          nbr={status?.canceled_appointmnets}
          title="Canceled"
          discr="patients canceled appointments"
          className="text-white font-bold bg-gradient-to-r from-indigo-500 to-red-500"
          icon={<MdCancel size={20} />}
        />
      </div>
      <div className="grid gap-4 md:gap-8 bg-white">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex justify-between flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Appointmnets</CardTitle>
              <CardDescription>
                Recent Appointmnets from your PMS.
              </CardDescription>
            </div>

            <div className="bg-primaryColor p-2 rounded-md cursor-pointer font-bold" onClick={()=>{
             data_appointments();
             setLoaing(true);
              console.log('run time');
            }}>
            <IoMdRefresh size={25} color="white" className="" />
            </div>

          </CardHeader>

          <CardContent>
            <div className="w-full">
                <div className="py-4 px-2 text-gray-400 font-semibold  grid grid-cols-smallScreenGrid md:grid-cols-mediumScreenGrid  w-full border-t border-b lg:grid-cols-largScreenGrid">
                    <span className="">ID</span>
                    <span className="">NAME</span>
                    <span className="hidden lg:grid">EMAIL</span>
                    <span className="hidden lg:grid">DATE</span>
                    <span className="hidden md:grid">DOCTOR</span>
                    <span className="text-center">STATUS</span>
                </div>
                <ul>
                {loading? <div className="w-full flex mt-5 justify-center p-2 animate-spin_fast"><IoMdRefresh size={25} color="" className="text-primaryColor" /></div>:
                    appointmnets?.documents.map((appointment,index)=>(
                        // <>{appointment.$id}</>
                        
                        <ROW key={index} ID={(index+1)+nbrAppointment} NAME={appointment?.patient?.name} EMAIL={appointment?.patient?.email} DATE={appointment?.schedule} DOCTOR={appointment?.doctor} STATUS={appointment?.status} appointment={appointment}/>
                    ))}
                </ul>
            </div>
          </CardContent>
            {/* pagination  */}
            <div className="grid my-5 gap-2">
            <Pagination>
  <PaginationContent>
    <span className="text-gray-500 ">{appointmnets?.total} appointmnets</span>
    <PaginationItem className="bg-primaryColor text-white font-bold rounded-md cursor-pointer">
      <PaginationPrevious onClick={()=>{
       handlePreviousPage();
      }} disabled={page === 1} />
    </PaginationItem>

    <PaginationItem>
      <div className=" bg-white rounded-md border">
      <PaginationLink href="#" className="text-primaryColor font-bold">{page}</PaginationLink>
      </div>
    </PaginationItem>

    <PaginationItem className="bg-primaryColor text-white font-bold rounded-md cursor-pointer">
      <PaginationNext onClick={()=>{
       handleNextPage();
       console.log(page === totalPages);
      }} disabled={page === totalPages}/>
    </PaginationItem>
    <span className="text-gray-500 ">of {totalPages} pages</span>
  </PaginationContent>
</Pagination>

            </div>
        </Card>
      </div>
    </main>
  );
};

export default page;
