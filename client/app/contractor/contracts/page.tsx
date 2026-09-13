"use client";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { useState } from "react";

type ContractStatus =
  | "ACTIVE"
  | "PENDING"
  | "COMPLETED"
  | "EXPIRED"
  | "TERMINATED";

type Contract = {
  id: string;
  title: string;
  project: string;
  counterparty: string;
  counterpartyInitials: string;
  status: ContractStatus;
  value: string;
  startDate: string;
  endDate: string;
  signedDate: string;
  duration: string;
  progress: number;
  description: string;
  scope: string[];
};

const contracts: Contract[] = [
  {
    id: "CTR-2026-001",
    title: "Atlas Residence Construction",
    project: "Atlas Residence",
    counterparty: "Atlas Development Group",
    counterpartyInitials: "AD",
    status: "ACTIVE",
    value: "$284,500",
    startDate: "Apr 12, 2026",
    endDate: "Oct 28, 2026",
    signedDate: "Apr 08, 2026",
    duration: "6 months",
    progress: 72,
    description:
      "Full construction agreement covering structural, electrical, plumbing and finishing works.",
    scope: [
      "Structural construction",
      "Electrical installation",
      "Plumbing systems",
      "Interior finishing",
    ],
  },
  {
    id: "CTR-2026-002",
    title: "Ocean View Villas Development",
    project: "Ocean View Villas",
    counterparty: "Ocean View Properties",
    counterpartyInitials: "OV",
    status: "ACTIVE",
    value: "$412,000",
    startDate: "Jun 03, 2026",
    endDate: "Dec 16, 2026",
    signedDate: "May 27, 2026",
    duration: "7 months",
    progress: 46,
    description:
      "Residential development contract for the construction of a premium villa complex.",
    scope: [
      "Site preparation",
      "Foundation & structure",
      "Electrical installation",
      "Plumbing systems",
    ],
  },
  {
    id: "CTR-2026-003",
    title: "Palm Heights Finishing",
    project: "Palm Heights",
    counterparty: "Palm Heights Development",
    counterpartyInitials: "PH",
    status: "ACTIVE",
    value: "$198,000",
    startDate: "Jan 18, 2026",
    endDate: "Sep 24, 2026",
    signedDate: "Jan 11, 2026",
    duration: "8 months",
    progress: 91,
    description:
      "Finishing and interior works contract for the Palm Heights commercial project.",
    scope: [
      "Flooring",
      "Wall finishing",
      "Painting",
      "Final installations",
    ],
  },
  {
    id: "CTR-2025-014",
    title: "Green Park Renovation",
    project: "Green Park",
    counterparty: "Green Park Holdings",
    counterpartyInitials: "GP",
    status: "COMPLETED",
    value: "$126,800",
    startDate: "Mar 04, 2025",
    endDate: "Nov 22, 2025",
    signedDate: "Feb 24, 2025",
    duration: "9 months",
    progress: 100,
    description:
      "Renovation and modernization of an existing commercial property.",
    scope: [
      "Demolition",
      "Structural renovation",
      "Interior works",
      "Final inspection",
    ],
  },
  {
    id: "CTR-2026-004",
    title: "Marina Office Complex",
    project: "Marina Office Complex",
    counterparty: "Marina Business Center",
    counterpartyInitials: "MB",
    status: "PENDING",
    value: "$176,400",
    startDate: "Oct 02, 2026",
    endDate: "Apr 14, 2027",
    signedDate: "Pending",
    duration: "7 months",
    progress: 0,
    description:
      "Commercial construction agreement awaiting final approval and signature.",
    scope: [
      "Site preparation",
      "Structural works",
      "Electrical systems",
      "HVAC installation",
    ],
  },
];

const statusConfig = {
  ACTIVE: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700",
  },
  PENDING: {
    label: "Pending Signature",
    className: "bg-amber-50 text-amber-700",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-blue-50 text-blue-700",
  },
  EXPIRED: {
    label: "Expired",
    className: "bg-slate-100 text-slate-500",
  },
  TERMINATED: {
    label: "Terminated",
    className: "bg-red-50 text-red-600",
  },
};

