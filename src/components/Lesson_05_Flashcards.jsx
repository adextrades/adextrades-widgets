"use client";
import { useState, useCallback, useEffect } from "react";
const GOLD="#D4A843",BLACK="#0D0D0D",CHARCOAL="#1A1A1A",GREEN="#2ECC71",RED_C="#E74C3C";

const CARDS = [
  { front: "What is market structure?", back: "The framework that defines how price moves. Price action = WHY price moves (candlestick analysis). Market structure = HOW price moves (trends, breaks, shifts, and the organizational framework of price movement)." },
  { front: "What are the three market states?", back: "1) UPTREND — higher highs + higher lows. 2) DOWNTREND — lower highs + lower lows. 3) CONSOLIDATION — roughly equal highs and lows (sideways movement)." },
  { front: "What is a Break of Structure (BOS)?", back: "When price violates a previous key level to CONFIRM trend continuation. Despite the name, BOS means the trend is intact. Uptrend BOS = breaking above the previous swing high. Downtrend BOS = breaking below the previous swing low." },
  { front: "When is a higher low confirmed in an uptrend?", back: "Only when price breaks above the previous swing high (BOS). Until that happens, the higher low is just POTENTIAL — not confirmed. You don't know empirically that you're in an uptrend until BOS occurs." },
  { front: "What is a Market Structure Shift (MSS)?", back: "Also called Change of Character (CHoCH). It signals a POTENTIAL TREND REVERSAL. It occurs when price breaks a key level AGAINST the prevailing trend — e.g., in an uptrend, price breaks below the most recent higher low." },
  { front: "BOS vs. MSS — what's the difference?", back: "BOS = break IN the direction of the trend (confirms continuation). MSS = break AGAINST the prevailing trend (signals potential reversal). BOS keeps the trend alive. MSS suggests the trend is dying." },
  { front: "In an uptrend, what should NOT happen if the trend is intact?", back: "Price should NOT close below the most recent higher low. If it does, that's a Market Structure Shift (MSS) — the uptrend is broken and a potential downtrend is forming." },
  { front: "In a downtrend, what triggers an MSS to the upside?", back: "Price breaks ABOVE the most recent lower high. This signals a potential shift from downtrend to uptrend. The downtrend structure is no longer intact." },
  { front: "What is Optimal Trade Entry (OTE)?", back: "The area where price is most likely to reverse to continue in the prevailing trend. It's the most favorable place to enter a trade within a trending market. Located between the 0.5 and 0.786 Fibonacci retracement of the swing leg." },
  { front: "How do you find OTE using Fibonacci retracement?", back: "UPTREND: Draw fibs from swing LOW to swing HIGH. DOWNTREND: Draw fibs from swing HIGH to swing LOW. OTE zone = 0.5 to 0.786 of the retracement. Enter when price pulls back into this zone." },
  { front: "What is the 0.618 level (golden pocket)?", back: "The most favorable entry point within OTE. Price reverses here most often. However, price CAN reverse at 0.5 — don't fixate exclusively on 0.618 or you may miss entries." },
  { front: "What is the 0.786 level (last line of defense)?", back: "If price closes below this level, OTE is likely invalid and the trend may be reversing. This is your stop-loss level — a candle close below 0.786 means consider exiting the position." },
  { front: "Is OTE a specific price or a zone?", back: "A ZONE. Price can reverse at 0.5, 0.55, 0.618, 0.7, or anywhere between 0.5 and 0.786. The 0.618 is most common, but not guaranteed. Never wait exclusively for one level." },
  { front: "What is liquidity in market structure?", back: "Areas where large numbers of buy or sell orders are resting. These orders cluster at obvious levels — swing highs/lows, support/resistance, psychological round numbers, previous day/week/month highs and lows, all-time highs." },
  { front: "What are the three rules of liquidity?", back: "1) Liquidity is EVERYWHERE — it's fuel for price to move. 2) Liquidity is defined by STOP-LOSSES — where retail places stops = where liquidity pools form. 3) Liquidity is used to MANIPULATE price — institutions sweep stops before the real move." },
  { front: "What is a liquidity sweep (stop hunt)?", back: "When price moves into a liquidity zone, triggers stop-losses, then reverses in the intended direction. You enter a trade, set your stop below support, price sweeps your stop, then goes to your original target — without you in it." },
  { front: "What is the Accumulation → Manipulation → Distribution cycle?", back: "ACCUMULATION: Price consolidates in a range. MANIPULATION: Price sweeps stop-losses / grabs liquidity (usually against the intended direction). DISTRIBUTION: Price moves in its true intended direction. This is why stop-hunts happen right before the real move." },
  { front: "Where does manipulation typically occur?", back: "At liquidity zones: swing highs, swing lows, all-time highs, previous day/week/month/quarter highs and lows, and psychological round numbers. Especially after phases of consolidation." },
  { front: "Why did $MA go to all-time highs before dropping to the gap fill?", back: "Accumulation → Manipulation → Distribution. $MA accumulated (consolidated), then manipulated UP to grab buyside liquidity at all-time highs, then distributed DOWN to the gap fill. The move up was the stop-hunt; the move down was the real intended direction." },
  { front: "What happens after a BOS in an uptrend — what should you expect next?", back: "After breaking above the previous swing high (BOS), you should expect a pullback to form the next HIGHER LOW. This pullback ideally enters the OTE zone (0.5–0.786 of the new swing leg) before continuing higher." },
];

