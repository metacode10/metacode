"use client";

import { useState } from "react";

interface Strategy {
  title: string;
  description: string;
  buildOrder: {
    supply: string;
    time: string;
    action: string;
    note?: string;
  }[];
  timing: string;
  difficulty: "쉬움" | "보통" | "어려움";
  counters: string[];
  type: "일반" | "3:3";
  style: "러쉬" | "타이밍" | "후반" | "운영";
  pros: string[];
  cons: string[];
}

interface RaceMatchup {
  myRace: string;
  enemyRace: string;
  strategies: Strategy[];
}

const strategyDatabase: RaceMatchup[] = [
  // Terran vs Terran
  {
    myRace: "Terran",
    enemyRace: "Terran",
    strategies: [
      {
        title: "벌처 견제",
        description: "벌처로 상대 일꾼 라인 타격하며 본진에서는 메카닉 준비",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:17", action: "SCV로 정찰", note: "적 본진 위치 확인" },
          { supply: "8/9", time: "0:35", action: "배럭스 건설", note: "본진 입구" },
          { supply: "9/9", time: "0:45", action: "서플라이 디팟 건설" },
          { supply: "9/17", time: "1:00", action: "가스 건설", note: "SCV 3명 투입" },
          { supply: "10/17", time: "1:30", action: "팩토리 건설" },
          { supply: "11/17", time: "2:00", action: "벌처 생산 시작" },
          { supply: "13/17", time: "2:30", action: "벌처 스피드 업그레이드" },
          { supply: "14/17", time: "3:00", action: "두 번째 가스 건설" },
          { supply: "15/17", time: "3:30", action: "두 번째 팩토리 건설" },
          { supply: "16/17", time: "4:00", action: "시즈탱크 생산 시작", note: "본진 방어용" }
        ],
        timing: "4분",
        difficulty: "보통",
        counters: ["마린 초반 러쉬", "빠른 시즈탱크"],
        type: "3:3",
        style: "타이밍",
        pros: ["초반 경제 타격 가능", "메카닉 전환 용이", "맵 컨트롤 가능"],
        cons: ["마린 다수 상대로 불리", "실수시 역공 당할 수 있음"]
      }
    ]
  },
  // Terran vs Protoss
  {
    myRace: "Terran",
    enemyRace: "Protoss",
    strategies: [
      {
        title: "1-1-1 빌드",
        description: "배럭스, 팩토리, 스타포트를 이용한 유연한 운영",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "SCV로 정찰" },
          { supply: "8/9", time: "0:40", action: "배럭스 건설" },
          { supply: "9/9", time: "1:00", action: "서플라이 디팟 건설" },
          { supply: "9/17", time: "1:20", action: "가스 건설" },
          { supply: "10/17", time: "1:40", action: "팩토리 건설" },
          { supply: "11/17", time: "2:10", action: "스타포트 건설" },
          { supply: "12/17", time: "2:40", action: "레이스 생산" },
          { supply: "13/17", time: "3:10", action: "시즈탱크 생산" },
          { supply: "14/17", time: "3:40", action: "두 번째 가스 건설" },
          { supply: "15/17", time: "4:10", action: "첫 번째 공격", note: "레이스와 시즈탱크 운용" }
        ],
        timing: "4분 10초",
        difficulty: "어려움",
        counters: ["빠른 드라군", "캐리어 러쉬"],
        type: "3:3",
        style: "운영",
        pros: ["유연한 대응 가능", "공중 지상 동시 압박", "강력한 타이밍 공격"],
        cons: ["컨트롤 요구 높음", "자원 관리 어려움", "실수시 치명적"]
      }
    ]
  },
  // Terran vs Zerg
  {
    myRace: "Terran",
    enemyRace: "Zerg",
    strategies: [
      {
        title: "메카닉 운영",
        description: "벌처와 시즈탱크를 주력으로 한 메카닉 운영",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "SCV로 정찰" },
          { supply: "8/9", time: "0:40", action: "배럭스 건설" },
          { supply: "9/9", time: "1:00", action: "서플라이 디팟 건설" },
          { supply: "9/17", time: "1:20", action: "가스 2개 건설" },
          { supply: "10/17", time: "1:40", action: "팩토리 건설" },
          { supply: "11/17", time: "2:10", action: "머신샵 건설" },
          { supply: "12/17", time: "2:40", action: "벌처 생산 시작" },
          { supply: "13/17", time: "3:10", action: "시즈탱크 생산" },
          { supply: "14/17", time: "3:40", action: "두 번째 팩토리" },
          { supply: "15/17", time: "4:10", action: "아머리 건설" }
        ],
        timing: "5분",
        difficulty: "보통",
        counters: ["뮤탈리스크 견제", "히드라 물량"],
        type: "3:3",
        style: "운영",
        pros: ["저글링 상대 강력", "넓은 지역 통제", "후반 스케일링"],
        cons: ["이동성 부족", "공중 유닛에 취약", "자원 소모 큼"]
      }
    ]
  },
  // Protoss vs Terran
  {
    myRace: "Protoss",
    enemyRace: "Terran",
    strategies: [
      {
        title: "드라군 드랍",
        description: "셔틀을 이용한 드라군 드랍으로 경제 타격",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "파일런 건설" },
          { supply: "8/9", time: "0:40", action: "게이트웨이 건설" },
          { supply: "9/9", time: "1:00", action: "가스 건설" },
          { supply: "9/17", time: "1:30", action: "사이버네틱스 코어" },
          { supply: "10/17", time: "2:00", action: "드라군 생산" },
          { supply: "11/17", time: "2:30", action: "로보틱스 건설" },
          { supply: "12/17", time: "3:00", action: "로보틱스 서포트 베이" },
          { supply: "13/17", time: "3:30", action: "셔틀 생산" },
          { supply: "14/17", time: "4:00", action: "드라군 레인지 업그레이드" },
          { supply: "15/17", time: "4:30", action: "첫 드랍 시작", note: "SCV 라인 공격" }
        ],
        timing: "4분 30초",
        difficulty: "어려움",
        counters: ["미사일 터렛", "초반 바이오닉 러쉬"],
        type: "3:3",
        style: "타이밍",
        pros: ["강력한 경제 타격", "높은 기동성", "메카닉 상대 효과적"],
        cons: ["실패시 불리", "자원 투자 큼", "터렛에 취약"]
      }
    ]
  },
  // Protoss vs Protoss
  {
    myRace: "Protoss",
    enemyRace: "Protoss",
    strategies: [
      {
        title: "4게이트 질럿 러쉬",
        description: "4개의 게이트웨이에서 질럿을 쏟아내는 올인 전략",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "첫 번째 파일런" },
          { supply: "8/9", time: "0:40", action: "게이트웨이 건설" },
          { supply: "9/9", time: "1:00", action: "두 번째 파일런" },
          { supply: "9/17", time: "1:20", action: "두 번째 게이트웨이" },
          { supply: "10/17", time: "1:40", action: "세 번째 게이트웨이" },
          { supply: "11/17", time: "2:00", action: "네 번째 게이트웨이" },
          { supply: "12/17", time: "2:20", action: "질럿 생산 시작", note: "모든 게이트에서" },
          { supply: "13/17", time: "2:40", action: "프로브 정찰" },
          { supply: "14/17", time: "3:00", action: "전진 파일런 건설" },
          { supply: "15/17", time: "3:20", action: "공격 시작", note: "질럿 8기 이상" }
        ],
        timing: "3분 20초",
        difficulty: "쉬움",
        counters: ["드라군 빌드", "캐논 러쉬"],
        type: "3:3",
        style: "러쉬",
        pros: ["빠른 승부 가능", "단순한 전략", "상대 경제 타격"],
        cons: ["실패시 매우 불리", "드라군에 취약", "장기전 약함"]
      }
    ]
  },
  // Protoss vs Zerg
  {
    myRace: "Protoss",
    enemyRace: "Zerg",
    strategies: [
      {
        title: "질럿 러쉬",
        description: "초반 질럿으로 압박하며 드라군으로 전환",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "첫 번째 파일런 건설" },
          { supply: "8/9", time: "0:40", action: "프로브로 정찰" },
          { supply: "9/9", time: "1:00", action: "게이트웨이 건설" },
          { supply: "9/17", time: "1:20", action: "두 번째 파일런" },
          { supply: "10/17", time: "1:40", action: "두 번째 게이트웨이" },
          { supply: "11/17", time: "2:00", action: "질럿 생산 시작", note: "양쪽 게이트에서" },
          { supply: "12/17", time: "2:30", action: "사이버네틱스 코어 건설" },
          { supply: "13/17", time: "3:00", action: "가스 채취 시작" },
          { supply: "14/17", time: "3:30", action: "드라군 레인지 연구" },
          { supply: "16/17", time: "4:00", action: "첫 드라군 생산" }
        ],
        timing: "4분",
        difficulty: "쉬움",
        counters: ["저글링 다수", "히드라리스크 빌드"],
        type: "3:3",
        style: "러쉬",
        pros: ["초반 압박 가능", "드라군 전환 용이", "단순한 빌드"],
        cons: ["저글링 물량에 불리", "가스 타이밍 중요"]
      }
    ]
  },
  // Zerg vs Terran
  {
    myRace: "Zerg",
    enemyRace: "Terran",
    strategies: [
      {
        title: "2해처리 뮤탈",
        description: "2개의 해처리로 빠른 뮤탈리스크 운영",
        buildOrder: [
          { supply: "4/9", time: "0:00", action: "드론 생산", note: "계속 생산" },
          { supply: "5/9", time: "0:20", action: "오버로드 생산" },
          { supply: "5/9", time: "0:40", action: "드론으로 정찰" },
          { supply: "6/9", time: "1:00", action: "두 번째 해처리 건설" },
          { supply: "7/9", time: "1:30", action: "스포닝 풀 건설" },
          { supply: "8/9", time: "2:00", action: "익스트랙터 건설" },
          { supply: "9/9", time: "2:30", action: "레어 업그레이드" },
          { supply: "9/17", time: "3:00", action: "스파이어 건설" },
          { supply: "10/17", time: "3:30", action: "뮤탈리스크 생산 시작" },
          { supply: "12/17", time: "4:00", action: "저글링 스피드 연구" },
          { supply: "14/17", time: "4:30", action: "첫 뮤탈 견제", note: "SCV 라인 공격" }
        ],
        timing: "4분 30초",
        difficulty: "보통",
        counters: ["터렛 러쉬", "발키리 빌드"],
        type: "3:3",
        style: "운영",
        pros: ["높은 기동성", "경제 성장 가능", "효과적인 견제"],
        cons: ["터렛에 취약", "초반 수비 약함", "가스 의존도 높음"]
      }
    ]
  },
  // Zerg vs Protoss
  {
    myRace: "Zerg",
    enemyRace: "Protoss",
    strategies: [
      {
        title: "히드라 올인",
        description: "히드라리스크 대량 생산으로 프로토스 압박",
        buildOrder: [
          { supply: "4/9", time: "0:00", action: "드론 생산", note: "계속 생산" },
          { supply: "5/9", time: "0:20", action: "오버로드 생산" },
          { supply: "5/9", time: "0:40", action: "드론으로 정찰" },
          { supply: "6/9", time: "1:00", action: "스포닝 풀 건설" },
          { supply: "7/9", time: "1:30", action: "익스트랙터 건설" },
          { supply: "8/9", time: "2:00", action: "레어 업그레이드" },
          { supply: "9/9", time: "2:30", action: "하이드라 덴 건설" },
          { supply: "9/17", time: "3:00", action: "두 번째 해처리" },
          { supply: "10/17", time: "3:30", action: "그루브드 스파인 연구" },
          { supply: "12/17", time: "4:00", action: "히드라 생산 시작" },
          { supply: "14/17", time: "4:30", action: "공격 시작", note: "히드라 8기 이상" }
        ],
        timing: "4분 30초",
        difficulty: "보통",
        counters: ["스톰", "리버"],
        type: "3:3",
        style: "타이밍",
        pros: ["원거리 공격", "강력한 타이밍", "방어구 무시"],
        cons: ["이동속도 느림", "사이오닉 스톰에 취약", "가스 소모 큼"]
      }
    ]
  },
  // Zerg vs Zerg
  {
    myRace: "Zerg",
    enemyRace: "Zerg",
    strategies: [
      {
        title: "9풀 저글링 러쉬",
        description: "매우 빠른 저글링 러쉬로 상대 경제 파괴",
        buildOrder: [
          { supply: "4/9", time: "0:00", action: "드론 생산", note: "9까지만 생산" },
          { supply: "5/9", time: "0:20", action: "드론 생산" },
          { supply: "6/9", time: "0:40", action: "드론 생산" },
          { supply: "7/9", time: "1:00", action: "드론 생산" },
          { supply: "8/9", time: "1:20", action: "오버로드 생산" },
          { supply: "8/9", time: "1:40", action: "스포닝 풀 건설" },
          { supply: "9/9", time: "2:00", action: "저글링 생산 시작" },
          { supply: "9/17", time: "2:20", action: "두 번째 오버로드" },
          { supply: "10/17", time: "2:40", action: "저글링 스피드 연구" },
          { supply: "12/17", time: "3:00", action: "첫 번째 공격", note: "저글링 6마리" },
          { supply: "14/17", time: "3:20", action: "두 번째 공격", note: "저글링 추가 6마리" }
        ],
        timing: "3분",
        difficulty: "쉬움",
        counters: ["선스포닝", "저글링 선생산"],
        type: "3:3",
        style: "러쉬",
        pros: ["매우 빠른 타이밍", "상대 준비 어려움", "낮은 자원 요구"],
        cons: ["실패시 매우 불리", "경제 성장 늦음", "후속 빌드 제한"]
      }
    ]
  }
];

