import { Link } from 'react-router-dom'
import { CONTACT } from '../components/Layout'
import { Bullets, Tag } from '../components/ui'

/** 나는 어떤 사람인가: 자기소개서의 강점 세 가지를 압축 */
const VALUES = [
  {
    key: 'Why',
    title: '왜를 먼저 묻습니다',
    body: '마케팅 기획 때도 타겟이 왜 반응할지부터 따졌습니다. 개발에서는 그 답을 측정과 근거로 확인하고, 기술도 대안과 비교해 고릅니다.',
  },
  {
    key: 'Lead',
    title: '팀이 끝까지 완주하게',
    body: '두 번의 팀 프로젝트 모두 팀장을 맡았습니다. 문서와 컨벤션으로 기준을 먼저 세우고, 모두가 맡은 기능을 끝까지 완성하게 이끌었습니다.',
  },
  {
    key: 'Record',
    title: '기록을 다음 판단의 근거로',
    body: '회의록, 결정 로그, 트러블슈팅 90건으로 남기고, 새 방식이 나오면 기록과 비교해 더 나은 쪽을 고릅니다.',
  },
]

/** 개발 회고에서 인용: AI와 일할 때 스스로 던지는 질문 */
const AI_QUESTIONS = [
  'AI 없이도 이것을 구현할 수 있는가?',
  'AI 없이 나는 어디까지 할 수 있는가?',
  'AI가 주어진다면 어디까지 해낼 수 있는가?',
]

/** 학력, 경력 통합 타임라인 (시간순) */
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
    title: '(주) 플라잉에그: 4년 4개월',
    desc: '네이버 스마트스토어 두 곳 운영, SK가스 마케팅 대행',
    highlight: false,
  },
  {
    period: '2025.04 – 2025.10',
    title: 'Java 기반 백엔드 개발자 양성 과정: 최우수 팀 수료',
    desc: 'intelliMarket, Fantry 팀 프로젝트 진행',
    highlight: true,
  },
  {
    period: '2025.11 – 2026.04',
    title: '개선 방향 학습 / 자격증 준비',
    desc: '이전 프로젝트의 한계를 공부, SQLD 취득',
    highlight: false,
  },
  {
    period: '2026.05 – 2026.11',
    title: '청년취업사관학교 새싹(SeSAC) 영등포캠퍼스 8기',
    desc: 'MSA 웹 서비스 개발 과정, 미니 프로젝트 따숨, 최종 프로젝트 곳간',
    highlight: true,
    ongoing: true,
  },
]

/** 자격증 */
const CERTIFICATES = [
  { name: 'SQLD (SQL 개발자)', date: '2026.06', note: '한국데이터산업진흥원' },
  { name: 'JLPT N1', date: '2019.08', note: '일본어능력시험 최상위 급수' },
]

/** 핵심 역량: 프로젝트에서 실제로 부딪히며 배운 것 중심 */
const CORE_SKILLS: { title: string; desc: string[]; tags: string[]; from: string }[] = [
  {
    title: '클라우드 인프라와 운영',
    desc: [
      'Terraform으로 VPC, EKS, SNS/SQS, Lambda 구성',
      '클러스터를 매일 자동으로 만들고 지움 (GitOps 배포)',
      'IRSA로 파드별 최소 권한, k6 측정값으로 사이징',
    ],
    tags: ['AWS EKS', 'Terraform', 'Kubernetes / Helm', 'Argo CD'],
    from: '곳간에서 경험',
  },
  {
    title: '분산 환경의 정합성',
    desc: [
      '서비스 10개를 동기 호출 1홉 + 이벤트로 연결',
      '아웃박스, 멱등, 발생 시각 비교로 이벤트 정합성',
      '결제 취소는 선기록 후 호출, 모르면 조회로 대조',
    ],
    tags: ['MSA', 'SNS / SQS', 'Resilience4j', 'Saga / 보상'],
    from: '곳간에서 경험',
  },
  {
    title: '동시성 제어와 성능',
    desc: [
      'Redis Lua Script로 입찰 조회, 검증, 갱신을 한 번에',
      'Redis 예외 시 DB 락으로 전환 후 복귀',
      'k6로 동시성 버그 4개 발견, 채팅 왕복 1.95s → 87ms',
    ],
    tags: ['Redis / Lua Script', '비관적 락', 'WebSocket / STOMP', 'k6'],
    from: 'Fantry, 곳간에서 경험',
  },
  {
    title: '인증과 보안 설계',
    desc: [
      'AT는 메모리, RT는 HttpOnly 쿠키 + Redis',
      'jti 블랙리스트와 회원 단위 마커로 즉시 차단',
      'WebSocket 목적지 검사, 업로드 파일 형식 검사',
    ],
    tags: ['Spring Security', 'JWT / OAuth2', 'Keycloak', 'Redis TTL 설계'],
    from: 'Ddasoom, 곳간에서 경험',
  },
]

