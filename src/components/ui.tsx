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

/** '가장 파고든 것' — 훑어보는 사람이 이것만 읽어도 되도록 크게 한 번 강조 */
export function Highlight({ lines, gains }: { lines: ReactNode[]; gains: ReactNode[] }) {
  return (
    <div className="rounded-md border-l-4 border-accent bg-accent-soft/70 px-6 py-6 sm:px-8">
      <div className="space-y-2">
        {lines.map((l, i) => (
          <p key={i} className="text-lg font-bold leading-snug text-ink sm:text-xl">
            {lines.length > 1 && (
              <span className="mr-2 text-accent">{String(i + 1).padStart(2, '0')}</span>
            )}
            {l}
          </p>
        ))}
      </div>
      <div className="mt-5 border-t border-accent-line pt-4">
        <p className="text-sm font-bold text-slate-500">그래서 얻은 것</p>
        <ul className="mt-2 space-y-1.5">
          {gains.map((g, i) => (
            <li key={i} className="flex gap-2.5 leading-relaxed text-slate-700">
              <span className="shrink-0 font-bold text-accent">✓</span>
              <span className="min-w-0">{g}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** 팀 역할 분배 — 내 담당 행만 강조해 '내 지분'이 한눈에 보이게 */
export function RoleSplit({
  roles,
}: {
  roles: { role: string; detail: ReactNode; mine?: boolean }[]
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200">
      <table className="w-full min-w-[480px] text-left">
        <tbody className="divide-y divide-slate-100">
          {roles.map((r) => (
            <tr key={r.role} className={r.mine ? 'bg-accent-soft/70' : ''}>
              <td className="w-14 px-4 py-3 align-top">
                {r.mine && (
                  <span className="whitespace-nowrap text-sm font-bold text-accent-deep">나</span>
                )}
              </td>
              <td
                className={
                  'w-48 px-2 py-3 align-top leading-relaxed ' +
                  (r.mine ? 'font-bold text-accent-deep' : 'font-medium text-slate-600')
                }
              >
                {r.role}
              </td>
              <td
                className={
                  'px-4 py-3 align-top leading-relaxed ' +
                  (r.mine ? 'text-slate-700' : 'text-slate-500')
                }
              >
                {r.detail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** '왜 이 기술이었나' — 배운 계기와 도입 이유, 그리고 써보니 알게 된 것 */
export function WhyTech({
  items,
}: {
  items: { tech: string; why: ReactNode; learned: ReactNode }[]
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
      {items.map((t) => (
        <div key={t.tech} className="flex flex-col border-t-2 border-accent-line pt-4">
          <h3 className="font-bold text-ink">{t.tech}</h3>
          <p className="mt-2 flex-1 text-base leading-relaxed text-slate-600">{t.why}</p>
          <div className="mt-4 rounded-md bg-slate-50 px-4 py-3 text-base leading-relaxed text-slate-600">
            <span className="font-bold text-accent-deep">써보니 → </span>
            {t.learned}
          </div>
        </div>
      ))}
    </div>
  )
}

/** 성과와 배운 점 — 페이지의 결론. 한 단 눌러 담은 마무리 박스와 큰 마침 문장 */
export function Retrospect({
  gains,
  questions,
  closing,
}: {
  gains: ReactNode[]
  questions: ReactNode[]
  closing: ReactNode
}) {
  return (
    <div className="rounded-md border-2 border-accent-line bg-accent-soft/50 px-6 py-8 sm:px-10 sm:py-10">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        <div>
          <h3 className="font-bold text-ink">이 프로젝트가 남긴 것</h3>
          <ul className="mt-4 space-y-2.5">
            {gains.map((g, i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed text-slate-700">
                <span className="shrink-0 font-bold text-accent">✓</span>
                <span className="min-w-0">{g}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-ink">마치고 나서 이어진 고민</h3>
          <ul className="mt-4 space-y-2.5">
            {questions.map((q, i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed text-slate-600">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                <span className="min-w-0">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-8 border-t border-accent-line pt-6 text-lg font-bold leading-relaxed text-ink sm:text-xl">
        {closing}
      </p>
    </div>
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
