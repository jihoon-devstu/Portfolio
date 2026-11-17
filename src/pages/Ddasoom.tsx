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
  Sub,
} from '../components/ui'

/** Access / Refresh 토큰 전략 비교 표 */
function TokenTable() {
  const rows: { label: string; at: string; rt: string }[] = [
    { label: '클라이언트 저장', at: '프론트 메모리(Zustand), localStorage 금지', rt: 'HttpOnly 쿠키' },
    { label: '서버 저장', at: '없음 (서버가 기억하지 않음)', rt: 'Redis' },
    { label: '전송 방식', at: 'Authorization: Bearer 헤더', rt: '쿠키 자동 전송' },
    { label: '유효 기간', at: '30분', rt: '14일 (재발급 시 새 토큰으로 교체)' },
    { label: '무효화 수단', at: '토큰 고유번호(jti) 블랙리스트 + 회원 단위 마커', rt: 'Redis 키 삭제 (로그아웃, 탈퇴, 제재)' },
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
    { title: '① 서명과 만료 검증', desc: 'parseClaims: 위조/만료 토큰 즉시 차단', cost: 'CPU 연산' },
    { title: '② category 확인', desc: 'RT를 AT 자리에 꽂는 오용 차단', cost: 'CPU 연산' },
    { title: '③ jti 블랙리스트 확인', desc: '로그아웃된 토큰(고유번호 jti)인지 확인', cost: 'Redis 1회' },
    { title: '④ 강제 로그아웃 마커 확인', desc: '탈퇴, 제재 회원의 모든 토큰 차단', cost: 'Redis 1회' },
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

/** 결정 로그 한 건: 상황 / 검토한 선택지 / 결정 / 감수한 것 */
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

      {/* 검토한 선택지: 채택한 행만 강조해 무엇을 고르고 무엇을 버렸는지 한눈에 */}
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
        tagline="Project 03 | 유기동물 임시보호 커뮤니티 플랫폼"
        description={
          <>
            유기동물 조회, 임시보호, 커뮤니티 플랫폼입니다. <b>팀장으로 회원, 보안, 공통 모듈을
            담당</b>했고, 팀 Notion에 남긴 고민을 <b>상황 → 선택지 → 결정 → 감수한 것</b> 순서로
            정리했습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2026.06 – 2026.07' },
          { label: '팀 구성', value: '5명 (팀장)' },
          { label: '담당', value: '회원, 보안, 공통 모듈' },
          { label: '과정', value: 'SeSAC 영등포캠퍼스 8기' },
        ]}
        stacks={[
          'Java 21',
          'Spring Boot 3.5',
          'Spring Security',
          'JWT',
          'OAuth2 (구글, 카카오, 네이버)',
          'Spring Data JPA',
          'QueryDSL',
          'MySQL 8',
          'Redis',
          'Flyway',
          'MinIO',
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
          { id: 'overview', label: '개요와 역할' },
          { id: 'architecture', label: '인증 아키텍처' },
          { id: 'decisions', label: '결정 로그' },
          { id: 'troubleshooting', label: '트러블슈팅' },
          { id: 'etc', label: '그 외 구현' },
          { id: 'retrospect', label: '성과와 배운 점' },
        ]}
      />

      <Section id="overview" no="01" title="개요와 역할">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          흩어진 유기동물 정보와 입양 사이에 <b>'임시보호'라는 중간 단계</b>를 두는 커뮤니티
          플랫폼입니다.
        </p>
        <div className="mt-6 max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>
              <b>찾는다</b>: 전국 유기동물 정보를 한 곳에서 조회
            </li>
            <li>
              <b>함께한다</b>: 임시보호 신청과 관리 (신청 → 심사 → 승인 → 연장 → 종료)
            </li>
            <li>
              <b>나눈다</b>: 임보와 입양 경험을 커뮤니티에서 공유
            </li>
          </ul>
          <p className="mt-3 text-base text-slate-500">관리자는 대시보드 하나로 전 과정을 관리합니다.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/ddasoom/service-main.png"
            alt="따숨 메인 페이지"
            caption="따숨 메인"
            imgClassName="h-72 object-cover object-top"
          />
          <Figure
            src="/images/ddasoom/animal-list.png"
            alt="유기동물 찾기 목록"
            caption="유기동물 찾기: 축종, 성별, 보호 상태, 지역 필터"
            imgClassName="h-72 object-cover object-top"
          />
        </div>

        <h3 className="mb-3 mt-10 font-bold text-ink">팀에서 나의 자리</h3>
        <p className="mb-4 max-w-3xl text-base text-slate-600">
          Spring Security 기반 인증과 인가를 직접 설계해 보고 싶어 회원, 보안, 공통 모듈을 맡았습니다.
        </p>
        <RoleSplit
          roles={[
            {
              role: '회원, 보안, 공통 모듈',
              detail: '로그인과 회원가입, 인증과 인가, 회원 관리, 팀 공통 규격과 컨벤션 문서',
              mine: true,
            },
            { role: '임시보호', detail: '신청 → 승인 → 연장 → 종료 상태 관리' },
            { role: '커뮤니티, 이미지', detail: '게시판, 댓글, 이미지 저장소, DB 마이그레이션' },
            { role: '유기동물 데이터', detail: '공공 API 연동과 자동 동기화, 좋아요' },
            { role: '고객지원, 통계', detail: '공지, FAQ, QnA, 신고, 관리자 대시보드' },
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
          <Expand summary="인가 정책: 기본 잠금 + 등록제">
            <p>
              <b>모든 경로를 기본 잠금</b>으로 두고 공개할 경로만 등록했습니다.
            </p>
            <div className="mt-3">
              <Bullets
                items={[
                  <>
                    공개 범위별로{' '}
                    <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">
                      PUBLIC_URIS, PUBLIC_GET_URIS, USER_URIS
                    </code>{' '}
                    에 나눠 등록
                  </>,
                  <>
                    <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">/api/admin/**</code>는
                    ADMIN만 접근
                  </>,
                  '소셜 가입 직후는 GUEST, 추가 정보 입력 후 USER로 승급',
                  <>
                    등록을 깜빡한 경로도{' '}
                    <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">
                      anyRequest().authenticated()
                    </code>
                    로 잠김
                  </>,
                ]}
              />
            </div>
          </Expand>
        </div>
      </Section>

      <Section
        id="decisions"
        no="03"
        title="설계 결정 로그"
        subtitle="팀 Notion의 트레이드오프 문서에서 옮긴 실제 결정 과정입니다."
      >
        <div className="space-y-8">
          <Decision
            no={1}
            title="토큰을 어디에 저장할 것인가"
            context={<>AT와 RT의 저장 위치에 따라 방어책과 프론트, 백엔드의 역할이 달라짐</>}
            options={[
              { name: 'A. AT는 프론트 메모리 + RT는 HttpOnly 쿠키와 Redis', chosen: true },
              { name: 'B. AT는 localStorage + RT는 HttpOnly 쿠키와 Redis' },
              { name: 'C. AT와 RT 모두 HttpOnly 쿠키' },
            ]}
            decision={
              <>
                <b>방식 A 채택</b>
                <Sub
                  items={[
                    'B는 삽입된 스크립트가 저장소를 읽을 수 있어 XSS에 취약',
                    'C는 쿠키가 매 요청 자동 전송되어 CSRF, CORS 문제',
                  ]}
                />
              </>
            }
            tradeoff={<>새로고침하면 AT가 사라져 재발급 흐름이 필요</>}
            detail={
              <Bullets
                items={[
                  '여러 API가 동시에 401을 받으면 진행 중인 재발급 하나를 공유(single-flight)',
                  'reissue는 인터셉터 없는 기본 axios로 호출해 무한 루프 차단',
                ]}
              />
            }
          />

          <Decision
            no={2}
            title="관리자가 제재한 회원을 즉시 차단할 수 있는가"
            context={
              <>
                탈퇴나 제재 뒤에도 <b>기존 AT는 최대 30분 유효</b>하고, 관리자는 그 AT를 알 수 없음
              </>
            }
            options={[
              { name: 'A. AT 자연 만료까지 대기', note: '30분간 자유롭게 활동 가능' },
              { name: 'B. 매 요청 DB 상태 조회', note: '확실하지만 JWT를 쓰는 의미가 없어짐' },
              {
                name: (
                  <>
                    C. <b>회원 단위 차단 키</b>
                  </>
                ),
                note: <>forceLogout:{'{memberId}'} 마커를 Redis에 AT 최대 수명만큼 보관</>,
                chosen: true,
              },
            ]}
            decision={
              <>
                <b>회원 단위 차단 키 채택</b>
                <Sub items={['정지된 사람은 즉시 아무것도 못 하게', 'TTL은 AT 최대 수명(30분)과 동일']} />
              </>
            }
            tradeoff={<>유효한 AT 요청당 Redis 조회 최대 1회 → 2회 (마커는 탈퇴와 제재 때만 등록)</>}
          />
        </div>
      </Section>

      <Section id="troubleshooting" no="04" title="트러블슈팅">
        <div className="space-y-8">
          <TroubleCard
            no={1}
            title="OAuth2 성공 리다이렉트에 AT를 실을 수 없다"
            problem={<>리다이렉트 주소에 AT를 실으면 <b>토큰이 노출</b>됨</>}
            cause={<>"AT는 응답 본문으로만 전달"이라는 원칙(결정 01)과 리다이렉트 흐름이 충돌</>}
            solution={
              <>
                <b>RT 쿠키만 심고 AT 없이 리다이렉트</b>, 콜백 페이지가 재발급 API로 AT를 받음
              </>
            }
            result={<>일반 로그인과 소셜 로그인의 토큰 전달 방식 통일</>}
            detail={
              <>
                <Bullets
                  items={[
                    '소셜 신원은 이메일이 아니라 provider + providerId로 판별',
                    '기존 계정과 이메일이 겹치면 자동 연동 대신 차단해 계정 탈취 방지',
                  ]}
                />
                <Figure
                  src="/images/ddasoom/login.png"
                  alt="로그인 화면"
                  caption="로그인 화면: 자체 로그인 + 카카오, 네이버, 구글"
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
              <b>이메일 인증 남용 방어</b>
              <Sub items={['IP당 시간 10회, 같은 이메일 60초 재발송 제한', '검증 5회 실패 시 코드 폐기, 코드는 6자리에 Redis TTL 3분']} />
            </>,
            <>
              <b>계정 생명주기</b>
              <Sub items={['탈퇴는 소프트 삭제, 같은 이메일 재가입 차단, 관리자 복구 허용', '탈퇴와 제재 때 강제 로그아웃 마커(결정 02)로 즉시 차단']} />
            </>,
            <>
              <b>관리자 회원 검색</b>
              <Sub items={['QueryDSL로 키워드, 권한, 상태 조건 조합', '컬럼에 없는 상태 정렬은 CASE로 계산']} />
            </>,
            <>
              <b>공통 규격</b>
              <Sub
                items={[
                  <>
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">ApiResponse&lt;T&gt;</code> 단일
                    응답 규격
                  </>,
                  'GlobalExceptionHandler + 도메인별 ErrorCode',
                  'PageableSanitizer(허용 정렬, size 상한)를 13개 컨트롤러에 적용',
                ]}
              />
            </>,
            <>
              <b>문서 우선 협업</b>
              <Sub items={['코드, DB, 보안 컨벤션은 저장소 docs에서 관리', '트러블슈팅과 트레이드오프는 Notion에 기록']} />
            </>,
          ]}
        />

        {/* 직접 작성한 설계 문서 3종 */}
        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {[
            {
              name: 'SECURITY-FLOW.md',
              href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/SECURITY-FLOW_V3.md',
              desc: '인증과 인가 흐름, 설계 결정의 근거',
            },
            {
              name: 'BACKEND_CODE_CONVENTIONS.md',
              href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/BACKEND_CODE_CONVENTIONS.md',
              desc: '패키지 구조, 네이밍, 응답 규격',
            },
            {
              name: 'DB_CONVENTIONS.md',
              href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/DB_CONVENTIONS.md',
              desc: '테이블과 컬럼 네이밍, FK 규칙',
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
            caption="유저 관리 목록: 키워드, 권한, 상태 필터"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Figure
              src="/images/ddasoom/code-review.png"
              alt="코드 리뷰 코멘트"
              caption="공공 API 데이터 검증 로직 코드 리뷰"
            />
            <Figure
              src="/images/ddasoom/notion-troubleshooting.png"
              alt="Notion 트러블슈팅과 트레이드오프 문서"
              caption="결정 로그의 출처: Notion 트러블슈팅 기록"
            />
          </div>
        </div>
      </Section>

      <Section id="retrospect" no="06" title="성과와 배운 점">
        <Retrospect
          gains={[
            <>
              <b>Spring Security 인증 인프라 직접 구현</b>: 필터 체인부터 무효화까지
            </>,
            <>
              <b>토큰 저장 위치 결정</b>: XSS와 CSRF 트레이드오프를 비교해 선택
            </>,
            <>
              <b>무효화 설계</b>: jti 블랙리스트 + 회원 단위 마커, Redis 조회 최대 2회 감수
            </>,
            <>
              <b>결정 로그 문서화</b>: 선택지와 근거를 Notion과 docs에 함께 남김
            </>,
          ]}
          questions={[
            <>인증 서버(Keycloak)에 맡기는 방식과의 비교 → 이후 곳간에서 Keycloak + gateway 구조를 경험</>,
          ]}
        />
      </Section>
    </>
  )
}
