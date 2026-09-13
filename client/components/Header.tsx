"use client"

import { useUser } from '@/app/context/UserContext'
import { BellIcon, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Header = () => {


   
   const {user} = useUser() 

   

  return (
    <div className="py-2 px-8 z-100 border-b sticky top-0 border-gray-200 flex backdrop-blur-md items-center justify-between">
            <div>
               <h2 className="text-gray-800 text-2xl font-semibold">Welcome back <span className={`${user?.role === "ADMIN" ? "text-indigo-500" : user?.role === "CONTRACTOR" ? "text-blue-500" : "text-green-500"} `}>{user?.firstName}</span></h2>
               <p className="text-sm text-gray-500">here's an overview of your platform statistics.</p>
            </div>

            <div className="flex items-center gap-7">
               <div className="cursor-pointer p-3 rounded-full hover:bg-slate-100 transition-all duration-300">
                  <p className="relative ">
                     <BellIcon className="w-5 h-5"/>
                     <span className="w-2 h-2 bg-green-600 absolute -top-1 -right-1 rounded-full"></span>
                  </p>
               </div>
               
               <div className="flex items-center gap-2 cursor-pointer">
                  <Image src={user?.profileImageUrl || "/user_profile.png"} alt="profile" width={32} height={32} className="rounded-full bg-center object-cover" />
                  <p className="font-medium">{user?.firstName}</p>
                  <ChevronDown className='w-4 h-4' />
               </div>
            </div>
         </div>
  )
}

export default Header