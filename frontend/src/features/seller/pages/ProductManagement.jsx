import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Edit2, Trash2 } from "lucide-react";
import Footer from "../../../components/layout/Footer";

const ProductManagement = () => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		const mockProducts = [
			{
				id: 1,
				name: 'MacBook Pro 16"',
				sku: "MBP-16",
				price: 1299.0,
				stock: 45,
				status: "active",
				category: "Laptops",
			},
			{
				id: 2,
				name: "Dell XPS 13",
				sku: "XPS-13",
				price: 1049.0,
				stock: 23,
				status: "active",
				category: "Laptops",
			},
			{
				id: 3,
				name: "USB-C Cable",
				sku: "USBC-003",
				price: 9.99,
				stock: 0,
				status: "inactive",
				category: "Accessories",
			},
			{
				id: 4,
				name: "Phone Case",
				sku: "CASE-004",
				price: 19.99,
				stock: 67,
				status: "active",
				category: "Accessories",
			},
			{
				id: 5,
				name: "Laptop Charger",
				sku: "LAP-CHG",
				price: 39.99,
				stock: 15,
				status: "pending",
				category: "Accessories",
			},
		];
		setProducts(mockProducts);
	}, []);

	const filteredProducts = products.filter((p) => {
		const matchFilter = filter === "all" || p.status === filter;
		const matchSearch =
			p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			p.sku.includes(searchTerm);
		return matchFilter && matchSearch;
	});

	const getStatusColor = (status) => {
		const colors = {
			active: "bg-green-100 text-green-800",
			pending: "bg-yellow-100 text-yellow-800",
			inactive: "bg-red-100 text-red-800",
		};
		return colors[status] || "bg-gray-100 text-gray-800";
	};

	const submitForReview = (productId) => {
		setProducts((prev) =>
			prev.map((product) =>
				product.id === productId ? { ...product, status: "pending" } : product
			),
		);
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
							Products
						</h1>
						<Link
							to="/seller/products/new"
							className="px-4 py-2 rounded-lg text-white font-semibold inline-flex items-center"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Add Product
						</Link>
					</div>

					<div className="mb-8 flex gap-4">
						<div className="flex-1 relative">
							<Search
								className="absolute left-3 top-3 w-5 h-5"
								style={{ color: "var(--muted)" }}
							/>
							<input
								type="text"
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full rounded-lg pl-10 pr-4 py-2 border"
								style={{
									backgroundColor: "var(--surface)",
									borderColor: "var(--border)",
									color: "var(--ink)",
								}}
							/>
						</div>
						<select
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
							className="rounded-lg px-4 py-2 border"
							style={{
								backgroundColor: "var(--surface)",
								borderColor: "var(--border)",
								color: "var(--ink)",
							}}
						>
							<option value="all">All</option>
							<option value="active">Active</option>
							<option value="pending">Pending</option>
							<option value="inactive">Inactive</option>
						</select>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Total Products
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent)" }}
							>
								{products.length}
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Active
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent)" }}
							>
								{products.filter((p) => p.status === "active").length}
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Pending
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent-secondary)" }}
							>
								{products.filter((p) => p.status === "pending").length}
							</p>
						</div>
						<div
							className="border p-6 rounded-lg"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Total Stock
							</p>
							<p
								className="text-3xl font-bold mt-2"
								style={{ color: "var(--accent)" }}
							>
								{products.reduce((sum, p) => sum + p.stock, 0)}
							</p>
						</div>
					</div>

					<div
						className="border rounded-lg overflow-hidden"
						style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
					>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead
									style={{
										backgroundColor: "var(--surface-strong)",
										borderBottomColor: "var(--border)",
										borderBottomWidth: "1px",
									}}
								>
									<tr>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Product
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											SKU
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Category
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Price
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Stock
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Status
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Moderation
										</th>
										<th
											className="text-left py-4 px-6 font-medium"
											style={{ color: "var(--muted)" }}
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredProducts.map((product) => (
										<tr
											key={product.id}
											className="transition"
											style={{
												borderBottomColor: "var(--border)",
												borderBottomWidth: "1px",
											}}
										>
											<td
												className="py-4 px-6 font-medium"
												style={{ color: "var(--ink)" }}
											>
												{product.name}
											</td>
											<td className="py-4 px-6" style={{ color: "var(--muted)" }}>
												{product.sku}
											</td>
											<td className="py-4 px-6" style={{ color: "var(--muted)" }}>
												{product.category}
											</td>
											<td
												className="py-4 px-6 font-semibold"
												style={{ color: "var(--ink)" }}
											>
												${product.price}
											</td>
											<td className="py-4 px-6" style={{ color: "var(--ink)" }}>
												{product.stock} units
											</td>
											<td className="py-4 px-6">
												<span
													className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
												>
													{product.status}
												</span>
											</td>
											<td className="py-4 px-6 text-sm" style={{ color: "var(--muted)" }}>
												{product.status === "pending"
													? "Awaiting review"
													: product.status === "inactive"
														? "Not submitted"
														: "Approved"}
											</td>
											<td className="py-4 px-6 flex gap-2">
												{product.status === "inactive" && (
													<button
														onClick={() => submitForReview(product.id)}
														className="px-2 py-1 rounded text-xs font-semibold"
														style={{ backgroundColor: "var(--accent-secondary)", color: "var(--surface)" }}
													>
														Submit for Review
													</button>
												)}
												<button style={{ color: "var(--accent)" }}>
													<Edit2 className="w-4 h-4" />
												</button>
												<button style={{ color: "var(--accent-secondary-strong)" }}>
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
			</main>
		</div>
	);
};

export default ProductManagement;
