import { Link } from 'react-router-dom'
import { CONTACT } from '../components/Layout'
import { Tag } from '../components/ui'

/** 가치관 — 이전 포트폴리오에서 직접 쓴 문장을 기반으로 정리 */
const VALUES = [
  {
    key: 'Why',
    title: '왜 이 기술인가',
    body: "단순히 '동작하는 코드'가 아닌, 왜 이 기술이 필요한지와 대안은 무엇인지, 트레이드오프를 끊임없이 고민합니다. ",
  },
  {
    key: 'How',
    title: '어떻게 협업하는가',
    body: "노션, 코드리뷰 코멘트 등 기록 습관을 들이고 컨벤션을 설계하는 등 '체계적인 의사소통'을 지향합니다.",
  },
  {
    key: 'Result',
    title: '결과',
    body: 'Why와 How를 바탕으로 팀원들과 성숙한 협업을 이루어냈고, 6개월의 부트캠프를 최우수 팀으로 수료했습니다.',
  },
]

/** 학력·경력 통합 타임라인 (시간순) */
const TIMELINE: {
  period: string
  title: string
  desc: string
  highlight: boolean
  ongoing?: boolean
}[] = [
  {
    period: '2015 – 2021',
    title: '한신대학교 일본학과 졸업',
    desc: '여의도고등학교 졸업(2015) 후 학사 취득',
    highlight: false,
  },
  {
    period: '2020.08 – 2024.12',
    title: '(주) 플라잉에그 — 4년 4개월',
    desc: '네이버 스마트스토어 두 곳 운영 · SK가스 마케팅 대행',
    highlight: false,
  },
  {
    period: '2025.04 – 2025.10',
    title: 'Java 기반 백엔드 개발자 양성 과정 — 최우수 팀 수료',
    desc: 'intelliMarket · Fantry 팀 프로젝트 진행',
    highlight: true,
  },
  {
    period: '2025.11 – 2026.04',
    title: '개선 방향 학습 · 자격증 준비',
    desc: '이전 프로젝트가 남긴 한계의 개선 방향 학습, SQLD·정보처리기사 준비',
    highlight: false,
  },
  {
    period: '2026.05 – 2026.11',
    title: '청년취업사관학교 새싹(SeSAC) 영등포캠퍼스 8기',
    desc: 'MSA 기반 웹 서비스 개발 과정 수강 중 · 첫 미니 프로젝트로 따숨(Ddasoom) 개발',
    highlight: true,
    ongoing: true,
  },
]

/** 자격증 */
const CERTIFICATES = [
  { name: 'SQLD (SQL 개발자)', date: '2026.06', note: '한국데이터산업진흥원' },
  { name: '정보처리기사', date: '필기 합격 · 실기 진행 중', note: '한국산업인력공단' },
  { name: 'JLPT N1', date: '2019.08', note: '일본어능력시험 최상위 급수' },
]

/** 핵심 역량 — 프로젝트에서 실제로 부딪히며 배운 것 중심 */
const CORE_SKILLS = [
  {
    title: '동시성 제어와 성능',
    desc: '실시간 경매 시스템 구현에서 동시성 제어가 필요하다는 것을 실감하였습니다. 데이터의 정합성이 깨지지 않도록 안전하지만 성능 좋게 처리하는 방법을 공부해 적용했습니다.',
    tags: ['Redis · Lua Script', '비관적 락', 'WebSocket · STOMP', 'Batch Insert'],
    from: 'Fantry에서 경험',
  },
  {
    title: '인증과 보안 설계',
    desc: '로그인이 되게 만드는 것에서 멈추지 않고 토큰의 저장 위치 , 인증/인가 체계를 고민하며 개발하였습니다.',
    tags: ['Spring Security', 'JWT · OAuth2', 'Redis TTL 설계'],
    from: 'Ddasoom에서 경험',
  },
  {
    title: '데이터 모델링과 쿼리',
    desc: '목록 하나를 부르는데 쿼리가 여러 번 나가는 문제를 겪은 뒤로, 코드가 만들어내는 SQL을 눈으로 확인하는 습관이 생겼습니다.',
    tags: ['MySQL · ERD 설계', 'JPA · QueryDSL', 'MyBatis', 'N+1 개선'],
    from: 'intelliMarket · Ddasoom에서 경험',
  },
]

