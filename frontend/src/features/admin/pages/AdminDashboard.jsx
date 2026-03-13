import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, AlertTriangle, Package, Settings } from "lucide-react";

const AdminDashboard = () => {
	const [stats, setStats] = useState({
		totalRevenue: 0,
		totalOrders: 0,
		activeSellers: 0,
		pendingSellers: 0,
		openDisputes: 0,
		pendingProducts: 0,
	});
	const [recentActivity, setRecentActivity] = useState([]);
	const [alerts, setAlerts] = useState([]);

	// Mock data - in real app this would come from API
	useEffect(() => {
		setStats({
			totalRevenue: 45678.9,
			totalOrders: 1234,
			activeSellers: 89,
			pendingSellers: 12,
			openDisputes: 7,
			pendingProducts: 23,
			flaggedProducts: 5,
		});

		setRecentActivity([
			{
				id: 1,
				type: "seller_approved",
				message: 'New seller "Nnamdi Tech Market" approved',
				time: "2 hours ago",
				priority: "normal",
			},
			{
				id: 2,
				type: "dispute_opened",
				message: "Dispute #DSP-001 opened for Order #ORD-123",
				time: "4 hours ago",
				priority: "high",
			},
			{
				id: 3,
				type: "product_rejected",
				message: 'Product "Prohibited Item" rejected',
				time: "6 hours ago",
				priority: "normal",
			},
			{
				id: 4,
				type: "payout_processed",
				message: "Monthly payouts processed for 45 sellers",
				time: "1 day ago",
				priority: "normal",
			},
		]);

		setAlerts([
			{
				id: 1,
				type: "urgent",
				message: "High volume of pending seller applications",
				action: "Review Applications",
			},
			{
				id: 2,
				type: "warning",
				message: "7 open disputes require attention",
				action: "Resolve Disputes",
			},
			{
				id: 3,
				type: "warning",
				message: "23 products awaiting moderation",
				action: "Moderate Products",
			},
			{
				id: 4,
				type: "urgent",
				message: "5 products flagged for policy violations",
				action: "Review Flagged Items",
			},
		]);
	}, []);

	const getPriorityColor = (priority) => {
		switch (priority) {
			case "high":
				return "text-red-600";
			case "normal":
				return "text-blue-600";
			case "low":
				return "text-gray-600";
			default:
				return "text-gray-600";
		}
	};

	const getAlertColor = () => ({
		backgroundColor: "var(--surface-accent)",
		borderColor: "var(--border)",
	});

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold" style={{ color: "var(--ink)" }}>
					Admin Dashboard
				</h1>
				<div className="flex space-x-2">
					<Link
						to="/admin/reports"
						className="text-white px-4 py-2 rounded-md"
						style={{ backgroundColor: "var(--accent-secondary)" }}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
					>
						Generate Report
					</Link>
					<Link
						to="/admin/payouts"
						className="text-white px-4 py-2 rounded-md"
						style={{ backgroundColor: "var(--accent-secondary)" }}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
					>
						Process Payouts
					</Link>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
				<div
					className="p-6 rounded-lg shadow"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
						Revenue
					</h3>
					<p className="text-xl md:text-2xl font-bold text-green-600 mt-2">
						${stats.totalRevenue}
					</p>
				</div>
				<div
					className="p-6 rounded-lg shadow"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
						Orders
					</h3>
					<p className="text-3xl font-bold mt-2" style={{ color: "var(--accent)" }}>
						{stats.totalOrders}
					</p>
				</div>
				<div
					className="p-6 rounded-lg shadow"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
						Active Sellers
					</h3>
					<p className="text-3xl font-bold text-purple-600 mt-2">
						{stats.activeSellers}
					</p>
				</div>
				<div
					className="p-6 rounded-lg shadow"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
						Pending Sellers
					</h3>
					<p className="text-3xl font-bold text-yellow-600 mt-2">
						{stats.pendingSellers}
					</p>
				</div>
				<div
					className="p-6 rounded-lg shadow"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
						Open Disputes
					</h3>
					<p className="text-3xl font-bold text-red-600 mt-2">
						{stats.openDisputes}
					</p>
				</div>
				<div
					className="p-6 rounded-lg shadow"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
						Pending Moderation
					</h3>
					<p className="text-3xl font-bold mt-2" style={{ color: "var(--accent-secondary)" }}>
						{stats.pendingProducts}
					</p>
				</div>
				<div
					className="p-6 rounded-lg shadow"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
						Flagged Products
					</h3>
					<p className="text-3xl font-bold text-red-600 mt-2">
						{stats.flaggedProducts}
					</p>
				</div>
			</div>

			{/* Alerts */}
			{alerts.length > 0 && (
				<div className="space-y-4">
					<h2 className="text-lg font-medium text-gray-900">Alerts</h2>
					{alerts.map((alert) => (
						<div
							key={alert.id}
							className="p-4 rounded-lg border"
							style={getAlertColor(alert.type)}
						>
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium" style={{ color: "var(--ink)" }}>
										{alert.message}
									</p>
								</div>
								<Link
									to={
										alert.action === "Review Applications"
											? "/admin/sellers"
											: alert.action === "Resolve Disputes"
												? "/admin/disputes"
												: "/admin/products"
									}
									className="text-white px-3 py-1 rounded text-sm"
									style={{ backgroundColor: "var(--accent-secondary)" }}
									onMouseEnter={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary)")
									}
								>
									{alert.action}
								</Link>
							</div>
						</div>
					))}
				</div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Activity */}
				<div
					className="shadow rounded-lg"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<div
						className="px-6 py-4 border-b"
						style={{ borderColor: "var(--border)" }}
					>
						<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
							Recent Activity
						</h3>
					</div>
					<div className="p-6">
						{recentActivity.length > 0 ? (
							<div className="space-y-4">
								{recentActivity.map((activity) => (
									<div key={activity.id} className="flex items-start space-x-3">
										<div className="flex-shrink-0">
											<div
												className={`w-2 h-2 rounded-full mt-2 ${
													activity.priority === "high"
														? "bg-red-500"
														: "bg-blue-500"
												}`}
											/>
										</div>
										<div className="flex-1">
											<p className="text-sm text-gray-900">
												{activity.message}
											</p>
											<p
												className={`text-xs ${getPriorityColor(activity.priority)}`}
											>
												{activity.time}
											</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-gray-500 text-center py-4">
								No recent activity
							</p>
						)}
					</div>
				</div>

				{/* Quick Actions */}
				<div
					className="shadow rounded-lg"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<div
						className="px-6 py-4 border-b"
						style={{ borderColor: "var(--border)" }}
					>
						<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
							Quick Actions
						</h3>
					</div>
					<div className="p-6">
						<div className="grid grid-cols-2 gap-4">
							<Link
								to="/admin/sellers"
								className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg transition-colors"
								style={{ borderColor: "var(--border)" }}
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor = "var(--accent)";
									e.currentTarget.style.backgroundColor = "var(--surface-strong)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor = "var(--border)";
									e.currentTarget.style.backgroundColor = "transparent";
								}}
							>
								<Users className="w-8 h-8 mb-2" style={{ color: "var(--muted)" }} />
								<span
									className="text-sm font-medium"
									style={{ color: "var(--accent)" }}
								>
									Seller Management
								</span>
							</Link>
							<Link
								to="/admin/disputes"
								className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg transition-colors"
								style={{ borderColor: "var(--border)" }}
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor = "var(--accent)";
									e.currentTarget.style.backgroundColor = "var(--surface-strong)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor = "var(--border)";
									e.currentTarget.style.backgroundColor = "transparent";
								}}
							>
								<AlertTriangle
									className="w-8 h-8 mb-2"
									style={{ color: "var(--muted)" }}
								/>
								<span
									className="text-sm font-medium"
									style={{ color: "var(--accent)" }}
								>
									Dispute Resolution
								</span>
							</Link>
							<Link
								to="/admin/products"
								className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg transition-colors"
								style={{ borderColor: "var(--border)" }}
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor = "var(--accent)";
									e.currentTarget.style.backgroundColor = "var(--surface-strong)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor = "var(--border)";
									e.currentTarget.style.backgroundColor = "transparent";
								}}
							>
								<Package className="w-8 h-8 mb-2" style={{ color: "var(--muted)" }} />
								<span
									className="text-sm font-medium"
									style={{ color: "var(--accent)" }}
								>
									Product Moderation
								</span>
							</Link>
							<Link
								to="/admin/commission"
								className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg transition-colors"
								style={{ borderColor: "var(--border)" }}
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor = "var(--accent)";
									e.currentTarget.style.backgroundColor = "var(--surface-strong)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor = "var(--border)";
									e.currentTarget.style.backgroundColor = "transparent";
								}}
							>
								<Settings className="w-8 h-8 mb-2" style={{ color: "var(--muted)" }} />
								<span
									className="text-sm font-medium"
									style={{ color: "var(--accent)" }}
								>
									Commission Settings
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Platform Health */}
			<div
				className="shadow rounded-lg"
				style={{ backgroundColor: "var(--surface-strong)" }}
			>
				<div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
					<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
						Platform Health
					</h3>
				</div>
				<div className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">99.9%</div>
							<div className="text-sm text-gray-600">Uptime</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">2.3s</div>
							<div className="text-sm text-gray-600">Avg Response Time</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-600">4.8/5</div>
							<div className="text-sm text-gray-600">Platform Rating</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
