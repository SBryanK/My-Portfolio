// All visible content lives here. Add a certification or project by adding one object.
export const site = {
  name: 'Santasila Bryan Kusno',
  short: 'Santasila Bryan',
  email: 'santasila.bryan@gmail.com',
  url: 'https://main.d3ludbi4nxj7ab.amplifyapp.com',
  // GA4 ID comes from the PUBLIC_GA_ID env var (set in Amplify). Fallback below stays empty until you have one.
  gaId: import.meta.env.PUBLIC_GA_ID || '',
  links: {
    linkedin: 'https://www.linkedin.com/in/santasilabryankusno/',
    github: 'https://github.com/SBryanK',
    credly: 'https://www.credly.com/users/santasila-bryan-kusno',
    devpost: 'https://devpost.com/9santasilabryan9',
    medium: 'https://medium.com/@9santasilabryan9',
  },
};

export const stats = [
  { n: 1, suffix: 'M+', label: 'Customers reached by a redesigned fintech web app' },
  { n: 3, suffix: '×', label: 'Less internal workload after WAF test automation' },
  { n: 50, suffix: '%', label: 'Better forecast and fraud-detection accuracy' },
  { n: 800, suffix: '+', label: 'Teams beaten at NUS Hack&Roll 2024' },
];

export const toolbox: [string, [string, string][]][] = [
  ['Languages', [['Python', 'python.svg'], ['R', 'r.svg'], ['SQL', 'postgresql.svg'], ['JavaScript', 'javascript.svg'], ['HTML', 'html5.svg'], ['CSS', 'css.svg'], ['Excel VBA', 'excel.svg']]],
  ['Cloud & infra', [['AWS', 'aws.svg'], ['Google Cloud', 'googlecloud.svg'], ['Tencent Cloud', 'tencent.png'], ['Terraform', 'terraform.svg'], ['Docker', 'docker.svg'], ['Git', 'git.svg']]],
  ['Frameworks & ML', [['React', 'react.svg'], ['Flask', 'flask.svg'], ['Tkinter', 'python.svg'], ['OpenCV', 'opencv.svg'], ['scikit-learn', 'scikitlearn.svg']]],
  ['Data & BI', [['Tableau', 'tableau.svg'], ['Power BI', 'powerbi.svg'], ['Grafana', 'grafana.svg'], ['Talend', 'talend.svg'], ['Figma', 'figma.svg']]],
];
export const spoken = 'Indonesian (native) · English (full professional) · Chinese (elementary)';

export type Role = { title: string; when: string; points: string[]; tags?: string[] };
export type Job = { org: string; logo?: string; fill?: boolean; mark?: string; place?: string; span?: string; roles: Role[] };

