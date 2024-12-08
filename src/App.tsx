import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import GameBoard from './components/GameBoard';
import UI from './components/UI';
import Lighting from './components/scene/Lighting';
import Environment from './components/scene/Environment';
import { useDarkMode } from './hooks/useDarkMode';
import SplashScreen from './components/SplashScreen';
import { useGameStore } from './store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useBeforeUnload } from './hooks/useBeforeUnload';
import { useGamePersistence } from './hooks/useGamePersistence';

function App() {
  const bgColor = useDarkMode();
  const winner = useGameStore((state) => state.winner);
  const gameMode = useGameStore((state) => state.gameMode);
  const resetGame = useGameStore((state) => state.resetGame);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const grid = useGameStore((state) => state.grid);
  const moveHistory = useGameStore((state) => state.moveHistory);
  const loadGame = useGameStore((state) => state.loadGame);

  // Warn before closing if game is in progress
  useBeforeUnload(moveHistory.length > 0 && !winner);

  // Handle game persistence
  useGamePersistence(
    { grid, currentPlayer, winner, gameMode, moveHistory },
    loadGame
  );

  return (
    <div className="w-full h-screen bg-slate-100 dark:bg-slate-900 relative">
      <SplashScreen />
      <UI />
      <Canvas
        camera={{ position: [10, 10, 10], fov: 45 }}
        className="w-full h-full"
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Environment bgColor={bgColor} />
        <Lighting />
        <GameBoard />
        <OrbitControls
          minDistance={7}
          maxDistance={20}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          autoRotate={winner !== null}
          autoRotateSpeed={2}
        />
        <Preload all />
      </Canvas>
      
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center z-50 min-w-[320px]"
          >
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
              {winner === 2 && gameMode === 'pvc' ? 'Computer' : `Player ${winner}`} Wins! 🎉
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Congratulations! The board will rotate to show off your winning move.
            </p>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors w-full"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;