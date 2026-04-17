"use client";
import { useState, useCallback, useEffect } from "react";

const CARDS = [
  { front: "What is the financial market?", back: "A vast marketplace where investors and traders buy and sell various financial instruments. It provides liquidity and enables businesses, entrepreneurs, and governments to access capital." },
  { front: "Name the major types of financial markets.", back: "Bond market, derivatives market, forex (foreign exchange), commodities market, crypto market, and the stock market. Our focus is the stock market." },
  { front: "What is the stock market?", back: "The marketplace where companies list their shares to raise capital, and those shares are bought and sold by investors and traders to make profits." },
  { front: "What is a share (stock/equity)?", back: "A financial instrument that represents ownership of a fraction of a company. Buying shares of $AAPL makes you a part-owner of Apple." },
  { front: "What are the two ways shareholders earn income?", back: "1) Dividends — cash distributions of a company's profits to shareholders. 2) Capital appreciation — the increase of the share price itself over time." },
  { front: "What are dividends?", back: "Cash distributions of a company's profits paid to shareholders, typically quarterly. Example: $KO (Coca-Cola) distributes a portion of profits to its shareholders." },
  { front: "What is capital appreciation?", back: "Earning income through the increase of the share price. Buy at $10/share, it grows to $15/share = 50% gain ($5 profit per share) just from holding." },
  { front: "What is an IPO?", back: "Initial Public Offering — the process a company goes through to become publicly traded. After the IPO, its shares become available for the public to buy and sell on a stock exchange." },
  { front: "What is a brokerage account?", back: "An account that allows you to buy and sell stocks on a stock exchange. Examples: TD Ameritrade/thinkorswim, Robinhood, Webull. You access exchanges like NYSE and NASDAQ through a broker." },
  { front: "What are blue chip stocks?", back: "Shares of large, well-established, financially stable companies that are usually industry leaders. They often offer consistent dividends and are considered lower-risk. Examples: $AAPL, $MSFT, $HD, $KO." },
  { front: "What are small cap stocks?", back: "Shares of companies with smaller market capitalizations — often recently IPO'd or in early growth stages. Higher growth potential but riskier due to limited resources." },
  { front: "What are cyclical stocks?", back: "Stocks that follow the economy's trend. They rise when the economy booms (increased consumer spending on travel, luxury, entertainment) and fall during downturns. Examples: $F, $LULU, $NFLX, $TSLA." },
  { front: "What are non-cyclical (defensive) stocks?", back: "Stocks that outperform during economic downturns. They provide essential goods/services in demand regardless of economic conditions — utilities, energy, healthcare, consumer staples. Examples: $WMT, $COST, $XOM." },
  { front: "What is an ETF?", back: "Exchange-Traded Fund — an investment that holds a basket of assets (stocks, bonds, commodities). It trades on a stock exchange like an individual stock and can track a specific index or sector." },
  { front: "Why would you buy an ETF instead of an individual stock?", back: "1) Affordable exposure to expensive stocks (e.g., buy $XLP instead of $1,000 $COST shares). 2) Diversification — spreads risk across many companies. 3) Sector tracking without picking individual names." },
  { front: "What is a stock market index?", back: "A hypothetical portfolio of stock holdings that represents the performance of a market segment. You can't trade an index directly — it's measured by a benchmark number, not a price. You trade its ETF instead." },
  { front: "What does the S&P 500 index track? What's its ETF?", back: "500 leading publicly traded U.S. companies — the best gauge of the entire stock market. ETF: $SPY. If S&P 500 is bullish → higher probability of bullish setups across the broad market." },
  { front: "What does the NASDAQ 100 track? What's its ETF?", back: "Top 100 non-financial companies — heavily tech-weighted. ETF: $QQQ. If NASDAQ is bullish → higher probability of bullish setups in tech stocks." },
  { front: "What does the Dow Jones track? What's its ETF?", back: "30 large blue-chip companies that are industry leaders and considered the backbone of the U.S. economy. ETF: $DIA. Key sectors: financials, healthcare, industrials, technology." },
  { front: "What does the Russell 2000 track? What's its ETF?", back: "2,000 of the smallest companies in the stock market — the benchmark for small-cap stocks. ETF: $IWM. First index to weaken in inflationary environments." },
  { front: "What is GDP and how does it affect stocks?", back: "Gross Domestic Product — total value of goods and services produced in a country. Growing GDP → higher revenues → stock prices rise. Contracting GDP → lower revenues → stock prices fall." },
  { front: "How does unemployment affect the stock market?", back: "High unemployment → weak economy → less consumer spending → lower company profits → bearish. Low unemployment → people have jobs/wages → more spending → higher profits → bullish." },
  { front: "What is CPI and why is it important for trading?", back: "Consumer Price Index — measures inflation (rate at which prices for goods/services rise). Higher CPI → higher interest rates → less spending → bearish. Lower CPI → lower rates → more spending → bullish. Always check the economic calendar for CPI release dates." },
  { front: "Why should you check the economic calendar before trading?", back: "Major data releases (CPI, GDP, employment) can cause the market to gap up or gap down — especially if released before market open. If you're in a trade, you'll be directly affected by the outcome." },
];

