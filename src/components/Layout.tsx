import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/fantry', label: 'Fantry' },
  { to: '/ddasoom', label: 'Ddasoom' },
  { to: '/intellimarket', label: 'intelliMarket' },
]

export const CONTACT = {
  email: 'wlsgksvheh@gmail.com',
  github: 'https://github.com/jihoon-devstu',
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-bold text-slate-900">
            구지훈<span className="ml-2 hidden text-sm font-medium text-slate-400 sm:inline">Backend Developer</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  'rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3 ' +
                  (isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-900')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6">
          <p>© 2026 Koo Ji Hoon. Built with React.</p>
          <div className="flex gap-4">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-slate-900">
              {CONTACT.email}
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className="hover:text-slate-900">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
