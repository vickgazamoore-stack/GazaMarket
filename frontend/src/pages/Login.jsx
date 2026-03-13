import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../app/providers.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import { Lock } from "lucide-react";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		userType: "buyer",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const result = await login(
				formData.email,
				formData.password,
				formData.userType,
			);

			if (result.success) {
				// Redirect based on user type
				const userType = result.user?.userType;
				const redirectPath =
					userType === "buyer"
						? "/buyer/dashboard"
						: userType === "seller"
							? "/seller/dashboard"
							: "/admin/dashboard";
				navigate(redirectPath, { replace: true });
			} else {
				setError(result.error || "Login failed");
			}
		} catch (_err) {
			setError("An error occurred during login");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
			style={{
				background: "linear-gradient(to bottom right, var(--accent), var(--accent-strong))",
			}}
		>
			<div className="max-w-md w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<div
						className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg"
						style={{ backgroundColor: "var(--accent)" }}
					>
						<Lock className="w-8 h-8 text-white" />
					</div>
					<h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
					<p style={{ color: "rgba(255, 255, 255, 0.82)" }}>
						Sign in to your Gaza Market account
					</p>
				</div>

				{/* Form */}
				<div
					className="rounded-2xl shadow-2xl p-8 border"
					style={{ backgroundColor: "var(--surface-strong)", borderColor: "var(--border)" }}
				>
					<form onSubmit={handleSubmit} className="space-y-6">
						<Input
							label="Email Address"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							required
							placeholder="Enter your email"
							error={error && error.includes("email") ? error : undefined}
						/>

						<Input
							label="Password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							required
							placeholder="Enter your password"
							error={error && error.includes("password") ? error : undefined}
						/>
						<div className="text-right">
							<Link
								to="/help#support"
								className="text-sm font-medium transition-colors"
								style={{ color: "var(--accent)" }}
								onMouseEnter={(e) => (e.target.style.color = "var(--accent-strong)")}
								onMouseLeave={(e) => (e.target.style.color = "var(--accent)")}
							>
								Forgot password?
							</Link>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
								Account Type
							</label>
							<select
								name="userType"
								value={formData.userType}
								onChange={handleChange}
								className="block w-full px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors"
								style={{
									backgroundColor: "var(--surface)",
									borderColor: "var(--border)",
									color: "var(--text)",
								}}
							>
								<option value="buyer">Buyer</option>
								<option value="seller">Seller</option>
								<option value="admin">Admin</option>
							</select>
						</div>

						{error && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-4">
								<div className="flex items-center">
									<span className="text-red-600 mr-2">!</span>
									<span className="text-red-700 text-sm">{error}</span>
								</div>
							</div>
						)}

						<Button
							type="submit"
							loading={loading}
							className="w-full"
							size="lg"
						>
							{loading ? "Signing In..." : "Sign In"}
						</Button>

						<div className="text-center">
							<span className="text-sm" style={{ color: "var(--muted)" }}>
								Don't have an account?{" "}
								<Link
									to="/register"
									className="font-medium transition-colors"
									style={{ color: "var(--accent-secondary)" }}
									onMouseEnter={(e) => (e.target.style.color = "var(--accent-secondary-strong)")}
									onMouseLeave={(e) => (e.target.style.color = "var(--accent-secondary)")}
								>
									Create one here
								</Link>
							</span>
						</div>
					</form>
				</div>

				{/* Footer */}
				<div className="text-center">
					<p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.78)" }}>
						By signing in, you agree to our{" "}
						<Link
							to="/legal#terms"
							style={{ color: "var(--accent)" }}
							className="font-medium hover:opacity-75 transition-opacity"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							to="/legal#privacy"
							style={{ color: "var(--accent)" }}
							className="font-medium hover:opacity-75 transition-opacity"
						>
							Privacy Policy
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
