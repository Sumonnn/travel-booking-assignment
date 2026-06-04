import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AdminAddPackage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        destination: "",
        price: "",
        duration: "",
        availableSeats: "",
        startDate: "",
        image: "",
    });

    const [errors, setErrors] = useState({});
    const [submitLoading, setSubmitLoading] = useState(false);
    const [message, setMessage] = useState("");

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Package title is required";
        }

        if (!formData.destination.trim()) {
            newErrors.destination = "Destination is required";
        }

        if (!formData.price) {
            newErrors.price = "Price is required";
        } else if (Number(formData.price) < 0) {
            newErrors.price = "Price cannot be negative";
        }

        if (!formData.duration.trim()) {
            newErrors.duration = "Duration is required";
        }

        if (!formData.availableSeats) {
            newErrors.availableSeats = "Available seats is required";
        } else if (Number(formData.availableSeats) < 0) {
            newErrors.availableSeats = "Available seats cannot be negative";
        }

        if (!formData.startDate) {
            newErrors.startDate = "Start date is required";
        }

        if (!formData.image.trim()) {
            newErrors.image = "Image URL is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setSubmitLoading(true);
            setMessage("");

            await api.post("/api/packages", {
                title: formData.title,
                destination: formData.destination,
                price: Number(formData.price),
                duration: formData.duration,
                availableSeats: Number(formData.availableSeats),
                startDate: formData.startDate,
                image: formData.image,
            });

            setMessage("Package added successfully");

            setFormData({
                title: "",
                destination: "",
                price: "",
                duration: "",
                availableSeats: "",
                startDate: "",
                image: "",
            });

            setTimeout(() => {
                navigate("/");
            }, 800);
        } catch (err) {
            setMessage(
                err.response?.data?.message ||
                "Something went wrong while adding package"
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-sm">
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        Add Travel Package
                    </h1>
                    <p className="mt-3 text-blue-50">
                        Create a new package for customers to view and book.
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                    {message && (
                        <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Package Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Kashmir Paradise Tour"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Destination
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    placeholder="kashmir"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                                {errors.destination && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.destination}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="45000"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="5 Days / 4 Nights"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                                {errors.duration && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.duration}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Available Seats
                                </label>
                                <input
                                    type="number"
                                    name="availableSeats"
                                    min="0"
                                    value={formData.availableSeats}
                                    onChange={handleChange}
                                    placeholder="20"
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                                {errors.availableSeats && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.availableSeats}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                                {errors.startDate && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.startDate}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                            )}
                        </div>

                        {formData.image && (
                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                                <img
                                    src={formData.image}
                                    alt="Package preview"
                                    className="h-64 w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            </div>
                        )}

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {submitLoading ? "Adding..." : "Add Package"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default AdminAddPackage;