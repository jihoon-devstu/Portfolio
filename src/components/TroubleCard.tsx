import type { ReactNode } from 'react'

/**
 * 한 행: 라벨 + 본문.
 * items-baseline으로 라벨과 본문의 글자 기준선을 맞춰 줄이 어긋나지 않게 한다.
 * 결론에 해당하는 '결과'만 배경을 깔아 먼저 눈에 들어오게 한다.
 */
function Step({
  label,
  children,
  accent = false,
}: {
  label: string
  children: ReactNode
  accent?: boolean
}) {
  return (
    <div
      className={
        'flex flex-col gap-1 px-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-5 sm:px-3 ' +
        (accent ? 'bg-accent-soft/70' : '')
      }
    >
      <span
        className={
          'w-14 shrink-0 text-sm font-bold ' + (accent ? 'text-accent-deep' : 'text-slate-400')
        }
      >
        {label}
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
    <div>
      <div className="flex items-baseline gap-3 border-b-2 border-ink pb-3">
        <span className="shrink-0 text-sm font-bold text-accent">
          {String(no).padStart(2, '0')}
        </span>
        <h3 className="text-lg font-bold text-ink">{title}</h3>
      </div>
      <div className="divide-y divide-slate-100 border-b border-slate-200">
        <Step label="문제">{problem}</Step>
        <Step label="원인">{cause}</Step>
        <Step label="해결">{solution}</Step>
        <Step label="결과" accent>
          {result}
        </Step>
      </div>
      {detail && (
        <details className="group mt-3 rounded-md bg-slate-50">
          <summary className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-500 hover:text-ink">
            <span className="chevron text-accent">▶</span>
            {detailLabel}
          </summary>
          <div className="space-y-4 px-4 pb-4 leading-relaxed text-slate-700">{detail}</div>
        </details>
      )}
    </div>
  )
}
