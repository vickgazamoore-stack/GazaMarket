import { forwardRef, useEffect } from "react";
import { X } from "lucide-react";

const Modal = forwardRef(
	(
		{
			isOpen,
			onClose,
			title,
			children,
			size = "md",
			showCloseButton = true,
			className = "",
			...props
		},
		ref
	) => {
		useEffect(() => {
			const handleEscape = (e) => {
				if (e.key === "Escape") {
					onClose();
				}
			};

			if (isOpen) {
				document.addEventListener("keydown", handleEscape);
				document.body.style.overflow = "hidden";
			}

			return () => {
				document.removeEventListener("keydown", handleEscape);
				document.body.style.overflow = "unset";
			};
		}, [isOpen, onClose]);

		if (!isOpen) return null;

		const sizes = {
			sm: "max-w-md",
			md: "max-w-lg",
			lg: "max-w-2xl",
			xl: "max-w-4xl",
			full: "max-w-full",
		};

		return (
			<div className="fixed inset-0 z-50 overflow-y-auto">
				<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
					{/* Background overlay */}
					<div
						className="fixed inset-0 transition-opacity"
						style={{ backgroundColor: "rgba(38, 29, 20, 0.55)" }}
						onClick={onClose}
					/>

					{/* Modal panel */}
					<div
						ref={ref}
						className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizes[size]} w-full ${className}`}
						style={{
							backgroundColor: "var(--surface-strong)",
							border: "1px solid var(--border)",
						}}
						{...props}
					>
						{/* Header */}
						{title && (
							<div
								className="px-6 py-4 border-b flex items-center justify-between"
								style={{ borderColor: "var(--border)" }}
							>
								<h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>
									{title}
								</h3>
								{showCloseButton && (
									<button
										onClick={onClose}
										className="text-gray-400 hover:text-gray-600 transition-colors"
									>
										<span className="sr-only">Close</span>
										<X className="h-6 w-6" aria-hidden="true" />
									</button>
								)}
							</div>
						)}

						{/* Content */}
						<div className="px-6 py-4">{children}</div>
					</div>
				</div>
			</div>
		);
	}
);

Modal.displayName = "Modal";

export default Modal;
