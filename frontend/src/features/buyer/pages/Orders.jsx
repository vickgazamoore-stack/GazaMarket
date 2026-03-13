import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Download, MessageCircle, Package, RefreshCcw, Truck } from "lucide-react";
import { ordersApi, returnsApi } from "../../../services/api.js";

const Orders = () => {
	const [activeTab, setActiveTab] = useState("orders");
	const [orderFilter, setOrderFilter] = useState("all");
	const [trackingFilter, setTrackingFilter] = useState("all");
	const [returnFilter, setReturnFilter] = useState("all");

	const [orders, setOrders] = useState([]);
	const [returnsList, setReturnsList] = useState([]);
	const [loadingOrders, setLoadingOrders] = useState(true);
	const [ordersError, setOrdersError] = useState("");
	const [loadingReturns, setLoadingReturns] = useState(true);
	const [returnsError, setReturnsError] = useState("");

	useEffect(() => {
		const loadData = async () => {
			setLoadingOrders(true);
			setOrdersError("");
			try {
				const response = await ordersApi.getMyOrders();
				setOrders(response.orders || []);
			} catch (error) {
				setOrdersError(error.message || "Failed to load orders");
			} finally {
				setLoadingOrders(false);
			}
			setLoadingReturns(true);
			setReturnsError("");
			try {
				const response = await returnsApi.getMyReturns();
				setReturnsList(response.returns || []);
			} catch (error) {
				setReturnsError(error.message || "Failed to load returns");
			} finally {
				setLoadingReturns(false);
			}
		};

		loadData();
	}, []);

	const getStatusColor = (status) => {
		switch (status) {
			case "Delivered":
				return "bg-green-100 text-green-800";
			case "Shipped":
				return "bg-blue-100 text-blue-800";
			case "Processing":
				return "bg-yellow-100 text-yellow-800";
			case "Cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const filteredOrders = useMemo(() => {
		if (orderFilter === "all") return orders;
		return orders.filter(
			(order) => order.status.toLowerCase() === orderFilter.toLowerCase(),
		);
	}, [orderFilter, orders]);

	const shipments = useMemo(() => {
		const list = [];
		orders.forEach((order) => {
			(order.sellers || []).forEach((seller) => {
				list.push({
					orderId: order.id,
					orderDate: order.date,
					sellerId: seller.sellerId,
					sellerName: seller.sellerName,
					status: seller.status || order.status,
					trackingNumber: seller.trackingNumber,
					deliveryEstimate: seller.deliveryEstimate || "3-5 days",
					items: seller.items || [],
				});
			});
		});
		return list;
	}, [orders]);

	const filteredShipments = useMemo(() => {
		if (trackingFilter === "all") return shipments;
		return shipments.filter(
			(shipment) => shipment.status?.toLowerCase() === trackingFilter
		);
	}, [shipments, trackingFilter]);

	const filteredReturns = useMemo(() => {
		if (returnFilter === "all") return returnsList;
		return returnsList.filter((entry) => entry.status === returnFilter);
	}, [returnFilter, returnsList]);

	const trackingStatusOptions = ["all", "processing", "shipped", "delivered", "cancelled"];
	const returnStatusOptions = ["all", "requested", "approved", "rejected"];

	const getReturnStatusLabel = (status) => {
		switch (status) {
			case "approved":
				return "Approved";
			case "rejected":
				return "Rejected";
			default:
				return "Requested";
		}
	};

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			{/* Header */}
			<header
				className="border-b sticky top-0 z-40"
				style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
								My Orders
							</h1>
							<p className="mt-1" style={{ color: "var(--muted)" }}>
								Manage orders, tracking, and returns in one place
							</p>
						</div>
						<button
							className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							<Download className="w-4 h-4" />
							Download Receipt
						</button>
					</div>
				</div>
			</header>

			{/* Section Tabs */}
			<div
				className="border-b sticky top-16 z-30"
				style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex gap-4 py-3 overflow-x-auto">
						{["orders", "tracking", "returns"].map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className="px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold"
								style={{
									backgroundColor:
										activeTab === tab ? "var(--accent-secondary)" : "var(--border)",
									color: activeTab === tab ? "var(--surface)" : "var(--muted)",
								}}
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{activeTab === "orders" && (
					<>
						{loadingOrders && (
							<p className="mb-4" style={{ color: "var(--muted)" }}>
								Loading orders...
							</p>
						)}
						{ordersError && (
							<p className="mb-4" style={{ color: "var(--accent-secondary-strong)" }}>
								{ordersError}
							</p>
						)}
						<div className="flex gap-6 overflow-x-auto pb-6">
							{["all", "Delivered", "Shipped", "Processing", "Cancelled"].map(
								(status) => (
									<button
										key={status}
										onClick={() => setOrderFilter(status)}
										className={`py-2 px-1 border-b-2 font-medium transition whitespace-nowrap ${
											orderFilter === status ? "border-2" : "border-transparent"
										}`}
										style={{
											borderColor:
												orderFilter === status ? "var(--accent)" : "transparent",
											color:
												orderFilter === status ? "var(--accent)" : "var(--muted)",
										}}
									>
										{status.charAt(0).toUpperCase() + status.slice(1)}
									</button>
								),
							)}
						</div>
						{filteredOrders.length > 0 ? (
							<div className="space-y-4">
								{filteredOrders.map((order) => (
									<div
										key={order.id}
										className="rounded-xl border p-6 transition"
										style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
									>
										<div className="flex items-center justify-between mb-4">
											<div className="flex items-center gap-4">
												<div className="text-4xl">{order.image}</div>
												<div>
													<p className="text-sm" style={{ color: "var(--muted)" }}>
														Order ID
													</p>
													<p
														className="text-lg font-semibold"
														style={{ color: "var(--accent)" }}
													>
														{order.id}
													</p>
												</div>
											</div>
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
											>
												{order.status}
											</span>
										</div>

										<div
											className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 pb-4 border-b"
											style={{ borderColor: "var(--border)" }}
										>
											<div>
												<p className="text-xs" style={{ color: "var(--muted)" }}>
													Date
												</p>
												<p
													className="text-white font-medium"
													style={{ color: "var(--accent)" }}
												>
													{new Date(order.date).toLocaleDateString()}
												</p>
											</div>
											<div>
												<p className="text-xs" style={{ color: "var(--muted)" }}>
													Items
												</p>
												<p
													className="text-white font-medium"
													style={{ color: "var(--accent)" }}
												>
													{order.items?.reduce(
														(sum, item) => sum + item.quantity,
														0,
													) || 0}{" "}
													item
													{order.items?.reduce(
														(sum, item) => sum + item.quantity,
														0,
													) > 1
														? "s"
														: ""}
												</p>
											</div>
											<div>
												<p className="text-xs" style={{ color: "var(--muted)" }}>
													Seller
												</p>
												<p
													className="text-white font-medium"
													style={{ color: "var(--accent)" }}
												>
													{order.sellers?.map((seller) => seller.sellerName).join(", ")}
												</p>
											</div>
											<div>
												<p className="text-xs" style={{ color: "var(--muted)" }}>
													Seller Orders
												</p>
												<p
													className="text-white font-medium"
													style={{ color: "var(--accent)" }}
												>
													{order.sellers?.length || 0}
												</p>
											</div>
											<div>
												<p className="text-xs" style={{ color: "var(--muted)" }}>
													Total
												</p>
												<p
													className="text-white font-bold"
													style={{ color: "var(--accent-secondary)" }}
												>
													${(Number(order.total) || 0).toFixed(2)}
												</p>
											</div>
										</div>

										<div className="flex flex-wrap gap-3">
											<Link
												to={`/buyer/orders/${order.id}`}
												className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition font-medium"
												style={{ backgroundColor: "var(--accent-secondary)" }}
												onMouseEnter={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
												}
												onMouseLeave={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary)")
												}
											>
												View Details
												<ChevronRight className="w-4 h-4" />
											</Link>
											<Link
												to={`/buyer/orders/${order.id}`}
												className="flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium border"
												style={{ borderColor: "var(--border)", color: "var(--accent)" }}
											>
												Request Return
											</Link>
											<button
												className="flex items-center gap-2 px-4 py-2 border rounded-lg transition"
												style={{ borderColor: "var(--border)", color: "var(--muted)" }}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor = "var(--surface-strong)";
													e.currentTarget.style.color = "var(--text)";
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor = "transparent";
													e.currentTarget.style.color = "var(--muted)";
												}}
											>
												<MessageCircle className="w-4 h-4" />
												Contact Seller
											</button>
											<div className="text-xs self-center" style={{ color: "var(--muted)" }}>
												{order.sellers?.map((seller) => (
													<span key={`${order.id}-${seller.sellerId}`} className="mr-2">
														{seller.sellerName}: {seller.status}
													</span>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<div className="text-5xl mb-4">No orders</div>
								<h3
									className="text-xl font-semibold mb-2"
									style={{ color: "var(--accent)" }}
								>
									No {orderFilter !== "all" ? orderFilter : ""} orders
								</h3>
								<p className="mb-6" style={{ color: "var(--muted)" }}>
									You don't have any {orderFilter !== "all" ? orderFilter.toLowerCase() : ""}{" "}
									orders yet.
								</p>
								<Link
									to="/buyer/search"
									className="inline-block px-6 py-3 text-white rounded-lg font-medium transition"
									style={{ backgroundColor: "var(--accent-secondary)" }}
									onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
									onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
								>
									Start Shopping
								</Link>
							</div>
						)}
					</>
				)}

				{activeTab === "tracking" && (
					<>
						<div className="flex gap-4 pb-6 overflow-x-auto">
							{trackingStatusOptions.map((status) => (
								<button
									key={status}
									onClick={() => setTrackingFilter(status)}
									className="px-4 py-2 rounded-lg whitespace-nowrap transition text-sm font-semibold"
									style={{
										backgroundColor:
											trackingFilter === status ? "var(--accent-secondary)" : "var(--border)",
										color:
											trackingFilter === status ? "var(--surface)" : "var(--muted)",
									}}
								>
									{status === "all"
										? "All"
										: status.charAt(0).toUpperCase() + status.slice(1)}
								</button>
							))}
						</div>
						{filteredShipments.length > 0 ? (
							<div className="space-y-4">
								{filteredShipments.map((shipment, index) => (
									<div
										key={`${shipment.orderId}-${shipment.sellerId}-${index}`}
										className="rounded-xl border p-6"
										style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
									>
										<div className="flex items-start justify-between">
											<div>
												<p className="text-sm" style={{ color: "var(--muted)" }}>
													Order {shipment.orderId}
												</p>
												<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
													{shipment.sellerName}
												</h3>
												<p className="text-sm" style={{ color: "var(--muted)" }}>
													Placed on {new Date(shipment.orderDate).toLocaleDateString()}
												</p>
											</div>
											<span
												className="px-3 py-1 rounded-full text-xs font-semibold"
												style={{
													backgroundColor:
														shipment.status === "Delivered"
															? "var(--accent-tint)"
															: shipment.status === "Shipped"
																? "var(--accent-secondary-tint)"
																: "var(--border)",
													color:
														shipment.status === "Delivered"
															? "var(--accent)"
															: shipment.status === "Shipped"
																? "var(--accent-secondary-strong)"
																: "var(--muted)",
												}}
											>
												{shipment.status}
											</span>
										</div>

										<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
											<div className="flex items-center gap-2">
												<Package className="w-4 h-4" style={{ color: "var(--muted)" }} />
												<span style={{ color: "var(--muted)" }}>
													{shipment.items.length} item(s)
												</span>
											</div>
											<div className="flex items-center gap-2">
												<Truck className="w-4 h-4" style={{ color: "var(--muted)" }} />
												<span style={{ color: "var(--muted)" }}>
													Est. {shipment.deliveryEstimate}
												</span>
											</div>
											<div className="text-sm" style={{ color: "var(--muted)" }}>
												Tracking{" "}
												<span style={{ color: "var(--accent)" }}>
													{shipment.trackingNumber || "Pending"}
												</span>
											</div>
										</div>

										<div className="mt-4 flex justify-end">
											<Link
												to={`/buyer/orders/${shipment.orderId}`}
												className="text-sm font-semibold"
												style={{ color: "var(--accent-secondary)" }}
											>
												View order
											</Link>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<div className="text-5xl mb-4">No shipments</div>
								<p style={{ color: "var(--muted)" }}>
									You don't have any tracked shipments yet.
								</p>
							</div>
						)}
					</>
				)}

				{activeTab === "returns" && (
					<>
						{loadingReturns && (
							<p className="mb-4" style={{ color: "var(--muted)" }}>
								Loading returns...
							</p>
						)}
						{returnsError && (
							<p className="mb-4" style={{ color: "var(--accent-secondary-strong)" }}>
								{returnsError}
							</p>
						)}
						<div className="flex gap-4 pb-6 overflow-x-auto">
							{returnStatusOptions.map((status) => (
								<button
									key={status}
									onClick={() => setReturnFilter(status)}
									className="px-4 py-2 rounded-lg whitespace-nowrap transition text-sm font-semibold"
									style={{
										backgroundColor:
											returnFilter === status ? "var(--accent-secondary)" : "var(--border)",
										color:
											returnFilter === status ? "var(--surface)" : "var(--muted)",
									}}
								>
									{status === "all" ? "All" : getReturnStatusLabel(status)}
								</button>
							))}
						</div>
						{filteredReturns.length > 0 ? (
							<div className="space-y-4">
								{filteredReturns.map((entry) => (
									<div
										key={entry.id}
										className="rounded-xl border p-6"
										style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
									>
										<div className="flex items-start justify-between mb-3">
											<div>
												<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
													{entry.id}
												</h3>
											<p className="text-sm" style={{ color: "var(--muted)" }}>
												Order {entry.orderId} - {entry.sellerName}
											</p>
											</div>
											<span
												className="px-3 py-1 rounded-full text-xs font-semibold"
												style={{
													backgroundColor:
														entry.status === "approved"
															? "var(--accent-tint)"
															: entry.status === "rejected"
																? "var(--accent-secondary-tint)"
																: "var(--border)",
													color:
														entry.status === "approved"
															? "var(--accent)"
															: entry.status === "rejected"
																? "var(--accent-secondary-strong)"
																: "var(--muted)",
												}}
											>
												{getReturnStatusLabel(entry.status)}
											</span>
										</div>
										<div className="text-sm space-y-2" style={{ color: "var(--muted)" }}>
											<p>
												Reason: <span style={{ color: "var(--accent)" }}>{entry.reason}</span>
											</p>
											{entry.notes && <p>Notes: {entry.notes}</p>}
											<p>
												Filed: {new Date(entry.filed).toLocaleDateString()}
											</p>
										</div>
										<div className="mt-4 flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
											<RefreshCcw className="w-4 h-4" />
											Return status updates appear here.
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<div className="text-5xl mb-4">No returns</div>
								<p style={{ color: "var(--muted)" }}>
									You haven't submitted any return requests yet.
								</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Orders;
