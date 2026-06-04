function Pagination({ pagination, onPageChange }) {
    if (!pagination || pagination.totalPages <= 1) {
        return null;
    }

    const { currentPage, totalPages, hasPrevPage, hasNextPage } = pagination;

    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
                type="button"
                disabled={!hasPrevPage}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                Page {currentPage} of {totalPages}
            </span>

            <button
                type="button"
                disabled={!hasNextPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;