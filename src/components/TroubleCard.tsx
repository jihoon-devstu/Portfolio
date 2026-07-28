import type { ReactNode } from 'react'

/** 단계 라벨 — 색 배지 대신 테크니컬 라이팅 스타일의 타이포 라벨 */
function Step({ label, children, accent = false }: { label: string; children: ReactNode; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <span
        className={
          'w-14 shrink-0 pt-px text-sm font-bold ' + (accent ? 'text-accent-deep' : 'text-ink')
        }
      >
        {label}.
      </span>
      <div className="min-w-0 flex-1 leading-relaxed text-slate-700">{children}</div>
    </div>
  )
}

/**
 * 트러블슈팅: 문제 → 원인 → 해결 → 결과 4단 구조.
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
  detailLabel = '과정과 검증 자세히 보기',
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
    <div className="border-t border-slate-200 pt-6">
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-bold text-slate-400">{String(no).padStart(2, '0')}</span>
        <h3 className="text-lg font-bold text-ink">{title}</h3>
      </div>
      <div className="mt-4 space-y-3.5 sm:pl-8">
        <Step label="문제">{problem}</Step>
        <Step label="원인">{cause}</Step>
        <Step label="해결">{solution}</Step>
        <Step label="결과" accent>
          {result}
        </Step>
        {detail && (
          <details className="group mt-3 rounded-md bg-slate-50">
            <summary className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-500 hover:text-ink">
              <span className="chevron text-accent">▶</span>
              {detailLabel}
            </summary>
            <div className="space-y-4 px-4 pb-4 text-base leading-relaxed text-slate-700">
              {detail}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
