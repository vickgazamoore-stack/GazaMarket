import { useEffect, useRef, useState } from "react";
import { Send, Search, Phone, Info } from "lucide-react";
import { messagesApi } from "../../../services/api.js";
import { useAuth } from "../../../app/providers.jsx";

const SellerMessages = () => {
	const [conversations, setConversations] = useState([]);
	const [selectedConvId, setSelectedConvId] = useState(null);
	const [messageText, setMessageText] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const messagesEndRef = useRef(null);
	const { user } = useAuth();

	useEffect(() => {
		const loadConversations = async () => {
			setLoading(true);
			setError("");
			try {
				const response = await messagesApi.getMyConversations();
				const list = response.conversations || [];
				setConversations(list);
				setSelectedConvId(list[0]?.id ?? null);
			} catch (err) {
				setError(err.message || "Failed to load messages");
				setConversations([]);
			} finally {
				setLoading(false);
			}
		};

		loadConversations();
	}, []);

	const selectedConv = conversations.find((c) => c.id === selectedConvId);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [selectedConvId, conversations]);

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!messageText.trim() || !selectedConv) {
			return;
		}

		try {
			setError("");
			const response = await messagesApi.sendMessage(selectedConvId, messageText.trim());
			const updatedConversation = response.conversation;
			setConversations((prev) =>
				prev.map((conv) => (conv.id === selectedConvId ? updatedConversation : conv)),
			);
			setMessageText("");
		} catch (err) {
			setError(err.message || "Failed to send message");
		}
	};

	const handleStartConversation = async () => {
		if (!user?.id) {
			setError("You must be logged in to start a conversation");
			return;
		}

		const buyerId = window.prompt("Buyer ID?");
		if (!buyerId) return;
		const buyerName = window.prompt("Buyer name?");
		if (!buyerName) return;
		const orderId = window.prompt("Order ID (optional)") || "ORD-NEW";

		try {
			setError("");
			const response = await messagesApi.createConversation({
				orderId,
				buyerId,
				buyerName,
				sellerId: user.id,
				sellerName: user.name || "Seller",
				initialMessage: "Hi! How can I help?",
			});
			const newConversation = response.conversation;
			setConversations((prev) => [newConversation, ...prev]);
			setSelectedConvId(newConversation.id);
		} catch (err) {
			setError(err.message || "Failed to start conversation");
		}
	};

	const filteredConversations = conversations.filter((conv) =>
		(conv.buyerName || "buyer")
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<main className="max-w-7xl mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8" style={{ color: "var(--accent)" }}>
					<div className="flex items-center justify-between gap-4">
						<span>Messages</span>
						<button
							type="button"
							className="text-xs font-semibold px-3 py-1 rounded-full"
							style={{ color: "var(--accent-secondary)", border: "1px solid var(--border)" }}
							onClick={handleStartConversation}
						>
							New chat
						</button>
					</div>
				</h1>

				<div
					className="h-[600px] flex gap-6 rounded-lg overflow-hidden border"
					style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
				>
					{/* Conversations Sidebar */}
					<div
						className="w-80 flex flex-col"
						style={{ borderRightColor: "var(--border)", borderRightWidth: "1px" }}
					>
						<div
							className="p-4"
							style={{ borderBottomColor: "var(--border)", borderBottomWidth: "1px" }}
						>
							<div className="relative">
								<Search className="absolute left-3 top-3 w-5 h-5" style={{ color: "var(--muted)" }} />
								<input
									type="text"
									placeholder="Search conversations..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none"
									style={{
										backgroundColor: "var(--surface-strong)",
										borderColor: "var(--border)",
										color: "var(--ink)",
									}}
								/>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto">
							{loading ? (
								<div className="p-6 text-center text-sm" style={{ color: "var(--muted)" }}>
									Loading conversations...
								</div>
							) : null}
							{error ? (
								<div className="p-4 text-sm" style={{ color: "var(--accent-secondary-strong)" }}>
									{error}
								</div>
							) : null}
							{filteredConversations.map((conv) => (
								<button
									key={conv.id}
									onClick={() => setSelectedConvId(conv.id)}
									className="w-full p-4 text-left transition"
									style={{
										backgroundColor: selectedConvId === conv.id ? "var(--accent-secondary)" : "var(--surface)",
										borderBottomColor: "var(--border)",
										borderBottomWidth: "1px",
										color: selectedConvId === conv.id ? "var(--surface)" : "var(--ink)",
									}}
									onMouseEnter={(e) =>
										selectedConvId !== conv.id &&
										(e.target.style.backgroundColor = "var(--surface-strong)")
									}
									onMouseLeave={(e) =>
										selectedConvId !== conv.id &&
										(e.target.style.backgroundColor = "var(--surface)")
									}
								>
									<div className="flex items-start gap-3">
										<div
											className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold"
											style={{
												backgroundColor: selectedConvId === conv.id ? "var(--accent-secondary-strong)" : "var(--accent)",
												color: "var(--surface)",
											}}
										>
											{(conv.buyerName || "B").slice(0, 2).toUpperCase()}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex justify-between items-start gap-2">
												<h3
													className="font-semibold truncate"
													style={{
														color: selectedConvId === conv.id ? "var(--surface)" : "var(--ink)",
													}}
												>
													{conv.buyerName || "Buyer"}
												</h3>
											</div>
											<p
												className="text-xs mt-1"
												style={{
													color: selectedConvId === conv.id ? "rgba(255, 255, 255, 0.7)" : "var(--muted)",
												}}
											>
												{new Date(conv.lastMessageTime).toLocaleString()}
											</p>
											<p
												className="text-sm truncate mt-1"
												style={{
													color: selectedConvId === conv.id ? "rgba(255, 255, 255, 0.9)" : "var(--text)",
												}}
											>
												{conv.lastMessage}
											</p>
										</div>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Messages Panel */}
					{selectedConv && (
						<div className="flex-1 flex flex-col">
							{/* Header */}
							<div
								className="p-4 flex justify-between items-center"
								style={{
									backgroundColor: "var(--surface-strong)",
									borderBottomColor: "var(--border)",
									borderBottomWidth: "1px",
								}}
							>
								<div className="flex items-center gap-3">
									<div
										className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
										style={{ backgroundColor: "var(--accent)", color: "var(--surface)" }}
									>
										{(selectedConv.buyerName || "B").slice(0, 2).toUpperCase()}
									</div>
									<div>
										<h2 className="font-semibold" style={{ color: "var(--accent)" }}>
											{selectedConv.buyerName || "Buyer"}
										</h2>
										<p className="text-xs" style={{ color: "var(--muted)" }}>
											Order {selectedConv.orderId}
										</p>
									</div>
								</div>
								<div className="flex gap-2">
									<button
										className="p-2 rounded-lg transition"
										style={{ color: "var(--accent)" }}
										onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--border)")}
										onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
									>
										<Phone className="w-5 h-5" />
									</button>
									<button
										className="p-2 rounded-lg transition"
										style={{ color: "var(--accent)" }}
										onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--border)")}
										onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
									>
										<Info className="w-5 h-5" />
									</button>
								</div>
							</div>

							{/* Messages */}
							<div className="flex-1 overflow-y-auto p-4 space-y-4">
								{selectedConv.messages.map((msg) => (
									<div
										key={msg.id}
										className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}
									>
										<div
											className="max-w-xs px-4 py-2 rounded-lg"
											style={{
												backgroundColor: msg.sender === "seller" ? "var(--accent-secondary)" : "var(--surface-strong)",
												color: msg.sender === "seller" ? "var(--surface)" : "var(--ink)",
											}}
										>
											<p>{msg.text}</p>
											<p className="text-xs mt-1" style={{ opacity: 0.7 }}>
												{new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
											</p>
										</div>
									</div>
								))}
								<div ref={messagesEndRef} />
							</div>

							{/* Message Input */}
							<form
								onSubmit={handleSendMessage}
								className="p-4"
								style={{ borderTopColor: "var(--border)", borderTopWidth: "1px" }}
							>
								<div className="flex gap-2">
									<input
										type="text"
										value={messageText}
										onChange={(e) => setMessageText(e.target.value)}
										placeholder="Type your message..."
										className="flex-1 px-4 py-2 rounded-lg border focus:outline-none"
										style={{
											backgroundColor: "var(--surface-strong)",
											borderColor: "var(--border)",
											color: "var(--ink)",
										}}
									/>
									<button
										type="submit"
										className="px-4 py-2 rounded-lg transition flex items-center gap-2 text-white"
										style={{ backgroundColor: "var(--accent-secondary)" }}
										onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
										onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
									>
										<Send className="w-5 h-5" />
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</main>
	</div>
	);
};

export default SellerMessages;
