"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getAppointmnets,
  getDoctors,
  getPatients,
  getStatusData,
} from "@/lib/actions/dashboard-actions";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IoMdRefresh } from "react-icons/io";
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
import AddDoctorForm from "@/components/forms/AddDoctorForm";
import ROWDOCTOR from "@/components/ROWDOCTOR";

const page = () => {
  const PAGE_SIZE = 25;
  const [doctors, setDoctors] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoaing] = useState(true);
  const [nbrAppointment, setNbrAppointment] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen,setIsOpen] = useState(false);
  const data_doctors = async () => {
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const data = await getDoctors(PAGE_SIZE, offset);
      setDoctors(data);
      setLoaing(false);
      setNbrAppointment(offset);
      setTotalPages(Math.ceil(data.total / PAGE_SIZE));
    } catch (error) {
      console.log(error);
    }
  };
  // effect for get appointmnets (pagination)
  useEffect(() => {
    data_doctors();
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
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="bg-white gap-0">
          <AddDoctorForm changeState={setIsOpen} />
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white  m-0 text-md w-full " onClick={()=>{
              setIsOpen(false);
            }}>
              cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <main className="flex bg-gray-50 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 bg-white">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex justify-between flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Doctors</CardTitle>
                <CardDescription>
                  All your doctors from your PMS you can manage delete add new
                  doctors here.
                </CardDescription>
              </div>

              <div
                className="bg-primaryColor text-white  p-2 rounded-md cursor-pointer font-bold"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                {/* <IoMdRefresh size={25} color="white" className="" /> */}+
                Add doctor
              </div>
            </CardHeader>

            <CardContent>
              <div className="w-full">
                <div className="py-4 px-2 text-gray-400 font-semibold  grid grid-cols-3  w-full border-t border-b lg:grid-cols-4 gap-6">
                  <span className="">ID</span>
                  <span className="">NAME</span>
                  <span className="hidden lg:grid">EMAIL</span>
                  <span className="grid">PHONE</span>
                </div>
                <ul>
                  {loading ? (
                    <div className="w-full flex mt-5 justify-center p-2 animate-spin_fast">
                      <IoMdRefresh
                        size={25}
                        color=""
                        className="text-primaryColor"
                      />
                    </div>
                  ) : (
                    doctors?.documents.map((doctor, index) => (
                      // <>{appointment.$id}</>

                      <ROWDOCTOR
                        key={index}
                        ID={index + 1 + nbrAppointment}
                        NAME={doctor?.name}
                        EMAIL={doctor?.email}
                        PHONE={doctor?.phone}
                        PHOTO={doctor?.photo}
                        DOCTOR={doctor}
                      />
                    ))
                  )}
                </ul>
              </div>
            </CardContent>
            {/* pagination  */}
            <div className="grid my-5 gap-2">
              <Pagination>
                <PaginationContent>
                  <span className="text-gray-500 ">
                    {doctors?.total} appointmnets
                  </span>
                  <PaginationItem className="bg-primaryColor text-white font-bold rounded-md cursor-pointer">
                    <PaginationPrevious
                      onClick={() => {
                        handlePreviousPage();
                      }}
                      disabled={page === 1}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <div className=" bg-white rounded-md border">
                      <PaginationLink
                        href="#"
                        className="text-primaryColor font-bold"
                      >
                        {page}
                      </PaginationLink>
                    </div>
                  </PaginationItem>

                  <PaginationItem className="bg-primaryColor text-white font-bold rounded-md cursor-pointer">
                    <PaginationNext
                      onClick={() => {
                        handleNextPage();
        
                      }}
                      disabled={page === totalPages}
                    />
                  </PaginationItem>
                  <span className="text-gray-500 ">of {totalPages} pages</span>
                </PaginationContent>
              </Pagination>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
};

export default page;
