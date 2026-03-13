import React, { useState } from "react";
import { DollarSign, Calendar, Download } from "lucide-react";

const PayoutDashboard = () => {
	const [payoutData] = useState({
		availableBalance: 1234.56,
		pendingBalance: 456.78,
		totalEarned: 3456.78,
		nextPayoutDate: "2024-02-15",
	});

	const payoutBreakdown = [
		{
			id: "ORD-2451",
			date: "2024-01-23",
			sales: 320.0,
			fees: 24.0,
			net: 296.0,
		},
		{
			id: "ORD-2450",
			date: "2024-01-22",
			sales: 210.5,
			fees: 15.8,
			net: 194.7,
		},
		{
			id: "ORD-2449",
			date: "2024-01-21",
			sales: 145.75,
			fees: 10.9,
			net: 134.85,
		},
	];

	const [payoutHistory] = useState([
		{
			id: 1,
			date: "2024-01-15",
			amount: 1200.5,
			status: "completed",
			method: "Bank Transfer",
			ref: "PYT-001",
		},
		{
			id: 2,
			date: "2023-12-31",
			amount: 1100.75,
			status: "completed",
			method: "Bank Transfer",
			ref: "PYT-002",
		},
		{
			id: 3,
			date: "2023-12-15",
			amount: 1155.53,
			status: "completed",
			method: "Bank Transfer",
			ref: "PYT-003",
		},
	]);

	const getStatusColor = (status) => {
		return status === "completed"
			? "bg-green-100 text-green-800"
			: "bg-yellow-100 text-yellow-800";
	};

	const handleDownloadCsv = () => {
		const rows = [
			["Order ID", "Date", "Sales", "Fees", "Net"],
			...payoutBreakdown.map((row) => [
				row.id,
				row.date,
				row.sales.toFixed(2),
				row.fees.toFixed(2),
				row.net.toFixed(2),
			]),
		];
		const csv = rows.map((r) => r.join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "payout-breakdown.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ backgroundColor: "var(--surface)" }}
		>
			<main className="flex-1 p-8">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-between items-center mb-8">
						<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
							Payouts
						</h1>
						<button
							className="px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							<Download className="w-4 h-4" />
							Request Payout
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p
								className="text-sm mb-2 flex items-center gap-2"
								style={{ color: "var(--muted)" }}
							>
								<DollarSign className="w-4 h-4" />
								Available Balance
							</p>
							<p
								className="text-4xl font-bold mb-1"
								style={{ color: "var(--accent)" }}
							>
								${payoutData.availableBalance}
							</p>
							<p className="text-xs" style={{ color: "var(--muted)" }}>
								Ready to withdraw
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
								Pending Balance
							</p>
							<p
								className="text-4xl font-bold mb-1"
								style={{ color: "var(--accent)" }}
							>
								${payoutData.pendingBalance}
							</p>
							<p className="text-xs" style={{ color: "var(--muted)" }}>
								Processing
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p
								className="text-sm mb-2 flex items-center gap-2"
								style={{ color: "var(--muted)" }}
							>
								<Calendar className="w-4 h-4" />
								Next Payout
							</p>
							<p
								className="text-2xl font-bold mb-1"
								style={{ color: "var(--accent)" }}
							>
								{payoutData.nextPayoutDate}
							</p>
							<p className="text-xs" style={{ color: "var(--accent)" }}>
								Automatic transfer
							</p>
						</div>
					</div>

					<div
						className="p-8 rounded-lg mb-8 border"
						style={{ backgroundColor: "var(--accent-tint)", borderColor: "var(--accent)" }}
					>
						<div className="flex items-center justify-between">
							<div>
								<h3
									className="text-2xl font-bold mb-2"
									style={{ color: "var(--accent)" }}
								>
									Total Earned
								</h3>
								<p className="text-4xl font-bold" style={{ color: "var(--accent)" }}>
									${payoutData.totalEarned}
								</p>
								<p className="text-sm mt-2" style={{ color: "var(--accent)" }}>
									All-time earnings
								</p>
							</div>
							<DollarSign
								className="w-20 h-20"
								style={{ color: "var(--accent)", opacity: 0.2 }}
							/>
						</div>
					</div>

					<h2 className="text-2xl font-bold mb-4" style={{ color: "var(--accent)" }}>
						Payout History
					</h2>
					<div className="border rounded-lg p-6 mb-8" style={{ borderColor: "var(--border)" }}>
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
								Commission Breakdown
							</h3>
							<button
								className="px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2"
								style={{ backgroundColor: "var(--accent-secondary)" }}
								onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
								onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
								onClick={handleDownloadCsv}
							>
								<Download className="w-4 h-4" />
								Download CSV
							</button>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr style={{ color: "var(--muted)" }}>
										<th className="text-left py-2">Order</th>
										<th className="text-left py-2">Date</th>
										<th className="text-left py-2">Sales</th>
										<th className="text-left py-2">Fees</th>
										<th className="text-left py-2">Net</th>
									</tr>
								</thead>
								<tbody>
									{payoutBreakdown.map((row) => (
										<tr key={row.id} className="border-t" style={{ borderColor: "var(--border)" }}>
											<td className="py-2" style={{ color: "var(--ink)" }}>
												{row.id}
											</td>
											<td className="py-2" style={{ color: "var(--muted)" }}>
												{row.date}
											</td>
											<td className="py-2" style={{ color: "var(--ink)" }}>
												${row.sales.toFixed(2)}
											</td>
											<td className="py-2" style={{ color: "var(--muted)" }}>
												-${row.fees.toFixed(2)}
											</td>
											<td className="py-2" style={{ color: "var(--accent)" }}>
												${row.net.toFixed(2)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
							Fees include platform commission and payment processing.
						</p>
					</div>
					<div
						className="border rounded-lg overflow-hidden"
						style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
					>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead
									style={{
										backgroundColor: "var(--surface-strong)",
										borderBottomColor: "var(--border)",
										borderBottomWidth: "1px",
									}}
								>
									<tr>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Date
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Amount
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Method
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Reference
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Status
										</th>
									</tr>
								</thead>
								<tbody>
									{payoutHistory.map((payout) => (
										<tr
											key={payout.id}
											className="transition"
											style={{
												borderBottomColor: "var(--border)",
												borderBottomWidth: "1px",
											}}
										>
											<td className="py-4 px-6" style={{ color: "var(--ink)" }}>
												{payout.date}
											</td>
											<td
												className="py-4 px-6 font-semibold"
												style={{ color: "var(--ink)" }}
											>
												${payout.amount}
											</td>
											<td className="py-4 px-6" style={{ color: "var(--muted)" }}>
												{payout.method}
											</td>
											<td
												className="py-4 px-6 font-mono text-sm"
												style={{ color: "var(--muted)" }}
											>
												{payout.ref}
											</td>
											<td className="py-4 px-6">
												<span
													className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}
												>
													{payout.status}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default PayoutDashboard;
