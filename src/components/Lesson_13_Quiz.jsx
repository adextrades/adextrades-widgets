"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"You own a call with a premium of $3.00 and delta of 0.40. The stock rises $1. What's the new premium?",
   options:["$3.00 — premium doesn't change","$3.40 — add delta to premium","$3.04 — add delta/10","$4.00 — double the delta"],
   correct:1,explain:"Delta measures the rate of change per $1 move in the underlying. Add delta to the old premium: $3.00 + $0.40 = $3.40. Delta is your premium's speed — it tells you directly how much your contract gains for each $1 the stock moves."},
  {q:"You own a call with premium $2.50 and theta of -$0.30. One day passes, stock price unchanged. What's the new premium?",
   options:["$2.50 — no change, stock didn't move","$2.80 — theta adds to premium","$2.20 — subtract theta (time decay)","$2.47 — theta divided by 10"],
   correct:2,explain:"Theta is ALWAYS negative for long options. Every day that passes decays your premium by the theta amount, assuming the stock price stays the same. $2.50 − $0.30 = $2.20. You lost $30 per contract just from time passing."},
  {q:"A contract has delta of 0.30 and theta of -$0.50. What's the delta-theta ratio, and should you buy it?",
   options:["2:1 — perfect, buy it","3:1 — great contract","0.6:1 — theta exceeds delta, AVOID","1:1 — neutral, take the trade"],
   correct:2,explain:"Delta (0.30) / Theta (0.50) = 0.6:1 — theta is LARGER than delta. This means every day that passes costs you more than a $1 move gains. You'd need the stock to move $2+ just to offset one day of theta. The Greeks are fighting you. Avoid this contract — you need minimum 2:1, ideally 3:1 or better."},
  {q:"What's the minimum acceptable delta-theta ratio for a contract you'd buy?",
   options:["1:1","2:1","5:1","10:1"],
   correct:1,explain:"Delta must be AT LEAST 2× theta. A 2:1 ratio is the minimum acceptable. 3:1 or 4:1 is better. Below 2:1 the Greeks are working against you and the contract is statistically unprofitable even if your direction is right. This is why weeklies often fail this check."},
  {q:"Why do weeklies often fail the delta-theta ratio test?",
   options:["They're too cheap","Their theta is frequently 2-3× their delta, making them structurally unprofitable","They have no delta","Institutions manipulate weekly prices"],
   correct:1,explain:"Inside 30 days to expiration, theta decay accelerates exponentially. On weeklies, theta is often 2-3× the size of delta — meaning even if you're directionally right, the daily theta bite will exceed your gains. Institutions SELL weeklies to retail precisely because the Greeks favor the seller."},
  {q:"You own a call with delta 0.30, gamma 0.10, premium $2.50. The stock rises $1. What's the new premium?",
   options:["$2.80 — just add delta","$2.90 — add gamma to delta, then add to premium","$2.60 — subtract gamma from delta","$3.00 — gamma doubles delta"],
   correct:1,explain:"Gamma accelerates delta. First add gamma to delta: 0.30 + 0.10 = 0.40. Then add that new delta to the premium: $2.50 + $0.40 = $2.90. This is why your profit curve accelerates as price approaches your strike — gamma keeps boosting delta, delta keeps boosting premium."},
  {q:"Why does your contract sometimes 'explode' in value as price approaches your strike?",
   options:["The broker adjusts the price","Random market noise","Gamma — it accelerates delta, which accelerates premium, creating an exponential profit curve","IV increases"],
   correct:2,explain:"Gamma is the acceleration. Each incremental $1 move in the stock adds more to delta, which in turn produces a bigger premium jump on the NEXT $1 move. The closer you get to your strike, the higher gamma climbs, and the profit curve becomes exponential. This is why a contract can go from -50% to +10% in minutes near the strike."},
  {q:"Your thesis is a weekly chart 1-3-2u setup. What's the minimum expiration you should buy?",
   options:["Same-day expiration — cheap","1 day out","2-4 weeks out","6 months out"],
   correct:2,explain:"Rule: buy 2-4× your thesis timeframe. Weekly thesis → 2-4 weeks minimum (ideally 4-6 weeks). A weekly setup takes up to a week to play out, so you need buffer time for theta. Buying 1 week out or less means theta will crush you if the setup needs to breathe."},
  {q:"You're bearish on $UPS. You want downside, but you're not 100% sure price will hit the $82 monthly target. Should you buy $82 OTM puts or $85 ATM puts?",
   options:["$82 OTM puts — cheaper is better","$85 ATM puts — ASAP method gives you delta immediately even on partial moves","The closer-dated weeklies","Don't trade it at all"],
   correct:1,explain:"When you're not 100% sure the target will hit, use the ASAP method (ATM/ITM). You get delta exposure immediately — every $1 drop in $UPS directly gains you money. You don't need the exact $82 target to be hit to profit. OTM contracts need price to actually reach your target to pay off, which adds risk when you're uncertain."},
  {q:"$NVDA has 136% IV the day before earnings. You're bullish. Should you buy calls now?",
   options:["Yes — high IV is great","No — avoid IV crush; even if you're right, premium can drop 50% when IV normalizes","Yes, but only weeklies","Yes, but only deep ITM"],
   correct:1,explain:"Normal IV is 20-40%. At 136%, the market has priced in a massive expected move. After earnings, IV collapses back to normal — this is 'IV crush.' Even if you're directionally right, the IV drop alone can cut your premium in half. Avoid buying into inflated IV unless you specifically understand and accept this risk."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #13 Quiz</div><div style={styles.headerSub}>The Right Contract</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #13 Quiz</div><div style={styles.headerSub}>The Right Contract</div></div>
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
