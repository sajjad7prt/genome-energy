"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- تنظیمات موتور ژنوم ---
const SOLFEGGIO = [396, 417, 528, 639, 741, 852, 963];
const SYMBOLS = [
  { id: 'S1', icon: '◈', label: { fa: 'هسته', en: 'Core' } },
  { id: 'S2', icon: '⌬', label: { fa: 'نظم', en: 'Order' } },
  { id: 'S3', icon: '♾', label: { fa: 'ابدیت', en: 'Infinity' } },
  { id: 'S4', icon: '✧', label: { fa: 'اراده', en: 'Will' } }
];

export default function EnergyGenomeApp() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [genome, setGenome] = useState<any>(null);

  // تابع پخش فرکانس صوتی با Web Audio API
  const playEnergySound = (freq: number) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.5);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => osc.stop(), 4000);
    } catch (e) { console.error("Audio not supported"); }
  };

  const generateGenome = () => {
    if (!name) return;
    // تولید دیتای ۸ لایه بر اساس نام
    const seed = name.length * 42;
    const result = {
      layers: [
        { n: 'Root', v: (seed % 9) + 1, c: '#ff4d4d' },
        { n: 'Mind', v: 'Active', c: '#4d94ff' },
        { n: 'Emotion', v: 'Deep', c: '#ff4dff' },
        { n: 'Will', v: 'Vector-Alpha', c: '#ffd11a' },
        { n: 'Expression', v: 'High', c: '#1affd1' },
        { n: 'Shadow', v: (seed % 100), c: '#7a7a7a' },
        { n: 'Frequency', v: SOLFEGGIO[seed % SOLFEGGIO.length], c: '#ffffff' },
        { n: 'Moment', v: 'Now', c: '#00ff87' }
      ],
      mainColor: hsl(${seed % 360}, 80%, 60%),
      signature: GNM-${Math.random().toString(36).toUpperCase().substring(2, 7)}
    };
    setGenome(result);
    setStep(3);
    playEnergySound(result.layers[6].v as number);
  };

  const text = {
    fa: { title: "ژنوم انرژی", sub: "مدل‌سازی الگوی انسانی", placeholder: "نام شما...", btn: "آنالیز فرکانس", reset: "شروع مجدد", layers: "لایه‌های انرژی" },
    en: { title: "Energy Genome", sub: "Human Pattern Modeling", placeholder: "Your Name...", btn: "Analyze Frequency", reset: "Reset", layers: "Energy Layers" }
  }[lang];

  return (
    <div className={min-h-screen bg-[#020308] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden ${lang === 'fa' ? 'font-sans' : ''}} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      
      {/* Aurora Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-cyan-600/10 blur-[120px] rounded-full animate-bounce" style={{animationDuration: '15s'}} />
      </div>

      {/* Language Toggle */}
      <button onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} className="fixed top-8 right-8 z-50 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all">
        {lang === 'fa' ? 'ENGLISH' : 'فارسی'}
      </button>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, scale:0.9}} className="z-10 text-center">

Sajjad πrt, [12/18/2025 7:34 AM]
<h1 className="text-6xl md:text-8xl font-thin italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              {text.title}
            </h1>
            <p className="text-cyan-400/40 tracking-[0.6em] text-[10px] uppercase mb-12">{text.sub}</p>
            <button onClick={() => setStep(2)} className="group relative px-12 py-4 overflow-hidden rounded-full border border-white/10 transition-all">
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all" />
              <span className="relative z-10 tracking-[0.3em] font-light text-sm">INITIATE</span>
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{opacity:0, x:30}} animate={{opacity:1, x:0}} className="z-10 w-full max-w-md">
            <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-2xl">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={text.placeholder}
                className="w-full bg-transparent border-b border-white/10 py-4 text-2xl text-center outline-none focus:border-cyan-500 transition-all placeholder:opacity-20"
              />
              <div className="flex justify-center gap-6 my-10">
                {SYMBOLS.map(s => (
                  <button key={s.id} className="text-2xl opacity-40 hover:opacity-100 hover:scale-120 transition-all">{s.icon}</button>
                ))}
              </div>
              <button onClick={generateGenome} className="w-full py-5 bg-white text-black rounded-2xl font-bold tracking-widest hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                {text.btn}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && genome && (
          <motion.div key="s3" initial={{opacity:0}} animate={{opacity:1}} className="z-10 flex flex-col items-center">
            {/* Energy Signature Visualizer */}
            <div className="relative w-72 h-72 flex items-center justify-center mb-12">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-white/10 rounded-full"
              />
              <div className="absolute inset-4 rounded-full blur-[60px] opacity-40 animate-pulse" style={{backgroundColor: genome.mainColor}} />
              <div className="relative z-10 text-center">
                <div className="text-5xl font-extralight mb-2">{genome.layers[6].v}Hz</div>
                <div className="text-[10px] tracking-widest opacity-40 uppercase">{genome.signature}</div>
              </div>
            </div>

            {/* 8 Layers Grid */}
            <h3 className="text-[10px] tracking-[0.5em] uppercase opacity-30 mb-6">{text.layers}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
              {genome.layers.map((l: any, i: number) => (
                <motion.div 
                  initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: i * 0.1}}
                  key={i} className="bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-2xl text-center"
                >
                  <div className="text-[8px] uppercase opacity-40 mb-1">{l.n}</div>
                  <div className="text-xs font-light" style={{color: l.c}}>{l.v}</div>
                </motion.div>
              ))}
            </div>

            <button onClick={() => setStep(1)} className="mt-12 text-[9px] tracking-[0.4em] opacity-20 hover:opacity-100 transition-all uppercase">
              [{text.reset}]
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
