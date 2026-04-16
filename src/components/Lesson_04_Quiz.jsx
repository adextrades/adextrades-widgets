"use client";
import { useState } from "react";

const GOLD = "#D4A843";
const BLACK = "#0D0D0D";
const CHARCOAL = "#1A1A1A";
const GREEN = "#2ECC71";
const RED = "#E74C3C";
const PASS_PCT = 70;

const QUESTIONS = [
  {
    q: "An uptrend is characterized by:",
    options: ["Lower highs and lower lows", "Higher highs and higher lows", "Equal highs and equal lows", "Higher highs and lower lows"],
    correct: 1,
    explain: "An uptrend is a series of higher highs and higher lows — each peak is higher than the last, and each dip is higher than the last. This creates a staircase pattern moving upward from left to right."
  },
  {
    q: "When drawing an uptrend line, you connect:",
    options: ["Highs to highs, from left to right", "Lows to lows, from left to right", "Opens to closes on consecutive candles", "The first candle to the last candle"],
    correct: 1,
    explain: "Uptrend lines are drawn by connecting LOWS to LOWS from left to right. The trendline sits below price and acts as support. For downtrend lines, you connect HIGHS to HIGHS."
  },
  {
    q: "$SPY has been bouncing off a trendline for 6 months, then breaks below it. On the next retest from below, this trendline now acts as:",
    options: ["Support — it always acts as support", "Resistance — a support/resistance flip has occurred", "Nothing — broken trendlines become irrelevant", "A broadening formation"],
    correct: 1,
    explain: "Trendlines can act as BOTH support and resistance. When price breaks below a support trendline, that same line often becomes resistance on retests. This is called a support/resistance flip."
  },
  {
    q: "What is a broadening formation?",
    options: ["A pattern with higher highs and higher lows (both rising)", "A pattern with higher highs AND lower lows simultaneously (expanding range)", "A narrow consolidation pattern where price contracts", "A single-candle reversal pattern"],
    correct: 1,
    explain: "A broadening formation (megaphone) has highs going to HIGHER highs AND lows going to LOWER lows simultaneously. This creates an expanding range. It's different from an uptrend (where lows are also rising) — in a broadening, the lows are falling."
  },
  {
    q: "Price reaches the upper boundary of a broadening formation on the monthly chart. What should you be cautious of?",
    options: ["A breakout to new all-time highs is guaranteed", "Exhaustion risk — there's a higher probability of reversal at broadening boundaries", "Nothing — broadening formations don't predict reversals", "The broadening formation has been invalidated"],
    correct: 1,
    explain: "Broadening formations show MAGNITUDE (the range price can trade) and EXHAUSTION RISK (higher probability of reversal at boundaries). When price reaches the upper or lower boundary, be cautious of a potential reversal back into the range."
  },
  {
    q: "You connect a low at $100 to another low at $105 with a trendline. Is this a broadening formation?",
    options: ["Yes — any two connected lows form a broadening", "No — a broadening requires lows to go to LOWER lows, not higher lows", "Yes — as long as the highs are also connected", "It depends on the timeframe"],
    correct: 1,
    explain: "A broadening formation requires lows going to LOWER lows (not higher). $100 to $105 is a low to a HIGHER low — that's just an uptrend line, not a broadening. All broadening formations are trendlines, but not all trendlines are broadening formations."
  },
  {
    q: "How do you identify a supply zone on a chart?",
    options: ["By finding the highest candle close on the chart", "By looking for clusters of upper wicks at the same price area — evidence of repeated selling pressure", "By drawing a horizontal line at the all-time high", "By counting the number of red candles in a row"],
    correct: 1,
    explain: "Supply zones are identified by clusters of WICKS at the top of candles. Each wick represents price trying to go higher but being pushed back by sellers. Multiple wicks at the same area = a supply zone where sellers consistently overwhelm buyers."
  },
  {
    q: "Why are supply and demand ZONES preferred over exact support/resistance levels?",
    options: ["Zones are easier to draw", "Zones look better on the chart", "Price rarely bounces to the exact penny — zones capture the range where buying/selling pressure exists", "There's no real difference between zones and levels"],
    correct: 2,
    explain: "Price interaction with levels is never perfectly precise. A stock might wick through a 'support level' by 20 cents before bouncing. Supply and demand ZONES account for this imprecision by defining a range rather than a single line."
  },
  {
    q: "How do you draw a price gap? Put these steps in the correct order.",
    options: [
      "Open of candle 1 → Close of candle 2 → Adjust for volume",
      "Close of candle 1 → Open of candle 2 → Adjust for wicks",
      "High of candle 1 → Low of candle 2 → No adjustment needed",
      "Low of candle 1 → High of candle 2 → Adjust for body size"
    ],
    correct: 1,
    explain: "Gaps are drawn from the CLOSE of the first candle to the OPEN of the second candle, then you ADJUST FOR WICKS. If the second candle wicks back into the gap, the remaining gap shrinks. Always adjust after each interaction."
  },
  {
    q: "On the daily chart, there's no visible empty space between two candles. Can there still be a gap?",
    options: ["No — if there's no empty space, there's no gap", "Yes — hidden gaps exist that are only visible on lower timeframes (15-min, 1-min)", "No — gaps only exist on the weekly chart", "Yes — but only if the candles are different colors"],
    correct: 1,
    explain: "Hidden gaps are common. The daily candles may appear to overlap, but switching to the 15-minute or 1-minute chart reveals an empty space. This happens because overnight/futures trading moves price between the daily close and next-day open. Always check lower timeframes if you suspect a hidden gap."
  },
];

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

  const handleSelect = (idx) => { if (locked) return; setSelected(idx); setLocked(true); setResults(prev => [...prev, idx === question.correct]); };
  const handleNext = () => { if (currentQ + 1 >= total) setFinished(true); else { setCurrentQ(i => i + 1); setSelected(null); setLocked(false); } };
  const handleRetry = () => { setCurrentQ(0); setSelected(null); setLocked(false); setResults([]); setFinished(false); };

  if (finished) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div>
          <div style={styles.headerTitle}>Lesson #4 Quiz</div>
          <div style={styles.headerSub}>Technical Analysis 101</div>
        </div>
        <div style={{ ...styles.scoreCard, background: passed ? "#071a0d" : "#1a0a0a", border: `2px solid ${passed ? GREEN + "70" : RED + "70"}` }}>
          <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 16px" }}>
            <svg viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8" />
              <circle cx="70" cy="70" r="60" fill="none" stroke={passed ? GREEN : RED} strokeWidth="8" strokeDasharray={`${(pct / 100) * 377} 377`} strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease-out" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: passed ? GREEN : RED }}>{pct}%</div>
            </div>
          </div>
          <div style={{ color: "#ccc", fontSize: 15, textAlign: "center" }}>{score} of {total} correct</div>
          <div style={{ marginTop: 14, padding: "8px 24px", borderRadius: 20, background: passed ? GREEN + "18" : RED + "18", color: passed ? GREEN : RED, fontSize: 14, fontWeight: 700 }}>
            {passed ? "✓ PASSED" : "✗ NOT YET — Review & Try Again"}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20, flexWrap: "wrap" }}>
            {results.map((c, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, background: c ? GREEN + "20" : RED + "20", color: c ? GREEN : RED, border: `1px solid ${c ? GREEN + "50" : RED + "50"}` }}>{i + 1}</div>
            ))}
          </div>
          <button onClick={handleRetry} style={{ ...styles.nextBtn, marginTop: 24, background: passed ? `linear-gradient(135deg, ${GREEN}, #27ae60)` : `linear-gradient(135deg, ${GOLD}, #c49b30)`, color: passed ? "#fff" : BLACK }}>
            {passed ? "↺ Retake Quiz" : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div>
        <div style={styles.headerTitle}>Lesson #4 Quiz</div>
        <div style={styles.headerSub}>Technical Analysis 101</div>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "#666", fontSize: 12 }}>Question {currentQ + 1} of {total}</span>
          <span style={{ color: "#666", fontSize: 12 }}>{results.filter(Boolean).length} correct so far</span>
        </div>
        <div style={{ height: 5, background: "#222", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, transition: "width 0.4s", width: `${((currentQ + (locked ? 1 : 0)) / total) * 100}%`, background: `linear-gradient(90deg, ${GOLD}, #e8c85a)` }} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 5, margin: "12px auto 20px", maxWidth: 520 }}>
        {QUESTIONS.map((_, i) => {
          let bg = "#333";
          if (i < results.length) bg = results[i] ? GREEN : RED;
          else if (i === currentQ) bg = GOLD;
          return (
            <div key={i} style={{ width: i === currentQ ? 20 : 8, height: 8, borderRadius: 4, background: bg, transition: "all 0.3s" }} />
          );
        })}
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", background: CHARCOAL, borderRadius: 16, border: "1px solid #2a2a2a", overflow: "hidden" }}>
        <div style={{ padding: "24px 24px 18px" }}>
          <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 4, background: GOLD + "15", color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>QUESTION {currentQ + 1}</div>
          <div style={{ color: "#f0f0f0", fontSize: 16, lineHeight: 1.55, fontWeight: 500 }}>{question.q}</div>
        </div>

        <div style={{ padding: "0 20px 20px" }}>
          {question.options.map((opt, oIdx) => {
            const isThis = selected === oIdx;
            const isAnswer = question.correct === oIdx;
            let bg = "#1e1e1e", border = "#333", textCol = "#c0c0c0", circleBg = "transparent", circleBorder = "#444", circleText = "#888";
            if (locked) {
              if (isAnswer) { bg = GREEN + "12"; border = GREEN; textCol = "#e0e0e0"; circleBg = GREEN; circleBorder = GREEN; circleText = "#fff"; }
              else if (isThis) { bg = RED + "12"; border = RED; textCol = "#aaa"; circleBg = RED; circleBorder = RED; circleText = "#fff"; }
              else { bg = "#151515"; border = "#252525"; textCol = "#555"; circleBorder = "#333"; circleText = "#444"; }
            }
            return (
              <div key={oIdx} onClick={() => handleSelect(oIdx)} style={{ padding: "14px 16px", margin: "8px 0", borderRadius: 12, background: bg, border: `1.5px solid ${border}`, cursor: locked ? "default" : "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, border: `2px solid ${circleBorder}`, background: circleBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: circleText, transition: "all 0.2s" }}>
                  {locked && isAnswer ? "✓" : locked && isThis && !isAnswer ? "✗" : String.fromCharCode(65 + oIdx)}
                </div>
                <span style={{ color: textCol, fontSize: 14, lineHeight: 1.45, transition: "color 0.2s" }}>{opt}</span>
              </div>
            );
          })}
        </div>

        {locked && (
          <div style={{ margin: "0 20px 20px", padding: "16px 18px", borderRadius: 12, background: isCorrect ? "#0a1f12" : "#1f0a0a", border: `1px solid ${isCorrect ? GREEN + "30" : RED + "30"}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 16, width: 24, height: 24, borderRadius: "50%", background: isCorrect ? GREEN + "25" : RED + "25", display: "flex", alignItems: "center", justifyContent: "center", color: isCorrect ? GREEN : RED }}>{isCorrect ? "✓" : "✗"}</div>
              <span style={{ color: isCorrect ? GREEN : RED, fontSize: 14, fontWeight: 700 }}>{isCorrect ? "Correct!" : "Not quite."}</span>
            </div>
            <div style={{ color: "#b0a898", fontSize: 13, lineHeight: 1.6 }}>{question.explain}</div>
          </div>
        )}
      </div>

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
  container: { minHeight: "100vh", background: `linear-gradient(160deg, ${BLACK} 0%, #12100a 50%, #0d0d0d 100%)`, fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", padding: "20px 16px", boxSizing: "border-box" },
  header: { textAlign: "center", marginBottom: 20 },
  headerLabel: { color: GOLD, fontSize: 11, letterSpacing: 3, fontWeight: 700, marginBottom: 4 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: 700 },
  headerSub: { color: "#777", fontSize: 13, marginTop: 2 },
  scoreCard: { maxWidth: 520, margin: "0 auto", borderRadius: 20, padding: "32px 28px", display: "flex", flexDirection: "column", alignItems: "center" },
  nextBtn: { width: "100%", padding: "15px 0", background: `linear-gradient(135deg, ${GOLD}, #c49b30)`, color: BLACK, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", letterSpacing: 0.3 },
};
