"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Clock3,
  DollarSign,
  Package,
  Plus,
  TrendingUp,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useContractor } from "@/app/context/ContractorContext";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState("overview");

//   const project = {
//     name: "Highway Construction Project",
//     type: "Road Construction",
//     location: "Casablanca",
//     status: "In Progress",
//     progress: 42,
//     budget: 2400000,
//     spent: 1020000,
//     startDate: "2026-09-11",
//     endDate: "2027-03-15",
//   };

  

  const materialRequests = [
    {
      id: 1,
      material: "Cement",
      quantity: "500 bags",
      supplier: "Atlas Build Supply",
      status: "Pending",
      date: "Sep 11, 2026",
    },
    {
      id: 2,
      material: "Steel",
      quantity: "12 tons",
      supplier: "BuildPro Materials",
      status: "Accepted",
      date: "Sep 09, 2026",
    },
    {
      id: 3,
      material: "Asphalt",
      quantity: "200 tons",
      supplier: "Maroc Materials",
      status: "Delivered",
      date: "Sep 05, 2026",
    },
  ];

  const schedule = [
    {
      name: "Foundation",
      start: "Sep 11",
      end: "Oct 05",
      progress: 100,
      status: "Completed",
    },
    {
      name: "Structure",
      start: "Oct 06",
      end: "Nov 20",
      progress: 65,
      status: "In Progress",
    },
    {
      name: "Road Works",
      start: "Nov 21",
      end: "Feb 10",
      progress: 20,
      status: "In Progress",
    },
    {
      name: "Finishing",
      start: "Feb 11",
      end: "Mar 15",
      progress: 0,
      status: "Upcoming",
    },
  ];

