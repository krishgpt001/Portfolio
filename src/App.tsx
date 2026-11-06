import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Code2, GraduationCap, MoveUpRight, Sparkles, Layers3, CalendarDays, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { projects, skills } from './data/content';

gsap.registerPlugin(ScrollTrigger);
const nav = ['Home', 'About', 'Projects', 'Journey', 'Skills', 'Contact'];

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');
  useEffect(() => {
    const triggers = nav.map((name) => ScrollTrigger.create({ trigger: `#${name.toLowerCase()}`, start: 'top 45%', end: 'bottom 45%', onToggle: self => self.isActive && setActive(name) }));
    return () => triggers.forEach(t => t.kill());
  }, []);
  const go = (name: string) => { document.getElementById(name.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };
  return <header className="site-header"><a className="brand" href="#home"><span className="brand-mark">kg<span>.</span></span><span className="brand-name">KRISHNA GUPTA<small>COMPUTER SCIENCE · SOFTWARE DEVELOPMENT</small></span></a>
    <nav className="desktop-nav">{nav.map(n => <button key={n} className={active === n ? 'nav-link active' : 'nav-link'} onClick={() => go(n)}>{n}</button>)}</nav>
    <a className="header-cta" href="mailto:krishgpt1807@gmail.com">LET'S TALK <ArrowUpRight size={15}/></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>{nav.map(n=><button key={n} onClick={()=>go(n)}>{n}<ArrowUpRight size={16}/></button>)}</motion.nav>}</AnimatePresence>
  </header>;
}
function SectionLabel({ n, children }: {n:string;children:string}) { return <div className="section-label"><span>{n}</span><i/><b>{children}</b></div>; }
function ProjectCard({ p, index }: {p: typeof projects[number]; index:number}) {
  return <motion.article className={`project-card project-${p.tone}`} initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} whileHover={{y:-9, rotateX:1.2, rotateY:-.8}} style={{transformPerspective:1100}} viewport={{once:true,amount:.15}} transition={{duration:.7,delay:index*.08}}>
    <div className="project-art"><div className="art-top"><span>CASE {p.n}</span><span>{p.type}</span></div><div className="project-preview-window"><img src={`/assets/${p.tone}-preview.svg`} alt={`${p.title} conceptual interface artwork`} loading="lazy"/><span>VISUAL STUDY / {p.n}</span></div><div className="art-bottom"><span>{p.status}</span><ArrowUpRight size={18}/></div></div>
    <div className="project-info"><div className="project-title-row"><div><span className="eyebrow">{p.type}</span><h3>{p.title}</h3></div><span className="project-index">{p.n}</span></div><p>{p.desc}</p><div className="tag-row">{p.stack.map(s=><span key={s}>{s}</span>)}</div><div className="project-actions">{p.link ? <a href={p.link} target="_blank" rel="noreferrer">VIEW LIVE <ArrowUpRight size={15}/></a> : <span className="muted-action">IN DEVELOPMENT</span>}{p.github && <a href={p.github} target="_blank" rel="noreferrer">SOURCE <Github size={15}/></a>}</div></div>
  </motion.article>;
}
function App() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | undefined; let raf = 0;
    if (!reduce) { lenis = new Lenis({ lerp: 0.09, smoothWheel: true }); const tick = (time:number) => { lenis?.raf(time); raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); lenis.on('scroll', ScrollTrigger.update); }
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from('.hero-eyebrow, .hero-title, .hero-copy, .hero-actions, .hero-facts', { y: 28, opacity: 0, duration: .85, stagger: .11, ease: 'power3.out', delay: .15 });
        gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', transformOrigin: 'left', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'max', scrub: .25 } });
        gsap.to('.hero-orbit', { rotate: 18, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.floating-note.note-one', { y: -26, x: 10, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.floating-note.note-two', { y: 22, x: -8, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.hero-portrait', { yPercent: 7, rotate: -1.5, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.hero-side-note', { y: -35, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => gsap.fromTo(el, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } }));
        gsap.to('.journey-progress', { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '.journey-list', start: 'top 65%', end: 'bottom 75%', scrub: true } });
        gsap.to('.manifesto-word', { xPercent: -13, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } });
        // Scroll becomes the timeline: each chapter enters like a new film scene.
        gsap.utils.toArray<HTMLElement>('.cinematic-scene:not(#home)').forEach((scene) => {
          gsap.fromTo(scene,
            { clipPath: 'inset(9% 2.5% 0% 2.5% round 22px)', y: 88, scale: .955, opacity: .58, filter: 'blur(9px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'none',
              scrollTrigger: { trigger: scene, start: 'top 96%', end: 'top 24%', scrub: .85 } }
          );
        });
        // The hero gently recedes as the next chapter takes over.
        gsap.to('.hero-copy-block', { yPercent: -14, opacity: .25, scale: .96, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: .7 } });
        gsap.to('.hero-visual', { yPercent: -9, scale: .92, opacity: .42, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: .7 } });
        gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
          gsap.fromTo(card, { y: 85, rotateX: 5, opacity: 0, scale: .96 }, { y: 0, rotateX: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 1,
            scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 48%', scrub: .65 } });
        });
      }
    }, root);
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); ctx.revert(); };
  }, []);
  const groups = ['LANGUAGES','FRONTEND','BACKEND','DATABASES'];
  return <div ref={root} className="app-shell">
    <div className="grain"/><div className="scroll-progress"/><Header/>
    <main>
      <section id="home" className="hero page-wrap cinematic-scene">
        <div className="hero-copy-block"><div className="hero-eyebrow"><span className="availability-dot"/> COMPUTER SCIENCE STUDENT <span className="eyebrow-rule"/> INDIA · 2026</div>
          <h1 className="hero-title">Driven by<br/><em>curiosity.</em><br/>Defined by<br/><em className="blue-word">creation.</em></h1>
          <p className="hero-copy">I'm Krishna — a computer science student who enjoys understanding how things work, solving unfamiliar problems and building practical software.</p>
          <div className="hero-actions"><a className="button-primary" href="#projects">EXPLORE SELECTED WORK <ArrowUpRight size={17}/></a><a className="button-text" href="#about">A LITTLE ABOUT ME <ArrowDownRight size={16}/></a></div>
          <div className="hero-facts"><div><b>9.36</b><span>CGPA</span></div><i/><div><b>B.TECH CSE</b><span>CGC UNIVERSITY</span></div><i/><div><b>2029</b><span>GRADUATION</span></div></div>
        </div>
        <div className="hero-visual"><div className="hero-orbit" aria-hidden="true"/><div className="hero-orbit hero-orbit-two" aria-hidden="true"/><div className="floating-note note-one"><span className="note-dot"/> CURRENTLY EXPLORING <b>Full-stack development</b></div><div className="floating-note note-two"><Code2 size={15}/><span>BUILD / LEARN / REPEAT</span></div><div className="portrait-frame"><div className="portrait-topline"><span>PORTRAIT / 001</span><span>KG—26</span></div><img className="hero-portrait" src="/assets/krishna-portrait.jpg" alt="Krishna Gupta smiling, wearing glasses and a patterned shirt"/><div className="portrait-caption"><span>KRISHNA GUPTA</span><span>BUILDING WITH INTENTION ↗</span></div></div><div className="hero-side-note"><span className="side-note-line"/>A MIND THAT<br/>KEEPS EXPLORING.</div><div className="hero-stamp"><Code2 size={20}/><span>LEARN<br/>MAKE<br/>REFINE</span></div></div>
        <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ChevronDown size={16}/></a><div className="hero-coordinate">PORTFOLIO — 01 / 06</div>
      </section>
      <section id="about" className="about-section page-wrap section-pad cinematic-scene"><SectionLabel n="01">A LITTLE ABOUT ME</SectionLabel><div className="about-grid"><h2 className="about-heading reveal">Curiosity is<br/>where <em>it starts.</em></h2><div className="about-copy reveal"><p className="large-copy">I like getting beneath the surface of technology — understanding not just <em>what</em> works, but <em>why</em>.</p><p>I'm pursuing B.Tech in Computer Science at CGC University. I enjoy difficult, practical problems, learning unfamiliar concepts and turning ideas into useful applications.</p><p>My journey is still unfolding. Every project is an opportunity to ask better questions, sharpen my thinking and create something meaningful.</p><div className="signature">KRISHNA GUPTA <span>— ALWAYS LEARNING</span></div></div></div><div className="about-visual-strip reveal"><div className="about-visual-copy"><span>THE PROCESS</span><b>Observe. Understand. Build. Refine.</b></div><div className="about-visual-art"><span>01</span><i/><b>THINK IN SYSTEMS</b></div><div className="about-visual-art alt"><span>02</span><i/><b>MAKE IT USEFUL</b></div><div className="about-visual-art third"><span>03</span><i/><b>KEEP ITERATING</b></div></div><div className="about-stats reveal"><div><span>01</span><b>Curious by nature</b><small>Always asking why</small></div><div><span>02</span><b>Builder at heart</b><small>Learning through making</small></div><div><span>03</span><b>Problem oriented</b><small>Enjoying the difficult bits</small></div></div></section>
      <section id="projects" className="projects-section page-wrap section-pad cinematic-scene"><SectionLabel n="02">SELECTED WORK</SectionLabel><div className="section-heading-row reveal"><h2>Ideas made<br/><em>tangible.</em></h2><p>A selection of applications, experiments and systems I've explored. Each project has been a different lesson in turning an idea into something people can use.</p></div><div className="projects-list">{projects.map((p,i)=><ProjectCard key={p.n} p={p} index={i}/>)}</div><div className="projects-foot"><span>MORE EXPERIMENTS ARE IN PROGRESS</span><a href="https://github.com/krishgpt001" target="_blank" rel="noreferrer">EXPLORE GITHUB <ArrowUpRight size={14}/></a></div></section>
      <section className="manifesto cinematic-scene"><div className="manifesto-inner"><span className="eyebrow">A SIMPLE WORKING PRINCIPLE</span><div className="manifesto-word">STAY CURIOUS <i>✳</i> BUILD WITH PURPOSE <i>✳</i> KEEP GETTING BETTER <i>✳</i></div><p>Good work starts with better questions.</p></div></section>
      <section id="journey" className="journey-section page-wrap section-pad cinematic-scene"><SectionLabel n="03">THE JOURNEY SO FAR</SectionLabel><div className="section-heading-row reveal"><h2>Still learning.<br/><em>Always building.</em></h2><p>A snapshot of the academic, technical and collaborative experiences shaping my path.</p></div><div className="journey-list"><div className="journey-track"><span className="journey-progress"/></div><article className="journey-item"><span className="journey-year">2026 — PRESENT</span><div><h3>B.Tech Computer Science</h3><p>CGC University · 3rd semester</p><small>Building foundations in programming, data structures, software development and engineering projects.</small></div><b>01</b></article><article className="journey-item"><span className="journey-year">2026</span><div><h3>Technical & Volunteer Teams</h3><p>D4 Community</p><small>Part of the technical and volunteer teams; contributed as a coordinator at the Graviton Hackathon.</small></div><b>02</b></article><article className="journey-item"><span className="journey-year">IN PROGRESS</span><div><h3>KrishMotors</h3><p>Java desktop application</p><small>Developing an automobile-management system using Java Swing and JDBC.</small></div><b>03</b></article><article className="journey-item"><span className="journey-year">ENGINEERING PROJECT</span><div><h3>NutriFresh</h3><p>Team lead · Team of four</p><small>Leading an interdisciplinary prototype exploring non-destructive fruit freshness assessment.</small></div><b>04</b></article></div></section>
      <section id="skills" className="skills-section page-wrap section-pad cinematic-scene"><SectionLabel n="04">TOOLS I WORK WITH</SectionLabel><div className="section-heading-row reveal"><h2>My technical<br/><em>toolkit.</em></h2><p>A growing set of technologies I use while learning, experimenting and building projects.</p></div><div className="skills-grid">{groups.map((g,i)=><div className="skill-group reveal" key={g}><div className="skill-group-head"><span>0{i+1}</span><b>{g}</b></div><div>{skills.filter(s=>s.group===g || (g==='DATABASES' && s.group==='DATA')).map(s=><span className="skill-chip" key={s.name}><Code2 size={15}/>{s.name}</span>)}</div></div>)}</div><div className="learning-note"><Sparkles size={17}/> Skills are evolving through hands-on practice and project work.</div></section>
      <section className="profiles-section page-wrap cinematic-scene"><div className="profile-card reveal"><div><SectionLabel n="05">FIND ME ONLINE</SectionLabel><h2>Let's connect<br/><em>and create.</em></h2><p>I'm always interested in learning from people, exchanging ideas and exploring opportunities to build useful things.</p></div><div className="profile-links"><a href="https://github.com/krishgpt001" target="_blank" rel="noreferrer"><span>CODE & PROJECTS</span><b>GitHub <ArrowUpRight/></b></a><a href="https://www.linkedin.com/in/krishna-undefined-976b4b388/" target="_blank" rel="noreferrer"><span>PROFESSIONAL NETWORK</span><b>LinkedIn <ArrowUpRight/></b></a><a href="https://leetcode.com/u/Krishgpt/" target="_blank" rel="noreferrer"><span>PROBLEM SOLVING</span><b>LeetCode <ArrowUpRight/></b></a><a href="https://www.hackerrank.com/profile/krishgpt1807" target="_blank" rel="noreferrer"><span>SKILLS & PRACTICE</span><b>HackerRank <ArrowUpRight/></b></a></div></div></section>
      <section id="contact" className="contact-section page-wrap cinematic-scene"><SectionLabel n="06">HAVE SOMETHING IN MIND?</SectionLabel><div className="contact-content reveal"><span className="eyebrow">OPEN TO COLLABORATION & CONVERSATION</span><h2>Let's make<br/><em>something matter.</em></h2><p>Have an idea, an opportunity or just want to talk about technology?</p><a className="contact-email" href="mailto:krishgpt1807@gmail.com">krishgpt1807@gmail.com <ArrowUpRight/></a></div><footer><a className="brand" href="#home"><span className="brand-mark">kg<span>.</span></span><span className="brand-name">KRISHNA GUPTA<small>DRIVEN BY CURIOSITY. DEFINED BY CREATION.</small></span></a><span>© 2026 KRISHNA GUPTA · MADE WITH INTENTION</span><a href="#home">BACK TO TOP ↑</a></footer></section>
    </main>
  </div>;
}
export default App;
