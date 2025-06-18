import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Text, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Terminal, Shield, Activity, Database, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SOCTerminal: React.FC = () => {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        <Box args={[2, 1.2, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#000000" />
        </Box>
        <Box args={[1.8, 1, 0.05]} position={[0, 0, 0.051]}>
          <meshStandardMaterial color="#00FF41" emissive="#00FF41" emissiveIntensity={0.2} />
        </Box>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.1}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/courier.woff"
        >
          {'> SOC_ANALYST_WORKSPACE\n> monitoring_threats...\n> [ACTIVE] 24/7'}
        </Text>
      </group>
    </Float>
  );
};

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Security Operations Center Lab",
      description: "Simulated SOC environment for real-time threat monitoring and incident response training",
      icon: Monitor,
      status: "Active",
      technologies: ["Splunk", "ELK Stack", "Wireshark", "Python", "Linux"],
      features: [
        "Real-time log monitoring and analysis",
        "Automated threat detection rules",
        "Incident response playbooks",
        "Security event correlation",
        "Threat intelligence integration"
      ],
      color: "border-cyan-400",
      glowColor: "glow-cyan"
    },
    {
      title: "Digital Forensics Toolkit",
      description: "Custom automation scripts for digital forensics investigations and evidence analysis",
      icon: Database,
      status: "Development",
      technologies: ["Python", "Volatility", "Autopsy", "PowerShell", "Bash"],
      features: [
        "Memory dump analysis automation",
        "File system forensics scripts",
        "Timeline generation tools",
        "Hash verification utilities",
        "Report generation automation"
      ],
      color: "border-green-400",
      glowColor: "glow-green"
    },
    {
      title: "Network Security Monitor",
      description: "Custom network monitoring solution for detecting anomalous traffic patterns",
      icon: Network,
      status: "Testing",
      technologies: ["Python", "Scapy", "Zeek", "Grafana", "InfluxDB"],
      features: [
        "Real-time packet capture analysis",
        "Anomaly detection algorithms",
        "Network traffic visualization",
        "Alert generation system",
        "Performance metrics dashboard"
      ],
      color: "border-yellow-400",
      glowColor: "glow-yellow"
    },
    {
      title: "Incident Response Dashboard",
      description: "Centralized dashboard for managing security incidents and response workflows",
      icon: Activity,
      status: "Planning",
      technologies: ["React", "Node.js", "MongoDB", "Docker", "Kubernetes"],
      features: [
        "Incident tracking and management",
        "Team collaboration tools",
        "Automated notification system",
        "Metrics and reporting",
        "Integration with security tools"
      ],
      color: "border-red-400",
      glowColor: "glow-red"
    }
  ];

  const liveData = [
    "2024-01-15 14:23:45 [INFO] System scan completed - 0 threats detected",
    "2024-01-15 14:22:30 [WARN] Unusual network traffic detected from 192.168.1.45",
    "2024-01-15 14:21:15 [INFO] Firewall rules updated successfully",
    "2024-01-15 14:20:00 [INFO] Vulnerability scan initiated",
    "2024-01-15 14:19:45 [INFO] User authentication successful: fady.ashraf",
    "2024-01-15 14:18:30 [INFO] Backup completed successfully"
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(section.querySelectorAll('.project-card'),
        { opacity: 0, y: 50, rotationX: 45 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
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
    <section id="projects" className="min-h-screen py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="cyber-title text-4xl md:text-5xl mb-6">
              PROJECTS.DIR
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8"></div>
            <p className="cyber-text text-xl max-w-3xl mx-auto">
              Hands-on cybersecurity projects demonstrating practical application of security tools, 
              automation, and threat detection capabilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - 3D SOC Lab */}
            <div className="space-y-8">
              <div className="glass-panel p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Terminal className="w-8 h-8 text-green-400" />
                  <h3 className="cyber-subtitle text-2xl">LIVE SOC LAB</h3>
                </div>
                
                {/* 3D SOC Environment */}
                <div className="h-64 mb-6 rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} />
                    <SOCTerminal />
                  </Canvas>
                </div>

                {/* Live Data Stream */}
                <div className="terminal p-4 max-h-48 overflow-y-auto">
                  <div className="text-green-400 mb-2 font-bold">
                    root@soc-lab:~$ tail -f /var/log/security.log
                  </div>
                  {liveData.map((log, index) => (
                    <div key={index} className="text-sm mb-1 data-stream" style={{ animationDelay: `${index * 0.2}s` }}>
                      {log}
                    </div>
                  ))}
                  <div className="terminal-cursor">█</div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">4</div>
                  <div className="text-sm text-gray-400">Active Projects</div>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
                  <div className="text-sm text-gray-400">Scripts Developed</div>
                </div>
              </div>
            </div>

            {/* Right Column - Project Cards */}
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className={`project-card glass-card p-6 ${project.color} ${project.glowColor} hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <project.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="cyber-subtitle text-xl">{project.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'Active' ? 'bg-green-400 text-black' :
                          project.status === 'Development' ? 'bg-yellow-400 text-black' :
                          project.status === 'Testing' ? 'bg-blue-400 text-black' :
                          'bg-gray-400 text-black'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <p className="cyber-text text-gray-300 mb-4">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-cyan-400 mb-2">KEY FEATURES:</h5>
                        <ul className="text-sm space-y-1">
                          {project.features.slice(0, 3).map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                              <span className="text-gray-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs glass-panel hover:glow-cyan transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Projects */}
          <div className="mt-16 text-center">
            <div className="glass-panel p-8 max-w-4xl mx-auto">
              <h3 className="cyber-subtitle text-2xl mb-6 text-yellow-400">
                UPCOMING PROJECTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">AI-Powered Threat Detection</h4>
                  <p className="text-sm text-gray-400">Machine learning model for advanced persistent threat detection</p>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">Cloud Security Framework</h4>
                  <p className="text-sm text-gray-400">Comprehensive security framework for cloud infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;