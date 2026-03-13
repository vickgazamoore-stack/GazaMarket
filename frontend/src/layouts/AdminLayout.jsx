import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import Sidebar from '../components/layout/Sidebar.jsx'

const AdminLayout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--surface)" }}>
      <Navbar />
      <div className="flex">
        <Sidebar userType="admin" />
        <main className="flex-1 p-6 page-fade admin-panel">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
