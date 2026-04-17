"use client";
import { useState, useCallback, useEffect } from "react";

const GOLD = "#D4A843";
const BLACK = "#0D0D0D";
const CHARCOAL = "#1A1A1A";
const GREEN = "#2ECC71";
const RED_C = "#E74C3C";
const CANDLE_GREEN = "#26A65B";
const CANDLE_RED = "#E74C3C";

// SVG candle helper
const Candle = ({ type, size = 80 }) => {
  const h = size;
  const w = size * 0.6;
  const cx = w / 2;
  const bw = w * 0.45;

  const configs = {
    shooter: { wickTop: 5, bodyTop: h * 0.7, bodyBot: h * 0.82, wickBot: h * 0.88, color: CANDLE_RED },
    hammer: { wickTop: h * 0.12, bodyTop: h * 0.18, bodyBot: h * 0.3, wickBot: h * 0.95, color: CANDLE_GREEN },
    doji: { wickTop: h * 0.1, bodyTop: h * 0.48, bodyBot: h * 0.52, wickBot: h * 0.9, color: "#888" },
    bullish: { wickTop: h * 0.08, bodyTop: h * 0.22, bodyBot: h * 0.68, wickBot: h * 0.85, color: CANDLE_GREEN },
    bearish: { wickTop: h * 0.08, bodyTop: h * 0.22, bodyBot: h * 0.68, wickBot: h * 0.85, color: CANDLE_RED },
    strong_bear: { wickTop: h * 0.05, bodyTop: h * 0.08, bodyBot: h * 0.92, wickBot: h * 0.92, color: CANDLE_RED },
  };
  const c = configs[type] || configs.bullish;
  const bodyH = c.bodyBot - c.bodyTop;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <line x1={cx} y1={c.wickTop} x2={cx} y2={c.bodyTop} stroke={c.color} strokeWidth="2" />
      <line x1={cx} y1={c.bodyBot} x2={cx} y2={c.wickBot} stroke={c.color} strokeWidth="2" />
      <rect x={cx - bw / 2} y={c.bodyTop} width={bw} height={Math.max(bodyH, 3)} fill={c.color} rx="1" />
    </svg>
  );
};

