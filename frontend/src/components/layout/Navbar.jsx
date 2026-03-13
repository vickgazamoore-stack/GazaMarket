import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers.jsx";
import { useCart } from "../../app/CartContext.jsx";
import { useMessaging } from "../../app/MessagingContext.jsx";
import { MessageCircle, ShoppingCart, ChevronDown } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle.jsx";

const Navbar = () => {
	const { user, logout } = useAuth();
	const { itemCount } = useCart();
	const { unreadCount } = useMessaging();
	const navigate = useNavigate();
	const showMarketplaceLinks = !user;

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<nav
			className="border-b sticky top-0 z-50"
			style={{
				backgroundColor: "var(--surface-strong)",
				borderColor: "var(--border)",
				boxShadow: "0 16px 30px -24px var(--shadow-strong)",
			}}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex items-center">
						<Link to="/" className="flex items-center space-x-2">
							<div
								className="w-8 h-8 rounded-lg flex items-center justify-center"
								style={{
									background:
										"linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary-strong) 100%)",
								}}
							>
								<span className="text-white font-bold text-sm">GM</span>
							</div>
							<span
								className="text-xl font-bold hidden sm:block"
								style={{ color: "var(--ink)" }}
							>
								Gaza Market
							</span>
						</Link>
					</div>

					{/* Navigation Links */}
					{showMarketplaceLinks && (
						<div className="hidden md:flex items-center space-x-8">
							<Link
								to="/buyer/search"
								className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
								style={{ color: "var(--text)" }}
							>
								Browse Products
							</Link>
							<Link
								to="/register"
								className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
								style={{ color: "var(--text)" }}
							>
								Become a Seller
							</Link>
						</div>
					)}

					{/* User Actions */}
					<div className="flex items-center space-x-4">
						<ThemeToggle />
						{user ? (
							<>
								{user.userType === "buyer" && (
									<div className="flex items-center space-x-3">
										{/* Messages */}
										<Link
											to="/buyer/messages"
											className="relative p-2 rounded-lg transition-all"
											title="Messages"
											style={{ color: "var(--text)" }}
										>
											<MessageCircle className="w-5 h-5" />
											{unreadCount > 0 && (
												<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
													{unreadCount > 9 ? "9+" : unreadCount}
												</span>
											)}
										</Link>

										{/* Cart */}
										<Link
											to="/buyer/cart"
											className="relative p-2 rounded-lg transition-all"
											title="Shopping Cart"
											style={{ color: "var(--text)" }}
										>
											<ShoppingCart className="w-5 h-5" />
											{itemCount > 0 && (
												<span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
													{itemCount > 9 ? "9+" : itemCount}
												</span>
											)}
										</Link>
									</div>
								)}

								{/* User Menu */}
								<div className="relative group">
									<button
										className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all"
										style={{ color: "var(--text)" }}
									>
										<div
											className="w-8 h-8 rounded-full flex items-center justify-center"
											style={{
												background:
													"linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary-strong) 100%)",
											}}
										>
											<span className="text-white text-sm font-medium">
												{user.name.charAt(0).toUpperCase()}
											</span>
										</div>
										<span className="hidden sm:block text-sm font-medium">
											{user.name}
										</span>
										<ChevronDown className="w-4 h-4" />
									</button>

									<div
										className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
										style={{
											backgroundColor: "var(--surface-strong)",
											borderColor: "var(--border)",
										}}
									>
										<Link
											to={`/${user.userType}/dashboard`}
											className="block px-4 py-2 text-sm hover:bg-white/60"
											style={{ color: "var(--text)" }}
										>
											Dashboard
										</Link>
										<Link
											to={`/${user.userType}/profile`}
											className="block px-4 py-2 text-sm hover:bg-white/60"
											style={{ color: "var(--text)" }}
										>
											Profile Settings
										</Link>
										<hr className="my-1" />
										<button
											onClick={handleLogout}
											className="block w-full text-left px-4 py-2 text-sm hover:bg-white/60"
											style={{ color: "var(--accent-secondary-strong)" }}
										>
											Sign Out
										</button>
									</div>
								</div>
							</>
						) : (
							<div className="flex items-center space-x-3">
								<Link
									to="/login"
									className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
									style={{ color: "var(--text)" }}
								>
									Sign In
								</Link>
								<Link
									to="/register"
									className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
									style={{ backgroundColor: "var(--accent)" }}
								>
									Get Started
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
