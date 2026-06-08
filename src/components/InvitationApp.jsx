import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, ShieldAlert, Cpu, EyeOff } from 'lucide-react';

import pbbVideo from '../assets/PBB 2026.mp4'; 
import wake from '../assets/Wake.mp4';
import jes from '../assets/JesPBB.png';

export default function InvitationApp() {
  const [stage, setStage] = useState('hacked');
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [terminalText, setTerminalText] = useState([]);
  const [displayedImageUrl, setDisplayedImageUrl] = useState('');

  const emailImageMap = {
    'trsyjr@dswd.gov.ph': '/path/to/image1.png',
    'jsmencias@dswd.gov.ph': jes,
  };

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const introCanvasRef = useRef(null);
  const suctionCanvasRef = useRef(null);
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

  // HIGH-INTENSITY SPATIAL SUCTION ENGINE (Triggers on portalVortex stage)
  useEffect(() => {
    if (stage !== 'portalVortex') return;
    const canvas = suctionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let speedFactor = 1;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const vortexParticles = [];
    // Flood the screen with matrix noise being swallowed up
    const totalVortexParticles = 1200; 

    class VortexLine {
      constructor() { this.reset(); }
      reset() {
        this.angle = Math.random() * Math.PI * 2;
        // Start far off screen to give a strong pulling feel
        this.distance = Math.max(width, height) * (1.2 + Math.random() * 0.5); 
        this.speed = Math.random() * 18 + 12;
        this.length = Math.random() * 40 + 20;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.size = Math.floor(Math.random() * 12) + 12;
      }
      update() {
        // Accelerate everything exponentially as it pools into the center core
        this.distance -= this.speed * speedFactor;
        this.angle += 0.04 * (speedFactor * 0.5);
        this.speed += 0.4; 
        
        if (this.distance <= 10) {
          this.reset();
        }
      }
      draw() {
        const x = width / 2 + Math.cos(this.angle) * this.distance;
        const y = height / 2 + Math.sin(this.angle) * this.distance;
        
        // Stretch strings visually along the trajectory vector
        const alpha = Math.min(1, this.distance / 200);
        ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
        ctx.font = `bold ${this.size + (1000 / (this.distance + 10))}px monospace`;
        ctx.fillText(this.text, x, y);
      }
    }

    for (let i = 0; i < totalVortexParticles; i++) {
      vortexParticles.push(new VortexLine());
      // Stagger initial distances to fill the spatial screen tunnel
      vortexParticles[i].distance -= Math.random() * width;
    }

    const runSuction = () => {
      speedFactor += 0.06; // Accelerate pull every frame
      
      // Heavy trail motion blur to emphasize the physical velocity pull
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      // Expanding cyber black hole event horizon
      const radius = 20 + speedFactor * 18;

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        radius
      );

      gradient.addColorStop(0, '#000');
      gradient.addColorStop(0.2, '#000');
      gradient.addColorStop(0.8, '#ef4444');
      gradient.addColorStop(1, 'rgba(239,68,68,0)');

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.shadowBlur = 60;
      ctx.shadowColor = '#ef4444';
      ctx.fill();
      ctx.shadowBlur = 0;

      vortexParticles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(runSuction);
    };

    runSuction();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', handleResize); };
  }, [stage]);

  // CRUNCHY RETRO TELEVISION STATIC ENGINE
  useEffect(() => {
    const isStaticState = stage === 'staticAfterFlash' || stage === 'staticLastBlink';
    if (!isStaticState) return;

    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Hardware accelerated mini buffer
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
      setStage('portalVortex'); // Instantly transition to the deep pooling suction space
    } else {
      alert('Node mismatch. Invalid user signature identified.');
    }
  };

  const envelopeVariants = {
    hidden: { scale: 0, rotate: -45, y: 500, opacity: 0, zIndex: 40 },
    flying: {
      scale: [0, 1.35, 0.85, 1.08, 1],
      rotate: [-45, 25, -15, 5, 0],
      y: [500, -80, 40, -10, 0],
      opacity: [0, 1, 1, 1, 1],
      transition: { duration: 2.2, ease: "easeOut" }
    }
  };

  const cardRevealVariants = {
    hidden: { y: 60, scale: 0.75, opacity: 0, zIndex: 15 },
    visible: {
      y: [60, -320, -60],     
      scale: [0.75, 1.2, 1.85], 
      opacity: [0, 1, 1],
      zIndex: 45, 
      transition: { 
        duration: 3.2,
        times: [0, 0.45, 1], 
        ease: ["easeOut", "easeInOut", "backOut"],
        delay: 1.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden font-mono text-white select-none relative w-full">
      
      {/* Background Intro Canvas for Phases 1 & 2 */}
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
          <div className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${stage === 'envelope' ? 'backdrop-blur-sm bg-black/40' : 'backdrop-blur-none bg-transparent'}`} />
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
            exit={{ 
              scale: 0.01, 
              rotate: 360, 
              filter: "blur(15px)",
              opacity: 0,
              transition: { duration: 1.6, ease: "anticipate" } 
            }}
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
                  <Cpu size={18} /> NODE VERIFICATION
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
                  <EyeOff size={14} /> EXECUTE_DECRYPTION
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}

        {/* PHASE 2.5: dedicated HIGH-INTENSITY SUCTION INTERSTITIAL */}
        {stage === 'portalVortex' && (
          <motion.div
            key="portal-vortex-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-55 bg-black w-full h-full overflow-hidden"
            onAnimationComplete={() => {
              setTimeout(() => setStage('video1'), 2200);
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 0.4, 1.5, 4, 12],
                opacity: [1, 1, 0.9, 0.5, 0]
              }}
              transition={{
                duration: 2.2,
                ease: 'easeIn'
              }}
              className="absolute left-1/2 top-1/2 w-40 h-40 rounded-full bg-red-500 blur-3xl -translate-x-1/2 -translate-y-1/2"
            />

            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.15, 1.4, 2.5]
              }}
              transition={{
                duration: 2.2,
                ease: 'easeIn'
              }}
              className="absolute inset-0 bg-red-500/5 blur-3xl"
            />

            <canvas
              ref={suctionCanvasRef}
              className="absolute inset-0 w-full h-full block"
            />
          </motion.div>
        )}

        {/* PHASE 3: ENVELOPE STAGE */}
        {stage === 'envelope' && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-transparent">
            <motion.div
              key="envelope-stage"
              variants={envelopeVariants}
              initial="hidden"
              animate="flying"
              className="relative flex items-center justify-center w-[440px] h-[300px] mt-28"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-b-2xl shadow-2xl border border-yellow-400/50 z-10" />

              <motion.div
                variants={cardRevealVariants}
                initial="hidden"
                animate="visible"
                onAnimationComplete={() => { 
                  setTimeout(() => setStage('blinding'), 6000); 
                }}
                className="absolute left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-xl p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-zinc-200 text-center flex flex-col items-center"
              >
                <div className="w-full mb-1.5 bg-zinc-50 p-1.5 rounded-lg border border-zinc-100">
                  <h2 className="text-yellow-600 font-black font-mono tracking-[0.2em] text-[8px] uppercase">
                    ★ DECRYPTED INVITATION MANIFEST ★
                  </h2>
                  <h1 className="text-zinc-950 font-black text-sm tracking-tight uppercase mt-0.5">
                    YOU ARE INVITED
                  </h1>
                </div>

                <div className="w-full h-[330px] rounded-lg bg-zinc-950 flex items-center justify-center overflow-hidden border border-zinc-900 shadow-inner">
                  <img src={displayedImageUrl} alt="Manifest Frame" className="w-full h-full object-cover" />
                </div>
                <div className="text-[7px] text-zinc-400 font-mono uppercase tracking-widest mt-2 pt-1 border-t border-zinc-100 w-full">
                  CREDENTIAL LOCK: {email}
                </div>
              </motion.div>

              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[220px] border-l-yellow-400/95 border-t-[150px] border-t-transparent border-b-[150px] border-b-yellow-400/95 rounded-bl-2xl filter drop-shadow-md" />
                <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[220px] border-r-yellow-400/95 border-t-[150px] border-t-transparent border-b-[150px] border-b-yellow-400/95 rounded-br-2xl filter drop-shadow-md" />
                <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[220px] border-l-transparent border-r-[220px] border-r-transparent border-b-[150px] border-b-yellow-500 rounded-b-2xl" />
              </div>

              <motion.div
                style={{ originY: 0, transformStyle: "preserve-3d" }}
                initial={{ rotateX: 0, zIndex: 25 }}
                animate={{ rotateX: 180, zIndex: 5 }}
                transition={{ rotateX: { duration: 0.8, ease: "easeInOut", delay: 0.9 }, zIndex: { delay: 1.2 } }}
                className="absolute top-0 left-0 w-0 h-0 border-l-[220px] border-l-transparent border-r-[220px] border-r-transparent border-t-[150px] border-t-yellow-300 filter drop-shadow-md"
              />
            </motion.div>
          </div>
        )}

        {/* PHASE 4: BLINDING FLASHBANG */}
        {stage === 'blinding' && (
          <motion.div
            key="blinding-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
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

        {/* PHASE 5: POV EYE BLINKING VIDEO */}
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

        {/* PROPER HEAVY TV SNOW STATIC RIGHT BEFORE TAB CLOSURE */}
        {stage === 'staticLastBlink' && (
          <motion.div
            key="static-last-blink"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-55 bg-black w-full h-full"
            onAnimationComplete={() => {
              setTimeout(() => {
                window.close();
                setTimeout(() => { window.location.replace('about:blank'); }, 100);
              }, 1600); // Gives 1.6s of dense analog TV static snow before tearing the page down
            }}
          >
            <canvas ref={staticCanvasRef} className="absolute inset-0 w-full h-full block z-55" />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}