import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const TITLES = {
  '/': 'Dashboard Overview',
  '/customers': 'Customers',
  '/leads': 'Leads',
  '/tasks': 'Tasks',
  '/employees': 'Employees',
  '/reports': 'Reports',
  '/ai-assistant': 'AI Assistant',
  '/settings': 'Settings',
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const title = TITLES[location.pathname] || 'Trishul CRM'

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={title} onMenu={() => setOpen(true)} />
        <main className="flex-1 p-4 md:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
