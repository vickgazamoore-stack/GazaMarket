import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Package,
	Heart,
	AlertTriangle,
	ShoppingCart,
	TrendingUp,
	Clock,
} from "lucide-react";
import Footer from "../../../components/layout/Footer.jsx";
import { ordersApi } from "../../../services/api.js";

const BuyerDashboard = () => {
	const [recentOrders, setRecentOrders] = useState([]);
	const [stats, setStats] = useState({
		totalOrders: 0,
		pendingOrders: 0,
		totalSpent: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadOrders = async () => {
			setLoading(true);
			setError("");
			try {
				const response = await ordersApi.getMyOrders();
				const orders = response.orders || [];
				setRecentOrders(orders.slice(0, 3));
				const pending = orders.filter(
					(order) => (order.status || "").toLowerCase() !== "delivered",
				).length;
				const spent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
				setStats({
					totalOrders: orders.length,
					pendingOrders: pending,
					totalSpent: spent,
				});
			} catch (loadError) {
				setError(loadError.message || "Failed to load dashboard data");
			} finally {
				setLoading(false);
			}
		};

		loadOrders();
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

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			{/* Header */}
			<header
				className="border-b"
				style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
						<div className="flex justify-between items-center">
							<div>
							<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
								Welcome Back! 👋
							</h1>
							<p className="mt-1" style={{ color: "var(--muted)" }}>
								Here's what's happening with your orders
							</p>
							{loading && <p style={{ color: "var(--muted)" }}>Loading dashboard...</p>}
							{error && <p style={{ color: "var(--accent-secondary-strong)" }}>{error}</p>}
						</div>
						<Link
							to="/buyer/search"
							className="text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							<ShoppingCart className="w-5 h-5" />
							Browse Products
						</Link>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{/* Total Orders */}
					<div
						className="relative rounded-2xl overflow-hidden shadow-xl border group"
						style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
						<div className="relative p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-semibold" style={{ color: "var(--muted)" }}>
									Total Orders
								</h3>
								<Package className="w-8 h-8" style={{ color: "var(--accent)" }} />
							</div>
							<p className="text-4xl font-bold" style={{ color: "var(--accent)" }}>
								{stats.totalOrders}
							</p>
							<p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
								All-time purchases
							</p>
						</div>
					</div>

					{/* Pending Orders */}
					<div
						className="relative rounded-2xl overflow-hidden shadow-xl border group"
						style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-400/20 blur-2xl" />
						<div className="relative p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-semibold" style={{ color: "var(--muted)" }}>
									Pending Orders
								</h3>
								<Clock className="w-8 h-8" style={{ color: "var(--accent-secondary)" }} />
							</div>
							<p className="text-4xl font-bold" style={{ color: "var(--accent-secondary)" }}>
								{stats.pendingOrders}
							</p>
							<p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
								In progress or shipped
							</p>
						</div>
					</div>

					{/* Total Spent */}
					<div
						className="relative rounded-2xl overflow-hidden shadow-xl border group"
						style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-400/20 blur-2xl" />
						<div className="relative p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-semibold" style={{ color: "var(--muted)" }}>
									Total Spent
								</h3>
								<TrendingUp className="w-8 h-8" style={{ color: "var(--accent)" }} />
							</div>
							<p className="text-4xl font-bold" style={{ color: "var(--accent)" }}>
								${stats.totalSpent.toFixed(2)}
							</p>
							<p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
								Total investment
							</p>
						</div>
					</div>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Recent Orders */}
					<div className="lg:col-span-2">
						<div
							className="rounded-2xl p-6 border shadow-xl"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
									Recent Orders
								</h2>
								<Link
									to="/buyer/orders"
									className="text-sm font-semibold"
									style={{ color: "var(--accent)" }}
									onMouseEnter={(e) => (e.target.style.color = "var(--accent-strong)")}
									onMouseLeave={(e) => (e.target.style.color = "var(--accent)")}
								>
									View All →
								</Link>
							</div>

							{recentOrders.length > 0 ? (
								<div className="space-y-4">
									{recentOrders.map((order) => (
										<div
											key={order.id}
											className="rounded-lg p-4 transition-colors border"
											style={{
												backgroundColor: "var(--surface-strong)",
												borderColor: "var(--border)",
											}}
											onMouseEnter={(e) =>
												(e.currentTarget.style.backgroundColor = "var(--surface-strong)")
											}
											onMouseLeave={(e) =>
												(e.currentTarget.style.backgroundColor = "var(--surface-strong)")
											}
										>
											<div className="flex items-center justify-between mb-3">
												<div>
													<p
														className="font-semibold"
														style={{ color: "var(--accent)" }}
													>
														{order.id}
													</p>
													<p className="text-sm" style={{ color: "var(--muted)" }}>
														from {order.sellers?.map((seller) => seller.sellerName).join(", ")}
													</p>
												</div>
												<span
													className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
												>
													{order.status}
												</span>
											</div>
											<div className="flex items-center justify-between">
												<p className="text-sm" style={{ color: "var(--muted)" }}>
													{new Date(order.date).toLocaleDateString()}
												</p>
												<p
													className="text-lg font-bold"
													style={{ color: "var(--accent-secondary)" }}
												>
													${(Number(order.total) || 0).toFixed(2)}
												</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="text-center py-12">
									<Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
									<p className="text-gray-400">No orders yet</p>
								</div>
							)}
						</div>
					</div>

					{/* Quick Actions */}
					<div className="space-y-6">
					{/* Saved Sellers */}
						<div
							className="rounded-2xl p-6 border shadow-xl"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<div className="flex items-center gap-3 mb-4">
								<Heart className="w-6 h-6" style={{ color: "var(--accent-secondary-strong)" }} />
								<h3 className="text-lg font-bold" style={{ color: "var(--accent)" }}>
									Saved Sellers
								</h3>
							</div>
							<p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
								You have 5 saved items
							</p>
							<Link
								to="/buyer/wishlist"
								className="block w-full text-white py-2 px-4 rounded-lg font-semibold text-center transition-colors"
								style={{ backgroundColor: "var(--accent-secondary)" }}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary)")
								}
							>
								View Saved Sellers
							</Link>
						</div>

						{/* Messages */}
						<div
							className="rounded-2xl p-6 border shadow-xl"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<div className="flex items-center gap-3 mb-4">
								<AlertTriangle
									className="w-6 h-6"
									style={{ color: "var(--accent-secondary)" }}
								/>
								<h3 className="text-lg font-bold" style={{ color: "var(--accent)" }}>
									Active Disputes
								</h3>
							</div>
							<p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
								You have {stats.pendingOrders} active issues
							</p>
							<Link
								to="/buyer/disputes"
								className="block w-full text-white py-2 px-4 rounded-lg font-semibold text-center transition-colors"
								style={{ backgroundColor: "var(--accent-secondary-strong)" }}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
								}
							>
								View Disputes
							</Link>
						</div>

						{/* Messages Link */}
						<div
							className="rounded-2xl p-6 border shadow-xl"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<div className="flex items-center gap-3 mb-4">
								<span className="text-2xl">💬</span>
								<h3 className="text-lg font-bold" style={{ color: "var(--accent)" }}>
									Messages
								</h3>
							</div>
							<p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
								Chat with sellers
							</p>
							<Link
								to="/buyer/messages"
								className="block w-full text-white py-2 px-4 rounded-lg font-semibold text-center transition-colors"
								style={{ backgroundColor: "var(--accent-secondary)" }}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary)")
								}
							>
								Go to Messages
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BuyerDashboard;
