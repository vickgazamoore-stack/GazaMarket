import { useState } from "react";
import {
	Users,
	Package,
	AlertTriangle,
	TrendingUp,
	Activity,
	BarChart3,
} from "lucide-react";
import Footer from "../../../components/layout/Footer";

const AdminDashboard = () => {
	const stats = [
		{
			label: "Total Revenue",
			value: "$487,200",
			change: "+24.5%",
			icon: TrendingUp,
			color: "text-green-400",
		},
		{
			label: "Total Orders",
			value: "8,243",
			change: "+15.2%",
			icon: Package,
			color: "text-blue-400",
		},
		{
			label: "Active Sellers",
			value: "324",
			change: "+8.1%",
			icon: Users,
			color: "text-purple-400",
		},
		{
			label: "Pending Disputes",
			value: "12",
			change: "-3.2%",
			icon: AlertTriangle,
			color: "text-red-400",
		},
	];

	const activityLog = [
		{
			id: 1,
			type: "seller_signup",
			user: "New Seller: Ahmed Electronics",
			timestamp: "2 mins ago",
			severity: "info",
		},
		{
			id: 2,
			type: "order_completed",
			user: "Order #ORD-2451 completed",
			timestamp: "15 mins ago",
			severity: "success",
		},
		{
			id: 3,
			type: "dispute_open",
			user: "Dispute #DSP-001 opened",
			timestamp: "1 hour ago",
			severity: "warning",
		},
		{
			id: 4,
			type: "payment",
			user: "Payment received: $5,450",
			timestamp: "2 hours ago",
			severity: "success",
		},
		{
			id: 5,
			type: "seller_verified",
			user: "Seller verified: Fatima Store",
			timestamp: "3 hours ago",
			severity: "info",
		},
		{
			id: 6,
			type: "product_flagged",
			user: "Product flagged for review",
			timestamp: "5 hours ago",
			severity: "warning",
		},
	];

	const alerts = [
		{
			id: 1,
			title: "High Dispute Rate",
			message: "Electronics category has 8% dispute rate",
			severity: "high",
			action: "Review",
		},
		{
			id: 2,
			title: "Pending Verifications",
			message: "23 sellers awaiting document verification",
			severity: "medium",
			action: "Process",
		},
		{
			id: 3,
			title: "System Performance",
			message: "Server load at 78% capacity",
			severity: "medium",
			action: "Monitor",
		},
	];

	const getSeverityColor = (severity) => {
		switch (severity) {
			case "high":
				return "bg-red-900 text-red-200 border-red-700";
			case "medium":
				return "bg-yellow-900 text-yellow-200 border-yellow-700";
			case "low":
				return "bg-green-900 text-green-200 border-green-700";
			default:
				return "bg-gray-700 text-gray-200";
		}
	};

	const getActivityIcon = (type) => {
		switch (type) {
			case "seller_signup":
				return "User";
			case "order_completed":
				return "OK";
			case "dispute_open":
				return "Alert";
			case "payment":
				return "Pay";
			case "seller_verified":
				return "OK";
			case "product_flagged":
				return "Flag";
			default:
				return "Pin";
		}
	};

	return (
		<div className="bg-gray-900 min-h-screen text-white">
			<div className="p-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
					<p className="text-gray-400">Platform overview and management</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{stats.map((stat, idx) => {
						const Icon = stat.icon;
						return (
							<div
								key={idx}
								className="bg-zinc-900 rounded-lg p-6 border border-zinc-800"
							>
								<div className="flex justify-between items-start mb-4">
									<div className="p-2 bg-gray-800 rounded-lg">
										<Icon className={`${stat.color} w-6 h-6`} />
									</div>
									<span
										className={`text-sm font-semibold ${stat.change.startsWith("+") OK "text-green-400" : "text-red-400"}`}
									>
										{stat.change}
									</span>
								</div>
								<p className="text-gray-400 text-sm mb-1">{stat.label}</p>
								<p className="text-3xl font-bold">{stat.value}</p>
							</div>
						);
					})}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
					<div className="lg:col-span-2 bg-zinc-900 rounded-lg border border-zinc-800 p-6">
						<h2 className="text-xl font-bold mb-6">Recent Activity</h2>
						<div className="space-y-3">
							{activityLog.map((log) => (
								<div
									key={log.id}
									className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition"
								>
									<div className="text-2xl">{getActivityIcon(log.type)}</div>
									<div className="flex-1">
										<p className="font-semibold text-sm">{log.user}</p>
										<p className="text-xs text-gray-400">{log.timestamp}</p>
									</div>
									<div
										className={`px-3 py-1 rounded-full text-xs font-semibold ${
											log.severity === "info"
												OK "bg-blue-900 text-blue-200"
												: log.severity === "success"
													OK "bg-green-900 text-green-200"
													: "bg-yellow-900 text-yellow-200"
										}`}
									>
										{log.severity}
									</div>
								</div>
							))}
						</div>
						<button className="mt-4 w-full px-4 py-2 border border-gray-700 hover:bg-gray-800 rounded-lg font-semibold transition">
							View Full Activity Log
						</button>
					</div>

					<div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
						<h2 className="text-xl font-bold mb-6">Critical Alerts</h2>
						<div className="space-y-3">
							{alerts.map((alert) => (
								<div
									key={alert.id}
									className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
								>
									<div className="flex justify-between items-start mb-2">
										<h4 className="font-semibold text-sm">{alert.title}</h4>
										<button className="text-xs hover:opacity-80">
											{alert.action}
										</button>
									</div>
									<p className="text-xs">{alert.message}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
						<h2 className="text-xl font-bold mb-6">Platform Metrics</h2>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between mb-2 text-sm">
									<span>Order Success Rate</span>
									<span className="font-semibold">96.8%</span>
								</div>
								<div className="w-full bg-gray-800 rounded-full h-2">
									<div
										className="bg-green-600 h-2 rounded-full"
										style={{ width: "96.8%" }}
									></div>
								</div>
							</div>
							<div>
								<div className="flex justify-between mb-2 text-sm">
									<span>Average Seller Rating</span>
									<span className="font-semibold">4.6/5.0</span>
								</div>
								<div className="w-full bg-gray-800 rounded-full h-2">
									<div
										className="bg-yellow-600 h-2 rounded-full"
										style={{ width: "92%" }}
									></div>
								</div>
							</div>
							<div>
								<div className="flex justify-between mb-2 text-sm">
									<span>Platform Uptime</span>
									<span className="font-semibold">99.9%</span>
								</div>
								<div className="w-full bg-gray-800 rounded-full h-2">
									<div
										className="bg-blue-600 h-2 rounded-full"
										style={{ width: "99.9%" }}
									></div>
								</div>
							</div>
							<div>
								<div className="flex justify-between mb-2 text-sm">
									<span>Payment Processing</span>
									<span className="font-semibold">$487.2K</span>
								</div>
								<div className="text-xs text-gray-400 mt-2">
									In the last 30 days
								</div>
							</div>
						</div>
					</div>

					<div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
						<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
							<BarChart3 className="w-5 h-5" /> Top Categories
						</h2>
						<div className="space-y-4">
							{[
								{ name: "Electronics", value: "$186,300", percent: 38.2 },
								{ name: "Laptops", value: "$142,800", percent: 29.3 },
								{ name: "Phones", value: "$96,900", percent: 19.9 },
								{ name: "Accessories", value: "$61,200", percent: 12.6 },
							].map((cat, idx) => (
								<div
									key={idx}
									className="border-b border-gray-700 pb-3 last:border-0"
								>
									<div className="flex justify-between items-center mb-2">
										<span className="font-semibold text-sm">{cat.name}</span>
										<span className="text-sm text-gray-400">{cat.value}</span>
									</div>
									<div className="w-full bg-gray-800 rounded-full h-1.5">
										<div
											className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full"
											style={{ width: `${cat.percent}%` }}
										></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AdminDashboard;
