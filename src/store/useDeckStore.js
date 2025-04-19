// src/store/deckStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

function calculateEbbinghausRetention(hoursSince, reviewCount) {
  // 단순화된 에빙하우스 망각 곡선 모델
  const a = 1; // 초기 기억 강도
  const b = 0.05 / Math.max(1, reviewCount); // 반복 학습이 많을수록 망각률 감소
  const retention = a * Math.exp(-b * hoursSince);
  return Math.max(0, Math.min(1, retention));
}

function calculateMemoryScore({ lastStudiedAt, reviewCount, reviewHistory }) {
  if (!lastStudiedAt || reviewCount === 0) return 0;
  const hoursSince = (Date.now() - new Date(lastStudiedAt).getTime()) / 1000 / 60 / 60;
  const retention = calculateEbbinghausRetention(hoursSince, reviewCount);

  const lastWrong = reviewHistory?.[reviewHistory.length - 1]?.wrongCount || 0;
  const lastTotal = reviewHistory?.[reviewHistory.length - 1]?.total || 1;
  const wrongRate = Math.min(1, lastWrong / lastTotal);

  // 기억률은 retention에 오답률을 반영하여 감소 (최대 20% 감소)
  const penalty = wrongRate * 0.2;
  const memoryScore = retention * (1 - penalty);

  return memoryScore;
}

const useDeckStore = create(
  persist(
    (set, get) => ({
      decks: [],

      addDeck: (name, id = nanoid()) => {
        const newDeck = {
          id,
          name,
          createdAt: new Date().toISOString(),
          lastStudiedAt: null,
          cards: [],
          reviewHistory: [],
        };
        set((state) => ({ decks: [...state.decks, newDeck] }));
      },

      addCardToDeck: (deckId, card) => {
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId
              ? { ...deck, cards: [...deck.cards, { id: nanoid(), ...card }] }
              : deck
          ),
        }));
      },

      updateDeck: (deckId, updatedDeck) => {
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId ? updatedDeck : deck
          ),
        }));
      },

      deleteDeck: (deckId) => {
        set((state) => ({
          decks: state.decks.filter((deck) => deck.id !== deckId),
        }));
      },

      getDeckById: (deckId) => {
        return get().decks.find((deck) => deck.id === deckId);
      },

      updateLastStudiedAt: (deckId) => {
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId
              ? { ...deck, lastStudiedAt: new Date().toISOString() }
              : deck
          ),
        }));
      },

      recordReviewResult: (deckId, wrongCount) => {
        const now = new Date().toISOString();
        set((state) => ({
          decks: state.decks.map((deck) => {
            if (deck.id === deckId) {
              const history = Array.isArray(deck.reviewHistory) ? deck.reviewHistory : [];
              return {
                ...deck,
                lastStudiedAt: now,
                reviewHistory: [
                  ...history,
                  {
                    date: now,
                    wrongCount,
                    total: deck.cards.length,
                  },
                ],
              };
            }
            return deck;
          }),
        }));
      },

      getDeckStats: (deckId) => {
        const deck = get().decks.find((d) => d.id === deckId);
        const reviewHistory = Array.isArray(deck?.reviewHistory) ? deck.reviewHistory : [];
        const reviewCount = reviewHistory.length;
        const lastWrong = reviewHistory[reviewCount - 1]?.wrongCount || 0;
        const forgettingRate = 1 - calculateMemoryScore({
          lastStudiedAt: deck?.lastStudiedAt,
          reviewCount,
          reviewHistory,
        });

        return { reviewCount, lastWrong, forgettingRate };
      },
    }),
    {
      name: "deck-storage",
    }
  )
);

export default useDeckStore;