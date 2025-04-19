// src/components/DeckCreateForm.jsx
import { useState, useEffect } from "react";
import useDeckStore from "../store/useDeckStore";
import { nanoid } from "nanoid";
import Button from "./ui/Button";
import Card from "./ui/Card";

function cleanJSON(input) {
  return input
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\n/g, " ")
    .trim();
}

export default function DeckCreateForm({ showBulkInput, setShowBulkInput }) {
  const { addDeck, addCardToDeck } = useDeckStore();
  const [newDeckName, setNewDeckName] = useState("");
  const [bulkData, setBulkData] = useState("");
  const [jsonPreview, setJsonPreview] = useState([]);
  const [jsonValid, setJsonValid] = useState(null);

  useEffect(() => {
    if (!bulkData.trim()) {
      setJsonPreview([]);
      setJsonValid(null);
      return;
    }
    try {
      const parsed = JSON.parse(cleanJSON(bulkData));
      const filtered = parsed.filter((card) => card.question && card.answer);
      if (!Array.isArray(parsed)) throw new Error();
      setJsonPreview(filtered);
      setJsonValid(filtered.length > 0);
    } catch {
      setJsonPreview([]);
      setJsonValid(false);
    }
  }, [bulkData]);

  const handleCreateDeck = () => {
    if (!newDeckName.trim()) return;
    addDeck(newDeckName);
    setNewDeckName("");
  };

  const handleCreateDeckWithCards = () => {
    if (!newDeckName.trim() || !jsonValid || jsonPreview.length === 0) {
      alert("덱 이름과 유효한 카드 데이터가 필요합니다.");
      return;
    }

    const newDeckId = nanoid();
    addDeck(newDeckName, newDeckId);
    jsonPreview.forEach((card) => {
      addCardToDeck(newDeckId, {
        question: card.question,
        answer: card.answer,
      });
    });
    setNewDeckName("");
    setBulkData("");
    setShowBulkInput(false);
  };

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="새 덱 이름"
          className="p-3 border border-border rounded-lg text-sm flex-1"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
        />
        <Button onClick={handleCreateDeck} variant="secondary">
          일반 덱 생성
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-text">JSON으로 카드 덱 생성</h3>
        </div>

        <textarea
          rows={6}
          className="w-full p-3 border border-border rounded-lg text-sm font-mono"
          placeholder='[
  {"question": "...", "answer": "..."},
  {"question": "...", "answer": "..."}
]'
          value={bulkData}
          onChange={(e) => setBulkData(e.target.value)}
        />

        {jsonValid === true && (
          <div className="text-green-600 text-sm mt-2">
            ✅ {jsonPreview.length}개의 유효한 카드가 감지되었습니다.
          </div>
        )}
        {jsonValid === false && (
          <div className="text-red-600 text-sm mt-2">
            ❌ JSON 파싱 실패 또는 유효한 카드 없음
          </div>
        )}

        {jsonPreview.length > 0 && (
          <div className="max-h-32 overflow-y-auto mt-2">
            <ul className="text-sm text-subtext list-disc pl-5 space-y-1">
              {jsonPreview.map((card, index) => (
                <li key={index}>
                  <strong>Q:</strong> {card.question}<br />
                  <strong>A:</strong> {card.answer}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2 mt-4 justify-end">
          <Button onClick={handleCreateDeckWithCards} variant="primary">
            덱 + 카드 생성
          </Button>
          <Button onClick={() => setShowBulkInput(false)} variant="secondary">
            취소
          </Button>
        </div>
      </Card>
    </div>
  );
}