import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import {
  Bullets,
  Figure,
  Retrospect,
  RoleSplit,
  Section,
  SectionNav,
  StatCard,
  WhyTech,
} from '../components/ui'

/** 요청 한 건이 지나가는 길 — 내가 맡은 서비스만 강조 */
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
          <div className="font-semibold text-ink">브라우저 → Vercel(React) → Route 53 · NLB(443)</div>
          <div className="mt-1 text-sm text-slate-500">도메인 · 인증서 · 고정 IP 는 상시 유지, 클러스터만 매일 재생성</div>
        </div>
        {arrow}
        <div className={box}>
          <div className="font-semibold text-ink">gateway</div>
          <div className="mt-1 text-sm text-slate-500">Keycloak 토큰 검증 · 사용자 헤더 주입 · 요청 제한 · 타임아웃</div>
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
            동기 호출은 1홉 + 타임아웃 · 서킷, 나머지는 이벤트 · <b className="text-accent-deep">강조 = 내 담당</b>
          </p>
        </div>
        {arrow}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className={box}>
            <div className="font-semibold text-ink">데이터</div>
            <div className="mt-1 text-sm text-slate-500">MySQL 1대 · 서비스별 스키마, Redis</div>
          </div>
          <div className={box}>
            <div className="font-semibold text-ink">이벤트</div>
            <div className="mt-1 text-sm text-slate-500">아웃박스 → SNS → SQS(+DLQ) → 서비스 · Lambda</div>
          </div>
          <div className={box}>
            <div className="font-semibold text-ink">운영</div>
            <div className="mt-1 text-sm text-slate-500">Terraform · Argo CD · Prometheus · Loki · Zipkin → Grafana</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** 부하테스트 1차 → 2차 비교 표 */
