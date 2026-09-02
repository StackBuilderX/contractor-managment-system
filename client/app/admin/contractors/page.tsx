"use client"


import { useUser } from '@/app/context/UserContext'
import { BriefcaseBusiness, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Eye, Filter, PauseCircle, Plus, Search, SearchAlertIcon, Trash2, Trash2Icon, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import React, { useEffect, useMemo, useState } from 'react'

const Contractors = () => {

   // const { users, setUsers, loading, fetchUsers } = useUser()
   const [searchTerm, setSearchTerm] = useState("")
   const [statusFilter, setStatusFilter] = useState("ALL")
   const [loading, setLoading] = useState(true)
   const headerData = ["Profile", "FullName", "Email", "Phone", "Company", "Projects", "Status", "Actions"]

   const [contractors, setContractors] = useState([])
   const [filtredContractors, setFilteredContractors] = useState([])

   
   

   useEffect(() => {
      
      const fetchContractors = async () => {

         try {

            const response = await fetch("http://localhost:8080/api/contractors", {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               }
            })

            if(!response.ok) {
               throw new Error("Failed to fetch contractors")
               toast.error("Failed to fetch contractors")
            }

            const data = await response.json()

            setContractors(data)
            

         } catch (error) {
            console.error("Error fetching contractors: ", error.message)
            toast.error("Error fetching contractors: ", error.message)
         } finally {
            setLoading(false);
         }
      }

      fetchContractors()
      
      
   }, [])

   const contractorsDataPage = [
      {
         label: "Total Contractors", 
         value: contractors.length,
         disc: "All registred contractors",
         icon: Users
      },
      {
         label: "Active Contractors", 
         value: contractors.filter(contractor => contractor.status === "ACTIVE").length,
         disc: "Currently active",
         icon: CheckCircle
      },
      {
         label: "Inactive Contractors", 
         value: contractors.filter(contractor => contractor.status === "INACTIVE").length,
         disc: "Currently inactive",
         icon: PauseCircle
      },
      {
         label: "Total Projects", 
         value: contractors.reduce((total, contractor) => total + (contractor.projects || 0), 0),
         disc: "Across all contractors",
         icon: BriefcaseBusiness
      },
   ]


   const filteredContractors = contractors.filter((contractor)=> {
      const fullName = `${contractor.firstName} ${contractor.lastName}`.toLowerCase()

      const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || contractor.email.toLowerCase().includes(searchTerm.toLowerCase()) || contractor.phone?.toLowerCase().includes(searchTerm) || contractor.company?.toLowerCase().includes(searchTerm)

      const matchesStatus = statusFilter === "ALL" || contractor.status === statusFilter;
         
      return matchesStatus && matchesSearch;


   })
   
   
   return loading ? (
      <div className="w-full h-50 flex items-center justify-center">
         <div className="w-10 h-10 rounded-full border border-t-0 animate-spin border-indigo-600 " />
      </div>
   ) : (
      <div className="min-h-screen bg-slate-50 p-6 md:p-8">
         <div className="mx-auto max-w-350">

            {/* ================= HEADER ================= */}

            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

               <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                     Contractors
                     <span className="ml-3 text-lg font-medium text-slate-400">
                        ({contractors.length})
                     </span>
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                     Manage and monitor all contractors.
                  </p>
               </div>

               <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
                  <Plus size={18} />
                  Add Contractor
               </button>

               
            </div>

            {/* ================= STATISTICS ================= */}

            <div className="mb-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

               {

                  contractorsDataPage.map((item, index) => (
                     <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">

                           <div>
                              <p className="text-sm font-medium text-slate-500">
                                 {item.label}
                              </p>

                              <p className="mt-2 text-3xl font-bold text-slate-900">
                                 {item.value}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                 {item.disc}
                              </p>
                           </div>

                           <div className={`rounded-xl ${index === 0 ? "bg-indigo-50 p-3 text-indigo-600" : index === 1 ? "bg-green-50 p-3 text-green-600" : index === 2 ? "bg-orange-50 p-3 text-orange-600" : "bg-blue-50 p-3 text-blue-600"} `}>
                              <item.icon size={23} />
                           </div>

                           

                        </div>
                     </div>
                  ))

               }


            </div>

            {/* ================= TABLE CARD ================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

               {/* Search / Filters */}

               <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row">

                  {/* Search */}

                  <div className="relative flex-1">
                     <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                     />

                     <input
                        type="text"
                        placeholder="Search contractors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                     />
                  </div>

                  {/* Status Filter */}

                  <div className="relative">
                     <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-11 w-full min-w-47.5 appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                     >
                        <option value="ALL">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                     </select>

                     <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                     />
                  </div>

                  {/* Filter button */}

                  <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                     <Filter size={17} />
                     Filter
                  </button>
               </div>

               {/* ================= TABLE ================= */}

               <div className="overflow-x-auto">
                  <table className="w-full min-w-262.5">

                     <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70">

                           <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Profile
                           </th>

                           <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Full Name
                           </th>

                           <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Email
                           </th>

                           <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Phone
                           </th>

                           <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Company
                           </th>

                           <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Projects
                           </th>

                           <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Status
                           </th>

                           <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Actions
                           </th>

                        </tr>
                     </thead>

                     <tbody>
                        {filteredContractors.map((contractor) => {

                           

                           return (
                              <tr
                                 key={contractor.id}
                                 className="border-b border-slate-100 transition hover:bg-slate-50/60"
                              >

                                 {/* Profile */}

                                 <td className="px-5 py-4">
                                    <Image src={contractor.profileImageUrl || "/user_profile.png"} width={30} alt='user profile' height={30} className='bg-center object-cover rounded-full' />
                                 </td>

                                 {/* Name */}

                                 <td className="px-5 py-4">
                                    <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                                       {contractor.firstName}{" "}
                                       {contractor.lastName}
                                    </p>
                                 </td>

                                 {/* Email */}

                                 <td className="px-5 py-4">
                                    <p className="whitespace-nowrap text-sm text-slate-600">
                                       {contractor.email}
                                    </p>
                                 </td>

                                 {/* Phone */}

                                 <td className="px-5 py-4">
                                    <p className="whitespace-nowrap text-sm text-slate-600">
                                       {contractor.phone}
                                    </p>
                                 </td>

                                 {/* Company */}

                                 <td className="px-5 py-4">
                                    <p className="whitespace-nowrap text-sm font-medium text-slate-700">
                                       {contractor.company}
                                    </p>
                                 </td>

                                 {/* Projects */}

                                 <td className="px-5 py-4 text-center">
                                    <span className="text-sm font-semibold text-slate-700">
                                       {contractor.projects} 
                                    </span>
                                 </td>

                                 {/* Status */}

                                 <td className="px-5 py-4 text-center">
                                    <span
                                       className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${contractor.status === "ACTIVE"
                                             ? "bg-emerald-50 text-emerald-600"
                                             : "bg-red-50 text-red-500"
                                          }`}
                                    >
                                       {contractor.status}
                                    </span>
                                 </td>

                                 {/* Actions */}

                                 <td className="px-5 py-4">
                                    <div className="flex items-center justify-center gap-3">

                                       <button
                                          title="Delete"
                                          className="rounded-lg p-2 cursor-pointer text-red-500 transition hover:bg-red-50"
                                       >
                                          <Trash2 size={17} />
                                       </button>

                                       <button
                                          title="View"
                                          className="rounded-lg p-2 cursor-pointer text-blue-500 transition hover:bg-blue-50"
                                       >
                                          <Eye size={18} />
                                       </button>

                                    </div>
                                 </td>

                              </tr>
                           );
                        })}

                        {/* Empty */}

                        {filteredContractors.length === 0 && (
                           <tr>
                              <td
                                 colSpan={8}
                                 className="px-5 py-16 text-center"
                              >
                                 <div className="flex flex-col items-center">

                                    <Users size={40}
                                       className="mb-3 text-slate-300"
                                    />

                                    <p className="font-semibold text-slate-600">
                                       No contractors found
                                    </p>

                                    <p className="mt-1 text-sm text-slate-400">
                                       Try changing your search or filter.
                                    </p>

                                 </div>
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>

               {/* ================= PAGINATION ================= */}

               <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-sm text-slate-500">
                     Showing{" "}
                     <span className="font-semibold text-slate-700">
                        {filteredContractors.length}
                     </span>{" "}
                     of{" "}
                     <span className="font-semibold text-slate-700">
                        {contractors.length}
                     </span>{" "}
                     contractors
                  </p>

                  <div className="flex items-center gap-2">

                     <button
                        disabled
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-300"
                     >
                        <ChevronLeft size={17} />
                     </button>

                     <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-sm font-semibold text-indigo-600">
                        1
                     </button>

                     <button
                        disabled
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-300"
                     >
                        <ChevronRight size={17} />
                     </button>

                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Contractors







