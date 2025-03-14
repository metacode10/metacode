import React, { useState } from 'react';

interface RaceMatchup {
  myRace: string;
  enemyRace: string;
  strategies: Array<{
    title: string;
    description: string;
    buildOrder: Array<{
      supply: string;
      time: string;
      action: string;
      note?: string;
    }>;
    timing: string;
    difficulty: string;
    counters: string[];
    type: string;
    style: string;
    pros: string[];
    cons: string[];
  }>;
}

const strategyDatabase: RaceMatchup[] = [
  // Terran vs Terran
  {
    myRace: "Terran",
    enemyRace: "Terran",
    strategies: [
      {
        title: "벌처 러쉬",
        description: "초반 벌처로 상대 경제를 견제하는 전략",
        buildOrder: [
          { supply: "6/10", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/10", time: "0:20", action: "서플라이 디팟 건설" },
          { supply: "8/10", time: "0:40", action: "배럭스 건설" },
          { supply: "9/10", time: "1:00", action: "가스 건설" },
          { supply: "9/18", time: "1:20", action: "팩토리 건설" },
          { supply: "10/18", time: "1:40", action: "벌처 생산 시작" },
          { supply: "11/18", time: "2:00", action: "스피드 업그레이드" },
          { supply: "12/18", time: "2:20", action: "두 번째 벌처" },
          { supply: "13/18", time: "2:40", action: "첫 견제 시작" },
          { supply: "14/18", time: "3:00", action: "세 번째 벌처" },
          { supply: "15/18", time: "3:20", action: "전면 공격", note: "벌처 3기" }
        ],
        timing: "2분 40초",
        difficulty: "보통",
        counters: ["마인", "벌처 방어"],
        type: "3:3",
        style: "러쉬",
        pros: ["빠른 견제", "높은 기동성", "경제 타격"],
        cons: ["마인에 취약", "후속 빌드 필요", "실패시 불리"]
      },
      {
        title: "탱크 시즈 운영",
        description: "탱크를 주력으로 한 수비적인 운영",
        buildOrder: [
          { supply: "6/10", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/10", time: "0:20", action: "서플라이 디팟 건설" },
          { supply: "8/10", time: "0:40", action: "배럭스 건설" },
          { supply: "9/10", time: "1:00", action: "가스 2개" },
          { supply: "9/18", time: "1:30", action: "팩토리 건설" },
          { supply: "10/18", time: "2:00", action: "머신샵 건설" },
          { supply: "11/18", time: "2:30", action: "시즈 모드 연구" },
          { supply: "12/18", time: "3:00", action: "첫 탱크 생산" },
          { supply: "13/18", time: "3:30", action: "두 번째 팩토리" },
          { supply: "14/18", time: "4:00", action: "탱크 증산" },
          { supply: "15/18", time: "4:30", action: "방어 진형 구축", note: "탱크 3기" }
        ],
        timing: "4분 30초",
        difficulty: "어려움",
        counters: ["드랍십", "레이스"],
        type: "3:3",
        style: "운영",
        pros: ["강력한 방어", "지역 장악", "대규모 교전 유리"],
        cons: ["느린 이동속도", "드랍에 취약", "가스 소모 큼"]
      },
      {
        title: "1-1-1 타이밍",
        description: "배럭스, 팩토리, 스타포트를 활용한 타이밍 공격",
        buildOrder: [
          { supply: "6/10", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/10", time: "0:20", action: "서플라이 디팟 건설" },
          { supply: "8/10", time: "0:40", action: "배럭스 건설" },
          { supply: "9/10", time: "1:00", action: "가스 건설" },
          { supply: "9/18", time: "1:30", action: "팩토리 건설" },
          { supply: "10/18", time: "2:00", action: "스타포트 건설" },
          { supply: "11/18", time: "2:30", action: "탱크 생산" },
          { supply: "12/18", time: "3:00", action: "레이스 생산" },
          { supply: "13/18", time: "3:30", action: "마린 생산" },
          { supply: "14/18", time: "4:00", action: "시즈 모드 연구" },
          { supply: "15/18", time: "4:30", action: "공격 시작", note: "탱크 2기, 레이스 1기" }
        ],
        timing: "4분 30초",
        difficulty: "보통",
        counters: ["골리앗", "빠른 레이스"],
        type: "3:3",
        style: "타이밍",
        pros: ["다양한 유닛 운용", "유연한 대응", "강력한 타이밍"],
        cons: ["가스 많이 필요", "복잡한 운영", "전투 미스 치명적"]
      }
    ]
  },
  // Terran vs Protoss
  {
    myRace: "Terran",
    enemyRace: "Protoss",
    strategies: [
      {
        title: "2팩 벌처 러쉬",
        description: "2개의 팩토리에서 벌처를 생산하여 프로브 라인 공격",
        buildOrder: [
          { supply: "6/10", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/10", time: "0:20", action: "서플라이 디팟 건설" },
          { supply: "8/10", time: "0:40", action: "배럭스 건설" },
          { supply: "9/10", time: "1:00", action: "가스 2개" },
          { supply: "9/18", time: "1:30", action: "첫 팩토리 건설" },
          { supply: "10/18", time: "2:00", action: "두 번째 팩토리" },
          { supply: "11/18", time: "2:30", action: "벌처 생산 시작" },
          { supply: "12/18", time: "3:00", action: "스피드 업그레이드" },
          { supply: "13/18", time: "3:30", action: "벌처 4기 확보" },
          { supply: "14/18", time: "4:00", action: "프로브 라인 공격" },
          { supply: "15/18", time: "4:30", action: "추가 벌처 생산", note: "벌처 6기" }
        ],
        timing: "4분",
        difficulty: "보통",
        counters: ["드라군", "질럿 서포트"],
        type: "3:3",
        style: "러쉬",
        pros: ["강력한 견제", "경제 타격", "높은 기동성"],
        cons: ["드라군에 취약", "가스 소모 큼", "실패시 불리"]
      },
      {
        title: "SK 테란",
        description: "사이언스 베슬과 골리앗을 주력으로 한 후반 운영",
        buildOrder: [
          { supply: "6/10", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/10", time: "0:20", action: "서플라이 디팟 건설" },
          { supply: "8/10", time: "0:40", action: "배럭스 건설" },
          { supply: "9/10", time: "1:00", action: "가스 2개" },
          { supply: "9/18", time: "1:30", action: "팩토리 건설" },
          { supply: "10/18", time: "2:00", action: "스타포트 건설" },
          { supply: "11/18", time: "2:30", action: "사이언스 퍼실리티" },
          { supply: "12/18", time: "3:00", action: "골리앗 생산" },
          { supply: "13/18", time: "3:30", action: "사이언스 베슬 생산" },
          { supply: "14/18", time: "4:00", action: "EMP 연구" },
          { supply: "15/18", time: "4:30", action: "첫 교전", note: "골리앗 4기, 베슬 1기" }
        ],
        timing: "4분 30초",
        difficulty: "어려움",
        counters: ["질럿 러쉬", "캐리어"],
        type: "3:3",
        style: "운영",
        pros: ["강력한 후반", "시너지 좋음", "대규모 교전 유리"],
        cons: ["초반 약세", "컨트롤 어려움", "가스 많이 필요"]
      },
      {
        title: "5배럭 타이밍",
        description: "5개의 배럭스에서 마린을 쏟아내는 전략",
        buildOrder: [
          { supply: "6/10", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/10", time: "0:20", action: "서플라이 디팟 건설" },
          { supply: "8/10", time: "0:40", action: "첫 배럭스 건설" },
          { supply: "9/10", time: "1:00", action: "두 번째 배럭스" },
          { supply: "9/18", time: "1:30", action: "세 번째 배럭스" },
          { supply: "10/18", time: "2:00", action: "네 번째 배럭스" },
          { supply: "11/18", time: "2:30", action: "다섯 번째 배럭스" },
          { supply: "12/18", time: "3:00", action: "스팀팩 연구" },
          { supply: "13/18", time: "3:30", action: "마린 대량 생산" },
          { supply: "14/18", time: "4:00", action: "전진 벙커 건설" },
          { supply: "15/18", time: "4:30", action: "공격 시작", note: "마린 20기" }
        ],
        timing: "4분 30초",
        difficulty: "쉬움",
        counters: ["하이템플러", "리버"],
        type: "3:3",
        style: "타이밍",
        pros: ["단순한 운영", "미네랄 위주", "강력한 타이밍"],
        cons: ["AOE에 취약", "후반 전환 어려움", "견제에 약함"]
      }
    ]
  },
  // Terran vs Zerg
  {
    myRace: "Terran",
    enemyRace: "Zerg",
    strategies: [
      {
        title: "2배럭 벙커 러쉬",
        description: "2개의 배럭스로 마린을 생산하여 벙커 설치 후 압박",
        buildOrder: [
          { supply: "6/10", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/10", time: "0:20", action: "서플라이 디팟 건설" },
          { supply: "8/10", time: "0:40", action: "첫 배럭스 건설" },
          { supply: "9/10", time: "1:00", action: "두 번째 배럭스" },
          { supply: "9/18", time: "1:30", action: "마린 생산 시작" },
          { supply: "10/18", time: "2:00", action: "SCV 4기 출발" },
          { supply: "11/18", time: "2:30", action: "전진 벙커 건설" },
          { supply: "12/18", time: "3:00", action: "마린 이동" },
          { supply: "13/18", time: "3:30", action: "두 번째 벙커" },
          { supply: "14/18", time: "4:00", action: "스팀팩 연구" },
          { supply: "15/18", time: "4:30", action: "추가 마린 합류", note: "마린 8기" }
        ],
        timing: "3분",
        difficulty: "쉬움",
        counters: ["저글링 서라운드", "뮤탈리스크"],
        type: "3:3",
        style: "러쉬",
        pros: ["빠른 압박", "단순한 운영", "저원거리 견제"],
        cons: ["실패시 매우 불리", "후속 빌드 없음", "저글링 물량에 취약"]
      },
      {
        title: "메카닉 운영",
        description: "탱크와 골리앗을 주력으로 한 메카닉 운영",
        buildOrder: [
          { supply: "6/10", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/10", time: "0:20", action: "서플라이 디팟 건설" },
          { supply: "8/10", time: "0:40", action: "배럭스 건설" },
          { supply: "9/10", time: "1:00", action: "가스 2개" },
          { supply: "9/18", time: "1:30", action: "팩토리 건설" },
          { supply: "10/18", time: "2:00", action: "머신샵 건설" },
          { supply: "11/18", time: "2:30", action: "시즈 모드 연구" },
          { supply: "12/18", time: "3:00", action: "두 번째 팩토리" },
          { supply: "13/18", time: "3:30", action: "골리앗 생산" },
          { supply: "14/18", time: "4:00", action: "탱크 생산" },
          { supply: "15/18", time: "4:30", action: "첫 진출", note: "탱크 2기, 골리앗 2기" }
        ],
        timing: "4분 30초",
        difficulty: "보통",
        counters: ["뮤탈리스크", "디파일러"],
        type: "3:3",
        style: "운영",
        pros: ["강력한 방어", "견고한 운영", "대규모 교전 유리"],
        cons: ["느린 이동속도", "가스 소모 큼", "공중 유닛에 취약"]
      },
      {
        title: "레이스 견제",
        description: "레이스로 상대 경제를 견제하며 운영",
        buildOrder: [
          { supply: "6/10", time: "0:00", action: "SCV 생산", note: "계속 생산" },
          { supply: "7/10", time: "0:20", action: "서플라이 디팟 건설" },
          { supply: "8/10", time: "0:40", action: "배럭스 건설" },
          { supply: "9/10", time: "1:00", action: "가스 건설" },
          { supply: "9/18", time: "1:30", action: "팩토리 건설" },
          { supply: "10/18", time: "2:00", action: "스타포트 건설" },
          { supply: "11/18", time: "2:30", action: "컨트롤 타워" },
          { supply: "12/18", time: "3:00", action: "레이스 생산" },
          { supply: "13/18", time: "3:30", action: "두 번째 레이스" },
          { supply: "14/18", time: "4:00", action: "첫 견제 시작" },
          { supply: "15/18", time: "4:30", action: "세 번째 레이스", note: "레이스 3기" }
        ],
        timing: "4분",
        difficulty: "어려움",
        counters: ["스커지", "하이드라"],
        type: "3:3",
        style: "타이밍",
        pros: ["강력한 견제", "높은 기동성", "대공 견제"],
        cons: ["스커지에 취약", "가스 소모 큼", "지상 전력 약함"]
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
        description: "셔틀로 드라군을 드랍하여 경제 라인 타격",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "파일런 건설" },
          { supply: "8/9", time: "0:40", action: "게이트웨이 건설" },
          { supply: "9/9", time: "1:00", action: "가스 건설" },
          { supply: "9/17", time: "1:30", action: "사이버네틱스 코어" },
          { supply: "10/17", time: "2:00", action: "로보틱스 건설" },
          { supply: "11/17", time: "2:30", action: "드라군 레인지 연구" },
          { supply: "12/17", time: "3:00", action: "셔틀 생산" },
          { supply: "13/17", time: "3:30", action: "드라군 생산" },
          { supply: "14/17", time: "4:00", action: "두 번째 드라군" },
          { supply: "15/17", time: "4:30", action: "첫 드랍 시작", note: "드라군 2기" }
        ],
        timing: "4분 30초",
        difficulty: "보통",
        counters: ["터렛", "골리앗"],
        type: "3:3",
        style: "타이밍",
        pros: ["강력한 경제 타격", "예측하기 어려움", "높은 기동성"],
        cons: ["실패시 불리", "터렛에 취약", "가스 소모 큼"]
      },
      {
        title: "질럿 러쉬",
        description: "빠른 질럿으로 초반 압박",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "파일런 건설" },
          { supply: "8/9", time: "0:40", action: "게이트웨이 건설" },
          { supply: "9/9", time: "1:00", action: "두 번째 파일런" },
          { supply: "9/17", time: "1:20", action: "두 번째 게이트웨이" },
          { supply: "10/17", time: "1:40", action: "질럿 생산 시작" },
          { supply: "11/17", time: "2:00", action: "세 번째 게이트웨이" },
          { supply: "12/17", time: "2:30", action: "질럿 증산" },
          { supply: "13/17", time: "3:00", action: "전진 파일런" },
          { supply: "14/17", time: "3:30", action: "네 번째 게이트웨이" },
          { supply: "15/17", time: "4:00", action: "공격 시작", note: "질럿 8기" }
        ],
        timing: "4분",
        difficulty: "쉬움",
        counters: ["벙커", "파이어뱃"],
        type: "3:3",
        style: "러쉬",
        pros: ["단순한 운영", "미네랄 위주", "빠른 타이밍"],
        cons: ["벙커에 취약", "후반 전환 어려움", "견제에 약함"]
      },
      {
        title: "캐리어 운영",
        description: "캐리어를 주력으로 한 후반 운영",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "파일런 건설" },
          { supply: "8/9", time: "0:40", action: "게이트웨이 건설" },
          { supply: "9/9", time: "1:00", action: "가스 2개" },
          { supply: "10/17", time: "1:30", action: "사이버네틱스 코어" },
          { supply: "11/17", time: "2:00", action: "스타게이트 건설" },
          { supply: "12/17", time: "2:30", action: "플릿 비콘" },
          { supply: "13/17", time: "3:00", action: "첫 캐리어 생산" },
          { supply: "14/17", time: "4:00", action: "두 번째 캐리어" },
          { supply: "15/17", time: "5:00", action: "그라운드 방어 보강" },
          { supply: "16/17", time: "5:30", action: "첫 공격", note: "캐리어 2기" }
        ],
        timing: "5분 30초",
        difficulty: "어려움",
        counters: ["고스트", "발키리"],
        type: "3:3",
        style: "후반",
        pros: ["강력한 후반 전력", "넓은 지역 통제", "대량 생산 가능"],
        cons: ["초중반 약세", "스커지에 취약", "가스 소모 큼"]
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
      },
      {
        title: "드라군 운영",
        description: "드라군을 주력으로 한 안정적인 운영",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "파일런 건설" },
          { supply: "8/9", time: "0:40", action: "게이트웨이 건설" },
          { supply: "9/9", time: "1:00", action: "가스 건설" },
          { supply: "9/17", time: "1:30", action: "사이버네틱스 코어" },
          { supply: "10/17", time: "2:00", action: "두 번째 게이트웨이" },
          { supply: "11/17", time: "2:30", action: "드라군 생산 시작" },
          { supply: "12/17", time: "3:00", action: "드라군 레인지 업그레이드" },
          { supply: "13/17", time: "3:30", action: "세 번째 게이트웨이" },
          { supply: "14/17", time: "4:00", action: "옵저버 생산" },
          { supply: "15/17", time: "4:30", action: "공격 시작", note: "드라군 6기" }
        ],
        timing: "4분 30초",
        difficulty: "보통",
        counters: ["리버 빌드", "다크 템플러"],
        type: "3:3",
        style: "운영",
        pros: ["안정적인 운영", "유동적 대응", "견제와 방어 모두 가능"],
        cons: ["느린 전개", "리버에 취약", "가스 소모 큼"]
      },
      {
        title: "리버 드랍",
        description: "리버를 이용한 강력한 타이밍 공격",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "파일런 건설" },
          { supply: "8/9", time: "0:40", action: "게이트웨이 건설" },
          { supply: "9/9", time: "1:00", action: "가스 2개 건설" },
          { supply: "10/17", time: "1:30", action: "사이버네틱스 코어" },
          { supply: "11/17", time: "2:00", action: "로보틱스 건설" },
          { supply: "12/17", time: "2:30", action: "로보틱스 서포트 베이" },
          { supply: "13/17", time: "3:00", action: "리버 생산" },
          { supply: "14/17", time: "3:30", action: "셔틀 생산" },
          { supply: "15/17", time: "4:00", action: "스캐럽 생산" },
          { supply: "16/17", time: "4:30", action: "드랍 시작", note: "리버 2기" }
        ],
        timing: "4분 30초",
        difficulty: "어려움",
        counters: ["옵저버 선생산", "빠른 드라군"],
        type: "3:3",
        style: "타이밍",
        pros: ["강력한 데미지", "프로브 라인 초토화", "심리적 압박"],
        cons: ["실패시 매우 불리", "옵저버에 취약", "가스 많이 필요"]
      }
    ]
  },
  // Protoss vs Zerg
  {
    myRace: "Protoss",
    enemyRace: "Zerg",
    strategies: [
      {
        title: "포지 캐논 러쉬",
        description: "상대 앞마당에 포지를 지어 캐논 러쉬",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "8까지만 생산" },
          { supply: "7/9", time: "0:20", action: "파일런 건설" },
          { supply: "8/9", time: "0:40", action: "포지 건설" },
          { supply: "8/9", time: "1:00", action: "프로브 3기 출발" },
          { supply: "8/9", time: "1:20", action: "상대 앞마당 포지 건설" },
          { supply: "8/9", time: "1:40", action: "첫 번째 캐논" },
          { supply: "8/9", time: "2:00", action: "두 번째 캐논" },
          { supply: "8/9", time: "2:20", action: "세 번째 캐논" },
          { supply: "8/9", time: "2:40", action: "프로브 방어" },
          { supply: "8/9", time: "3:00", action: "추가 캐논" },
          { supply: "8/9", time: "3:20", action: "게이트웨이 건설", note: "본진에" }
        ],
        timing: "1분 40초",
        difficulty: "쉬움",
        counters: ["저글링 러쉬", "선스포닝"],
        type: "3:3",
        style: "러쉬",
        pros: ["매우 빠른 타이밍", "상대 심리 교란", "경제 타격"],
        cons: ["실패시 패배", "올인 전략", "늦은 테크 업"]
      },
      {
        title: "질럿 아칸",
        description: "질럿과 아칸으로 이루어진 지상군 전략",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "파일런 건설" },
          { supply: "8/9", time: "0:40", action: "게이트웨이 건설" },
          { supply: "9/9", time: "1:00", action: "가스 건설" },
          { supply: "9/17", time: "1:30", action: "사이버네틱스 코어" },
          { supply: "10/17", time: "2:00", action: "시타델 건설" },
          { supply: "11/17", time: "2:30", action: "템플러 아카이브" },
          { supply: "12/17", time: "3:00", action: "아칸 합체" },
          { supply: "13/17", time: "3:30", action: "두 번째 아칸" },
          { supply: "14/17", time: "4:00", action: "레그 업그레이드" },
          { supply: "15/17", time: "4:30", action: "공격 시작", note: "아칸 2기" }
        ],
        timing: "4분 30초",
        difficulty: "보통",
        counters: ["히드라", "럴커"],
        type: "3:3",
        style: "타이밍",
        pros: ["강력한 지상군", "견고한 전투력", "저글링에 강함"],
        cons: ["럴커에 취약", "가스 소모 큼", "느린 생산"]
      },
      {
        title: "캐리어 운영",
        description: "캐리어를 주력으로 한 후반 운영",
        buildOrder: [
          { supply: "6/9", time: "0:00", action: "프로브 생산", note: "계속 생산" },
          { supply: "7/9", time: "0:20", action: "파일런 건설" },
          { supply: "8/9", time: "0:40", action: "게이트웨이 건설" },
          { supply: "9/9", time: "1:00", action: "가스 2개" },
          { supply: "10/17", time: "1:30", action: "사이버네틱스 코어" },
          { supply: "11/17", time: "2:00", action: "스타게이트 건설" },
          { supply: "12/17", time: "2:30", action: "플릿 비콘" },
          { supply: "13/17", time: "3:00", action: "첫 캐리어 생산" },
          { supply: "14/17", time: "4:00", action: "두 번째 캐리어" },
          { supply: "15/17", time: "5:00", action: "그라운드 방어 보강" },
          { supply: "16/17", time: "5:30", action: "첫 공격", note: "캐리어 2기" }
        ],
        timing: "5분 30초",
        difficulty: "어려움",
        counters: ["히드라 스페셜", "스커지 생산"],
        type: "3:3",
        style: "후반",
        pros: ["강력한 후반 전력", "넓은 지역 통제", "대량 생산 가능"],
        cons: ["초중반 약세", "스커지에 취약", "가스 소모 큼"]
      }
    ]
  }
];

