"use client"

import { useUser } from '@/app/context/UserContext'
import { User } from '@/assets/types'
import { Eye, Filter, FilterIcon, Pencil, Search, SearchAlertIcon, Trash2Icon } from 'lucide-react'
import Error from 'next/error'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'



const Users = () => {

   
   const {users, fetchUsers, loading} = useUser()
   // const [loading, setLoading] = useState(true)

   const [searchTerm, setSearchTerm] = useState("")
   const [roleFilter, setRoleFilter] = useState("ALL")

   const filteredUsers = users.filter((user)=> {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()

      const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.phone?.toLowerCase().includes(searchTerm)

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

      return matchesRole && matchesSearch


   })

   const headerData = ["Profile", "FullName", "Email", "Phone"  ,"Role", "Actions" ]
   

   

   useEffect(()=> {
      fetchUsers()
   },[])
   
   const deleteUser = async (id : string) => {

      try {
         
         const token = localStorage.getItem('token')

         if(!token) {
         throw new Error("Authentication token not found")
         }

         const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                  method: "DELETE",
                  headers : {
                     Authorization : `Bearer ${token}`,
                  }
               })
               
         
         if(!response.ok) {
            toast.error(response.status)
            // throw new Error(response.data)
         }

         toast.success("User Deleted Successfuly")
      } catch (error) {
         console.log(error);
         toast.error(error.message)
      }

      
   }

  return loading ? (
   <div className="w-full h-50 flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-t-0 animate-spin border-indigo-600 " />
   </div>
  ) : (



    <div className="h-full">


      {
         users.length > 0 ? (
            <div className="relative">
               <p className='text-2xl font-medium mb-5 '>All Users <span className="text-sm font-light text-gray-500 ml-4">( {users.length} )</span></p>      
               
               {/* -- Input For Search User --- */}
               <div className=" grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-200">
                  <div className='relative mb-2 flex items-center gap-2'>
                     <input className="w-full max-w-md pl-10 py-2  rounded-lg outline-none  border" type="text" placeholder='Search users...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                     <Search className="absolute w-5 h-5 left-2 top-1/2 text-gray-600 -translate-y-1/2" />
                     {users.length !== filteredUsers.length && <div className="text-sm text-gray-600">Filtred Users <span className="font-semibold text-green-500">( #{filteredUsers.length} )</span> </div>}   
                  </div>
                  <div>

                     
                     <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-8 py-2 border rounded-md outline-none">
                        <option className="bg-indigo-100" value="ALL">All Roles</option>
                        <option className="bg-indigo-100" value="ADMIN">Admin</option>
                        <option className="bg-indigo-100" value="SUPPLIER">Supplier</option>
                        <option className="bg-indigo-100" value="CONTRACTOR">Contractor</option>
                     </select>
                  </div>
               </div>
               
               
               {
                  filteredUsers.length > 0 ? <table className="w-full border-gray-200 ">
                  <thead className="border-indigo-50">
                     <tr className='bg-indigo-50'>
                        {
                           headerData.map((head, index) => (
                              <th key={index} className="font-medium text-sm px-8 py-2 text-left">{head}</th>
                           ))
                        }
                     </tr>
                  </thead>
                  <tbody className="bg-white text-slate-800">
                     {
                        filteredUsers.map((user, index) => (
                           <tr key={index} className='border-b border-gray-200'>
                              <td className="px-8 py-2"><Image width={32} height={32} src={user.profileImageUrl || "/user_profile.png"} alt="image profile" className="rounded-full bg-center object-cover" /></td>
                              <td className="px-8 py-2">{user.firstName} {user.lastName}</td>
                              <td className="px-8 py-2">{user.email}</td>
                              <td className="px-8 py-2">{user.phone}</td>
                              <td className={`px-8 py-2 rounded-md  border border-white  ${user.role === "CONTRACTOR" ? 'text-emerald-700 bg-emerald-100 ' : user.role === "SUPPLIER" ? 'text-blue-700 bg-blue-100' : 'text-red-600 bg-red-100'}`}>{user.role}</td>
                              <td className="px-8 py-2 flex w-full items-center gap-1">
                                 <span onClick={() => {deleteUser(user.id); fetchUsers() }} className="p-2 group relative rounded-full border border-red-50 hover:bg-red-100/50 cursor-pointer">
                                    <Trash2Icon className="w-4 h-4 text-red-500 r"/>
                                       <span className="px-4 py-y text-red-500  shadow-sm absolute hidden group-hover:block text-xs -top-1/2 -right-1/2">Delete</span>
                                 </span>
                                 
                                 <Link href={`/admin/users/${user.id}`} className="p-2 relative group rounded-full border border-blue-50 hover:bg-blue-100/50 cursor-pointer">
                                     <Eye className="w-4 h-4 text-blue-500 "/>
                                     <span className="px-4 py-2 text-blue-500  shadow-sm absolute hidden group-hover:block text-xs -top-1/2 -right-1/2">View</span>
                                 </Link>  
                              </td>
                           </tr>
                        ))
                     }
                        
                  </tbody>
               </table> : (

                  <div className="h-50 w-full flex flex-col items-center justify-center">
                     <p className="text-2xl text-gray-400 font-semibold text-center mb-5">Users Not Found</p>
                     <SearchAlertIcon className="w-10 h-10 text-gray-400" />
                  </div>
               )
               }
                  
            </div>
         


         ) : (
            <div className="h-100 w-full flex flex-col items-center justify-center">
               <p className="text-4xl text-gray-500 font-semibold text-center mb-5">Users Not Found</p>
               <SearchAlertIcon className="w-14 h-14 text-gray-500" />
            </div>
         )
      }
      

      
    </div>
  )
}

export default Users