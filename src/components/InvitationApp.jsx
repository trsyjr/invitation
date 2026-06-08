import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, ShieldAlert, Cpu, EyeOff, FolderOpen, Mail } from 'lucide-react';

import pbbVideo from '../assets/PBB 2026.mp4'; 
import wake from '../assets/Wake.mp4';
import jes from '../assets/JesPBB.png';

export default function InvitationApp() {
  const [stage, setStage] = useState('hacked');
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [terminalText, setTerminalText] = useState([]);
  const [displayedImageUrl, setDisplayedImageUrl] = useState('');
  const [isFolderOpened, setIsFolderOpened] = useState(false);

  const emailImageMap = {
    'trsyjr@dswd.gov.ph': '/path/to/image1.png',
    'jsmencias@dswd.gov.ph': jes,
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

  // AGGRESSIVE HYPER-SPEED SCATTER TRAJECTORY ARRAYS
  const floatingEnvelopes = Array.from({ length: 16 }).map((_, i) => {
    const trajectory = i % 4;
    let startX, startY, endX, endY;

    if (trajectory === 0) { // Fast Left to Right Wide Out
      startX = -40; startY = Math.random() * 120 - 10;
      endX = 140; endY = startY + (Math.random() * 40 - 20);
    } else if (trajectory === 1) { // Fast Right to Left Wide Out
      startX = 140; startY = Math.random() * 120 - 10;
      endX = -40; endY = startY + (Math.random() * 40 - 20);
    } else if (trajectory === 2) { // Violent Downward Scatter
      startX = Math.random() * 140 - 20; startY = -40;
      endX = startX + (Math.random() * 60 - 30); endY = 140;
    } else { // Violent Upward Scatter
      startX = Math.random() * 140 - 20; startY = 140;
      endX = startX + (Math.random() * 60 - 30); endY = -40;
    }

    return {
      id: i,
      size: Math.random() * 30 + 60, 
      startX, startY, endX, endY,
      duration: Math.random() * 1.0 + 1.2, // Ultra-fast chaotic speeds (1.2s - 2.2s)
      delay: Math.random() * -4
    };
  });

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

  // CRUNCHY RETRO TELEVISION STATIC ENGINE
  useEffect(() => {
    const isStaticState = stage === 'staticAfterFlash';
    if (!isStaticState) return;

    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const bufferCanvas = document.createElement('canvas');
    bufferCanvas.width = 320;
    bufferCanvas.height = 180;
    const bufferCtx = bufferCanvas.getContext('2d');
    const bufferData = bufferCtx.createImageData(bufferCanvas.width, bufferCanvas.height);
    const data = bufferData.data;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const renderTVStatic = () => {
      const scanlineOffset = Date.now() * 0.08;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() > 0.5 ? 255 : 0;

        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 255;
      }

      bufferCtx.putImageData(bufferData, 0, 0);

      ctx.clearRect(0, 0, width, height);

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(bufferCanvas, 0, 0, width, height);

      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      for (let y = 0; y < height; y += 3) {
        ctx.fillRect(0, y, width, 1);
      }

      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillRect(0, scanlineOffset % height, width, 14);

      if (Math.random() > 0.92) {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(0, Math.random() * height, width, Math.random() * 8);
      }

      animationFrameId = requestAnimationFrame(renderTVStatic);
    };
    renderTVStatic();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [stage]);

  const handleVideo1End = () => {
    if (video1Ref.current) video1Ref.current.pause();
    setStage('envelope');
  };

  const handleVideo2End = () => {
    if (video2Ref.current) video2Ref.current.pause();
    setStage('staticLastBlink');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const lowerCaseEmail = email.toLowerCase().trim(); 
    if (emailImageMap[lowerCaseEmail]) {
      setDisplayedImageUrl(emailImageMap[lowerCaseEmail]);
      setStage('video1'); 
    } else {
      alert('Node mismatch. Invalid user signature identified.');
    }
  };

  // Folder Floating Entrance Animation
  const folderContainerVariants = {
    hidden: { scale: 0.8, y: 120, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // MAXIMUM SCALE BLOCK FOR FULL SCREEN PRESENCE
  const invitationCardVariants = {
    hidden: { 
      scale: 0.6,
      opacity: 0,
      zIndex: 15
    },
    visible: {
      scale: 1.80, // Massive full scale bump up
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

      {/* Background Video Layer */}
      {['video1', 'envelope', 'blinding', 'staticAfterFlash'].includes(stage) && (
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
          <div className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${stage === 'envelope' ? 'backdrop-blur-md bg-black/60' : 'backdrop-blur-none bg-transparent'}`} />
        </div>
      )}

      {/* HIGH VELOCITY RAMPAGE SCATTER ENVELOPES */}
      {stage === 'envelope' && (
        <div className="absolute inset-0 w-full h-full z-35 pointer-events-none overflow-hidden">
          {floatingEnvelopes.map((env, idx) => (
            <motion.div
              key={env.id}
              initial={{ x: `${env.startX}vw`, y: `${env.startY}vh`, opacity: 0, rotate: 0 }}
              animate={{
                x: `${env.endX}vw`,
                y: `${env.endY}vh`,
                rotate: [0, idx % 2 === 0 ? 1080 : -1080], // Aggressive spin rate
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: env.duration,
                delay: env.delay,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ width: env.size, height: env.size }}
              className="absolute text-yellow-400 drop-shadow-[0_12px_30px_rgba(234,179,8,0.7)] flex items-center justify-center"
            >
              <Mail className="w-full h-full" strokeWidth={1.0} />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        
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
                  whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)" }}
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

        {/* ========================================================================= */}
        {/* PHASE 3: SIDEWAY BOOK FOLDER WITH FULL-BLEED MASSIVE INVITATION DISPLAY   */}
        {/* ========================================================================= */}
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
              <div className="absolute inset-0 bg-gradient-to-b from-amber-800 via-amber-900 to-zinc-950 rounded-2xl z-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-2 border-amber-600/30 overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-5 bg-black/40 border-r border-amber-500/10" />
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-zinc-900/90 border-t-2 border-dashed border-amber-600/20" />
              </div>

              {/* MASSIVE FULL-BLEED INVITATION CARD */}
              <div className="absolute inset-0 flex justify-center items-center overflow-visible z-45 pointer-events-none">
                <motion.div
                  variants={invitationCardVariants}
                  initial="hidden"
                  animate={isFolderOpened ? "visible" : "hidden"}
                  onAnimationComplete={() => { 
                    if (isFolderOpened) {
                      setTimeout(() => setStage('blinding'), 8500); 
                    }
                  }}
                  className="w-[94%] h-[445px] bg-zinc-950 rounded-lg shadow-[0_45px_100px_rgba(0,0,0,0.95)] border border-zinc-800 flex flex-col overflow-hidden pointer-events-auto relative"
                >
                  {/* FULL IMAGE BACKGROUND IMMERSION FRAME */}
                  <div className="w-full h-full absolute inset-0 z-10 bg-black">
                    <img 
                      src={displayedImageUrl} 
                      alt="Full Scale Invitation Layer" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* MINIMAL OVERLAY LOG LABEL AT THE BASE FOR METRICS */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-8 pb-1.5 px-2 text-[5px] text-zinc-400 font-mono uppercase tracking-widest z-20 pointer-events-none flex justify-between items-end">
                    <span className="opacity-60">CBD-PLDS PBB 2026</span>
                    <span className="opacity-70 truncate max-w-[120px] text-right">SIG: {email}</span>
                  </div>
                </motion.div>
              </div>

              {/* FRONT COVER FOLDER PANEL (BOOK SIDEWAYS ACTION) */}
              <motion.div
                style={{ originX: "0%", transformStyle: "preserve-3d" }}
                initial={{ rotateY: 0, zIndex: 25, opacity: 1 }}
                animate={isFolderOpened ? { rotateY: -140, opacity: 0.05, filter: "blur(2px)", x: -20 } : { rotateY: 0, opacity: 1, x: 0 }}
                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 rounded-2xl border-2 border-amber-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-6 backface-hidden"
              >
                <div className="absolute inset-y-0 left-0 w-4 bg-amber-800/90 rounded-l-2xl border-r border-amber-900/60" />
                <div className="absolute top-4 right-4 text-amber-400/30 font-mono text-[9px]">//SECURE_08</div>
                <div className="absolute bottom-4 left-8 text-amber-400/30 font-mono text-[9px]">PBB_2026//</div>

                <div className="text-center border-2 border-double border-amber-900/60 rounded-xl py-10 px-5 bg-zinc-950/40 shadow-2xl backdrop-blur-md w-full max-w-[240px] ml-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg border border-amber-300/40">
                    <FolderOpen size={22} className="text-zinc-950" />
                  </div>
                  <h2 className="text-amber-100 font-black font-mono text-sm tracking-[0.25em] uppercase leading-tight mb-1">
                    CLASSIFIED DOCS
                  </h2>
                  <p className="text-amber-500/80 font-mono text-[9px] uppercase tracking-widest">
                    CASE FILE: CONFIDENTIAL
                  </p>
                  <div className="w-12 h-0.5 bg-amber-500/30 mx-auto my-4" />
                  <p className="text-amber-400 font-bold font-mono text-[10px] tracking-widest uppercase animate-pulse">
                    TAP TO OPEN
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        )}
        {/* ========================================================================= */}

        {/* PHASE 4: BLINDING FLASHBANG */}
        {stage === 'blinding' && (
          <motion.div
            key="blinding-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 2.2 }}
            onAnimationComplete={() => setStage('staticAfterFlash')}
            className="absolute inset-0 z-55 bg-white"
          />
        )}

        {/* INTERSTITIAL TV NOISE 1 */}
        {stage === 'staticAfterFlash' && (
          <motion.div
            key="static-after-flash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-55 bg-zinc-950 w-full h-full"
            onAnimationComplete={() => {
              setTimeout(() => setStage('video2'), 1200);
            }}
          >
            <canvas ref={staticCanvasRef} className="absolute inset-0 w-full h-full block z-55" />
          </motion.div>
        )}

        {/* PHASE 5: POV EYE BLINKING VIDEO & POWER-OFF DESTRUCTION ENGINE */}
        {stage === 'video2' && (
          <motion.div
            key="video2-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black w-full h-full overflow-hidden"
          >
            <video
              ref={video2Ref}
              src={wake} 
              autoPlay
              muted
              playsInline
              onEnded={handleVideo2End}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 z-55 pointer-events-none flex flex-col justify-between">
              <motion.div 
                className="w-full bg-black border-b border-red-600/30 origin-top shadow-[0_10px_30px_rgba(0,0,0,0.95)]"
                animate={{ height: ["0%", "20%", "65%", "0%", "15%", "55%", "0%"] }}
                transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.1, 0.18, 0.28, 0.55, 0.63, 0.75], ease: "easeInOut" }}
              />
              <motion.div 
                className="w-full bg-black border-t border-red-600/30 origin-bottom shadow-[0_-10px_30px_rgba(0,0,0,0.95)]"
                animate={{ height: ["0%", "20%", "65%", "0%", "15%", "55%", "0%"] }}
                transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.1, 0.18, 0.28, 0.55, 0.63, 0.75], ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* RETRO TV CRT POWER-OFF BLINK DISINTEGRATION ENGINE */}
        {stage === 'staticLastBlink' && (
          <motion.div
            key="static-last-blink"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-55 bg-black w-full h-full flex items-center justify-center"
            onAnimationComplete={() => {
              setTimeout(() => {
                window.close();
                setTimeout(() => { window.location.replace('about:blank'); }, 100);
              }, 1200); 
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