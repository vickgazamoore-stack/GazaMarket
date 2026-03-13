import { useState } from "react";
import { Star } from "lucide-react";

const Reviews = () => {
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");

	const reviewList = [
		{
			id: 1,
			name: "Chidera N.",
			rating: 5,
			date: "Jan 10, 2026",
			comment: "Seller shipped quickly and product quality exceeded expectations.",
		},
		{
			id: 2,
			name: "Kelechi O.",
			rating: 4,
			date: "Dec 28, 2025",
			comment: "Good service. Packaging could be improved.",
		},
	];

	return (
		<div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				<div>
					<h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
						Reviews & Ratings
					</h1>
					<p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
						Share your experience with this seller.
					</p>
				</div>

				<div className="border rounded-xl p-6" style={{ borderColor: "var(--border)" }}>
					<h2 className="text-xl font-semibold" style={{ color: "var(--accent)" }}>
						Leave a Review
					</h2>
					<div className="flex items-center gap-2 mt-4">
						{[1, 2, 3, 4, 5].map((value) => (
							<button
								key={value}
								type="button"
								onClick={() => setRating(value)}
								className="p-1"
							>
								<Star
									className={`w-6 h-6 ${
										value <= rating
											? "text-yellow-400 fill-yellow-400"
											: "text-gray-300"
									}`}
								/>
							</button>
						))}
					</div>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						rows={4}
						placeholder="Tell us about your experience..."
						className="mt-4 w-full px-4 py-3 rounded-lg border focus:outline-none"
						style={{ borderColor: "var(--border)", color: "var(--text)" }}
					/>
					<div className="flex justify-end mt-4">
						<button
							className="px-6 py-2 rounded-lg text-white font-semibold"
							style={{ backgroundColor: "var(--accent-secondary)" }}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--accent-secondary-strong)")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--accent-secondary)")}
						>
							Submit Review
						</button>
					</div>
				</div>

				<div className="space-y-4">
					<h2 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
						Recent Reviews
					</h2>
					{reviewList.map((review) => (
						<div
							key={review.id}
							className="border rounded-xl p-5"
							style={{ borderColor: "var(--border)" }}
						>
							<div className="flex items-center justify-between">
								<p className="font-semibold" style={{ color: "var(--accent)" }}>
									{review.name}
								</p>
								<p className="text-sm" style={{ color: "var(--muted)" }}>
									{review.date}
								</p>
							</div>
							<div className="flex items-center gap-1 mt-2">
								{[...Array(5)].map((_, index) => (
									<Star
										key={index}
										className={`w-4 h-4 ${
											index < review.rating
												? "text-yellow-400 fill-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>
							<p className="mt-3" style={{ color: "var(--muted)" }}>
								{review.comment}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Reviews;
