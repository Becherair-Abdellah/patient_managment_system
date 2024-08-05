'use client'
import { decryptKey } from "@/lib/utils";
import Link from "next/link"
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
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_ACCESS_KEY } from "@/lib/appwrite-config-export";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineSick } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { useRouter } from "next/navigation";
export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    const [open,setOpen] = useState(false);
    const [authorized,serAuthorized] = useState(false);
    const router = useRouter();
    const logout = async ()=>{
      try {
          const response = await fetch("http://localhost:3000/api/logout",{
              method: 'POST',            
          });
          const data = await response.json();
          console.log(data);
      } catch (error) {
          console.log(error);
      }
  };

    useEffect(()=>{
    const encryptedKey = typeof window !==  undefined? localStorage.getItem('accessKey'): null
    if(decryptKey(encryptedKey) === NEXT_PUBLIC_ACCESS_KEY){
      serAuthorized(true);
    }
    },[authorized]);
    return (
        <>
        {authorized?
        <>
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-16 items-center bg-white gap-4 border-b bg-background px-4 md:px-6">
    
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                href="/admin/dashboard"
                className="flex font-bold items-center gap-2 text-lg md:text-base"
              >
                {/* <Package2 className="h-6 w-6" /> */}
                <span className="text-3xl font-bold text-primaryColor">Abdellah</span>
              </Link>
    
              <Link
                href="/admin/dashboard"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
    
              <Link
                href="/admin/doctors"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Doctors
              </Link>
    
            </nav>
            
            <Sheet className="" open={open} onOpenChange={setOpen} >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-white">
                <nav className="grid gap-6 text-lg  font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <span className="text-primaryColor text-3xl font-bold">Abdellah</span>
                  </Link>
    
                  <Link href="/admin/dashboard" onClick={()=>{setOpen(false)}} className="hover:text-foreground bg-primaryColor3 p-2 rounded-md text-primaryColor flex gap-2 items-center">
                  <LuLayoutDashboard size={20} className="text-primaryColor" />
                   <span className="text-md">dashboard</span>
                  </Link>
    
                  <Link href="/admin/patient" onClick={()=>{setOpen(false)}} className="hover:text-foreground bg-primaryColor3 p-2 rounded-md text-primaryColor flex gap-2 items-center">
                  <MdOutlineSick  size={20} className="text-primaryColor" />
                   <span className="text-md">patient</span>
                  </Link>
    
                  <Link href="/admin/appointments" onClick={()=>{setOpen(false)}} className="hover:text-foreground bg-primaryColor3 p-2 rounded-md text-primaryColor flex gap-2 items-center">
                  <GrSchedules  size={20} className="text-primaryColor" />
                   <span className="text-md">appointments</span>
                  </Link>
    
                  <Link href="/admin/doctors" onClick={()=>{setOpen(false)}} className="hover:text-foreground bg-primaryColor3 p-2 rounded-md text-primaryColor flex gap-2 items-center">
                  <FaUserDoctor  size={20} className="text-primaryColor" />
                   <span className="text-md">doctors</span>
                  </Link>
    
                </nav>
              </SheetContent>
            </Sheet>
    
            <div className="flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
              <DropdownMenu className="">
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="bg-primaryColor3 p-2 rounded-md cursor-pointer text-primaryColor" onClick={()=>{
                    router.push("/login");
                    logout();
                    localStorage.removeItem("accessKey");
                  }}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {children}
        </div>
        </>
        :<div>YOU NOT AUTHORIZED</div>}
        
        </>
    )
  }


  