"use client";
import { useState, useCallback, useEffect } from "react";

const GOLD = "#D4A843"; const BLACK = "#0D0D0D"; const CHARCOAL = "#1A1A1A"; const GREEN = "#2ECC71"; const RED_C = "#E74C3C";

const CARDS = [
  { front: "What is a trendline?", back: "A line in technical analysis representing a sustained direction in price movement. Drawn by connecting two or more points together — lows to lows for uptrends, highs to highs for downtrends." },
  { front: "What characterizes an uptrend?", back: "A series of HIGHER HIGHS and HIGHER LOWS. Each successive high is higher than the previous high, and each successive low is higher than the previous low." },
  { front: "What characterizes a downtrend?", back: "A series of LOWER HIGHS and LOWER LOWS. Each successive high is lower than the previous high, and each successive low is lower than the previous low." },
  { front: "How do you draw an uptrend line?", back: "Connect LOWS to LOWS from left to right. The trendline sits below price and acts as SUPPORT. The more touchpoints, the stronger the trendline." },
  { front: "How do you draw a downtrend line?", back: "Connect HIGHS to HIGHS from left to right. The trendline sits above price and acts as RESISTANCE. More touchpoints = stronger resistance." },
  { front: "Can a trendline act as both support and resistance?", back: "Yes. Price may ride a trendline as support for months, then break below it. That same trendline can then become resistance on retests. This is called a support/resistance flip." },
  { front: "What is a broadening formation?", back: "A chart pattern (also called a megaphone) where price creates progressively HIGHER HIGHS and LOWER LOWS simultaneously. The upper trendline slopes up (highs to higher highs) and the lower trendline slopes down (lows to lower lows)." },
  { front: "What two things does a broadening formation tell you?", back: "1) MAGNITUDE — the range price can trade within (top to bottom of the broadening). 2) EXHAUSTION RISK — when price reaches a boundary, there's higher probability of reversal." },
  { front: "Are all trendlines broadening formations?", back: "No. All broadening formations are trendlines, but NOT all trendlines are broadening formations. A broadening requires highs to HIGHER highs AND lows to LOWER lows. A low to a HIGHER low is just an uptrend — not a broadening." },
  { front: "Why do some Strat traders prefer broadening formations over horizontal support/resistance?", back: "Because price EXPANDS over time. New all-time highs prove that price doesn't respect static horizontal levels forever. Broadening formations account for this expansion, showing dynamic ranges rather than fixed levels." },
  { front: "What is horizontal support?", back: "A specific price level where price repeatedly bounces upward. Buyers consistently step in at this level. Multiple bounces from the same level confirm it as support." },
  { front: "What is horizontal resistance?", back: "A specific price level where price repeatedly rejects downward. Sellers consistently step in at this level. Multiple rejections from the same level confirm it as resistance." },
  { front: "Why use supply and demand ZONES instead of exact support/resistance levels?", back: "Because price rarely bounces to the exact penny. A zone captures the range where buying or selling pressure exists, accounting for the natural imprecision of price interaction with levels." },
  { front: "What is a supply zone?", back: "An area where selling pressure consistently overwhelms buyers. Price rejects downward from this zone. Identified by clusters of upper WICKS — evidence that sellers kept pushing price back down every time it tried to break higher." },
  { front: "What is a demand zone?", back: "An area where buying pressure consistently overwhelms sellers. Price bounces upward from this zone. Identified by clusters of lower WICKS — evidence that buyers kept pushing price back up every time it tried to break lower." },
  { front: "How do wicks reveal supply and demand zones?", back: "Wicks are footprints of rejected price movement. Multiple upper wicks at the same area = supply zone (sellers live here). Multiple lower wicks at the same area = demand zone (buyers live here)." },
  { front: "What is a price gap?", back: "An area of unfilled orders — an empty space between two consecutive candles due to a lack of trading activity. The market doesn't like gaps, so they tend to get filled. Think of gaps as MAGNETS for price." },
  { front: "How do you draw a gap? (3 steps)", back: "Step 1: Identify the CLOSE of the first candle. Step 2: Identify the OPEN of the second candle. The gap is from close → open. Step 3: ADJUST FOR WICKS — if the second candle wicks back into the gap, the remaining gap shrinks to the wick tip." },
  { front: "Which timeframe should you draw gaps on?", back: "The DAILY chart. You may not see the gap visually on the daily — switch to the 15-minute or 1-minute chart to confirm it exists. Gaps on weekly = Friday close to Monday open. Gaps on monthly = last day to first day." },
  { front: "What are hidden gaps?", back: "Gaps that aren't visually obvious on the daily timeframe because the candles appear to overlap. But if you zoom into the 15-minute or 1-minute chart, you'll see the empty space. These occur due to overnight/futures trading moving price between the daily close and next-day open." },
  { front: "Do gaps have to be filled with a full candle body?", back: "No. A wick into the gap counts as a partial fill. Always adjust the remaining gap after each interaction. Even a 1-cent gap can act as a magnet — price will chase it." },
  { front: "Can a gap be used as support or demand?", back: "Yes. While gaps tend to get filled, they can also serve as support/demand or supply zones in certain scenarios. This will be covered in more detail in later lessons." },
];

