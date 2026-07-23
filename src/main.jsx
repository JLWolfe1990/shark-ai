import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, CircleCheck, Clock3, FileCheck2, Menu, Search, ShieldX, X } from 'lucide-react'
import './styles.css'

const steps = [
  { n: '01', title: 'Verify the funding plan', text: 'Measure the gap between what your mission needs from grants and the funding your current pipeline can actually support.' },
  { n: '02', title: 'Rule grants in or out', text: 'Check eligibility, geography, timing, award history, organization size, and funder behavior before staff time is committed.' },
  { n: '03', title: 'Fill the Funding Gap', text: 'Replace weak fits with verified opportunities and identify relationship-first funders worth cultivating before a grant opens.' },
  { n: '04', title: 'Draft, red-team, maintain', text: 'Support applications that earn a place in the pipeline, flag weaknesses, and keep every verdict, deadline, and next move current.' },
]

const posts = [
  { tag: 'Funding resilience', title: 'What is a nonprofit Funding Gap?', text: 'How to measure the difference between a grant goal and the documented pipeline that can realistically fund it.', read: '8 min', image: '/assets/curated-grants-v2.webp', alt: 'A verified funding path emerging from a larger field of possible grants' },
  { tag: 'Grant verification', title: 'How do you verify whether a grant is worth pursuing?', text: 'The evidence to check before investing 20 to 30 staff hours in a foundation application.', read: '7 min', image: '/assets/grant-search-vs-matching.webp', alt: 'A focused path through a sea of grant opportunities illustrating grant verification' },
  { tag: 'Funder strategy', title: 'Why funder history matters more than stated interests', text: 'What past awards reveal about organization size, geography, first-time grantees, and realistic ask amounts.', read: '7 min', image: '/assets/grant-fit-signals.webp', alt: 'Mission, eligibility, budget, and funder-history signals supporting a grant decision' },
]

const faqs = [
  { q: 'What is Sharke?', a: 'Sharke is a grant-verification and pipeline platform for nonprofits. It measures whether a grant-funded plan is viable, checks each opportunity against primary-source evidence, and helps teams build and maintain a Verified Pipeline.' },
  { q: 'What is a Funding Gap?', a: 'Your Funding Gap is the difference between the amount your mission needs from grants and the amount supported by a verified, documented path to funding. A long prospect list can still leave a large Funding Gap.' },
  { q: 'How is grant verification different from grant search?', a: 'Grant search finds opportunities based on descriptions and filters. Verification checks whether each opportunity belongs in your funding plan using eligibility, actual award history, geography, organization size, timing, and first-time grantee patterns.' },
  { q: 'Why not use ChatGPT or Claude to find grants?', a: 'General-purpose AI is useful for discovery and writing, but it may not have the primary-source award records needed to verify who a funder actually supports. Sharke checks verdicts against more than 6.3 million award records, funder filings, live requirements, and other public sources.' },
  { q: 'Does Sharke predict or guarantee grant awards?', a: 'No. Sharke uses categorical Pursue, Wait, or Move on verdicts rather than win probabilities. Verification shows whether documented evidence supports spending time on an opportunity; it does not promise a funder’s decision.' },
  { q: 'What does Sharke cost?', a: 'The Grant Funding Viability Assessment is $79 one time. The self-serve Grant Team workspace is $159 per month, and the done-for-you Grant Office starts at $249 per month. Published pricing may change.' },
]

function Logo() {
  return <a className="logo" href="#top" aria-label="Sharke home"><img src="/assets/shark-logo-transparent.webp" alt="Sharke" width="180" height="126" /></a>
}

function Reveal({ children, className = '', delay = 0, as = 'div', ...props }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]
  return <Component className={className} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ duration: .65, delay, ease: [0.22, 1, 0.36, 1] }} {...props}>{children}</Component>
}

