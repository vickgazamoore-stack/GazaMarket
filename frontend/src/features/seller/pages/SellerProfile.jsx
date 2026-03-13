const SellerProfile = () => {
	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
				<div>
					<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
						Seller Profile
					</h1>
					<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
						Manage your business information and contact details.
					</p>
				</div>

				<div className="border rounded-xl p-6 space-y-4" style={{ borderColor: "var(--border)" }}>
					<div>
						<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
							Business Name
						</label>
						<input
							type="text"
							defaultValue=""
							placeholder="Enter your business name"
							className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
							style={{ borderColor: "var(--border)", color: "var(--text)" }}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
							Contact Email
						</label>
						<input
							type="email"
							defaultValue=""
							placeholder="Enter your business email"
							className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
							style={{ borderColor: "var(--border)", color: "var(--text)" }}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
							Phone
						</label>
						<input
							type="text"
							defaultValue=""
							placeholder="Enter your phone number"
							className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
							style={{ borderColor: "var(--border)", color: "var(--text)" }}
						/>
					</div>
					<div className="flex justify-end">
						<button
							className="px-6 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Update Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerProfile;
