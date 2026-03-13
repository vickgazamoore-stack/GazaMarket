import { useState, useEffect } from "react";
import { Loader2, X } from "lucide-react";

const PayoutManagement = () => {
	const [payouts, setPayouts] = useState([]);
	const [filter, setFilter] = useState("pending");
	const [selectedPayout, setSelectedPayout] = useState(null);
	const [processingModal, setProcessingModal] = useState(false);

	// Mock data - in real app this would come from API
	useEffect(() => {
		const mockPayouts = [
			{
				id: 1,
				sellerId: 1,
				sellerName: "Nnamdi Tech Market",
				amount: 1234.56,
				status: "pending",
				requestDate: "2025-12-20",
				method: "Bank Transfer",
				accountDetails: {
					bankName: "First National Bank",
					accountNumber: "****1234",
					routingNumber: "123456789",
				},
				transactions: [
					{ id: 1, orderId: "ORD-123", amount: 81.0, date: "2025-12-15" },
					{ id: 2, orderId: "ORD-124", amount: 40.95, date: "2025-12-16" },
					{ id: 3, orderId: "ORD-125", amount: 112.61, date: "2025-12-17" },
				],
			},
			{
				id: 2,
				sellerId: 2,
				sellerName: "Adaeze Electronics",
				amount: 987.43,
				status: "processing",
				requestDate: "2025-12-19",
				processingDate: "2025-12-22",
				method: "Bank Transfer",
				accountDetails: {
					bankName: "City Bank",
					accountNumber: "****5678",
					routingNumber: "987654321",
				},
				transactions: [
					{ id: 1, orderId: "ORD-126", amount: 245.67, date: "2025-12-18" },
					{ id: 2, orderId: "ORD-127", amount: 123.45, date: "2025-12-19" },
					{ id: 3, orderId: "ORD-128", amount: 618.31, date: "2025-12-20" },
				],
			},
			{
				id: 3,
				sellerId: 3,
				sellerName: "Chinedu Audio",
				amount: 756.89,
				status: "completed",
				requestDate: "2025-12-18",
				processingDate: "2025-12-21",
				completionDate: "2025-12-23",
				method: "Bank Transfer",
				reference: "PYT-2025-001",
				accountDetails: {
					bankName: "Regional Bank",
					accountNumber: "****9012",
					routingNumber: "456789123",
				},
				transactions: [
					{ id: 1, orderId: "ORD-129", amount: 378.45, date: "2025-12-17" },
					{ id: 2, orderId: "ORD-130", amount: 189.22, date: "2025-12-18" },
					{ id: 3, orderId: "ORD-131", amount: 189.22, date: "2025-12-19" },
				],
			},
			{
				id: 4,
				sellerId: 4,
				sellerName: "Ugochi Digital",
				amount: 543.21,
				status: "failed",
				requestDate: "2025-12-17",
				processingDate: "2025-12-20",
				failureReason: "Invalid account number",
				method: "Bank Transfer",
				accountDetails: {
					bankName: "Metro Bank",
					accountNumber: "****3456",
					routingNumber: "789123456",
				},
				transactions: [
					{ id: 1, orderId: "ORD-132", amount: 271.61, date: "2025-12-16" },
					{ id: 2, orderId: "ORD-133", amount: 271.6, date: "2025-12-17" },
				],
			},
		];
		setPayouts(mockPayouts);
	}, []);

	const filteredPayouts = payouts.filter((payout) => {
		if (filter === "all") return true;
		return payout.status === filter;
	});

	const getStatusColor = (status) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "processing":
				return "bg-blue-100 text-blue-800";
			case "completed":
				return "bg-green-100 text-green-800";
			case "failed":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const handleViewDetails = (payout) => {
		setSelectedPayout(payout);
	};

	const handleProcessPayout = (payoutId) => {
		setPayouts(
			payouts.map((payout) =>
				payout.id === payoutId
					? {
							...payout,
							status: "processing",
							processingDate: new Date().toISOString().split("T")[0],
						}
					: payout,
			),
		);
		setProcessingModal(false);
		setSelectedPayout(null);
	};

	const handleCompletePayout = (payoutId, reference) => {
		setPayouts(
			payouts.map((payout) =>
				payout.id === payoutId
					? {
							...payout,
							status: "completed",
							completionDate: new Date().toISOString().split("T")[0],
							reference: reference || `PYT-${Date.now()}`,
						}
					: payout,
			),
		);
		setSelectedPayout(null);
	};

	const handleFailPayout = (payoutId, reason) => {
		setPayouts(
			payouts.map((payout) =>
				payout.id === payoutId
					? {
							...payout,
							status: "failed",
							failureReason: reason,
						}
					: payout,
			),
		);
		setSelectedPayout(null);
	};

	const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Payout Management
				</h1>
				<div className="flex items-center space-x-4">
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="px-3 py-2 border rounded-md"
						style={{ borderColor: "var(--border)" }}
					>
						<option value="pending">Pending</option>
						<option value="processing">Processing</option>
						<option value="completed">Completed</option>
						<option value="failed">Failed</option>
						<option value="all">All Payouts</option>
					</select>
					<button
						onClick={() => setProcessingModal(true)}
						className="text-white px-4 py-2 rounded-md"
						style={{ backgroundColor: "var(--accent-secondary)" }}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
					>
						Process Batch
					</button>
				</div>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Pending Payouts
					</h3>
					<p className="text-3xl font-bold text-yellow-600 mt-2">
						{payouts.filter((p) => p.status === "pending").length}
					</p>
					<p className="text-sm text-gray-600 mt-1">
						{formatCurrency(
							payouts
								.filter((p) => p.status === "pending")
								.reduce((sum, p) => sum + p.amount, 0),
						)}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Processing
					</h3>
					<p className="text-3xl font-bold mt-2" style={{ color: "var(--accent)" }}>
						{payouts.filter((p) => p.status === "processing").length}
					</p>
					<p className="text-sm text-gray-600 mt-1">
						{formatCurrency(
							payouts
								.filter((p) => p.status === "processing")
								.reduce((sum, p) => sum + p.amount, 0),
						)}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Completed Today
					</h3>
					<p className="text-3xl font-bold text-green-600 mt-2">
						{
							payouts.filter(
								(p) =>
									p.status === "completed" &&
									p.completionDate === new Date().toISOString().split("T")[0],
							).length
						}
					</p>
					<p className="text-sm text-gray-600 mt-1">
						{formatCurrency(
							payouts
								.filter(
									(p) =>
										p.status === "completed" &&
										p.completionDate === new Date().toISOString().split("T")[0],
								)
								.reduce((sum, p) => sum + p.amount, 0),
						)}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Failed Payouts
					</h3>
					<p className="text-3xl font-bold text-red-600 mt-2">
						{payouts.filter((p) => p.status === "failed").length}
					</p>
					<p className="text-sm text-gray-600 mt-1">This month</p>
				</div>
			</div>

			{/* Payouts List */}
			<div className="bg-white shadow rounded-lg">
				<div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Payout Requests
					</h3>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full" style={{ divideColor: "var(--border)" }}>
						<thead className="bg-gray-50">
							<tr>
								<th
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									style={{ color: "var(--muted)" }}
								>
									Seller
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									style={{ color: "var(--muted)" }}
								>
									Amount
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									style={{ color: "var(--muted)" }}
								>
									Method
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									style={{ color: "var(--muted)" }}
								>
									Status
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									style={{ color: "var(--muted)" }}
								>
									Requested
								</th>
								<th
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
									style={{ color: "var(--muted)" }}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white" style={{ divideColor: "var(--border)" }}>
							{filteredPayouts.map((payout) => (
								<tr key={payout.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-gray-900">
											{payout.sellerName}
										</div>
										<div className="text-sm text-gray-500">
											{payout.accountDetails.bankName}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{formatCurrency(payout.amount)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{payout.method}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payout.status)}`}
										>
											{payout.status.replace("_", " ")}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{payout.requestDate}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<button
											onClick={() => handleViewDetails(payout)}
											style={{ color: "var(--accent)" }}
											onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
											onMouseLeave={(e) => (e.target.style.opacity = "1")}
											className="mr-3 hover:opacity-70 transition-opacity"
										>
											View Details
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Payout Details Modal */}
			{selectedPayout && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
					<div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-2/3 shadow-lg rounded-md bg-white">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
								Payout Details - {selectedPayout.sellerName}
							</h3>
							<button
								onClick={() => setSelectedPayout(null)}
								className="text-gray-400 hover:text-gray-600"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* Payout Information */}
							<div className="space-y-4">
								<div>
									<h4 className="font-medium mb-2" style={{ color: "var(--accent)" }}>
										Payout Information
									</h4>
									<div className="bg-gray-50 p-4 rounded-lg space-y-2">
										<div className="flex justify-between">
											<span className="text-gray-600">Amount:</span>
											<span className="font-medium">
												{formatCurrency(selectedPayout.amount)}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Method:</span>
											<span className="font-medium">
												{selectedPayout.method}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Status:</span>
											<span
												className={`font-medium ${getStatusColor(selectedPayout.status)}`}
											>
												{selectedPayout.status.replace("_", " ")}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Requested:</span>
											<span className="font-medium">
												{selectedPayout.requestDate}
											</span>
										</div>
										{selectedPayout.processingDate && (
											<div className="flex justify-between">
												<span className="text-gray-600">Processing Date:</span>
												<span className="font-medium">
													{selectedPayout.processingDate}
												</span>
											</div>
										)}
										{selectedPayout.reference && (
											<div className="flex justify-between">
												<span className="text-gray-600">Reference:</span>
												<span className="font-medium">
													{selectedPayout.reference}
												</span>
											</div>
										)}
									</div>
								</div>

								{/* Bank Account Details */}
								<div>
									<h4 className="font-medium mb-2" style={{ color: "var(--accent)" }}>
										Bank Account Details
									</h4>
									<div className="bg-gray-50 p-4 rounded-lg space-y-2">
										<div className="flex justify-between">
											<span className="text-gray-600">Bank:</span>
											<span className="font-medium">
												{selectedPayout.accountDetails.bankName}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Account:</span>
											<span className="font-medium">
												{selectedPayout.accountDetails.accountNumber}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Routing:</span>
											<span className="font-medium">
												{selectedPayout.accountDetails.routingNumber}
											</span>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex space-x-3">
									{selectedPayout.status === "pending" && (
										<>
											<button
												onClick={() => handleProcessPayout(selectedPayout.id)}
												className="flex-1 text-white px-4 py-2 rounded-md"
												style={{ backgroundColor: "var(--accent-secondary)" }}
												onMouseEnter={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
												}
												onMouseLeave={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary)")
												}
											>
												Start Processing
											</button>
											<button
												onClick={() => {
													const reason = prompt("Reason for failure:");
													if (reason)
														handleFailPayout(selectedPayout.id, reason);
												}}
												className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
											>
												Mark as Failed
											</button>
										</>
									)}

									{selectedPayout.status === "processing" && (
										<>
											<button
												onClick={() => {
													const reference = prompt("Enter payment reference:");
													if (reference)
														handleCompletePayout(selectedPayout.id, reference);
												}}
												className="flex-1 text-white px-4 py-2 rounded-md"
												style={{ backgroundColor: "var(--accent-secondary)" }}
												onMouseEnter={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
												}
												onMouseLeave={(e) =>
													(e.target.style.backgroundColor = "var(--accent-secondary)")
												}
											>
												Mark as Completed
											</button>
											<button
												onClick={() => {
													const reason = prompt("Reason for failure:");
													if (reason)
														handleFailPayout(selectedPayout.id, reason);
												}}
												className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
											>
												Mark as Failed
											</button>
										</>
									)}
								</div>

								{selectedPayout.failureReason && (
									<div
										className="border rounded-lg p-4"
										style={{
											backgroundColor: "var(--accent-secondary-tint)",
											borderColor: "var(--accent-secondary-tint)",
										}}
									>
										<h4
											className="font-medium mb-2"
											style={{ color: "var(--accent-secondary-strong)" }}
										>
											Failure Reason
										</h4>
										<p style={{ color: "var(--accent-secondary-strong)" }}>
											{selectedPayout.failureReason}
										</p>
									</div>
								)}
							</div>

							{/* Transaction Details */}
							<div>
								<h4 className="font-medium mb-3" style={{ color: "var(--accent)" }}>
									Included Transactions
								</h4>
								<div className="space-y-3 max-h-96 overflow-y-auto">
									{selectedPayout.transactions.map((transaction) => (
										<div
											key={transaction.id}
											className="bg-gray-50 p-3 rounded-lg"
										>
											<div className="flex justify-between items-center mb-1">
												<span className="font-medium text-gray-900">
													{transaction.orderId}
												</span>
												<span className="font-medium text-green-600">
													{formatCurrency(transaction.amount)}
												</span>
											</div>
											<div className="text-sm text-gray-600">
												{transaction.date}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Processing Modal */}
			{processingModal && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
					<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
						<div className="text-center">
							<Loader2 className="w-10 h-10 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-4">
								Batch Processing
							</h3>
							<p className="text-gray-600 mb-6">
								Process all pending payoutsx This action cannot be undone.
							</p>
							<div className="flex space-x-3">
								<button
									onClick={() => {
										payouts
											.filter((p) => p.status === "pending")
											.forEach((payout) => {
												handleProcessPayout(payout.id);
											});
										setProcessingModal(false);
									}}
									className="flex-1 text-white px-4 py-2 rounded-md"
									style={{ backgroundColor: "var(--accent-secondary)" }}
									onMouseEnter={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary)")
									}
								>
									Process All
								</button>
								<button
									onClick={() => setProcessingModal(false)}
									className="flex-1 text-white px-4 py-2 rounded-md"
									style={{ backgroundColor: "var(--muted)" }}
									onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
									onMouseLeave={(e) => (e.target.style.opacity = "1")}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PayoutManagement;
