import type { ReactNode } from 'react'

const STEP_STYLE: Record<string, { badge: string; label: string }> = {
  problem: { badge: 'bg-red-50 text-red-600', label: '문제' },
  cause: { badge: 'bg-amber-50 text-amber-600', label: '원인' },
  solution: { badge: 'bg-blue-50 text-blue-600', label: '해결' },
  result: { badge: 'bg-emerald-50 text-emerald-600', label: '결과' },
}

function Step({ kind, children }: { kind: keyof typeof STEP_STYLE; children: ReactNode }) {
  const s = STEP_STYLE[kind]
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
      <span
        className={`h-fit w-fit shrink-0 rounded-md px-2.5 py-1 text-sm font-bold sm:w-14 sm:text-center ${s.badge}`}
      >
        {s.label}
      </span>
      <div className="min-w-0 flex-1 leading-relaxed text-slate-700">{children}</div>
    </div>
  )
}

/**
 * 트러블슈팅 카드: 문제 → 원인 → 해결 → 결과 4단 구조.
 * 긴 부연 설명·이미지·코드는 detail(펼치기 영역)로 내려 가시성을 유지한다.
 */
export default function TroubleCard({
  no,
  title,
  problem,
  cause,
  solution,
  result,
  detail,
  detailLabel = '상세 과정 펼쳐보기',
}: {
  no: number
  title: string
  problem: ReactNode
  cause: ReactNode
  solution: ReactNode
  result: ReactNode
  detail?: ReactNode
  detailLabel?: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {no}
        </span>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-4 px-5 py-5 sm:px-6">
        <Step kind="problem">{problem}</Step>
        <Step kind="cause">{cause}</Step>
        <Step kind="solution">{solution}</Step>
        <Step kind="result">{result}</Step>
        {detail && (
          <details className="group mt-2 rounded-lg bg-slate-50">
            <summary className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">
              <span className="chevron text-blue-500">▶</span>
              {detailLabel}
            </summary>
            <div className="space-y-4 px-4 pb-4 text-[15px] leading-relaxed text-slate-700">
              {detail}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
