import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import { Bullets, CodeBlock, Figure, Section, SectionNav, StatCard } from '../components/ui'

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
            In-memory Queue 에 Bid 객체 적재
            <div className="mt-1 text-sm font-normal text-slate-500">
              LinkedBlockingQueue → 2초 주기 Batch Insert
            </div>
          </div>
        </div>
        <div className="pt-3">
          <div className={`${box} border-dashed border-slate-400 bg-white text-slate-700`}>
            ⚠ Redis 장애 감지 시 — DB Fallback Mode
            <div className="mt-1 text-sm font-normal text-slate-500">
              DB기준 입찰 처리 (비관적 락 도입) 로 전환, 복구 시 자가 치유
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
          { id: 'why', label: '왜 이 프로젝트인가' },
          { id: 'architecture', label: '입찰 아키텍처' },
          { id: 'troubleshooting', label: '트러블슈팅' },
          { id: 'etc', label: '그 외 구현' },
          { id: 'retrospect', label: '성과와 배운 점' },
        ]}
      />

      <Section id="why" no="01" title="왜 이 프로젝트인가">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          <b>기본 동작부터 구현</b>한 뒤, 실제 서비스 환경을 가정하자
          고민들이 생겼습니다.
        </p>

        {/* 당시 실제로 기록해 뒀던 고민들 — 이 질문들이 이후 고도화의 출발점이 됐다 */}
        <div className="mt-6 max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="mt-3 space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>1. 입찰 시도마다 DB에 접근(최고가 조회/검증/갱신)하면 무리가 가지 않는가?</li>
            <li>2. 성능 최적화를 위해 Redis를 연동할 수는 없는가?</li>
            <li>3. 동시성(Race Condition) 문제는 어떻게 해결할 것인가?</li>
            <li>4. 입찰은 로그인 유저만 가능해야 하는데, WebSocket 연결시 JWT는 어떻게 연동하는가?</li>
          </ul>
        </div>

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
        id="architecture"
        no="02"
        title="입찰 처리 아키텍처"
        subtitle="검증은 Redis에서, DB저장은 Spring Queue 를 거쳐 비동기 배치로 처리합니다."
      >
        <BidFlowDiagram />
      </Section>

      <Section id="troubleshooting" no="03" title="트러블슈팅">
        <div className="space-y-8">
          <TroubleCard
            no={1}
            title="배포 환경에서 WebSocket이 Long-Polling으로 강등"
            problem={
              <>로컬 환경에서는 WebSocket이 잘 연결 되는데, 배포 환경에서는 연결이 되지 않음.</>
            }
            cause={
              <>
                WebSocket 연결 요청은 <b>HTTP - WebSocket 프로토콜 Upgrade 요청</b>인데, 
                Nginx가 Upgrade 헤더를 전달하지 않았음.
                <br/> 그 결과 , SockJS Fallback이 동작하여 Long-Polling 연결로 강등. (
                <a
                  href="https://docs.spring.io/spring-framework/reference/web/websocket/fallback.html"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-accent underline decoration-accent-line underline-offset-2 hover:text-accent-deep"
                >
                  Spring 공식 문서
                </a>
                로 추적)
              </>
            }
            solution={
              <>Nginx에 Upgrade / Connection 헤더 전달 설정 추가 요청. (DevOps 팀원과 협업)</>
            }
            result={
              <>배포 환경에서도 순수 WebSocket 연결 정상화. </>
            }
            detail={
              <Figure
                src="/images/fantry/ws-fallback-sequence.png"
                alt="WebSocket 연결 수립/폴백 시퀀스 다이어그램"
                caption="직접 정리한 시퀀스 다이어그램 · Upgrade 헤더 유무에 따른 연결 수립 경로 차이"
              />
            }
          />

          <TroubleCard
            no={2}
            title="입찰마다 DB 접근: I/O 병목과 Race Condition"
            problem={
              <>
                입찰마다 DB로 최고가를 조회/검증/갱신. 입찰이 몰리면 <b>I/O 병목과 정합성 훼손</b>{' '}
                위험.
              </>
            }
            cause={
              <>
                Redis 는 싱글 스레드 이기에 '조회 → 비교 → 쓰기' 요청이 겹치면 Race Condition 문제 발생 
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
                  경매 마감 스케줄러는 낙찰자 확정 직전에 큐를 강제 flush.
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
              <>Redis는 외부 서버이기 때문에 ,  <b>단일 장애 지점(SPOF)</b>이 될 위험이 있음.</>
            }
            cause={<>입찰 경로 전체가 Redis에 의존하여, Redis 가 다운되면 기능 전체가 마비.</>}
            solution={
              <>
                Redis 서버 장애 감지 시 <b>DB Fallback mode 돌입</b>( 동시성 제어를 위한 비관적 락 처리), 
                <br/> Redis 서버 복구 시 이를 감지하여 DB와 Redis 를 동기화(자가 치유) 후 Redis 를 이용한 입찰 기능 자동 회복하도록 설계.
              </>
            }
            result={
              <>Redis 서버가 다운되어도 , DB만을 활용한 입찰이 계속되고, Redis 서버 정상 작동을 감지하여 정상 모드로 복귀합니다.</>
            }
            detail={
              <Figure
                src="/images/fantry/db-fallback-sequence.png"
                alt="DB Fallback Mode 시퀀스 다이어그램"
                caption="입찰 시퀀스 다이어그램 · Redis 정상/장애 경로 분기와 Write-back 구조"
              />
            }
          />
        </div>
      </Section>

      <Section id="etc" no="04" title="그 외 구현">
        <Bullets
          items={[
            <>
              <b>JWT 기반 WebSocket 인증/인가</b>: WebSocket 연결 시 단 한순간 있는 Http 요청(핸드셰이크) 시점에 JWT 유무를 판단 및 전달하도록 구현
            </>,
            <>
              <b>@Scheduled 기반 경매 라이프사이클</b>: 경매 자동 활성화/마감과 낙찰 확정, 주문
              자동 생성 및 2초주기 입찰 요청 Bulk insert 구현
            </>,
          ]}
        />
      </Section>

      <Section id="retrospect" no="05" title="성과와 배운 점">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
          <div className="border-t-2 border-accent-line pt-4">
            <h3 className="font-bold text-ink">이 프로젝트가 남긴 것</h3>
            <div className="mt-3 text-slate-700">
              <Bullets
                items={[
                  <>
                    <b>외부 시스템은 언제든 장애가 날 수 있다</b>는 전제를 배웠습니다. 따라서 장애
                    대비책이 항상 마련되어있어야 겠다는 점을 배웠습니다.
                  </>,
                  <>
                    <b>Redis의 특성</b>(싱글 스레드)을 각 요청이 원자적이라는 것을 배웠으며 동시성
                    제어를 조금이나마 다뤄볼 수 있었습니다
                  </>,
                ]}
              />
            </div>
          </div>
          <div className="border-t-2 border-slate-300 pt-4">
            <h3 className="font-bold text-ink">마치고 나서 이어진 고민</h3>
            <div className="mt-3 text-slate-700">
              <Bullets
                items={[
                  <>Queue 는 Redis 와 마찬가지로 Inmemory 에 저장되기 때문에 휘발성을 가집니다.</>,
                  <>
                    Kafka 나 RabbitMQ 같은 외부 브로커로 옮길 수 있다는 확장성이 있지만{' '}
                    <b>그 브로커의 장애 대비를 다시 고민</b>해야 합니다.
                  </>,
                  <>
                    위와 같은 고민에서 확장성과 비용 사이에서 Devops 전반에 걸친 트레이드오프를
                    고민하는 기회가 되었습니다.
                  </>,
                ]}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
