import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import Sidebar from '../components/layout/Sidebar.jsx'
import Footer from '../components/layout/Footer.jsx'

const BuyerLayout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
      <Navbar />
      <div className="flex">
        <Sidebar userType="buyer" />
        <main className="flex-1 p-6 page-fade buyer-panel">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default BuyerLayout
