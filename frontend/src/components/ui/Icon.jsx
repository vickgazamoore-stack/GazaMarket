import React from "react";
import * as Lucide from "lucide-react";

// Icon component: pass `name` prop to render a lucide-react icon
export const Icon = ({ name, className = "", ...props }) => {
	const Comp = Lucide[name];
	if (!Comp) return null;
	return <Comp className={className} {...props} />;
};

// Logo component: compact SVG used across the app
export const Logo = ({ size = 36, className = "" }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		aria-hidden="true"
	>
		<rect width="48" height="48" rx="8" fill="var(--accent)" />
		<text
			x="50%"
			y="50%"
			fill="var(--surface)"
			fontSize="18"
			fontWeight="700"
			textAnchor="middle"
			dominantBaseline="middle"
		>
			GM
		</text>
	</svg>
);

export default Icon;
