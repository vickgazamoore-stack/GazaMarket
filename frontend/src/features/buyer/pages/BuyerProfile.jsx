const BuyerProfile = () => {
	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
				<div>
					<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
						Profile Settings
					</h1>
					<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
						Update your personal details and preferences.
					</p>
				</div>

				<div className="border rounded-xl p-6 space-y-4" style={{ borderColor: "var(--border)" }}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
								Full Name
							</label>
							<input
								type="text"
								defaultValue=""
								placeholder="Enter your full name"
								className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
								style={{ borderColor: "var(--border)", color: "var(--text)" }}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
								Email
							</label>
							<input
								type="email"
								defaultValue=""
								placeholder="Enter your email address"
								className="mt-1 w-full px-3 py-2 rounded-lg border focus:outline-none"
								style={{ borderColor: "var(--border)", color: "var(--text)" }}
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
							Shipping Address
						</label>
						<textarea
							rows={3}
							defaultValue=""
							placeholder="Enter your shipping address"
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
							Save Changes
						</button>
					</div>
				</div>

				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
						Preferences
					</h2>
					<div className="mt-4 space-y-3 text-sm" style={{ color: "var(--muted)" }}>
						<label className="flex items-center gap-2">
							<input type="checkbox" defaultChecked />
							<span>Email me order updates</span>
						</label>
						<label className="flex items-center gap-2">
							<input type="checkbox" />
							<span>Receive promotional offers</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BuyerProfile;
