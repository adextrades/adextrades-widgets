"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"What are the four pillars of a trading thesis?",
   options:["Entries, Stops, Targets, Position Size","Charting Basics, Technical Analysis, Market Structure, #TheStrat","Fundamentals, Technicals, Sentiment, Flow","Support, Resistance, Trend, Momentum"],
   correct:1,explain:"The four pillars are: 1) Charting Basics (candlestick patterns, CCRP), 2) Technical Analysis (trends, broadening, gaps), 3) Market Structure (BOS/MSS, OTE, liquidity), 4) #TheStrat (scenarios, combos, FTFC). Combining all four creates high-probability theses."},
  {q:"A stock has a hammer on the daily. Is this enough to take the trade?",
   options:["Yes — hammers are reliable reversal signals on their own","No — a single signal is a coin flip; you need confluences from other pillars and timeframes","Yes, but only if the hammer is green","Only if it's on a Monday"],
   correct:1,explain:"No single signal is enough. A hammer alone is a coin flip. You need to check the other three pillars (is there FTFC? is price at OTE? is there a Strat combo?) and multiple timeframes. The $XLY example had 10 confluences before the trade was taken."},
  {q:"What's a 'confluence' in trading?",
   options:["When two traders agree on a trade","Multiple signals from different pillars and/or timeframes lining up in the same direction","A specific candlestick pattern","A type of Fibonacci level"],
   correct:1,explain:"A confluence is when multiple signals — from different pillars (charting, TA, market structure, #TheStrat) and/or different timeframes — all point in the same direction on the same chart. More confluences stack probability in your favor."},
  {q:"You're analyzing $XLY and see a weekly 1-3 setup, FTFC green, inside 2W hammer, OTE holding, and a CCRP brewing on 3W. What do these have in common?",
   options:["They all contradict each other","They all come from the same pillar","They're all bullish confluences across multiple pillars and timeframes","They're all bearish signals"],
   correct:2,explain:"All five are bullish confluences: the 1-3 and CCRP are from #TheStrat and Charting; FTFC is #TheStrat; inside 2W hammer is Charting/#TheStrat; OTE is Market Structure. They span multiple pillars AND multiple timeframes (weekly, 2W, 3W) — exactly what makes the thesis high-conviction."},
  {q:"Why is it important to choose your participant timeframe BEFORE entering a trade?",
   options:["Because your broker requires it","Because it defines your invalidation level, holding period, and target — without it you'll panic on normal pullbacks","Because higher timeframes are always better","You don't need to — just watch price action"],
   correct:1,explain:"Your participant timeframe determines everything: how long you hold, where your invalidation is, what your target is. A 3W participant has up to 3 weeks for the setup to play out. Without choosing your participant, you'll exit on normal wicks and miss the actual move. This is what saved the $XLY day-3 pullback participants."},
  {q:"$XLY triggers the weekly 1-3-2u. On day 3, price pulls back. You're a 3-week participant and your invalidation hasn't closed through yet. What should you do?",
   options:["Exit immediately — the pullback means the setup failed","Hold — you're a 3W participant, pullbacks are normal, invalidation requires a candle CLOSE below the inside bar","Add to your position regardless of invalidation","Switch to a 1-day participant to reduce risk"],
   correct:1,explain:"Hold. A 3W participant has up to 3 weeks for the setup to play out. Normal pullbacks (wicks, red days) aren't invalidations. Only a candle CLOSE below the inside bar invalidates the setup. In the actual $XLY trade, price pulled back on day 3, then bounced on day 4 and went on to hit all targets."},
  {q:"What does it mean to 'upgrade your participant' mid-trade?",
   options:["Changing brokers for better fills","Increasing your position size","Moving to a higher timeframe participant because higher-TF signals are confirming (like $XLY daily → 3W)","Converting stocks to options"],
   correct:2,explain:"Upgrading your participant means shifting from a shorter TF to a longer TF mid-trade when higher-TF signals confirm. In $XLY, a weekly participant could have upgraded to a 3W participant when the 3W CCRP developed — holding longer or rolling contracts for more magnitude. Higher participant = higher target potential."},
  {q:"You see a wick through your invalidation level but the candle closes back above it. What should you do?",
   options:["Exit immediately — the wick counts as invalidation","Hold — only a candle CLOSE beyond invalidation counts; wicks are often liquidity sweeps","Reduce half your position","Add to your position to average down"],
   correct:1,explain:"Wicks do NOT invalidate. Only a candle CLOSE beyond the invalidation level counts. Wicks are frequently liquidity sweeps — price dips to grab stops before reversing in the intended direction. Always wait for the candle to close before making any exit decision."},
  {q:"What's an 'anchor pillar'?",
   options:["A specific trading strategy","The pillar that resonates most with you personally — the one you see first when looking at a chart","A type of stop-loss","The highest timeframe pillar"],
   correct:1,explain:"Your anchor pillar is the one that naturally jumps out to you. Adex sees Strat combos first. Abi sees market structure first. Different brains process different patterns. Use your anchor as the starting point — but confirm with the other three pillars before taking the trade. Anchor alone isn't enough."},
  {q:"Roughly how many confluences make a high-conviction trade setup?",
   options:["1 confluence is enough","3+ is tradable, 5+ is strong, 10+ is high-conviction (like $XLY)","At least 20 confluences","Confluences don't matter — only the Strat combo matters"],
   correct:1,explain:"Rough guide: 3+ confluences = tradable, 5+ = strong, 10+ = high-conviction. The $XLY case study had 10 confluences across three pillars before even checking the daily. The more confluences (especially across different pillars and timeframes), the higher the probability the thesis plays out."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #8 Quiz</div><div style={styles.headerSub}>Putting It All Together</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #8 Quiz</div><div style={styles.headerSub}>Putting It All Together</div></div>
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
