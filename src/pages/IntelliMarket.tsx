import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import { Bullets, CodeBlock, Figure, Section, SectionNav } from '../components/ui'

/** 루트-탑-서브 3단계 카테고리 구조 다이어그램 */
function CategoryDiagram() {
  const table = (name: string, cols: string[], color: string) => (
    <div className={`rounded-lg border bg-white ${color}`}>
      <div className="border-b border-inherit px-3 py-2 text-sm font-bold">{name}</div>
      <ul className="px-3 py-2 text-xs leading-relaxed text-slate-500">
        {cols.map((c) => (
          <li key={c} className={c.includes('FK') ? 'font-semibold text-slate-700' : ''}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
  const arrow = <div className="flex items-center justify-center text-lg text-slate-300">→</div>
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-8">
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-7">
        {table('root_categories', ['root_category_id (PK)', 'category_name'], 'border-blue-300')}
        {arrow}
        {table(
          'top_categories',
          ['top_category_id (PK)', 'category_name', 'root_category_id (FK)'],
          'border-blue-300',
        )}
        {arrow}
        {table(
          'sub_categories',
          ['sub_category_id (PK)', 'category_name', 'top_category_id (FK)'],
          'border-blue-300',
        )}
        {arrow}
        {table('products', ['product_id (PK)', 'sub_category_id (FK)', '…'], 'border-emerald-300')}
      </div>
      <div className="mx-auto mt-6 max-w-md">
        {table(
          'store_categories — 스토어 ↔ 서브 카테고리 N:M 매핑',
          ['store_category_id (PK)', 'store_info_id (FK)', 'sub_category_id (FK)'],
          'border-amber-300',
        )}
      </div>
      <ul className="mt-6 space-y-1.5 text-sm leading-relaxed text-slate-600">
        <li>· 상품은 카테고리 계층 어디에나 붙는 게 아니라 <b>항상 말단(sub)에만</b> 연결 — 소속의 모호함 제거</li>
        <li>· 판매자별 취급 카테고리는 <b>매핑 테이블(store_categories)</b>로 분리 — 스토어마다 다른 카테고리 트리 제공</li>
        <li>· 계층이 3단계로 고정된 도메인이므로, 셀프 조인(재귀) 대신 <b>단계별 테이블 분리</b>를 선택 — 쿼리가 단순하고 의도가 명확</li>
      </ul>
    </div>
  )
}

export default function IntelliMarket() {
  return (
    <>
      <ProjectHeader
        name="intelliMarket"
        tagline="Project 03 · 네이버 스마트스토어를 모티브로 한 쇼핑몰 플랫폼"
        description={
          <>
            유저 쇼핑몰 / 판매자 스토어 / 스토어 어드민 / 마켓 어드민 — 4개 역할로 구성된 JSP 기반
            SSR 쇼핑몰입니다. 개발을 시작하고 처음 참여한 팀 프로젝트로, 스토어 팀에서{' '}
            <b>상품·주문 데이터 흐름 설계와 스토어 어드민의 상품/주문 관리(CRUD)</b>를 담당했고,
            특히 3단계 카테고리 구조 설계에 집중했습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2025.07 – 2025.08' },
          { label: '팀 구성', value: '4명 (스토어 팀)' },
          { label: '담당', value: '상품 · 주문 관리' },
          { label: '방식', value: 'JSP 기반 SSR' },
        ]}
        stacks={['Java 8', 'Spring MVC (Legacy)', 'MyBatis', 'MySQL', 'JSP · JSTL', 'jQuery · Ajax']}
        links={[{ label: 'GitHub', href: 'https://github.com/hye000ne/intellimarket' }]}
      />

      <SectionNav
        items={[
          { id: 'why', label: '왜 이 프로젝트인가' },
          { id: 'category', label: '카테고리 설계' },
          { id: 'troubleshooting', label: '트러블슈팅' },
          { id: 'order', label: '상품·주문 관리' },
          { id: 'retrospect', label: '회고' },
        ]}
      />

      <Section
        id="why"
        title="왜 이 프로젝트인가"
        subtitle="첫 팀 프로젝트 — 프레임워크의 마법 없이 웹 백엔드의 뼈대를 익혔습니다."
      >
        <p className="max-w-3xl leading-relaxed text-slate-700">
          개발을 시작한 지 얼마 되지 않아 진행한 <b>첫 팀 프로젝트</b>이자, 웹 백엔드의 기본기를
          다지기 위한 <b>학습 단계의 결과물</b>입니다. Spring Boot가 아닌{' '}
          <b>Spring Legacy(Java Config) + MyBatis + JSP</b> 환경에서, 요청이 Controller → Service →
          DAO → Mapper XML을 거쳐 화면(SSR)으로 렌더링되기까지의 전 과정을 직접 구성했습니다. 자동
          설정이 없는 환경이었기에 계층 구조와 SQL, 트랜잭션이 실제로 어떻게 맞물리는지 바닥부터
          이해할 수 있었고, 이 경험이 이후 프로젝트에서 '왜 이 기술이 필요한가'를 판단하는 기준이
          됐습니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/intellimarket/market-main.png"
            alt="intelliMarket 마켓 메인"
            caption="마켓 메인 — 입점 스토어와 인기 상품 (서비스 화면)"
            imgClassName="h-72 object-cover object-top"
          />
          <Figure
            src="/images/intellimarket/store-page.png"
            alt="판매자 스토어 페이지"
            caption="판매자별 브랜딩 스토어 — 상단 메뉴가 해당 스토어의 카테고리 트리로 구성"
            imgClassName="h-72 object-cover object-top"
          />
        </div>
      </Section>

      <Section
        id="category"
        title="카테고리 구조 설계"
        subtitle="루트 → 탑 → 서브 3단계 정규화 + 스토어별 N:M 매핑"
      >
        <CategoryDiagram />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/intellimarket/category-picker.png"
            alt="카테고리 선택 화면"
            caption="설계한 3단계 구조가 동작하는 모습 — 대분류 → 중분류 → 소분류 연쇄 선택과 스토어 취급 카테고리 관리"
          />
          <Figure
            src="/images/intellimarket/store-erd.png"
            alt="카테고리 관련 ERD"
            caption="실제 ERD — store_categories 매핑 테이블이 스토어와 서브 카테고리를 N:M으로 연결"
          />
        </div>
        <div className="mt-6">
          <h3 className="mb-2 font-bold text-slate-900">설계 이유</h3>
          <Bullets
            items={[
              <>
                하나의 카테고리 테이블에 parent_id 셀프 조인(인접 리스트)을 쓰는 방법과 비교했을 때,
                이 도메인은 <b>깊이가 3단계로 고정</b>이라 재귀 조회의 유연성보다{' '}
                <b>단순하고 예측 가능한 쿼리</b>가 더 가치 있다고 판단했습니다.
              </>,
              <>
                단계마다 테이블이 분리되어 있어 각 계층에 서로 다른 속성을 추가하기 쉽고, FK 제약으로{' '}
                <b>잘못된 계층 연결이 DB 수준에서 차단</b>됩니다.
              </>,
              <>
                상품 등록 화면은 상위 카테고리 선택 → 하위 목록을 Ajax(JSON)로 받아오는{' '}
                <b>연쇄 드롭다운</b>으로 구현해, SSR 페이지 안에서도 필요한 부분만 비동기로
                갱신했습니다.
              </>,
            ]}
          />
        </div>
      </Section>

      <Section id="troubleshooting" title="트러블슈팅">
        <div className="space-y-6">
          <TroubleCard
            no={1}
            title="카테고리 계층 조회의 N+1 — 중첩 select를 JOIN + 중첩 resultMap으로"
            problem={
              <>
                판매자 카테고리 트리를 조회할 때 응답이 눈에 띄게 느렸습니다. 로그를 확인하니{' '}
                <b>서브 카테고리 1건을 읽을 때마다 상위 카테고리 조회 쿼리가 연쇄적으로 추가 실행</b>
                되고 있었습니다.
              </>
            }
            cause={
              <>
                MyBatis resultMap의{' '}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
                  &lt;association select="..."&gt;
                </code>{' '}
                방식은 매핑 시점에 지연 쿼리를 다시 날립니다. sub → top → root로 연쇄되어{' '}
                <b>서브 카테고리 N건 조회 시 1 + 2N개의 쿼리</b>가 실행되는 전형적인 N+1 구조였습니다.
              </>
            }
            solution={
              <>
                카테고리 트리 조회 쿼리를 <b>4개 테이블 JOIN 한 방</b>으로 재작성하고, 중첩{' '}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
                  &lt;association&gt;
                </code>{' '}
                resultMap으로 root → top → sub 계층 객체를 단일 쿼리 결과에서 조립하도록
                개선했습니다.
              </>
            }
            result={
              <>
                트리 조회 쿼리가 <b>1 + 2N개 → 1개</b>로 감소했습니다. 이 경험으로 'ORM/매퍼가
                어떤 SQL을 만드는지 항상 확인한다'는 습관이 생겼고, 이후 JPA에서도 Fetch Join으로
                같은 문제를 예방하게 됐습니다.
              </>
            }
            detail={
              <CodeBlock
                title="개선 후 — 4-테이블 JOIN + 중첩 resultMap (단일 쿼리)"
                code={`SELECT sc.store_category_id, sub.sub_category_id, sub.category_name,
       top.top_category_id, top.category_name, root.root_category_id, root.category_name
FROM store_categories sc
JOIN sub_categories  sub  ON sc.sub_category_id  = sub.sub_category_id
JOIN top_categories  top  ON sub.top_category_id = top.top_category_id
JOIN root_categories root ON top.root_category_id = root.root_category_id
WHERE sc.store_info_id = #{storeInfoId}
ORDER BY root.category_name, top.category_name, sub.category_name

<!-- resultMap: 중첩 association으로 계층 객체를 한 번에 조립 -->
<resultMap id="storeCategoryFullMap" type="StoreCategory">
  <association property="subCategory" resultMap="subMap">
    <association property="topCategory" resultMap="topMap">
      <association property="rootCategory" resultMap="rootMap"/>
    </association>
  </association>
</resultMap>`}
              />
            }
          />

          <TroubleCard
            no={2}
            title="상위 카테고리 목록 만들기 — 중복 제거와 그룹핑"
            problem={
              <>
                판매자가 취급하는 카테고리는 서브 단위(N:M 매핑)로 저장되는데, 어드민 화면에는 '상위
                카테고리 → 하위 목록' 형태의 <b>그룹핑된 트리</b>로 보여줘야 했습니다. 같은 상위에
                속한 서브가 여러 개면 상위가 중복 추출됩니다.
              </>
            }
            cause={
              <>
                매핑 테이블에서 뽑은 서브 카테고리 목록을 그대로 순회하면 상위 카테고리가 서브 개수만큼
                반복되는 구조였습니다.
              </>
            }
            solution={
              <>
                JOIN 쿼리로 정렬된 전체 트리를 가져온 뒤, 서비스 계층에서{' '}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">Stream.distinct()</code>
                로 상위 카테고리를 중복 제거하고,{' '}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
                  LinkedHashMap&lt;TopCategory, List&lt;SubCategory&gt;&gt;
                </code>
                로 정렬 순서를 유지하며 그룹핑했습니다. distinct()가 동작하도록 값 동등성
                (equals/hashCode) 기준도 함께 정리했습니다.
              </>
            }
            result={
              <>
                DB는 '정렬된 평면 데이터'를, 서비스는 '화면에 맞는 계층 구조'를 책임지는 역할 분리를
                경험했고, SQL과 자바 컬렉션 중 어느 쪽에서 가공할지 판단하는 기준을 세웠습니다.
              </>
            }
          />
        </div>
      </Section>

      <Section id="order" title="상품 · 주문 관리" subtitle="스토어 어드민에서 판매자가 상품과 주문을 관리하는 흐름을 담당했습니다.">
        <Bullets
          items={[
            <>
              <b>상품 관리 (CRUD)</b> — 상품 등록/수정/삭제와 이미지 다중 업로드, 카테고리(서브)
              연결. 상위 카테고리 선택 → 하위 목록 Ajax 로딩의 연쇄 드롭다운 구현
            </>,
            <>
              <b>주문 상태 12단계 설계</b> — 결제 대기부터 배송 준비/중/완료, 구매 확정, 취소/반품까지
              주문의 전체 수명 주기를 Enum 상태 머신으로 정의하고, 스토어 어드민에서 주문 목록 조회와
              상태 전환을 관리
            </>,
            <>
              <b>상품·주문 데이터 흐름 설계</b> — 요구사항 명세서 작성과 함께, 상품 등록부터 주문
              확인까지 스토어 어드민을 관통하는 데이터 흐름을 설계
            </>,
          ]}
        />
        <Figure
          src="/images/intellimarket/usecase.png"
          alt="intelliMarket 유즈케이스 다이어그램"
          caption="팀 전체 유즈케이스 다이어그램 — 이 중 상품 관리·주문 관리 흐름을 담당"
          className="mt-6"
        />
      </Section>

      <Section id="retrospect" title="회고 — 이 프로젝트가 남긴 것" subtitle="당시의 한계를 정확히 아는 것이 다음 프로젝트의 출발점이 됐습니다.">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          학습 단계의 첫 팀 프로젝트였던 만큼, 완성 후 돌아보니 당시에는 보이지 않던 구조적 한계가
          있었습니다. 이 한계들을 명확히 인지한 것이 이후 학습 방향을 결정했습니다.
        </p>
        <div className="mt-5 space-y-3">
          {[
            {
              gap: '주문 다건 등록의 트랜잭션 경계가 서비스가 아닌 컨트롤러에 있어, 계층별 책임과 원자성 보장이 불명확',
              next: '→ 트랜잭션 경계와 프록시 동작 원리를 파고들어, 이후 프로젝트에서는 서비스 계층 중심으로 경계를 설계',
            },
            {
              gap: '재고 차감 로직이 주문 흐름에 연결되지 않아 오버셀 가능성 존재',
              next: '→ 조건부 UPDATE와 락(비관적/낙관적)을 학습, Fantry의 입찰 검증·동시성 제어 설계로 연결',
            },
            {
              gap: '클라이언트가 보낸 값을 서버가 그대로 신뢰하는 구간 존재',
              next: '→ "클라이언트는 신뢰할 수 없다"를 원칙으로, Ddasoom에서 모든 검증을 백엔드에 이중화',
            },
          ].map((r) => (
            <div key={r.gap} className="rounded-xl border border-slate-200 p-5">
              <p className="font-medium text-slate-800">{r.gap}</p>
              <p className="mt-2 text-[15px] font-medium text-blue-600">{r.next}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
