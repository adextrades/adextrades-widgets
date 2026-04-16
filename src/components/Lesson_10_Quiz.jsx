"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"What's the FIRST question you should answer before building a thesis?",
   options:["What's my position size?","What timeframe is my thesis based on?","What's the news catalyst?","What's the sector doing?"],
   correct:1,explain:"Your thesis timeframe drives everything — entry, invalidation, target, holding period. If you don't define it first, you'll cherry-pick signals across random timeframes to confirm your bias. Pick your thesis timeframe BEFORE looking for confluences."},
  {q:"Your bias is a 2-1-2u on the weekly chart. What's your invalidation?",
   options:["Any red candle on the daily","A candle CLOSE below the inside bar on the weekly","A wick below the inside bar","The price reaching your target"],
   correct:1,explain:"The reason you enter is the reason you exit. A 2-1-2u bias is invalidated by a 2-1-2d — specifically, a candle CLOSE below the inside bar on your thesis timeframe (the weekly in this case). Daily noise and wicks don't count. Only a weekly close."},
  {q:"You're in a 2-1-2u trade. Price wicks below the inside bar's low but closes back above it. What should you do?",
   options:["Exit immediately — it touched invalidation","Hold — invalidation requires a candle CLOSE, not a wick","Double your position","Move your stop to break-even and hope"],
   correct:1,explain:"Wicks are not invalidation. Invalidation requires a candle CLOSE below the inside bar on your thesis timeframe. Wicks are normal price action — often liquidity sweeps that grab stops before price reverses. Stay in until you get a close beyond the level."},
  {q:"A trader justifies holding an invalidated position by saying: 'But what if the next candle does a 1-3-2 up?' What's the problem with this reasoning?",
   options:["Nothing — that's smart trading","1-3-2s don't exist","It's subjectivity creeping in; the chart objectively invalidated, and the Strat removes subjectivity","They're waiting for too many confirmations"],
   correct:2,explain:"The whole point of the Strat is objectivity. 'What if' reasoning is exactly how traders hold losers and blow up accounts. If price objectively invalidated your thesis (candle close beyond invalidation), you should objectively be out. You can back-test whether waiting for an extra candle improves results — but you don't add that subjectivity IN THE MOMENT when a position is red."},
  {q:"What's the minimum number of confluences you should have for a tradable setup?",
   options:["1 — if it's strong enough","3","5 to 10","At least 50"],
   correct:2,explain:"Aim for 5 to 10 confluences minimum. On Strat-rich charts (like the $AAOK lesson example), you'll often find 15+. Confluence equals confidence — the more signals stacking in your direction across multiple pillars and timeframes, the higher the probability the setup plays out."},
  {q:"Why should you build BOTH a bullish and a bearish confluence list for every chart?",
   options:["To confuse yourself","To stay objective and remove confirmation bias","Because the market is always rigged","To impress other traders"],
   correct:1,explain:"If you only look for signals that support your initial lean, that's confirmation bias, not analysis. Building both lists forces objectivity. If your thesis is truly strong, one side will dramatically outweigh the other (e.g., 16 bullish vs 4 bearish). If the counts are close, the trade isn't there."},
  {q:"In the $AAOK example, the bullish count was 16 and the bearish count was 4. What does this indicate?",
   options:["A weak setup — too close to call","A strong, dominant bullish thesis","A bearish reversal is imminent","The market is uncertain"],
   correct:1,explain:"A 4-to-1 dominance is a strong bullish thesis. The 4 bearish items in that example (potential retrace into bullish OTE, possible supply sweep, etc.) don't truly invalidate the bullish case — they just describe possible paths price could take before eventually going up. When one side dramatically outweighs the other, you have a clear setup."},
  {q:"What's a 'machine gun trigger'?",
   options:["A fast-moving stock","A day-trading strategy","Multiple Strat setups across timeframes stacked at similar prices, where one candle triggers them all","A type of reversal pattern"],
   correct:2,explain:"A machine gun trigger is when triggers from multiple timeframes (e.g., daily 2-1-2u, 2-day 2-1-2u, weekly 2-2 rev) cluster within a few cents/dollars of each other. A single candle can break all of them at once, cascading targets across timeframes. These are explosive setups because each target becomes the next setup's entry."},
  {q:"What's the 'icing on the cake' confluence?",
   options:["A candle pattern everyone recognizes","The ONE personal confluence that converts a 'maybe' setup into a definite 'yes' for you","The final target of a trade","A type of Strat combo"],
   correct:1,explain:"Over time, through back-testing, each trader finds one specific confluence that functions as their personal 'I'm definitely taking this' signal. For Adex, it's FTFC. For Abi, it's market structure. Your icing-on-the-cake confluence is the final piece that makes you pull the trigger. Different traders have different ones."},
  {q:"You built bull and bear lists. You have 7 bullish confluences and 6 bearish. What should you do?",
   options:["Trade the bullish thesis — bulls outnumber bears","Trade the bearish thesis — they're close enough","Skip the trade — the counts are too close for clarity","Average into both directions"],
   correct:2,explain:"A 7-vs-6 split means the chart doesn't have clarity. The setup isn't there. Move on to the next ticker. The best trades come from charts where one direction dramatically outweighs the other (e.g., 16 vs 4). Close counts mean you're looking at a coin flip, not a setup."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #10 Quiz</div><div style={styles.headerSub}>Building Your Trade Thesis</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #10 Quiz</div><div style={styles.headerSub}>Building Your Trade Thesis</div></div>
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
