import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const SellerOnboarding = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		businessName: "Tech Supplies Co.",
		businessType: "individual",
		taxId: "12-3456789",
		businessAddress: "123 Business St, Gaza City",
		phone: "555-0100",
		website: "www.techsupplies.com",
		bankName: "First National Bank",
		accountNumber: "****5678",
		routingNumber: "021000021",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleNext = () => step < 4 && setStep(step + 1);
	const handlePrev = () => step > 1 && setStep(step - 1);

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<div className="space-y-4">
						<div>
							<label
								className="block text-sm font-medium mb-2"
								style={{ color: "var(--text)" }}
							>
								Business Name
							</label>
							<input
								type="text"
								name="businessName"
								value={formData.businessName}
								onChange={handleChange}
								className="w-full rounded px-3 py-2 border"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderColor: "var(--border)",
									color: "var(--ink)",
								}}
							/>
						</div>
						<div>
							<label
								className="block text-sm font-medium mb-2"
								style={{ color: "var(--text)" }}
							>
								Business Type
							</label>
							<select
								name="businessType"
								value={formData.businessType}
								onChange={handleChange}
								className="w-full rounded px-3 py-2 border"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderColor: "var(--border)",
									color: "var(--ink)",
								}}
							>
								<option value="individual">Individual</option>
								<option value="sole-proprietorship">Sole Proprietorship</option>
								<option value="llc">LLC</option>
							</select>
						</div>
						<div>
							<label
								className="block text-sm font-medium mb-2"
								style={{ color: "var(--text)" }}
							>
								Tax ID
							</label>
							<input
								type="text"
								name="taxId"
								value={formData.taxId}
								onChange={handleChange}
								className="w-full rounded px-3 py-2 border"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderColor: "var(--border)",
									color: "var(--ink)",
								}}
							/>
						</div>
						<div>
							<label
								className="block text-sm font-medium mb-2"
								style={{ color: "var(--text)" }}
							>
								Business Address
							</label>
							<textarea
								name="businessAddress"
								value={formData.businessAddress}
								onChange={handleChange}
								rows="3"
								className="w-full rounded px-3 py-2 border"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderColor: "var(--border)",
									color: "var(--ink)",
								}}
							></textarea>
						</div>
					</div>
				);
			case 2:
				return (
					<div className="space-y-4">
						<div>
							<label
								className="block text-sm font-medium mb-2"
								style={{ color: "var(--text)" }}
							>
								Phone
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="w-full rounded px-3 py-2 border"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderColor: "var(--border)",
									color: "var(--ink)",
								}}
							/>
						</div>
						<div>
							<label
								className="block text-sm font-medium mb-2"
								style={{ color: "var(--text)" }}
							>
								Website
							</label>
							<input
								type="url"
								name="website"
								value={formData.website}
								onChange={handleChange}
								className="w-full rounded px-3 py-2 border"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderColor: "var(--border)",
									color: "var(--ink)",
								}}
							/>
						</div>
						<div
							className="p-4 rounded text-sm"
							style={{
								backgroundColor: "var(--accent-tint)",
								borderColor: "var(--accent)",
								borderWidth: "1px",
								color: "var(--accent)",
							}}
						>
							Secure banking details will be encrypted
						</div>
					</div>
				);
			case 3:
				return (
					<div className="space-y-4">
						<div>
							<label
								className="block text-sm font-medium mb-2"
								style={{ color: "var(--text)" }}
							>
								Bank Name
							</label>
							<input
								type="text"
								name="bankName"
								value={formData.bankName}
								onChange={handleChange}
								className="w-full rounded px-3 py-2 border"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderColor: "var(--border)",
									color: "var(--ink)",
								}}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									className="block text-sm font-medium mb-2"
									style={{ color: "var(--text)" }}
								>
									Account Number
								</label>
								<input
									type="text"
									name="accountNumber"
									value={formData.accountNumber}
									onChange={handleChange}
									className="w-full rounded px-3 py-2 border"
									style={{
										backgroundColor: "var(--surface-strong)",
										borderColor: "var(--border)",
										color: "var(--ink)",
									}}
								/>
							</div>
							<div>
								<label
									className="block text-sm font-medium mb-2"
									style={{ color: "var(--text)" }}
								>
									Routing Number
								</label>
								<input
									type="text"
									name="routingNumber"
									value={formData.routingNumber}
									onChange={handleChange}
									className="w-full rounded px-3 py-2 border"
									style={{
										backgroundColor: "var(--surface-strong)",
										borderColor: "var(--border)",
										color: "var(--ink)",
									}}
								/>
							</div>
						</div>
					</div>
				);
			case 4:
				return (
					<div className="space-y-4">
						<div
							className="p-4 rounded"
							style={{
								backgroundColor: "var(--accent-tint)",
								borderColor: "var(--accent)",
								borderWidth: "1px",
							}}
						>
							<h4 className="font-semibold mb-2" style={{ color: "var(--accent)" }}>
								Review Your Information
							</h4>
							<p className="text-sm" style={{ color: "var(--accent)" }}>
								Business: {formData.businessName}
							</p>
							<p className="text-sm" style={{ color: "var(--accent)" }}>
								Tax ID: {formData.taxId}
							</p>
							<p className="text-sm" style={{ color: "var(--accent)" }}>
								Bank: {formData.bankName}
							</p>
						</div>
						<p className="text-sm" style={{ color: "var(--muted)" }}>
							Click Submit to complete your onboarding
						</p>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ backgroundColor: "var(--surface)" }}
		>
			<main className="flex-1 p-8">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-3xl font-bold mb-2" style={{ color: "var(--accent)" }}>
						Seller Onboarding
					</h1>
					<p className="mb-8" style={{ color: "var(--muted)" }}>
						Complete setup to start selling on Gaza Market
					</p>

					<div
						className="rounded-lg border p-8"
						style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
					>
						<div className="mb-8">
							<div className="flex items-center justify-between mb-4">
								{[1, 2, 3, 4].map((num) => (
									<div key={num} className="flex items-center flex-1">
										<div
											className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
											style={{
												backgroundColor: step >= num ? "var(--accent-secondary)" : "var(--border)",
												color: step >= num ? "var(--surface)" : "var(--muted)",
											}}
										>
											{num}
										</div>
										{num < 4 && (
											<div
												className="flex-1 h-1 mx-2"
												style={{
													backgroundColor: step > num ? "var(--accent-secondary)" : "var(--border)",
												}}
											></div>
										)}
									</div>
								))}
							</div>
							<div
								className="flex justify-between text-xs"
								style={{ color: "var(--muted)" }}
							>
								<span>Business</span>
								<span>Contact</span>
								<span>Banking</span>
								<span>Review</span>
							</div>
						</div>

						<form onSubmit={(e) => e.preventDefault()}>
							{renderStep()}

							<div className="flex justify-between mt-8">
								<button
									type="button"
									onClick={handlePrev}
									disabled={step === 1}
									className="px-6 py-2 rounded-lg font-semibold disabled:opacity-50 border"
									style={{ borderColor: "var(--border)", color: "var(--accent)" }}
									onMouseEnter={(e) =>
										!step === 1 && (e.target.style.backgroundColor = "var(--surface-strong)")
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = "transparent")
									}
								>
									<ArrowLeft className="inline w-4 h-4 mr-2" />
									Previous
								</button>
								<button
									type="button"
									onClick={step === 4 ? () => {} : handleNext}
									className="px-6 py-2 rounded-lg text-white font-semibold"
									style={{ backgroundColor: "var(--accent-secondary)" }}
									onMouseEnter={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary)")
									}
								>
									{step === 4 ? "Submit" : "Next"}
									{step < 4 && <ArrowRight className="inline w-4 h-4 ml-2" />}
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default SellerOnboarding;
