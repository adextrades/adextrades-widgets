"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"According to #TheStrat, price can move in how many ways?",
   options:["Two — up or down","Three — inside (1), directional (2), outside (3)","Four — up, down, sideways, and volatile","Five — one for each timeframe"],
   correct:1,explain:"#TheStrat identifies three scenarios: Scenario 1 (inside bar — consolidation), Scenario 2 (directional — breaks one side), Scenario 3 (outside bar — breaks both sides). Every candle on every timeframe falls into one of these three categories."},
  {q:"A candle has a lower high AND a higher low compared to the previous candle. What Strat scenario is this?",
   options:["Scenario 2u — directional up","Scenario 3 — outside bar","Scenario 1 — inside bar (consolidation)","Scenario 2d — directional down"],
   correct:2,explain:"A lower high AND higher low = the candle stayed INSIDE the previous candle's range. That's a Scenario 1 (inside bar), representing consolidation, indecision, or equilibrium. Action: wait for the next candle to break one side."},
  {q:"A green candle breaks the LOW of the previous candle but not the high. What is it?",
   options:["A 2u candle — it's green so it's bullish","A 1 bar — it didn't break both sides","A 2d candle — it broke only the low, regardless of color","A 3 bar — green means aggression"],
   correct:2,explain:"Color does NOT matter in #TheStrat. If a candle breaks only the low of the previous candle, it's a 2d — period. A green candle that breaks the downside is still a 2d. The scenario is determined by PRICE relative to the previous candle, not by color."},
  {q:"A candle breaks the high of the previous candle, then reverses and also breaks the low. What scenario is this?",
   options:["Still a 2u — it broke the high first","A 1 bar — the moves cancelled out","A scenario 3 (outside bar) — it broke BOTH sides, with sellers showing aggression","A failed trade — ignore it"],
   correct:2,explain:"When a candle breaks both the high AND the low of the previous candle, it's a Scenario 3 (outside bar). A 3 cannot form without first being a 2. Since it started as 2u then reversed to break the low, sellers showed aggression (the secondary side). Scenario 3 = broadening formation on a lower timeframe."},
  {q:"Why is a Scenario 3 considered a broadening formation on a lower timeframe?",
   options:["Because 3 bars always appear on monthly charts","Because it creates a higher high AND lower low vs. the previous candle — the definition of a broadening","Because it requires three consecutive candles","Because Rob Smith named it that way"],
   correct:1,explain:"A Scenario 3 creates a higher high AND a lower low compared to the previous candle. High to higher high + low to lower low = broadening formation by definition. If you zoom into a lower timeframe, you'll see the expanding range that formed within that one candle."},
  {q:"All timeframes (D, W, M, Q, Y) are trading below their respective opens. What is this called?",
   options:["Timeframe conflict — avoid trading","Full Timeframe Continuity (FTFC) to the downside — institutions are selling","A Scenario 1 across all timeframes","A market structure shift on the yearly"],
   correct:1,explain:"When all timeframes are aligned in the same direction (all below opens = bearish FTFC), institutions are positioned short. This is the highest probability environment for bearish trades. You want to trade in alignment with FTFC — be in puts/short the market."},
  {q:"You see a hammer form on the daily chart after a downtrend. When do you enter the trade?",
   options:["Immediately — buy calls as soon as you see the hammer","Wait for the next daily candle to trade ABOVE the hammer's high — that's your entry","Wait for two more hammer candles to confirm","Enter at the close of the hammer candle"],
   correct:1,explain:"Never trade the signal candle itself. For hammers, wait for the NEXT candle to open and trade above the hammer's high. If the next day gaps down below the hammer, there is no entry. You want the trigger to break in force — with strength, not just wicking."},
  {q:"An inside bar forms on the weekly chart. The next week opens and breaks above the inside bar's high with strength. What do you do?",
   options:["Wait for the candle to close before entering","Enter calls — this is an inside bar breakout to the upside (actionable signal)","Ignore it — inside bars aren't tradeable","Wait for a third candle to confirm"],
   correct:1,explain:"An inside bar breakout is an actionable signal. When the next candle breaks the high of the inside bar IN FORCE (with strength, not wicking), you enter. According to #TheStrat, you take the trade at the break — you don't wait for the candle to close."},
  {q:"An inside bar breaks to the downside (2d), fails, reverses, and breaks through the high of the inside bar. What just happened?",
   options:["A market structure shift","A failed CCRP","A Rev Strat — reversal of the inside bar breakout","A scenario 3 formation"],
   correct:2,explain:"This is a Rev Strat (reversal strategy). Inside bar formed (equilibrium) → broke 2d (broke downside) → failed → reversed through the high. The reversal of equilibrium is a universal truth. Once price crosses above 50% of the inside bar, higher probability of taking out the high."},
  {q:"A 4-week shooter triggers 2d on week 1, but the stock pulls back up during week 2. Is the setup dead?",
   options:["Yes — if it doesn't go immediately, it failed","No — a 4-week participant has up to 4 weeks for the move to play out; the setup isn't invalidated yet","Yes — shooters only work on the daily timeframe","No — but only if the weekly is also a shooter"],
   correct:1,explain:"Participation groups determine how long a trade can take. A 4-week shooter has up to 4 weeks for the move to play out. Week 1 trigger + week 2 pullback is normal. The setup isn't invalidated until the timeframe period expires or the trigger structurally fails. Higher timeframes give more leeway."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #6 Quiz</div><div style={styles.headerSub}>Introducing: #TheStrat</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #6 Quiz</div><div style={styles.headerSub}>Introducing: #TheStrat</div></div>
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
