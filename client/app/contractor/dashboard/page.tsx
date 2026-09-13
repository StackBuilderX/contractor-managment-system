"use client";

import { useContractor } from "@/app/context/ContractorContext";
import { useUser } from "@/app/context/UserContext";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Hammer,
  Package,
  Plus,
  TrendingUp,
  Truck,
  Wallet,
  MoreHorizontal,
  ChevronRight,
  Circle,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";



const activities = [
  {
    title: "Material delivery confirmed",
    description: "180 bags of cement delivered",
    time: "18 min ago",
    icon: Truck,
  },
  {
    title: "Project milestone completed",
    description: "Structural phase completed",
    time: "2 hours ago",
    icon: CheckCircle2,
  },
  {
    title: "New quotation received",
    description: "Steel reinforcement quotation",
    time: "5 hours ago",
    icon: FileText,
  },
];

export default function ContractorDashboard() {

   // const date = new Date();
   // const formattedDate = date.toLocaleDateString("en-US", { month: "Long", year: "numeric"});
   const {user} = useUser();
   const {projects, fetchProjects, requests ,fetchMyRequests} = useContractor();
   const [activeProject, setActiveProject] = useState(null)
   const [selectProjectOpen, SetSelectProjectOpen] = useState(false)

   useEffect(()=> {
      fetchProjects();
      fetchMyRequests();
   },[])

   useEffect(() => {
      if(projects.length > 0 && !activeProject) {
         setActiveProject(projects[0])
         
      }
},[projects, activeProject])
   
      
   

  return (
    <main className="min-h-screen bg-[#f6f7f5] text-slate-900">
      <div className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8 lg:py-8">

        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-500">
              Saturday, September 5, 2026
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Good evening, {user?.firstName}.
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Here is what is happening across your construction projects today.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50">
              <CalendarDays size={17} />
              September 2026
            </button>

            <button onClick={() => SetSelectProjectOpen(prev => !prev)} className="relative flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
              <Plus size={17} />
              Add Project To Dashboard
              { selectProjectOpen &&
               (<div className="space-y-3 space-x-2 absolute w-4xl p-3 right-full grid grid-cols-1 sm:grid-cols-2 z-100 bg-white top-full">
                  {
                     projects.map((project) => (
                        <label key={project.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${activeProject === project.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`} >
                           <input
                              type="radio"
                              name="project"
                              value={project}
                              checked={activeProject === project.id}
                              onChange={(e)=> setActiveProject(project)}
                              className="h-4 w-4"
                            />

                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                 {project.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                 {project.location}
                              </p>
                            </div>

                            <span  className="text-xs font-medium px-3 py-1 rounded-full bg-slate-400">
                              {project.status}
                            </span>
                        </label>
                     ))
                  }
              </div>)
              }
              
            </button>
          </div>
        </header>

        {/* Main Hero */}
        <section className="relative mb-6 overflow-hidden rounded-[28px] bg-slate-950 p-7 text-white shadow-xl lg:p-10">

          {/* Decorative shapes */}
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[55px] border-emerald-400/10" />
          <div className="absolute -bottom-32 right-32 h-80 w-80 rounded-full border-[1px] border-white/10" />

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                PROJECT {activeProject?.status}
              </div>

              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {activeProject?.name}
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                {activeProject?.type} · {activeProject?.location}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-2xl bg-white/5 px-4 py-3">
                  <p className="text-xs text-slate-400">Started</p>
                  <p className="mt-1 text-sm font-medium">{activeProject?.startDate}</p>
                </div>

                <div className="rounded-2xl bg-white/5 px-4 py-3">
                  <p className="text-xs text-slate-400">Deadline</p>
                  <p className="mt-1 text-sm font-medium">{activeProject?.endDate}</p>
                </div>

                <div className="rounded-2xl bg-white/5 px-4 py-3">
                  <p className="text-xs text-slate-400">Budget</p>
                  <p className="mt-1 text-sm font-medium">${activeProject?.budget}</p>
                </div>
              </div>

              <button className="mt-8 flex items-center gap-2 text-sm font-medium text-emerald-300 transition hover:text-emerald-200">
                Open project workspace
                <ArrowUpRight size={17} />
              </button>
            </div>

            {/* Progress */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-[18px] border-white/10">
                <div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-t-emerald-400 border-r-emerald-400 " />

                <div className="text-center">
                  <p className="text-5xl font-semibold">{activeProject?.progress}%</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Overall progress
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* KPI strip */}
        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <Hammer size={18} />
              </div>

              <TrendingUp size={17} className="text-emerald-500" />
            </div>

            <p className="text-2xl font-semibold">{projects.length}</p>
            <p className="mt-1 text-xs text-slate-500">Active projects</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <Package size={18} />
              </div>

              <span className="text-xs font-medium text-orange-500">
                {requests.filter(req => req.status === "PENDING").length} pending
              </span>
            </div>

            <p className="text-2xl font-semibold">{requests.length}</p>
            <p className="mt-1 text-xs text-slate-500">Material requests</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                <FileText size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">!!!</p>
            <p className="mt-1 text-xs text-slate-500">Open quotations</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                <Wallet size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">$!!!</p>
            <p className="mt-1 text-xs text-slate-500">Outstanding payments</p>
          </div>

        </section>

        {/* Content Grid */}
        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

          {/* Projects */}
          <div className="rounded-[24px] border border-slate-200 bg-white p-6">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Your projects</p>
                <p className="mt-1 text-sm text-slate-500">
                  Track progress across your active sites
                </p>
              </div>

              <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
                View all
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-5">
              {projects.slice(0,4).map((project) => (
                <div
                  key={project.name}
                  className="group rounded-2xl border border-slate-100 p-4 transition hover:border-slate-200 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${project.status === "IN_PROGRESS" ? "bg-emerald-500" : project.status === "PLANNING" ? "bg-blue-500" : "bg-violet-500" }`}
                        />

                        <h3 className="text-sm font-semibold">
                          {project.name}
                        </h3>
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {project.location}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      {project.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${project.status === "IN_PROGRESS" ? "bg-emerald-500" : project.status === "PLANNING" ? "bg-blue-500" : "bg-violet-500" }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>

                    <span className="w-9 text-right text-xs font-semibold">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="rounded-[24px] bg-[#e9f4ed] p-6">

            <div className="mb-6">
              <p className="text-lg font-semibold">Coming up</p>
              <p className="mt-1 text-sm text-slate-500">
                Important dates this week
              </p>
            </div>

            <div className="space-y-3">

              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-2.5">
                    <Clock3 size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Site inspection
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Tomorrow · 09:30
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-2.5">
                    <Truck size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Steel delivery
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Sep 8 · Atlas Residence
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-2.5">
                    <CalendarDays size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Payment deadline
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Sep 11 · $12,400
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              Open calendar
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Bottom */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Material Requests */}
          <div className="rounded-[24px] border border-slate-200 bg-white p-6">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Material requests</p>
                <p className="mt-1 text-sm text-slate-500">
                  Latest procurement activity
                </p>
              </div>

              <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="space-y-2">

              {requests.slice(0,3).map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] gap-4 rounded-2xl p-4 transition hover:bg-slate-50 sm:grid-cols-[1.2fr_0.8fr_auto]"
                >
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.supplier}
                    </p>
                  </div>

                  <div className="hidden items-center gap-3 text-xs text-slate-600 sm:flex">
                    {item.items[0].quantity} {item.items[0].unit} <div className="p-2 rounded-full border border-gray-100 flex items-center justify-center bg-slate-50 text-[8px]"><span>+{item.items.length -1}</span></div>
                  </div>

                  <div className="flex items-center justify-end">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[11px] font-medium ${
                        item.status === "DELIVERED"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "ACCEPTED"
                          ? "bg-blue-50 text-blue-700"
                          : item.status === "IN_PROGRESS" ? "bg-violet-50 text-violet-700"
                          : item.status === "REJECTED" ? "bg-red-50 text-red-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}

            </div>

            <button onClick={() => {redirect("/contractor/requests"); scrollTo(0,0)}} className="mt-4 flex items-center gap-1 text-sm font-medium cursor-pointer text-slate-600 hover:text-slate-900">
              View all requests
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Activity */}
          <div className="rounded-[24px] border border-slate-200 bg-white p-6">

            <div className="mb-6">
              <p className="text-lg font-semibold">Recent activity</p>
              <p className="mt-1 text-sm text-slate-500">
                Latest updates from your workspace
              </p>
            </div>

            <div className="relative space-y-6">

              <div className="absolute left-[17px] top-3 h-[calc(100%-25px)] w-px bg-slate-100" />

              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.title}
                    className="relative flex gap-4"
                  >
                    <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-600">
                      <Icon size={14} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {activity.description}
                      </p>

                      <p className="mt-2 text-[11px] text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium transition hover:bg-slate-50">
              View activity
              <ArrowUpRight size={15} />
            </button>
          </div>

        </section>

        {/* Footer insight */}
        <section className="mt-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Circle size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Everything looks on track
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Your active projects are currently within their planned timelines.
              </p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-200">
            Project overview
            <ArrowUpRight size={16} />
          </button>

        </section>

      </div>
    </main>
  );
}