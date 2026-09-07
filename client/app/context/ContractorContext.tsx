"use client"

import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";



export const ContractorContext = createContext();

export const ContractorProvider = ({ children } : { children: React.ReactNode }) => {


   const [projects, setProjects] = useState([])


   const fetchProjects = async () => {

      try {
         
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/contractor/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers : {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
      })
            if(!response.ok) {
               throw new Error("Faild to fetch projects")
               toast.error("Failed to fetch projects")
            }

            const data = await response.json();

            setProjects(data)
            console.log("Projects: --",data);
         
      } catch (error) {
         console.log(error);
         toast.error(error.message)
      }
   }


   const value = {
      projects, setProjects, fetchProjects,
   }

   return (
      <ContractorContext.Provider value={value}>
         {children}
      </ContractorContext.Provider>
   )
}



export const useContractor = () => {
   return useContext(ContractorContext);
}
