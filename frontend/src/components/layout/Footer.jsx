import { Link } from "react-router-dom";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Lock,
	Shield,
	Star,
} from "lucide-react";

const Footer = () => {
	return (
		<footer
			className="site-footer"
			style={{ backgroundColor: "#030049" }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="col-span-1 md:col-span-2">
						<div className="flex items-center mb-4">
							<h3 className="text-2xl font-bold" style={{ color: "#ffffff" }}>
								Gaza Market
							</h3>
						</div>
						<p className="text-gray-300 mb-4 max-w-md">
							Your trusted multi-vendor marketplace connecting buyers with
							quality sellers across categories. Shop with confidence and sell
							with success.
						</p>
						<div className="flex space-x-4">
							<a
								href="https://www.facebook.com"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<span className="sr-only">Facebook</span>
								<Facebook className="w-7 h-7" />
							</a>
							<a
								href="https://www.twitter.com"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<span className="sr-only">Twitter</span>
								<Twitter className="w-7 h-7" />
							</a>
							<a
								href="https://www.instagram.com"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<span className="sr-only">Instagram</span>
								<Instagram className="w-7 h-7" />
							</a>
							<a
								href="https://www.linkedin.com"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<span className="sr-only">LinkedIn</span>
								<Linkedin className="w-7 h-7" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-gray-300 hover:text-white transition-colors"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/buyer/search"
									className="text-gray-300 hover:text-white transition-colors"
								>
									Browse Products
								</Link>
							</li>
							<li>
								<Link
									to="/register"
									className="text-gray-300 hover:text-white transition-colors"
								>
									Become a Seller
								</Link>
							</li>
							<li>
								<Link
									to="/help"
									className="text-gray-300 hover:text-white transition-colors"
								>
									Help Center
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h4 className="text-lg font-semibold mb-4 text-white">Customer Service</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/help#contact"
									className="text-gray-300 hover:text-white transition-colors"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									to="/help#shipping"
									className="text-gray-300 hover:text-white transition-colors"
								>
									Shipping Info
								</Link>
							</li>
							<li>
								<Link
									to="/help#returns"
									className="text-gray-300 hover:text-white transition-colors"
								>
									Returns & Exchanges
								</Link>
							</li>
							<li>
								<Link
									to="/help#disputes"
									className="text-gray-300 hover:text-white transition-colors"
								>
									Dispute Resolution
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-white/10 mt-8 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center md:items-start">
						<div className="text-gray-300 text-sm mb-4 md:mb-0">
							© 2025 Gaza Market. All rights reserved.
						</div>
						<div className="flex flex-col items-center md:items-end gap-4 text-sm">
							<button
								type="button"
								className="text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide"
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.18)",
									border: "1px solid rgba(255, 255, 255, 0.35)",
								}}
								onClick={() =>
									window.scrollTo({ top: 0, behavior: "smooth" })
								}
							>
								Back to Top
							</button>
							<div className="flex flex-wrap justify-center md:justify-end gap-6">
								<Link
									to="/legal#privacy"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Privacy Policy
								</Link>
								<Link
									to="/legal#terms"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Terms of Service
								</Link>
								<Link
									to="/legal#cookie"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Cookie Policy
								</Link>
								<Link
									to="/legal#accessibility"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Accessibility
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Trust Badges */}
				<div className="flex justify-center items-center mt-6 space-x-6">
					<div className="flex items-center text-gray-400 text-sm">
						<Lock className="w-5 h-5 mr-2" />
						Secure Payments
					</div>
					<div className="flex items-center text-gray-400 text-sm">
						<Shield className="w-5 h-5 mr-2" />
						Buyer Protection
					</div>
					<div className="flex items-center text-gray-400 text-sm">
						<Star className="w-5 h-5 mr-2" />
						Verified Sellers
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
