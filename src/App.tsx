import React, { useRef, useEffect, useState } from 'react';
import { Globe, ArrowRight, Instagram, Twitter, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFadingOutRef = useRef(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Interactive Modals State
  const [activeModal, setActiveModal] = useState<'login' | 'signup' | 'manifesto' | null>(null);

  // Vanilla JS video loop with requestAnimationFrame crossfade to black
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Helper to animate opacity smoothly without CSS transitions
    const fade = (start: number, end: number, duration: number, callback?: () => void) => {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentOpacity = start + (end - start) * progress;
        
        if (video) {
          video.style.opacity = currentOpacity.toString();
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (callback) {
          callback();
        }
      };
      requestAnimationFrame(animate);
    };

    const handleCanPlay = () => {
      video.play().catch(() => {});
      fade(0, 1, 500);
    };

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !isFadingOutRef.current && video.duration > 0) {
        isFadingOutRef.current = true;
        const currentOpacity = parseFloat(video.style.opacity || '1');
        fade(currentOpacity, 0, 500);
      }
    };

    const handleEnded = () => {
      // Set to 0 opacity
      video.style.opacity = '0';
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video.play()
          .then(() => {
            isFadingOutRef.current = false;
            fade(0, 1, 500);
          })
          .catch(() => {
            isFadingOutRef.current = false;
          });
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Initial check in case it already buffered
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-white selection:text-black scroll-smooth">
      
      {/* SECTION 1 -- HERO (Full viewport) */}
      <section className="min-h-screen relative overflow-hidden flex flex-col justify-between">
        
        {/* Background Loop Video */}
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
          muted
          autoPlay
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
        />

        {/* Outer overlay for contrast and layout rhythm */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none z-0" 
          aria-hidden="true"
        />

        {/* Navbar */}
        <header className="relative z-20 px-6 py-8 w-full">
          <div className="liquid-glass rounded-full max-w-4xl mx-auto px-8 py-3 flex items-center justify-between backdrop-blur-md">
            
            {/* Left Brand and Links */}
            <div className="flex items-center gap-2">
              <a href="#" className="flex items-center gap-2 group">
                <Globe className="w-6 h-6 text-white transition-transform duration-500 group-hover:rotate-12" />
                <span className="text-white font-semibold text-lg tracking-tight">Asme</span>
              </a>
              
              <nav className="hidden md:flex items-center gap-8 ml-10">
                <a 
                  href="#about" 
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a 
                  href="#services" 
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Pricing
                </a>
                <a 
                  href="#philosophy" 
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  About
                </a>
              </nav>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setActiveModal('signup')}
                className="text-white hover:text-white/80 text-sm font-medium transition-colors cursor-pointer"
              >
                Sign Up
              </button>
              <button 
                onClick={() => setActiveModal('login')}
                className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium cursor-pointer hover:bg-white/5 transition-colors"
              >
                Login
              </button>
            </div>

          </div>
        </header>

        {/* Hero Content Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -translate-y-16">
          <h1 className="serif-display text-7xl sm:text-8xl md:text-[140px] leading-[0.9] text-white tracking-tighter mb-12 select-none">
            Know it then <em className="italic font-normal">all</em>.
          </h1>

          <div className="max-w-xl w-full flex flex-col items-center gap-10">
            
            {/* Newsletter Input */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form 
                    key="sub-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubscribe}
                    className="liquid-glass rounded-full w-full pl-8 pr-2 py-2.5 flex items-center gap-3 backdrop-blur-md"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="bg-transparent border-none outline-none text-white text-base placeholder:text-white/40 flex-grow py-1"
                    />
                    <button
                      type="submit"
                      className="bg-white rounded-full p-3.5 text-black hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="sub-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="liquid-glass rounded-full px-6 py-4 flex items-center gap-3 justify-center backdrop-blur-md border border-white/20"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    <span className="text-white text-sm font-medium">You have been subscribed successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtitle */}
            <p className="text-white/60 text-sm leading-relaxed max-w-sm px-4">
              Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
            </p>

            {/* Manifesto Button */}
            <button 
              onClick={() => setActiveModal('manifesto')}
              className="liquid-glass rounded-full px-10 py-3.5 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
            >
              Read our manifesto
            </button>

          </div>
        </div>

        {/* Social Icons Footer */}
        <footer className="relative z-10 flex justify-center gap-5 pb-10 w-full">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            className="liquid-glass rounded-full p-4 text-white/70 hover:text-white transition-all"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer noopener"
            className="liquid-glass rounded-full p-4 text-white/70 hover:text-white transition-all"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#about"
            className="liquid-glass rounded-full p-4 text-white/70 hover:text-white transition-all"
            aria-label="Globe link"
          >
            <Globe className="w-5 h-5" />
          </a>
        </footer>

      </section>

      {/* SECTION 2 -- ABOUT SECTION */}
      <AboutSection />

      {/* SECTION 3 -- FEATURED VIDEO */}
      <FeaturedVideoSection />

      {/* SECTION 4 -- PHILOSOPHY SECTION */}
      <PhilosophySection />

      {/* SECTION 5 -- SERVICES SECTION */}
      <ServicesSection />

      {/* IMMERSIVE MODAL WINDOWS FOR USER INTERACTIONS */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="liquid-glass rounded-3xl max-w-lg w-full p-8 md:p-10 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Login Modal Content */}
              {activeModal === 'login' && (
                <div>
                  <h3 className="text-3xl font-serif-instrument mb-4 text-white">Welcome Back</h3>
                  <p className="text-white/60 text-sm mb-6">Enter your details to sign into your Asme account.</p>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-white/40 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@example.com" 
                        className="w-full liquid-glass rounded-full px-5 py-3 bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-white/40 uppercase tracking-widest">Password</label>
                      <input 
                        type="password" 
                        required 
                        placeholder="••••••••" 
                        className="w-full liquid-glass rounded-full px-5 py-3 bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-white text-black font-medium rounded-full py-3 hover:bg-white/90 active:scale-95 transition-all mt-4 cursor-pointer text-sm"
                    >
                      Authenticate
                    </button>
                  </form>
                </div>
              )}

              {/* Sign Up Modal Content */}
              {activeModal === 'signup' && (
                <div>
                  <h3 className="text-3xl font-serif-instrument mb-4 text-white">Create Account</h3>
                  <p className="text-white/60 text-sm mb-6">Join the global collective of pioneering minds.</p>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-white/40 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe" 
                        className="w-full liquid-glass rounded-full px-5 py-3 bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-white/40 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@example.com" 
                        className="w-full liquid-glass rounded-full px-5 py-3 bg-white/5 border border-white/10 text-white text-sm outline-none placeholder:text-white/20"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-white text-black font-medium rounded-full py-3 hover:bg-white/90 active:scale-95 transition-all mt-4 cursor-pointer text-sm"
                    >
                      Get Started
                    </button>
                  </form>
                </div>
              )}

              {/* Manifesto Content */}
              {activeModal === 'manifesto' && (
                <div>
                  <h3 className="text-3xl font-serif-instrument mb-4 text-white">The Asme Manifesto</h3>
                  <div className="text-white/80 text-sm space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                    <p className="font-serif-instrument italic text-xl text-white/90">"We believe the future belongs to those who ask better questions."</p>
                    <p>In a world saturated with easy answers, we choose to look deeper. Curiosity is not a passive state; it is an active discipline. It requires courage to challenge what is, and vision to see what could be.</p>
                    <p>We build for the minds that refuse to settle. The dreamers, the developers, the makers, and the doers who understand that breakthrough is a journey of relentless iteration, elegant execution, and pure craft.</p>
                    <p>Our tools are designed to amplify your clarity, simplify your workflow, and elevate your creative potential. We don't just build software — we shape environments where ideas can breathe and flourish.</p>
                    <p className="pt-2 text-white/45 uppercase tracking-widest text-xs font-semibold">Join us in the pursuit of absolute craft.</p>
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
