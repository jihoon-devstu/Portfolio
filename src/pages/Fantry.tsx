import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import {
  Bullets,
  CodeBlock,
  Figure,
  Highlight,
  Retrospect,
  RoleSplit,
  Section,
  SectionNav,
  StatCard,
  Sub,
  WhyTech,
} from '../components/ui'

/** 입찰 처리 파이프라인 다이어그램 */
function BidFlowDiagram() {
  const box = 'rounded-md border px-5 py-4 text-center text-base font-semibold leading-snug'
  const arrow = <div className="text-center text-xl text-slate-300">↓</div>
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
      <div className="mx-auto max-w-2xl space-y-2">
        <div className={`${box} border-slate-300 bg-white`}>
          클라이언트 입찰 요청
          <div className="mt-1 text-sm font-normal text-slate-500">
            WebSocket(STOMP), /app/auctions/{'{id}'}/bids
          </div>
        </div>
        {arrow}
        <div className={`${box} border-slate-300 bg-white`}>
          BidService 사전 검증
          <div className="mt-1 text-sm font-normal text-slate-500">
            경매 상태, 마감 시간, 입찰 단위(100원)
          </div>
        </div>
        {arrow}
        <div className={`${box} border-accent-line bg-accent-soft text-accent-deep`}>
          Redis Lua Script: 원자적 실행
          <div className="mt-1 text-sm font-normal text-accent">
            최고가 조회 → 검증(최소 증가액 1,000원) → 갱신을 한 번에 처리
          </div>
        </div>
        {arrow}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className={`${box} border-slate-300 bg-white`}>
            실시간 브로드캐스트
            <div className="mt-1 text-sm font-normal text-slate-500">
              /topic/auctions/{'{id}'} 구독자 전체, SSE 알림
            </div>
          </div>
          <div className={`${box} border-slate-300 bg-white`}>
            In-memory Queue에 Bid 객체 적재
            <div className="mt-1 text-sm font-normal text-slate-500">
              LinkedBlockingQueue → 2초 주기 일괄 저장(saveAll)
            </div>
          </div>
        </div>
        <div className="pt-3">
          <div className={`${box} border-dashed border-slate-400 bg-white text-slate-700`}>
            ⚠ Redis 호출 예외 발생 시: DB Fallback Mode
            <div className="mt-1 text-sm font-normal text-slate-500">
              DB 비관적 락으로 전환, 재동기화에 성공하면 자동 복귀
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Fantry() {
  return (
    <>
      <ProjectHeader
        name="Fantry"
        tagline="Project 02 | 실시간 중고 경매 플랫폼"
        description={
          <>
            전문가 검수와 실시간 경매를 결합한 아이돌 굿즈 경매 플랫폼입니다.
            <br />
            <b>실시간 경매 시스템(ERD, 백엔드, 프론트)을 총괄</b>했습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2025.09 – 2025.10 (약 3주)' },
          { label: '팀 구성', value: 'Full Stack 5명' },
          { label: '담당', value: '실시간 경매 시스템 총괄' },
          { label: '검증', value: 'K6 동시 접속과 입찰 흐름 확인' },
        ]}
        stacks={[
          'Java 21',
          'Spring Boot',
          'JPA (MySQL)',
          'Redis',
          'Lua Script',
          'WebSocket (STOMP, SockJS)',
          'Vue 3 + Vite',
          'Nginx',
          'GitHub Actions',
          'Flyway',
        ]}
        links={[
          { label: 'Backend GitHub', href: 'https://github.com/SinsegeaBackend-8th-Team4/fantry-backend' },
          { label: 'Frontend GitHub', href: 'https://github.com/SinsegeaBackend-8th-Team4/fantry-frontend' },
        ]}
      />

      <SectionNav
        items={[
          { id: 'overview', label: '어떤 프로젝트인가' },
          { id: 'role', label: '나의 자리' },
          { id: 'why', label: '왜 이 파트인가' },
          { id: 'focus', label: '가장 파고든 것' },
          { id: 'architecture', label: '입찰 아키텍처' },
          { id: 'whytech', label: '기술 선택' },
          { id: 'troubleshooting', label: '트러블슈팅' },
          { id: 'retrospect', label: '성과와 배운 점' },
        ]}
      />

      <Section id="overview" no="01" title="어떤 프로젝트인가">
        <div className="max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>
              <b>일반 중고 시장</b>: 저렴하고 다양하지만 가품과 사기 위험
            </li>
            <li>
              <b>전문 검수 시장</b>: 믿을 수 있지만 스니커즈, 명품 등으로 한정
            </li>
            <li>
              <b>Fantry</b>: 위탁 → 검수 → 경매 → 낙찰과 정산까지 책임지는 아이돌 굿즈 경매
            </li>
          </ul>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/fantry/main-page.png"
            alt="Fantry 메인 페이지"
            caption="메인 페이지"
            imgClassName="h-80 object-cover object-top"
          />
          <Figure
            src="/images/fantry/auction-detail.png"
            alt="Fantry 경매 상세 페이지"
            caption="경매 상세: 실시간 현재가와 남은 시간"
            imgClassName="h-80 object-cover object-top"
          />
        </div>
      </Section>

      <Section
        id="role"
        no="02"
        title="팀에서 나의 자리"
        subtitle="5명이 시스템 단위로 나눠 맡았고, 저는 경매, 주문, 재고를 담당했습니다."
      >
        <RoleSplit
          roles={[
            {
              role: '경매, 주문, 재고',
              detail: '실시간 입찰, 경매 자동 시작과 마감, 낙찰, 주문 생성, 재고 관리',
              mine: true,
            },
            { role: '인프라, 공통 모듈', detail: '서버 환경, 문의와 공지, 반품과 환불' },
            { role: '인증, 회원', detail: 'JWT 로그인, 일반과 소셜 가입, 마이페이지' },
            { role: '검수, 매입', detail: '2단계 검수, 매입가 산출' },
            { role: '결제, 알림', detail: '결제 API 연동, SSE 알림' },
          ]}
        />
      </Section>

      <Section id="why" no="03" title="왜 이 파트를 맡았나">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          경매는 실시간성이 중요한 프로젝트의 핵심 기능이라, 가장 많이 고민하고 배울 수 있는 자리라고 보고 선택했습니다.
        </p>
      </Section>

      <Section id="focus" no="04" title="가장 파고든 것">
        <Highlight
          lines={[
            '입찰이 들어오는 순간 모두의 화면에 바로 보이게 하는 것',
            '입찰이 한꺼번에 몰려도 데이터가 깨지지 않게 하는 것',
            '경매 낙찰과 주문 생성을 자동화하는 것',
          ]}
          gains={[
            'WebSocket(STOMP) 실시간 통신을 직접 다뤄 봄',
            'Race Condition의 위험과 동시성 제어 방법',
            '입찰 기록을 큐에 모아 주기적으로 저장하는 설계',
            'Spring Scheduler 기반 경매 자동화',
            'Redis 장애까지 대비하는 폴백 설계',
          ]}
        />
      </Section>

      <Section
        id="architecture"
        no="05"
        title="입찰 처리 아키텍처"
        subtitle="검증은 Redis에서 하고, DB 저장은 큐에 모아 2초마다 처리합니다."
      >
        <BidFlowDiagram />
      </Section>

      <Section
        id="whytech"
        no="06"
        title="왜 이 기술이었나"
        subtitle="도입한 이유와 써 보며 배운 것입니다."
      >
        <WhyTech
          items={[
            {
              tech: 'Redis + Lua Script',
              why: (
                <>
                  입찰마다 DB를 오가지 않고, 조회 → 검증 → 갱신을 한 번에 처리
                </>
              ),
              learned: (
                <>
                  단일 명령만 원자적이고 다단계는 스크립트가 필요{' '}
                  <a href="#troubleshooting" className="font-semibold text-accent hover:underline">
                    → 트러블슈팅 02
                  </a>
                </>
              ),
            },
            {
              tech: 'WebSocket (STOMP)',
              why: <>입찰가를 모든 참가자 화면에 즉시 반영</>,
              learned: (
                <>
                  연결 수립이 HTTP Upgrade라 프록시 설정에 의존{' '}
                  <a href="#troubleshooting" className="font-semibold text-accent hover:underline">
                    → 트러블슈팅 01
                  </a>
                </>
              ),
            },
            {
              tech: 'In-memory Queue',
              why: <>별도 서버 없이 입찰 기록을 모아 2초마다 저장</>,
              learned: (
                <>
                  서버가 꺼지면 큐 유실, IDENTITY 전략이라 INSERT는 건별 실행됨을 이후 확인
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section
        id="troubleshooting"
        no="07"
        title="트러블슈팅"
        subtitle="기본 동작을 먼저 만든 뒤, 실제 서비스를 가정하며 생긴 고민을 하나씩 해결했습니다."
      >
        {/* 당시 실제로 기록해 뒀던 고민들: 이 질문들이 아래 트러블슈팅의 출발점이 됐다 */}
        <div className="max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>1. 입찰마다 DB에서 조회, 검증, 갱신을 하면 무리가 없을까?</li>
            <li>2. Redis로 옮기면 빨라지지 않을까?</li>
            <li>3. 동시에 몰리는 입찰(Race Condition)은 어떻게 막을까?</li>
          </ul>
        </div>

        <div className="mt-8 space-y-8">
          <TroubleCard
            no={1}
            title="배포 환경에서 WebSocket이 Long-Polling으로 강등"
            problem={
              <>로컬에서는 WebSocket이 연결되는데 배포 환경에서는 안 됨</>
            }
            cause={
              <>
                <Sub
                  flush
                  items={[
                    <>WebSocket 연결은 <b>HTTP Upgrade 요청</b>으로 시작</>,
                    'Nginx 설정에 Upgrade 헤더 전달이 없어 SockJS가 Long-Polling으로 대체',
                    'Long-Polling: 실시간 연결 대신 HTTP를 반복 요청하는 방식',
                  ]}
                />
              </>
            }
            solution={
              <>Nginx에 Upgrade, Connection 헤더 전달 추가 (DevOps 팀원과 협업)</>
            }
            result={
              <>배포 환경에서도 WebSocket 연결 정상화</>
            }
            detail={
              <Figure
                src="/images/fantry/ws-fallback-sequence.png"
                alt="WebSocket 연결 수립/폴백 시퀀스 다이어그램"
                caption="Upgrade 헤더 유무에 따른 연결 경로 차이"
              />
            }
          />

          <TroubleCard
            no={2}
            title="입찰마다 DB 접근: 성능 저하와 Race Condition"
            problem={
              <>
                <Sub
                  flush
                  items={[
                    '입찰마다 DB에서 최고가 조회, 검증, 갱신 (select와 update 각 1회)',
                    '트랜잭션만으로는 갱신 손실을 못 막고, 락을 걸면 대기가 길어짐',
                    'DB 접근을 줄이려 Redis를 도입하자 새 문제 발생',
                  ]}
                />
              </>
            }
            cause={
              <>
                Redis 명령 하나는 원자적이지만 조회 → 비교 → 쓰기는 <b>세 번의 요청</b>이라 그 사이에 다른
                입찰이 끼어듦
              </>
            }
            solution={
              <>
                <b>Lua Script</b>로 조회, 검증, 갱신을 한 번에 실행
                <Sub items={['입찰 기록은 큐에 모아 2초마다 DB에 저장']} />
              </>
            }
            result={
              <>
                끼어들 틈을 없앰, K6 시나리오(초당 15회) checks <b>2,079개 전부 통과</b>
              </>
            }
            detail={
              <>
                <CodeBlock
                  title="place-bid.lua: 조회, 검증, 갱신이 하나의 원자적 연산"
                  code={`local currentHighestBid = tonumber(redis.call('GET', KEYS[1]))

-- 첫 입찰: 시작가 초과 여부 검증
if not currentHighestBid then
    if newBidAmount > startPrice then
        redis.call('SET', KEYS[1], newBidAmount)
        return "SUCCESS_FIRST_BID"
    end
    return "FAILURE_TOO_LOW_START"
end

-- 재입찰: 현재가 + 최소 증가액(1,000원) 이상 검증
if newBidAmount >= currentHighestBid + minIncrement then
    redis.call('SET', KEYS[1], newBidAmount)
    return "SUCCESS_HIGHER_BID"
end
return "FAILURE_TOO_LOW_INCREMENT"`}
                />
                <CodeBlock
                  title="BidScheduler: In-memory Queue 기반 일괄 저장"
                  code={`@Scheduled(fixedDelay = 2000)
@Transactional
public void flushBidLogToDB() {
    if (bidLogQueue.isEmpty()) return;      // 빈 큐면 DB 접근 자체를 회피
    List<Bid> bidsToSave = new ArrayList<>();
    bidLogQueue.drainTo(bidsToSave);        // 원자적으로 전량 이동 (생산자와 경합 안전)
    bidRepository.saveAll(bidsToSave);      // 한 트랜잭션에서 저장 (IDENTITY라 INSERT는 건별)
}`}
                />
                <p>경매 마감 때 큐를 먼저 DB에 저장해, 남아 있던 입찰이 낙찰 판정에서 빠지지 않게 했습니다.</p>
                <div>
                  <div className="mb-3">
                    <Bullets
                      items={[
                        '검증 방법: 초당 15회 입찰 중 로그인 → WebSocket 연결 → STOMP 연결 확인',
                        '결과: checks 2,079개 전부 통과',
                        '지표의 한계: 단계별 통과 여부이며 처리량이나 최고가 정합성 측정은 아님',
                      ]}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <StatCard value="0건" label="시나리오 checks 실패(checks failed)" />
                    <StatCard value="2,079개" label="수행한 검증 항목(checks) 수" />
                  </div>
                </div>
                <CodeBlock
                  title="K6 실행 결과"
                  code={`TOTAL RESULTS

checks_total.......: 2079     45.119617/s
checks_succeeded...: 100.00%  2079 out of 2079
checks_failed......: 0.00%    0 out of 2079

✓ [Step 1]   HTTP Login
✓ [Step 2.0] WebSocket Connection
✓ [Step 2.1] STOMP Connected`}
                />
              </>
            }
          />

          <TroubleCard
            no={3}
            title="Redis 서버가 멈춘다면?"
            problem={
              <>
                Redis가 멈추면 <b>입찰 기능 전체가 함께 멈춤</b>
              </>
            }
            cause={<>최고가 조회, 검증, 갱신이 모두 Redis 하나에 의존</>}
            solution={
              <>
                Redis 예외가 나면 <b>DB Fallback 모드로 전환</b>
                <Sub items={['DB 비관적 락으로 동시성 제어', '다음 요청마다 최고가를 DB → Redis로 재동기화, 성공하면 자동 복귀']} />
              </>
            }
            result={
              <>Redis가 멈춰도 DB로 입찰이 이어지고, 돌아오면 정상 모드로 복귀</>
            }
            detail={
              <Figure
                src="/images/fantry/db-fallback-sequence.png"
                alt="DB Fallback Mode 시퀀스 다이어그램"
                caption="장애 시 DB로 우회했다가 복구되면 되돌아오는 흐름"
              />
            }
          />
        </div>
      </Section>

      <Section id="retrospect" no="08" title="성과와 배운 점">
        <Retrospect
          gains={[
            <>
              <b>장애를 전제한 폴백 설계</b>: Redis 예외 시 DB 락으로 전환, 재동기화 후 복귀
            </>,
            <>
              <b>Redis의 원자성 범위 파악</b>과 Lua Script 기반 동시성 제어
            </>,
            <>
              <b>WebSocket 연결 과정</b>: 배포 환경에서 프록시 Upgrade 헤더가 필요함을 확인
            </>,
          ]}
          questions={[
            <>
              서버가 꺼지면 큐가 유실됨 → 영속화나 외부 큐 검토
            </>,
            <>
              복귀 시 재동기화는 경매 1건만, 모드 플래그는 서버 한 대 안에만 → 여러 서버 상황은 미해결
            </>,
            <>
              IDENTITY 전략에서는 배치 INSERT가 안 됨 → JdbcTemplate batchUpdate 검토
            </>,
          ]}
        />
      </Section>
    </>
  )
}
