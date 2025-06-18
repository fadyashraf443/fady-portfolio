import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Box } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Shield, Target, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FloatingCube: React.FC = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.3} 
          wireframe 
        />
      </Box>
    </Float>
  );
};

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (section && content) {
      gsap.fromTo(content,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const highlights = [
    {
      icon: Shield,
      title: "Security Expert",
      description: "Specialized in incident response, digital forensics, and threat detection with hands-on SIEM experience."
    },
    {
      icon: Target,
      title: "Threat Hunter",
      description: "Expert in identifying, analyzing, and mitigating security threats in fast-paced SOC environments."
    },
    {
      icon: Award,
      title: "Certified Professional",
      description: "Multiple industry certifications including GIAC SEC450, eCIR, eCDFP, CHFI, eCPPT, and eWPT."
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 relative" ref={sectionRef}>
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} />
          <FloatingCube />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={contentRef}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="cyber-title text-4xl md:text-5xl mb-6">
              ABOUT.EXE
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <div className="glass-panel p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-8 h-8 text-cyan-400" />
                  <h3 className="cyber-subtitle text-2xl">PROFILE</h3>
                </div>
                
                <p className="cyber-text text-lg leading-relaxed mb-6">
                  A highly motivated and detail-oriented <span className="text-green-400 font-semibold">Cybersecurity professional</span> with 
                  a solid foundation in incident response, digital forensics, and network security. Currently pursuing a 
                  Bachelor's degree in Cybersecurity Engineering at Beni-Suef National University.
                </p>
                
                <p className="cyber-text text-lg leading-relaxed mb-6">
                  I specialize in <span className="text-cyan-400 font-semibold">SIEM technologies</span>, log analysis, and threat detection, 
                  with proven ability to work effectively in fast-paced environments to identify, analyze, and mitigate security threats.
                </p>

                <div className="border-l-4 border-cyan-400 pl-6">
                  <p className="cyber-text text-lg italic">
                    "Building safer systems, one layer at a time - through continuous learning, 
                    practical application, and a commitment to digital security excellence."
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">6+</div>
                  <div className="text-sm text-cyan-400">CERTIFICATIONS</div>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">2</div>
                  <div className="text-sm text-cyan-400">INTERNSHIPS</div>
                </div>
              </div>
            </div>

            {/* Right Column - Highlights */}
            <div className="space-y-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="glass-card p-6 hover:glow-cyan transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <highlight.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="cyber-subtitle text-xl mb-3">{highlight.title}</h4>
                      <p className="cyber-text text-gray-300 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Education */}
              <div className="glass-panel p-6">
                <h4 className="cyber-subtitle text-xl mb-4">EDUCATION</h4>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-green-400">Bachelor's in Cybersecurity Engineering</div>
                    <div className="text-cyan-400">Beni-Suef National University</div>
                    <div className="text-sm text-gray-400">Oct 2022 - June 2026 (Expected)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;