export default function Home() {
  const [selectedMyRace, setSelectedMyRace] = useState<string>("Terran");
  const [selectedEnemyRace, setSelectedEnemyRace] = useState<string>("Protoss");
  const [strategyType, setStrategyType] = useState<"일반" | "3:3">("3:3");
  const [selectedStyle, setSelectedStyle] = useState<"러쉬" | "타이밍" | "후반" | "운영" | "전체">("전체");

  const races = ["Terran", "Protoss", "Zerg"];
  const styles = ["전체", "러쉬", "타이밍", "후반", "운영"];

  const getStrategies = () => {
    const matchup = strategyDatabase.find(
      matchup => 
        matchup.myRace === selectedMyRace && 
        matchup.enemyRace === selectedEnemyRace
    );
    const strategies = matchup?.strategies.filter(s => s.type === strategyType) || [];
    return selectedStyle === "전체" ? strategies : strategies.filter(s => s.style === selectedStyle);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
          스타크래프트 전략 가이드
        </h1>

        <div className="grid grid-cols-4 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">내 종족 선택</h2>
            <div className="grid grid-cols-1 gap-4">
              {races.map(race => (
                <button
                  key={race}
                  onClick={() => setSelectedMyRace(race)}
                  className={`p-3 rounded ${
                    selectedMyRace === race
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {race}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">상대 종족 선택</h2>
            <div className="grid grid-cols-1 gap-4">
              {races.map(race => (
                <button
                  key={race}
                  onClick={() => setSelectedEnemyRace(race)}
                  className={`p-3 rounded ${
                    selectedEnemyRace === race
                      ? "bg-red-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {race}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">게임 타입</h2>
            <div className="grid grid-cols-1 gap-4">
              {["일반", "3:3"].map(type => (
                <button
                  key={type}
                  onClick={() => setStrategyType(type as "일반" | "3:3")}
                  className={`p-3 rounded ${
                    strategyType === type
                      ? "bg-purple-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">전략 스타일</h2>
            <div className="grid grid-cols-1 gap-4">
              {styles.map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style as any)}
                  className={`p-3 rounded ${
                    selectedStyle === style
                      ? "bg-green-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {getStrategies().map((strategy, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">
                    {strategy.title}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-900 rounded text-sm">
                      {strategy.style}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      strategy.difficulty === "쉬움" 
                        ? "bg-green-900" 
                        : strategy.difficulty === "보통"
                        ? "bg-yellow-900"
                        : "bg-red-900"
                    }`}>
                      {strategy.difficulty}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-purple-400">
                    타이밍: {strategy.timing}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">{strategy.description}</p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-green-400">장점</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {strategy.pros.map((pro, i) => (
                      <li key={i} className="text-gray-300">{pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-red-400">단점</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {strategy.cons.map((con, i) => (
                      <li key={i} className="text-gray-300">{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">빌드 오더</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="pb-2 pr-4">인구수</th>
                        <th className="pb-2 pr-4">시간</th>
                        <th className="pb-2 pr-4">행동</th>
                        <th className="pb-2">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {strategy.buildOrder.map((step, i) => (
                        <tr key={i} className="border-b border-gray-700">
                          <td className="py-2 pr-4 text-yellow-400">{step.supply}</td>
                          <td className="py-2 pr-4 text-green-400">{step.time}</td>
                          <td className="py-2 pr-4">{step.action}</td>
                          <td className="py-2 text-gray-400">{step.note || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">카운터</h4>
                <div className="flex gap-2 flex-wrap">
                  {strategy.counters.map((counter, i) => (
                    <span key={i} className="bg-red-900 px-3 py-1 rounded">
                      {counter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {getStrategies().length === 0 && (
            <div className="text-center py-8 text-gray-400">
              해당 매치업의 전략이 아직 등록되지 않았습니다.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
