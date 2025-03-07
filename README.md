# Multiplayer Shiritori Game

A two-player word game where each new word must start with the last letter of the previous word. Players take turns, and words are validated for correctness. If a player enters an invalid word, they lose a point.

## 🚀 Live Demo

[Play the Game](https://beamish-heliotrope-9e2a79.netlify.app)

## 📌 Features

- **Turn-based Gameplay**: Players alternate turns automatically.
- **Word Validation**: Checks word validity using [DictionaryAPI](https://dictionaryapi.dev/).
- **Word Structure Validation**:
  - Must start with the last letter of the previous word.
  - Must be a minimum of 4 letters.
  - No repeated words.
- **Countdown Timer**: Limits the time for each turn.
- **Score Tracking**: Points deducted for invalid words.
- **Word History Display**: Shows previously entered words.
- **Deployed Online**: Hosted on Netlify/Vercel.

## 🛠️ Installation & Setup

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/your-username/multiplayer-shiritori.git
   cd multiplayer-shiritori
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Run the Development Server**:
   ```sh
   npm run dev
   ```

4. **Build for Production**:
   ```sh
   npm run build
   ```

5. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify.
   - Deploy using the platform's instructions.

## 🎮 How to Play

1. Player 1 enters the first word.
2. Player 2 must enter a word that starts with the last letter of Player 1's word.
3. Words must be valid English words (validated using DictionaryAPI).
4. Words cannot be repeated.
5. A countdown timer ensures players enter words within a time limit.
6. If a player enters an invalid word or runs out of time, they lose a point.
7. The game continues until a predefined score limit or time.

## 🏗️ Technologies Used

- **Frontend**: React, Tailwind CSS
- **API**: DictionaryAPI for word validation
- **Deployment**: Netlify


---

Enjoy playing the Multiplayer Shiritori Game! 🎮🚀