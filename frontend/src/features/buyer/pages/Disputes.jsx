import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, FileText, CheckCircle } from "lucide-react";
import Modal from "../../../components/ui/Modal.jsx";
import { disputesApi, ordersApi } from "../../../services/api.js";

const Disputes = () => {
	const [filter, setFilter] = useState("all");
	const [disputes, setDisputes] = useState([]);
	const [orders, setOrders] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [lastSeenMap, setLastSeenMap] = useState({});
	const [formData, setFormData] = useState({
		orderId: "",
		reason: "",
		description: "",
		evidence: [],
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			setError("");
			try {
				const [disputesResponse, ordersResponse] = await Promise.all([
					disputesApi.getMyDisputes(),
					ordersApi.getMyOrders(),
				]);
				setDisputes(disputesResponse.disputes || []);
				setOrders(ordersResponse.orders || []);
			} catch (loadError) {
				setError(loadError.message || "Failed to load disputes");
			} finally {
				setLoading(false);
			}
			setLastSeenMap({});
		};

		loadData();
	}, []);

	const refreshDisputes = async () => {
		try {
			const response = await disputesApi.getMyDisputes();
			setDisputes(response.disputes || []);
		} catch (loadError) {
			setError(loadError.message || "Failed to refresh disputes");
		}
	};

	const getLastUpdate = (dispute) => {
		if (dispute.lastUpdate) return dispute.lastUpdate;
		if (dispute.resolution?.dateResolved) return dispute.resolution.dateResolved;
		if (dispute.updates?.length) return dispute.updates[dispute.updates.length - 1].time;
		return dispute.filed;
	};

	const hasNewUpdate = (dispute) => {
		const key = String(dispute.id || dispute.disputeId);
		const lastSeen = lastSeenMap[key];
		const lastUpdate = getLastUpdate(dispute);
		return lastUpdate && (!lastSeen || new Date(lastUpdate).getTime() > new Date(lastSeen).getTime());
	};

	const newCount = disputes.filter(hasNewUpdate).length;

	const markAllRead = () => {
		const now = new Date().toISOString();
		const next = {};
		disputes.forEach((dispute) => {
			const key = String(dispute.id || dispute.disputeId);
			next[key] = getLastUpdate(dispute) || now;
		});
		setLastSeenMap(next);
	};

	const filteredDisputes = useMemo(() => {
		if (filter === "all") return disputes;
		return disputes.filter((d) => d.status === filter);
	}, [disputes, filter]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmitDispute = async (e) => {
		e.preventDefault();
		if (!formData.orderId || !formData.reason) {
			return;
		}
		const order = orders.find((entry) => entry.id === formData.orderId);
		if (!order) {
			return;
		}
		const seller = order.sellers?.[0];
		try {
			const response = await disputesApi.createDispute({
				orderId: order.id,
				sellerId: seller?.sellerId || "seller-unknown",
				seller: seller?.sellerName || "Seller",
				reason: formData.reason,
				description: formData.description,
				amount: Number(order.total || 0),
				evidence: formData.evidence,
			});
			setDisputes((prev) => [response.dispute, ...prev]);
			setFormData({ orderId: "", reason: "", description: "", evidence: [] });
			setIsModalOpen(false);
		} catch (submitError) {
			setError(submitError.message || "Failed to file dispute");
		}
	};

	const handleEvidenceUpload = (e) => {
		const files = Array.from(e.target.files || []);
		setFormData((prev) => ({
			...prev,
			evidence: files.map((file) => file.name),
		}));
	};

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<header
				className="border-b sticky top-0 z-40"
				style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1
								className="text-3xl font-bold flex items-center gap-3"
								style={{ color: "var(--accent)" }}
							>
								<AlertTriangle className="w-8 h-8" style={{ color: "var(--accent-secondary)" }} />
								My Disputes
								{newCount > 0 && (
									<span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "var(--accent-secondary)", color: "var(--surface)" }}>
										{newCount} new
									</span>
								)}
							</h1>
							{loading && <p style={{ color: "var(--muted)" }}>Loading disputes...</p>}
							{error && <p style={{ color: "var(--accent-secondary-strong)" }}>{error}</p>}
						</div>
						<button
							className="px-4 py-2 text-white rounded-lg transition font-medium"
							style={{ backgroundColor: "var(--accent-secondary-strong)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onClick={() => setIsModalOpen(true)}
						>
							File Dispute
						</button>
						<button
							className="ml-3 px-4 py-2 rounded-lg border transition font-medium"
							style={{ borderColor: "var(--border)", color: "var(--accent)" }}
							onClick={refreshDisputes}
						>
							Refresh
						</button>
						<button
							className="ml-3 px-4 py-2 rounded-lg border transition font-medium"
							style={{ borderColor: "var(--border)", color: "var(--accent)" }}
							onClick={markAllRead}
						>
							Mark all read
						</button>
					</div>
				</div>
			</header>

			<div
				className="border-b"
				style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="grid grid-cols-3 gap-4">
						<div
							className="p-4 rounded-lg border"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Total
							</p>
							<p
								className="text-2xl font-bold mt-1"
								style={{ color: "var(--accent)" }}
							>
								{disputes.length}
							</p>
						</div>
						<div
							className="p-4 rounded-lg border"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Under Review
							</p>
							<p
								className="text-2xl font-bold mt-1"
								style={{ color: "var(--accent-secondary)" }}
							>
								{disputes.filter((d) => d.status === "under_review").length}
							</p>
						</div>
						<div
							className="p-4 rounded-lg border"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Resolved
							</p>
							<p
								className="text-2xl font-bold mt-1"
								style={{ color: "var(--accent)" }}
							>
								{disputes.filter((d) => d.status === "resolved").length}
							</p>
						</div>
				</div>
			</div>
			</div>

			<div
				className="border-b"
				style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex gap-4 py-4 overflow-x-auto">
						{["all", "under_review", "resolved"].map((s) => (
							<button
								key={s}
								onClick={() => setFilter(s)}
								className="px-4 py-2 rounded-lg whitespace-nowrap transition"
								style={{
									backgroundColor: filter === s ? "var(--accent-secondary)" : "var(--border)",
									color: filter === s ? "var(--surface)" : "var(--muted)",
								}}
								onMouseEnter={(e) =>
									filter !== s && (e.target.style.backgroundColor = "var(--border)")
								}
								onMouseLeave={(e) =>
									filter !== s && (e.target.style.backgroundColor = "var(--border)")
								}
							>
								{s === "all" ? "All" : s.replace("_", " ")}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{filteredDisputes.length > 0 ? (
					<div className="space-y-4">
						{filteredDisputes.map((d) => (
							<div
								key={d.id}
								className="rounded-xl border p-6"
								style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
							>
								<div className="flex items-start justify-between mb-4">
									<div>
										<h3
											className="text-lg font-semibold"
											style={{ color: "var(--accent)" }}
										>
											{d.id}
										</h3>
										<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
											Order: {d.orderId} - {d.seller}
										</p>
									</div>
									<div className="flex items-center gap-2">
										{hasNewUpdate(d) && (
											<span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "var(--accent-secondary)", color: "var(--surface)" }}>
												New
											</span>
										)}
										<span
											className="px-3 py-1 rounded-full text-sm font-medium"
											style={{
												backgroundColor:
													d.status === "under_review"
														? "var(--accent-secondary-tint)"
														: d.status === "resolved"
															? "var(--accent-tint)"
															: "var(--accent-secondary-tint)",
												color:
													d.status === "under_review"
														? "var(--accent-secondary-strong)"
														: d.status === "resolved"
															? "var(--accent)"
															: "var(--accent-secondary-strong)",
											}}
										>
											{d.status.replace("_", " ")}
										</span>
									</div>
								</div>
								<div
									className="mb-4 pb-4 border-b"
									style={{ borderColor: "var(--border)" }}
								>
									<h4 className="font-medium" style={{ color: "var(--accent)" }}>
										{d.reason}
									</h4>
									{d.description && (
										<p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
											{d.description}
										</p>
									)}
									{d.lastUpdate && (
										<p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
											Last update: {new Date(d.lastUpdate).toLocaleString()}
										</p>
									)}
									{d.evidence?.length > 0 && (
										<div className="mt-3">
											<p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
												Evidence
										</p>
										<ul className="mt-2 text-sm space-y-1" style={{ color: "var(--text)" }}>
											{d.evidence.map((file, index) => (
												<li key={`${d.id}-${index}`} className="flex items-center gap-2">
													<FileText className="w-4 h-4" />
													<span>{file}</span>
												</li>
											))}
											</ul>
										</div>
									)}
									{d.updates?.length > 0 && (
										<div className="mt-3">
											<p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
												Status Updates
											</p>
											<ul className="mt-2 text-sm space-y-1" style={{ color: "var(--text)" }}>
												{d.updates.map((update, index) => (
													<li key={`${d.id}-update-${index}`}>
														{new Date(update.time).toLocaleString()} - {update.note}
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							<div className="flex items-center justify-between">
								<div className="flex gap-4 text-sm">
										<span style={{ color: "var(--muted)" }}>
											Amount: <span className="font-medium" style={{ color: "var(--accent)" }}>{d.amount}</span>
										</span>
										<span style={{ color: "var(--muted)" }}>
											Filed: <span className="font-medium" style={{ color: "var(--accent)" }}>{new Date(d.filed).toLocaleDateString()}</span>
										</span>
									</div>
									<button
										className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition"
										style={{ backgroundColor: "var(--accent-secondary)" }}
										onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
										onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
									>
										<FileText className="w-4 h-4" />
										View
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<div className="text-5xl mb-4">No disputes</div>
						<h3
							className="text-xl font-semibold mb-2"
							style={{ color: "var(--accent)" }}
						>
							No disputes
						</h3>
					</div>
				)}
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="File a Dispute"
				size="md"
			>
				<form onSubmit={handleSubmitDispute} className="space-y-4">
					<div>
						<label className="block text-sm font-semibold mb-2" style={{ color: "var(--ink)" }}>
							Order
						</label>
						<select
							name="orderId"
							value={formData.orderId}
							onChange={handleChange}
							className="w-full rounded-lg px-3 py-2 border"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
						>
							<option value="">Select an order</option>
							{orders.map((order) => (
								<option key={order.id} value={order.id}>
									{order.id} - ${order.total.toFixed(2)}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-semibold mb-2" style={{ color: "var(--ink)" }}>
							Reason
						</label>
						<select
							name="reason"
							value={formData.reason}
							onChange={handleChange}
							className="w-full rounded-lg px-3 py-2 border"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
						>
							<option value="">Select a reason</option>
							<option value="Item not received">Item not received</option>
							<option value="Item damaged">Item damaged</option>
							<option value="Not as described">Not as described</option>
							<option value="Other">Other</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-semibold mb-2" style={{ color: "var(--ink)" }}>
							Details
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows={4}
							className="w-full rounded-lg px-3 py-2 border"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
							placeholder="Describe the issue"
						/>
					</div>
					<div>
						<label className="block text-sm font-semibold mb-2" style={{ color: "var(--ink)" }}>
							Evidence (optional)
						</label>
						<input
							type="file"
							multiple
							accept="image/*,.pdf"
							onChange={handleEvidenceUpload}
							className="w-full rounded-lg px-3 py-2 border"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
						/>
						{formData.evidence.length > 0 && (
							<ul className="mt-2 text-sm space-y-1" style={{ color: "var(--muted)" }}>
								{formData.evidence.map((file, index) => (
									<li key={`${file}-${index}`} className="flex items-center gap-2">
										<FileText className="w-4 h-4" />
										<span>{file}</span>
									</li>
								))}
							</ul>
						)}
					</div>
					<div className="flex justify-end gap-3">
						<button
							type="button"
							className="px-4 py-2 rounded-lg border"
							style={{ borderColor: "var(--border)", color: "var(--text)" }}
							onClick={() => setIsModalOpen(false)}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 rounded-lg text-white"
							style={{ backgroundColor: "var(--accent)" }}
						>
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default Disputes;
