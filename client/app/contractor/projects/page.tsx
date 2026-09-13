"use client";

import { useContractor } from "@/app/context/ContractorContext";
import { ArrowUpRight, CalendarDays, ChevronRight, Clock3, DollarSign, MapPin, MoreHorizontal, Plus, Search, SlidersHorizontal, Hammer, Package, CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";






export default function ContractorProjectsPage({children} : {childern : React.ReactNode}) {
  
  
   const {projects, fetchProjects} = useContractor();
   const [searchTerm, setSearchTerm] = useState("");
   const [loading, setLoading] = useState(true)
   const [activeProject, setActiveProject] = useState(null);
   const [showCreateModal, setShowCreateModal] = useState(false)
   

   const [name, setName] = useState("")
   const [description, setDescription] = useState("")
   const [type, setType] = useState("")
   const [location, setLocation] = useState("")
   const [startDate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const [budget, setBudget] = useState("")

  useEffect(() => {
   fetchProjects()
   setLoading(false)
   
  }, [])

  useEffect(()=> {

   if(projects.length > 0 && !activeProject) {
      setActiveProject(projects[0])
      
   }

  },[projects, activeProject])

  

  const phases = [
  {
    name: "Planning",
    progress: ((activeProject?.completedTasks/activeProject?.totalTasks * 100 ) < 20 &&  (activeProject?.completedTasks/activeProject?.totalTasks * 100 ) >=0) ?  Math.floor(activeProject?.completedTasks/activeProject?.totalTasks * 100 ) :(activeProject?.completedTasks/activeProject?.totalTasks * 100 ) > 20 ?  100 : 0,
    status: "Completed",
  },
  {
    name: "Foundation",
    progress:   ((activeProject?.completedTasks/activeProject?.totalTasks * 100 ) < 40 &&  (activeProject?.completedTasks/activeProject?.totalTasks * 100 ) > 20) ?  Math.floor(activeProject?.completedTasks/activeProject?.totalTasks * 100 ) : (activeProject?.completedTasks/activeProject?.totalTasks * 100 ) > 40 ?  100 : 0 ,
    status: "Completed",
  },
  {
    name: "Structure",
    progress: ((activeProject?.completedTasks/activeProject?.totalTasks * 100 ) < 60 &&  (activeProject?.completedTasks/activeProject?.totalTasks * 100 ) > 40) ?  Math.floor(activeProject?.completedTasks/activeProject?.totalTasks * 100 ) : (activeProject?.completedTasks/activeProject?.totalTasks * 100 ) > 60 ?  100 : 0,
    status: "In Progress",
  },
  {
    name: "Electrical & Plumbing",
    progress: ((activeProject?.completedTasks/activeProject?.totalTasks * 100 ) < 80 &&  (activeProject?.completedTasks/activeProject?.totalTasks * 100 ) > 60) ?  Math.floor(activeProject?.completedTasks/activeProject?.totalTasks * 100 ) : (activeProject?.completedTasks/activeProject?.totalTasks * 100 ) > 80 ?  100 : 0,
    status: "In Progress",
  },
  {
    name: "Finishing",
    progress: ((activeProject?.completedTasks/activeProject?.totalTasks * 100 ) <= 100 &&  (activeProject?.completedTasks/activeProject?.totalTasks * 100 ) > 80) ?  Math.floor(activeProject?.completedTasks/activeProject?.totalTasks * 100 ) : (activeProject?.completedTasks/activeProject?.totalTasks * 100 ) === 100 ?  100 : 0,
    status: "Upcoming",
  },
];

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createProject = async () => {
   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
         method: "POST",
         headers : {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type" : "application/json"
         },
         body: JSON.stringify({
            name,
            description,
            startDate,
            endDate,
            type,
            location,
            contractorId: 29
         })
      })

      if(response.ok) {

         setName("")
         setDescription("")
         setType("")
         setStartDate("")
         setEndDate("")
         setLocation("")
         setBudget("")

         toast.success("Project Created Successfuly")

      }else {
         throw new Error("Failed to create new project")
         toast.error("Failed to create new project")
      }


   } catch (error) {
      console.log(error);
   }
  }

  return loading ? (
      <div className="h-full flex items-center justify-center">
         <div className="h-10 w-10 rounded-full border-2 border-t-0 border-r-red-500 border-b-blue-500 border-l-green-500 animate-spin"></div>
      </div>
  ) : (
    <main className="min-h-screen bg-[#f6f7f5] text-slate-900">
      <div className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8 lg:py-8">

        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-500">
              Contractor Workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Projects
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Manage your construction projects, monitor progress, and stay
              ahead of every milestone.
            </p>
          </div>

          <button onClick={() => setShowCreateModal(true)} className="flex w-fit items-center gap-2 rounded-xl bg-slate-900 cursor-pointer px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
            <Plus size={17} />
            New Project
          </button>
        </header>

        {/* Project Selector */}
        <section className="mb-6 grid gap-4 lg:grid-cols-3">

          {filteredProjects.map((project) => {
            const selected = activeProject?.name === project.name;

            return (
              <button
                key={project.name}
                onClick={() => setActiveProject(project)}
                className={`relative overflow-hidden rounded-[24px] border p-5 text-left transition ${
                  selected
                    ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          selected
                            ? "bg-emerald-400"
                            : project.accent === "emerald"
                            ? "bg-emerald-500"
                            : project.accent === "blue"
                            ? "bg-blue-500"
                            : "bg-violet-500"
                        }`}
                      />

                      <span
                        className={`text-[11px] font-medium uppercase tracking-wider ${
                          selected ? "text-slate-400" : "text-slate-400"
                        }`}
                      >
                        {project.type}
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-semibold">
                      {project.name}
                    </h2>

                    <div
                      className={`mt-2 flex items-center gap-1.5 text-xs ${
                        selected ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      <MapPin size={13} />
                      {project.location}
                    </div>
                  </div>

                  <div
                    className={`rounded-xl p-2 ${
                      selected
                        ? "bg-white/10"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ArrowUpRight size={17} />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`text-xs ${
                        selected ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Project progress
                    </span>

                    <span className="text-sm font-semibold">
                      {project.progress}%
                    </span>
                  </div>

                  <div
                    className={`h-1.5 overflow-hidden rounded-full ${
                      selected ? "bg-white/10" : "bg-slate-100"
                    }`}
                  >
                    <div
                      className={`h-full rounded-full ${
                        project.accent === "emerald"
                          ? "bg-emerald-400"
                          : project.accent === "blue"
                          ? "bg-blue-400"
                          : "bg-violet-400"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}

        </section>

        {/* Main Project Workspace */}
        <section className="grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">

          {/* Project Overview */}
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">

            <div className="relative overflow-hidden bg-slate-950 px-6 py-7 text-white sm:px-8 sm:py-9">

              <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[55px] border-emerald-400/10" />
              <div className="absolute -bottom-32 left-1/2 h-72 w-72 rounded-full border border-white/10" />

              <div className="relative flex flex-col justify-between gap-7 md:flex-row">

                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300">
                      {activeProject?.status}
                    </span>

                    <span className="text-xs text-slate-500">
                      #{activeProject?.name === "Atlas Residence" ? "PR-001" : activeProject?.name === "Ocean View Villas" ? "PR-002" : "PR-003"}
                    </span>
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight">
                    {activeProject?.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                    <MapPin size={15} />
                    {activeProject?.location}
                  </div>
                </div>

                <button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-medium backdrop-blur transition hover:bg-white/15">
                  <MoreHorizontal size={17} />
                  Actions
                </button>

              </div>

              {/* Progress */}
              <div className="relative mt-9">
                <div className="mb-3 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      Overall completion
                    </p>

                    <p className="mt-1 text-4xl font-semibold">
                      {activeProject?.progress}%
                    </p>
                  </div>

                  <p className="text-xs text-slate-500">
                    {activeProject?.completedTasks} of{" "}
                    {activeProject?.totalTasks} tasks completed
                  </p>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all"
                    style={{
                      width: `${activeProject?.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100 sm:grid-cols-4">

              <div className="p-5 sm:p-6">
                <p className="text-xs text-slate-400">Budget</p>

                <p className="mt-2 text-lg font-semibold">
                  ${activeProject?.budget.toLocaleString("en-US")}
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs text-slate-400">Spent</p>

                <p className="mt-2 text-lg font-semibold">
                  ${activeProject?.spent.toLocaleString("en-US")}
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs text-slate-400">Start date</p>

                <p className="mt-2 text-sm font-semibold">
                  {activeProject?.startDate}
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs text-slate-400">Deadline</p>

                <p className="mt-2 text-sm font-semibold">
                  {activeProject?.endDate}
                </p>
              </div>

            </div>

            {/* Phases */}
            <div className="p-6 sm:p-8">

              <div className="mb-7 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Construction roadmap
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Follow every phase from planning to completion.
                  </p>
                </div>

                <button className="hidden items-center gap-1 text-sm font-medium text-slate-600 sm:flex">
                  Full roadmap
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="relative">

                <div className="absolute left-[15px] top-3 h-[calc(100%-30px)] w-px bg-slate-200" />

                <div className="space-y-7">

                  {phases.map((phase, index) => {

                    const completed = phase.progress === 100;
                    const current =
                      phase.status === "In Progress";

                    return (
                      <div
                        key={phase.name}
                        className="relative flex gap-5"
                      >
                        <div
                          className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white ${
                            completed
                              ? "bg-emerald-500 text-white"
                              : current
                              ? "bg-slate-900 text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {completed ? (
                            <CheckCircle2 size={13} />
                          ) : (
                            <span className="text-[10px] font-semibold">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-col justify-between gap-2 sm:flex-row">
                            <div>
                              <p className="text-sm font-semibold">
                                {phase.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {phase.status}
                              </p>
                            </div>

                            <span className="text-xs font-semibold">
                              {phase.progress}%
                            </span>
                          </div>

                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${
                                completed
                                  ? "bg-emerald-500"
                                  : current
                                  ? "bg-slate-900"
                                  : "bg-slate-300"
                              }`}
                              style={{
                                width: `${phase.progress}%`,
                              }}
                            />
                          </div>

                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>

            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">

            {/* Deadline Card */}
            <div className="rounded-[24px] bg-[#e9f4ed] p-6">

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Project deadline
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Keep the schedule on track
                  </p>
                </div>

                <div className="rounded-xl bg-white p-2.5">
                  <CalendarDays size={18} />
                </div>
              </div>

              <div className="mt-7">
                <p className="text-3xl font-semibold">
                  {activeProject?.endDate}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {activeProject?.endDate.split(",")[1]}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5">
                <Clock3 size={15} />

                <span className="text-xs font-medium">
                  {Math.ceil((new Date(activeProject?.endDate) - new Date(Date.now()))/ 86400000) } days remaining
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-6">

              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">
                  Project resources
                </h3>

                <button className="rounded-lg p-1.5 hover:bg-slate-50">
                  <MoreHorizontal size={17} />
                </button>
              </div>

              <div className="space-y-3">

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5">
                  <div className="rounded-xl bg-white p-2.5 shadow-sm">
                    <Package size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Materials
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Active requests
                    </p>
                  </div>

                  <span className="text-lg font-semibold">
                    {activeProject?.materials.length}
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5">
                  <div className="rounded-xl bg-white p-2.5 shadow-sm">
                    <Hammer size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Tasks
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Completed
                    </p>
                  </div>

                  <span className="text-lg font-semibold">
                    {activeProject?.completedTasks}
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5">
                  <div className="rounded-xl bg-white p-2.5 shadow-sm">
                    <DollarSign size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Remaining budget
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Available
                    </p>
                  </div>

                  <span className="text-sm font-semibold">
                    $
                    {(
                      Number(
                        activeProject?.budget
                        // .replace(/[$,]/g, "")
                      ) - Number(
                        activeProject?.spent
                        // .replace(/[$,]/g, "")
                      )).toLocaleString("en-US")
                      
                    }
                  </span>
                </div>

              </div>
            </div>

            {/* Project Actions */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-6">

              <h3 className="mb-4 font-semibold">
                Project workspace
              </h3>

              <div className="space-y-2">

                <button onClick={() => redirect(`/contractor/projects/${activeProject.id}`)} className="flex cursor-pointer w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-slate-50">
                  <span className="flex items-center gap-3 text-sm">
                    <Package size={17} />
                    Material requests
                  </span>

                  <ChevronRight size={16} className="text-slate-400" />
                </button>

                <button onClick={() => redirect(`/contractor/projects/${activeProject.id}`)} className="flex cursor-pointer w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-slate-50">
                  <span className="flex items-center gap-3 text-sm">
                    <CalendarDays size={17} />
                    Project schedule
                  </span>

                  <ChevronRight size={16} className="text-slate-400" />
                </button>

                <button onClick={() => redirect(`/contractor/projects/${activeProject.id}`)} className="flex cursor-pointer w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-slate-50">
                  <span className="flex items-center gap-3 text-sm">
                    <DollarSign size={17} />
                    Financial overview
                  </span>

                  <ChevronRight size={16} className="text-slate-400" />
                </button>

              </div>
            </div>

          </div>
        </section>

        {/* Bottom Search / Management Bar */}
        <section className="mt-6 flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white p-4 sm:flex-row">

          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium transition hover:bg-slate-50">
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800">
            Manage projects
            <ArrowUpRight size={16} />
          </button>

        </section>

      </div>

      {showCreateModal && (
  <div
    className="fixed inset-0 z-100 flex items-center justify-center
               bg-slate-950/50 backdrop-blur-sm p-4"
  >
    <div
      className="w-full max-w-3xl max-h-[90vh] overflow-y-auto
                 rounded-3xl bg-white shadow-2xl"
    >

      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 px-8 py-6">

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-400">
            NEW PROJECT
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Create a new project
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add the essential details of your construction project.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl
                     bg-slate-100 text-xl text-slate-500
                     transition hover:bg-slate-200 hover:text-slate-800"
        >
          ×
        </button>

      </div>


      {/* Form */}
      <div className="space-y-6 px-8 py-7">

        {/* Project Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Project name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Casablanca Residential Villa"
            className="w-full rounded-xl border border-slate-200
                       bg-slate-50 px-4 py-3 text-sm text-slate-900
                       outline-none transition
                       placeholder:text-slate-400
                       focus:border-slate-400 focus:bg-white
                       focus:ring-4 focus:ring-slate-100"
          />
        </div>


        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe the project..."
            className="w-full resize-none rounded-xl border border-slate-200
                       bg-slate-50 px-4 py-3 text-sm text-slate-900
                       outline-none transition
                       placeholder:text-slate-400
                       focus:border-slate-400 focus:bg-white
                       focus:ring-4 focus:ring-slate-100"
          />
        </div>


        {/* Type + Location */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Project type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-slate-200
                         bg-slate-50 px-4 py-3 text-sm text-slate-700
                         outline-none transition
                         focus:border-slate-400 focus:bg-white
                         focus:ring-4 focus:ring-slate-100"
            >
              <option value="">Select type</option>
              <option value="RESIDENTIAL">Residential</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="INDUSTRIAL">Industrial</option>
              <option value="INFRASTRUCTURE">Infrastructure</option>
            </select>
          </div>


          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Casablanca"
              className="w-full rounded-xl border border-slate-200
                         bg-slate-50 px-4 py-3 text-sm text-slate-900
                         outline-none transition
                         placeholder:text-slate-400
                         focus:border-slate-400 focus:bg-white
                         focus:ring-4 focus:ring-slate-100"
            />
          </div>

        </div>


        {/* Dates */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Start date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200
                         bg-slate-50 px-4 py-3 text-sm text-slate-700
                         outline-none transition
                         focus:border-slate-400 focus:bg-white
                         focus:ring-4 focus:ring-slate-100"
            />
          </div>


          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              End date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200
                         bg-slate-50 px-4 py-3 text-sm text-slate-700
                         outline-none transition
                         focus:border-slate-400 focus:bg-white
                         focus:ring-4 focus:ring-slate-100"
            />
          </div>

        </div>


        {/* Budget */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Project budget
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200
                          bg-slate-50 focus-within:border-slate-400
                          focus-within:bg-white focus-within:ring-4
                          focus-within:ring-slate-100">

            <input
              type="number"
              value={budget}
              min={0}
              onChange={(e) => setBudget(Number(e.target.value))}
              placeholder="850000"
              className="w-full bg-transparent px-4 py-3 text-sm
                         text-slate-900 outline-none"
            />

            <div className="flex items-center border-l border-slate-200
                            px-4 text-sm font-semibold text-slate-500">
              MAD
            </div>

          </div>
        </div>

      </div>


      {/* Footer */}
      <div className="flex items-center justify-end gap-3
                      border-t border-slate-100 bg-slate-50/70
                      px-8 py-5">

        <button
          onClick={() => setShowCreateModal(false)}
          className="rounded-xl border border-slate-200 bg-white
                     px-5 py-2.5 text-sm font-semibold text-slate-600
                     transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
        onClick={createProject}
          className="flex items-center gap-2 rounded-xl bg-slate-900
                     px-5 py-2.5 text-sm font-semibold text-white
                     shadow-sm transition hover:bg-slate-800
                     hover:shadow-md"
        >
          Create Project
          <span className="text-lg">→</span>
        </button>

      </div>

    </div>
  </div>
)}
    <div className="w-full h-full">
      {children}
    </div>
    
    </main>
  );
}


















// const projects = [
//   {
//     name: "Atlas Residence",
//     location: "Casablanca, Morocco",
//     type: "Residential",
//     progress: 72,
//     status: "In Progress",
//     budget: "$284,500",
//     spent: "$196,240",
//     deadline: "Oct 28, 2026",
//     startDate: "Apr 12, 2026",
//     materials: 8,
//     completedTasks: 36,
//     totalTasks: 50,
//     accent: "emerald",
//   },
//   {
//     name: "Ocean View Villas",
//     location: "Dar Bouazza, Morocco",
//     type: "Residential",
//     progress: 46,
//     status: "In Progress",
//     budget: "$412,000",
//     spent: "$189,600",
//     deadline: "Dec 16, 2026",
//     startDate: "Jun 03, 2026",
//     materials: 5,
//     completedTasks: 23,
//     totalTasks: 50,
//     accent: "blue",
//   },
//   {
//     name: "Palm Heights",
//     location: "Rabat, Morocco",
//     type: "Commercial",
//     progress: 91,
//     status: "Finishing",
//     budget: "$198,000",
//     spent: "$178,400",
//     deadline: "Sep 24, 2026",
//     startDate: "Jan 18, 2026",
//     materials: 3,
//     completedTasks: 41,
//     totalTasks: 45,
//     accent: "violet",
//   },
// ];