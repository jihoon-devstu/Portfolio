import { Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Fantry from './pages/Fantry'
import Ddasoom from './pages/Ddasoom'
import IntelliMarket from './pages/IntelliMarket'
import AimPro from './pages/AimPro'

function NotFound() {
  return (
    <div className="flex flex-col items-center py-32 text-center">
      <p className="text-5xl font-extrabold text-slate-300">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-slate-500">주소가 잘못되었거나 삭제된 페이지입니다.</p>
      <Link
        to="/"
        className="mt-8 rounded-sm bg-ink px-5 py-2.5 font-medium text-white transition-colors hover:bg-accent-deep"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/fantry" element={<Fantry />} />
        <Route path="/ddasoom" element={<Ddasoom />} />
        <Route path="/intellimarket" element={<IntelliMarket />} />
        <Route path="/aimpro" element={<AimPro />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
