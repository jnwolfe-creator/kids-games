import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  { q: "What is the capital of France?", a: "Paris", choices: ["London", "Paris", "Berlin", "Madrid"], emoji: "🗼", fact: "Paris is known as the City of Light!" },
  { q: "Which is the largest ocean?", a: "Pacific", choices: ["Atlantic", "Indian", "Arctic", "Pacific"], emoji: "🌊", fact: "The Pacific Ocean covers more than 30% of Earth's surface!" },
  { q: "What is the capital of Japan?", a: "Tokyo", choices: ["Osaka", "Kyoto", "Tokyo", "Seoul"], emoji: "🗾", fact: "Tokyo is the world's most populous metropolitan area!" },
  { q: "Which country has the most people?", a: "India", choices: ["USA", "China", "India", "Brazil"], emoji: "🌏", fact: "India surpassed China as the most populous country in 2023!" },
  { q: "What is the longest river in the world?", a: "Nile", choices: ["Amazon", "Nile", "Mississippi", "Yangtze"], emoji: "🏞️", fact: "The Nile stretches over 4,000 miles through northeastern Africa!" },
  { q: "Which country is the Eiffel Tower in?", a: "France", choices: ["Italy", "Spain", "France", "Belgium"], emoji: "🇫🇷", fact: "The Eiffel Tower was built in 1889 for the World's Fair!" },
  { q: "What is the capital of Australia?", a: "Canberra", choices: ["Sydney", "Melbourne", "Brisbane", "Canberra"], emoji: "🦘", fact: "Many people think Sydney is the capital, but it's actually Canberra!" },
  { q: "Which is the largest country by area?", a: "Russia", choices: ["Canada", "USA", "Russia", "China"], emoji: "🌍", fact: "Russia spans 11 time zones!" },
  { q: "What is the capital of Brazil?", a: "Brasília", choices: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], emoji: "🌴", fact: "Brasília was purpose-built as Brazil's capital in 1960!" },
  { q: "Which country is the Amazon rainforest mostly in?", a: "Brazil", choices: ["Peru", "Colombia", "Brazil", "Venezuela"], emoji: "🌿", fact: "About 60% of the Amazon rainforest is in Brazil!" },
  { q: "What is the capital of Canada?", a: "Ottawa", choices: ["Toronto", "Vancouver", "Montreal", "Ottawa"], emoji: "🍁", fact: "Ottawa was chosen as capital partly to settle a rivalry between Toronto and Montreal!" },
  { q: "Which mountain is the tallest in the world?", a: "Mount Everest", choices: ["K2", "Mount Everest", "Kilimanjaro", "Mont Blanc"], emoji: "🏔️", fact: "Mount Everest grows about 4mm taller every year!" },
  { q: "What is the smallest country in the world?", a: "Vatican City", choices: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], emoji: "⛪", fact: "Vatican City is smaller than many city parks!" },
  { q: "Which continent is Egypt in?", a: "Africa", choices: ["Asia", "Europe", "Africa", "Middle East"], emoji: "🐪", fact: "Egypt also has a small part in Asia — the Sinai Peninsula!" },
  { q: "What is the capital of China?", a: "Beijing", choices: ["Shanghai", "Beijing", "Hong Kong", "Guangzhou"], emoji: "🐉", fact: "Beijing has been China's capital for most of the last 700 years!" },
  { q: "Which country has the most natural lakes?", a: "Canada", choices: ["Russia", "USA", "Finland", "Canada"], emoji: "🏞️", fact: "Canada has about 60% of the world's natural lakes!" },
  { q: "What is the capital of South Africa?", a: "Pretoria", choices: ["Cape Town", "Johannesburg", "Pretoria", "Durban"], emoji: "🦁", fact: "South Africa actually has three capitals — Pretoria, Cape Town, and Bloemfontein!" },
  { q: "Which ocean is the smallest?", a: "Arctic", choices: ["Indian", "Southern", "Arctic", "Atlantic"], emoji: "🧊", fact: "The Arctic Ocean is about 14 times smaller than the Pacific!" },
  { q: "What is the capital of Italy?", a: "Rome", choices: ["Milan", "Venice", "Rome", "Naples"], emoji: "🍕", fact: "Rome is known as the Eternal City and is over 2,700 years old!" },
  { q: "Which country is the Sahara Desert in?", a: "Multiple countries", choices: ["Egypt only", "Multiple countries", "Libya only", "Algeria only"], emoji: "🏜️", fact: "The Sahara spans 11 countries — it's almost as big as the USA!" },
  { q: "What is the capital of Mexico?", a: "Mexico City", choices: ["Guadalajara", "Cancún", "Mexico City", "Monterrey"], emoji: "🌮", fact: "Mexico City is one of the largest cities in the world!" },
  { q: "Which country does the Great Barrier Reef belong to?", a: "Australia", choices: ["Indonesia", "Philippines", "Australia", "New Zealand"], emoji: "🐠", fact: "The Great Barrier Reef is the world's largest living structure!" },
  { q: "What is the capital of Egypt?", a: "Cairo", choices: ["Alexandria", "Cairo", "Luxor", "Giza"], emoji: "🐪", fact: "Cairo is Africa's largest city!" },
  { q: "Which river flows through London?", a: "Thames", choices: ["Seine", "Rhine", "Thames", "Severn"], emoji: "🎡", fact: "The Thames has over 200 bridges crossing it!" },
  { q: "What is the capital of India?", a: "New Delhi", choices: ["Mumbai", "New Delhi", "Kolkata", "Bangalore"], emoji: "🕌", fact: "New Delhi was purpose-built as India's capital in the early 20th century!" },

  // 25 new questions
  { q: "What is the capital of Argentina?", a: "Buenos Aires", choices: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"], emoji: "💃", fact: "Buenos Aires means 'fair winds' in Spanish!" },
  { q: "Which country has the longest coastline?", a: "Canada", choices: ["Russia", "Australia", "Canada", "Norway"], emoji: "🌊", fact: "Canada's coastline is so long it would circle the Earth over 6 times!" },
  { q: "What is the capital of Nigeria?", a: "Abuja", choices: ["Lagos", "Abuja", "Kano", "Ibadan"], emoji: "🦅", fact: "Abuja replaced Lagos as Nigeria's capital in 1991!" },
  { q: "Which country is home to the ancient city of Petra?", a: "Jordan", choices: ["Egypt", "Jordan", "Saudi Arabia", "Israel"], emoji: "🏛️", fact: "Petra was carved directly into rose-red sandstone cliffs over 2,000 years ago!" },
  { q: "What is the capital of South Korea?", a: "Seoul", choices: ["Busan", "Incheon", "Seoul", "Daegu"], emoji: "🇰🇷", fact: "Seoul is home to over half of South Korea's entire population!" },
  { q: "Which African country has the most pyramids?", a: "Sudan", choices: ["Egypt", "Sudan", "Ethiopia", "Libya"], emoji: "🔺", fact: "Sudan has more ancient pyramids than Egypt — over 200!" },
  { q: "What is the capital of Turkey?", a: "Ankara", choices: ["Istanbul", "Ankara", "Izmir", "Bursa"], emoji: "🕌", fact: "Many people think Istanbul is the capital, but it's actually Ankara!" },
  { q: "Which country is the island of Bali part of?", a: "Indonesia", choices: ["Malaysia", "Philippines", "Indonesia", "Thailand"], emoji: "🌺", fact: "Indonesia is the world's largest archipelago with over 17,000 islands!" },
  { q: "What is the tallest waterfall in the world?", a: "Angel Falls", choices: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"], emoji: "💧", fact: "Angel Falls in Venezuela is nearly 20 times taller than Niagara Falls!" },
  { q: "Which country does Greenland belong to?", a: "Denmark", choices: ["Canada", "Norway", "Denmark", "Iceland"], emoji: "🧊", fact: "Greenland is the world's largest island and has been part of Denmark since 1814!" },
  { q: "What is the capital of Spain?", a: "Madrid", choices: ["Barcelona", "Madrid", "Seville", "Valencia"], emoji: "🥘", fact: "Madrid is the highest-altitude capital city in the European Union!" },
  { q: "Which desert is the largest cold desert in the world?", a: "Antarctic Desert", choices: ["Gobi Desert", "Sahara", "Antarctic Desert", "Patagonian Desert"], emoji: "🧊", fact: "The Antarctic Desert is nearly twice the size of the Sahara!" },
  { q: "What is the capital of Kenya?", a: "Nairobi", choices: ["Mombasa", "Nairobi", "Kampala", "Dar es Salaam"], emoji: "🦒", fact: "Nairobi is one of the few cities in the world with a national park inside its limits!" },
  { q: "Which country is Mount Kilimanjaro in?", a: "Tanzania", choices: ["Kenya", "Tanzania", "Uganda", "Ethiopia"], emoji: "🏔️", fact: "Kilimanjaro is the highest free-standing mountain in the world!" },
  { q: "What is the capital of Portugal?", a: "Lisbon", choices: ["Porto", "Lisbon", "Faro", "Coimbra"], emoji: "🐟", fact: "Lisbon is one of the oldest cities in the world, predating Rome by centuries!" },
  { q: "Which country is famous for the Inca Empire ruins of Machu Picchu?", a: "Peru", choices: ["Bolivia", "Chile", "Peru", "Ecuador"], emoji: "🦙", fact: "Machu Picchu was built around 1450 and abandoned just 100 years later!" },
  { q: "What is the capital of Saudi Arabia?", a: "Riyadh", choices: ["Mecca", "Jeddah", "Riyadh", "Medina"], emoji: "🕌", fact: "Riyadh means 'gardens' in Arabic, though it sits in the middle of a desert!" },
  { q: "Which country is the world's largest producer of coffee?", a: "Brazil", choices: ["Colombia", "Ethiopia", "Brazil", "Vietnam"], emoji: "☕", fact: "Brazil has been the world's top coffee producer for over 150 years!" },
  { q: "What is the capital of Greece?", a: "Athens", choices: ["Thessaloniki", "Athens", "Sparta", "Crete"], emoji: "🏛️", fact: "Athens is one of the world's oldest cities with a recorded history of 3,400 years!" },
  { q: "Which country has the most UNESCO World Heritage Sites?", a: "Italy", choices: ["China", "Spain", "France", "Italy"], emoji: "🎨", fact: "Italy edges out China with the most UNESCO World Heritage Sites in the world!" },
  { q: "What is the capital of New Zealand?", a: "Wellington", choices: ["Auckland", "Wellington", "Christchurch", "Queenstown"], emoji: "🥝", fact: "Wellington is the world's southernmost capital city!" },
  { q: "Which country does the Galapagos Islands belong to?", a: "Ecuador", choices: ["Peru", "Colombia", "Ecuador", "Chile"], emoji: "🦎", fact: "Darwin's visit to the Galapagos inspired his theory of evolution!" },
  { q: "What is the capital of the Philippines?", a: "Manila", choices: ["Cebu", "Manila", "Davao", "Quezon City"], emoji: "🏝️", fact: "The Philippines is an archipelago of over 7,600 islands!" },
  { q: "Which country is the world's largest exporter of oil?", a: "Saudi Arabia", choices: ["Russia", "USA", "Saudi Arabia", "Iraq"], emoji: "🛢️", fact: "Saudi Arabia sits atop about 17% of the world's proven petroleum reserves!" },
  { q: "What is the capital of Ukraine?", a: "Kyiv", choices: ["Lviv", "Odesa", "Kyiv", "Kharkiv"], emoji: "🌻", fact: "Kyiv is one of the oldest cities in Eastern Europe, founded over 1,500 years ago!" },
];

const STORAGE_KEY = "geo-game-stats-v1";

const CORRECT_EMOJIS = ["🎉","🥳","🌟","🎊","💥","🦄","🏆","🚀","🎸","🍭"];
const WRONG_EMOJIS = ["😬","🤦","😅","🙈","🐢","💀","😵","🥴","🤡","🫠"];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const POINTS_PER_CORRECT = 10;
const BONUS_FAST = 5;
const FAST_THRESHOLD = 5; // seconds

export default function App() {
  const [screen, setScreen] = useState("home"); // home | game | results | stats
  const [playerName, setPlayerName] = useState("");
  const [allStats, setAllStats] = useState({});
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null); // { correct, emoji, fact }
  const [timer, setTimer] = useState(15);
  const [timeUp, setTimeUp] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [anim, setAnim] = useState(null); // "correct" | "wrong"
  const [particles, setParticles] = useState([]);
  const [roundLog, setRoundLog] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY, true);
        if (r) setAllStats(JSON.parse(r.value));
      } catch {}
    })();
  }, []);

  const saveStats = async (stats) => {
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(stats), true); } catch {}
  };

  const startGame = () => {
    const qs = shuffle(QUESTIONS).slice(0, 10).map(q => ({ ...q, choices: shuffle(q.choices) }));
    setQuestions(qs);
    setQIndex(0);
    setScore(0);
    setStreak(0);
    setSelected(null);
    setFeedback(null);
    setRoundLog([]);
    setTimer(15);
    setTimeUp(false);
    setAnim(null);
    setParticles([]);
    setScreen("game");
    setStartTime(Date.now());
  };

  // Timer
  useEffect(() => {
    if (screen !== "game" || feedback || selected) return;
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, qIndex, feedback, selected]);

  const handleTimeUp = () => {
    setTimeUp(true);
    setSelected("__timeout__");
    const emoji = WRONG_EMOJIS[Math.floor(Math.random() * WRONG_EMOJIS.length)];
    setFeedback({ correct: false, emoji, fact: questions[qIndex]?.fact });
    setStreak(0);
    setAnim("wrong");
    triggerParticles(false);
    setRoundLog(l => [...l, { q: questions[qIndex].q, correct: false, points: 0 }]);
  };

  const handleAnswer = (choice) => {
    if (selected) return;
    clearInterval(timerRef.current);
    const elapsed = (Date.now() - startTime) / 1000;
    const q = questions[qIndex];
    const correct = choice === q.a;
    setSelected(choice);

    let pts = 0;
    if (correct) {
      const fast = timer >= (15 - FAST_THRESHOLD);
      pts = POINTS_PER_CORRECT + (fast ? BONUS_FAST : 0) + (streak >= 2 ? 5 : 0);
      setScore(s => s + pts);
      setStreak(s => s + 1);
      setAnim("correct");
      triggerParticles(true);
    } else {
      setStreak(0);
      setAnim("wrong");
      triggerParticles(false);
    }

    const emoji = correct
      ? CORRECT_EMOJIS[Math.floor(Math.random() * CORRECT_EMOJIS.length)]
      : WRONG_EMOJIS[Math.floor(Math.random() * WRONG_EMOJIS.length)];
    setFeedback({ correct, emoji, fact: q.fact, pts });
    setRoundLog(l => [...l, { q: q.q, correct, points: pts }]);
  };

  const triggerParticles = (correct) => {
    const p = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.4,
      emoji: correct
        ? ["⭐","✨","🎊","💫","🌟"][Math.floor(Math.random()*5)]
        : ["💀","😵","💥","🤦","🙈"][Math.floor(Math.random()*5)]
    }));
    setParticles(p);
    setTimeout(() => setParticles([]), 1500);
  };

  const nextQuestion = () => {
    clearInterval(timerRef.current);
    if (qIndex + 1 >= questions.length) {
      endGame();
    } else {
      setQIndex(i => i + 1);
      setSelected(null);
      setFeedback(null);
      setTimeUp(false);
      setTimer(15);
      setStartTime(Date.now());
      setAnim(null);
    }
  };

  const endGame = () => {
    const correct = roundLog.filter(r => r.correct).length + (feedback?.correct ? 1 : 0);
    const finalScore = score;
    const updated = { ...allStats };
    if (!updated[playerName]) updated[playerName] = { games: 0, totalScore: 0, totalCorrect: 0, totalQuestions: 0, best: 0 };
    updated[playerName].games += 1;
    updated[playerName].totalScore += finalScore;
    updated[playerName].totalCorrect += correct;
    updated[playerName].totalQuestions += questions.length;
    updated[playerName].best = Math.max(updated[playerName].best, finalScore);
    setAllStats(updated);
    saveStats(updated);
    setScreen("results");
  };

  const getRank = (score) => {
    if (score >= 130) return { title: "Geography Genius 🧠", color: "#f0c040" };
    if (score >= 100) return { title: "World Explorer 🌍", color: "#4caf50" };
    if (score >= 70) return { title: "Map Master 🗺️", color: "#2196f3" };
    if (score >= 40) return { title: "Globe Trotter 🌐", color: "#ff9800" };
    return { title: "Brave Beginner 🐣", color: "#e91e63" };
  };

  const q = questions[qIndex];
  const rank = getRank(score);
  const pct = q ? (timer / 15) * 100 : 100;
  const timerColor = timer > 8 ? "#4caf50" : timer > 4 ? "#ff9800" : "#f44336";

  // ── HOME ──
  if (screen === "home") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", padding: 20 }}>
      <div style={{ textAlign: "center", color: "#fff", maxWidth: 440, width: "100%" }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🌍</div>
        <h1 style={{ fontSize: 32, margin: "0 0 4px", fontWeight: 700, background: "linear-gradient(90deg, #f0c040, #ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          World Explorer
        </h1>
        <p style={{ color: "#aaa", margin: "0 0 32px", fontSize: 15 }}>The Geography Challenge</p>

        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ color: "#ddd", marginBottom: 16, fontSize: 14 }}>Who's playing? Enter your name to track your score!</p>
          <input value={playerName} onChange={e => setPlayerName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && playerName.trim() && startGame()}
            placeholder="Your name..." maxLength={20}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "none", fontSize: 16, textAlign: "center", background: "rgba(255,255,255,0.15)", color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "Georgia, serif" }} />
          <button onClick={startGame} disabled={!playerName.trim()}
            style={{ marginTop: 16, width: "100%", padding: "14px", borderRadius: 10, border: "none", fontSize: 17, fontWeight: 700, cursor: playerName.trim() ? "pointer" : "not-allowed", background: playerName.trim() ? "linear-gradient(90deg, #f0c040, #ff6b6b)" : "#555", color: "#1a1a2e", fontFamily: "Georgia, serif", transition: "transform 0.1s" }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
            🚀 Start Game!
          </button>
          <div style={{ marginTop: 12, display: "flex", gap: 12, justifyContent: "center", fontSize: 12, color: "#aaa" }}>
            <span>⏱ 15s per question</span>
            <span>⭐ 10pts per correct</span>
            <span>⚡ Bonus for speed & streaks</span>
          </div>
        </div>

        <button onClick={() => setScreen("stats")}
          style={{ marginTop: 20, background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#aaa", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif" }}>
          📊 View Leaderboard
        </button>
      </div>
    </div>
  );

  // ── GAME ──
  if (screen === "game" && q) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", fontFamily: "Georgia, serif", padding: "20px 16px", position: "relative", overflow: "hidden" }}>

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} style={{ position: "fixed", left: `${p.x}%`, top: "40%", fontSize: 28, animationDelay: `${p.delay}s`, animation: "floatUp 1.2s ease-out forwards", pointerEvents: "none", zIndex: 100 }}>
          {p.emoji}
        </div>
      ))}

      <style>{`
        @keyframes floatUp { 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-180px) scale(1.5)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-10px)} 40%,80%{transform:translateX(10px)} }
        @keyframes bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      `}</style>

      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, color: "#fff" }}>
          <div>
            <div style={{ fontSize: 12, color: "#aaa" }}>Player</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{playerName}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#aaa" }}>Question</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{qIndex + 1} / {questions.length}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#aaa" }}>Score</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#f0c040" }}>{score}</div>
          </div>
        </div>

        {/* Streak */}
        {streak >= 2 && (
          <div style={{ textAlign: "center", color: "#ff6b6b", fontSize: 13, marginBottom: 8, animation: "pulse 1s infinite" }}>
            🔥 {streak} in a row! +5 streak bonus active!
          </div>
        )}

        {/* Timer bar */}
        <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: timerColor, borderRadius: 4, transition: "width 1s linear, background 0.3s" }} />
        </div>

        {/* Question card */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.12)", marginBottom: 20, textAlign: "center", animation: anim === "correct" ? "bounce 0.5s" : anim === "wrong" ? "shake 0.5s" : "none" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{q.emoji}</div>
          <div style={{ color: "#ddd", fontSize: 13, marginBottom: 8 }}>
            ⏱ {timer}s remaining
          </div>
          <h2 style={{ color: "#fff", fontSize: 20, margin: 0, lineHeight: 1.4 }}>{q.q}</h2>
        </div>

        {/* Choices */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {q.choices.map((c, i) => {
            const isSelected = selected === c;
            const isCorrect = c === q.a;
            const showResult = !!selected;
            let bg = "rgba(255,255,255,0.08)";
            let border = "1px solid rgba(255,255,255,0.12)";
            let color = "#fff";
            if (showResult && isCorrect) { bg = "rgba(76,175,80,0.3)"; border = "1px solid #4caf50"; }
            else if (showResult && isSelected && !isCorrect) { bg = "rgba(244,67,54,0.3)"; border = "1px solid #f44336"; }
            return (
              <button key={i} onClick={() => handleAnswer(c)} disabled={!!selected}
                style={{ padding: "16px 12px", borderRadius: 12, border, background: bg, color, fontSize: 14, cursor: selected ? "default" : "pointer", fontFamily: "Georgia, serif", transition: "all 0.2s", textAlign: "center", lineHeight: 1.3 }}
                onMouseEnter={e => { if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
                <span style={{ fontSize: 18, marginRight: 6 }}>{"ABCD"[i]}</span> {c}
                {showResult && isCorrect && " ✅"}
                {showResult && isSelected && !isCorrect && " ❌"}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div style={{ background: feedback.correct ? "rgba(76,175,80,0.2)" : "rgba(244,67,54,0.2)", border: `1px solid ${feedback.correct ? "#4caf50" : "#f44336"}`, borderRadius: 12, padding: "16px 20px", textAlign: "center", color: "#fff", marginBottom: 16 }}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>{feedback.emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              {timeUp ? "⏰ Time's up!" : feedback.correct ? `Correct! +${feedback.pts} pts` : "Not quite!"}
            </div>
            {!feedback.correct && <div style={{ fontSize: 14, color: "#ddd", marginBottom: 6 }}>The answer was: <strong style={{ color: "#f0c040" }}>{q.a}</strong></div>}
            <div style={{ fontSize: 13, color: "#bbb", fontStyle: "italic" }}>💡 {feedback.fact}</div>
            <button onClick={nextQuestion}
              style={{ marginTop: 14, padding: "10px 28px", borderRadius: 8, border: "none", background: "#f0c040", color: "#1a1a2e", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "Georgia, serif" }}>
              {qIndex + 1 >= questions.length ? "See Results 🏆" : "Next Question →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── RESULTS ──
  if (screen === "results") {
    const correct = roundLog.filter(r => r.correct).length;
    const finalRank = getRank(score);
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", fontFamily: "Georgia, serif", padding: "32px 16px", color: "#fff" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 64, animation: "spin 2s linear" }}>🏆</div>
          <h1 style={{ fontSize: 28, margin: "12px 0 4px" }}>Game Over, {playerName.split(" ")[0]}!</h1>
          <div style={{ fontSize: 20, color: finalRank.color, marginBottom: 24, fontWeight: 700 }}>{finalRank.title}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Final Score", value: score, emoji: "⭐" },
              { label: "Correct", value: `${correct}/${questions.length}`, emoji: "✅" },
              { label: "Accuracy", value: `${Math.round((correct / questions.length) * 100)}%`, emoji: "🎯" }
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 24 }}>{s.emoji}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#f0c040" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Question recap */}
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "16px", marginBottom: 20, textAlign: "left" }}>
            <div style={{ fontSize: 13, color: "#aaa", marginBottom: 10, textAlign: "center" }}>Question Recap</div>
            {roundLog.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < roundLog.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <span style={{ fontSize: 16 }}>{r.correct ? "✅" : "❌"}</span>
                <span style={{ fontSize: 12, color: "#ccc", flex: 1 }}>{r.q}</span>
                <span style={{ fontSize: 12, color: "#f0c040", fontWeight: 700 }}>{r.correct ? `+${r.points}` : "0"}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={startGame}
              style={{ padding: "12px 28px", borderRadius: 10, border: "none", background: "linear-gradient(90deg, #f0c040, #ff6b6b)", color: "#1a1a2e", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "Georgia, serif" }}>
              🔄 Play Again
            </button>
            <button onClick={() => setScreen("stats")}
              style={{ padding: "12px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "none", color: "#fff", fontSize: 16, cursor: "pointer", fontFamily: "Georgia, serif" }}>
              📊 Leaderboard
            </button>
            <button onClick={() => { setScreen("home"); setPlayerName(""); }}
              style={{ padding: "12px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "none", color: "#fff", fontSize: 16, cursor: "pointer", fontFamily: "Georgia, serif" }}>
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STATS / LEADERBOARD ──
  if (screen === "stats") {
    const players = Object.entries(allStats).sort((a, b) => b[1].best - a[1].best);
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", fontFamily: "Georgia, serif", padding: "32px 16px", color: "#fff" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 14, marginBottom: 16, textDecoration: "underline", fontFamily: "Georgia, serif" }}>← Back to Home</button>
          <h1 style={{ textAlign: "center", fontSize: 26, margin: "0 0 4px" }}>🏆 Leaderboard</h1>
          <p style={{ textAlign: "center", color: "#aaa", fontSize: 13, marginBottom: 24 }}>All-time best scores</p>

          {players.length === 0 ? (
            <div style={{ textAlign: "center", color: "#555", padding: 40, fontSize: 16 }}>No games played yet — be the first! 🌍</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {players.map(([name, s], i) => {
                const medals = ["🥇", "🥈", "🥉"];
                const acc = s.totalQuestions > 0 ? Math.round((s.totalCorrect / s.totalQuestions) * 100) : 0;
                return (
                  <div key={name} style={{ background: i === 0 ? "rgba(240,192,64,0.12)" : "rgba(255,255,255,0.06)", border: `1px solid ${i === 0 ? "#f0c040" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: 28, width: 36, textAlign: "center" }}>{medals[i] || `${i + 1}`}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
                      <div style={{ fontSize: 12, color: "#aaa" }}>{s.games} game{s.games !== 1 ? "s" : ""} · {acc}% accuracy</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "#f0c040" }}>{s.best}</div>
                      <div style={{ fontSize: 11, color: "#aaa" }}>best score</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
