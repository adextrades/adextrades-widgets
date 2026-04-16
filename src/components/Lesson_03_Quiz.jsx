"use client";
import { useState } from "react";

const GOLD = "#D4A843";
const BLACK = "#0D0D0D";
const CHARCOAL = "#1A1A1A";
const GREEN = "#2ECC71";
const RED = "#E74C3C";
const CANDLE_GREEN = "#26A65B";
const CANDLE_RED = "#E74C3C";

const Candle = ({ type, size = 70 }) => {
  const h = size, w = size * 0.55, cx = w / 2, bw = w * 0.45;
  const cfgs = {
    shooter: { wt: 5, bt: h*0.7, bb: h*0.82, wb: h*0.88, c: CANDLE_RED },
    hammer: { wt: h*0.12, bt: h*0.18, bb: h*0.3, wb: h*0.95, c: CANDLE_GREEN },
    doji: { wt: h*0.1, bt: h*0.48, bb: h*0.52, wb: h*0.9, c: "#888" },
    strong_bear: { wt: h*0.05, bt: h*0.08, bb: h*0.95, wb: h*0.95, c: CANDLE_RED },
    green_shooter: { wt: 5, bt: h*0.7, bb: h*0.82, wb: h*0.88, c: CANDLE_GREEN },
  };
  const g = cfgs[type];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <line x1={cx} y1={g.wt} x2={cx} y2={g.bt} stroke={g.c} strokeWidth="2"/>
      <line x1={cx} y1={g.bb} x2={cx} y2={g.wb} stroke={g.c} strokeWidth="2"/>
      <rect x={cx-bw/2} y={g.bt} width={bw} height={Math.max(g.bb-g.bt,3)} fill={g.c} rx="1"/>
    </svg>
  );
};