export default function ContractorContractsPage() {
  const [selectedContract, setSelectedContract] = useState<Contract>(
    contracts[0]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.counterparty
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      statusConfig[contract.status].label === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const activeContracts = contracts.filter(
    (contract) => contract.status === "ACTIVE"
  ).length;

  const totalValue = contracts
    .filter(
      (contract) =>
        contract.status === "ACTIVE" || contract.status === "PENDING"
    )
    .reduce(
      (sum, contract) =>
        sum + Number(contract.value.replace(/[$,]/g, "")),
      0
    );

  return (
    <main className="min-h-screen bg-[#f6f7f5] text-slate-900">
      <div className="mx-auto max-w-[1600px] px-5 py-6 lg:px-8 lg:py-8">

        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-500">
              Contractor Workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Contracts
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Keep track of your construction agreements, contract values,
              deadlines, and obligations.
            </p>
          </div>

          <button className="flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
            <Plus size={17} />
            New Contract
          </button>
        </header>

        {/* Overview */}
        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-[22px] border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <FileCheck2 size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">
              {activeContracts}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Active contracts
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <ShieldCheck size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">
              ${Math.round(totalValue / 1000)}K
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Contract value
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                <Clock3 size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">
              {contracts.filter((c) => c.status === "PENDING").length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Awaiting signature
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                <CheckCircle2 size={18} />
              </div>
            </div>

            <p className="text-2xl font-semibold">
              {contracts.filter((c) => c.status === "COMPLETED").length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Completed
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
              placeholder="Search contracts, projects or parties..."
              className="h-11 w-full rounded-xl bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-slate-300"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-50 p-1">
            {[
              "All",
              "Active",
              "Pending Signature",
              "Completed",
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

        {/* Main Workspace */}
        <section className="grid gap-5 lg:grid-cols-[1fr_440px]">

          {/* Contracts List */}
          <div className="rounded-[26px] border border-slate-200 bg-white">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="font-semibold">
                  Contract portfolio
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredContracts.length} contracts found
                </p>
              </div>

              <button className="rounded-xl p-2 transition hover:bg-slate-50">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="divide-y divide-slate-100">

              {filteredContracts.map((contract) => {
                const status = statusConfig[contract.status];
                const selected =
                  selectedContract.id === contract.id;

                return (
                  <button
                    key={contract.id}
                    onClick={() => setSelectedContract(contract)}
                    className={`w-full p-5 text-left transition ${
                      selected
                        ? "bg-slate-50"
                        : "hover:bg-slate-50/70"
                    }`}
                  >
                    <div className="flex items-start gap-4">

                      <div
                        className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:flex ${
                          selected
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <h3 className="text-sm font-semibold">
                              {contract.title}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              {contract.id} · {contract.project}
                            </p>
                          </div>

                          <span
                            className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-medium ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">

                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[9px] font-semibold">
                              {contract.counterpartyInitials}
                            </div>

                            <span className="text-xs text-slate-600">
                              {contract.counterparty}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <CalendarDays size={13} />
                            {contract.endDate}
                          </div>

                          <span className="ml-auto text-sm font-semibold">
                            {contract.value}
                          </span>

                        </div>

                        {/* Progress */}
                        {contract.status !== "PENDING" && (
                          <div className="mt-4 flex items-center gap-3">

                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-emerald-500"
                                style={{
                                  width: `${contract.progress}%`,
                                }}
                              />
                            </div>

                            <span className="text-[11px] font-semibold text-slate-500">
                              {contract.progress}%
                            </span>

                          </div>
                        )}

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

              {filteredContracts.length === 0 && (
                <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                  <div className="rounded-2xl bg-slate-100 p-4">
                    <Search size={22} className="text-slate-400" />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    No contracts found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try another search or filter.
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Details */}
          <aside className="rounded-[26px] border border-slate-200 bg-white p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Contract details
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  {selectedContract.title}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedContract.id}
                </p>
              </div>

              <button className="rounded-xl p-2 hover:bg-slate-50">
                <MoreHorizontal size={18} />
              </button>

            </div>

            {/* Value */}
            <div className="mt-6 rounded-[22px] bg-slate-950 p-6 text-white">

              <p className="text-xs text-slate-500">
                Contract value
              </p>

              <div className="mt-2 flex items-end justify-between">

                <p className="text-3xl font-semibold">
                  {selectedContract.value}
                </p>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                    statusConfig[selectedContract.status].className
                  }`}
                >
                  {statusConfig[selectedContract.status].label}
                </span>

              </div>

              {selectedContract.status !== "PENDING" && (
                <div className="mt-6">

                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">
                      Project progress
                    </span>

                    <span className="font-medium">
                      {selectedContract.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{
                        width: `${selectedContract.progress}%`,
                      }}
                    />
                  </div>

                </div>
              )}

            </div>

            {/* Counterparty */}
            <div className="mt-5 rounded-2xl border border-slate-100 p-4">

              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Contract party
              </p>

              <div className="mt-3 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold">
                  {selectedContract.counterpartyInitials}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {selectedContract.counterparty}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Contracting party
                  </p>
                </div>

                <button className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50">
                  <ArrowUpRight size={15} />
                </button>

              </div>

            </div>

            {/* Dates */}
            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <CalendarDays size={14} />

                  <span className="text-[10px]">
                    Start date
                  </span>
                </div>

                <p className="mt-2 text-xs font-semibold">
                  {selectedContract.startDate}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock3 size={14} />

                  <span className="text-[10px]">
                    End date
                  </span>
                </div>

                <p className="mt-2 text-xs font-semibold">
                  {selectedContract.endDate}
                </p>
              </div>

            </div>

            {/* Scope */}
            <div className="mt-6">

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  Contract scope
                </p>

                <span className="text-xs text-slate-400">
                  {selectedContract.scope.length} items
                </span>
              </div>

              <div className="mt-3 space-y-2">

                {selectedContract.scope.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white">
                      <CheckCircle2
                        size={13}
                        className="text-emerald-500"
                      />
                    </div>

                    <span className="text-xs font-medium">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            {/* Description */}
            <div className="mt-6">

              <p className="text-sm font-semibold">
                Description
              </p>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                {selectedContract.description}
              </p>

            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-2">

              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-medium text-white transition hover:bg-slate-800">
                <FileText size={14} />
                View contract
              </button>

              <button className="rounded-xl border border-slate-200 px-3 transition hover:bg-slate-50">
                <Download size={16} />
              </button>

              <button className="rounded-xl border border-slate-200 px-3 transition hover:bg-slate-50">
                <MoreHorizontal size={16} />
              </button>

            </div>

          </aside>
        </section>

        {/* Contract Insight */}
        <section className="mt-6 overflow-hidden rounded-[26px] bg-[#e9f4ed] p-6 sm:p-7">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600">
                <ShieldCheck size={21} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Your contract portfolio is healthy
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                  Most of your active agreements are progressing within
                  their planned schedules. Keep an eye on upcoming
                  deadlines and pending signatures.
                </p>
              </div>

            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              Contract reports
              <ArrowUpRight size={16} />
            </button>

          </div>

        </section>

      </div>
    </main>
  );
}