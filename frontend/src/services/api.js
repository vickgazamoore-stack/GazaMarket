const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const TOKEN_KEY = "auth_token";

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const setAuthToken = (token) => {
	if (!token) return;
	localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthToken = () => {
	localStorage.removeItem(TOKEN_KEY);
};

const parseResponse = async (response) => {
	const contentType = response.headers.get("content-type") || "";
	if (contentType.includes("application/json")) {
		return response.json();
	}
	return null;
};

const request = async (path, options = {}) => {
	const token = getAuthToken();
	const headers = {
		"Content-Type": "application/json",
		...(options.headers || {}),
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers,
		credentials: "include",
	});

	const payload = await parseResponse(response);

	if (!response.ok) {
		const message = payload?.message || "Request failed";
		const error = new Error(message);
		error.status = response.status;
		error.payload = payload;
		throw error;
	}

	return payload;
};

export const authApi = {
	register: (data) =>
		request("/auth/register", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	login: (data) =>
		request("/auth/login", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	me: () => request("/auth/me"),
	logout: () =>
		request("/auth/logout", {
			method: "POST",
		}),
	getUsers: () => request("/auth/users"),
	updateUserStatus: (userId, data) =>
		request(`/auth/users/${userId}/status`, {
			method: "PATCH",
			body: JSON.stringify(data),
		}),
};

export const ordersApi = {
	getMyOrders: () => request("/orders/my"),
	getOrderById: (orderId) => request(`/orders/${orderId}`),
	getMySellerOrders: () => request("/orders/seller/my"),
	updateSellerOrderStatus: (orderId, data) =>
		request(`/orders/seller/${orderId}/status`, {
			method: "PATCH",
			body: JSON.stringify(data),
		}),
	createOrder: (data) =>
		request("/orders", {
			method: "POST",
			body: JSON.stringify(data),
		}),
};

export const returnsApi = {
	getMyReturns: () => request("/returns/my"),
	getAllReturns: () => request("/returns/admin/all"),
	createReturn: (data) =>
		request("/returns", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	getMySellerReturns: () => request("/returns/seller/my"),
	updateReturnStatus: (returnId, data) =>
		request(`/returns/${returnId}/status`, {
			method: "PATCH",
			body: JSON.stringify(data),
		}),
};

export const disputesApi = {
	getMyDisputes: () => request("/disputes/my"),
	getMySellerDisputes: () => request("/disputes/seller/my"),
	getAllDisputes: () => request("/disputes/admin/all"),
	createDispute: (data) =>
		request("/disputes", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	submitSellerResponse: (disputeId, data) =>
		request(`/disputes/${disputeId}/seller-response`, {
			method: "PATCH",
			body: JSON.stringify(data),
		}),
	resolveDispute: (disputeId, data) =>
		request(`/disputes/${disputeId}/resolve`, {
			method: "PATCH",
			body: JSON.stringify(data),
		}),
};

export const messagesApi = {
	getMyConversations: () => request("/messages/my"),
	createConversation: (data) =>
		request("/messages", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	sendMessage: (conversationId, text) =>
		request(`/messages/${conversationId}/messages`, {
			method: "POST",
			body: JSON.stringify({ text }),
		}),
};
