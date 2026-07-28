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
          Redis Lua Script — 원자적 연산
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
            In-memory Queue 적재
            <div className="mt-1 text-sm font-normal text-slate-500">
              LinkedBlockingQueue → 2초 주기 Batch Insert
            </div>
          </div>
        </div>
        <div className="pt-3">
          <div className={`${box} border-dashed border-slate-400 bg-white text-slate-700`}>
            ⚠ Redis 장애 감지 시 — DB Fallback Mode
            <div className="mt-1 text-sm font-normal text-slate-500">
              비관적 락(SELECT ... FOR UPDATE)으로 전환, 복구 시 자가 치유
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
            전문가 검수와 실시간 경매를 결합한 아이돌 굿즈 경매 플랫폼입니다.{' '}
            <b>실시간 경매 시스템(ERD·백엔드·프론트)을 총괄 담당</b>했습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2025.09 – 2025.10 (실 개발 약 3주)' },
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
          <b>DB 트랜잭션 기반으로 기본 동작부터 구현</b>한 뒤, 배포 환경과 부하 상황을 가정하자
          질문들이 생겼습니다.
        </p>

        {/* 당시 실제로 기록해 뒀던 고민들 — 이 질문들이 이후 고도화의 출발점이 됐다 */}
        <div className="mt-6 max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            당시 스스로에게 던진 질문
          </p>
          <ul className="mt-3 space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>1. 입찰마다 DB에 접근(최고가 조회/검증/갱신)하면 I/O 병목이 생기지 않는가?</li>
            <li>2. 성능 최적화를 위해 In-memory DB인 Redis를 연동할 수는 없는가?</li>
            <li>3. 동시성(Race Condition) 문제는 어떻게 해결할 것인가?</li>
            <li>4. 입찰은 로그인 유저만 가능해야 하는데, WebSocket 인증/인가는 어떻게 구현하는가?</li>
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
        subtitle="검증은 Redis에서 원자적으로, 영속화는 큐를 거쳐 비동기 배치로 처리합니다."
      >
        <BidFlowDiagram />
      </Section>

      <Section id="troubleshooting" no="03" title="트러블슈팅">
        <div className="space-y-8">
          <TroubleCard
            no={1}
            title="배포 환경에서 WebSocket이 Long-Polling으로 강등"
            problem={
              <>Local에서는 WebSocket, 배포 환경에서만 Long-Polling으로 강등.</>
            }
            cause={
              <>
                WebSocket 핸드셰이크는 <b>프로토콜 Upgrade 요청</b>인데, Nginx가 Upgrade 헤더를
                전달하지 않아 SockJS Fallback이 동작. (
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
              <>Nginx에 Upgrade / Connection 헤더 전달 설정 추가. (DevOps 팀원과 협업)</>
            }
            result={
              <>순수 WebSocket 연결 정상화. 인프라와 프로토콜의 상호작용을 처음 체감했습니다.</>
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
                '조회 → 비교 → 쓰기'는 요청이 겹치면 낮은 입찰가가 최고가를 덮어쓸 수 있는
                구조(lost update).
              </>
            }
            solution={
              <>
                Redis는 여러 명령을 트랜잭션처럼 묶을 수 없다는 벽을 만났고, 싱글 스레드가{' '}
                <b>Lua Script를 하나의 원자 연산으로 실행</b>하는 특성을 찾아 조회/검증/갱신을
                스크립트 하나로 처리. 입찰 기록은 큐에 모아 2초 주기 Batch Insert.
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
                  배치 주기 2초는 레퍼런스들을 조사해 정한 값입니다. 이 정도 주기의 일괄 INSERT가
                  DB에 주는 부하는 크지 않다고 판단했습니다. 경매 마감 스케줄러는 낙찰자 확정
                  직전에 큐를 강제 flush하여, 큐에 남아 있던 입찰이 낙찰 판정에서 누락되지 않도록
                  했습니다.
                </p>
                <div>
                  <p className="mb-3">
                    <b>검증 방법</b>: 초당 15회(15 RPS)로 동시 입찰 요청을 지속 발생시키며 요청당
                    3단계 체크(HTTP 로그인 → WebSocket 연결 → STOMP 연결)를 수행했습니다. 총
                    2,079개 검증 항목이 전부 통과했고, 입찰 정합성은 Lua 스크립트가 검증과 갱신을
                    단일 원자 연산으로 처리하는 구조로 보장됩니다. 처리량 측정이 아닌{' '}
                    <b>동시 요청 환경에서의 안정성 검증</b>이 목적인 시나리오였습니다.
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
            title="Redis가 죽으면 경매도 죽는가: DB Fallback Mode"
            problem={
              <>최고가 처리를 Redis로 이관하자 <b>Redis가 단일 장애 지점(SPOF)</b>이 됨.</>
            }
            cause={<>입찰 경로 전체가 Redis에 의존해, 커넥션 장애가 곧 입찰 불가.</>}
            solution={
              <>
                장애 감지 시 <b>DB 비관적 락</b>으로 분기(Fallback), 복구 시 Redis 재동기화 후
                자동 복귀(자가 치유).
              </>
            }
            result={
              <>Redis 장애 중에도 입찰이 계속되고, 수동 개입 없이 정상 모드로 복귀합니다.</>
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
              <b>JWT 기반 WebSocket 인증/인가</b>: STOMP 핸드셰이크 시점에 JWT를 전달해 인가된
              세션만 입찰 가능하도록 구현
            </>,
            <>
              <b>@Scheduled 기반 경매 라이프사이클</b>: 경매 자동 활성화/마감과 낙찰 확정, 주문
              자동 생성
            </>,
            <>
              <b>트랜잭션 커밋 이후 비동기 알림</b>: AFTER_COMMIT + @Async로 낙찰 알림(SSE)을
              분리해 마감 트랜잭션과 격리
            </>,
          ]}
        />
      </Section>

      <Section id="retrospect" no="05" title="성과와 배운 점">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-0">
          <div className="sm:pr-8">
            <h3 className="font-bold text-ink">이 프로젝트가 남긴 것</h3>
            <ul className="mt-3 space-y-2.5 leading-relaxed text-slate-700">
              <li>
                · <b>외부 시스템은 언제든 장애가 날 수 있다</b>는 전제를 배웠습니다. 그 대비의
                결과물이 DB Fallback과 자가 치유입니다
              </li>
              <li>
                · <b>Redis의 특성</b>(싱글 스레드, Lua Script 원자 실행)을 이해하고 동시성 제어에
                활용했습니다
              </li>
              <li>· 설계는 수치로 검증했습니다. K6 동시 입찰 2,079개 항목 전체 통과</li>
            </ul>
          </div>
          <div className="border-t border-slate-200 pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <h3 className="font-bold text-ink">마치고 나서 이어진 고민</h3>
            <ul className="mt-3 space-y-2.5 leading-relaxed text-slate-700">
              <li>
                · Queue와 Fallback Flag는 메모리에 있어 서버가 내려가면 사라집니다. Kafka 같은
                외부 브로커로 옮기면 해결되지만, 이번엔 <b>그 브로커의 장애 대비를 다시 고민</b>
                해야 합니다. 도입은 끝이 아니라 새로운 트레이드오프의 시작임을 배웠습니다
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}
