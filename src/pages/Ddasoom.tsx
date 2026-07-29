import type { ReactNode } from 'react'
import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import { Bullets, Expand, Figure, Section, SectionNav } from '../components/ui'

/** Access / Refresh 토큰 전략 비교 표 */
function TokenTable() {
  const rows: { label: string; at: string; rt: string }[] = [
    { label: '클라이언트 저장', at: '프론트 메모리(Zustand), localStorage 금지', rt: 'HttpOnly 쿠키' },
    { label: '서버 저장', at: '없음 (stateless)', rt: 'Redis' },
    { label: '전송 방식', at: 'Authorization: Bearer 헤더', rt: '쿠키 자동 전송' },
    { label: '유효 기간', at: '30분', rt: '14일 (rotation)' },
    { label: '무효화 수단', at: 'jti 블랙리스트 + 회원 단위 마커', rt: 'Redis 키 삭제 (로그아웃·탈퇴·제재)' },
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
    { title: '③ jti 블랙리스트', desc: '로그아웃된 토큰인지 확인', cost: 'Redis 1회' },
    { title: '④ 강제 로그아웃 마커', desc: '탈퇴·제재 회원의 모든 토큰 차단', cost: 'Redis 1회' },
    { title: '⑤ 인증 객체 구성', desc: 'memberId + role 을 담은 UserDetail 생성'},
  ]
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
      <div className="grid gap-2 sm:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s.title} className="relative rounded-md border border-slate-300 bg-white p-4">
            <div className="text-base font-bold text-ink">{s.title}</div>
            <div className="mt-1.5 text-sm leading-snug text-slate-500">{s.desc}</div>
            <div className="mt-2.5 inline-block rounded bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-deep">
              {s.cost}
            </div>
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
        tagline="Project 02 · 유기동물 임시보호 커뮤니티 플랫폼"
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
          { id: 'why', label: '왜 이 파트인가' },
          { id: 'architecture', label: '인증 아키텍처' },
          { id: 'decisions', label: '결정 로그' },
          { id: 'troubleshooting', label: '트러블슈팅' },
          { id: 'email', label: '이메일 인증' },
          { id: 'admin', label: '회원 관리' },
          { id: 'common', label: '공통 모듈·협업' },
          { id: 'retrospect', label: '성과와 배운 점' },
        ]}
      />

      <Section
        id="why"
        no="01"
        title="왜 이 파트인가"
        subtitle="Spring Security 기반 인증/인가를 직접 구현해 보고 싶었습니다."
      >
        <p className="max-w-3xl leading-relaxed text-slate-700">
          Spring Security를 설계한 것은 이번이 처음입니다. 이전 프로젝트의 인증 구현을
          공부하며 가져오려 하자 <br/><b>멀티탭 경합 같은 문제들이 드러났고</b>, 
          이를 고민하며 고쳐나간 과정이 아래 정리하였습니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                  PUBLIC_URI / USER_URI
                </code>
                에 나누어 작성.
              </li>
              <li>
                · <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">/api/auth/**</code>{' '}
                와일드카드를 의도적으로 금지하고 엔드포인트를 개별 등록. 
              </li>
              <li>
                · <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">/api/admin/**</code>{' '}
                은 ADMIN 자동 잠금. 경로 규칙만 지키면 인가 시스템 활용 가능
              </li>
              <li>
                · 소셜 가입 직후는 GUEST 권한 부여. 추가 정보 입력 API만 허용하고, 완료 후 USER 권한으로 승급
              </li>
              <li>
                · 미분류 경로는{' '}
                <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">
                  anyRequest().authenticated()
                </code>
                를 거치므로 , '등록을 깜빡한 경로' 역시 잠금 처리
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
                <br/>B는 AT가 XSS 공격에 취약. 
                <br/>C는 CSRF 및 CORS 이슈 발생
              </>
            }
            tradeoff={
              <>A 방식의 경우 , 새로고침 시 토큰이 소실되므로 부트스트랩(로그인 복원)과 401 자동 재발급 인터셉터를 구현 해야 함.</>
            }
            detail={
              <p>
                한 탭 안에서 여러 API가 동시에 401을 받는 경우를 위해 프론트에는 Single-flight
                패턴(진행 중인 재발급 Promise를 공유)을 적용. 
                <br/>reissue 요청은 인터셉터가 없는 별도 axios 인스턴스로 분리하여 재발급 무한 루프 가능성 차단.
                <br/>탭과 탭 사이의 경합은 서버의 Grace Period(30초)가, 한 탭 안에서의 경합은 프론트의 Single-flight가
                흡수하는 이중 구조 설계로 결정
              </p>
            }
          />

          <Decision
            no={2}
            title="RT 로테이션 (Reissue) 이 만드는 멀티탭 경합을 어떻게 풀 것인가"
            context={
              <>
                여러 탭이 같은 구 RT로 동시에 재발급을 요청하면{' '}
                <b>나머지 탭이 전부 로그아웃</b> 되는 경합 발생. 
              </>
            }
            options={[
              {
                name: 'A. 로테이션만 적용',
                note: '단순하지만 멀티탭 로그아웃 버그를 그대로 안게 됨',
              },
              {
                name: (
                  <>
                    B. 로테이션 + <b>Grace Period</b>
                  </>
                ),
                note: '회전 직후의 구 RT를 잠시 Redis에 같이 보관하여 동시 요청을 흡수',
                chosen: true,
              },
              {
                name: 'C. 로테이션 + 재사용 탐지',
                note: '보안은 강하지만 Grace Period 개념과 정면으로 상충',
              },
            ]}
            decision={
              <>
                <b>방식 B 채택 </b> 
                <br/>구 RT를 별도 키인 Grace Period(TTL 30초)로 보관해 뒤늦은 탭은 새 AT만 발급. 
                <br/>회전 체인 방지를 위해 <b>재회전은 금지</b>.
              </>
            }
            tradeoff={
              <> 구 RT 탈취 시 , Grace Period 의 TTL인 30초 간 재사용 여지. 새 AT 발급만 가능해 피해 범위는 한정됩니다.</>
            }
          />

          <Decision
            no={3}
            title="관리자가 제재한 회원을 '즉시' 차단할 수 있는가"
            context={
              <>
                강제탈퇴해도 <b>기존에 발급한 AT는 최대 30분간 유효</b>. 관리자는 대상의 AT를 알 수 없어 블랙리스트 등록 불가능
              </>
            }
            options={[
              { name: 'A. AT 자연 만료까지 대기', note: '30분간 자유롭게 활동 가능' },
              {
                name: 'B. 매 요청 DB 상태 조회',
                note: '확실하지만 무상태 설계의 이점을 전부 포기',
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
              <>요청당 Redis 조회 1회 → 2회. 적용 범위는 강제탈퇴·제재로 최소화.</>
            }
          />
        </div>
      </Section>

      <Section id="troubleshooting" no="04" title="트러블슈팅">
        <div className="space-y-8">
          <TroubleCard
            no={1}
            title="로그인 실패 응답: 보안(열거 공격)과 UX(사유 안내)의 상충"
            problem={
              <>
                사유를 안내하면 <b>이메일 존재가 노출</b>(열거 공격)되고, 숨기면 UX가 나빠집니다.
              </>
            }
            cause={<>보안과 UX가 정면으로 상충하는 트레이드오프.</>}
            solution={
              <>
                검증 2단 분리. 실패는 <b>단일 코드로 수렴</b>하고, 비밀번호가 일치한 본인에게만
                탈퇴/제재 사유 안내.
              </>
            }
            result={<>공격자는 정보를 얻지 못하고, 사용자는 정확한 사유를 안내받습니다.</>}
            detail={
              <p>
                자동 호출 경로인 재발급(reissue)은 사유를 구분하지 않고 단일 응답으로
                통일했습니다.
              </p>
            }
          />

          <TroubleCard
            no={2}
            title="OAuth2 성공 리다이렉트에 AT를 실을 수 없다"
            problem={
              <>
                리다이렉트에 AT를 실으면 <b>URL(히스토리·서버 로그)에 토큰이 노출</b>됩니다.
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
                  소셜 신원은 위·변조 가능성이 있는 이메일이 아닌 provider + providerId로 판별하고,
                  기존 계정과 이메일이 충돌하면 자동 연동 대신 차단을 택해 계정 탈취 가능성을
                  제거했습니다.
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

      <Section id="email" no="05" title="이메일 인증">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          인증 메일 발송은 비용이 드는 외부 I/O이므로, 남용을 순서대로 걸러내는 3단 방어를
          두었습니다.
        </p>
        <ol className="mt-5 max-w-3xl space-y-3">
          {[
            { step: '1차 · IP 제한', desc: '동일 IP 시간당 10회 초과 시 차단. 무차별 발송 봇 방어' },
            { step: '2차 · 쿨다운', desc: '동일 이메일 60초 재발송 제한. 연타 방지' },
            { step: '3차 · 시도 제한', desc: '검증 5회 초과 시 코드 즉시 폐기. 브루트포스 방어' },
          ].map((d, i) => (
            <li key={d.step} className="flex gap-4 leading-relaxed">
              <span className="shrink-0 text-sm font-bold text-slate-400">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <span className="font-bold text-ink">{d.step}</span>
                <span className="ml-2 text-slate-600">{d.desc}</span>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-3xl text-base text-slate-600">
          인증 코드는 SecureRandom 6자리, Redis TTL 3분. 모든 카운터는 TTL 자연 만료로 정리됩니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/ddasoom/signup-email.png"
            alt="회원가입 이메일 인증 메일"
            caption="실제 발송되는 인증 메일 · 6자리 코드, 3분 유효"
          />
          <Figure
            src="/images/ddasoom/signup.png"
            alt="회원가입 화면"
            caption="회원가입 · 인증 완료 후 30분 내 가입, 비밀번호 정책·닉네임 중복 검증"
          />
        </div>
      </Section>

      <Section id="admin" no="06" title="회원 관리">
        <Bullets
          items={[
            <>
              <b>계정 생명주기 설계</b>: soft delete 탈퇴, 동일 이메일 재가입 차단, 관리자 복구
              허용
            </>,
            <>
              <b>마이페이지</b>: 정보 수정, 비밀번호 변경(변경 시 <b>전 세션 무효화</b>), 로그인
              이력 조회, 자진 탈퇴
            </>,
            <>
              <b>QueryDSL 동적 검색</b>: 키워드/권한/상태 필터 조합과 CASE 식 파생 정렬
            </>,
            <>
              <b>제재·강제 탈퇴·복구</b>: 강제 로그아웃 마커(결정 03)와 연동해 즉시 차단, 복구 시
              해제
            </>,
            <>
              <b>관리자 계정 보호</b>: ADMIN은 제재 대상에서 제외, 가입 API로 생성 불가
            </>,
            <>
              <b>조회 2경로 분리</b>: 탈퇴 포함 조회는 관리자 전용으로 분리해 실수를 구조적으로
              차단
            </>,
          ]}
        />
        <div className="mt-6 space-y-4">
          <Figure
            src="/images/ddasoom/admin-users.png"
            alt="관리자 유저 관리 목록"
            caption="유저 관리 목록 · 키워드·권한·상태 필터와 정렬, 활성/숨김/탈퇴 상태 관리"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Figure
              src="/images/ddasoom/admin-user-detail.png"
              alt="회원 상세 (활성 회원)"
              caption="회원 상세(활성) · 소셜 연동·로그인 이력·신고 내역 확인, 회원 숨김/강제 탈퇴"
            />
            <Figure
              src="/images/ddasoom/admin-user-restore.png"
              alt="회원 상세 (탈퇴 회원)"
              caption="회원 상세(탈퇴) · 계정 복구 시 강제 로그아웃 마커 해제와 함께 정상화"
            />
          </div>
        </div>
      </Section>

      <Section id="common" no="07" title="공통 모듈과 협업 방식">
        <Bullets
          items={[
            <>
              <b>ApiResponse</b>: 모든 응답을 단일 규격으로 통일하여 프론트와의 연계성 고려
            </>,
            <>
              <b>GlobalExceptionHandler + 도메인별 ErrorCode</b>: 일관된 에러 응답 고려
            </>,
            <>
              <b>PageableSanitizer</b>: size , sort 등이 비정상적인 요청이 들어올 수 있음을 고려. 
              화이트리스트 + 상한 클램프 유틸을 만들어 13개 컨트롤러에 일괄 적용
            </>,
            <>
              <b>문서 우선 협업</b>: 1. 코드·DB·보안 컨벤션을 문서로 관리하여 프로잭트 안에서 공유.
              2. 트러블슈팅/트레이드오프/작업요청/라이브러리 도입 가이드 등을 Notion에 축적하여 문서화 된 작업 지향
            </>,
          ]}
        />

        {/* 직접 작성한 설계 문서 3종 */}
        <div className="mt-8">
          <h3 className="mb-3 font-bold text-ink">직접 작성한 설계 문서</h3>
          <p className="mb-4 text-base text-slate-600">
            백앤드 프로잭트의 docs 폴더 안에 들어있는 컨벤션 및 가이드라인 문서 입니다.
          </p>
          <div className="grid gap-3 lg:grid-cols-3">
            {[
              {
                name: 'SECURITY-FLOW.md',
                href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/SECURITY-FLOW_V3.md',
                desc: '인증/인가 전체 흐름과 모든 설계 결정의 근거를 기록',
              },
              {
                name: 'BACKEND_CODE_CONVENTIONS.md',
                href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/BACKEND_CODE_CONVENTIONS.md',
                desc: '패키지 구조와 네이밍·응답 규격. 규칙 변경은 문서 PR로만',
              },
              {
                name: 'DB_CONVENTIONS.md',
                href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/DB_CONVENTIONS.md',
                desc: '테이블·컬럼 네이밍과 FK 규칙 등 설계·리뷰 공통 기준',
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
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure src="/images/ddasoom/erd.png" alt="따숨 ERD" caption="팀 전체 ERD · 회원·소셜회원·로그인 이력 테이블 설계 담당" />
          <Figure src="/images/ddasoom/swagger.png" alt="Swagger API 문서" caption="Swagger 기반 API 문서 · 팀 협업 규격" />
          <Figure
            src="/images/ddasoom/code-review.png"
            alt="코드 리뷰 코멘트"
            caption="공공 API 데이터 검증 로직에 남긴 코드 리뷰 · 경계 케이스 지적과 합의"
            className="sm:col-span-2 sm:mx-auto sm:max-w-2xl"
          />
          <Figure
            src="/images/ddasoom/notion-troubleshooting.png"
            alt="Notion 트러블슈팅·트레이드오프 문서"
            caption="트러블슈팅 & 트레이드오프 기록 · 이 페이지의 결정 로그가 여기서 나왔습니다"
            className="sm:col-span-2"
          />
        </div>
      </Section>

      <Section id="retrospect" no="08" title="성과와 배운 점">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
          <div className="border-t-2 border-accent-line pt-4">
            <h3 className="font-bold text-ink">이 프로젝트가 남긴 것</h3>
            <div className="mt-3 text-slate-700">
              <Bullets
                items={[
                  <>Spring Security 기반의 인증 / 인가 인프라 직접 구현 경험</>,
                  <>
                    AT / RT 의 저장 및 재발급 방식에 따른 각각의 트러블 슈팅과 공격 상황에 대한 고민
                    과 성장
                  </>,
                  <>모든 결정을 선택지·근거와 함께 문서로 남기는 협업 경험</>,
                ]}
              />
            </div>
          </div>
          <div className="border-t-2 border-slate-300 pt-4">
            <h3 className="font-bold text-ink">마치고 나서 이어진 고민</h3>
            <div className="mt-3 text-slate-700">
              <Bullets
                items={[
                  <>
                    RT 재사용 탐지는 Grace Period와 상충해 의도적으로 제외하였으나 , 함께 도입할 수
                    있는 방법에 대한 고민
                  </>,
                  <>
                    Spring Security 도 라이브러리를 도입하여 직접 구현하지 않는 방식에 대한 추가
                    학습 필요
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
