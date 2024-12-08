import { useGameStore } from '../store/gameStore';
import { RotateCcw, Moon, Sun, Undo, Users, Monitor } from 'lucide-react';
import { useState } from 'react';
import BurgerMenu from './BurgerMenu';
import { motion, AnimatePresence } from 'framer-motion';

export default function UI() {
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const winner = useGameStore((state) => state.winner);
  const resetGame = useGameStore((state) => state.resetGame);
  const undoMove = useGameStore((state) => state.undoMove);
  const gameMode = useGameStore((state) => state.gameMode);
  const setGameMode = useGameStore((state) => state.setGameMode);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getPlayerColor = (player: number) => {
    return player === 1 ? 'text-red-500 dark:text-red-400' : 'text-blue-500 dark:text-blue-400';
  };

  return (
    <div className="fixed inset-x-0 top-0 p-4 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BurgerMenu />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">QW - All Fours</h1>
            </div>
            <div className="flex items-center gap-4">
              <AnimatePresence mode="wait">
                {winner ? (
                  <motion.span
                    key="winner"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`text-xl font-bold ${getPlayerColor(winner)}`}
                  >
                    {winner === 2 && gameMode === 'pvc' ? 'Computer' : `Player ${winner}`} wins! 🎉
                  </motion.span>
                ) : (
                  <motion.span
                    key="current-player"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`text-xl font-bold ${getPlayerColor(currentPlayer)}`}
                  >
                    {currentPlayer === 2 && gameMode === 'pvc' ? 'Computer\'s turn' : `Player ${currentPlayer}'s turn`}
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                onClick={() => setGameMode(gameMode === 'pvp' ? 'pvc' : 'pvp')}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title={gameMode === 'pvp' ? 'Switch to Player vs Computer' : 'Switch to Player vs Player'}
              >
                {gameMode === 'pvp' ? (
                  <Users className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                ) : (
                  <Monitor className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                )}
              </button>
              <button
                onClick={undoMove}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Undo last move"
              >
                <Undo className="w-6 h-6 text-slate-700 dark:text-slate-200" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                ) : (
                  <Moon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                )}
              </button>
              <button
                onClick={resetGame}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Reset game"
              >
                <RotateCcw className="w-6 h-6 text-slate-700 dark:text-slate-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}