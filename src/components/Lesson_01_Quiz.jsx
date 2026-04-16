"use client";
import { useState, useCallback } from "react";

const GOLD = "#D4A843";
const GOLD_DIM = "#D4A84340";
const BLACK = "#0D0D0D";
const CHARCOAL = "#1A1A1A";
const GREEN = "#2ECC71";
const RED = "#E74C3C";

const QUESTIONS = [
  {
    q: "According to the lesson, emotions are:",
    options: [
      "Good when you're winning and bad when you're losing",
      "Neither good nor bad — what matters is your response to them",
      "Always bad for trading and should be suppressed completely",
      "Only relevant when trading options, not stocks",
    ],
    correct: 1,
    explain: "Emotions are neutral responses to events. They become 'good' or 'bad' based on how you react — your physiological and behavioral responses. The goal isn't to eliminate emotions but to manage your reactions.",
  },
  {
    q: "What are the three steps of the PBS methodology, in order?",
    options: [
      "Plan, Buy, Sell",
      "Prepare, Backtest, Strategize",
      "Pause, Breathe, Smile",
      "Position, Balance, Scale",
    ],
    correct: 2,
    explain: "PBS = Pause (Pomodoro Technique), Breathe (Box Breathing), Smile (Inner Smile Meditation). Each step targets a different layer of emotional response — from creating space to calming the body to shifting your mindset.",
  },
  {
    q: "In the Pomodoro Technique, what should you do during your 5-minute break?",
    options: [
      "Check other trading charts on a different timeframe",
      "Review your trade journal entries",
      "Something completely different from your current task — step away from your screen",
      "Practice box breathing the entire time",
    ],
    correct: 2,
    explain: "The key is doing something COMPLETELY different. Switching from trading options to trading futures doesn't give your brain a real break. Get water, stretch, look outside — physically step away from your desk.",
  },
  {
    q: "What is the correct pattern for box breathing?",
    options: [
      "Inhale 4 sec → Exhale 4 sec → repeat",
      "Inhale 4 sec → Hold 4 sec → Exhale 4 sec → Hold 4 sec",
      "Inhale 8 sec → Exhale 8 sec → repeat",
      "Inhale 2 sec → Hold 6 sec → Exhale 2 sec → Hold 6 sec",
    ],
    correct: 1,
    explain: "Box breathing follows a 4-4-4-4 pattern: Inhale (4s) → Hold (4s) → Exhale (4s) → Hold (4s). It's called 'box' or 'square' breathing because all four phases are equal. Practice for 2–5 minutes only — it forces a non-natural breathing pattern.",
  },
  {
    q: "Why is 'contentment' better than 'intense joy' for trading?",
    options: [
      "Contentment makes you trade less frequently",
      "Intense joy leads to overreaction and exceeding risk limits; contentment leads to assertive, measured decisions",
      "Contentment means you don't care about losses",
      "There's no difference — both are forms of happiness",
    ],
    correct: 1,
    explain: "Intense joy (euphoria) leads to going all-in, exceeding risk limits, and impulsive decisions. Contentment — calm, quiet confidence — leads to sticking to your plan and clear-headed execution. The Inner Smile cultivates contentment, not euphoria.",
  },
  {
    q: "A trader with a $10,000 account risking 1% per trade is risking how much per trade?",
    options: ["$10", "$100", "$500", "$1,000"],
    correct: 1,
    explain: "$10,000 × 1% = $100 per trade. At this level, PBS tools can effectively manage your emotions. This is the recommended risk level for beginners — small enough that losses don't overwhelm your emotional capacity.",
  },
  {
    q: "A trader wins 40% of trades with a 2:1 risk-to-reward ratio over 10 trades. What's the net result?",
    options: [
      "Down $400",
      "Break even",
      "Up $200",
      "Up $600",
    ],
    correct: 2,
    explain: "6 losses × $100 = –$600. 4 wins × $200 (2:1 R:R) = +$800. Net = +$200. You don't need to win most of your trades — you need proper risk-to-reward and disciplined position sizing.",
  },
  {
    q: "In the $LMT trade example, why was Juan able to stay calm when down 90%?",
    options: [
      "He knew the trade would reverse because of technical analysis",
      "He had insider information about Trump's next announcement",
      "His position size was small (~2% risk), keeping the loss within his emotional tolerance",
      "He had already made enough profit that month to cover the loss",
    ],
    correct: 2,
    explain: "Juan risked ~2% of his account (~$150). Even at 90% drawdown, the dollar amount was small enough that PBS tools still worked. He could apply Pomodoro, box breathing, and the Inner Smile because the financial pain wasn't overwhelming. PBS only works when paired with proper risk management.",
  },
  {
    q: "When does 'losing' cross the line into 'failing'?",
    options: [
      "After your third consecutive loss",
      "When your account drops below 50% of its starting value",
      "When you repeat the same mistake after already identifying what went wrong",
      "When you lose more than $500 in a single day",
    ],
    correct: 2,
    explain: "There is no failing if there is learning. Lose once = lesson. Lose the same way twice = deeper lesson. Lose the same way a third time after already knowing better = failing. The key is whether you're applying lessons from previous losses.",
  },
  {
    q: "What is the primary purpose of the PBS methodology?",
    options: [
      "To tell you exactly when to enter and exit trades",
      "To eliminate all emotions so you trade like a robot",
      "To put you in an assertive state of mind so you can make clear-headed decisions",
      "To guarantee profitability on every trade",
    ],
    correct: 2,
    explain: "PBS does NOT tell you what to do — it prepares you to make good decisions by removing fear, anger, and anxiety. The actual trading decisions come from technical analysis in later lessons. PBS creates the mental foundation for everything else.",
  },
];

