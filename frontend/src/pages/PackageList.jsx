import { useEffect, useState } from "react";
import api from "../api/api";
import PackageCard from "../components/PackageCard";
import Pagination from "../components/Pagination";

function PackageList() {
    const [packages, setPackages] = useState([]);
    const [destination, setDestination] = useState("");
    const [debouncedDestination, setDebouncedDestination] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const limit = 6;

    const fetchPackages = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/api/packages", {
                params: {
                    destination: debouncedDestination || undefined,
                    sort: sort || undefined,
                    page,
                    limit,
                },
            });

            setPackages(response.data.data || []);
            setPagination(response.data.pagination || null);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong while fetching packages"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, [debouncedDestination, sort, page]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedDestination(destination);
            setPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [destination]);

    const handleSearchChange = (e) => {
        setDestination(e.target.value);
        // setPage(1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };

    const handleClearFilters = () => {
        setDestination("");
        setDebouncedDestination("");
        setSort("");
        setPage(1);
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-sm">
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        Explore Travel Packages
                    </h1>
                    <p className="mt-3 max-w-2xl text-blue-50">
                        Search destinations, sort by price, and book your perfect travel
                        package.
                    </p>
                </div>

                <div className="mb-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                    <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Search by destination
                            </label>
                            <input
                                type="text"
                                value={destination}
                                onChange={handleSearchChange}
                                placeholder="Example: kashmir"
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Sort by price
                            </label>
                            <select
                                value={sort}
                                onChange={handleSortChange}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:w-auto"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
                        <p className="font-semibold text-slate-700">Loading packages...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-red-700">
                        <p className="font-semibold">Error</p>
                        <p className="mt-1 text-sm">{error}</p>
                    </div>
                )}

                {!loading && !error && packages.length === 0 && (
                    <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
                        <h3 className="text-xl font-bold text-slate-900">
                            No packages found
                        </h3>
                        <p className="mt-2 text-slate-600">
                            Try another destination or clear filters.
                        </p>
                    </div>
                )}

                {!loading && !error && packages.length > 0 && (
                    <>
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-600">
                                Showing {packages.length} package
                                {packages.length > 1 ? "s" : ""}
                            </p>

                            {pagination && (
                                <p className="text-sm font-medium text-slate-600">
                                    Total: {pagination.totalPackages}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {packages.map((item) => (
                                <PackageCard key={item._id} item={item} />
                            ))}
                        </div>

                        <Pagination
                            pagination={pagination}
                            onPageChange={(newPage) => setPage(newPage)}
                        />
                    </>
                )}
            </section>
        </main>
    );
}

export default PackageList;