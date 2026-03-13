import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Star, ShieldCheck, Truck, Store } from "lucide-react";
import { useCart } from "../../../app/CartContext.jsx";

const ProductDetail = () => {
	const { id } = useParams();
	const [searchParams] = useSearchParams();
	const { addToCart } = useCart();
	const sellerParam = searchParams.get("seller");
	const [toast, setToast] = useState(null);

	const productsById = {
		1: {
			id: 1,
			name: 'MacBook Pro 16"',
			description:
				"High-performance laptop with an M-series chip, bright display, and all-day battery.",
			priceRange: "$1,199 - $1,499",
			rating: 4.8,
			reviews: 512,
			images: [
				"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "Chip", value: "M-series Pro" },
				{ label: "RAM", value: "16GB" },
				{ label: "Storage", value: "512GB SSD" },
				{ label: "Display", value: "16.2-inch Liquid Retina" },
			],
		},
		2: {
			id: 2,
			name: "Dell XPS 13",
			description:
				"Compact ultrabook with edge-to-edge display and premium aluminum build.",
			priceRange: "$999 - $1,199",
			rating: 4.6,
			reviews: 238,
			images: [
				"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "CPU", value: "Intel Core i7" },
				{ label: "RAM", value: "16GB" },
				{ label: "Storage", value: "512GB SSD" },
				{ label: "Weight", value: "1.2kg" },
			],
		},
		3: {
			id: 3,
			name: "ThinkPad X1 Carbon",
			description:
				"Business-ready laptop with rugged build, fingerprint login, and long battery.",
			priceRange: "$1,099 - $1,349",
			rating: 4.7,
			reviews: 284,
			images: [
				"https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "CPU", value: "Intel Core i7" },
				{ label: "RAM", value: "16GB" },
				{ label: "Storage", value: "1TB SSD" },
				{ label: "Security", value: "Fingerprint + TPM" },
			],
		},
		4: {
			id: 4,
			name: "HP Spectre x360",
			description:
				"Convertible 2-in-1 laptop with touchscreen display and premium audio.",
			priceRange: "$1,049 - $1,249",
			rating: 4.5,
			reviews: 198,
			images: [
				"https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "Display", value: "13.5-inch Touch" },
				{ label: "RAM", value: "16GB" },
				{ label: "Storage", value: "512GB SSD" },
				{ label: "Mode", value: "360-degree hinge" },
			],
		},
		5: {
			id: 5,
			name: "iPhone 15 Pro",
			description:
				"Flagship iPhone with Pro camera system, titanium design, and fast A-series chip.",
			priceRange: "$899 - $1,099",
			rating: 4.8,
			reviews: 512,
			images: [
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1512499617640-c2f999098b8f?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1477511801984-4ad318ed9846?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "Chip", value: "A-series Pro" },
				{ label: "Storage", value: "256GB" },
				{ label: "Camera", value: "48MP Pro system" },
				{ label: "Display", value: "6.1-inch OLED" },
			],
		},
		6: {
			id: 6,
			name: "Samsung Galaxy S24",
			description:
				"Premium Galaxy phone with pro-grade camera, vivid display, and fast charging.",
			priceRange: "$799 - $999",
			rating: 4.7,
			reviews: 433,
			images: [
				"https://images.unsplash.com/photo-1510557880182-3d4d3cba35f5?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1503602642458-232111445657?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "Chip", value: "Snapdragon Gen" },
				{ label: "Storage", value: "256GB" },
				{ label: "Camera", value: "50MP triple" },
				{ label: "Display", value: "6.2-inch AMOLED" },
			],
		},
		7: {
			id: 7,
			name: "Google Pixel 8",
			description:
				"Clean Android experience with advanced AI camera features and smooth performance.",
			priceRange: "$699 - $899",
			rating: 4.6,
			reviews: 221,
			images: [
				"https://images.unsplash.com/photo-1503602642458-232111445657?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1523475472568-7d1d2f8adf8d?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "Chip", value: "Tensor" },
				{ label: "Storage", value: "128GB" },
				{ label: "Camera", value: "50MP dual" },
				{ label: "Display", value: "6.2-inch OLED" },
			],
		},
		8: {
			id: 8,
			name: "iPhone 14",
			description:
				"Reliable iPhone with all-day battery, great cameras, and smooth iOS performance.",
			priceRange: "$649 - $799",
			rating: 4.6,
			reviews: 284,
			images: [
				"https://images.unsplash.com/photo-1477511801984-4ad318ed9846?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1512499617640-c2f999098b8f?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "Chip", value: "A-series" },
				{ label: "Storage", value: "128GB" },
				{ label: "Camera", value: "Dual 12MP" },
				{ label: "Display", value: "6.1-inch OLED" },
			],
		},
		9: {
			id: 9,
			name: "ASUS ROG Zephyrus G14",
			description:
				"Compact gaming laptop with high-refresh display and powerful discrete graphics.",
			priceRange: "$1,299 - $1,499",
			rating: 4.7,
			reviews: 164,
			images: [
				"https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "GPU", value: "RTX Series" },
				{ label: "RAM", value: "16GB" },
				{ label: "Storage", value: "1TB SSD" },
				{ label: "Display", value: "14-inch 120Hz" },
			],
		},
		10: {
			id: 10,
			name: "Microsoft Surface Laptop 5",
			description:
				"Elegant ultrabook with a sharp touchscreen and fast performance for daily work.",
			priceRange: "$999 - $1,199",
			rating: 4.5,
			reviews: 142,
			images: [
				"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "Display", value: "13.5-inch Touch" },
				{ label: "RAM", value: "16GB" },
				{ label: "Storage", value: "512GB SSD" },
				{ label: "Weight", value: "1.27kg" },
			],
		},
		11: {
			id: 11,
			name: "OnePlus 12",
			description:
				"Fast-charging Android flagship with vibrant display and smooth performance.",
			priceRange: "$749 - $899",
			rating: 4.6,
			reviews: 188,
			images: [
				"https://images.unsplash.com/photo-1523475472568-7d1d2f8adf8d?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1503602642458-232111445657?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "Chip", value: "Snapdragon Gen" },
				{ label: "Storage", value: "256GB" },
				{ label: "Camera", value: "50MP triple" },
				{ label: "Charging", value: "Fast charge" },
			],
		},
		12: {
			id: 12,
			name: "Samsung Galaxy A55",
			description:
				"Mid-range Galaxy phone with long battery life and a bright AMOLED screen.",
			priceRange: "$469 - $549",
			rating: 4.4,
			reviews: 201,
			images: [
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1510557880182-3d4d3cba35f5?w=700&h=500&fit=crop",
				"https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=700&h=500&fit=crop",
			],
			specs: [
				{ label: "Display", value: "6.5-inch AMOLED" },
				{ label: "Storage", value: "128GB" },
				{ label: "Camera", value: "50MP triple" },
				{ label: "Battery", value: "All-day" },
			],
		},
	};

	const product = productsById[Number(id)];

	const offersById = {
		1: [
			{
				id: 301,
				seller: "Nnamdi Tech Market",
				price: 1299,
				shipping: 12.0,
				delivery: "2-4 days",
				rating: 4.9,
				verified: true,
				inStock: true,
			},
			{
				id: 306,
				seller: "Adaeze Electronics",
				price: 1249,
				shipping: 10.0,
				delivery: "3-5 days",
				rating: 4.8,
				verified: true,
				inStock: true,
			},
			{
				id: 305,
				seller: "Ugochi Digital",
				price: 1199,
				shipping: 14.0,
				delivery: "4-6 days",
				rating: 4.2,
				verified: false,
				inStock: false,
			},
		],
		2: [
			{
				id: 304,
				seller: "Chinedu Audio",
				price: 1049,
				shipping: 11.0,
				delivery: "3-5 days",
				rating: 4.6,
				verified: true,
				inStock: true,
			},
			{
				id: 305,
				seller: "Ugochi Digital",
				price: 999,
				shipping: 12.0,
				delivery: "4-6 days",
				rating: 4.2,
				verified: false,
				inStock: false,
			},
			{
				id: 306,
				seller: "Adaeze Electronics",
				price: 1099,
				shipping: 9.0,
				delivery: "2-4 days",
				rating: 4.8,
				verified: true,
				inStock: true,
			},
		],
		3: [
			{
				id: 301,
				seller: "Nnamdi Tech Market",
				price: 1199,
				shipping: 9.0,
				delivery: "2-4 days",
				rating: 4.9,
				verified: true,
				inStock: true,
			},
			{
				id: 306,
				seller: "Adaeze Electronics",
				price: 1149,
				shipping: 10.0,
				delivery: "3-5 days",
				rating: 4.8,
				verified: true,
				inStock: true,
			},
			{
				id: 303,
				seller: "Obinna Gadgets",
				price: 1099,
				shipping: 12.0,
				delivery: "4-6 days",
				rating: 4.4,
				verified: false,
				inStock: false,
			},
		],
		4: [
			{
				id: 303,
				seller: "Obinna Gadgets",
				price: 1099,
				shipping: 10.0,
				delivery: "3-6 days",
				rating: 4.4,
				verified: false,
				inStock: false,
			},
			{
				id: 304,
				seller: "Chinedu Audio",
				price: 1049,
				shipping: 11.0,
				delivery: "4-6 days",
				rating: 4.6,
				verified: true,
				inStock: true,
			},
			{
				id: 301,
				seller: "Nnamdi Tech Market",
				price: 1149,
				shipping: 9.0,
				delivery: "2-4 days",
				rating: 4.9,
				verified: true,
				inStock: true,
			},
		],
		5: [
			{
				id: 301,
				seller: "Nnamdi Tech Market",
				price: 999,
				shipping: 8.0,
				delivery: "2-4 days",
				rating: 4.9,
				verified: true,
				inStock: true,
			},
			{
				id: 306,
				seller: "Adaeze Electronics",
				price: 979,
				shipping: 9.0,
				delivery: "3-5 days",
				rating: 4.8,
				verified: true,
				inStock: true,
			},
			{
				id: 305,
				seller: "Ugochi Digital",
				price: 949,
				shipping: 10.5,
				delivery: "4-6 days",
				rating: 4.2,
				verified: false,
				inStock: false,
			},
		],
		6: [
			{
				id: 306,
				seller: "Adaeze Electronics",
				price: 899,
				shipping: 9.0,
				delivery: "3-5 days",
				rating: 4.8,
				verified: true,
				inStock: true,
			},
			{
				id: 305,
				seller: "Ugochi Digital",
				price: 869,
				shipping: 11.0,
				delivery: "4-6 days",
				rating: 4.2,
				verified: false,
				inStock: false,
			},
			{
				id: 304,
				seller: "Chinedu Audio",
				price: 919,
				shipping: 8.5,
				delivery: "3-5 days",
				rating: 4.6,
				verified: true,
				inStock: true,
			},
		],
		7: [
			{
				id: 304,
				seller: "Chinedu Audio",
				price: 799,
				shipping: 8.5,
				delivery: "3-5 days",
				rating: 4.6,
				verified: true,
				inStock: true,
			},
			{
				id: 303,
				seller: "Obinna Gadgets",
				price: 769,
				shipping: 9.0,
				delivery: "4-6 days",
				rating: 4.4,
				verified: false,
				inStock: false,
			},
			{
				id: 305,
				seller: "Ugochi Digital",
				price: 749,
				shipping: 10.0,
				delivery: "4-7 days",
				rating: 4.2,
				verified: false,
				inStock: false,
			},
		],
		8: [
			{
				id: 301,
				seller: "Nnamdi Tech Market",
				price: 699,
				shipping: 7.0,
				delivery: "2-4 days",
				rating: 4.9,
				verified: true,
				inStock: true,
			},
			{
				id: 305,
				seller: "Ugochi Digital",
				price: 679,
				shipping: 8.0,
				delivery: "4-6 days",
				rating: 4.2,
				verified: false,
				inStock: false,
			},
			{
				id: 306,
				seller: "Adaeze Electronics",
				price: 689,
				shipping: 7.5,
				delivery: "3-5 days",
				rating: 4.8,
				verified: true,
				inStock: true,
			},
		],
		9: [
			{
				id: 303,
				seller: "Obinna Gadgets",
				price: 1399,
				shipping: 12.0,
				delivery: "3-6 days",
				rating: 4.4,
				verified: false,
				inStock: false,
			},
			{
				id: 304,
				seller: "Chinedu Audio",
				price: 1349,
				shipping: 11.0,
				delivery: "4-6 days",
				rating: 4.6,
				verified: true,
				inStock: true,
			},
			{
				id: 301,
				seller: "Nnamdi Tech Market",
				price: 1449,
				shipping: 10.0,
				delivery: "2-4 days",
				rating: 4.9,
				verified: true,
				inStock: true,
			},
		],
		10: [
			{
				id: 301,
				seller: "Nnamdi Tech Market",
				price: 1099,
				shipping: 9.0,
				delivery: "2-4 days",
				rating: 4.9,
				verified: true,
				inStock: true,
			},
			{
				id: 306,
				seller: "Adaeze Electronics",
				price: 1049,
				shipping: 10.0,
				delivery: "3-5 days",
				rating: 4.8,
				verified: true,
				inStock: true,
			},
			{
				id: 305,
				seller: "Ugochi Digital",
				price: 999,
				shipping: 11.0,
				delivery: "4-6 days",
				rating: 4.2,
				verified: false,
				inStock: false,
			},
		],
		11: [
			{
				id: 304,
				seller: "Chinedu Audio",
				price: 799,
				shipping: 8.5,
				delivery: "3-5 days",
				rating: 4.6,
				verified: true,
				inStock: true,
			},
			{
				id: 303,
				seller: "Obinna Gadgets",
				price: 769,
				shipping: 9.0,
				delivery: "4-6 days",
				rating: 4.4,
				verified: false,
				inStock: false,
			},
			{
				id: 306,
				seller: "Adaeze Electronics",
				price: 819,
				shipping: 8.0,
				delivery: "3-5 days",
				rating: 4.8,
				verified: true,
				inStock: true,
			},
		],
		12: [
			{
				id: 306,
				seller: "Adaeze Electronics",
				price: 499,
				shipping: 7.0,
				delivery: "3-5 days",
				rating: 4.8,
				verified: true,
				inStock: true,
			},
			{
				id: 305,
				seller: "Ugochi Digital",
				price: 479,
				shipping: 8.0,
				delivery: "4-6 days",
				rating: 4.2,
				verified: false,
				inStock: false,
			},
			{
				id: 304,
				seller: "Chinedu Audio",
				price: 509,
				shipping: 7.5,
				delivery: "3-5 days",
				rating: 4.6,
				verified: true,
				inStock: true,
			},
		],
	};

	if (!product) {
		return (
			<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
					<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
						Product not found
					</h1>
					<p style={{ color: "var(--muted)" }}>
						We couldn't find that product. Please browse the catalog.
					</p>
					<Link
						to="/buyer/search"
						className="inline-flex px-6 py-3 text-white rounded-lg font-semibold"
						style={{ backgroundColor: "var(--accent-secondary)" }}
					>
						Back to search
					</Link>
				</div>
			</div>
		);
	}

	const offers = offersById[Number(id)] ?? offersById[1];
	const selectedOffer = sellerParam
		? offers.find((offer) => String(offer.id) === String(sellerParam))
		: null;
	const selectedImageIndex =
		selectedOffer != null ? offers.findIndex((offer) => offer.id === selectedOffer.id) : 0;
	const imageIndex = selectedImageIndex >= 0 ? selectedImageIndex % product.images.length : 0;

	const reviews = [
		{
			id: 1,
			name: "Samir A.",
			rating: 5,
			date: "Jan 12, 2026",
			comment: "Great performance and the build quality feels premium.",
		},
		{
			id: 2,
			name: "Lina M.",
			rating: 4,
			date: "Jan 5, 2026",
			comment: "Battery life is excellent and setup was quick.",
		},
	];
	const inStockOffers = offers.filter((offer) => offer.inStock !== false);
	const bestOfferSource = inStockOffers.length > 0 ? inStockOffers : offers;
	const bestOffer = bestOfferSource.reduce(
		(best, current) => (current.price < best.price ? current : best),
		bestOfferSource[0],
	);
	const allOutOfStock = inStockOffers.length === 0;

	const showToast = (productName) => {
		setToast({
			id: `${productName}-${Date.now()}`,
			title: "Added to cart",
			subtitle: productName,
		});
		window.setTimeout(() => setToast(null), 2200);
	};

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
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
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				<div className="text-sm" style={{ color: "var(--muted)" }}>
					<Link to="/" className="hover:underline">
						Home
					</Link>{" "}
					/{" "}
					<Link to="/buyer/search" className="hover:underline">
						Search
					</Link>{" "}
					/ <span style={{ color: "var(--accent)" }}>{product.name}</span>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					<div className="space-y-4">
						<div
							className="rounded-2xl border overflow-hidden"
							style={{ borderColor: "var(--border)" }}
						>
							<img
								src={product.images[imageIndex]}
								alt={product.name}
								className="w-full h-96 object-cover"
							/>
						</div>
						<div className="grid grid-cols-3 gap-4">
							{product.images
								.slice(0)
								.filter((_, idx) => idx !== imageIndex)
								.map((image) => (
									<div
										key={image}
										className="rounded-xl border overflow-hidden"
										style={{ borderColor: "var(--border)" }}
									>
										<img src={image} alt="" className="w-full h-24 object-cover" />
									</div>
								))}
						</div>
					</div>

					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
								{product.name}
							</h1>
							<p className="mt-2" style={{ color: "var(--muted)" }}>
								{product.description}
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-4">
							<button
								className={`px-5 py-3 rounded-lg text-white font-semibold ${
									allOutOfStock ? "opacity-60 cursor-not-allowed" : ""
								}`}
								style={{ backgroundColor: "var(--accent-secondary)" }}
								onClick={() => {
									if (allOutOfStock) return;
									addToCart(
										{
											id: `${product.id}-${bestOffer.id}`,
											name: product.name,
											price: bestOffer.price,
											image: product.images[0],
											shippingCost: bestOffer.shipping,
											deliveryEstimate: bestOffer.delivery,
										},
										{
											id: bestOffer.id,
											name: bestOffer.seller,
											rating: bestOffer.rating,
										},
										1,
									);
								}}
								onClickCapture={() => {
									if (!allOutOfStock) showToast(product.name);
								}}
								onMouseEnter={(e) => {
									if (allOutOfStock) return;
									e.target.style.backgroundColor = "var(--accent-secondary-strong)";
								}}
								onMouseLeave={(e) => {
									if (allOutOfStock) return;
									e.target.style.backgroundColor = "var(--accent-secondary)";
								}}
								disabled={allOutOfStock}
							>
								{allOutOfStock ? "Out of Stock" : "Add to Cart (Best Price)"}
							</button>
							<span className="text-sm" style={{ color: "var(--muted)" }}>
								Best price from {bestOffer.seller} • ${bestOffer.price}
							</span>
						</div>

						<div className="flex items-center gap-3">
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, index) => (
									<Star
										key={index}
										className={`w-4 h-4 ${
											index < Math.floor(product.rating)
												? "text-yellow-400 fill-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>
							<span style={{ color: "var(--muted)" }}>
								{product.rating} ({product.reviews} reviews)
							</span>
						</div>

						<div className="rounded-xl border p-5" style={{ borderColor: "var(--border)" }}>
							<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
								Specs
							</h2>
							<div className="grid grid-cols-2 gap-4 mt-4 text-sm">
								{product.specs.map((spec) => (
									<div key={spec.label}>
										<p style={{ color: "var(--muted)" }}>{spec.label}</p>
										<p className="font-medium" style={{ color: "var(--text)" }}>
											{spec.value}
										</p>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-2xl border p-6" style={{ borderColor: "var(--border)" }}>
							<div className="flex flex-wrap items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
										Available Offers
									</h2>
									<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
										Compare price, shipping, and delivery from sellers
									</p>
								</div>
								<Link
									to={`/buyer/compare/${product.id}`}
									className="text-sm font-semibold px-4 py-2 rounded-lg border"
									style={{ color: "var(--accent-secondary)", borderColor: "var(--border)" }}
								>
									Compare Prices
								</Link>
							</div>
							<div className="mt-4 space-y-4">
								{offers.map((offer) => (
									<div
										key={offer.id}
										className="group border rounded-xl p-4 md:p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
										style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
									>
										<div className="min-w-0 flex-1">
											<div className="flex items-center gap-2">
												<Store className="w-4 h-4" style={{ color: "var(--accent)" }} />
												<p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
													{offer.seller}
												</p>
											{offer.verified && (
												<span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
													<ShieldCheck className="w-3 h-3" />
													Verified
												</span>
											)}
											{offer.inStock === false && (
												<span
													className="text-xs font-semibold px-2 py-0.5 rounded-full"
													style={{ backgroundColor: "rgba(0, 0, 0, 0.08)", color: "var(--muted)" }}
												>
													Out of stock
												</span>
											)}
										</div>
											<p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
												Rating {offer.rating} • Ships in {offer.delivery}
											</p>
										</div>
										<div className="flex flex-wrap items-center gap-6 lg:justify-end lg:flex-1">
										<div>
											<p className="text-xs" style={{ color: "var(--muted)" }}>
												Price
											</p>
											<p className="text-base font-bold" style={{ color: "var(--accent)" }}>
												${offer.price}
											</p>
										</div>
										<div>
											<p className="text-xs" style={{ color: "var(--muted)" }}>
												Shipping
											</p>
											<p className="text-base font-bold" style={{ color: "var(--accent)" }}>
												${offer.shipping}
											</p>
										</div>
										<div>
											<button
												className={`px-4 py-2 text-white rounded-lg text-sm font-semibold transition opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto ${
													offer.inStock === false ? "opacity-60 cursor-not-allowed" : ""
												}`}
												style={{ backgroundColor: "var(--accent-secondary)" }}
												onClick={() => {
													if (offer.inStock === false) return;
													addToCart(
														{
															id: `${product.id}-${offer.id}`,
															name: product.name,
															price: offer.price,
															image: product.images[0],
															shippingCost: offer.shipping,
															deliveryEstimate: offer.delivery,
														},
														{
															id: offer.id,
															name: offer.seller,
															rating: offer.rating,
														},
														1,
													);
												}}
												onClickCapture={() => {
													if (offer.inStock !== false) showToast(product.name);
												}}
												onMouseEnter={(e) => {
													if (offer.inStock === false) return;
													e.target.style.backgroundColor = "var(--accent-secondary-strong)";
												}}
												onMouseLeave={(e) => {
													if (offer.inStock === false) return;
													e.target.style.backgroundColor = "var(--accent-secondary)";
												}}
												disabled={offer.inStock === false}
											>
												{offer.inStock === false ? "Out of Stock" : "Add to Cart"}
											</button>
										</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
								Reviews
							</h2>
							<Link
								to="/buyer/reviews"
								className="text-sm font-semibold"
								style={{ color: "var(--accent-secondary)" }}
							>
								Write a review
							</Link>
						</div>
						{reviews.map((review) => (
							<div
								key={review.id}
								className="border rounded-lg p-4"
								style={{ borderColor: "var(--border)" }}
							>
								<div className="flex items-center justify-between">
									<p className="font-semibold" style={{ color: "var(--accent)" }}>
										{review.name}
									</p>
									<p className="text-sm" style={{ color: "var(--muted)" }}>
										{review.date}
									</p>
								</div>
								<div className="flex items-center gap-1 mt-2">
									{[...Array(5)].map((_, index) => (
										<Star
											key={index}
											className={`w-4 h-4 ${
												index < review.rating
													? "text-yellow-400 fill-yellow-400"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<p className="mt-2" style={{ color: "var(--muted)" }}>
									{review.comment}
								</p>
							</div>
						))}
					</div>
					<div className="space-y-4">
						<div className="border rounded-lg p-5" style={{ borderColor: "var(--border)" }}>
							<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
								Shipping
							</h3>
							<div className="mt-4 space-y-3 text-sm" style={{ color: "var(--muted)" }}>
								<div className="flex items-center gap-2">
									<Truck className="w-4 h-4" />
									<span>Free returns within 14 days</span>
								</div>
								<div className="flex items-center gap-2">
									<ShieldCheck className="w-4 h-4" />
									<span>Buyer protection guaranteed</span>
								</div>
								<p>Estimated delivery varies by seller.</p>
							</div>
						</div>
						<div className="border rounded-lg p-5" style={{ borderColor: "var(--border)" }}>
							<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
								Need help?
							</h3>
							<p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
								Message the seller for product questions or policy details.
							</p>
							<Link
								to="/buyer/messages"
								className="mt-4 inline-flex items-center justify-center w-full text-white px-4 py-2 rounded-lg font-semibold"
								style={{ backgroundColor: "var(--accent)" }}
							>
								Message Seller
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