export const experience: Job[] = [
  {
    org: 'Tencent Cloud', logo: 'tencent-cloud.png', place: 'Jakarta · Singapore', span: '1 yr 2 mo',
    roles: [
      {
        title: 'EdgeOne Solutions Architect', when: 'Apr 2026 — Jul 2026',
        points: [
          'First and only **EdgeOne solutions architect** covering the largest economy in Southeast Asia, driving growth of Tencent Cloud EdgeOne.',
          'Won strategic **RFPs** that turned into enterprise adoption, working with engineers and business managers from planning to deployment.',
          'Helped lead a **million-dollar engagement** with two of Indonesia\'s biggest national banks, architecting end-to-end CDN, WAF and Anti-DDoS.',
          '**Doubled market penetration** with customer-centric pitches and tailored technical analyses for C-suite stakeholders of multinationals.',
          'Cut internal workload **three-fold** by deploying a cost management algorithm and penetration testing tools that validate security rules.',
        ],
        tags: ['CDN', 'WAF', 'Anti-DDoS', 'RFP', 'C-suite'],
      },
      {
        title: 'Cloud Solutions Architect', when: 'Jun 2025 — Mar 2026',
        points: [
          'Founding member of **Indonesia\'s first EdgeOne solutions architect team**, driving CDN, security and edge computing adoption for global enterprises across APAC.',
          'Architected solutions across CDN, WAF, Anti-DDoS and Bot Protection, from first design through production.',
          'Led PoC deployments for enterprise clients and served as **Product SME** for EdgeOne\'s advanced capabilities.',
          'Helped the Tencent Cloud global team migrate high-profile clients, built a **pentesting automation platform** for WAF rule validation and an AI-powered remote authentication solution on Edge Functions.',
          'Ran technical workshops and enablement sessions to speed up partner adoption across Southeast Asia.',
        ],
        tags: ['Edge Functions', 'Bot Protection', 'PoC', 'Enablement'],
      },
    ],
  },
  {
    org: 'Pikkat QTa Retail Servisindo', logo: 'pikkat.png', place: 'Jakarta',
    roles: [{
      title: 'Data Analyst Intern', when: 'Jun 2024 — Aug 2024',
      points: [
        'Pioneered ML models for junior and senior executives, **doubling data processing rate** and daily operational efficiency.',
        'Wrangled multidimensional sales data gathered by a custom web crawler, cutting operational overhead **five-fold**.',
        'Built analytics dashboards for inventory and revenue analysis, **tripling sales team productivity**.',
      ],
      tags: ['Python', 'Machine Learning', 'Web Crawling', 'Dashboards'],
    }],
  },
  {
    org: 'AIESEC in Singapore', logo: 'aiesec.jpg', fill: true, place: 'Singapore', span: '1 yr 2 mo',
    roles: [
      {
        title: 'Business Development Associate · Incoming Global Talent', when: 'Jan 2023 — Feb 2024',
        points: [
          'Built and kept relationships with companies across industries to create placements for international interns in Singapore.',
          'Ran profiling through to reception for shortlisted talent across four startups, in a team of five.',
        ],
        tags: ['Business Development', 'Stakeholders'],
      },
      {
        title: 'Delegate Service Associate · SWITCH 2023', when: 'Aug 2023 — Sep 2023',
        points: [
          'Coordinated with nine committees for a two-day national event of **100+ delegates** from SIM, SMU, NTU and NUS.',
          'Reached a **90%+ satisfaction rate** with a new sign-up and feedback flow and fast, accountable communication.',
        ],
        tags: ['Events', 'Logistics'],
      },
    ],
  },
  {
    org: 'SIMIAN Group', logo: 'SIMIAN.jpeg', fill: true, place: 'Jakarta',
    roles: [{
      title: 'Data Management Intern', when: 'Jun 2023 — Aug 2023',
      points: [
        'Optimised time-series models in Python and SQL, lifting forecast and **fraud detection accuracy by 50%**.',
        'Redesigned the UI/UX of a major Indonesian financial institution\'s web app, contributing to active customers passing **1 million**.',
        'Built ETL pipelines in Talend Open Studio to feed credit-scoring models.',
      ],
      tags: ['Python', 'SQL', 'Talend', 'UI/UX'],
    }],
  },
];

