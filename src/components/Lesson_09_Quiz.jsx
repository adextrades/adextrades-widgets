"use client";
import { useState } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED="#E74C3C",PASS_PCT=70;

const QUESTIONS=[
  {q:"What is sector rotation?",
   options:["A type of Strat combo","The movement of invested money from stocks in one sector to another","A technique for rotating through timeframes","A way to rotate charts on TradingView"],
   correct:1,explain:"Sector rotation is the movement of invested money from stocks in one sector to another based on economic cycles. Institutions rotate capital between sectors — your edge as a trader is to identify where they're rotating INTO and position accordingly."},
  {q:"How many sectors and industries are in the S&P 500?",
   options:["5 sectors and 25 industries","11 sectors and 69 industries","10 sectors and 100 industries","15 sectors and 50 industries"],
   correct:1,explain:"The S&P 500 has 11 sectors (Technology, Healthcare, Financials, Consumer Discretionary, Consumer Staples, Energy, Industrials, Materials, Utilities, Real Estate, Communications) and 69 industries. Industries are subsectors — specific divisions within each sector."},
  {q:"What are the four tiers of the top-down approach, in order?",
   options:["Stocks → Sectors → Indices → Futures","Futures → Indices → Sectors → Stocks","Indices → Futures → Stocks → Sectors","Sectors → Stocks → Futures → Indices"],
   correct:1,explain:"Top-down: start broad, narrow down. 1) Futures (market sentiment/overnight). 2) Index ETFs (broad market strength). 3) Sectors (where money is flowing). 4) Stocks (within strongest/weakest sectors). This workflow ensures you trade in alignment with institutional flow."},
  {q:"$NQ is trading significantly higher overnight. What's the implication for the next trading session?",
   options:["$DIA will gap up","Energy stocks will gap down","$QQQ and technology stocks have a high probability of gapping up","Small caps will sell off"],
   correct:2,explain:"$NQ (E-mini Nasdaq 100 futures) tracks the Nasdaq. If $NQ is up overnight, $QQQ has a high probability of gapping up when the market opens, and tech stocks broadly tend to follow. Futures give you insight into next-session opening prices."},
  {q:"Which futures contract should you watch if you trade small-cap stocks?",
   options:["$ES","$NQ","$YM","$RTY"],
   correct:3,explain:"$RTY is the Russell 2000 futures. It tracks the Russell 2000 index, which holds small-cap companies. If $RTY is up overnight, $IWM (the small-cap ETF) has a high probability of gapping up. Each futures contract maps to a different segment — match the right one to what you're trading."},
  {q:"What's the difference between the S&P 500 and $SPY?",
   options:["They're identical and interchangeable","The S&P 500 is an index (benchmark, not directly tradable); $SPY is an ETF that tracks the S&P 500 and IS tradable","$SPY tracks the Nasdaq, not the S&P 500","The S&P 500 trades 24/7; $SPY only trades during market hours"],
   correct:1,explain:"Indices are benchmarks — you can't trade them directly. Index ETFs track them 1:1 and ARE tradable (via shares and options). $SPY tracks the S&P 500, $QQQ tracks the Nasdaq 100, $DIA tracks the Dow Jones 30, $IWM tracks the Russell 2000."},
  {q:"Why should you check both $XLF (SPDR) and $IYF (iShares) when analyzing financials?",
   options:["They're the same thing — no need to check both","Different ETF families hold slightly different stocks — checking both catches discrepancies and builds confluence","iShares ETFs have lower fees","SPDR ETFs only work on the daily timeframe"],
   correct:1,explain:"Different families have slightly different holdings. $XLY (SPDR) includes some stocks that $IYK (iShares) doesn't, and vice versa. If $XLF has a 2-1-2u setup AND $IYF has a 3-1-2u setup, that's TWO sector-level confirmations — additional confluence for the same bullish direction."},
  {q:"$SMH triggers a 2-1-2d on the daily. What does this tell you about semiconductor stocks?",
   options:["Nothing — $SMH movement doesn't affect individual semis","Semis stocks like $NVDA, $AMD, $TSM, $MU have a high probability of moving to the downside (sector/industry sympathy)","All semiconductor stocks will definitely close red","Only $NVDA will drop; the others are independent"],
   correct:1,explain:"When the semiconductor ETF ($SMH) triggers a bearish Strat combo, the individual semis inside it tend to follow via sector/industry sympathy. $NVDA, $AMD, $TSM, $MU, $AVGO are likely candidates for downside. You'd look for individual stocks with their own bearish setups to take the trade — sector alignment is the first confluence."},
  {q:"Trump eliminates the EV tax credit. Which stocks likely benefit, and which likely suffer?",
   options:["All auto stocks benefit equally","$F and $GM benefit (gas-focused); $TSLA suffers (EV credit reliance) — NEGATIVE sympathy","Only $TSLA benefits","All auto stocks suffer"],
   correct:1,explain:"This is a classic NEGATIVE sympathy example. $F and $GM (gas-focused automakers) benefit because more people will buy gas vehicles without the EV incentive. $TSLA suffers because its business relied on the EV credit. Sympathy relationships aren't always same-direction — understand WHY stocks are related before assuming correlation."},
  {q:"It's Monday morning. $ES, $NQ, $YM, and $RTY are all up overnight. $XLE has the strongest weekly Strat setup. What's your first move?",
   options:["Buy $TSLA because you always trade Tesla","Focus your watchlist on energy names ($XOM, $CVX, $COP) that have individual bullish setups","Go short the entire market","Wait for a signal from a random ticker"],
   correct:1,explain:"Broad market is bullish (all four futures up), and $XLE is the strongest sector. Top-down tells you: focus on energy names with individual bullish Strat setups. As Adex says, 'It's an XLE day.' You don't chase $TSLA just because it's popular — you focus on the sector that's showing strength, then pick the best individual setup within it."},
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
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #9 Quiz</div><div style={styles.headerSub}>Sector Rotation</div></div>
    <div style={{...styles.scoreCard,background:passed?"#071a0d":"#1a0a0a",border:`2px solid ${passed?GREEN+"70":RED+"70"}`}}>
      <div style={{position:"relative",width:140,height:140,margin:"0 auto 16px"}}><svg viewBox="0 0 140 140" style={{transform:"rotate(-90deg)"}}><circle cx="70" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="8"/><circle cx="70" cy="70" r="60" fill="none" stroke={passed?GREEN:RED} strokeWidth="8" strokeDasharray={`${(pct/100)*377} 377`} strokeLinecap="round" style={{transition:"stroke-dasharray 1s ease-out"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:36,fontWeight:800,color:passed?GREEN:RED}}>{pct}%</div></div></div>
      <div style={{color:"#ccc",fontSize:15,textAlign:"center"}}>{score} of {total} correct</div>
      <div style={{marginTop:14,padding:"8px 24px",borderRadius:20,background:passed?GREEN+"18":RED+"18",color:passed?GREEN:RED,fontSize:14,fontWeight:700}}>{passed?"✓ PASSED":"✗ NOT YET — Review & Try Again"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>{results.map((c,i)=>(<div key={i} style={{width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:c?GREEN+"20":RED+"20",color:c?GREEN:RED,border:`1px solid ${c?GREEN+"50":RED+"50"}`}}>{i+1}</div>))}</div>
      <button onClick={handleRetry} style={{...styles.nextBtn,marginTop:24,background:passed?`linear-gradient(135deg,${GREEN},#27ae60)`:`linear-gradient(135deg,${GOLD},#c49b30)`,color:passed?"#fff":BLACK}}>{passed?"↺ Retake Quiz":"Try Again"}</button>
    </div></div>);}

  return(
    <div style={styles.container}><div style={styles.header}><div style={styles.headerLabel}>ADEXTRADES UNIVERSITY</div><div style={styles.headerTitle}>Lesson #9 Quiz</div><div style={styles.headerSub}>Sector Rotation</div></div>
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
