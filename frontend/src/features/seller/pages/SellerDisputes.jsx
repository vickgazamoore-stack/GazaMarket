import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, MessageCircle, Paperclip } from "lucide-react";
import { disputesApi } from "../../../services/api.js";

const SellerDisputes = () => {
	const [disputes, setDisputes] = useState([]);
	const [filter, setFilter] = useState("open");
	const [selectedDispute, setSelectedDispute] = useState(null);
	const [lastSeenMap, setLastSeenMap] = useState({});
	const [error, setError] = useState("");
	const [responseForm, setResponseForm] = useState({
		response: "",
		evidence: [],
	});

	const normalizeDispute = useCallback((dispute, index) => {
		const amount =
			typeof dispute.amount === "string"
				? Number(dispute.amount.replace(/[^0-9.]/g, "")) || 0
				: Number(dispute.amount || 0);
		const buyerEvidence = Array.isArray(dispute.buyerEvidence)
			? dispute.buyerEvidence
			: Array.isArray(dispute.evidence)
				? dispute.evidence
				: [];
		const sellerEvidence = Array.isArray(dispute.sellerEvidence)
			? dispute.sellerEvidence
			: [];
		const messages = Array.isArray(dispute.messages)
			? dispute.messages
			: Array.isArray(dispute.updates)
				? dispute.updates
				: [];
		return {
			id: dispute.id ?? index + 1,
			disputeId:
				dispute.disputeId || dispute.id || `DSP-${String(index + 1).padStart(3, "0")}`,
			orderId: dispute.orderId || "ORD-000",
			buyer: dispute.buyer || "Buyer",
			buyerEmail: dispute.buyerEmail || "Not provided",
			reason: dispute.reason || "Issue reported",
			description: dispute.description || "",
			status: dispute.status || "open",
			dateFiled: dispute.dateFiled || dispute.filed || "2025-12-22",
			buyerEvidence,
			sellerEvidence,
			sellerResponse: dispute.sellerResponse || null,
			requestedAction: dispute.requestedAction || "refund",
			resolution: dispute.resolution,
			messages,
			orderDetails:
				dispute.orderDetails || {
					item: dispute.itemName || "Item",
					price: amount,
					date: dispute.dateFiled || "2025-12-20",
				},
		};
	}, []);

	const refreshDisputes = useCallback(async () => {
		try {
			const response = await disputesApi.getMySellerDisputes();
			setDisputes((response.disputes || []).map(normalizeDispute));
		} catch (loadError) {
			setError(loadError.message || "Failed to refresh disputes");
		}
	}, [normalizeDispute]);

	const getLastUpdate = (dispute) => {
		if (dispute.lastUpdate) return dispute.lastUpdate;
		if (dispute.resolution?.dateResolved) return dispute.resolution.dateResolved;
		if (dispute.messages?.length) return dispute.messages[dispute.messages.length - 1].time;
		return dispute.dateFiled;
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

	useEffect(() => {
		refreshDisputes();
		setLastSeenMap({});
	}, [refreshDisputes]);

	const filteredDisputes = disputes.filter((dispute) => {
		if (filter === "all") return true;
		return dispute.status === filter;
	});

	const getStatusColor = (status) => {
		switch (status) {
			case "open":
				return "bg-red-100 text-red-800";
			case "under_review":
				return "bg-yellow-100 text-yellow-800";
			case "resolved":
				return "bg-green-100 text-green-800";
			case "closed":
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getResolutionColor = (decision) => {
		switch (decision) {
			case "refund_approved":
				return "bg-red-100 text-red-800";
			case "refund_denied":
				return "bg-green-100 text-green-800";
			case "partial_refund":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const handleViewDetails = (dispute) => {
		setSelectedDispute(dispute);
		setResponseForm({
			response: dispute.sellerResponse || "",
			evidence: [],
		});
	};

	const handleResponseChange = (e) => {
		setResponseForm({
			...responseForm,
			response: e.target.value,
		});
	};

	const handleFileUpload = (e) => {
		const files = Array.from(e.target.files);
		setResponseForm({
			...responseForm,
			evidence: files.map((f) => f.name),
		});
	};

	const handleSubmitResponse = async (e) => {
		e.preventDefault();
		try {
			const response = await disputesApi.submitSellerResponse(selectedDispute.disputeId, {
				response: responseForm.response,
				evidence: responseForm.evidence,
			});
			const updated = normalizeDispute(response.dispute);
			setDisputes((prev) =>
				prev.map((dispute) =>
					dispute.disputeId === updated.disputeId ? updated : dispute,
				),
			);
		} catch (submitError) {
			setError(submitError.message || "Failed to submit response");
		}

		setSelectedDispute(null);
		setResponseForm({ response: "", evidence: [] });
	};

	return (
		<div className="space-y-6" style={{ backgroundColor: "var(--surface)" }}>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Dispute Management
					{newCount > 0 && (
						<span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "var(--accent-secondary)", color: "var(--surface)" }}>
							{newCount} new
						</span>
					)}
				</h1>
				<div className="flex items-center space-x-4">
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="px-3 py-2 border rounded-md"
						style={{ borderColor: "var(--border)", color: "var(--ink)" }}
					>
						<option value="open">Open Disputes</option>
						<option value="under_review">Under Review</option>
						<option value="resolved">Resolved</option>
						<option value="all">All Disputes</option>
					</select>
					<button
						onClick={refreshDisputes}
						className="px-3 py-2 rounded-md border text-sm font-semibold"
						style={{ borderColor: "var(--border)", color: "var(--accent)" }}
					>
						Refresh
					</button>
					<button
						onClick={markAllRead}
						className="px-3 py-2 rounded-md border text-sm font-semibold"
						style={{ borderColor: "var(--border)", color: "var(--accent)" }}
					>
						Mark all read
					</button>
				</div>
			</div>
			{error ? (
				<p className="text-sm" style={{ color: "var(--accent-secondary-strong)" }}>
					{error}
				</p>
			) : null}

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div
					className="p-6 rounded-lg border"
					style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Open Disputes
					</h3>
					<p className="text-3xl font-bold mt-2" style={{ color: "var(--accent-secondary-strong)" }}>
						{disputes.filter((d) => d.status === "open").length}
					</p>
				</div>
				<div
					className="p-6 rounded-lg border"
					style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Under Review
					</h3>
					<p className="text-3xl font-bold mt-2" style={{ color: "var(--accent-secondary)" }}>
						{disputes.filter((d) => d.status === "under_review").length}
					</p>
				</div>
				<div
					className="p-6 rounded-lg border"
					style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
				>
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Resolved
					</h3>
					<p className="text-3xl font-bold mt-2" style={{ color: "var(--accent)" }}>
						{disputes.filter((d) => d.status === "resolved").length}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Disputes List */}
				<div className="lg:col-span-2">
					<div
						className="border rounded-lg"
						style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
					>
						<div
							className="px-6 py-4"
							style={{
								backgroundColor: "var(--surface-strong)",
								borderBottomColor: "var(--border)",
								borderBottomWidth: "1px",
							}}
						>
							<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
								Customer Disputes
							</h3>
						</div>
						<div>
							{filteredDisputes.length > 0 ? (
								filteredDisputes.map((dispute) => (
									<div
										key={dispute.id}
										className="p-6"
										style={{
											borderBottomColor: "var(--border)",
											borderBottomWidth: "1px",
										}}
									>
										<div className="flex justify-between items-start mb-4">
											<div>
												<h4
													className="text-lg font-medium"
													style={{ color: "var(--accent)" }}
												>
													{dispute.disputeId}
												</h4>
												<p className="text-sm" style={{ color: "var(--muted)" }}>
													Order: {dispute.orderId} - Buyer: {dispute.buyer} -
													Filed: {dispute.dateFiled}
												</p>
											</div>
											<div className="text-right">
												<div className="flex items-center justify-end gap-2">
													{hasNewUpdate(dispute) && (
														<span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "var(--accent-secondary)", color: "var(--surface)" }}>
															New
														</span>
													)}
													<span
														className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(dispute.status)}`}
													>
														{dispute.status.replace("_", " ")}
													</span>
												</div>
												<p
													className="text-sm mt-1"
													style={{ color: "var(--muted)" }}
												>
													{dispute.orderDetails.item}
												</p>
												<p
													className="text-sm font-medium"
													style={{ color: "var(--accent)" }}
												>
													${dispute.orderDetails.price}
												</p>
											</div>
										</div>

										<div className="mb-4">
											<h5 className="font-medium" style={{ color: "var(--accent)" }}>
												Reason: {dispute.reason}
											</h5>
											<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
												{dispute.description}
											</p>
										</div>
										{dispute.messages?.length > 0 && (
											<div className="mb-4">
												<h5 className="font-medium" style={{ color: "var(--accent)" }}>
													Conversation
												</h5>
												<div className="mt-2 space-y-2 text-sm">
													{dispute.messages.map((msg, index) => (
														<div
															key={`${dispute.id}-msg-${index}`}
															className="rounded border p-2"
															style={{ borderColor: "var(--border)" }}
														>
															<p style={{ color: "var(--text)" }}>
																<strong>{msg.sender}:</strong> {msg.text}
															</p>
															<p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
																{msg.time}
															</p>
														</div>
													))}
												</div>
											</div>
										)}

										<div className="mb-4">
											<h5 className="font-medium" style={{ color: "var(--accent)" }}>
												Requested: {dispute.requestedAction}
											</h5>
										</div>

										{dispute.buyerEvidence.length > 0 && (
											<div className="mb-4">
												<h5
													className="font-medium"
													style={{ color: "var(--accent)" }}
												>
													Buyer Evidence
												</h5>
												<div className="flex space-x-2 mt-1">
													{dispute.buyerEvidence.map((file, index) => (
														<span
															key={index}
															className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs"
															style={{
																backgroundColor: "var(--surface-strong)",
																color: "var(--text)",
															}}
														>
															<Paperclip className="w-3 h-3" />
															{file}
														</span>
													))}
												</div>
											</div>
										)}

										{dispute.sellerResponse && (
											<div
												className="mb-4 p-3 rounded-md"
												style={{ backgroundColor: "var(--accent-tint)" }}
											>
												<h5
													className="font-medium"
													style={{ color: "var(--accent)" }}
												>
													Your Response
												</h5>
												<p
													className="text-sm mt-1"
													style={{ color: "var(--accent)" }}
												>
													{dispute.sellerResponse}
												</p>
												{dispute.sellerEvidence?.length > 0 && (
													<ul className="text-xs mt-2 space-y-1">
														{dispute.sellerEvidence.map((file, index) => (
															<li key={`${dispute.id}-seller-${index}`} className="flex items-center gap-1">
																<Paperclip className="w-3 h-3" />
																<span>{file}</span>
															</li>
														))}
													</ul>
												)}
											</div>
										)}

										{dispute.resolution && (
											<div
												className="mb-4 p-3 rounded-md"
												style={{ backgroundColor: "var(--surface-strong)" }}
											>
												<h5
													className="font-medium"
													style={{ color: "var(--accent)" }}
												>
													Final Resolution
												</h5>
												<div className="mt-2">
													<span
														className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getResolutionColor(dispute.resolution.decision)}`}
													>
														{dispute.resolution.decision.replace("_", " ")}
													</span>
													{dispute.resolution.amount && (
														<span
															className="ml-2 font-medium"
															style={{ color: "var(--accent)" }}
														>
															${dispute.resolution.amount}
														</span>
													)}
												</div>
												{dispute.resolution.adminNote && (
													<p
														className="text-sm mt-2"
														style={{ color: "var(--muted)" }}
													>
														<strong>Admin:</strong>{" "}
														{dispute.resolution.adminNote}
													</p>
												)}
											</div>
										)}

										<div className="flex space-x-2">
											<button
												onClick={() => handleViewDetails(dispute)}
												className="text-white px-3 py-1 rounded text-sm"
												style={{ backgroundColor: "var(--accent-secondary)" }}
												onMouseEnter={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
												}
												onMouseLeave={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary)")
												}
											>
												{dispute.sellerResponse ? "Update Response" : "Respond"}
											</button>
											<button
												className="text-white px-3 py-1 rounded text-sm"
												style={{ backgroundColor: "var(--muted)" }}
												onMouseEnter={(e) =>
													(e.target.style.backgroundColor = "var(--muted)")
												}
												onMouseLeave={(e) =>
													(e.target.style.backgroundColor = "var(--muted)")
												}
											>
												View Order
											</button>
										</div>
									</div>
								))
							) : (
								<div className="p-12 text-center" style={{ color: "var(--muted)" }}>
									<AlertTriangle className="w-10 h-10 text-gray-400 mx-auto mb-4" />
									<h3
										className="text-lg font-medium mb-2"
										style={{ color: "var(--accent)" }}
									>
										No disputes found
									</h3>
									<p>
										{filter === "all"
											? "No customer disputes at this time."
											: `No ${filter.replace("_", " ")} disputes found.`}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Response Panel */}
				<div>
					{selectedDispute ? (
						<div
							className="border rounded-lg p-6"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<h3
								className="text-lg font-medium mb-4"
								style={{ color: "var(--accent)" }}
							>
								Respond to Dispute
							</h3>
							<p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
								Dispute #{selectedDispute.disputeId} - {selectedDispute.reason}
							</p>

							<form onSubmit={handleSubmitResponse} className="space-y-4">
								<div>
									<label
										className="block text-sm font-medium mb-2"
										style={{ color: "var(--text)" }}
									>
										Your Response
									</label>
									<textarea
										value={responseForm.response}
										onChange={handleResponseChange}
										required
										rows={6}
										placeholder="Explain your position and provide any relevant information..."
										className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none"
										style={{ borderColor: "var(--border)", color: "var(--ink)" }}
									/>
								</div>

								<div>
									<label
										className="block text-sm font-medium mb-2"
										style={{ color: "var(--text)" }}
									>
										Additional Evidence (Optional)
									</label>
									<input
										type="file"
										multiple
										accept="image/*,.pdf"
										onChange={handleFileUpload}
										className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none"
										style={{ borderColor: "var(--border)", color: "var(--ink)" }}
									/>
									<p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
										Upload photos, shipping labels, or other evidence
									</p>
									{responseForm.evidence.length > 0 && (
										<div className="mt-2">
											<p
												className="text-sm font-medium"
												style={{ color: "var(--text)" }}
											>
												Selected files:
											</p>
											<ul className="text-sm" style={{ color: "var(--muted)" }}>
												{responseForm.evidence.map((file, index) => (
													<li key={index} className="flex items-center gap-1">
														<Paperclip className="w-3 h-3" />
														{file}
													</li>
												))}
											</ul>
										</div>
									)}
								</div>

								<div
									className="p-3 rounded-md"
									style={{ backgroundColor: "var(--accent-secondary-tint)" }}
								>
									<h5 className="font-medium" style={{ color: "var(--accent-secondary-strong)" }}>
										Important Notes
									</h5>
									<ul
										className="text-sm mt-1 space-y-1"
										style={{ color: "var(--accent-secondary-strong)" }}
									>
										<li>- Provide clear, factual information</li>
										<li>- Include order numbers, dates, and tracking info</li>
										<li>- Upload photos if relevant to the dispute</li>
										<li>- Admin will review both sides before deciding</li>
									</ul>
								</div>

								<div className="flex space-x-3">
									<button
										type="button"
										onClick={() => setSelectedDispute(null)}
										className="flex-1 px-4 py-2 border rounded-md"
										style={{ borderColor: "var(--border)", color: "var(--text)" }}
										onMouseEnter={(e) =>
											(e.target.style.backgroundColor = "var(--surface-strong)")
										}
										onMouseLeave={(e) =>
											(e.target.style.backgroundColor = "var(--surface)")
										}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="flex-1 px-4 py-2 text-white rounded-md"
										style={{ backgroundColor: "var(--accent-secondary)" }}
										onMouseEnter={(e) =>
											(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
										}
										onMouseLeave={(e) =>
											(e.target.style.backgroundColor = "var(--accent-secondary)")
										}
									>
										Submit Response
									</button>
								</div>
							</form>
						</div>
					) : (
						<div
							className="border rounded-lg p-6 text-center"
							style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
						>
							<MessageCircle className="w-10 h-10 text-gray-400 mx-auto mb-4" />
							<h3
								className="text-lg font-medium mb-2"
								style={{ color: "var(--accent)" }}
							>
								Select a dispute
							</h3>
							<p style={{ color: "var(--muted)" }}>
								Choose a customer dispute to review and respond
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SellerDisputes;

