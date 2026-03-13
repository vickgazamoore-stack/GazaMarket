const PromotionsCoupons = () => {
	const coupons = [
		{ id: "SAVE10", discount: "10%", status: "Active", usage: "54/200" },
		{ id: "WELCOME5", discount: "$5", status: "Paused", usage: "12/100" },
	];

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
				<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
					Promotions & Coupons
				</h1>
				<div className="border rounded-xl p-6 space-y-4" style={{ borderColor: "var(--border)" }}>
					<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
						Create Coupon
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<input
							type="text"
							placeholder="Code"
							className="px-3 py-2 rounded-lg border"
							style={{ borderColor: "var(--border)" }}
						/>
						<input
							type="text"
							placeholder="Discount"
							className="px-3 py-2 rounded-lg border"
							style={{ borderColor: "var(--border)" }}
						/>
						<button
							className="px-4 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Create
						</button>
					</div>
				</div>

				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
						Active Coupons
					</h2>
					<div className="mt-4 space-y-3">
						{coupons.map((coupon) => (
							<div
								key={coupon.id}
								className="border rounded-lg p-4 flex items-center justify-between"
								style={{ borderColor: "var(--border)" }}
							>
								<div>
									<p className="font-semibold" style={{ color: "var(--accent)" }}>
										{coupon.id}
									</p>
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										{coupon.discount} off - Usage {coupon.usage}
									</p>
								</div>
								<span
									className="text-xs font-semibold px-3 py-1 rounded-full"
									style={{
										backgroundColor:
											coupon.status === "Active" ? "var(--accent-tint)" : "var(--border)",
										color: coupon.status === "Active" ? "var(--accent)" : "var(--text)",
									}}
								>
									{coupon.status}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PromotionsCoupons;

