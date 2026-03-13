import { Link, useParams } from "react-router-dom";
import { Star, ShieldCheck, MapPin } from "lucide-react";

const SellerStorefront = () => {
	const { id } = useParams();

	const seller = {
		id,
		name: "Nnamdi Tech Market",
		rating: 4.8,
		reviews: 1240,
		location: "Gaza City",
		verified: true,
		policies: [
			"Free returns within 14 days",
			"Ships within 24 hours",
			"Authenticity guaranteed",
		],
		about:
			"Nnamdi Tech Market specializes in laptops and smartphones with fast delivery and responsive support.",
	};

	const products = [
		{
			id: 1,
			productId: 1,
			name: 'MacBook Pro 16"',
			price: "$1,299",
			image:
				"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
		},
		{
			id: 2,
			productId: 5,
			name: "iPhone 15 Pro",
			price: "$999",
			image:
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
		},
		{
			id: 3,
			productId: 10,
			name: "Surface Laptop 5",
			price: "$1,099",
			image:
				"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
		},
	];

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					<div>
						<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
							{seller.name}
						</h1>
						<div className="flex items-center gap-3 mt-2">
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, index) => (
									<Star
										key={index}
										className={`w-4 h-4 ${
											index < Math.floor(seller.rating)
												? "text-yellow-400 fill-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>
							<span className="text-sm" style={{ color: "var(--muted)" }}>
								{seller.rating} ({seller.reviews} reviews)
							</span>
							{seller.verified && (
								<span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
									<ShieldCheck className="w-3 h-3" />
									Verified
								</span>
							)}
						</div>
						<div className="flex items-center gap-2 mt-2 text-sm" style={{ color: "var(--muted)" }}>
							<MapPin className="w-4 h-4" />
							{seller.location}
						</div>
					</div>
					<div className="flex items-center gap-3">
						<button
							className="px-4 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Follow Seller
						</button>
						<Link
							to="/buyer/messages"
							className="px-4 py-2 rounded-lg border font-semibold"
							style={{ borderColor: "var(--border)", color: "var(--accent)" }}
						>
							Message
						</Link>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
							<h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
								About the Store
							</h2>
							<p className="mt-3" style={{ color: "var(--muted)" }}>
								{seller.about}
							</p>
						</div>
						<div>
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
									Featured Products
								</h2>
								<Link
									to="/buyer/search"
									className="text-sm font-semibold"
									style={{ color: "var(--accent-secondary)" }}
								>
									View all
								</Link>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{products.map((product) => (
									<Link
										key={product.id}
										to={`/buyer/product/${product.productId}?seller=301`}
										className="border rounded-xl overflow-hidden"
										style={{ borderColor: "var(--border)" }}
									>
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-36 object-cover"
										/>
										<div className="p-4">
											<p className="font-semibold" style={{ color: "var(--accent)" }}>
												{product.name}
											</p>
											<p className="mt-1 font-semibold" style={{ color: "var(--accent-secondary)" }}>
												{product.price}
											</p>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="border rounded-xl p-5" style={{ borderColor: "var(--border)" }}>
							<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
								Store Policies
							</h3>
							<ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
								{seller.policies.map((policy) => (
									<li key={policy}>- {policy}</li>
								))}
							</ul>
						</div>
						<div className="border rounded-xl p-5" style={{ borderColor: "var(--border)" }}>
							<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
								Support
							</h3>
							<p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
								Average response time: under 2 hours.
							</p>
							<Link
								to="/buyer/messages"
								className="mt-4 inline-flex items-center justify-center w-full text-white px-4 py-2 rounded-lg font-semibold"
								style={{ backgroundColor: "var(--accent)" }}
							>
								Contact Seller
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerStorefront;
