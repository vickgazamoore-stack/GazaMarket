import { useState, useEffect } from "react";
import {
	MessageSquare,
	MoreHorizontal,
	Package,
	Truck,
	CheckCircle,
	Clock,
} from "lucide-react";
import Footer from "../../../components/layout/Footer";

export default function SellerOrders() {
	const [orders, setOrders] = useState([]);
	const [activeTab, setActiveTab] = useState("all");

	useEffect(() => {
		setOrders([
			{
				id: 1,
				orderNumber: "ORD-12451",
				customer: "Ahmed Hassan",
				customerEmail: "ahmed@example.com",
				date: "2025-01-22",
				status: "shipped",
				total: 289.99,
				items: [
					{ name: 'MacBook Pro 16"', qty: 1, price: 1299.0 },
					{ name: "iPhone 15 Pro", qty: 1, price: 999.0 },
				],
				trackingNumber: "TRK123456789",
			},
			{
				id: 2,
				orderNumber: "ORD-12450",
				customer: "Fatima Al-Rashid",
				customerEmail: "fatima@example.com",
				date: "2025-01-22",
				status: "processing",
				total: 156.5,
				items: [{ name: "Samsung Galaxy S24", qty: 1, price: 899.0 }],
				trackingNumber: null,
			},
			{
				id: 3,
				orderNumber: "ORD-12449",
				customer: "Mohammed Ibrahim",
				customerEmail: "mohammed@example.com",
				date: "2025-01-21",
				status: "delivered",
				total: 425.0,
				items: [
					{ name: "Dell XPS 13", qty: 1, price: 1049.0 },
					{ name: 'MacBook Pro 16"', qty: 1, price: 1299.0 },
					{ name: "USB-C Cable", qty: 3, price: 36.97 },
				],
				trackingNumber: "TRK987654321",
			},
			{
				id: 4,
				orderNumber: "ORD-12448",
				customer: "Layla Ahmed",
				customerEmail: "layla@example.com",
				date: "2025-01-21",
				status: "pending",
				total: 89.99,
				items: [{ name: "Screen Protector", qty: 1, price: 12.99 }],
				trackingNumber: null,
			},
			{
				id: 5,
				orderNumber: "ORD-12447",
				customer: "Samir Khalil",
				customerEmail: "samir@example.com",
				date: "2025-01-20",
				status: "delivered",
				total: 199.97,
				items: [{ name: "iPhone 14", qty: 2, price: 1358.0 }],
				trackingNumber: "TRK555666777",
			},
		]);
	}, []);

	const getTabs = () => {
		const tabs = {
			all: orders,
			pending: orders.filter((o) => o.status === "pending"),
			processing: orders.filter((o) => o.status === "processing"),
			shipped: orders.filter((o) => o.status === "shipped"),
			delivered: orders.filter((o) => o.status === "delivered"),
		};
		return tabs;
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case "pending":
				return <Clock className="w-5 h-5 text-orange-400" />;
			case "processing":
				return <Package className="w-5 h-5 text-blue-400" />;
			case "shipped":
				return <Truck className="w-5 h-5 text-yellow-400" />;
			case "delivered":
				return <CheckCircle className="w-5 h-5 text-green-400" />;
			default:
				return null;
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "pending":
				return "bg-orange-900 text-orange-300";
			case "processing":
				return "bg-blue-900 text-blue-300";
			case "shipped":
				return "bg-yellow-900 text-yellow-300";
			case "delivered":
				return "bg-green-900 text-green-300";
			default:
				return "bg-gray-700 text-gray-300";
		}
	};

	const handleStatusChange = (orderId, newStatus) => {
		setOrders(
			orders.map((order) =>
				order.id === orderId - { ...order, status: newStatus } : order,
			),
		);
	};

	const currentOrders = getTabs()[activeTab];

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col">
			<div className="flex-grow p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-4xl font-bold">Order Management</h1>
						<p className="text-gray-400 mt-2">Track and manage your orders</p>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-5 gap-4 mb-8">
						<div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
							<p className="text-gray-400 text-sm">Total Orders</p>
							<p className="text-2xl font-bold mt-2">{orders.length}</p>
						</div>
						<div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
							<p className="text-gray-400 text-sm">Pending</p>
							<p className="text-2xl font-bold mt-2 text-orange-400">
								{orders.filter((o) => o.status === "pending").length}
							</p>
						</div>
						<div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
							<p className="text-gray-400 text-sm">Processing</p>
							<p className="text-2xl font-bold mt-2 text-blue-400">
								{orders.filter((o) => o.status === "processing").length}
							</p>
						</div>
						<div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
							<p className="text-gray-400 text-sm">Shipped</p>
							<p className="text-2xl font-bold mt-2 text-yellow-400">
								{orders.filter((o) => o.status === "shipped").length}
							</p>
						</div>
						<div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
							<p className="text-gray-400 text-sm">Delivered</p>
							<p className="text-2xl font-bold mt-2 text-green-400">
								{orders.filter((o) => o.status === "delivered").length}
							</p>
						</div>
					</div>

					{/* Tabs */}
					<div className="flex gap-2 mb-6 border-b border-zinc-800">
						{["all", "pending", "processing", "shipped", "delivered"].map(
							(tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`px-4 py-3 capitalize font-medium transition border-b-2 ${
										activeTab === tab
											- "border-blue-600 text-blue-400"
											: "border-transparent text-gray-400 hover:text-gray-300"
									}`}
								>
									{tab}
								</button>
							),
						)}
					</div>

					{/* Orders List */}
					<div className="space-y-4">
						{currentOrders.length > 0 ? (
							currentOrders.map((order) => (
								<div
									key={order.id}
									className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 hover:border-blue-600 transition"
								>
									<div className="flex justify-between items-start mb-4">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												{getStatusIcon(order.status)}
												<h3 className="text-xl font-semibold">
													#{order.orderNumber}
												</h3>
												<span
													className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
												>
													{order.status}
												</span>
											</div>
											<p className="text-gray-400 text-sm">
												{order.customer} - {order.date}
											</p>
											<p className="text-gray-500 text-xs mt-1">
												{order.customerEmail}
											</p>
										</div>
										<div className="text-right">
											<p className="text-3xl font-bold text-blue-400">
												${order.total.toFixed(2)}
											</p>
											<button className="text-gray-400 hover:text-white mt-2 transition">
												<MoreHorizontal className="w-5 h-5" />
											</button>
										</div>
									</div>

									{/* Items */}
									<div className="border-t border-zinc-700 pt-4 mb-4">
										<p className="text-sm text-gray-400 mb-2">
											Items ({order.items.length})
										</p>
										<div className="space-y-2">
											{order.items.map((item, idx) => (
												<div
													key={idx}
													className="flex justify-between text-sm text-gray-300"
												>
													<span>
														{item.name} (x{item.qty})
													</span>
													<span>${item.price.toFixed(2)}</span>
												</div>
											))}
										</div>
									</div>

									{/* Tracking */}
									{order.trackingNumber && (
										<div className="border-t border-zinc-700 pt-4 mb-4">
											<p className="text-xs text-gray-400">Tracking Number</p>
											<p className="font-mono text-sm text-blue-400">
												{order.trackingNumber}
											</p>
										</div>
									)}

									{/* Actions */}
									<div className="flex justify-between items-center pt-4 border-t border-zinc-700">
										<div className="flex gap-2">
											{order.status === "pending" && (
												<button
													onClick={() =>
														handleStatusChange(order.id, "processing")
													}
													className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition"
												>
													Start Processing
												</button>
											)}
											{order.status === "processing" && (
												<button
													onClick={() =>
														handleStatusChange(order.id, "shipped")
													}
													className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-sm transition"
												>
													Mark as Shipped
												</button>
											)}
											{order.status === "shipped" && (
												<button
													onClick={() =>
														handleStatusChange(order.id, "delivered")
													}
													className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm transition"
												>
													Mark as Delivered
												</button>
											)}
										</div>
										<button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm flex items-center gap-2 transition">
											<MessageSquare className="w-4 h-4" />
											Message Customer
										</button>
									</div>
								</div>
							))
						) : (
							<div className="bg-zinc-900 rounded-lg border border-zinc-800 p-12 text-center">
								<Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
								<p className="text-gray-400 text-lg">
									No {activeTab !== "all" - activeTab : ""} orders found
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

