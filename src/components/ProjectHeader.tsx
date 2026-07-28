import type { ReactNode } from 'react'
import { MetaItem, Tag } from './ui'

/** 프로젝트 상세 페이지 상단 공통 헤더 */
export default function ProjectHeader({
  name,
  tagline,
  description,
  meta,
  stacks,
  links,
}: {
  name: string
  tagline: string
  description: ReactNode
  meta: { label: string; value: ReactNode }[]
  stacks: string[]
  links?: { label: string; href: string }[]
}) {
  return (
    <div className="pt-12 pb-4">
      <p className="font-semibold text-blue-600">{tagline}</p>
      <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900">{name}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{description}</p>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-6 sm:grid-cols-4">
        {meta.map((m) => (
          <MetaItem key={m.label} label={m.label}>
            {m.value}
          </MetaItem>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {stacks.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      {links && links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-600"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
