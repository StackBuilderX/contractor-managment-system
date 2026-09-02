"use client"

import { redirect } from 'next/navigation';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const UserContext = createContext<any>(null);



export const UserProvider = ({ children }: {children : ReactNode}) => {

   const [user, setUser] = useState<any>(null);
   const [users, setUsers] = useState([])
   const [loading, setLoading] = useState(true)
   
   const [userId, setUserId] = useState<string | null>(null)


   const fetchUsers = async () => {

      const token = localStorage.getItem('token');

      if(!token) {
         throw new Error("Authentication token not found")
      }

      try {
         
         const response = await fetch("http://localhost:8080/api/users", {
            method : "GET",
            headers : {
               Authorization: `Bearer ${token}`,
            },
         })

         
         if(!response.ok) {
            toast.error(`Failed to fetch users: ${response.status}`)
            throw new Error(`Failed to fetch users: ${response}`)
         }
         const data = await response.json();
         setUsers(data)

      } catch (error) {
         console.log("Error fetching users:", error);
         toast.error("Failed to fetch users");
         throw error;
      } finally {
         setLoading(false)
      }
      
   }


   useEffect(()=> {
      const storedUserId = localStorage.getItem('userId');


         if(!storedUserId) {
            setLoading(false);
            return;
         }

         setUserId(storedUserId);
   }, [])

   useEffect(() => {
         

      const fetchCurrentUser = async () => {

         try {
            
            const token = localStorage.getItem('token');

            if(!userId || !token) {
               setLoading(false);
               return;
            }

            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`,
               }
            })

            if(!response.ok) {
               throw new Error ("Failted to fetch user")
               toast.error("Failed to fetch current user")
            }

            const data = await response.json()
            

            setUser(data)
            
            

         } catch (error) {
            console.log("Error fetching current user", error);
         } finally {
            setLoading(false)
         }
      }


      fetchCurrentUser()

   },[userId])

   const logout = () => {
      localStorage.clear()
      setUser(null)
      setUserId(null)
      redirect('/')
   }


   const value = {
      user, setUser, users, setUsers, fetchUsers,
      loading,
      userId, setUserId, logout,
   }

  return (
      <UserContext.Provider value={value}>
         {children}
      </UserContext.Provider>
  )
}

export const useUser = () => {
   return useContext(UserContext)
}

