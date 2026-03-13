import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../app/providers.jsx";
import { useCart } from "../app/CartContext.jsx";
import Footer from "../components/layout/Footer.jsx";
import ThemeToggle from "../components/ui/ThemeToggle.jsx";
import {
	ShoppingCart,
	Store,
	Shield,
	Truck,
	Search,
	Star,
	CheckCircle,
	Users,
	Package,
	Heart,
	MessageSquare,
	ChevronRight,
	Clock,
	Award,
	Zap,
	Laptop,
	Smartphone,
	Gamepad2,
	Cpu,
	Briefcase,
	Wallet,
} from "lucide-react";

const Home = () => {
	const { user } = useAuth();
	const { addToCart, itemCount } = useCart();
	const [addingId, setAddingId] = useState(null);
	const [cartPulse, setCartPulse] = useState(false);
	const [toast, setToast] = useState(null);

	const handleAddToCart = (product) => {
		addToCart(product, product.seller, 1);
		setAddingId(product.id);
		setCartPulse(true);
		setToast({
			id: `${product.id}-${Date.now()}`,
			title: "Added to cart",
			subtitle: product.name,
		});
		window.setTimeout(() => setAddingId(null), 500);
		window.setTimeout(() => setCartPulse(false), 700);
		window.setTimeout(() => setToast(null), 2200);
	};

	const categories = [
		{ name: "Laptops", icon: Laptop },
		{ name: "Phones", icon: Smartphone },
		{ name: "Gaming Laptops", icon: Gamepad2 },
		{ name: "Ultrabooks", icon: Cpu },
		{ name: "Business", icon: Briefcase },
		{ name: "Budget Phones", icon: Wallet },
	];

	const products = [
		{
			id: 1,
			name: 'MacBook Pro 16"',
			price: "$1,299",
			rating: 4.8,
			reviews: 256,
			discount: 18,
			seller: { id: 101, name: "Nnamdi Tech Market", rating: 4.9 },
			image:
				"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
		},
		{
			id: 2,
			name: "Dell XPS 13",
			price: "$1,049",
			rating: 4.6,
			reviews: 188,
			discount: 13,
			seller: { id: 102, name: "Adaeze Electronics", rating: 4.8 },
			image:
				"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
		},
		{
			id: 3,
			name: "iPhone 15 Pro",
			price: "$999",
			rating: 4.8,
			reviews: 512,
			discount: 9,
			seller: { id: 103, name: "Nnamdi Tech Market", rating: 4.9 },
			image:
				"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
		},
		{
			id: 4,
			name: "Samsung Galaxy S24",
			price: "$899",
			rating: 4.7,
			reviews: 433,
			discount: 10,
			seller: { id: 104, name: "Adaeze Electronics", rating: 4.8 },
			image:
				"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
		},
	];

	const bestDeals = [
		{
			id: 1,
			name: "Surface Laptop 5",
			price: "$1,099",
			originalPrice: "$1,299",
			discount: 15,
			seller: { id: 201, name: "Nnamdi Tech Market", rating: 4.9 },
			image:
				"https://images.unsplash.com/photo-1587614295999-6c1bd9c4f04d?w=400&h=300&fit=crop",
		},
		{
			id: 2,
			name: "ASUS ROG Zephyrus G14",
			price: "$1,349",
			originalPrice: "$1,599",
			discount: 16,
			seller: { id: 202, name: "Obinna Gadgets", rating: 4.6 },
			image:
				"https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
		},
		{
			id: 3,
			name: "iPhone 14",
			price: "$679",
			originalPrice: "$799",
			discount: 15,
			seller: { id: 203, name: "Ugochi Digital", rating: 4.2 },
			image:
				"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
		},
		{
			id: 4,
			name: "Google Pixel 8",
			price: "$769",
			originalPrice: "$899",
			discount: 14,
			seller: { id: 204, name: "Chinedu Audio", rating: 4.6 },
			image:
				"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
		},
	];
	const reviews = [
		{
			name: "Chinedu E.",
			rating: 5,
			title: "Fast delivery and great support",
			text: "My order arrived earlier than expected and the seller replied quickly.",
			avatar:
				"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
		},
		{
			name: "Emeka O.",
			rating: 4,
			title: "Easy checkout",
			text: "I bought from two sellers in one checkout. Smooth experience.",
			avatar:
				"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
		},
		{
			name: "Ikenna N.",
			rating: 5,
			title: "Loved the quality",
			text: "Product quality matched the photos and the packaging was perfect.",
			avatar:
				"https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=80&h=80&fit=crop&crop=face",
		},
		{
			name: "Obinna K.",
			rating: 5,
			title: "Seller communication is great",
			text: "Quick replies and clear shipping updates throughout the order.",
			avatar:
				"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face",
		},
		{
			name: "Uche M.",
			rating: 4,
			title: "Good value for money",
			text: "Prices are competitive and the deals are real.",
			avatar:
				"https://images.unsplash.com/photo-1528892952291-009c663ce843?w=80&h=80&fit=crop&crop=face",
		},
		{
			name: "Kelechi A.",
			rating: 5,
			title: "Smooth returns",
			text: "Returned an item easily and got the refund fast.",
			avatar:
				"https://images.unsplash.com/photo-1507120410856-1f35574c3b45?w=80&h=80&fit=crop&crop=face",
		},
	];

	const heroSlides = [
		"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2000&h=1200&fit=crop",
		"https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=2000&h=1200&fit=crop",
		"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=2000&h=1200&fit=crop",
		"https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=2000&h=1200&fit=crop",
	];
	const [activeHeroIndex, setActiveHeroIndex] = useState(0);

	useEffect(() => {
		const timer = window.setInterval(() => {
			setActiveHeroIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
		}, 4500);

		return () => window.clearInterval(timer);
	}, [heroSlides.length]);

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

			{/* Top Promo Bar */}
			<div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#dc5500] px-4 py-2 text-base text-white">
				<div className="promo-line promo-breathe">
					<span className="font-medium inline-flex items-center gap-2">
						<Zap className="w-4 h-4 text-white promo-breathe-icon" />
						50% OFF
					</span>
					<span>on Select Items - Limited Time Offer!</span>
					<Link to="/buyer/search" className="underline hover:no-underline text-white">
						Shop Now
					</Link>
				</div>
			</div>

			{/* Header */}
			<header className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-b border-[#e4d4bc] bg-[#f5e8d4]">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between gap-4 py-4">
						<div className="flex items-center space-x-3">
							<div className="h-9 w-9 rounded-lg bg-[#f26500] text-white font-bold flex items-center justify-center">
								GM
							</div>
							<h1 className="text-4xl font-bold text-[#1f2937]">Gaza Market</h1>
						</div>

						<div className="hidden md:flex flex-1 max-w-[460px]">
							<div className="relative w-full">
								<input
									type="text"
									placeholder="Search products..."
									className="w-full rounded-lg border border-[#d4c2a7] bg-[#ececec] px-4 py-2.5 pr-10 text-sm text-gray-800 focus:border-[#f26500] focus:ring-2 focus:ring-[#f26500]/20"
								/>
								<Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
							</div>
						</div>

						<div className="flex items-center gap-4 text-sm font-medium text-gray-700">
							<ThemeToggle />
							<Link to="/help#support" className="hidden md:inline hover:text-[#f26500]">
								Customer Support
							</Link>
							<Link to="/help#faq" className="hidden md:inline hover:text-[#f26500]">
								Need Help?
							</Link>
							{user ? (
								<>
									<Link
										to="/buyer/cart"
										className={`relative p-2 hover:text-[#f26500] ${cartPulse ? "cart-bounce" : ""}`}
										data-cart-icon
									>
										<ShoppingCart className="w-5 h-5" />
										{itemCount > 0 && (
											<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f26500] text-xs text-white">
												{itemCount}
											</span>
										)}
									</Link>
									<Link
										to={`/${user.userType}/dashboard`}
										className="rounded-lg bg-[#f26500] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dc5500]"
									>
										Dashboard
									</Link>
								</>
							) : (
								<>
									<Link to="/login" className="hover:text-[#f26500]">
										Login
									</Link>
									<Link
										to="/register"
										className="rounded-lg bg-[#f26500] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dc5500]"
									>
										Sign Up
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</header>

			{/* Hero Banner */}
			<section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[520px] w-screen overflow-hidden text-white">
				<div className="absolute inset-0 z-0">
					{heroSlides.map((slide, index) => (
						<img
							key={slide}
							src={slide}
							alt=""
							aria-hidden="true"
							className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
								index === activeHeroIndex ? "opacity-100" : "opacity-0"
							}`}
						/>
					))}
					<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto min-h-[520px] px-4 sm:px-6 lg:px-8 flex items-end py-14 md:py-20">
					<div className="max-w-3xl">
						<h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: "#ffffff" }}>
							Shop Amazing Deals
						</h2>
						<p className="text-xl mb-8" style={{ color: "rgba(255, 255, 255, 0.88)" }}>
							Discover thousands of products from verified sellers with guaranteed quality and secure checkout.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								to="/buyer/search"
								className="text-white px-6 py-3 rounded-lg transition-colors font-semibold inline-flex items-center justify-center"
								style={{ backgroundColor: "var(--accent-secondary)" }}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary)")
								}
							>
								<ShoppingCart className="w-5 h-5 mr-2" />
								Start Shopping
							</Link>
							<Link
								to="/register"
								className="px-6 py-3 rounded-lg transition-colors font-semibold inline-flex items-center justify-center border border-white/80 text-white bg-white/10 hover:bg-white/20"
							>
								<Store className="w-5 h-5 mr-2" />
								Become a Seller
							</Link>
						</div>
						<div className="mt-8 flex items-center gap-2">
							{heroSlides.map((slide, index) => (
								<button
									key={`${slide}-dot`}
									type="button"
									onClick={() => setActiveHeroIndex(index)}
									aria-label={`Show hero slide ${index + 1}`}
									className={`h-2.5 rounded-full transition-all ${
										index === activeHeroIndex ? "w-8 bg-white" : "w-2.5 bg-white/55"
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Features Bar */}
			<section
				className="border-b border-gray-200 py-20"
				style={{ backgroundColor: "var(--surface-strong)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<div className="gm-card home-card flex items-center gap-4 p-5">
							<div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
								<Truck className="w-8 h-8 text-blue-600" />
							</div>
							<div>
								<h4 className="font-bold text-gray-900 text-lg">
									Fast Shipping
								</h4>
								<p className="text-sm text-gray-600">Free on orders over $50</p>
							</div>
						</div>
						<div className="gm-card home-card flex items-center gap-4 p-5">
							<div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
								<Shield className="w-8 h-8 text-green-600" />
							</div>
							<div>
								<h4 className="font-bold text-gray-900 text-lg">100% Secure</h4>
								<p className="text-sm text-gray-600">
									Buyer protection guaranteed
								</p>
							</div>
						</div>
						<div className="gm-card home-card flex items-center gap-4 p-5">
							<div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
								<Award className="w-8 h-8 text-orange-600" />
							</div>
							<div>
								<h4 className="font-bold text-gray-900 text-lg">
									Verified Sellers
								</h4>
								<p className="text-sm text-gray-600">Only trusted merchants</p>
							</div>
						</div>
						<div className="gm-card home-card flex items-center gap-4 p-5">
							<div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
								<Clock className="w-8 h-8 text-purple-600" />
							</div>
							<div>
								<h4 className="font-bold text-gray-900 text-lg">
									24/7 Support
								</h4>
								<p className="text-sm text-gray-600">Always here to help</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Shop by Category */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900">
							Shop with Categories
						</h2>
						<Link
							to="/buyer/search"
							className="text-orange-600 hover:text-orange-700 font-semibold flex items-center"
						>
							View All <ChevronRight className="w-5 h-5 ml-1" />
						</Link>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-6 gap-6">
						{categories.map((cat, idx) => (
							<Link
								key={idx}
								to="/buyer/search"
								className="gm-card home-card relative overflow-hidden transition-shadow hover:shadow-[0_30px_60px_-40px_var(--shadow-strong)] group"
							>
								<div
									className="relative h-32 flex items-center justify-center p-4"
									style={{ backgroundColor: "var(--surface)" }}
								>
									<div
										className="w-14 h-14 rounded-2xl flex items-center justify-center"
										style={{ backgroundColor: "var(--accent-tint)" }}
									>
										<cat.icon
											className="w-7 h-7"
											style={{ color: "var(--accent)" }}
										/>
									</div>
								</div>
								<div className="relative p-5 space-y-2 text-center">
									<h3
										className="font-semibold text-lg"
										style={{ color: "var(--ink)" }}
									>
										{cat.name}
									</h3>
									<p className="text-xs" style={{ color: "var(--muted)" }}>
										Shop {cat.name}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Best Deals Section */}
			<section
				className="py-12 border-t border-b"
				style={{
					backgroundColor: "var(--surface-accent)",
					borderColor: "var(--border)",
				}}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-8">
						<div>
							<h2 className="text-3xl font-bold text-gray-900">
								Best Deals For You
							</h2>
							<p className="text-lg text-gray-600 mt-1">
								Limited time offers on premium products
							</p>
						</div>
						<Link
							to="/buyer/search"
							className="text-orange-600 hover:text-orange-700 font-semibold flex items-center"
						>
							All Deals <ChevronRight className="w-5 h-5 ml-1" />
						</Link>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{bestDeals.map((product) => (
							<Link
								key={product.id}
								to="/buyer/search"
								className="gm-card home-card relative overflow-hidden transition-shadow hover:shadow-[0_30px_60px_-40px_var(--shadow-strong)] group"
							>
								<span
									className="absolute top-4 right-4 z-10 text-white text-xs font-semibold px-3 py-1 rounded-full"
									style={{ backgroundColor: "var(--accent)" }}
								>
									-{product.discount}%
								</span>

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
									<h3
										className="text-lg font-bold"
										style={{ color: "var(--ink)" }}
									>
										{product.name}
									</h3>

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
										className={`w-full mt-3 py-2 rounded-lg text-white font-semibold transition opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto ${
											addingId === product.id
												? "scale-[1.02] shadow-[0_14px_32px_-18px_rgba(0,0,0,0.35)]"
												: ""
										}`}
										style={{
											backgroundColor: "var(--accent-secondary)",
										}}
										onClick={(e) => {
											e.preventDefault();
											handleAddToCart(product);
										}}
										onMouseEnter={(e) => {
											e.target.style.backgroundColor =
												"var(--accent-secondary-strong)";
										}}
										onMouseLeave={(e) => {
											e.target.style.backgroundColor =
												"var(--accent-secondary)";
										}}
									>
										Add to Cart
									</button>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section className="py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-3xl font-bold text-gray-900">
							Featured Products
						</h2>
						<Link
							to="/buyer/search"
							className="text-orange-600 hover:text-orange-700 font-semibold flex items-center"
						>
							See More <ChevronRight className="w-5 h-5 ml-1" />
						</Link>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{products.map((product) => (
							<Link
								key={product.id}
								to="/buyer/search"
								className="gm-card home-card relative overflow-hidden transition-shadow hover:shadow-[0_30px_60px_-40px_var(--shadow-strong)] group"
							>
								{product.discount > 0 && (
									<span
										className="absolute top-4 right-4 z-10 text-white text-xs font-semibold px-3 py-1 rounded-full"
										style={{ backgroundColor: "var(--accent)" }}
									>
										-{product.discount}%
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
									<h3
										className="text-lg font-bold line-clamp-2"
										style={{ color: "var(--ink)" }}
									>
										{product.name}
									</h3>

									<div className="flex items-center gap-2">
										<div className="flex items-center">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`w-4 h-4 ${
														i < Math.floor(product.rating)
															? "fill-yellow-400 text-yellow-400"
															: "text-gray-300"
													}`}
												/>
											))}
										</div>
										<span className="text-xs" style={{ color: "var(--muted)" }}>
											({product.reviews})
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
										className={`w-full mt-3 py-2 rounded-lg text-white font-semibold transition opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto ${
											addingId === product.id
												? "scale-[1.02] shadow-[0_14px_32px_-18px_rgba(0,0,0,0.35)]"
												: ""
										}`}
										style={{
											backgroundColor: "var(--accent-secondary)",
										}}
										onClick={(e) => {
											e.preventDefault();
											handleAddToCart(product);
										}}
										onMouseEnter={(e) => {
											e.target.style.backgroundColor =
												"var(--accent-secondary-strong)";
										}}
										onMouseLeave={(e) => {
											e.target.style.backgroundColor =
												"var(--accent-secondary)";
										}}
									>
										Add to Cart
									</button>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section
				className="py-40 home-newsletter"
				style={{ backgroundColor: "var(--accent)" }}
			>
				<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl font-bold mb-3" style={{ color: "#ffffff" }}>
						Subscribe to Our Newsletter
					</h2>
					<p
						className="text-lg mb-6"
						style={{ color: "rgba(255, 255, 255, 0.82)" }}
					>
						Get exclusive deals, new arrivals, and special offers directly to
						your inbox
					</p>
					<div className="flex flex-col sm:flex-row gap-3">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
							style={{ backgroundColor: "#ffffff", color: "#1c1914" }}
						/>
						<button
							style={{ backgroundColor: "var(--accent-secondary)" }}
							className="text-white px-8 py-3 rounded-lg transition-colors font-semibold"
							onMouseEnter={(e) =>
								(e.target.style.backgroundColor =
									"var(--accent-secondary-strong)")
							}
							onMouseLeave={(e) =>
								(e.target.style.backgroundColor = "var(--accent-secondary)")
							}
						>
							Subscribe
						</button>
					</div>
				</div>
			</section>

			{/* Reviews Section */}
			<section
				className="py-20"
				style={{ backgroundColor: "var(--surface-accent)" }}
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2
							className="text-4xl font-extrabold"
							style={{ color: "var(--ink)" }}
						>
							What Shoppers Are Saying
						</h2>
						<p
							className="mt-3 text-lg font-medium"
							style={{ color: "var(--muted)" }}
						>
							Real feedback from buyers across the marketplace
						</p>
					</div>
					<div className="review-viewport">
						<div className="review-track">
							{reviews.concat(reviews).map((review, index) => (
								<div
									key={`${review.name}-${index}`}
									className="review-card min-w-[260px] sm:min-w-[320px] md:min-w-[340px] rounded-2xl p-6 border shadow-[0_18px_40px_-28px_var(--shadow-strong)]"
									style={{
										backgroundColor: "var(--surface-strong)",
										borderColor: "var(--border)",
										animationDelay: `${index * 120}ms`,
									}}
								>
									<div className="flex items-center gap-3 mb-4">
										<img
											src={review.avatar}
											alt={review.name}
											className="w-12 h-12 rounded-full object-cover border"
											style={{ borderColor: "var(--border)" }}
										/>
										<div>
											<p
												className="text-sm font-semibold"
												style={{ color: "var(--ink)" }}
											>
												{review.name}
											</p>
											<p className="text-xs" style={{ color: "var(--muted)" }}>
												Verified buyer
											</p>
										</div>
									</div>
									<div className="flex items-center gap-1 mb-3">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={
													i < review.rating
														? "w-4 h-4 fill-yellow-400 text-yellow-400"
														: "w-4 h-4 text-gray-300"
												}
											/>
										))}
									</div>
									<h3
										className="text-lg font-semibold"
										style={{ color: "var(--ink)" }}
									>
										{review.title}
									</h3>
									<p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
										{review.text}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Trust Badges */}
			<section
				className="py-8 border-t border-gray-200"
				style={{ backgroundColor: "var(--surface-strong)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-semibold text-gray-900 mb-6">
							Trusted by millions
						</h3>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
						<div>
							<div className="text-3xl font-bold text-orange-600">1.2M+</div>
							<p className="text-gray-600 text-base">Active Buyers</p>
						</div>
						<div>
							<div className="text-3xl font-bold text-orange-600">50K+</div>
							<p className="text-gray-600 text-base">Sellers</p>
						</div>
						<div>
							<div className="text-3xl font-bold text-orange-600">500K+</div>
							<p className="text-gray-600 text-base">Products</p>
						</div>
						<div>
							<div className="text-3xl font-bold text-orange-600">98%</div>
							<p className="text-gray-600 text-base">Satisfaction</p>
						</div>
						<div>
							<div className="text-3xl font-bold text-orange-600">24/7</div>
							<p className="text-gray-600 text-base">Support</p>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Home;
