import { useState, useEffect } from "react";
import { DollarSign, Package, Store, Users, TrendingUp } from "lucide-react";

const PlatformAnalytics = () => {
	const [timeRange, setTimeRange] = useState("30d");
	const [analyticsData, setAnalyticsData] = useState({
		overview: {
			totalRevenue: 0,
			totalOrders: 0,
			activeSellers: 0,
			activeBuyers: 0,
			platformGrowth: 0,
		},
		revenueTrend: [],
		categoryPerformance: [],
		sellerPerformance: [],
		geographicData: [],
		marketplaceHealth: {
			disputeRate: 0,
			returnRate: 0,
			satisfactionScore: 0,
			fraudPrevention: 0,
		},
	});

	// Mock data - in real app this would come from API
	useEffect(() => {
		const mockData = {
			overview: {
				totalRevenue: 45678.9,
				totalOrders: 1234,
				activeSellers: 89,
				activeBuyers: 2156,
				platformGrowth: 24.5,
			},
			revenueTrend: [
				{ date: "2025-12-01", revenue: 1245.67, orders: 34 },
				{ date: "2025-12-02", revenue: 1189.34, orders: 31 },
				{ date: "2025-12-03", revenue: 1345.67, orders: 38 },
				{ date: "2025-12-04", revenue: 1456.78, orders: 41 },
				{ date: "2025-12-05", revenue: 1234.56, orders: 35 },
				{ date: "2025-12-06", revenue: 1567.89, orders: 45 },
				{ date: "2025-12-07", revenue: 1678.9, orders: 48 },
			],
			categoryPerformance: [
				{
					category: "Laptops",
					revenue: 23456.78,
					orders: 456,
					growth: 15.2,
				},
				{ category: "Phones", revenue: 12345.67, orders: 345, growth: 8.7 },
				{
					category: "Accessories",
					revenue: 8765.43,
					orders: 234,
					growth: 22.1,
				},
				{ category: "Gaming Laptops", revenue: 5432.1, orders: 156, growth: -3.2 },
				{ category: "Budget Phones", revenue: 3210.98, orders: 89, growth: 12.5 },
			],
			sellerPerformance: [
				{ name: "Nnamdi Tech Market", revenue: 3456.78, orders: 89, rating: 4.8 },
				{ name: "Adaeze Electronics", revenue: 2876.54, orders: 67, rating: 4.6 },
				{ name: "Chinedu Audio", revenue: 2134.56, orders: 45, rating: 4.9 },
				{ name: "Obinna Gadgets", revenue: 1876.43, orders: 38, rating: 4.4 },
				{ name: "Ugochi Digital", revenue: 1654.32, orders: 34, rating: 4.7 },
			],
			geographicData: [
				{ region: "North America", revenue: 23456.78, percentage: 51.3 },
				{ region: "Europe", revenue: 12345.67, percentage: 27.0 },
				{ region: "Phones", revenue: 8765.43, percentage: 19.2 },
				{ region: "Other", revenue: 1111.02, percentage: 2.5 },
			],
			marketplaceHealth: {
				disputeRate: 2.1,
				returnRate: 3.8,
				satisfactionScore: 4.6,
				fraudPrevention: 98.5,
			},
		};
		setAnalyticsData(mockData);
	}, [timeRange]);

	const formatCurrency = (amount) => `$${amount.toLocaleString()}`;
	const formatPercentage = (value) => `${value.toFixed(1)}%`;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Platform Analytics
				</h1>
				<div className="flex items-center space-x-4">
					<select
						value={timeRange}
						onChange={(e) => setTimeRange(e.target.value)}
						className="px-3 py-2 border rounded-md"
						style={{ borderColor: "var(--border)" }}
					>
						<option value="7d">Last 7 days</option>
						<option value="30d">Last 30 days</option>
						<option value="90d">Last 90 days</option>
						<option value="1y">Last year</option>
					</select>
					<button
						className="text-white px-4 py-2 rounded-md"
						style={{ backgroundColor: "var(--accent-secondary)" }}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
					>
						Export Report
					</button>
				</div>
			</div>

			{/* Overview Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Platform Revenue</p>
							<p className="text-2xl font-bold text-gray-900">
								{formatCurrency(analyticsData.overview.totalRevenue)}
							</p>
						</div>
						<DollarSign className="w-7 h-7 text-green-600" />
					</div>
					<div className="mt-4 flex items-center">
						<span className="text-green-600 text-sm">Up +18.2%</span>
						<span className="text-gray-500 text-sm ml-2">vs last period</span>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Total Orders</p>
							<p className="text-2xl font-bold text-gray-900">
								{analyticsData.overview.totalOrders.toLocaleString()}
							</p>
						</div>
						<Package className="w-7 h-7 text-blue-600" />
					</div>
					<div className="mt-4 flex items-center">
						<span className="text-green-600 text-sm">Up +15.7%</span>
						<span className="text-gray-500 text-sm ml-2">vs last period</span>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Active Sellers</p>
							<p className="text-2xl font-bold text-gray-900">
								{analyticsData.overview.activeSellers}
							</p>
						</div>
						<Store className="w-7 h-7 text-purple-600" />
					</div>
					<div className="mt-4 flex items-center">
						<span className="text-green-600 text-sm">Up +12.3%</span>
						<span className="text-gray-500 text-sm ml-2">vs last period</span>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Active Buyers</p>
							<p className="text-2xl font-bold text-gray-900">
								{analyticsData.overview.activeBuyers.toLocaleString()}
							</p>
						</div>
						<Users className="w-7 h-7 text-orange-600" />
					</div>
					<div className="mt-4 flex items-center">
						<span className="text-green-600 text-sm">Up +24.5%</span>
						<span className="text-gray-500 text-sm ml-2">vs last period</span>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Platform Growth</p>
							<p className="text-2xl font-bold text-gray-900">
								{formatPercentage(analyticsData.overview.platformGrowth)}
							</p>
						</div>
						<TrendingUp className="w-7 h-7 text-indigo-600" />
					</div>
					<div className="mt-4 flex items-center">
						<span className="text-green-600 text-sm">Up +8.1%</span>
						<span className="text-gray-500 text-sm ml-2">monthly growth</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Revenue Trend */}
				<div className="bg-white shadow rounded-lg">
					<div
						className="px-6 py-4 border-b"
						style={{ borderColor: "var(--border)" }}
					>
						<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
							Revenue Trend
						</h3>
					</div>
					<div className="p-6">
						<div className="h-64 flex items-end space-x-1">
							{analyticsData.revenueTrend.map((day, index) => (
								<div key={index} className="flex-1 flex flex-col items-center">
									<div
										className="bg-green-600 rounded-t w-full"
										style={{ height: `${(day.revenue / 1800) * 200}px` }}
									></div>
									<div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
										{new Date(day.date).toLocaleDateString([], {
											month: "short",
											day: "numeric",
										})}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Category Performance */}
				<div className="bg-white shadow rounded-lg">
					<div
						className="px-6 py-4 border-b"
						style={{ borderColor: "var(--border)" }}
					>
						<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
							Category Performance
						</h3>
					</div>
					<div className="p-6">
						<div className="space-y-4">
							{analyticsData.categoryPerformance.map((category, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex-1">
										<div className="font-medium text-gray-900">
											{category.category}
										</div>
										<div className="text-sm text-gray-500">
											{category.orders} orders -{" "}
											{formatCurrency(category.revenue)}
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<div
											className={`text-sm font-medium ${category.growth > 0 ? "text-green-600" : "text-red-600"}`}
										>
											{category.growth > 0 ? "Up" : "Down"}{" "}
											{formatPercentage(Math.abs(category.growth))}
										</div>
										<div className="w-16 bg-gray-200 rounded-full h-2">
											<div
												className="bg-blue-600 h-2 rounded-full"
												style={{
													width: `${(category.revenue / 25000) * 100}%`,
												}}
											></div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Top Sellers */}
				<div className="bg-white shadow rounded-lg">
					<div
						className="px-6 py-4 border-b"
						style={{ borderColor: "var(--border)" }}
					>
						<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
							Top Performing Sellers
						</h3>
					</div>
					<div className="p-6">
						<div className="space-y-4">
							{analyticsData.sellerPerformance.map((seller, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="text-lg mr-3">#{index + 1}</div>
										<div>
											<div className="font-medium text-gray-900">
												{seller.name}
											</div>
											<div className="text-sm text-gray-500">
												{seller.orders} orders - Rating {seller.rating}
											</div>
										</div>
									</div>
									<div className="text-right">
										<div className="font-medium text-gray-900">
											{formatCurrency(seller.revenue)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Geographic Distribution */}
				<div className="bg-white shadow rounded-lg">
					<div
						className="px-6 py-4 border-b"
						style={{ borderColor: "var(--border)" }}
					>
						<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
							Revenue by Region
						</h3>
					</div>
					<div className="p-6">
						<div className="space-y-4">
							{analyticsData.geographicData.map((region, index) => (
								<div key={index}>
									<div className="flex justify-between items-center mb-2">
										<span className="font-medium text-gray-900">
											{region.region}
										</span>
										<span className="text-sm text-gray-600">
											{formatPercentage(region.percentage)}
										</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-3">
										<div
											className="bg-purple-600 h-3 rounded-full"
											style={{ width: `${region.percentage}%` }}
										></div>
									</div>
									<div className="text-sm text-gray-600 mt-1">
										{formatCurrency(region.revenue)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Marketplace Health */}
				<div className="bg-white shadow rounded-lg">
					<div
						className="px-6 py-4 border-b"
						style={{ borderColor: "var(--border)" }}
					>
						<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
							Marketplace Health
						</h3>
					</div>
					<div className="p-6">
						<div className="space-y-6">
							<div>
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm text-gray-700">Dispute Rate</span>
									<span className="text-sm font-medium">
										{formatPercentage(
											analyticsData.marketplaceHealth.disputeRate,
										)}
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-red-600 h-2 rounded-full"
										style={{ width: "21%" }}
									></div>
								</div>
							</div>

							<div>
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm text-gray-700">Return Rate</span>
									<span className="text-sm font-medium">
										{formatPercentage(
											analyticsData.marketplaceHealth.returnRate,
										)}
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-yellow-600 h-2 rounded-full"
										style={{ width: "38%" }}
									></div>
								</div>
							</div>

							<div>
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm text-gray-700">
										Customer Satisfaction
									</span>
									<span className="text-sm font-medium">
										Rating {analyticsData.marketplaceHealth.satisfactionScore}/5
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-green-600 h-2 rounded-full"
										style={{ width: "92%" }}
									></div>
								</div>
							</div>

							<div>
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm text-gray-700">
										Fraud Prevention
									</span>
									<span className="text-sm font-medium">
										{formatPercentage(
											analyticsData.marketplaceHealth.fraudPrevention,
										)}
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-blue-600 h-2 rounded-full"
										style={{ width: "98.5%" }}
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Key Insights */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div
					className="border rounded-lg p-6"
					style={{ backgroundColor: "var(--surface-accent)", borderColor: "var(--border)" }}
				>
					<h3 className="text-lg font-medium mb-3" style={{ color: "#ffffff" }}>
						Key Opportunities
					</h3>
					<ul className="space-y-2 text-sm" style={{ color: "#ffffff" }}>
						<li>
							- <strong>Laptops</strong> category growing 22.1% - expand
							inventory
						</li>
						<li>
							- <strong>Phones</strong> region shows strong potential for
							expansion
						</li>
						<li>
							- Top 5 sellers generate 68% of revenue - focus on high-performers
						</li>
						<li>
							- Customer satisfaction at 4.6/5 - excellent foundation for growth
						</li>
					</ul>
				</div>

				<div
					className="border rounded-lg p-6"
					style={{ backgroundColor: "var(--surface-accent)", borderColor: "var(--border)" }}
				>
					<h3 className="text-lg font-medium mb-3" style={{ color: "#ffffff" }}>
						Areas for Attention
					</h3>
					<ul className="space-y-2 text-sm" style={{ color: "#ffffff" }}>
						<li>
							- <strong>Budget phones</strong> declining 3.2% - investigate
							market changes
						</li>
						<li>
							- Dispute rate at 2.1% - monitor and address seller education
						</li>
						<li>
							- Return rate of 3.8% - review product quality and descriptions
						</li>
						<li>
							- 24 pending seller applications - accelerate onboarding process
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default PlatformAnalytics;

