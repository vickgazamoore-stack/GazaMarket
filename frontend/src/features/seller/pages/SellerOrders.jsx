import React, { useState, useEffect } from "react";
import { ordersApi } from "../../../services/api.js";
import { Clock, Truck, CheckCircle, MessageSquare } from "lucide-react";

const SellerOrders = () => {
	const [orders, setOrders] = useState([]);
	const [filter, setFilter] = useState("all");
	const [trackingInputs, setTrackingInputs] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadOrders = async () => {
			setLoading(true);
			setError("");
			try {
				const response = await ordersApi.getMySellerOrders();
				setOrders(response.orders || []);
			} catch (loadError) {
				setError(loadError.message || "Failed to load seller orders");
			} finally {
				setLoading(false);
			}
		};

		loadOrders();
	}, []);

	const filteredOrders = orders.filter(
		(order) => filter === "all" || order.status === filter,
	);

	const getStatusIcon = (status) => {
		if (status === "processing") return <Clock className="w-5 h-5" />;
		if (status === "shipped") return <Truck className="w-5 h-5" />;
		if (status === "delivered") return <CheckCircle className="w-5 h-5" />;
		return <Clock className="w-5 h-5" />;
	};

	const getStatusColor = (status) => {
		const colors = {
			processing: "bg-yellow-100 text-yellow-800",
			shipped: "bg-blue-100 text-blue-800",
			delivered: "bg-green-100 text-green-800",
			pending: "bg-gray-100 text-gray-800",
		};
		return colors[status] || "bg-gray-100 text-gray-800";
	};

	const handleTrackingChange = (key, value) => {
		setTrackingInputs((prev) => ({ ...prev, [key]: value }));
	};

	const updateOrderStatus = async (orderNumber, sellerId, nextStatus, trackingNumber) => {
		try {
			const response = await ordersApi.updateSellerOrderStatus(orderNumber, {
				status: nextStatus,
				trackingNumber,
			});
			const updated = response.order;
			setOrders((prev) =>
				prev.map((order) =>
					order.orderNumber === orderNumber && order.sellerId === sellerId ? updated : order,
				),
			);
		} catch (updateError) {
			setError(updateError.message || "Failed to update order");
		}
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
							Orders
						</h1>
						<select
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
							className="rounded-lg px-4 py-2 border"
							style={{
								backgroundColor: "var(--surface)",
								borderColor: "var(--border)",
								color: "var(--ink)",
							}}
						>
							<option value="all">All Orders</option>
							<option value="processing">Processing</option>
							<option value="shipped">Shipped</option>
							<option value="delivered">Delivered</option>
						</select>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Total Orders
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent)" }}
							>
								{orders.length}
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Processing
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent-secondary)" }}
							>
								{orders.filter((o) => o.status === "processing").length}
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Shipped
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent)" }}
							>
								{orders.filter((o) => o.status === "shipped").length}
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Delivered
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent)" }}
							>
								{orders.filter((o) => o.status === "delivered").length}
							</p>
						</div>
					</div>

					<div className="space-y-4">
						{loading && (
							<p style={{ color: "var(--muted)" }}>Loading seller orders...</p>
						)}
						{error && (
							<p style={{ color: "var(--accent-secondary-strong)" }}>{error}</p>
						)}
						{filteredOrders.map((order) => (
							<div
								key={`${order.orderNumber}-${order.sellerId}`}
								className="border rounded-lg p-6 transition"
								style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
							>
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center gap-4 flex-1">
										<div
											className="p-3 rounded-lg"
											style={{
												backgroundColor:
													order.status === "processing"
														? "var(--accent-secondary-tint)"
														: order.status === "shipped"
															? "var(--accent-tint)"
															: "var(--accent-tint)",
											}}
										>
											{getStatusIcon(order.status)}
										</div>
										<div>
											<h3
												className="text-lg font-semibold"
												style={{ color: "var(--accent)" }}
											>
												{order.orderNumber}
											</h3>
											<p className="text-sm" style={{ color: "var(--muted)" }}>
												{order.buyer} - {new Date(order.date).toLocaleDateString()}
											</p>
											<p className="text-sm" style={{ color: "var(--muted)" }}>
												{order.product}
											</p>
										</div>
									</div>
									<div className="text-right">
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
										>
											{order.status}
										</span>
										<p
											className="text-2xl font-bold mt-2"
											style={{ color: "var(--accent)" }}
										>
											${order.total.toFixed(2)}
										</p>
									</div>
								</div>

								<div
									className="pt-4"
									style={{ borderTopColor: "var(--border)", borderTopWidth: "1px" }}
								>
									<p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
										{order.shippingAddress}
									</p>
									{order.trackingNumber && (
										<p className="text-sm mb-4" style={{ color: "var(--accent)" }}>
											Tracking: {order.trackingNumber}
										</p>
									)}
									{order.status === "processing" && (
										<div className="mb-4 flex flex-col gap-2">
											<label className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
												Tracking number
											</label>
											<input
												type="text"
												placeholder="Enter tracking number"
												value={
													trackingInputs[`${order.orderNumber}-${order.sellerId}`] || ""
												}
												onChange={(e) =>
													handleTrackingChange(
														`${order.orderNumber}-${order.sellerId}`,
														e.target.value,
													)
												}
												className="rounded-lg px-3 py-2 border"
												style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
											/>
										</div>
									)}
									<div className="flex gap-2">
										{order.status === "processing" && (
											<button
												className="px-3 py-1 rounded text-sm text-white"
												style={{ backgroundColor: "var(--accent-secondary)" }}
												onMouseEnter={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
												}
												onMouseLeave={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary)")
												}
												onClick={() =>
													updateOrderStatus(
														order.orderNumber,
														order.sellerId,
														"Shipped",
														trackingInputs[`${order.orderNumber}-${order.sellerId}`],
													)
												}
											>
												Mark Shipped
											</button>
										)}
										{order.status === "shipped" && (
											<button
												className="px-3 py-1 rounded text-sm text-white"
												style={{ backgroundColor: "var(--accent)" }}
												onMouseEnter={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
												}
												onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent)")}
												onClick={() =>
													updateOrderStatus(order.orderNumber, order.sellerId, "Delivered")
												}
											>
												Mark Delivered
											</button>
										)}
										<button
											className="flex items-center gap-2 px-3 py-1 rounded text-sm"
											style={{ backgroundColor: "var(--surface-strong)", color: "var(--ink)" }}
											onMouseEnter={(e) =>
												(e.target.style.backgroundColor = "var(--border)")
											}
											onMouseLeave={(e) =>
												(e.target.style.backgroundColor = "var(--surface-strong)")
											}
										>
											<MessageSquare className="w-4 h-4" />
											Message
										</button>
										<button
											className="flex items-center gap-2 px-3 py-1 rounded text-sm"
											style={{ backgroundColor: "var(--surface-strong)", color: "var(--ink)" }}
											onMouseEnter={(e) =>
												(e.target.style.backgroundColor = "var(--border)")
											}
											onMouseLeave={(e) =>
												(e.target.style.backgroundColor = "var(--surface-strong)")
											}
										>
											Details
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
};

export default SellerOrders;

