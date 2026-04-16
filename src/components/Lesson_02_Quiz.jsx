"use client";
import { useState } from "react";

const GOLD = "#D4A843";
const BLACK = "#0D0D0D";
const CHARCOAL = "#1A1A1A";
const GREEN = "#2ECC71";
const RED = "#E74C3C";

const QUESTIONS = [
  {
    q: "What is a share (stock)?",
    options: [
      "A loan you give to a company in exchange for interest payments",
      "A financial instrument representing fractional ownership of a company",
      "A contract that gives you the right to buy a commodity at a set price",
      "A type of savings account held at a brokerage",
    ],
    correct: 1,
    explain: "A share (also called a stock or equity) represents ownership of a fraction of a company. When you buy shares of $AAPL, you literally become a part-owner of Apple.",
  },
  {
    q: "Which of the following is NOT a way shareholders earn income?",
    options: [
      "Dividends — cash distributions of company profits",
      "Capital appreciation — increase in the share price over time",
      "Interest payments — monthly payments from the company's debt",
      "Both dividends and capital appreciation are valid ways",
    ],
    correct: 2,
    explain: "Shareholders earn income through dividends (profit distributions) and capital appreciation (share price increase). Interest payments come from bonds, not stocks. Bonds are a completely different financial instrument.",
  },
  {
    q: "What is the difference between cyclical and non-cyclical (defensive) stocks?",
    options: [
      "Cyclical stocks are cheaper; defensive stocks are expensive",
      "Cyclical stocks follow economic trends; defensive stocks provide essentials that are in demand regardless of economy",
      "Cyclical stocks pay dividends; defensive stocks don't",
      "There is no practical difference — they're just categorized by market cap",
    ],
    correct: 1,
    explain: "Cyclical stocks ($F, $LULU, $NFLX) rise and fall with the economy — when consumers spend more on luxury and entertainment, these do well. Defensive stocks ($WMT, $COST, $XOM) provide essential goods and services people need regardless of economic conditions.",
  },
  {
    q: "An ETF that tracks the healthcare sector would give you exposure to companies like $MRK, $JNJ, and $ABBV. What is that ETF?",
    options: ["$SPY", "$XLV", "$QQQ", "$IWM"],
    correct: 1,
    explain: "$XLV is the SPDR Healthcare Sector ETF, which holds a basket of healthcare companies including Merck, Johnson & Johnson, AbbVie, and others. This lets you get sector exposure without picking individual names.",
  },
  {
    q: "You can't afford $COST at ~$1,000/share but want exposure to Costco. What could you buy instead?",
    options: [
      "$SPY — because it tracks the entire market",
      "$QQQ — because Costco is a tech company",
      "$XLP — because Costco is nearly 10% of this consumer staples ETF",
      "$IWM — because Costco is a small-cap stock",
    ],
    correct: 2,
    explain: "$XLP (Consumer Staples ETF) has Costco as one of its largest holdings at nearly 10% of the fund's assets. This gives you meaningful exposure to Costco's performance at a fraction of the per-share cost. Costco is not a tech company or small-cap stock.",
  },
  {
    q: "What is a stock market index?",
    options: [
      "A stock you can buy that represents the entire market",
      "A hypothetical portfolio of stocks that represents market segment performance — measured by a benchmark, not a price",
      "A list of the most profitable companies in America",
      "A government report on stock market health",
    ],
    correct: 1,
    explain: "An index is a hypothetical portfolio — you can't trade it directly. When the news says 'the S&P 500 crossed 6,000,' that's a benchmark number, not a dollar price. To trade an index's movement, you use its corresponding ETF ($SPY, $QQQ, $DIA, $IWM).",
  },
  {
    q: "If the NASDAQ 100 is showing bearish setups, which types of stocks most likely have bearish setups?",
    options: [
      "Small-cap stocks",
      "Financial and industrial stocks",
      "Technology stocks",
      "Consumer staples and utilities",
    ],
    correct: 2,
    explain: "The NASDAQ 100 tracks the top 100 non-financial companies, which are heavily weighted toward tech. When the NASDAQ is bearish, there's a higher probability that tech stocks are showing bearish setups. The Dow Jones signals financials/industrials, and the Russell 2000 signals small caps.",
  },
  {
    q: "Which index is considered the best gauge of the entire stock market?",
    options: [
      "NASDAQ 100",
      "Dow Jones Industrial Average",
      "S&P 500",
      "Russell 2000",
    ],
    correct: 2,
    explain: "The S&P 500 tracks 500 leading publicly traded U.S. companies and is the best gauge of the overall stock market. If the S&P 500 looks bullish, there's a higher probability that most stocks across the market have bullish setups.",
  },
  {
    q: "Why does the Russell 2000 ($IWM) tend to weaken first in inflationary environments?",
    options: [
      "Because small-cap companies have higher stock prices",
      "Because small-cap companies have fewer resources to weather rising costs, so investors pull away first",
      "Because the Russell 2000 only tracks tech companies",
      "Because the government restricts small-cap trading during inflation",
    ],
    correct: 1,
    explain: "Small-cap companies have limited resources compared to large-caps. In inflationary environments with rising costs and higher interest rates, these companies are more vulnerable. Investors tend to move money out of small caps first, making $IWM an early warning signal during inflationary cycles.",
  },
  {
    q: "A high CPI (inflation) data print is released before market open. What is the most likely market reaction?",
    options: [
      "Bullish — high inflation means the economy is growing",
      "No impact — CPI doesn't affect stock prices",
      "Bearish — high inflation leads to higher interest rates and less consumer spending",
      "Bullish — high inflation means companies can charge more",
    ],
    correct: 2,
    explain: "Higher CPI → higher inflation → the Fed raises interest rates → borrowing costs increase → consumer spending decreases → company profits decline → bearish pressure on stocks. This is why you always check the economic calendar before trading near major data releases — CPI can cause significant gaps at market open.",
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
    setResults(prev => [...prev, idx === question.correct]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= total) { setFinished(true); }
    else { setCurrentQ(i => i + 1); setSelected(null); setLocked(false); }
  };

  const handleRetry = () => {
    setCurrentQ(0); setSelected(null); setLocked(false); setResults([]); setFinished(false);
  };

  if (finished) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div>
          <div style={styles.headerTitle}>Lesson #2 Quiz</div>
          <div style={styles.headerSub}>Here is where we trade!</div>
        </div>
        <div style={{ ...styles.scoreCard, background: passed ? "#071a0d" : "#1a0a0a", border: `2px solid ${passed ? GREEN + "70" : RED + "70"}` }}>
          <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 16px" }}>
            <svg viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8" />
              <circle cx="70" cy="70" r="60" fill="none" stroke={passed ? GREEN : RED} strokeWidth="8"
                strokeDasharray={`${(pct / 100) * 377} 377`} strokeLinecap="round"
                style={{ transition: "stroke-dasharray 1s ease-out" }} />
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
            {results.map((correct, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, background: correct ? GREEN + "20" : RED + "20", color: correct ? GREEN : RED, border: `1px solid ${correct ? GREEN + "50" : RED + "50"}` }}>{i + 1}</div>
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
        <div style={styles.headerTitle}>Lesson #2 Quiz</div>
        <div style={styles.headerSub}>Here is where we trade!</div>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "#666", fontSize: 12 }}>Question {currentQ + 1} of {total}</span>
          <span style={{ color: "#666", fontSize: 12 }}>{results.filter(Boolean).length} correct so far</span>
        </div>
        <div style={{ height: 5, background: "#222", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, transition: "width 0.4s ease", width: `${((currentQ + (locked ? 1 : 0)) / total) * 100}%`, background: `linear-gradient(90deg, ${GOLD}, #e8c85a)` }} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 5, margin: "12px auto 20px", maxWidth: 520 }}>
        {QUESTIONS.map((_, i) => {
          let bg = "#333";
          if (i < results.length) bg = results[i] ? GREEN : RED;
          else if (i === currentQ) bg = GOLD;
          return <div key={i} style={{ width: i === currentQ ? 20 : 8, height: 8, borderRadius: 4, background: bg, transition: "all 0.3s" }} />;
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
          <button onClick={handleNext} style={styles.nextBtn}>{currentQ + 1 >= total ? "See Results" : "Next Question →"}</button>
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
