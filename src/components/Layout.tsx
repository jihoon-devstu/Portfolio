import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/fantry', label: 'Fantry' },
  { to: '/ddasoom', label: 'Ddasoom' },
  { to: '/intellimarket', label: 'intelliMarket' },
  { to: '/aimpro', label: 'Aim Pro' },
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
          <Link to="/" className="font-bold text-ink">
            구지훈<span className="ml-2 hidden text-sm font-medium text-slate-400 sm:inline">Backend Developer</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-5">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  'border-b-2 px-0.5 pb-0.5 text-xs font-medium transition-colors sm:px-1.5 sm:text-sm ' +
                  (isActive
                    ? 'border-accent text-ink'
                    : 'border-transparent text-slate-500 hover:text-ink')
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
          <p>
            © 2026 Koo Ji Hoon (React 19 + Vite) ·{' '}
            <a
              href="https://github.com/jihoon-devstu/Portfolio"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-slate-300 underline-offset-2 hover:text-ink"
            >
              소스 보기
            </a>
          </p>
          <div className="flex gap-4">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-ink">
              {CONTACT.email}
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className="hover:text-ink">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
