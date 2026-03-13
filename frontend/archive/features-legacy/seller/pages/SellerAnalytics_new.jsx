import { useState } from "react";
import {
	LineChart,
	BarChart3,
	TrendingUp,
	Calendar,
	Download,
} from "lucide-react";
import Footer from "../../../components/layout/Footer";

const SellerAnalytics = () => {
	const [dateRange, setDateRange] = useState("30days");

	const metrics = [
		{
			label: "Total Revenue",
			value: "$12,450.80",
			change: "+15.2%",
			icon: TrendingUp,
			color: "text-green-400",
		},
		{
			label: "Orders",
			value: "347",
			change: "+8.2%",
			icon: BarChart3,
			color: "text-blue-400",
		},
		{
			label: "Avg Order Value",
			value: "$35.88",
			change: "+2.1%",
			icon: LineChart,
			color: "text-purple-400",
		},
		{
			label: "Conversion Rate",
			value: "3.2%",
			change: "+0.5%",
			icon: TrendingUp,
			color: "text-orange-400",
		},
	];

	const salesData = [
		{ day: "Mon", sales: 2400 },
		{ day: "Tue", sales: 3200 },
		{ day: "Wed", sales: 2800 },
		{ day: "Thu", sales: 3900 },
		{ day: "Fri", sales: 4200 },
		{ day: "Sat", sales: 3800 },
		{ day: "Sun", sales: 4500 },
	];

	const topProducts = [
		{ name: 'MacBook Pro 16"', sales: 245, revenue: "$21,990.50" },
		{ name: "Dell XPS 13", sales: 189, revenue: "$3,781.11" },
		{ name: "iPhone 15 Pro", sales: 412, revenue: "$2,059.88" },
		{ name: "Samsung Galaxy S24", sales: 156, revenue: "$1,559.44" },
	];

	return (
		<div className="bg-gray-900 min-h-screen text-white">
			<div className="p-8">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-4xl font-bold mb-2">Analytics</h1>
						<p className="text-gray-400">Track your sales performance</p>
					</div>
					<div className="flex gap-4">
						<select
							value={dateRange}
							onChange={(e) => setDateRange(e.target.value)}
							className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="7days">Last 7 Days</option>
							<option value="30days">Last 30 Days</option>
							<option value="90days">Last 90 Days</option>
							<option value="year">This Year</option>
						</select>
						<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
							<Download className="w-4 h-4" /> Export
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{metrics.map((metric, idx) => {
						const Icon = metric.icon;
						return (
							<div
								key={idx}
								className="bg-zinc-900 rounded-lg p-6 border border-zinc-800"
							>
								<div className="flex justify-between items-start mb-4">
									<div className="p-2 bg-gray-800 rounded-lg">
										<Icon className={`${metric.color} w-6 h-6`} />
									</div>
									<span className="text-green-400 text-sm font-semibold">
										{metric.change}
									</span>
								</div>
								<p className="text-gray-400 text-sm mb-1">{metric.label}</p>
								<p className="text-3xl font-bold">{metric.value}</p>
							</div>
						);
					})}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 bg-zinc-900 rounded-lg border border-zinc-800 p-6">
						<h2 className="text-xl font-bold mb-6">Sales Trend</h2>
						<div className="h-64 bg-gray-800 rounded-lg flex items-end justify-center gap-2 p-4">
							{salesData.map((d, idx) => (
								<div key={idx} className="flex flex-col items-center flex-1">
									<div
										className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
										style={{ height: `${(d.sales / 5000) * 200}px` }}
									></div>
									<p className="text-xs text-gray-400 mt-2">{d.day}</p>
								</div>
							))}
						</div>
						<div className="mt-4 text-sm text-gray-400">
							<p>Average Daily Sales: $3,557.14</p>
						</div>
					</div>

					<div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
						<h2 className="text-xl font-bold mb-6">Top Products</h2>
						<div className="space-y-4">
							{topProducts.map((product, idx) => (
								<div
									key={idx}
									className="border-b border-zinc-800 pb-4 last:border-0"
								>
									<div className="flex justify-between items-start mb-2">
										<h4 className="font-semibold text-sm">{product.name}</h4>
										<span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">
											{product.sales} sales
										</span>
									</div>
									<p className="text-gray-400 text-sm">{product.revenue}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-8 bg-zinc-900 rounded-lg border border-zinc-800 p-6">
					<h2 className="text-xl font-bold mb-6">Category Performance</h2>
					<div className="space-y-4">
						<div>
							<div className="flex justify-between mb-2">
								<span>Laptops</span>
								<span>$8,250 (66%)</span>
							</div>
							<div className="w-full bg-gray-800 rounded-full h-2">
								<div
									className="bg-blue-600 h-2 rounded-full"
									style={{ width: "66%" }}
								></div>
							</div>
						</div>
						<div>
							<div className="flex justify-between mb-2">
								<span>Phones</span>
								<span>$4,200 (34%)</span>
							</div>
							<div className="w-full bg-gray-800 rounded-full h-2">
								<div
									className="bg-purple-600 h-2 rounded-full"
									style={{ width: "34%" }}
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SellerAnalytics;
