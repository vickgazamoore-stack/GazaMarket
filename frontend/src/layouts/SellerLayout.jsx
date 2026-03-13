import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../app/providers.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import Sidebar from '../components/layout/Sidebar.jsx'

const SellerLayout = () => {
  const { user } = useAuth()

  // Redirect to onboarding if not completed
  if (user.sellerStatus === 'pending_onboarding') {
    return <Navigate to="/seller/onboarding" replace />
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
      <Navbar />
      <div className="flex">
        <Sidebar userType="seller" />
        <main className="flex-1 p-6 page-fade seller-panel">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default SellerLayout
