"use client";

import { useContractor } from "@/app/context/ContractorContext";
import { useUser } from "@/app/context/UserContext";
import { ArrowUpRight, CalendarDays, Check, ChevronRight, Clock3, FileText, MoreHorizontal, Package, Plus, Search, Send, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type RequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "REJECTED";

type Request = {
  id: string;
  title: string;
  project: string;
  supplier: string;
  supplierInitials: string;
  status: RequestStatus;
  createdAt: string;
  expectedDelivery: string;
  total: string;
  items: number;
  priority: "Normal" | "High" | "Urgent";
  materials: {
    name: string;
    quantity: string;
    unit: string;
  }[];
};

// const requests: Request[] = [
//   {
//     id: "REQ-1024",
//     title: "Structural Materials",
//     project: "Atlas Residence",
//     supplier: "Atlas Materials",
//     supplierInitials: "AM",
//     status: "IN_PROGRESS",
//     createdAt: "Sep 02, 2026",
//     expectedDelivery: "Sep 08, 2026",
//     total: "$8,420",
//     items: 3,
//     priority: "High",
//     materials: [
//       {
//         name: "Cement",
//         quantity: "180",
//         unit: "bags",
//       },
//       {
//         name: "Steel Reinforcement",
//         quantity: "2.4",
//         unit: "tons",
//       },
//       {
//         name: "Concrete Blocks",
//         quantity: "850",
//         unit: "units",
//       },
//     ],
//   },
//   {
//     id: "REQ-1023",
//     title: "Ceramic & Flooring",
//     project: "Ocean View Villas",
//     supplier: "Casa Build",
//     supplierInitials: "CB",
//     status: "ACCEPTED",
//     createdAt: "Sep 01, 2026",
//     expectedDelivery: "Sep 10, 2026",
//     total: "$12,860",
//     items: 4,
//     priority: "Normal",
//     materials: [
//       {
//         name: "Ceramic Tiles",
//         quantity: "640",
//         unit: "m²",
//       },
//       {
//         name: "Porcelain",
//         quantity: "220",
//         unit: "m²",
//       },
//       {
//         name: "Tile Adhesive",
//         quantity: "90",
//         unit: "bags",
//       },
//     ],
//   },
//   {
//     id: "REQ-1022",
//     title: "Electrical Supplies",
//     project: "Palm Heights",
//     supplier: "Maghreb Electrics",
//     supplierInitials: "ME",
//     status: "DELIVERED",
//     createdAt: "Aug 26, 2026",
//     expectedDelivery: "Sep 02, 2026",
//     total: "$5,280",
//     items: 5,
//     priority: "Normal",
//     materials: [
//       {
//         name: "Electrical Cable",
//         quantity: "1,200",
//         unit: "m",
//       },
//       {
//         name: "Distribution Boxes",
//         quantity: "18",
//         unit: "units",
//       },
//       {
//         name: "LED Panels",
//         quantity: "80",
//         unit: "units",
//       },
//     ],
//   },
//   {
//     id: "REQ-1021",
//     title: "Plumbing Materials",
//     project: "Atlas Residence",
//     supplier: "ProFlow",
//     supplierInitials: "PF",
//     status: "PENDING",
//     createdAt: "Aug 30, 2026",
//     expectedDelivery: "Sep 12, 2026",
//     total: "$6,740",
//     items: 4,
//     priority: "Urgent",
//     materials: [
//       {
//         name: "PVC Pipes",
//         quantity: "480",
//         unit: "m",
//       },
//       {
//         name: "Pipe Fittings",
//         quantity: "120",
//         unit: "units",
//       },
//       {
//         name: "Water Valves",
//         quantity: "35",
//         unit: "units",
//       },
//     ],
//   },
//   {
//     id: "REQ-1020",
//     title: "Finishing Materials",
//     project: "Palm Heights",
//     supplier: "BuildPro",
//     supplierInitials: "BP",
//     status: "REJECTED",
//     createdAt: "Aug 24, 2026",
//     expectedDelivery: "—",
//     total: "$3,920",
//     items: 2,
//     priority: "Normal",
//     materials: [
//       {
//         name: "Wall Paint",
//         quantity: "120",
//         unit: "L",
//       },
//       {
//         name: "Primer",
//         quantity: "60",
//         unit: "L",
//       },
//     ],
//   },
// ];

const statusConfig = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700",
  },
  ACCEPTED: {
    label: "Accepted",
    className: "bg-blue-50 text-blue-700",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-violet-50 text-violet-700",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-50 text-red-600",
  },
};

