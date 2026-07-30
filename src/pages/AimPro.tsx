import ProjectHeader from '../components/ProjectHeader'
import { Bullets, Figure, Highlight, Retrospect, Section } from '../components/ui'

/**
 * Aim Pro — 개발 1개월차의 첫 개인 프로젝트.
 * 이 페이지만큼은 의도적으로 쉬운 말로 씁니다. 그때의 나는 그 말밖에 몰랐으니까.
 */
export default function AimPro() {
  return (
    <>
      <ProjectHeader
        name="Aim Pro"
        tagline="Bonus · 개발 1개월차의 첫 개인 프로젝트"
        description={
          <>
            숫자 1부터 순서대로 타겟을 클릭해 기록을 겨루는 반응속도 게임입니다. 개발을 배운 지 딱
            한 달, <b>그때까지 배운 것만으로 처음부터 끝까지 완성해 본 첫 결과물</b>입니다.
          </>
        }
        meta={[
          { label: '기간', value: '2025.05.26 – 05.29 (4일)' },
          { label: '인원', value: '1명 (개인)' },
          { label: '도구', value: '순수 HTML · CSS · JS' },
          { label: '시점', value: '개발 배운 지 1개월' },
        ]}
        stacks={['HTML', 'CSS', 'JavaScript (ES6)', '라이브러리 0개']}
      />

      <Section id="overview" no="01" title="어떤 게임인가">
        <Bullets
          items={[
            <>
              <b>규칙</b>: 화면에 흩어진 숫자 타겟을 1부터 순서대로, 최대한 빠르게 클릭
            </>,
            <>
              <b>난이도</b>: 1~8단계 (타겟 10~80개) · 일시 정지와 초기화 지원
            </>,
            <>
              <b>기록</b>: 0.01초 단위 스톱워치로 측정하고, 회차별 기록을 모아 보여줌
            </>,
          ]}
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Figure
            src="/images/aimpro/gameplay.png"
            alt="Aim Pro 게임 플레이 화면"
            caption="게임 플레이 · 숫자 순서대로 타겟 클릭, 스톱워치 기록"
          />
          <Figure
            src="/images/aimpro/records.png"
            alt="Aim Pro 기록 보드"
            caption="회차별 기록 보드 · 난이도와 클리어 타임 누적"
          />
        </div>
      </Section>

      <Section id="why" no="02" title="왜 만들었나">
        <p className="max-w-3xl leading-relaxed text-slate-700">
          한 달 동안 배운 것이 진짜 내 것인지 확인하고 싶었습니다. 그래서 세 가지 목표를 세우고
          시작했습니다.
        </p>
        <div className="mt-6 max-w-3xl border-l-2 border-accent-line pl-5 sm:pl-6">
          <ul className="space-y-2.5 text-base leading-relaxed text-slate-700">
            <li>1. 게임의 구성 요소(타겟)를 클래스로 만들어, 객체지향으로 프로그래밍해 볼 것</li>
            <li>2. 한번 쓴 코드를 여러 곳에서 다시 쓸 수 있게, 변수명과 주석을 체계적으로 쓸 것</li>
            <li>3. 수업에서 배운 것들(클래스, 동적 생성, setInterval, 클릭 이벤트)을 전부 써먹을 것</li>
          </ul>
        </div>
      </Section>

      <Section id="focus" no="03" title="만들면서 고민한 것">
        <Highlight
          lines={['화면에 보이는 모든 것을, 내가 짠 코드로 직접 움직이게 하는 것']}
          gains={[
            '타겟 하나하나를 클래스로 만들어, 생성부터 클릭 판정·소멸까지 스스로 책임지게 한 것',
            '타겟이 겹치면 클릭이 안 되는 문제를, 큰 번호부터 먼저 그리는 순서 바꾸기로 해결한 것',
            '시작/일시정지/재개/초기화가 꼬이지 않도록, 게임의 상태를 변수로 관리하는 법을 스스로 찾아낸 것',
          ]}
        />
        <p className="mt-6 max-w-3xl leading-relaxed text-slate-700">
          지금 보면 당연한 것들이지만, 그때는 검색과 시행착오로 하나씩 찾아냈습니다. 나중에 수업에서
          '상태 관리'라는 말을 배웠을 때, 이 게임에서 했던 고민이 바로 그것이었다는 걸 알게
          됐습니다.
        </p>
      </Section>

      <Section id="retrospect" no="04" title="성과와 배운 점">
        <Retrospect
          gains={[
            <>배운 것만 가지고 <b>처음부터 끝까지 완성</b>해 본 첫 경험</>,
            <>클래스로 객체를 만들어 화면 요소를 직접 움직여 본 경험</>,
            <>게임의 상태(시작/정지/초기화)를 변수로 관리하는 법을 스스로 찾아낸 것</>,
          ]}
          questions={[
            <>
              기록이 화면에만 쌓여서 <b>창을 닫으면 사라집니다</b>. 저장하려면 로컬 스토리지나
              서버가 필요하다는 것을 이때 처음 알았습니다.
            </>,
            <>애니메이션 같은 시각 효과가 부족해 게임이 다소 단조롭습니다.</>,
            <>비슷한 코드가 반복되는 부분이 있어, 정리하는 습관이 더 필요하다고 느꼈습니다.</>,
          ]}
          closing={
            <>
              "게임 기록은 어디에 저장해야하는가?" 라는 고민은 DB 와 서버 , 백앤드 공부로 이어지게 되었습니다. 
            </>
          }
        />
      </Section>
    </>
  )
}