const PASS_PCT = 70;

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  const total = QUESTIONS.length;
  const question = QUESTIONS[currentQ];
  const isCorrect = selected === question?.correct;
  const score = results.filter(Boolean).length;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= PASS_PCT;

  const handleSelect = (idx) => {
    if (locked) return;
    setSelected(idx);
    setLocked(true);
    setResults((prev) => [...prev, idx === question.correct]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentQ((i) => i + 1);
      setSelected(null);
      setLocked(false);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setLocked(false);
    setResults([]);
    setFinished(false);
  };

  // ── Final Score Screen ──
  if (finished) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div>
          <div style={styles.headerTitle}>Lesson #1 Quiz</div>
          <div style={styles.headerSub}>Trading is 90% Emotions!</div>
        </div>

        <div style={{
          ...styles.scoreCard,
          background: passed ? "#071a0d" : "#1a0a0a",
          border: `2px solid ${passed ? GREEN + "70" : RED + "70"}`,
        }}>
          {/* Score ring */}
          <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 16px" }}>
            <svg viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8" />
              <circle cx="70" cy="70" r="60" fill="none"
                stroke={passed ? GREEN : RED} strokeWidth="8"
                strokeDasharray={`${(pct / 100) * 377} 377`}
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 1s ease-out" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: passed ? GREEN : RED }}>{pct}%</div>
            </div>
          </div>

          <div style={{ color: "#ccc", fontSize: 15, textAlign: "center" }}>
            {score} of {total} correct
          </div>

          <div style={{
            marginTop: 14, padding: "8px 24px", borderRadius: 20,
            background: passed ? GREEN + "18" : RED + "18",
            color: passed ? GREEN : RED, fontSize: 14, fontWeight: 700,
            textAlign: "center",
          }}>
            {passed ? "✓ PASSED" : "✗ NOT YET — Review & Try Again"}
          </div>

          {/* Per-question breakdown */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20, flexWrap: "wrap" }}>
            {results.map((correct, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 11, fontWeight: 700,
                background: correct ? GREEN + "20" : RED + "20",
                color: correct ? GREEN : RED,
                border: `1px solid ${correct ? GREEN + "50" : RED + "50"}`,
              }}>
                {i + 1}
              </div>
            ))}
          </div>

          <button onClick={handleRetry} style={{
            ...styles.nextBtn,
            marginTop: 24,
            background: passed ? `linear-gradient(135deg, ${GREEN}, #27ae60)` : `linear-gradient(135deg, ${GOLD}, #c49b30)`,
            color: passed ? "#fff" : BLACK,
          }}>
            {passed ? "↺ Retake Quiz" : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  // ── Question Screen ──
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div>
        <div style={styles.headerTitle}>Lesson #1 Quiz</div>
        <div style={styles.headerSub}>Trading is 90% Emotions!</div>
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: 520, margin: "0 auto 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "#666", fontSize: 12 }}>Question {currentQ + 1} of {total}</span>
          <span style={{ color: "#666", fontSize: 12 }}>{results.filter(Boolean).length} correct so far</span>
        </div>
        <div style={{ height: 5, background: "#222", borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 3, transition: "width 0.4s ease",
            width: `${((currentQ + (locked ? 1 : 0)) / total) * 100}%`,
            background: `linear-gradient(90deg, ${GOLD}, #e8c85a)`,
          }} />
        </div>
      </div>

      {/* Question dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 5, margin: "12px auto 20px", maxWidth: 520 }}>
        {QUESTIONS.map((_, i) => {
          let bg = "#333";
          if (i < results.length) bg = results[i] ? GREEN : RED;
          else if (i === currentQ) bg = GOLD;
          return (
            <div key={i} style={{
              width: i === currentQ ? 20 : 8, height: 8, borderRadius: 4,
              background: bg, transition: "all 0.3s",
            }} />
          );
        })}
      </div>

      {/* Question card */}
      <div style={{
        maxWidth: 520, margin: "0 auto",
        background: CHARCOAL, borderRadius: 16, border: `1px solid #2a2a2a`,
        overflow: "hidden",
      }}>
        {/* Question text */}
        <div style={{ padding: "24px 24px 18px" }}>
          <div style={{
            display: "inline-block", padding: "3px 10px", borderRadius: 4,
            background: GOLD + "15", color: GOLD, fontSize: 11, fontWeight: 700,
            letterSpacing: 1, marginBottom: 12,
          }}>
            QUESTION {currentQ + 1}
          </div>
          <div style={{ color: "#f0f0f0", fontSize: 16, lineHeight: 1.55, fontWeight: 500 }}>
            {question.q}
          </div>
        </div>

        {/* Options */}
        <div style={{ padding: "0 20px 20px" }}>
          {question.options.map((opt, oIdx) => {
            const isThis = selected === oIdx;
            const isAnswer = question.correct === oIdx;

            let bg = "#1e1e1e";
            let border = "#333";
            let textCol = "#c0c0c0";
            let circleBg = "transparent";
            let circleBorder = "#444";
            let circleText = "#888";

            if (locked) {
              if (isAnswer) {
                bg = GREEN + "12";
                border = GREEN;
                textCol = "#e0e0e0";
                circleBg = GREEN;
                circleBorder = GREEN;
                circleText = "#fff";
              } else if (isThis && !isAnswer) {
                bg = RED + "12";
                border = RED;
                textCol = "#aaa";
                circleBg = RED;
                circleBorder = RED;
                circleText = "#fff";
              } else {
                bg = "#151515";
                border = "#252525";
                textCol = "#555";
                circleBorder = "#333";
                circleText = "#444";
              }
            }

            return (
              <div
                key={oIdx}
                onClick={() => handleSelect(oIdx)}
                style={{
                  padding: "14px 16px", margin: "8px 0", borderRadius: 12,
                  background: bg, border: `1.5px solid ${border}`,
                  cursor: locked ? "default" : "pointer",
                  transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12,
                }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${circleBorder}`, background: circleBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: circleText,
                  transition: "all 0.2s",
                }}>
                  {locked && isAnswer ? "✓" : locked && isThis && !isAnswer ? "✗" : String.fromCharCode(65 + oIdx)}
                </div>
                <span style={{ color: textCol, fontSize: 14, lineHeight: 1.45, transition: "color 0.2s" }}>{opt}</span>
              </div>
            );
          })}
        </div>

        {/* Feedback panel */}
        {locked && (
          <div style={{
            margin: "0 20px 20px", padding: "16px 18px", borderRadius: 12,
            background: isCorrect ? "#0a1f12" : "#1f0a0a",
            border: `1px solid ${isCorrect ? GREEN + "30" : RED + "30"}`,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
            }}>
              <div style={{
                fontSize: 16, width: 24, height: 24, borderRadius: "50%",
                background: isCorrect ? GREEN + "25" : RED + "25",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: isCorrect ? GREEN : RED,
              }}>
                {isCorrect ? "✓" : "✗"}
              </div>
              <span style={{
                color: isCorrect ? GREEN : RED, fontSize: 14, fontWeight: 700,
              }}>
                {isCorrect ? "Correct!" : "Not quite."}
              </span>
            </div>
            <div style={{ color: "#b0a898", fontSize: 13, lineHeight: 1.6 }}>
              {question.explain}
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {locked && (
        <div style={{ maxWidth: 520, margin: "20px auto 0" }}>
          <button onClick={handleNext} style={styles.nextBtn}>
            {currentQ + 1 >= total ? "See Results" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: `linear-gradient(160deg, ${BLACK} 0%, #12100a 50%, #0d0d0d 100%)`,
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    padding: "20px 16px",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  headerLabel: {
    color: GOLD,
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: 700,
    marginBottom: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 700,
  },
  headerSub: {
    color: "#777",
    fontSize: 13,
    marginTop: 2,
  },
  scoreCard: {
    maxWidth: 520,
    margin: "0 auto",
    borderRadius: 20,
    padding: "32px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nextBtn: {
    width: "100%",
    padding: "15px 0",
    background: `linear-gradient(135deg, ${GOLD}, #c49b30)`,
    color: BLACK,
    border: "none",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: 0.3,
  },
};
