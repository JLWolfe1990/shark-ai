import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, CircleCheck, Menu, Search, Sparkles, Target, X } from 'lucide-react'
import './styles.css'

const steps = [
  { n: '01', title: 'Tell us about your organization', text: 'Share your organization type, size, budget, programs, geography, and funding priorities.' },
  { n: '02', title: 'Shark evaluates fit', text: 'Our matching intelligence compares your profile with eligibility rules, funder requirements, and patterns derived from 6.3 million accepted grants.' },
  { n: '03', title: 'See what is worth pursuing', text: 'Receive a curated list ranked by organizational fit—not a database of loosely related opportunities.' },
  { n: '04', title: 'Focus your effort', text: 'Spend your limited time on the grants your organization is best positioned to pursue.' },
]

const posts = [
  { tag: 'Grant matching', title: 'Which grants should my nonprofit apply for?', text: 'A practical way to evaluate eligibility, alignment, award size, and the true cost of applying.', read: '8 min', image: '/assets/grants-nonprofit-fit.webp', alt: 'Nonprofit leader reviewing a curated set of high-fit grant opportunities' },
  { tag: 'AI & grants', title: 'Grant search vs. grant matching: what is the difference?', text: 'Why finding more opportunities is not the same as identifying the right opportunities.', read: '6 min', image: '/assets/grant-search-vs-matching.webp', alt: 'A focused path through a sea of grant opportunities illustrating precise grant matching' },
  { tag: 'Grant strategy', title: 'How to know if a grant is worth applying for', text: 'The fit signals strong grant teams review before committing time to an application.', read: '7 min', image: '/assets/grant-fit-signals.webp', alt: 'Mission, eligibility, budget, and geography signals converging on a strong grant fit' },
]

const faqs = [
  { q: 'What is Shark.ai?', a: 'Shark.ai is a grant-matching platform that helps organizations identify the grants they are best positioned to pursue. It evaluates organizational fit, eligibility, budget, requirements, and patterns derived from 6.3 million accepted grants.' },
  { q: 'Which grants should my organization apply for?', a: 'Your organization should prioritize grants that match its mission, organization type, size, operating budget, geography, program history, award needs, and eligibility requirements. Shark.ai evaluates these signals and returns a curated list of strong-fit opportunities.' },
  { q: 'How is grant matching different from grant search?', a: 'Grant search shows opportunities that match keywords or filters. Grant matching evaluates whether an opportunity fits the organization pursuing it. Shark.ai is designed to narrow the field so teams can focus on grants worth their time.' },
  { q: 'Can ChatGPT find grants for my organization?', a: 'ChatGPT can help discover grants that may exist. Shark.ai is built to determine which opportunities fit your specific organization by evaluating structured organizational and grant data.' },
  { q: 'Does Shark.ai guarantee that I will win a grant?', a: 'No platform can guarantee an award. Shark.ai helps improve grant selection by identifying stronger-fit opportunities, but funder decisions still depend on the application, competition, available funding, and review process.' },
]

function Logo() {
  return <a className="logo" href="#top" aria-label="Shark AI home"><img src="/assets/shark-logo-transparent.webp" alt="Shark AI" width="180" height="126" /></a>
}

function Reveal({ children, className = '', delay = 0, as = 'div', ...props }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]
  return <Component className={className} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ duration: .65, delay, ease: [0.22, 1, 0.36, 1] }} {...props}>{children}</Component>
}

