import { useState } from "react";
import {
	DollarSign,
	CreditCard,
	TrendingUp,
	Calendar,
	ArrowUpRight,
	Clock,
} from "lucide-react";
import Footer from "../../../components/layout/Footer";

const PayoutDashboard = () => {
	const [showPayoutForm, setShowPayoutForm] = useState(false);

	const balance = {
		available: 3456.78,
		pending: 892.45,
		total: 4349.23,
		nextPayout: "2024-02-05",
	};

	const payoutHistory = [
		{
			id: 1,
			date: "2024-01-20",
			amount: "$2,500.00",
			status: "completed",
			method: "Bank Transfer",
			transId: "TXN001234",
		},
		{
			id: 2,
			date: "2024-01-06",
			amount: "$1,850.50",
			status: "completed",
			method: "Bank Transfer",
			transId: "TXN001233",
		},
		{
			id: 3,
			date: "2023-12-20",
			amount: "$3,200.75",
			status: "completed",
			method: "Bank Transfer",
			transId: "TXN001232",
		},
		{
			id: 4,
			date: "2023-12-06",
			amount: "$2,145.30",
			status: "completed",
			method: "Bank Transfer",
			transId: "TXN001231",
		},
		{
			id: 5,
			date: "2023-11-20",
			amount: "$1,678.90",
			status: "completed",
			method: "Bank Transfer",
			transId: "TXN001230",
		},
	];

	return (
		<div className="bg-gray-900 min-h-screen text-white">
			<div className="p-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-2">Payouts</h1>
					<p className="text-gray-400">Manage your earnings and withdrawals</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 border border-blue-700">
						<div className="flex justify-between items-start mb-4">
							<p className="text-blue-100 text-sm font-semibold">
								Available Balance
							</p>
							<DollarSign className="w-6 h-6 text-blue-200" />
						</div>
						<p className="text-4xl font-bold">
							${balance.available.toFixed(2)}
						</p>
						<p className="text-blue-100 text-sm mt-3">Ready to withdraw</p>
					</div>

					<div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 border border-purple-700">
						<div className="flex justify-between items-start mb-4">
							<p className="text-purple-100 text-sm font-semibold">
								Pending Amount
							</p>
							<Clock className="w-6 h-6 text-purple-200" />
						</div>
						<p className="text-4xl font-bold">${balance.pending.toFixed(2)}</p>
						<p className="text-purple-100 text-sm mt-3">Held in processing</p>
					</div>

					<div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 border border-green-700">
						<div className="flex justify-between items-start mb-4">
							<p className="text-green-100 text-sm font-semibold">
								Total Earnings
							</p>
							<TrendingUp className="w-6 h-6 text-green-200" />
						</div>
						<p className="text-4xl font-bold">${balance.total.toFixed(2)}</p>
						<p className="text-green-100 text-sm mt-3">All time earnings</p>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
					<div className="lg:col-span-1 bg-zinc-900 rounded-lg border border-zinc-800 p-6">
						<h2 className="text-xl font-bold mb-4">Payout Information</h2>
						<div className="space-y-4 text-sm">
							<div className="pb-4 border-b border-zinc-800">
								<p className="text-gray-400 mb-1">Account Holder</p>
								<p className="font-semibold">Ahmed's Electronics</p>
							</div>
							<div className="pb-4 border-b border-zinc-800">
								<p className="text-gray-400 mb-1">Bank</p>
								<p className="font-semibold">Al-Baraka Bank</p>
							</div>
							<div className="pb-4 border-b border-zinc-800">
								<p className="text-gray-400 mb-1">Account Number</p>
								<p className="font-mono">------7890</p>
							</div>
							<div>
								<p className="text-gray-400 mb-1">Next Payout Date</p>
								<p className="font-semibold">{balance.nextPayout}</p>
							</div>
						</div>
						<button
							onClick={() => setShowPayoutForm(true)}
							className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
						>
							Request Payout
						</button>
					</div>

					<div className="lg:col-span-2 bg-zinc-900 rounded-lg border border-zinc-800 p-6">
						<h2 className="text-xl font-bold mb-6">Payout History</h2>
						<div className="space-y-3">
							{payoutHistory.map((payout) => (
								<div
									key={payout.id}
									className="flex justify-between items-center p-4 bg-gray-800 rounded-lg border border-zinc-800 hover:border-zinc-700 transition"
								>
									<div className="flex items-center gap-4">
										<div className="p-3 bg-blue-900 rounded-lg">
											<CreditCard className="w-5 h-5 text-blue-400" />
										</div>
										<div>
											<p className="font-semibold">{payout.method}</p>
											<p className="text-sm text-gray-400">
												{payout.date} - {payout.transId}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-lg font-bold text-green-400">
											{payout.amount}
										</p>
										<span className="text-xs bg-green-900 text-green-200 px-2 py-1 rounded-full">
											{payout.status}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{showPayoutForm && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
						<div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 w-full max-w-md">
							<h3 className="text-2xl font-bold mb-6">Request Payout</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Amount to Withdraw
									</label>
									<input
										type="number"
										placeholder="Enter amount"
										className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								<div className="text-sm text-gray-400">
									<p>Available: ${balance.available.toFixed(2)}</p>
								</div>
								<div className="flex gap-3 pt-4">
									<button
										onClick={() => setShowPayoutForm(false)}
										className="flex-1 px-4 py-2 border border-gray-700 hover:bg-gray-800 rounded-lg font-semibold transition"
									>
										Cancel
									</button>
									<button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
										Request Payout
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default PayoutDashboard;

