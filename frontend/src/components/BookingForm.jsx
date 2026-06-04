import { useState } from "react";
import api from "../api/api";

function BookingForm({ packageId, availableSeats, onBookingSuccess }) {
    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        seats: 1,
    });

    const [errors, setErrors] = useState({});
    const [submitLoading, setSubmitLoading] = useState(false);
    const [message, setMessage] = useState("");

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = "Customer name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        const seatsNumber = Number(formData.seats);

        if (!seatsNumber || seatsNumber <= 0) {
            newErrors.seats = "Seats must be greater than 0";
        } else if (seatsNumber > availableSeats) {
            newErrors.seats = `Only ${availableSeats} seats are available`;
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

            const response = await api.post("/api/bookings", {
                customerName: formData.customerName,
                email: formData.email,
                seats: Number(formData.seats),
                packageId,
            });

            setMessage(response.data.message || "Booking successful");

            setFormData({
                customerName: "",
                email: "",
                seats: 1,
            });

            onBookingSuccess?.(response.data.data?.remainingSeats);
        } catch (err) {
            setMessage(
                err.response?.data?.message ||
                "Something went wrong while creating booking"
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Book This Package</h2>
            <p className="mt-2 text-sm text-slate-600">
                Fill your details and confirm your booking.
            </p>

            {availableSeats <= 0 && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                    This package is currently sold out.
                </div>
            )}

            {message && (
                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Customer Name
                    </label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="Enter customer name"
                        disabled={availableSeats <= 0}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                    {errors.customerName && (
                        <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        disabled={availableSeats <= 0}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Seats
                    </label>
                    <input
                        type="number"
                        name="seats"
                        min="1"
                        max={availableSeats}
                        value={formData.seats}
                        onChange={handleChange}
                        placeholder="Enter seats"
                        disabled={availableSeats <= 0}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                    {errors.seats && (
                        <p className="mt-1 text-sm text-red-600">{errors.seats}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={submitLoading || availableSeats <= 0}
                    className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitLoading ? "Booking..." : "Confirm Booking"}
                </button>
            </form>
        </div>
    );
}

export default BookingForm;