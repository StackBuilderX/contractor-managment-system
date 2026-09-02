"use client"


import React, { useState } from 'react'
import { BellIcon, ChevronDown } from 'lucide-react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation' 
import AdminSideBar from '@/components/AdminSideBar'
import { useUser } from '../context/UserContext'
import Header from '@/components/Header'
import ContractorSideBar from '@/components/ContractorSideBar'


const ContractorLayout = ({children} : {childern : React.ReactNode}) => {

   const router= useRouter();
   
   const {user} = useUser()
   
   
   useEffect(()=> {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role') ;
      const userId = localStorage.getItem('userId')
      
      
      

      if(!token || role !== "CONTRACTOR") {redirect('/login')}  

      
   },[])
   

  return (
    <div className="w-full h-screen overflow-y-hidden flex">
      
      
      {/*  ---- Left Side Bar -------- */}
      <ContractorSideBar />

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

export default ContractorLayout