// src/components/DeckControls.jsx
import useDeckStore from "../store/useDeckStore";

export default function DeckControls() {
  const { cards, setCards, deckName, setDeckName } = useDeckStore();

  const handleExport = () => {
    const data = {
      deckName,
      createdAt: new Date().toISOString(),
      cards,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${deckName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imported = JSON.parse(event.target.result);
      setCards(imported.cards);
      setDeckName(imported.deckName || "불러온 덱");
    };
    reader.readAsText(file);
  };

  return (
    <div className="mt-4 text-sm text-gray-600 text-center">
      <button
        onClick={handleExport}
        className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded mr-2"
      >
        💾 저장
      </button>
      <label className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">
        📂 불러오기
        <input
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}
