"use client";
import { useState, useCallback, useEffect } from "react";

const CARDS = [
  { front: "What does PBS stand for?", back: "Pause, Breathe, and Smile — a three-step methodology for managing emotional responses during trading." },
  { front: "Are emotions good or bad?", back: "Neither. Emotions are neutral responses to events. What can be good or bad is your REACTION to those emotions — your physiological and behavioral responses." },
  { front: "What are physiological emotional responses?", back: "Your body's automatic reactions: heart rate increase, sweating palms, muscle tension. These happen involuntarily when emotions hit." },
  { front: "What are behavioral emotional responses?", back: "The actions you take in response to emotions: panic-selling, freezing, doubling down, revenge trading. This is where most traders lose money." },
  { front: "What is the Pomodoro Technique?", back: "A time management method: 25 minutes of focused work → 5 minute break → repeat. Named after an Italian tomato-shaped kitchen timer. Trains your brain to take deliberate pauses." },
  { front: "What should you do during a Pomodoro break?", back: "Something COMPLETELY different from your task. Step away from your screen — get water, stretch, look outside. Don't switch from trading options to trading futures — your brain needs a real reset." },
  { front: "Why do Pomodoro breaks feel awkward at first?", back: "Your brain isn't used to deliberate pauses. Pomodoros work at a SUBCONSCIOUS level — you won't feel immediate feedback, but the mental reset is happening. Discipline bridges the gap until it becomes habit." },
  { front: "What is box breathing (square breathing)?", back: "A 4-4-4-4 breathing pattern: Inhale 4 sec → Hold 4 sec → Exhale 4 sec → Hold 4 sec. Calms the nervous system. Practice for 2–5 minutes only." },
  { front: "Why shouldn't you do box breathing for more than 5 minutes?", back: "It forces a non-natural breathing pattern. Doing it too long can cause dizziness or increased heart rate. If 4 seconds is too long, shorten to 2–3 seconds." },
  { front: "Which emotion 'rules them all' according to the Inside Out framework?", back: "Joy (happiness). Joy is the only emotion that can truly diminish all other negative emotions — fear, anger, sadness, and disgust." },
  { front: "What's the difference between intense joy and contentment?", back: "Intense joy → overreaction, going all-in, exceeding risk limits. Contentment → calm confidence, measured decisions, sticking to your plan. Contentment is the goal for trading." },
  { front: "What is the Inner Smile meditation?", back: "An ancient Taoist practice where you visualize golden energy flowing through your body, smiling at each body part and organ. Cultivates contentment (not euphoria) in ~5 minutes. Best done before market open." },
  { front: "What's the correct posture for the Inner Smile?", back: "Sit upright. Chin level or slightly up. Arms resting on lap (relaxes shoulders). Feet flat on floor, uncrossed. Eyes closed or soft half-gaze at 45° downward angle." },
  { front: "Why should you record the Inner Smile script in your own voice?", back: "Hearing yourself guide the meditation doubles the impact — it's your own voice reinforcing the message, not someone else's. After a few sessions, you'll have it memorized." },
  { front: "Does PBS tell you what trading decision to make?", back: "No. PBS only prepares you to make good decisions by removing fear, anger, and anxiety. It creates the right state of mind — the actual trading decisions come from technical analysis." },
  { front: "What should your #1 priority be as a new trader?", back: "Preserving your capital — NOT making money. Worrying about profits creates pressure that distorts decision-making. Focus on capital preservation and consistency will follow." },
  { front: "What risk percentage is recommended for beginners?", back: "1–2% of your portfolio per trade. At this level, PBS tools can effectively manage your emotions. At 5–6%+, no amount of breathing or meditation will overcome the anxiety." },
  { front: "Can you be profitable while losing most of your trades?", back: "Yes. With a 2:1 risk-to-reward ratio, you can lose 60% of your trades and still be net profitable. Example: 4 wins × $200 = $800, minus 6 losses × $100 = $600. Net = +$200." },
  { front: "When does losing become failing?", back: "When you stop learning. Lose once = lesson. Lose the same way twice = deeper lesson about emotional management. Lose the same way a THIRD time after identifying the pattern = failing." },
  { front: "Why did the $LMT trade example prove PBS works?", back: "Juan was down 90% overnight due to Trump news — but because he only risked ~2% ($150), he could stay calm, apply PBS, and hold. The trade reversed and he exited at ~90% profit. PBS only works when paired with proper position sizing." },
];

const GOLD = "#D4A843";
const BLACK = "#0D0D0D";
const CHARCOAL = "#1A1A1A";
const DARK = "#111111";

