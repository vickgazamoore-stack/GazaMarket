import { useState, useEffect } from "react";

const ProductModeration = () => {
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState("pending");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [moderationForm, setModerationForm] = useState({
		decision: "",
		reason: "",
		notes: "",
	});

	// Mock data - in real app this would come from API
	useEffect(() => {
		const mockProducts = [
			{
				id: 1,
				name: 'MacBook Pro 16"',
				description: "High-performance laptop with premium display and long battery life",
				price: 1299.0,
				category: "Laptops",
				seller: "Nnamdi Tech Market",
				sellerId: 1,
				status: "pending",
				submittedDate: "2026-01-12",
				images: ["macbook1.jpg", "macbook2.jpg"],
				tags: ["laptops", "apple", "pro"],
				violations: [],
				moderationNotes: "",
			},
			{
				id: 2,
				name: "Samsung Galaxy S24",
				description: "Flagship Android phone with advanced camera system",
				price: 899.0,
				category: "Phones",
				seller: "Adaeze Electronics",
				sellerId: 2,
				status: "pending",
				submittedDate: "2026-01-11",
				images: ["galaxy-s24-1.jpg"],
				tags: ["phones", "samsung", "android"],
				violations: [],
				moderationNotes: "",
			},
			{
				id: 3,
				name: "Prohibited Item",
				description: "This item violates platform policies",
				price: 50.0,
				category: "Miscellaneous",
				seller: "Okeke Outlet",
				sellerId: 3,
				status: "rejected",
				submittedDate: "2025-12-22",
				images: ["prohibited.jpg"],
				tags: ["miscellaneous"],
				violations: ["prohibited_category", "inappropriate_content"],
				moderationNotes: "Item violates platform policies on prohibited goods",
			},
			{
				id: 4,
				name: "MagSafe Phone Case",
				description: "Protective case with magnetic accessories support",
				price: 29.99,
				category: "Accessories",
				seller: "Nkiru Accessories",
				sellerId: 4,
				status: "approved",
				submittedDate: "2026-01-09",
				images: ["case1.jpg", "case2.jpg"],
				tags: ["accessories", "phone", "protection"],
				violations: [],
				moderationNotes:
					"Approved with minor description improvements suggested",
			},
			{
				id: 5,
				name: "Counterfeit iPhone 15 Pro",
				description: "Replica phone listing at unusually low price",
				price: 199.0,
				category: "Phones",
				seller: "Ifeanyi Deals",
				sellerId: 5,
				status: "flagged",
				submittedDate: "2026-01-08",
				images: ["iphone-copy.jpg"],
				tags: ["phones", "counterfeit", "suspicious"],
				violations: ["counterfeit", "trademark_infringement"],
				moderationNotes:
					"Potential trademark infringement - requires seller clarification",
			},
		];
		setProducts(mockProducts);
	}, []);

	const filteredProducts = products.filter((product) => {
		if (filter === "all") return true;
		return product.status === filter;
	});

	const getStatusColor = (status) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "approved":
				return "bg-green-100 text-green-800";
			case "rejected":
				return "bg-red-100 text-red-800";
			case "flagged":
				return "bg-orange-100 text-orange-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getViolationColor = (violation) => {
		switch (violation) {
			case "prohibited_category":
				return "bg-red-100 text-red-800";
			case "counterfeit":
				return "bg-purple-100 text-purple-800";
			case "trademark_infringement":
				return "bg-blue-100 text-blue-800";
			case "inappropriate_content":
				return "bg-pink-100 text-pink-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const handleViewDetails = (product) => {
		setSelectedProduct(product);
		setModerationForm({
			decision: "",
			reason: "",
			notes: product.moderationNotes || "",
		});
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setModerationForm({
			...moderationForm,
			[name]: value,
		});
	};

	const handleModerationDecision = (decision, reason = "", notes = "") => {
		setProducts(
			products.map((product) =>
				product.id === selectedProduct.id
					? {
							...product,
							status: decision,
							violations:
								decision === "rejected" ? [reason] : product.violations,
							moderationNotes: notes,
						}
					: product,
			),
		);
		setSelectedProduct(null);
		setModerationForm({ decision: "", reason: "", notes: "" });
	};

	const handleQuickAction = (productId, action) => {
		setProducts(
			products.map((product) =>
				product.id === productId ? { ...product, status: action } : product,
			),
		);
	};

	return (
		<div className="space-y-6">
			<div
				className="flex justify-between items-center"
				style={{ position: "relative", zIndex: 5, pointerEvents: "auto" }}
			>
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Product Moderation
				</h1>
				<div className="flex items-center space-x-4">
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="px-3 py-2 border rounded-md"
						style={{ borderColor: "var(--border)" }}
					>
						<option value="pending">Pending Review</option>
						<option value="approved">Approved</option>
						<option value="rejected">Rejected</option>
						<option value="flagged">Flagged</option>
						<option value="all">All Products</option>
					</select>
				</div>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Pending Review
					</h3>
					<p className="text-3xl font-bold text-yellow-600 mt-2">
						{products.filter((p) => p.status === "pending").length}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Approved
					</h3>
					<p className="text-3xl font-bold text-green-600 mt-2">
						{products.filter((p) => p.status === "approved").length}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Rejected
					</h3>
					<p className="text-3xl font-bold text-red-600 mt-2">
						{products.filter((p) => p.status === "rejected").length}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Flagged
					</h3>
					<p className="text-3xl font-bold mt-2" style={{ color: "var(--accent-secondary)" }}>
						{products.filter((p) => p.status === "flagged").length}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Products List */}
				<div className="lg:col-span-2">
					<div className="bg-white shadow rounded-lg">
						<div
							className="px-6 py-4 border-b"
							style={{ borderColor: "var(--border)" }}
						>
							<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
								Products Awaiting Moderation
							</h3>
						</div>
						<div className="overflow-x-auto">
							<table className="min-w-full" style={{ divideColor: "var(--border)" }}>
								<thead className="bg-gray-50">
									<tr>
										<th
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
											style={{ color: "var(--muted)" }}
										>
											Product
										</th>
										<th
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
											style={{ color: "var(--muted)" }}
										>
											Seller
										</th>
										<th
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
											style={{ color: "var(--muted)" }}
										>
											Status
										</th>
										<th
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
											style={{ color: "var(--muted)" }}
										>
											Submitted
										</th>
										<th
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
											style={{ color: "var(--muted)" }}
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white" style={{ divideColor: "var(--border)" }}>
									{filteredProducts.map((product) => (
										<tr key={product.id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="text-2xl mr-3">
														{product.images.length > 0 ? "Item" : "File"}
													</div>
													<div>
														<div className="text-sm font-medium text-gray-900">
															{product.name}
														</div>
														<div className="text-sm text-gray-500">
															${product.price} - {product.category}
														</div>
														{product.violations.length > 0 && (
															<div className="flex space-x-1 mt-1">
																{product.violations
																	.slice(0, 2)
																	.map((violation, index) => (
																		<span
																			key={index}
																			className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getViolationColor(violation)}`}
																		>
																			{violation.replace("_", " ")}
																		</span>
																	))}
															</div>
														)}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
												{product.seller}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}
												>
													{product.status.replace("_", " ")}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{product.submittedDate}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
												<div className="flex space-x-2">
													<button
														onClick={() => handleViewDetails(product)}
														className="text-blue-600 hover:text-blue-900"
													>
														Review
													</button>
													{product.status === "pending" && (
														<>
															<button
																onClick={() =>
																	handleQuickAction(product.id, "approved")
																}
																className="text-green-600 hover:text-green-900"
															>
																Approve
															</button>
															<button
																onClick={() =>
																	handleQuickAction(product.id, "rejected")
																}
																className="text-red-600 hover:text-red-900"
															>
																Reject
															</button>
														</>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Moderation Panel */}
				<div>
					{selectedProduct ? (
						<div className="bg-white shadow rounded-lg p-6">
							<h3 className="text-lg font-medium text-gray-900 mb-4">
								Product Review
							</h3>

							{/* Product Details */}
							<div className="mb-6">
								<h4 className="font-medium text-gray-900 mb-2">
									{selectedProduct.name}
								</h4>
								<div className="text-sm text-gray-600 space-y-1">
									<p>
										<strong>Seller:</strong> {selectedProduct.seller}
									</p>
									<p>
										<strong>Category:</strong> {selectedProduct.category}
									</p>
									<p>
										<strong>Price:</strong> ${selectedProduct.price}
									</p>
									<p>
										<strong>Submitted:</strong> {selectedProduct.submittedDate}
									</p>
								</div>

								<div className="mt-3">
									<p className="text-sm text-gray-700">
										{selectedProduct.description}
									</p>
								</div>

								{selectedProduct.tags.length > 0 && (
									<div className="mt-3">
										<p className="text-sm font-medium text-gray-700">Tags:</p>
										<div className="flex flex-wrap gap-1 mt-1">
											{selectedProduct.tags.map((tag, index) => (
												<span
													key={index}
													className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								)}

								{selectedProduct.images.length > 0 && (
									<div className="mt-3">
										<p className="text-sm font-medium text-gray-700">
											Images ({selectedProduct.images.length}):
										</p>
										<div className="flex space-x-2 mt-1">
											{selectedProduct.images.map((image, index) => (
												<div key={index} className="text-2xl">
													Image
												</div>
											))}
										</div>
									</div>
								)}
							</div>

							{/* Violations */}
							{selectedProduct.violations.length > 0 && (
								<div className="mb-6">
									<h4 className="font-medium text-red-900 mb-2">
										Violations Detected
									</h4>
									<div className="space-y-1">
										{selectedProduct.violations.map((violation, index) => (
											<span
												key={index}
												className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mr-2 ${getViolationColor(violation)}`}
											>
												{violation.replace("_", " ")}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Moderation Actions */}
							{selectedProduct.status === "pending" && (
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Decision
										</label>
										<select
											name="decision"
											value={moderationForm.decision}
											onChange={handleFormChange}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										>
											<option value="">Select decision...</option>
											<option value="approved">Approve Listing</option>
											<option value="rejected">Reject Listing</option>
											<option value="flagged">Flag for Review</option>
										</select>
									</div>

									{moderationForm.decision === "rejected" && (
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Rejection Reason
											</label>
											<select
												name="reason"
												value={moderationForm.reason}
												onChange={handleFormChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
											>
												<option value="">Select reason...</option>
												<option value="prohibited_category">
													Prohibited Category
												</option>
												<option value="counterfeit">Counterfeit Goods</option>
												<option value="trademark_infringement">
													Trademark Infringement
												</option>
												<option value="inappropriate_content">
													Inappropriate Content
												</option>
												<option value="incomplete_listing">
													Incomplete Listing
												</option>
												<option value="other">Other</option>
											</select>
										</div>
									)}

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Moderation Notes
										</label>
										<textarea
											name="notes"
											value={moderationForm.notes}
											onChange={handleFormChange}
											rows={3}
											placeholder="Add notes for the seller..."
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>

									<div className="flex space-x-3">
										<button
											onClick={() =>
												handleModerationDecision(
													moderationForm.decision,
													moderationForm.reason,
													moderationForm.notes,
												)
											}
											disabled={!moderationForm.decision}
											className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
										>
											Submit Decision
										</button>
										<button
											onClick={() => setSelectedProduct(null)}
											className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
										>
											Cancel
										</button>
									</div>
								</div>
							)}

							{selectedProduct.status !== "pending" && (
								<div className="text-center">
									<p className="text-sm text-gray-600">
										This product has already been {selectedProduct.status}.
									</p>
									<button
										onClick={() => setSelectedProduct(null)}
										className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
									>
										Close
									</button>
								</div>
							)}
						</div>
					) : (
						<div className="bg-white shadow rounded-lg p-6 text-center">
							<div className="text-4xl mb-4">Search</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								Select a product
							</h3>
							<p className="text-gray-500">
								Choose a product from the list to review and moderate
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Platform Guidelines */}
			<div
				className="border rounded-lg p-6"
				style={{ backgroundColor: "var(--surface-accent)", borderColor: "var(--border)" }}
			>
				<h3 className="text-lg font-medium mb-3" style={{ color: "#ffffff" }}>
					Moderation Guidelines
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
					<div>
						<h4 className="font-medium mb-2" style={{ color: "#ffffff" }}>
							Approved Categories
						</h4>
						<ul className="space-y-1">
							<li>- Laptops</li>
							<li>- Phones</li>
							<li>- Accessories</li>
							<li>- Computing devices</li>
						</ul>
					</div>
					<div>
						<h4 className="font-medium mb-2" style={{ color: "#ffffff" }}>
							Prohibited Items
						</h4>
						<ul className="space-y-1">
							<li>- Counterfeit goods</li>
							<li>- Illegal substances</li>
							<li>- Weapons & ammunition</li>
							<li>- Stolen property</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductModeration;
