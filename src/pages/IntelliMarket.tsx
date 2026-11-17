import ProjectHeader from '../components/ProjectHeader'
import TroubleCard from '../components/TroubleCard'
import { Bullets, CodeBlock, Figure, Retrospect, RoleSplit, Section, Sub } from '../components/ui'

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
      <ul className="mt-6 space-y-1.5 text-[0.95rem] leading-relaxed text-slate-700">
        <li>- 상품은 <b>항상 최하단(sub)에만</b> 연결</li>
        <li>- 판매자별 카테고리는 <b>매핑 테이블(store_categories)</b>로 분리해 스토어마다 다른 트리</li>
        <li>- 계층이 3단계로 고정이라 쿼리가 단순하도록 <b>단계별 테이블로 분리</b></li>
      </ul>
    </div>
  )
}

export default function IntelliMarket() {
  return (
    <>
      <ProjectHeader
        name="intelliMarket"
        tagline="Project 04 | 네이버 스마트스토어를 모티브로 한 쇼핑몰 플랫폼"
        description={
          <>
            유저 쇼핑몰, 판매자 스토어, 스토어 어드민, 마켓 어드민 4개 역할로 구성된 JSP 기반 쇼핑몰입니다.
            첫 팀 프로젝트로, 스토어 팀에서 <b>상품과 주문 관리, 3단계 카테고리 구조 설계</b>를
            맡았습니다.
          </>
        }
        meta={[
          { label: '기간', value: '2025.07 – 2025.08' },
          { label: '팀 구성', value: '4명 (스토어 팀)' },
          { label: '담당', value: '상품과 주문 관리' },
          { label: '방식', value: 'JSP 기반 SSR' },
        ]}
        stacks={['Java 8', 'Spring MVC (Legacy)', 'MyBatis', 'MySQL', 'JSP', 'JSTL', 'jQuery', 'Ajax']}
        links={[{ label: 'GitHub', href: 'https://github.com/hye000ne/intellimarket' }]}
      />

      <Section id="overview" no="01" title="어떤 프로젝트인가">
        <p className="max-w-3xl leading-relaxed text-slate-700">          네이버 스마트스토어를 모티브로 했습니다. <b>판매자마다 자기 스토어를 갖고, 관리자는 마켓
          전체를 관리하는 구조</b>를 목표로 4개 역할로 나눠 만들었습니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/intellimarket/market-main.png"
            alt="intelliMarket 마켓 메인"
            caption="마켓 메인: 입점 스토어와 인기 상품"
            imgClassName="h-72 object-cover object-top"
          />
          <Figure
            src="/images/intellimarket/store-page.png"
            alt="판매자 스토어 페이지"
            caption="판매자 스토어: 상단 메뉴가 그 스토어의 카테고리"
            imgClassName="h-72 object-cover object-top"
          />
        </div>
      </Section>

      <Section
        id="role"
        no="02"
        title="팀에서 나의 자리"
        subtitle="스토어 팀과 마켓 팀으로 나뉘어 개발한 뒤 병합했습니다."
      >
        <RoleSplit
          roles={[
            {
              role: '스토어 어드민, 데이터 설계',
              detail: '상품과 주문 관리, 3단계 카테고리 설계, 데이터 흐름 설계와 요구사항 명세',
              mine: true,
            },
            { role: '스토어 페이지', detail: '스토어 메인, 상품 목록과 상세, 장바구니, 스토어 정보' },
            { role: '마켓 전반, 공통', detail: '마켓 메인, 회원 기능, 공통 레이아웃, 마켓 어드민' },
            { role: '결제, 유저 주문', detail: '단건과 다중 결제, 주문 확인과 구매 확정' },
          ]}
        />
      </Section>

      <Section id="why" no="03" title="왜 이 파트를 맡았나">
        <p className="max-w-3xl leading-relaxed text-slate-700">          상품과 주문은 쇼핑몰 데이터가 모이는 중심입니다. 첫 팀 프로젝트인 만큼 <b>요청부터 화면까지
          전체 흐름을 이해하는 것</b>을 목표로 이 자리를 맡았습니다.
        </p>
      </Section>

      <Section id="category" no="04" title="카테고리 구조 설계">
        <CategoryDiagram />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/intellimarket/category-picker.png"
            alt="카테고리 선택 화면"
            caption="상품 등록: 상위 → 하위 카테고리 연쇄 선택(Ajax)"
          />
          <Figure
            src="/images/intellimarket/store-erd.png"
            alt="카테고리 관련 ERD"
            caption="실제 ERD: 스토어와 서브 카테고리를 N:M으로 연결"
          />
        </div>
      </Section>

      <Section id="troubleshooting" no="05" title="트러블슈팅">
        <TroubleCard
          no={1}
          title="카테고리 조회가 유독 느리다: 알고 보니 N+1"
          problem={
            <>              판매자 카테고리 트리 조회만 유독 느림
              <Sub items={[<>로그를 보니 <b>서브 카테고리 1건마다 상위 카테고리 조회가 연쇄 실행</b></>]} />
            </>
          }
          cause={
            <>
              MyBatis resultMap의{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
                &lt;association select="..."&gt;
              </code>{' '}              방식은 매핑할 때마다 쿼리를 다시 실행
              <Sub items={[<>sub → top → root로 연쇄되어 <b>N건 조회 시 최대 1 + 4N개 쿼리</b></>]} />
            </>
          }
          solution={
            <>              트리 조회를 <b>4개 테이블 JOIN 한 번</b>으로 바꾸고, 중첩{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">&lt;association&gt;</code>으로
              계층 객체를 조립
            </>
          }
          result={
            <>              카테고리 계층은 <b>JOIN 1회로 조립</b>
              <Sub items={['스토어 정보만 하위 조회로 남고 1차 캐시로 재사용', '상품 등록, 카테고리 삭제 경로는 기존 방식 그대로 (개선 범위는 트리 조회)']} />
            </>
          }
          detail={
            <CodeBlock
              title="개선 후: 4-테이블 JOIN + 중첩 resultMap (StoreCategoryMapper.xml 발췌)"
              code={`SELECT sc.store_category_id, sc.store_info_id,
       sub.sub_category_id, sub.category_name AS sub_category_name,
       top.top_category_id, top.category_name AS top_category_name,
       root.root_category_id, root.category_name AS root_category_name
FROM store_categories sc
JOIN sub_categories  sub  ON sc.sub_category_id  = sub.sub_category_id
JOIN top_categories  top  ON sub.top_category_id = top.top_category_id
JOIN root_categories root ON top.root_category_id = root.root_category_id
WHERE sc.store_info_id = #{storeInfoId}
ORDER BY root.category_name ASC, top.category_name ASC, sub.category_name ASC

<!-- resultMap: 중첩 association으로 계층 객체를 조립 (스토어 정보만 하위 select) -->
<resultMap id="storeCategoryFullMap" type="StoreCategory">
  <id column="store_category_id" property="storeCategoryId" />
  <association property="storeInfo" column="store_info_id" javaType="StoreInfo"
               select="com.intellimarket.store.dao.StoreInfoDAO.selectById" />
  <association property="subCategory" javaType="SubCategory">
    <id column="sub_category_id" property="subCategoryId" />
    <result column="sub_category_name" property="categoryName" />
    <association property="topCategory" javaType="TopCategory">
      <id column="top_category_id" property="topCategoryId" />
      <result column="top_category_name" property="categoryName" />
      <association property="rootCategory" javaType="RootCategory">
        <id column="root_category_id" property="rootCategoryId" />
        <result column="root_category_name" property="categoryName" />
      </association>
    </association>
  </association>
</resultMap>`}
            />
          }
        />
      </Section>

      <Section id="order" no="06" title="상품과 주문 관리">
        <Bullets
          items={[
            <>              <b>상품 관리</b>
              <Sub items={['등록, 수정, 삭제와 이미지 다중 업로드', '상위 카테고리를 고르면 하위 목록을 Ajax로 받는 연쇄 드롭다운']} />
            </>,
            <>              <b>주문 상태 12단계</b>
              <Sub items={['결제 대기부터 구매 확정, 취소와 반품까지 Enum으로 정의', '스토어 어드민에서 주문 조회와 상태 변경']} />
            </>,
            <>              <b>어드민 카테고리 그룹화</b>
              <Sub items={['정렬해 가져온 데이터를 서비스 계층에서 상위 → 하위 구조로 묶어 전달']} />
            </>,
          ]}
        />
        <Figure
          src="/images/intellimarket/usecase.png"
          alt="intelliMarket 유즈케이스 다이어그램"
          caption="팀 유즈케이스 다이어그램 (상품 관리와 주문 관리 담당)"
          className="mt-6"
        />
      </Section>

      <Section id="retrospect" no="07" title="성과와 배운 점">
        <Retrospect
          gains={[
            <>              <b>요청이 화면이 되기까지</b>: Controller → Service → DAO → SQL 전 과정을 직접 구성
            </>,
            <><b>데이터 구조 설계 기본기</b>: 3단계 카테고리를 테이블로 설계</>,
            <>              <b>SQL을 눈으로 확인하는 습관</b>: N+1을 겪은 뒤 생김
            </>,
          ]}
          questions={[
            <>              트랜잭션 경계, 재고 차감, 입력 검증처럼 당시 보이지 않던 한계 → 다음 공부 방향이 됨
            </>,
          ]}
        />
      </Section>
    </>
  )
}
