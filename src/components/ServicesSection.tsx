import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cards = [
    {
      id: "service-1",
      tag: "Strategy",
      title: "Research & Insight",
      description: "We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.",
      videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
    },
    {
      id: "service-2",
      tag: "Craft",
      title: "Design & Execution",
      description: "From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.",
      videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="relative bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Subtle radial gradient */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-end mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            What we do
          </h2>
          <span className="text-white/40 text-sm hidden md:block uppercase tracking-wider">
            Our services
          </span>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-3xl overflow-hidden group flex flex-col h-full cursor-pointer"
            >
              
              {/* Card Video Area */}
              <div className="relative aspect-video w-full overflow-hidden">
                <video
                  src={card.videoUrl}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                />
                
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" 
                  aria-hidden="true"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                
                {/* Header inside body */}
                <div className="flex justify-between items-center mb-4">
                  <span className="uppercase tracking-widest text-white/40 text-xs font-semibold">
                    {card.tag}
                  </span>
                  <div className="liquid-glass rounded-full p-2 text-white/80 group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-medium">
                    {card.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
