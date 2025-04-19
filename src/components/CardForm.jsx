
// src/components/CardForm.jsx
import { useState } from "react";
import useDeckStore from "../store/useDeckStore";

export default function CardForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const addCard = useDeckStore((state) => state.addCard);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    addCard({ question, answer });
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        className="border p-2"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white py-1 rounded">
        Add Card
      </button>
    </form>
  );
}