//   const [project, setProject] = useState({});

 const [loading, setLoading] = useState(true)

   
   const [project, setProject] = useState({});
   
  const params = useParams()
  const id = params.id;

  
  const fetchProjectById = async () => {

   try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
         method: "GET",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
         }});

         if(!response.ok) {
            throw new Error("Failed to fetch project")
            toast.error("Failed to fetch project")
         }

         const data = await response.json();

         setProject(data)
      
   } catch (error) {
      console.log(error);
      
   }
  }

  useEffect(()=>{
   fetchProjectById()
   setLoading(false)
  },[])


  console.log(id);
  console.log(project);
  




  

  const remaining = project?.budget - project?.spent;
  const spentPercentage = Math.round(
    (project?.spent / project?.budget) * 100
  );

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return loading ? (

   <div className="h-full w-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-black border-t-0 animate-spin"></div>
   </div>

  ) : (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          href="/contractor/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-slate-950 px-7 py-8 text-white lg:px-9">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
                  <span>Projects</span>
                  <ChevronRight size={15} />
                  <span>Workspace</span>
                </div>

                <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                  {project?.name}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span>{project?.type}</span>
                  <span>•</span>
                  <span>{project?.location}</span>
                  <span>•</span>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-400">
                    {project?.status}
                  </span>
                </div>
              </div>

              <button className="flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                <Plus size={17} />
                New Request
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 lg:grid-cols-4">
            <Stat
              label="Progress"
              value={`${project?.progress}%`}
              icon={<TrendingUp size={18} />}
            />

            <Stat
              label="Total Budget"
              value={formatMoney(project?.budget)}
              icon={<DollarSign size={18} />}
            />

            <Stat
              label="Spent"
              value={formatMoney(project?.spent)}
              icon={<DollarSign size={18} />}
            />

            <Stat
              label="Deadline"
              value={new Date(project?.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric"})}
              icon={<CalendarDays size={18} />}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2">
          {[
            ["overview", "Overview"],
            ["requests", "Material Requests"],
            ["schedule", "Schedule"],
            ["financial", "Financial"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                activeTab === key
                  ? "bg-slate-950 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid gap-6 lg:grid-cols-3">

              {/* Progress */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Project Progress
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Overall project completion
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-slate-900">
                    {project?.progress}%
                  </span>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900 transition-all"
                    style={{ width: `${project?.progress}%` }}
                  />
                </div>

                <div className="mt-5 flex justify-between text-xs text-slate-400">
                  <span>{new Date(project?.startDate).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"})}</span>
                  <span>{new Date(project?.endDate).toLocaleDateString("en-US", { month: 'short', day: "numeric", year: "numeric"})}</span>
                </div>
              </div>

              {/* Quick Financial */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Financial Status
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current project spending
                </p>

                <div className="mt-6">
                  <p className="text-3xl font-bold text-slate-900">
                    {formatMoney(remaining)}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    remaining budget
                  </p>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width: `${spentPercentage}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  {spentPercentage}% of budget spent
                </p>
              </div>
            </div>
          )}

          {/* MATERIAL REQUESTS */}
          {activeTab === "requests" && (
            <div className="rounded-3xl border border-slate-200 bg-white">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Material Requests
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Materials requested for this project
                  </p>
                </div>

                <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                  <Plus size={17} />
                  New Request
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {project.materials.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col gap-4 p-6 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                        <Package size={20} className="text-slate-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {request.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 flex items-center gap-4 ">
                          {request.items.map((prod)=> (
                           <span className="text-xs flex items-center gap-4 px-2 py-1 rounded-full border border-gray-200" key={prod.id}> {prod.quantity} {prod.product.unit} {(prod.product.name).split(" ")[0]} </span>
                          ))} • <span>{request.supplierCompanyName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden text-right sm:block">
                        <p className="text-xs text-slate-400">
                          Requested
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {new Date(request.expectedDelivery).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric"})}
                        </p>
                      </div>

                      <StatusBadge status={request.status} />

                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCHEDULE */}
          {activeTab === "schedule" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Project Schedule
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Track project phases and progress
                </p>
              </div>

              <div className="mt-8 space-y-6">
                {schedule.map((task) => (
                  <div key={task.name}>
                    <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row">
                      <div className="flex items-center gap-3">
                        <Clock3 size={17} className="text-slate-400" />
                        <span className="font-medium text-slate-900">
                          {task.name}
                        </span>
                      </div>

                      <span className="text-sm text-slate-500">
                        {task.start} — {task.end}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-900"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>

                      <span className="w-10 text-right text-sm font-semibold text-slate-700">
                        {task.progress}%
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      {task.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FINANCIAL */}
          {activeTab === "financial" && (
            <div className="space-y-6">

              <div className="grid gap-5 md:grid-cols-3">
                <FinancialCard
                  title="Total Budget"
                  value={formatMoney(project?.budget)}
                  icon={<DollarSign size={20} />}
                />

                <FinancialCard
                  title="Total Spent"
                  value={formatMoney(project?.spent)}
                  icon={<TrendingUp size={20} />}
                />

                <FinancialCard
                  title="Remaining"
                  value={formatMoney(remaining)}
                  icon={<DollarSign size={20} />}
                />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Expense Breakdown
                </h2>

                <div className="mt-6 space-y-5">
                  <Expense
                    label="Materials"
                    value={620000}
                    total={project?.spent}
                  />

                  <Expense
                    label="Labor"
                    value={280000}
                    total={project?.spent}
                  />

                  <Expense
                    label="Equipment"
                    value={85000}
                    total={project?.spent}
                  />

                  <Expense
                    label="Other"
                    value={35000}
                    total={project?.spent}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="p-5 lg:p-6">
      <div className="mb-3 flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    PENDING: "bg-amber-50 text-amber-700",
    ACCEPTED: "bg-blue-50 text-blue-700",
    DELIVERED: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function FinancialCard({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>

      <p className="mt-5 text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Expense({ label, value, total }) {
  const percentage = Math.round((value / total) * 100);

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>

        <span className="text-slate-500">
          ${value.toLocaleString()} ({percentage}%)
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}