/** 기술 스택: 한 줄로 훑는 배지 목록 */
const STACKS: { group: string; items: string[] }[] = [
  {
    group: 'Backend',
    items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MyBatis', 'QueryDSL', 'Spring Legacy'],
  },
  {
    group: 'MSA',
    items: ['Spring Cloud Gateway', 'Resilience4j', 'Keycloak', 'SNS, SQS (아웃박스)', 'WebSocket / STOMP', 'SSE'],
  },
  {
    group: 'Database',
    items: ['MySQL', 'Oracle', 'Redis', 'DynamoDB', 'Flyway'],
  },
  {
    group: 'Cloud / DevOps',
    items: ['AWS (EKS / Lambda / S3 / Route 53)', 'Terraform', 'Docker', 'Kubernetes', 'Helm', 'GitHub Actions', 'Argo CD'],
  },
  {
    group: 'Observability / Test',
    items: ['Prometheus', 'Loki', 'Grafana', 'Zipkin', 'k6', 'SonarQube Cloud'],
  },
  {
    group: 'Frontend',
    items: ['HTML5 / CSS3','JavaScript (ES6+)', 'TypeScript', 'React', 'Vue 3', 'JSP / JSTL'],
  },
  {
    group: 'Tools / 협업',
    items: ['Git / GitHub', 'Claude Code', 'Swagger', 'Notion', 'Slack', 'IntelliJ', 'VS Code', 'Eclipse'],
  },
]

const PROJECTS = [
  {
    to: '/gotgan',
    period: '2026.10 – 2026.11',
    name: '곳간 (GOTGAN)',
    summary: 'MSA 멀티 스토어 오픈마켓: AWS 인프라, 결제, 정산, 관리자, 채팅',
    highlight:
      'EKS 위 서비스 10개, 결제와 이벤트 정합성, k6 측정 → 수정 → 재측정, 관리자 화면 모니터링',
    tags: ['AWS EKS / Terraform', 'MSA', 'SNS, SQS 아웃박스', 'k6 부하테스트'],
    badge: '대표 프로젝트',
  },
  {
    to: '/fantry',
    period: '2025.09 – 2025.10',
    name: 'Fantry',
    summary: '실시간 중고 경매 플랫폼: 실시간 경매 시스템 담당',
    highlight:
      'DB 직접 처리 → Redis Lua Script → DB Fallback → 큐 저장 순으로 고도화',
    tags: ['WebSocket / STOMP', 'Redis Lua Script', '동시성 제어', 'DB Fallback'],
    badge: null,
  },
  {
    to: '/ddasoom',
    period: '2026.06 – 2026.07',
    name: 'Ddasoom (따숨)',
    summary: '유기동물 임시보호 플랫폼: 팀장, 회원과 보안, 공통 모듈',
    highlight:
      'Spring Security 인증 설계: 토큰 저장 위치와 즉시 차단 결정 로그',
    tags: ['Spring Security', 'JWT', 'OAuth2', 'Redis'],
    badge: '팀장',
  },
  {
    to: '/intellimarket',
    period: '2025.07 – 2025.08',
    name: 'intelliMarket',
    summary: 'JSP 기반 SSR 쇼핑몰: 스토어 상품/주문 관리',
    highlight:
      'Spring Legacy와 JSP로 3단계 카테고리 설계, MyBatis N+1 개선',
    tags: ['Spring Legacy', 'MyBatis', 'N+1 개선', 'JSP SSR'],
    badge: null,
  },
  {
    to: '/aimpro',
    period: '2025.05',
    name: 'Aim Pro',
    summary: '반응속도 타겟 클릭 게임: 개발 1개월차 첫 개인 프로젝트',
    highlight:
      '라이브러리 없이 HTML, CSS, JS만으로 완성, 클래스 기반 타겟',
    tags: ['HTML / CSS / JS', '클래스 설계', '상태 관리'],
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
            AI가 코드를 쓰는 시간이 늘수록 구조를 이해하고 설계하는 능력이 중요하다고 봅니다.{' '}
            <br className="hidden sm:block" />
            AI 없이도, AI와 함께라도 제 몫을 해내는 백엔드 개발자를 목표로 합니다.
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

        {/* 개발 회고 인용: AI와 일하는 기준 */}
        <figure className="mt-12 rounded-md bg-slate-50 px-6 py-7 sm:px-8">
          <figcaption className="text-sm font-bold text-accent">개발 회고 중에서</figcaption>
          <ol className="mt-4 space-y-2">
            {AI_QUESTIONS.map((q, i) => (
              <li key={q} className="flex gap-3 text-lg font-bold leading-snug text-ink">
                <span className="shrink-0 text-accent">{i + 1}.</span>
                {q}
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl leading-relaxed text-slate-600">
            AI가 많은 일을 대신할수록 설계하고, 검증하고, 책임지는 사람이 더 필요하다고 봅니다. 그래서 AI에게는
            하지 말아야 할 것과 참고할 문서, 지킬 기준을 먼저 정해 준 뒤 맡깁니다.
          </p>
        </figure>

        {/* 학력, 경력 타임라인 */}
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