function PipelineAnimation() {
  return <div className="pipeline-experience">
    <div className="pipeline-stage">
      <svg className="pipeline-svg" viewBox="0 0 1120 430" role="img" aria-labelledby="pipeline-title pipeline-desc">
        <title id="pipeline-title">How Sharke turns possible funders into a Verified Pipeline</title>
        <desc id="pipeline-desc">Possible grants enter the Sharke verification layer. Each receives a Pursue, Wait, or Move on verdict. Pursue opportunities fill the Verified Pipeline and move into an application workflow.</desc>
        <defs>
          <linearGradient id="flow-gradient" x1="0" x2="1">
            <stop offset="0" stopColor="#31dce0" stopOpacity=".12"/>
            <stop offset=".55" stopColor="#31dce0"/>
            <stop offset="1" stopColor="#6ff0d3"/>
          </linearGradient>
          <radialGradient id="node-glow">
            <stop offset="0" stopColor="#123d49"/>
            <stop offset="1" stopColor="#071621"/>
          </radialGradient>
          <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="wide-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12"/>
          </filter>
        </defs>

        <g className="grid-lines" aria-hidden="true">
          {[80,150,220,290,360].map(y => <line key={y} x1="20" y1={y} x2="1100" y2={y}/>)}
          {[100,220,340,460,580,700,820,940,1060].map(x => <line key={x} x1={x} y1="25" x2={x} y2="405"/>)}
        </g>

        <text className="svg-kicker" x="38" y="48">POSSIBLE FUNDERS</text>
        <g className="grant-cloud">
          {[
            [78,112,'A'],[164,92,'B'],[118,184,'C'],[204,164,'D'],[75,255,'E'],[167,242,'F'],[116,324,'G'],[211,305,'H']
          ].map(([cx,cy,label],i) => <g className="grant-node" style={{'--i':i}} key={label}>
            <circle cx={cx} cy={cy} r="25"/>
            <path d={`M${cx-10} ${cy-3}h20M${cx-7} ${cy-3}v12M${cx} ${cy-3}v12M${cx+7} ${cy-3}v12M${cx-12} ${cy+10}h24M${cx-9} ${cy-8}l9-6 9 6z`}/>
          </g>)}
        </g>

        <g className="incoming-streams" aria-hidden="true">
          <path d="M103 112 C245 112 264 189 368 205"/>
          <path d="M189 92 C278 92 285 169 368 205"/>
          <path d="M143 184 C250 184 284 198 368 205"/>
          <path d="M229 164 C294 164 318 194 368 205"/>
          <path d="M100 255 C245 255 284 216 368 205"/>
          <path d="M192 242 C280 242 313 216 368 205"/>
          <path d="M141 324 C254 324 291 242 368 205"/>
          <path d="M236 305 C304 305 326 233 368 205"/>
        </g>

        <g className="verify-core">
          <circle className="core-halo" cx="440" cy="205" r="83"/>
          <circle className="core-orbit" cx="440" cy="205" r="66"/>
          <circle className="core-body" cx="440" cy="205" r="52"/>
          <path className="shark-fin" d="M414 217c17-4 24-30 31-48 17 12 29 30 31 48-19-8-42-8-62 0z"/>
          <text x="440" y="244" textAnchor="middle">SHARKE</text>
          <g className="orbit-dot"><circle cx="440" cy="139" r="5"/></g>
        </g>

        <g className="verdict-streams" aria-hidden="true">
          <path className="pursue-path" d="M492 190 C556 159 580 119 638 104"/>
          <path className="wait-path" d="M492 205 C558 205 584 205 638 205"/>
          <path className="move-path" d="M492 220 C556 251 580 291 638 306"/>
        </g>
        <g className="verdicts">
          <g className="verdict pursue" transform="translate(638 70)"><rect width="134" height="68" rx="13"/><circle cx="24" cy="34" r="10"/><path d="M19 34l4 4 7-9"/><text x="44" y="31">PURSUE</text><text className="sub" x="44" y="50">documented fit</text></g>
          <g className="verdict wait" transform="translate(638 171)"><rect width="134" height="68" rx="13"/><circle cx="24" cy="34" r="10"/><path d="M24 28v7l5 3"/><text x="44" y="31">WAIT</text><text className="sub" x="44" y="50">verify next</text></g>
          <g className="verdict move" transform="translate(638 272)"><rect width="134" height="68" rx="13"/><circle cx="24" cy="34" r="10"/><path d="M20 30l8 8m0-8l-8 8"/><text x="44" y="31">MOVE ON</text><text className="sub" x="44" y="50">hours protected</text></g>
        </g>

        <path className="approved-flow" d="M772 104 C822 104 822 174 852 190" aria-hidden="true"/>
        <g className="pipeline-vessel">
          <ellipse className="vessel-glow" cx="910" cy="203" rx="86" ry="75"/>
          <path className="vessel-shell" d="M850 173v98c0 18 120 18 120 0v-98"/>
          <ellipse className="vessel-top" cx="910" cy="173" rx="60" ry="18"/>
          <path className="vessel-fill" d="M856 225v43c0 13 108 13 108 0v-43c-29 14-79 14-108 0z"/>
          <ellipse className="fill-top" cx="910" cy="225" rx="54" ry="15"/>
          <text x="910" y="305" textAnchor="middle">VERIFIED PIPELINE</text>
          <text className="pipeline-value" x="910" y="248" textAnchor="middle">FUNDED PATH</text>
        </g>

        <path className="final-flow" d="M970 220 C1016 220 1016 220 1042 220" aria-hidden="true"/>
        <g className="application" transform="translate(1035 151)">
          <rect width="68" height="138" rx="11"/>
          <path d="M15 29h38M15 48h28M15 76h38M15 95h32"/>
          <circle cx="49" cy="116" r="9"/><path d="M45 116l3 3 6-7"/>
        </g>

        <g className="flow-particles" aria-hidden="true">
          {[0,1,2,3,4].map(i => <circle key={i} r="4" style={{'--i':i}}><animateMotion dur="4.8s" begin={`${i*.72}s`} repeatCount="indefinite" path="M90 205 C250 205 300 205 388 205 C550 205 580 104 690 104 C820 104 814 210 904 220 C980 227 1020 220 1060 220"/></circle>)}
        </g>
      </svg>
      <div className="pipeline-status" aria-hidden="true">
        <span>Funding goal</span><i/><span>Evidence checked</span><i/><span>Verdict issued</span><i/><span>Pipeline maintained</span>
      </div>
    </div>
    <div className="pipeline-steps">{steps.map((s, i) => <article key={s.n} style={{'--step':i}}>
      <span>{s.n}</span><div><h3>{s.title}</h3><p>{s.text}</p></div>
    </article>)}</div>
  </div>
}

