const BulkUpload = () => {
	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
				<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
					Bulk Upload Products
				</h1>
				<div className="border rounded-xl p-6 space-y-4" style={{ borderColor: "var(--border)" }}>
					<p className="text-sm" style={{ color: "var(--muted)" }}>
						Upload a CSV file to create or update products in bulk. Download the
						template to ensure correct formatting.
					</p>
					<div className="flex flex-col md:flex-row gap-3">
						<button
							className="px-4 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent)" }}
						>
							Download Template
						</button>
						<input
							type="file"
							accept=".csv"
							className="px-3 py-2 rounded-lg border"
							style={{ borderColor: "var(--border)" }}
						/>
						<button
							className="px-4 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Upload CSV
						</button>
					</div>
				</div>
				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
						Recent Uploads
					</h2>
					<p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
						No uploads yet.
					</p>
				</div>
			</div>
		</div>
	);
};

export default BulkUpload;
