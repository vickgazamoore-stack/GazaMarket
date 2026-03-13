import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./providers.jsx";

const FullPageLoader = () => (
	<div className="flex justify-center items-center min-h-screen">Loading...</div>
);

const getRole = (user) => user?.userType || user?.role || null;

export const ProtectedRoute = ({ allowedRoles = [] }) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <FullPageLoader />;
	}

	if (!user) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	const role = getRole(user);
	if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export const PublicOnlyRoute = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return <FullPageLoader />;
	}

	if (user) {
		const role = getRole(user);
		const redirectPath =
			role === "buyer"
				? "/buyer/dashboard"
				: role === "seller"
					? "/seller/dashboard"
					: role === "admin"
						? "/admin/dashboard"
						: "/";
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

