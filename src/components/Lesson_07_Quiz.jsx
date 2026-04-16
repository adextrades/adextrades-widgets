"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"You see a 2d candle, then an inside bar, then a 2u candle. What Strat combo is this?",
   options:["A 2-1-2u inside bar REVERSAL (bullish)","A 2-1-2u inside bar CONTINUATION","A 3-1-2 setup","A rev strat"],
   correct:0,explain:"2d → 1 → 2u = the third candle breaks in the OPPOSITE direction of the first. That's a 2-1-2u reversal. If the third candle broke in the same direction (2d → 1 → 2d), that would be a continuation."},
  {q:"For a 2-1-2u setup, where is the entry and where is the target?",
   options:["Entry at the high of the 2d candle; target at the inside bar's high","Entry at the high of the inside bar; target at the prior candle's high (look left)","Entry at the close of the 2u candle; target at the next candle's high","Entry at the open of the inside bar; target at the 2u candle's close"],
   correct:1,explain:"Entry = break of the inside bar's HIGH. Target = prior candle's HIGH (always look left). This universal rule applies to all Strat combos — break a high, target the prior candle's high."},
  {q:"Is the entry different for a 2-1-2 reversal vs. a 2-1-2 continuation?",
   options:["Yes — reversals enter at 50%, continuations at the break","Yes — reversals use the 0.618 Fibonacci level","No — the entry and target mechanics are identical for both","Yes — continuations have no target"],
   correct:2,explain:"The entry and target are the SAME regardless of whether it's a reversal or continuation. Entry = break of the inside bar. Target = prior candle's high or low. You don't need to predict which type it will be — just trade whichever side breaks."},
  {q:"What's the difference between a 2-1-2 and a 3-1-2 setup?",
   options:["The 3-1-2 has three inside bars instead of one","The first candle is a scenario 3 (outside bar) instead of a 2 — so the target is further away","The 3-1-2 only works on the weekly timeframe","The entry is at 50% for a 3-1-2"],
   correct:1,explain:"Same structure, same entry mechanics (break the inside bar). The only difference is the first candle is a 3 bar (wider range), so the target is further away since you're targeting the 3 bar's high or low instead of a 2 bar's."},
  {q:"In a 1-3 Rev Strat to the upside, when do you enter?",
   options:["As soon as the inside bar forms","When the failed 2d breakout occurs","When price reverses past 50% of the inside bar — threatening to take out the high","When the 3 bar closes"],
   correct:2,explain:"The 1-3 Rev Strat entry is when price crosses ABOVE 50% of the inside bar (for bullish). At that point, there's higher probability of taking out the inside bar's high (Target 1) and then the prior candle's high (Target 2). The failed breakout becomes fuel for the reversal."},
  {q:"A stock has a triple inside bar on the 6-day chart. It breaks to the upside. How many extension candles can you potentially get?",
   options:["1 — inside bars only give one extension","6 — one for each day in the 6-day period","3 — one for each inside bar in the consolidation","Unlimited — there's no expected number"],
   correct:2,explain:"The coiled spring rule: the number of sessions/bars you consolidate for = the number of extension candles you can POTENTIALLY get. Triple inside = potential for 3 extension candles. This isn't guaranteed, but it's the expectation when consolidation energy releases."},
  {q:"A 2-1-2u setup triggers. The next candle wicks below the inside bar's low but closes back above it. Has the setup been invalidated?",
   options:["Yes — it touched the invalidation level","No — only a candle CLOSE below the inside bar invalidates the setup","Yes — any price below the inside bar invalidates it","It depends on the timeframe"],
   correct:1,explain:"A wick alone does NOT invalidate a Strat setup. Only a candle CLOSE beyond the invalidation level counts. Wicks through invalidation happen frequently (liquidity sweeps) and price often reverses. 'The reason you enter is the reason you exit' — and a wick isn't a close."},
  {q:"'The reason you enter is the reason you exit.' What invalidates a 2-1-2u setup?",
   options:["Any red candle after the trigger","A wick below the prior candle's low","A 2-1-2d — a candle CLOSE below the inside bar (the opposite of your entry thesis)","Three consecutive red candles"],
   correct:2,explain:"If you entered because of a 2-1-2u (broke above the inside bar), the setup is invalidated by the opposite: a 2-1-2d (candle closes below the inside bar). Your entry thesis was bullish above the inside bar — it's invalidated by bearish below it."},
  {q:"$AMGN has a double inside day. The daily 2-1-1-2u target happens to be the entry for a 2-1-2u on the 2-day chart. What is this concept called?",
   options:["Timeframe conflict","Full Timeframe Continuity","Multi-timeframe relay — one combo's target becomes the next TF's entry","A quadruple inside setup"],
   correct:2,explain:"This is the multi-timeframe relay: one combo's TARGET on a lower timeframe becomes the ENTRY for a combo on a higher timeframe. The daily triggers into the 2-day, the 2-day into the 3-day. Each timeframe 'passes the baton.' More TFs aligned = higher conviction."},
  {q:"Why should you use a top-down approach when analyzing Strat combos?",
   options:["Because lower timeframes are unreliable","Because the highest timeframe target has the most magnitude — then you work down to find the pathway","Because you should only trade the quarterly chart","Because top-down is faster than bottom-up"],
   correct:1,explain:"Start with the highest timeframe signal (quarterly hammer, monthly 2-1-2, etc.) — this has the most magnitude. Then work DOWN to find the pathway: how does the daily trigger the weekly? How does the weekly trigger the monthly? If you see the domino chain, you know the pathway to the highest-magnitude target. This is exactly how the $WMT quarterly hammer was reached through weekly → monthly → quarterly triggers."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #7 Quiz</div><div style={styles.headerSub}>Our Favorite Combos</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #7 Quiz</div><div style={styles.headerSub}>Our Favorite Combos</div></div>
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