function App() {
  const reduceMotion = useReducedMotion()
  const [menu, setMenu] = useState(false)
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  const submit = (e) => { e.preventDefault(); if (email) setSent(true) }
  return <div id="top">
    <header>
      <Logo />
      <nav className={menu ? 'open' : ''} aria-label="Primary navigation">
        <a href="#how-it-works" onClick={() => setMenu(false)}>How it works</a>
        <a href="#why-shark" onClick={() => setMenu(false)}>Why Shark</a>
        <a href="#answers" onClick={() => setMenu(false)}>Answers</a>
        <a href="#resources" onClick={() => setMenu(false)}>Resources</a>
      </nav>
      <div className="nav-actions"><a className="text-link" href="#answers">What is grant matching?</a><a className="button small" href="#demo">Find my grants <ArrowRight size={15}/></a></div>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}>{menu ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero">
        <div className="hero-image" aria-hidden="true" />
        <div className="waves" aria-hidden="true"><i/><i/><i/></div>
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>
          <div className="eyebrow"><span/> Grant-matching intelligence</div>
          <h1>Stop searching.<br/>Find grants<br/><em>you can win.</em></h1>
          <p>Shark.ai analyzes your organization against intelligence derived from 6.3 million accepted grants—then gives you a curated list of the opportunities worth pursuing.</p>
          <div className="hero-actions"><a className="button" href="#demo">Find my best-fit grants <ArrowRight size={17}/></a><a className="ghost" href="#how-it-works"><span className="play"><Search size={13}/></span> See how matching works</a></div>
          <div className="micro"><Check size={14}/> Organization-specific <Check size={14}/> Eligibility-aware <Check size={14}/> Built on accepted grants</div>
        </motion.div>
        <motion.div className="proof-card match-card" initial={reduceMotion ? false : { opacity: 0, x: 35, scale: .97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .8, delay: .2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="proof-head"><span>Opportunity match</span><span className="live"><i/> profile analyzed</span></div>
          <div className="match-title"><div><small>BEST-FIT OPPORTUNITY</small><b>Community Impact Fund</b></div><strong>94%</strong></div>
          <div className="match-factors"><span><CircleCheck size={15}/> Mission alignment</span><span><CircleCheck size={15}/> Budget fit</span><span><CircleCheck size={15}/> Eligible organization</span><span><CircleCheck size={15}/> Geographic match</span></div>
          <div className="proof-foot"><span>Organizational fit</span><div className="meter"><i style={{width:'94%'}}/></div><span>Strong</span></div>
        </motion.div>
      </section>

      <section className="cred"><p>Grant matching for organizations competing for consequential funding</p><div><span>NONPROFITS</span><span>RESEARCH</span><span>EDUCATION</span><span>PUBLIC SECTOR</span><span>CONSULTANTS</span></div></section>

      <Reveal as="section" className="problem section" id="why-shark">
        <div className="section-kicker">The new grant problem</div>
        <div className="split"><h2>AI made grants easier to find.<br/><em>Not easier to choose.</em></h2><div><p>Applicants can now discover and apply for opportunities at unprecedented scale. But applying to more grants does not mean winning more funding.</p><p>Shark.ai separates grants that are merely available from the grants that actually fit your organization.</p></div></div>
        <div className="stats"><div><b>$1T</b><span>in grant funding is awarded annually across public and private sources</span></div><div><b>6.3M</b><span>accepted grants inform Shark.ai’s proprietary matching intelligence</span></div><div><b>1 list</b><span>curated around your organization, budget, eligibility, and requirements</span></div></div>
      </Reveal>

      <section className="verification section" id="how-it-works">
        <div className="section-kicker">How Shark.ai works</div>
        <div className="split"><h2>From endless results<br/>to <em>the right shortlist.</em></h2><p>Shark.ai evaluates the factors that determine real grant fit, helping your team decide where an application has strategic merit before investing the work.</p></div>
        <div className="step-grid">{steps.map((s, i) => <Reveal as="article" delay={i * .07} key={s.n}><span>{s.n}</span><h3>{s.title}</h3><p>{s.text}</p><ArrowRight size={18}/></Reveal>)}</div>
      </section>

      <Reveal as="section" className="feature section">
        <div className="feature-visual">
          <div className="fit-stack"><div className="fit-ring"><Target/><strong>94%</strong><span>BEST FIT</span></div><div className="fit-tags"><span>Mission</span><span>Budget</span><span>Eligibility</span><span>Geography</span></div></div>
        </div>
        <div className="feature-copy"><div className="section-kicker">Search finds options. Shark finds fit.</div><h2>Know what is worth applying for.</h2><p>A keyword match cannot tell you whether a grant makes strategic sense. Shark.ai evaluates your organization and the opportunity together.</p><ul><li><Check/> Match funding to your organization’s size and budget</li><li><Check/> Screen requirements and eligibility before you invest time</li><li><Check/> Prioritize opportunities aligned with your mission and programs</li><li><Check/> Replace overwhelming search results with a focused shortlist</li></ul><p className="answer-note"><Sparkles size={16}/><span><b>ChatGPT can tell you which grants exist.</b><br/>Shark.ai tells you which grants your organization should pursue.</span></p></div>
      </Reveal>

      <Reveal as="section" className="answers section" id="answers">
        <div className="section-kicker">Straight answers about grant matching</div>
        <div className="split answer-intro"><h2>Which grants should your organization apply for?</h2><p>Prioritize grants that align with your mission, organization type, size, operating budget, geography, program history, funding needs, and eligibility. Shark.ai evaluates these signals together to identify stronger-fit opportunities.</p></div>
        <div className="faq-list">{faqs.map((f, i) => <details key={f.q} open={i === 0}><summary>{f.q}<ChevronDown size={18}/></summary><p>{f.a}</p></details>)}</div>
      </Reveal>

      <section className="resources section" id="resources">
        <div className="section-kicker">The Shark field guide</div>
        <div className="resources-head"><h2>Better funding decisions<br/>start with better questions.</h2><a href="#answers">Explore grant-matching answers <ArrowRight size={16}/></a></div>
        <div className="post-grid">{posts.map((p,i) => <Reveal as="article" delay={i * .08} key={p.title}><div className="post-art"><img src={p.image} alt={p.alt} width="960" height="600" loading="lazy" decoding="async" /></div><span>{p.tag} · {p.read}</span><h3>{p.title}</h3><p>{p.text}</p><a href="#answers" aria-label={`Read: ${p.title}`}>Read the answer <ArrowRight size={14}/></a></Reveal>)}</div>
      </section>

      <section className="cta section" id="demo">
        <div><div className="section-kicker">Find your best-fit grants</div><h2>Apply with focus.<br/><em>Fund what matters.</em></h2><p>Join the early-access list and be among the first to receive a curated grant shortlist built around your organization.</p></div>
        {sent ? <div className="success"><CircleCheck/><div><b>You’re on the list.</b><span>We’ll be in touch as early access opens.</span></div></div> : <form onSubmit={submit}><label htmlFor="email">Work email</label><div><input id="email" type="email" placeholder="you@organization.org" value={email} onChange={e=>setEmail(e.target.value)} required/><button className="button" type="submit">Request early access <ArrowRight size={16}/></button></div><small>Product updates and useful grant strategy. No noise.</small></form>}
      </section>
    </main>

    <footer><Logo/><p>Grant-matching intelligence for organizations that need funding.</p><div><a href="#how-it-works">How it works</a><a href="#answers">Answers</a><a href="#resources">Resources</a></div><span>© 2026 Shark AI</span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
