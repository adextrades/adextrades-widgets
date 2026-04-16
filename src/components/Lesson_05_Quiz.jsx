"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS = [
  { q:"Price action answers the ___ and market structure answers the ___.",
    options:["'what' and 'when'","'why' and 'how'","'how' and 'why'","'when' and 'where'"],
    correct:1, explain:"Price action answers WHY price moves (through candlestick analysis and behavior). Market structure answers HOW price moves (the organizational framework of trends, breaks, and shifts)." },
  { q:"A stock creates a low at $140, a high at $155, then pulls back to $148. Is this an uptrend?",
    options:["Yes — $148 is higher than $140, so it's a higher low","Not confirmed yet — you need a Break of Structure (price above $155) to confirm","Yes — the pullback is normal in uptrends","No — the pullback means it's a downtrend"],
    correct:1, explain:"A higher low is POTENTIAL until confirmed by a BOS. The $148 level looks like a higher low, but you don't know empirically until price breaks above the $155 swing high. Until then, price could continue down below $140 and it's actually a downtrend." },
  { q:"In an uptrend, a Break of Structure (BOS) occurs when price:",
    options:["Breaks below the most recent higher low","Creates a doji candle at resistance","Breaks ABOVE the previous swing high, confirming trend continuation","Touches the 0.618 Fibonacci level"],
    correct:2, explain:"BOS in an uptrend = breaking above the previous swing high. This confirms that the higher low is valid and the uptrend is continuing. Despite the name 'breaking,' BOS actually means the trend is intact." },
  { q:"A stock is in an uptrend (HH, HL, HH, HL). Then price breaks below the most recent higher low. This is called:",
    options:["Break of Structure (BOS) — trend continues","A healthy pullback — expect a bounce","Market Structure Shift (MSS) / Change of Character (CHoCH) — potential trend reversal","A liquidity sweep — price will return to the upside"],
    correct:2, explain:"When price breaks below the most recent higher low in an uptrend, that's a Market Structure Shift (MSS) or Change of Character (CHoCH). The uptrend structure is broken, and a potential trend change is underway. MSS = break AGAINST the prevailing trend." },
  { q:"What is the difference between BOS and MSS?",
    options:["BOS is for uptrends; MSS is for downtrends","BOS confirms trend CONTINUATION; MSS signals potential trend REVERSAL","They're the same thing with different names","BOS uses Fibonacci; MSS uses trendlines"],
    correct:1, explain:"BOS = break IN the direction of the trend (confirms continuation). MSS = break AGAINST the prevailing trend (signals potential reversal). In an uptrend: BOS = new high, MSS = break below the higher low." },
  { q:"Where is the Optimal Trade Entry (OTE) zone located?",
    options:["At the exact swing high or swing low","Between the 0.5 and 0.786 Fibonacci retracement of the swing leg","At the 0.236 Fibonacci level","Above the swing high (breakout entry)"],
    correct:1, explain:"OTE is the zone between 0.5 and 0.786 of the Fibonacci retracement. This is where price is most likely to reverse and continue the prevailing trend. The 0.618 (golden pocket) is the most common reversal point within this zone." },
  { q:"You draw fibs from swing low to swing high. Price pulls back to the 0.5 level and reverses. Your trading partner says 'I'm waiting for the 0.618.' What's the risk?",
    options:["No risk — 0.618 is always the best entry","They may miss the trade entirely — OTE is a ZONE from 0.5 to 0.786, and price can reverse at 0.5","They should wait for 0.786 instead","The 0.5 reversal will fail — 0.618 is required"],
    correct:1, explain:"OTE is a ZONE, not a single line. Price can reverse at 0.5, 0.55, 0.618, or anywhere up to 0.786. If you fixate on 0.618 exclusively, you risk watching the trade leave without you when price reverses at 0.5. The 0.618 is the MOST COMMON reversal, but not guaranteed." },
  { q:"Price closes below the 0.786 Fibonacci level. What should you do?",
    options:["Hold — it will bounce back","Double down — cheaper entry","Consider exiting — OTE is likely invalid and the trend may be reversing","Move your stop loss lower and wait"],
    correct:2, explain:"The 0.786 is the 'last line of defense.' If price closes below it, OTE is likely invalid — the assumption is that price won't reverse and will instead break the swing low. Consider exiting the position to preserve capital." },
  { q:"What are the three rules of liquidity?",
    options:["Liquidity is rare; liquidity is random; liquidity is harmless","Liquidity is everywhere; liquidity is defined by stop-losses; liquidity is used to manipulate price","Liquidity only exists at round numbers; liquidity helps retail traders; liquidity prevents gaps","Liquidity is created by news; liquidity flows upward; liquidity equals volume"],
    correct:1, explain:"1) Liquidity is EVERYWHERE — it's fuel for price to move. 2) Liquidity is defined by STOP-LOSSES — where retail places stops = liquidity pools. 3) Liquidity is used to MANIPULATE price — institutions sweep stops before the real move." },
  { q:"You see a stock consolidate for two weeks, then sweep above all-time highs before immediately flushing lower. What just happened?",
    options:["A normal breakout that failed","Accumulation → Manipulation → Distribution — the sweep of ATH was a liquidity grab before the real downside move","A BOS confirming the uptrend","Random price action with no structural significance"],
    correct:1, explain:"This is the classic Accumulation → Manipulation → Distribution cycle. The consolidation was accumulation. The sweep above all-time highs grabbed buyside liquidity (manipulation). Then price distributed in its true intended direction (down). This is why the $MA example swept ATH before dropping to the gap fill." },
];

