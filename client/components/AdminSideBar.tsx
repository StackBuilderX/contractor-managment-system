"use client"
import { HardHat, LayoutDashboard, LogOut, Settings, User, Users } from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'

import { Outfit } from 'next/font/google'
import { useUser } from '@/app/context/UserContext'

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const AdminSideBar = () => {

   const pathname = usePathname();
   const { logout } = useUser()

   const navItems= [
      {name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard />},
      {name: 'Users', path: '/admin/users', icon: <Users />},
      {name: 'Suppliers', path: '/admin/suppliers', icon: <User />},
      {name:"Contractors", path: '/admin/contractors', icon: <HardHat />},
      {name:"Settings", path: '/admin/settings', icon: <Settings />},
   ]

   

  return (
    <div className={`w-64 h-screen bg-white border-r sticky top-0 border-gray-200 flex flex-col text-sm  ${outfit.variable}`}>

      <div className="p-4 h-17 border-b border-gray-200">
         <p className='text-2xl font-semibold text-slate-800 text-center'> <span className="text-3xl text-indigo-600">S</span>tackFlow</p>
      </div>

      <nav className="space-y-2 flex-1">
         {
            navItems.map((item, index) => (
               <Link key={index} href={item.path} className={`flex items-center pl-4 py-2 ${pathname === item.path ? 'text-white bg-indigo-700' : 'text-slate-800 hover:bg-slate-100'}`}>
                  
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
               </Link>
            ))
         }   
      </nav>
      

      <div onClick={logout} className="w-full py-4 border-t border-gray-200 cursor-pointer pl-10 flex items-center gap-2 text-slate-800">
         <LogOut className="w-5 h-5" />
         <span>Logout</span>
      </div>
    </div>
  )
}

export default AdminSideBar