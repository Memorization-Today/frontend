// src/components/PromptModal.jsx
import React from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";

const PROMPT_TEXT = `다음은 사용자가 입력한 학습용 텍스트입니다. 이 텍스트를 바탕으로 시험에 나올 가능성이 높은 핵심적인 질문과 그에 대한 정답을 추출해주세요.

- 질문은 최대한 구체적이고 명확하게 작성해주세요.
- 정답은 간결하되 정확하게 작성해주세요.
- 각각의 Q/A는 JSON 객체의 배열 형태로 출력해주세요.
- 포맷은 아래 예시를 반드시 따르세요.

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



--- 입력 텍스트 끝 ---`;

export default function PromptModal({ onClose }) {
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(PROMPT_TEXT).then(() => {
      alert("✅ 프롬프트가 클립보드에 복사되었습니다!");
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <Card className="w-full max-w-xl p-6 relative">
        <h2 className="text-xl font-semibold text-text mb-3">프롬프트 사용법</h2>
        <p className="text-sm text-subtext mb-4">
          아래 프롬프트를 복사하여 GPT 모델에게 붙여넣으면 Q/A 카드 데이터를 자동으로 생성할 수 있어요.
        </p>
        <textarea
          readOnly
          value={PROMPT_TEXT}
          className="w-full h-64 p-3 border border-border rounded-lg font-mono text-sm bg-gray-50 text-text"
        />
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
