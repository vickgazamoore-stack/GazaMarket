import { useState, useEffect } from "react";

const SellerManagement = () => {
	const [sellers, setSellers] = useState([]);
	const [filter, setFilter] = useState("all");
	const [selectedSeller, setSelectedSeller] = useState(null);

	// Mock data - in real app this would come from API
	useEffect(() => {
		const mockSellers = [
			{
				id: 1,
				businessName: "Nnamdi Tech Market",
				ownerName: "John Smith",
				email: "john@techhub.com",
				taxId: "12-3456789",
				status: "pending",
				applicationDate: "2025-12-20",
				businessType: "Sole Proprietorship",
				verificationDocuments: [
					"business_license.pdf",
					"tax_document.pdf",
					"id_document.pdf",
				],
				riskScore: "Low",
				notes: "",
			},
			{
				id: 2,
				businessName: "Adaeze Electronics",
				ownerName: "Jane Doe",
				email: "jane@urbanelectronics.com",
				taxId: "98-7654321",
				status: "approved",
				applicationDate: "2025-12-15",
				businessType: "LLC",
				verificationDocuments: [
					"business_license.pdf",
					"tax_document.pdf",
					"id_document.pdf",
				],
				riskScore: "Low",
				notes: "Approved - All documents verified",
			},
			{
				id: 3,
				businessName: "Ugochi Digital",
				ownerName: "Bob Johnson",
				email: "bob@novatech.com",
				taxId: "45-1122334",
				status: "rejected",
				applicationDate: "2025-12-10",
				businessType: "Corporation",
				verificationDocuments: ["business_license.pdf", "tax_document.pdf"],
				riskScore: "Medium",
				notes: "Rejected - Incomplete tax documentation",
			},
			{
				id: 4,
				businessName: "Chinedu Audio",
				ownerName: "Alice Wilson",
				email: "alice@soundsphere.com",
				taxId: "77-8822991",
				status: "info_requested",
				applicationDate: "2025-12-18",
				businessType: "Partnership",
				verificationDocuments: [
					"business_license.pdf",
					"tax_document.pdf",
					"id_document.pdf",
				],
				riskScore: "Low",
				notes: "Additional verification needed",
			},
		];
		setSellers(mockSellers);
	}, []);

	const filteredSellers = sellers.filter((seller) => {
		if (filter === "all") return true;
		return seller.status === filter;
	});

	const getStatusColor = (status) => {
		switch (status) {
			case "approved":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "rejected":
				return "bg-red-100 text-red-800";
			case "under_review":
				return "bg-blue-100 text-blue-800";
			case "suspended":
				return "bg-orange-100 text-orange-800";
			case "banned":
				return "bg-gray-900 text-white";
			case "info_requested":
				return "bg-indigo-100 text-indigo-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const handleStatusChange = (sellerId, newStatus, notes = "") => {
		setSellers(
			sellers.map((seller) =>
				seller.id === sellerId
					? { ...seller, status: newStatus, notes }
					: seller,
			),
		);
		setSelectedSeller(null);
	};

	const handleViewDetails = (seller) => {
		setSelectedSeller(seller);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Seller Management
				</h1>
				<div className="flex items-center space-x-4">
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="px-3 py-2 border rounded-md"
						style={{ borderColor: "var(--border)" }}
					>
						<option value="all">All Sellers</option>
						<option value="pending">Pending</option>
						<option value="under_review">Under Review</option>
						<option value="info_requested">Info Requested</option>
						<option value="approved">Approved</option>
						<option value="suspended">Suspended</option>
						<option value="banned">Banned</option>
						<option value="rejected">Rejected</option>
					</select>
				</div>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Total Sellers
					</h3>
					<p className="text-3xl font-bold mt-2" style={{ color: "var(--accent)" }}>
						{sellers.length}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Pending Review
					</h3>
					<p className="text-3xl font-bold text-yellow-600 mt-2">
						{sellers.filter((s) => s.status === "pending").length}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Approved
					</h3>
					<p className="text-3xl font-bold text-green-600 mt-2">
						{sellers.filter((s) => s.status === "approved").length}
					</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
						Rejected
					</h3>
					<p className="text-3xl font-bold text-red-600 mt-2">
						{sellers.filter((s) => s.status === "rejected").length}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Sellers List */}
				<div className="lg:col-span-2">
					<div className="bg-white shadow rounded-lg">
						<div
							className="px-6 py-4 border-b"
							style={{ borderColor: "var(--border)" }}
						>
							<h3 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
								Seller Applications
							</h3>
						</div>
						<div className="overflow-x-auto">
							<table
								className="min-w-full divide-y"
								style={{ divideColor: "var(--border)" }}
							>
								<thead className="bg-gray-50">
									<tr>
										<th
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
											style={{ color: "var(--muted)" }}
										>
											Business
										</th>
										<th
											className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
											style={{ color: "var(--muted)" }}
										>
											Owner
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
											Applied
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
									{filteredSellers.map((seller) => (
										<tr key={seller.id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div>
													<div className="text-sm font-medium text-gray-900">
														{seller.businessName}
													</div>
													<div className="text-sm text-gray-500">
														{seller.businessType}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">
													{seller.ownerName}
												</div>
												<div className="text-sm text-gray-500">
													{seller.email}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(seller.status)}`}
												>
													{seller.status.replace("_", " ")}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{seller.applicationDate}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
												<button
													onClick={() => handleViewDetails(seller)}
													style={{ color: "var(--accent)" }}
													onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
													onMouseLeave={(e) => (e.target.style.opacity = "1")}
													className="mr-3 hover:opacity-70 transition-opacity"
												>
													Review
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Seller Details Panel */}
				<div>
					{selectedSeller ? (
						<div className="bg-white shadow rounded-lg p-6">
							<h3
								className="text-lg font-medium mb-4"
								style={{ color: "var(--accent)" }}
							>
								Review Application
							</h3>

							<div className="space-y-4">
								<div>
									<h4 className="font-medium" style={{ color: "var(--accent)" }}>
										Business Details
									</h4>
									<div className="mt-2 text-sm text-gray-600">
										<p>
											<strong>Name:</strong> {selectedSeller.businessName}
										</p>
										<p>
											<strong>Type:</strong> {selectedSeller.businessType}
										</p>
										<p>
											<strong>Tax ID:</strong> {selectedSeller.taxId || "-"}
										</p>
										<p>
											<strong>Owner:</strong> {selectedSeller.ownerName}
										</p>
										<p>
											<strong>Email:</strong> {selectedSeller.email}
										</p>
									</div>
								</div>

								<div>
									<h4 className="font-medium" style={{ color: "var(--accent)" }}>
										Documents
									</h4>
									<div className="mt-2 space-y-1">
										{selectedSeller.verificationDocuments.map((doc, index) => (
											<div key={index} className="flex items-center text-sm">
												<span className="text-gray-600">Doc</span>
												<span
													className="ml-2 cursor-pointer hover:opacity-70 transition-opacity"
													style={{ color: "var(--accent)" }}
												>
													{doc}
												</span>
											</div>
										))}
									</div>
								</div>

								<div>
									<h4 className="font-medium" style={{ color: "var(--accent)" }}>
										Risk Assessment
									</h4>
									<div className="mt-2">
										<span
											className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
												selectedSeller.riskScore === "Low"
													? "bg-green-100 text-green-800"
													: selectedSeller.riskScore === "Medium"
														? "bg-yellow-100 text-yellow-800"
														: "bg-red-100 text-red-800"
											}`}
										>
											{selectedSeller.riskScore} Risk
										</span>
									</div>
								</div>

								{selectedSeller.notes && (
									<div>
										<h4 className="font-medium" style={{ color: "var(--accent)" }}>
											Notes
										</h4>
										<p className="mt-2 text-sm text-gray-600">
											{selectedSeller.notes}
										</p>
									</div>
								)}

								{["pending", "under_review", "info_requested"].includes(
									selectedSeller.status,
								) && (
									<div className="flex space-x-2 pt-4">
										<button
											onClick={() =>
												handleStatusChange(
													selectedSeller.id,
													"approved",
													"Approved - All documents verified",
												)
											}
											className="flex-1 text-white px-4 py-2 rounded-md"
											style={{ backgroundColor: "var(--accent-secondary)" }}
											onMouseEnter={(e) =>
												(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
											}
											onMouseLeave={(e) =>
												(e.target.style.backgroundColor = "var(--accent-secondary)")
											}
										>
											Approve
											</button>
										<button
											onClick={() => {
												const reason = prompt("Request details:");
												if (reason) {
													handleStatusChange(
														selectedSeller.id,
														"info_requested",
														`Info requested: ${reason}`,
													);
												}
											}}
											className="flex-1 border border-blue-600 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50"
										>
											Request Info
										</button>
										<button
											onClick={() => {
												const reason = prompt("Rejection reason:");
												if (reason) {
													handleStatusChange(
														selectedSeller.id,
														"rejected",
														reason,
													);
												}
											}}
											className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
										>
											Reject
										</button>
									</div>
								)}

								{selectedSeller.status === "approved" && (
									<div className="flex space-x-2 pt-4">
										<button
											onClick={() => {
												const reason = prompt("Suspension reason:");
												if (reason) {
													handleStatusChange(
														selectedSeller.id,
														"suspended",
														`Suspended: ${reason}`,
													);
												}
											}}
											className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
										>
											Suspend
										</button>
										<button
											onClick={() => {
												const reason = prompt("Ban reason:");
												if (reason) {
													handleStatusChange(
														selectedSeller.id,
														"banned",
														`Banned: ${reason}`,
													);
												}
											}}
											className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
										>
											Ban
										</button>
									</div>
								)}

								<button
									onClick={() => setSelectedSeller(null)}
									className="w-full text-white px-4 py-2 rounded-md"
									style={{ backgroundColor: "var(--muted)" }}
									onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
									onMouseLeave={(e) => (e.target.style.opacity = "1")}
								>
									Close
								</button>
							</div>
						</div>
					) : (
						<div className="bg-white shadow rounded-lg p-6 text-center">
							<div className="text-4xl mb-4">Seller</div>
							<h3
								className="text-lg font-medium mb-2"
								style={{ color: "var(--accent)" }}
							>
								Select a Seller
							</h3>
							<p className="text-gray-500">
								Choose a seller from the list to review their application
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SellerManagement;
