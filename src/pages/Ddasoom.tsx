import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import { Bullets, Expand, Figure, Section, SectionNav } from '../components/ui'

/** Access / Refresh 토큰 전략 비교 표 */
function TokenTable() {
  const rows: { label: string; at: string; rt: string }[] = [
    { label: '클라이언트 저장', at: '프론트 메모리(Zustand) — localStorage 금지', rt: 'HttpOnly 쿠키 (JS 접근 불가)' },
    { label: '서버 저장', at: '없음 (무상태)', rt: 'Redis — refresh:{memberId}' },
    { label: '전송 방식', at: 'Authorization: Bearer 헤더', rt: '쿠키 자동 전송 (Path=/api/auth 한정)' },
    { label: '유효 기간', at: '30분', rt: '14일 (재발급 시 슬라이딩 갱신)' },
    { label: '무효화 수단', at: 'jti 블랙리스트 + 회원 단위 마커', rt: 'Redis 키 삭제 (로그아웃·탈퇴·제재)' },
    { label: '탈취 대비', at: '짧은 수명 + XSS 표면 최소화', rt: '로테이션 + SameSite=Lax + Secure' },
  ]
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[640px] text-left text-[15px]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-500">
            <th className="px-4 py-3 font-semibold">구분</th>
            <th className="px-4 py-3 font-semibold text-blue-700">Access Token</th>
            <th className="px-4 py-3 font-semibold text-emerald-700">Refresh Token</th>
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
    { title: '① 서명·만료 검증', desc: 'parseClaims — 위조/만료 토큰 즉시 차단', cost: '연산만' },
    { title: '② category 확인', desc: 'RT를 AT 자리에 꽂는 오용 차단', cost: '연산만' },
    { title: '③ jti 블랙리스트', desc: '로그아웃된 토큰인지 확인', cost: 'Redis 1회' },
    { title: '④ 강제 로그아웃 마커', desc: '탈퇴·제재 회원의 모든 토큰 차단', cost: 'Redis 1회' },
    { title: '⑤ 인증 객체 구성', desc: 'claims만으로 memberId + role 세팅 — DB 조회 0회', cost: 'DB 0회' },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
      <div className="grid gap-2 sm:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s.title} className="relative rounded-lg border border-slate-300 bg-white p-3">
            <div className="text-sm font-bold text-slate-900">{s.title}</div>
            <div className="mt-1 text-xs leading-snug text-slate-500">{s.desc}</div>
            <div className="mt-2 inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[11px] font-semibold text-blue-600">
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
      <p className="mt-4 text-sm text-slate-500">
        가벼운 검증(서명·만료)을 앞에, 비용이 드는 Redis 조회를 뒤에 배치했습니다. 검증 실패 시
        예외를 던지지 않고 인증 미설정으로 통과시켜, 401 응답은 EntryPoint가 일관된 규격으로
        처리합니다. Redis 장애 시에는 <b>fail-close</b> — 강제 로그아웃이 장애를 틈타 뚫리지 않도록
        했습니다.
      </p>
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
            전국 유기동물 정보를 한 곳에서 조회하고, 임시보호를 신청·관리하며, 경험을 커뮤니티로
            나누는 플랫폼입니다. 청년취업사관학교 새싹(SeSAC) 영등포캠퍼스 과정의 첫 미니
            프로젝트로, <b>팀장으로서 회원·보안·공통모듈을 담당</b>해 Spring Security 기반 인증/인가
            인프라와 팀 전체가 쓰는 공통 규격(응답·예외·페이징)을 설계했습니다.
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
          { id: 'decisions', label: '설계 결정·트러블슈팅' },
          { id: 'email', label: '이메일 인증' },
          { id: 'admin', label: '회원 관리' },
          { id: 'common', label: '공통 모듈·협업' },
          { id: 'retrospect', label: '성과와 배운 점' },
        ]}
      />

      <Section
        id="why"
        title="왜 이 파트인가"
        subtitle="인증은 모든 도메인이 딛고 서는 바닥입니다. 바닥이 흔들리면 전부 흔들립니다."
      >
        <p className="max-w-3xl leading-relaxed text-slate-700">
          팀장으로서 모든 팀원의 기능이 의존하는 <b>인증/인가 인프라와 공통 규격</b>을 맡았습니다.
          단순히 '로그인 되게' 만드는 것이 아니라 — 토큰이 탈취되면? 관리자가 제재한 회원의 기존
          세션은? 여러 탭이 동시에 토큰을 재발급하면? — 같은 경계 상황을 하나씩 정의하고, 각 결정의
          트레이드오프를 설계 문서(SECURITY-FLOW)로 남기며 구현했습니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/ddasoom/service-main.png"
            alt="따숨 메인 페이지"
            caption="따숨 메인 — 전국 유기동물 조회·임시보호·커뮤니티 플랫폼"
            imgClassName="h-72 object-cover object-top"
          />
          <Figure
            src="/images/ddasoom/animal-list.png"
            alt="유기동물 찾기 목록"
            caption="유기동물 찾기 — 축종·성별·보호상태·지역 필터 검색"
            imgClassName="h-72 object-cover object-top"
          />
        </div>
      </Section>

      <Section
        id="architecture"
        title="인증 아키텍처"
        subtitle="JWT 이중 토큰 + Redis 상태 관리 — 무상태의 성능과 상태 기반 차단을 결합했습니다."
      >
        <TokenTable />
        <div className="mt-6">
          <h3 className="mb-3 font-bold text-slate-900">요청당 인증 파이프라인</h3>
          <FilterChainDiagram />
        </div>
        <div className="mt-6">
          <Expand summary="인가 정책 — '기본 잠금 + 등록제' 설계">
            <p>
              보안 사고의 대부분은 '실수로 열린 문'에서 시작된다고 판단해, <b>모든 경로를 기본
              잠금</b>으로 두고 공개할 경로만 명시적으로 등록하는 방식을 택했습니다.
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                · <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">/api/auth/**</code>{' '}
                와일드카드를 의도적으로 금지하고 엔드포인트를 낱개 등록 — auth 하위에 새 API가
                생겨도 자동 공개되는 사고를 방지
              </li>
              <li>
                · <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">/api/admin/**</code>{' '}
                은 ADMIN 자동 잠금 — 경로 규칙만 지키면 인가가 따라오는 구조
              </li>
              <li>
                · 소셜 가입 직후는 GUEST 롤 — 추가 정보 입력 API만 허용, 나머지는 차단 후 USER 승급
              </li>
              <li>
                · 미분류 경로는{' '}
                <code className="rounded bg-slate-200/60 px-1.5 py-0.5 text-sm">
                  anyRequest().authenticated()
                </code>
                로 수렴 — '등록을 깜빡한 경로'가 열리는 일이 없도록
              </li>
            </ul>
          </Expand>
        </div>
      </Section>

      <Section
        id="decisions"
        title="설계 결정과 트러블슈팅"
        subtitle="'그냥 되게' 대신, 경계 상황을 정의하고 트레이드오프를 따져 결정했습니다."
      >
        <div className="space-y-6">
          <TroubleCard
            no={1}
            title="멀티탭 동시 재발급 경합 — RT 로테이션 + Grace Period"
            problem={
              <>
                RT 로테이션을 적용하면, 브라우저 재시작 시 여러 탭이 동시에 구 RT로 재발급을 요청해
                먼저 도착한 요청만 성공하고 <b>나머지 탭이 전부 로그아웃되는 경합</b>이 발생합니다.
              </>
            }
            cause={
              <>
                로테이션의 '구 토큰 즉시 폐기'가 정상 사용자의 동시 요청까지 실패시키기 때문입니다.
              </>
            }
            solution={
              <>
                회전 직후 구 RT를 <b>30초 Grace Period 키로 보관</b> — 뒤늦게 도착한 탭은 새 AT만
                발급받고, 재회전은 금지해 회전 체인의 무한 연쇄를 막았습니다.
              </>
            }
            result={
              <>
                멀티탭에서도 로그아웃 없이 재발급되고, 30초 창 이후의 구 RT 재사용은 여전히 차단 —
                보안과 UX를 함께 확보했습니다.
              </>
            }
            detail={
              <p>
                참고했던 프로젝트는 Grace Period 없이 로테이션만 적용해 같은 멀티탭 경합 버그를 안고
                있음을 확인했고, 이를 개선 근거로 설계 문서에 기록했습니다. Grace Period 30초 동안
                탈취된 구 RT가 재사용될 수 있는 창이 생기는 트레이드오프는 인지하고 있으며, 그
                창에서도 새 AT 발급만 가능하고 재회전은 불가능해 피해 범위를 한정했습니다.
              </p>
            }
          />

          <TroubleCard
            no={2}
            title="관리자가 모르는 토큰을 어떻게 무효화하는가 — 강제 로그아웃 마커"
            problem={
              <>
                jti 블랙리스트는 '아는 토큰'만 차단할 수 있어, <b>관리자가 제재한 회원이 이미 들고
                있는 AT</b>는 만료 전까지 계속 유효합니다.
              </>
            }
            cause={
              <>
                제재 시점에 그 회원이 여러 탭·기기에서 발급받은 모든 AT를 서버가 열거할 수 없기
                때문입니다 — 토큰 단위 차단의 구조적 한계입니다.
              </>
            }
            solution={
              <>
                <b>회원 단위 차단 키</b>(forceLogout:memberId)를 도입 — 탈퇴·제재 시 AT 최대
                수명만큼 마커를 심어 기발급 토큰 전부를 즉시 무효화하고, 복구 시 해제합니다.
              </>
            }
            result={
              <>
                제재 즉시 모든 기기에서 세션이 끊깁니다. AT의 무상태 원칙을 일부 양보한 의도적
                트레이드오프였고, 검사 지점이 기존과 같아 추가 비용은 사실상 0이었습니다.
              </>
            }
            detail={
              <p>
                제재(HIDDEN) 처리 시 상태 컬럼만 바꾸면 기존 세션이 유지되고 RT 슬라이딩 갱신으로
                사실상 무기한 활동이 가능하다는 허점을 발견해, 탈퇴에 쓰던 인프라(RT 삭제 + 마커)를
                재사용해 제재도 동일하게 즉시 차단되도록 통일했습니다.
              </p>
            }
          />

          <TroubleCard
            no={3}
            title="로그인 실패 응답 — 보안(열거 공격)과 UX(사유 안내)의 상충"
            problem={
              <>
                탈퇴/제재 회원에게 사유를 안내하려면 응답을 구분해야 하는데, 구분하면{' '}
                <b>이메일 존재 여부가 노출되는 열거 공격</b>에 취약해집니다.
              </>
            }
            cause={
              <>
                '실패를 하나로 합치면 보안은 좋지만 UX가 나빠지고, 나누면 그 반대'인 전형적인
                트레이드오프 상황입니다.
              </>
            }
            solution={
              <>
                검증을 2단으로 분리 — 계정 없음/비밀번호 불일치/소셜 전용은 <b>단일 코드로 수렴</b>
                해 이메일 존재를 숨기고, 비밀번호가 일치한 본인에게만 탈퇴/제재 사유를 안내합니다.
              </>
            }
            result={
              <>
                공격자는 아무 정보도 얻지 못하고, 정당한 사용자는 정확한 사유를 안내받는 응답 체계를
                만들었습니다.
              </>
            }
            detail={
              <p>
                자동 호출 경로인 재발급(reissue)은 사유를 구분하지 않고 단일 응답으로 통일했습니다.
                또한 BCrypt 72바이트 초과 입력 시 발생하는 예외를 '불일치'로 수렴시켜, 비정상 입력이
                500 에러로 노출되지 않고 동일한 실패 코드로 떨어지게 했습니다.
              </p>
            }
          />

          <TroubleCard
            no={4}
            title="OAuth2 성공 리다이렉트에 AT를 실을 수 없다"
            problem={
              <>
                소셜 로그인은 리다이렉트로 끝나므로 AT를 URL 쿼리에 실어야 하는데, URL은{' '}
                <b>브라우저 히스토리·서버 로그에 남아 토큰이 노출</b>됩니다.
              </>
            }
            cause={
              <>
                'AT는 항상 응답 body로만 전달한다'는 원칙과 OAuth2 리다이렉트 흐름이 충돌하기
                때문입니다.
              </>
            }
            solution={
              <>
                성공 핸들러는 <b>RT 쿠키만 심고 AT 없이 리다이렉트</b> — 프론트 콜백 페이지가 즉시
                재발급 API를 호출해 body로 AT를 받도록 설계했습니다.
              </>
            }
            result={
              <>
                일반 로그인과 소셜 로그인이 동일한 토큰 전달 원칙(AT는 body, RT는 HttpOnly 쿠키)을
                유지하게 됐습니다.
              </>
            }
            detail={
              <>
                <p>
                  소셜 신원은 위·변조 가능성이 있는 이메일이 아닌 provider + providerId로 판별하고,
                  기존 계정과 이메일이 충돌하면 자동 연동 대신 차단을 택해 계정 탈취 가능성을
                  제거했습니다. 실패 핸들러는 필터 체인 내부에서 동작하므로
                  OAuth2AuthenticationException으로 감싸 500 에러 노출을 방지했습니다.
                </p>
                <Figure
                  src="/images/ddasoom/login.png"
                  alt="로그인 화면"
                  caption="로그인 화면 — 자체 로그인 + 카카오·네이버·구글 OAuth2"
                  className="mx-auto max-w-lg"
                />
              </>
            }
          />
        </div>
      </Section>

      <Section
        id="email"
        title="이메일 인증 — 3중 방어선"
        subtitle="인증 메일 발송은 비용이 드는 외부 I/O이므로, 남용을 계층적으로 차단했습니다."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { step: '1차 · IP 제한', desc: '동일 IP 시간당 10회 초과 차단 — 무차별 발송 봇 방어' },
            { step: '2차 · 쿨다운', desc: '동일 이메일 60초 재발송 제한 — 연타 방지' },
            { step: '3차 · 시도 제한', desc: '검증 5회 초과 시 코드 즉시 폐기 — 브루트포스 방어' },
          ].map((d) => (
            <div key={d.step} className="rounded-xl border border-slate-200 p-5">
              <div className="font-bold text-blue-600">{d.step}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{d.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[15px] text-slate-600">
          인증 코드는 SecureRandom 6자리 + Redis TTL 3분으로 관리하고, 모든 카운터는 TTL 자연
          만료로 별도 배치 없이 정리됩니다. 환영 메일 발송 실패가 가입 자체를 실패시키지 않도록 외부
          I/O는 격리했습니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/ddasoom/signup-email.png"
            alt="회원가입 이메일 인증 메일"
            caption="실제 발송되는 인증 메일 — 6자리 코드, 3분 유효"
          />
          <Figure
            src="/images/ddasoom/signup.png"
            alt="회원가입 화면"
            caption="회원가입 — 인증 완료 후 30분 내 가입, 비밀번호 정책·닉네임 중복 검증"
          />
        </div>
      </Section>

      <Section
        id="admin"
        title="회원 관리 — 계정 생명주기부터 관리자까지"
        subtitle="회원의 상태 변경은 세션 차단과 한 몸으로 움직여야 합니다."
      >
        <Bullets
          items={[
            <>
              <b>계정 생명주기 설계</b> — 탈퇴는 soft delete로 처리하되 동일 이메일 재가입은
              차단(유니크 제약 유지), 관리자 복구는 허용. 비밀번호 재설정은 발송·사용 양단 모두에서
              탈퇴 회원을 차단
            </>,
            <>
              <b>마이페이지</b> — 정보 수정(이메일 변경 불가), 비밀번호 변경(현재 비밀번호 검증 후{' '}
              <b>전 세션 무효화</b>), 최근 로그인 이력 조회, 자진 탈퇴
            </>,
            <>
              <b>QueryDSL 동적 검색</b> — 키워드(이메일·닉네임)/권한/상태 필터를 조합하고, 상태
              (활성·숨김·탈퇴)는 CASE 식 파생 정렬로 처리. 조건 미지정은 '전체'로 수렴
            </>,
            <>
              <b>제재·강제 탈퇴·복구</b> — 제재(숨김)와 강제 탈퇴 시 강제 로그아웃 마커를 연동해
              해당 회원의 모든 세션을 즉시 차단하고, 복구 시 마커를 해제
            </>,
            <>
              <b>관리자 계정 보호</b> — ADMIN 계정은 강제 탈퇴·상태 변경 대상에서 제외(자기 자신
              포함). 관리자 계정은 가입 API로 생성 불가, 시드 데이터로만 관리
            </>,
            <>
              <b>조회 2경로 분리</b> — 일반 로직은 활성 회원 전용 조회만, 탈퇴 포함 조회는 관리자
              전용으로 분리해 '탈퇴 회원 대상 작업'을 구조적으로 차단
            </>,
          ]}
        />
        <div className="mt-6 space-y-4">
          <Figure
            src="/images/ddasoom/admin-users.png"
            alt="관리자 유저 관리 목록"
            caption="유저 관리 목록 — 키워드·권한·상태 필터와 정렬, 활성/숨김/탈퇴 상태 관리"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Figure
              src="/images/ddasoom/admin-user-detail.png"
              alt="회원 상세 (활성 회원)"
              caption="회원 상세(활성) — 소셜 연동·로그인 이력·신고 내역 확인, 회원 숨김/강제 탈퇴"
            />
            <Figure
              src="/images/ddasoom/admin-user-restore.png"
              alt="회원 상세 (탈퇴 회원)"
              caption="회원 상세(탈퇴) — 계정 복구 시 강제 로그아웃 마커 해제와 함께 정상화"
            />
          </div>
        </div>
      </Section>

      <Section
        id="common"
        title="공통 모듈과 협업 방식"
        subtitle="규칙을 문서로 먼저 정하고, 코드가 그 문서를 따르게 했습니다."
      >
        <Bullets
          items={[
            <>
              <b>ApiResponse</b> — 모든 응답을 단일 규격으로 통일. 필터 레벨 401/403도
              EntryPoint/AccessDeniedHandler가 같은 규격으로 응답
            </>,
            <>
              <b>GlobalExceptionHandler + 도메인별 ErrorCode</b> — 예외를 3단 구조로 정리해 팀원
              누구의 코드에서든 일관된 에러 응답 보장
            </>,
            <>
              <b>PageResponse + PageableSanitizer</b> — 페이징 요청 검증·응답 규격화
            </>,
            <>
              <b>문서 우선 협업</b> — 코드·DB·보안 컨벤션을 문서로 관리하고 규칙 변경은 문서 PR로만.
              트러블슈팅·트레이드오프도 Notion에 축적해 팀의 판단 근거를 공유
            </>,
          ]}
        />

        {/* 직접 작성한 설계 문서 3종 */}
        <div className="mt-8">
          <h3 className="mb-3 font-bold text-slate-900">직접 작성한 설계 문서</h3>
          <p className="mb-4 text-[15px] text-slate-600">
            "규칙을 문서로 먼저 정한다"는 말의 실체입니다 — 세 문서 모두 저장소에 공개되어 있습니다.
          </p>
          <div className="grid gap-3 lg:grid-cols-3">
            {[
              {
                name: 'SECURITY-FLOW.md',
                href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/SECURITY-FLOW_V3.md',
                desc: '인증/인가 전체 흐름과 각 도메인 개발자가 인증 정보를 꺼내 쓰는 방법을 안내. 부록에 모든 설계 결정의 근거(왜 이렇게 했나)를 기록',
              },
              {
                name: 'BACKEND_CODE_CONVENTIONS.md',
                href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/BACKEND_CODE_CONVENTIONS.md',
                desc: "도메인형 패키지 구조와 경계 기준('예외를 던지는 곳이 소속 도메인'), 네이밍·응답 규격. 규칙 변경은 이 문서를 수정하는 PR로만",
              },
              {
                name: 'DB_CONVENTIONS.md',
                href: 'https://github.com/SeSac-3/ddasoom-backend/blob/main/docs/DB_CONVENTIONS.md',
                desc: '테이블·컬럼 네이밍(단수형, {테이블}_id PK), 예약어·무의미한 이름 금지, 역할 기반 FK 네이밍 등 설계·리뷰 공통 기준',
              },
            ].map((d) => (
              <a
                key={d.name}
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-slate-200 p-5 transition-all hover:border-blue-400 hover:shadow-md"
              >
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <span className="text-blue-500">📄</span>
                  <span className="break-all">{d.name}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.desc}</p>
                <div className="mt-3 text-xs font-semibold text-blue-600">GitHub에서 보기 ↗</div>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure src="/images/ddasoom/erd.png" alt="따숨 ERD" caption="팀 전체 ERD — 회원·소셜회원·로그인 이력 테이블 설계 담당" />
          <Figure src="/images/ddasoom/swagger.png" alt="Swagger API 문서" caption="Swagger 기반 API 문서 — 팀 협업 규격" />
          <Figure
            src="/images/ddasoom/code-review.png"
            alt="코드 리뷰 코멘트"
            caption="공공 API 데이터 검증 로직에 남긴 코드 리뷰 — 경계 케이스 지적과 합의 (PR 100건 운영)"
            className="sm:col-span-2 sm:mx-auto sm:max-w-2xl"
          />
          <Figure
            src="/images/ddasoom/notion-troubleshooting.png"
            alt="Notion 트러블슈팅·트레이드오프 문서"
            caption="트러블슈팅 & 트레이드오프 기록 — JWT 저장 전략, 강제 로그아웃 등 결정 근거를 문서화"
            className="sm:col-span-2"
          />
        </div>
      </Section>

      <Section id="retrospect" title="성과와 배운 점">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900">성과</h3>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-700">
              <li>· 토큰 수명 주기 전체(발급→재발급→무효화)를 경계 상황까지 설계·구현</li>
              <li>· 팀 5명이 공유하는 공통 규격을 문서 우선으로 정착 — 설계와 코드의 정합 유지</li>
              <li>· 모든 설계 결정의 '왜'를 SECURITY-FLOW 문서에 근거와 함께 기록</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900">한계와 다음 단계</h3>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-700">
              <li>· RT 재사용 탐지(reuse detection)는 Grace Period와의 상충을 정리해 도입 예정</li>
              <li>· 로그인 시도 횟수 제한 미적용 — BCrypt 비용이 1차 완화 장치</li>
              <li>
                · 운영/개발 프로파일 분리 등 배포 전 필수 과제를 '알고도 보류한 항목'으로 문서에 명시
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}
