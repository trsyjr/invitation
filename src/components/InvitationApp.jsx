import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, ShieldAlert, Cpu, EyeOff, ScanFace } from 'lucide-react';

import pbbVideo from '../assets/PBB 2026.mp4'; 
import wake from '../assets/Wake.mp4';
import jes from '../assets/JesPBB.png'

export default function InvitationApp() {

  const [stage, setStage] = useState('hacked');
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [terminalText, setTerminalText] = useState([]);
  const [isFaceCaptured, setIsFaceCaptured] = useState(false);
  const [displayedImageUrl, setDisplayedImageUrl] = useState('');

  const emailImageMap = {
    'trsyjr@dswd.gov.ph': '/path/to/image1.png',
    'jsmencias@dswd.gov.ph': jes,
  };

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const hackLogs = [
    ">> INITIALIZING NEURAL LINK START PROBE...",
    ">> ESTABLISHING SECURE DIRECT TUNNEL... [OK]",
    ">> INTERCEPTING HOST PERIPHERAL INPUTS...",
    ">> DECRYPTING DATA LAYER MEMORY STACK...",
    ">> WARNING: SYSTEM COMPLETELY COMPROMISED."
  ];

  const codeSnippets = ['01', '10', '0xFA', 'SYS_INIT', 'LINK_START', 'OVERRIDE', 'NULL', 'ROOT_ACCESS', 'DATA_VORTEX', '404', 'NaN', 'µS'];

  // Stage 1: Terminal Typewriter Effect
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

  // High Performance HTML5 Canvas Code Vortex Loop (Phase 1)
  useEffect(() => {
    if (stage !== 'hacked') return;
    const canvas = canvasRef.current;
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
    const maxParticles = 120;

    class CodeParticle {
      constructor() { this.reset(); }
      reset() {
        const angle = Math.random() * Math.PI * 2;
        const maxRadius = Math.max(width, height) * 0.8;
        const distance = maxRadius * (0.6 + Math.random() * 0.4);
        this.x = width / 2 + Math.cos(angle) * distance;
        this.y = height / 2 + Math.sin(angle) * distance;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.fontSize = Math.floor(Math.random() * 6) + 9;
        this.speed = Math.random() * 2 + 1;
        this.angleOffset = Math.random() * 0.03 + 0.01;
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
        const pullRadius = distance - this.speed * (1 + (400 / (distance + 1))); 

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
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#ef4444';
      ctx.fill();
      ctx.shadowBlur = 0;
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', handleResize); };
  }, [stage]);

  const handleVideo1End = () => {
    if (video1Ref.current) {
      video1Ref.current.pause();
    }
    setStage('envelope');
  };

  const handleVideo2End = () => {
    if (video2Ref.current) {
      video2Ref.current.pause();
    }
    setStage('camera');
  };

  // Envelope Presentation Logic
  const envelopeVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    flying: {
      scale: [0, 1.4, 0.9, 1],
      rotate: [-180, 45, -10, 0],
      opacity: 1,
      transition: { duration: 2.2, ease: "easeInOut" }
    }
  };

  const cardRevealVariants = {
    hidden: { y: 0, scale: 0.9, opacity: 0 },
    visible: {
      y: -140, 
      scale: 1,
      opacity: 1,
      transition: { y: { duration: 1.0, delay: 1.4, ease: "easeOut" }, opacity: { duration: 0.4, delay: 1.4 } }
    }
  };

  useEffect(() => {
    if (stage === 'revealed') {
      const timer = setTimeout(() => setStage('blinding'), 6000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'blinding') {
      const timer = setTimeout(() => setStage('video2'), 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Webcam stream initialization & frame lifecycle
  useEffect(() => {
    let streamInstance = null;
    if (stage === 'camera') {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
        .then(stream => {
          streamInstance = stream;
          if (webcamRef.current) webcamRef.current.srcObject = stream;
          
          // Trigger HUD overlay text change
          setTimeout(() => {
            setIsFaceCaptured(true);
            
            // Wait 2.5 seconds to display completion banner before final system blacking out
            setTimeout(() => {
              if (streamInstance) streamInstance.getTracks().forEach(track => track.stop());
              setStage('close');
              try { window.close(); } catch(e) { console.log("Tab closure security catch handled successfully."); }
            }, 2500);

          }, 5000);
        })
        .catch(err => {
          console.error(err);
          setIsFaceCaptured(true);
          setTimeout(() => setStage('close'), 2500);
        });
    }
    return () => { if (streamInstance) streamInstance.getTracks().forEach(track => track.stop()); };
  }, [stage]);

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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden font-mono text-white select-none relative w-full">
      
      {/* PHASE 3: Background Video 1 Layer */}
      {['video1', 'envelope', 'revealed'].includes(stage) && (
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
          <div className={`absolute inset-0 transition-all duration-700 pointer-events-none ${stage === 'revealed' ? 'backdrop-blur-md bg-black/30' : 'backdrop-blur-none bg-transparent'}`} />
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* PHASE 1: LINK START PROBE INTRO */}
        {stage === 'hacked' && (
          <motion.div
            key="hacked-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
            <div className="absolute w-[180vw] h-[180vh] border-[1px] border-red-500/5 rounded-full animate-[ping_5s_infinite_linear]" />
            <div className="absolute w-[90vw] h-[90vh] border-[1px] border-red-500/10 rounded-full animate-[ping_2.5s_infinite_linear]" />

            <div className="max-w-xl w-full p-6 mx-4 relative z-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur opacity-25 animate-pulse" />
              <div className="relative bg-zinc-950/90 border-2 border-red-500/40 rounded-xl p-6 shadow-[0_0_40px_rgba(239,68,68,0.25)] backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-red-800/40 pb-3 mb-4 text-red-400">
                  <div className="flex items-center gap-2">
                    <Terminal size={18} className="animate-pulse text-red-400" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400 [text-shadow:0_0_8px_#ef4444]">SYSTEM CORE INTRUSION</span>
                  </div>
                  <Activity size={16} className="text-red-500 animate-[bounce_1s_infinite]" />
                </div>
                <div className="space-y-2.5 min-h-[150px] font-mono">
                  {terminalText.map((line, idx) => (
                    <p key={idx} className={`text-xs tracking-widest leading-relaxed ${idx === hackLogs.length - 1 ? "text-red-400 font-black text-sm animate-pulse pt-2 border-t border-red-900/50 [text-shadow:0_0_12px_#ef4444]" : "text-red-500/80"}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: HACKING UI */}
        {stage === 'form' && (
          <motion.div
            key="form-stage"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "brightness(0)" }}
            transition={{ duration: 0.5 }}
            className="relative z-50 w-full min-h-screen flex items-center justify-center p-4 bg-black"
          >
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative w-full max-w-md p-1">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/70" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/70" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500/70" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/70" />

              <div className="relative bg-zinc-950/95 border border-red-500/30 p-8 rounded-none shadow-[0_0_50px_rgba(239,68,68,0.1)] backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6 border-b border-red-900/60 pb-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <ShieldAlert size={16} className="animate-pulse text-red-400" />
                    <span className="text-[10px] font-black tracking-[0.25em] uppercase [text-shadow:0_0_5px_#ef4444]">IDENTITY_RECAPTURING</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h1 className="text-xl font-black tracking-widest text-red-400 uppercase flex items-center justify-center gap-2 [text-shadow:0_0_10px_#ef4444]">
                    <Cpu size={18} /> NODE VERIFICATION
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        borderColor: isInputFocused ? "#ef4444" : "rgba(239, 68, 68, 0.2)",
                        boxShadow: isInputFocused ? "0 0 15px rgba(239, 68, 68, 0.15)" : "0 0 0px transparent"
                      }}
                      className="border bg-black/90 p-1"
                    >
                      <input
                        type="email"
                        placeholder="example@dswd.gov.ph"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        className="w-full pl-4 pr-4 py-3 bg-transparent border-0 text-red-400 placeholder-white focus:outline-none text-center font-bold text-xs tracking-widest font-mono uppercase"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)" }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full py-3.5 bg-red-950 hover:bg-red-900 text-red-400 border border-red-500/60 font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 text-xs transition-all duration-300"
                  >
                    <EyeOff size={14} /> EXECUTE_DECRYPTION
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 4: ENVELOPE OPENING */}
        {stage === 'envelope' && (
          <motion.div
            key="envelope-stage"
            variants={envelopeVariants}
            initial="hidden"
            animate="flying"
            className="relative flex items-center justify-center z-40 w-80 h-56"
          >
            <div className="absolute w-full h-full bg-red-500/20 blur-3xl rounded-full scale-125" />
            <div className="absolute inset-0 bg-gradient-to-b from-red-50 to-red-100 rounded-b-2xl shadow-2xl border border-red-200/80 z-10" />

            <div className="absolute top-4 inset-x-0 z-15 flex flex-col items-center">
              <motion.div
                variants={cardRevealVariants}
                initial="hidden"
                animate="visible"
                onAnimationComplete={() => { setTimeout(() => setStage('revealed'), 900); }}
                className="w-[280px] bg-white rounded-xl p-5 shadow-2xl border border-red-100 text-center text-zinc-900 text-xs font-bold font-sans absolute"
              >
                📥 DECRYPTING DOSSIER FOR: <br/>
                <span className="text-red-600 font-mono text-[11px] block mt-2 tracking-tight border-t border-zinc-100 pt-2">{email}</span>
              </motion.div>
            </div>

            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-red-100/95 border-t-[112px] border-t-transparent border-b-[112px] border-b-red-100/95 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[160px] border-r-red-100/95 border-t-[112px] border-t-transparent border-b-[112px] border-b-red-100/95 rounded-br-2xl" />
              <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-[112px] border-b-red-200/90 rounded-b-2xl" />
            </div>

            <motion.div
              style={{ originY: 0, transformStyle: "preserve-3d" }}
              initial={{ rotateX: 0, zIndex: 25 }}
              animate={{ rotateX: 180, zIndex: 5 }}
              transition={{ rotateX: { duration: 0.7, ease: "easeInOut", delay: 0.5 }, zIndex: { delay: 0.8 } }}
              className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[112px] border-t-red-200 drop-shadow-md"
            />
          </motion.div>
        )}

        {/* PHASE 5: INVITATION MANIFEST DISPLAY (FIXED CONTAINER WIDTH) */}
        {stage === 'revealed' && (
        <motion.div
            key="revealed-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1, filter: "brightness(2)" }}
            className="relative z-40 w-full h-screen p-4 flex items-center justify-center bg-transparent"
        >
            {/* Removed bg-zinc-950 and fixed aspect ratio. Changed width to w-auto so it tightly hugs the image asset */}
            <div className="relative p-2 rounded-2xl border border-zinc-800/80 shadow-[0_0_80px_rgba(0,0,0,0.85)] max-w-[90vw] max-h-[85vh] h-full w-auto flex items-center justify-center overflow-hidden">
            <img 
                src={displayedImageUrl} 
                alt="Invitation Portrait Layout"
                className="w-auto h-full object-contain rounded-xl" 
            />
            </div>
        </motion.div>
        )}

        {/* PHASE 6: FLASH */}
        {stage === 'blinding' && (
          <motion.div
            key="blinding-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-white"
          />
        )}

        {/* PHASE 7: SECOND INTERSTITIAL VIDEO RUN */}
        {stage === 'video2' && (
          <motion.div
            key="video2-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black w-full h-full"
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
          </motion.div>
        )}

        {/* PHASE 8: BIOMETRIC CAMERA VIEWPORT */}
        {stage === 'camera' && (
          <motion.div
            key="camera-stage"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center p-4 md:p-8"
          >
            <div className="w-full max-w-5xl aspect-video bg-black rounded-xl border border-red-500/40 overflow-hidden relative shadow-[0_0_80px_rgba(239,68,68,0.25)]">
              <video
                ref={webcamRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover scale-x-[-1] opacity-90 filter brightness-110 contrast-125 grayscale-[15%]" 
              />
              <div className="absolute inset-0 bg-red-500/5 mix-blend-color pointer-events-none" />

              <motion.div 
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 right-0 z-40 pointer-events-none"
              >
                <div className="absolute bottom-full left-0 right-0 h-24 bg-gradient-to-t from-red-500/35 via-red-500/10 to-transparent opacity-80 backdrop-blur-[1px]" />
                <div className="absolute top-full left-0 right-0 h-6 bg-gradient-to-b from-red-500/15 to-transparent opacity-40" />
                <div className="h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent shadow-[0_0_30px_12px_rgba(239,68,68,0.95),0_0_15px_4px_rgba(248,113,113,1)]" />
              </motion.div>

              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 font-mono">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full border-2 border-red-500/20 border-dashed animate-[spin_25s_infinite_linear] relative flex items-center justify-center">
                    <div className="absolute top-0 w-0.5 h-4 bg-red-400/80 shadow-[0_0_8px_#ef4444]" />
                    <div className="absolute bottom-0 w-0.5 h-4 bg-red-400/80 shadow-[0_0_8px_#ef4444]" />
                    <div className="absolute left-0 h-0.5 w-4 bg-red-400/80 shadow-[0_0_8px_#ef4444]" />
                    <div className="absolute right-0 h-0.5 w-4 bg-red-400/80 shadow-[0_0_8px_#ef4444]" />
                  </div>

                  <div className="w-[340px] h-64 absolute flex justify-between flex-col">
                    <div className="flex justify-between">
                      <div className="w-8 h-8 border-t-4 border-l-4 border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                      <div className="w-8 h-8 border-t-4 border-r-4 border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                    </div>
                    <div className="flex justify-between">
                      <div className="w-8 h-8 border-b-4 border-l-4 border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                      <div className="w-8 h-8 border-b-4 border-r-4 border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isFaceCaptured && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute z-50 bg-zinc-950/95 border-2 border-red-500 p-6 rounded text-center shadow-[0_0_50px_rgba(239,68,68,0.5)] max-w-sm backdrop-blur-sm pointer-events-auto"
                      >
                        <div className="w-10 h-10 bg-red-950 border border-red-400 text-red-400 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-black [text-shadow:0_0_5px_#ef4444]">
                          ✓
                        </div>
                        <h2 className="text-red-400 font-black tracking-[0.25em] text-xs uppercase [text-shadow:0_0_6px_#ef4444]">
                          FACE IS CAPTURED
                        </h2>
                        <p className="text-zinc-400 text-[10px] mt-1.5 tracking-widest leading-relaxed">
                          Biometric parameters locked. Synchronizing credentials... Session terminating.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-start z-10 w-full">
                  <div className="bg-red-950/95 text-red-400 px-3 py-1.5 rounded text-[11px] font-bold border border-red-500/50 flex items-center gap-2 tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <ScanFace size={14} className="animate-pulse text-red-400" />
                    {isFaceCaptured ? "BIOMETRIC_PROFILE: SECURED" : "BIOMETRIC_PROFILE_SCANNING..."}
                  </div>
                  <span className="text-[10px] text-red-500 font-bold bg-black/80 px-2 py-1 border border-red-900/50 shadow-inner">SYS_PROBE_MAIN_911</span>
                </div>

                <div className="flex justify-between items-end z-10 w-full text-[10px]">
                  <div className="text-red-500 bg-black/95 p-3 rounded border border-red-500/30 space-y-1 max-w-xs shadow-2xl">
                    <p className="text-red-400 animate-pulse">&gt; LOCKING MESH COORDINATES...</p>
                    <p className={isFaceCaptured ? "text-red-400 font-bold" : "text-red-600"}>
                      {isFaceCaptured ? "> DATA SYNC COMPLETED [100%]" : "> RECORDING FACIAL STRUCT [94.7%]"}
                    </p>
                  </div>
                  <span className="text-red-700 font-black tracking-widest text-xs hidden sm:inline">[SIG_RECORD_ACTIVE]</span>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 9: CLOSURE TERMINATION SCREEN BUFFER */}
        {stage === 'close' && (
          <motion.div
            key="close-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-55 bg-black flex flex-col items-center justify-center font-mono text-zinc-700 text-xs tracking-widest uppercase"
          >
            <span>&gt; Connection Closed. Terminal Dead.</span>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}