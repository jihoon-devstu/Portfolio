import type { ReactNode } from 'react'

/** 페이지 내 대단원 섹션 — no(01, 02…)를 주면 문서식 번호 라벨이 붙는다 */
export function Section({
  id,
  no,
  title,
  subtitle,
  children,
}: {
  id?: string
  no?: string
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 py-12 border-t border-slate-200 first:border-t-0">
      {no && <p className="text-lg font-extrabold tracking-[0.2em] text-accent">{no}</p>}
      <h2 className="mt-1 text-2xl font-bold text-ink">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-500">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

/** 상세 페이지 상단 앵커 내비게이션 — 긴 페이지에서 원하는 섹션으로 바로 이동 */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav className="sticky top-14 z-40 -mx-4 border-b border-slate-100 bg-white/90 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6">
      <div className="flex flex-nowrap gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-500 transition-colors hover:border-accent-line hover:text-accent"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

/** 기술 태그 */
export function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={
        'inline-block rounded-sm px-2.5 py-1 text-sm font-medium ' +
        (accent ? 'bg-accent-soft text-accent-deep' : 'bg-slate-100 text-slate-600')
      }
    >
      {children}
    </span>
  )
}

/** 프로젝트 메타 정보 한 칸 (기간 / 인원 / 역할 등) */
export function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-slate-400">{label}</dt>
      <dd className="mt-1 text-slate-800">{children}</dd>
    </div>
  )
}

/** 이미지 + 캡션 */
export function Figure({
  src,
  alt,
  caption,
  className = '',
  imgClassName = '',
}: {
  src: string
  alt: string
  caption?: string
  className?: string
  imgClassName?: string
}) {
  return (
    <figure className={className}>
      <a href={src} target="_blank" rel="noreferrer" title="새 탭에서 원본 보기">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={
            'w-full rounded-md border border-slate-200 bg-white transition-shadow hover:shadow-md ' +
            imgClassName
          }
        />
      </a>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-slate-500">{caption}</figcaption>
      )}
    </figure>
  )
}

/** 코드 블록 */
export function CodeBlock({ title, code }: { title?: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      {title && (
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto bg-ink p-4 text-[13px] leading-relaxed text-slate-100">
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}

/** 강조 숫자 */
export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-accent-line px-5 py-2">
      <div className="text-3xl font-extrabold text-accent-deep">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  )
}

/** 펼치기 (긴 상세 설명은 기본으로 접어 가시성 확보) */
export function Expand({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group rounded-md border border-slate-200 bg-slate-50/50">
      <summary className="flex items-center gap-2 px-4 py-3 font-medium text-slate-600 hover:text-ink">
        <span className="chevron text-accent">▶</span>
        {summary}
      </summary>
      <div className="border-t border-slate-200 px-5 py-4 text-base leading-relaxed text-slate-700">
        {children}
      </div>
    </details>
  )
}

/** 불릿 리스트 (본문용) — 점을 첫 줄 중앙에 맞추고, 줄바꿈 시 본문이 첫 글자에 정렬된다 */
export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 leading-relaxed">
          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-line" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}
