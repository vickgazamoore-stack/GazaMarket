const ReportsLogs = () => {
	const reports = [
		{ id: 1, name: "Monthly Revenue Report", date: "Jan 2026" },
		{ id: 2, name: "Commission Summary", date: "Jan 2026" },
	];

	const feeSummary = {
		totalGMV: 184520.35,
		totalCommission: 14230.15,
		avgRate: "7.7%",
		listingFees: 320.0,
		paymentFees: 1240.5,
	};

	const feeBreakdown = [
		{ id: 1, category: "Laptops", gmv: 84520.25, rate: "8%", fees: 6761.62 },
		{ id: 2, category: "Phones", gmv: 72410.75, rate: "9%", fees: 6516.97 },
		{ id: 3, category: "Accessories", gmv: 17589.35, rate: "10%", fees: 1758.94 },
	];

	const logs = [
		{ id: 1, event: "Seller approved: Nnamdi Tech Market", time: "2 hours ago" },
		{ id: 2, event: "Dispute resolved: DSP-003", time: "Yesterday" },
	];

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Reports & Logs
				</h1>
				<button
					className="text-white px-4 py-2 rounded-md"
					style={{ backgroundColor: "var(--accent-secondary)" }}
					onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
					onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
				>
					Generate Report
				</button>
			</div>

			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-lg font-medium mb-4" style={{ color: "var(--accent)" }}>
					Reports
				</h2>
				<div className="space-y-3">
					{reports.map((report) => (
						<div
							key={report.id}
							className="border rounded-md p-3 flex items-center justify-between"
							style={{ borderColor: "var(--border)" }}
						>
							<div>
								<p className="text-sm font-medium text-gray-900">{report.name}</p>
								<p className="text-xs text-gray-500">{report.date}</p>
							</div>
							<button
								className="text-sm font-semibold"
								style={{ color: "var(--accent)" }}
							>
								Download
							</button>
						</div>
					))}
				</div>
			</div>

			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-lg font-medium mb-4" style={{ color: "var(--accent)" }}>
					Fee Reporting
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
					<div className="border rounded-md p-3" style={{ borderColor: "var(--border)" }}>
						<p className="text-xs" style={{ color: "var(--muted)" }}>Total GMV</p>
						<p className="text-lg font-semibold">${feeSummary.totalGMV.toFixed(2)}</p>
					</div>
					<div className="border rounded-md p-3" style={{ borderColor: "var(--border)" }}>
						<p className="text-xs" style={{ color: "var(--muted)" }}>Commission</p>
						<p className="text-lg font-semibold">${feeSummary.totalCommission.toFixed(2)}</p>
					</div>
					<div className="border rounded-md p-3" style={{ borderColor: "var(--border)" }}>
						<p className="text-xs" style={{ color: "var(--muted)" }}>Avg Rate</p>
						<p className="text-lg font-semibold">{feeSummary.avgRate}</p>
					</div>
					<div className="border rounded-md p-3" style={{ borderColor: "var(--border)" }}>
						<p className="text-xs" style={{ color: "var(--muted)" }}>Listing Fees</p>
						<p className="text-lg font-semibold">${feeSummary.listingFees.toFixed(2)}</p>
					</div>
					<div className="border rounded-md p-3" style={{ borderColor: "var(--border)" }}>
						<p className="text-xs" style={{ color: "var(--muted)" }}>Payment Fees</p>
						<p className="text-lg font-semibold">${feeSummary.paymentFees.toFixed(2)}</p>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-4 py-2 text-left text-xs font-medium" style={{ color: "var(--muted)" }}>
									Category
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium" style={{ color: "var(--muted)" }}>
									GMV
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium" style={{ color: "var(--muted)" }}>
									Rate
								</th>
								<th className="px-4 py-2 text-left text-xs font-medium" style={{ color: "var(--muted)" }}>
									Fees
								</th>
							</tr>
						</thead>
						<tbody>
							{feeBreakdown.map((row) => (
								<tr key={row.id} className="border-b" style={{ borderColor: "var(--border)" }}>
									<td className="px-4 py-2">{row.category}</td>
									<td className="px-4 py-2">${row.gmv.toFixed(2)}</td>
									<td className="px-4 py-2">{row.rate}</td>
									<td className="px-4 py-2">${row.fees.toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-lg font-medium mb-4" style={{ color: "var(--accent)" }}>
					System Logs
				</h2>
				<div className="space-y-3">
					{logs.map((log) => (
						<div
							key={log.id}
							className="border rounded-md p-3"
							style={{ borderColor: "var(--border)" }}
						>
							<p className="text-sm text-gray-900">{log.event}</p>
							<p className="text-xs text-gray-500">{log.time}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ReportsLogs;
