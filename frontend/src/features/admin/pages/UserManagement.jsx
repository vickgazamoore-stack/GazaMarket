import { useEffect, useMemo, useState } from "react";
import { authApi } from "../../../services/api.js";

const UserManagement = () => {
	const [users, setUsers] = useState([]);
	const [roleFilter, setRoleFilter] = useState("all");
	const [search, setSearch] = useState("");
	const [actionLog, setActionLog] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const loadUsers = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await authApi.getUsers();
			setUsers(response.users || []);
		} catch (loadError) {
			setError(loadError.message || "Failed to load users");
			setUsers([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadUsers();
	}, []);

	const mappedUsers = useMemo(
		() =>
			users.map((user) => ({
				...user,
				status: user.isActive ? "active" : "suspended",
				joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A",
			})),
		[users],
	);

	const filteredUsers = useMemo(() => {
		return mappedUsers.filter((user) => {
			const matchesRole = roleFilter === "all" || user.role === roleFilter;
			const matchesSearch =
				user.name.toLowerCase().includes(search.toLowerCase()) ||
				user.email.toLowerCase().includes(search.toLowerCase());
			return matchesRole && matchesSearch;
		});
	}, [mappedUsers, roleFilter, search]);

	const counts = useMemo(() => {
		return {
			total: mappedUsers.length,
			buyers: mappedUsers.filter((u) => u.role === "buyer").length,
			sellers: mappedUsers.filter((u) => u.role === "seller").length,
			admins: mappedUsers.filter((u) => u.role === "admin").length,
		};
	}, [mappedUsers]);

	const statusStyle = (status) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800";
			case "suspended":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const handleStatusUpdate = async (userId, nextStatus) => {
		const user = mappedUsers.find((entry) => entry.id === userId);
		if (!user) return;
		const isActive = nextStatus === "active";
		const needsConfirm = !isActive;
		if (needsConfirm && !window.confirm("Suspend this user? They will be blocked from login.")) {
			return;
		}

		try {
			setError("");
			await authApi.updateUserStatus(userId, { isActive });
			setUsers((prev) =>
				prev.map((entry) => (entry.id === userId ? { ...entry, isActive } : entry)),
			);
			setActionLog((prev) => [
				{
					id: Date.now(),
					userId,
					name: user.name,
					action: nextStatus,
					time: new Date().toISOString(),
				},
				...prev,
			]);
		} catch (updateError) {
			setError(updateError.message || "Failed to update user status");
		}
	};

	const selectedUser = mappedUsers.find((user) => user.id === selectedUserId);
	const selectedUserLog = actionLog.filter((entry) => entry.userId === selectedUserId);

	const handleExportCsv = () => {
		const rows = [
			["Name", "Email", "Role", "Status", "Joined"],
			...filteredUsers.map((user) => [user.name, user.email, user.role, user.status, user.joined]),
		];
		const csv = rows
			.map((row) =>
				row
					.map((cell) => {
						const value = String(cell ?? "");
						if (value.includes(",") || value.includes('"') || value.includes("\n")) {
							return `"${value.replace(/"/g, '""')}"`;
						}
						return value;
					})
					.join(","),
			)
			.join("\n");

		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "users.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
						User Management
					</h1>
					<p className="text-sm" style={{ color: "var(--muted)" }}>
						View and filter buyers, sellers, and admin accounts.
					</p>
					{error ? (
						<p className="text-sm mt-1" style={{ color: "var(--accent-secondary-strong)" }}>
							{error}
						</p>
					) : null}
				</div>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={loadUsers}
						className="px-4 py-2 rounded-lg text-sm font-semibold border"
						style={{ borderColor: "var(--border)", color: "var(--accent)" }}
					>
						Refresh
					</button>
					<button
						type="button"
						onClick={handleExportCsv}
						className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
						style={{ backgroundColor: "var(--accent-secondary)" }}
					>
						Export CSV
					</button>
				</div>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="bg-white rounded-lg p-4 border" style={{ borderColor: "var(--border)" }}>
					<p className="text-xs text-gray-500">Total Users</p>
					<p className="text-2xl font-bold">{counts.total}</p>
				</div>
				<div className="bg-white rounded-lg p-4 border" style={{ borderColor: "var(--border)" }}>
					<p className="text-xs text-gray-500">Buyers</p>
					<p className="text-2xl font-bold">{counts.buyers}</p>
				</div>
				<div className="bg-white rounded-lg p-4 border" style={{ borderColor: "var(--border)" }}>
					<p className="text-xs text-gray-500">Sellers</p>
					<p className="text-2xl font-bold">{counts.sellers}</p>
				</div>
				<div className="bg-white rounded-lg p-4 border" style={{ borderColor: "var(--border)" }}>
					<p className="text-xs text-gray-500">Admins</p>
					<p className="text-2xl font-bold">{counts.admins}</p>
				</div>
			</div>

			<div
				className="bg-white rounded-lg p-4 border flex flex-col md:flex-row md:items-center gap-3"
				style={{ borderColor: "var(--border)" }}
			>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search by name or email"
					className="w-full md:w-1/2 px-3 py-2 rounded-md border"
					style={{ borderColor: "var(--border)" }}
				/>
				<select
					value={roleFilter}
					onChange={(e) => setRoleFilter(e.target.value)}
					className="w-full md:w-48 px-3 py-2 rounded-md border"
					style={{ borderColor: "var(--border)" }}
				>
					<option value="all">All roles</option>
					<option value="buyer">Buyers</option>
					<option value="seller">Sellers</option>
					<option value="admin">Admins</option>
				</select>
			</div>

			<div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
				<table className="w-full text-sm">
					<thead style={{ backgroundColor: "var(--surface-strong)" }}>
						<tr>
							<th className="text-left px-4 py-3">Name</th>
							<th className="text-left px-4 py-3">Email</th>
							<th className="text-left px-4 py-3">Role</th>
							<th className="text-left px-4 py-3">Status</th>
							<th className="text-left px-4 py-3">Actions</th>
							<th className="text-left px-4 py-3">Joined</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td className="px-4 py-6 text-center text-sm" colSpan={6}>
									Loading users...
								</td>
							</tr>
						) : filteredUsers.length > 0 ? (
							filteredUsers.map((user) => (
								<tr key={user.id} style={{ borderTop: "1px solid var(--border)" }}>
									<td className="px-4 py-3 font-medium">
										<button
											type="button"
											className="text-left hover:underline"
											style={{ color: "var(--accent)" }}
											onClick={() => setSelectedUserId(user.id)}
										>
											{user.name}
										</button>
									</td>
									<td className="px-4 py-3">{user.email}</td>
									<td className="px-4 py-3 capitalize">{user.role}</td>
									<td className="px-4 py-3">
										<span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle(user.status)}`}>
											{user.status}
										</span>
									</td>
									<td className="px-4 py-3">
										<div className="flex flex-wrap gap-2">
											<button
												type="button"
												className="text-xs font-semibold px-2 py-1 rounded-full border"
												style={{ borderColor: "var(--border)", color: "var(--accent)" }}
												onClick={() => handleStatusUpdate(user.id, "active")}
											>
												Activate
											</button>
											<button
												type="button"
												className="text-xs font-semibold px-2 py-1 rounded-full border"
												style={{ borderColor: "var(--border)", color: "var(--accent-secondary)" }}
												onClick={() => handleStatusUpdate(user.id, "suspended")}
											>
												Suspend
											</button>
										</div>
									</td>
									<td className="px-4 py-3">{user.joined}</td>
								</tr>
							))
						) : (
							<tr>
								<td className="px-4 py-6 text-center text-sm" colSpan={6}>
									No users match this filter.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="bg-white rounded-lg border p-5" style={{ borderColor: "var(--border)" }}>
				<div className="flex items-center justify-between gap-3">
					<div>
						<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
							User History
						</h2>
						<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
							Status changes for a selected user.
						</p>
					</div>
					{selectedUser ? (
						<button
							type="button"
							className="text-xs font-semibold px-3 py-1 rounded-full border"
							style={{ borderColor: "var(--border)", color: "var(--accent-secondary)" }}
							onClick={() => setSelectedUserId(null)}
						>
							Clear
						</button>
					) : null}
				</div>

				{!selectedUser ? (
					<p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
						Select a user name from the table to view their history.
					</p>
				) : (
					<div className="mt-4 space-y-3">
						<div className="flex items-center justify-between rounded-lg border px-4 py-3" style={{ borderColor: "var(--border)" }}>
							<div>
								<p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
									{selectedUser.name}
								</p>
								<p className="text-xs" style={{ color: "var(--muted)" }}>
									{selectedUser.email} - {selectedUser.role}
								</p>
							</div>
							<span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle(selectedUser.status)}`}>
								{selectedUser.status}
							</span>
						</div>

						{selectedUserLog.length === 0 ? (
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								No actions recorded for this user yet.
							</p>
						) : (
							selectedUserLog.map((entry) => (
								<div
									key={entry.id}
									className="flex items-center justify-between rounded-lg border px-4 py-3"
									style={{ borderColor: "var(--border)" }}
								>
									<div>
										<p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
											Status set to {entry.action}
										</p>
										<p className="text-xs" style={{ color: "var(--muted)" }}>
											Updated by admin
										</p>
									</div>
									<span className="text-xs" style={{ color: "var(--muted)" }}>
										{new Date(entry.time).toLocaleString()}
									</span>
								</div>
							))
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserManagement;
