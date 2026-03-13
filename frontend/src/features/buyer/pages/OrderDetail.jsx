import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Truck, MessageCircle } from "lucide-react";
import Modal from "../../../components/ui/Modal.jsx";
import { ordersApi, returnsApi } from "../../../services/api.js";

const OrderDetail = () => {
	const { orderId } = useParams();
	const [order, setOrder] = useState(null);
	const [returns, setReturns] = useState([]);
	const [isReturnOpen, setIsReturnOpen] = useState(false);
	const [selectedSeller, setSelectedSeller] = useState(null);
	const [loadingOrder, setLoadingOrder] = useState(true);
	const [orderError, setOrderError] = useState("");
	const [loadingReturns, setLoadingReturns] = useState(true);
	const [returnsError, setReturnsError] = useState("");
	const [returnForm, setReturnForm] = useState({
		reason: "",
		notes: "",
	});

	useEffect(() => {
		const loadOrder = async () => {
			setLoadingOrder(true);
			setOrderError("");
			try {
				const response = await ordersApi.getOrderById(orderId);
				setOrder(response.order || null);
			} catch (error) {
				setOrder(null);
				setOrderError(error.message || "Failed to load order");
			} finally {
				setLoadingOrder(false);
			}
			setLoadingReturns(true);
			setReturnsError("");
			try {
				const response = await returnsApi.getMyReturns();
				setReturns(response.returns || []);
			} catch (error) {
				setReturnsError(error.message || "Failed to load returns");
			} finally {
				setLoadingReturns(false);
			}
		};

		loadOrder();
	}, [orderId]);

	const hasReturnRequest = (sellerId) =>
		returns.some((entry) => entry.orderId === orderId && entry.sellerId === sellerId);

	const openReturnModal = (seller) => {
		setSelectedSeller(seller);
		setReturnForm({ reason: "", notes: "" });
		setIsReturnOpen(true);
	};

	const handleSubmitReturn = async (e) => {
		e.preventDefault();
		if (!selectedSeller || !returnForm.reason) {
			return;
		}
		try {
			const response = await returnsApi.createReturn({
				orderId,
				sellerId: selectedSeller.sellerId,
				sellerName: selectedSeller.sellerName,
				reason: returnForm.reason,
				notes: returnForm.notes,
			});
			setReturns((prev) => [response.return, ...prev]);
			setIsReturnOpen(false);
		} catch (error) {
			setReturnsError(error.message || "Failed to submit return request");
		}
	};

	if (loadingOrder) {
		return (
			<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
					<p style={{ color: "var(--muted)" }}>Loading order...</p>
				</div>
			</div>
		);
	}

	if (!order) {
		return (
			<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
					<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
						Order not found
					</h1>
					<p style={{ color: "var(--muted)" }}>
						{orderError || "We could not find that order. Please check your orders list."}
					</p>
					<Link
						to="/buyer/orders"
						className="inline-flex px-6 py-3 text-white rounded-lg font-semibold"
						style={{ backgroundColor: "var(--accent-secondary)" }}
					>
						Back to orders
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
							Order {order.id}
						</h1>
						<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
							Placed on {order.date} - Status: {order.status}
						</p>
						{loadingReturns && <p className="text-sm" style={{ color: "var(--muted)" }}>Loading returns...</p>}
						{returnsError && <p className="text-sm" style={{ color: "var(--accent-secondary-strong)" }}>{returnsError}</p>}
					</div>
					<Link to="/buyer/orders" className="text-sm font-semibold" style={{ color: "var(--accent-secondary)" }}>
						Back to orders
					</Link>
				</div>

				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
						Order Summary
					</h2>
					<div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
						<div>
							<p style={{ color: "var(--muted)" }}>Parent Order</p>
							<p style={{ color: "var(--accent)" }}>{order.parentOrderId || order.id}</p>
						</div>
						<div>
							<p style={{ color: "var(--muted)" }}>Seller Orders</p>
							<p style={{ color: "var(--accent)" }}>{order.sellers?.length || 0}</p>
						</div>
						<div>
							<p style={{ color: "var(--muted)" }}>Total</p>
							<p style={{ color: "var(--accent-secondary)" }}>
								${Number(order.total || 0).toFixed(2)}
							</p>
						</div>
					</div>
					<p className="mt-4" style={{ color: "var(--muted)" }}>
						Shipping Address: {order.shippingAddress}
					</p>
				</div>

				<div className="space-y-6">
					{order.sellers.map((seller) => (
						<div
							key={seller.sellerId}
							className="border rounded-xl p-6"
							style={{ borderColor: "var(--border)" }}
						>
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
										{seller.sellerName}
									</h3>
									<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
										Seller Order: {seller.sellerOrderId || `${order.id}-${seller.sellerId}`} - Status: {seller.status}
									</p>
								</div>
								<div className="flex items-center gap-3">
									<Link
										to="/buyer/messages"
										className="px-3 py-2 rounded-lg border text-sm font-semibold flex items-center gap-2"
										style={{ borderColor: "var(--border)", color: "var(--accent)" }}
									>
										<MessageCircle className="w-4 h-4" />
										Message
									</Link>
									{hasReturnRequest(seller.sellerId) ? (
										<span
											className="px-3 py-2 rounded-lg text-sm font-semibold"
											style={{
												backgroundColor: "var(--accent-tint)",
												color: "var(--accent)",
											}}
										>
											Return requested
										</span>
									) : (
										<button
											type="button"
											onClick={() => openReturnModal(seller)}
											className="px-3 py-2 rounded-lg text-sm font-semibold"
											style={{
												backgroundColor: "var(--accent-secondary)",
												color: "var(--surface)",
											}}
										>
											Request return
										</button>
									)}
									{seller.trackingNumber && (
										<span className="text-sm" style={{ color: "var(--muted)" }}>
											<Truck className="inline w-4 h-4 mr-1" />
											Tracking {seller.trackingNumber}
										</span>
									)}
								</div>
							</div>

							<div className="mt-4 space-y-3">
								{seller.items.map((item) => (
									<div key={item.id} className="flex items-center justify-between text-sm">
										<p style={{ color: "var(--accent)" }}>
											{item.quantity}x {item.name}
										</p>
										<p style={{ color: "var(--muted)" }}>
											${(item.price * item.quantity).toFixed(2)}
										</p>
									</div>
								))}
							</div>
							<div className="mt-4 flex items-center justify-between text-sm">
								<span style={{ color: "var(--muted)" }}>
									Subtotal: <span style={{ color: "var(--accent)" }}>${Number(seller.subtotal || 0).toFixed(2)}</span>
								</span>
								<span style={{ color: "var(--muted)" }}>
									Shipping: <span style={{ color: "var(--accent)" }}>${Number(seller.shippingCost || 0).toFixed(2)}</span>
								</span>
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-end text-lg font-semibold" style={{ color: "var(--accent)" }}>
					Total: ${order.total.toFixed(2)}
				</div>
			</div>

			<Modal
				isOpen={isReturnOpen}
				onClose={() => setIsReturnOpen(false)}
				title="Request a return"
				size="md"
			>
				<form onSubmit={handleSubmitReturn} className="space-y-4">
					{selectedSeller && (
						<div>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Seller
							</p>
							<p className="font-semibold" style={{ color: "var(--accent)" }}>
								{selectedSeller.sellerName}
							</p>
						</div>
					)}
					<div>
						<label className="block text-sm font-semibold mb-2" style={{ color: "var(--ink)" }}>
							Reason
						</label>
						<select
							value={returnForm.reason}
							onChange={(e) =>
								setReturnForm((prev) => ({ ...prev, reason: e.target.value }))
							}
							className="w-full rounded-lg px-3 py-2 border"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
						>
							<option value="">Select a reason</option>
							<option value="Arrived damaged">Arrived damaged</option>
							<option value="Not as described">Not as described</option>
							<option value="Wrong item">Wrong item</option>
							<option value="Changed mind">Changed mind</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-semibold mb-2" style={{ color: "var(--ink)" }}>
							Details (optional)
						</label>
						<textarea
							rows={4}
							value={returnForm.notes}
							onChange={(e) =>
								setReturnForm((prev) => ({ ...prev, notes: e.target.value }))
							}
							className="w-full rounded-lg px-3 py-2 border"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
							placeholder="Add a brief explanation or notes"
						/>
					</div>
					<div className="flex justify-end gap-3">
						<button
							type="button"
							className="px-4 py-2 rounded-lg border"
							style={{ borderColor: "var(--border)", color: "var(--text)" }}
							onClick={() => setIsReturnOpen(false)}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 rounded-lg text-white"
							style={{ backgroundColor: "var(--accent)" }}
						>
							Submit request
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default OrderDetail;