const verdictRecords = {
  pursue: {
    label: 'Pursue', icon: FileCheck2, tone: 'pursue', status: 'Documented fit', title: 'Community Resilience Fund',
    meta: 'Family foundation · Southwest', amount: '$75K–$125K', deadline: 'Oct 15',
    callout: 'The record supports a first ask at your size, this cycle.',
    evidence: [
      ['Funding behavior', '12 of the last 15 awards supported similar work.'],
      ['Size and ask', 'Recent grantees fit your budget; awards run $75K–$125K.'],
      ['New grantees', 'Four first-time grantees were funded in two cycles.'],
    ],
    source: 'IRS 990-PF Schedule I · 2021–2025 · Current funder guidelines',
  },
  wait: {
    label: 'Wait', icon: Clock3, tone: 'wait', status: 'Verify next', title: 'Rural Capacity Program',
    meta: 'Federal program · National', amount: 'Up to $250K', deadline: 'LOI first',
    callout: 'Strong program alignment, but this cycle and match requirement need confirmation.',
    evidence: [
      ['Program alignment', 'Your work matches the outcomes and service area.'],
      ['Cycle status', 'The next funding notice has not been published.'],
      ['Match requirement', 'The prior 20% match must be confirmed this cycle.'],
    ],
    source: 'SAM.gov · Prior NOFO · Agency program page · State award records',
  },
  move: {
    label: 'Move on', icon: ShieldX, tone: 'move', status: 'Hours protected', title: 'Metro Arts Initiative',
    meta: 'Community foundation · Regional', amount: '$25K', deadline: 'Rolling',
    callout: 'The funder’s record does not support committing your team’s time.',
    evidence: [
      ['Budget mismatch', '18 of 20 awards went to organizations above $2M.'],
      ['No first-time grantees', 'No new grantee was funded in four cycles.'],
      ['Geographic restriction', 'Recent awards exclude your primary program counties.'],
    ],
    source: 'IRS 990-PF Schedule I · 2021–2025 · Published eligibility',
  },
}

