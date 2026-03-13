import { forwardRef } from "react";
import { RefreshCw } from "lucide-react";

const Button = forwardRef(
	(
		{
			children,
			variant = "primary",
			size = "md",
			disabled = false,
			loading = false,
			className = "",
			...props
		},
		ref,
	) => {
		const baseStyles =
			"inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

		const variants = {
			primary:
				"text-white focus:ring-transparent shadow-sm",
			secondary:
				"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-transparent",
			danger:
				"bg-red-600 text-white hover:bg-red-700 focus:ring-transparent shadow-sm",
			ghost:
				"text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-transparent",
		};

		const sizes = {
			sm: "px-3 py-1.5 text-sm",
			md: "px-4 py-2 text-sm",
			lg: "px-6 py-3 text-base",
			xl: "px-8 py-4 text-lg",
		};

		const classes = [
			baseStyles,
			variants[variant],
			sizes[size],
			loading && "cursor-wait",
			className,
		]
			.filter(Boolean)
			.join(" ");

		return (
			<button
				ref={ref}
				className={classes}
				disabled={disabled || loading}
				style={
					variant === "primary"
						? {
								backgroundColor: "var(--accent)",
								cursor: loading ? "wait" : "pointer",
								boxShadow: "0 12px 24px -18px var(--shadow-strong)",
							}
						: {}
				}
				onMouseEnter={(e) => {
					if (variant === "primary" && !disabled && !loading) {
						e.target.style.backgroundColor = "var(--accent-strong)";
					}
				}}
				onMouseLeave={(e) => {
					if (variant === "primary" && !disabled && !loading) {
						e.target.style.backgroundColor = "var(--accent)";
					}
				}}
				{...props}
			>
				{loading && (
					<RefreshCw
						className="animate-spin -ml-1 mr-2 h-4 w-4"
						aria-hidden="true"
					/>
				)}
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";

export default Button;
