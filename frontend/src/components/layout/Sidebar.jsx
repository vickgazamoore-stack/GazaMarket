import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
	Home,
	LayoutDashboard,
	Search,
	Scale,
	ShoppingCart,
	ClipboardList,
	MapPinned,
	RefreshCcw,
	MessageSquare,
	AlertTriangle,
	Heart,
	Star,
	User,
	Settings,
	ShieldCheck,
	Store,
	Package,
	PlusSquare,
	TrendingUp,
	Wallet,
	Truck,
	Percent,
	Upload,
	Users,
	Gavel,
	Boxes,
	FolderKanban,
	LineChart,
	FileText,
	UserCog,
	Menu,
	ChevronsLeft,
} from "lucide-react";

const Sidebar = ({ userType }) => {
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const toggle = () => setOpen((v) => !v);
	const toggleCollapsed = () => setCollapsed((v) => !v);

	const buyerLinks = [
		{ path: "/", label: "Home", icon: Home },
		{ path: "/buyer/dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ path: "/buyer/search", label: "Browse Products", icon: Search },
		{ path: "/buyer/orders", label: "My Orders", icon: ClipboardList },
		{ path: "/buyer/messages", label: "Messages", icon: MessageSquare },
		{ path: "/buyer/disputes", label: "Disputes", icon: AlertTriangle },
		{ path: "/buyer/reviews", label: "Reviews", icon: Star },
		{ path: "/buyer/profile", label: "Settings", icon: Settings },
	];

	const sellerLinks = [
		{ path: "/", label: "Home", icon: Home },
		{ path: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ path: "/seller/verification", label: "Verification", icon: ShieldCheck },
		{ path: "/seller/storefront", label: "Storefront", icon: Store },
		{ path: "/seller/products", label: "Products", icon: Package },
		{ path: "/seller/products/new", label: "Add Product", icon: PlusSquare },
		{ path: "/seller/orders", label: "Orders", icon: ClipboardList },
		{ path: "/seller/messages", label: "Messages", icon: MessageSquare },
		{ path: "/seller/disputes", label: "Disputes", icon: AlertTriangle },
		{ path: "/seller/analytics", label: "Analytics", icon: TrendingUp },
		{ path: "/seller/payouts", label: "Payouts", icon: Wallet },
		{ path: "/seller/shipping", label: "Shipping", icon: Truck },
		{ path: "/seller/returns", label: "Returns", icon: RefreshCcw },
		{ path: "/seller/promotions", label: "Promotions", icon: Percent },
		{ path: "/seller/bulk-upload", label: "Bulk Upload", icon: Upload },
		{ path: "/seller/profile", label: "Settings", icon: Settings },
	];

	const adminLinks = [
		{ path: "/", label: "Home", icon: Home },
		{ path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ path: "/admin/users", label: "Users", icon: Users },
		{ path: "/admin/sellers", label: "Seller Management", icon: Users },
		{ path: "/admin/disputes", label: "Dispute Resolution", icon: Gavel },
		{ path: "/admin/products", label: "Product Moderation", icon: Boxes },
		{ path: "/admin/categories", label: "Categories", icon: FolderKanban },
		{ path: "/admin/returns", label: "Returns", icon: RefreshCcw },
		{ path: "/admin/payouts", label: "Payout Management", icon: Wallet },
		{ path: "/admin/analytics", label: "Analytics", icon: LineChart },
		{ path: "/admin/commission", label: "Commission", icon: Percent },
		{ path: "/admin/reports", label: "Reports & Logs", icon: FileText },
		{ path: "/admin/profile", label: "Settings", icon: Settings },
	];

	const getLinks = () => {
		switch (userType) {
			case "buyer":
				return buyerLinks;
			case "seller":
				return sellerLinks;
			case "admin":
				return adminLinks;
			default:
				return [];
		}
	};

	const links = getLinks();

	return (
		<aside
			className="shadow-sm min-h-screen"
			style={{ backgroundColor: "var(--surface-strong)" }}
		>
			<div className="flex items-center justify-between p-4 md:hidden">
				<h2
					className="text-lg font-semibold capitalize"
					style={{ color: "var(--ink)" }}
				>
					{userType} Panel
				</h2>
				<button
					onClick={toggle}
					aria-label="Toggle menu"
					className="p-2 rounded-md"
					style={{ color: "var(--text)" }}
				>
					{open ? "✕" : "☰"}
				</button>
			</div>

			<div
				className={`hidden md:block sticky top-0 h-screen overflow-y-auto ${
					collapsed ? "w-20" : "w-64"
				}`}
				style={{ backgroundColor: "var(--surface-strong)" }}
			>
				<div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} px-4 py-3`}>
					{!collapsed && (
						<h2
							className="text-lg font-semibold capitalize"
							style={{ color: "var(--ink)" }}
						>
							{userType} Panel
						</h2>
					)}
					<button
						onClick={toggleCollapsed}
						aria-label="Toggle sidebar"
						className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold"
						style={{ color: "var(--text)", borderColor: "var(--border)" }}
					>
						<Menu className="w-5 h-5" strokeWidth={2.5} />
						{!collapsed && <span>Menu</span>}
					</button>
				</div>
				<nav className={collapsed ? "px-2" : "px-4"}>
					<ul className={collapsed ? "grid grid-cols-1 gap-2" : "space-y-2"}>
						{links.map((link) => (
							<li key={link.path}>
								<Link
									to={link.path}
									className={`block rounded-lg text-sm font-medium transition-colors ${
										location.pathname === link.path
											? "font-semibold"
											: "hover:opacity-80"
									} ${collapsed ? "px-2 py-3 text-center" : "px-4 py-2"}`}
									style={{
										backgroundColor:
											location.pathname === link.path
												? "rgba(222, 107, 72, 0.16)"
												: "transparent",
										color:
											location.pathname === link.path
												? "var(--accent-strong)"
												: "var(--text)",
									}}
									title={collapsed ? link.label : undefined}
								>
									<span
										className={`inline-flex ${
											collapsed ? "flex-col items-center gap-1" : "items-center gap-3"
										} ${collapsed ? "w-full justify-center" : ""}`}
									>
										{link.icon && (
											<link.icon
												className={collapsed ? "w-6 h-6" : "w-5 h-5"}
												strokeWidth={2.5}
											/>
										)}
										<span className={collapsed ? "text-[11px] leading-tight" : ""}>
											{link.label}
										</span>
									</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>

			{/* Mobile drawer */}
			{open && (
				<div
					className="md:hidden border-t"
					style={{ backgroundColor: "var(--surface-strong)" }}
				>
					<nav className="px-4 py-2">
						<ul className="space-y-1">
							{links.map((link) => (
								<li key={link.path}>
									<Link
										to={link.path}
										onClick={() => setOpen(false)}
										className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${
											location.pathname === link.path
												? "font-semibold"
												: "hover:opacity-80"
										}`}
										style={{
											backgroundColor:
												location.pathname === link.path
													? "rgba(222, 107, 72, 0.16)"
													: "transparent",
											color:
												location.pathname === link.path
													? "var(--accent-strong)"
													: "var(--text)",
										}}
									>
										<span className="inline-flex items-center gap-3">
											{link.icon && <link.icon className="w-4 h-4" strokeWidth={2.5} />}
											<span>{link.label}</span>
										</span>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</aside>
	);
};

export default Sidebar;
