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
            WebSocket(STOMP) · /app/auctions/{'{id}'}/bids
          </div>
        </div>
        {arrow}
        <div className={`${box} border-slate-300 bg-white`}>
          BidService 사전 검증
          <div className="mt-1 text-sm font-normal text-slate-500">
            경매 상태 · 마감 시간 · 입찰 단위(100원)
          </div>
        </div>
        {arrow}
        <div className={`${box} border-accent-line bg-accent-soft text-accent-deep`}>
          Redis Lua Script — 원자적 연산 (트랜잭션 효과)
          <div className="mt-1 text-sm font-normal text-accent">
            최고가 조회 → 검증 → 갱신을 단일 스크립트로 처리 (Race Condition 차단)
          </div>
        </div>
        {arrow}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className={`${box} border-slate-300 bg-white`}>
            실시간 브로드캐스트
            <div className="mt-1 text-sm font-normal text-slate-500">
              /topic/auctions/{'{id}'} 구독자 전체 + SSE 알림
            </div>
          </div>
          <div className={`${box} border-slate-300 bg-white`}>
            In-memory Queue에 Bid 객체 적재
            <div className="mt-1 text-sm font-normal text-slate-500">
              LinkedBlockingQueue → 2초 주기 Batch Insert
            </div>
          </div>
        </div>
        <div className="pt-3">
          <div className={`${box} border-dashed border-slate-400 bg-white text-slate-700`}>
            ⚠ Redis 장애 감지 시 — DB Fallback Mode
            <div className="mt-1 text-sm font-normal text-slate-500">
              DB 기준 입찰 처리(비관적 락 도입)로 전환, 복구 시 자가 치유
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
        tagline="Project 01 · 실시간 중고 경매 플랫폼"
        description={
          <>
            전문가 검수와 실시간 경매를 결합한 아이돌 굿즈 경매 플랫폼입니다.
            <br/>{' '}
            <b>실시간 경매 시스템(ERD·백엔드·프론트)을 총괄 담당</b>했습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2025.09 – 2025.10 (약 3주)' },
          { label: '팀 구성', value: 'Full Stack 5명' },
          { label: '담당', value: '실시간 경매 시스템 총괄' },
          { label: '검증', value: 'K6 동시 입찰 시나리오 통과' },
        ]}
        stacks={[
          'Java 21',
          'Spring Boot',
          'JPA (MySQL)',
          'Redis · Lua Script',
          'WebSocket · STOMP · SockJS',
          'Vue 3 + Vite',
          'Nginx',
          'GitHub Actions',
          'Loki & Grafana',
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
          { id: 'architecture', label: '입찰 아키텍처' },
          { id: 'whytech', label: '기술 선택' },
          { id: 'troubleshooting', label: '트러블슈팅' },
          { id: 'retrospect', label: '성과와 배운 점' },
        ]}
      />

      <Section id="overview" no="01" title="어떤 프로젝트인가">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          중고 거래에는 딜레마가 있습니다. 일반 중고 시장은 저렴하고 다양하지만{' '}
          <b>가품·사기의 불안</b>이 따르고, 전문 검수 시장은 믿을 수 있지만 스니커즈·명품 등{' '}
          <b>일부 분야에 한정</b>됩니다.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">
          Fantry는 그 사이를 노렸습니다. 판매자가 상품을 위탁하면 <b>플랫폼이 검수해서 경매에
          올리고</b>, 낙찰부터 배송·정산까지 책임지는 아이돌 굿즈 경매 플랫폼입니다.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/fantry/main-page.png"
            alt="Fantry 메인 페이지"
            caption="메인 페이지 · 카테고리·검색·경매/즉시구매 상품"
            imgClassName="h-80 object-cover object-top"
          />
          <Figure
            src="/images/fantry/auction-detail.png"
            alt="Fantry 경매 상세 페이지"
            caption="경매 상세 · 실시간 현재가와 남은 시간, 검수 정보"
            imgClassName="h-80 object-cover object-top"
          />
        </div>
      </Section>

      <Section
        id="role"
        no="02"
        title="팀에서 나의 자리"
        subtitle="5명이 시스템 단위로 나눠 맡았고, 저는 경매·주문·재고를 담당했습니다."
      >
        <RoleSplit
          roles={[
            {
              role: '경매 · 주문 · 재고',
              detail: '실시간 입찰과 경매 자동 활성화/마감/낙찰, 주문 생성, 재고 관리 시스템 구축',
              mine: true,
            },
            { role: '인프라 · 공통 모듈', detail: '서버 환경 구축, CS(문의·공지), 반품/환불' },
            { role: '인증 · 회원', detail: 'JWT 로그인, 일반·소셜 회원가입, 마이페이지' },
            { role: '검수 · 매입', detail: '2단계 검수 시스템, 매입가(시세) 산출' },
            { role: '결제 · 알림', detail: '결제 API 연동, SSE 알림' },
          ]}
        />
      </Section>

      <Section id="why" no="03" title="왜 이 파트를 맡았나">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          경매는 실시간성이 중요한, 저희 프로젝트의 메인 시스템입니다.
          <br/>가장 많은 고민과 성장을 이뤄낼 수 있을 것 같았기에 선택했습니다.
        </p>
      </Section>

      <Section id="focus" no="04" title="가장 파고든 것">
        <Highlight
          lines={[
            'WebSocket을 연동해, 입찰이 들어오는 순간 모두의 화면에 바로 보이게 하는 것',
            '입찰이 한꺼번에 몰려도 데이터가 깨지지 않게 하는 것',
            '자동화된 경매 낙찰·주문 생성 시스템을 만드는 것',
          ]}
          gains={[
            '실시간 통신(WebSocket · STOMP)을 연결부터 인증까지 직접 다뤄본 점',
            'Race Condition이 왜 위험하고, 동시성 제어는 어떻게 하는지 고민해 보게 된 점',
            '여러 요청을 한 번에 처리하는 Batch Insert 설계 및 구현 경험',
            'Spring Scheduler를 활용한 자동화 시스템 설계 및 구현 경험',
            '외부 서버(Redis)가 죽는 상황까지 대비하는 장애 대응 설계 경험',
          ]}
        />
      </Section>

      <Section
        id="architecture"
        no="05"
        title="입찰 처리 아키텍처"
        subtitle="검증은 Redis에서, DB저장은 Spring Queue 를 거쳐 Batch Insert 로 처리합니다."
      >
        <BidFlowDiagram />
      </Section>

      <Section
        id="whytech"
        no="06"
        title="왜 이 기술이었나"
        subtitle="아키텍처에 쓰인 기술들을, 도입한 이유와 써보며 배운 것으로 정리했습니다."
      >
        <WhyTech
          items={[
            {
              tech: 'Redis + Lua Script',
              why: (
                <>
                  수업에서 인메모리 DB의 특성을 배우며 'RAM에서 읽고 쓰기 때문에 빠르고, 성능이
                  필요한 작업에 쓸 수 있다'는 점이 기억에 남았습니다. 입찰마다 DB를 오가는 부담을
                  줄이려 최고가 처리를 Redis로 옮겼습니다.
                </>
              ),
              learned: (
                <>
                  요청 하나하나는 원자적이지만, '조회 → 비교 → 갱신'처럼 여러 단계를 묶으려면 추가
                  처리가 필요함을 알게 됐고, 그래서 Lua Script를 도입했습니다.
                </>
              ),
            },
            {
              tech: 'WebSocket · STOMP',
              why: (
                <>
                  입찰가는 모든 참가자의 화면에서 실시간으로 갱신되어야 합니다. 요청해야만 응답이
                  오는 HTTP와 달리, 여러 탭에서 채팅처럼 갱신될 수 있도록 WebSocket을 도입하였습니다.
                </>
              ),
              learned: (
                <>
                  연결 수립이 일반 HTTP 요청과 다르다는 것을 배포 환경 장애로 배웠고(트러블슈팅
                  01), 로그인한 사람만 입찰할 수 있도록 하는 인증 연동 (JWT 활용)까지 다뤘습니다.
                </>
              ),
            },
            {
              tech: 'In-memory Queue',
              why: (
                <>
                  입찰 기록을 건건이 저장하면 쓰기 부하가 그대로 DB에 갑니다. 별도 서버를 추가하지
                  않고도 쓰기를 모아서 처리할 수 있는 Spring 안의 큐와 Batch 시스템을 선택했습니다.
                </>
              ),
              learned: (
                <>
                  큐도 메모리에 있어 서버가 꺼지면 내용이 사라진다는 한계를 알게 됐고, Redis 서버 다운 대응 설계처럼 별도의 영속화 과정, 혹은 외부 서버 활용이 필요하다는 것을 학습하였습니다.
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
        subtitle="설계하며 들었던 고민들이, 실제 트러블슈팅으로 이어졌습니다."
      >
        <p className="max-w-3xl leading-relaxed text-slate-700">
          우선 WebSocket과 DB만을 활용해 <b>기본 동작부터 구현</b>했습니다. 그리고 실제 서비스
          환경을 가정하자 아래와 같은 고민들이 생겼고, 하나씩 부딪히며 해결해 나갔습니다.
        </p>

        {/* 당시 실제로 기록해 뒀던 고민들 — 이 질문들이 아래 트러블슈팅의 출발점이 됐다 */}
        <div className="mt-6 max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>1. 입찰 시도마다 DB에 접근(최고가 조회/검증/갱신)하면 무리가 가지 않는가?</li>
            <li>2. 그렇다면 성능 최적화를 위해 Redis를 연동할 수는 없겠는가?</li>
            <li>3. 동시성(Race Condition) 문제는 어떻게 해결할 것인가?</li>
            <li>4. 입찰은 로그인 유저만 가능해야 하는데, WebSocket 연결 시 인증/인가는 어떻게 연동하는가?</li>
          </ul>
        </div>

        <div className="mt-8 space-y-8">
          <TroubleCard
            no={1}
            title="배포 환경에서 WebSocket이 Long-Polling으로 강등"
            problem={
              <>로컬 환경에서는 WebSocket이 잘 연결되는데, 배포 환경에서는 연결이 되지 않음.</>
            }
            cause={
              <>
                WebSocket 연결 요청은 <b>HTTP - WebSocket 프로토콜 Upgrade 요청</b>인데,
                리눅스 서버 설정 파일에 따로 명시가 없음.
                <br/> 그 결과, Nginx가 Upgrade 헤더를 전달하지 않았고, SockJS Fallback이 동작하여 WebSocket 연결 대신 Long-Polling 방식으로 강등.
                <br/> (실시간 연결 대신 HTTP를 반복 요청하는 방식)
              </>
            }
            solution={
              <>Nginx 설정파일에 Upgrade / Connection 헤더 전달 코드 추가 요청. (DevOps 팀원과 협업)</>
            }
            result={
              <>배포 환경에서도 순수 WebSocket 연결 정상화. </>
            }
            detail={
              <Figure
                src="/images/fantry/ws-fallback-sequence.png"
                alt="WebSocket 연결 수립/폴백 시퀀스 다이어그램"
                caption="Upgrade 헤더 유무에 따른 연결 수립 경로 차이"
              />
            }
          />

          <TroubleCard
            no={2}
            title="입찰마다 DB 접근: 성능 저하와 Race Condition"
            problem={
              <>
                입찰마다 DB로 최고가를 조회/검증/갱신. 이는 @Transactional로 정합성이 보장되지만, 성능이 너무 좋지 않음.
                <br/>(입찰 1회당 DB로 select, update 하는 쿼리가 각 1회씩 날아감.)
                <br/> → DB 접근을 줄이기 위하여 Redis를 도입하자 새로운 문제 발생
              </>
            }
            cause={
              <>
                Redis는 요청 하나하나는 원자적이지만,
                '조회 → 비교 → 쓰기'는 <b>세 번의 요청</b>이라
                그 사이에 다른 입찰이 끼어들 수 있음. (Race Condition)
              </>
            }
            solution={
              <>
                Redis 에서도 트랜잭션 효과를 낼 수 있는{' '}
                <b>Lua Script</b>를 도입하여 조회/검증/갱신을
                스크립트 하나로 처리. <br/>입찰 기록은 큐에 모아 2초 주기로 DB에 Batch Insert.
              </>
            }
            result={<>K6 동시 입찰 시나리오 2,079개 검증 항목 전체 통과. (실패 0건)</>}
            detail={
              <>
                <CodeBlock
                  title="place-bid.lua: 조회·검증·갱신이 하나의 원자적 연산"
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
                  title="BidScheduler: In-memory Queue 기반 Batch Insert"
                  code={`@Scheduled(fixedDelay = 2000)
@Transactional
public void flushBidLogToDB() {
    if (bidLogQueue.isEmpty()) return;      // 빈 큐면 DB 접근 자체를 회피
    List<Bid> bidsToSave = new ArrayList<>();
    bidLogQueue.drainTo(bidsToSave);        // 원자적으로 전량 이동 (생산자와 경합 안전)
    bidRepository.saveAll(bidsToSave);      // 일괄 INSERT
}`}
                />
                <p>
                  경매 마감 스케줄러는 낙찰자 확정 시점에 큐를 DB로 강제 flush.
                  <br/> 큐에 남아 있던 입찰이 낙찰 판정에서 누락되지 않도록 처리.
                </p>
                <div>
                  <p className="mb-3">
                    <b>검증 방법</b>: 초당 15회로 동시 입찰 요청을 지속 발생시키며
                    3단계 체크(HTTP 로그인 → WebSocket 연결 → STOMP 연결) 수행 
                    <br/> <b>결과:</b> 총 2,079개 검증 항목이 전부 통과. (Lua Script 가 트랜잭션과 동일한 효과를 내므로 정합성 보장)
                    
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <StatCard value="2,079개" label="검증 항목(checks) 전체 통과" />
                    <StatCard value="100%" label="checks 성공률 (실패 0건)" />
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
            title="Redis 서버가 다운된다면 ?"
            problem={
              <>
                Redis는 외부 서버라 언제든 멈출 수 있고, 멈추면 <b>입찰 기능 전체가 함께 멈출
                위험</b>이 있음.
              </>
            }
            cause={<>최고가 조회/검증/갱신 경로 전체가 Redis 하나에 의존하고 있었기 때문.</>}
            solution={
              <>
                Redis 서버 장애 감지 시 <b>DB Fallback mode 돌입</b> (동시성 제어를 위한 비관적 락 처리),
                <br/> Redis 서버 복구 시 이를 감지하여 DB와 Redis를 동기화(자가 치유)한 후, Redis를 이용한 입찰 기능이 자동 회복되도록 설계.
              </>
            }
            result={
              <>Redis 서버가 다운되어도, DB만을 활용한 입찰이 계속되고, Redis 서버 정상 작동을 감지하여 정상 모드로 복귀합니다.</>
            }
            detail={
              <Figure
                src="/images/fantry/db-fallback-sequence.png"
                alt="DB Fallback Mode 시퀀스 다이어그램"
                caption="입찰 시퀀스 다이어그램 · 장애 시 DB로 우회했다가, 복구되면 동기화 후 되돌아오는 흐름"
              />
            }
          />
        </div>
      </Section>

      <Section id="etc" no="08" title="그 외 구현">
        <Bullets
          items={[
            <>
              <b>JWT 기반 WebSocket 인증/인가</b>: WebSocket 연결 시 단 한순간 있는 HTTP 요청(핸드셰이크) 시점에 JWT 유무를 판단 및 전달하도록 구현
            </>,
            <>
              <b>@Scheduled 기반 경매 라이프사이클</b>: 경매 자동 활성화/마감과 낙찰 확정, 주문
              자동 생성 및 2초 주기 입찰 기록 일괄 저장(Batch Insert) 구현
            </>,
          ]}
        />
      </Section>

      <Section id="retrospect" no="09" title="성과와 배운 점">
        <Retrospect
          gains={[
            <>
              <b>외부 시스템은 언제든 장애가 날 수 있다</b>는 전제를 배웠고, 대비책(DB Fallback)을
              직접 설계해 봤습니다.
            </>,
            <>
              <b>Redis의 특성</b>(요청 하나하나가 원자적)을 이해했고, Redis 기준의 동시성 제어를
              직접 다뤄봤습니다.
            </>,
            <>
              실시간 통신(WebSocket)을 <b>연결 수립부터 인증까지</b> 직접 다뤄본 경험을
              얻었습니다.
            </>,
            <>
              Nginx 설정 하나로 연결이 강등되는 것을 겪으며, <b>'Local 환경과 서비스 환경은 다르다'</b> 라는 점을 깨우쳤습니다.
            </>,
          ]}
          questions={[
            <>Queue는 Redis와 마찬가지로 In-memory에 저장되기 때문에 휘발성을 가집니다.</>,
            <>
              그렇다면 Queue에 저장되었던 데이터가 서버 다운과 함께 휘발된다면, 그 대비책은 어떻게
              마련해야 하는지에 대한 고민이 이어졌습니다.
            </>
          ]}
          closing={
            <>
              1. "동작하는 코드"와 "견고한 코드"는 너무나 다르다는 것
              <br/>2. 그 어떤 상황에서도 최악을 가정하고, 대비책을 세워야 한다는 것을 배웠습니다.
            </>
          }
        />
      </Section>
    </>
  )
}
