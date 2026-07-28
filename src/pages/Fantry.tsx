import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import { Bullets, CodeBlock, Figure, Section, SectionNav, StatCard } from '../components/ui'

/** 입찰 처리 파이프라인 다이어그램 */
function BidFlowDiagram() {
  const box = 'rounded-lg border px-4 py-3 text-center text-sm font-medium leading-snug'
  const arrow = <div className="text-center text-lg text-slate-300">↓</div>
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-8">
      <div className="mx-auto max-w-md space-y-1.5">
        <div className={`${box} border-slate-300 bg-white`}>
          클라이언트 입찰 요청
          <div className="mt-0.5 text-xs font-normal text-slate-500">
            WebSocket(STOMP) · /app/auctions/{'{id}'}/bids
          </div>
        </div>
        {arrow}
        <div className={`${box} border-slate-300 bg-white`}>
          BidService 사전 검증
          <div className="mt-0.5 text-xs font-normal text-slate-500">
            경매 상태 · 마감 시간 · 입찰 단위(100원)
          </div>
        </div>
        {arrow}
        <div className={`${box} border-blue-300 bg-blue-50 text-blue-800`}>
          Redis Lua Script — 원자적 연산
          <div className="mt-0.5 text-xs font-normal text-blue-600">
            최고가 조회 → 검증 → 갱신을 단일 스크립트로 처리 (Race Condition 원천 차단)
          </div>
        </div>
        {arrow}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className={`${box} border-emerald-300 bg-emerald-50 text-emerald-800`}>
            실시간 브로드캐스트
            <div className="mt-0.5 text-xs font-normal text-emerald-600">
              /topic/auctions/{'{id}'} 구독자 전체 + SSE 알림
            </div>
          </div>
          <div className={`${box} border-emerald-300 bg-emerald-50 text-emerald-800`}>
            In-memory Queue 적재
            <div className="mt-0.5 text-xs font-normal text-emerald-600">
              LinkedBlockingQueue → 2초 주기 Batch Insert
            </div>
          </div>
        </div>
        <div className="pt-3">
          <div className={`${box} border-dashed border-amber-400 bg-amber-50 text-amber-800`}>
            ⚠ Redis 장애 감지 시 — DB Fallback Mode
            <div className="mt-0.5 text-xs font-normal text-amber-700">
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
            전문가 검수와 실시간 경매로 중고거래의 딜레마인 '신뢰'와 '다양성'을 모두 잡은 아이돌
            굿즈 경매 플랫폼입니다. <b>실시간 경매 시스템 전반(ERD·백엔드·프론트)을 총괄</b>하며
            성능, 동시성, 인프라 장애 대응이라는 세 가지 핵심 과제를 해결했습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2025.09 – 2025.10 (실 개발 약 3주)' },
          { label: '팀 구성', value: 'Full Stack 5명' },
          { label: '담당', value: '실시간 경매 시스템 총괄' },
          { label: '검증', value: '동시 입찰 정합성 검증 통과' },
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

      <Section
        id="why"
        title="왜 이 프로젝트인가"
        subtitle="입찰은 '같은 데이터에 다수가 동시에 쓰는' 문제의 전형입니다."
      >
        <p className="max-w-3xl leading-relaxed text-slate-700">
          실시간 경매는 수백 명이 동시에 몰릴 수 있는 도메인입니다. 단순 CRUD로는 경험할 수 없는{' '}
          <b>동시성 제어, DB I/O 병목, 인프라 장애 대응</b>을 직접 부딪혀 보기 위해 경매 시스템을
          담당했습니다. 처음부터 Redis를 쓴 것이 아니라, DB 트랜잭션 기반으로 먼저 구현한 뒤 문제를
          발견하고 단계적으로 고도화한 과정이 이 프로젝트의 핵심입니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/fantry/main-page.png"
            alt="Fantry 메인 페이지"
            caption="메인 페이지 — 카테고리·검색·경매/즉시구매 상품"
            imgClassName="h-80 object-cover object-top"
          />
          <Figure
            src="/images/fantry/auction-detail.png"
            alt="Fantry 경매 상세 페이지"
            caption="경매 상세 — 실시간 현재가와 남은 시간, 검수 정보"
            imgClassName="h-80 object-cover object-top"
          />
        </div>
      </Section>

      <Section
        id="architecture"
        title="입찰 처리 아키텍처"
        subtitle="검증은 Redis에서 원자적으로, 영속화는 큐를 거쳐 비동기 배치로 — 읽기/쓰기 경로를 분리했습니다."
      >
        <BidFlowDiagram />
      </Section>

      <Section id="troubleshooting" title="트러블슈팅" subtitle="문제를 발견하고 → 원인을 파고들고 → 해결하고 → 검증했습니다.">
        <div className="space-y-6">
          <TroubleCard
            no={1}
            title="배포 환경에서 WebSocket이 Long-Polling으로 강등"
            problem={
              <>
                Local에서 정상 동작하던 WebSocket 연결이 배포 환경에서만 수차례 재연결 시도 끝에
                Long-Polling으로 강등되는 현상을 발견했습니다.
              </>
            }
            cause={
              <>
                <a
                  href="https://docs.spring.io/spring-framework/reference/web/websocket/fallback.html"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
                >
                  Spring 공식 문서
                </a>
                로 SockJS의 연결 수립 과정을 추적한 결과 — WebSocket 핸드셰이크는{' '}
                <b>프로토콜 Upgrade 요청</b>인데, Reverse Proxy인 Nginx가 Upgrade 헤더를 백엔드로
                전달하지 않아 SockJS의 Fallback(XHR-streaming → Long-Polling)이 동작한 것이었습니다.
              </>
            }
            solution={
              <>
                DevOps 담당 팀원에게 원인 분석 결과를 공유하고, Nginx 설정에 Upgrade / Connection
                헤더 전달 설정 추가를 요청해 해결했습니다.
              </>
            }
            result={
              <>
                배포 환경에서 순수 WebSocket 연결 정상화. 애플리케이션 코드를 넘어{' '}
                <b>인프라와 프로토콜의 상호작용</b>까지 시야를 넓히는 계기가 됐습니다.
              </>
            }
            detail={
              <Figure
                src="/images/fantry/ws-fallback-sequence.png"
                alt="WebSocket 연결 수립/폴백 시퀀스 다이어그램"
                caption="직접 정리한 시퀀스 다이어그램 — Upgrade 헤더 유무에 따른 연결 수립 경로 차이"
              />
            }
          />

          <TroubleCard
            no={2}
            title="입찰마다 DB 접근 — I/O 병목과 Race Condition"
            problem={
              <>
                초기 구현은 입찰 시도마다 DB 트랜잭션으로 최고가를 조회/검증/갱신했습니다. 입찰이
                몰릴수록 <b>DB I/O 병목과 Race Condition으로 인한 정합성 훼손</b> 위험이 커지는
                구조였습니다.
              </>
            }
            cause={
              <>
                최고가 갱신은 '조회 → 비교 → 쓰기'(read-modify-write) 패턴이라, 요청이 인터리빙되면
                낮은 입찰가가 최고가를 덮어쓰는 lost update가 발생할 수 있습니다. 입찰 기록 INSERT도
                건건이 발생해 쓰기 부하가 그대로 DB에 전달됐습니다.
              </>
            }
            solution={
              <>
                ① 최고가 처리를 <b>Redis + Lua Script</b>로 이관 — 싱글 스레드인 Redis가 스크립트를
                통째로 실행하는 특성을 이용해 조회/검증/갱신을 락 없이 원자적으로 처리. ② 입찰
                기록은 LinkedBlockingQueue에 적재 후 2초마다 전량 꺼내 일괄 INSERT하도록 분리.
              </>
            }
            result={
              <>
                K6 <b>동시 입찰 시나리오 검증</b>에서 2,079개 검증 항목 전체 통과(실패 0건) —
                동시 입찰 환경에서의 안정 동작을 수치로 확인했습니다.
              </>
            }
            detail={
              <>
                <CodeBlock
                  title="place-bid.lua — 조회·검증·갱신이 하나의 원자적 연산"
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
                  title="BidScheduler — In-memory Queue 기반 Batch Insert"
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
                  경매 마감 스케줄러는 낙찰자 확정 직전에 큐를 강제 flush하여, 큐에 남아 있던 입찰이
                  낙찰 판정에서 누락되지 않도록 정합성을 보장했습니다. Kafka/RabbitMQ 도입도
                  검토했지만, 추가 인프라·운영 비용과 복잡도 증가라는 트레이드오프를 고려해 현재
                  규모에서는 In-memory Queue를 선택했습니다.
                </p>
                <div>
                  <p className="mb-3">
                    <b>검증 방법</b> — 초당 15회(15 RPS)로 동시 입찰 요청을 지속 발생시키며 요청당
                    3단계 체크(HTTP 로그인 → WebSocket 연결 → STOMP 연결)를 수행했습니다. 총
                    2,079개 검증 항목이 전부 통과했고(45.1/s = 초당 checks 수 = 15 RPS × 3),
                    입찰 정합성 자체는 Lua 스크립트가 검증과 갱신을 단일 원자 연산으로 처리하는
                    구조로 보장됩니다. 처리량 측정이 목적이 아닌 <b>동시 요청 환경에서의 안정성
                    검증</b> 시나리오입니다. (p95/p99 지연 분포 측정은 진행하지 않았으며, 한계로
                    남겨두었습니다)
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
            title="Redis가 죽으면 경매도 죽는가 — DB Fallback Mode"
            problem={
              <>
                최고가 처리를 Redis로 이관하자 <b>Redis가 단일 장애 지점(SPOF)</b>이 됐습니다.
                Redis 장애 시 경매 전체가 중단되는 구조를 방치할 수 없었습니다.
              </>
            }
            cause={
              <>
                입찰 검증·갱신 경로가 Redis에 전적으로 의존해, 커넥션 장애가 곧 입찰 불가로
                이어졌습니다.
              </>
            }
            solution={
              <>
                ① Redis 접근 중 예외 발생 시 Fallback Flag를 켜고 DB 전용 로직으로 분기. ②
                Fallback 중에는 성능 대신 정합성을 최우선으로 <b>DB 비관적 락</b>으로 입찰을
                처리하고 즉시 저장. ③ 이후 입찰에서 Flag가 켜져 있으면 DB 기준 최고가를 Redis에
                재동기화한 뒤 Flag를 원복 — <b>자가 치유</b>.
              </>
            }
            result={
              <>
                Redis 장애 상황에서도 서비스 중단 없이 입찰이 계속되고, 복구 후 수동 개입 없이
                자동으로 정상 모드로 복귀하는 구조를 완성했습니다.
              </>
            }
            detail={
              <Figure
                src="/images/fantry/db-fallback-sequence.png"
                alt="DB Fallback Mode 시퀀스 다이어그램"
                caption="입찰 시퀀스 다이어그램 — Redis 정상/장애 경로 분기와 Write-back 구조"
              />
            }
          />
        </div>
      </Section>

      <Section id="etc" title="그 외 구현" subtitle="경매 도메인 전반을 담당했습니다.">
        <Bullets
          items={[
            <>
              <b>JWT 기반 WebSocket 인증/인가</b> — 입찰가 조회·브로드캐스트는 비로그인 허용,
              입찰은 로그인 필수. STOMP 핸드셰이크 시점에 헤더로 JWT Access Token을 전달해 기존
              Security 체계로 인가된 세션만 입찰하도록 구현
            </>,
            <>
              <b>@Scheduled 기반 경매 라이프사이클</b> — 1분 주기로 경매 자동 활성화/마감을 처리하고,
              마감 시 DB 최고 입찰 기준으로 낙찰 확정 → 주문(결제 대기) 자동 생성
            </>,
            <>
              <b>트랜잭션 커밋 이후 비동기 알림</b> — AFTER_COMMIT 이벤트 리스너 + @Async로 낙찰
              알림(SSE)을 분리해, 알림 실패가 경매 마감 트랜잭션에 영향을 주지 않도록 격리
            </>,
            <>
              <b>상품/주문/경매 CRUD 및 관리자 기능</b> — 경매 도메인의 기본 기능 전반
            </>,
          ]}
        />
      </Section>

      <Section id="retrospect" title="성과와 배운 점">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900">성과</h3>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-700">
              <li>· K6 동시 입찰 검증 2,079개 항목 전체 통과 — 동시 요청 환경의 안정성을 수치로 확인</li>
              <li>· 락 없는 원자적 동시성 제어(Redis Lua) 설계·구현</li>
              <li>· 장애를 전제로 한 설계(Fallback + 자가 치유) 경험</li>
              <li>· 인프라(Nginx)-프로토콜(WebSocket) 경계의 문제를 공식 문서 기반으로 해결</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900">한계와 다음 단계</h3>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-700">
              <li>
                · <b>현재 설계는 단일 인스턴스 전제</b> — Fallback Flag(AtomicBoolean)와 In-memory
                Queue는 인스턴스 로컬이라, 다중 인스턴스 확장 시 Fallback 상태는 Redis/DB 기반 공유
                플래그로, 큐는 Kafka 등 외부 브로커로 이관이 필요
              </li>
              <li>
                · In-memory Queue는 서버 다운 시 미처리분 유실 가능 — Kafka/RabbitMQ 도입 시의
                트레이드오프(운영 비용·복잡도·멱등성)까지 학습
              </li>
              <li>· 배치 INSERT 실패 시 재처리 정책 미구현 — 재적재/DLQ 설계 필요</li>
              <li>· 응답 지연 분포(p95/p99) 미측정 — 처리량·지연 관점의 부하 테스트는 다음 과제</li>
              <li>· IDENTITY 채번 전략은 Hibernate JDBC 배치를 비활성화 — 채번 전략 개선 여지 인지</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}
