import { useState } from "react";
import {
	Package,
	Truck,
	CheckCircle,
	MessageSquare,
	MoreVertical,
	AlertCircle,
} from "lucide-react";
import Footer from "../../../components/layout/Footer";

const SellerOrders = () => {
	const [statusFilter, setStatusFilter] = useState("all");

	const orders = [
		{
			id: 1,
			orderNum: "#ORD-2451",
			customer: "Ahmed Hassan",
			date: "2024-01-23",
			status: "processing",
			amount: "$89.99",
			items: 2,
			tracking: null,
		},
		{
			id: 2,
			orderNum: "#ORD-2450",
			customer: "Fatima Ali",
			date: "2024-01-22",
			status: "shipped",
			amount: "$145.50",
			items: 3,
			tracking: "TRK1234567890",
		},
		{
			id: 3,
			orderNum: "#ORD-2449",
			customer: "Mohamed Ibrahim",
			date: "2024-01-21",
			status: "delivered",
			amount: "$67.80",
			items: 1,
			tracking: "TRK0987654321",
		},
		{
			id: 4,
			orderNum: "#ORD-2448",
			customer: "Sara Khan",
			date: "2024-01-20",
			status: "processing",
			amount: "$234.99",
			items: 4,
			tracking: null,
		},
		{
			id: 5,
			orderNum: "#ORD-2447",
			customer: "Hassan Al-Rashid",
			date: "2024-01-19",
			status: "shipped",
			amount: "$56.40",
			items: 2,
			tracking: "TRK1122334455",
		},
	];

	const getStatusColor = (status) => {
		switch (status) {
			case "processing":
				return "bg-yellow-900 text-yellow-200 border-yellow-700";
			case "shipped":
				return "bg-blue-900 text-blue-200 border-blue-700";
			case "delivered":
				return "bg-green-900 text-green-200 border-green-700";
			case "cancelled":
				return "bg-red-900 text-red-200 border-red-700";
			default:
				return "bg-gray-700 text-gray-200";
		}
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case "processing":
				return <Package className="w-4 h-4" />;
			case "shipped":
				return <Truck className="w-4 h-4" />;
			case "delivered":
				return <CheckCircle className="w-4 h-4" />;
			default:
				return <AlertCircle className="w-4 h-4" />;
		}
	};

	const filteredOrders =
		statusFilter === "all"
			? orders
			: orders.filter((o) => o.status === statusFilter);

	return (
		<div className="bg-gray-900 min-h-screen text-white">
			<div className="p-8">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-4xl font-bold mb-2">Orders</h1>
						<p className="text-gray-400">Manage your customer orders</p>
					</div>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="all">All Orders</option>
						<option value="processing">Processing</option>
						<option value="shipped">Shipped</option>
						<option value="delivered">Delivered</option>
					</select>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
						<p className="text-gray-400 text-sm mb-2">Total Orders</p>
						<p className="text-3xl font-bold">{orders.length}</p>
					</div>
					<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
						<p className="text-gray-400 text-sm mb-2">Processing</p>
						<p className="text-3xl font-bold text-yellow-400">
							{orders.filter((o) => o.status === "processing").length}
						</p>
					</div>
					<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
						<p className="text-gray-400 text-sm mb-2">Shipped</p>
						<p className="text-3xl font-bold text-blue-400">
							{orders.filter((o) => o.status === "shipped").length}
						</p>
					</div>
					<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
						<p className="text-gray-400 text-sm mb-2">Delivered</p>
						<p className="text-3xl font-bold text-green-400">
							{orders.filter((o) => o.status === "delivered").length}
						</p>
					</div>
				</div>

				<div className="space-y-4">
					{filteredOrders.map((order) => (
						<div
							key={order.id}
							className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition"
						>
							<div className="flex justify-between items-start mb-4">
								<div className="flex-1">
									<div className="flex items-center gap-3">
										<h3 className="text-lg font-bold">{order.orderNum}</h3>
										<span
											className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}
										>
											{getStatusIcon(order.status)} {order.status}
										</span>
									</div>
									<p className="text-gray-400 text-sm mt-1">
										{order.customer} - {order.date}
									</p>
								</div>
								<div className="text-right">
									<p className="text-2xl font-bold">{order.amount}</p>
									<p className="text-gray-400 text-sm">{order.items} items</p>
								</div>
								<button className="ml-4 text-gray-400 hover:text-white">
									<MoreVertical className="w-5 h-5" />
								</button>
							</div>

							{order.tracking && (
								<div className="bg-gray-800 rounded p-3 mb-4 text-sm">
									<p className="text-gray-400">
										Tracking:{" "}
										<span className="text-gray-200 font-mono">
											{order.tracking}
										</span>
									</p>
								</div>
							)}

							<div className="flex gap-2">
								{order.status === "processing" && (
									<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition">
										Mark Shipped
									</button>
								)}
								{order.status === "shipped" && !order.tracking && (
									<button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition">
										Add Tracking
									</button>
								)}
								<button className="px-4 py-2 border border-gray-700 hover:bg-gray-800 rounded-lg text-sm font-semibold flex items-center gap-2 transition">
									<MessageSquare className="w-4 h-4" /> Message
								</button>
								<button className="px-4 py-2 border border-gray-700 hover:bg-gray-800 rounded-lg text-sm font-semibold transition">
									View Details
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SellerOrders;

