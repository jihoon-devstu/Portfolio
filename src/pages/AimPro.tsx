import ProjectHeader from '../components/ProjectHeader'
import { Bullets, Figure, Highlight, Retrospect, Section } from '../components/ui'

/**
 * Aim Pro: 개발 1개월차의 첫 개인 프로젝트.
 * 이 페이지만큼은 의도적으로 쉬운 말로 씁니다. 그때의 나는 그 말밖에 몰랐으니까.
 */
export default function AimPro() {
  return (
    <>
      <ProjectHeader
        name="Aim Pro"
        tagline="Bonus | 개발 1개월차의 첫 개인 프로젝트"
        description={
          <>
            숫자 1부터 순서대로 타겟을 클릭해 기록을 겨루는 반응속도 게임입니다. 개발을 배운 지 딱
            한 달, <b>그때까지 배운 것만으로 처음부터 끝까지 완성해 본 첫 결과물</b>입니다.
          </>
        }
        meta={[
          { label: '기간', value: '2025.05.26 – 05.29 (4일)' },
          { label: '인원', value: '1명 (개인)' },
          { label: '도구', value: '순수 HTML, CSS, JS' },
          { label: '시점', value: '개발 배운 지 1개월' },
        ]}
        stacks={['HTML', 'CSS', 'JavaScript (ES6)', '라이브러리 0개']}
      />

      <Section id="overview" no="01" title="어떤 게임인가">
        <Bullets
          items={[
            <>
              <b>규칙</b>: 흩어진 숫자 타겟을 1부터 순서대로 빠르게 클릭
            </>,
            <>
              <b>난이도</b>: 1~8단계 (타겟 10~80개), 일시정지와 초기화
            </>,
            <>
              <b>기록</b>: 0.01초 단위 스톱워치, 회차별 기록 표시
            </>,
          ]}
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/aimpro/gameplay.png"
            alt="Aim Pro 게임 플레이 화면"
            caption="게임 플레이"
          />
          <Figure
            src="/images/aimpro/records.png"
            alt="Aim Pro 기록 보드"
            caption="회차별 기록 보드"
          />
        </div>
      </Section>

      <Section id="why" no="02" title="왜 만들었나">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          한 달 동안 배운 것이 진짜 내 것인지 확인하고 싶어 세 가지 목표를 세웠습니다.
        </p>
        <div className="mt-6 max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>1. 타겟을 클래스로 만들어 객체지향으로 짜 보기</li>
            <li>2. 다시 쓸 수 있도록 변수명과 주석을 체계적으로 쓰기</li>
            <li>3. 배운 것(클래스, 동적 생성, setInterval, 클릭 이벤트)을 모두 써 보기</li>
          </ul>
        </div>
      </Section>

      <Section id="focus" no="03" title="만들면서 고민한 것">
        <Highlight
          lines={['화면에 보이는 모든 것을 내가 짠 코드로 움직이게 하는 것']}
          gains={[
            '타겟마다 클래스로 만들어 생성, 클릭 판정, 소멸을 스스로 처리',
            '겹친 타겟이 클릭되지 않는 문제는 큰 번호부터 그려서 해결',
            '시작, 일시정지, 재개, 초기화를 게임 상태 변수로 관리',
          ]}
        />
        <p className="mt-6 max-w-3xl leading-relaxed text-slate-700">
          그때는 검색과 시행착오로 하나씩 찾아냈고, 나중에 수업에서 이 고민이 '상태 관리'였다는 걸
          알게 됐습니다.
        </p>
      </Section>

      <Section id="retrospect" no="04" title="성과와 배운 점">
        <Retrospect
          gains={[
            <>배운 것만 가지고 <b>처음부터 끝까지 완성</b>해 본 첫 경험</>,
          ]}
          questions={[
            <>
              기록이 화면에만 쌓여 <b>창을 닫으면 사라짐</b> → 저장소(로컬 스토리지, 서버)가 필요함을 처음 알게 됨
            </>,
            <>시각 효과가 부족해 단조로움</>,
            <>반복되는 코드 → 정리하는 습관이 필요</>,
          ]}
          closing={
            <>
              "게임 기록은 어디에 저장해야 할까?"라는 고민이 DB와 서버, 백엔드 공부로 이어졌습니다. 
            </>
          }
        />
      </Section>
    </>
  )
}
