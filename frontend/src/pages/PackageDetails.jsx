import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import BookingForm from "../components/BookingForm";

function PackageDetails() {
    const { id } = useParams();

    const [travelPackage, setTravelPackage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPackageDetails = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(`/api/packages/${id}`);

            setTravelPackage(response.data.data);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong while fetching package details"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackageDetails();
    }, [id]);

    const handleBookingSuccess = (remainingSeats) => {
        setTravelPackage((prev) => ({
            ...prev,
            availableSeats: remainingSeats,
        }));
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50">
                <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
                        <p className="font-semibold text-slate-700">
                            Loading package details...
                        </p>
                    </div>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-slate-50">
                <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
                        <p className="font-bold">Error</p>
                        <p className="mt-1 text-sm">{error}</p>

                        <Link
                            to="/"
                            className="mt-5 inline-flex rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            Back to Packages
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    if (!travelPackage) {
        return null;
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="mb-6 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                    ← Back to packages
                </Link>

                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                        <div className="h-80 w-full overflow-hidden bg-slate-100">
                            <img
                                src={travelPackage.image}
                                alt={travelPackage.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900">
                                        {travelPackage.title}
                                    </h1>

                                    <p className="mt-2 text-base capitalize text-slate-600">
                                        {travelPackage.destination}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-blue-50 px-5 py-3 text-right">
                                    <p className="text-xs font-semibold uppercase text-blue-600">
                                        Price
                                    </p>
                                    <p className="text-2xl font-bold text-blue-700">
                                        ₹{travelPackage.price}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase text-slate-500">
                                        Duration
                                    </p>
                                    <p className="mt-1 font-bold text-slate-900">
                                        {travelPackage.duration}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase text-slate-500">
                                        Available Seats
                                    </p>
                                    <p className="mt-1 font-bold text-slate-900">
                                        {travelPackage.availableSeats}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-xs font-semibold uppercase text-slate-500">
                                        Start Date
                                    </p>
                                    <p className="mt-1 font-bold text-slate-900">
                                        {new Date(travelPackage.startDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                                <h2 className="text-lg font-bold text-slate-900">
                                    Package Overview
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Enjoy a comfortable and memorable trip to{" "}
                                    <span className="capitalize">
                                        {travelPackage.destination}
                                    </span>
                                    . This package includes a planned travel duration of{" "}
                                    {travelPackage.duration}. Book your seats before availability
                                    runs out.
                                </p>
                            </div>
                        </div>
                    </div>

                    <BookingForm
                        packageId={travelPackage._id}
                        availableSeats={travelPackage.availableSeats}
                        onBookingSuccess={handleBookingSuccess}
                    />
                </div>
            </section>
        </main>
    );
}

export default PackageDetails;