function DecisionInspector() {
  const [verdict, setVerdict] = useState('pursue')
  const record = verdictRecords[verdict]
  const Icon = record.icon
  return <div className={`decision-inspector ${record.tone}`}>
    <div className="verdict-tabs" role="tablist" aria-label="Grant verdict examples">
      {Object.entries(verdictRecords).map(([key, item]) => <button key={key} type="button" role="tab" aria-selected={verdict === key} className={verdict === key ? 'active' : ''} onClick={() => setVerdict(key)}>
        <item.icon size={18}/><span>{item.label}</span>
      </button>)}
    </div>
    <motion.div className="decision-record" key={verdict} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.32,ease:[.22,1,.36,1]}}>
      <div className="record-top">
        <div className="record-brand"><span className="mini-fin"/><b>SHARKE</b><small>DECISION RECORD</small></div>
        <span className="record-id">VERIFIED AGAINST PRIMARY SOURCES</span>
      </div>
      <div className="record-verdict">
        <span className="verdict-icon"><Icon/></span>
        <div><small>VERDICT</small><strong>{record.label}</strong><span>{record.status}</span></div>
      </div>
      <div className="record-title">
        <div><small>OPPORTUNITY</small><h3>{record.title}</h3><p>{record.meta}</p></div>
        <div className="record-numbers"><span><small>REALISTIC ASK</small><b>{record.amount}</b></span><span><small>NEXT DATE</small><b>{record.deadline}</b></span></div>
      </div>
      <p className="record-callout">{record.callout}</p>
      <div className="evidence-list">{record.evidence.map(([title,text], i) => <motion.div key={title} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:.08 + i*.08}}>
        <span>{i + 1}</span><div><b>{title}</b><p>{text}</p></div><Check size={18}/>
      </motion.div>)}</div>
      <div className="record-source"><span>SOURCES</span><p>{record.source}</p></div>
    </motion.div>
  </div>
}

