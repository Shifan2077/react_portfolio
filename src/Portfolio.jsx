import React, { useEffect, useRef, useState } from "react";
import pfp from "./assets/pfp.png";
import moviesdb from "./assets/moviesdb.png";
import raspi from "./assets/raspi.png";
import AWS from "./assets/AWS.png";
import abt from "./assets/abt_me.jpg";

const Portfolio = () => {
  const [heroLeftVisible, setHeroLeftVisible] = useState(false);
  const [heroRightVisible, setHeroRightVisible] = useState(false);
  const [aboutLeftVisible, setAboutLeftVisible] = useState(false);
  const [aboutRightVisible, setAboutRightVisible] = useState(false);
  const [contactFormVisible, setContactFormVisible] = useState(false);
  const [contactInfoVisible, setContactInfoVisible] = useState(false);
  const [contactTitleVisible, setContactTitleVisible] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  
  const aboutImageRef = useRef(null);
  const aboutTextRef = useRef(null);
  const contactFormRef = useRef(null);
  const contactInfoRef = useRef(null);
  const contactTitleRef = useRef(null);
  
  const skills = [
    "Python 🔘🔘🔘",
    "Java 🔘🔘",
    "Machine Learning 🔘🔘",
    "Data Analysis 🔘🔘🔘",
    "AWS 🔘🔘🔘",
    "React 🔘",
    "OpenCV 🔘🔘",
    "SQL 🔘🔘🔘🔘",
    "Angular 🔘🔘🔘🔘"
  ];
  const projectsGridRef = useRef(null);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [projectsTitleVisible, setProjectsTitleVisible] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormMessage({ type: '', text: '' });

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      // Using EmailJS for SMTP functionality
      // You'll need to replace these with your actual EmailJS credentials
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          template_id: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          user_id: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
          template_params: {
            from_name: data.name,
            from_email: data.email,
            message: data.message,
            to_email: 'nagarjishifan@gmail.com'
          }
        })
      });

      if (response.ok) {
        setFormMessage({ type: 'success', text: 'Message sent successfully! I\'ll get back to you soon.' });
        e.target.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormMessage({ type: 'error', text: 'Failed to send message. Please try again or contact me directly.' });
    } finally {
      setFormSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => setFormMessage({ type: '', text: '' }), 5000);
    }
  };

  useEffect(() => {
    const t1 = setTimeout(() => setHeroLeftVisible(true), 100);
    const t2 = setTimeout(() => setHeroRightVisible(true), 250);
    
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    // Mobile menu toggle placeholder
    const mobileMenuButton = document.querySelector('button.md\\:hidden');
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', () => {
        console.log('Mobile menu toggled');
      });
    }
    
    // Observe sections on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === aboutImageRef.current) {
              setAboutLeftVisible(true);
            }
            if (entry.target === aboutTextRef.current) {
              setAboutRightVisible(true);
            }
            if (entry.target === projectsGridRef.current) {
              setProjectsVisible(true);
              setTimeout(() => setProjectsTitleVisible(true), 500);
            }
            if (entry.target === contactTitleRef.current) {
              setContactTitleVisible(true);
            }
            if (entry.target === contactFormRef.current) {
              setTimeout(() => setContactFormVisible(true), 200);
            }
            if (entry.target === contactInfoRef.current) {
              setTimeout(() => setContactInfoVisible(true), 400);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (aboutImageRef.current) observer.observe(aboutImageRef.current);
    if (aboutTextRef.current) observer.observe(aboutTextRef.current);
    if (projectsGridRef.current) observer.observe(projectsGridRef.current);
    if (contactTitleRef.current) observer.observe(contactTitleRef.current);
    if (contactFormRef.current) observer.observe(contactFormRef.current);
    if (contactInfoRef.current) observer.observe(contactInfoRef.current);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
      if (mobileMenuButton) {
        mobileMenuButton.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <div className="font-sans bg-light text-dark">
      {/* Navigation */}
      <header className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold gradient-text">SN</a>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-primary transition-colors">Home</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <button className="md:hidden focus:outline-none">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 py-12 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className={`md:w-1/2 mb-12 md:mb-0 transform transition-all duration-700 ease-out ${heroLeftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Hi, I'm{' '}
                <span className="gradient-text typing-animation">
                  <span className="typing-text">Shifan Nagarji</span>
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-600">
                AI & Web Developer | Cloud Enthusiast
              </h2>
              <p className="text-lg mb-8 text-gray-700 max-w-lg">
                I build intelligent, data-driven applications and secure web platforms using modern technologies like Python, React, and AWS — always with performance, innovation, and real-world impact in mind.
              </p>
              <div className="flex space-x-4">
                <a href="#projects" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors mr-4">View Work</a>
                <a href="#contact" className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">Contact Me</a>
              </div>
            </div>
            <div className={`md:w-1/2 flex justify-center transform transition-all duration-700 ease-out ${heroRightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-primary rounded-full overflow-hidden shadow-xl">
                  <img src={ pfp } alt="Shifan Nagarji portrait" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-4 -right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
                  <span className="font-bold">Pursuing Graduation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div ref={aboutImageRef} className={`md:w-1/3 mb-8 md:mb-0 flex justify-center transform transition-all duration-700 ease-out ${aboutLeftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <img src={abt} alt="About me illustration" className="rounded-lg shadow-lg w-64 h-64 object-cover" loading="lazy" />
            </div>
            <div ref={aboutTextRef} className={`md:w-2/3 md:pl-12 transform transition-all duration-700 ease-out ${aboutRightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <p className="text-lg mb-6 text-gray-700">
                I'm a Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning, with a strong foundation in Python, Java, and data analytics. My journey into tech began with a curiosity for solving real-world problems, and over the years, I've developed and deployed projects ranging from secure surveillance systems to secure cloud applications.
              </p>
              <p className="text-lg mb-8 text-gray-700">
                I have hands-on experience through simulations, and academic projects involving machine learning, web development (MERN stack), and cloud platforms like AWS. My approach is driven by curiosity, creativity, and a constant desire to turn innovative ideas into impactful digital solutions.
              </p>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">My Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((label, index) => (
                    <span
                      key={label}
                      style={{ transitionDelay: `${aboutRightVisible ? index * 90 : 0}ms` }}
                      className={`bg-gray-100 px-4 py-2 rounded-full transform transition-all duration-500 ease-out ${aboutRightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-center transform transition-all duration-700 ease-out ${projectsTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className={`text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto transform transition-all duration-700 ease-out ${projectsTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Here are some of my recent projects that showcase my skills and expertise.
          </p>
          <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div style={{ transitionDelay: `${projectsVisible ? 0 : 0}ms` }} className={`project-card bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-500 ease-out ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <img src={ moviesdb } alt="Movies Database Website" className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Movies Database Website</h3>
                <p className="text-gray-600 mb-4">A full-featured Imdb clone website that shows movie rating, description and cast.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">HTML</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">CSS</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Javascript</span>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">API</span>
                  <span className="text-xs bg-yellow-100 text-orange-800 px-2 py-1 rounded">Angular</span>
                </div>
                <a href="https://thecinevault.netlify.app/" className="text-primary font-medium hover:underline">View Project →</a>
              </div>
            </div>
            {/* Project 2 */}
            <div style={{ transitionDelay: `${projectsVisible ? 120 : 0}ms` }} className={`project-card bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-500 ease-out ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <img src={ raspi } alt="CCTV Security System with Human Detection" className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">CCTV Security System with Human Detection</h3>
                <p className="text-gray-600 mb-4">A CCTV security system that detects humans after working hours in a store, supermarket, bank, etc and sends alerts to the user. This project is for normal cctv's which don' t have a initial security system with them.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Python</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Raspberry Pi</span>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Linux</span>
                </div>
                <a href="https://github.com/Shifan2077/Cctv-Camera-Human-Detection.git" className="text-primary font-medium hover:underline">View Project →</a>
              </div>
            </div>
            {/* Project 3 */}
            <div style={{ transitionDelay: `${projectsVisible ? 240 : 0}ms` }} className={`project-card bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-500 ease-out ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <img src={AWS} alt="Cloud Based File Sharing Website" className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Cloud Based File Sharing Website</h3>
                <p className="text-gray-600 mb-4">A cloud based file sharing website that allows users to upload, download and share files with others.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Python</span>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">API</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">AWS</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded">Cloud Computing</span>
                </div>
                <a href="#" className="text-primary font-medium hover:underline">View Project →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced with Animations */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div ref={contactTitleRef}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-center transform transition-all duration-700 ease-out ${contactTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className={`text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto transform transition-all duration-700 ease-out ${contactTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Form - Animates from Left */}
            <div ref={contactFormRef} className={`md:w-1/2 transform transition-all duration-700 ease-out ${contactFormVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className={`transform transition-all duration-500 ease-out ${contactFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                    placeholder="John Smith" 
                  />
                </div>
                <div className={`transform transition-all duration-500 ease-out ${contactFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className={`transform transition-all duration-500 ease-out ${contactFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={5} 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                {/* Form Message */}
                {formMessage.text && (
                  <div className={`p-4 rounded-lg ${formMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                    {formMessage.text}
                  </div>
                )}
                
                <div className={`transform transition-all duration-500 ease-out ${contactFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
                  <button 
                    type="submit" 
                    disabled={formSubmitting}
                    className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-medium transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {formSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Info - Animates from Right */}
            <div ref={contactInfoRef} className={`md:w-1/2 transform transition-all duration-700 ease-out ${contactInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="bg-gray-50 p-8 rounded-xl h-full">
                <h3 className={`text-xl font-bold mb-6 transform transition-all duration-500 ease-out ${contactInfoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className={`flex items-start transform transition-all duration-500 ease-out ${contactInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: '200ms' }}>
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <i className="fas fa-envelope text-primary text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Email</h4>
                      <p className="text-gray-600">nagarjishifan@gmail.com</p>
                    </div>
                  </div>
                  <div className={`flex items-start transform transition-all duration-500 ease-out ${contactInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: '300ms' }}>
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <i className="fas fa-phone-alt text-primary text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Phone</h4>
                      <p className="text-gray-600">+91 93563 87615</p>
                    </div>
                  </div>
                  <div className={`flex items-start transform transition-all duration-500 ease-out ${contactInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: '400ms' }}>
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <i className="fas fa-map-marker-alt text-primary text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Location</h4>
                      <p className="text-gray-600">Maharashtra, India</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className={`font-medium text-gray-700 mb-4 transform transition-all duration-500 ease-out ${contactInfoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    <a href="https://github.com/Shifan2077" className={`bg-gray-200 hover:bg-primary hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors transform duration-500 ease-out ${contactInfoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '600ms' }}>
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/md-shifan-nagarji-887886251/" className={`bg-gray-200 hover:bg-blue-500 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors transform duration-500 ease-out ${contactInfoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '700ms' }}>
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="/about" className="text-2xl font-bold gradient-text">Shifan Nagarji</a>
              <p className="mt-2 text-gray-400">Creating digital experiences that matter.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#home" className="hover:text-primary transition-colors">Home</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Shifan Nagarji. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Custom styles for gradient text, typing animation, and project card hover */}
      <style>{`
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(90deg, #3B82F6, #10B981);
        }
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .typing-animation {
          display: inline-block;
          position: relative;
        }
        .typing-animation::after {
          content: '|';
          position: absolute;
          right: -4px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .typing-text {
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          width: 0;
          animation: typewriter 4s steps(14) infinite;
        }
        @keyframes typewriter {
          0% { width: 0; }
          25% { width: 14ch; }
          50% { width: 14ch; }
          75% { width: 0; }
          100% { width: 0; }
        }
      `}</style>
      
      {/* FontAwesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      
      {/* Tailwind CDN (for demo, use npm package in real app) */}
      <script src="https://cdn.tailwindcss.com"></script>
      <script>{`
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: "#3B82F6",
                secondary: "#1E40AF",
                accent: "#10B981",
                dark: "#1F2937",
                light: "#F9FAFB"
              },
              fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace']
              }
            }
          }
        }
      `}</script>
    </div>
  );
};

export default Portfolio;