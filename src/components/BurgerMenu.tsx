import { useState } from 'react';
import { Menu, X, Share2, Info, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'help' | 'about' | null>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QW - All Fours',
          text: 'Check out this awesome 3D Connect Four game!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleModalClick = (modalType: 'help' | 'about') => {
    setActiveModal(modalType);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-700 dark:text-slate-200" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="fixed left-0 top-[72px] h-[calc(100vh-72px)] w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg z-[70] px-6 py-6"
            >
              <div className="space-y-4">
                <button
                  onClick={() => handleModalClick('help')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>How to Play</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => handleModalClick('about')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
                >
                  <Info className="w-5 h-5" />
                  <span>About</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[80]"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-md w-full m-auto"
              onClick={e => e.stopPropagation()}
            >
              {activeModal === 'about' ? (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">About QW - All Fours</h2>
                  <div className="prose dark:prose-invert">
                    <p className="text-slate-600 dark:text-slate-300">
                      QW - All Fours is a modern take on the classic Connect Four game, bringing it into the third dimension. 
                      Built with React Three Fiber and modern web technologies, it offers an immersive gaming experience 
                      that challenges spatial thinking and strategy.
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mt-4">
                      Features:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300">
                      <li>3D gameplay environment</li>
                      <li>Player vs Player mode</li>
                      <li>Player vs Computer mode</li>
                      <li>Dark/Light theme support</li>
                      <li>Touch and mouse controls</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">How to Play</h2>
                  <div className="prose dark:prose-invert">
                    <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                      <li>Click on any vertical pole to drop your token</li>
                      <li>Tokens will stack from bottom to top</li>
                      <li>Connect 4 tokens in any direction to win:</li>
                      <ul className="list-disc list-inside ml-4">
                        <li>Horizontally</li>
                        <li>Vertically</li>
                        <li>Diagonally</li>
                        <li>Through the depth of the board</li>
                      </ul>
                      <li>Use the undo button to take back your last move</li>
                      <li>Switch between playing against another player or the computer</li>
                      <li>Drag to rotate the board and see all angles</li>
                    </ul>
                  </div>
                </>
              )}
              <button
                onClick={() => setActiveModal(null)}
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}