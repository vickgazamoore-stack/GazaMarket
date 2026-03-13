import React, { useState } from "react";
import { TrendingUp, BarChart3, Calendar } from "lucide-react";
import Footer from "../../../components/layout/Footer.jsx";

const SellerAnalytics = () => {
	const [timeRange, setTimeRange] = useState("30d");
	const analyticsData = {
		overview: {
			totalRevenue: 3456.78,
			totalOrders: 89,
			avgOrderValue: 38.84,
			conversionRate: 3.2,
		},
		salesTrend: [
			{ date: "2024-01-01", revenue: 245.67, orders: 6 },
			{ date: "2024-01-02", revenue: 189.34, orders: 5 },
			{ date: "2024-01-03", revenue: 312.45, orders: 8 },
			{ date: "2024-01-04", revenue: 278.9, orders: 7 },
			{ date: "2024-01-05", revenue: 345.67, orders: 9 },
		],
		topProducts: [
			{
				name: 'MacBook Pro 16"',
				revenue: 1234.56,
				orders: 34,
				growth: 12.5,
			},
			{ name: "Dell XPS 13", revenue: 987.43, orders: 28, growth: 8.3 },
			{ name: "iPhone 15 Pro", revenue: 654.32, orders: 19, growth: -2.1 },
			{ name: "Samsung Galaxy S24", revenue: 543.21, orders: 15, growth: 15.7 },
		],
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
							Analytics
						</h1>
						<div className="flex gap-2">
							<Calendar className="w-5 h-5" style={{ color: "var(--muted)" }} />
							<select
								value={timeRange}
								onChange={(e) => setTimeRange(e.target.value)}
								className="rounded-lg px-4 py-2 border"
								style={{
									backgroundColor: "var(--surface)",
									borderColor: "var(--border)",
									color: "var(--ink)",
								}}
							>
								<option value="7d">Last 7 days</option>
								<option value="30d">Last 30 days</option>
								<option value="90d">Last 90 days</option>
								<option value="1y">Last year</option>
							</select>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Total Revenue
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent)" }}
							>
								${analyticsData.overview.totalRevenue}
							</p>
							<p className="text-xs mt-2" style={{ color: "var(--accent)" }}>
								Up 12.5% vs last period
							</p>
						</div>
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
								{analyticsData.overview.totalOrders}
							</p>
							<p className="text-xs mt-2" style={{ color: "var(--accent)" }}>
								Up 8.2% vs last period
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Avg Order Value
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent)" }}
							>
								${analyticsData.overview.avgOrderValue}
							</p>
							<p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
								Per transaction
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Conversion Rate
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent)" }}
							>
								{analyticsData.overview.conversionRate}%
							</p>
							<p className="text-xs mt-2" style={{ color: "var(--accent)" }}>
								Up 2.1% vs last period
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<div className="flex items-center gap-2 mb-4">
								<BarChart3 className="w-5 h-5" style={{ color: "var(--accent)" }} />
								<h3
									className="text-lg font-semibold"
									style={{ color: "var(--accent)" }}
								>
									Sales Trend
								</h3>
							</div>
							<div className="space-y-3">
								{analyticsData.salesTrend.map((day, idx) => (
									<div key={idx} className="flex items-center justify-between">
										<span className="text-sm" style={{ color: "var(--muted)" }}>
											{day.date}
										</span>
										<div
											className="flex-1 mx-4 rounded h-2 relative"
											style={{ backgroundColor: "var(--border)" }}
										>
											<div
												className="rounded h-2"
												style={{
													width: `${(day.revenue / 350) * 100}%`,
													backgroundColor: "var(--accent-secondary)",
												}}
											></div>
										</div>
										<span
											className="text-right w-20"
											style={{ color: "var(--ink)" }}
										>
											${day.revenue}
										</span>
									</div>
								))}
							</div>
						</div>

						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<div className="flex items-center gap-2 mb-4">
								<TrendingUp className="w-5 h-5" style={{ color: "var(--accent)" }} />
								<h3
									className="text-lg font-semibold"
									style={{ color: "var(--accent)" }}
								>
									Top Products
								</h3>
							</div>
							<div className="space-y-3">
								{analyticsData.topProducts.map((product, idx) => (
									<div
										key={idx}
										className="pb-3 last:border-b-0"
										style={{
											borderBottomColor: "var(--border)",
											borderBottomWidth: "1px",
										}}
									>
										<div className="flex justify-between mb-1">
											<span
												className="text-sm font-medium"
												style={{ color: "var(--ink)" }}
											>
												{product.name}
											</span>
											<span
												className="text-xs"
												style={{
													color: product.growth > 0 ? "var(--accent)" : "var(--accent-secondary-strong)",
												}}
											>
												{product.growth > 0 ? "Up" : "Down"}{" "}
												{Math.abs(product.growth)}%
											</span>
										</div>
										<p className="text-xs" style={{ color: "var(--muted)" }}>
											{product.orders} orders - ${product.revenue}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default SellerAnalytics;

