"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Tag,
  Package,
  Clock3,
  TrendingUp,
  MoreHorizontal,
  CalendarDays,
  ArrowUpRight,
  Percent,
} from "lucide-react";

const offers = [
  {
    id: 1,
    product: "Premium Cement 50kg",
    category: "Cement",
    originalPrice: 95,
    offerPrice: 79,
    discount: 17,
    stock: 240,
    validUntil: "Sep 12, 2026",
    status: "Active",
    sold: 86,
  },
  {
    id: 2,
    product: "Red Brick 20x10x7",
    category: "Bricks",
    originalPrice: 2.5,
    offerPrice: 1.9,
    discount: 24,
    stock: 1250,
    validUntil: "Sep 09, 2026",
    status: "Expiring Soon",
    sold: 430,
  },
  {
    id: 3,
    product: "Steel Rebar 12mm",
    category: "Steel",
    originalPrice: 8500,
    offerPrice: 7650,
    discount: 10,
    stock: 85,
    validUntil: "Sep 20, 2026",
    status: "Active",
    sold: 31,
  },
  {
    id: 4,
    product: "Construction Sand",
    category: "Aggregates",
    originalPrice: 420,
    offerPrice: 350,
    discount: 17,
    stock: 320,
    validUntil: "Aug 28, 2026",
    status: "Expired",
    sold: 117,
  },
  {
    id: 5,
    product: "Concrete Blocks",
    category: "Blocks",
    originalPrice: 8,
    offerPrice: 6.5,
    discount: 19,
    stock: 890,
    validUntil: "Sep 15, 2026",
    status: "Active",
    sold: 275,
  },
  {
    id: 6,
    product: "PVC Water Pipe 4m",
    category: "Plumbing",
    originalPrice: 75,
    offerPrice: 59,
    discount: 21,
    stock: 180,
    validUntil: "Sep 07, 2026",
    status: "Expiring Soon",
    sold: 64,
  },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  "Expiring Soon": "bg-amber-50 text-amber-600",
  Expired: "bg-gray-100 text-gray-500",
};

export default function OffersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        offer.product.toLowerCase().includes(search.toLowerCase()) ||
        offer.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || offer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const activeOffers = offers.filter(
    (offer) => offer.status === "Active"
  ).length;

  const expiringOffers = offers.filter(
    (offer) => offer.status === "Expiring Soon"
  ).length;

  const totalSold = offers.reduce(
    (total, offer) => total + offer.sold,
    0
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-8 lg:px-10">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
            <span>Supplier</span>
            <span>/</span>
            <span className="text-gray-600">Offers</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Offers & Promotions
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create attractive deals and boost your product sales.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800">
          <Plus size={18} />
          Create Offer
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Offers"
          value={offers.length}
          icon={<Tag size={20} />}
          description="All your promotions"
        />

        <StatCard
          title="Active Offers"
          value={activeOffers}
          icon={<TrendingUp size={20} />}
          description="Currently running"
        />

        <StatCard
          title="Expiring Soon"
          value={expiringOffers}
          icon={<Clock3 size={20} />}
          description="Need your attention"
        />

        <StatCard
          title="Products Sold"
          value={totalSold.toLocaleString()}
          icon={<Package size={20} />}
          description="Through offers"
        />

      </div>

      {/* Controls */}
      <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search offers or products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {["All", "Active", "Expiring Soon", "Expired"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setStatus(item)}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  status === item
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

      </div>

      {/* Offers */}
      {filteredOffers.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}

        </div>
      ) : (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Tag size={24} className="text-gray-400" />
          </div>

          <h3 className="font-semibold text-gray-800">
            No offers found
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Try changing your search or filters.
          </p>
        </div>
      )}

    </div>
  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition group-hover:bg-gray-900 group-hover:text-white">
          {icon}
        </div>

        <ArrowUpRight
          size={18}
          className="text-gray-300"
        />
      </div>

      <p className="text-sm text-gray-500">{title}</p>

      <div className="mt-1 flex items-end gap-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {value}
        </h2>
      </div>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>
    </div>
  );
}

/* ---------------- OFFER CARD ---------------- */

function OfferCard({ offer }: { offer: (typeof offers)[number] }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Visual Header */}
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-5">

        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />

        <div className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative flex items-start justify-between">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm">
            <Tag size={21} />
          </div>

          <div className="flex items-center gap-2">

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyles[
                  offer.status as keyof typeof statusStyles
                ]
              }`}
            >
              {offer.status}
            </span>

            <button className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white">
              <MoreHorizontal size={19} />
            </button>

          </div>
        </div>

        <div className="absolute bottom-4 left-5">
          <p className="text-xs font-medium text-white/50">
            {offer.category}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            {offer.product}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Price */}
        <div className="flex items-end justify-between">

          <div>
            <p className="text-xs text-gray-400">
              Offer price
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${offer.offerPrice}
              </span>

              <span className="text-sm text-gray-400 line-through">
                ${offer.originalPrice}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-sm font-bold text-emerald-600">
            <Percent size={14} />
            {offer.discount}
          </div>

        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gray-100" />

        {/* Details */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-xs text-gray-400">
              Available stock
            </p>

            <p className="mt-1 font-semibold text-gray-800">
              {offer.stock.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Sold
            </p>

            <p className="mt-1 font-semibold text-gray-800">
              {offer.sold.toLocaleString()}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CalendarDays size={15} />
            Valid until {offer.validUntil}
          </div>

          <button className="text-sm font-semibold text-gray-800 transition hover:text-gray-500">
            View
          </button>

        </div>

      </div>
    </div>
  );
}