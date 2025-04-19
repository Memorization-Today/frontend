import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudyDeck from "./pages/StudyDeck";
import AddCard from "./pages/AddCards";
import HowTo from "./pages/HowTo";

export default function App() {
  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deck/:deckId/add" element={<AddCard />} />
        <Route path="/deck/:deckId/study" element={<StudyDeck />} />
        <Route path="/howto" element={<HowTo />} />
      </Routes>
    </div>
  );
}