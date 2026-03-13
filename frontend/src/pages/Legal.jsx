import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer.jsx";

const Legal = () => {
	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<header
				className="border-b"
				style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
			>
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold" style={{ color: "var(--ink)" }}>
							Legal and Policies
						</h1>
						<p className="text-sm" style={{ color: "var(--muted)" }}>
							Important information about how Gaza Market operates.
						</p>
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
							to="/help"
							className="px-4 py-2 rounded-lg text-sm font-medium"
							style={{ color: "var(--text)" }}
						>
							Help Center
						</Link>
					</div>
				</div>
			</header>

			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
				<section id="privacy" className="space-y-3">
					<h2 className="text-3xl font-bold" style={{ color: "var(--ink)" }}>
						Privacy Policy
					</h2>
					<p className="text-base" style={{ color: "var(--text)" }}>
						We collect only the data needed to process orders, manage accounts,
						and improve the marketplace experience. Personal data is never sold.
					</p>
				</section>

				<section id="terms" className="space-y-3">
					<h2 className="text-3xl font-bold" style={{ color: "var(--ink)" }}>
						Terms of Service
					</h2>
					<p className="text-base" style={{ color: "var(--text)" }}>
						By using Gaza Market, you agree to follow marketplace policies,
						keep account information accurate, and respect seller and buyer
						agreements.
					</p>
				</section>

				<section id="cookie" className="space-y-3">
					<h2 className="text-3xl font-bold" style={{ color: "var(--ink)" }}>
						Cookie Policy
					</h2>
					<p className="text-base" style={{ color: "var(--text)" }}>
						Cookies help us remember your preferences and keep you signed in.
						You can control cookie settings from your browser.
					</p>
				</section>

				<section id="accessibility" className="space-y-3">
					<h2 className="text-3xl font-bold" style={{ color: "var(--ink)" }}>
						Accessibility
					</h2>
					<p className="text-base" style={{ color: "var(--text)" }}>
						We aim to meet accessibility standards and welcome feedback to
						improve navigation, contrast, and screen reader support.
					</p>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default Legal;
