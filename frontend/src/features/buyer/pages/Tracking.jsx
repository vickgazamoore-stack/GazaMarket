import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Package, RefreshCcw } from "lucide-react";
import { ordersApi, returnsApi } from "../../../services/api.js";

const Tracking = () => {
	const [orders, setOrders] = useState([]);
	const [filter, setFilter] = useState("all");
	const [activeTab, setActiveTab] = useState("tracking");
	const [returnsList, setReturnsList] = useState([]);
	const [returnFilter, setReturnFilter] = useState("all");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [loadingReturns, setLoadingReturns] = useState(true);
	const [returnsError, setReturnsError] = useState("");

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			setError("");
			try {
				const response = await ordersApi.getMyOrders();
				setOrders(response.orders || []);
			} catch (loadError) {
				setError(loadError.message || "Failed to load tracking data");
			} finally {
				setLoading(false);
			}
			setLoadingReturns(true);
			setReturnsError("");
			try {
				const response = await returnsApi.getMyReturns();
				setReturnsList(response.returns || []);
			} catch (loadError) {
				setReturnsError(loadError.message || "Failed to load returns");
			} finally {
				setLoadingReturns(false);
			}
		};

		loadData();
	}, []);

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
		if (filter === "all") return shipments;
		return shipments.filter(
			(shipment) => shipment.status?.toLowerCase() === filter
		);
	}, [filter, shipments]);

	const filteredReturns = useMemo(() => {
		if (returnFilter === "all") return returnsList;
		return returnsList.filter((entry) => entry.status === returnFilter);
	}, [returnFilter, returnsList]);

	const statusOptions = ["all", "processing", "shipped", "delivered", "cancelled"];
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
			<header
				className="border-b sticky top-0 z-40"
				style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
								Tracking
							</h1>
							<p className="mt-1" style={{ color: "var(--muted)" }}>
								All shipments across your orders in one place
							</p>
						</div>
						<Link
							to="/buyer/orders"
							className="text-sm font-semibold"
							style={{ color: "var(--accent-secondary)" }}
						>
							View Orders
						</Link>
					</div>
				</div>
			</header>

			<div
				className="border-b"
				style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex gap-3 py-4">
						<button
							onClick={() => setActiveTab("tracking")}
							className="px-4 py-2 rounded-lg text-sm font-semibold"
							style={{
								backgroundColor:
									activeTab === "tracking" ? "var(--accent-secondary)" : "var(--border)",
								color:
									activeTab === "tracking" ? "var(--surface)" : "var(--muted)",
							}}
						>
							Tracking
						</button>
						<button
							onClick={() => setActiveTab("returns")}
							className="px-4 py-2 rounded-lg text-sm font-semibold"
							style={{
								backgroundColor:
									activeTab === "returns" ? "var(--accent-secondary)" : "var(--border)",
								color:
									activeTab === "returns" ? "var(--surface)" : "var(--muted)",
							}}
						>
							Returns
						</button>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{activeTab === "tracking" && (
					<>
						{loading && <p className="mb-4" style={{ color: "var(--muted)" }}>Loading tracking data...</p>}
						{error && <p className="mb-4" style={{ color: "var(--accent-secondary-strong)" }}>{error}</p>}
						<div className="flex gap-4 pb-6 overflow-x-auto">
							{statusOptions.map((status) => (
								<button
									key={status}
									onClick={() => setFilter(status)}
									className="px-4 py-2 rounded-lg whitespace-nowrap transition text-sm font-semibold"
									style={{
										backgroundColor:
											filter === status ? "var(--accent-secondary)" : "var(--border)",
										color:
											filter === status ? "var(--surface)" : "var(--muted)",
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
									You don’t have any tracked shipments yet.
								</p>
							</div>
						)}
					</>
				)}

				{activeTab === "returns" && (
					<>
						{loadingReturns && <p className="mb-4" style={{ color: "var(--muted)" }}>Loading returns...</p>}
						{returnsError && <p className="mb-4" style={{ color: "var(--accent-secondary-strong)" }}>{returnsError}</p>}
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
													Order {entry.orderId} • {entry.sellerName}
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
									You haven’t submitted any return requests yet.
								</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Tracking;