export type Project = {
  title: string; blurb: string; tags: string[]; img: string; badge?: string;
  href?: string; cta?: string; priv?: string; external?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Job Application Agent', img: 'cover-agent.svg', badge: 'Featured', priv: 'job-agent',
    blurb: 'A browser agent that searches roles, fills LinkedIn Easy Apply and company-site forms, tracks every application in a sheet, and stops to ask whenever it does not know an answer.',
    tags: ['Python', 'Playwright', 'Automation'], cta: 'View repo',
  },
  {
    title: 'SFF 2026 Itinerary Planner', img: 'cover-sff.svg', badge: 'Live', priv: 'sff-planner',
    blurb: 'A shared plan for Singapore FinTech Festival: per-person itineraries, a group view, a "what\'s next" list by Singapore time, and opt-in live location between friends.',
    tags: ['JavaScript', 'Vercel', 'PWA'], cta: 'View project',
  },
  {
    title: 'TeamSlot', img: 'cover-teamslot.svg', href: '/teamslot/',
    blurb: 'Availability heatmaps that show when a team can actually meet, built for a real project group.',
    tags: ['JavaScript', 'Data viz'], cta: 'Open app',
  },
  {
    title: 'Sign Language Hand Detection', img: 'asl.png', badge: 'Hackathon winner', href: 'https://devpost.com/9santasilabryan9',
    blurb: 'A low-latency sign language learning game by a team of four that reads hand shapes in real time. Won NUS Hack&Roll 2024 against 800+ participants.',
    tags: ['OpenCV', 'Python', 'Tkinter'], cta: 'View project', external: true,
  },
  {
    title: 'Amazon Powered Tetris', img: 'apt.webp', href: 'https://devpost.com/software/apt-amazon-powered-tetris',
    blurb: 'Tetris controlled entirely by hand gestures, containerised on AWS ECS Fargate with CloudFormation and RDS.',
    tags: ['React', 'Flask', 'AWS ECS'], cta: 'View project', external: true,
  },
  {
    title: 'WAF Pentesting Automation', img: 'waf.jpg', href: 'https://www.linkedin.com/in/santasilabryankusno/',
    blurb: 'An internal platform at Tencent that automates penetration tests to validate WAF rule sets and cut manual review three-fold.',
    tags: ['Security', 'WAF', 'Automation'], cta: 'View details', external: true,
  },
  {
    title: 'Diabetes Prediction Model', img: 'dp.jpeg', href: 'https://github.com/SBryanK/Diabetes-Prediction-BRFSS',
    blurb: 'Early-detection classifier on BRFSS survey data, tuned around the false-negative cost that matters in screening.',
    tags: ['scikit-learn', 'Healthcare'], cta: 'View project', external: true,
  },
  {
    title: 'LoMo E-Commerce Case Study', img: 'lomo.jpeg', href: 'https://github.com/SBryanK/LoMo-Case-Study',
    blurb: 'Cohorting, retention and conversion analysis of an e-commerce dataset, written up as recommendations for an operator.',
    tags: ['Python', 'Segmentation'], cta: 'View project', external: true,
  },
  {
    title: 'Sales Forecasting Dashboard', img: 'bar.jpg', href: 'https://public.tableau.com/app/profile/santasila.bryan/viz/SalesForecastingProject2024/Story1',
    blurb: 'An interactive Tableau story that walks a non-technical reader from raw retail sales to a forecast they can question.',
    tags: ['Tableau', 'Forecasting'], cta: 'View dashboard', external: true,
  },
  {
    title: 'Walmart Sales Analysis', img: 'walmart.jpg', href: 'https://rpubs.com/SBK_26/MLP2',
    blurb: 'Seasonality, holiday effects and a forward forecast over multi-store sales history, written in R.',
    tags: ['R', 'Time series'], cta: 'View analysis', external: true,
  },
  {
    title: 'Marriott Market Research', img: 'marriott.jpg', href: 'https://www.linkedin.com/in/santasilabryankusno/details/projects/',
    blurb: 'Market analysis for the hospitality industry that ends in positioning recommendations, not a chart pack.',
    tags: ['Market research', 'Strategy'], cta: 'View project', external: true,
  },
];

export type Cert = { name: string; issuer: string; level?: string; img?: string; href?: string; mystery?: boolean };

export const certs: Cert[] = [
  { name: 'AWS Machine Learning', issuer: 'Specialty', img: 'aws-mls.png', href: 'https://www.credly.com/earner/earned/badge/77d77501-7e22-45f4-9eb9-6e45092cc0d5' },
  { name: 'AWS Solutions Architect', issuer: 'Associate', img: 'aws-saa.png', href: 'https://www.credly.com/earner/earned/badge/c31330d6-46cf-4b64-b015-c410043ced25' },
  { name: 'AWS Machine Learning Engineer', issuer: 'Associate', img: 'aws-mla.png', href: 'https://www.credly.com/earner/earned/badge/c7a6aa5a-f036-49d7-ab13-e6eaecf71ec1' },
  { name: 'AWS AI Practitioner', issuer: 'Foundational', img: 'aws-aip.png', href: 'https://www.credly.com/users/santasila-bryan-kusno' },
  { name: 'Tableau Certified Data Analyst', issuer: 'Tableau', img: 'tableau-da.png', href: 'https://www.credly.com/earner/earned/badge/46dd17f9-1b18-4aad-ab1e-ed83af654ba8' },
  { name: 'Tencent Cloud Professional', issuer: 'Tencent Cloud', img: 'tencent-t.png', href: 'https://www.linkedin.com/in/santasilabryankusno/details/certifications/' },
  { name: 'Data Science & Machine Learning', issuer: 'MIT', img: 'mit.png', href: 'https://www.linkedin.com/in/santasilabryankusno/details/certifications/' },
  { name: 'Bloomberg Market Concepts', issuer: 'Bloomberg', img: 'bloomberg.png', href: 'https://www.linkedin.com/in/santasilabryankusno/details/certifications/' },
  { name: 'Bloomberg Finance Fundamentals', issuer: 'Bloomberg', img: 'bloomberg.png', href: 'https://www.linkedin.com/in/santasilabryankusno/details/certifications/' },
  { name: 'Options 101', issuer: 'Akuna Capital', img: 'akuna.jpg', href: 'https://www.linkedin.com/in/santasilabryankusno/details/certifications/' },
  { name: 'Problem Solving', issuer: 'HackerRank', level: 'Intermediate', img: 'hackerrank.png', href: 'https://www.linkedin.com/in/santasilabryankusno/details/certifications/' },
  { name: 'Problem Solving', issuer: 'HackerRank', level: 'Advanced', img: 'hackerrank.png', href: 'https://www.linkedin.com/in/santasilabryankusno/details/certifications/' },
  { name: 'Next one is on the way', issuer: 'Stay tuned', mystery: true },
];

