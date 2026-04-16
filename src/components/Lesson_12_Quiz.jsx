"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"How many shares does 1 options contract represent?",
   options:["1 share","10 shares","100 shares","1,000 shares"],
   correct:2,explain:"Every options contract represents 100 shares of the underlying stock. This never changes. When a premium is listed as $2.50, that's the price PER SHARE — multiply by 100 to get the total cost of 1 contract ($250)."},
  {q:"You see a call option with a listed premium of $3.20. What's the actual cost to buy 1 contract?",
   options:["$3.20","$32.00","$320.00","$3,200.00"],
   correct:2,explain:"Premium × 100 shares = total contract cost. $3.20 × 100 = $320. Always multiply the quoted premium by 100 to understand your real capital commitment before entering."},
  {q:"You're bearish on $NVDA. Which type of option aligns with your bias?",
   options:["Long call","Long put","Sell the stock","Sell a call"],
   correct:1,explain:"Long puts are the bearish options play — you profit when the stock goes DOWN. Long calls are bullish. Puts give you the right to sell 100 shares at the strike price; if the stock drops below strike, your puts gain value. Max loss = premium paid."},
  {q:"You buy 1 call contract for $250 premium. The stock tanks and the option expires worthless. How much do you lose?",
   options:["$250 — just the premium paid","$25,000 — the value of 100 shares","Unlimited — it's options trading","$2,500 — 10x leverage loss"],
   correct:0,explain:"Max loss on a long call (or long put) = the premium you paid. Nothing more. No margin required. If you paid $250 and the setup fails, $250 is gone — but you can't lose more than you put in. This is why long options are 'defined-risk' trades."},
  {q:"What does BTO mean?",
   options:["Bond Trading Order","Buy To Open — opening a long position","Break To Overtrade","Bid To Offer"],
   correct:1,explain:"BTO = Buy To Open. You're opening a long position by buying a contract. Paired with STC (Sell To Close), these are the two terms you'll use 95% of the time in this University — we trade long calls and long puts only."},
  {q:"An options chain shows: Bid $2.35, Ask $2.44. According to Adex's fill rule, how do you enter the trade?",
   options:["Buy at the bid ($2.35) to save money","Buy at the mid ($2.40) for a balanced fill","Buy at the ask ($2.44) for an instant fill","Wait for the spread to close"],
   correct:2,explain:"Buy at the ASK for instant fills. When your thesis triggers and you want IN, pay the ask — you'll get filled immediately. Trying to save 9 cents at the bid can mean missing the trade entirely. Speed matters more than a few cents, especially on fast-moving setups."},
  {q:"A contract has Bid $0.85 and Ask $1.45. What's the problem?",
   options:["No problem — cheap options are great","The spread is $0.60 ($60 per contract) — wide spread, avoid it","The contract is too expensive","Bid must equal ask to trade"],
   correct:1,explain:"A $0.60 spread means you're down $60 per contract the moment you enter (buy at ask, sell at bid). Wide spreads can force you to exit at a loss even when price moves in your favor. Always check the spread before buying — small spreads only, or you lose to the spread alone."},
  {q:"Stock is at $248. You own a $240 call expiring TODAY. What's the contract worth at expiration?",
   options:["$0 — it's expiring","$8 per share or $800 total (intrinsic value only)","$2,400 total","$240 per share"],
   correct:1,explain:"Intrinsic value = Stock − Strike = $248 − $240 = $8 per share. Multiply by 100 shares per contract = $800. At expiration, an option is worth ONLY its intrinsic value — no more time value. If it had been a $250 call instead, it would be worth $0 (out-of-the-money)."},
  {q:"Stock at $245. You own a $240 call expiring in 2 weeks. The premium is $5.80. What's the $0.80 above intrinsic called?",
   options:["Bonus premium","Extrinsic value (time value)","A spread","Leverage fee"],
   correct:1,explain:"Intrinsic = $245 − $240 = $5. The premium is $5.80, so $0.80 is extrinsic value — the time premium. It exists because with 2 weeks until expiration, anything can happen (earnings, news, moves). The market prices that possibility into the premium. Extrinsic decays as expiration approaches (theta)."},
  {q:"You own a $240 call. Stock is at $245 with 2 weeks to expiration. Why does this contract cost MORE than one expiring today?",
   options:["It's a scam — all contracts should cost the same","Because extrinsic (time) value is added when expiration is further away","The broker charges more for longer contracts","Longer contracts have higher intrinsic value"],
   correct:1,explain:"Both contracts have the same intrinsic value ($5 per share — same stock, same strike). But the 2-week contract has MORE extrinsic value because time = possibility. The stock could move significantly in 2 weeks (earnings, news), so the market adds premium for that uncertainty. The longer to expiration, the more extrinsic value."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #12 Quiz</div><div style={styles.headerSub}>Intro to Options</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #12 Quiz</div><div style={styles.headerSub}>Intro to Options</div></div>
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
