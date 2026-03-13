import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './app/providers.jsx'
import { ProtectedRoute, PublicOnlyRoute } from './app/guards.jsx'
import { ThemeProvider } from './app/ThemeContext.jsx'
import { CartProvider } from './app/CartContext.jsx'
import { MessagingProvider } from './app/MessagingContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Help from './pages/Help.jsx'
import Legal from './pages/Legal.jsx'
import BuyerLayout from './layouts/BuyerLayout.jsx'
import SellerLayout from './layouts/SellerLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import BuyerDashboard from './features/buyer/pages/BuyerDashboard.jsx'
import Orders from './features/buyer/pages/Orders.jsx'
import ProductSearch from './features/buyer/pages/ProductSearch.jsx'
import Cart from './features/buyer/pages/Cart.jsx'
import Checkout from './features/buyer/pages/Checkout.jsx'
import Messages from './features/buyer/pages/Messages.jsx'
import Disputes from './features/buyer/pages/Disputes.jsx'
import ProductDetail from './features/buyer/pages/ProductDetail.jsx'
import CompareSellers from './features/buyer/pages/CompareSellers.jsx'
import SellerStorefront from './features/buyer/pages/SellerStorefront.jsx'
import SavedSellers from './features/buyer/pages/SavedSellers.jsx'
import Reviews from './features/buyer/pages/Reviews.jsx'
import OrderDetail from './features/buyer/pages/OrderDetail.jsx'
import BuyerProfile from './features/buyer/pages/BuyerProfile.jsx'
import SellerDashboard from './features/seller/pages/SellerDashboard.jsx'
import SellerOnboarding from './features/seller/pages/SellerOnboarding.jsx'
import ProductManagement from './features/seller/pages/ProductManagement.jsx'
import SellerOrders from './features/seller/pages/SellerOrders.jsx'
import PayoutDashboard from './features/seller/pages/PayoutDashboard.jsx'
import SellerMessages from './features/seller/pages/SellerMessages.jsx'
import SellerDisputes from './features/seller/pages/SellerDisputes.jsx'
import SellerAnalytics from './features/seller/pages/SellerAnalytics.jsx'
import SellerVerificationStatus from './features/seller/pages/SellerVerificationStatus.jsx'
import StorefrontSetup from './features/seller/pages/StorefrontSetup.jsx'
import ShippingSettings from './features/seller/pages/ShippingSettings.jsx'
import ReturnsManagement from './features/seller/pages/ReturnsManagement.jsx'
import PromotionsCoupons from './features/seller/pages/PromotionsCoupons.jsx'
import BulkUpload from './features/seller/pages/BulkUpload.jsx'
import ProductCreate from './features/seller/pages/ProductCreate.jsx'
import SellerProfile from './features/seller/pages/SellerProfile.jsx'
import AdminDashboard from './features/admin/pages/AdminDashboard.jsx'
import SellerManagement from './features/admin/pages/SellerManagement.jsx'
import DisputeResolution from './features/admin/pages/DisputeResolution.jsx'
import ProductModeration from './features/admin/pages/ProductModeration.jsx'
import CategoryManagement from './features/admin/pages/CategoryManagement.jsx'
import PlatformAnalytics from './features/admin/pages/PlatformAnalytics.jsx'
import PayoutManagement from './features/admin/pages/PayoutManagement.jsx'
import CommissionSettings from './features/admin/pages/CommissionSettings.jsx'
import ReportsLogs from './features/admin/pages/ReportsLogs.jsx'
import AdminProfile from './features/admin/pages/AdminProfile.jsx'
import AdminReturnsManagement from './features/admin/pages/ReturnsManagement.jsx'
import UserManagement from './features/admin/pages/UserManagement.jsx'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <MessagingProvider>
            <Router>
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route element={<PublicOnlyRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route path="/help" element={<Help />} />
              <Route path="/legal" element={<Legal />} />

              {/* Buyer Routes */}
              <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
                <Route path="/buyer" element={<BuyerLayout />}>
                  <Route path="dashboard" element={<BuyerDashboard />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="orders/:orderId" element={<OrderDetail />} />
                  <Route path="search" element={<ProductSearch />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="compare" element={<CompareSellers />} />
                  <Route path="compare/:id" element={<CompareSellers />} />
                  <Route path="sellers/:id" element={<SellerStorefront />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="disputes" element={<Disputes />} />
                  <Route path="wishlist" element={<SavedSellers />} />
                  <Route path="saved-sellers" element={<SavedSellers />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="profile" element={<BuyerProfile />} />
                </Route>
              </Route>

              {/* Seller Routes */}
              <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
                <Route path="/seller" element={<SellerLayout />}>
                  <Route path="dashboard" element={<SellerDashboard />} />
                  <Route path="onboarding" element={<SellerOnboarding />} />
                  <Route path="verification" element={<SellerVerificationStatus />} />
                  <Route path="storefront" element={<StorefrontSetup />} />
                  <Route path="products" element={<ProductManagement />} />
                  <Route path="products/new" element={<ProductCreate />} />
                  <Route path="orders" element={<SellerOrders />} />
                  <Route path="messages" element={<SellerMessages />} />
                  <Route path="disputes" element={<SellerDisputes />} />
                  <Route path="payouts" element={<PayoutDashboard />} />
                  <Route path="analytics" element={<SellerAnalytics />} />
                  <Route path="shipping" element={<ShippingSettings />} />
                  <Route path="returns" element={<ReturnsManagement />} />
                  <Route path="promotions" element={<PromotionsCoupons />} />
                  <Route path="bulk-upload" element={<BulkUpload />} />
                  <Route path="profile" element={<SellerProfile />} />
                </Route>
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="sellers" element={<SellerManagement />} />
                  <Route path="disputes" element={<DisputeResolution />} />
                  <Route path="products" element={<ProductModeration />} />
                  <Route path="categories" element={<CategoryManagement />} />
                  <Route path="returns" element={<AdminReturnsManagement />} />
                  <Route path="analytics" element={<PlatformAnalytics />} />
                  <Route path="payouts" element={<PayoutManagement />} />
                  <Route path="commission" element={<CommissionSettings />} />
                  <Route path="reports" element={<ReportsLogs />} />
                  <Route path="profile" element={<AdminProfile />} />
                </Route>
              </Route>
              </Routes>
            </Router>
          </MessagingProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
