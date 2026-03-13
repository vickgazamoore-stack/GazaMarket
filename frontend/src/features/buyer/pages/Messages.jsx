import { useEffect, useRef, useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { messagesApi } from "../../../services/api.js";
import { useAuth } from "../../../app/providers.jsx";

const Messages = () => {
	const [conversations, setConversations] = useState([]);
	const [activeConversationId, setActiveConversationId] = useState(null);
	const [newMessage, setNewMessage] = useState("");
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
				setActiveConversationId(list[0]?.id ?? null);
			} catch (err) {
				setError(err.message || "Failed to load messages");
				setConversations([]);
			} finally {
				setLoading(false);
			}
		};

		loadConversations();
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [activeConversationId, conversations]);

	const activeConv = conversations.find(
		(conversation) => conversation.id === activeConversationId
	);

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!newMessage.trim() || !activeConv) {
			return;
		}

		try {
			setError("");
			const response = await messagesApi.sendMessage(activeConversationId, newMessage.trim());
			const updatedConversation = response.conversation;
			setConversations((prev) =>
				prev.map((conversation) =>
					conversation.id === activeConversationId ? updatedConversation : conversation,
				),
			);
			setNewMessage("");
		} catch (err) {
			setError(err.message || "Failed to send message");
		}
	};

	const handleStartConversation = async () => {
		if (!user?.id) {
			setError("You must be logged in to start a conversation");
			return;
		}

		const sellerId = window.prompt("Seller ID?");
		if (!sellerId) return;
		const sellerName = window.prompt("Seller name?");
		if (!sellerName) return;
		const orderId = window.prompt("Order ID (optional)") || "ORD-NEW";

		try {
			setError("");
			const response = await messagesApi.createConversation({
				orderId,
				buyerId: user.id,
				buyerName: user.name || "Buyer",
				sellerId,
				sellerName,
				initialMessage: "Hi! I have a question.",
			});
			const newConversation = response.conversation;
			setConversations((prev) => [newConversation, ...prev]);
			setActiveConversationId(newConversation.id);
		} catch (err) {
			setError(err.message || "Failed to start conversation");
		}
	};

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ backgroundColor: "var(--surface)" }}
		>
			<div className="flex-1 flex">
				{/* Conversations List */}
				<div
					className="w-full md:w-1/3 flex flex-col"
					style={{
						backgroundColor: "var(--surface-strong)",
						borderRight: "1px solid var(--border)",
					}}
				>
					<div
						className="p-4 border-b sticky top-0"
						style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
					>
						<div className="flex items-center justify-between gap-3">
							<h3
								className="text-lg font-bold flex items-center gap-2"
								style={{ color: "var(--accent)" }}
							>
								<MessageCircle className="w-5 h-5" style={{ color: "var(--accent-secondary)" }} />
								Messages
							</h3>
							<button
								type="button"
								className="text-xs font-semibold px-3 py-1 rounded-full"
								style={{ color: "var(--accent-secondary)", border: "1px solid var(--border)" }}
								onClick={handleStartConversation}
							>
								New chat
							</button>
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
						{conversations.length > 0 ? (
							conversations.map((conversation) => (
								<button
									key={conversation.id}
									onClick={() => setActiveConversationId(conversation.id)}
									className="w-full p-4 border-b text-left transition"
									style={{
										backgroundColor:
											activeConversationId === conversation.id
												? "var(--surface-strong)"
												: "transparent",
										borderColor:
											activeConversationId === conversation.id
												? "var(--accent)"
												: "var(--border)",
										borderLeft:
											activeConversationId === conversation.id
												? "3px solid var(--accent)"
												: "none",
									}}
									onMouseEnter={(e) =>
										activeConversationId !== conversation.id &&
										(e.currentTarget.style.backgroundColor = "var(--surface-strong)")
									}
									onMouseLeave={(e) =>
										activeConversationId !== conversation.id &&
										(e.currentTarget.style.backgroundColor = "transparent")
									}
								>
									<div className="flex justify-between items-start mb-1">
										<h4
											className="font-medium text-sm"
											style={{ color: "var(--accent)" }}
										>
											{conversation.participantName}
										</h4>
										<span className="text-xs" style={{ color: "var(--muted)" }}>
											{new Date(conversation.lastMessageTime).toLocaleDateString()}
										</span>
									</div>
									<p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
										Order {conversation.orderId}
									</p>
									<p className="text-sm truncate" style={{ color: "var(--text)" }}>
										{conversation.lastMessage}
									</p>
								</button>
							))
						) : (
							<div className="p-8 text-center" style={{ color: "var(--muted)" }}>
								<div className="text-4xl mb-4">No chats</div>
								<p>No conversations yet</p>
							</div>
						)}
					</div>
				</div>

				{/* Message Thread */}
				<div
					className="hidden md:flex flex-1 flex-col"
					style={{ backgroundColor: "var(--surface)" }}
				>
					{activeConv ? (
						<>
							{/* Header */}
							<div
								className="p-4 border-b sticky top-0"
								style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
							>
								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-bold" style={{ color: "var(--accent)" }}>
											{activeConv.participantName}
										</h4>
										<p className="text-sm" style={{ color: "var(--muted)" }}>
											Order {activeConv.orderId}
										</p>
									</div>
								</div>
							</div>

							{/* Messages */}
							<div className="flex-1 overflow-y-auto p-4 space-y-4">
								{activeConv.messages.map((message) => (
									<div
										key={message.id}
										className={`flex ${message.sender === "buyer" ? "justify-end" : "justify-start"}`}
									>
										<div
											className="max-w-xs px-4 py-2 rounded-lg"
											style={{
												backgroundColor:
													message.sender === "buyer" ? "var(--accent-secondary)" : "var(--surface-strong)",
												color:
													message.sender === "buyer" ? "var(--surface)" : "var(--text)",
												border:
													message.sender === "buyer" ? "none" : "1px solid var(--border)",
											}}
										>
											<p className="text-sm">{message.text}</p>
											<p
												className="text-xs mt-1"
												style={{
													color:
														message.sender === "buyer"
															? "rgba(255, 255, 255, 0.8)"
															: "var(--muted)",
												}}
											>
												{new Date(message.time).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</p>
										</div>
									</div>
								))}
								<div ref={messagesEndRef} />
							</div>

							{/* Input */}
							<div
								className="p-4 border-t"
								style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
							>
								<form onSubmit={handleSendMessage} className="flex gap-2">
									<input
										type="text"
										value={newMessage}
										onChange={(e) => setNewMessage(e.target.value)}
										placeholder="Type your message..."
										className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2"
										style={{
											backgroundColor: "var(--surface)",
											borderColor: "var(--border)",
											color: "var(--text)",
											border: "1px solid var(--border)",
											focusRingColor: "var(--accent)",
										}}
									/>
									<button
										type="submit"
										disabled={!newMessage.trim()}
										className="px-4 py-2 text-white rounded-lg transition disabled:opacity-50"
										style={{ backgroundColor: "var(--accent-secondary)" }}
										onMouseEnter={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary-strong)")
									}
										onMouseLeave={(e) =>
										(e.target.style.backgroundColor = "var(--accent-secondary)")
									}
									>
										<Send className="w-4 h-4" />
									</button>
								</form>
							</div>
						</>
					) : (
						<div
							className="flex-1 flex items-center justify-center"
							style={{ color: "var(--muted)" }}
						>
							<div className="text-center">
								<div className="text-5xl mb-4">No chat selected</div>
								<h3
									className="text-lg font-medium mb-2"
									style={{ color: "var(--muted)" }}
								>
									Select a conversation
								</h3>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Messages;
