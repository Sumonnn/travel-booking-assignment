import { Link } from "react-router-dom";

function PackageCard({ item }) {
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="h-52 w-full overflow-hidden bg-slate-100">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                        <p className="mt-1 text-sm capitalize text-slate-500">
                            {item.destination}
                        </p>
                    </div>

                    <p className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                        ₹{item.price}
                    </p>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                    <p>
                        <span className="font-semibold text-slate-800">Duration:</span>{" "}
                        {item.duration}
                    </p>

                    <p>
                        <span className="font-semibold text-slate-800">Seats:</span>{" "}
                        {item.availableSeats}
                    </p>

                    <p>
                        <span className="font-semibold text-slate-800">Start Date:</span>{" "}
                        {new Date(item.startDate).toLocaleDateString()}
                    </p>
                </div>

                <Link
                    to={`/packages/${item._id}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default PackageCard;