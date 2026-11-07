import type { ReactNode } from 'react'
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
} from '../components/ui'

/** Access / Refresh 토큰 전략 비교 표 */
function TokenTable() {
  const rows: { label: string; at: string; rt: string }[] = [
    { label: '클라이언트 저장', at: '프론트 메모리(Zustand), localStorage 금지', rt: 'HttpOnly 쿠키' },
    { label: '서버 저장', at: '없음 (서버가 기억하지 않음)', rt: 'Redis' },
    { label: '전송 방식', at: 'Authorization: Bearer 헤더', rt: '쿠키 자동 전송' },
    { label: '유효 기간', at: '30분', rt: '14일 (재발급 시 새 토큰으로 교체)' },
    { label: '무효화 수단', at: '토큰 고유번호(jti) 블랙리스트 + 회원 단위 마커', rt: 'Redis 키 삭제 (로그아웃·탈퇴·제재)' },
  ]
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200">
      <table className="w-full min-w-[640px] text-left text-base">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-500">
            <th className="px-4 py-3 font-semibold">구분</th>
            <th className="px-4 py-3 font-semibold text-accent-deep">Access Token</th>
            <th className="px-4 py-3 font-semibold text-ink">Refresh Token</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-slate-100 last:border-b-0">
              <td className="px-4 py-3 font-medium text-slate-500">{r.label}</td>
              <td className="px-4 py-3 text-slate-700">{r.at}</td>
              <td className="px-4 py-3 text-slate-700">{r.rt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** JWT 필터 검증 순서 다이어그램 */
function FilterChainDiagram() {
  const steps = [
    { title: '① 서명·만료 검증', desc: 'parseClaims: 위조/만료 토큰 즉시 차단', cost: 'CPU 연산' },
    { title: '② category 확인', desc: 'RT를 AT 자리에 꽂는 오용 차단', cost: 'CPU 연산' },
    { title: '③ jti 블랙리스트 등록 여부 확인', desc: '로그아웃된 토큰(고유번호 jti)인지 확인', cost: 'Redis 1회' },
    { title: '④ 강제 로그아웃 마커 등록 여부 확인', desc: '탈퇴·제재 회원의 모든 토큰 차단', cost: 'Redis 1회' },
    { title: '⑤ 인증 객체 구성', desc: 'memberId + role 을 담은 UserDetails 객체 생성'},
  ]
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
      <div className="grid gap-2 sm:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s.title} className="relative rounded-md border border-slate-300 bg-white p-4">
            <div className="text-base font-bold text-ink">{s.title}</div>
            <div className="mt-1.5 text-sm leading-snug text-slate-500">{s.desc}</div>
            {s.cost && (
              <div className="mt-2.5 inline-block rounded bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-deep">
                {s.cost}
              </div>
            )}
            {i < steps.length - 1 && (
              <span className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-slate-300 sm:block">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/** 결정 로그 한 건 — 상황 / 검토한 선택지 / 결정 / 감수한 것 */
function Decision({
  no,
  title,
  context,
  options,
  decision,
  tradeoff,
  detail,
}: {
  no: number
  title: string
  context: ReactNode
  options: { name: ReactNode; note?: ReactNode; chosen?: boolean }[]
  decision: ReactNode
  tradeoff: ReactNode
  detail?: ReactNode
}) {
  /** 라벨 + 본문 한 행. 기준선을 맞춰 줄이 어긋나지 않게 한다. */
  const row = (label: string, body: ReactNode, accent = false) => (
    <div
      className={
        'flex flex-col gap-1 px-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-5 sm:px-3 ' +
        (accent ? 'bg-accent-soft/70' : '')
      }
    >
      <span
        className={
          'w-24 shrink-0 text-sm font-bold ' + (accent ? 'text-accent-deep' : 'text-slate-400')
        }
      >
        {label}
      </span>
      <div className="min-w-0 flex-1 leading-relaxed text-slate-700">{body}</div>
    </div>
  )
  const hasNote = options.some((o) => o.note)
  return (
    <div>
      <div className="flex items-baseline gap-3 border-b-2 border-ink pb-3">
        <span className="shrink-0 text-sm font-bold text-accent">
          결정 {String(no).padStart(2, '0')}
        </span>
        <h3 className="text-lg font-bold text-ink">{title}</h3>
      </div>

      <div className="border-b border-slate-200">{row('상황', context)}</div>

      {/* 검토한 선택지 — 채택한 행만 강조해 무엇을 고르고 무엇을 버렸는지 한눈에 */}
      <div className="mt-6">
        <p className="mb-2.5 px-1 text-sm font-bold text-slate-400 sm:px-3">검토한 선택지</p>
        <div className="overflow-x-auto rounded-md border border-slate-200">
          <table className={'w-full text-left ' + (hasNote ? 'min-w-[560px]' : 'min-w-[420px]')}>
            <tbody className="divide-y divide-slate-100">
              {options.map((o, i) => (
                <tr key={i} className={o.chosen ? 'bg-accent-soft/70' : ''}>
                  <td
                    className={
                      'px-4 py-3 align-top leading-relaxed ' +
                      (hasNote ? 'w-2/5 ' : '') +
                      (o.chosen ? 'font-semibold text-accent-deep' : 'font-medium text-slate-600')
                    }
                  >
                    {o.name}
                  </td>
                  {hasNote && (
                    <td className="px-4 py-3 align-top leading-relaxed text-slate-600">{o.note}</td>
                  )}
                  <td className="w-24 px-4 py-3 align-top text-right">
                    {o.chosen && (
                      <span className="whitespace-nowrap text-sm font-bold text-accent-deep">
                        ✓ 채택
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 divide-y divide-slate-100 border-y border-slate-200">
        {row('채택 방식', decision, true)}
        {row('감수한 것', tradeoff)}
      </div>

      {detail && (
        <details className="group mt-3 rounded-md bg-slate-50">
          <summary className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-500 hover:text-ink">
            <span className="chevron text-accent">▶</span>
            상세 내용 및 설계
          </summary>
          <div className="space-y-4 px-4 pb-4 leading-relaxed text-slate-700">{detail}</div>
        </details>
      )}
    </div>
  )
}

export default function Ddasoom() {
  return (
    <>
      <ProjectHeader
        name="Ddasoom (따숨)"
        tagline="Project 03 · 유기동물 임시보호 커뮤니티 플랫폼"
        description={
          <>
            유기동물 조회·임시보호·커뮤니티 플랫폼입니다. <b>팀장으로서 회원·보안·공통모듈을
            담당</b>하였으며, 이 페이지는 실제로 팀 Notion에 기록하였던 고민거리들을 <b>(상황 → 선택지 → 결정 → 감수한 것)</b> 순서대로 정리했습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2026.06 – 2026.07' },
          { label: '팀 구성', value: '5명 (팀장)' },
          { label: '담당', value: '회원 · 보안 · 공통모듈' },
          { label: '과정', value: 'SeSAC 영등포캠퍼스 8기' },
        ]}
        stacks={[
          'Java 21',
          'Spring Boot 3.5',
          'Spring Security',
          'JWT · OAuth2 (구글·카카오·네이버)',
          'Spring Data JPA · QueryDSL',
          'MySQL 8 · Redis',
          'Flyway · MinIO',
          'React 19 + TypeScript',
          'Swagger',
        ]}
        links={[
          { label: 'Backend GitHub', href: 'https://github.com/SeSac-3/ddasoom-backend' },
          { label: 'Frontend GitHub', href: 'https://github.com/SeSac-3/ddasoom-frontend' },
        ]}
      />

      <SectionNav
        items={[
          { id: 'overview', label: '개요 · 역할' },
          { id: 'architecture', label: '인증 아키텍처' },
          { id: 'decisions', label: '결정 로그' },
          { id: 'troubleshooting', label: '트러블슈팅' },
          { id: 'etc', label: '그 외 구현' },
          { id: 'retrospect', label: '성과와 배운 점' },
        ]}
      />

      <Section id="overview" no="01" title="개요 · 역할">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          흩어진 유기동물 정보와 입양 사이에 <b>'임시보호'라는 중간 단계</b>를 두는 커뮤니티
          플랫폼입니다.
        </p>
        <div className="mt-6 max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>
              <b>찾는다</b> · 전국 유기동물 정보를 한 곳에서 조회
            </li>
            <li>
              <b>함께한다</b> · 임시보호를 신청하고 관리 (신청 → 심사 → 승인 → 연장 → 종료)
            </li>
            <li>
              <b>나눈다</b> · 임보·입양 경험을 커뮤니티에서 공유
            </li>
          </ul>
          <p className="mt-3 text-base text-slate-500">관리자는 대시보드 하나로 전 과정을 관리합니다.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/ddasoom/service-main.png"
            alt="따숨 메인 페이지"
            caption="따숨 메인 · 전국 유기동물 조회·임시보호·커뮤니티 플랫폼"
            imgClassName="h-72 object-cover object-top"
          />
          <Figure
            src="/images/ddasoom/animal-list.png"
            alt="유기동물 찾기 목록"
            caption="유기동물 찾기 · 축종·성별·보호상태·지역 필터 검색"
            imgClassName="h-72 object-cover object-top"
          />
        </div>

        <h3 className="mb-3 mt-10 font-bold text-ink">팀에서 나의 자리</h3>
        <p className="mb-4 max-w-3xl text-base text-slate-600">
          도메인 단위로 나눠 맡았습니다. Spring Security 기반 인증/인가를 직접 설계해 보고 싶어
          회원 · 보안 · 공통모듈을 맡았습니다.
        </p>
        <RoleSplit
          roles={[
            {
              role: '회원 · 보안 · 공통모듈',
              detail:
                '로그인/회원가입/인증·인가 인프라, 회원 관리(마이페이지·관리자), 팀 공통 규격(응답·예외·페이징)과 컨벤션 문서',
              mine: true,
            },
            { role: '임시보호', detail: '신청 → 승인 → 연장 → 종료 상태 관리' },
            { role: '커뮤니티 · 이미지', detail: '게시판·댓글, 이미지 저장소, DB 마이그레이션 관리' },
            { role: '유기동물 데이터', detail: '공공 API 연동·자동 동기화, 좋아요' },
            { role: '고객지원 · 통계', detail: '공지·FAQ·QnA·신고, 관리자 대시보드·통계' },
          ]}
        />
      </Section>

      <Section id="architecture" no="02" title="인증 아키텍처">
        <TokenTable />
        <div className="mt-6">
          <h3 className="mb-3 font-bold text-ink">요청당 인증 파이프라인</h3>
          <FilterChainDiagram />
        </div>
        <div className="mt-6">
          <Expand summary="인가 정책: '기본 잠금 + 등록제' 설계">
            <p>
              <b>모든 경로를 기본
              잠금</b>으로 두고 공개할 경로만 명시적으로 등록하는 방식을 택했습니다.
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                · 인증/인가 정책 여부에 따라 {' '}
                <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">
                  PUBLIC_URIS / PUBLIC_GET_URIS / USER_URIS
                </code>
                에 나누어 작성.
              </li>
              <li>
                · <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">/api/admin/**</code>{' '}
                은 ADMIN 자동 잠금. 경로 규칙만 지키면 인가 시스템 활용 가능
              </li>
              <li>
                · 소셜 가입 직후는 GUEST 권한 부여. 추가 정보 입력 API 및 공개 경로만 허용하고, 완료 후 USER 권한으로 승급
              </li>
              <li>
                · 미분류 경로는{' '}
                <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">
                  anyRequest().authenticated()
                </code>
                를 거치므로, '등록을 깜빡한 경로' 역시 잠금 처리
              </li>
            </ul>
          </Expand>
        </div>
      </Section>

      <Section
        id="decisions"
        no="03"
        title="설계 결정 로그"
        subtitle="팀 Notion의 트레이드오프 문서에서 옮긴, 실제 결정 과정의 기록입니다."
      >
        <div className="space-y-8">
          <Decision
            no={1}
            title="토큰을 어디에 저장할 것인가"
            context={
              <>
                Access Token(이하 AT) 과 Refresh Token(이하 RT) 의 저장 위치에 따라 방어책 및 프론트 / 백의 역할 분담이 달라짐.
              </>
            }
            options={[
              { name: 'A. AT는 프론트 메모리 + RT는 HttpOnly 쿠키/Redis', chosen: true },
              { name: 'B. AT는 localStorage + RT는 HttpOnly 쿠키/Redis' },
              { name: 'C. AT/RT 모두 HttpOnly 쿠키' },
            ]}
            decision={
              <>
                <b>방식 A 채택.</b>
                <br/>B는 악의적으로 삽입된 스크립트가 저장소를 그대로 읽을 수 있어 AT 탈취에 취약. (XSS)
                <br/>C는 쿠키가 매 요청 자동 전송되는 특성 때문에 CSRF·CORS 이슈 발생
              </>
            }
            tradeoff={
              <>A 방식의 경우, 새로고침 시 토큰이 소실되므로 그에 대한 대비책을 준비하여야 함.</>
            }
            detail={
              <p>
                한 탭 안에서 여러 API가 동시에 401을 받는 경우를 위해 프론트에는 Single-flight
                패턴(진행 중인 재발급 Promise를 공유)을 적용. 
                <br/>reissue 요청은 인터셉터가 붙지 않은 기본 axios로 호출하여 재발급 무한 루프 가능성 차단.
              </p>
            }
          />

          <Decision
            no={2}
            title="관리자가 제재한 회원을 '즉시' 차단할 수 있는가"
            context={
              <>
                탈퇴 · 제재 처리해도 <b>기존에 발급한 AT는 최대 30분간 유효</b>. 관리자는 대상의 AT를 알 수 없어 블랙리스트 등록 불가능
              </>
            }
            options={[
              { name: 'A. AT 자연 만료까지 대기', note: '30분간 자유롭게 활동 가능' },
              {
                name: 'B. 매 요청 DB 상태 조회',
                note: '확실하지만 매 요청마다 DB를 다녀와, JWT를 쓰는 의미가 없어짐',
              },
              {
                name: (
                  <>
                    C. <b>회원 단위 차단 키</b>
                  </>
                ),
                note: (
                  <>forceLogout:{'{memberId}'} 마커를 Redis에 AT 최대 수명만큼 보관</>
                ),
                chosen: true,
              },
            ]}
            decision={
              <>
                <b>회원 단위 차단 키 채택.</b> '정지된 사람은 즉시 아무것도 할 수 없어야 한다'는
                원칙 우선. TTL은 AT 최대 수명(30분)과 동일.
              </>
            }
            tradeoff={
              <>유효한 AT 요청당 Redis 조회 최대 1회 → 2회. 마커 등록은 탈퇴(자진 · 강제) · 제재 시로 한정.</>
            }
          />
        </div>
      </Section>

      <Section id="troubleshooting" no="04" title="트러블슈팅">
        <div className="space-y-8">

          <TroubleCard
            no={1}
            title="OAuth2 성공 리다이렉트에 AT를 실을 수 없다"
            problem={
              <>
                리다이렉트에 AT를 실으면 <b>토큰이 노출</b>됩니다.
              </>
            }
            cause={<>'AT는 body로만 전달' 원칙(결정 01)과 OAuth2 리다이렉트 흐름의 충돌.</>}
            solution={
              <>
                <b>RT 쿠키만 심고 AT 없이 리다이렉트</b>, 콜백 페이지가 재발급 API로 AT 수령.
              </>
            }
            result={<>일반 로그인과 소셜 로그인의 토큰 전달 원칙 통일.</>}
            detail={
              <>
                <p>
                  소셜 신원은 위·변조 가능성이 있는 이메일이 아닌, 소셜 서비스가 발급하는 고유
                  ID(provider + providerId)로 판별하고, 기존 계정과 이메일이 충돌하면 자동 연동
                  대신 차단을 택해 계정 탈취 가능성을 제거했습니다.
                </p>
                <Figure
                  src="/images/ddasoom/login.png"
                  alt="로그인 화면"
                  caption="로그인 화면 · 자체 로그인 + 카카오·네이버·구글 OAuth2"
                  className="mx-auto max-w-lg"
                />
              </>
            }
          />
        </div>
      </Section>

      <Section id="etc" no="05" title="그 외 구현">
        <Bullets
          items={[
            <>
              <b>이메일 인증 남용 방어</b>: IP 시간당 10회 · 동일 이메일 60초 재발송 제한 · 검증 5회
              실패 시 코드 폐기. 코드는 랜덤 6자리, Redis TTL 3분
            </>,
            <>
              <b>계정 생명주기</b>: 탈퇴는 소프트 삭제 — 동일 이메일 재가입은 차단, 관리자 복구는
              허용. 탈퇴(자진 · 강제) · 제재 시 강제 로그아웃 마커(결정 02)를 등록해 즉시 차단, 복구 시 해제
            </>,
            <>
              <b>관리자 회원 검색</b>: QueryDSL로 키워드 · 권한 · 상태 조건 조합. 컬럼에 없는 상태
              정렬은 CASE로 계산
            </>,
            <>
              <b>공통 규격</b>: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">ApiResponse&lt;T&gt;</code>{' '}
              단일 응답 규격, GlobalExceptionHandler + 도메인별 ErrorCode enum(코드 · 메시지 · HTTP 상태)
            </>,
            <>
              <b>PageableSanitizer</b>: 허용된 정렬 기준만 통과, size 최대값 제한. 13개 컨트롤러에
              일괄 적용
            </>,
            <>
              <b>문서 우선 협업</b>: 코드 · DB · 보안 컨벤션을 저장소 docs에서 관리, 트러블슈팅 ·
              트레이드오프는 Notion에 기록
            </>,
          ]}
        />

        {/* 직접 작성한 설계 문서 3종 */}
        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {[
            {
              name: 'SECURITY-FLOW.md',
              href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/SECURITY-FLOW_V3.md',
              desc: '인증/인가 전체 흐름과 설계 결정의 근거',
            },
            {
              name: 'BACKEND_CODE_CONVENTIONS.md',
              href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/BACKEND_CODE_CONVENTIONS.md',
              desc: '패키지 구조와 네이밍 · 응답 규격',
            },
            {
              name: 'DB_CONVENTIONS.md',
              href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/DB_CONVENTIONS.md',
              desc: '테이블 · 컬럼 네이밍과 FK 규칙',
            },
          ].map((d) => (
            <a
              key={d.name}
              href={d.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-md border border-slate-200 p-5 transition-all hover:border-accent-line hover:shadow-md"
            >
              <div className="flex items-center gap-2 font-semibold text-ink">
                <span className="text-accent">📄</span>
                <span className="break-all">{d.name}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.desc}</p>
              <div className="mt-3 text-xs font-semibold text-accent">GitHub에서 보기 ↗</div>
            </a>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <Figure
            src="/images/ddasoom/admin-users.png"
            alt="관리자 유저 관리 목록"
            caption="유저 관리 목록 · 키워드 · 권한 · 상태 필터와 정렬"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Figure
              src="/images/ddasoom/code-review.png"
              alt="코드 리뷰 코멘트"
              caption="공공 API 데이터 검증 로직에 남긴 코드 리뷰 · 경계 케이스 지적과 합의"
            />
            <Figure
              src="/images/ddasoom/notion-troubleshooting.png"
              alt="Notion 트러블슈팅·트레이드오프 문서"
              caption="트러블슈팅 & 트레이드오프 기록 · 결정 로그의 출처"
            />
          </div>
        </div>
      </Section>

      <Section id="retrospect" no="06" title="성과와 배운 점">
        <Retrospect
          gains={[
            <>
              <b>Spring Security 필터 체인 기반 인증/인가 인프라 직접 구현</b>
            </>,
            <>
              <b>토큰 저장 위치 결정</b> — AT 프론트 메모리 / RT HttpOnly 쿠키 + Redis, XSS · CSRF
              트레이드오프 비교
            </>,
            <>
              <b>무효화 설계</b> — jti 블랙리스트 + 회원 단위 강제 로그아웃 마커, 요청당 Redis 조회
              최대 2회 감수
            </>,
            <>
              <b>선택지 · 근거를 함께 남기는 결정 로그 문서화</b> (Notion → docs/SECURITY-FLOW)
            </>,
          ]}
          questions={[
            <>
              인증을 직접 구현하는 대신 Spring Authorization Server · Keycloak 같은 인증 서버에
              맡기는 방식과의 비교 학습 필요
            </>,
          ]}
        />
      </Section>
    </>
  )
}
