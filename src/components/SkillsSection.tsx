import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface SkillSphereProps {
  skills: string[];
}

const SkillSphere: React.FC<SkillSphereProps> = ({ skills }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => {
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        
        const x = Math.cos(theta) * Math.sin(phi) * 3;
        const y = Math.sin(theta) * Math.sin(phi) * 3;
        const z = Math.cos(phi) * 3;

        return (
          <Float key={skill} speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={[x, y, z]}>
              <Sphere args={[0.1, 8, 8]}>
                <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.2} />
              </Sphere>
              <Text
                position={[0, 0.3, 0]}
                fontSize={0.15}
                color="#00FF41"
                anchorX="center"
                anchorY="middle"
                font="/fonts/orbitron.woff"
              >
                {skill}
              </Text>
            </group>
          </Float>
        );
      })}
    </group>
  );
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: "SIEM & Log Management",
      skills: ["Splunk", "ELK Stack", "QRadar", "LogRhythm", "Syslog", "Windows Event Logs"],
      color: "text-cyan-400"
    },
    {
      title: "Security Tools",
      skills: ["Wireshark", "Nmap", "Metasploit", "Burp Suite", "Nessus", "Snort", "Zeek"],
      color: "text-green-400"
    },
    {
      title: "Incident Response",
      skills: ["Triage", "Containment", "Eradication", "Recovery", "Threat Intelligence"],
      color: "text-red-400"
    },
    {
      title: "Digital Forensics",
      skills: ["Volatility", "FTK Imager", "Autopsy", "Memory Forensics", "Filesystem Analysis"],
      color: "text-yellow-400"
    },
    {
      title: "Network Security",
      skills: ["TCP/IP", "DNS", "DHCP", "HTTP/S", "Firewall Analysis", "IDS/IPS", "Packet Analysis"],
      color: "text-purple-400"
    },
    {
      title: "Endpoint Security",
      skills: ["CrowdStrike", "Carbon Black", "EDR", "Antivirus", "Host-Based Forensics"],
      color: "text-pink-400"
    }
  ];

  const allSkills = skillCategories.flatMap(category => category.skills);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(section.querySelectorAll('.skill-category'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
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

  return (
    <section id="skills" className="min-h-screen py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="cyber-title text-4xl md:text-5xl mb-6">
              SKILLS.DAT
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8"></div>
            <p className="cyber-text text-xl max-w-3xl mx-auto">
              A comprehensive arsenal of cybersecurity tools, techniques, and technologies 
              for modern threat detection and response.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - 3D Skills Sphere */}
            <div className="h-96 lg:h-full min-h-[500px]">
              <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} />
                <pointLight position={[-10, -10, -10]} color="#00FF41" intensity={0.3} />
                <SkillSphere skills={allSkills} />
              </Canvas>
            </div>

            {/* Right Column - Skill Categories */}
            <div className="space-y-6">
              {skillCategories.map((category, index) => (
                <div key={index} className="skill-category glass-card p-6">
                  <h3 className={`cyber-subtitle text-xl mb-4 ${category.color}`}>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 text-sm glass-panel hover:glow-cyan transition-all duration-300 cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Additional Skills */}
              <div className="skill-category glass-panel p-6">
                <h3 className="cyber-subtitle text-xl mb-4 text-cyan-400">
                  PROGRAMMING & SCRIPTING
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="cyber-text">Python</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="cyber-text">Bash</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="cyber-text">PowerShell</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="cyber-text">SQL</span>
                  </div>
                </div>
              </div>

              <div className="skill-category glass-panel p-6">
                <h3 className="cyber-subtitle text-xl mb-4 text-cyan-400">
                  OPERATING SYSTEMS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="cyber-text">Windows Server</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="cyber-text">Ubuntu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="cyber-text">CentOS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="cyber-text">Kali Linux</span>
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

export default SkillsSection;