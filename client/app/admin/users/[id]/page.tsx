"use client"

import { ArrowLeft, Pencil, SearchAlertIcon } from 'lucide-react'
import Image from 'next/image'
import { redirect, useParams, useRouter } from 'next/navigation'
import React,{ useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {

   const router = useRouter()
   const {id} = useParams()
   const [loading, setLoading] = useState(true)
   const [userDetails, setUserDetails] = useState({})

   const [users, setUsers] = useState([])

   useEffect(() => {

      const fetchUserById = async () => {

         try {
            
            const token = localStorage.getItem('token')
            

            if(!token) {
               toast.error("No toke Provider")
               redirect('/login')
               return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
               method: "GET",
               headers : {
                  Authorization: `Bearer ${token}`
               }
            })

            if(!response.ok) {
               throw new Error("Failed to fetch user details")
               toast.error("Failed to fetch user details")
            }

            const data = await response.json()
            setUserDetails(data)
            console.log(data);


         } catch (error) {
            console.log(error);
            toast.error(error)
         } finally {
            setLoading(false)
         }
      }


      fetchUserById()
   },[id])
   
   
  return !loading ? (
    <div className="bg-slate-50 min-h-screen h-full  p-6 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Administration / Users / #{userDetails.id}
            </p>

            
          </div>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← Back
          </button>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Cover */}
          <div className="h-40 bg-linear-to-r from-slate-900 via-slate-800 to-indigo-900" />

          {/* Profile */}
          <div className="px-6 pb-7 md:px-10">
            <div className="-mt-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

              <div className="flex items-end gap-5">

                {/* Avatar */}
                <Image src={userDetails.profileImageUrl || "/user_profile.png"} height={32*4} width={32*4} alt='user profile' className="rounded-3xl border-8 border-white  shadow-lg" />
                  

                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {userDetails.firstName} {userDetails.lastName}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {userDetails.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="pb-2">
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    userDetails.role === "ADMIN"
                      ? "bg-purple-100 text-purple-700"
                      : userDetails.role === "SUPPLIER"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {userDetails.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Personal Information */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Basic information about this user
              </p>
            </div>

            <div className="space-y-5">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  First Name
                </p>

                <p className="mt-1 font-medium text-slate-800">
                  {userDetails.firstName}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Last Name
                </p>

                <p className="mt-1 font-medium text-slate-800">
                  {userDetails.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Phone
                </p>

                <p className="mt-1 font-medium text-slate-800">
                  {userDetails.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Account Information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Account and access information
              </p>
            </div>

            <div className="space-y-5">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  User ID
                </p>

                <p className="mt-1 font-medium text-slate-800">
                  #{userDetails.id}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email
                </p>

                <p className="mt-1 break-all font-medium text-slate-800">
                  {userDetails.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Role
                </p>

                <p className="mt-1 font-medium text-slate-800">
                  {userDetails.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className="rounded-xl cursor-pointer flex items-center border border-amber-300 bg-white gap-1 px-5 py-2.5 text-sm font-semibold text-amber-600 transition hover:bg-amber-50"
          >
            Edit User
            <Pencil className="w-4 h-4" />
          </button>

          <button
            className="rounded-xl cursor-pointer border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Delete User
          </button>
        </div>

      </div>
    </div>
  ) : (
   <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-6 h-8 w-32 rounded bg-slate-200" />
          <div className="h-64 rounded-2xl bg-slate-200" />
        </div>
      </div>
  );
}
export default page;











