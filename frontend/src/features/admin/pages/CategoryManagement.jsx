import { useState, useEffect } from "react";

const CategoryManagement = () => {
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [categoryForm, setCategoryForm] = useState({
		name: "",
		description: "",
		parentId: "",
		attributes: [],
		commission: 10,
		isActive: true,
	});

	// Mock data - in real app this would come from API
	useEffect(() => {
		const mockCategories = [
			{
				id: 1,
				name: "Electronics",
				description: "Laptops, phones, and related devices",
				parentId: null,
				attributes: ["Brand", "Model", "Warranty", "Color"],
				commission: 8,
				isActive: true,
				productCount: 145,
				subcategories: [
					{
						id: 2,
						name: "Laptops",
						description: "Ultrabooks, gaming, and business laptops",
						productCount: 62,
					},
					{
						id: 3,
						name: "Phones",
						description: "Smartphones across all price tiers",
						productCount: 71,
					},
					{
						id: 4,
						name: "Accessories",
						description: "Chargers, cases, and peripherals",
						productCount: 12,
					},
				],
			},
			{
				id: 5,
				name: "Laptops",
				description: "Portable computers for work and play",
				parentId: null,
				attributes: ["Brand", "CPU", "RAM", "Storage", "Display"],
				commission: 9,
				isActive: true,
				productCount: 83,
				subcategories: [],
			},
			{
				id: 6,
				name: "Phones",
				description: "iOS and Android smartphones",
				parentId: null,
				attributes: ["Brand", "Storage", "Camera", "Color"],
				commission: 9,
				isActive: true,
				productCount: 96,
				subcategories: [],
			},
		];
		setCategories(mockCategories);
	}, []);

	const handleFormChange = (e) => {
		const { name, value, type, checked } = e.target;
		setCategoryForm({
			...categoryForm,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleAttributeChange = (index, value) => {
		const newAttributes = [...categoryForm.attributes];
		newAttributes[index] = value;
		setCategoryForm({
			...categoryForm,
			attributes: newAttributes,
		});
	};

	const addAttribute = () => {
		setCategoryForm({
			...categoryForm,
			attributes: [...categoryForm.attributes, ""],
		});
	};

	const removeAttribute = (index) => {
		setCategoryForm({
			...categoryForm,
			attributes: categoryForm.attributes.filter((_, i) => i !== index),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (selectedCategory) {
			// Update existing category
			setCategories(
				categories.map((cat) =>
					cat.id === selectedCategory.id
						? { ...selectedCategory, ...categoryForm }
						: cat,
				),
			);
		} else {
			// Add new category
			const newCategory = {
				id: Date.now(),
				...categoryForm,
				productCount: 0,
				subcategories: [],
			};
			setCategories([...categories, newCategory]);
		}

		// Reset form
		setCategoryForm({
			name: "",
			description: "",
			parentId: "",
			attributes: [],
			commission: 10,
			isActive: true,
		});
		setSelectedCategory(null);
		setShowAddForm(false);
	};

	const handleEdit = (category) => {
		setSelectedCategory(category);
		setCategoryForm({
			name: category.name,
			description: category.description,
			parentId: category.parentId || "",
			attributes: category.attributes,
			commission: category.commission,
			isActive: category.isActive,
		});
		setShowAddForm(true);
	};

	const handleDelete = (categoryId) => {
		if (window.confirm("Are you sure you want to delete this category?")) {
			setCategories(categories.filter((cat) => cat.id !== categoryId));
		}
	};

	const toggleCategoryStatus = (categoryId) => {
		setCategories(
			categories.map((cat) =>
				cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat,
			),
		);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Category Management
				</h1>
				<button
					onClick={() => setShowAddForm(true)}
					className="text-white px-4 py-2 rounded-md"
					style={{ backgroundColor: "var(--accent-secondary)" }}
					onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
					onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
				>
					Add Category
				</button>
			</div>

			{/* Add/Edit Form */}
			{showAddForm && (
				<div className="bg-white shadow rounded-lg p-6">
					<h3 className="text-lg font-medium mb-4" style={{ color: "var(--accent)" }}>
						{selectedCategory ? "Edit Category" : "Add New Category"}
					</h3>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									className="block text-sm font-medium"
									style={{ color: "var(--accent)" }}
								>
									Category Name
								</label>
								<input
									type="text"
									name="name"
									value={categoryForm.name}
									onChange={handleFormChange}
									required
									className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
									style={{ borderColor: "var(--border)" }}
									onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
									onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
								/>
							</div>

							<div>
								<label
									className="block text-sm font-medium"
									style={{ color: "var(--accent)" }}
								>
									Parent Category
								</label>
								<select
									name="parentId"
									value={categoryForm.parentId}
									onChange={handleFormChange}
									className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
									style={{ borderColor: "var(--border)" }}
									onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
									onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
								>
									<option value="">No Parent (Top Level)</option>
									{categories.map((cat) => (
										<option key={cat.id} value={cat.id}>
											{cat.name}
										</option>
									))}
								</select>
							</div>
						</div>

						<div>
							<label
								className="block text-sm font-medium"
								style={{ color: "var(--accent)" }}
							>
								Description
							</label>
							<textarea
								name="description"
								value={categoryForm.description}
								onChange={handleFormChange}
								rows={3}
								className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
								style={{ borderColor: "var(--border)" }}
								onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
								onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									className="block text-sm font-medium"
									style={{ color: "var(--accent)" }}
								>
									Commission Rate (%)
								</label>
								<input
									type="number"
									name="commission"
									value={categoryForm.commission}
									onChange={handleFormChange}
									min="0"
									max="50"
									step="0.1"
									className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
									style={{ borderColor: "var(--border)" }}
									onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
									onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
								/>
							</div>

							<div className="flex items-center">
								<input
									type="checkbox"
									name="isActive"
									checked={categoryForm.isActive}
									onChange={handleFormChange}
									className="h-4 w-4 rounded"
									style={{ accentColor: "var(--accent)" }}
								/>
								<label
									className="ml-2 text-sm font-medium"
									style={{ color: "var(--accent)" }}
								>
									Active
								</label>
							</div>
						</div>

						{/* Attributes */}
						<div>
							<div className="flex justify-between items-center mb-3">
								<label
									className="block text-sm font-medium"
									style={{ color: "var(--accent)" }}
								>
									Product Attributes
								</label>
								<button
									type="button"
									onClick={addAttribute}
									style={{ color: "var(--accent)" }}
									className="hover:opacity-70 transition-opacity text-sm"
								>
									+ Add Attribute
								</button>
							</div>

							<div className="space-y-2">
								{categoryForm.attributes.map((attribute, index) => (
									<div key={index} className="flex items-center space-x-2">
										<input
											type="text"
											value={attribute}
											onChange={(e) =>
												handleAttributeChange(index, e.target.value)
											}
											placeholder="Attribute name"
											className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
										<button
											type="button"
											onClick={() => removeAttribute(index)}
											className="text-red-600 hover:text-red-800"
										>
											Remove
										</button>
									</div>
								))}
							</div>
						</div>

						<div className="flex justify-end space-x-3">
							<button
								type="button"
								onClick={() => {
									setShowAddForm(false);
									setSelectedCategory(null);
									setCategoryForm({
										name: "",
										description: "",
										parentId: "",
										attributes: [],
										commission: 10,
										isActive: true,
									});
								}}
								className="px-4 py-2 border rounded-md"
								style={{ borderColor: "var(--border)", color: "var(--muted)" }}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "var(--surface-strong)")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "transparent")
								}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 text-white rounded-md"
								style={{ backgroundColor: "var(--accent-secondary)" }}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary)")
								}
							>
								{selectedCategory ? "Update Category" : "Create Category"}
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Categories List */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories.map((category) => (
					<div
						key={category.id}
						className="bg-white shadow rounded-lg overflow-hidden"
					>
						<div className="p-6">
							<div className="flex justify-between items-start mb-4">
								<div>
									<h3
										className="text-lg font-medium"
										style={{ color: "var(--accent)" }}
									>
										{category.name}
									</h3>
									<p className="text-sm text-gray-600">
										{category.description}
									</p>
								</div>
								<div className="flex space-x-2">
									<button
										onClick={() => handleEdit(category)}
										style={{ color: "var(--accent)" }}
										onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
										onMouseLeave={(e) => (e.target.style.opacity = "1")}
										className="hover:opacity-70 transition-opacity"
										title="Edit"
									>
										Edit
									</button>
									<button
										onClick={() => toggleCategoryStatus(category.id)}
										style={{ color: category.isActive ? "var(--accent-secondary)" : "var(--muted)" }}
										onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
										onMouseLeave={(e) => (e.target.style.opacity = "1")}
										className="hover:opacity-70 transition-opacity"
										title={category.isActive ? "Deactivate" : "Activate"}
									>
										{category.isActive ? "On" : "Off"}
									</button>
									<button
										onClick={() => handleDelete(category.id)}
										className="text-red-600 hover:opacity-70 transition-opacity"
										onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
										onMouseLeave={(e) => (e.target.style.opacity = "1")}
										title="Delete"
									>
										Delete
									</button>
								</div>
							</div>

							<div className="space-y-2 text-sm text-gray-600">
								<div className="flex justify-between">
									<span>Products:</span>
									<span className="font-medium">{category.productCount}</span>
								</div>
								<div className="flex justify-between">
									<span>Commission:</span>
									<span className="font-medium">{category.commission}%</span>
								</div>
								<div className="flex justify-between">
									<span>Status:</span>
									<span
										className="font-medium"
										style={{ color: category.isActive ? "var(--accent-secondary)" : "var(--accent-secondary-strong)" }}
									>
										{category.isActive ? "Active" : "Inactive"}
									</span>
								</div>
							</div>

							{category.attributes.length > 0 && (
								<div className="mt-4">
									<p className="text-sm font-medium text-gray-700 mb-2">
										Attributes:
									</p>
									<div className="flex flex-wrap gap-1">
										{category.attributes.map((attr, index) => (
											<span
												key={index}
												className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded admin-attr-pill"
											>
												{attr}
											</span>
										))}
									</div>
								</div>
							)}

							{category.subcategories.length > 0 && (
								<div className="mt-4">
									<p className="text-sm font-medium text-gray-700 mb-2">
										Subcategories:
									</p>
									<div className="space-y-1">
										{category.subcategories.map((sub) => (
											<div
												key={sub.id}
												className="text-sm text-gray-600 flex justify-between"
											>
												<span>{sub.name}</span>
												<span>{sub.productCount} products</span>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			{categories.length === 0 && (
				<div className="bg-white shadow rounded-lg p-12 text-center">
					<div className="text-4xl mb-4">Categories</div>
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						No categories yet
					</h3>
					<p className="text-gray-500 mb-6">
						Create your first product category to organize marketplace listings
					</p>
					<button
						onClick={() => setShowAddForm(true)}
						className="text-white px-6 py-3 rounded-md"
						style={{ backgroundColor: "var(--accent-secondary)" }}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
					>
						Create Category
					</button>
				</div>
			)}
		</div>
	);
};

export default CategoryManagement;
