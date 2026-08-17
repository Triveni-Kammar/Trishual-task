import { useState } from 'react'
import { Menu, Search, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Topbar({ title, onMenu }) {
  const { user } = useAuth()
  const [showNotif, setShowNotif] = useState(false)

  return (
    <header className="sticky top-0 z-20 glass border-b border-[var(--border)] px-4 md:px-8 py-4 flex items-center justify-between backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="md:hidden text-[var(--muted)]">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-display text-xl font-bold tracking-wide">{title}</h1>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 bg-[var(--panel-solid)] border border-[var(--border)] rounded-lg px-3 py-2 w-72">
        <Search size={15} className="text-[var(--muted)]" />
        <input
          placeholder="Search here..."
          className="bg-transparent outline-none text-sm w-full placeholder:text-[var(--muted-2)]"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowNotif((s) => !s)}
            className="relative w-9 h-9 rounded-lg glass flex items-center justify-center text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--ember)]" />
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 glass rounded-xl p-3 text-sm shadow-xl">
              <div className="font-medium mb-2">Notifications</div>
              <div className="space-y-2 text-[var(--muted)] text-xs">
                <div>3 tasks due today</div>
                <div>2 new leads assigned to you</div>
                <div>Weekly report is ready</div>
              </div>
            </div>
          )}
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--ember)] flex items-center justify-center text-xs font-bold text-[#1a0f00]">
          {user.name.slice(0, 1)}
        </div>
      </div>
    </header>
  )
}
