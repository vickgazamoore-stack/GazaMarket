import { useState, useEffect } from "react";
import {
	BarChart3,
	DollarSign,
	Package,
	TrendingUp,
	Edit3,
	MoreHorizontal,
} from "lucide-react";
import Footer from "../../../components/layout/Footer";

export default function SellerDashboard() {
	const [stats, setStats] = useState({
		totalSales: 0,
		totalOrders: 0,
		pendingOrders: 0,
		balance: 0,
	});

	const [recentOrders, setRecentOrders] = useState([]);

	useEffect(() => {
		setStats({
			totalSales: 12456.78,
			totalOrders: 245,
			pendingOrders: 8,
			balance: 3456.89,
		});

		setRecentOrders([
			{
				id: 1,
				orderNumber: "ORD-12451",
				customer: "Ahmed Hassan",
				date: "2025-01-22",
				status: "Shipped",
				amount: 289.99,
				items: 3,
			},
			{
				id: 2,
				orderNumber: "ORD-12450",
				customer: "Fatima Al-Rashid",
				date: "2025-01-22",
				status: "Processing",
				amount: 156.5,
				items: 2,
			},
			{
				id: 3,
				orderNumber: "ORD-12449",
				customer: "Mohammed Ibrahim",
				date: "2025-01-21",
				status: "Delivered",
				amount: 425.0,
				items: 5,
			},
			{
				id: 4,
				orderNumber: "ORD-12448",
				customer: "Layla Ahmed",
				date: "2025-01-21",
				status: "Pending",
				amount: 89.99,
				items: 1,
			},
		]);
	}, []);

	const getStatusColor = (status) => {
		switch (status) {
			case "Delivered":
				return "bg-green-900 text-green-300";
			case "Shipped":
				return "bg-blue-900 text-blue-300";
			case "Processing":
				return "bg-yellow-900 text-yellow-300";
			case "Pending":
				return "bg-orange-900 text-orange-300";
			default:
				return "bg-gray-700 text-gray-300";
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col">
			<div className="flex-grow p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex justify-between items-center mb-8">
						<div>
							<h1 className="text-4xl font-bold">Welcome Back!</h1>
							<p className="text-gray-400 mt-2">
								Here's what's happening with your store today
							</p>
						</div>
						<button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition">
							<Edit3 className="w-4 h-4" />
							Add Product
						</button>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-4 gap-6 mb-8">
						<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-blue-600 transition">
							<div className="flex justify-between items-start mb-4">
								<div>
									<p className="text-gray-400 text-sm">Total Sales</p>
									<p className="text-3xl font-bold mt-2">
										${stats.totalSales.toFixed(2)}
									</p>
								</div>
								<DollarSign className="w-8 h-8 text-green-500" />
							</div>
							<p className="text-green-400 text-sm">+12% from last month</p>
						</div>

						<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-blue-600 transition">
							<div className="flex justify-between items-start mb-4">
								<div>
									<p className="text-gray-400 text-sm">Total Orders</p>
									<p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
								</div>
								<Package className="w-8 h-8 text-blue-500" />
							</div>
							<p className="text-blue-400 text-sm">+24 this week</p>
						</div>

						<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-blue-600 transition">
							<div className="flex justify-between items-start mb-4">
								<div>
									<p className="text-gray-400 text-sm">Pending Orders</p>
									<p className="text-3xl font-bold mt-2">
										{stats.pendingOrders}
									</p>
								</div>
								<TrendingUp className="w-8 h-8 text-yellow-500" />
							</div>
							<p className="text-yellow-400 text-sm">Action required</p>
						</div>

						<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-blue-600 transition">
							<div className="flex justify-between items-start mb-4">
								<div>
									<p className="text-gray-400 text-sm">Available Balance</p>
									<p className="text-3xl font-bold mt-2">
										${stats.balance.toFixed(2)}
									</p>
								</div>
								<BarChart3 className="w-8 h-8 text-purple-500" />
							</div>
							<p className="text-purple-400 text-sm">Next payout: Jan 25</p>
						</div>
					</div>

					{/* Recent Orders Table */}
					<div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
						<div className="p-6 border-b border-zinc-800">
							<h2 className="text-2xl font-bold">Recent Orders</h2>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-800">
									<tr>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Order
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Customer
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Date
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Items
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Amount
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Status
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Action
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-zinc-800">
									{recentOrders.map((order) => (
										<tr
											key={order.id}
											className="hover:bg-gray-800/50 transition"
										>
											<td className="px-6 py-4">
												<p className="font-semibold">{order.orderNumber}</p>
											</td>
											<td className="px-6 py-4">
												<p className="text-gray-300">{order.customer}</p>
											</td>
											<td className="px-6 py-4">
												<p className="text-gray-400 text-sm">{order.date}</p>
											</td>
											<td className="px-6 py-4">
												<p className="text-gray-300">{order.items} items</p>
											</td>
											<td className="px-6 py-4">
												<p className="font-semibold">
													${order.amount.toFixed(2)}
												</p>
											</td>
											<td className="px-6 py-4">
												<span
													className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
												>
													{order.status}
												</span>
											</td>
											<td className="px-6 py-4">
												<button className="text-gray-400 hover:text-white transition">
													<MoreHorizontal className="w-4 h-4" />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
