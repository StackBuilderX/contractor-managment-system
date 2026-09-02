"use client"


import React, { useState } from 'react'
import { BellIcon, ChevronDown } from 'lucide-react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation' 
import SupplierSideBar from '@/components/SupplierSideBar'
import Header from '@/components/Header'


const AdminLayout = ({children} : {childern : React.ReactNode}) => {

   const router= useRouter();
   

   const firstName = localStorage.getItem('firstName'); 
   useEffect(()=> {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('userId')
      

      if(!token || role !== "SUPPLIER") {redirect('/login')}


      // const fetchUser = async () => {
         
      //    try {
            

      //       const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      //       method: "GET",
      //       headers :{
      //          Authorization : `Bearer ${token}`,
      //       }
      //       })

      //    if(!response.ok) {
      //       throw new Error("Failed to fetch")
      //       toast.error("Failed to fetch")
      //    }

      //    const data = await response.json();
      //    console.log(data);

      //    setProfileImageUrl(data.profileImageUrl);

      //    } catch (error) {
      //       console.log("Error fetching user: ",error);
      //    }
      // }   

      // fetchUser()


   },[router])
   

  return (
    <div className="w-full h-screen overflow-y-hidden flex">
      
      
      {/*  ---- Left Side Bar -------- */}
      <SupplierSideBar />

      {/* ------- Right Section --------- */}
      
         
         
         <div className="flex-1 min-h-screen">
         {/* -- Header --- */}
         <Header />

         {/* --- Pages ---- */}
         <main className="px-10 py-4 w-full h-full  bg-gray-100">
            {children}
         </main>
      
      </div>

    </div>
  )
}

export default AdminLayout