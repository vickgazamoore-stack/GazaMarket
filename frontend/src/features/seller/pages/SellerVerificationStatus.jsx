import { useRef, useState } from "react";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

const SellerVerificationStatus = () => {
	const [status, setStatus] = useState("pending");
	const rejectionReason = "Missing tax documentation and bank verification.";
	const infoRequest = "Please upload a recent bank statement and a clear tax ID document.";
	const [resubmitted, setResubmitted] = useState(false);
	const [uploadNotice, setUploadNotice] = useState("");
	const fileInputRef = useRef(null);

	const getStatusConfig = () => {
		if (status === "approved") {
			return {
				icon: <CheckCircle className="w-8 h-8 text-green-500" />,
				title: "Approved",
				description: "Your seller account is verified and active.",
			};
		}
		if (status === "rejected") {
			return {
				icon: <XCircle className="w-8 h-8 text-red-500" />,
				title: "Rejected",
				description: "Your application was rejected. Review the reason and resubmit.",
			};
		}
		if (status === "info_requested") {
			return {
				icon: <AlertCircle className="w-8 h-8 text-blue-500" />,
				title: "More Info Requested",
				description: "We need additional documents to complete verification.",
			};
		}
		return {
			icon: <Clock className="w-8 h-8 text-yellow-500" />,
			title: "Pending Review",
			description: "Your application is under review. This usually takes 1-2 days.",
		};
	};

	const config = getStatusConfig();

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
				<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
					Verification Status
				</h1>

				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<div className="flex items-center gap-4">
						{config.icon}
						<div>
							<h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
								{config.title}
							</h2>
							<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
								{config.description}
							</p>
						</div>
					</div>
					{resubmitted && (
						<div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
							Resubmission received. Status updated to pending review.
						</div>
					)}
					{uploadNotice && (
						<div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
							{uploadNotice}
						</div>
					)}
				</div>

				<div className="border rounded-xl p-6 space-y-4" style={{ borderColor: "var(--border)" }}>
					<h3 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
						Submitted Documents
					</h3>
					<ul className="text-sm space-y-2" style={{ color: "var(--muted)" }}>
						<li>- Business registration</li>
						<li>- Tax identification</li>
						<li>- Bank verification</li>
					</ul>
					{status === "info_requested" && (
						<div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
							<strong>Requested:</strong> {infoRequest}
						</div>
					)}
					{status === "rejected" && (
						<div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
							<strong>Reason:</strong> {rejectionReason}
						</div>
					)}
					{status !== "approved" && (
						<div className="flex flex-wrap gap-3">
							<input
								ref={fileInputRef}
								type="file"
								className="hidden"
								multiple
								onChange={(e) => {
									const files = Array.from(e.target.files || []);
									if (files.length === 0) return;
									const names = files.map((file) => file.name).join(", ");
									setUploadNotice(`Uploaded: ${names}`);
									setResubmitted(false);
								}}
							/>
							<button
								className="px-4 py-2 rounded-lg text-white font-semibold"
								style={{ backgroundColor: "var(--accent-secondary)" }}
								onClick={() => fileInputRef.current?.click()}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "var(--accent-secondary)")
								}
							>
								Upload Additional Documents
							</button>
							<button
								className="px-4 py-2 rounded-lg border font-semibold"
								style={{ borderColor: "var(--border)", color: "var(--accent)" }}
								onClick={() => {
									setResubmitted(true);
									setStatus("pending");
								}}
							>
								Resubmit Application
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SellerVerificationStatus;

