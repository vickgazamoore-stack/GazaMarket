import { useState } from "react";
import {
	CheckCircle,
	Building2,
	DollarSign,
	FileText,
	ArrowRight,
	ArrowLeft,
} from "lucide-react";
import Footer from "../../../components/layout/Footer";

const SellerOnboarding = () => {
	const [step, setStep] = useState(1);
	const [submissionStatus, setSubmissionStatus] = useState("draft");
	const [formData, setFormData] = useState({
		businessName: "",
		businessType: "",
		businessAddress: "",
		phone: "",
		taxId: "",
		bankName: "",
		accountNumber: "",
		routingNumber: "",
		businessLicense: null,
		taxDocument: null,
		idDocument: null,
	});

	const steps = [
		{ id: 1, title: "Business", icon: Building2 },
		{ id: 2, title: "Banking", icon: DollarSign },
		{ id: 3, title: "Documents", icon: FileText },
		{ id: 4, title: "Review", icon: CheckCircle },
	];

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (step < 4) {
			setStep(step + 1);
		} else {
			setSubmissionStatus("pending");
			console.log("Application submitted:", formData);
		}
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Business Name *
							</label>
							<input
								type="text"
								name="businessName"
								value={formData.businessName}
								onChange={handleChange}
								placeholder="Your Business Name"
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Business Type *
							</label>
							<select
								name="businessType"
								value={formData.businessType}
								onChange={handleChange}
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="">Select Type</option>
								<option value="sole">Sole Proprietorship</option>
								<option value="partnership">Partnership</option>
								<option value="corporation">Corporation</option>
								<option value="llc">LLC</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Business Address *
							</label>
							<input
								type="text"
								name="businessAddress"
								value={formData.businessAddress}
								onChange={handleChange}
								placeholder="123 Main Street"
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Phone Number *
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="+1 (555) 123-4567"
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
				);
			case 2:
				return (
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Tax ID *
							</label>
							<input
								type="text"
								name="taxId"
								value={formData.taxId}
								onChange={handleChange}
								placeholder="12-3456789"
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Bank Name *
							</label>
							<input
								type="text"
								name="bankName"
								value={formData.bankName}
								onChange={handleChange}
								placeholder="Your Bank"
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Account Number *
							</label>
							<input
								type="text"
								name="accountNumber"
								value={formData.accountNumber}
								onChange={handleChange}
								placeholder="------------"
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Routing Number *
							</label>
							<input
								type="text"
								name="routingNumber"
								value={formData.routingNumber}
								onChange={handleChange}
								placeholder="000000000"
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
				);
			case 3:
				return (
					<div className="space-y-4">
						<p className="text-gray-400 text-sm">
							Upload required documents for verification
						</p>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Business License *
							</label>
							<input
								type="file"
								name="businessLicense"
								onChange={handleChange}
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<p className="text-xs text-gray-500 mt-1">
								PDF, JPG, or PNG up to 10MB
							</p>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Tax Document *
							</label>
							<input
								type="file"
								name="taxDocument"
								onChange={handleChange}
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<p className="text-xs text-gray-500 mt-1">
								PDF, JPG, or PNG up to 10MB
							</p>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Government ID *
							</label>
							<input
								type="file"
								name="idDocument"
								onChange={handleChange}
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<p className="text-xs text-gray-500 mt-1">
								PDF, JPG, or PNG up to 10MB
							</p>
						</div>
					</div>
				);
			case 4:
				return (
					<div className="space-y-4">
						<div className="bg-gray-800 rounded-lg p-4 space-y-3 text-sm">
							<div className="flex justify-between border-b border-gray-700 pb-2">
								<span className="text-gray-400">Business:</span>
								<span className="text-white font-medium">
									{formData.businessName}
								</span>
							</div>
							<div className="flex justify-between border-b border-gray-700 pb-2">
								<span className="text-gray-400">Type:</span>
								<span className="text-white font-medium">
									{formData.businessType}
								</span>
							</div>
							<div className="flex justify-between border-b border-gray-700 pb-2">
								<span className="text-gray-400">Phone:</span>
								<span className="text-white font-medium">{formData.phone}</span>
							</div>
							<div className="flex justify-between border-b border-gray-700 pb-2">
								<span className="text-gray-400">Bank:</span>
								<span className="text-white font-medium">
									{formData.bankName}
								</span>
							</div>
							<div className="flex justify-between border-b border-gray-700 pb-2">
								<span className="text-gray-400">Tax ID:</span>
								<span className="text-white font-medium">
									{formData.taxId ? `${formData.taxId.slice(0, 2)}******` : "-"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-400">Documents:</span>
								<span className="text-white font-medium">
									{formData.businessLicense &&
									formData.taxDocument &&
									formData.idDocument
										? "All uploaded"
										: "Missing"}
								</span>
							</div>
						</div>
						<p className="text-gray-400 text-sm">
							Please review your information. Click Complete to submit your
							application.
						</p>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="bg-gray-900 min-h-screen text-white flex flex-col">
			<div className="flex-1 p-8">
				<div className="max-w-3xl mx-auto">
					{submissionStatus === "pending" && (
						<div className="mb-6 border border-blue-700 bg-blue-900/20 rounded-lg p-4 text-sm">
							<p className="text-blue-200 font-semibold">Application submitted</p>
							<p className="text-blue-200/80 mt-1">
								Status: Pending review. You will be notified if more information is needed.
							</p>
						</div>
					)}
					<div className="bg-zinc-900 border border-zinc-800 rounded-lg">
						<div className="px-6 py-4 border-b border-zinc-800">
							<h2 className="text-2xl font-bold">Seller Onboarding</h2>
							<p className="text-gray-400 text-sm mt-1">
								Complete your setup to start selling
							</p>
						</div>

						<div className="px-6 py-6">
							<div className="flex items-center justify-between mb-8">
								{steps.map((s, idx) => (
									<div key={s.id} className="flex items-center">
										<div
											className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= s.id ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"}`}
										>
											{step > s.id ? "Done" : s.id}
										</div>
										{idx < steps.length - 1 && (
											<div
												className={`w-12 h-1 mx-2 ${step > s.id ? "bg-blue-600" : "bg-gray-700"}`}
											/>
										)}
									</div>
								))}
							</div>
							<div className="flex justify-between text-xs text-gray-400 mb-8">
								{steps.map((s) => (
									<span key={s.id}>{s.title}</span>
								))}
							</div>

							<h3 className="text-lg font-bold mb-6">
								{steps[step - 1].title} Information
							</h3>

							<form onSubmit={handleSubmit}>
								{renderStep()}

								<div className="flex justify-between mt-8">
									<button
										type="button"
										onClick={() => step > 1 && setStep(step - 1)}
										disabled={step === 1}
										className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
									>
										<ArrowLeft className="w-4 h-4" /> Previous
									</button>
									<button
										type="submit"
										className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
									>
										{step === 4 ? "Complete" : "Next"}{" "}
										<ArrowRight className="w-4 h-4" />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SellerOnboarding;

