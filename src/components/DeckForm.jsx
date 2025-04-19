import { useState } from "react";
import useDeckStore from "../store/useDeckStore";

export default function DeckForm() {
  const { addCard, deckName, setDeckName } = useDeckStore();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAdd = () => {
    if (question && answer) {
      addCard({ question, answer });
      setQuestion("");
      setAnswer("");
    }
  };

  return (
    <>
      <input
        className="w-full mb-3 p-2 border border-gray-300 rounded text-sm placeholder:text-gray-400"
        placeholder="덱 이름을 입력하세요"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <input
        className="w-full mb-2 p-2 border border-gray-300 rounded text-sm placeholder:text-gray-500"
        placeholder="질문"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        className="w-full mb-3 p-2 border border-gray-300 rounded text-sm placeholder:text-gray-500"
        placeholder="답변"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 w-full py-2 rounded text-sm font-semibold"
        onClick={handleAdd}
      >
        ➕ 카드 추가
      </button>
    </>
  );
}