export default function Flashcards() {
  const [deck, setDeck] = useState([...CARDS]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [reviewing, setReviewing] = useState(new Set());
  const [animDir, setAnimDir] = useState(null);

  const current = deck[idx]; const total = deck.length;
  const progress = ((known.size + reviewing.size) / CARDS.length) * 100;
  const flip = useCallback(() => setFlipped(f => !f), []);
  const next = useCallback((status) => {
    const id = deck[idx].front;
    if (status === "known") {
      setKnown(p => new Set([...p, id])); setReviewing(p => { const n = new Set(p); n.delete(id); return n; });
      setAnimDir("right");
      setTimeout(() => { setFlipped(false); setAnimDir(null); setDeck(prev => { const nd = [...prev]; nd.splice(idx, 1); return nd.length ? nd : prev; }); setIdx(i => i >= deck.length - 1 ? 0 : i); }, 250);
    } else {
      setReviewing(p => new Set([...p, id])); setKnown(p => { const n = new Set(p); n.delete(id); return n; });
      setAnimDir("left");
      setTimeout(() => { setFlipped(false); setAnimDir(null); setDeck(prev => { const nd = [...prev]; const card = nd.splice(idx, 1)[0]; nd.push(card); return nd; }); setIdx(i => i >= deck.length - 1 ? 0 : i); }, 250);
    }
  }, [deck, idx]);
  const shuffle = useCallback(() => { setDeck([...CARDS].sort(() => Math.random() - 0.5)); setIdx(0); setFlipped(false); setKnown(new Set()); setReviewing(new Set()); }, []);
  const reset = useCallback(() => { setDeck([...CARDS]); setIdx(0); setFlipped(false); setKnown(new Set()); setReviewing(new Set()); }, []);

  useEffect(() => {
    const h = (e) => { if (e.code === "Space") { e.preventDefault(); flip(); } if (e.code === "ArrowRight") next("known"); if (e.code === "ArrowLeft") next("review"); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [flip, next]);

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${BLACK} 0%, #1a1510 100%)`, fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "20px", boxSizing: "border-box" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ color: GOLD, fontSize: 11, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>ADEXTRADES UNIVERSITY</div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>Lesson #4 Flashcards</div>
        <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>Technical Analysis 101</div>
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ flex: 1, height: 6, background: "#2a2a2a", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${GOLD}, #e8c85a)`, borderRadius: 3, transition: "width 0.4s" }} />
        </div>
        <div style={{ color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>{known.size + reviewing.size}/{CARDS.length}</div>
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto 20px", display: "flex", justifyContent: "center", gap: 20 }}>
        {[{ c: GREEN, l: "Mastered", v: known.size }, { c: RED_C, l: "Review", v: reviewing.size }, { c: "#555", l: "Unseen", v: CARDS.length - known.size - reviewing.size }].map(({ c, l, v }) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} /><span style={{ color: "#aaa", fontSize: 12 }}>{l}: {v}</span></div>
        ))}
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto", perspective: 1000 }}>
        <div onClick={flip} style={{ cursor: "pointer", position: "relative", height: 300, transformStyle: "preserve-3d", transition: animDir ? "transform 0.25s, opacity 0.25s" : "transform 0.5s", transform: `${flipped ? "rotateY(180deg)" : "rotateY(0)"} ${animDir === "right" ? "translateX(60px)" : animDir === "left" ? "translateX(-60px)" : ""}`, opacity: animDir ? 0.3 : 1 }}>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: `linear-gradient(145deg, ${CHARCOAL}, #222)`, border: `2px solid ${GOLD}40`, borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "30px 28px", boxSizing: "border-box" }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 16, opacity: 0.7 }}>QUESTION</div>
            <div style={{ color: "#fff", fontSize: 17, textAlign: "center", lineHeight: 1.5, fontWeight: 500 }}>{current.front}</div>
            <div style={{ color: "#666", fontSize: 11, marginTop: "auto", paddingTop: 12 }}>Tap to flip</div>
          </div>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: `linear-gradient(145deg, #1a1508, #1e1a10)`, border: `2px solid ${GOLD}`, borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "24px 28px", boxSizing: "border-box", overflow: "auto" }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 12 }}>ANSWER</div>
            <div style={{ color: "#e8e0d0", fontSize: 14, textAlign: "center", lineHeight: 1.6 }}>{current.back}</div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", color: "#666", fontSize: 12, margin: "12px 0" }}>Card {idx + 1} of {total}</div>
      <div style={{ maxWidth: 500, margin: "0 auto", display: "flex", gap: 12, justifyContent: "center" }}>
        {[{ label: "← Review Again", color: RED_C, action: "review" }, { label: "Got It →", color: GREEN, action: "known" }].map(({ label, color, action }) => (
          <button key={action} onClick={() => next(action)} style={{ flex: 1, padding: "14px 0", background: "transparent", border: `2px solid ${color}`, color, borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.target.style.background = color + "20"} onMouseLeave={e => e.target.style.background = "transparent"}>{label}</button>
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