const GOLD = "#D4A843";
const BLACK = "#0D0D0D";
const CHARCOAL = "#1A1A1A";

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
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ color: GOLD, fontSize: 11, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>ADEXTRADES UNIVERSITY</div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>Lesson #2 Flashcards</div>
        <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>Here is where we trade!</div>
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ flex: 1, height: 6, background: "#2a2a2a", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${GOLD}, #e8c85a)`, borderRadius: 3, transition: "width 0.4s" }} />
        </div>
        <div style={{ color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>{known.size + reviewing.size}/{CARDS.length}</div>
      </div>

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

      <div style={{ maxWidth: 500, margin: "0 auto", perspective: 1000 }}>
        <div onClick={flip} style={{
          cursor: "pointer", position: "relative", height: 300,
          transformStyle: "preserve-3d",
          transition: animDir ? "transform 0.25s, opacity 0.25s" : "transform 0.5s",
          transform: `${flipped ? "rotateY(180deg)" : "rotateY(0)"} ${animDir === "right" ? "translateX(60px)" : animDir === "left" ? "translateX(-60px)" : ""}`,
          opacity: animDir ? 0.3 : 1,
        }}>
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
          <div style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(145deg, #1a1508, #1e1a10)`,
            border: `2px solid ${GOLD}`, borderRadius: 16,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: "30px 28px", boxSizing: "border-box",
          }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>ANSWER</div>
            <div style={{ color: "#e8e0d0", fontSize: 14, textAlign: "center", lineHeight: 1.6 }}>{current.back}</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", color: "#666", fontSize: 12, margin: "12px 0" }}>Card {idx + 1} of {total}</div>

      <div style={{ maxWidth: 500, margin: "0 auto", display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={() => next("review")} style={{
          flex: 1, padding: "14px 0", background: "transparent", border: "2px solid #E74C3C",
          color: "#E74C3C", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
        }} onMouseEnter={e => e.target.style.background = "#E74C3C20"} onMouseLeave={e => e.target.style.background = "transparent"}>
          ← Review Again
        </button>
        <button onClick={() => next("known")} style={{
          flex: 1, padding: "14px 0", background: "transparent", border: "2px solid #2ECC71",
          color: "#2ECC71", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
        }} onMouseEnter={e => e.target.style.background = "#2ECC7120"} onMouseLeave={e => e.target.style.background = "transparent"}>
          Got It →
        </button>
      </div>

      <div style={{ maxWidth: 500, margin: "16px auto 0", display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={shuffle} style={{ padding: "8px 20px", background: "#2a2a2a", color: "#aaa", border: "1px solid #3a3a3a", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>🔀 Shuffle</button>
        <button onClick={reset} style={{ padding: "8px 20px", background: "#2a2a2a", color: "#aaa", border: "1px solid #3a3a3a", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>↺ Reset</button>
      </div>

      <div style={{ textAlign: "center", color: "#444", fontSize: 11, marginTop: 16 }}>Space = flip · ← = review · → = got it</div>
    </div>
  );
}
