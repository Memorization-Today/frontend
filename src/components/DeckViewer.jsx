// src/components/DeckViewer.jsx
import { useState } from "react";
import useDeckStore from "../store/useDeckStore";

export default function DeckViewer() {
  const { cards } = useDeckStore();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) return null;
  const current = cards[index];

  return (
    <div className="text-center border border-dashed border-gray-400 rounded p-4 bg-yellow-100 mb-4">
      <div
        className="text-lg font-medium cursor-pointer bg-white px-4 py-6 rounded shadow-md border border-gray-300 whitespace-pre-wrap"
        onClick={() => setFlipped(!flipped)}
      >
        {flipped ? current.answer : current.question}
      </div>
      <div className="flex justify-between mt-3 text-sm text-gray-700">
        <button
          onClick={() => {
            setIndex((i) => Math.max(0, i - 1));
            setFlipped(false);
          }}
        >
          ◀ 이전
        </button>
        <span>
          {index + 1} / {cards.length}
        </span>
        <button
          onClick={() => {
            setIndex((i) => Math.min(cards.length - 1, i + 1));
            setFlipped(false);
          }}
        >
          다음 ▶
        </button>
      </div>
    </div>
  );
}