function LoadTestTable() {
  const rows: { item: string; before: string; fix: string; after: string }[] = [
    { item: '재고 10개에 100명 동시 주문', before: '성공 10 · 초과 판매 0', fix: '—', after: '성공 10 · 초과 판매 0' },
    { item: '동시 주문 500 오류', before: '71 / 100', fix: '주문번호 원자 발급', after: '0 / 100' },
    { item: '채팅 왕복 p95 (500 연결)', before: '1.95s', fix: '스레드 풀 분리 · 힙 상한', after: '87ms' },
    { item: 'DB 연결 최대', before: '151(상한) · 거부 1', fix: '연결 수 계산 · 상한 300', after: '171 / 300 · 거부 0' },
    { item: '30분 혼합 (동시 200명)', before: 'p95 94ms · 500 76건', fix: '위 수정 + 이중화', after: 'p95 88ms · 500 0 / 50만 요청' },
    { item: '파드 삭제 중 구매', before: '미측정', fix: '레플리카 2 · 노드 분산 · PDB', after: '5xx 0 / 10만 요청' },
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
        tagline="Project 01 · MSA 멀티 스토어 오픈마켓"
        description={
          <>
            작은 가게가 입점해 상품을 팔고 주간 정산을 받기까지의 흐름을 Spring Boot 마이크로서비스
            10개로 만들어 AWS EKS 에 배포한 최종 프로젝트입니다.
            <br />
            <b>AWS 인프라(Terraform)와 결제 · 정산 · 관리자 · 채팅 서비스를 담당</b>했고, 기능 완성
            뒤에는 QA 와 부하테스트를 맡아 측정 → 수정 → 재측정을 진행했습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2026.10 – 2026.11 (6주)' },
          { label: '팀 구성', value: '3명 (서비스 수직 분할)' },
          { label: '담당', value: 'AWS 인프라 · 결제 · 정산 · 관리자 · 채팅' },
          { label: '과정', value: 'SeSAC 영등포캠퍼스 8기 최종' },
        ]}
        stacks={[
          'Java 21',
          'Spring Boot 4.1',
          'Spring Cloud Gateway',
          'Resilience4j',
          'MySQL 8.4 · Redis 7',
          'Keycloak',
          'AWS EKS · Lambda · SNS/SQS',
          'Terraform',
          'Docker · Helm · Argo CD',
          'GitHub Actions',
          'Prometheus · Loki · Grafana · Zipkin',
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
          { id: 'architecture', label: '전체 구성' },
          { id: 'design', label: '맡은 설계' },
          { id: 'loadtest', label: '부하테스트' },
          { id: 'troubleshooting', label: '트러블슈팅' },
          { id: 'collab', label: 'AI 리뷰 · 협업' },
          { id: 'retrospect', label: '성과와 배운 점' },
        ]}
      />

      <Section id="overview" no="01" title="어떤 프로젝트인가">
        <div className="max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>
              <b>무엇을</b> · 구매 · 판매자센터 · 관리자 콘솔 · 1:1 채팅 · 실시간 알림 · 주간 정산까지
              입점부터 정산까지 한 흐름
            </li>
            <li>
              <b>목표 1</b> · 서비스 하나가 멈춰도 나머지 기능은 계속 동작 (장애 격리)
            </li>
            <li>
              <b>목표 2</b> · 주문 · 결제 · 정산처럼 돈이 걸린 흐름은 중간에 끊겨도 어긋나지 않게
              (정합성)
            </li>
          </ul>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard value="10개" label="Spring Boot 서비스 + Lambda 5개" />
          <StatCard value="417개" label="머지된 PR (내 PR 189개)" />
          <StatCard value="1,902개" label="테스트 케이스" />
          <StatCard value="62건" label="트러블슈팅 기록" />
        </div>
      </Section>

      <Section
        id="role"
        no="02"
        title="팀에서 나의 자리"
        subtitle="서비스를 세로로 나눠 백엔드 · DB · 화면까지 각자 끝까지 맡고, 인프라 · CI/CD · 관측성 같은 공통 영역은 한 사람씩 맡았습니다."
      >
        <RoleSplit
          roles={[
            {
              role: '인프라 · 결제 · 정산 · 관리자 · 채팅',
              detail:
                'Terraform(VPC · EKS · ECR · SNS/SQS · S3 · DynamoDB · Route 53) · 클러스터 매일 생성/삭제 자동화 · payment · settlement · admin(조합 계층 · SSE 알림) · chat(WebSocket) · 메일 · 업로드 검사 Lambda · QA · 부하테스트',
              mine: true,
            },
            {
              role: '인증 · 주문 · CI/CD',
              detail: 'Keycloak · gateway 인가 · user · order(Saga) · review · GitHub Actions · Argo CD',
            },
            {
              role: '상품 · 스토어 · 관측성',
              detail: 'product · store · Prometheus · Loki · Grafana · Zipkin · 공통 로깅',
            },
          ]}
        />
      </Section>

      <Section
        id="architecture"
        no="03"
        title="전체 구성"
        subtitle="요청 한 건이 지나가는 길입니다. 인프라 전체는 Terraform 코드로 매일 08:00 에 만들고 22:00 에 지웁니다."
      >
        <ArchDiagram />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/gotgan/aws-architecture.svg"
            alt="곳간 AWS 전체 구성도"
            caption="AWS 전체 구성도 · 클릭하면 원본"
            imgClassName="h-72 object-cover object-top bg-white"
          />
          <Figure
            src="/images/gotgan/infra-network.svg"
            alt="곳간 네트워크 구성도"
            caption="네트워크 구성 (VPC · 서브넷 · NAT · NLB) · 클릭하면 원본"
            imgClassName="h-72 object-cover object-top bg-white"
          />
        </div>
      </Section>

      <Section
        id="design"
        no="04"
        title="내가 맡은 설계"
        subtitle="무엇을 선택했고, 그 대가로 무엇을 감수했는지 정리했습니다."
      >
        <WhyTech
          items={[
            {
              tech: 'Terraform · 매일 재생성',
              why: (
                <>
                  VPC · EKS · 노드 · SNS/SQS 를 코드로 만들고, EventBridge Scheduler 로 매일 08:00
                  생성 · 22:00 삭제. 개발 운영비 월 약 72만 → 45만 원
                </>
              ),
              learned: (
                <>
                  서버에 들어가 고친 것은 다음 날 사라짐 → 모든 수정을 코드와 문서로 남기게 됨.
                  데이터는 매일 시드로 복원
                </>
              ),
            },
            {
              tech: '결제 (포트원 V2)',
              why: (
                <>
                  금액 3중 대조(주문 · 결제 준비 · 포트원 실제 금액) + 웹훅 서명 검증. 취소는 선기록 →
                  포트원 호출 → 확정
                </>
              ),
              learned: (
                <>
                  포트원 취소 API 에 멱등 키가 없음 → 결과를 모르면 포트원 조회로 대조하고 복구
                  스케줄러가 마무리{' '}
                  <a href="#troubleshooting" className="font-semibold text-accent hover:underline">
                    → 트러블슈팅 01
                  </a>
                </>
              ),
            },
            {
              tech: '이벤트 (아웃박스 · 멱등)',
              why: (
                <>
                  업무 데이터와 이벤트를 같은 트랜잭션에 기록(아웃박스), 받는 쪽은 eventId 로 중복
                  처리 방지
                </>
              ),
              learned: (
                <>
                  SNS + SQS 표준 큐는 순서를 보장하지 않음 → 발생 시각 비교 UPDATE 한 문장으로 늦게 온
                  옛 이벤트를 무시 (정산 지급이 계속 보류되던 문제)
                </>
              ),
            },
            {
              tech: '관리자 = 조합 계층',
              why: (
                <>
                  관리자 화면은 여러 서비스의 데이터를 한곳에 모아 봄 → 데이터를 복제하지 않고 내부
                  API 를 모아 보여 주는 서비스로 분리
                </>
              ),
              learned: (
                <>의존하는 서비스가 많아짐 → 서킷 브레이커 + 실패한 영역만 "이용 불가"로 표시하는 부분 응답</>
              ),
            },
            {
              tech: '실시간 (SSE · WebSocket)',
              why: (
                <>
                  알림 센터는 SSE, 1:1 채팅은 WebSocket(STOMP). 파드가 2개 이상이어도 전달되도록 Redis
                  Pub/Sub 로 중계
                </>
              ),
              learned: (
                <>
                  연결 · 구독뿐 아니라 보내는 목적지(SEND)도 검사해야 남의 방에 메시지를 넣을 수 없음
                  (AI 코드리뷰로 발견 → 수정)
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section
        id="loadtest"
        no="05"
        title="부하테스트 — 측정하고, 고치고, 다시 측정"
        subtitle="운영과 같은 경로(Route 53 → NLB → gateway)로 k6 시나리오 7개를 돌리고, 찾은 문제를 고쳐 같은 시나리오로 다시 쟀습니다."
      >
        <LoadTestTable />
        <div className="mt-6 max-w-3xl">
          <Bullets
            items={[
              <>
                서버 부족이 아니라 <b>동시에 와야만 깨지는 버그 4개</b>(주문번호 충돌 · 가입 고아 계정 ·
                DB 연결 상한 · 채팅 데드락)를 찾아 담당별로 나눠 고치고, 전부 재측정으로 확인
              </>,
              <>
                측정 결과로 값을 정함 — 힙 상한 75% → 33%, DB 연결 상한 300, 구매 경로 서비스 6개
                레플리카 2 · 노드 분산 · PDB
              </>,
            ]}
          />
        </div>
      </Section>

      <Section id="troubleshooting" no="06" title="트러블슈팅">
        <div className="space-y-8">
          <TroubleCard
            no={1}
            title='결제 취소 응답이 끊기면 "환불됐는데 결제 완료"로 영원히 남는다'
            problem={
              <>
                포트원은 취소를 처리했는데 응답이 3초 안에 오지 않으면 payment 는 502, DB 는 결제 완료
                그대로. 복구 스케줄러가 재시도하면 포트원은 "이미 취소됨"으로 거절 →{' '}
                <b>502 가 영원히 반복</b>.
              </>
            }
            cause={
              <>
                포트원 취소 API 에 멱등 키가 없는데, 코드가 "외부 성공 → 내 DB 기록" 순서라 그 사이에
                끊기면 기록 없는 취소가 생김. 재시도 때의 거절도 일반 실패로 처리.
              </>
            }
            solution={
              <>
                <b>선기록(PENDING) → 포트원 호출 → 확정</b> 3단계로 변경. 결과를 모르면 포트원 결제
                조회의 취소 내역과 대조, "이미 취소됨"은 실패가 아니라 대조 대상으로 처리. 끝까지 모르면
                409 를 돌려주고 복구 스케줄러가 1분 주기로 마무리.
              </>
            }
            result={
              <>
                응답 끊김 · DB 기록 실패를 주입한 통합 테스트에서 재요청 시 대조로 정상 처리, 포트원
                취소 호출은 1번만.
              </>
            }
            detail={
              <p>
                외부 결제 API 는 먼저 "멱등 키가 있는가"를 명세에서 확인하고, 없으면 부르기 전에 먼저
                기록해 끊겼을 때 무엇으로 복구할지 정해 둔다는 기준을 세웠습니다. 같은 점검에서 금액
                불일치 자동 환불 누락 · 취소 요청 상태를 완료로 기록하던 문제도 함께 고쳤습니다.
              </p>
            }
          />

          <TroubleCard
            no={2}
            title='"커넥션 풀 포화"라는 내 판단은 틀렸다 — 채팅 왕복 3초'
            problem={
              <>
                채팅 데드락을 고친 뒤 재측정하자 500 연결 왕복 p95 가 약 3초. 1차 측정 뒤에는 "chat 의
                커넥션 풀 포화"라고 판단했었음.
              </>
            }
            cause={
              <>
                재측정에서 풀 대기는 0 → 판단을 버리고 스레드 덤프를 확인. 2스레드짜리 알림용 풀이
                유일한 비동기 실행기 빈이라 Spring Boot 자동 설정이 <b>WebSocket 메시지 처리 채널에도
                그 풀을 씌우고</b> 있었음.
              </>
            }
            solution={
              <>
                알림 풀을 타입으로 자동 주입되지 않게(<code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">defaultCandidate = false</code>)
                바꾸고 이름으로만 주입. 수정 전 실패 · 후 통과하는 재현 테스트 추가.
              </>
            }
            result={<>500 연결 왕복 p95 1.95s → <b>87ms</b>.</>}
            detail={
              <p>
                채팅을 고치자 관리자 서비스가 받는 알림이 늘며 OOMKilled 가 드러났습니다. 힙 사용량은
                상한보다 한참 아래였지만 힙 상한 75% 로 커밋이 늘어 힙 밖 메모리와 합쳐 limit 을 넘은
                것이었고, 힙 상한을 33%(admin 41%)로 낮춰 재시작 0 을 확인했습니다. 병목 하나를 풀면
                다음 약점이 드러나므로 고친 뒤에는 반드시 다시 잽니다.
              </p>
            }
          />

          <TroubleCard
            no={3}
            title="MSA 에서는 서비스 수 × 풀 크기가 곧 DB 연결 수"
            problem={
              <>
                트래픽이 거의 없는 시간에도 MySQL 연결 104 / 151. 부하테스트 중에는 상한 151 에 도달해
                새 연결 1건 거부. 파드 재시작이나 레플리카 추가 때 <b>새 파드가 DB 에 못 붙는 구조</b>.
              </>
            }
            cause={
              <>
                서비스 풀 합계 110 + 설정이 없던 Keycloak 의 기본 풀 최대 100. 서비스별로 DB 를 나눴지만
                인스턴스는 하나라 연결 한도를 함께 씀.
              </>
            }
            solution={
              <>
                바로 숫자를 올리지 않고 규칙부터 정함 — <b>상한 = Σ(풀 × 레플리카) + Keycloak + 여유
                20</b>. Keycloak 풀 30 으로 제한, 상한 250 → 이중화 뒤 300.
              </>
            }
            result={<>부하 중 최대 171 / 300 · 거부 0.</>}
          />

          <TroubleCard
            no={4}
            title="권한을 주지 않은 파드가 노드의 AWS 권한을 쓰고 있었다"
            problem={
              <>
                파드별 AWS 권한(IRSA)을 시험하다가, 권한을 주지 않은 파드에서도 노드의 IAM 역할이
                조회됨. 서비스별 최소 권한 설계가 무력화된 상태.
              </>
            }
            cause={
              <>
                EKS 모듈 기본값(IMDS hop limit 2) 때문에 컨테이너에서도 노드 메타데이터에 접근해 노드
                자격 증명을 받을 수 있었음.
              </>
            }
            solution={<>노드 메타데이터는 IMDSv2 만 · hop limit 1 로 막고, 파드의 AWS 권한은 IRSA 로만 부여.</>}
            result={<>권한 없는 파드는 자격 증명 없음, IRSA 16개 조합(허용 · 거부) 전부 기대대로 동작.</>}
            detail={
              <p>
                권한을 준 파드가 되는지보다, 권한을 주지 않은 파드가 무엇을 할 수 있는지를 먼저 시험해야
                한다는 것을 배웠습니다.
              </p>
            }
          />
        </div>
      </Section>

      <Section
        id="collab"
        no="07"
        title="AI 코드리뷰와 협업"
        subtitle="AI 를 리뷰어로 쓰되, 기준을 먼저 정하고 결과는 근거를 직접 확인했습니다."
      >
        <Bullets
          items={[
            <>
              <b>하네스 기반 AI 전체 코드리뷰</b>: 리뷰 기준(백엔드 · 프론트 · 인프라 · MSA) · 범위 ·
              근거 규칙(파일:줄 · 심각도 · 담당)을 문서로 정하고 세 저장소를 영역 6개로 나눠 리뷰. 지적
              79건을 "지금 고칠 것 24 / 실서비스라면 할 것 55"로 분류, 🔴 2건은 코드를 다시 열어 확인한
              뒤 수정
            </>,
            <>
              <b>품질 게이트</b>: 모든 PR 은 팀원 승인 1명 + SonarQube 새 코드 커버리지 80% · 중복 3%
              통과 후 main 반영. 백엔드는 테스트 코드 줄 수가 운영 코드보다 많음
            </>,
            <>
              <b>실계정 전체 QA</b>: 실계정 6개 · 토스 테스트 결제 · 실제 메일 수신으로 49항목 확인 →
              지적 32건을 담당별로 나눠 31건 수정
            </>,
            <>
              <b>기록</b>: 트러블슈팅 62건을 "증상 → 원인 → 해결 → 검증 → 교훈" 한 형식으로 남기고,
              공유 문서와 결정 요청 문서를 나눠 관리
            </>,
          ]}
        />
      </Section>

      <Section id="retrospect" no="08" title="성과와 배운 점">
        <Retrospect
          gains={[
            <>
              <b>클라우드 인프라를 코드로</b> — VPC 부터 EKS · 이벤트 · 서버리스까지 Terraform 으로
              만들고 매일 재생성하며 운영
            </>,
            <>
              <b>분산 환경의 정합성</b> — 아웃박스 · 멱등 · 순서 규칙, 결과를 모르는 외부 호출은 먼저
              기록하고 대조
            </>,
            <>
              <b>측정 기반 판단</b> — 부하테스트 수치로 힙 · DB 연결 · 레플리카 값을 정하고, 재측정이
              아니라고 하면 판단을 버림
            </>,
            <>
              <b>AI 를 쓰는 방식</b> — 기준을 문서로 정해 맡기고, 결과는 근거를 확인한 뒤 반영
            </>,
          ]}
          questions={[
            <>
              비용 때문에 MySQL · Redis · Keycloak · NAT 가 단일 구성. 실제 운영이라면 RDS Multi-AZ 와
              이중화가 먼저 필요
            </>,
            <>
              저장 데이터 암호화 · CDC 는 이번 범위에서 제외 — 다음 학습 과제
            </>,
          ]}
        />
      </Section>
    </>
  )
}
