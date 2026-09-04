"use client"

import { useUser } from "@/app/context/UserContext"
import { HardHat, Truck, User, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from "recharts"


const Dashboard = () => {

   const {users, fetchUsers} = useUser()

   useEffect(() => {
      fetchUsers()
   },[])
      
   const suppliers = users.filter(user => user.role === "SUPPLIER")
   const contractors = users.filter(user => user.role === "CONTRACTOR")

   const now = new Date();

   const lastMonth = new Date();
      lastMonth.setDate(now.getDate() - 30);

      const newUsers = users.filter((user) => {
      const createdAt = new Date(user.createdAt);

   return createdAt >= lastMonth && createdAt <= now;
   });

   
   const adminDashboardData = [
      {
         label: "Total Users", 
         value: users.length,
         lastMonth: 12.5,
         icon: User
      },
      {
         label: "Suppliers", 
         value: suppliers.length,
         lastMonth: 8.2,
         icon: Truck
      },
      {
         label: "Contractors", 
         value: contractors.length,
         lastMonth: 15.3,
         icon: HardHat
      },
      {
         label: "New Users", 
         value: newUsers.length,
         lastMonth: 4.2,
         icon: UserPlus
      },
   ]

   const usersByRoleData = [
   {
      role: "Admin",
      users: users.length - (suppliers.length + contractors.length),
   },
   {
      role: "Supplier",
      users: suppliers.length,
   },
   {
      role: "Contractor",
      users: contractors.length,
   },
]

   const lastFiveUsers = [...users].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ).slice(0,4)

   
   const month = new Date().getMonth();

      
   const calcNumbersOfUsersByMonth = (monthIndex: number) => {
      const count = users.filter((user) => {
         const date = new Date(user.createdAt);
         return date.getMonth() === monthIndex
      }).length;
      return count;
   } 
   
   const userGrowthData = [
      { month: "Jan", users: calcNumbersOfUsersByMonth(0) },
      { month: "Feb", users: calcNumbersOfUsersByMonth(1) },
      { month: "Mar", users: calcNumbersOfUsersByMonth(2) },
      { month: "Apr", users: calcNumbersOfUsersByMonth(3) },
      { month: "May", users: calcNumbersOfUsersByMonth(4) },
      { month: "Jun", users: calcNumbersOfUsersByMonth(5) },
      { month: "Jul", users: calcNumbersOfUsersByMonth(6) },
      { month: "Aug", users: calcNumbersOfUsersByMonth(7) },
      { month: "Sep", users: calcNumbersOfUsersByMonth(8) },
      { month: "Oct", users: calcNumbersOfUsersByMonth(9) },
      { month: "Nov", users: calcNumbersOfUsersByMonth(10) },
      { month: "Dec", users: calcNumbersOfUsersByMonth(11) },
]

  return (
    <div className="space-y-6 ">

      {/* ----- Total Users  + Suppliers + Contractor + New Users ------ */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">   
         {
            adminDashboardData.map((item, index) => (
            <div key={index} className={`rounded-xl bg-white p-6 shadow-sm border  ${item.label === "Total Users" ? 'border-red-100' : item.label === "Suppliers" ? 'border-indigo-100' : item.label === "Contractors" ? 'border-green-100' : 'border-amber-100'  }`}>
               <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <div className={`rounded-lg ${item.label === "Total Users" ? 'bg-red-100 text-red-500' : item.label === "Suppliers" ? 'bg-indigo-50 text-indigo-500' : item.label === "Contractors" ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-500'  }`}>
                     <item.icon size={22}  />
                  </div>
               </div>
               
               <h2 className="mt-2 text-3xl font-bold text-gray-900">{item.value}</h2>
               <p className="mt-2 text-sm text-slate-700">+<span className="text-green-600">{item.lastMonth}</span>% from last month</p>
            </div>
            ))
         }
      </div>


      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            
         {/* ---- Recharts Users By Role ---  */}
         <div className="h-89 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Users by Role</h2>
            <p className="mt-1 text-sm text-gray-500">Distribution of users across different roles</p>

            <div className="mt-6 h-63">
               <ResponsiveContainer width="100%" height="100%" >
                  <BarChart data={usersByRoleData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="role" />
                     <YAxis />
                     <Tooltip />
                     <Bar dataKey="users" radius={[6, 6, 0, 0]}>
                        {
                           users.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? "#f87171" : index === 1 ? "#60a5fa" : "#34d399"} />
                           ))
                        }                     
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>

         </div>

         {/* ---- Recharts Users Growth Data ------ */}
         <div className="h-89 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
            <p className="mt-1 text-sm text-gray-500">User growth over the last 6 year</p>

            <div className="mt-6 h-63">
               <ResponsiveContainer width="100%" height="100%" >
                  <AreaChart data={userGrowthData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="month" />
                     <YAxis />
                     <Tooltip />
                     <Area dataKey="users" fill="#fbbf24" stroke="#fbbf24" fillOpacity={0.25} type="monotone" radius={[6, 6, 0, 0]} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* ----------Recent Users ----------- */}
      <div className="rounded-xl bg-white shadow-sm min-w-md w-full">
         {/* -- Header --- */}
         <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <div>
               <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
               <p className="mt-1 text-sm text-gray-500">Recently registred users on the platform</p>
            </div>
            <button>View All</button>
         </div>

         {/* ------ Users -------- */}
         <div className="divide-y divide-gray-100">
            {
               lastFiveUsers.map((user)=> (
                  <div key={user.id} className="flex items-center justify-between p-4 sm:p-6">
                     {/* --- User Info --- */}
                     <div className="flex items-center gap-4">
                        <Image width={44} height={44} src={user.profileImageUrl || "/user_profile.png"} alt={`${user.firstName} ${user.lastName}`} className="rounded-full object-cover" />
                        <div>
                           <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>   
                           <p className="text-sm text-gray-500">{user.email}</p>   
                        </div>
                     </div>

                     {/* -- Role -- */}
                     <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">{user.role}</span>
                  </div>
               ))
            }
         </div>

      </div>

      {/* ---- Quick Actions --- */}
      <div className="rounded-xl bg-white p-4 mb-20 shadow-sm">
         <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
         <p className="mt-1 text-sm text-gray-500">Quickly manage your platform</p>

         <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link href="/admin/users" className="rounded-lg border border-gray-200 p-4 transition hover:border-blue-500 hover:bg-blue-50">
               <User className="h-6 w-6 text-blue-600" />
               <h3 className="mt-3 font-semibold text-gray-900">Manage Users</h3>
               <p className="mt-1 text-sm text-gray-500">View and manage all platform users.</p>
            </Link>
            <Link href="/admin/suppliers" className="rounded-lg border border-gray-200 p-4 transition hover:border-blue-500 hover:bg-blue-50">
               <Truck className="h-6 w-6 text-blue-600" />
               <h3 className="mt-3 font-semibold text-gray-900">Manage Suppliers</h3>
               <p className="mt-1 text-sm text-gray-500">View and manage all suppliers.</p>
            </Link>
            <Link href="/admin/users" className="rounded-lg border border-gray-200 p-4 transition hover:border-blue-500 hover:bg-blue-50">
               <HardHat className="h-6 w-6 text-blue-600" />
               <h3 className="mt-3 font-semibold text-gray-900">Manage Contractors</h3>
               <p className="mt-1 text-sm text-gray-500">View and manage all contractors.</p>
            </Link>
         </div>
      </div>
      
      
    </div>
  )
}

export default Dashboard