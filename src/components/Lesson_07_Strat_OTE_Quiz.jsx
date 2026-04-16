"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"What is Optimal Trade Entry (OTE)?",
   options:["The exact price where the trend ends","The area (0.5-0.786 fib) where price is most likely to reverse to continue in the prevailing trend","The peak of any uptrend","A specific Strat combo"],
   correct:1,explain:"OTE is the ZONE between 0.5 and 0.786 fib — the highest-probability area for a trend to resume after a pullback. Other names: Golden Zone, Golden Pocket, Discount Zone, the 618. It's a probability zone, not an automatic reversal point."},
  {q:"Trader A enters at the $6 breakout, trader B enters at the $3 pullback. Both exit at $8. Who profits more and why?",
   options:["Trader A — breakouts are higher conviction","Trader B — higher-low entries produce better risk-to-reward. Same exit, bigger profit ($5 vs $2)","Tied — same exit price","Depends on position size"],
   correct:1,explain:"The math is non-negotiable. Same exit ($8), but pullback entry ($3) captures $5, while breakout entry ($6) captures only $2. That's why we don't chase breakouts — OTE pullback entries more than double the R/R on the same exit target."},
  {q:"You see a clean UPTREND on $AAPL. How do you place the fib retracement tool?",
   options:["From the swing HIGH to the swing LOW","From the swing LOW to the swing HIGH","From today's open to today's high","Only on the daily chart"],
   correct:1,explain:"UPTREND = swing LOW → swing HIGH. This projects the 0.5, 0.618, 0.786 levels downward from the high so you can see where pullbacks are likely to find support. DOWNTREND = swing HIGH → swing LOW for the opposite projection."},
  {q:"Which fib level is called the 'Golden Pocket' and has the highest frequency of reversals?",
   options:["0.5","0.618","0.786","1.0"],
   correct:1,explain:"The 0.618 is the Golden Pocket — the single fib level with the highest frequency of reactions. Some traders specifically wait for a 0.618 tap before taking any long setup. It sits in the middle of the OTE zone (0.5 - 0.786) and catches most meaningful reversals."},
  {q:"Price breaks below the 0.618 on your long setup. Should you immediately cut?",
   options:["Yes — 0.618 is the hard invalidation","No — 0.786 is the 'last line of defense.' Many setups reverse from 0.786 after breaking 0.618. Don't panic at 0.618","Yes — always cut at any fib break","Only if you're also down 20%"],
   correct:1,explain:"The 0.786 is the last line of defense. Many setups DO reverse from 0.786 AFTER breaking 0.618 — and traders who panic at 0.618 miss those bounces. Invalidation = candle CLOSE below 0.786 on your thesis timeframe. Wicks through don't count."},
  {q:"Price taps OTE on $SPY daily. What's the RIGHT move?",
   options:["Enter long immediately — price is at OTE","Wait for a Strat signal (hammer, 1-3, double inside, 2-2 rev, CCRP) before entering","Short it — price is likely to keep falling","Wait for 0.786 specifically"],
   correct:1,explain:"OTE tells you WHERE, #TheStrat tells you WHEN. A fib tap without a trigger is just a level on the chart. Price can tap OTE and reverse immediately, chill there for weeks, or break below. No trigger = no entry. The Strat signal is your objective reason to commit capital."},
  {q:"$COIN tapped 0.618 and has been chilling there for 15 days. The daily looks choppy. What should you do?",
   options:["Give up on the OTE setup — it's been too long","Check other fractal timeframes (2-day, 3-day, 4-day, 5-day, 6-day). The reversal signal often appears on a timeframe you weren't watching","Exit any remaining position","Double down on the long"],
   correct:1,explain:"OTE is a probability zone, not a timer. $COIN chilled at 0.618 for ~17 days. The daily and smaller TFs all looked choppy — but the 6-day chart produced a 1-3 with CCRP and four wicks bouncing off 0.5. Review all fractal timeframes when price is at OTE — one will show the setup your primary TFs are hiding."},
  {q:"In April 2025, $SPY tapped the macro 0.618 on the monthly chart. What confluence did the setup stack?",
   options:["Just the fib tap","Monthly hammer + 2-week double hammer/inside bar/CCRP + weekly 1-3 closed at high — multiple fractal timeframes aligned at a macro fib","A single daily 1-3","The 0.5 level only"],
   correct:1,explain:"Textbook higher-TF OTE setup. Monthly hammer closed strong at OTE. 2-week showed double hammer + inside bar + CCRP. Weekly 1-3 closed at the high. Every fractal timeframe aligned at the macro 0.618. Weekly trigger fired → passed the baton to 2-week → passed to monthly → new all-time high. That's the bus analogy at the highest-probability fib zone."},
  {q:"You're looking at $AAT. It's a downtrend that just made its FIRST higher high (displacement), then retraced into OTE on the new leg. What model is this?",
   options:["A broadening formation","The Abby Model — downtrend's first higher high, then OTE retest before taking out prior highs. High-probability reversal setup","A 3-1-2u combo","An FTFC break"],
   correct:1,explain:"The Abby Model: downtrend completes with first higher high (displacement attempt), then price retraces back into OTE on the new upward leg. When Strat signals confirm the OTE bounce (hammers, CCRPs), the reversal back to prior highs becomes high-probability. $AAT ran from OTE to structural break-of-structure target."},
  {q:"You see a weekly hammer at the macro 0.618 with break-of-structure target $50 away. What contract selection method fits?",
   options:["Weeklies — cheapest option","Leaps — the chart is telling you the target is far away and on a macro timeframe. Match your contract duration to the thesis timeframe","Same-day expiration","Monthly options at best"],
   correct:1,explain:"The contract duration must match the thesis timeframe. A macro OTE on the monthly/quarterly chart with a break-of-structure target $30-50 away is a LEAP setup — you need months of time for that move to complete. Don't buy weeklies on monthly OTE setups. Higher-TF OTE = higher-TF target = longer time to buy = leaps. Match the contract to the chart."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #7 Quiz</div><div style={styles.headerSub}>The Strat + Optimal Trade Entry</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #7 Quiz</div><div style={styles.headerSub}>The Strat + Optimal Trade Entry</div></div>
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
