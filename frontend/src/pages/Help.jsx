import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer.jsx";

const Help = () => {
	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<header
				className="border-b"
				style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
			>
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div className="flex items-center gap-3">
						<div
							className="w-10 h-10 rounded-lg flex items-center justify-center"
							style={{
								background:
									"linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary-strong) 100%)",
							}}
						>
							<span className="text-white font-bold">GM</span>
						</div>
						<div>
							<h1 className="text-2xl font-bold" style={{ color: "var(--ink)" }}>
								Help Center
							</h1>
							<p className="text-sm" style={{ color: "var(--muted)" }}>
								Quick answers and support for buyers and sellers.
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Link
							to="/"
							className="px-4 py-2 rounded-lg text-sm font-medium"
							style={{ color: "var(--text)" }}
						>
							Home
						</Link>
						<Link
							to="/login"
							className="px-4 py-2 rounded-lg text-sm font-medium"
							style={{ color: "var(--text)" }}
						>
							Sign In
						</Link>
						<Link
							to="/register"
							className="px-4 py-2 rounded-lg text-sm font-medium text-white"
							style={{ backgroundColor: "var(--accent)" }}
						>
							Create Account
						</Link>
					</div>
				</div>
			</header>

			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
				<section id="support" className="space-y-3">
					<h2 className="text-3xl font-bold" style={{ color: "var(--ink)" }}>
						Support Overview
					</h2>
					<p className="text-lg" style={{ color: "var(--text)" }}>
						We are here to help with orders, payments, shipping, and disputes.
						Use the sections below to find the fastest path to a solution.
					</p>
				</section>

				<section id="contact" className="space-y-3">
					<h3 className="text-2xl font-semibold" style={{ color: "var(--ink)" }}>
						Contact Us
					</h3>
					<p className="text-base" style={{ color: "var(--text)" }}>
						Need a human? Open a support message from your dashboard. Buyers can
						use the Messages page; sellers can use the Seller Messages page.
					</p>
					<div className="flex flex-wrap gap-3">
						<Link
							to="/buyer/messages"
							className="px-4 py-2 rounded-lg text-sm font-medium text-white"
							style={{ backgroundColor: "var(--accent)" }}
						>
							Buyer Messages
						</Link>
						<Link
							to="/seller/messages"
							className="px-4 py-2 rounded-lg text-sm font-medium"
							style={{ color: "var(--text)", border: "1px solid var(--border)" }}
						>
							Seller Messages
						</Link>
					</div>
				</section>

				<section id="shipping" className="space-y-3">
					<h3 className="text-2xl font-semibold" style={{ color: "var(--ink)" }}>
						Shipping Info
					</h3>
					<p className="text-base" style={{ color: "var(--text)" }}>
						Check your order status and shipping updates from your Orders page.
						Tracking details appear once a seller marks an order as shipped.
					</p>
					<Link
						to="/buyer/orders"
						className="inline-flex px-4 py-2 rounded-lg text-sm font-medium text-white"
						style={{ backgroundColor: "var(--accent)" }}
					>
						View Orders
					</Link>
				</section>

				<section id="returns" className="space-y-3">
					<h3 className="text-2xl font-semibold" style={{ color: "var(--ink)" }}>
						Returns and Exchanges
					</h3>
					<p className="text-base" style={{ color: "var(--text)" }}>
						If an item arrives damaged or incorrect, request a return from your
						order details or open a dispute.
					</p>
					<Link
						to="/buyer/orders"
						className="inline-flex px-4 py-2 rounded-lg text-sm font-medium text-white"
						style={{ backgroundColor: "var(--accent)" }}
					>
						Open Order Details
					</Link>
				</section>

				<section id="disputes" className="space-y-3">
					<h3 className="text-2xl font-semibold" style={{ color: "var(--ink)" }}>
						Dispute Resolution
					</h3>
					<p className="text-base" style={{ color: "var(--text)" }}>
						Disputes help mediate issues between buyers and sellers. Use the
						Disputes page to create or track a case.
					</p>
					<Link
						to="/buyer/disputes"
						className="inline-flex px-4 py-2 rounded-lg text-sm font-medium text-white"
						style={{ backgroundColor: "var(--accent)" }}
					>
						Open Disputes
					</Link>
				</section>

				<section id="seller" className="space-y-3">
					<h3 className="text-2xl font-semibold" style={{ color: "var(--ink)" }}>
						Become a Seller
					</h3>
					<p className="text-base" style={{ color: "var(--text)" }}>
						Create an account and complete onboarding to start selling. You can
						set up your storefront, add products, and manage payouts.
					</p>
					<Link
						to="/register"
						className="inline-flex px-4 py-2 rounded-lg text-sm font-medium text-white"
						style={{ backgroundColor: "var(--accent)" }}
					>
						Start Selling
					</Link>
				</section>

				<section id="faq" className="space-y-3">
					<h3 className="text-2xl font-semibold" style={{ color: "var(--ink)" }}>
						FAQ
					</h3>
					<div className="space-y-4">
						<div>
							<p className="font-semibold" style={{ color: "var(--ink)" }}>
								Where can I track my orders?
							</p>
							<p className="text-base" style={{ color: "var(--text)" }}>
								Use the Orders page in your buyer dashboard to view status and
								tracking.
							</p>
						</div>
						<div>
							<p className="font-semibold" style={{ color: "var(--ink)" }}>
								How do I contact a seller?
							</p>
							<p className="text-base" style={{ color: "var(--text)" }}>
								Send a message from the Messages page and choose the seller.
							</p>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default Help;
