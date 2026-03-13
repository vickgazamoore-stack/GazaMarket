import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Star, X } from "lucide-react";
import { useCart } from "../../../app/CartContext.jsx";

const ProductSearch = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { addToCart } = useCart();
	const [filters, setFilters] = useState({
		priceRange: [0, 5000],
		rating: 0,
		seller: "",
		category: "all",
		inStock: true,
		verifiedOnly: false,
	});
	const [sortBy, setSortBy] = useState("relevance");
	const [showFilters, setShowFilters] = useState(false);
	const [toast, setToast] = useState(null);

	const parsePrice = (value) => parseFloat(value.replace(/[$,]/g, ""));
	const parseDeliveryDays = (estimate) => {
		if (!estimate) return 999;
		const match = estimate.match(/(\d+)\s*-\s*(\d+)/);
		if (match) {
			return (Number(match[1]) + Number(match[2])) / 2;
		}
		const single = estimate.match(/(\d+)/);
		return single ? Number(single[1]) : 999;
	};

	const baseProducts = [
		{
			id: 101,
			productId: 1,
			name: 'MacBook Pro 16"',
			category: "laptops",
			keywords: ["laptop", "macbook", "apple", "pro"],
			price: "$1,299",
			originalPrice: "$1,599",
			rating: 4.8,
			reviews: 256,
			discount: 18,
			seller: "Nnamdi Tech Market",
			sellerId: 301,
			sellerRating: 4.9,
			verifiedSeller: true,
			shippingCost: 12.0,
			deliveryEstimate: "2-4 days",
			image:
				"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 102,
			productId: 1,
			name: 'MacBook Pro 16"',
			category: "laptops",
			keywords: ["laptop", "macbook", "apple", "pro"],
			price: "$1,249",
			originalPrice: "$1,549",
			rating: 4.7,
			reviews: 197,
			discount: 19,
			seller: "Adaeze Electronics",
			sellerId: 306,
			sellerRating: 4.8,
			verifiedSeller: true,
			shippingCost: 10.0,
			deliveryEstimate: "3-5 days",
			image:
				"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 103,
			productId: 2,
			name: "Dell XPS 13",
			category: "laptops",
			keywords: ["laptop", "dell", "xps", "ultrabook"],
			price: "$1,049",
			originalPrice: "$1,199",
			rating: 4.6,
			reviews: 188,
			discount: 13,
			seller: "Chinedu Audio",
			sellerId: 304,
			sellerRating: 4.6,
			verifiedSeller: false,
			shippingCost: 11.0,
			deliveryEstimate: "3-5 days",
			image:
				"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 104,
			productId: 2,
			name: "Dell XPS 13",
			category: "laptops",
			keywords: ["laptop", "dell", "xps", "ultrabook"],
			price: "$999",
			originalPrice: "$1,149",
			rating: 4.5,
			reviews: 144,
			discount: 13,
			seller: "Ugochi Digital",
			sellerId: 305,
			sellerRating: 4.2,
			verifiedSeller: false,
			shippingCost: 12.0,
			deliveryEstimate: "4-6 days",
			image:
				"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
			inStock: false,
		},
		{
			id: 105,
			productId: 3,
			name: "ThinkPad X1 Carbon",
			category: "laptops",
			keywords: ["laptop", "lenovo", "thinkpad", "business"],
			price: "$1,199",
			originalPrice: "$1,349",
			rating: 4.7,
			reviews: 219,
			discount: 11,
			seller: "Nnamdi Tech Market",
			sellerId: 301,
			sellerRating: 4.9,
			verifiedSeller: true,
			shippingCost: 9.0,
			deliveryEstimate: "2-4 days",
			image:
				"https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 106,
			productId: 3,
			name: "ThinkPad X1 Carbon",
			category: "laptops",
			keywords: ["laptop", "lenovo", "thinkpad", "business"],
			price: "$1,149",
			originalPrice: "$1,299",
			rating: 4.6,
			reviews: 171,
			discount: 12,
			seller: "Adaeze Electronics",
			sellerId: 306,
			sellerRating: 4.8,
			verifiedSeller: true,
			shippingCost: 10.0,
			deliveryEstimate: "3-5 days",
			image:
				"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 107,
			productId: 4,
			name: "HP Spectre x360",
			category: "laptops",
			keywords: ["laptop", "hp", "spectre", "2-in-1"],
			price: "$1,099",
			originalPrice: "$1,249",
			rating: 4.5,
			reviews: 154,
			discount: 12,
			seller: "Obinna Gadgets",
			sellerId: 303,
			sellerRating: 4.4,
			verifiedSeller: false,
			shippingCost: 10.0,
			deliveryEstimate: "3-6 days",
			image:
				"https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=300&fit=crop",
			inStock: false,
		},
		{
			id: 108,
			productId: 4,
			name: "HP Spectre x360",
			category: "laptops",
			keywords: ["laptop", "hp", "spectre", "2-in-1"],
			price: "$1,049",
			originalPrice: "$1,199",
			rating: 4.4,
			reviews: 132,
			discount: 13,
			seller: "Chinedu Audio",
			sellerId: 304,
			sellerRating: 4.6,
			verifiedSeller: false,
			shippingCost: 11.0,
			deliveryEstimate: "4-6 days",
			image:
				"https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 109,
			productId: 5,
			name: "iPhone 15 Pro",
			category: "phones",
			keywords: ["iphone", "apple", "ios", "phone"],
			price: "$999",
			originalPrice: "$1,099",
			rating: 4.8,
			reviews: 512,
			discount: 9,
			seller: "Nnamdi Tech Market",
			sellerId: 301,
			sellerRating: 4.9,
			verifiedSeller: true,
			shippingCost: 8.0,
			deliveryEstimate: "2-4 days",
			image:
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 110,
			productId: 5,
			name: "iPhone 15 Pro",
			category: "phones",
			keywords: ["iphone", "apple", "ios", "phone"],
			price: "$979",
			originalPrice: "$1,099",
			rating: 4.7,
			reviews: 301,
			discount: 11,
			seller: "Adaeze Electronics",
			sellerId: 306,
			sellerRating: 4.8,
			verifiedSeller: true,
			shippingCost: 9.0,
			deliveryEstimate: "3-5 days",
			image:
				"https://images.unsplash.com/photo-1512499617640-c2f999098b8f?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 111,
			productId: 6,
			name: "Samsung Galaxy S24",
			category: "phones",
			keywords: ["samsung", "galaxy", "android", "phone"],
			price: "$899",
			originalPrice: "$999",
			rating: 4.7,
			reviews: 433,
			discount: 10,
			seller: "Adaeze Electronics",
			sellerId: 306,
			sellerRating: 4.8,
			shippingCost: 9.0,
			deliveryEstimate: "3-5 days",
			image:
				"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
			inStock: false,
		},
		{
			id: 112,
			productId: 6,
			name: "Samsung Galaxy S24",
			category: "phones",
			keywords: ["samsung", "galaxy", "android", "phone"],
			price: "$869",
			originalPrice: "$999",
			rating: 4.6,
			reviews: 287,
			discount: 13,
			seller: "Ugochi Digital",
			sellerId: 305,
			sellerRating: 4.2,
			shippingCost: 11.0,
			deliveryEstimate: "4-6 days",
			image:
				"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 113,
			productId: 7,
			name: "Google Pixel 8",
			category: "phones",
			keywords: ["google", "pixel", "android", "phone"],
			price: "$799",
			originalPrice: "$899",
			rating: 4.6,
			reviews: 221,
			discount: 11,
			seller: "Chinedu Audio",
			sellerId: 304,
			sellerRating: 4.6,
			shippingCost: 8.5,
			deliveryEstimate: "3-5 days",
			image:
				"https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 114,
			productId: 7,
			name: "Google Pixel 8",
			category: "phones",
			keywords: ["google", "pixel", "android", "phone"],
			price: "$769",
			originalPrice: "$899",
			rating: 4.5,
			reviews: 176,
			discount: 14,
			seller: "Obinna Gadgets",
			sellerId: 303,
			sellerRating: 4.4,
			shippingCost: 9.0,
			deliveryEstimate: "4-6 days",
			image:
				"https://images.unsplash.com/photo-1523475472568-7d1d2f8adf8d?w=400&h=300&fit=crop",
			inStock: false,
		},
		{
			id: 115,
			productId: 8,
			name: "iPhone 14",
			category: "phones",
			keywords: ["iphone", "apple", "ios", "phone"],
			price: "$699",
			originalPrice: "$799",
			rating: 4.6,
			reviews: 284,
			discount: 13,
			seller: "Nnamdi Tech Market",
			sellerId: 301,
			sellerRating: 4.9,
			shippingCost: 7.0,
			deliveryEstimate: "2-4 days",
			image:
				"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 116,
			productId: 8,
			name: "iPhone 14",
			category: "phones",
			keywords: ["iphone", "apple", "ios", "phone"],
			price: "$679",
			originalPrice: "$799",
			rating: 4.5,
			reviews: 196,
			discount: 15,
			seller: "Ugochi Digital",
			sellerId: 305,
			sellerRating: 4.2,
			shippingCost: 8.0,
			deliveryEstimate: "4-6 days",
			image:
				"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 117,
			productId: 9,
			name: "ASUS ROG Zephyrus G14",
			category: "laptops",
			keywords: ["laptop", "asus", "rog", "gaming"],
			price: "$1,399",
			originalPrice: "$1,599",
			rating: 4.7,
			reviews: 164,
			discount: 12,
			seller: "Obinna Gadgets",
			sellerId: 303,
			sellerRating: 4.4,
			shippingCost: 12.0,
			deliveryEstimate: "3-6 days",
			image:
				"https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 118,
			productId: 9,
			name: "ASUS ROG Zephyrus G14",
			category: "laptops",
			keywords: ["laptop", "asus", "rog", "gaming"],
			price: "$1,349",
			originalPrice: "$1,549",
			rating: 4.6,
			reviews: 129,
			discount: 13,
			seller: "Chinedu Audio",
			sellerId: 304,
			sellerRating: 4.6,
			shippingCost: 11.0,
			deliveryEstimate: "4-6 days",
			image:
				"https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=300&fit=crop",
			inStock: false,
		},
		{
			id: 119,
			productId: 10,
			name: "Microsoft Surface Laptop 5",
			category: "laptops",
			keywords: ["laptop", "surface", "microsoft", "ultrabook"],
			price: "$1,099",
			originalPrice: "$1,299",
			rating: 4.5,
			reviews: 142,
			discount: 15,
			seller: "Nnamdi Tech Market",
			sellerId: 301,
			sellerRating: 4.9,
			shippingCost: 9.0,
			deliveryEstimate: "2-4 days",
			image:
				"https://images.unsplash.com/photo-1587614295999-6c1bd9c4f04d?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 120,
			productId: 10,
			name: "Microsoft Surface Laptop 5",
			category: "laptops",
			keywords: ["laptop", "surface", "microsoft", "ultrabook"],
			price: "$1,049",
			originalPrice: "$1,249",
			rating: 4.4,
			reviews: 110,
			discount: 16,
			seller: "Adaeze Electronics",
			sellerId: 306,
			sellerRating: 4.8,
			shippingCost: 10.0,
			deliveryEstimate: "3-5 days",
			image:
				"https://images.unsplash.com/photo-1587614295999-6c1bd9c4f04d?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 121,
			productId: 11,
			name: "OnePlus 12",
			category: "phones",
			keywords: ["oneplus", "android", "phone", "flagship"],
			price: "$799",
			originalPrice: "$899",
			rating: 4.6,
			reviews: 188,
			discount: 11,
			seller: "Chinedu Audio",
			sellerId: 304,
			sellerRating: 4.6,
			shippingCost: 8.5,
			deliveryEstimate: "3-5 days",
			image:
				"https://images.unsplash.com/photo-1523475472568-7d1d2f8adf8d?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 122,
			productId: 11,
			name: "OnePlus 12",
			category: "phones",
			keywords: ["oneplus", "android", "phone", "flagship"],
			price: "$769",
			originalPrice: "$899",
			rating: 4.5,
			reviews: 143,
			discount: 14,
			seller: "Obinna Gadgets",
			sellerId: 303,
			sellerRating: 4.4,
			shippingCost: 9.0,
			deliveryEstimate: "4-6 days",
			image:
				"https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop",
			inStock: false,
		},
		{
			id: 123,
			productId: 12,
			name: "Samsung Galaxy A55",
			category: "phones",
			keywords: ["samsung", "galaxy", "android", "phone"],
			price: "$499",
			originalPrice: "$549",
			rating: 4.4,
			reviews: 201,
			discount: 9,
			seller: "Adaeze Electronics",
			sellerId: 306,
			sellerRating: 4.8,
			shippingCost: 7.0,
			deliveryEstimate: "3-5 days",
			image:
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
			inStock: true,
		},
		{
			id: 124,
			productId: 12,
			name: "Samsung Galaxy A55",
			category: "phones",
			keywords: ["samsung", "galaxy", "android", "phone"],
			price: "$479",
			originalPrice: "$549",
			rating: 4.3,
			reviews: 167,
			discount: 13,
			seller: "Ugochi Digital",
			sellerId: 305,
			sellerRating: 4.2,
			shippingCost: 8.0,
			deliveryEstimate: "4-6 days",
			image:
				"https://images.unsplash.com/photo-1510557880182-3d4d3cba35f5?w=400&h=300&fit=crop",
			inStock: false,
		},
	];

	const productImagesById = {
		1: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
		2: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
		3: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
		4: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
		5: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
		6: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
		7: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop",
		8: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
		9: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=300&fit=crop",
		10: "https://images.unsplash.com/photo-1587614295999-6c1bd9c4f04d?w=400&h=300&fit=crop",
		11: "https://images.unsplash.com/photo-1523475472568-7d1d2f8adf8d?w=400&h=300&fit=crop",
		12: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35f5?w=400&h=300&fit=crop",
	};

	const products = baseProducts.map((product) => ({
		...product,
		image: productImagesById[product.productId] || product.image,
	}));

	const categories = ["all", "laptops", "phones"];
	const relatedSearches = [
		"macbook",
		"dell xps",
		"thinkpad",
		"hp spectre",
		"asus rog",
		"surface laptop",
		"iphone",
		"samsung",
		"pixel",
		"oneplus",
		"ultrabook",
	];

	const sellerOptions = [
		"",
		...new Set(products.map((product) => product.seller)),
	];
	const verifiedSellers = new Set(["Nnamdi Tech Market", "Adaeze Electronics"]);

	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesKeyword =
			searchQuery.trim() === "" ||
			product.keywords?.some((keyword) =>
				keyword.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		const matchesPrice =
			parsePrice(product.price) >= filters.priceRange[0] &&
			parsePrice(product.price) <= filters.priceRange[1];
		const matchesRating = product.rating >= filters.rating;
		const matchesSeller =
			filters.seller === "" || product.seller === filters.seller;
		const matchesCategory =
			filters.category === "all" || product.category === filters.category;
		const matchesStock = !filters.inStock || product.inStock;
		const isVerified =
			product.verifiedSeller ?? verifiedSellers.has(product.seller);
		const matchesVerified = !filters.verifiedOnly || isVerified;

		return (
			(matchesSearch || matchesKeyword) &&
			matchesPrice &&
			matchesRating &&
			matchesSeller &&
			matchesCategory &&
			matchesStock &&
			matchesVerified
		);
	});

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		switch (sortBy) {
			case "price_low":
				return parsePrice(a.price) - parsePrice(b.price);
			case "price_high":
				return parsePrice(b.price) - parsePrice(a.price);
			case "rating":
				return b.rating - a.rating;
			case "delivery":
				return (
					parseDeliveryDays(a.deliveryEstimate) -
					parseDeliveryDays(b.deliveryEstimate)
				);
			default:
				return 0;
		}
	});

	const showToast = (productName) => {
		setToast({
			id: `${productName}-${Date.now()}`,
			title: "Added to cart",
			subtitle: productName,
		});
		window.setTimeout(() => setToast(null), 2200);
	};

	return (
		<div className="space-y-8">
			{toast && (
				<div className="toast-stack">
					<div className="toast-card">
						<div className="toast-dot" />
						<div>
							<p className="toast-title">{toast.title}</p>
							<p className="toast-subtitle">{toast.subtitle}</p>
						</div>
					</div>
				</div>
			)}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="space-y-6">
					<div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
						<div className="flex-1">
							<div
								className="flex items-center gap-3 rounded-xl border px-4 py-3"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderColor: "var(--border)",
								}}
							>
								<Search className="w-5 h-5" style={{ color: "var(--muted)" }} />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search laptops and phones"
									className="w-full bg-transparent focus:outline-none"
									style={{ color: "var(--text)" }}
								/>
								<button
									type="button"
									onClick={() => {
										setSearchQuery("");
									}}
									className="p-1"
									aria-label="Clear search"
								>
									<X className="w-4 h-4" style={{ color: "var(--muted)" }} />
								</button>
							</div>
						</div>
						<div className="flex flex-wrap items-center gap-3">
							<div
								className="flex items-center gap-2 rounded-lg border px-3 py-2"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderColor: "var(--border)",
								}}
							>
								<span className="text-sm" style={{ color: "var(--muted)" }}>
									Sort by
								</span>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="bg-transparent text-sm font-semibold focus:outline-none"
									style={{ color: "var(--text)" }}
								>
									<option value="relevance">Relevance</option>
									<option value="price_low">Price: Low to High</option>
									<option value="price_high">Price: High to Low</option>
									<option value="rating">Top Rated</option>
									<option value="delivery">Fastest Delivery</option>
								</select>
							</div>
							<button
								type="button"
								onClick={() => setShowFilters((prev) => !prev)}
								className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold"
								style={{
									backgroundColor: showFilters
										? "var(--accent-secondary)"
										: "var(--surface-strong)",
									color: showFilters ? "var(--surface)" : "var(--text)",
									border: "1px solid var(--border)",
								}}
							>
								<Filter className="w-4 h-4" />
								Filters
							</button>
							<span className="text-sm" style={{ color: "var(--muted)" }}>
								{sortedProducts.length} results
							</span>
						</div>
					</div>

					<div
						className="md:hidden flex items-center justify-between gap-3 rounded-xl border px-4 py-3 sticky top-4 z-30"
						style={{
							backgroundColor: "var(--surface-strong)",
							borderColor: "var(--border)",
						}}
					>
						<button
							type="button"
							onClick={() => setShowFilters((prev) => !prev)}
							className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold"
							style={{
								backgroundColor: showFilters
									? "var(--accent-secondary)"
									: "var(--surface)",
								color: showFilters ? "var(--surface)" : "var(--text)",
								border: "1px solid var(--border)",
							}}
						>
							<Filter className="w-4 h-4" />
							Filters
						</button>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="rounded-lg px-3 py-2 text-sm font-semibold border"
							style={{
								backgroundColor: "var(--surface)",
								borderColor: "var(--border)",
								color: "var(--text)",
							}}
						>
							<option value="relevance">Relevance</option>
							<option value="price_low">Price: Low to High</option>
							<option value="price_high">Price: High to Low</option>
							<option value="rating">Top Rated</option>
							<option value="delivery">Fastest Delivery</option>
						</select>
						<span className="text-xs" style={{ color: "var(--muted)" }}>
							{sortedProducts.length}
						</span>
					</div>

					{showFilters && (
						<div
							className="rounded-xl border p-5"
							style={{
								backgroundColor: "var(--surface-strong)",
								borderColor: "var(--border)",
							}}
						>
							<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
								<div>
									<label
										className="text-sm font-semibold"
										style={{ color: "var(--accent)" }}
									>
										Price range
									</label>
									<div className="mt-2 flex items-center gap-2">
										<input
											type="number"
											min={0}
											value={filters.priceRange[0]}
											onChange={(e) =>
												setFilters((prev) => ({
													...prev,
													priceRange: [
														Number(e.target.value),
														prev.priceRange[1],
													],
												}))
											}
											className="w-full rounded-lg px-3 py-2 border focus:outline-none"
											style={{
												backgroundColor: "var(--surface)",
												borderColor: "var(--border)",
											}}
										/>
										<span style={{ color: "var(--muted)" }}>-</span>
										<input
											type="number"
											min={0}
											value={filters.priceRange[1]}
											onChange={(e) =>
												setFilters((prev) => ({
													...prev,
													priceRange: [
														prev.priceRange[0],
														Number(e.target.value),
													],
												}))
											}
											className="w-full rounded-lg px-3 py-2 border focus:outline-none"
											style={{
												backgroundColor: "var(--surface)",
												borderColor: "var(--border)",
											}}
										/>
									</div>
								</div>
								<div>
									<label
										className="text-sm font-semibold"
										style={{ color: "var(--accent)" }}
									>
										Minimum rating
									</label>
									<select
										value={filters.rating}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												rating: Number(e.target.value),
											}))
										}
										className="mt-2 w-full rounded-lg px-3 py-2 border focus:outline-none"
										style={{
											backgroundColor: "var(--surface)",
											borderColor: "var(--border)",
										}}
									>
										<option value={0}>All ratings</option>
										<option value={3}>3 stars & up</option>
										<option value={4}>4 stars & up</option>
										<option value={4.5}>4.5 stars & up</option>
									</select>
								</div>
								<div>
									<label
										className="text-sm font-semibold"
										style={{ color: "var(--accent)" }}
									>
										Category
									</label>
									<select
										value={filters.category}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												category: e.target.value,
											}))
										}
										className="mt-2 w-full rounded-lg px-3 py-2 border focus:outline-none"
										style={{
											backgroundColor: "var(--surface)",
											borderColor: "var(--border)",
										}}
									>
										{categories.map((category) => (
											<option key={category} value={category}>
												{category === "all"
													? "All categories"
													: category.charAt(0).toUpperCase() +
														category.slice(1)}
											</option>
										))}
									</select>
								</div>
								<div>
									<label
										className="text-sm font-semibold"
										style={{ color: "var(--accent)" }}
									>
										Seller
									</label>
									<select
										value={filters.seller}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												seller: e.target.value,
											}))
										}
										className="mt-2 w-full rounded-lg px-3 py-2 border focus:outline-none"
										style={{
											backgroundColor: "var(--surface)",
											borderColor: "var(--border)",
										}}
									>
										{sellerOptions.map((seller) => (
											<option key={seller || "all"} value={seller}>
												{seller || "All sellers"}
											</option>
										))}
									</select>
								</div>
								<div className="flex items-center gap-3">
									<input
										id="in-stock"
										type="checkbox"
										checked={filters.inStock}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												inStock: e.target.checked,
											}))
										}
										className="h-4 w-4"
									/>
									<label
										htmlFor="in-stock"
										className="text-sm"
										style={{ color: "var(--text)" }}
									>
										In stock only
									</label>
								</div>
								<div className="flex items-center gap-3">
									<input
										id="verified-only"
										type="checkbox"
										checked={filters.verifiedOnly}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												verifiedOnly: e.target.checked,
											}))
										}
										className="h-4 w-4"
									/>
									<label
										htmlFor="verified-only"
										className="text-sm"
										style={{ color: "var(--text)" }}
									>
										Verified sellers only
									</label>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="flex gap-8">
					{/* Products */}
					<div className="flex-1">
						{/* Product Grid */}
						{sortedProducts.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{sortedProducts.map((product) => (
									<Link
										key={product.id}
										to={`/buyer/product/${product.productId ?? product.id}?seller=${product.sellerId}`}
										className="gm-card relative overflow-hidden transition-shadow hover:shadow-[0_30px_60px_-40px_var(--shadow-strong)] group"
									>
										{!product.inStock && (
											<span
												className="absolute top-4 left-4 z-10 text-white text-xs font-semibold px-3 py-1 rounded-full"
												style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
											>
												Out of stock
											</span>
										)}
										<div
											className="relative h-56 flex items-center justify-center p-4"
											style={{ backgroundColor: "var(--surface)" }}
										>
											<img
												src={product.image}
												alt={product.name}
												className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
											/>
										</div>
										<div className="relative p-5 space-y-3">
											<div>
												<Link
													to={`/buyer/product/${product.productId ?? product.id}?seller=${product.sellerId}`}
													className="text-lg font-bold hover:underline"
													style={{ color: "var(--ink)" }}
												>
													{product.name}
												</Link>
												<p
													className="text-sm"
													style={{ color: "var(--muted)" }}
												>
													{product.seller}
													{(product.verifiedSeller ??
														verifiedSellers.has(product.seller)) && (
														<span
															className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold"
															style={{
																backgroundColor: "var(--accent-tint)",
																color: "var(--accent)",
															}}
														>
															Verified
														</span>
													)}
												</p>
											</div>
											<div className="flex items-center gap-2">
												<div className="flex items-center">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`w-3 h-3 ${
																i < Math.floor(product.sellerRating)
																	? "fill-yellow-400 text-yellow-400"
																	: "text-gray-300"
															}`}
														/>
													))}
												</div>
												<span
													className="text-xs"
													style={{ color: "var(--muted)" }}
												>
													{product.sellerRating}
												</span>
											</div>
											<div className="flex items-center gap-3">
												<span
													className="text-xl font-bold"
													style={{ color: "var(--accent)" }}
												>
													{product.price}
												</span>
												<span
													className="text-sm line-through"
													style={{ color: "var(--muted)" }}
												>
													{product.originalPrice}
												</span>
											</div>
											<button
												className={`w-full mt-2 py-2 rounded-lg text-white font-semibold transition opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto ${
													!product.inStock
														? "opacity-60 cursor-not-allowed"
														: ""
												}`}
												style={{ backgroundColor: "var(--accent-secondary)" }}
												onClick={(e) => {
													e.preventDefault();
													if (!product.inStock) return;
													addToCart(
														product,
														{
															id: product.sellerId,
															name: product.seller,
															rating: product.sellerRating,
														},
														1,
													);
													showToast(product.name);
												}}
												onMouseEnter={(e) => {
													if (!product.inStock) return;
													e.target.style.backgroundColor =
														"var(--accent-secondary-strong)";
												}}
												onMouseLeave={(e) => {
													if (!product.inStock) return;
													e.target.style.backgroundColor =
														"var(--accent-secondary)";
												}}
												disabled={!product.inStock}
											>
												{product.inStock ? "Add to Cart" : "Out of Stock"}
											</button>
										</div>
									</Link>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<p className="text-gray-600 text-lg">
									No products match your filters. Try adjusting them.
								</p>
							</div>
						)}
					</div>
				</div>
				<div
					className="mt-12 border rounded-xl p-6"
					style={{ borderColor: "var(--border)" }}
				>
					<h3
						className="text-lg font-semibold"
						style={{ color: "var(--accent)" }}
					>
						Related searches
					</h3>
					<div className="mt-4 flex flex-wrap gap-2">
						{relatedSearches.map((term) => (
							<button
								key={term}
								onClick={() => setSearchQuery(term)}
								className="px-3 py-2 rounded-full text-sm font-semibold border"
								style={{ borderColor: "var(--border)", color: "var(--accent)" }}
							>
								{term}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSearch;
