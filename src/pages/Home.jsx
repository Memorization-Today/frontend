// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import useDeckStore from "../store/useDeckStore";
import { useState, useRef } from "react";
import DeckCard from "../components/DeckCard";
import DeckCreateForm from "../components/DeckCreateForm";
import PromptModal from "../components/PromptModal";
import logo from "../assets/logo.png"; // src 기준 경로

export default function Home() {
  const { decks, overwriteDecks } = useDeckStore();
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleExportJSON = () => {
    const data = JSON.stringify(decks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my_decks.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          overwriteDecks(imported);
          alert("덱이 성공적으로 불러와졌습니다.");
        } else {
          alert("잘못된 형식의 JSON입니다.");
        }
      } catch (e) {
        console.error("JSON 파싱 오류:", e);
        alert("JSON 파싱에 실패했습니다.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 pb-10 font-sans">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">오늘도 외웠다</h1>
      </div>

      <DeckCreateForm showBulkInput={showBulkInput} setShowBulkInput={setShowBulkInput} />

      <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
        <div className="flex gap-2">
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            onChange={handleImportJSON}
            className="hidden"
          />
          <button
            onClick={handleImportClick}
            className="text-sm px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg transition"
          >
            덱 불러오기
          </button>
          <button
            onClick={handleExportJSON}
            className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
          >
            덱 내보내기
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPromptModal(true)}
            className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
          >
            프롬프트 확인
          </button>
          <button
            onClick={() => navigate("/howto")}
            className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
          >
            사용 방법
          </button>
        </div>
      </div>

      {showPromptModal && <PromptModal onClose={() => setShowPromptModal(false)} />}

      <ul className="space-y-4">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </ul>
    </div>
  );
}