import React, { useEffect, useState } from "react";

const InputFieldBox = () => {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [player1word, setPlayer1word] = useState("");
  const [player2word, setPlayer2word] = useState("");
  const [lastWord, setLastWord] = useState("");
  const [wordHistory, setWordHistory] = useState([]);
  const [scores, setScores] = useState({ 1: 20, 2: 20 });
  const [timer, setTimer] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!gameOver) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            handleTimeout();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [playerTurn, gameOver]);

  const handleTimeout = () => {
    setScores((prev) => ({ ...prev, [playerTurn]: prev[playerTurn] - 1 }));
    switchTurn();
  };

  const validateWord = async (word) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return response;
    } catch {
      return false;
    }
  };

  const isValidWord = (word) => {
    if (word.length < 4) {
      setError("word less then 4 latter!");
      return false;
    }
    if (wordHistory.includes(word)) {
      setError("Word already use!");
      return false;
    }
    if (
      lastWord &&
      word[0].toLowerCase() !== lastWord.slice(-1).toLocaleLowerCase()
    ) {
      setError("Last character does not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const word = playerTurn === 1 ? player1word : player2word;

    if (!isValidWord(word)) {
      setScores((prev) => ({ ...prev, [playerTurn]: prev[playerTurn] - 1 }));
      clearInput();
      return;
    }
    const valid = await validateWord(word);
    if (valid) {
      setScores((prev) => ({ ...prev, [playerTurn]: prev[playerTurn] + 1 }));

      setWordHistory([...wordHistory, word]);
      setLastWord(word);
      switchTurn();
    } else {
      setScores((prev) => ({ ...prev, [playerTurn]: prev[playerTurn] - 1 }));
    }
    setError("");
    clearInput();
  };

  const switchTurn = () => {
    setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
    setTimer(10);
  };

  const clearInput = () => {
    setPlayer1word("");
    setPlayer2word("");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
        <h1 className="text-3xl font-bold mb-4">Shiritori Game {playerTurn}</h1>
        <p className="text-red-400 pb-5">{error}</p>
        {gameOver ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Game Over!</h2>
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg"
              onClick={() => window.location.reload()}
            >
              Restart Game
            </button>
          </div>
        ) : (
          <div className="w-full flex gap-10">
            {/* player 1 */}
            <div className="w-full max-w-md bg-gray-800 p-5 rounded-lg shadow-lg">
              <p className="flex items-center justify-between text-lg mb-2">
                <span className="font-semibold">Player 1</span>
                <p className="font-semibold text-lg mb-2 bg-orange-200 text-black px-3 py-2 rounded-full">
                  {timer}s
                </p>
              </p>
              <p className="text-lg mb-2">Last Word: {lastWord || "N/A"}</p>

              <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                {/* player 1 input  */}
                <input
                  type="text"
                  className={`w-2/4 p-2
                  text-white rounded-lg border-2 transition ${
                    playerTurn === 1 ? "border-green-500" : "border-gray-600"
                  }`}
                  value={player1word}
                  onChange={(e) => setPlayer1word(e.target.value)}
                  disabled={playerTurn !== 1}
                  placeholder="player 1"
                  autoFocus={playerTurn === 1}
                />
                <button
                  type="submit"
                  className={`bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer`}
                  onClick={handleSubmit}
                >
                  Submit Word
                </button>
              </form>

              {/* show history  */}
              <div className="mb-4">
                <h2 className="bg-gray-700 p-2 rounded-md mb-2">
                  Word history:
                </h2>
                <div className="bg-gray-700 p-2 rounded-lg">
                  {wordHistory.map((w, i) => (
                    <p key={i} className="text-sm">
                      {w}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* player 2  */}
            <div className="w-full max-w-md bg-gray-800 p-5 rounded-lg shadow-lg">
              <p className="flex items-center justify-between text-lg mb-2">
                <span className="font-semibold">Player 2</span>
                <p className="font-semibold text-lg mb-2 bg-orange-200 text-black px-3 py-2 rounded-full">
                  {timer}s
                </p>
              </p>
              <p className="text-lg mb-2">Last Word: {lastWord || "N/A"}</p>

              <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                {/* player 2 input  */}
                <input
                  type="text"
                  className={`w-1/2 p-2
                  text-white rounded-lg border-2 transition ${
                    playerTurn === 2 ? "border-green-500" : "border-gray-600"
                  }`}
                  value={player2word}
                  onChange={(e) => setPlayer2word(e.target.value)}
                  disabled={playerTurn !== 2}
                  placeholder="player 2"
                  autoFocus={playerTurn === 2}
                />
                <button
                  type="submit"
                  className={`bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer`}
                  onClick={handleSubmit}
                >
                  Submit Word
                </button>
              </form>

              {/* show history  */}
              <div className="mb-4">
                <h2 className="bg-gray-700 p-2 rounded-md mb-2">
                  Word history:
                </h2>
                <div className="bg-gray-700 p-2 rounded-lg">
                  {wordHistory.map((w, i) => (
                    <p key={i} className="text-sm">
                      {w}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputFieldBox;
