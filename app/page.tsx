"use client";
import {useEffect,useMemo,useState} from "react";

const revealAt="2026-09-16T19:00:00-04:00";
const SHOW_ALL=true; // TEST: set to false to re-lock missions by their real dates
const FORCE_REVEAL=false; // TEST: set to true to preview the reveal screen

function cd(ms:number){const t=Math.max(0,Math.floor(ms/1000));return[Math.floor(t/86400),Math.floor(t%86400/3600),Math.floor(t%3600/60),t%60]}

type Mission={id:string;date:string;glyph:string;num:string;title:string;intro:string;bullets:string[]|null;eggLine:string;eggNote:string;closing:string[]|null};

const MISSIONS:Mission[]=[
 {id:"a",date:"SEP 10",glyph:"◌",num:"MISSION 001",title:"WATERPROOF",intro:"Bring:",bullets:["Waterproof shoes","A waterproof jacket","Waterproof pants"],eggLine:"You're going to want to stay dry.",eggNote:"Actually, bring two pairs — the trail gets muddy.",closing:["That's all I'm telling you."]},
 {id:"b",date:"SEP 11",glyph:"◇",num:"MISSION 002",title:"LAYERS",intro:"Pack clothes you can easily layer.",bullets:["Long sleeves","Sweaters","A warm mid-layer"],eggLine:"You'll want options.",eggNote:"The weather changes twice a day where we're going.",closing:null},
 {id:"c",date:"SEP 12",glyph:"↖",num:"MISSION 003",title:"CAPTURE",intro:"Bring your:",bullets:["Camera","Drone","Portable chargers / maybe a Type C Adapter"],eggLine:"You're going to want to capture this one.",eggNote:"There's a drone-only shot planned at golden hour.",closing:["Trust me."]},
 {id:"d",date:"SEP 13",glyph:"≈",num:"MISSION 004",title:"SWIM",intro:"Pack a swimsuit.",bullets:null,eggLine:"Yes, you actually need one.",eggNote:"Hint: it's not a pool.",closing:["Don't ask why."]},
 {id:"e",date:"SEP 14",glyph:"□",num:"MISSION 005",title:"DAY BAG",intro:"Bring a small backpack or crossbody bag for daytime exploring.",bullets:null,eggLine:"You'll want your essentials close by.",eggNote:"Snacks count as essentials.",closing:null},
 {id:"f",date:"SEP 15",glyph:"⌂",num:"MISSION 006",title:"COMFORT",intro:"Pack comfortable clothes and shoes.",bullets:null,eggLine:"There will be plenty of exploring.",eggNote:"You'll be doing more walking than you think.",closing:["You'll be glad you did."]}
];

const PARTICLES=[
 {top:"22%",left:"12%",size:6,tx:40,ty:-30,delay:3.15},
 {top:"30%",left:"38%",size:5,tx:-30,ty:50,delay:3.30},
 {top:"15%",left:"55%",size:4,tx:60,ty:20,delay:3.05},
 {top:"45%",left:"20%",size:5,tx:-50,ty:-40,delay:3.45},
 {top:"8%",left:"70%",size:6,tx:-40,ty:60,delay:3.20},
 {top:"55%",left:"65%",size:4,tx:30,ty:-50,delay:3.38},
 {top:"5%",left:"20%",size:5,tx:20,ty:70,delay:3.55},
 {top:"60%",left:"10%",size:4,tx:50,ty:10,delay:3.10}
];
const RINGS=[3.0,3.3,3.6];

