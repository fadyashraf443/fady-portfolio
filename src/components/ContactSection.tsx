import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Terminal, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  const commands = [
    '> initializing secure connection...',
    '> establishing encrypted channel...',
    '> contact protocol ready',
    '> awaiting user input...'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const terminal = terminalRef.current;
    const console = consoleRef.current;

    if (section && terminal && console) {
      // Animate terminal startup
      gsap.fromTo(terminal,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate console form
      gsap.fromTo(console,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Type commands
      let commandIndex = 0;
      let charIndex = 0;
      const typeCommand = () => {
        if (commandIndex < commands.length) {
          const currentCommand = commands[commandIndex];
          if (charIndex < currentCommand.length) {
            setTerminalText(prev => prev + currentCommand[charIndex]);
            charIndex++;
            setTimeout(typeCommand, 50);
          } else {
            setTerminalText(prev => prev + '\n');
            commandIndex++;
            charIndex = 0;
            setTimeout(typeCommand, 500);
          }
        }
      };

      const timer = setTimeout(typeCommand, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsTyping(false);
      setTerminalText(prev => prev + `\n> message transmitted successfully\n> response pending...\n> thank you for your inquiry`);
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
      // Create mailto link
      const subject = encodeURIComponent('Contact from Portfolio Website');
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:fadyashrafwadie@gmail.com?subject=${subject}&body=${body}`;
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'fadyashrafwadie@gmail.com',
      href: 'mailto:fadyashrafwadie@gmail.com',
      color: 'text-cyan-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+201212983367',
      href: 'tel:+201212983367',
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Cairo, Egypt',
      href: '#',
      color: 'text-yellow-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/fady-ashraf-017639266',
      href: 'https://linkedin.com/in/fady-ashraf-017639266',
      color: 'text-blue-400'
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="cyber-title text-4xl md:text-5xl mb-6">
              CONTACT.EXE
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8"></div>
            <p className="cyber-text text-xl max-w-3xl mx-auto">
              Initiate secure communication channel. Ready to discuss cybersecurity opportunities, 
              collaborate on projects, or share knowledge.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Terminal Interface */}
            <div ref={terminalRef} className="space-y-8">
              <div className="glass-panel p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Terminal className="w-8 h-8 text-green-400" />
                  <h3 className="cyber-subtitle text-2xl">SECURE TERMINAL</h3>
                </div>
                
                <div className="terminal p-4 h-64 overflow-y-auto">
                  <div className="text-green-400 mb-2 font-bold">
                    root@fady-security:~$ ./contact_init.sh
                  </div>
                  <pre className="text-sm whitespace-pre-wrap">
                    {terminalText}
                  </pre>
                  <div className="terminal-cursor">█</div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : '_self'}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="glass-card p-4 flex items-center space-x-4 hover:glow-cyan transition-all duration-300 group"
                  >
                    <info.icon className={`w-6 h-6 ${info.color} group-hover:animate-pulse`} />
                    <div>
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="cyber-text font-medium">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="glass-panel p-6">
                <h4 className="cyber-subtitle text-lg mb-4 text-cyan-400">NETWORK CONNECTIONS</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com/in/fady-ashraf-017639266"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-button flex items-center space-x-2 border-blue-400 text-blue-400 hover:bg-blue-400"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://fadyashraf.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-button flex items-center space-x-2 border-purple-400 text-purple-400 hover:bg-purple-400"
                  >
                    <User className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Console */}
            <div ref={consoleRef}>
              <div className="glass-panel p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Send className="w-8 h-8 text-cyan-400" />
                  <h3 className="cyber-subtitle text-2xl">MESSAGE CONSOLE</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      NAME.INPUT
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 bg-black border border-cyan-400 rounded focus:border-green-400 focus:outline-none transition-colors duration-300 text-cyan-400"
                      placeholder="Enter your name..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      EMAIL.ADDRESS
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 bg-black border border-cyan-400 rounded focus:border-green-400 focus:outline-none transition-colors duration-300 text-cyan-400"
                      placeholder="your.email@domain.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-cyan-400 mb-2">
                      MESSAGE.PAYLOAD
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full p-3 bg-black border border-cyan-400 rounded focus:border-green-400 focus:outline-none transition-colors duration-300 text-cyan-400 resize-none"
                      placeholder="Compose your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTyping}
                    className="w-full cyber-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isTyping ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Security Notice */}
                <div className="mt-6 p-4 border border-yellow-400 rounded bg-yellow-400 bg-opacity-10">
                  <div className="flex items-center space-x-2 text-yellow-400 text-sm">
                    <Terminal className="w-4 h-4" />
                    <span className="font-semibold">SECURITY NOTICE:</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    All communications are processed through secure channels. Your data is protected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="glass-panel p-6">
              <p className="cyber-text text-gray-400">
                © 2024 Fady Ashraf. Cybersecurity Engineer | Digital Forensics Expert | SOC Analyst
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Built with React, Three.js, and GSAP | Deployed with modern web technologies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;