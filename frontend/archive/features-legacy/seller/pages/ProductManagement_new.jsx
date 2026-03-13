import { Search, Plus, Filter, Edit2, Trash2, Eye } from "lucide-react";
import Footer from "../../../components/layout/Footer";

const ProductManagement = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const products = [
		{
			id: 1,
			name: 'MacBook Pro 16"',
			sku: "MBP-16",
			price: "$1,299",
			stock: 45,
			status: "active",
			category: "Laptops",
		},
		{
			id: 2,
			name: "Dell XPS 13",
			sku: "XPS-13",
			price: "$1,049",
			stock: 23,
			status: "active",
			category: "Laptops",
		},
		{
			id: 3,
			name: "USB-C Cable",
			sku: "USBC-003",
			price: "$9.99",
			stock: 0,
			status: "inactive",
			category: "Accessories",
		},
		{
			id: 4,
			name: "Phone Case",
			sku: "CASE-004",
			price: "$19.99",
			stock: 67,
			status: "active",
			category: "Accessories",
		},
		{
			id: 5,
			name: "Laptop Charger",
			sku: "LAP-CHG",
			price: "$39.99",
			stock: 156,
			status: "active",
			category: "Accessories",
		},
	];

	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "bg-green-900 text-green-200";
			case "inactive":
				return "bg-red-900 text-red-200";
			case "pending":
				return "bg-yellow-900 text-yellow-200";
			default:
				return "bg-gray-700 text-gray-200";
		}
	};

	return (
		<div className="bg-gray-900 min-h-screen text-white">
			<div className="p-8">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-4xl font-bold mb-2">Products</h1>
						<p className="text-gray-400">Manage your product inventory</p>
					</div>
					<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition">
						<Plus className="w-5 h-5" /> Add Product
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
						<p className="text-gray-400 text-sm mb-2">Total Products</p>
						<p className="text-3xl font-bold">{products.length}</p>
					</div>
					<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
						<p className="text-gray-400 text-sm mb-2">Active</p>
						<p className="text-3xl font-bold text-green-400">
							{products.filter((p) => p.status === "active").length}
						</p>
					</div>
					<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
						<p className="text-gray-400 text-sm mb-2">Low Stock</p>
						<p className="text-3xl font-bold text-yellow-400">
							{products.filter((p) => p.stock < 20).length}
						</p>
					</div>
					<div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
						<p className="text-gray-400 text-sm mb-2">Out of Stock</p>
						<p className="text-3xl font-bold text-red-400">
							{products.filter((p) => p.stock === 0).length}
						</p>
					</div>
				</div>

				<div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
					<div className="flex gap-4 mb-6">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
							<input
								type="text"
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
						>
							<Filter className="w-4 h-4" />
							<option value="all">All Status</option>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
							<option value="pending">Pending</option>
						</select>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="border-b border-zinc-800">
								<tr className="text-gray-400 text-xs font-semibold">
									<th className="text-left py-3 px-4">Product</th>
									<th className="text-left py-3 px-4">SKU</th>
									<th className="text-left py-3 px-4">Category</th>
									<th className="text-left py-3 px-4">Price</th>
									<th className="text-left py-3 px-4">Stock</th>
									<th className="text-left py-3 px-4">Status</th>
									<th className="text-left py-3 px-4">Actions</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr
										key={product.id}
										className="border-b border-zinc-800 hover:bg-gray-800/50"
									>
										<td className="py-4 px-4 font-medium">{product.name}</td>
										<td className="py-4 px-4 text-gray-400">{product.sku}</td>
										<td className="py-4 px-4">{product.category}</td>
										<td className="py-4 px-4 font-semibold">{product.price}</td>
										<td className="py-4 px-4">{product.stock} units</td>
										<td className="py-4 px-4">
											<span
												className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}
											>
												{product.status}
											</span>
										</td>
										<td className="py-4 px-4 flex gap-2">
											<button className="p-1 hover:bg-gray-700 rounded transition">
												<Eye className="w-4 h-4" />
											</button>
											<button className="p-1 hover:bg-gray-700 rounded transition">
												<Edit2 className="w-4 h-4" />
											</button>
											<button className="p-1 hover:bg-red-900/30 rounded transition text-red-400">
												<Trash2 className="w-4 h-4" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ProductManagement;
