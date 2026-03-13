import { useCallback, useEffect, useMemo, useState } from "react";
import { Paperclip, Scale } from "lucide-react";
import { disputesApi } from "../../../services/api.js";

const formatDate = (value) => {
	if (!value) return "N/A";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return date.toLocaleDateString();
};

const normalizeDispute = (dispute, index) => {
	const amount =
		typeof dispute.amount === "string"
			? Number(dispute.amount.replace(/[^0-9.]/g, "")) || 0
			: Number(dispute.amount || 0);

	return {
		...dispute,
		id: dispute.id ?? dispute.disputeId ?? `DSP-${String(index + 1).padStart(3, "0")}`,
		disputeId:
			dispute.disputeId || dispute.id || `DSP-${String(index + 1).padStart(3, "0")}`,
		dateOpened: dispute.dateOpened || dispute.filed || dispute.dateFiled,
		buyerEvidence: dispute.buyerEvidence || dispute.description || "No description provided.",
		sellerResponse:
			dispute.sellerResponse ||
			dispute.messages?.find((msg) => msg.sender === "seller")?.text ||
			"No seller response yet.",
		evidence: dispute.evidence || [],
		sellerEvidence: dispute.sellerEvidence || [],
		messages: dispute.messages || dispute.updates || [],
		amount,
		priority: dispute.priority || "medium",
	};
};

