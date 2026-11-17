import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import {
  Bullets,
  Expand,
  Figure,
  Retrospect,
  RoleSplit,
  Section,
  SectionNav,
  StatCard,
  Sub,
  WhyTech,
} from '../components/ui'

/** 요청 한 건이 지나가는 길: 내가 맡은 서비스만 강조 */
function ArchDiagram() {
  const box = 'rounded-md border border-slate-300 bg-white px-4 py-3 text-center'
  const arrow = <div className="text-center text-xl text-slate-300">↓</div>
  const services: { name: string; mine?: boolean }[] = [
    { name: 'user' },
    { name: 'store' },
    { name: 'product' },
    { name: 'order (Saga)' },
    { name: 'review' },
    { name: 'payment', mine: true },
    { name: 'settlement', mine: true },
    { name: 'admin', mine: true },
    { name: 'chat', mine: true },
  ]
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-2">
        <div className={box}>
          <div className="font-semibold text-ink">브라우저 → Vercel(React) → Route 53, NLB(443)</div>
          <div className="mt-1 text-[0.9rem] text-slate-500">도메인, 인증서, 고정 IP는 상시 유지하고 클러스터만 매일 재생성</div>
        </div>
        {arrow}
        <div className={box}>
          <div className="font-semibold text-ink">gateway</div>
          <div className="mt-1 text-[0.9rem] text-slate-500">토큰 검증, 사용자 헤더 주입, 요청 제한, 타임아웃</div>
        </div>
        {arrow}
        <div className="rounded-md border border-slate-300 bg-white p-4">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {services.map((s) => (
              <div
                key={s.name}
                className={
                  'rounded px-2 py-2 text-center text-sm font-semibold ' +
                  (s.mine ? 'bg-accent-soft text-accent-deep' : 'bg-slate-100 text-slate-600')
                }
              >
                {s.name}
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-slate-500">
            동기 호출은 1홉(타임아웃, 서킷), 나머지는 이벤트 | <b className="text-accent-deep">색칠한 칸이 내 담당</b>
          </p>
        </div>
        {arrow}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className={box}>
            <div className="font-semibold text-ink">데이터</div>
            <div className="mt-1 text-[0.9rem] text-slate-500">MySQL 1대에 서비스별 스키마, Redis</div>
          </div>
          <div className={box}>
            <div className="font-semibold text-ink">이벤트</div>
            <div className="mt-1 text-[0.9rem] text-slate-500">아웃박스 → SNS → SQS(+DLQ) → 서비스, Lambda</div>
          </div>
          <div className={box}>
            <div className="font-semibold text-ink">운영</div>
            <div className="mt-1 text-[0.9rem] text-slate-500">Terraform, Argo CD, Prometheus, Loki, Zipkin, Grafana</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** 부하테스트 1차 → 2차 비교 표 */
function LoadTestTable() {
  const rows: { item: string; before: string; fix: string; after: string }[] = [
    { item: '재고 10개에 100명 동시 주문', before: '성공 10, 초과 판매 0', fix: '그대로', after: '성공 10, 초과 판매 0' },
    { item: '동시 주문 500 오류', before: '71 / 100', fix: '주문번호 원자 발급', after: '0 / 100' },
    { item: '채팅 왕복 p95 (500 연결)', before: '1.95s', fix: '스레드 풀 분리, 힙 상한', after: '87ms' },
    { item: 'DB 연결 최대', before: '151(상한), 거부 1', fix: '연결 수 계산, 상한 300', after: '171 / 300, 거부 0' },
    { item: '30분 혼합 (동시 200명)', before: 'p95 94ms, 500 76건', fix: '위 수정 + 이중화', after: 'p95 88ms, 500 0건' },
    { item: '파드 삭제 중 구매', before: '미측정', fix: '레플리카 2, 노드 분산, PDB', after: '5xx 0건 (10만 요청)' },
  ]
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200">
      <table className="w-full min-w-[640px] text-left text-base">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-500">
            <th className="px-4 py-3 font-semibold text-ink">항목</th>
            <th className="px-4 py-3 font-semibold">1차 (11/4)</th>
            <th className="px-4 py-3 font-semibold">고친 것</th>
            <th className="px-4 py-3 font-semibold text-accent-deep">2차 (11/6)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r.item}>
              <td className="px-4 py-3 font-medium text-slate-700">{r.item}</td>
              <td className="px-4 py-3 text-slate-600">{r.before}</td>
              <td className="px-4 py-3 text-slate-500">{r.fix}</td>
              <td className="px-4 py-3 font-semibold text-accent-deep">{r.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Gotgan() {
  return (
    <>
      <ProjectHeader
        name="곳간 (GOTGAN)"
        tagline="Project 01 | MSA 멀티 스토어 오픈마켓"
        description={
          <>
            작은 가게가 입점해 상품을 팔고 주간 정산을 받기까지의 흐름을 Spring Boot 마이크로서비스
            10개로 만들어 AWS EKS에 배포한 최종 프로젝트입니다.
            <br />
            팀장으로 <b>AWS 인프라(Terraform)와 결제, 정산, 관리자, 채팅 서비스를 담당</b>했고, 기능
            완성 뒤에는 QA와 부하테스트, 관리자 화면의 실시간 모니터링까지 맡았습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2026.10 – 2026.11 (6주)' },
          { label: '팀 구성', value: '3명 (팀장, 서비스 수직 분할)' },
          { label: '담당', value: 'AWS 인프라, 결제, 정산, 관리자, 채팅' },
          { label: '과정', value: 'SeSAC 영등포캠퍼스 8기 최종' },
        ]}
        stacks={[
          'Java 21',
          'Spring Boot 4.1',
          'Spring Cloud Gateway',
          'Resilience4j',
          'MySQL 8.4',
          'Redis 7',
          'Keycloak',
          'AWS EKS',
          'Lambda',
          'SNS/SQS',
          'Terraform',
          'Docker',
          'Helm',
          'Argo CD',
          'GitHub Actions',
          'Prometheus',
          'Loki',
          'Grafana',
          'Zipkin',
          'React + TypeScript',
          'k6',
        ]}
        links={[
          { label: 'Backend GitHub', href: 'https://github.com/sesac-final-1/gotgan-backend' },
          { label: 'Frontend GitHub', href: 'https://github.com/sesac-final-1/gotgan-frontend' },
          { label: 'Infra GitHub', href: 'https://github.com/sesac-final-1/gotgan-config' },
        ]}
      />

      <SectionNav
        items={[
          { id: 'overview', label: '어떤 프로젝트인가' },
          { id: 'role', label: '나의 자리' },
          { id: 'docs', label: '문서와 목업' },
          { id: 'architecture', label: '전체 구성' },
          { id: 'design', label: '맡은 설계' },
          { id: 'loadtest', label: '부하테스트' },
          { id: 'ops', label: '운영 화면' },
          { id: 'troubleshooting', label: '트러블슈팅' },
          { id: 'collab', label: 'AI 활용과 협업' },
          { id: 'retrospect', label: '회고와 배운 점' },
        ]}
      />

      <Section id="overview" no="01" title="어떤 프로젝트인가">
        <div className="max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>
              <b>무엇을</b>: 입점부터 주간 정산까지 한 흐름 (필수 기능 85건 중 82건, 화면 54개)
            </li>
            <li>
              <b>목표 1</b>: 서비스 하나가 멈춰도 나머지 기능은 계속 동작 (장애 격리)
            </li>
            <li>
              <b>목표 2</b>: 주문, 결제, 정산은 중간에 끊겨도 어긋나지 않게 (정합성)
            </li>
          </ul>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard value="10개" label="Spring Boot 서비스 + Lambda 5개" />
          <StatCard value="489개" label="머지된 PR (내 PR 241개)" />
          <StatCard value="2,174개" label="테스트 케이스" />
          <StatCard value="90건" label="트러블슈팅 기록" />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/gotgan/service-main.png"
            alt="곳간 쇼핑몰 메인 화면"
            caption="배포된 쇼핑몰 메인"
            imgClassName="h-64 object-cover object-top"
          />
          <Figure
            src="/images/gotgan/service-store.png"
            alt="곳간 판매자 스토어 화면"
            caption="판매자 스토어: 입점한 가게마다 자기 스토어 운영"
            imgClassName="h-64 object-cover object-top"
          />
        </div>
      </Section>

      <Section
        id="role"
        no="02"
        title="팀에서 나의 자리"
        subtitle="서비스는 세로로 나눠 각자 백엔드부터 화면까지 맡고, 공통 영역은 한 사람씩 맡았습니다."
      >
        <RoleSplit
          roles={[
            {
              role: '인프라, 결제, 정산, 관리자, 채팅',
              detail:
                'Terraform 인프라, payment, settlement, admin, chat, Lambda 3개, QA와 부하테스트, 모니터링 화면',
              mine: true,
            },
            {
              role: '인증, 주문, CI/CD',
              detail: 'Keycloak, gateway 인가, user, order(Saga), review, GitHub Actions, Argo CD',
            },
            {
              role: '상품, 스토어, 관측성',
              detail: 'product, store, Prometheus, Loki, Grafana, Zipkin, 공통 로깅',
            },
          ]}
        />
      </Section>

      <Section
        id="docs"
        no="03"
        title="문서와 목업으로 방향 맞추기"
        subtitle="가이드 문서 사이트와 목업을 직접 만들어 팀의 기준으로 삼고, 개발하며 실제에 맞게 고쳐 나갔습니다."
      >
        <Bullets
          items={[
            <>
              <b>가이드 문서 3종</b>
              <Sub
                items={[
                  '가이드라인(왜): 설계 배경과 결정 이유, 22개 장',
                  '스펙(무엇을): 도메인별 요구사항 145건',
                  '컨벤션(어떻게): 코드, DB, 프론트, 인프라 규칙',
                ]}
              />
            </>,
            <>
              <b>결정은 바로 문서로</b>
              <Sub
                items={[
                  '1차 멘토링 뒤 "장애 격리와 자동 복구를 보여 주는 MSA"로 개정',
                  '첫 작성 뒤 98번 갱신, 팀원도 자기 영역을 직접 수정',
                ]}
              />
            </>,
            <>
              <b>목업 56개 화면</b>
              <Sub
                items={[
                  '프론트에 이식한 뒤 API로 하나씩 교체',
                  '마지막에는 목업을 실제 화면 기준으로 다시 맞춤',
                  '상표, 초상권 문제가 있는 이미지 75장 교체',
                ]}
              />
            </>,
            <>
              <b>AI 작업의 기준으로도 사용</b>
              <Sub items={['가이드라인과 컨벤션을 AI 컨텍스트로 넣어 사람과 AI가 같은 규칙을 따름']} />
            </>,
          ]}
        />
        <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold">
          <a
            href="https://gotganguide.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            가이드 문서 사이트 ↗
          </a>
          <a
            href="https://mockup-page-sable.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            목업 페이지 ↗
          </a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Figure
            src="/images/gotgan/guide-home.png"
            alt="가이드 문서 사이트 홈"
            caption="가이드 문서 사이트 홈"
            imgClassName="h-48 object-cover object-top"
          />
          <Figure
            src="/images/gotgan/guide-guideline.png"
            alt="가이드라인 문서"
            caption="가이드라인: 질문별 결론 요약"
            imgClassName="h-48 object-cover object-top"
          />
          <Figure
            src="/images/gotgan/mockup-admin.png"
            alt="목업 관리자 대시보드"
            caption="목업: 관리자 운영 대시보드"
            imgClassName="h-48 object-cover object-top"
          />
        </div>
      </Section>

      <Section
        id="architecture"
        no="04"
        title="전체 구성"
        subtitle="요청 한 건이 지나가는 길입니다. 인프라 전체는 Terraform 코드로 매일 08:00에 만들고 22:00에 지웁니다."
      >
        <ArchDiagram />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/gotgan/aws-architecture.svg"
            alt="곳간 AWS 전체 구성도"
            caption="AWS 전체 구성도 (클릭하면 원본)"
            imgClassName="h-72 object-cover object-top bg-white"
          />
          <Figure
            src="/images/gotgan/infra-network.svg"
            alt="곳간 네트워크 구성도"
            caption="네트워크 구성: VPC, 서브넷, NAT, NLB (클릭하면 원본)"
            imgClassName="h-72 object-cover object-top bg-white"
          />
        </div>
      </Section>

      <Section
        id="design"
        no="05"
        title="내가 맡은 부분의 설계"
        subtitle="무엇을 선택했고, 그 대가로 무엇을 감수했는지 정리했습니다."
      >
        <WhyTech
          items={[
            {
              tech: 'Terraform, 매일 재생성',
              why: <>코드로 만든 인프라를 매일 08:00 생성, 22:00 삭제 (운영비 월 72만 → 45만 원)</>,
              learned: <>서버에서 고친 것은 다음 날 사라짐 → 모든 수정을 코드와 문서로 남김</>,
            },
            {
              tech: '결제 (포트원 V2)',
              why: <>금액 3중 대조, 웹훅 서명 검증, 취소는 선기록 후 호출</>,
              learned: (
                <>
                  취소 API에 멱등 키가 없음 → 결과를 모르면 조회로 대조{' '}
                  <a href="#troubleshooting" className="font-semibold text-accent hover:underline">
                    → 트러블슈팅 01
                  </a>
                </>
              ),
            },
            {
              tech: '이벤트 (아웃박스, 멱등)',
              why: <>업무 데이터와 이벤트를 한 트랜잭션에 기록, eventId로 중복 방지 (정산에 적용)</>,
              learned: <>SQS는 순서를 보장하지 않음 → 발생 시각을 비교해 늦게 온 옛 이벤트 무시</>,
            },
            {
              tech: '관리자 = 조합 계층',
              why: <>데이터를 복제하지 않고 여러 서비스의 내부 API를 모아 보여 줌</>,
              learned: <>의존 서비스가 많아짐 → 서킷 브레이커, 실패한 영역만 "이용 불가" 표시</>,
            },
            {
              tech: '실시간 (SSE, WebSocket)',
              why: <>알림은 SSE, 채팅은 STOMP, 파드가 여러 개여도 Redis Pub/Sub로 전달</>,
              learned: <>보내는 목적지(SEND)까지 검사해야 남의 방에 메시지를 못 넣음 (AI 리뷰로 발견)</>,
            },
          ]}
        />
      </Section>

      <Section
        id="loadtest"
        no="06"
        title="부하테스트: 측정하고, 고치고, 다시 측정"
        subtitle="운영과 같은 경로로 k6 시나리오 7개를 돌리고, 찾은 문제를 고쳐 같은 시나리오로 다시 쟀습니다."
      >
        <LoadTestTable />
        <div className="mt-6 max-w-3xl">
          <Bullets
            items={[
              <>
                <b>동시에 와야만 깨지는 버그 4개</b>를 찾아 담당별로 수정, 전부 재측정으로 확인
                <Sub items={['주문번호 충돌, 가입 고아 계정, DB 연결 상한, 채팅 데드락']} />
              </>,
              <>
                <b>측정값으로 설정 결정</b>
                <Sub items={['힙 상한 75% → 33%, DB 연결 상한 300', '구매 경로 서비스 6개는 레플리카 2, 노드 분산, PDB']} />
              </>,
              <>
                <b>한계와 장애 격리</b>
                <Sub
                  items={[
                    '리뷰 서비스가 먼저 무너졌지만 오류는 리뷰와 문의에서만, 쇼핑은 계속됨',
                    '노드 하나를 비우는(drain) 시험은 로그인 복구에 약 5분 → 남은 과제',
                    '부하 중 롤링 배포: 요청 40,758건 중 실패 0건 (팀 결과)',
                  ]}
                />
              </>,
            ]}
          />
        </div>
      </Section>

      <Section
        id="ops"
        no="07"
        title="운영 화면: 부하테스트와 실시간 모니터링"
        subtitle="관리자 시스템 상태 화면에서 부하를 걸고, 장애가 어디서 났는지 바로 보이게 했습니다."
      >
        <Bullets
          items={[
            <>
              <b>부하테스트 패널</b>
              <Sub
                items={[
                  '버튼 하나로 클러스터 안에 k6 Job 생성 → 게이트웨이로 부하',
                  'k6 지표를 Prometheus로 보내 1초마다 그래프로 표시',
                  '실행 중 슬라이더로 동시 사용자 수 조절',
                ]}
              />
            </>,
            <>
              <b>실시간 모니터링</b>
              <Sub
                items={[
                  '부하가 없어도 실제 트래픽 기준으로 항상 표시',
                  '5개 탭: 총 현황, 서비스별, 호출, 장애, 분석',
                  '호출이나 장애 줄을 누르면 서비스 사이 구간별 소요 시간(트레이스)',
                ]}
              />
            </>,
            <>
              <b>이상 표시</b>
              <Sub items={['에러율이 0을 넘거나 응답이 급등하면 그래프 배경을 빨갛게', '5xx 응답과 ERROR 로그는 목록에서 빨간 줄']} />
            </>,
            <>
              <b>장애 주입 API</b>
              <Sub
                items={[
                  '서비스 파드 내리기, 구매 경로 서비스 5개를 1개씩 한 번에 내리기',
                  '화면 배치와 장애 시연 영역은 박지연 님, API와 부하테스트와 모니터링은 직접 구현',
                ]}
              />
            </>,
          ]}
        />
        <Figure
          src="/images/gotgan/system-loadtest.jpg"
          alt="시스템 상태 화면 부하테스트 실행 중"
          caption="부하테스트 실행 중 (위: 부하 생성기 그래프, 아래: 실제 트래픽 모니터링)"
          className="mt-6"
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/gotgan/monitor-calls.jpg"
            alt="실시간 모니터링 호출 탭과 서비스 필터"
            caption="호출 탭: 서비스 필터, 상태 확인 요청은 서버에서 제외"
          />
          <Figure
            src="/images/gotgan/monitor-services.jpg"
            alt="실시간 모니터링 서비스별 탭"
            caption="서비스별 탭: 초당 요청, 평균 응답, 에러율, DB 연결"
          />
          <Figure
            src="/images/gotgan/monitor-trace.jpg"
            alt="호출 목록에서 연 트레이스"
            caption="트레이스: gateway에서 product까지 구간별 소요 시간"
          />
          <Figure
            src="/images/gotgan/monitor-analysis-status.jpg"
            alt="분석 탭과 서비스 상태"
            caption="분석 탭과 서비스 상태 카드"
          />
          <Figure
            src="/images/gotgan/admin-dashboard.jpg"
            alt="관리자 운영 대시보드"
            caption="관리자 운영 대시보드 (조합 계층)"
          />
        </div>
        <div className="mt-6">
          <Expand summary="만들며 결정한 것">
            <Bullets
              items={[
                'k6 사용자 수 조절 API는 인증이 없음 → 파드 IP로만 부르고 NetworkPolicy로 제한',
                '실행 중 사용자 수 변경이 k6 v2에서 빠짐 → 이미지를 1.8.3으로 고정',
                'k6 파드에는 서비스 라벨을 붙이지 않아 서비스 상태 집계에 섞이지 않게 함',
                '에러율은 5xx만 셈 (4xx는 업무상 정상 응답)',
                '장애와 복구가 늦게 보이지 않도록 지표 수집 간격 15초 → 5초',
                '상태 확인 요청이 호출 목록을 덮는 문제 → 서버에서 제외하고 서비스 필터 추가',
              ]}
            />
          </Expand>
        </div>
      </Section>

      <Section id="troubleshooting" no="08" title="트러블슈팅">
        <div className="space-y-8">
          <TroubleCard
            no={1}
            title='결제 취소 응답이 끊기면 "환불됐는데 결제 완료"로 영원히 남는다'
            problem={
              <>
                포트원은 취소를 처리했는데 응답이 3초 안에 오지 않음
                <Sub items={['payment는 502, DB는 결제 완료 그대로', '재시도하면 포트원이 "이미 취소됨"으로 거절 → 502 무한 반복']} />
              </>
            }
            cause={
              <>
                <Sub flush items={['포트원 취소 API에 멱등 키가 없음', '"외부 성공 → 내 DB 기록" 순서라 그 사이에 끊기면 기록 없는 취소', '"이미 취소됨"도 일반 실패로 처리']} />
              </>
            }
            solution={
              <>
                <b>선기록(PENDING) → 포트원 호출 → 확정</b>
                <Sub items={['결과를 모르면 포트원 조회로 취소 내역과 대조', '끝까지 모르면 409, 복구 스케줄러가 1분 주기로 마무리']} />
              </>
            }
            result={<>응답 끊김과 DB 기록 실패를 넣은 테스트에서 정상 처리, 포트원 취소 호출은 1번만</>}
            detail={
              <Bullets
                items={[
                  '기준: 외부 결제 API는 멱등 키부터 확인하고, 없으면 부르기 전에 기록',
                  '같은 점검에서 함께 고친 것: 금액 불일치 자동 환불 누락, 취소 요청 상태를 완료로 기록하던 문제',
                ]}
              />
            }
          />

          <TroubleCard
            no={2}
            title="MSA에서는 서비스 수 × 풀 크기가 곧 DB 연결 수"
            problem={
              <>
                <Sub flush items={['트래픽이 거의 없어도 MySQL 연결 104 / 151', '부하 중 상한 151 도달, 새 연결 1건 거부', '파드를 늘리면 새 파드가 DB에 못 붙는 구조']} />
              </>
            }
            cause={
              <>
                <Sub flush items={['서비스 풀 합계 110 + 설정이 없던 Keycloak 기본 풀 100', 'DB를 서비스별로 나눴어도 인스턴스는 하나라 한도를 함께 씀']} />
              </>
            }
            solution={
              <>
                숫자부터 올리지 않고 규칙을 정함
                <Sub items={['상한 = Σ(풀 × 레플리카) + Keycloak + 여유 20', 'Keycloak 풀 30으로 제한, 상한 250 → 이중화 뒤 300']} />
              </>
            }
            result={<>부하 중 최대 171 / 300, 거부 0</>}
          />
        </div>
      </Section>

      <Section
        id="collab"
        no="09"
        title="AI 활용과 협업"
        subtitle="AI와 함께 구현하고 리뷰하되, 기준은 먼저 문서로 정하고 결과는 직접 검증했습니다."
      >
        <Bullets
          items={[
            <>
              <b>AI와 함께 구현</b>
              <Sub
                items={[
                  '세 저장소에 첫날부터 AI 작업 규칙(CLAUDE.md) 배치: 추측 금지, 최소 변경, 검증 기준',
                  '가이드라인, 컨벤션, API 계약 문서를 컨텍스트로 사용',
                  '테스트, 품질 게이트, 팀원 리뷰를 통과해야만 반영',
                ]}
              />
            </>,
            <>
              <b>하네스 기반 AI 코드리뷰</b>
              <Sub
                items={[
                  '리뷰 기준과 근거 규칙(파일:줄, 심각도, 담당)을 문서로 정함',
                  '세 저장소를 6개 영역으로 나눠 리뷰 → 지적 79건',
                  '지금 고칠 것 24건, 실서비스라면 할 것 55건으로 분류',
                  '심각도 높은 2건은 코드를 다시 확인한 뒤 수정',
                ]}
              />
            </>,
            <>
              <b>품질 게이트</b>
              <Sub items={['PR마다 팀원 승인 1명 + 새 코드 커버리지 80%, 중복 3%', '백엔드는 테스트 코드가 운영 코드보다 많음']} />
            </>,
            <>
              <b>실계정 전체 QA</b>
              <Sub items={['실계정 6개, 테스트 결제, 실제 메일로 49개 항목 확인', '지적 32건 중 31건 수정']} />
            </>,
            <>
              <b>기록</b>
              <Sub items={['트러블슈팅 90건을 "증상 → 원인 → 해결 → 검증 → 교훈" 형식으로', '공유 문서와 결정 요청 문서를 나눠 관리']} />
            </>,
          ]}
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500">AI가 관여한 곳</p>
            <Sub items={['설계 초안, 컨벤션 작성', '문서, 회의록 정리', '코드 작성과 테스트', '작업 공유와 협업 요청']} />
          </div>
          <div className="rounded-md border border-accent-line bg-accent-soft/40 p-5">
            <p className="text-sm font-bold text-accent-deep">사람이 맡은 일</p>
            <Sub items={['서비스 아키텍처 설계', '업무 분장, 요구사항 정리', '서버 관리', '결과물 첨삭과 검증']} />
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500">원칙: 맡기되 방치하지 않기</p>
      </Section>

      <Section id="retrospect" no="10" title="회고와 배운 점">
        <blockquote className="mb-8 border-l-4 border-accent pl-5 text-xl font-bold leading-snug text-ink sm:text-2xl">
          설계에 공들인 만큼 단단해졌고, 유연하게 바꾸는 힘도 그만큼 중요했던 6주
        </blockquote>
        <Retrospect
          gains={[
            <>
              <b>클라우드 인프라를 코드로</b>: Terraform으로 만들고 매일 재생성하며 아키텍처 기본기를 다짐
            </>,
            <>
              <b>분산 환경의 정합성</b>: 결과를 모르는 외부 호출은 먼저 기록하고 대조
            </>,
            <>
              <b>측정 기반 판단</b>: 재측정이 아니라고 하면 판단을 버림
            </>,
            <>
              <b>AI를 쓰는 방식</b>: 기준을 문서로 정해 맡기고, 결과는 확인한 뒤 반영
            </>,
          ]}
          questions={[
            <>에이전트 기반 자동화와 품질 게이트처럼, LLM을 활용한 아키텍처 직접 설계</>,
            <>"AI 없이도 이만큼 해낼 수 있는가"에 답할 수 있도록 기본기 다지기</>,
            <>단일로 둔 MySQL, Redis, Keycloak, NAT를 운영 기준으로 이중화</>,
            <>이번에 뺀 저장 데이터 암호화와 CDC 적용</>,
          ]}
          closing={
            <>
              팀원들이 개선점을 먼저 제안해 준 덕분에, 나눠 맡은 결과물이 아니라 각자의 색이 담긴
              결과물을 함께 만들었습니다.
            </>
          }
        />
      </Section>
    </>
  )
}