export default function Home() {
  const [selectedMyRace, setSelectedMyRace] = useState<string>("Terran");
  const [selectedEnemyRace, setSelectedEnemyRace] = useState<string>("Terran");
  const [strategyType, setStrategyType] = useState<string>("3:3");

  const getStrategies = () => {
    const matchup = strategyDatabase.find(
      matchup => 
        matchup.myRace === selectedMyRace && 
        matchup.enemyRace === selectedEnemyRace
    );
    return matchup?.strategies.filter(s => s.type === strategyType) || [];
  };

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">스타크래프트 전략 가이드</h1>
      
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block mb-2">내 종족:</label>
            <select 
              value={selectedMyRace}
              onChange={(e) => setSelectedMyRace(e.target.value)}
              className="bg-gray-800 p-2 rounded"
              title="내 종족 선택"
            >
              <option value="Terran">테란</option>
              <option value="Protoss">프로토스</option>
              <option value="Zerg">저그</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2">상대 종족:</label>
            <select 
              value={selectedEnemyRace}
              onChange={(e) => setSelectedEnemyRace(e.target.value)}
              className="bg-gray-800 p-2 rounded"
              title="상대 종족 선택"
            >
              <option value="Terran">테란</option>
              <option value="Protoss">프로토스</option>
              <option value="Zerg">저그</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">전략 유형:</label>
            <select 
              value={strategyType}
              onChange={(e) => setStrategyType(e.target.value)}
              className="bg-gray-800 p-2 rounded"
              title="전략 유형 선택"
            >
              <option value="3:3">3:3</option>
              <option value="2:2">2:2</option>
              <option value="1:1">1:1</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getStrategies().map((strategy, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{strategy.title}</h2>
            <p className="mb-4 text-gray-300">{strategy.description}</p>
            
            <div className="mb-4">
              <h3 className="font-bold mb-2">빌드 오더:</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">서플라이</th>
                    <th className="text-left">시간</th>
                    <th className="text-left">행동</th>
                  </tr>
                </thead>
                <tbody>
                  {strategy.buildOrder.map((step, i) => (
                    <tr key={i} className="text-gray-300">
                      <td>{step.supply}</td>
                      <td>{step.time}</td>
                      <td>{step.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mb-4">
              <p><strong>타이밍:</strong> {strategy.timing}</p>
              <p><strong>난이도:</strong> {strategy.difficulty}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold mb-2">카운터:</h3>
              <ul className="list-disc list-inside text-gray-300">
                {strategy.counters.map((counter, i) => (
                  <li key={i}>{counter}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold mb-2">장점:</h3>
              <ul className="list-disc list-inside text-gray-300">
                {strategy.pros.map((pro, i) => (
                  <li key={i}>{pro}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">단점:</h3>
              <ul className="list-disc list-inside text-gray-300">
                {strategy.cons.map((con, i) => (
                  <li key={i}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
