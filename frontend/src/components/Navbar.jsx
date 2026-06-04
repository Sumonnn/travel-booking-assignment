import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    TravelGo
                </Link>

                <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
                    <Link to="/" className="transition hover:text-blue-600">
                        Packages
                    </Link>

                    <Link
                        to="/admin/packages/add"
                        className="rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                        Add Package
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;