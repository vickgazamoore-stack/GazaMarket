import { useState, useEffect } from "react";
import { Search, Filter, Plus, Edit3, Trash2, Eye } from "lucide-react";
import Footer from "../../../components/layout/Footer";

export default function ProductManagement() {
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		setProducts([
			{
				id: 1,
				name: 'MacBook Pro 16"',
				sku: "MBP-16",
				price: 1299.0,
				stock: 45,
				status: "active",
				category: "Laptops",
				sales: 128,
			},
			{
				id: 2,
				name: "Dell XPS 13",
				sku: "XPS-13",
				price: 1049.0,
				stock: 23,
				status: "active",
				category: "Laptops",
				sales: 87,
			},
			{
				id: 3,
				name: "USB-C Cable",
				sku: "USBC-003",
				price: 12.99,
				stock: 0,
				status: "out_of_stock",
				category: "Accessories",
				sales: 342,
			},
			{
				id: 4,
				name: "Phone Case",
				sku: "CASE-004",
				price: 19.99,
				stock: 67,
				status: "pending",
				category: "Accessories",
				sales: 0,
			},
			{
				id: 5,
				name: "Laptop Charger",
				sku: "LAP-CHG",
				price: 39.99,
				stock: 12,
				status: "active",
				category: "Accessories",
				sales: 45,
			},
			{
				id: 6,
				name: "Screen Protector",
				sku: "SCR-006",
				price: 12.99,
				stock: 156,
				status: "active",
				category: "Accessories",
				sales: 521,
			},
		]);
	}, []);

	const filteredProducts = products.filter((product) => {
		const matchesFilter = filter === "all" || product.status === filter;
		const matchesSearch =
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.sku.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesFilter && matchesSearch;
	});

	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "bg-green-900 text-green-300";
			case "pending":
				return "bg-yellow-900 text-yellow-300";
			case "out_of_stock":
				return "bg-red-900 text-red-300";
			default:
				return "bg-gray-700 text-gray-300";
		}
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			setProducts(products.filter((p) => p.id !== id));
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col">
			<div className="flex-grow p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex justify-between items-center mb-8">
						<div>
							<h1 className="text-4xl font-bold">Product Management</h1>
							<p className="text-gray-400 mt-2">
								Manage your products and inventory
							</p>
						</div>
						<button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition">
							<Plus className="w-4 h-4" />
							Add Product
						</button>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-4 gap-6 mb-8">
						<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
							<p className="text-gray-400 text-sm">Total Products</p>
							<p className="text-3xl font-bold mt-2">{products.length}</p>
						</div>
						<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
							<p className="text-gray-400 text-sm">Active</p>
							<p className="text-3xl font-bold mt-2 text-green-400">
								{products.filter((p) => p.status === "active").length}
							</p>
						</div>
						<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
							<p className="text-gray-400 text-sm">Pending Review</p>
							<p className="text-3xl font-bold mt-2 text-yellow-400">
								{products.filter((p) => p.status === "pending").length}
							</p>
						</div>
						<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
							<p className="text-gray-400 text-sm">Out of Stock</p>
							<p className="text-3xl font-bold mt-2 text-red-400">
								{products.filter((p) => p.status === "out_of_stock").length}
							</p>
						</div>
					</div>

					{/* Filters & Search */}
					<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-6">
						<div className="flex gap-4 items-center">
							<div className="flex-1 relative">
								<Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
								<input
									type="text"
									placeholder="Search products by name or SKU..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 pl-10 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none"
								/>
							</div>
							<div className="flex items-center gap-2">
								<Filter className="w-5 h-5 text-gray-400" />
								<select
									value={filter}
									onChange={(e) => setFilter(e.target.value)}
									className="bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white focus:border-blue-600 focus:outline-none"
								>
									<option value="all">All Products</option>
									<option value="active">Active</option>
									<option value="pending">Pending Review</option>
									<option value="out_of_stock">Out of Stock</option>
								</select>
							</div>
						</div>
					</div>

					{/* Products Table */}
					<div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-800">
									<tr>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Product
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											SKU
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Price
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Stock
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Sales
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Status
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-zinc-800">
									{filteredProducts.map((product) => (
										<tr
											key={product.id}
											className="hover:bg-gray-800/50 transition"
										>
											<td className="px-6 py-4">
												<div>
													<p className="font-semibold text-white">
														{product.name}
													</p>
													<p className="text-sm text-gray-500">
														{product.category}
													</p>
												</div>
											</td>
											<td className="px-6 py-4 text-gray-400">{product.sku}</td>
											<td className="px-6 py-4">
												<p className="font-semibold text-white">
													${product.price.toFixed(2)}
												</p>
											</td>
											<td className="px-6 py-4">
												<p
													className={
														product.stock === 0 ? "text-red-400" : "text-white"
													}
												>
													{product.stock} units
												</p>
											</td>
											<td className="px-6 py-4 text-gray-400">
												{product.sales}
											</td>
											<td className="px-6 py-4">
												<span
													className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
												>
													{product.status.replace("_", " ")}
												</span>
											</td>
											<td className="px-6 py-4">
												<div className="flex gap-3">
													<button className="text-gray-400 hover:text-blue-400 transition">
														<Eye className="w-4 h-4" />
													</button>
													<button className="text-gray-400 hover:text-blue-400 transition">
														<Edit3 className="w-4 h-4" />
													</button>
													<button
														onClick={() => handleDelete(product.id)}
														className="text-gray-400 hover:text-red-400 transition"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{filteredProducts.length === 0 && (
							<div className="px-6 py-12 text-center">
								<p className="text-gray-400 text-lg">No products found</p>
								<p className="text-gray-500 text-sm mt-2">
									{searchTerm
										? "Try adjusting your search"
										: "Add your first product to get started"}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
