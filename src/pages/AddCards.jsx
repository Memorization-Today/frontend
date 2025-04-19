// src/pages/AddCards.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import useDeckStore from "../store/useDeckStore";
import Button from "../components/ui/Button";

export default function AddCards() {
  const { deckId } = useParams();
  const deck = useDeckStore((state) => state.decks.find((d) => d.id === deckId));
  const addCardToDeck = useDeckStore((state) => state.addCardToDeck);
  const updateDeck = useDeckStore((state) => state.updateDeck);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingCardId, setEditingCardId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  if (!deck) return <div className="p-4">덱을 찾을 수 없습니다.</div>;

  const handleAdd = () => {
    if (question && answer) {
      addCardToDeck(deckId, { question, answer });
      setQuestion("");
      setAnswer("");
    }
  };

  const handleDelete = (cardId) => {
    const updatedCards = deck.cards.filter((c) => c.id !== cardId);
    updateDeck(deckId, { ...deck, cards: updatedCards });
  };

  const handleStartEdit = (card) => {
    setEditingCardId(card.id);
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
  };

  const handleSaveEdit = () => {
    const updatedCards = deck.cards.map((c) =>
      c.id === editingCardId ? { ...c, question: editQuestion, answer: editAnswer } : c
    );
    updateDeck(deckId, { ...deck, cards: updatedCards });
    setEditingCardId(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold text-text mb-4">{deck.name} - 카드 추가</h2>
      <input
        className="w-full mb-2 p-3 border border-border rounded-lg text-sm"
        placeholder="질문"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        className="w-full mb-3 p-3 border border-border rounded-lg text-sm"
        placeholder="정답"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button onClick={handleAdd} className="w-full mb-6">
        카드 추가
      </Button>

      <div className="overflow-x-auto flex space-x-4 pb-2">
        {deck.cards.map((card) => (
          <div
            key={card.id}
            className="bg-card border border-border rounded-xl p-4 min-w-[260px] shadow-sm relative text-sm text-text"
          >
            {editingCardId === card.id ? (
              <>
                <input
                  className="w-full mb-2 p-2 border border-border rounded text-sm"
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                />
                <textarea
                  className="w-full mb-2 p-2 border border-border rounded text-sm resize-none"
                  rows={2}
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                />
                <div className="flex justify-between gap-2">
                  <Button onClick={handleSaveEdit} size="sm" variant="primary">
                    저장
                  </Button>
                  <Button onClick={() => setEditingCardId(null)} size="sm" variant="secondary">
                    취소
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="font-semibold mb-1">Q. {card.question}</div>
                <div className="text-subtext mb-2">A. {card.answer}</div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleStartEdit(card)}
                    className="text-xs text-primary hover:underline"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
