const readStorage = (key, fallback) => {
	if (typeof window === "undefined") {
		return fallback;
	}
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch (_error) {
		return fallback;
	}
};

const writeStorage = (key, value) => {
	if (typeof window === "undefined") {
		return;
	}
	localStorage.setItem(key, JSON.stringify(value));
};

export const getOrders = () => readStorage("orders", []);
export const saveOrders = (orders) => writeStorage("orders", orders);
export const addOrder = (order) => {
	const orders = getOrders();
	const next = [order, ...orders];
	saveOrders(next);
	return next;
};

export const updateOrder = (orderId, updater) => {
	const orders = getOrders();
	const next = orders.map((order) =>
		order.id === orderId ? updater(order) : order
	);
	saveOrders(next);
	return next;
};

export const getDisputes = () => readStorage("disputes", []);
export const saveDisputes = (disputes) => writeStorage("disputes", disputes);
export const addDispute = (dispute) => {
	const disputes = getDisputes();
	const next = [dispute, ...disputes];
	saveDisputes(next);
	return next;
};

export const updateDispute = (disputeId, updater) => {
	const disputes = getDisputes();
	const next = disputes.map((dispute) =>
		dispute.id === disputeId ? updater(dispute) : dispute
	);
	saveDisputes(next);
	return next;
};

const defaultMessages = [
	{
		id: 1,
		orderId: "ORD-1001",
		participantName: "Nnamdi Tech Market",
		buyerName: "Lina M.",
		lastMessage: "Your order has shipped. Tracking: GM-3021.",
		lastMessageTime: "2026-01-22T10:30:00Z",
		messages: [
			{
				id: 1,
				sender: "seller",
				text: "Thanks for your order! We are preparing it now.",
				time: "2026-01-21T09:05:00Z",
			},
			{
				id: 2,
				sender: "buyer",
				text: "Great, when will it ship?",
				time: "2026-01-21T09:22:00Z",
			},
			{
				id: 3,
				sender: "seller",
				text: "It shipped today. Tracking: GM-3021.",
				time: "2026-01-22T10:30:00Z",
			},
		],
	},
	{
		id: 2,
		orderId: "ORD-1002",
		participantName: "Adaeze Electronics",
		buyerName: "Omar H.",
		lastMessage: "We can exchange it for a different color.",
		lastMessageTime: "2026-01-18T15:10:00Z",
		messages: [
			{
				id: 1,
				sender: "buyer",
				text: "Is a blue color available?",
				time: "2026-01-18T14:40:00Z",
			},
			{
				id: 2,
				sender: "seller",
				text: "Yes, we can exchange it for blue.",
				time: "2026-01-18T15:10:00Z",
			},
		],
	},
];

export const getMessages = () => {
	const stored = readStorage("messages", []);
	if (stored.length === 0) {
		writeStorage("messages", defaultMessages);
		return defaultMessages;
	}
	return stored;
};
export const saveMessages = (messages) => writeStorage("messages", messages);

export const getReturns = () => readStorage("returns", []);
export const saveReturns = (returns) => writeStorage("returns", returns);
export const addReturn = (returnRequest) => {
	const returns = getReturns();
	const next = [returnRequest, ...returns];
	saveReturns(next);
	return next;
};

export const updateReturnStatus = (returnId, status) => {
	const returns = getReturns();
	const next = returns.map((entry) =>
		entry.id === returnId ? { ...entry, status } : entry
	);
	saveReturns(next);
	return next;
};