export default function Home(){
 const[now,setNow]=useState<Date|null>(null),[tick,setTick]=useState(0),[toast,setToast]=useState<string|null>(null);
 const[activeEgg,setActiveEgg]=useState<string|null>(null),[burstSeed,setBurstSeed]=useState(0);
 const[photoOk,setPhotoOk]=useState(false);
 useEffect(()=>{const img=new window.Image();img.onload=()=>setPhotoOk(true);img.onerror=()=>setPhotoOk(false);img.src="/elvir.jpg";},[]);
 useEffect(()=>{fetch("/api/time",{cache:"no-store"}).then(r=>r.json()).then(x=>setNow(new Date(x.now))).catch(()=>setNow(new Date()));},[]);
 useEffect(()=>{const id=setInterval(()=>setTick(x=>x+1),1000);return()=>clearInterval(id)},[]);
 const current=useMemo(()=>now?new Date(now.getTime()+tick*1000):null,[now,tick]);
 const reveal=new Date(revealAt), revealed=FORCE_REVEAL||(!!current&&current>=reveal), left=current?cd(reveal.getTime()-current.getTime()):null;
 const unlocked=(i:number)=>SHOW_ALL||(!!current&&current>=new Date(`2026-09-${String(10+i).padStart(2,"0")}T09:00:00-04:00`));
 const show=(x:string)=>{setToast(x);setTimeout(()=>setToast(null),2600)};
 const toggleEgg=(id:string)=>{setActiveEgg(a=>a===id?null:id);setBurstSeed(s=>s+1)};

 if(revealed)return <main className="reveal"><div className="stars"/><div className="aurora a1"/><div className="aurora a2"/><section className="revealCard"><div className="eyebrow">CLASSIFIED DESTINATION // UNLOCKED</div><p className="intro">You followed the instructions.</p><p className="intro">You packed the right things.</p><p className="intro">And somehow, you still didn't know.</p><div className="word">{["I","C","E","L","A","N","D"].map((x,i)=><span key={x} style={{animationDelay:`${i*.08}s`}}>{x}</span>)}</div><div className="flag">🇮🇸</div><h1>You're going to Iceland.</h1><p className="dates">SEPTEMBER 16–20, 2026</p><div className="divider"/><p className="final">We leave tonight.<br/>Happy 30th, Elvir. ❤️</p><p className="small">YOUR BIRTHDAY ADVENTURE STARTS NOW.</p></section></main>;

 return <main className="page">

  <header className="hero">
   <div className="bootOverlay" aria-hidden="true">
    <div className="scanSweep"/>
    <div className="bootLine" style={{animationDelay:"0.25s"}}>ESTABLISHING SECURE LINE</div>
    <div className="bootLine" style={{animationDelay:"1.2s"}}>DECRYPTING PACKING ORDERS</div>
    <div className="bootLine granted" style={{animationDelay:"2.2s"}}>ACCESS GRANTED</div>
    <div className="bootTrack"><div className="bootBar"/></div>
   </div>
   {PARTICLES.map((p,i)=><span key={i} className="particle" style={{top:p.top,left:p.left,width:p.size,height:p.size,animationDelay:`${p.delay}s`,["--tx" as any]:`${p.tx}px`,["--ty" as any]:`${p.ty}px`}}/>)}
   {RINGS.map((d,i)=><span key={i} className="ring" style={{animationDelay:`${d}s`}}/>)}
   <button className="secret" aria-label="secret" onClick={()=>show("Nice try. The destination remains classified.")}/>
   <div className="heroRow">
    <div className="heroText">
     <div className="eyebrow">ELVIR // 30TH BIRTHDAY</div>
     <h1 className="heroTitle"><span className="line l1">Your birthday</span><span className="line l2"><em>mission</em> begins.</span></h1>
     <p className="heroCopy">Your destination is classified. Your job is simple: follow the instructions, pack accordingly, and ask no questions.</p>
     <p className="heroTagline">Something different.</p>
     <div className="badge"><b/> DESTINATION: CLASSIFIED</div>
    </div>
    <figure className="heroPhoto">
     <div className="photoFrame">
      {photoOk?<img src="/elvir.jpg" alt="Elvir"/>:<div className="photoPlaceholder"><span>📷</span><p>Add a photo at<br/><code>public/elvir.jpg</code></p></div>}
     </div>
     <figcaption className="photoCaption"><span>SUBJECT: ELVIR // AGE 30</span><span className="accent">09.17</span></figcaption>
    </figure>
   </div>
  </header>

  <section className="countdownWrap">
   <div className="countLabel">TIME UNTIL DESTINATION UNLOCK</div>
   <div className="countdown">
    {left?left.map((x,i)=>[
     i>0&&<span className="sep" key={"s"+i}>:</span>,
     <div className="unit" key={"u"+i}><div className="val">{String(x).padStart(2,"0")}</div><div className="lbl">{["DAYS","HRS","MIN","SEC"][i]}</div></div>
    ]):<span className="syncing">SYNCING WITH MISSION CONTROL…</span>}
   </div>
   <div className="unlock">SEPTEMBER 16 // 7:00 PM EASTERN</div>
  </section>

  <section className="missions">
   <div className="missionsHead"><span>01—06</span><div><h2>Daily instructions</h2><p>New information unlocks each morning.</p></div></div>
   <div className="missionsGrid">
    {MISSIONS.map((m,i)=>{const ok=unlocked(i);return <article key={m.id} className={`missionCard ${ok?"available":"locked"}`} style={{animationDelay:`${i*0.08}s`}}>
     <div className="missionTop"><span>{m.date}</span><span className="glyph">{ok?m.glyph:"🔒"}</span></div>
     <div className="missionNum">{m.num}</div>
     <h2 className="missionTitle">{ok?m.title:"CLASSIFIED"}</h2>
     {ok?<>
      <p className="missionIntro">{m.intro}</p>
      {m.bullets&&<ul className="missionBullets">{m.bullets.map(b=><li key={b}>{b}</li>)}</ul>}
      <div className="eggBlock">
       <p className="eggRow">{m.eggLine}<button className="eggBtn" aria-label="reveal hint" onClick={()=>toggleEgg(m.id)}><span className="eggDot"/>{activeEgg===m.id&&<span key={burstSeed} className="eggRing"/>}</button></p>
       {activeEgg===m.id&&<div className="eggNote">{m.eggNote}</div>}
      </div>
      {m.closing&&m.closing.map(c=><p key={c} className="missionClosing">{c}</p>)}
     </>:<p className="lockedCopy">This mission hasn't unlocked yet.<br/><span>Come back soon.</span></p>}
    </article>})}
   </div>
  </section>

  <section className="teaser"><button onClick={()=>show("You found something. But not the destination. 👀")}>✦</button><p>Some things are better discovered than explained.</p><span>— Sejla, Selma &amp; Michael</span></section>
  <footer><span>MISSION STATUS: ACTIVE</span><span>◦</span><button onClick={()=>show("Good instincts. Still classified.")}>ACCESS DENIED</button></footer>
  {toast&&<div className="toast">{toast}</div>}
 </main>;
}
