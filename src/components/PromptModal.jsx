// src/components/PromptModal.jsx
import React, { useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";

const PROMPTS = {
  "서술형 Q/A": `다음은 사용자가 입력한 학습용 텍스트입니다. 이 텍스트를 바탕으로 시험에 출제될 가능성이 높은 질문과 그에 대한 정답을 최대한 구체적이고 명확하게 생성해주세요.

- 질문은 핵심 개념, 용어, 이론, 원리, 사례, 비교 등을 중심으로 구성하고, 모호함 없이 구체적으로 작성해주세요.
- 정답은 문맥을 반영하여 간결하고 정확하게 기술해주세요.
- 단순 암기용 질문뿐 아니라, 이해와 적용을 요구하는 질문도 포함해주세요.
- 텍스트의 내용을 절대 생략하지 말고, 의미를 훼손하지 않는 범위 내에서 재구성해 주세요.
- 출력은 아래 예시처럼 JSON 객체 배열 형식으로 작성해야 하며, 형식 오류가 없도록 주의하세요.

--- 예시 출력 포맷 (형식은 반드시 유지) ---

[
  {
    "question": "프로토콜 계층에서 프로세스 간의 통신을 담당하는 계층은 무엇인가?",
    "answer": "전송 계층 (Transport Layer)"
  },
  {
    "question": "Fitts의 법칙에서 클릭 횟수는 어떤 요소에 종속적인가?",
    "answer": "두 타겟 간 거리(D)와 타겟의 너비(W)"
  }
]

--- 입력 텍스트 시작 ---

--- 입력 텍스트 끝 ---`,
  "O/X 문제": `다음은 사용자가 입력한 학습용 텍스트입니다. 이 텍스트를 바탕으로 출제 가능성이 높은 O/X 문제를 다수 생성해주세요.

- 각 문장은 사실 여부를 명확히 판단할 수 있는 형태로 작성해야 하며, 모호한 표현은 피해야 합니다.
- 질문은 핵심 개념, 정의, 비교, 이론, 용어, 구조, 원리 등을 중심으로 구체적이고 직관적으로 만들어 주세요.
- 반드시 텍스트 내용에 근거한 사실만을 사용하고, 텍스트에 언급되지 않은 내용이나 추론은 포함하지 마세요.
- 질문은 단순한 복사문장이 아닌, 시험을 염두에 둔 형태로 재구성 및 요약해 주세요.
- 출력은 아래 예시와 같이 JSON 배열 형식으로 하며, 각 객체는 question과 answer를 반드시 포함해야 합니다.
- - "answer"는 "o" 또는 "x" 중 하나로 표시해주세요.

[
  {
    "question": "작업 기억은 장기 기억보다 용량이 크고 오래 지속된다.",
    "answer": "x"
  },
  {
    "question": "피츠의 법칙은 거리(D)와 너비(W)에 비례하여 반응시간이 결정된다는 법칙이다.",
    "answer": "o"
  }
]

--- 입력 텍스트 시작 ---

--- 입력 텍스트 끝 ---`,
  "빈칸 채우기": `다음은 사용자가 입력한 학습용 텍스트입니다. 이 텍스트를 바탕으로 시험에 출제될 가능성이 높은 핵심 내용을 빠짐없이 분석하여, 주요 개념과 용어를 중심으로 빈칸 문제를 생성해주세요.

- 모든 문장은 원문의 맥락을 반영하여 의미가 완전히 보존되도록 구성해주세요.
- 핵심 용어 및 개념은 반드시 빈칸으로 처리해주세요. 부차적인 설명이 아닌, 주요 이론, 용어, 모델, 원리, 개념 중심으로 빈칸을 만들어야 합니다.
- 문장을 임의로 생략하거나 단순화하지 말고, 원문에 충실하게 구성하세요.
- 출력 형식은 아래 예시를 반드시 따르세요.

[
  {
    "question": "사용자 경험(UX)은 사용자가 제품을 사용하는 동안 느끼는 ________________의 총합이다.",
    "answer": "감정, 인식, 반응"
  },
  {
    "question": "피츠의 법칙은 반응 시간을 ________________과 ________________의 함수로 나타낸다.",
    "answer": "거리(D), 너비(W)"
  }
]
--- 입력 텍스트 시작 ---

--- 입력 텍스트 끝 ---
  `,
};

export default function PromptModal({ onClose }) {
  const tabs = Object.keys(PROMPTS);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(PROMPTS[activeTab]).then(() => {
      alert("✅ 프롬프트가 클립보드에 복사되었습니다!");
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <Card className="w-full max-w-2xl p-6 relative">
        <h2 className="text-xl font-semibold text-text mb-3">프롬프트 모음</h2>

        {/* 탭 선택 */}
        <div className="flex space-x-2 mb-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-subtext hover:text-text"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 프롬프트 영역 */}
        <textarea
          readOnly
          value={PROMPTS[activeTab]}
          className="w-full h-64 p-3 border border-border rounded-lg font-mono text-sm bg-gray-50 text-text"
        />

        {/* 버튼 */}
        <div className="flex justify-between mt-4">
          <Button onClick={handleCopyPrompt} variant="primary">
            프롬프트 복사하기
          </Button>
          <Button onClick={onClose} variant="secondary">
            닫기
          </Button>
        </div>
      </Card>
    </div>
  );
}