export default function Flashcards() {
  const [deck, setDeck] = useState([...CARDS]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [reviewing, setReviewing] = useState(new Set());
  const [animDir, setAnimDir] = useState(null);

  const current = deck[idx];
  const total = deck.length;
  const progress = ((known.size + reviewing.size) / CARDS.length) * 100;

  const flip = useCallback(() => setFlipped(f => !f), []);

  const next = useCallback((status) => {
    const id = deck[idx].front;
    if (status === "known") {
      setKnown(prev => new Set([...prev, id]));
      setReviewing(prev => { const n = new Set(prev); n.delete(id); return n; });
    } else {
      setReviewing(prev => new Set([...prev, id]));
      setKnown(prev => { const n = new Set(prev); n.delete(id); return n; });
    }
    setAnimDir(status === "known" ? "right" : "left");
    setTimeout(() => {
      setFlipped(false);
      setAnimDir(null);
      setIdx(i => (i + 1) % total);
    }, 250);
  }, [deck, idx, total]);

  const shuffle = useCallback(() => {
    const shuffled = [...CARDS].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setIdx(0);
    setFlipped(false);
    setKnown(new Set());
    setReviewing(new Set());
  }, []);

  const reset = useCallback(() => {
    setDeck([...CARDS]);
    setIdx(0);
    setFlipped(false);
    setKnown(new Set());
    setReviewing(new Set());
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.code === "Space") { e.preventDefault(); flip(); }
      if (e.code === "ArrowRight") next("known");
      if (e.code === "ArrowLeft") next("review");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flip, next]);

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${BLACK} 0%, #1a1510 100%)`, fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "20px", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ color: GOLD, fontSize: 11, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>ADEXTRADES UNIVERSITY</div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>Lesson #1 Flashcards</div>
        <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>Trading is 90% Emotions!</div>
      </div>

      {/* Progress */}
      <div style={{ maxWidth: 500, margin: "0 auto 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ flex: 1, height: 6, background: "#2a2a2a", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${GOLD}, #e8c85a)`, borderRadius: 3, transition: "width 0.4s" }} />
        </div>
        <div style={{ color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>{known.size + reviewing.size}/{CARDS.length}</div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 500, margin: "0 auto 20px", display: "flex", justifyContent: "center", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2ECC71" }} />
          <span style={{ color: "#aaa", fontSize: 12 }}>Mastered: {known.size}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E74C3C" }} />
          <span style={{ color: "#aaa", fontSize: 12 }}>Review: {reviewing.size}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#555" }} />
          <span style={{ color: "#aaa", fontSize: 12 }}>Unseen: {CARDS.length - known.size - reviewing.size}</span>
        </div>
      </div>

      {/* Card */}
      <div style={{ maxWidth: 500, margin: "0 auto", perspective: 1000 }}>
        <div
          onClick={flip}
          style={{
            cursor: "pointer",
            position: "relative",
            height: 280,
            transformStyle: "preserve-3d",
            transition: animDir ? "transform 0.25s, opacity 0.25s" : "transform 0.5s",
            transform: `${flipped ? "rotateY(180deg)" : "rotateY(0)"} ${animDir === "right" ? "translateX(60px)" : animDir === "left" ? "translateX(-60px)" : ""}`,
            opacity: animDir ? 0.3 : 1,
          }}
        >
          {/* Front */}
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            background: `linear-gradient(145deg, ${CHARCOAL}, #222)`,
            border: `2px solid ${GOLD}40`, borderRadius: 16,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: "30px 28px", boxSizing: "border-box",
          }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 16, opacity: 0.7 }}>QUESTION</div>
            <div style={{ color: "#fff", fontSize: 17, textAlign: "center", lineHeight: 1.5, fontWeight: 500 }}>{current.front}</div>
            <div style={{ color: "#666", fontSize: 11, marginTop: "auto", paddingTop: 12 }}>Tap to flip</div>
          </div>

          {/* Back */}
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(145deg, #1a1508, #1e1a10)`,
            border: `2px solid ${GOLD}`, borderRadius: 16,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: "30px 28px", boxSizing: "border-box",
          }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>ANSWER</div>
            <div style={{ color: "#e8e0d0", fontSize: 15, textAlign: "center", lineHeight: 1.6 }}>{current.back}</div>
          </div>
        </div>
      </div>

      {/* Card counter */}
      <div style={{ textAlign: "center", color: "#666", fontSize: 12, margin: "12px 0" }}>
        Card {idx + 1} of {total}
      </div>

      {/* Action buttons */}
      <div style={{ maxWidth: 500, margin: "0 auto", display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          onClick={() => next("review")}
          style={{
            flex: 1, padding: "14px 0", background: "transparent", border: "2px solid #E74C3C",
            color: "#E74C3C", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = "#E74C3C20"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; }}
        >
          ← Review Again
        </button>
        <button
          onClick={() => next("known")}
          style={{
            flex: 1, padding: "14px 0", background: "transparent", border: "2px solid #2ECC71",
            color: "#2ECC71", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = "#2ECC7120"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; }}
        >
          Got It →
        </button>
      </div>

      {/* Controls */}
      <div style={{ maxWidth: 500, margin: "16px auto 0", display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={shuffle} style={{ padding: "8px 20px", background: "#2a2a2a", color: "#aaa", border: "1px solid #3a3a3a", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
          🔀 Shuffle
        </button>
        <button onClick={reset} style={{ padding: "8px 20px", background: "#2a2a2a", color: "#aaa", border: "1px solid #3a3a3a", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
          ↺ Reset
        </button>
      </div>

      {/* Keyboard hint */}
      <div style={{ textAlign: "center", color: "#444", fontSize: 11, marginTop: 16 }}>
        Space = flip · ← = review · → = got it
      </div>
    </div>
  );
}
