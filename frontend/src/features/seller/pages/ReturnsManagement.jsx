import { useEffect, useMemo, useState } from "react";
import { returnsApi } from "../../../services/api.js";

const ReturnsManagement = () => {
	const [returnsList, setReturnsList] = useState([]);
	const [filter, setFilter] = useState("all");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadReturns = async () => {
			setLoading(true);
			setError("");
			try {
				const response = await returnsApi.getMySellerReturns();
				setReturnsList(response.returns || []);
			} catch (loadError) {
				setError(loadError.message || "Failed to load returns");
			} finally {
				setLoading(false);
			}
		};

		loadReturns();
	}, []);

	const filteredReturns = useMemo(() => {
		if (filter === "all") return returnsList;
		return returnsList.filter((entry) => entry.status === filter);
	}, [filter, returnsList]);

	const handleStatusChange = async (returnId, status) => {
		try {
			const response = await returnsApi.updateReturnStatus(returnId, { status });
			const updated = response.return;
			setReturnsList((prev) =>
				prev.map((entry) => (entry.id === returnId ? updated : entry)),
			);
		} catch (updateError) {
			setError(updateError.message || "Failed to update return status");
		}
	};

	const getStatusLabel = (status) => {
		switch (status) {
			case "approved":
				return "Approved";
			case "rejected":
				return "Rejected";
			default:
				return "Requested";
		}
	};

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
				<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
					Returns & Refunds
				</h1>
				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
							Return Requests
						</h2>
						<div className="flex gap-2">
							{["all", "requested", "approved", "rejected"].map((status) => (
								<button
									key={status}
									onClick={() => setFilter(status)}
									className="px-3 py-1 rounded-lg text-xs font-semibold"
									style={{
										backgroundColor:
											filter === status ? "var(--accent-secondary)" : "var(--border)",
										color:
											filter === status ? "var(--surface)" : "var(--muted)",
									}}
								>
									{status === "all" ? "All" : getStatusLabel(status)}
								</button>
							))}
						</div>
					</div>
					<div className="mt-4 space-y-3">
						{loading && (
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Loading return requests...
							</p>
						)}
						{error && (
							<p className="text-sm" style={{ color: "var(--accent-secondary-strong)" }}>
								{error}
							</p>
						)}
						{filteredReturns.length > 0 ? (
							filteredReturns.map((ret) => (
								<div
									key={ret.id}
									className="border rounded-lg p-4"
									style={{ borderColor: "var(--border)" }}
								>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-semibold" style={{ color: "var(--accent)" }}>
												{ret.id}
											</p>
											<p className="text-sm" style={{ color: "var(--muted)" }}>
												{ret.orderId} - {ret.reason}
											</p>
										</div>
										<span
											className="text-xs font-semibold px-3 py-1 rounded-full"
											style={{
												backgroundColor:
													ret.status === "approved"
														? "var(--accent-tint)"
														: ret.status === "rejected"
															? "var(--accent-secondary-tint)"
															: "var(--border)",
												color:
													ret.status === "approved"
														? "var(--accent)"
														: ret.status === "rejected"
															? "var(--accent-secondary-strong)"
															: "var(--muted)",
											}}
										>
											{getStatusLabel(ret.status)}
										</span>
									</div>
									{ret.notes && (
										<p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
											{ret.notes}
										</p>
									)}
									{ret.status === "requested" && (
										<div className="flex gap-2 mt-3">
											<button
												onClick={() => handleStatusChange(ret.id, "approved")}
												className="px-3 py-1 rounded-lg text-xs font-semibold text-white"
												style={{ backgroundColor: "var(--accent)" }}
											>
												Approve
											</button>
											<button
												onClick={() => handleStatusChange(ret.id, "rejected")}
												className="px-3 py-1 rounded-lg text-xs font-semibold"
												style={{
													backgroundColor: "var(--accent-secondary-tint)",
													color: "var(--accent-secondary-strong)",
												}}
											>
												Reject
											</button>
										</div>
									)}
								</div>
							))
						) : (
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								No return requests yet.
							</p>
						)}
					</div>
				</div>

				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
						Return Policy
					</h2>
					<textarea
						rows={4}
						defaultValue="Returns accepted within 14 days of delivery. Items must be unused and in original packaging."
						className="mt-3 w-full px-3 py-2 rounded-lg border focus:outline-none"
						style={{ borderColor: "var(--border)", color: "var(--text)" }}
					/>
					<div className="flex justify-end mt-4">
						<button
							className="px-6 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Update Policy
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReturnsManagement;

