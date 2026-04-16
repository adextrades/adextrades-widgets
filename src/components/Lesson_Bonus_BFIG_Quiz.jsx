"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"What does BFIG stand for and who developed the technique?",
   options:["Bullish Formation Impulse Gap — developed by Adex","Broadening Formation Inversion Gap — developed by Abi","Breakout Flag Inverted Gap — developed by Rob Smith","Broken Fibonacci Index Gap — developed by ICT"],
   correct:1,explain:"BFIG = Broadening Formation Inversion Gap, developed by Abi. It's a reversal technique designed to catch market turns EARLIER than classical market structure shifts can confirm them, putting you on both legs of the reversal instead of just the last one."},
  {q:"A stock has a slow bleed that eventually dips below a prior broadening low. Does this qualify as BFIG Step 1?",
   options:["Yes — any break of a broadening low qualifies","No — the break must be AGGRESSIVE (gap down or full-body bearish displacement). A slow bleed doesn't count","Yes, but only on the daily","Only if it happens on a Monday"],
   correct:1,explain:"BFIG Step 1 requires AGGRESSIVE displacement — typically a gap down or a full-body bearish displacement candle. A slow bleed below doesn't qualify. The violence of the break is what creates the institutional trap that defines the BFIG setup."},
  {q:"Price gaps down into new broadening lows, then the next candle wicks partially back up into the gap range but closes well below. Is this a valid BFIG?",
   options:["Yes — any bounce counts","No — the counter-move must OVERLAP the prior displacement, not just wick partway. Without overlap, you have a bounce, not a BFIG","Yes, the wick is the signal","Only if the wick is longer than the body"],
   correct:1,explain:"The OVERLAP requirement is non-negotiable. The counter-displacement (Step 2) must cover the same price range as the original displacement (Step 1) — not just wick into it, not partially recover. Without overlap, you just have a bounce, not a valid BFIG."},
  {q:"What distinguishes a BFIG from a BPR or CISD?",
   options:["BFIGs use Fibonacci; BPRs don't","BFIGs specifically require AGGRESSIVE break of NEW broadening lows; BPRs/CISDs don't require that violent break-and-reclaim sequence","BFIGs only work on stocks under $50","There's no difference — they're the same pattern"],
   correct:1,explain:"BPRs and CISDs are similar reversal patterns but don't require the aggressive violation of new broadening lows. A BFIG specifically needs that violent break followed by immediate countered displacement. That broadening-low break is what creates the institutional trap — without it, you may have a reversal, but not a BFIG."},
  {q:"In the AMD cycle (Accumulation → Manipulation → Distribution), where do BFIGs typically fire?",
   options:["During Accumulation","At the end of the MANIPULATION phase — the transition into Distribution","At the very start of Distribution","They can fire anywhere equally"],
   correct:1,explain:"BFIGs typically appear at the end of the manipulation phase. The manipulation leg takes out broadening lows (sweeping liquidity — Step 1). The distribution leg reverses with aggression (Step 2). You're entering right as the real move begins, after the stop-run is complete."},
  {q:"You identify a range on the higher timeframe. The 50% midpoint is equilibrium. A BFIG forms in the UPPER half of the range (premium). What's the quality of this setup?",
   options:["A+ setup — BFIGs always work","Lower-probability. BFIGs in discount (below equilibrium) during an uptrend are A+ setups; BFIGs in premium have worse R/R","Invalid — BFIGs can't form in premium","A+ if confirmed by volume"],
   correct:1,explain:"BFIGs in DISCOUNT during an uptrend stack multiple confluences: institutional displacement, favorable price, liquidity sweep, and often order block/FVG overlap. BFIGs in premium have less room to run and a higher invalidation risk. Location within the range matters — prioritize BFIGs in discount."},
  {q:"What's 'turtle soup' and what does it have to do with BFIGs?",
   options:["A trading strategy for soup companies","When price pokes below a prior low just far enough to trigger stops, then reverses back into range — this is classic BFIG territory because that's where institutional liquidity is harvested","A Japanese candlestick pattern","A type of stop-loss"],
   correct:1,explain:"Turtle soup describes the pattern where price sticks its head below a relevant low just long enough to trigger retail stops, then immediately retreats back into range. When this happens with aggressive displacement back INTO the range, it's often a BFIG — the fingerprint of a liquidity raid by institutional participants."},
  {q:"Why do BFIGs catch reversals earlier than classical market structure shifts?",
   options:["They don't — MSS is faster","Classical MSS requires the full sequence (lower-high → lower-low → higher-low → higher-high) to confirm, which means you only catch the LAST leg. BFIGs let you enter at the inversion point, capturing BOTH legs","BFIGs use smaller timeframes","BFIGs ignore structure"],
   correct:1,explain:"Classical MSS confirms a reversal only after the full sequence plays out, which means by the time you enter, you've missed the initial displacement down AND the displacement back up. BFIGs identify the inversion point itself — the moment institutional order flow reverses — putting you on both legs of the move."},
  {q:"In the $DG case study, what made Friday's candle especially significant beyond just redelivering into the gap?",
   options:["It was green","It also REFINED the inefficiency — filling unfilled orders on the way up, giving institutional participants a clean entry zone","It closed at a round number","It had high volume"],
   correct:1,explain:"Friday's $DG candle redelivered into the gap AND refined the inefficiency — meaning price came back through to fill unfilled orders. That gives institutional participants a clean entry zone that retail often misses, and the refinement adds another confluence layer to the BFIG signal. It's the difference between a price touching a level and price actually delivering into it."},
  {q:"$DE had a BFIG variant: price rallied to $467-$482, rejected, broke down to fill a gap at $475, then GAPPED UP the next day holding near full-body. What was the key signature that made this a BFIG?",
   options:["The gap up alone","The close BACK ABOVE the zone that previously rejected it, WITH displacement — that reclaim-with-displacement is the BFIG signature at the local swing level","The round number resistance","Nothing — it wasn't a BFIG"],
   correct:1,explain:"The key signature was the reclaim-with-displacement. A zone had previously rejected price. Price came back, gapped up, held near full-body, and closed BACK ABOVE the rejection zone. That aggressive reclaim of a level that had just rejected is the BFIG fingerprint at a local swing level — institutional flow flipping from selling to buying, visible as the gap + strong close above."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Bonus Lesson Quiz</div><div style={styles.headerSub}>Broadening Formation Inversion Gaps</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Bonus Lesson Quiz</div><div style={styles.headerSub}>Broadening Formation Inversion Gaps</div></div>
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
