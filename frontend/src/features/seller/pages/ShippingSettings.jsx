const ShippingSettings = () => {
	const zones = [
		{ id: 1, name: "Local", rate: 4.5, eta: "1-2 days" },
		{ id: 2, name: "Domestic", rate: 7.0, eta: "3-5 days" },
		{ id: 3, name: "International", rate: 15.0, eta: "7-10 days" },
	];
	const carriers = [
		{ id: 1, name: "UPS", service: "Ground", cutoff: "5:00 PM" },
		{ id: 2, name: "FedEx", service: "Home Delivery", cutoff: "6:00 PM" },
		{ id: 3, name: "USPS", service: "Priority Mail", cutoff: "4:30 PM" },
	];

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
				<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
					Shipping Settings
				</h1>
				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
							Shipping Zones
						</h2>
						<button
							className="px-4 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Add Zone
						</button>
					</div>
					<div className="space-y-3">
						{zones.map((zone) => (
							<div
								key={zone.id}
								className="border rounded-lg p-4 flex items-center justify-between"
								style={{ borderColor: "var(--border)" }}
							>
								<div>
									<p className="font-semibold" style={{ color: "var(--accent)" }}>
										{zone.name}
									</p>
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										ETA: {zone.eta}
									</p>
								</div>
								<div className="text-right">
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										Rate
									</p>
									<p className="font-semibold" style={{ color: "var(--accent)" }}>
										${zone.rate}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
						Handling Time
					</h2>
					<p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
						Set your default order processing time.
					</p>
					<select
						className="mt-3 w-full md:w-60 px-3 py-2 rounded-lg border"
						style={{ borderColor: "var(--border)" }}
					>
						<option>Same day</option>
						<option>1 business day</option>
						<option>2 business days</option>
					</select>
				</div>
				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
							Carrier Integrations
						</h2>
						<button
							className="px-4 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Add Carrier
						</button>
					</div>
					<div className="space-y-3">
						{carriers.map((carrier) => (
							<div
								key={carrier.id}
								className="border rounded-lg p-4 flex items-center justify-between"
								style={{ borderColor: "var(--border)" }}
							>
								<div>
									<p className="font-semibold" style={{ color: "var(--accent)" }}>
										{carrier.name}
									</p>
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										Service: {carrier.service}
									</p>
								</div>
								<div className="text-right">
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										Daily cutoff
									</p>
									<p className="font-semibold" style={{ color: "var(--accent)" }}>
										{carrier.cutoff}
									</p>
								</div>
							</div>
						))}
					</div>
					<p className="text-sm mt-4" style={{ color: "var(--muted)" }}>
						Connect carriers to auto-sync tracking numbers and shipping labels.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ShippingSettings;
