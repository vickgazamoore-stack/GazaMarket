import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../app/ThemeContext.jsx";

const ThemeToggle = ({ variant = "ghost" }) => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	const baseClasses =
		"inline-flex items-center gap-2 rounded-lg text-sm font-medium transition-colors";
	const variants = {
		ghost: "px-3 py-2 hover:opacity-80",
		solid: "px-3 py-2 text-white",
	};

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={`${baseClasses} ${variants[variant] || variants.ghost}`}
			style={
				variant === "solid"
					? { backgroundColor: "var(--accent)" }
					: { color: "var(--text)" }
			}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
		>
			{isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
			<span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
		</button>
	);
};

export default ThemeToggle;
