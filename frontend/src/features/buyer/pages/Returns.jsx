import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { returnsApi } from "../../../services/api.js";

const Returns = () => {
	const [returnsList, setReturnsList] = useState([]);
	const [filter, setFilter] = useState("all");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadReturns = async () => {
			setLoading(true);
			setError("");
			try {
				const response = await returnsApi.getMyReturns();
				setReturnsList(response.returns || []);
			} catch (loadError) {
				setError(loadError.message || "Failed to load returns");
				setReturnsList([]);
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

	const getStatusLabel = (status) => {
		switch (status) {
			case "approved":
				return "Approved";
			case "rejected":
				return "Rejected";
			case "requested":
			default:
				return "Requested";
		}
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
							<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
								Returns
							</h1>
							<p className="mt-1" style={{ color: "var(--muted)" }}>
								Track your return requests
							</p>
							{error ? (
								<p className="mt-1 text-sm" style={{ color: "var(--accent-secondary-strong)" }}>
									{error}
								</p>
							) : null}
						</div>
						<Link
							to="/buyer/orders"
							className="text-sm font-semibold"
							style={{ color: "var(--accent-secondary)" }}
						>
							View Orders
						</Link>
					</div>
				</div>
			</header>

			<div
				className="border-b"
				style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex gap-4 py-4 overflow-x-auto">
						{["all", "requested", "approved", "rejected"].map((status) => (
							<button
								key={status}
								onClick={() => setFilter(status)}
								className="px-4 py-2 rounded-lg whitespace-nowrap transition"
								style={{
									backgroundColor:
										filter === status ? "var(--accent-secondary)" : "var(--border)",
									color: filter === status ? "var(--surface)" : "var(--muted)",
								}}
							>
								{status === "all" ? "All" : getStatusLabel(status)}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{loading ? (
					<div className="text-center py-12">
						<p style={{ color: "var(--muted)" }}>Loading returns...</p>
					</div>
				) : filteredReturns.length > 0 ? (
					<div className="space-y-4">
						{filteredReturns.map((entry) => (
							<div
								key={entry.id}
								className="rounded-xl border p-6"
								style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
							>
								<div className="flex items-start justify-between mb-3">
									<div>
										<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
											{entry.id}
										</h3>
										<p className="text-sm" style={{ color: "var(--muted)" }}>
											Order {entry.orderId} - {entry.sellerName}
										</p>
									</div>
									<span
										className="px-3 py-1 rounded-full text-sm font-medium"
										style={{
											backgroundColor:
												entry.status === "approved"
													? "var(--accent-tint)"
													: entry.status === "rejected"
														? "var(--accent-secondary-tint)"
														: "var(--border)",
											color:
												entry.status === "approved"
													? "var(--accent)"
													: entry.status === "rejected"
														? "var(--accent-secondary-strong)"
														: "var(--muted)",
										}}
									>
										{getStatusLabel(entry.status)}
									</span>
								</div>
								<div className="text-sm space-y-2" style={{ color: "var(--muted)" }}>
									<p>
										Reason: <span style={{ color: "var(--accent)" }}>{entry.reason}</span>
									</p>
									{entry.notes ? <p>Notes: {entry.notes}</p> : null}
									<p>Filed: {new Date(entry.filed).toLocaleDateString()}</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<div className="text-5xl mb-4">No returns</div>
						<p style={{ color: "var(--muted)" }}>
							You haven't submitted any return requests yet.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Returns;
