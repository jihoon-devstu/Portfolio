import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import { Bullets, CodeBlock, Figure, Section } from '../components/ui'

/** 루트-탑-서브 3단계 카테고리 구조 다이어그램 */
function CategoryDiagram() {
  type Col = { col: string; key?: 'PK' | 'FK' }
  const table = (name: string, cols: Col[], color: string) => (
    <div className={`rounded-md border bg-white ${color}`}>
      <div className="border-b border-inherit px-3 py-2.5 font-bold">{name}</div>
      <ul className="space-y-1 px-3 py-2.5 text-sm leading-relaxed">
        {cols.map((c) => (
          <li key={c.col} className="flex items-center justify-between gap-2">
            <span className={c.key === 'FK' ? 'font-semibold text-slate-700' : 'text-slate-500'}>
              {c.col}
            </span>
            {c.key && (
              <span
                className={
                  'shrink-0 rounded px-1.5 text-[11px] font-bold ' +
                  (c.key === 'PK'
                    ? 'bg-slate-100 text-slate-500'
                    : 'bg-accent-soft text-accent-deep')
                }
              >
                {c.key}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
  const arrow = <div className="flex items-center justify-center text-lg text-slate-300">→</div>
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {table(
          'root_categories',
          [{ col: 'root_category_id', key: 'PK' }, { col: 'category_name' }],
          'border-accent-line',
        )}
        {arrow}
        {table(
          'top_categories',
          [
            { col: 'top_category_id', key: 'PK' },
            { col: 'category_name' },
            { col: 'root_category_id', key: 'FK' },
          ],
          'border-accent-line',
        )}
        {arrow}
        {table(
          'sub_categories',
          [
            { col: 'sub_category_id', key: 'PK' },
            { col: 'category_name' },
            { col: 'top_category_id', key: 'FK' },
          ],
          'border-accent-line',
        )}
        {arrow}
        {table(
          'products',
          [{ col: 'product_id', key: 'PK' }, { col: 'sub_category_id', key: 'FK' }, { col: '…' }],
          'border-slate-300',
        )}
      </div>
      <div className="mx-auto mt-6 max-w-sm">
        {table(
          'store_categories',
          [
            { col: 'store_category_id', key: 'PK' },
            { col: 'store_info_id', key: 'FK' },
            { col: 'sub_category_id', key: 'FK' },
          ],
          'border-slate-300',
        )}
        <p className="mt-2 text-center text-sm text-slate-500">
          스토어 ↔ 서브 카테고리 N:M 매핑
        </p>
      </div>
      <ul className="mt-6 space-y-1.5 text-sm leading-relaxed text-slate-600">
        <li>· 상품은 카테고리 계층 어디에나 붙는 게 아니라 <b>항상 최하단(sub)에만</b> 연결.</li>
        <li>· 판매자별 취급 카테고리는 <b>매핑 테이블(store_categories)</b>로 분리. 스토어마다 다른 카테고리 트리 제공</li>
        <li>· 계층이 3단계로 고정된 도메인이므로, 쿼리가 단순해 지도록 <b>단계별 테이블 분리</b>를 선택. </li>
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
            유저 쇼핑몰 / 판매자 스토어 / 스토어 어드민 / 마켓 어드민, 4개 역할로 구성된 JSP 기반
            SSR 쇼핑몰입니다. 개발을 시작하고 처음 참여한 팀 프로젝트로, 스토어 팀에서{' '}
            <b>상품·주문 관리(CRUD)와 3단계 카테고리 구조 설계</b>를 담당했습니다.
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

      <Section id="why" no="01" title="첫 팀 프로젝트">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          자동 설정이 없는 <b>Spring Legacy(Java Config) + MyBatis + JSP</b> 환경에서, 요청이
          Controller → Service → DAO → Mapper XML을 거쳐 화면(SSR)으로 렌더링되기까지의 전 과정을
          직접 구성해 봤습니다. 이 경험이 이후 프로젝트의 기반이 됐습니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/intellimarket/market-main.png"
            alt="intelliMarket 마켓 메인"
            caption="마켓 메인 · 입점 스토어와 인기 상품"
            imgClassName="h-72 object-cover object-top"
          />
          <Figure
            src="/images/intellimarket/store-page.png"
            alt="판매자 스토어 페이지"
            caption="판매자별 브랜딩 스토어 · 상단 메뉴가 해당 스토어의 카테고리 트리로 구성"
            imgClassName="h-72 object-cover object-top"
          />
        </div>
      </Section>

      <Section id="category" no="02" title="카테고리 구조 설계">
        <CategoryDiagram />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/intellimarket/category-picker.png"
            alt="카테고리 선택 화면"
            caption="설계한 3단계 구조가 동작하는 모습 · 대분류 → 중분류 → 소분류 연쇄 선택"
          />
          <Figure
            src="/images/intellimarket/store-erd.png"
            alt="카테고리 관련 ERD"
            caption="실제 ERD · store_categories 매핑 테이블이 스토어와 서브 카테고리를 N:M으로 연결"
          />
        </div>
      </Section>

      <Section id="troubleshooting" no="03" title="트러블슈팅">
        <TroubleCard
          no={1}
          title="카테고리 계층 조회의 N+1: 중첩 select를 JOIN + 중첩 resultMap으로"
          problem={
            <>
              판매자 카테고리 트리를 조회할 때 응답이 다른 조회에 비해 느린 점을 확인하였습니다. 로그를 확인하니{' '}
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
              방식이 매핑 시점에 지연 쿼리를 다시 날린다는 것을 이때 처음 알았습니다. sub → top →
              root로 연쇄되어 <b>서브 카테고리 N건 조회 시 1 + 2N개의 쿼리</b>가 실행되는 N+1
              구조였습니다.
            </>
          }
          solution={
            <>
              카테고리 트리 조회를 <b>4개 테이블 JOIN 단일 쿼리</b>로 재작성하고, 중첩{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">&lt;association&gt;</code>{' '}
              resultMap으로 root → top → sub 계층 객체를 쿼리 결과에서 조립하도록 개선했습니다.
            </>
          }
          result={
            <>
              트리 조회 쿼리가 <b>1 + 2N개에서 1개로</b> 줄었습니다. 이후 JPA에서도 Fetch Join으로
              같은 문제를 예방하게 됐습니다.
            </>
          }
          detail={
            <CodeBlock
              title="개선 후: 4-테이블 JOIN + 중첩 resultMap (단일 쿼리)"
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
      </Section>

      <Section id="order" no="04" title="상품 · 주문 관리">
        <Bullets
          items={[
            <>
              <b>상품 관리 (CRUD)</b>: 상품 등록/수정/삭제와 이미지 다중 업로드, 카테고리 연결.
              상위 카테고리 선택 시 하위 목록을 Ajax(JSON)로 받아오는 연쇄 드롭다운 구현
            </>,
            <>
              <b>주문 상태 12단계 설계</b>: 결제 대기부터 배송, 구매 확정, 취소/반품까지 주문의
              전체 수명 주기를 Enum으로 정의하고, 스토어 어드민에서 주문 목록 조회와 상태 전환을
              관리
            </>,
            <>
              <b>어드민 카테고리 그룹화</b>: JOIN으로 정렬된 데이터를 가져와 서비스
              계층에서 Stream과 LinkedHashMap으로 '상위 → 하위 목록' 구조로 조립. 
            </>,
          ]}
        />
        <Figure
          src="/images/intellimarket/usecase.png"
          alt="intelliMarket 유즈케이스 다이어그램"
          caption="팀 전체 유즈케이스 다이어그램 · 이 중 상품 관리·주문 관리 흐름을 담당"
          className="mt-6"
        />
      </Section>

      <Section id="retrospect" no="05" title="회고">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          완성하고 돌아보니 트랜잭션 경계, 재고 차감, 입력 검증 등 당시에는 보이지 않던 한계가 많았습니다. <br/>
          <b>'클라이언트는 신뢰할 수 없다. 따라서 API는 그 어떤 상황에도 대비하여야된다.'</b>
          <br/>라는 점을 다시 한번 마음에 새기게 되었습니다. 
        </p>
      </Section>
    </>
  )
}