/** 기술 스택 — 한 줄로 훑는 배지 목록 */
const STACKS: { group: string; items: string[] }[] = [
  {
    group: 'Backend',
    items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MyBatis', 'QueryDSL', 'Spring Legacy'],
  },
  {
    group: 'Database · Infra',
    items: ['MySQL', 'Oracle', 'Redis', 'WebSocket · STOMP', 'Flyway'],
  },
  {
    group: 'Frontend',
    items: ['HTML5 · CSS3','JavaScript (ES6+)', 'Vue 3', 'React', 'JSP · JSTL'],
  },
  {
    group: 'Tools · 협업',
    items: ['Git · GitHub', 'Swagger', 'Notion', 'Slack', 'IntelliJ', 'VS Code', 'Eclipse'],
  },
]

const PROJECTS = [
  {
    to: '/fantry',
    period: '2025.09 – 2025.10',
    name: 'Fantry',
    summary: '실시간 중고 경매 플랫폼 — 실시간 경매 시스템 담당',
    highlight:
      'DB 트랜잭션 기반 구현에서 출발해 Redis 기반 동시성 제어(Lua Script), DB Fallback, Batch Insert까지 단계적으로 고도화했습니다.',
    tags: ['WebSocket·STOMP', 'Redis Lua Script', '동시성 제어', 'DB Fallback'],
    badge: '대표 프로젝트',
  },
  {
    to: '/ddasoom',
    period: '2026.06 – 2026.07',
    name: 'Ddasoom (따숨)',
    summary: '유기동물 임시보호 플랫폼 — 팀장 · 회원/보안/공통모듈',
    highlight:
      '팀장으로서 인증/인가 인프라를 맡아, 회원가입부터 로그인/로그아웃/강제탈퇴까지 설계했습니다.',
    tags: ['Spring Security', 'JWT 로테이션', 'OAuth2', 'Redis'],
    badge: '팀장',
  },
  {
    to: '/intellimarket',
    period: '2025.07 – 2025.08',
    name: 'intelliMarket',
    summary: 'JSP 기반 SSR 쇼핑몰 — 스토어 상품/주문 관리',
    highlight:
      'Spring Legacy와 JSP 환경에서 3단계 카테고리 구조를 설계하고 N+1 문제를 개선한 첫 팀 프로젝트입니다.',
    tags: ['Spring Legacy', 'MyBatis', 'N+1 개선', 'JSP SSR'],
    badge: null,
  },
  {
    to: '/aimpro',
    period: '2025.05',
    name: 'Aim Pro',
    summary: '반응속도 타겟 클릭 게임 — 개발 1개월차 첫 개인 프로젝트',
    highlight:
      '라이브러리 없이 순수 HTML·CSS·JS만으로, 배운 것만 가지고 처음부터 끝까지 완성해 본 첫 결과물입니다.',
    tags: ['HTML · CSS · JS', '클래스 설계', '상태 관리'],
    badge: '첫 개인 프로젝트',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col-reverse items-start gap-10 py-20 sm:py-24 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent">
            Backend Developer
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            "Why"와 "How"를
            <br />
            끊임없이 생각하는 개발자, 구지훈입니다.
          </h1>
          <div className="mt-9 flex flex-wrap items-center gap-7">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent"
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-semibold text-ink underline decoration-slate-300 decoration-2 underline-offset-8 transition-colors hover:text-accent"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
        <img
          src="/images/profile.png"
          alt="구지훈 증명사진"
          className="w-40 shrink-0 rounded-md border border-slate-200 shadow-sm sm:w-48 md:w-52"
        />
      </section>

      {/* About */}
      <section className="border-t border-slate-200 py-14">
        <p className="text-lg font-extrabold tracking-[0.2em] text-accent">01</p>
        <h2 className="mt-1 text-2xl font-bold text-ink">About</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {VALUES.map((v) => (
            <div key={v.key} className="border-t-2 border-accent-line pt-4">
              <div className="text-sm font-bold text-accent">“ {v.key} ”</div>
              <h3 className="mt-1.5 font-bold text-ink">{v.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{v.body}</p>
            </div>
          ))}
        </div>

        {/* 전직 서사 — 커머스 운영자에서 백엔드 개발자로 */}
        <div className="mt-10 border-l-2 border-accent-line pl-5 sm:pl-6">
          <p className="max-w-3xl leading-relaxed text-slate-700">
            개발 전 4년 4개월, SK가스 마케팅 대행과 네이버 스마트스토어 두 곳을 운영하며 {' '}
            <b>회사 협업 경험을 쌓았습니다.</b> 
          </p>
        </div>

        {/* 학력·경력 타임라인 */}
        <div className="mt-12">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-slate-400">History</h3>
          <ol className="relative ml-2 space-y-7 border-l-2 border-slate-200 pl-6">
            {TIMELINE.map((t) => (
              <li key={t.title} className="relative">
                <span
                  className={
                    'absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white ' +
                    (t.highlight ? 'bg-accent ring-2 ring-accent-line' : 'bg-slate-300')
                  }
                />
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-400">
                  {t.period}
                  {t.ongoing && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-bold text-accent-deep">
                      진행 중
                    </span>
                  )}
                </div>
                <div className={'mt-0.5 font-bold ' + (t.highlight ? 'text-accent-deep' : 'text-ink')}>
                  {t.title}
                </div>
                <p className="mt-0.5 text-base text-slate-600">{t.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 자격증 */}
        <div className="mt-12">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
            Certificates
          </h3>
          <ul className="max-w-2xl divide-y divide-slate-100 border-y border-slate-200">
            {CERTIFICATES.map((c) => (
              <li key={c.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-3">
                <span className="font-semibold text-ink">{c.name}</span>
                <span className="text-sm text-slate-500">{c.note}</span>
                <span className="ml-auto shrink-0 text-sm font-medium text-slate-400">{c.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-slate-200 py-14">
        <p className="text-lg font-extrabold tracking-[0.2em] text-accent">02</p>
        <h2 className="mt-1 text-2xl font-bold text-ink">Skills</h2>
        <p className="mt-2 text-slate-500">프로젝트에서 실제로 부딪히며 배운 것 중심입니다.</p>

        {/* 핵심 역량 */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {CORE_SKILLS.map((s) => (
            <div key={s.title} className="flex flex-col border-t-2 border-accent-line pt-4">
              <h3 className="text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 flex-1 text-base leading-relaxed text-slate-600">{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <Tag key={t} accent>
                    {t}
                  </Tag>
                ))}
              </div>
              <div className="mt-3 text-xs font-semibold text-slate-400">✓ {s.from}</div>
            </div>
          ))}
        </div>

        {/* 기술 스택 */}
        <div className="mt-10 border-y border-slate-200">
          {STACKS.map((g, i) => (
            <div
              key={g.group}
              className={
                'flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-6 ' +
                (i > 0 ? 'border-t border-slate-100' : '')
              }
            >
              <div className="w-36 shrink-0 text-sm font-bold text-slate-500">{g.group}</div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="border-t border-slate-200 py-14">
        <p className="text-lg font-extrabold tracking-[0.2em] text-accent">03</p>
        <h2 className="mt-1 text-2xl font-bold text-ink">Projects</h2>
        <p className="mt-2 text-slate-500">
          왜 시작했고, 무엇이 어려웠고, 어떻게 해결했는지를 과정 중심으로 정리했습니다.
        </p>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {PROJECTS.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="group block py-7 transition-colors hover:bg-accent-soft/40 sm:px-3"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-accent-deep">
                  {p.name}
                </h3>
                {p.badge && (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-white">
                    {p.badge}
                  </span>
                )}
                <span className="ml-auto text-sm text-slate-400">{p.period}</span>
                <span className="text-accent transition-transform group-hover:translate-x-1">→</span>
              </div>
              <p className="mt-1 font-medium text-slate-600">{p.summary}</p>
              <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-500">
                {p.highlight}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag key={t} accent>
                    {t}
                  </Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

    </>
  )
}
