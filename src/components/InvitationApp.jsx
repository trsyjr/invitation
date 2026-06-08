import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, ShieldAlert, Cpu, EyeOff, FolderOpen } from 'lucide-react';

import pbbVideo from '../assets/PBB 2026.mp4'; 
import wake from '../assets/Wake.mp4';
import jes from '../assets/JesPBB.png';
import mina from '../assets/Mina.png';
import perrine from '../assets/Perrine.png';
import merl from '../assets/Merl.png';
import aki from '../assets/Aki.png';
import kleng from '../assets/Kleng.png';
import jena from '../assets/Jena.png';
import thea from '../assets/Althea.png';
import noreen from '../assets/Noreen.png';
import nancy from '../assets/Nancy.png';
import jo from '../assets/Jo.png';
import ocampo from '../assets/O.png';
import aljohn from '../assets/Aljohn.png';
import meann from '../assets/Meann.png';
import pao from '../assets/Pao.png';
import nic from '../assets/Nic.png';
import dc from '../assets/DC.png';
import lj from '../assets/Lj.png';
import jops from '../assets/Jops.png';
import edd from '../assets/Edd.png';
import sy from '../assets/Sy.png';
import pbbQR from '../assets/pbbQR.png'; 

export default function InvitationApp() {
  const [stage, setStage] = useState('hacked');
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [terminalText, setTerminalText] = useState([]);
  const [displayedImageUrl, setDisplayedImageUrl] = useState('');
  const [isFolderOpened, setIsFolderOpened] = useState(false);

  const emailImageMap = {
    'trsyjr@dswd.gov.ph': sy,
    'jsmencias@dswd.gov.ph': jes,
    'callanto@dswd.gov.ph' : mina,
    'pdpadilla@dswd.gov.ph' : perrine,
    'mopalacio@dswd.gov.ph' : merl,
    'merffernandez@dswd.gov.ph' : aki,
    'kmeflores@dswd.gov.ph' : kleng,
    'jmcaguilar@dswd.gov.ph' : jena,
    'amlpineda@dswd.gov.ph' : thea,
    'nndata@dswd.gov.ph' : noreen,
    'nefortes@dswd.gov.ph' : nancy,
    'jmedillo@dswd.gov.ph' : jo,
    'obocampo@dswd.gov.ph' : ocampo,
    'acpurca@dswd.gov.ph' : aljohn,
    'matdealo@dswd.gov.ph' : meann,
    'jpmleyva@dswd.gov.ph' : pao,
    'cnddorado@dswd.gov.ph' : nic,
    'ejsconsulta@dswd.gov.ph' : dc,
    'ljrfrancisco@dswd.gov.ph' : lj,
    'jtmpacao@dswd.gov.ph' : jops,
    'epipapa@dswd.gov.ph' : edd,
  };

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const introCanvasRef = useRef(null);
  const staticCanvasRef = useRef(null);

  const hackLogs = [
    ">> INITIALIZING NEURAL LINK START PROBE...",
    ">> ESTABLISHING SECURE DIRECT TUNNEL... [OK]",
    ">> INTERCEPTING HOST PERIPHERAL INPUTS...",
    ">> DECRYPTING DATA LAYER MEMORY STACK...",
    ">> WARNING: SYSTEM COMPLETELY COMPROMISED."
  ];

  const codeSnippets = ['01', '10', '0xFA', 'SYS_INIT', 'LINK_START', 'OVERRIDE', 'NULL', 'ROOT_ACCESS', 'DATA_VORTEX', '404', 'NaN', 'µS'];

  // PHASE 1: Terminal Typewriter Effect
  useEffect(() => {
    if (stage !== 'hacked') return;
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < hackLogs.length) {
        setTerminalText(prev => [...prev, hackLogs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStage('form'), 2000);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [stage]);

  // PHASE 1 & 2 Background Matrix Core Loop
  useEffect(() => {
    if (stage !== 'hacked' && stage !== 'form') return;
    const canvas = introCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 100;

    class CodeParticle {
      constructor() { this.reset(); }
      reset() {
        const angle = Math.random() * Math.PI * 2;
        const maxRadius = Math.max(width, height) * 0.8;
        const distance = maxRadius * (0.6 + Math.random() * 0.4);
        this.x = width / 2 + Math.cos(angle) * distance;
        this.y = height / 2 + Math.sin(angle) * distance;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.fontSize = Math.floor(Math.random() * 5) + 10;
        this.speed = Math.random() * 1.5 + 1;
        this.angleOffset = Math.random() * 0.02 + 0.01;
      }
      update() {
        const centerX = width / 2;
        const centerY = height / 2;
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 15) { this.reset(); return; }

        const currentAngle = Math.atan2(this.y - centerY, this.x - centerX);
        const newAngle = currentAngle - this.angleOffset;
        const pullRadius = distance - this.speed * (1 + (300 / (distance + 1))); 

        this.x = centerX + Math.cos(newAngle) * pullRadius;
        this.y = centerY + Math.sin(newAngle) * pullRadius;
        this.opacity = Math.min(1, distance / (width * 0.4));
      }
      draw() {
        ctx.fillStyle = `rgba(239, 68, 68, ${this.opacity})`;
        ctx.font = `${this.fontSize}px monospace`;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    for (let i = 0; i < maxParticles; i++) particles.push(new CodeParticle());

    const renderLoop = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(0, 0, width, height);
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', handleResize); };
  }, [stage]);

  const handleVideo1End = () => {
    if (video1Ref.current) video1Ref.current.pause();
    setStage('invitedText'); 
  };

  // Monitor Video 2 run time to pause it and reveal elements before it ends
  useEffect(() => {
    if (stage !== 'video2') return;

    const checkTime = setInterval(() => {
      const video = video2Ref.current;
      if (video) {
        if (video.duration && video.currentTime >= video.duration - 0.5) {
          video.pause();
          clearInterval(checkTime);
          setStage('envelope'); 
        }
      }
    }, 30);

    return () => clearInterval(checkTime);
  }, [stage]);

  const handleJoinClick = () => {
    setStage('blackout');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const lowerCaseEmail = email.toLowerCase().trim(); 
    if (emailImageMap[lowerCaseEmail]) {
      setDisplayedImageUrl(emailImageMap[lowerCaseEmail]);
      setStage('whiteFlash'); 
    } else {
      alert('Node mismatch. Invalid user signature identified.');
    }
  };

  const folderContainerVariants = {
    hidden: { scale: 0.8, y: 120, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const invitationCardVariants = {
    hidden: { 
      scale: 0.4,
      opacity: 0,
      zIndex: 15
    },
    visible: {
      scale: 3.5, 
      opacity: 1,
      zIndex: 50, 
      transition: { 
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden font-mono text-white select-none relative w-full">
      
      {/* Background Canvas Intro */}
      {['hacked', 'form'].includes(stage) && (
        <canvas ref={introCanvasRef} className="absolute inset-0 w-full h-full block z-0" />
      )}

      {/* Background Video Layer 1 */}
      {['video1', 'invitedText'].includes(stage) && (
        <div className="absolute inset-0 z-10 bg-black w-full h-full">
          <video
            ref={video1Ref}
            src={pbbVideo} 
            autoPlay
            muted
            playsInline
            onEnded={handleVideo1End}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${stage === 'invitedText' ? 'backdrop-blur-md bg-black/60' : 'backdrop-blur-none bg-transparent'}`} />
        </div>
      )}

      {/* Background Video Layer 2 Persistent Stage */}
      {['video2', 'envelope'].includes(stage) && (
        <div className="absolute inset-0 z-10 bg-black w-full h-full overflow-hidden">
          <video
            ref={video2Ref}
            src={wake} 
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Eyelids configuring natural blinks */}
          {stage === 'video2' && (
            <div className="absolute inset-0 z-55 pointer-events-none flex flex-col justify-between">
              <motion.div 
                className="w-full bg-black border-b border-blue-500/20 origin-top shadow-[0_15px_35px_rgba(0,0,0,0.98)]"
                animate={{ 
                  height: [
                    "0%", "100%", "0%", "100%", "0%"
                  ] 
                }}
                transition={{ 
                  duration: 5.0, 
                  repeat: 0, 
                  times: [0, 0.25, 0.48, 0.75, 1.0], 
                  ease: [0.42, 0, 0.58, 1] 
                }}
              />
              <motion.div 
                className="w-full bg-black border-t border-blue-500/20 origin-bottom shadow-[0_-15px_35px_rgba(0,0,0,0.98)]"
                animate={{ 
                  height: [
                    "0%", "100%", "0%", "100%", "0%"
                  ] 
                }}
                transition={{ 
                  duration: 5.0, 
                  repeat: 0, 
                  times: [0, 0.25, 0.48, 0.75, 1.0], 
                  ease: [0.42, 0, 0.58, 1] 
                }}
              />
            </div>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">

        {/* POST-EMAIL WHITE FLASH SCREEN */}
        {stage === 'whiteFlash' && (
          <motion.div
            key="white-flash-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => {
              setTimeout(() => setStage('video1'), 800);
            }}
            className="absolute inset-0 z-55 bg-white w-full h-full"
          />
        )}
        
        {/* PHASE 1: LOG ENTRY INTRO */}
        {stage === 'hacked' && (
          <motion.div
            key="hacked-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-transparent"
          >
            <div className="max-w-xl w-full p-6 mx-4 relative z-10">
              <div className="relative bg-zinc-950/90 border-2 border-red-500/40 rounded-xl p-6 shadow-[0_0_40px_rgba(239,68,68,0.25)] backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-red-800/40 pb-3 mb-4 text-red-400">
                  <div className="flex items-center gap-2">
                    <Terminal size={18} className="animate-pulse text-red-400" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400">SYSTEM CORE INTRUSION</span>
                  </div>
                  <Activity size={16} className="text-red-500 animate-[bounce_1s_infinite]" />
                </div>
                <div className="space-y-2.5 min-h-[150px] font-mono">
                  {terminalText.map((line, idx) => (
                    <p key={idx} className={`text-xs tracking-widest leading-relaxed ${idx === hackLogs.length - 1 ? "text-red-400 font-black text-sm animate-pulse pt-2 border-t border-red-900/50" : "text-red-500/80"}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: LOGIN SUBMIT FORM */}
        {stage === 'form' && (
          <motion.div
            key="form-stage"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="relative z-50 w-full min-h-screen flex items-center justify-center p-4 bg-transparent"
          >
            <div className="relative w-full max-w-md bg-zinc-950/95 border border-red-500/30 p-8 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
              <div className="flex justify-between items-center mb-6 border-b border-red-900/60 pb-4">
                <div className="flex items-center gap-2 text-red-400">
                  <ShieldAlert size={16} className="animate-pulse text-red-400" />
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase">IDENTITY_RECAPTURING</span>
                </div>
              </div>
              <div className="text-center mb-6">
                <h1 className="text-xl font-black tracking-widest text-red-400 uppercase flex items-center justify-center gap-2">
                  <Cpu size={18} /> INSERT EMAIL
                </h1>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border bg-black/90 p-1 border-red-500/20">
                  <input
                    type="email"
                    placeholder="example@dswd.gov.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="w-full py-3 bg-transparent border-0 text-red-400 focus:outline-none text-center font-bold text-xs tracking-widest uppercase"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(239,68,68,0.4)" }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full py-3.5 bg-red-950 hover:bg-red-900 text-red-400 border border-red-500/60 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 text-xs"
                >
                  <EyeOff size={14} /> SUBMIT
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}

        {/* INTERSTITIAL: "YOU ARE INVITED!" */}
        {stage === 'invitedText' && (
          <motion.div
            key="invited-text-stage"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ 
              initial: { duration: 0.6 },
              animate: { duration: 0.8, ease: "easeOut" },
              exit: { duration: 0.6, ease: "easeInOut" }
            }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-transparent p-4 gap-8"
          >
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-[0.3em] uppercase text-blue-400 text-center drop-shadow-[0_0_35px_rgba(59,130,246,0.6)] font-mono animate-pulse">
                YOU ARE INVITED!
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-6 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59,130,246,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinClick}
              className="px-12 py-4 bg-blue-950 hover:bg-blue-900 text-blue-400 border-2 border-blue-500 rounded-lg font-black uppercase tracking-[0.25em] text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors duration-200"
            >
              Join
            </motion.button>
          </motion.div>
        )}

        {/* BLACKOUT SEQUENCE */}
        {stage === 'blackout' && (
          <motion.div
            key="blackout-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => setStage('video2')}
            className="absolute inset-0 z-55 bg-black w-full h-full"
          />
        )}

        {/* PHASE 3: OPENING ENVELOPE / FLOATING ELEMENTS */}
        {stage === 'envelope' && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-transparent perspective-[1500px]">
            <motion.div
              key="folder-stage"
              variants={folderContainerVariants}
              initial="hidden"
              animate="visible"
              onClick={() => {
                if (!isFolderOpened) setIsFolderOpened(true);
              }}
              className={`relative w-[340px] h-[460px] flex items-center justify-center ${!isFolderOpened ? 'cursor-pointer' : ''}`}
            >
              
              {/* BACK PORTRAIT FOLDER BASEPLATE */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-800 via-blue-950 to-zinc-950 rounded-2xl z-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-2 border-blue-600/30 overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-5 bg-black/40 border-r border-blue-500/10" />
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-zinc-900/90 border-t-2 border-dashed border-blue-600/20" />
              </div>

              {/* FLOATING SCALED OVERSIZE GRID VIEWPORTS */}
              <div className="absolute inset-0 flex justify-center items-center overflow-visible z-45 pointer-events-none">
                <motion.div
                  variants={invitationCardVariants}
                  initial="hidden"
                  animate={isFolderOpened ? "visible" : "hidden"}
                  onAnimationComplete={() => { 
                    if (isFolderOpened) {
                      setTimeout(() => setStage('tvTurnedOff'), 12000); 
                    }
                  }}
                  className="w-[92vw] max-w-6xl grid grid-cols-2 gap-8 items-center justify-center pointer-events-auto relative bg-transparent"
                >
                  {/* LEFT ELEMENT: Enlarged Vertical Profile Invitation Card */}
                  <div className="w-full flex justify-end pr-2">
                    <img 
                      src={displayedImageUrl} 
                      alt="User Profile Display" 
                      className="w-full max-w-[180px] aspect-[3/4.2] object-cover rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10"
                    />
                  </div>

                  {/* RIGHT ELEMENT: Enlarged QR Display Stack with Typography Labels */}
                  <div className="w-full flex flex-col items-center justify-center gap-3 pl-2">
                    <span className="text-white text-[7px] font-black tracking-[0.25em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      TAKE A PHOTO
                    </span>
                    
                    <img 
                      src={pbbQR} 
                      alt="pbbQR Code Asset" 
                      className="w-28 h-28 object-contain rounded-xl bg-white p-2 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
                    />

                    <span className="text-zinc-300 text-[5px] font-bold tracking-[0.12em] text-center max-w-[150px] uppercase leading-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      CONTRIBUTION WILL BE ANNOUNCED SOON
                    </span>
                  </div>

                  {/* BOTTOM FOOTER OVERLAY */}
                  <div className="absolute -bottom-10 inset-x-0 pt-1 pb-1 px-2 text-[3px] text-zinc-400 font-mono uppercase tracking-widest z-20 pointer-events-none flex justify-between items-end">
                    <span className="opacity-50">CBD-PLDS PBB 2026</span>
                    <span className="opacity-60 truncate max-w-[90px] text-right">SIG: {email}</span>
                  </div>
                </motion.div>
              </div>

              {/* FRONT COVER FOLDER PANEL */}
              <motion.div
                style={{ originX: "0%", transformStyle: "preserve-3d" }}
                initial={{ rotateY: 0, zIndex: 25, opacity: 1 }}
                animate={isFolderOpened ? { rotateY: -140, opacity: 0.05, filter: "blur(2px)", x: -20 } : { rotateY: 0, opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-2xl border-2 border-blue-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-6 backface-hidden"
              >
                <div className="absolute inset-y-0 left-0 w-4 bg-blue-800/90 rounded-l-2xl border-r border-blue-900/60" />
                <div className="absolute top-4 right-4 text-blue-400/30 font-mono text-[9px]">//SECURE_08</div>
                <div className="absolute bottom-4 left-8 text-blue-400/30 font-mono text-[9px]">PBB_2026//</div>

                <div className="text-center border-2 border-double border-blue-900/60 rounded-xl py-10 px-5 bg-zinc-950/40 shadow-2xl backdrop-blur-md w-full max-w-[240px] ml-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg border border-amber-300/40">
                    <FolderOpen size={22} className="text-zinc-950" />
                  </div>
                  <h2 className="text-blue-100 font-black font-mono text-sm tracking-[0.25em] uppercase leading-tight mb-1">
                    CLASSIFIED DOCS
                  </h2>
                  <p className="text-blue-400/80 font-mono text-[9px] uppercase tracking-widest">
                    CASE FILE: CONFIDENTIAL
                  </p>
                  <div className="w-12 h-0.5 bg-blue-500/30 mx-auto my-4" />
                  <p className="text-blue-400 font-bold font-mono text-[10px] tracking-widest uppercase animate-pulse">
                    TAP TO OPEN
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        )}

        {/* RETRO TV CRT POWER-OFF BLINK DISINTEGRATION ENGINE */}
        {stage === 'tvTurnedOff' && (
          <motion.div
            key="tv-turned-off-stage"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-55 bg-black w-full h-full flex items-center justify-center"
            onAnimationComplete={() => {
              setTimeout(() => {
                window.close();
                setTimeout(() => { window.location.replace('about:blank'); }, 100);
              }, 5000); 
            }}
          >
            <motion.div 
              initial={{ scaleY: 1, scaleX: 1, opacity: 1 }}
              animate={{ 
                scaleY: [1, 0.012, 0.012, 0],
                scaleX: [1, 1, 0.02, 0],
                backgroundColor: ["#fff", "#fff", "#fff", "#000"]
              }}
              transition={{
                duration: 0.7,
                times: [0, 0.4, 0.85, 1],
                ease: "easeOut"
              }}
              className="w-full h-2 bg-white shadow-[0_0_30px_rgba(255,255,255,1),0_0_60px_rgba(255,255,255,0.8)]"
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}