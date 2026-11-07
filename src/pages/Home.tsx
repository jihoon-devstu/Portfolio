import { Link } from 'react-router-dom'
import { CONTACT } from '../components/Layout'
import { Bullets, Tag } from '../components/ui'

/** 가치관 — 이전 포트폴리오에서 직접 쓴 문장을 기반으로 정리 */
const VALUES = [
  {
    key: 'Why',
    title: '왜 이 기술인가',
    body: "단순히 '동작하는 코드'가 아닌, 왜 이 기술이 필요한지와 대안은 무엇인지, 트레이드오프를 고민합니다.",
  },
  {
    key: 'How',
    title: '어떻게 협업하는가',
    body: "노션, 코드리뷰 코멘트 등 기록 습관을 들이고 컨벤션을 설계하는 등 '체계적인 의사소통'을 지향합니다.",
  },
  {
    key: 'AI',
    title: '어떻게 AI와 일하는가',
    body: 'AI가 작성한 코드도 직접 읽고 검증한 뒤 책임집니다. 구조를 알아야 정확하게 지시할 수 있기에 도메인 · 서비스 · 인프라 구조를 이해하는 데 시간을 쓰고, 곳간에서는 리뷰 기준을 문서(하네스)로 정해 AI 코드리뷰에 적용했습니다.',
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
    desc: '이전 프로젝트가 남긴 한계의 개선 방향 학습, SQLD 취득',
    highlight: false,
  },
  {
    period: '2026.05 – 2026.11',
    title: '청년취업사관학교 새싹(SeSAC) 영등포캠퍼스 8기',
    desc: 'MSA 기반 웹 서비스 개발 과정 · 미니 프로젝트 따숨(Ddasoom), 최종 프로젝트 곳간(GOTGAN) 개발',
    highlight: true,
    ongoing: true,
  },
]

/** 자격증 */
const CERTIFICATES = [
  { name: 'SQLD (SQL 개발자)', date: '2026.06', note: '한국데이터산업진흥원' },
  { name: 'JLPT N1', date: '2019.08', note: '일본어능력시험 최상위 급수' },
]

/** 핵심 역량 — 프로젝트에서 실제로 부딪히며 배운 것 중심 */
const CORE_SKILLS: { title: string; desc: string[]; tags: string[]; from: string }[] = [
  {
    title: '클라우드 인프라와 운영',
    desc: [
      'Terraform으로 VPC · EKS · SNS/SQS · S3 · Lambda 구성, 매일 08:00 생성 · 22:00 삭제 자동화',
      'GitHub Actions → ECR → Argo CD GitOps 배포 흐름 위에서 운영',
      'IRSA · IMDSv2로 파드별 최소 권한, k6 측정값으로 힙 · DB 연결 · 레플리카 결정',
    ],
    tags: ['AWS EKS', 'Terraform', 'Kubernetes · Helm', 'Argo CD'],
    from: '곳간에서 경험',
  },
  {
    title: '분산 환경의 정합성',
    desc: [
      '서비스 10개를 1홉 동기 호출(타임아웃 · 서킷) + 이벤트로 연결',
      '아웃박스 · eventId 멱등 · 발생 시각 비교로 이벤트 유실 · 중복 · 순서 문제 처리',
      '결제 취소는 선기록 → PG 호출 → 확정, 결과를 모르면 PG 조회로 대조',
    ],
    tags: ['MSA', 'SNS · SQS', 'Resilience4j', 'Saga · 보상'],
    from: '곳간에서 경험',
  },
  {
    title: '동시성 제어와 성능',
    desc: [
      '입찰 조회·검증·갱신을 Redis Lua Script 단일 원자 연산으로 처리',
      'Redis 예외 시 DB 비관적 락으로 전환, 재동기화 성공 시 복귀',
      '부하테스트로 동시성 버그 4개 발견 → 수정 → 재측정 (동시 주문 500 오류 71 → 0)',
    ],
    tags: ['Redis · Lua Script', '비관적 락', 'WebSocket · STOMP', 'k6'],
    from: 'Fantry · 곳간에서 경험',
  },
  {
    title: '인증과 보안 설계',
    desc: [
      'AT는 프론트 메모리, RT는 HttpOnly 쿠키 + Redis, 재발급마다 RT 교체',
      'jti 블랙리스트 + 회원 단위 강제 로그아웃 마커로 즉시 차단',
      'WebSocket 전송 목적지 검사 · 업로드 파일 실제 형식 검사(Lambda)',
    ],
    tags: ['Spring Security', 'JWT · OAuth2', 'Keycloak', 'Redis TTL 설계'],
    from: 'Ddasoom · 곳간에서 경험',
  },
]

