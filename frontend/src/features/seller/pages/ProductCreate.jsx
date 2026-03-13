const ProductCreate = ({ embedded = false }) => {
	const wrapperClass = embedded ? "space-y-6" : "min-h-screen";
	const wrapperStyle = embedded ? {} : { backgroundColor: "var(--surface)" };
	const containerClass = embedded
		? "space-y-6"
		: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6";

	return (
		<div className={wrapperClass} style={wrapperStyle}>
			<div className={containerClass}>
				<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
					Create Product
				</h1>
				<div className="border rounded-xl p-6 space-y-4" style={{ borderColor: "var(--border)" }}>
					<div>
						<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
							Product Name
						</label>
						<input
							type="text"
							className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
							style={{ borderColor: "var(--border)", color: "var(--text)" }}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
								Price
							</label>
							<input
								type="number"
								className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
								style={{ borderColor: "var(--border)", color: "var(--text)" }}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
								Inventory
							</label>
							<input
								type="number"
								className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
								style={{ borderColor: "var(--border)", color: "var(--text)" }}
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
							Product Description
						</label>
						<textarea
							rows={4}
							className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
							style={{ borderColor: "var(--border)", color: "var(--text)" }}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
							Product Images
						</label>
						<input
							type="file"
							multiple
							className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
							style={{ borderColor: "var(--border)", color: "var(--text)" }}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
							Variants
						</label>
						<div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
							<input
								type="text"
								placeholder="Variant name (e.g. Color)"
								className="px-3 py-2 rounded-lg border"
								style={{ borderColor: "var(--border)" }}
							/>
							<input
								type="text"
								placeholder="Options (e.g. Black, Silver)"
								className="px-3 py-2 rounded-lg border"
								style={{ borderColor: "var(--border)" }}
							/>
						</div>
					</div>
					<div className="flex justify-end">
						<button
							className="px-6 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Save Product
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCreate;