const QUESTIONS = [
  {
    q: "What are the four elements (OHLC) of a Japanese candlestick?",
    options: ["Open, High, Low, Close", "Offset, Height, Length, Center", "Origin, Highest, Lowest, Current", "Open, Hold, Limit, Cut"],
    correct: 0,
    explain: "Every candlestick has four elements: Open (session start price), High (highest price), Low (lowest price), and Close (session end price). These four data points are the foundation of all price action analysis.",
  },
  {
    q: "A candle closes HIGHER than it opened. This candle is:",
    options: ["Bearish — indicating selling pressure", "Bullish — indicating buying pressure", "A doji — indicating indecision", "Neutral — neither bullish nor bearish"],
    correct: 1,
    explain: "When the close is higher than the open, it means price went up during the session. That's a bullish (green) candle. Bearish candles have the close lower than the open.",
  },
  {
    visual: "shooter",
    q: "What candlestick pattern is shown above? What is the most probable next direction?",
    options: ["Hammer — probable upside", "Shooter — probable downside", "Doji — indecision, wait", "Strong bullish close — probable upside"],
    correct: 1,
    explain: "This is a SHOOTER — characterized by a long upper wick with the body closing in the bottom 2/3 of the candle. Psychology: buyers pushed price up, but sellers overpowered them. Most probable next direction is DOWN.",
  },
  {
    visual: "hammer",
    q: "What candlestick pattern is shown above?",
    options: ["Shooter — sellers dominated", "Doji — indecision between buyers and sellers", "Hammer — buyers stepped in aggressively after sellers pushed price down", "Engulfing pattern — complete reversal"],
    correct: 2,
    explain: "This is a HAMMER — long lower wick, body closes in the top 2/3 of the candle. Sellers initially pushed price down, but buyers stepped in more aggressively and brought price back up. Most probable next direction: UP.",
  },
  {
    visual: "green_shooter",
    q: "This candle is GREEN but has a long upper wick with the body at the bottom. Is it bullish?",
    options: ["Yes — it's green so it's bullish", "No — it's still a shooter pattern; color doesn't change the psychology", "Yes — green always means price will go up next", "It depends on the timeframe"],
    correct: 1,
    explain: "Color does NOT matter for pattern recognition. A green shooter is still a shooter. The long upper wick tells you buyers tried to push up but sellers overpowered them. The psychology and probable next direction (DOWN) remain the same regardless of body color.",
  },
  {
    visual: "strong_bear",
    q: "This candle has almost no lower wick — it closes right at its low. What does this signal?",
    options: ["Indecision — wait for the next candle", "Weak selling — buyers are likely to take over", "Strong bearish close — aggressive sellers with high probability of continuation", "A hammer pattern forming"],
    correct: 2,
    explain: "A candle that closes at its low with no lower wick is a STRONG BEARISH CLOSE. Sellers were so dominant that buyers couldn't push price back up at all. This signals aggressive selling with a higher probability that the next candle continues bearish.",
  },
  {
    q: "What is the minimum number of consecutive same-color candles required for a CCRP setup?",
    options: ["2 candles", "3 candles", "5 candles", "7 candles"],
    correct: 1,
    explain: "A CCRP requires at least 3 consecutive candles of one color. Two is not enough. Three, four, five, six, or more all qualify. After you see 3+, watch for the first opposite-color candle.",
  },
  {
    q: "You see 5 green candles followed by a red candle. What should you do?",
    options: ["Immediately sell — the CCRP is confirmed", "Pay attention to the red candle but wait to see if price triggers 2 down off it", "Ignore it — 5 candles isn't enough for a CCRP", "Buy more — the uptrend will likely continue"],
    correct: 1,
    explain: "When you see the first opposite-color candle, you PAY ATTENTION but do NOT act yet. You wait for the next candle to trigger in the direction of the color change. For a bearish CCRP, price must trade BELOW the red candle. If it doesn't trigger, it's not a valid CCRP.",
  },
  {
    q: "After 4 green candles and a red color change, the next candle does NOT trade below the red candle. What happened?",
    options: ["The CCRP failed — take the trade anyway", "The CCRP didn't trigger — it's NOT a valid setup, do not trade it", "The CCRP is delayed — wait three more candles", "The pattern is invalid because you needed 5+ green candles"],
    correct: 1,
    explain: "If the CCRP doesn't trigger (price doesn't trade beyond the color-change candle), it is NOT a valid CCRP. Do NOT take the trade. The color change alone is just a signal to watch — the trigger is what confirms the pattern.",
  },
  {
    q: "A hammer forms on the monthly chart while a doji forms on the daily chart. Which pattern has more weight for predicting the next move?",
    options: ["The daily doji — it's the most recent data", "They're equal — timeframe doesn't affect pattern weight", "The monthly hammer — higher timeframes carry more magnitude", "Neither — you need a weekly pattern to decide"],
    correct: 2,
    explain: "Higher timeframe patterns carry far more weight than lower timeframe patterns. The monthly hammer suggests probable upside with significant magnitude. The daily doji (indecision) could resolve by triggering UP to fulfill the monthly hammer setup. Always check higher timeframes first.",
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

  const handleSelect = (idx) => { if (locked) return; setSelected(idx); setLocked(true); setResults(prev => [...prev, idx === question.correct]); };
  const handleNext = () => { if (currentQ + 1 >= total) setFinished(true); else { setCurrentQ(i => i+1); setSelected(null); setLocked(false); } };
  const handleRetry = () => { setCurrentQ(0); setSelected(null); setLocked(false); setResults([]); setFinished(false); };

  if (finished) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div>
          <div style={styles.headerTitle}>Lesson #3 Quiz</div>
          <div style={styles.headerSub}>The Basics of Price Action</div>
        </div>
        <div style={{ ...styles.scoreCard, background: passed ? "#071a0d" : "#1a0a0a", border: `2px solid ${passed ? GREEN+"70" : RED+"70"}` }}>
          <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 16px" }}>
            <svg viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/>
              <circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/>
            </svg>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div>
            </div>
          </div>
          <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
          <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>
            {results.map((c,i)=><div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>)}
          </div>
          <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div>
        <div style={styles.headerTitle}>Lesson #3 Quiz</div>
        <div style={styles.headerSub}>The Basics of Price Action</div>
      </div>

      <div style={{maxWidth:520,margin:"0 auto 8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{color:"#666",fontSize:12}}>Question {currentQ+1} of {total}</span>
          <span style={{color:"#666",fontSize:12}}>{results.filter(Boolean).length} correct so far</span>
        </div>
        <div style={{height:5,background:"#222",borderRadius:3,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:3,transition:"width 0.4s",width:`${((currentQ+(locked?1:0))/total)*100}%`,background:`linear-gradient(90deg,${GOLD},#e8c85a)`}}/>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"center",gap:5,margin:"12px auto 20px",maxWidth:520}}>
        {QUESTIONS.map((_, i) => {
          let bg = "#333";
          if (i < results.length) bg = results[i] ? GREEN : RED;
          else if (i === currentQ) bg = GOLD;
          return (
            <div key={i} style={{width: i === currentQ ? 20 : 8, height: 8, borderRadius: 4, background: bg, transition: "all 0.3s"}} />
          );
        })}
      </div>

      <div style={{maxWidth:520,margin:"0 auto",background:CHARCOAL,borderRadius:16,border:"1px solid #2a2a2a",overflow:"hidden"}}>
        <div style={{padding:"24px 24px 18px"}}>
          <div style={{display:"inline-block",padding:"3px 10px",borderRadius:4,background:GOLD+"15",color:GOLD,fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:12}}>QUESTION {currentQ+1}</div>

          {question.visual && (
            <div style={{display:"flex",justifyContent:"center",margin:"8px 0 14px",padding:"12px 20px",background:"#111",borderRadius:10,border:"1px solid #333"}}>
              <Candle type={question.visual} size={90}/>
            </div>
          )}

          <div style={{color:"#f0f0f0",fontSize:16,lineHeight:1.55,fontWeight:500}}>{question.q}</div>
        </div>

        <div style={{padding:"0 20px 20px"}}>
          {question.options.map((opt,oIdx)=>{
            const isThis=selected===oIdx,isAnswer=question.correct===oIdx;
            let bg="#1e1e1e",border="#333",textCol="#c0c0c0",circleBg="transparent",circleBorder="#444",circleText="#888";
            if(locked){if(isAnswer){bg=GREEN+"12";border=GREEN;textCol="#e0e0e0";circleBg=GREEN;circleBorder=GREEN;circleText="#fff";}else if(isThis){bg=RED+"12";border=RED;textCol="#aaa";circleBg=RED;circleBorder=RED;circleText="#fff";}else{bg="#151515";border="#252525";textCol="#555";circleBorder="#333";circleText="#444";}}
            return(
              <div key={oIdx} onClick={()=>handleSelect(oIdx)} style={{padding:"14px 16px",margin:"8px 0",borderRadius:12,background:bg,border:`1.5px solid ${border}`,cursor:locked?"default":"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,border:`2px solid ${circleBorder}`,background:circleBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:circleText,transition:"all 0.2s"}}>{locked&&isAnswer?"✓":locked&&isThis&&!isAnswer?"✗":String.fromCharCode(65+oIdx)}</div>
                <span style={{color:textCol,fontSize:14,lineHeight:1.45,transition:"color 0.2s"}}>{opt}</span>
              </div>
            );
          })}
        </div>

        {locked&&(
          <div style={{margin:"0 20px 20px",padding:"16px 18px",borderRadius:12,background:isCorrect?"#0a1f12":"#1f0a0a",border:`1px solid ${isCorrect?GREEN+"30":RED+"30"}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{fontSize:16,width:24,height:24,borderRadius:"50%",background:isCorrect?GREEN+"25":RED+"25",display:"flex",alignItems:"center",justifyContent:"center",color:isCorrect?GREEN:RED}}>{isCorrect?"✓":"✗"}</div>
              <span style={{color:isCorrect?GREEN:RED,fontSize:14,fontWeight:700}}>{isCorrect?"Correct!":"Not quite."}</span>
            </div>
            <div style={{color:"#b0a898",fontSize:13,lineHeight:1.6}}>{question.explain}</div>
          </div>
        )}
      </div>

      {locked&&<div style={{maxWidth:520,margin:"20px auto 0"}}><button onClick={handleNext} style={styles.nextBtn}>{currentQ+1>=total?"See Results":"Next Question →"}</button></div>}
    </div>
  );
}

const styles={
  container:{minHeight:"100vh",background:`linear-gradient(160deg,${BLACK} 0%,#12100a 50%,#0d0d0d 100%)`,fontFamily:"'Segoe UI',system-ui,-apple-system,sans-serif",padding:"20px 16px",boxSizing:"border-box"},
  header:{textAlign:"center",marginBottom:20},
  headerLabel:{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:700,marginBottom:4},
  headerTitle:{color:"#fff",fontSize:22,fontWeight:700},
  headerSub:{color:"#777",fontSize:13,marginTop:2},
  scoreCard:{maxWidth:520,margin:"0 auto",borderRadius:20,padding:"32px 28px",display:"flex",flexDirection:"column",alignItems:"center"},
  nextBtn:{width:"100%",padding:"15px 0",background:`linear-gradient(135deg,${GOLD},#c49b30)`,color:BLACK,border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:"pointer",transition:"all 0.2s",letterSpacing:0.3},
};