export default function Quiz(){
  const[currentQ,setCurrentQ]=useState(0);const[selected,setSelected]=useState(null);const[locked,setLocked]=useState(false);
  const[results,setResults]=useState([]);const[finished,setFinished]=useState(false);
  const total=QUESTIONS.length;const question=QUESTIONS[currentQ];const isCorrect=selected===question?.correct;
  const score=results.filter(Boolean).length;const pct=Math.round((score/total)*100);const passed=pct>=PASS_PCT;
  const handleSelect=(idx)=>{if(locked)return;setSelected(idx);setLocked(true);setResults(prev=>[...prev,idx===question.correct]);};
  const handleNext=()=>{if(currentQ+1>=total)setFinished(true);else{setCurrentQ(i=>i+1);setSelected(null);setLocked(false);}};
  const handleRetry=()=>{setCurrentQ(0);setSelected(null);setLocked(false);setResults([]);setFinished(false);};

  if(finished){return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #5 Quiz</div><div style={styles.headerSub}>Market Structure 101</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #5 Quiz</div><div style={styles.headerSub}>Market Structure 101</div></div>
    <div style={{maxWidth:520,margin:"0 auto 8px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#666",fontSize:12}}>Question {currentQ+1} of {total}</span><span style={{color:"#666",fontSize:12}}>{results.filter(Boolean).length} correct so far</span></div><div style={{height:5,background:"#222",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,transition:"width 0.4s",width:`${((currentQ+(locked?1:0))/total)*100}%`,background:`linear-gradient(90deg,${GOLD},#e8c85a)`}}/></div></div>
    <div style={{display:"flex",justifyContent:"center",gap:5,margin:"12px auto 20px",maxWidth:520}}>
      {QUESTIONS.map((_,i)=>{let bg="#333";if(i<results.length)bg=results[i]?GREEN:RED;else if(i===currentQ)bg=GOLD;return(<div key={i} style={{width:i===currentQ?20:8,height:8,borderRadius:4,background:bg,transition:"all 0.3s"}}/>);})}
    </div>
    <div style={{maxWidth:520,margin:"0 auto",background:CHARCOAL,borderRadius:16,border:"1px solid #2a2a2a",overflow:"hidden"}}>
      <div style={{padding:"24px 24px 18px"}}><div style={{display:"inline-block",padding:"3px 10px",borderRadius:4,background:GOLD+"15",color:GOLD,fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:12}}>QUESTION {currentQ+1}</div><div style={{color:"#f0f0f0",fontSize:16,lineHeight:1.55,fontWeight:500}}>{question.q}</div></div>
      <div style={{padding:"0 20px 20px"}}>{question.options.map((opt,oIdx)=>{
        const isThis=selected===oIdx,isAnswer=question.correct===oIdx;
        let bg="#1e1e1e",border="#333",textCol="#c0c0c0",circleBg="transparent",circleBorder="#444",circleText="#888";
        if(locked){if(isAnswer){bg=GREEN+"12";border=GREEN;textCol="#e0e0e0";circleBg=GREEN;circleBorder=GREEN;circleText="#fff";}else if(isThis){bg=RED+"12";border=RED;textCol="#aaa";circleBg=RED;circleBorder=RED;circleText="#fff";}else{bg="#151515";border="#252525";textCol="#555";circleBorder="#333";circleText="#444";}}
        return(<div key={oIdx} onClick={()=>handleSelect(oIdx)} style={{padding:"14px 16px",margin:"8px 0",borderRadius:12,background:bg,border:`1.5px solid ${border}`,cursor:locked?"default":"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,border:`2px solid ${circleBorder}`,background:circleBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:circleText,transition:"all 0.2s"}}>{locked&&isAnswer?"✓":locked&&isThis&&!isAnswer?"✗":String.fromCharCode(65+oIdx)}</div>
          <span style={{color:textCol,fontSize:14,lineHeight:1.45,transition:"color 0.2s"}}>{opt}</span></div>);})}</div>
      {locked&&(<div style={{margin:"0 20px 20px",padding:"16px 18px",borderRadius:12,background:isCorrect?"#0a1f12":"#1f0a0a",border:`1px solid ${isCorrect?GREEN+"30":RED+"30"}`}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{fontSize:16,width:24,height:24,borderRadius:"50%",background:isCorrect?GREEN+"25":RED+"25",display:"flex",alignItems:"center",justifyContent:"center",color:isCorrect?GREEN:RED}}>{isCorrect?"✓":"✗"}</div><span style={{color:isCorrect?GREEN:RED,fontSize:14,fontWeight:700}}>{isCorrect?"Correct!":"Not quite."}</span></div>
        <div style={{color:"#b0a898",fontSize:13,lineHeight:1.6}}>{question.explain}</div></div>)}
    </div>
    {locked&&(<div style={{maxWidth:520,margin:"20px auto 0"}}><button onClick={handleNext} style={styles.nextBtn}>{currentQ+1>=total?"See Results":"Next Question →"}</button></div>)}
    </div>);
}

const styles={container:{minHeight:"100vh",background:`linear-gradient(160deg,${BLACK} 0%,#12100a 50%,#0d0d0d 100%)`,fontFamily:"'Segoe UI',system-ui,-apple-system,sans-serif",padding:"20px 16px",boxSizing:"border-box"},header:{textAlign:"center",marginBottom:20},headerLabel:{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:700,marginBottom:4},headerTitle:{color:"#fff",fontSize:22,fontWeight:700},headerSub:{color:"#777",fontSize:13,marginTop:2},scoreCard:{maxWidth:520,margin:"0 auto",borderRadius:20,padding:"32px 28px",display:"flex",flexDirection:"column",alignItems:"center"},nextBtn:{width:"100%",padding:"15px 0",background:`linear-gradient(135deg,${GOLD},#c49b30)`,color:BLACK,border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:"pointer",transition:"all 0.2s",letterSpacing:0.3}};
