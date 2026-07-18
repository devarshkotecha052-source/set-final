const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const setuData = {
  overview: {
    name: "Setu",
    legalName: "BrokenTusk Technologies Private Limited",
    tagline: "API infrastructure to build beautiful financial journeys",
    headquarters: "Bengaluru, Karnataka, India",
    founded: "2018",
    founders: ["Sahil Kini", "Nikhil Kumar"],
    ceo: "Sahil Kini (Former, now CEO of RBIH as of July 2025)",
    employees: "150-200 (estimated)",
    countriesServed: ["India"],
    industry: "Financial Technology (Fintech)",
    sector: "B2B SaaS / Infrastructure",
    category: "Embedded Finance & Open Banking APIs",
    companyType: "Subsidiary of Pine Labs",
    parentCompany: "Pine Labs (Acquired in June 2022)",
    subsidiaries: [],
    website: "https://setu.co",
    latestValuation: "$70M - $75M (at acquisition in 2022)",
    totalFunding: "$19 Million",
    companyStatus: "Active Operating Subsidiary",
    revenue: "INR 15.3 Cr (FY23 - ~ $1.85M USD, operating revenue)",
    profitPnl: "INR -31.7 Cr loss (FY23, widening from FY22 loss of INR 29 Cr)"
  },
  history: [
    { year: "2018", event: "Setu founded", detail: "Sahil Kini and Nikhil Kumar co-founded Setu in Bengaluru to build API-first financial infrastructure." },
    { year: "2019", event: "Seed Round ($4M)", detail: "Raised $4 million in Seed funding led by Lightspeed India Partners and Bharat Innovation Fund." },
    { year: "2020", event: "Series A ($15M)", detail: "Raised $15 million in Series A funding led by Falcon Edge Capital alongside Lightspeed to scale developer tools and support integrations." },
    { year: "2021", event: "Scale & Growth", detail: "Launched major products including Account Aggregator (AA) framework support and corporate payment APIs." },
    { year: "2022", event: "Pine Labs Acquisition ($70M-75M)", detail: "Acquired by Pine Labs in June 2022 for approximately $70-$75 million in a cash-and-stock deal to expand Pine Labs' open banking footprint." },
    { year: "2023", event: "Enterprise Integration", detail: "Setu APIs integrated deeply into Pine Labs merchant network, scaling transactions significantly." },
    { year: "2025", event: "Sahil Kini appointed CEO of RBIH", detail: "Co-founder Sahil Kini appointed Chief Executive Officer of the Reserve Bank Innovation Hub (RBIH)." },
    { year: "2026", event: "Ecosystem Expansion", detail: "Nikhil Kumar steps down as Chief Evangelist (June 2026) to explore public digital public infrastructure (DPI) initiatives globally." }
  ],
  founders: [
    {
      name: "Sahil Kini",
      title: "Co-Founder & CEO (Former)",
      bio: "Sahil Kini is a technologist and investor who has spent his career driving India's digital public infrastructure. He was a core volunteer with iSPIRT helping design IndiaStack.",
      education: "B.Tech in Metallurgy & Materials Engineering from IIT Madras (awarded Shankar Dayal Sharma Prize).",
      previousRoles: "Business Analyst at McKinsey, VP at Aspada Investments, founder of MagnetWorks.",
      netWorth: "Not publicly disclosed",
      currentRole: "CEO of the Reserve Bank Innovation Hub (RBIH) as of July 2025"
    },
    {
      name: "Nikhil Kumar",
      title: "Co-Founder & Former Chief Evangelist",
      bio: "Nikhil Kumar is a technologist who was instrumental in building the developer ecosystem for UPI and led the three-week development sprint for the BHIM app after demonetization in 2016.",
      education: "Engineering background, raised in Kolar, Karnataka.",
      previousRoles: "Strategic roles at Tally, Intuit, Exotel; Co-founder of Voyce (acquired by Exotel). iSPIRT Fellow.",
      netWorth: "Not publicly disclosed",
      currentRole: "Advising World Bank and Gates Foundation on digital payments"
    }
  ],
  problem: {
    before: {
      process: "Legacy banking integrations required direct host-to-host SOAP/XML connections.",
      time: "3 to 6 months per integration.",
      cost: "Very high setup costs, upfront deposit requirements.",
      regulation: "Complex security audits and customized compliance frameworks per bank."
    },
    after: {
      process: "Standardized JSON REST APIs with a central developer sandbox.",
      time: "Under 2 hours.",
      cost: "Pay-as-you-go transactional pricing.",
      regulation: "Setu handles complex bank compliance, presenting a compliant SDK to developers."
    }
  },
  products: [
    { name: "Collect (UPI & Mandates)", desc: "Enable instant UPI collections, recurring auto-debits, and UPI Autopay.", launch: "2019", pricing: "Per-transaction fee (~1-2% or fixed INR)", customers: "Fintechs, SaaS businesses" },
    { name: "KYC & Identity", desc: "Embed PAN, Aadhaar, eSign, and Bank Account Verification instantly.", launch: "2020", pricing: "Tiered pricing per check", customers: "Lending platforms, wealth managers" },
    { name: "Account Aggregator (Consent)", desc: "RBI-regulated consent framework to fetch financial details like bank statements securely.", launch: "2021", pricing: "Per successful consent fetch", customers: "Underwriters, lenders" },
    { name: "BBPS (Bharat Bill Pay)", desc: "Integrate bill payment services for utilities, credit card bills, and loan repayments.", launch: "2020", pricing: "Slab-based transaction fee", customers: "Neo-banks, wallets" }
  ],
  business_model: {
    canvas: {
      partners: ["Axis Bank", "ICICI Bank", "Yes Bank", "NPCI", "RBI", "UIDAI"],
      activities: ["API design & maintenance", "Bank compliance negotiation", "Leased line scaling", "Security audits"],
      valueProp: ["Unified REST APIs for legacy banking services", "2-hour developer sandbox onboarding", "Plug-and-play compliance frameworks"],
      relations: ["Developer community", "Dedicated Enterprise TAMs", "Self-service developer console"],
      segments: ["Fintech Startups", "Traditional NBFCs", "Neo-banks", "SaaS platforms needing embedded payments"],
      resources: ["Unified gateway software", "Secure infrastructure", "Direct integrations with bank CBS"],
      channels: ["Direct developer registration", "Enterprise sales", "Strategic partnerships (like Pine Labs network)"],
      cost: ["Bank transaction fees", "Server & infra costs", "Regulatory compliance & audits", "Engineering salaries"],
      revenue: ["SaaS setup/subscription fees (enterprise)", "Per-transaction usage fees (payments)", "Per-call API checks (KYC & Identity)"]
    }
  },
  financials: {
    revenueHistory: [
      { year: "FY20", revenue: "INR 0.16 Cr", loss: "INR 4.5 Cr" },
      { year: "FY21", revenue: "INR 3.2 Cr", loss: "INR 12.1 Cr" },
      { year: "FY22", revenue: "INR 9.2 Cr", loss: "INR 29.1 Cr" },
      { year: "FY23", revenue: "INR 15.3 Cr", loss: "INR 31.7 Cr" }
    ],
    funding: [
      { round: "Seed", date: "April 2019", amount: "$4 Million", lead: "Lightspeed India & Bharat Innovation Fund" },
      { round: "Series A", date: "April 2020", amount: "$15 Million", lead: "Falcon Edge Capital & Lightspeed Venture Partners" }
    ]
  },
  competitors: [
    { name: "Razorpay (API)", products: "Payments, KYC, Turbo UPI", funding: "$800M+", strengths: "Massive market share, full suite", weaknesses: "Enterprise pricing, legacy focus" },
    { name: "M2P Fintech", products: "Cards issuing, Banking APIs", funding: "$100M+", strengths: "Deep core-banking level stack", weaknesses: "Harder developer onboarding" },
    { name: "Decentro", products: "KYC, UPI, Bank accounts", funding: "$5M+", strengths: "Clean developer onboarding", weaknesses: "Smaller bank partner network" }
  ],
  strategy: {
    swot: {
      strengths: ["Clean developer-first documentation", "Strong bank integration network", "Backed by Pine Labs' merchant base"],
      weaknesses: ["Widening net losses", "Heavy dependency on partner bank uptimes", "Niche B2B focus"],
      opportunities: ["Account Aggregator market growth", "Cross-selling to Pine Labs offline merchants", "International expansion via Pine Labs"],
      threats: ["Regulatory changes by RBI/NPCI", "Direct bank API infrastructure setups", "Intense competition from Razorpay/M2P"]
    }
  },
  references: [
    "Pine Labs Press Release (June 2022) - Setu Acquisition",
    "Lightspeed India Portfolio - Setu Profile & Funding",
    "Fintrackr / Entrackr FY23 Financial Report for BrokenTusk Technologies",
    "RBI Innovation Hub (RBIH) official appointment announcement (July 2025)",
    "iSPIRT Foundation public member registry & IndiaStack Developer Ecosystem reports"
  ]
};

fs.writeFileSync(path.join(dataDir, 'setu_data.json'), JSON.stringify(setuData, null, 2));
console.log('Successfully wrote setu_data.json');
