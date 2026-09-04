"use client"


import React, { useState } from 'react'
import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation' 
import AdminSideBar from '@/components/AdminSideBar'
import Header from '@/components/Header'



const AdminLayout = ({children} : {childern : React.ReactNode}) => {

   const router = useRouter()
   
   useEffect(()=> {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role')

            
      if(!token || role !== "ADMIN") {redirect('/login')}
      

   },[router])
   

  return (
    <div className="w-full h-screen overflow-y-scroll flex">
      
      
      {/*  ---- Left Side Bar -------- */}
      <AdminSideBar />

      {/* ------- Right Section --------- */}
      
         
         
         <div className="flex-1 h-screen">

         {/* -- Header --- */}
         <Header />

         {/* --- Pages ---- */}
         <main className="px-6 py-2 w-full min-h-screen overflow-y-scroll  bg-gray-100">
            {children}
         </main>
      
      </div>

    </div>
  )
}

export default AdminLayout