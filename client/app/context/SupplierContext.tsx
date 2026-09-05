"use client"

import { createContext, useContext, useState } from "react"

const SupplierContext = createContext()


export const SupplierProvider = ({children} :{children: React.ReactNode}) => {

   const [supplier, setSupplier] = useState({});
   const [loading, setLoading] = useState(true);
   const [orders, setOrders] = useState([]);
   const [products, setProducts] = useState([]);


   const fetchSupplierById = async () => {

      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });


         if (!response.ok) {
            throw new Error("Failed to fetch supplier data");
            toast.error("Failed to fetch supplier data");
         }

         const data = await response.json();
         // console.log(data);

         setSupplier(data);
      } catch (error) {
         console.error("Error fetching supplier data:", error);
         toast.error(error.message);
      } finally {
         setLoading(false);
      }
   }

   const fetchOrdersBySupplierId = async () => {

      try {

         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/supplier/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });

         if (!response.ok) {
            throw new Error("Failed to fetch orders data");
            toast.error("Failed to fetch orders data");
         }

         const data = await response.json();
         // console.log("Orders data", data);
         setOrders(data);

      } catch (error) {
         console.error("Error fetching orders data:", error);
         toast.error(error.message);
      } finally {
         setLoading(false);
      }

   }

   const fetchProducts = async () => {
      try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })

         if(!response.ok) {
            throw new Error("Failted to fetch products")
            toast.error("Failted to fetch products")
         }

         const data = await response.json()

         console.log(data);
         setProducts(data)


      } catch (error) {
         console.log(error.message);
         toast.error(error.message)
      }
   }

   const value = {
      supplier,fetchSupplierById,
      orders,fetchOrdersBySupplierId,
      products,fetchProducts,
   }

   return (
      <SupplierContext.Provider value={value}>
         {children}
      </SupplierContext.Provider>
   )
   
}

export const useSupplier = () => {
   return useContext(SupplierContext);
}