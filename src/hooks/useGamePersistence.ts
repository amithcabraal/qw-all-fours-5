import { useEffect } from 'react';
import { GameState } from '../types/game';

const STORAGE_KEY = 'qw-all-fours-game-state';

export function useGamePersistence(
  gameState: Pick<GameState, 'grid' | 'currentPlayer' | 'winner' | 'gameMode' | 'moveHistory'>,
  loadGame: (savedState: Partial<GameState>) => void
) {
  // Save game state
  useEffect(() => {
    if (gameState.winner === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [gameState]);

  // Load saved game on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        loadGame(parsedState);
      } catch (error) {
        console.error('Error loading saved game:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [loadGame]);
}