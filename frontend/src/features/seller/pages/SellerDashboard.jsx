import { useEffect, useMemo, useState } from "react";
import { TrendingUp, Package, DollarSign, Users } from "lucide-react";
import { ordersApi } from "../../../services/api.js";

const SellerDashboard = () => {
	const [orders, setOrders] = useState([]);
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
				setError(loadError.message || "Failed to load seller dashboard data");
			} finally {
				setLoading(false);
			}
		};

		loadOrders();
	}, []);

	const stats = useMemo(() => {
		const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
		const totalOrders = orders.length;
		const totalProducts = orders.reduce(
			(sum, order) => sum + (order.product ? order.product.split(",").length : 0),
			0,
		);
		const uniqueCustomers = new Set(
			orders.map((order) => order.buyer || "Buyer"),
		).size;

		return [
			{
				label: "Total Sales",
				value: `$${totalSales.toFixed(2)}`,
				change: "+12%",
				icon: DollarSign,
				color: "text-green-400",
			},
			{
				label: "Products",
				value: totalProducts.toString(),
				change: "+3",
				icon: Package,
				color: "text-blue-400",
			},
			{
				label: "Orders",
				value: totalOrders.toString(),
				change: "+18%",
				icon: TrendingUp,
				color: "text-purple-400",
			},
			{
				label: "Customers",
				value: uniqueCustomers.toString(),
				change: "+45",
				icon: Users,
				color: "text-orange-400",
			},
		];
	}, [orders]);

	const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

	const getStatusColor = (status) => {
		const colors = {
			delivered: "bg-green-100 text-green-800",
			shipped: "bg-blue-100 text-blue-800",
			processing: "bg-yellow-100 text-yellow-800",
			cancelled: "bg-red-100 text-red-800",
		};
		return colors[status] || "bg-gray-100 text-gray-800";
	};

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ backgroundColor: "var(--surface)" }}
		>
			<main className="flex-1 p-8">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8">
						<h1
							className="text-3xl font-bold mb-2"
							style={{ color: "var(--accent)" }}
						>
							Welcome back, Seller
						</h1>
						<p style={{ color: "var(--muted)" }}>
							Here is your business performance overview
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						{stats.map((stat, idx) => {
							const Icon = stat.icon;
							return (
								<div
									key={idx}
									className="p-6 rounded-lg border transition"
									style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
								>
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-sm" style={{ color: "var(--muted)" }}>
											{stat.label}
										</h3>
										<Icon className={`w-5 h-5 ${stat.color}`} />
									</div>
									<div className="flex items-end justify-between">
										<div>
											<p
												className="text-2xl font-bold"
												style={{ color: "var(--accent)" }}
											>
												{stat.value}
											</p>
											<p className="text-xs mt-1" style={{ color: "var(--accent)" }}>
												{stat.change}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div
						className="rounded-lg border p-6"
						style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
					>
						<h2 className="text-xl font-bold mb-6" style={{ color: "var(--accent)" }}>
							Recent Orders
						</h2>
						{loading && <p style={{ color: "var(--muted)" }}>Loading dashboard...</p>}
						{error && <p style={{ color: "var(--accent-secondary-strong)" }}>{error}</p>}
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr
										style={{
											borderBottomColor: "var(--border)",
											borderBottomWidth: "1px",
										}}
									>
										<th className="text-left py-3 px-4 font-medium" style={{ color: "var(--muted)" }}>
											Order ID
										</th>
										<th className="text-left py-3 px-4 font-medium" style={{ color: "var(--muted)" }}>
											Customer
										</th>
										<th className="text-left py-3 px-4 font-medium" style={{ color: "var(--muted)" }}>
											Items
										</th>
										<th className="text-left py-3 px-4 font-medium" style={{ color: "var(--muted)" }}>
											Amount
										</th>
										<th className="text-left py-3 px-4 font-medium" style={{ color: "var(--muted)" }}>
											Date
										</th>
										<th className="text-left py-3 px-4 font-medium" style={{ color: "var(--muted)" }}>
											Status
										</th>
									</tr>
								</thead>
								<tbody>
									{recentOrders.map((order) => (
										<tr
											key={`${order.orderNumber}-${order.sellerId}`}
											className="transition"
											style={{
												borderBottomColor: "var(--border)",
												borderBottomWidth: "1px",
											}}
										>
											<td className="py-3 px-4 text-sm" style={{ color: "var(--accent)" }}>
												{order.orderNumber}
											</td>
											<td className="py-3 px-4 text-sm" style={{ color: "var(--ink)" }}>
												{order.buyer || "Buyer"}
											</td>
											<td className="py-3 px-4 text-sm" style={{ color: "var(--ink)" }}>
												{order.product ? order.product.split(",").length : 0}
											</td>
											<td className="py-3 px-4 text-sm font-semibold" style={{ color: "var(--ink)" }}>
												${(order.total || 0).toFixed(2)}
											</td>
											<td className="py-3 px-4 text-sm" style={{ color: "var(--muted)" }}>
												{new Date(order.date).toLocaleDateString()}
											</td>
											<td className="py-3 px-4 text-sm">
												<span
													className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
												>
													{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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

export default SellerDashboard;
