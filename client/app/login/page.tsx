"use client"


import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'
import { useUser } from '../context/UserContext'


export default function Login() {

   const router = useRouter()

   const [state, setState] = useState('Log In')
   const [firstName, setFirstName] = useState('')
   const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
   const [lastName, setLastName] = useState('')
   const [phone, setPhone] = useState('')
   const [loading, setLoading] = useState(false)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [role, setRole] = useState(localStorage.getItem('role') ? localStorage.getItem('role') : '')

   const {setUserId} = useUser()
   
   useEffect(()=> {
      if(role) {
         redirect(`/${role.toLowerCase()}/dashboard`);
      }
      },[])   
         
         

   const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoading(true)
      const loginData = {
         email: email,
         password: password,
      }
      const registerData = { 
         firstName: firstName,
         lastName: lastName,
         phone: phone,
         email: email,
         role: role.toUpperCase(),
         password: password,
      }
      
      try{

         
         const response = await fetch(`http://localhost:8080/api/auth/${state === "Log Up" ? "register" : "login"}`, {
            method: 'POST',
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(state === "Log Up" ? registerData : loginData),
         });

         
         const data = await response.json();

         if (response.ok) {

               localStorage.setItem('token', data.token);
               localStorage.setItem('role', data.role);
               localStorage.setItem('firstName', data.firstName);
               localStorage.setItem('userId', data.userId);

               setUserId(data.userId)
   

               if(data.role=== "ADMIN") {
                  router.push('/admin/dashboard');
               }else if (data.role === "CONTRACTOR") {
                  router.push('/contractor/dashboard')
               } else if (data.role === "SUPPLIER") {
                  router.push('/supplier/dashboard')
               }
               

            if (state === "Log Up") {
               
               
               toast.success('Registration successful');
               
               
               setFirstName('');
               setLastName('');
               setPhone('');
               setPassword('');
               setEmail('');
               setRole('');
            } else {
               
               toast.success('Registration successful');
               
               
               setFirstName('');
               setLastName('');
               setPhone('');
               setPassword('');
               setEmail('');
               setRole('');
            }         
         }  else {
            if (state === "Log Up") {
               toast.error(data.message);
            } else {   
               toast.error(data.message);
            }
         }
      } catch (error){
         console.error("Error", error);
      } finally {
         setLoading(false)
      }

   }

   

  return (
    <div className='flex justify-center items-center h-screen bg-white'>
      <div className="p-8 border border-gray-100 rounded-md bg-white shadow max-w-md w-full">

            <p className='text-2xl text-indigo-500 mb-2 font-semibold text-center'>{state}</p>
            <p className='text-sm text-gray-500 text-center'>Please <span className="text-indigo-500 mb-5">{state}</span>  for next step</p>

            <form onSubmit={onSubmitHandler} className='flex flex-col gap-2 w-full mt-5'>
               {
                  state === 'Log Up' && (



                     <>
                     
                     <div className='flex flex-col text-sm'>
                        <label htmlFor="firstName" className='text-xs text-gray-700'>First Name</label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value) } placeholder='First Name' id="firstName" type="text" className='text-slate-700 py-1 pl-2 border border-indigo-100 rounded-md outline-indigo-200' />
                     </div>

                     <div className='flex flex-col text-sm'>
                        <label htmlFor="lastName" className='text-xs text-gray-700'>Last Name</label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value) } placeholder='Last Name' id="lasttName" type="text" className='text-slate-700 py-1 pl-2 border border-indigo-100 rounded-md outline-indigo-200' />
                     </div>

                     <div className='flex flex-col text-sm'>
                        <label htmlFor="phone" className='text-xs text-gray-700'>Phone</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value) } placeholder='+012345678' id="phone" type="text" className='text-slate-700 py-1 pl-2 border border-indigo-100 rounded-md outline-indigo-200' />
                     </div>

                     <div className='flex flex-col text-sm'>
                        <label htmlFor="role" className='text-xs text-gray-700'>Role</label>
                        <input value={role} onChange={(e) => setRole(e.target.value) } placeholder='role' id="role" type="text" className='text-slate-700 py-1 pl-2 border border-indigo-100 rounded-md outline-indigo-200' />
                     </div>
                  </>
                  )
               }
               <div className='flex flex-col text-sm'>
                  <label htmlFor="email"  className='text-xs text-gray-700'>Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value) } placeholder='you@gmail.com' id="email" type="text" className=' text-slate-700 py-1 pl-2 border border-indigo-100 rounded-md outline-indigo-200' />
               </div>

               <div className='flex flex-col text-sm'>
                  <label htmlFor="password"  className='text-xs text-gray-700'>Password</label>
                  <input value={password} onChange={(e) => setPassword(e.target.value) }  type="password" placeholder="*********" id="password" className='text-slate-700 py-1 pl-2 border border-indigo-100 rounded-md outline-indigo-200' />
               </div>

               <button type='submit' className="w-full text-white bg-indigo-500 flex items-center justify-center cursor-pointer hover:bg-indigo-600 mt-2 rounded-md py-2 font-medium">{loading ? <div className='w-5 h-5 border-2 border-t-0 text-center rounded-full animate-spin border-white'></div> :  state}</button>
            </form>

            {state === "Log Up" ? <p className='mt-3 text-sm text-center text-slate-800'>Already have account <span onClick={() => setState("Log In")} className="text-indigo-500 cursor-pointer">Log In</span></p> : <p className='mt-3 text-sm text-center text-slate-800'>Don't have an account please <span onClick={() => setState("Log Up")} className="text-indigo-500 cursor-pointer">Log Up</span></p>} 
      </div>
      
    </div>
  )
}