export const nusModules = [
  ['DOS5024', 'Strategic Procurement in the Digital World'],
  ['EE5025', 'IP: Innovations in IoT'],
  ['IND5001', 'Introduction to Industry 4.0 and Applications'],
  ['IND5003', 'Data Analytics for Sense-Making'],
  ['IS5007', 'Strategising for Global IT-enabled Business Success'],
  ['IS5116', 'Digital Entrepreneurship'],
];

export const uolModules: [string, string[]][] = [
  ['Foundations', ['Introduction to Economics', 'Business and Management in a Global Context', 'Mathematical Methods', 'Statistics 1', 'Statistics 2']],
  ['Core', ['Abstract Mathematics', 'Advanced Statistics: Distribution Theory', 'Advanced Statistics: Statistical Inference', 'Business Analytics, Applied Modelling and Prediction', 'Machine Learning']],
  ['Electives', ['Management Science Methods', 'Marketing Management', 'Programming for Data Science', 'Statistical Methods for Market Research']],
];

export const awards = [
  ['Winner', 'NUS Hack&Roll 2024', 'field of 800+'],
  ['Top 10', 'MIT IDSS Data Science Hackathon 2024', ''],
  ['Finalist', 'NUS Health Hack 2024', ''],
  ['Bronze', 'Duke of Edinburgh\'s International Award', ''],
  ['Bronze', 'POSI Indonesian Mathematics Olympiad', ''],
  ['Highest score', 'Junior high school national exam, Bekasi 2018', ''],
  ['Honourable mention', 'SMAK PENABUR English essay', ''],
  ['Master', 'of Abacus', ''],
];

export type Community = { role: string; org: string; text: string; img?: string; mark?: string; star?: boolean; wide?: boolean; fill?: boolean; long?: string };
export const community: Community[] = [
  {
    role: 'Community Admin', org: 'NUS SCALE Indonesia · 2026/27 batch', img: 'nus-scale.png', wide: true, star: true,
    text: 'I run the info group for the NUS SCALE Indonesia 2026/27 batch, sharing events, deadlines, internships and useful resources.',
    long: 'Day to day that means filtering the noise: posting only what is worth a student\'s time, pinning deadlines, answering new members\' questions and connecting people who are working on the same thing. The group is invite-only, so ask me if you are in the batch and want in.',
  },
  {
    role: 'Volunteer Developer', org: 'better.sg', img: 'bettersg.png', star: true,
    text: 'Invited by the CEO after winning Hack&Roll 2024. Spent over a year building with Singapore\'s largest tech-for-good community.',
  },
  { role: 'Student Ambassador', org: 'Tzu Chi Foundation Singapore', img: 'tzsgp.png', text: 'Represented the foundation on campus through outreach, recruitment and volunteer sessions.' },
  { role: 'Volunteer & Coordinator', org: 'Tzu Chi Foundation Indonesia', img: 'tzidn.png', text: 'Coordinated 30+ cross-campus initiatives with hundreds of volunteers and tripled the cohort size.' },
  { role: 'University Ambassador', org: 'Singapore Institute of Management', img: 'simsa.png', text: 'Led 10+ campus tours and events reaching 50+ students and 300+ public participants.' },
  { role: 'Delegate Service Associate', org: 'AIESEC SWITCH 2023', img: 'aiesec.jpg', fill: true, text: 'Coordinated nine committees for a national event of 100+ delegates and reached 90%+ satisfaction.' },
  { role: 'Student Council', org: 'SMAK PENABUR Harapan Indah', img: 'penabur.png', text: 'Organised student-body events and represented the cohort to school leadership.' },
];

export const privateProjects: Record<string, { title: string; kind: string }> = {
  'job-agent': { title: 'Job Application Agent', kind: 'repository' },
  'sff-planner': { title: 'SFF 2026 Itinerary Planner', kind: 'project' },
};

// Prefix root-relative URLs with the configured base path (needed when hosted under a sub-path).
export const u = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + p;
