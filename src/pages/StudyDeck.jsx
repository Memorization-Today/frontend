// src/pages/StudyDeck.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useDeckStore from "../store/useDeckStore";
import Button from "../components/ui/Button";

export default function StudyDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const deck = useDeckStore((state) => state.decks.find((d) => d.id === deckId));
  const updateLastStudiedAt = useDeckStore((state) => state.updateLastStudiedAt);
  const recordReviewResult = useDeckStore((state) => state.recordReviewResult);

  const [shuffledCards, setShuffledCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (deck) {
      const shuffled = [...deck.cards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
    }
  }, [deck]);

  const current = shuffledCards[currentIndex];

  const handleAnswer = (correct) => {
    if (!correct) setWrongCount((prev) => prev + 1);

    if (currentIndex + 1 < shuffledCards.length) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
      updateLastStudiedAt(deckId);
      recordReviewResult(deckId, wrongCount);
    }
  };

  if (!deck) return <div className="p-4">덱을 찾을 수 없습니다.</div>;
  if (!current && !isFinished) return <div className="p-4">카드가 없습니다.</div>;

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <div className="text-2xl font-semibold text-text mb-2">학습 완료!</div>
        <div className="text-subtext mb-6">틀린 카드 수: {wrongCount}개</div>
        <Button onClick={() => navigate("/")} variant="primary">
          메인으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-background">
      <div className="w-full max-w-md min-h-[400px] bg-white border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between text-center">
        <div>
          <div className="text-xs text-subtext mb-1">
            {currentIndex + 1} / {shuffledCards.length} 문제
          </div>
          <div className="text-sm text-subtext mb-1">질문</div>
          <div className="flex justify-center items-center min-h-[80px]">
            <div className="text-xl font-semibold text-text leading-snug">
              {current.question}
            </div>
          </div>

          {showAnswer && (
            <>
              <div className="text-sm text-subtext mb-1">정답</div>
              <div className="text-lg text-text mb-6">{current.answer}</div>
            </>
          )}
        </div>

        <div>
          {showAnswer ? (
            <div className="flex gap-2 justify-center">
              <Button onClick={() => handleAnswer(true)} variant="primary">
                맞췄어요
              </Button>
              <Button onClick={() => handleAnswer(false)} variant="secondary">
                틀렸어요
              </Button>
            </div>
          ) : (
            <Button onClick={() => setShowAnswer(true)} variant="primary" className="w-full">
              정답 보기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
