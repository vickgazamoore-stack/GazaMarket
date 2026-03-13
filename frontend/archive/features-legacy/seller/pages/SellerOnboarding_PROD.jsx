import { useState } from "react";
import { ChevronRight, Building2, Bank, FileText, Upload } from "lucide-react";
import Footer from "../../../components/layout/Footer";

export default function SellerOnboarding() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		businessName: "",
		businessType: "",
		taxId: "",
		businessAddress: "",
		phone: "",
		website: "",
		bankName: "",
		accountNumber: "",
		routingNumber: "",
		businessLicense: null,
		taxDocument: null,
		idDocument: null,
	});

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	const handleNext = () => {
		if (step < 4) {
			setStep(step + 1);
		}
	};

	const handleBack = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};

	const handleSubmit = () => {
		console.log("Onboarding submitted:", formData);
		alert("Application submitted successfully!");
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<div className="space-y-6">
						<div className="flex items-center gap-3 mb-6">
							<Building2 className="w-6 h-6 text-blue-600" />
							<h2 className="text-2xl font-semibold">Business Information</h2>
						</div>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Business Name
							</label>
							<input
								type="text"
								name="businessName"
								value={formData.businessName}
								onChange={handleChange}
								placeholder="Enter your business name"
								className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none"
							/>
						</div>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Business Type
							</label>
							<select
								name="businessType"
								value={formData.businessType}
								onChange={handleChange}
								className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white focus:border-blue-600 focus:outline-none"
							>
								<option value="">Select business type</option>
								<option value="sole">Sole Proprietorship</option>
								<option value="partnership">Partnership</option>
								<option value="llc">LLC</option>
								<option value="corp">Corporation</option>
							</select>
						</div>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Tax ID / EIN
							</label>
							<input
								type="text"
								name="taxId"
								value={formData.taxId}
								onChange={handleChange}
								placeholder="XX-XXXXXXX"
								className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none"
							/>
						</div>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Business Address
							</label>
							<textarea
								name="businessAddress"
								value={formData.businessAddress}
								onChange={handleChange}
								placeholder="Full business address"
								rows="3"
								className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm text-gray-400 mb-2">
									Phone
								</label>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder="+1 (555) 000-0000"
									className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none"
								/>
							</div>
							<div>
								<label className="block text-sm text-gray-400 mb-2">
									Website (Optional)
								</label>
								<input
									type="url"
									name="website"
									value={formData.website}
									onChange={handleChange}
									placeholder="https://example.com"
									className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none"
								/>
							</div>
						</div>
					</div>
				);

			case 2:
				return (
					<div className="space-y-6">
						<div className="flex items-center gap-3 mb-6">
							<Bank className="w-6 h-6 text-blue-600" />
							<h2 className="text-2xl font-semibold">Banking Details</h2>
						</div>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Bank Name
							</label>
							<input
								type="text"
								name="bankName"
								value={formData.bankName}
								onChange={handleChange}
								placeholder="Name of your bank"
								className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none"
							/>
						</div>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Account Number
							</label>
							<input
								type="text"
								name="accountNumber"
								value={formData.accountNumber}
								onChange={handleChange}
								placeholder="Your account number"
								className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none"
							/>
						</div>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Routing Number
							</label>
							<input
								type="text"
								name="routingNumber"
								value={formData.routingNumber}
								onChange={handleChange}
								placeholder="Your routing number"
								className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none"
							/>
						</div>
						<div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
							<p className="text-blue-200 text-sm">
								Your banking information is encrypted and secure. We never share
								this data with third parties.
							</p>
						</div>
					</div>
				);

			case 3:
				return (
					<div className="space-y-6">
						<div className="flex items-center gap-3 mb-6">
							<Upload className="w-6 h-6 text-blue-600" />
							<h2 className="text-2xl font-semibold">Document Verification</h2>
						</div>
						<p className="text-gray-400">
							Upload documents to verify your business identity
						</p>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Business License
							</label>
							<div className="relative">
								<input
									type="file"
									name="businessLicense"
									onChange={handleChange}
									accept=".pdf,.jpg,.jpeg,.png"
									className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white"
								/>
							</div>
							<p className="text-xs text-gray-500 mt-1">
								PDF, JPG, PNG up to 10MB
							</p>
						</div>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Tax Document (1040, 1099, etc.)
							</label>
							<input
								type="file"
								name="taxDocument"
								onChange={handleChange}
								accept=".pdf,.jpg,.jpeg,.png"
								className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white"
							/>
							<p className="text-xs text-gray-500 mt-1">
								PDF, JPG, PNG up to 10MB
							</p>
						</div>
						<div>
							<label className="block text-sm text-gray-400 mb-2">
								Government ID
							</label>
							<input
								type="file"
								name="idDocument"
								onChange={handleChange}
								accept=".pdf,.jpg,.jpeg,.png"
								className="w-full bg-gray-800 border border-zinc-700 rounded px-4 py-2 text-white"
							/>
							<p className="text-xs text-gray-500 mt-1">
								PDF, JPG, PNG up to 10MB
							</p>
						</div>
					</div>
				);

			case 4:
				return (
					<div className="space-y-6">
						<div className="flex items-center gap-3 mb-6">
							<FileText className="w-6 h-6 text-blue-600" />
							<h2 className="text-2xl font-semibold">
								Review Your Information
							</h2>
						</div>
						<div className="space-y-4">
							<div className="bg-gray-800 rounded-lg p-4">
								<p className="text-gray-400 text-sm">Business Name</p>
								<p className="text-white font-semibold">
									{formData.businessName || "Not provided"}
								</p>
							</div>
							<div className="bg-gray-800 rounded-lg p-4">
								<p className="text-gray-400 text-sm">Business Type</p>
								<p className="text-white font-semibold">
									{formData.businessType || "Not provided"}
								</p>
							</div>
							<div className="bg-gray-800 rounded-lg p-4">
								<p className="text-gray-400 text-sm">Bank</p>
								<p className="text-white font-semibold">
									{formData.bankName || "Not provided"}
								</p>
							</div>
							<div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4 mt-6">
								<p className="text-yellow-200 text-sm">
									By submitting this application, you agree to our Terms of
									Service and confirm that all information provided is accurate.
								</p>
							</div>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col">
			<div className="flex-grow p-6">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-4xl font-bold mb-2">Seller Onboarding</h1>
					<p className="text-gray-400 mb-8">
						Complete your seller account setup to start selling
					</p>

					{/* Progress Bar */}
					<div className="mb-8 bg-zinc-900 rounded-lg p-6 border border-zinc-800">
						<div className="flex items-center justify-between mb-4">
							{[1, 2, 3, 4].map((num) => (
								<div key={num} className="flex items-center flex-1">
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
											num <= step
												? "bg-blue-600 text-white"
												: "bg-zinc-700 text-gray-400"
										}`}
									>
										{num}
									</div>
									{num < 4 && (
										<div
											className={`flex-1 h-1 mx-2 ${
												num < step ? "bg-blue-600" : "bg-zinc-700"
											}`}
										></div>
									)}
								</div>
							))}
						</div>
						<div className="flex justify-between text-xs text-gray-400">
							<span>Business</span>
							<span>Banking</span>
							<span>Documents</span>
							<span>Review</span>
						</div>
					</div>

					{/* Form Content */}
					<div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800 mb-6">
						{renderStep()}
					</div>

					{/* Navigation Buttons */}
					<div className="flex justify-between gap-4">
						<button
							onClick={handleBack}
							disabled={step === 1}
							className="px-6 py-3 border border-zinc-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition"
						>
							Back
						</button>
						{step < 4 ? (
							<button
								onClick={handleNext}
								className="ml-auto px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
							>
								Next
								<ChevronRight className="w-4 h-4" />
							</button>
						) : (
							<button
								onClick={handleSubmit}
								className="ml-auto px-8 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition font-semibold"
							>
								Submit Application
							</button>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
