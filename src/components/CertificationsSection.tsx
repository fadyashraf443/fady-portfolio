import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Shield, Eye, Lock, Bug, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CertificationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  const certifications = [
    {
      name: "GIAC Blue Team Fundamentals",
      code: "SEC450",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
      glowColor: "shadow-blue-500/50",
      description: "Blue Team and Defense"
    },
    {
      name: "eCIR",
      code: "Certified Incident Responder",
      icon: Eye,
      color: "from-green-500 to-emerald-500",
      glowColor: "shadow-green-500/50",
      description: "eLearnSecurity"
    },
    {
      name: "eCDFP",
      code: "Certified Digital Forensics Professional",
      icon: Lock,
      color: "from-purple-500 to-violet-500",
      glowColor: "shadow-purple-500/50",
      description: "eLearnSecurity"
    },
    {
      name: "CHFI",
      code: "Certified Hacking Forensic Investigator",
      icon: Bug,
      color: "from-red-500 to-pink-500",
      glowColor: "shadow-red-500/50",
      description: "EC-Council"
    },
    {
      name: "eCPPT",
      code: "Certified Professional Penetration Tester",
      icon: Globe,
      color: "from-orange-500 to-yellow-500",
      glowColor: "shadow-orange-500/50",
      description: "eLearnSecurity"
    },
    {
      name: "eWPT",
      code: "Web Application Penetration Tester",
      icon: Award,
      color: "from-teal-500 to-cyan-500",
      glowColor: "shadow-teal-500/50",
      description: "eLearnSecurity"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const wall = wallRef.current;

    if (section && wall) {
      const badges = wall.querySelectorAll('.cert-badge');
      
      gsap.fromTo(badges,
        { 
          opacity: 0, 
          scale: 0.5,
          rotationY: 180 
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
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

  return (
    <section id="certifications" className="min-h-screen py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="cyber-title text-4xl md:text-5xl mb-6">
              CERTS.LOG
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8"></div>
            <p className="cyber-text text-xl max-w-3xl mx-auto">
              Industry-recognized certifications validating expertise in cybersecurity, 
              incident response, and digital forensics.
            </p>
          </div>

          {/* Certifications Wall */}
          <div ref={wallRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`cert-badge glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group ${cert.glowColor} hover:shadow-2xl`}
              >
                <div className="text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center group-hover:animate-pulse`}>
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Badge Content */}
                  <h3 className="cyber-subtitle text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                    {cert.name}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className={`text-sm font-mono px-3 py-1 rounded-full bg-gradient-to-r ${cert.color} text-white`}>
                      {cert.code}
                    </div>
                    <p className="text-sm text-gray-400">{cert.description}</p>
                  </div>

                  {/* Holographic Effect */}
                  <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Glitch Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-green-400 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="glass-panel p-8 max-w-4xl mx-auto">
              <h3 className="cyber-subtitle text-2xl mb-6 text-green-400">
                CONTINUOUS LEARNING COMMITMENT
              </h3>
              <p className="cyber-text text-lg leading-relaxed mb-6">
                These certifications represent a commitment to staying current with evolving cybersecurity 
                threats and defense strategies. Each certification involved rigorous training, hands-on labs, 
                and comprehensive examinations covering real-world scenarios.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                  <div className="text-sm text-gray-400">Hours of Training</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">6</div>
                  <div className="text-sm text-gray-400">Active Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
                  <div className="text-sm text-gray-400">Hands-on Labs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;