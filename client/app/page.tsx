"use client"

import Image from "next/image";
import Link from "next/link";
import { useUser } from "./context/UserContext";
import { ChevronDown, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {


   const {user, logout} = useUser()

      

  return (
    <div className="min-h-screen max-w-6xl w-full mx-auto">
      
      {/* ------- Navbar ---------- */}
      <nav className="py-3 flex items-center justify-between border-b border-gray-200">
         <Link href="/" className="text-3xl font-semibold text-slate-700"><span className="text-indigo-500">S</span>tackFlow</Link>
         

         {
            user ? (
               <div className="relative group cursor-pointer">

                  <div className="flex items-center gap-2 px-4 border border-gray-200 rounded-full">
                     <Image width={36} height={36} src={user?.profileImageUrl || "/user_profile.png"} alt="image profile" className="rounded-full bg-center object-cover" />
                     <ChevronDown className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="absolute divide-y divide-gray-200 group-hover:block delay-300 hidden w-30 right-0 top-full bg-white border border-gray-100 rounded-md">
                     <p className="text-sm hover:bg-slate-100 text-slate-800 p-2 ">My profile</p>
                     <p onClick={logout} className="text-sm  hover:bg-red-100 text-red-500 p-2 flex items-center gap-1">Logout <LogOut className="w-4 h-4 text-red-500" /></p>
                  </div>
               </div>
            ) : (
               
               <Link href="/login">
                  <button className="py-2 px-7 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-medium cursor-pointer">Sign up</button>
               </Link>
            )
         }
         
         
      </nav>



    </div>
  );
}
