"use client";

import { Package, ShoppingCart, DollarSign, Boxes, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Orders from "../orders/page";
import { redirect } from "next/navigation";
import { useSupplier } from "@/app/context/SupplierContext";








const SupplierDashboard = () => {

   


   

   const {orders, supplier, products, fetchSupplierById, fetchOrdersBySupplierId, fetchProducts} = useSupplier();

   const totalRevenu = orders.reduce((total, order) => total + order.totalPrice, 0).toLocaleString("en-US");


   

   const salesOverview = Array.from({ length: 12 }, (_, monthIndex) => {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


      const total = orders
         .filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate.getMonth() === monthIndex;
         })
         .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

      return {
         name: monthNames[monthIndex],
         total: total/100
      };
   });

   
   

   useEffect(() => {
      fetchSupplierById();
      fetchOrdersBySupplierId();
      fetchProducts()
   }, [])

   const stats = [
      {
         title: "Total Products",
         value: supplier.productsCount,
         change: "+12.5%",
         positive: true,
         icon: Package,
      },
      {
         title: "Total Orders",
         value: supplier.totalOrders,
         change: "+8.2%",
         positive: true,
         icon: ShoppingCart,
      },
      {
         title: "Total Revenue",
         value: "$" + totalRevenu,
         change: "+14.8%",
         positive: true,
         icon: DollarSign,
      },
      {
         title: "Low Stock Items",
         value: supplier.lowStockItems,
         change: "-4.3%",
         positive: true,
         icon: Boxes,
      },];


   // const topProducts = [
   //    {
   //       name: "Portland Cement",
   //       category: "Cement",
   //       sold: "1,240 units",
   //       revenue: "$14,880",
   //    },
   //    {
   //       name: "Steel Rebar",
   //       category: "Steel",
   //       sold: "38 tons",
   //       revenue: "$12,350",
   //    },
   //    {
   //       name: "Ceramic Tiles",
   //       category: "Finishing",
   //       sold: "920 boxes",
   //       revenue: "$10,120",
   //    },
   //    {
   //       name: "Concrete Blocks",
   //       category: "Construction",
   //       sold: "2,400 units",
   //       revenue: "$7,200",
   //    },
   // ];
   return (
      <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-8">
         <div className="mx-auto max-w-7xl space-y-8">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
               <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                     Supplier Dashboard
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                     Overview of your products, orders and sales.
                  </p>
               </div>

               <button
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
               >
                  <Package size={17} />
                  Add Product
               </button>
            </div>

            {/* Stats */}
            <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
               {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                     <div
                        key={stat.title}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                     >
                        <div className="flex items-start justify-between">
                           <div>
                              <p className="text-sm font-medium text-slate-500">
                                 {stat.title}
                              </p>

                              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                                 {stat.value}
                              </h2>
                           </div>

                           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                              <Icon size={20} className="text-slate-700" />
                           </div>
                        </div>

                        <div className="mt-4 flex items-center gap-1.5 text-sm">
                           {stat.positive ? (
                              <ArrowUpRight size={16} className="text-emerald-500" />
                           ) : (
                              <ArrowDownRight size={16} className="text-red-500" />
                           )}

                           <span
                              className={
                                 stat.positive
                                    ? "font-medium text-emerald-600"
                                    : "font-medium text-red-500"
                              }
                           >
                              {stat.change}
                           </span>

                           <span className="text-slate-400">
                              from last month
                           </span>
                        </div>
                     </div>
                  );
               })}
            </section>

            {/* Main Grid */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

               {/* Sales Overview */}
               <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
                  <div className="flex items-center justify-between">
                     <div>
                        <h2 className="font-semibold text-slate-900">
                           Sales Overview
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                           Your sales performance over the last 7 months.
                        </p>
                     </div>

                     <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                     </button>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="mt-8 flex h-64 items-end gap-4 border-b border-slate-100 px-2">
                     {salesOverview.map(
                        (sale, index) => (
                           <div
                              key={index}
                              className="group flex h-full flex-1 items-end"
                           >
                              <div
                                 style={{ height: `${sale.total}%` }}
                                 className="w-full rounded-t-lg bg-slate-900 transition-all duration-300 group-hover:bg-slate-700"
                              />
                           </div>
                        )
                     )}
                  </div>

                  <div className="mt-4 flex justify-between px-1 text-xs text-slate-400">

                     {
                        salesOverview.map((item, idx) => <span key={idx}>{item.name}</span>)
                     }
         
                  </div>
               </div>

               {/* Inventory */}
               <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                     <div>
                        <h2 className="font-semibold text-slate-900">
                           Inventory
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                           Current stock status
                        </p>
                     </div>

                     <Boxes size={20} className="text-slate-400" />
                  </div>

                  <div className="mt-8 space-y-6">

                     <div>
                        <div className="mb-2 flex justify-between text-sm">
                           <span className="text-slate-600">
                              In Stock
                           </span>

                           <span className="font-medium text-slate-900">
                              {
                                 Math.floor((supplier.productsCount - supplier.lowStockItems) / (supplier.productsCount) * 100) + "%"
                              }
                           </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                           <div style={{ width: `${(supplier.productsCount - supplier.lowStockItems) / (supplier.productsCount) * 100}%` }} className={`h-full rounded-full bg-emerald-500`} />
                        </div>
                     </div>

                     <div>
                        <div className="mb-2 flex justify-between text-sm">
                           <span className="text-slate-600">
                              Low Stock
                           </span>

                           <span className="font-medium text-slate-900">
                              {
                                 Math.floor(supplier.lowStockItems / supplier.productsCount * 100) + "%"
                              }
                           </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                           <div style={{ width: `${supplier.lowStockItems / supplier.productsCount * 100}` }} className="h-full w-[17%] rounded-full bg-amber-400" />
                        </div>
                     </div>

                     <div>
                        <div className="mb-2 flex justify-between text-sm">
                           <span className="text-slate-600">
                              Out of Stock
                           </span>

                           <span className="font-medium text-slate-900">
                              {
                                 Math.floor(supplier.outOfStock / (supplier.productsCount) * 100) + "%"
                              }
                           </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                           <div style={{ width: `${(supplier.outOfStock / supplier.productsCount * 100)}%` }} className="h-full w-[7%] rounded-full bg-red-400" />
                        </div>
                     </div>

                  </div>

                  <button className="mt-8 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                     Manage Inventory
                  </button>
               </div>
            </section>

            {/* Bottom Grid */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

               {/* Recent Orders */}
               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

                  <div className="flex items-center justify-between border-b border-slate-100 p-6">
                     <div>
                        <h2 className="font-semibold text-slate-900">
                           Recent Orders
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                           Latest orders from your customers.
                        </p>
                     </div>

                     <button className="text-sm font-medium text-slate-700 hover:text-slate-900">
                        View all
                     </button>
                  </div>

                  <div className="overflow-x-auto">
                     <table className="w-full min-w-175">
                        <thead>
                           <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                              <th className="px-6 py-4">Order</th>
                              <th className="px-6 py-4">Customer</th>
                              <th className="px-6 py-4">Product</th>
                              <th className="px-6 py-4">Amount</th>
                              <th className="px-6 py-4">Status</th>
                           </tr>
                        </thead>

                        <tbody>
                           {orders.map((order) => (
                              <tr
                                 key={order.id}
                                 className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70"
                              >
                                 <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                    #ORD-{order.id}
                                 </td>

                                 <td className="px-6 py-4 text-sm text-slate-600">
                                    {order.contractor}
                                 </td>

                                 <td className="px-6 py-4">
                                    <div className="text-sm font-medium flex items-center gap-5 text-slate-800">
                                       {order.items[0].productName} <span className="px-4 rounded-full bg-gray-300 text-slate-700">+{order.items.length - 1}</span>
                                    </div>

                                    <div className="mt-0.5 text-xs text-slate-400">
                                       {order.items[0].quantity} {order.items[0].productUnit}
                                    </div>
                                 </td>

                                 <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                    ${order.totalPrice}
                                 </td>

                                 <td className="px-6 py-4">
                                    <span
                                       className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${order.status === "COMPLETED"
                                          ? "bg-emerald-50 text-emerald-600"
                                          : order.status === "PROCESSING"
                                             ? "bg-blue-50 text-blue-600"
                                             : "bg-amber-50 text-amber-600"
                                          }`}
                                    >
                                       {order.status}
                                    </span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* Top Products */}
               <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="flex items-center justify-between">
                     <div>
                        <h2 className="font-semibold text-slate-900">
                           Top Products
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                           Best performing products.
                        </p>
                     </div>

                     <Package size={20} className="text-slate-400" />
                  </div>

                  <div className="mt-6 space-y-5">
                     {products.slice(0,4).map((product, index) => (
                        <div
                           key={index}
                           className="flex items-center gap-4"
                        >
                           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-600">
                              {index + 1}
                           </div>

                           <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-slate-800">
                                 {product.name}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                 {product.category.name} · {product.stock} {product.unit}
                              </p>
                           </div>

                           <p className="text-sm font-semibold text-slate-900">
                              ${(product.price * product.stock).toLocaleString("en-US")}
                           </p>
                        </div>
                     ))}
                  </div>

                  <button onClick={() => redirect("/supplier/products")} className="mt-7 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                     View Products
                  </button>
               </div>
            </section>

         </div>
      </main>
   );
}

export default SupplierDashboard;