function HeroDecisionVisual() {
  return <motion.div className="hero-intelligence" initial={{opacity:0,x:34,scale:.97}} animate={{opacity:1,x:0,scale:1}} transition={{duration:.9,delay:.18,ease:[.22,1,.36,1]}}>
    <div className="intel-top"><span><i/> LIVE VERIFICATION</span><span>6.3M+ AWARD RECORDS</span></div>
    <svg viewBox="0 0 640 520" role="img" aria-labelledby="hero-intel-title hero-intel-desc">
      <title id="hero-intel-title">Sharke grant verification visualization</title>
      <desc id="hero-intel-desc">Award history, eligibility, organization size, and geography flow through Sharke verification to produce a Pursue verdict for a grant opportunity.</desc>
      <defs>
        <radialGradient id="hero-core"><stop stopColor="#155363"/><stop offset="1" stopColor="#061722"/></radialGradient>
        <linearGradient id="hero-stream"><stop stopColor="#31dce0" stopOpacity=".15"/><stop offset=".55" stopColor="#31dce0"/><stop offset="1" stopColor="#6ff0d3"/></linearGradient>
        <filter id="hero-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="hero-blur"><feGaussianBlur stdDeviation="18"/></filter>
      </defs>
      <g className="intel-grid" aria-hidden="true">{[100,180,260,340,420,500,580].map(x=><line key={`x${x}`} x1={x} y1="24" x2={x} y2="496"/>)}{[70,140,210,280,350,420,490].map(y=><line key={`y${y}`} x1="28" y1={y} x2="612" y2={y}/>)}</g>
      <ellipse className="intel-ambient" cx="330" cy="252" rx="220" ry="180"/>
      <g className="source-lines" aria-hidden="true">
        <path d="M190 115 C218 115 232 180 274 213"/>
        <path d="M190 232 C220 232 242 238 269 244"/>
        <path d="M190 351 C218 351 236 302 276 272"/>
        <path d="M450 122 C426 122 414 180 384 216"/>
        <path d="M450 345 C424 345 411 304 384 275"/>
      </g>
      <g className="source source-awards" transform="translate(40 76)"><rect width="150" height="78" rx="13"/><circle cx="27" cy="39" r="13"/><path d="M20 42h14M22 42V32h10v10M25 32v-5h4v5"/><text x="50" y="34">AWARD HISTORY</text><text className="source-value" x="50" y="56">12 of 15 aligned</text></g>
      <g className="source source-size" transform="translate(40 193)"><rect width="150" height="78" rx="13"/><circle cx="27" cy="39" r="13"/><path d="M21 46V34m6 12V29m6 17V37"/><text x="50" y="34">ASK + ORG SIZE</text><text className="source-value" x="50" y="56">$75K–$125K</text></g>
      <g className="source source-new" transform="translate(40 310)"><rect width="150" height="78" rx="13"/><circle cx="27" cy="39" r="13"/><path d="M20 39h14m-7-7v14"/><text x="50" y="34">NEW GRANTEES</text><text className="source-value" x="50" y="56">4 in two cycles</text></g>
      <g className="source source-eligible" transform="translate(450 76)"><rect width="150" height="78" rx="13"/><circle cx="123" cy="39" r="13"/><path d="M117 39l4 4 8-10"/><text x="15" y="34">ELIGIBILITY</text><text className="source-value" x="15" y="56">Requirements met</text></g>
      <g className="source source-geo" transform="translate(450 310)"><rect width="150" height="78" rx="13"/><circle cx="123" cy="39" r="13"/><path d="M123 29c-8 0-11 9-6 15l6 7 6-7c5-6 2-15-6-15zm0 6a4 4 0 110 8 4 4 0 010-8z"/><text x="15" y="34">GEOGRAPHY</text><text className="source-value" x="15" y="56">Southwest fit</text></g>
      <g className="intel-core">
        <circle className="intel-halo halo-three" cx="330" cy="248" r="91"/>
        <circle className="intel-halo halo-two" cx="330" cy="248" r="73"/>
        <circle className="intel-halo halo-one" cx="330" cy="248" r="57"/>
        <circle className="intel-core-body" cx="330" cy="248" r="43"/>
        <path className="intel-fin" d="M305 260c13-4 20-27 26-43 15 11 25 27 26 43-16-7-35-7-52 0z"/>
        <text x="330" y="280" textAnchor="middle">SHARKE</text>
        <g className="intel-scanner"><path d="M330 157A91 91 0 01394 184"/><circle cx="394" cy="184" r="5"/></g>
      </g>
      <g className="intel-particles" aria-hidden="true">{[0,1,2,3,4].map(i=><circle key={i} r="3.5" style={{'--i':i}}><animateMotion dur="3.7s" begin={`${i*.55}s`} repeatCount="indefinite" path="M190 232 C225 232 247 240 287 247 C350 251 390 298 452 389"/></circle>)}</g>
      <path className="decision-stream" d="M358 282 C385 326 410 361 457 389" aria-hidden="true"/>
      <g className="hero-verdict" transform="translate(150 386)">
        <rect width="340" height="108" rx="16"/>
        <circle cx="49" cy="54" r="25"/><path d="M37 54l8 8 17-21"/>
        <text className="verdict-small" x="88" y="29">COMMUNITY RESILIENCE FUND</text>
        <text className="verdict-main" x="88" y="61">PURSUE</text>
        <text className="verdict-proof" x="88" y="84">FIT VERIFIED · $75K–$125K</text>
        <line className="verdict-divider" x1="246" y1="37" x2="246" y2="78"/>
        <text className="verdict-hours" x="318" y="55" textAnchor="end">WORTH YOUR</text><text className="verdict-hours sub" x="318" y="72" textAnchor="end">STAFF TIME</text>
      </g>
    </svg>
  </motion.div>
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
        <a href="#why-shark" onClick={() => setMenu(false)}>Why Sharke</a>
        <a href="#answers" onClick={() => setMenu(false)}>Answers</a>
        <a href="#resources" onClick={() => setMenu(false)}>Resources</a>
      </nav>
      <div className="nav-actions"><a className="text-link" href="#answers">What is grant verification?</a><a className="button small" href="#demo">Verify my funding plan <ArrowRight size={15}/></a></div>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}>{menu ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero">
        <div className="hero-image" aria-hidden="true">{!reduceMotion && <video autoPlay loop muted playsInline preload="metadata" poster="/assets/shark-data-hero-v2.webp" tabIndex="-1"><source src="/assets/shark-hero-swim-v3.mp4" type="video/mp4" /></video>}</div>
        <div className="waves" aria-hidden="true"><i/><i/><i/></div>
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>
          <div className="eyebrow"><span/> Verification-first grant funding</div>
          <h1>Build a pipeline<br/>that can fund<br/><em>your mission.</em></h1>
          <p>Sharke finds the grants worth pursuing, screens out the ones with no documented path to funding, and turns what survives into your Verified Pipeline.</p>
          <div className="hero-actions"><a className="button" href="#demo">Get the $79 assessment <ArrowRight size={17}/></a><a className="ghost" href="#how-it-works"><span className="play"><Search size={13}/></span> See the verification process</a></div>
          <div className="micro"><Check size={14}/> Board-ready in 48 hours <Check size={14}/> Source-cited decisions <Check size={14}/> Human-reviewed</div>
        </motion.div>
        <HeroDecisionVisual />
      </section>

      <section className="cred"><p>Grant verification for nonprofits counting on grants to fund the mission</p><div><span>EXECUTIVE DIRECTORS</span><span>DEVELOPMENT TEAMS</span><span>GRANT WRITERS</span><span>NONPROFITS</span><span>FOUNDATIONS</span></div></section>

      <Reveal as="section" className="problem section" id="why-shark">
        <div className="problem-grid"><div className="problem-copy"><div className="section-kicker">The hidden risk in your grant plan</div><h2>Your pipeline can look full.<br/><em>Your mission can still be exposed.</em></h2><p>More than $1 trillion in grant funding is awarded annually. Sharke draws on 6.3 million accepted grant records to help identify which opportunities have a documented path for your organization.</p><p>A list of possible grants is not a funding plan. Before anyone writes a word, Sharke checks the funder’s actual behavior—not only the language in an RFP.</p></div>
        <div className="funding-flow"><img src="/assets/sharke-funding-flow.webp" alt="$1 trillion in annual grant funding flows through 6.3 million accepted grants. Sharke evaluates the organization and directs it toward best-fit grants." width="1200" height="800" loading="lazy" decoding="async" /></div></div>
      </Reveal>

      <section className="verification section" id="how-it-works">
        <div className="section-kicker">How Sharke works</div>
        <div className="split"><h2>From possible funders<br/>to a <em>Verified Pipeline.</em></h2><p>Sharke turns grant research into an evidence-backed operating process: verify the plan, rule opportunities in or out, fill the Funding Gap, and keep the pipeline current.</p></div>
        <PipelineAnimation />
      </section>

      <Reveal as="section" className="feature decision-feature section">
        <DecisionInspector />
        <div className="feature-copy"><div className="section-kicker">Discovery finds options. Verification makes decisions.</div><h2>Every grant gets a verdict.</h2><p className="verdict-lede">Pursue. Wait. Move on.</p><p>Sharke does not manufacture a win probability. It returns a categorical, source-cited decision based on whether the documented evidence supports committing staff time.</p><div className="evidence-tags"><span>Award behavior</span><span>Organization size</span><span>Realistic ask</span><span>Geography</span><span>Eligibility</span><span>Timing</span><span>New-grantee history</span></div><a className="decision-link" href="#answers">How does Sharke verify a grant? <ArrowRight size={17}/></a><p className="answer-note"><span><b>General-purpose AI can help discover and draft.</b><br/>Sharke verifies the opportunity before the expensive work begins.</span></p></div>
      </Reveal>

      <Reveal as="section" className="answers section" id="answers">
        <div className="section-kicker">Straight answers about grant verification</div>
        <div className="split answer-intro"><h2>Can your grant pipeline actually fund the mission?</h2><p>Start by measuring the Funding Gap. Then verify every opportunity against eligibility and the funder’s documented behavior before your team invests the hours to apply.</p></div>
        <div className="faq-list">{faqs.map((f, i) => <details key={f.q} open={i === 0}><summary>{f.q}<ChevronDown size={18}/></summary><p>{f.a}</p></details>)}</div>
      </Reveal>

      <section className="resources section" id="resources">
        <div className="section-kicker">The Sharke field guide</div>
        <div className="resources-head"><h2>Better funding decisions<br/>start with better questions.</h2><a href="#answers">Explore grant-verification answers <ArrowRight size={16}/></a></div>
        <div className="post-grid">{posts.map((p,i) => <Reveal as="article" delay={i * .08} key={p.title}><div className="post-art"><img src={p.image} alt={p.alt} width="960" height="600" loading="lazy" decoding="async" /></div><span>{p.tag} · {p.read}</span><h3>{p.title}</h3><p>{p.text}</p><a href="#answers" aria-label={`Read: ${p.title}`}>Read the answer <ArrowRight size={14}/></a></Reveal>)}</div>
      </section>

      <section className="cta section" id="demo">
        <div><div className="section-kicker">Grant Funding Viability Assessment</div><h2>Verify the plan.<br/><em>Then fund the mission.</em></h2><p>Get a board-ready assessment of your Funding Gap, the viability of your grant plan, and the first 3 to 5 funders worth verifying. $79 one time, delivered in 48 hours.</p></div>
        {sent ? <div className="success"><CircleCheck/><div><b>Your request is in.</b><span>We’ll send the assessment details to your work email.</span></div></div> : <form onSubmit={submit}><label htmlFor="email">Work email</label><div><input id="email" type="email" placeholder="you@nonprofit.org" value={email} onChange={e=>setEmail(e.target.value)} required/><button className="button" type="submit">Start the assessment <ArrowRight size={16}/></button></div><small>Your EIN and one line about your organization are all it takes to begin.</small></form>}
      </section>
    </main>

    <footer><Logo/><p>Grant verification and a funding pipeline built to support the mission.</p><div><a href="#how-it-works">How it works</a><a href="#answers">Answers</a><a href="#resources">Resources</a></div><span>© 2026 Sharke</span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