const DisputeResolution = () => {
	const [disputes, setDisputes] = useState([]);
	const [filter, setFilter] = useState("open");
	const [selectedDispute, setSelectedDispute] = useState(null);
	const [resolutionNote, setResolutionNote] = useState("");
	const [notifyParties, setNotifyParties] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const loadDisputes = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await disputesApi.getAllDisputes();
			const list = (response.disputes || []).map(normalizeDispute);
			setDisputes(list);
			if (selectedDispute) {
				const refreshed = list.find((d) => d.disputeId === selectedDispute.disputeId);
				setSelectedDispute(refreshed || null);
			}
		} catch (err) {
			setError(err.message || "Failed to load disputes");
			setDisputes([]);
		} finally {
			setLoading(false);
		}
	}, [selectedDispute]);

	useEffect(() => {
		loadDisputes();
	}, [loadDisputes]);

	const filteredDisputes = useMemo(() => {
		return disputes.filter((dispute) => {
			if (filter === "all") return true;
			if (filter === "open") return ["open", "under_review"].includes(dispute.status);
			return dispute.status === filter;
		});
	}, [disputes, filter]);

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

	const getPriorityColor = (priority) => {
		switch (priority) {
			case "high":
				return "text-red-600";
			case "medium":
				return "text-yellow-600";
			case "low":
				return "text-green-600";
			default:
				return "text-gray-600";
		}
	};

	const handleResolveDispute = async (decision, amount, fallbackReason) => {
		if (!selectedDispute) return;
		const reason = resolutionNote || fallbackReason;
		try {
			setError("");
			const response = await disputesApi.resolveDispute(selectedDispute.disputeId, {
				decision,
				amount,
				reason: notifyParties ? reason : `${reason} (internal note)`,
			});
			const updated = normalizeDispute(response.dispute, 0);
			setDisputes((prev) =>
				prev.map((dispute) => (dispute.disputeId === updated.disputeId ? updated : dispute)),
			);
			setSelectedDispute(updated);
			setResolutionNote("");
		} catch (err) {
			setError(err.message || "Failed to resolve dispute");
		}
	};

	const handleViewDetails = (dispute) => {
		setSelectedDispute(dispute);
		setResolutionNote("");
		setNotifyParties(true);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Dispute Resolution
				</h1>
				<div className="flex items-center space-x-3">
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="px-3 py-2 border rounded-md"
						style={{ borderColor: "var(--border)" }}
					>
						<option value="open">Open Disputes</option>
						<option value="resolved">Resolved</option>
						<option value="closed">Closed</option>
						<option value="all">All Disputes</option>
					</select>
					<button
						type="button"
						onClick={loadDisputes}
						className="px-3 py-2 rounded-md border text-sm"
						style={{ borderColor: "var(--border)", color: "var(--accent)" }}
					>
						Refresh
					</button>
				</div>
			</div>

			{error ? (
				<p className="text-sm" style={{ color: "var(--accent-secondary-strong)" }}>
					{error}
				</p>
			) : null}

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Open Disputes
					</h3>
					<p className="text-3xl font-bold text-red-600 mt-2">
						{disputes.filter((d) => d.status === "open").length}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Resolved
					</h3>
					<p className="text-3xl font-bold text-green-600 mt-2">
						{disputes.filter((d) => d.status === "resolved").length}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						In Review
					</h3>
					<p className="text-3xl font-bold text-yellow-600 mt-2">
						{disputes.filter((d) => d.status === "under_review").length}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<div className="bg-white shadow rounded-lg">
						<div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
							<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
								Disputes
							</h3>
						</div>
						<div className="overflow-x-auto">
							<table className="min-w-full">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Dispute
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Parties
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Reason
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Status
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white">
									{loading ? (
										<tr>
											<td className="px-6 py-6 text-sm text-gray-500" colSpan={5}>
												Loading disputes...
											</td>
										</tr>
									) : filteredDisputes.length === 0 ? (
										<tr>
											<td className="px-6 py-6 text-sm text-gray-500" colSpan={5}>
												No disputes found.
											</td>
										</tr>
									) : (
										filteredDisputes.map((dispute) => (
											<tr key={dispute.disputeId}>
												<td className="px-6 py-4 whitespace-nowrap">
													<div>
														<div className="text-sm font-medium text-gray-900">{dispute.disputeId}</div>
														<div className="text-sm text-gray-500">Order: {dispute.orderId}</div>
														<div className={`text-xs ${getPriorityColor(dispute.priority)}`}>
															{dispute.priority} priority
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
													<div>Buyer: {dispute.buyer}</div>
													<div>Seller: {dispute.seller}</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dispute.reason}</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(dispute.status)}`}>
														{dispute.status}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
													<button
														onClick={() => handleViewDetails(dispute)}
														style={{ color: "var(--accent)" }}
														className="hover:opacity-70 transition-opacity"
													>
														Review
													</button>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div>
					{selectedDispute ? (
						<div className="bg-white shadow rounded-lg p-6">
							<h3 className="text-lg font-medium mb-4" style={{ color: "var(--accent)" }}>
								Dispute Review
							</h3>
							<div className="space-y-4">
								<div>
									<h4 className="font-medium" style={{ color: "var(--accent)" }}>
										Dispute Details
									</h4>
									<div className="mt-2 text-sm text-gray-600">
										<p>
											<strong>ID:</strong> {selectedDispute.disputeId}
										</p>
										<p>
											<strong>Order:</strong> {selectedDispute.orderId}
										</p>
										<p>
											<strong>Amount:</strong> ${selectedDispute.amount}
										</p>
										<p>
											<strong>Reason:</strong> {selectedDispute.reason}
										</p>
										<p>
											<strong>Opened:</strong> {formatDate(selectedDispute.dateOpened)}
										</p>
									</div>
								</div>

								<div>
									<h4 className="font-medium" style={{ color: "var(--accent)" }}>
										Buyer Evidence
									</h4>
									<p className="mt-2 text-sm text-gray-600 p-3 rounded bg-gray-50">
										{selectedDispute.buyerEvidence}
									</p>
									{selectedDispute.evidence.length > 0 ? (
										<div className="mt-2">
											<p className="text-sm font-medium text-gray-700">Evidence Files:</p>
											<div className="space-y-1 mt-1">
												{selectedDispute.evidence.map((file, index) => (
													<div key={index} className="flex items-center text-sm">
														<Paperclip className="w-4 h-4 text-gray-600" />
														<span className="ml-2 text-blue-600">{file}</span>
													</div>
												))}
											</div>
										</div>
									) : null}
								</div>

								<div>
									<h4 className="font-medium text-gray-900">Seller Response</h4>
									<p className="mt-2 text-sm text-gray-600 bg-green-50 p-3 rounded">
										{selectedDispute.sellerResponse}
									</p>
									{selectedDispute.sellerEvidence?.length > 0 ? (
										<div className="mt-2">
											<p className="text-sm font-medium text-gray-700">Seller Evidence:</p>
											<div className="space-y-1 mt-1">
												{selectedDispute.sellerEvidence.map((file, index) => (
													<div key={index} className="flex items-center text-sm">
														<Paperclip className="w-4 h-4 text-gray-600" />
														<span className="ml-2 text-blue-600">{file}</span>
													</div>
												))}
											</div>
										</div>
									) : null}
								</div>

								{selectedDispute.messages?.length > 0 ? (
									<div>
										<h4 className="font-medium text-gray-900">Conversation Log</h4>
										<div className="mt-2 space-y-2 text-sm">
											{selectedDispute.messages.map((msg, index) => (
												<div key={index} className="rounded border p-2" style={{ borderColor: "var(--border)" }}>
													<p className="text-gray-700">
														<strong>{msg.sender}:</strong> {msg.text}
													</p>
													<p className="text-xs text-gray-500 mt-1">{formatDate(msg.time)}</p>
												</div>
											))}
										</div>
									</div>
								) : null}

								{selectedDispute.resolution ? (
									<div>
										<h4 className="font-medium text-gray-900">Resolution</h4>
										<div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
											<p>
												<strong>Decision:</strong> {selectedDispute.resolution.decision.replace("_", " ")}
											</p>
											<p>
												<strong>Amount:</strong> ${selectedDispute.resolution.amount}
											</p>
											<p>
												<strong>Reason:</strong> {selectedDispute.resolution.reason}
											</p>
											<p>
												<strong>Resolved:</strong> {formatDate(selectedDispute.resolution.dateResolved)}
											</p>
										</div>
									</div>
								) : (
									<div>
										<h4 className="font-medium text-gray-900">Resolution Options</h4>
										<div className="mt-2 space-y-3">
											<div>
												<label className="text-sm font-medium text-gray-700">
													Resolution note (shared with buyer and seller)
												</label>
												<textarea
													value={resolutionNote}
													onChange={(e) => setResolutionNote(e.target.value)}
													rows={3}
													className="mt-2 w-full rounded border px-3 py-2 text-sm"
													style={{ borderColor: "var(--border)" }}
													placeholder="Add a short summary or reason for the decision."
												/>
											</div>
											<label className="flex items-center gap-2 text-sm text-gray-700">
												<input
													type="checkbox"
													checked={notifyParties}
													onChange={(e) => setNotifyParties(e.target.checked)}
												/>
												Notify buyer and seller
											</label>
										</div>
										<div className="mt-2 space-y-2">
											<button
												onClick={() => handleResolveDispute("refund_buyer", selectedDispute.amount, "Full refund to buyer")}
												className="w-full bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
											>
												Refund Buyer (${selectedDispute.amount})
											</button>
											<button
												onClick={() =>
													handleResolveDispute(
														"partial_refund",
														selectedDispute.amount * 0.5,
														"Partial refund as compromise",
													)
												}
												className="w-full bg-yellow-600 text-white px-3 py-2 rounded text-sm hover:bg-yellow-700"
											>
												Partial Refund (${(selectedDispute.amount * 0.5).toFixed(2)})
											</button>
											<button
												onClick={() => handleResolveDispute("side_with_seller", 0, "Evidence supports seller position")}
												className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
											>
												Side with Seller
											</button>
										</div>
									</div>
								)}

								<button
									onClick={() => setSelectedDispute(null)}
									className="w-full bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700"
								>
									Close
								</button>
							</div>
						</div>
					) : (
						<div className="bg-white shadow rounded-lg p-6 text-center">
							<Scale className="w-10 h-10 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">Select a Dispute</h3>
							<p className="text-gray-500">Choose a dispute from the list to review and resolve</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default DisputeResolution;
