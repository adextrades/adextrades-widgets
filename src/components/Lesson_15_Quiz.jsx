"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"You've identified a clean multi-TF swing setup. Should you enter full size at the trigger, or use a starter?",
   options:["Full size — the setup is clean, conviction is high","Starter position — even clean setups can retrace before going to target, and a starter leaves capital for pullback entries","Half size — split the difference","Wait for more confirmation before entering"],
   correct:1,explain:"Enter with a starter. Even the cleanest setups can retrace before heading to target. A starter gives exposure without overcommitting — if it runs, you profit; if it pulls back, you have capital left to improve your cost basis on a better entry. Going full size at the trigger leaves you no ammunition to work the position."},
  {q:"You're in calls and the market is having a red day. Your bull/bear confluences haven't changed. Is this a valid reason to average down?",
   options:["Yes — price is cheaper so it's a better deal","No — averaging based on 'it's a red day and I'm in calls' is emotion, not intention. Need a chart signal","Yes, but only with half your normal add size","Only if you're down more than 20%"],
   correct:1,explain:"NO. 'It's red and I'm in calls' is pure emotion. Averaging down requires a chart signal — a specific setup on a lower TF that, via the if-then cascade, reinforces your higher-TF thesis. No signal = no average. This is the most common way beginners blow up accounts after hearing 'you can average down.'"},
  {q:"Your higher-TF thesis is a 2-week 3-1-2u. On the hourly, you see an outside hammer closing at its high. What does the if-then cascade tell you?",
   options:["Nothing — hourly is too small to matter","IF hourly triggers 3-2u → day triggers 2u → day becomes daily CCRP → feeds into your 2W thesis. Valid signal to add","Just hold, don't add on lower timeframes","Cut the trade — intrabar volatility is bad"],
   correct:1,explain:"This is the if-then cascade in action. Each lower-TF signal, IF it triggers and gets to target, produces a higher-TF event. The hourly outside hammer is the base of the chain: hourly 3-2u → day 2u → daily CCRP → unlocks your 2-week thesis. When the chain resolves upward to your primary trigger, you have a structured, non-emotional reason to add."},
  {q:"What are the TWO distinct levels on your trigger candle that you care about?",
   options:["High and low","Open and close","Invalidation (the low) and Reassessment (the 50%)","Entry and target"],
   correct:2,explain:"Invalidation = the low of your trigger candle. A candle CLOSE below this kills the thesis — exit immediately. Reassessment = the 50% of your trigger candle. Not an auto-exit — a decision point where you re-check confluences and decide (hold, trim, or cut). Two levels, two different meanings."},
  {q:"Price closes below the 50% of your trigger candle but is still above the low. What does this mean?",
   options:["Immediately exit — the thesis is dead","Reassessment moment — check if confluences are still intact, then decide to hold, trim, or cut","Automatic signal to average down","Automatic signal to double down"],
   correct:1,explain:"Below 50% but above the low = Reassessment, not Invalidation. The bias is weakening but the thesis isn't dead yet. Time to think, not panic: Are my bull/bear confluences still intact? Has the multi-TF picture shifted? Given the -30% rule, should I hold, cut 50%, or exit entirely? This is where active management earns its keep."},
  {q:"$CMG position went from breakeven to -40% to +20% to -30% (back to reassessment). The thesis never invalidated. Most beginners would cut at -40% or -30%. What's the lesson?",
   options:["You should always cut at -30%","If you cut at -40%, you missed 150%. Working a position through noise when the thesis is intact is what separates scalper mindsets from swing trader mindsets","-40% is too much to take, the trade was sized wrong","Higher-TF targets aren't worth the risk"],
   correct:1,explain:"The $CMG lesson: if you cut at -40%, you missed 150%. If you cut at the second -30% bounce, you missed 150%. The discipline of working a position — averaging up/down on signals, trimming at targets, reassessing but not panicking — only works when the thesis hasn't invalidated AND you have time left on contracts. Process over panic."},
  {q:"You're up 20% on a position. Your higher-TF trigger hasn't fired yet. A CCRP on the daily just confirmed. What's the right move?",
   options:["Take all profits — 20% is good","Hold, do nothing","Average UP into the CCRP confirmation — the TRUE trigger hasn't fired yet, so you can still build position","Cut 50%"],
   correct:2,explain:"If your HIGHER-TF trigger hasn't fired yet, you can still build position up to that primary trigger. The CCRP here is confirmation on the path, not the destination. Scaling in on confirmations (up to your actual trigger) is different from averaging on drawdown. You're adding because the if-then chain is resolving toward your real setup."},
  {q:"What are the pre-conditions for 'working a position' through a deep drawdown?",
   options:["Any position with any drawdown","1) Thesis hasn't invalidated, 2) You have time on contracts, 3) Confluences still favor your direction — if any break, stop working and apply risk rules","Only when you have 10+ contracts","Only on stocks over $100"],
   correct:1,explain:"Three preconditions must ALL hold: (1) Price is still above your trigger candle's low for bullish — thesis structurally intact. (2) You have time — contracts expire far enough out that theta isn't killing you. (3) Confluences still favor your direction. If ANY one breaks, stop working and apply risk rules (-30% decision tree, exit, etc.). Working isn't denial — it's conditional discipline."},
  {q:"You have a runner left after trimming your $CMG position heavily. Price retraces -20% but your thesis is still intact and the higher-TF target is in play. What's the psychological advantage you have with just a runner?",
   options:["Runners have no advantage","Because you've already locked in gains on the main position, the runner is essentially 'free' — you've paid yourself, so the retracement doesn't panic you the way it would at full size","Runners always recover","You can exit anytime"],
   correct:1,explain:"The 'free runner' effect: after trimming, the remaining position is bonus. You've already paid yourself. A 20% retracement on a runner feels very different than a 20% retracement on a full-size position — because the PnL hit in dollars is smaller, you don't panic, and you can hold for the higher-TF target. This is how runners hit 300-400% — emotional freedom earns patience."},
  {q:"You're scaling in/out and need to decide when to SCALE IN (add to position). Which of these is a valid reason?",
   options:["You're bored and want more exposure","It's a down day and premium is cheaper","A new higher-TF candle opened with a setup aligned to your thesis — a confirmation signal","You have extra cash sitting around"],
   correct:2,explain:"Valid scale-in reasons: (1) Lower-TF signal triggers reinforcing the higher-TF thesis. (2) Price at OTE/50% shows a reversal signal (CCRP, hammer). (3) A new higher-TF candle opens with an aligned setup. All three are chart-based confirmations. 'Bored' and 'cheap' are emotional/subjective — not valid. The chart gives you the signal to add, always."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #15 Quiz</div><div style={styles.headerSub}>Position Management</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #15 Quiz</div><div style={styles.headerSub}>Position Management</div></div>
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
