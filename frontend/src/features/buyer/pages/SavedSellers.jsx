import { Link } from "react-router-dom";
import { Star, ShieldCheck } from "lucide-react";

const SavedSellers = () => {
	const savedSellers = [
		{
			id: 1,
			name: "Nnamdi Tech Market",
			rating: 4.9,
			products: 340,
			verified: true,
		},
		{
			id: 2,
			name: "Ifunanya Fashion",
			rating: 4.6,
			products: 210,
			verified: true,
		},
		{
			id: 3,
			name: "Nneka Home",
			rating: 4.4,
			products: 98,
			verified: false,
		},
	];

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
							Saved Sellers
						</h1>
						<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
							Quick access to your favorite stores.
						</p>
					</div>
					<Link
						to="/buyer/search"
						className="text-sm font-semibold"
						style={{ color: "var(--accent-secondary)" }}
					>
						Find more sellers
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{savedSellers.map((seller) => (
						<div
							key={seller.id}
							className="border rounded-xl p-6 flex items-center justify-between"
							style={{ borderColor: "var(--border)" }}
						>
							<div>
								<div className="flex items-center gap-2">
									<h2 className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
										{seller.name}
									</h2>
									{seller.verified && (
										<span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
											<ShieldCheck className="w-3 h-3" />
											Verified
										</span>
									)}
								</div>
								<div className="flex items-center gap-2 mt-2 text-sm">
									<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
									<span style={{ color: "var(--muted)" }}>{seller.rating}</span>
									<span className="text-xs" style={{ color: "var(--muted)" }}>
										• {seller.products} products
									</span>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Link
									to={`/buyer/sellers/${seller.id}`}
									className="px-4 py-2 rounded-lg border text-sm font-semibold"
									style={{ borderColor: "var(--border)", color: "var(--accent)" }}
								>
									View Store
								</Link>
								<button
									className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
									style={{ backgroundColor: "var(--muted)" }}
									onMouseEnter={(e) =>
										(e.target.style.backgroundColor = "var(--muted)")
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = "var(--muted)")
									}
								>
									Unfollow
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SavedSellers;
