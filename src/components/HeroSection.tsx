import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { Download, Linkedin, Mail } from 'lucide-react';

const FloatingText: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <Text
        position={position}
        fontSize={0.3}
        color="#00FFFF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/orbitron.woff"
      >
        {text}
      </Text>
    </Float>
  );
};

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  const downloadCV = () => {
    // Create a simple text file with CV content
    const cvContent = `
FADY ASHRAF - CYBERSECURITY ENGINEER
Cairo, Egypt | +201212983367 | fadyashrafwadie@gmail.com
linkedin.com/in/fady-ashraf-017639266 | https://fadyashraf.me/

PROFESSIONAL SUMMARY
A highly motivated and detail-oriented Cybersecurity professional with a solid foundation in incident response, digital forensics, and network security. Eager to apply a robust skillset, including hands-on experience with SIEM technologies, log analysis, and threat detection.

CERTIFICATIONS
- GIAC Blue Team Fundamentals: Blue Team and Defense (SEC450)
- eLearnSecurity Certified Incident Responder (eCIR)
- eLearnSecurity Certified Digital Forensics Professional (eCDFP)
- Certified Hacking Forensic Investigator (CHFI)
- eLearnSecurity Certified Professional Penetration Tester (eCPPT)
- eLearnSecurity Web Application Penetration Tester (eWPT)

SKILLS
- SIEM & Log Management: Splunk, ELK Stack, QRadar, LogRhythm
- Security Tools: Wireshark, Nmap, Metasploit, Burp Suite, Nessus
- Incident Response: Triage, Containment, Eradication, Recovery
- Digital Forensics: Memory Forensics, Filesystem Analysis
- Network Security: TCP/IP, DNS, DHCP, Firewall Rule Analysis
- Endpoint Security: EDR, Antivirus/Antimalware Solutions
- Operating Systems: Windows, Linux (Ubuntu, CentOS, Kali)
- Scripting: Python, Bash for Automation and Analysis
    `;
    
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Fady_Ashraf_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative" ref={heroRef}>
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingText text="DIGITAL FORENSICS EXPERT" position={[-4, 2, -2]} />
          <FloatingText text="THREAT DETECTION & RESPONSE" position={[4, 0, -3]} />
          <FloatingText text="BUILDING SAFER SYSTEMS" position={[0, -2, -1]} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-cyan-400 glow-cyan overflow-hidden">
              <img src="image.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Main Title */}
          <h1 ref={titleRef} className="cyber-title text-4xl md:text-6xl lg:text-7xl mb-6">
            FADY ASHRAF
          </h1>

          {/* Subtitle */}
          <div ref={subtitleRef} className="mb-8">
            <h2 className="cyber-subtitle text-xl md:text-2xl lg:text-3xl mb-4">
              CYBERSECURITY ENGINEER
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="glass-panel px-4 py-2 text-green-400">SOC ANALYST</span>
              <span className="glass-panel px-4 py-2 text-cyan-400">INCIDENT RESPONDER</span>
              <span className="glass-panel px-4 py-2 text-red-400">DIGITAL FORENSICS</span>
            </div>
          </div>

          {/* Description */}
          <p ref={descriptionRef} className="cyber-text text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Highly motivated cybersecurity professional specializing in incident response, 
            digital forensics, and network security. Expert in SIEM technologies, threat detection, 
            and building resilient security systems.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={downloadCV}
              className="cyber-button flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>DOWNLOAD CV</span>
            </button>
            
            <a 
              href="https://linkedin.com/in/fady-ashraf-017639266" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cyber-button flex items-center space-x-2 border-green-400 text-green-400 hover:bg-green-400"
            >
              <Linkedin className="w-5 h-5" />
              <span>LINKEDIN</span>
            </a>
            
            <a 
              href="mailto:fadyashrafwadie@gmail.com"
              className="cyber-button flex items-center space-x-2 border-red-400 text-red-400 hover:bg-red-400"
            >
              <Mail className="w-5 h-5" />
              <span>CONTACT</span>
            </a>
          </div>

          {/* Location & Contact Info */}
          <div className="mt-12 text-center">
            <p className="cyber-text text-cyan-400 opacity-80">
              Cairo, Egypt | +201212983367 | fadyashrafwadie@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;