export default function ContractorRequestsPage() {


   const [loading, setLoading] = useState(true);
   const [showAddRequest, setShowAddRequest] = useState(false);
   const { requests, fetchMyRequests, projects, fetchProjects, fetchSuppliers, suppliers, products, fetchProducts } = useContractor();
   const [selectedRequest, setSelectedRequest] = useState(null);

   const [title, setTitle] = useState("");
   const [supplier, setSupplier] = useState("");
   const [project, setProject] = useState("");
   const [priority, setPriority] = useState("");
   const [date, setDate] = useState("");
   // const [user, setUser] = useState({})
   
   useEffect(()=> {
      const fetchCurrentUser = async () => {

         try {
            
            const token = localStorage.getItem('token');

            if(!userId || !token) {
               setLoading(false);
               return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
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
      
   })

   const [items, setItems] = useState([
      {
         productId: "",
         quantity: 1,
         unit: ""
      }
   ]) 

   useEffect(() => {
      fetchMyRequests();
      
   },[])
   useEffect(() => {
      fetchProjects()
   },[])
   useEffect(() => {
      fetchSuppliers()
   },[])

   useEffect(()=> {
      fetchProducts()
   },[])

   useEffect(() => {
      if(requests.length > 0 && !selectedRequest) {
         setSelectedRequest(requests[0])
      }
      console.log("Selected Request: " ,selectedRequest);
      setLoading(false)
   }, [requests, selectedRequest])

  

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      statusConfig[request.status].label === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "PENDING").length,
    active: requests.filter(
      (r) => r.status === "ACCEPTED" || r.status === "IN_PROGRESS"
    ).length,
    delivered: requests.filter((r) => r.status === "DELIVERED").length,
  };

  const handleSendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests`, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type" : "application/json"
         },
         body: JSON.stringify(
            {
               contractorEmail: "chaimae@gmail.com",
               supplierId: suppliers.find(sup => sup.companyName === supplier)?.id,
               projectId: projects.find(proj => proj.name === project )?.id,
               title: title,
               expectedDelivery: date,
               priority: priority,
               items: items,
            }
         )
      });

      
      if (response.ok) {

         setItems([
                     {
                        product: "",
                        quantity: 1,
                        unit: ""
                     }
                  ]);
         setTitle("")
         setDate("")
         setPriority("")
         setProject("")
         setSupplier("")

         toast.success("Request Sended Successfuly")
               
      } else {
         toast.error("Failed To Send a Request")
      }
   } catch (error) {
      console.error("Error", error);
      toast.error("Error", error);
   }
  }

  console.log(" dat : ---------------------------------------------------------------------",{
               contractorEmail: "chaimae@gmail.email",
               supplierId: suppliers.find(sup => sup.companyName === supplier)?.id,
               projectId: projects.find(proj => proj.name === project )?.id,
               title: title,
               expectedDelivery: date,
               priority: priority,
               items: items,
            });
   

  return loading ? (
 
   <div className="h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-b-0 border-emerald-700 animate-spin" />
   </div>

  ) : (
    <main className="min-h-screen bg-[#f6f7f5] text-slate-900">
      <div className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8 lg:py-8">

        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-500">
              Procurement Workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Requests
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Create and track material requests sent to your suppliers
              across all construction projects.
            </p>
          </div>

          <button onClick={() => setShowAddRequest(true)} className="flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
            <Plus size={17} />
            New Request
          </button>
        </header>

        {/* Stats */}
        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-slate-100 p-2.5">
                <FileText size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">{stats.total}</p>

            <p className="mt-1 text-xs text-slate-500">
              Total requests
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                <Clock3 size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">{stats.pending}</p>

            <p className="mt-1 text-xs text-slate-500">
              Awaiting response
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                <Package size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">{stats.active}</p>

            <p className="mt-1 text-xs text-slate-500">
              Active requests
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <Check size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">{stats.delivered}</p>

            <p className="mt-1 text-xs text-slate-500">
              Successfully delivered
            </p>
          </div>

        </section>

        {/* Toolbar */}
        <section className="mb-5 flex flex-col gap-3 rounded-[22px] border border-slate-200 bg-white p-3 sm:flex-row">

          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search requests, projects or suppliers..."
              className="h-11 w-full rounded-xl bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-slate-300"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-50 p-1">
            {[
              "All",
              "Pending",
              "Accepted",
              "In Progress",
              "Delivered",
              "Rejected",
            ].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition ${
                  activeFilter === filter
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

        </section>

        {/* Workspace */}
        <section className="grid gap-5 lg:grid-cols-[1fr_430px]">

          {/* Requests List */}
          <div className="rounded-[26px] border border-slate-200 bg-white">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="font-semibold">
                  Your requests
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredRequests.length} requests found
                </p>
              </div>

              <button className="rounded-xl p-2 transition hover:bg-slate-50">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="divide-y divide-slate-100">

              {filteredRequests.map((request) => {
                const status = statusConfig[request.status];
                const selected = selectedRequest?.id === request.id;

                return (
                  <button
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className={`w-full p-5 text-left transition ${
                      selected
                        ? "bg-slate-50"
                        : "hover:bg-slate-50/70"
                    }`}
                  >
                    <div className="flex items-start gap-4">

                      {/* Request icon */}
                      <div
                        className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:flex ${
                          selected
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Package size={18} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold">
                                {request.title}
                              </h3>

                              {request.priority !== "NORMAL" && (
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                    request.priority === "URGENT"
                                      ? "bg-red-50 text-red-600"
                                      : "bg-orange-50 text-orange-600"
                                  }`}
                                >
                                  {request.priority}
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                              REQ-{request.id} · {request.projectName}
                            </p>
                          </div>

                          <span
                            className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-medium ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>

                        {/* Supplier */}
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">

                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[9px] font-semibold">
                              {request.supplier.split(" ").slice(0,2).map(word => word[0]).join("")}
                            </div>

                            <span className="text-xs text-slate-600">
                              {request.supplier}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Package size={13} />
                            {request.items.length} items
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <CalendarDays size={13} />
                            {request.expectedDelivery}
                          </div>

                          <span className="ml-auto text-sm font-semibold text-slate-900">
                            ${(request.total).toLocaleString("en-US")}
                          </span>

                        </div>

                      </div>

                      <ChevronRight
                        size={17}
                        className={`mt-3 hidden shrink-0 text-slate-400 transition sm:block ${
                          selected ? "translate-x-1" : ""
                        }`}
                      />

                    </div>
                  </button>
                );
              })}

              {filteredRequests.length === 0 && (
                <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                  <div className="rounded-2xl bg-slate-100 p-4">
                    <Search size={22} className="text-slate-400" />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    No requests found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try changing your search or filter.
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Details Panel */}
          <aside className="rounded-[26px] border border-slate-200 bg-white p-6">

            {/* Details Header */}
            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-medium text-slate-400">
                  REQUEST DETAILS
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  {selectedRequest?.title}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  REQ-{selectedRequest?.id}
                </p>
              </div>

              <button className="rounded-xl p-2 hover:bg-slate-50">
                <MoreHorizontal size={18} />
              </button>

            </div>

            {/* Status */}
            <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    Current status
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {(statusConfig[selectedRequest?.status])?.label}
                    
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-2.5">
                  {selectedRequest?.status === "DELIVERED" ? (
                    <Check size={19} />
                  ) : selectedRequest?.status === "REJECTED" ? (
                    <X size={19} />
                  ) : (
                    <Send size={19} />
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-7 space-y-5">

                {[
                  {
                    label: "Request created",
                    done: true,
                    date: new Date(selectedRequest?.createdAt).toDateString(),
                  },
                  {
                    label: "Supplier response",
                    done: [
                      "ACCEPTED",
                      "IN_PROGRESS",
                      "DELIVERED",
                    ].includes(selectedRequest?.status),
                    date:
                      selectedRequest?.status === "PENDING"
                        ? "Waiting..."
                        : "Completed",
                  },
                  {
                    label: "Order processing",
                    done: [
                      "IN_PROGRESS",
                      "DELIVERED",
                    ].includes(selectedRequest?.status),
                    date:
                      selectedRequest?.status === "IN_PROGRESS" ||
                      selectedRequest?.status === "DELIVERED"
                        ? "In progress"
                        : "Waiting...",
                  },
                  {
                    label: "Delivered",
                    done: selectedRequest?.status === "DELIVERED",
                    date:
                      selectedRequest?.status === "DELIVERED"
                        ? selectedRequest?.expectedDelivery
                        : "Pending",
                  },
                ].map((step, index) => (
                  <div
                    key={step.label}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        step.done
                          ? "bg-emerald-400 text-slate-950"
                          : "bg-white/10 text-slate-500"
                      }`}
                    >
                      {step.done ? (
                        <Check size={13} />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-xs font-medium ${
                          step.done
                            ? "text-white"
                            : "text-slate-500"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>

                    <span className="text-[10px] text-slate-500">
                      {step.date}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* Supplier */}
            <div className="mt-5 rounded-2xl border border-slate-100 p-4">

              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Supplier
              </p>

              <div className="mt-3 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold">
                  {selectedRequest?.supplier.split(" ").slice(0,2).map(word => word[0]).join("")}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {selectedRequest?.supplier}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Material supplier
                  </p>
                </div>

                <button className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50">
                  <ArrowUpRight size={15} />
                </button>

              </div>
            </div>

            {/* Materials */}
            <div className="mt-5">

              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold">
                  Requested materials
                </p>

                <span className="text-xs text-slate-400">
                  {selectedRequest?.items.length} items
                </span>
              </div>

              <div className="space-y-2">

                {selectedRequest?.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                  >
                    <div>
                      <p className="text-xs font-medium">
                        {item.productName}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Material
                      </p>
                    </div>

                    <p className="text-xs font-semibold">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            {/* Request Meta */}
            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-xl border border-slate-100 p-3">
                <p className="text-[10px] text-slate-400">
                  Expected delivery
                </p>

                <p className="mt-1 text-xs font-semibold">
                  {new Date(selectedRequest?.expectedDelivery).toLocaleDateString()}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-3">
                <p className="text-[10px] text-slate-400">
                  Estimated value
                </p>

                <p className="mt-1 text-xs font-semibold">
                  ${selectedRequest?.total.toLocaleString("en-US")}
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-2">

              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-medium text-white transition hover:bg-slate-800">
                <FileText size={14} />
                View details
              </button>

              <button className="rounded-xl border border-slate-200 px-3 transition hover:bg-slate-50">
                <MoreHorizontal size={16} />
              </button>

            </div>

          </aside>

        </section>

        {/* Bottom Insight */}
        <section className="mt-6 flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Truck size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Keep your projects supplied
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Track supplier responses and delivery progress from one place.
              </p>
            </div>

          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-200">
            Request history
            <ChevronRight size={16} />
          </button>

        </section>

      </div>
      {showAddRequest && (
  <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Add Request
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create a new material request for your project
          </p>
        </div>

        <button
          onClick={() => setShowAddRequest(false)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="max-h-[70vh] overflow-y-auto px-6 py-6">

        {/* Basic Information */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Request Information
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Request Title */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Request Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Concrete materials for foundation"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Supplier */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Supplier
              </label>

              <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value) }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select supplier</option>
                {
                  suppliers.map((sup, idx) => (
                     <option key={idx} value={sup.companyName}>{sup.companyName}</option>
                  ))
                }
                
              </select>
            </div>

            {/* Project */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Project
              </label>

              <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
               <option value="">Select Project</option>
              {
               projects.map((proj, idx) => (
                  <option key={idx} value={proj.name}>{proj.name}</option>
               ))
              }
                
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Priority
              </label>

              <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                
                <option value="MEDIUM">NORMAL</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            {/* Required Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Required Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Materials */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Materials
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Add the materials you need for this request
              </p>
            </div>

            
                <button
               onClick={() => {setItems(prev => [
                  ...prev, 
                  {
                     product: "",
                     quantity: 1,
                     unit: ""
                  }
               ])}}
               type="button"
               className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
               >
               + Add Material
               </button>
            
            
          </div>

          {/* Material Row */}
          <div className="space-y-3">
            {
            items.map((item, idx) => (
               <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-12">

                  {/* Material */}
                  <div className="md:col-span-5">
                     <label className="mb-2 block text-xs font-medium text-gray-600">
                        Material
                     </label>

                     <select
                     value={item.productId}
                     onChange={(e) => {
                        const newItems = [...items];
                        newItems[idx].productId = Number(e.target.value)
                        setItems(newItems)
                     }
                     }
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                        <option value="">Select material</option>
                        {
                           products.map((prod, idx) => (
                              <option key={idx} value={prod.id}>{prod.name}</option>
                           ))
                        }
                        
                     </select>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-3">
                     <label className="mb-2 block text-xs font-medium text-gray-600">
                        Quantity
                     </label>

                     <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => setItems(prev => prev.map((item, i) => i === idx ? {...item, quantity: Number(e.target.value)} : item))}
                        min="1"
                        placeholder="0"
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                     />
                  </div>

                  {/* Unit */}
                  <div className="md:col-span-3">
                     <label className="mb-2 block text-xs font-medium text-gray-600">
                        Unit
                     </label>

                     <select
                     value={item.unit}
                     onChange={(e) => setItems(prev => prev.map((item, i) => i=== idx ? {...item, unit: e.target.value} : item))}
                     className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                        <option value="piece">Unité</option>
                        <option value="kg">Kg</option>
                        <option value="ton">Ton</option>
                        <option value="m3">m³</option>
                        <option value="m2">m²</option>
                        <option value="m2">sac</option>
                     </select>
                  </div>

                  {/* Delete */}
                  {  items.length > 1 &&
                     <div onClick={()=> setItems(prev => prev.filter((_, i)=> i !== idx))} className="flex items-end md:col-span-1">
                        <button
                           type="button"
                           className="w-full rounded-lg border border-red-100 px-3 py-2.5 text-red-500 hover:bg-red-50"
                        >
                           🗑
                        </button>
                     </div>
                  }
                  
                  </div>
               </div>
            ))
            }
          </div>
          
          
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Notes
          </label>

          <textarea
            rows="3"
            placeholder="Add any additional information about this request..."
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 border-t px-6 py-4">

        <button
          type="button"
          onClick={() => setShowAddRequest(false)}
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
            onClick={handleSendRequest}
          type="button"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Send Request
        </button>

      </div>
    </div>
  </div>
)}
    </main>
  );
}