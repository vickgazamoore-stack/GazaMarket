import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, ShieldCheck } from "lucide-react";
import { useCart } from "../../../app/CartContext.jsx";

const CompareSellers = () => {
	const { id } = useParams();
	const { addToCart } = useCart();
	const [toast, setToast] = useState(null);
	const productsById = {
		1: {
			id: 1,
			name: 'MacBook Pro 16"',
			image:
				"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&h=500&fit=crop",
		},
		2: {
			id: 2,
			name: "Dell XPS 13",
			image:
				"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=700&h=500&fit=crop",
		},
		3: {
			id: 3,
			name: "ThinkPad X1 Carbon",
			image:
				"https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=700&h=500&fit=crop",
		},
		4: {
			id: 4,
			name: "HP Spectre x360",
			image:
				"https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=700&h=500&fit=crop",
		},
		5: {
			id: 5,
			name: "iPhone 15 Pro",
			image:
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&h=500&fit=crop",
		},
		6: {
			id: 6,
			name: "Samsung Galaxy S24",
			image:
				"https://images.unsplash.com/photo-1510557880182-3d4d3cba35f5?w=700&h=500&fit=crop",
		},
		7: {
			id: 7,
			name: "Google Pixel 8",
			image:
				"https://images.unsplash.com/photo-1503602642458-232111445657?w=700&h=500&fit=crop",
		},
		8: {
			id: 8,
			name: "iPhone 14",
			image:
				"https://images.unsplash.com/photo-1477511801984-4ad318ed9846?w=700&h=500&fit=crop",
		},
		9: {
			id: 9,
			name: "ASUS ROG Zephyrus G14",
			image:
				"https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=700&h=500&fit=crop",
		},
		10: {
			id: 10,
			name: "Microsoft Surface Laptop 5",
			image:
				"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=700&h=500&fit=crop",
		},
		11: {
			id: 11,
			name: "OnePlus 12",
			image:
				"https://images.unsplash.com/photo-1523475472568-7d1d2f8adf8d?w=700&h=500&fit=crop",
		},
		12: {
			id: 12,
			name: "Samsung Galaxy A55",
			image:
				"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&h=500&fit=crop",
		},
	};

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

	const product = productsById[Number(id)] ?? productsById[1];
	const offers = offersById[Number(id)] ?? offersById[1];

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
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				<div className="flex items-center gap-6">
					<img
						src={product.image}
						alt={product.name}
						className="w-24 h-24 rounded-xl object-cover border"
						style={{ borderColor: "var(--border)" }}
					/>
					<div>
						<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
							Compare Prices
						</h1>
						<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
							{product.name} - Price, shipping, and delivery side by side
						</p>
					</div>
				</div>

				<div className="border rounded-2xl overflow-hidden" style={{ borderColor: "var(--border)" }}>
					<table className="w-full text-sm">
						<thead style={{ backgroundColor: "var(--surface-strong)" }}>
							<tr>
								<th className="text-left px-6 py-4" style={{ color: "var(--accent)" }}>
									Seller
								</th>
								<th className="text-left px-6 py-4" style={{ color: "var(--accent)" }}>
									Price
								</th>
								<th className="text-left px-6 py-4" style={{ color: "var(--accent)" }}>
									Shipping
								</th>
								<th className="text-left px-6 py-4" style={{ color: "var(--accent)" }}>
									Delivery
								</th>
								<th className="text-left px-6 py-4" style={{ color: "var(--accent)" }}>
									Rating
								</th>
								<th className="text-left px-6 py-4" style={{ color: "var(--accent)" }}>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{offers.map((offer) => (
								<tr key={offer.id} style={{ borderTop: "1px solid var(--border)" }}>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<span className="font-semibold" style={{ color: "var(--accent)" }}>
												{offer.seller}
											</span>
										{offer.verified && (
											<span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
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
								</td>
									<td className="px-6 py-4 font-semibold" style={{ color: "var(--accent)" }}>
										${offer.price}
									</td>
									<td className="px-6 py-4" style={{ color: "var(--muted)" }}>
										${offer.shipping}
									</td>
									<td className="px-6 py-4" style={{ color: "var(--muted)" }}>
										{offer.delivery}
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-1">
											<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
											<span style={{ color: "var(--muted)" }}>{offer.rating}</span>
										</div>
									</td>
									<td className="px-6 py-4">
										<button
											className={`px-4 py-2 rounded-lg text-white font-semibold ${
												offer.inStock === false ? "opacity-60 cursor-not-allowed" : ""
											}`}
											style={{ backgroundColor: "var(--accent-secondary)" }}
											onClick={() => {
												if (offer.inStock === false) return;
												addToCart(
													{
														id: `${product.name}-${offer.id}`,
														name: product.name,
														price: offer.price,
														image: product.image,
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
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="flex justify-end">
					<Link
						to={id ? `/buyer/product/${id}` : "/buyer/product/1"}
						className="text-sm font-semibold"
						style={{ color: "var(--accent)" }}
					>
						Back to product
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CompareSellers;
