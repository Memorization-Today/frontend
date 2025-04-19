// src/components/DeckCard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeckStore from "../store/useDeckStore";
import Button from "./ui/Button";

export default function DeckCard({ deck }) {
  const navigate = useNavigate();
  const deleteDeck = useDeckStore((state) => state.deleteDeck);
  const getDeckStats = useDeckStore((state) => state.getDeckStats);
  const [stats, setStats] = useState({ reviewCount: 0, lastWrong: 0, forgettingRate: 1 });

  useEffect(() => {
    if (deck?.id) {
      const result = getDeckStats(deck.id);
      setStats(result);
    }
  }, [deck.id]);

  const { reviewCount, lastWrong, forgettingRate } = stats;
  const memoryRetention = Math.round((1 - forgettingRate) * 100);

  const handleDelete = () => {
    if (confirm(`'${deck.name}' 덱을 삭제하시겠습니까?`)) {
      deleteDeck(deck.id);
    }
  };

  return (
    <li className="p-5 border border-border rounded-xl bg-card hover:shadow-sm transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="text-lg font-semibold text-text">{deck.name}</div>
          <div className="text-sm text-subtext mt-1">
            {deck.cards.length}장의 카드 · 회독 {reviewCount}회 · 최근 오답 {lastWrong}개
          </div>
          <div className="mt-2 text-sm text-subtext">
            기억률: <span className="font-semibold text-text">{memoryRetention}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded mt-1">
            <div
              className="h-2 bg-primary rounded"
              style={{ width: `${memoryRetention}%` }}
            />
          </div>
        </div>
        <Button
          variant="subtle"
          size="sm"
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600"
        >
          삭제
        </Button>
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          variant="secondary"
          onClick={() => navigate(`/deck/${deck.id}/add`)}
        >
          카드 추가
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate(`/deck/${deck.id}/study`)}
        >
          학습하기
        </Button>
      </div>
    </li>
  );
}