/** 기술 스택 — 한 줄로 훑는 배지 목록 */
const STACKS: { group: string; items: string[] }[] = [
  {
    group: 'Backend',
    items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MyBatis', 'QueryDSL', 'Spring Legacy'],
  },
  {
    group: 'MSA',
    items: ['Spring Cloud Gateway', 'Resilience4j', 'Keycloak', 'SNS · SQS (아웃박스)', 'WebSocket · STOMP', 'SSE'],
  },
  {
    group: 'Database',
    items: ['MySQL', 'Oracle', 'Redis', 'DynamoDB', 'Flyway'],
  },
  {
    group: 'Cloud · DevOps',
    items: ['AWS (EKS · Lambda · S3 · Route 53)', 'Terraform', 'Docker', 'Kubernetes', 'Helm', 'GitHub Actions', 'Argo CD'],
  },
  {
    group: 'Observability · Test',
    items: ['Prometheus', 'Loki', 'Grafana', 'Zipkin', 'k6', 'SonarQube Cloud'],
  },
  {
    group: 'Frontend',
    items: ['HTML5 · CSS3','JavaScript (ES6+)', 'TypeScript', 'React', 'Vue 3', 'JSP · JSTL'],
  },
  {
    group: 'Tools · 협업',
    items: ['Git · GitHub', 'Swagger', 'Notion', 'Slack', 'IntelliJ', 'VS Code', 'Eclipse'],
  },
]

const PROJECTS = [
  {
    to: '/gotgan',
    period: '2026.10 – 2026.11',
    name: '곳간 (GOTGAN)',
    summary: 'MSA 멀티 스토어 오픈마켓 — AWS 인프라 · 결제 · 정산 · 관리자 · 채팅',
    highlight:
      '서비스 10개를 Terraform 으로 만든 EKS 에 배포, 결제 · 이벤트 정합성 설계, k6 측정 → 수정 → 재측정 (동시 주문 500 오류 71 → 0)',
    tags: ['AWS EKS · Terraform', 'MSA', 'SNS · SQS 아웃박스', 'k6 부하테스트'],
    badge: '대표 프로젝트',
  },
  {
    to: '/fantry',
    period: '2025.09 – 2025.10',
    name: 'Fantry',
    summary: '실시간 중고 경매 플랫폼 — 실시간 경매 시스템 담당',
    highlight:
      'DB 직접 처리 → Redis Lua Script 동시성 제어 → DB Fallback → 큐 기반 일괄 저장 단계적 고도화',
    tags: ['WebSocket·STOMP', 'Redis Lua Script', '동시성 제어', 'DB Fallback'],
    badge: null,
  },
  {
    to: '/ddasoom',
    period: '2026.06 – 2026.07',
    name: 'Ddasoom (따숨)',
    summary: '유기동물 임시보호 플랫폼 — 팀장 · 회원/보안/공통모듈',
    highlight:
      'Spring Security 인증/인가 인프라 설계 — 토큰 저장 위치, 강제 로그아웃 마커 결정 로그 2건',
    tags: ['Spring Security', 'JWT', 'OAuth2', 'Redis'],
    badge: '팀장',
  },
  {
    to: '/intellimarket',
    period: '2025.07 – 2025.08',
    name: 'intelliMarket',
    summary: 'JSP 기반 SSR 쇼핑몰 — 스토어 상품/주문 관리',
    highlight:
      'Spring Legacy · JSP 환경에서 3단계 카테고리 설계, MyBatis N+1 개선 (연쇄 조회 → JOIN)',
    tags: ['Spring Legacy', 'MyBatis', 'N+1 개선', 'JSP SSR'],
    badge: null,
  },
  {
    to: '/aimpro',
    period: '2025.05',
    name: 'Aim Pro',
    summary: '반응속도 타겟 클릭 게임 — 개발 1개월차 첫 개인 프로젝트',
    highlight:
      '라이브러리 없이 HTML·CSS·JS만으로 완성 — 클래스 기반 타겟 설계, 게임 상태 관리',
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
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-600">
            AI 가 코드를 쓰는 시간이 늘수록 구조를 이해하고 설계하는 능력이 중요하다고 봅니다.{' '}
            <br className="hidden sm:block" />
            AI 활용 능력과 설계 능력을 함께 키우는 백엔드 개발자를 목표로 합니다.
          </p>
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
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {CORE_SKILLS.map((s) => (
            <div key={s.title} className="flex flex-col border-t-2 border-accent-line pt-4">
              <h3 className="text-lg font-bold text-ink">{s.title}</h3>
              <div className="mt-3 flex-1 text-base text-slate-600">
                <Bullets items={s.desc} />
              </div>
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
