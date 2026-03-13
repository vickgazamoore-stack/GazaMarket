const AdminProfile = () => {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
					Admin Profile
				</h1>
				<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
					Manage account details and security preferences.
				</p>
			</div>

			<div className="bg-white shadow rounded-lg p-6 space-y-4">
				<div>
					<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
						Full Name
					</label>
					<input
						type="text"
						defaultValue=""
						placeholder="Enter admin full name"
						className="mt-1 w-full px-3 py-2 border rounded-md"
						style={{ borderColor: "var(--border)" }}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium" style={{ color: "var(--accent)" }}>
						Email
					</label>
					<input
						type="email"
						defaultValue=""
						placeholder="Enter admin email"
						className="mt-1 w-full px-3 py-2 border rounded-md"
						style={{ borderColor: "var(--border)" }}
					/>
				</div>
				<div className="flex justify-end">
					<button
						className="text-white px-4 py-2 rounded-md"
						style={{ backgroundColor: "var(--accent-secondary)" }}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
					>
						Save Profile
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdminProfile;
