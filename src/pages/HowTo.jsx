// src/pages/HowTo.jsx
import { useNavigate } from "react-router-dom";
import { Clock, Repeat, XCircle } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function HowTo() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 text-text">
      <h1 className="text-3xl font-bold mb-6">사용 방법 안내</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-semibold mb-2">1. 덱 생성</h2>
          <p className="text-sm text-subtext">
            덱 이름을 입력하고 "일반 덱 생성" 또는 "JSON으로 덱 생성" 버튼을 눌러 새로운 암기 덱을 만들 수 있습니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">2. 카드 추가</h2>
          <p className="text-sm text-subtext">
            덱 상세 페이지에서 질문/정답을 입력해 카드를 추가하고, 기존 카드를 슬라이드하여 수정/삭제할 수 있습니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">3. 학습하기</h2>
          <p className="text-sm text-subtext">
            카드를 무작위 순서로 학습하며, 정답을 확인한 뒤 "맞췄어요" 또는 "틀렸어요"를 선택하여 학습을 기록합니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">4. 기억률 시각화</h2>
          <p className="text-sm text-subtext mb-2">
            각 덱의 기억률은 다음 요소들을 기반으로 계산되며, 진행도 바 형태로 시각화됩니다:
          </p>
          <ul className="text-sm text-subtext space-y-1 ml-2">
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" /> 마지막 학습으로부터 경과한 시간
            </li>
            <li className="flex items-center gap-2">
              <Repeat className="w-4 h-4 text-gray-500" /> 누적 회독 수
            </li>
            <li className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-gray-500" /> 최근 오답률
            </li>
          </ul>
          <p className="text-sm text-subtext mt-2">
            해당 계산은 <strong>헤르만 에빙하우스</strong>의 망각곡선을 기반으로 하며, 최근 학습 성과와 반복 회독에 따라 실시간으로 조정됩니다.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">5. 덱 저장 & 불러오기</h2>
          <p className="text-sm text-subtext">
            덱은 JSON 파일로 내보내거나 불러올 수 있어 백업과 공유에 용이합니다. 홈 화면 상단의 버튼을 활용하세요.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">6. 프롬프트 활용</h2>
          <p className="text-sm text-subtext">
            ChatGPT 등의 LLM에 학습 텍스트와 함께 프롬프트를 입력하면 자동으로 Q/A 카드 데이터를 생성할 수 있습니다.
            메인 화면의 "프롬프트 확인" 버튼을 참고하세요.
          </p>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => navigate("/")} variant="primary">
          메인으로 돌아가기
        </Button>
      </div>
    </div>
  );
}