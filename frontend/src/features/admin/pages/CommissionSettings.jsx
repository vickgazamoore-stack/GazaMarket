const CommissionSettings = () => {
	const categoryOverrides = [
		{ id: 1, category: "Laptops", rate: 8 },
		{ id: 2, category: "Phones", rate: 9 },
		{ id: 3, category: "Accessories", rate: 10 },
	];

	const sellerOverrides = [
		{ id: 1, seller: "Nnamdi Tech Market", rate: 7 },
		{ id: 2, seller: "Adaeze Electronics", rate: 9 },
	];

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Commission Settings
				</h1>
				<button
					className="text-white px-4 py-2 rounded-md"
					style={{ backgroundColor: "var(--accent-secondary)" }}
					onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
					onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
				>
					Save Changes
				</button>
			</div>

			<div className="bg-white shadow rounded-lg p-6 space-y-4">
				<h2 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
					Global Commission Rate
				</h2>
				<div className="flex items-center gap-4">
					<input
						type="number"
						defaultValue={10}
						className="px-3 py-2 border rounded-md"
						style={{ borderColor: "var(--border)" }}
					/>
					<span className="text-sm text-gray-600">%</span>
				</div>
			</div>

			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-lg font-medium mb-4" style={{ color: "var(--accent)" }}>
					Category Overrides
				</h2>
				<div className="space-y-3">
					{categoryOverrides.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between border rounded-md p-3"
							style={{ borderColor: "var(--border)" }}
						>
							<span className="text-sm text-gray-700">{item.category}</span>
							<div className="flex items-center gap-2">
								<input
									type="number"
									defaultValue={item.rate}
									className="px-2 py-1 border rounded-md w-20"
									style={{ borderColor: "var(--border)" }}
								/>
								<span className="text-sm text-gray-600">%</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-lg font-medium mb-4" style={{ color: "var(--accent)" }}>
					Seller Overrides
				</h2>
				<div className="space-y-3">
					{sellerOverrides.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between border rounded-md p-3"
							style={{ borderColor: "var(--border)" }}
						>
							<span className="text-sm text-gray-700">{item.seller}</span>
							<div className="flex items-center gap-2">
								<input
									type="number"
									defaultValue={item.rate}
									className="px-2 py-1 border rounded-md w-20"
									style={{ borderColor: "var(--border)" }}
								/>
								<span className="text-sm text-gray-600">%</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommissionSettings;
