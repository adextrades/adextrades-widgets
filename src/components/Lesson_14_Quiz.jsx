"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"What is the single most important principle of risk management?",
   options:["Maximize profit potential on every trade","Always trade with the trend","Protect capital first — if you lose too much too fast, you won't be in the game long enough to capitalize on great opportunities","Never take losses above 5%"],
   correct:2,explain:"Smart traders protect capital FIRST and focus on profit potential second. An account down 50% needs to gain 100% just to get back to breakeven. An account down 80% needs 400%. Preserving capital is the mathematical foundation of compounding — gambling chasers blow up, capital protectors stay in the game long enough to win."},
  {q:"A beginner trader still finding their edge wants to know what % of their portfolio to allocate per trade. What's the right range?",
   options:["1-2% (low risk tolerance)","3-5% (medium risk tolerance)","6%+ (high risk tolerance)","10-15% to build faster"],
   correct:0,explain:"1-2% per trade is the low risk tolerance tier — conservative, reduces exposure to large drawdowns. Ideal for beginners, traders finding their edge, and long-term investing mindsets. Higher tiers (3-5% and 6%+) are reserved for experienced traders with proven, repeatable strategies."},
  {q:"You have a $2,000 starter contract position. It's down 50% and you're feeling anxious and worried. What does that mean?",
   options:["You should definitely hold — anxiety is normal","You should sell immediately to cap the loss","You're overleveraged — the dollar amount at risk is more than you're truly comfortable with","You should average down to lower your cost basis"],
   correct:2,explain:"Anxiety over a starter position means you're overleveraged. Your starter should be the amount you're willing to let go to zero — that framing removes emotion. If down 50% makes you anxious, size down on the next trade. Anxiety distorts chart reading and forces bad exits. Fix the cause (position size) on the next trade, not the symptom (this trade)."},
  {q:"You're in a 2-1-2u long call position on the weekly. Price dropped through your invalidation level intrabar but closed back above it. What do you do?",
   options:["Exit immediately — the level was breached","Stay in — only a CANDLE CLOSE below invalidation counts, not a wick","Cut 50% as a precaution","Average down since it's at a discount"],
   correct:1,explain:"The reason you enter is the reason you exit. Invalidation requires a full candle CLOSE below your level on the thesis timeframe — wicks don't count. A weekly 2-1-2u isn't invalidated until a weekly candle closes below the inside bar. This is why Strat traders can hold through intrabar noise that would shake out a stop-% trader."},
  {q:"You're down -30% on a trade. It hasn't invalidated yet, but your confluences have flipped — you now have MORE bearish signals than bullish ones. What do you do?",
   options:["Hold — it hasn't technically invalidated","Average down since it's at a discount","Cut the trade — capital protection wins when objective analysis turns against you","Cut 50% of the position"],
   correct:2,explain:"This is the 'poor trade' scenario in the -30% rule. Don't wait for technical invalidation when your objective confluence analysis has already flipped against you. More bearish than bullish signals = the thesis is deteriorating. Protecting capital now lets you redeploy it to a better setup. Capital protection always beats hope."},
  {q:"You're down -30%. The trade hasn't invalidated. Your bullish and bearish confluences are roughly EQUAL — you're genuinely unsure. What do you do?",
   options:["Hold the full position — it could still work","Cut the ENTIRE trade","Cut 50% of the position — reduce risk while staying in for possible resolution","Average down aggressively"],
   correct:2,explain:"The 'unsure' scenario in the -30% rule. Equal bull/bear confluences = real uncertainty. Cut HALF the position: reduce risk but stay in for the possible resolution. Tomorrow the balance might tip further against you — at least you've preserved half your capital. Compromise between hope and capital protection."},
  {q:"You're down -30%. The thesis hasn't invalidated. All your confluences are STILL intact and pointing your direction. What's the appropriate action?",
   options:["Cut the trade — anything down -30% is bad","Cut 50% automatically","Average up or down — but ONLY if you're genuinely comfortable with your strategy and have seen similar setups play out","Hold and do nothing"],
   correct:2,explain:"The 'still valid' scenario in the -30% rule — averaging is on the table, but the qualifier is critical: ONLY if you're comfortable. Not because of a rule. Not because you think you know what you're doing. Because you've seen this play out before with experience. If you're second-guessing, just cut. Experience earns you the right to average down into valid setups."},
  {q:"You have 10 contracts using the intermediate trimming framework. Your position hits +30% profit. What's the right move?",
   options:["Close all 10 contracts — take the profit","Trim HALF (5 contracts) at 30%, then trim more at 40-50%, close rest at 50-100%+","Hold all 10 for higher targets","Add 5 more contracts since it's winning"],
   correct:1,explain:"Intermediate framework: trim 5 at +30%, trim 2-3 more at +40-50%, close final 2-3 at +50-100%+. Tiered trimming takes risk off progressively while letting remainders ride. You lock in profit on the first half to remove stress, then let the rest work for bigger gains."},
  {q:"What does 'let your runners do the heavy lifting' mean?",
   options:["Always hold your full position until target","The biggest wins come from runners that ride 200%, 300%, 500%+ after you've locked in gains on the main position — a 'free' runner can ride through noise without stress","Run faster when placing trades","Only trade runner stocks with momentum"],
   correct:1,explain:"Classic trading saying. First target hits don't produce the biggest wins — runners do. But you can only comfortably hold a runner after locking in gains through trimming. A stressed runner gets cut on the first pullback. A 'free' runner (where you've already booked profit) can ride through retracements to massive gains. Trimming EARNS you the ability to hold runners."},
  {q:"Adex was up +30% on $UPS puts but didn't trim, then watched it retrace to -10% the next day. Why was this acceptable?",
   options:["He got lucky — don't copy this","His multi-TF confluence (weekly double-inside, monthly 3-2-2d, 6-week 1-3, etc.) all pointed to $82, and the thesis hadn't invalidated — this is only appropriate once you've earned the experience to trust higher-TF setups through noise","He always holds until stopped out","-30% is his cutoff, not +30%"],
   correct:1,explain:"Critical nuance: this is EXPERIENCE-ONLY behavior. Adex's confluence list hadn't changed and the thesis hadn't invalidated, so the +30% → -10% swing was acceptable noise on the path to his $82 target. Beginners should NOT copy this — they haven't built the sample size to trust HTF setups through retracements. For beginners, +30% = trim. For experienced traders with deep confluence, it can mean hold."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #14 Quiz</div><div style={styles.headerSub}>Risk Management</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #14 Quiz</div><div style={styles.headerSub}>Risk Management</div></div>
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
