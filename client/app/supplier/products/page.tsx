"use client";

import { useSupplier } from "@/app/context/SupplierContext";
import { Package, Search, Filter, ArrowUpDown, MoreHorizontal, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Boxes, Tag} from "lucide-react";
import { useEffect, useMemo, useState } from "react";



// const products = [
//   {
//     id: 1,
//     name: "Cement 50kg",
//     ref: "CEM-50-001",
//     category: "Construction",
//     price: 72,
//     stock: 120,
//     unit: "bags",
//   },
//   {
//     id: 2,
//     name: "Steel Rebar 12mm",
//     ref: "STL-12-002",
//     category: "Construction",
//     price: 58,
//     stock: 14,
//     unit: "bars",
//   },
//   {
//     id: 3,
//     name: "PVC Pipe 20mm",
//     ref: "PVC-20-003",
//     category: "Plumbing",
//     price: 35,
//     stock: 85,
//     unit: "pcs",
//   },
//   {
//     id: 4,
//     name: "Copper Cable 2.5mm",
//     ref: "CAB-25-004",
//     category: "Electrical",
//     price: 12.5,
//     stock: 8,
//     unit: "meters",
//   },
//   {
//     id: 5,
//     name: "Wall Paint 20L",
//     ref: "PNT-20-005",
//     category: "Finishing",
//     price: 245,
//     stock: 42,
//     unit: "cans",
//   },
//   {
//     id: 6,
//     name: "Ceramic Tiles 60x60",
//     ref: "TIL-60-006",
//     category: "Finishing",
//     price: 95,
//     stock: 0,
//     unit: "boxes",
//   },
//   {
//     id: 7,
//     name: "Electrical Breaker 32A",
//     ref: "BRK-32-007",
//     category: "Electrical",
//     price: 85,
//     stock: 31,
//     unit: "pcs",
//   },
//   {
//     id: 8,
//     name: "PVC Elbow 20mm",
//     ref: "ELB-20-008",
//     category: "Plumbing",
//     price: 8.5,
//     stock: 17,
//     unit: "pcs",
//   },
// ];

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);

  const {products, fetchProducts} = useSupplier();

   useEffect(()=>{
      fetchProducts();
   },[])

  const categories = ["All", ...new Set(products.map((p) => p.category.name))];

  const filtredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) 
         

      const matchesCategory = category === "All" || product.category.name === category;

      const matchesStock =
        stockFilter === "All"  || (stockFilter === "In Stock" && product.stock >= 20) || (stockFilter === "Low Stock" &&
          product.stock > 0 &&
          product.stock < 20) ||
        (stockFilter === "Out of Stock" && product.stock === 0);
      
        return matchesSearch && matchesCategory  && matchesStock;
    });

    result.sort((a, b) =>
      sortAsc ? a.price - b.price : b.price - a.price
    );

    return result;
  }, [products ,search, category, stockFilter, sortAsc]);

  const totalProducts = products.length;
  const inStock = products.filter((p) => p.stock >= 20).length;
  const lowStock = products.filter(
    (p) => p.stock > 0 && p.stock < 20
  ).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  
  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return {
        label: "Out of stock",
        className: "bg-red-50 text-red-600 border-red-100",
        icon: XCircle,
      };
    }

    if (stock < 20) {
      return {
        label: "Low stock",
        className: "bg-amber-50 text-amber-600 border-amber-100",
        icon: AlertTriangle,
      };
    }

    return {
      label: "In stock",
      className: "bg-emerald-50 text-emerald-600 border-emerald-100",
      icon: CheckCircle2,
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
              <Package className="h-4 w-4" />
              Supplier Dashboard
              <span className="text-slate-300">/</span>
              Products
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Products
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your product catalog, prices and inventory.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={Boxes}
            description="Products in catalog"
          />

          <StatCard
            title="In Stock"
            value={inStock}
            icon={CheckCircle2}
            description="Healthy inventory"
            iconClass="text-emerald-600"
            iconBg="bg-emerald-50"
          />

          <StatCard
            title="Low Stock"
            value={lowStock}
            icon={AlertTriangle}
            description="Needs attention"
            iconClass="text-amber-600"
            iconBg="bg-amber-50"
          />

          <StatCard
            title="Out of Stock"
            value={outOfStock}
            icon={XCircle}
            description="Currently unavailable"
            iconClass="text-red-600"
            iconBg="bg-red-50"
          />
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search products or reference..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
                />
              </div>

              <div className="flex flex-wrap gap-2">

                {/* Category */}
                <div className="relative">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-slate-100"
                  >
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                {/* Stock */}
                <div className="relative">
                  <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-slate-100"
                  >
                    <option>All</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>

                {/* Sort */}
                <button
                  onClick={() => setSortAsc(!sortAsc)}
                  className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Price
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
            {filtredProducts.map((product) => {
              const status = getStockStatus(product.stock);
              const StatusIcon = status.icon;

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  {/* Product Icon */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-slate-900 group-hover:text-white">
                      <Package className="h-5 w-5" />
                    </div>

                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {product.category.name}
                      </span>
                    </div>

                    <h3 className="mt-3 line-clamp-1 text-lg font-semibold text-slate-900">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-slate-400">
                      REF: {product.id}
                    </p>
                  </div>

                  {/* Price / Stock */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-medium text-slate-400">
                        Unit Price
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {product.price.toLocaleString()}{" "}
                        <span className="text-xs font-medium text-slate-400">
                          MAD
                        </span>
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-medium text-slate-400">
                        Stock
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {product.stock}
                        <span className="ml-1 text-xs font-medium text-slate-400">
                          {product.unit}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </span>

                    {product.stock > 0 && product.stock < 20 && (
                      <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                        <TrendingUp className="h-3.5 w-3.5 rotate-180" />
                        Refill soon
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty */}
          {filtredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No products found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filtredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filtredProducts.length}
              </span>{" "}
              products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  iconClass = "text-slate-700",
  iconBg = "bg-slate-100",
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
  iconClass?: string;
  iconBg?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;