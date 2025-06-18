import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Building, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      title: "Cyber Security Incident Response Analyst",
      type: "Intern",
      company: "Digital Egypt Pioneers Initiative",
      location: "Cairo, Egypt",
      period: "October 2024 – Present",
      status: "current",
      achievements: [
        "Monitored security alerts from SIEM and other security tools to identify potential security incidents",
        "Conducted initial triage and analysis of security alerts to determine their severity and impact",
        "Assisted in the development and maintenance of incident response playbooks and procedures",
        "Contributed to detailed incident reports for technical and non-technical audiences",
        "Developed basic scripts to automate the detection of common security events and streamline analysis"
      ],
      technologies: ["SIEM", "Incident Response", "Python", "Security Analysis", "Threat Detection"]
    },
    {
      title: "Cisco Cyber Ops Associate",
      type: "Intern",
      company: "National Telecommunication Institute (NTI)",
      location: "Remote",
      period: "2024",
      status: "completed",
      achievements: [
        "Gained practical experience with the Cisco Cybersecurity Operations curriculum",
        "Focused on network monitoring and threat detection techniques",
        "Analyzed network traffic using Wireshark to identify anomalous behavior and potential security threats",
        "Worked with simulated security incidents to practice incident handling and response procedures",
        "Developed proficiency in network security monitoring and analysis"
      ],
      technologies: ["Wireshark", "Network Security", "Cisco Security", "Traffic Analysis", "Incident Handling"]
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;

    if (section && timeline) {
      const milestones = timeline.querySelectorAll('.milestone');
      
      gsap.fromTo(milestones,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the timeline line
      gsap.fromTo(timeline.querySelector('.timeline-line'),
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
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
    <section id="experience" className="min-h-screen py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="cyber-title text-4xl md:text-5xl mb-6">
              EXPERIENCE.SYS
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8"></div>
            <p className="cyber-text text-xl max-w-3xl mx-auto">
              Professional journey through cybersecurity internships and hands-on experience 
              in incident response and threat detection.
            </p>
          </div>

          {/* 3D Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="timeline-line absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-green-400 transform origin-top"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="milestone relative">
                  {/* Timeline Node */}
                  <div className={`absolute left-6 w-5 h-5 rounded-full border-4 ${
                    exp.status === 'current' 
                      ? 'bg-green-400 border-green-400 animate-pulse' 
                      : 'bg-cyan-400 border-cyan-400'
                  }`}></div>

                  {/* Content */}
                  <div className="ml-20">
                    <div className="glass-card p-8 hover:glow-cyan transition-all duration-300">
                      {/* Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div>
                          <h3 className="cyber-subtitle text-2xl mb-2">
                            {exp.title}
                            <span className={`ml-3 text-sm px-3 py-1 rounded-full ${
                              exp.status === 'current' 
                                ? 'bg-green-400 text-black' 
                                : 'bg-cyan-400 text-black'
                            }`}>
                              {exp.type}
                            </span>
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Building className="w-4 h-4" />
                              <span>{exp.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-cyan-400 mt-2 lg:mt-0">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="cyber-subtitle text-lg mb-4 text-green-400">KEY ACHIEVEMENTS</h4>
                        <ul className="space-y-3">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start space-x-3">
                              <ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                              <span className="cyber-text text-gray-300">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="cyber-subtitle text-lg mb-3 text-yellow-400">TECHNOLOGIES & TOOLS</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 text-sm glass-panel hover:glow-cyan transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="mt-16 text-center">
            <div className="glass-panel p-8 max-w-4xl mx-auto">
              <h3 className="cyber-subtitle text-2xl mb-4 text-green-400">
                CURRENT STATUS: ACTIVE SOC ANALYST INTERN
              </h3>
              <p className="cyber-text text-lg leading-relaxed">
                Currently working as a Cyber Security Incident Response Analyst Intern at Digital Egypt Pioneers Initiative, 
                focusing on real-world security incident triage, SIEM management, and threat detection. 
                Actively developing automation scripts and contributing to incident response procedures.
              </p>
              
              <div className="mt-6 flex justify-center">
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono">STATUS: ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;