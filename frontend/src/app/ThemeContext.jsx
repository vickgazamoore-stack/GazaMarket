import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const getPreferredTheme = () => {
	if (typeof window === "undefined") {
		return "light";
	}
	const stored = localStorage.getItem("theme");
	if (stored === "light" || stored === "dark") {
		return stored;
	}
	if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}
	return "light";
};

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(getPreferredTheme);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const value = useMemo(
		() => ({
			theme,
			setTheme,
			toggleTheme: () =>
				setTheme((prev) => (prev === "dark" ? "light" : "dark")),
		}),
		[theme]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
