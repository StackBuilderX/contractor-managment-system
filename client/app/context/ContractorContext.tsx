"use client"

import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";



export const ContractorContext = createContext();

export const ContractorProvider = ({ children } : { children: React.ReactNode }) => {


   const [projects, setProjects] = useState([])
   const [requests, setRequests] = useState([])
   const [suppliers, setSuppliers] = useState([])
   const [products, setProducts] = useState([])
   

   
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

   const fetchMyRequests = async () => {
      try {
         
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/my`, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })

         if(!response.ok) {
            throw new Error("Failed to fetch requests")
            toast.error("Failed to fetch requests")
         }

         const data = await response.json();

         setRequests(data);

      } catch (error) {
         console.log(error);
         toast.error(error.message)
      } 
   }

   const fetchSuppliers = async () => {
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })
         if(!response.ok) {
            throw new Error("Failed to fetch suppliers")
            toast.error("Failed to fetch suppliers")
         }

         const data = await response.json();

         setSuppliers(data);

      } catch (error) {
         console.log(error);
         toast.error(error.message)
      } 
   }

   const fetchProducts = async () => {
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })
         if(!response.ok) {
            throw new Error("Failed to fetch products")
            toast.error("Failed to fetch products")
         }

         const data = await response.json();

         setProducts(data);

      } catch (error) {
         console.log(error);
         toast.error(error.message)
      } 
   }


   const value = {
      projects, setProjects, fetchProjects,
      requests, setRequests, fetchMyRequests,
      fetchSuppliers, suppliers, setSuppliers,
      products, setProducts, fetchProducts,
      
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
