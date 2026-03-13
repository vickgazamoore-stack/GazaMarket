import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../app/CartContext.jsx";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";

const Cart = () => {
	const {
		cart,
		updateQuantity,
		removeFromCart,
		clearCart,
		getCartBySeller,
		getTotalWithShipping,
	} = useCart();
	const navigate = useNavigate();
	const [loading] = useState(false);

	const handleQuantityChange = (itemId, newQuantity) => {
		updateQuantity(itemId, parseInt(newQuantity));
	};

	const handleRemoveItem = (itemId) => {
		if (
			window.confirm(
				"Are you sure you want to remove this item from your cart?",
			)
		) {
			removeFromCart(itemId);
		}
	};

	const handleCheckout = () => {
		navigate("/buyer/checkout");
	};

	if (cart.length === 0) {
		return (
			<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
				<header
					className="border-b"
					style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
						<div className="flex items-center gap-4">
							<Link
								to="/"
								className="text-2xl font-bold"
								style={{ color: "var(--ink)" }}
							>
								Gaza Market
							</Link>
						</div>
					</div>
				</header>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div
						className="rounded-2xl p-12 border text-center shadow-xl"
						style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
					>
						<ShoppingCart
							className="w-16 h-16 mx-auto mb-6"
							style={{ color: "var(--muted)" }}
						/>
						<h3
							className="text-2xl font-bold mb-2"
							style={{ color: "var(--accent)" }}
						>
							Your Cart is Empty
						</h3>
						<p className="mb-8" style={{ color: "var(--muted)" }}>
							Discover amazing products and add them to your cart!
						</p>
						<Link
							to="/buyer/search"
							className="inline-block text-white px-8 py-3 rounded-lg font-semibold transition-colors"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		);
	}

	const cartBySeller = getCartBySeller();
	const totalWithShipping = getTotalWithShipping();
	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			{/* Header */}
			<header
				className="border-b"
				style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<Link
							to="/"
							className="flex items-center gap-2 hover:opacity-75"
							style={{ color: "var(--ink)" }}
						>
							<ArrowLeft className="w-5 h-5" />
							<span className="text-2xl font-bold">Gaza Market</span>
						</Link>
						<h1 className="text-xl font-bold" style={{ color: "var(--accent)" }}>
							Shopping Cart
						</h1>
						<button
							onClick={clearCart}
							className="font-medium text-sm"
							style={{ color: "var(--accent-secondary-strong)" }}
						>
							Clear Cart
						</button>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-6">
						{cartBySeller.map((sellerGroup) => (
							<div
								key={sellerGroup.sellerId}
								className="rounded-2xl border shadow-xl overflow-hidden"
								style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
							>
								{/* Seller Header */}
								<div
									className="px-6 py-4 border-b"
									style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
								>
									<div className="flex items-center justify-between">
										<div>
											<h3
												className="text-lg font-semibold"
												style={{ color: "var(--accent)" }}
											>
												{sellerGroup.sellerName}
											</h3>
											<div
												className="flex items-center text-sm mt-1"
												style={{ color: "var(--muted)" }}
											>
												<span>* {sellerGroup.sellerRating}</span>
												<span className="mx-2">-</span>
												<span>{sellerGroup.items.length} item(s)</span>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm" style={{ color: "var(--muted)" }}>
												Subtotal
											</p>
											<p className="font-semibold" style={{ color: "var(--accent-secondary)" }}>
												${sellerGroup.subtotal.toFixed(2)}
											</p>
										</div>
									</div>
								</div>

								{/* Seller Items */}
								<div>
									{sellerGroup.items.map((item) => (
										<div
											key={item.id}
											className="p-6 transition-colors border-b"
											style={{ borderColor: "var(--border)" }}
											onMouseEnter={(e) =>
												(e.currentTarget.style.backgroundColor = "var(--surface-strong)")
											}
											onMouseLeave={(e) =>
												(e.currentTarget.style.backgroundColor = "transparent")
											}
										>
											<div className="flex items-center gap-4">
												{typeof item.image === "string" ? (
													<img
														src={item.image}
														alt={item.name}
														className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
													/>
												) : (
													<div className="text-5xl flex-shrink-0">
														{item.image}
													</div>
												)}
												<div className="flex-1 min-w-0">
													<h4
														className="font-semibold truncate"
														style={{ color: "var(--accent)" }}
													>
														{item.name}
													</h4>
													<p
														className="text-sm mt-1"
														style={{ color: "var(--muted)" }}
													>
														${item.price} each - Shipping: ${item.shippingCost}{" "}
														- {item.deliveryEstimate}
													</p>
												</div>
												<div className="flex items-center gap-4 flex-shrink-0">
													{/* Quantity Control */}
													<div
														className="flex items-center gap-2 rounded-lg p-1"
														style={{ backgroundColor: "var(--border)" }}
													>
														<span
															className="text-xs font-semibold px-2"
															style={{ color: "var(--accent)" }}
														>
															Qty
														</span>
														<button
															onClick={() =>
																handleQuantityChange(item.id, item.quantity - 1)
															}
															className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-50"
															style={{ color: "var(--accent)" }}
															onMouseEnter={(e) =>
																(e.target.style.backgroundColor = "var(--border)")
															}
															onMouseLeave={(e) =>
																(e.target.style.backgroundColor = "transparent")
															}
															disabled={item.quantity <= 1}
														>
															-
														</button>
														<span
															className="w-8 text-center text-sm font-semibold"
															style={{ color: "var(--accent)" }}
														>
															{item.quantity}
														</span>
														<button
															onClick={() =>
																handleQuantityChange(item.id, item.quantity + 1)
															}
															className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-50"
															style={{ color: "var(--accent)" }}
															onMouseEnter={(e) =>
																(e.target.style.backgroundColor = "var(--border)")
															}
															onMouseLeave={(e) =>
																(e.target.style.backgroundColor = "transparent")
															}
															disabled={item.quantity >= item.maxQuantity}
														>
															+
														</button>
													</div>

													{/* Price & Remove */}
													<div className="text-right">
														<p
															className="font-semibold"
															style={{ color: "var(--accent-secondary)" }}
														>
															${(item.price * item.quantity).toFixed(2)}
														</p>
														<button
															onClick={() => handleRemoveItem(item.id)}
															className="text-xs font-medium mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg border"
															style={{ borderColor: "var(--border)", color: "var(--muted)" }}
															onMouseEnter={(e) => {
																e.currentTarget.style.color = "var(--accent-secondary-strong)";
															}}
															onMouseLeave={(e) => {
																e.currentTarget.style.color = "var(--muted)";
															}}
														>
															<Trash2 className="w-3 h-3" />
															Remove
														</button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>

								{/* Seller Footer */}
								<div
									className="px-6 py-4 border-t"
									style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
								>
									<div className="flex justify-between items-center">
										<span style={{ color: "var(--muted)" }}>Shipping</span>
										<span
											className="font-semibold"
											style={{ color: "var(--accent-secondary)" }}
										>
											${sellerGroup.shippingCost.toFixed(2)}
										</span>
									</div>
									<div
										className="flex justify-between items-center mt-3 pt-3 border-t"
										style={{ borderColor: "var(--border)" }}
									>
										<span className="font-bold" style={{ color: "var(--accent)" }}>
											Seller Total
										</span>
										<span className="font-bold" style={{ color: "var(--accent-secondary)" }}>
											$
											{(
												sellerGroup.subtotal + sellerGroup.shippingCost
											).toFixed(2)}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div
							className="rounded-2xl p-6 border shadow-xl sticky top-20 space-y-6"
							style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
						>
							<h3 className="text-xl font-bold" style={{ color: "var(--accent)" }}>
								Order Summary
							</h3>

							{/* Summary Items */}
							<div
								className="space-y-3 pb-6 border-b"
								style={{ borderColor: "var(--border)" }}
							>
								<div
									className="flex justify-between"
									style={{ color: "var(--muted)" }}
								>
									<span>Items ({cart.length})</span>
									<span>
										$
										{cart
											.reduce(
												(sum, item) => sum + item.price * item.quantity,
												0,
											)
											.toFixed(2)}
									</span>
								</div>
								<div
									className="flex justify-between"
									style={{ color: "var(--muted)" }}
								>
									<span>Shipping</span>
									<span>
										$
										{cartBySeller
											.reduce((sum, seller) => sum + seller.shippingCost, 0)
											.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between text-gray-300">
									<span>Tax (8%)</span>
									<span>${(totalWithShipping * 0.08).toFixed(2)}</span>
								</div>
							</div>

							{/* Total */}
							<div className="flex justify-between items-center mb-6">
								<span
									className="text-lg font-bold"
									style={{ color: "var(--accent)" }}
								>
									Total
								</span>
								<span
									className="text-2xl font-bold"
									style={{ color: "var(--accent-secondary)" }}
								>
									${(totalWithShipping * 1.08).toFixed(2)}
								</span>
							</div>

							{/* Buttons */}
							<div className="space-y-3">
								<button
									onClick={handleCheckout}
									disabled={loading}
									className="w-full disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
									style={{ backgroundColor: "var(--accent-secondary)" }}
									onMouseEnter={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary)")
									}
								>
									{loading ? "Processing..." : "Proceed to Checkout"}
								</button>

								<Link
									to="/buyer/search"
									className="block w-full text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
									style={{ backgroundColor: "var(--muted)" }}
									onMouseEnter={(e) =>
										(e.target.style.backgroundColor = "var(--muted)")
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = "var(--muted)")
									}
								>
									Continue Shopping
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;

