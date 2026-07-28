import { Link } from 'react-router-dom'
import { CONTACT } from '../components/Layout'
import { Figure, Tag } from '../components/ui'

const VALUES = [
  {
    key: 'Why',
    title: '왜 이 기술인가',
    body: '단순히 동작하는 코드가 아니라, 왜 이 기술이 필요한지·대안은 무엇인지 트레이드오프를 끊임없이 고민합니다.',
  },
  {
    key: 'How',
    title: '어떻게 협업하는가',
    body: '기록으로 협업합니다 — 코드 리뷰로 경계 케이스를 지적하고, 규칙 변경은 문서 PR로만 반영했습니다. (PR 100건 운영)',
  },
  {
    key: 'Result',
    title: '결과로 증명',
    body: 'Why와 How를 바탕으로 팀과 함께 빠르게 성장하며, 6개월 부트캠프를 최우수 팀으로 수료했습니다.',
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
    desc: 'SK가스 마케팅 대행과 함께 네이버 스마트스토어(여성의류·핸드폰케이스) 운영, 인스타그램 마케팅까지 — 커머스를 판매자·운영자로 직접 겪은 경험',
    highlight: false,
  },
  {
    period: '2025.04 – 2025.10',
    title: 'Java 기반 백엔드 개발자 양성 과정 — 최우수 팀 수료',
    desc: '개발자로 전향 — intelliMarket · Fantry 팀 프로젝트를 진행하며 백엔드 전 과정을 경험',
    highlight: true,
  },
  {
    period: '2025.11 – 2026.04',
    title: '개선 방향 학습 · 자격증 준비',
    desc: '이전 프로젝트의 한계로 남긴 지점들(메시지 브로커, 배치 실패 재처리 등)의 개선 방향 학습과 SQLD·정보처리기사 취득 준비, 취업 준비를 병행',
    highlight: false,
  },
  {
    period: '2026.05 – 2026.11',
    title: '청년취업사관학교 새싹(SeSAC) 영등포캠퍼스 8기',
    desc: 'AWS와 AI를 활용한 MSA 기반 웹 서비스 개발 과정 수강 중 — 첫 미니 프로젝트로 따숨(Ddasoom) 개발',
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

/** 핵심 역량 — 프로젝트에서 실제로 증명한 것 중심 */
const CORE_SKILLS = [
  {
    title: '동시성 제어 · 성능',
    desc: 'Redis Lua Script 원자 연산, DB 비관적 락, In-memory Queue + Batch Insert로 실시간 입찰 시스템을 설계하고, K6 부하 테스트로 정합성을 검증했습니다.',
    tags: ['Redis · Lua Script', '비관적 락', 'WebSocket · STOMP', 'Batch Insert'],
    from: 'Fantry에서 증명',
  },
  {
    title: '인증 · 보안 설계',
    desc: 'Spring Security 필터 체인과 JWT 이중 토큰 전략(로테이션·블랙리스트·강제 로그아웃)을 설계했습니다. 경계 상황을 정의하고 트레이드오프를 문서로 남기며 구현합니다.',
    tags: ['Spring Security', 'JWT · OAuth2', 'Redis TTL 설계'],
    from: 'Ddasoom에서 증명',
  },
  {
    title: '데이터 모델링 · 쿼리 최적화',
    desc: 'ERD 설계와 계층 정규화, 그리고 N+1 문제의 진단과 개선(MyBatis JOIN + 중첩 resultMap, JPA Fetch Join)까지 — SQL이 실제로 어떻게 실행되는지 확인하며 개발합니다.',
    tags: ['MySQL · ERD 설계', 'JPA · QueryDSL', 'MyBatis', 'N+1 개선'],
    from: 'intelliMarket · Ddasoom에서 증명',
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
    items: ['JavaScript (ES6+)', 'Vue 3', 'React', 'JSP · JSTL', 'HTML5 · CSS3'],
  },
  {
    group: 'Tools · 협업',
    items: ['Git · GitHub', 'Swagger', 'Notion', 'Slack', 'IntelliJ'],
  },
]

const PROJECTS = [
  {
    to: '/fantry',
    period: '2025.09 – 2025.10',
    name: 'Fantry',
    summary: '실시간 중고 경매 플랫폼 — 실시간 경매 시스템 총괄',
    highlight:
      'WebSocket 실시간 입찰, Redis Lua Script 동시성 제어, DB Fallback 자가 치유, 큐 기반 Batch Insert까지. 성능·동시성·장애 대응을 정면으로 다룬 대표 프로젝트입니다.',
    tags: ['WebSocket·STOMP', 'Redis Lua Script', '동시성 제어', 'DB Fallback', 'Batch Insert'],
    badge: '대표 프로젝트',
  },
  {
    to: '/ddasoom',
    period: '2026.06 – 2026.07',
    name: 'Ddasoom (따숨)',
    summary: '유기동물 임시보호 플랫폼 — 팀장 · 회원/보안/공통모듈',
    highlight:
      '청년취업사관학교 새싹(SeSAC) 과정의 첫 미니 프로젝트. 팀장으로서 토큰 탈취·동시 재발급 같은 경계 상황까지 정의하며 인증 인프라를 설계하고, 모든 결정의 근거를 문서로 남겼습니다.',
    tags: ['Spring Security', 'JWT 로테이션', 'OAuth2', 'Redis', '공통 모듈 설계'],
    badge: '팀장',
  },
  {
    to: '/intellimarket',
    period: '2025.07 – 2025.08',
    name: 'intelliMarket',
    summary: 'JSP 기반 SSR 쇼핑몰 — 스토어 상품/주문 관리',
    highlight:
      '루트-탑-서브 3단계 정규화 카테고리 구조를 설계하고, 중첩 select로 인한 N+1 문제를 JOIN + 중첩 resultMap으로 개선했습니다. 백엔드 기본기를 다진 첫 팀 프로젝트입니다.',
    tags: ['Spring Legacy', 'MyBatis', '3단계 카테고리 설계', 'N+1 개선', 'JSP SSR'],
    badge: null,
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col-reverse items-start gap-10 py-20 sm:py-24 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="font-semibold text-blue-600">Backend Developer</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            "Why"와 "How"를
            <br />
            끊임없이 생각하는 개발자, 구지훈입니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            동작하는 코드에서 멈추지 않고 성능·동시성·장애 상황까지 파고듭니다. 실시간 경매의 동시성
            제어부터 인증 인프라 설계까지, 문제를 정의하고 트레이드오프를 따져 해결한 과정을
            기록했습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-slate-700"
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-600"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
        <img
          src="/images/profile.png"
          alt="구지훈 증명사진"
          className="w-40 shrink-0 rounded-2xl border border-slate-200 shadow-sm sm:w-48 md:w-52"
        />
      </section>

      {/* About */}
      <section className="border-t border-slate-100 py-14">
        <h2 className="text-2xl font-bold text-slate-900">About</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.key} className="rounded-xl border border-slate-200 p-6">
              <div className="text-sm font-bold text-blue-600">“ {v.key} ”</div>
              <h3 className="mt-2 font-bold text-slate-900">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{v.body}</p>
            </div>
          ))}
        </div>

        {/* 전직 서사 — 커머스 운영자에서 백엔드 개발자로 */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-6">
          <p className="leading-relaxed text-slate-700">
            개발 전, 4년 4개월간 <b>서비스를 사용자이자 운영자로 직접 겪었습니다.</b> 네이버
            스마트스토어 두 곳(여성의류·핸드폰케이스)을 운영하며 상품 등록부터 주문 처리, 인스타그램
            마케팅까지 플랫폼 위에서 일하는 사람의 하루를 몸으로 배웠고, 그 경험은 쇼핑몰
            (intelliMarket)과 경매 플랫폼(Fantry)을 개발할 때 화면 뒤의 사용자를 아는 상태로
            설계하는 힘이 됐습니다. 도메인이 무엇이든 <b>그 서비스를 쓰는 사람의 맥락부터 이해하고
            개발하는 것</b> — 그것이 저의 출발점입니다.
          </p>
        </div>

        {/* 학력·경력 타임라인 */}
        <div className="mt-10">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-slate-400">History</h3>
          <ol className="relative ml-2 space-y-7 border-l-2 border-slate-200 pl-6">
            {TIMELINE.map((t) => (
              <li key={t.title} className="relative">
                <span
                  className={
                    'absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white ' +
                    (t.highlight ? 'bg-blue-600 ring-2 ring-blue-200' : 'bg-slate-300')
                  }
                />
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-400">
                  {t.period}
                  {t.ongoing && (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">
                      진행 중
                    </span>
                  )}
                </div>
                <div className={'mt-0.5 font-bold ' + (t.highlight ? 'text-blue-700' : 'text-slate-900')}>
                  {t.title}
                </div>
                <p className="mt-0.5 text-[15px] text-slate-600">{t.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 자격증 */}
        <div className="mt-10">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-slate-400">
            Certificates
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {CERTIFICATES.map((c) => (
              <div
                key={c.name}
                className="flex items-baseline justify-between gap-3 rounded-lg border border-slate-200 px-4 py-3"
              >
                <div>
                  <div className="font-semibold text-slate-900">{c.name}</div>
                  {c.note && <div className="mt-0.5 text-sm text-slate-500">{c.note}</div>}
                </div>
                <div className="shrink-0 text-sm font-medium text-slate-400">{c.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-slate-100 py-14">
        <h2 className="text-2xl font-bold text-slate-900">Skills</h2>
        <p className="mt-2 text-slate-500">써 본 기술의 나열이 아니라, 프로젝트에서 실제로 증명한 역량을 중심으로 정리했습니다.</p>

        {/* 핵심 역량 */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {CORE_SKILLS.map((s) => (
            <div key={s.title} className="flex flex-col rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{s.desc}</p>
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
        <div className="mt-8 rounded-xl border border-slate-200">
          {STACKS.map((g, i) => (
            <div
              key={g.group}
              className={
                'flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 ' +
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
      <section className="border-t border-slate-100 py-14">
        <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
        <p className="mt-2 text-slate-500">
          왜 시작했고, 무엇이 어려웠고, 어떻게 해결했는지 — 과정 중심으로 정리했습니다.
        </p>
        <div className="mt-6 space-y-5">
          {PROJECTS.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="block rounded-xl border border-slate-200 p-6 transition-all hover:border-blue-400 hover:shadow-md sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                {p.badge && (
                  <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
                    {p.badge}
                  </span>
                )}
                <span className="ml-auto text-sm text-slate-400">{p.period}</span>
              </div>
              <p className="mt-1 font-medium text-slate-600">{p.summary}</p>
              <p className="mt-3 leading-relaxed text-slate-600">{p.highlight}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t} accent>
                    {t}
                  </Tag>
                ))}
              </div>
              <div className="mt-4 text-sm font-semibold text-blue-600">자세히 보기 →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bonus — Aim Pro */}
      <section className="border-t border-slate-100 py-14">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Bonus · 개발의 시작점</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">
            개발 1개월차 개인 프로젝트
          </span>
        </div>
        <div className="mt-6 rounded-xl border border-slate-200 p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-slate-900">Aim Pro</h3>
            <span className="text-sm text-slate-400">2025.05 · 개인 프로젝트</span>
          </div>
          <p className="mt-1 font-medium text-slate-600">
            라이브러리 없이 순수 HTML · CSS · JavaScript로만 만든 에임 트레이닝 게임
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">
            개발을 시작한 지 한 달, 배운 것만으로 무엇을 만들 수 있는지 확인하고 싶어 만들었습니다.
            숫자 순서대로 타겟을 클릭해 기록을 겨루는 게임으로 — 프레임워크의 도움 없이 상태 관리,
            객체 설계, DOM 제어를 전부 직접 구현했습니다. 배운 것만으로 처음부터 끝까지 완성해 본 첫
            경험입니다.
          </p>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-slate-700">
            <li className="flex gap-2.5">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span>
                <b>ES6 Class로 Target 객체 설계</b> — 생성·클릭 검증·소멸을 객체 단위로 캡슐화하고,
                순서가 맞을 때만 제거·틀리면 빨간색 피드백을 주는 검증 로직을 각 인스턴스에 부여
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span>
                <b>상태 플래그 기반 게임 상태 전이</b> — 시작/일시정지/재개/초기화/종료를 상태
                변수 조합으로 제어하고, 상태에 따라 버튼 활성/비활성을 관리 (이후 배우게 될 '상태
                머신' 개념을 스스로 고민한 흔적)
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span>
                <b>타겟 역순 생성으로 겹침 문제 해결</b> — 타겟이 겹칠 때 낮은 번호가 항상 위에
                오도록 큰 번호부터 역순으로 DOM에 추가해, 클릭 불가능한 상황을 원천 차단
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span>
                <b>10ms 단위 스톱워치와 기록 보드</b> — setInterval 기반 타이머, 난이도 8단계(타겟
                10~80개), 회차별 기록 누적까지 게임 한 사이클 완성
              </span>
            </li>
          </ul>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Figure
              src="/images/aimpro/gameplay.png"
              alt="Aim Pro 게임 플레이 화면"
              caption="게임 플레이 — 숫자 순서대로 타겟 클릭, 스톱워치 기록"
            />
            <Figure
              src="/images/aimpro/records.png"
              alt="Aim Pro 기록 보드"
              caption="회차별 기록 보드 — 난이도와 클리어 타임 누적"
            />
          </div>
        </div>
      </section>
    </>
  )
}
