"use client";

import { useSupplier } from "@/app/context/SupplierContext";
import {
  AlertCircle,
  ArrowDownUp,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Package,
  Search,
  ShoppingBag,
  XCircle,
  ChevronRight,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type OrderItem = {
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type Order = {
  id: number;
  contractorId: number;
  supplierId: number;
  status: "PENDING" | "ACCEPTED" | "COMPLETED" | "REJECTED";
  createdAt: string;
  totalPrice: number;
  items: OrderItem[];
};

const orders: Order[] = [
  {
    id: 1025,
    contractorId: 29,
    supplierId: 5,
    status: "PENDING",
    createdAt: "2026-09-04T10:35:00",
    totalPrice: 18250,
    items: [
      {
        productId: 1,
        quantity: 100,
        unitPrice: 72,
        totalPrice: 7200,
      },
      {
        productId: 2,
        quantity: 50,
        unitPrice: 58,
        totalPrice: 2900,
      },
      {
        productId: 5,
        quantity: 20,
        unitPrice: 245,
        totalPrice: 4900,
      },
      {
        productId: 7,
        quantity: 38,
        unitPrice: 85,
        totalPrice: 3230,
      },
    ],
  },
  {
    id: 1024,
    contractorId: 31,
    supplierId: 5,
    status: "ACCEPTED",
    createdAt: "2026-09-03T15:20:00",
    totalPrice: 9450,
    items: [
      {
        productId: 3,
        quantity: 100,
        unitPrice: 35,
        totalPrice: 3500,
      },
      {
        productId: 8,
        quantity: 50,
        unitPrice: 8.5,
        totalPrice: 425,
      },
      {
        productId: 5,
        quantity: 20,
        unitPrice: 245,
        totalPrice: 4900,
      },
    ],
  },
  {
    id: 1023,
    contractorId: 29,
    supplierId: 5,
    status: "COMPLETED",
    createdAt: "2026-09-02T09:10:00",
    totalPrice: 12600,
    items: [
      {
        productId: 1,
        quantity: 100,
        unitPrice: 72,
        totalPrice: 7200,
      },
      {
        productId: 7,
        quantity: 30,
        unitPrice: 85,
        totalPrice: 2550,
      },
      {
        productId: 8,
        quantity: 100,
        unitPrice: 8.5,
        totalPrice: 850,
      },
      {
        productId: 3,
        quantity: 57,
        unitPrice: 35,
        totalPrice: 1995,
      },
    ],
  },
  {
    id: 1022,
    contractorId: 34,
    supplierId: 5,
    status: "REJECTED",
    createdAt: "2026-09-01T13:45:00",
    totalPrice: 5200,
    items: [
      {
        productId: 6,
        quantity: 40,
        unitPrice: 95,
        totalPrice: 3800,
      },
      {
        productId: 4,
        quantity: 112,
        unitPrice: 12.5,
        totalPrice: 1400,
      },
    ],
  },
  {
    id: 1021,
    contractorId: 31,
    supplierId: 5,
    status: "COMPLETED",
    createdAt: "2026-08-31T11:30:00",
    totalPrice: 7350,
    items: [
      {
        productId: 5,
        quantity: 30,
        unitPrice: 245,
        totalPrice: 7350,
      },
    ],
  },
  {
    id: 1020,
    contractorId: 29,
    supplierId: 5,
    status: "PENDING",
    createdAt: "2026-08-30T16:25:00",
    totalPrice: 4100,
    items: [
      {
        productId: 3,
        quantity: 60,
        unitPrice: 35,
        totalPrice: 2100,
      },
      {
        productId: 8,
        quantity: 100,
        unitPrice: 8.5,
        totalPrice: 850,
      },
      {
        productId: 7,
        quantity: 13,
        unitPrice: 85,
        totalPrice: 1105,
      },
    ],
  },
];

const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-100",
  },
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortNewest, setSortNewest] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const {orders, fetchOrdersBySupplierId} = useSupplier();

  useEffect(() => {
   fetchOrdersBySupplierId()
  },[])

  const filteredOrders = useMemo(() => {
    const result = orders.filter((order) => {
      const matchesSearch =
        order.id.toString().includes(search) ||
        (order.contractor).toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      const first = new Date(a.createdAt).getTime();
      const second = new Date(b.createdAt).getTime();

      return sortNewest ? second - first : first - second;
    });

    return result;
  }, [orders, search, statusFilter, sortNewest]);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status !== "REJECTED")
    .reduce((sum, order) => sum + order.totalPrice, 0);

  const formatPrice = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (value: string) => {
    return new Date(value).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
              <ShoppingBag className="h-4 w-4" />
              Supplier Dashboard
              <span className="text-slate-300">/</span>
              Orders
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Orders
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track and manage orders received from contractors.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={totalOrders}
            description="All received orders"
            icon={ShoppingBag}
            iconBg="bg-slate-100"
            iconClass="text-slate-700"
          />

          <StatCard
            title="Pending"
            value={pendingOrders}
            description="Waiting for action"
            icon={Clock3}
            iconBg="bg-amber-50"
            iconClass="text-amber-600"
          />

          <StatCard
            title="Completed"
            value={completedOrders}
            description="Successfully delivered"
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconClass="text-emerald-600"
          />

          <StatCard
            title="Order Value"
            value={`${formatPrice(totalRevenue)} MAD`}
            description="Excluding rejected orders"
            icon={Package}
            iconBg="bg-blue-50"
            iconClass="text-blue-600"
            largeValue
          />
        </div>

        {/* Main Orders Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search order or contractor..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-slate-100"
                >
                  <option value="All">All statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="REJECTED">Rejected</option>
                </select>

                <button
                  onClick={() => setSortNewest(!sortNewest)}
                  className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <ArrowDownUp className="h-4 w-4" />
                  {sortNewest ? "Newest" : "Oldest"}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Contractor
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Items
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total
                  </th>

                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;

                  return (
                    <tr
                      key={order.id}
                      className="group transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-slate-900">
                            #{order.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {order.items.length} product
                            {order.items.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                            C{order.contractorId}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Contractor #{order.contractorId}
                            </p>

                            <p className="text-xs text-slate-400">
                              {order.contractor}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-slate-400" />

                          <span className="text-sm font-medium text-slate-600">
                            {order.items.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}{" "}
                            units
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {formatDate(order.createdAt)}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {formatTime(order.createdAt)}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {status.label}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <p className="font-bold text-slate-900">
                          {formatPrice(order.totalPrice)}
                        </p>

                        <p className="text-xs text-slate-400">MAD</p>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          title="View order"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;

              return (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="w-full p-5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-slate-900">
                        Order #{order.id}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Contractor #{order.contractorId}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 text-slate-300" />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </span>

                    <p className="font-bold text-slate-900">
                      {formatPrice(order.totalPrice)} MAD
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                    <span>
                      {order.items.length} product
                      {order.items.length !== 1 ? "s" : ""}
                    </span>

                    <span>•</span>

                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <AlertCircle className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No orders found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredOrders.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {orders.length}
              </span>{" "}
              orders
            </p>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <ShoppingBag className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Order #{selectedOrder.id}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Created {formatDate(selectedOrder.createdAt)} at{" "}
                      {formatTime(selectedOrder.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-[calc(90vh-90px)] overflow-y-auto p-6">

              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Contractor</p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedOrder.contractor}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Status</p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {statusConfig[selectedOrder.status].label}
                  </p>
                </div>

                <div className="col-span-2 rounded-xl bg-slate-50 p-4 sm:col-span-1">
                  <p className="text-xs text-slate-400">Total</p>

                  <p className="mt-1 font-bold text-slate-900">
                    {formatPrice(selectedOrder.totalPrice)} MAD
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">
                    Order Items
                  </h3>

                  <span className="text-xs font-medium text-slate-400">
                    {selectedOrder.items.length} products
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <div className="divide-y divide-slate-100">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={`${selectedOrder.id}-${item.productId}-${index}`}
                        className="flex items-center justify-between gap-4 p-4"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <Package className="h-4 w-4 text-slate-500" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {item.productName}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {item.quantity} ×{" "}
                              {formatPrice(item.unitPrice)} MAD
                            </p>
                          </div>
                        </div>

                        <p className="shrink-0 font-semibold text-slate-900">
                          {formatPrice(item.totalPrice)} MAD
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-4">
                    <span className="font-medium text-slate-500">
                      Order Total
                    </span>

                    <span className="text-lg font-bold text-slate-900">
                      {formatPrice(selectedOrder.totalPrice)} MAD
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              {selectedOrder.status === "PENDING" && (
                <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <div>
                      <p className="text-sm font-semibold text-amber-800">
                        This order is waiting for your action
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-700">
                        You can review the requested products and process the
                        order from here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconClass,
  largeValue = false,
}: {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconClass: string;
  largeValue?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p
            className={`mt-2 font-bold tracking-tight text-slate-900 ${
              largeValue
                ? "truncate text-2xl"
                : "text-3xl"
            }`}
          >
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}