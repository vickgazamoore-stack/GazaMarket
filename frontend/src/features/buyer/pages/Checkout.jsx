import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	ChevronRight,
	CreditCard,
	CheckCircle,
	Truck,
} from "lucide-react";
import Footer from "../../../components/layout/Footer.jsx";
import { useCart } from "../../../app/CartContext.jsx";
import { useAuth } from "../../../app/providers.jsx";
import { messagesApi, ordersApi } from "../../../services/api.js";

const Checkout = () => {
	const [step, setStep] = useState(1);
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const navigate = useNavigate();
	const { cart, clearCart, getCartBySeller, getTotalWithShipping } = useCart();
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		cardName: "",
		cardNumber: "",
		expiry: "",
		cvv: "",
	});

	const taxRate = 0.08;
	const cartBySeller = useMemo(() => getCartBySeller(), [getCartBySeller]);
	const subtotal = useMemo(
		() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
		[cart]
	);
	const shipping = useMemo(
		() => cartBySeller.reduce((sum, seller) => sum + seller.shippingCost, 0),
		[cartBySeller]
	);
	const tax = useMemo(
		() => getTotalWithShipping() * taxRate,
		[getTotalWithShipping]
	);
	const total = useMemo(
		() => getTotalWithShipping() * (1 + taxRate),
		[getTotalWithShipping]
	);


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const isStepComplete = (s) => {
		if (s === 1)
			return (
				formData.firstName &&
				formData.lastName &&
				formData.address &&
				formData.city &&
				formData.zipCode
			);
		if (s === 2)
			return (
				formData.cardName &&
				formData.cardNumber &&
				formData.expiry &&
				formData.cvv
			);
		return true;
	};


	const handlePlaceOrder = async () => {
		if (submitting) return;
		setSubmitting(true);
		setSubmitError("");
			const sellerGroups = cartBySeller.map((seller) => ({
				sellerId: seller.sellerId,
			sellerName: seller.sellerName,
			items: seller.items.map((item) => ({
				productId: item.productId,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				image: item.image,
			})),
			subtotal: seller.subtotal,
			shippingCost: seller.shippingCost,
			deliveryEstimate: seller.items[0]?.deliveryEstimate || "3-5 days",
		}));

		try {
			const response = await ordersApi.createOrder({
				subtotal,
				shipping,
				tax,
				total,
				buyer: {
					name: `${formData.firstName} ${formData.lastName}`.trim() || user?.name || "Buyer",
					email: formData.email || user?.email || "",
					phone: formData.phone,
				},
				shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`.trim(),
				payment: {
					method: "card",
					last4: formData.cardNumber.slice(-4),
					cardName: formData.cardName,
				},
				sellers: sellerGroups,
				items: cart.map((item) => ({
					productId: item.productId,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					image: item.image,
				})),
			});

			const createdOrder = response.order;
			if (user?.id) {
				await Promise.allSettled(
					(createdOrder.sellers || []).map((seller) =>
						messagesApi.createConversation({
							orderId: createdOrder.id,
							buyerId: user.id,
							buyerName: createdOrder.buyer?.name || user?.name || "Buyer",
							sellerId: seller.sellerId,
							sellerName: seller.sellerName,
							initialMessage: "Order placed. Looking forward to updates.",
						}),
					),
				);
			}

			clearCart();
			navigate(`/buyer/orders/${createdOrder.id}`);
		} catch (error) {
			setSubmitError(error.message || "Failed to place order");
		} finally {
			setSubmitting(false);
		}
	};

	if (cart.length === 0) {
		return (
			<div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--surface)" }}>
				<div className="flex-grow p-6">
					<div className="max-w-3xl mx-auto text-center space-y-4">
						<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
							Your cart is empty
						</h1>
						<p style={{ color: "var(--muted)" }}>
							Add items to your cart before checking out.
						</p>
						<Link
							to="/buyer/search"
							className="inline-flex px-6 py-3 text-white rounded-lg font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
						>
							Browse Products
						</Link>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ backgroundColor: "var(--surface)" }}
		>
			<div className="flex-grow p-6">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-4xl font-bold mb-8" style={{ color: "var(--accent)" }}>
						Checkout
					</h1>

					<div className="mb-8">
						<div className="flex justify-between items-center mb-6">
							{[1, 2, 3].map((num) => (
								<div key={num} className="flex items-center flex-1">
									<div
										className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition text-white"
										style={{
											backgroundColor: num <= step ? "var(--accent)" : "var(--border)",
											color: num <= step ? "var(--surface)" : "var(--muted)",
										}}
									>
										{num}
									</div>
									{num < 3 && (
										<div
											className="flex-1 h-1 mx-2 transition"
											style={{
												backgroundColor: num < step ? "var(--accent-secondary)" : "var(--border)",
											}}
										></div>
									)}
								</div>
							))}
						</div>
						<div
							className="flex justify-between text-sm"
							style={{ color: "var(--muted)" }}
						>
							<span>Shipping</span>
							<span>Payment</span>
							<span>Review</span>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-6">
						<div className="col-span-2">
							<div
								className="rounded-xl border p-8"
								style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
							>
								{step === 1 && (
									<div>
										<div className="flex items-center gap-3 mb-6">
											<Truck className="w-6 h-6" style={{ color: "var(--accent-secondary)" }} />
											<h2
												className="text-2xl font-semibold"
												style={{ color: "var(--accent)" }}
											>
												Shipping Address
											</h2>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<input
												type="text"
												name="firstName"
												placeholder="First Name"
												value={formData.firstName}
												onChange={handleInputChange}
												className="rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="text"
												name="lastName"
												placeholder="Last Name"
												value={formData.lastName}
												onChange={handleInputChange}
												className="rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="email"
												name="email"
												placeholder="Email"
												value={formData.email}
												onChange={handleInputChange}
												className="col-span-2 rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="tel"
												name="phone"
												placeholder="Phone"
												value={formData.phone}
												onChange={handleInputChange}
												className="col-span-2 rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="text"
												name="address"
												placeholder="Street Address"
												value={formData.address}
												onChange={handleInputChange}
												className="col-span-2 rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="text"
												name="city"
												placeholder="City"
												value={formData.city}
												onChange={handleInputChange}
												className="rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="text"
												name="state"
												placeholder="State"
												value={formData.state}
												onChange={handleInputChange}
												className="rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="text"
												name="zipCode"
												placeholder="ZIP Code"
												value={formData.zipCode}
												onChange={handleInputChange}
												className="col-span-2 rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
										</div>
									</div>
								)}

								{step === 2 && (
									<div>
										<div className="flex items-center gap-3 mb-6">
											<CreditCard
												className="w-6 h-6"
												style={{ color: "var(--accent-secondary)" }}
											/>
											<h2
												className="text-2xl font-semibold"
												style={{ color: "var(--accent)" }}
											>
												Payment Information
											</h2>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<input
												type="text"
												name="cardName"
												placeholder="Cardholder Name"
												value={formData.cardName}
												onChange={handleInputChange}
												className="col-span-2 rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="text"
												name="cardNumber"
												placeholder="Card Number"
												value={formData.cardNumber}
												onChange={handleInputChange}
												maxLength="19"
												className="col-span-2 rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="text"
												name="expiry"
												placeholder="MM/YY"
												value={formData.expiry}
												onChange={handleInputChange}
												maxLength="5"
												className="rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
											<input
												type="text"
												name="cvv"
												placeholder="CVV"
												value={formData.cvv}
												onChange={handleInputChange}
												maxLength="4"
												className="rounded px-4 py-2 placeholder-gray-400 focus:outline-none"
												style={{
													backgroundColor: "var(--surface)",
													borderColor: "var(--border)",
													border: "1px solid var(--border)",
													color: "var(--text)",
												}}
												onFocus={(e) =>
													(e.target.style.borderColor = "var(--accent)")
												}
												onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
											/>
										</div>
									</div>
								)}

								{step === 3 && (
									<div>
										<div className="flex items-center gap-3 mb-6">
											<CheckCircle
												className="w-6 h-6"
												style={{ color: "var(--accent)" }}
											/>
											<h2
												className="text-2xl font-semibold"
												style={{ color: "var(--accent)" }}
											>
												Order Review
											</h2>
										</div>
										<div className="space-y-4">
											<div
												className="pb-4 border-b"
												style={{ borderColor: "var(--border)" }}
											>
												<h3
													className="font-semibold mb-2"
													style={{ color: "var(--accent)" }}
												>
													Shipping Address
												</h3>
												<p style={{ color: "var(--muted)" }}>
													{formData.firstName} {formData.lastName}
												</p>
												<p style={{ color: "var(--muted)" }}>{formData.address}</p>
												<p style={{ color: "var(--muted)" }}>
													{formData.city}, {formData.state} {formData.zipCode}
												</p>
											</div>
											<div
												className="pb-4 border-b"
												style={{ borderColor: "var(--border)" }}
											>
												<h3
													className="font-semibold mb-2"
													style={{ color: "var(--accent)" }}
												>
													Payment Method
												</h3>
												<p style={{ color: "var(--muted)" }}>
													Card ending in {formData.cardNumber.slice(-4)}
												</p>
											</div>
											<div>
												<h3
													className="font-semibold mb-2"
													style={{ color: "var(--accent)" }}
												>
													Items
												</h3>
												{cart.map((item) => (
													<div
														key={item.id}
														className="flex justify-between mb-2"
														style={{ color: "var(--muted)" }}
													>
														<span>
															{item.quantity}x {item.name}
														</span>
														<span>
															${(item.price * item.quantity).toFixed(2)}
														</span>
													</div>
												))}
											</div>
										</div>
									</div>
								)}

								<div
									className="flex gap-4 mt-8 pt-6 border-t"
									style={{ borderColor: "var(--border)" }}
								>
									<button
										onClick={() => setStep(step - 1)}
										disabled={step === 1}
										className="px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
										style={{
											borderColor: "var(--border)",
											border: "1px solid var(--border)",
											color: "var(--muted)",
										}}
										onMouseEnter={(e) =>
											step > 1 && (e.target.style.backgroundColor = "var(--surface-strong)")
										}
										onMouseLeave={(e) =>
											step > 1 &&
											(e.target.style.backgroundColor = "transparent")
										}
									>
										Back
									</button>
									{step < 3 ? (
										<button
											onClick={() => {
												if (isStepComplete(step) && step < 3) setStep(step + 1);
											}}
											disabled={!isStepComplete(step)}
											className="ml-auto px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition font-medium text-white"
											style={{ backgroundColor: "var(--accent-secondary)" }}
											onMouseEnter={(e) =>
												isStepComplete(step) &&
												(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
											}
											onMouseLeave={(e) =>
												isStepComplete(step) &&
												(e.target.style.backgroundColor = "var(--accent-secondary)")
											}
										>
											Continue
											<ChevronRight className="w-4 h-4" />
										</button>
									) : (
										<button
											onClick={handlePlaceOrder}
											disabled={submitting}
											className="ml-auto px-8 py-2 rounded-lg flex items-center gap-2 transition font-medium text-white"
											style={{ backgroundColor: "var(--accent)" }}
											onMouseEnter={(e) =>
												(e.target.style.backgroundColor = "var(--accent-strong)")
											}
											onMouseLeave={(e) =>
												(e.target.style.backgroundColor = "var(--accent)")
											}
										>
											<CheckCircle className="w-4 h-4" />
											{submitting ? "Placing..." : "Place Order"}
										</button>
									)}
								</div>
								{submitError && (
									<p className="mt-3 text-sm" style={{ color: "var(--accent-secondary-strong)" }}>
										{submitError}
									</p>
								)}
							</div>
						</div>

						<div>
							<div
								className="rounded-xl border p-6 sticky top-6"
								style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
							>
								<h3
									className="text-xl font-semibold mb-4"
									style={{ color: "var(--accent)" }}
								>
									Order Summary
								</h3>
								<div className="space-y-3">
									{cart.map((item) => (
										<div key={item.id} className="flex justify-between text-sm">
											<span style={{ color: "var(--muted)" }}>
												{item.quantity}x {item.name}
											</span>
											<span style={{ color: "var(--text)" }}>
												${(item.price * item.quantity).toFixed(2)}
											</span>
										</div>
									))}
								</div>
								<div
									className="border-t mt-4 pt-4 space-y-2 text-sm"
									style={{ borderColor: "var(--border)" }}
								>
									<div
										className="flex justify-between"
										style={{ color: "var(--muted)" }}
									>
										<span>Subtotal</span>
										<span style={{ color: "var(--text)" }}>
											${subtotal.toFixed(2)}
										</span>
									</div>
									<div
										className="flex justify-between"
										style={{ color: "var(--muted)" }}
									>
										<span>Shipping</span>
										<span style={{ color: "var(--text)" }}>
											${shipping.toFixed(2)}
										</span>
									</div>
									<div
										className="flex justify-between"
										style={{ color: "var(--muted)" }}
									>
										<span>Tax</span>
										<span style={{ color: "var(--text)" }}>
											${tax.toFixed(2)}
										</span>
									</div>
									<div
										className="flex justify-between font-semibold text-lg border-t pt-2"
										style={{ borderColor: "var(--border)" }}
									>
										<span style={{ color: "var(--accent)" }}>Total</span>
										<span style={{ color: "var(--accent-secondary)" }}>
											${total.toFixed(2)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
