import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import {
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
          Redis Lua Script — 원자적 실행
          <div className="mt-1 text-sm font-normal text-accent">
            최고가 조회 → 검증(최소 증가액 1,000원) → 갱신을 단일 스크립트로 처리 (Race Condition 차단)
          </div>
        </div>
        {arrow}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className={`${box} border-slate-300 bg-white`}>
            실시간 브로드캐스트
            <div className="mt-1 text-sm font-normal text-slate-500">
              /topic/auctions/{'{id}'} 구독자 전체 + SSE 알림(정상 모드)
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
            ⚠ Redis 호출 예외 발생 시 — DB Fallback Mode
            <div className="mt-1 text-sm font-normal text-slate-500">
              DB 기준 입찰 처리(비관적 락)로 전환, 다음 요청에서 Redis 재동기화 성공 시 자동 복귀
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
        tagline="Project 02 · 실시간 중고 경매 플랫폼"
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
          { label: '검증', value: 'K6 동시 접속 · 입찰 흐름 확인' },
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
              <b>일반 중고 시장</b> · 저렴하고 다양함, 가품·사기 리스크
            </li>
            <li>
              <b>전문 검수 시장</b> · 신뢰 확보, 스니커즈·명품 등 카테고리 한정
            </li>
            <li>
              <b>Fantry</b> · 위탁 → 플랫폼 검수 → 경매 → 낙찰·배송·정산까지 책임지는 아이돌 굿즈
              경매 플랫폼
            </li>
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
            '실시간 통신(WebSocket · STOMP) 연결을 직접 다뤄본 점',
            'Race Condition이 왜 위험하고, 동시성 제어는 어떻게 하는지 고민해 보게 된 점',
            '입찰 기록을 큐에 모아 주기적으로 저장하는 일괄 저장 설계 경험',
            'Spring Scheduler를 활용한 자동화 시스템 설계 및 구현 경험',
            '외부 서버(Redis)가 죽는 상황까지 대비하는 장애 대응 설계 경험',
          ]}
        />
      </Section>

      <Section
        id="architecture"
        no="05"
        title="입찰 처리 아키텍처"
        subtitle="검증은 Redis에서, DB 저장은 In-memory Queue(LinkedBlockingQueue)에 모아 2초 주기로 처리합니다."
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
                  입찰 1회당 DB select · update 왕복 제거, 조회 → 검증 → 갱신을 하나의 원자 연산으로
                  처리
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
              tech: 'WebSocket · STOMP',
              why: <>입찰가를 전체 참가자 화면에 즉시 반영 (HTTP 요청·응답 방식 대체)</>,
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
              why: <>별도 서버 없이 입찰 기록을 모아 2초 주기로 저장, 입찰 요청마다 DB 쓰기 회피</>,
              learned: (
                <>
                  서버 종료 시 큐 유실(영속화 미구현). ID가 IDENTITY 전략이라 JDBC 배치가 꺼져
                  INSERT는 건별 실행됨을 이후 확인
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
                입찰마다 DB로 최고가를 조회/검증/갱신 (입찰 1회당 select · update 각 1회).
                <br/>트랜잭션만으로는 동시 입찰의 갱신 손실을 막을 수 없고, 락을 걸면 입찰이 몰릴 때 대기가 길어질 것이 우려됨.
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
                스크립트 전체가 원자적으로 실행되는{' '}
                <b>Lua Script</b>를 도입하여 조회/검증/갱신을
                스크립트 하나로 처리. <br/>입찰 기록은 큐에 모아 2초 주기로 DB에 일괄 저장.
              </>
            }
            result={
              <>
                조회~갱신 사이에 다른 입찰이 끼어들 틈 제거. K6 동시 접속 · 입찰 시나리오(초당 15회)
                checks <b>2,079개 전부 통과</b>.
              </>
            }
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
                <p>
                  경매 마감 스케줄러는 낙찰자 확정 시점에 큐를 DB로 강제 flush.
                  <br/> 큐에 남아 있던 입찰이 낙찰 판정에서 누락되지 않도록 처리.
                </p>
                <div>
                  <p className="mb-3">
                    <b>검증 방법</b>: 초당 15회로 동시 입찰 요청을 지속 발생시키며 3단계
                    체크(HTTP 로그인 → WebSocket 연결 → STOMP 연결) 수행
                    <br />
                    <b>결과</b>: 수행한 2,079개 checks 전부 통과, 실패 0건
                    <br />
                    <b>지표의 성격</b>: checks는 각 단계(로그인 · 연결)의 통과 여부. 처리량 · 지연이나
                    최고가 정합성을 직접 측정한 지표는 아님
                  </p>
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
                Redis 호출에서 예외(DataAccessException) 발생 시 <b>DB Fallback mode 전환</b> (동시성 제어를 위한 비관적 락 처리).
                <br/> 이후 입찰 요청마다 해당 경매의 최고가를 DB → Redis로 재동기화해 보고, 성공하면 Redis 입찰로 자동 복귀.
              </>
            }
            result={
              <>Redis 서버가 다운되어도 DB만으로 입찰이 계속되고, Redis가 돌아오면 정상 모드로 복귀.</>
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

      <Section id="retrospect" no="08" title="성과와 배운 점">
        <Retrospect
          gains={[
            <>
              <b>외부 시스템 장애를 전제한 폴백 설계</b> — Redis 예외 시 DB 비관적 락 전환 →
              재동기화 성공 시 복귀
            </>,
            <>
              <b>Redis의 원자성 범위 파악</b>과 Lua Script 기반 동시성 제어
            </>,
            <>
              <b>WebSocket 연결 수립 과정</b>과 프록시 Upgrade 헤더 의존성 — 로컬/배포 환경
              차이(Nginx 설정 누락)로 확인
            </>,
          ]}
          questions={[
            <>
              Queue도 In-memory라 서버 종료 시 유실. 영속화 수단이나 외부 큐 도입에 대한 검토가
              남음
            </>,
            <>
              Fallback 복귀 시 재동기화는 요청이 들어온 경매 1건만 대상이고, 모드 플래그도 서버
              인스턴스 안에만 있음. 여러 경매 · 여러 서버 상황의 동기화는 미해결
            </>,
            <>
              IDENTITY 전략에서는 JDBC 배치 INSERT가 동작하지 않음. 실제 배치 저장을 위해
              JdbcTemplate batchUpdate 등의 검토가 남음
            </>,
          ]}
        />
      </Section>
    </>
  )
}