const CARDS = [
  {
    front: "What are the four elements of a Japanese candlestick?",
    back: "Open (session start price), High (highest price traded), Low (lowest price traded), Close (session end price). These four elements — OHLC — are the foundation of all price action analysis."
  },
  {
    front: "How do you know if a candle is bullish or bearish?",
    back: "Bullish (green): Close is HIGHER than the open — price went up. Bearish (red): Close is LOWER than the open — price went down."
  },
  {
    frontVisual: "shooter",
    front: "What pattern is this candle? What's the most likely next direction?",
    back: "SHOOTER — characterized by a long upper wick with the body closing in the bottom 2/3 of the candle. Buyers pushed price up but sellers overpowered them. Most probable next direction: DOWN."
  },
  {
    frontVisual: "hammer",
    front: "What pattern is this candle? What's the most likely next direction?",
    back: "HAMMER — characterized by a long lower wick with the body closing in the top 2/3 of the candle. Sellers pushed price down but buyers stepped in aggressively. Most probable next direction: UP."
  },
  {
    frontVisual: "doji",
    front: "What pattern is this candle? What should you do when you see it?",
    back: "DOJI — open and close are nearly equal, showing indecision between buyers and sellers. Action: WAIT. Do nothing until the next candle reveals direction."
  },
  {
    front: "Does the color of the candle matter for shooter/hammer/doji patterns?",
    back: "No. A green shooter is still a shooter — the color doesn't negate the fact that sellers overpowered buyers. What matters is the wick length and where the body closes relative to the candle's range."
  },
  {
    front: "Are candlestick patterns guaranteed to predict the next move?",
    back: "No — they give you the MOST PROBABLE direction, not a 100% certainty. You will see hammers followed by gap-downs. Trading is based on probabilities, not guarantees."
  },
  {
    frontVisual: "strong_bear",
    front: "This candle has no lower wick and closes at its low. What does this signal?",
    back: "A STRONG BEARISH CLOSE. Sellers were so aggressive that buyers couldn't push price back up at all. The next candle has a higher probability of continuing bearish. The less wick on the closing side, the stronger the signal."
  },
  {
    front: "What is a strong candle close?",
    back: "A candle that closes at or near its extreme — at the HIGH for bullish (no upper wick) or at the LOW for bearish (no lower wick). It signals aggressive dominance by one side and higher probability of continuation."
  },
  {
    front: "If one red candle erases the gains of 5–6 green candles, what does that tell you?",
    back: "Sellers are significantly more aggressive than buyers. It took buyers 5–6 days to build that range, but sellers wiped it out in one candle. The next candle has a higher probability of continuing bearish."
  },
  {
    front: "What is the CCRP (Candle Color Reversal Pattern)?",
    back: "A strategy based on analyzing candle colors: Look for 3+ consecutive candles of one color → wait for the first candle of the opposite color to close → if the next candle triggers in the new direction, the CCRP is confirmed. Works on ANY timeframe."
  },
  {
    front: "What's the minimum number of consecutive same-color candles needed for a CCRP?",
    back: "At least 3. Two consecutive candles is not enough. Three, four, five, six, or more all qualify."
  },
  {
    front: "When you see the first opposite-color candle in a CCRP setup, what do you do?",
    back: "PAY ATTENTION TO IT — but do NOT act yet. You wait for the next candle to actually trigger in that direction. For bearish: price must trade BELOW the red candle. For bullish: price must trade ABOVE the green candle."
  },
  {
    front: "What happens if the CCRP doesn't trigger?",
    back: "It's NOT a valid CCRP — do NOT take the trade. The color change alone is not enough. Price must actually trigger (trade beyond the color-change candle) in the expected direction to confirm the pattern."
  },
  {
    front: "What does 'time is fractal' mean in trading?",
    back: "The basic structure of price action repeats at every scale. 5 daily candles make up 1 weekly candle. 4 weekly candles make up 1 monthly candle. Each timeframe is a fractal of the one above it — same patterns, different magnitudes."
  },
  {
    front: "How does the weekly candle relate to the daily timeframe?",
    back: "Monday's open = the weekly open. Friday's close = the weekly close. The week's high and low can occur on any day. The 5 daily candles (Mon–Fri) combine to form one weekly candlestick."
  },
  {
    front: "A hammer forms on the monthly chart. A doji forms on the daily chart. Which has more weight?",
    back: "The monthly hammer has FAR more weight. Higher timeframe patterns carry more magnitude. The monthly hammer suggests probable upside, and the daily doji (indecision) could resolve by triggering UP to fulfill the monthly setup."
  },
  {
    front: "Why should you know when the next candle opens on a timeframe?",
    back: "New candle openings help you anticipate WHAT can happen and WHEN (within a time range, not an exact moment). Especially important on hybrid timeframes (2-day, 3-day, 5-day charts). TradingView shows this when you hover right of the live candle."
  },
  {
    front: "What are the three basics of reading price action?",
    back: "1) Look for shooters, hammers, and dojis (probable direction). 2) Look for strong candle closes — no wick = aggression and continuation. 3) Look for CCRPs — 3+ same-color candles → color change → trigger confirmation."
  },
  {
    front: "Why should you learn candlestick anatomy BEFORE learning indicators?",
    back: "Because price action (read through candlesticks) is the foundation of all technical analysis. Indicators are derived FROM price — if you don't understand the raw candlestick data, indicators become meaningless numbers."
  },
];

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
      setAnimDir("right");
      setTimeout(() => {
        setFlipped(false);
        setAnimDir(null);
        setDeck(prev => { const nd = [...prev]; nd.splice(idx, 1); return nd.length ? nd : prev; });
        setIdx(i => i >= deck.length - 1 ? 0 : i);
      }, 250);
    } else {
      setReviewing(prev => new Set([...prev, id]));
      setKnown(prev => { const n = new Set(prev); n.delete(id); return n; });
      setAnimDir("left");
      setTimeout(() => {
        setFlipped(false);
        setAnimDir(null);
        setDeck(prev => { const nd = [...prev]; const card = nd.splice(idx, 1)[0]; nd.push(card); return nd; });
        setIdx(i => i >= deck.length - 1 ? 0 : i);
      }, 250);
    }
  }, [deck, idx]);

  const shuffle = useCallback(() => { setDeck([...CARDS].sort(() => Math.random() - 0.5)); setIdx(0); setFlipped(false); setKnown(new Set()); setReviewing(new Set()); }, []);
  const reset = useCallback(() => { setDeck([...CARDS]); setIdx(0); setFlipped(false); setKnown(new Set()); setReviewing(new Set()); }, []);

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
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ color: GOLD, fontSize: 11, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>ADEXTRADES UNIVERSITY</div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>Lesson #3 Flashcards</div>
        <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>The Basics of Price Action</div>
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ flex: 1, height: 6, background: "#2a2a2a", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${GOLD}, #e8c85a)`, borderRadius: 3, transition: "width 0.4s" }} />
        </div>
        <div style={{ color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>{known.size + reviewing.size}/{CARDS.length}</div>
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto 20px", display: "flex", justifyContent: "center", gap: 20 }}>
        {[{ c: GREEN, l: "Mastered", v: known.size }, { c: RED_C, l: "Review", v: reviewing.size }, { c: "#555", l: "Unseen", v: CARDS.length - known.size - reviewing.size }].map(({ c, l, v }) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
            <span style={{ color: "#aaa", fontSize: 12 }}>{l}: {v}</span>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto", perspective: 1000 }}>
        <div onClick={flip} style={{
          cursor: "pointer", position: "relative", height: 320,
          transformStyle: "preserve-3d",
          transition: animDir ? "transform 0.25s, opacity 0.25s" : "transform 0.5s",
          transform: `${flipped ? "rotateY(180deg)" : "rotateY(0)"} ${animDir === "right" ? "translateX(60px)" : animDir === "left" ? "translateX(-60px)" : ""}`,
          opacity: animDir ? 0.3 : 1,
        }}>
          {/* Front */}
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            background: `linear-gradient(145deg, ${CHARCOAL}, #222)`,
            border: `2px solid ${GOLD}40`, borderRadius: 16,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: "24px 28px", boxSizing: "border-box",
          }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 12, opacity: 0.7 }}>QUESTION</div>
            {current.frontVisual && (
              <div style={{ marginBottom: 12, padding: "8px 16px", background: "#111", borderRadius: 10, border: "1px solid #333" }}>
                <Candle type={current.frontVisual} size={90} />
              </div>
            )}
            <div style={{ color: "#fff", fontSize: 16, textAlign: "center", lineHeight: 1.5, fontWeight: 500 }}>{current.front}</div>
            <div style={{ color: "#666", fontSize: 11, marginTop: "auto", paddingTop: 8 }}>Tap to flip</div>
          </div>
          {/* Back */}
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(145deg, #1a1508, #1e1a10)`,
            border: `2px solid ${GOLD}`, borderRadius: 16,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: "24px 28px", boxSizing: "border-box", overflow: "auto",
          }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 12 }}>ANSWER</div>
            <div style={{ color: "#e8e0d0", fontSize: 14, textAlign: "center", lineHeight: 1.6 }}>{current.back}</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", color: "#666", fontSize: 12, margin: "12px 0" }}>Card {idx + 1} of {total}</div>

      <div style={{ maxWidth: 500, margin: "0 auto", display: "flex", gap: 12, justifyContent: "center" }}>
        {[{ label: "← Review Again", color: RED_C, action: "review" }, { label: "Got It →", color: GREEN, action: "known" }].map(({ label, color, action }) => (
          <button key={action} onClick={() => next(action)} style={{
            flex: 1, padding: "14px 0", background: "transparent", border: `2px solid ${color}`,
            color, borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
          }} onMouseEnter={e => e.target.style.background = color + "20"} onMouseLeave={e => e.target.style.background = "transparent"}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 500, margin: "16px auto 0", display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={shuffle} style={{ padding: "8px 20px", background: "#2a2a2a", color: "#aaa", border: "1px solid #3a3a3a", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>🔀 Shuffle</button>
        <button onClick={reset} style={{ padding: "8px 20px", background: "#2a2a2a", color: "#aaa", border: "1px solid #3a3a3a", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>↺ Reset</button>
      </div>
      <div style={{ textAlign: "center", color: "#444", fontSize: 11, marginTop: 16 }}>Space = flip · ← = review · → = got it</div>
    </div>
  );
}