export default function Flashcards() {
  const [deck,setDeck]=useState([...CARDS]);const [idx,setIdx]=useState(0);const [flipped,setFlipped]=useState(false);
  const [known,setKnown]=useState(new Set());const [reviewing,setReviewing]=useState(new Set());const [animDir,setAnimDir]=useState(null);
  const current=deck[idx];const total=deck.length;const progress=((known.size+reviewing.size)/CARDS.length)*100;
  const flip=useCallback(()=>setFlipped(f=>!f),[]);
  const next=useCallback((status)=>{
    const id=deck[idx].front;
    if(status==="known"){setKnown(p=>new Set([...p,id]));setReviewing(p=>{const n=new Set(p);n.delete(id);return n;});}
    else{setReviewing(p=>new Set([...p,id]));setKnown(p=>{const n=new Set(p);n.delete(id);return n;});}
    setAnimDir(status==="known"?"right":"left");
    setTimeout(()=>{setFlipped(false);setAnimDir(null);setIdx(i=>(i+1)%total);},250);
  },[deck,idx,total]);
  const shuffle=useCallback(()=>{setDeck([...CARDS].sort(()=>Math.random()-0.5));setIdx(0);setFlipped(false);setKnown(new Set());setReviewing(new Set());},[]);
  const reset=useCallback(()=>{setDeck([...CARDS]);setIdx(0);setFlipped(false);setKnown(new Set());setReviewing(new Set());},[]);
  useEffect(()=>{const h=(e)=>{if(e.code==="Space"){e.preventDefault();flip();}if(e.code==="ArrowRight")next("known");if(e.code==="ArrowLeft")next("review");};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[flip,next]);

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${BLACK} 0%,#1a1510 100%)`,fontFamily:"'Segoe UI',system-ui,sans-serif",padding:"20px",boxSizing:"border-box"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:700,marginBottom:4}}>ADEXTRADES UNIVERSITY</div>
        <div style={{color:"#fff",fontSize:22,fontWeight:700}}>Lesson #5 Flashcards</div>
        <div style={{color:"#888",fontSize:13,marginTop:2}}>Market Structure 101</div>
      </div>
      <div style={{maxWidth:500,margin:"0 auto 16px",display:"flex",gap:12,alignItems:"center"}}>
        <div style={{flex:1,height:6,background:"#2a2a2a",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${GOLD},#e8c85a)`,borderRadius:3,transition:"width 0.4s"}}/></div>
        <div style={{color:"#888",fontSize:12,whiteSpace:"nowrap"}}>{known.size+reviewing.size}/{CARDS.length}</div>
      </div>
      <div style={{maxWidth:500,margin:"0 auto 20px",display:"flex",justifyContent:"center",gap:20}}>
        {[{c:GREEN,l:"Mastered",v:known.size},{c:RED_C,l:"Review",v:reviewing.size},{c:"#555",l:"Unseen",v:CARDS.length-known.size-reviewing.size}].map(({c,l,v})=>(<div key={l} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:8,height:8,borderRadius:"50%",background:c}}/><span style={{color:"#aaa",fontSize:12}}>{l}: {v}</span></div>))}
      </div>
      <div style={{maxWidth:500,margin:"0 auto",perspective:1000}}>
        <div onClick={flip} style={{cursor:"pointer",position:"relative",height:320,transformStyle:"preserve-3d",transition:animDir?"transform 0.25s, opacity 0.25s":"transform 0.5s",transform:`${flipped?"rotateY(180deg)":"rotateY(0)"} ${animDir==="right"?"translateX(60px)":animDir==="left"?"translateX(-60px)":""}`,opacity:animDir?0.3:1}}>
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",background:`linear-gradient(145deg,${CHARCOAL},#222)`,border:`2px solid ${GOLD}40`,borderRadius:16,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"30px 28px",boxSizing:"border-box"}}>
            <div style={{color:GOLD,fontSize:10,letterSpacing:2,fontWeight:700,marginBottom:16,opacity:0.7}}>QUESTION</div>
            <div style={{color:"#fff",fontSize:17,textAlign:"center",lineHeight:1.5,fontWeight:500}}>{current.front}</div>
            <div style={{color:"#666",fontSize:11,marginTop:"auto",paddingTop:12}}>Tap to flip</div>
          </div>
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",background:`linear-gradient(145deg,#1a1508,#1e1a10)`,border:`2px solid ${GOLD}`,borderRadius:16,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"24px 28px",boxSizing:"border-box",overflow:"auto"}}>
            <div style={{color:GOLD,fontSize:10,letterSpacing:2,fontWeight:700,marginBottom:12}}>ANSWER</div>
            <div style={{color:"#e8e0d0",fontSize:14,textAlign:"center",lineHeight:1.6}}>{current.back}</div>
          </div>
        </div>
      </div>
      <div style={{textAlign:"center",color:"#666",fontSize:12,margin:"12px 0"}}>Card {idx+1} of {total}</div>
      <div style={{maxWidth:500,margin:"0 auto",display:"flex",gap:12,justifyContent:"center"}}>
        {[{label:"← Review Again",color:RED_C,action:"review"},{label:"Got It →",color:GREEN,action:"known"}].map(({label,color,action})=>(<button key={action} onClick={()=>next(action)} style={{flex:1,padding:"14px 0",background:"transparent",border:`2px solid ${color}`,color,borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>e.target.style.background=color+"20"} onMouseLeave={e=>e.target.style.background="transparent"}>{label}</button>))}
      </div>
      <div style={{maxWidth:500,margin:"16px auto 0",display:"flex",gap:10,justifyContent:"center"}}>
        <button onClick={shuffle} style={{padding:"8px 20px",background:"#2a2a2a",color:"#aaa",border:"1px solid #3a3a3a",borderRadius:8,fontSize:12,cursor:"pointer"}}>🔀 Shuffle</button>
        <button onClick={reset} style={{padding:"8px 20px",background:"#2a2a2a",color:"#aaa",border:"1px solid #3a3a3a",borderRadius:8,fontSize:12,cursor:"pointer"}}>↺ Reset</button>
      </div>
      <div style={{textAlign:"center",color:"#444",fontSize:11,marginTop:16}}>Space = flip · ← = review · → = got it</div>
    </div>
  );
}
