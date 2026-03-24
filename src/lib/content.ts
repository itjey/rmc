export const navigation = [
  { href: "/", label: "Home" },
  { href: "/registration", label: "Registration" },
  { href: "/rounds", label: "Rounds" },
  { href: "/problems", label: "Problems" },
  { href: "/archive", label: "Archive" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/buzzer", label: "Buzzer" },
];

export const site = {
  name: "RMC",
  fullName: "Rule Mathematics Competition",
  subtitle: "A multi-round mathematics competition for grades 6 through 12",
  hero: "Four rounds. Four subjects. One serious test of mathematical reasoning.",
  summary:
    "RMC is a structured mathematics competition featuring an individual round, a collaborative team round, a high-speed sprint round, and live buzzer finals. Covering algebra, combinatorics, geometry, and number theory, it is designed to bridge the gap between classroom math and competition-level problem solving.",
  announcement:
    "Registration for RMC 2026 is open and free for all students. Three years of past competition papers are available in the archive, and the live buzzer platform is ready for testing and room setup.",
  competitionDate: "October 17–18, 2026",
};

export const quickFacts = [
  { label: "Eligible grades", value: "6–12, two divisions" },
  { label: "Four rounds", value: "Individual · Team · Sprint · Buzzer" },
  { label: "Four subjects", value: "Algebra · Combinatorics · Geometry · Number Theory" },
  { label: "Format", value: "Online, proctored, no calculator" },
];

export const homeHighlights = [
  "Two divisions — Middle School for grades 6–8 and Upper School for grades 9–12 — so every student faces problems scaled to their level.",
  "Four distinct rounds test different skills: deep individual problem solving, team collaboration under pressure, rapid-fire sprint accuracy, and live head-to-head buzzer competition.",
  "Problems range from approachable AMC 10 difficulty through introductory AIME territory, giving students a meaningful benchmark for their mathematical growth.",
  "Free for the inaugural year, with no registration fee, open practice materials, and a live buzzer platform available for testing before competition day.",
];

export const schedule = [
  {
    label: "Registration deadline",
    value: "Thursday, October 15, 2026 at 11:59 PM Pacific",
  },
  {
    label: "Individual round",
    value: "Saturday, October 17, 2026 from 10:00 AM to 11:15 AM Pacific",
  },
  {
    label: "Sprint round",
    value: "Saturday, October 17, 2026 from 11:40 AM to 12:20 PM Pacific",
  },
  {
    label: "Team round",
    value: "Saturday, October 17, 2026 from 1:15 PM to 2:10 PM Pacific",
  },
  {
    label: "Buzzer finals",
    value: "Sunday, October 18, 2026 by invitation",
  },
  {
    label: "Results release",
    value: "Within one week of the final round",
  },
];

export const rounds = [
  {
    slug: "individual",
    title: "Individual round",
    href: "/contest",
    duration: "75 minutes",
    problems: "18 short-answer problems",
    summary:
      "The written individual round is the main score-producing round for every student.",
    difficulty:
      "The first third should feel comfortable for strong AMC 10 students, the middle moves into late AMC 10 or AMC 12 territory, and the final problems should brush against the lower end of AIME-style difficulty.",
    scoring: "10 points per correct answer, no penalty for incorrect answers.",
    breakdown: [
      "5 algebra problems",
      "4 combinatorics problems",
      "4 geometry problems",
      "5 number theory problems",
    ],
    color: "#1e3a5f",
    strategyTips: [
      "Work through the first six problems quickly to bank points, then allocate remaining time to the harder back half.",
      "If a problem stalls after two minutes, mark it and move on — returning with fresh eyes often breaks the block.",
      "Double-check arithmetic on problems you feel confident about; lost points on easy questions cost more than missed hard ones.",
    ],
    difficultySpectrum:
      "Problems 1–6 sit at AMC 10 #5–10 level. Problems 7–12 approach AMC 12 territory. Problems 13–18 brush against introductory AIME difficulty.",
  },
  {
    slug: "team",
    title: "Team round",
    href: "/team",
    duration: "55 minutes",
    problems: "10 collaborative problems",
    summary:
      "Teams work together on longer problems that reward communication and strategic division of work.",
    difficulty:
      "The team round starts near the top of AMC 10 level and quickly moves into multi-step, team-style questions that are harder than the average written individual problem.",
    scoring: "Team score recorded separately from the individual score.",
    breakdown: [
      "Longer statements with multiple observations",
      "Fewer routine computations",
      "Higher weight on setup and structure",
      "Built for discussion rather than speed alone",
    ],
    color: "#1a4731",
    strategyTips: [
      "Assign two members to read ahead while others work the current problem — pipelining saves critical minutes.",
      "Designate one person as the final answer checker before submission to catch transcription and sign errors.",
    ],
    difficultySpectrum:
      "Problems 1–3 are accessible to any team with AMC 10 experience. Problems 4–7 require coordinated multi-step reasoning. Problems 8–10 demand creative insight and careful proof-level setup.",
  },
  {
    slug: "sprint",
    title: "Sprint round",
    href: "/sprint",
    duration: "40 minutes",
    problems: "30 rapid-fire questions",
    summary:
      "A fast round with short questions and steady difficulty growth, designed to create urgency without becoming a pure trick contest.",
    difficulty:
      "Early problems should feel easier than the middle of the individual round. The last section should be comparable to late AMC 10 or the easier end of AIME bridge questions under time pressure.",
    scoring: "1 point per correct answer with an emphasis on pace and consistency.",
    breakdown: [
      "Very short prompts",
      "Steady time pressure",
      "Useful for breaking ties and identifying clean calculators-free speed",
      "Ideal bridge between written rounds and buzzer finals",
    ],
    color: "#7c4a03",
    strategyTips: [
      "Target 80 seconds per problem on average — skip anything that requires more than two minutes and return later.",
      "Write answers clearly and move on; second-guessing under sprint pressure wastes more time than it saves.",
      "The first ten problems should take under eight minutes total — use them to build momentum.",
    ],
    difficultySpectrum:
      "Problems 1–10 are at AMC 8 to early AMC 10 level. Problems 11–20 match mid-AMC 10 difficulty. Problems 21–30 reach late AMC 10 to early AMC 12 level under time pressure.",
  },
  {
    slug: "buzzer",
    title: "Buzzer finals",
    href: "/buzzer",
    duration: "Live moderated final",
    problems: "Question-by-question match play",
    summary:
      "The buzzer finals are meant to feel public, fast, and high stakes, with moderators controlling room state and scoring in real time.",
    difficulty:
      "Questions should range from quick recall and observation to medium-depth problem solving that can still be resolved live.",
    scoring: "Moderator-controlled scoring with lockouts, score adjustments, and room resets.",
    breakdown: [
      "Teams join by room code",
      "The first accepted buzz locks the room",
      "Moderators can clear locks and adjust scores",
      "Built for head-to-head elimination or final exhibitions",
    ],
    color: "#7f1d1d",
    strategyTips: [
      "Buzz only when you have a complete answer — incorrect buzzes hand momentum to the other team.",
      "Assign team members to different problem types so the fastest solver for each category takes the lead.",
    ],
    difficultySpectrum:
      "Questions vary widely by design. Early questions in each match are quick-recall at AMC 10 level. Later questions escalate to mid-AMC 12 difficulty, with bonus questions occasionally reaching AIME-style depth.",
  },
];

export const eligibility = [
  {
    label: "Student divisions",
    value:
      "Middle School division is for grades 6 through 8. Upper School division is for grades 9 through 12. Students compete and are ranked within their division.",
  },
  {
    label: "Team composition",
    value:
      "Teams consist of 4 to 6 students, typically from the same school or math program. For the inaugural year, mixed teams from different schools are permitted with prior approval from the competition committee.",
  },
  {
    label: "Independent students",
    value:
      "Students without a school team may register individually for the individual round and the sprint round. Independent students can request team placement with other unaffiliated registrants if seats are available.",
  },
  {
    label: "Permitted tools",
    value:
      "Pencils, erasers, blank scratch paper, and straightedges without measurement markings. No calculators, phones, smartwatches, computers, CAS software, internet access, AI tools, or pre-written reference materials of any kind.",
  },
  {
    label: "Proctoring requirement",
    value:
      "All written rounds must be completed under the supervision of an approved proctor. Schools should designate one adult coordinator. Independent students must arrange an approved adult supervisor before competition day.",
  },
  {
    label: "No fee for inaugural year",
    value:
      "The inaugural edition of RMC has no registration fee for any student or team. Future editions may introduce a nominal fee, with fee waivers available for students who need them.",
  },
];

export const registrationChecklist = [
  "Student full name, current grade level, and date of birth",
  "School name and school mailing address, or homeschool designation",
  "Parent or guardian name, email, and phone number for scheduling and proctor coordination",
  "Division selection (Middle School or Upper School) and team preference or individual registration",
  "Country, state or region, city, and local time zone for logistics and scheduling",
  "Proctor name and contact information, or request for proctor matching",
  "Volunteer and proctor interest form for adults who want to help administer the competition",
];

export const proctoringNotes = [
  "Schools are encouraged to designate one adult coordinator who registers all students from that school and serves as the primary point of contact for competition logistics.",
  "Independent students may use a parent, teacher, librarian, or other approved adult supervisor as a proctor. The proctor must confirm their role through the registration system before competition day.",
  "Volunteer proctors can be matched with schools or independent students if additional coverage is needed. Volunteers are vetted and confirmed by the competition committee.",
  "The volunteer form collects adult location, role interest, age bracket, institutional affiliation, availability windows, and any relevant experience with academic competitions.",
];

export const problemDistribution = [
  {
    round: "Individual",
    algebra: "5",
    combinatorics: "4",
    geometry: "4",
    numberTheory: "5",
    target: "AMC 10 through low AIME bridge",
  },
  {
    round: "Sprint",
    algebra: "8",
    combinatorics: "7",
    geometry: "7",
    numberTheory: "8",
    target: "AMC 8 or AMC 10 pace through late AMC 10 pressure",
  },
  {
    round: "Team",
    algebra: "mixed",
    combinatorics: "mixed",
    geometry: "mixed",
    numberTheory: "mixed",
    target: "Collaborative multi-step team problems",
  },
];

export const sponsorTiers = [
  {
    name: "Presenting Sponsor",
    description: "The flagship partner of Rule Mathematics Competition.",
    benefits: [
      "Access to RMC Resume Book (Opt-in dataset of top quantitative talent)",
      "Co-branded Recruiting Event (e.g. info session or AMA)",
      "Logo featured on every page of the competition website",
      "Naming rights for one competition round",
      "Featured in all student and school communications",
      "Logo on competition packets and certificates",
      "Dedicated section on the sponsors page",
    ],
  },
  {
    name: "Gold Sponsor",
    description: "A major supporter of student mathematics competition.",
    benefits: [
      "Access to RMC Resume Book (Opt-in dataset)",
      "Logo on the sponsors page and homepage sponsors section",
      "Logo on competition packet headers",
      "Mention in opening and closing communications",
      "Social media feature post",
    ],
  },
  {
    name: "Silver Sponsor",
    description: "A valued contributor to competition operations and student experience.",
    benefits: [
      "Logo on the sponsors page",
      "Acknowledgment in opening and closing communications",
      "Name listed in competition program",
    ],
  },
  {
    name: "Problem Sponsor",
    description: "Directly supports the mathematical content that defines the competition.",
    benefits: [
      "Attribution on specific problems or practice packets in the archive",
      "Name on the sponsors page under Problem Sponsors",
      "Recognition in archive materials",
    ],
  },
  {
    name: "Supporter",
    description: "Every contribution helps build a stronger competition for students.",
    benefits: [
      "Name listed on the sponsors page",
      "Acknowledgment in competition communications",
    ],
  },
];

export const sponsorPitch = {
  mission:
    "Rule Mathematics Competition is a rigorous, multi-round competition designed to challenge serious students in algebra, combinatorics, geometry, and number theory. We aim to make high-quality competition mathematics accessible to students nationwide, regardless of school resources or geography.",
  audience:
    "Students in grades 6 through 12 from schools across the country. Our participants are serious about mathematics — many are preparing for AMC, MATHCOUNTS, and state-level competitions. Teachers, coaches, parents, and school administrators are actively involved in coordination and proctoring.",
  whySponsor: [
    "Reach motivated STEM students at a formative stage in their mathematical development",
    "Align your brand with academic excellence, rigor, and problem solving",
    "Support equitable access to competition mathematics for underserved schools",
    "Gain visibility across competition materials, the website, student communications, and social media",
    "Join a growing ecosystem of organizations invested in the next generation of quantitative thinkers",
  ],
  whatFundingSupports: [
    "Platform infrastructure, hosting, and competition technology",
    "Problem development and review by experienced competition writers",
    "Student prizes, certificates, and recognition awards",
    "Outreach and access programs for underserved schools and communities",
    "Archive maintenance, practice material development, and educational resources",
    "Live buzzer finals production and event coordination",
  ],
};

export const honorCodeIntro =
  "RMC exists because students care about mathematics. The entire competition is built on trust — trust that every participant is doing their own work, that every score reflects genuine ability, and that every result is earned honestly. Cheating does not just break a rule. It undermines the experience for every student who prepared, practiced, and showed up to challenge themselves fairly. When one person cuts corners, it devalues the achievement of everyone around them. We take integrity seriously, and we ask every participant to do the same — not because we want to police you, but because the competition only means something if it is real.";

export const honorCode = [
  {
    title: "Academic integrity pledge",
    text: "By registering for RMC, every participant agrees: all work I submit is entirely my own during individual and sprint rounds. During team rounds, I will collaborate only with registered members of my team. I will not seek, receive, or provide unauthorized assistance of any kind. I will not access the internet, AI tools, textbooks, notes, or any outside resource during active competition windows. I understand that my participation is a commitment to fairness, and I accept the consequences of violating this pledge.",
  },
  {
    title: "Why this matters",
    text: "Mathematics competitions reward persistence, creativity, and genuine problem-solving ability. A score earned through shortcuts carries no value — it does not reflect what you know, it does not help you grow, and it robs the experience from students who competed honestly. Every year, the top finishers at serious competitions are students who spent months preparing. They deserve to know that the people around them earned their place too. If you are tempted to cheat, ask yourself why you are here. If the answer is not to test yourself honestly, this is not the right competition for you.",
  },
  {
    title: "Proctor supervision and recording",
    text: "All written rounds must be completed under the direct supervision of an approved adult proctor. Proctors are required to maintain a continuous video recording of each student or testing room for the full duration of every round. The recording must clearly show the student's face, workspace, and screen (if applicable). Proctors must store recordings for a minimum of 30 days after the competition and submit them upon request by the competition committee. Schools should designate one adult coordinator. Independent students must arrange an approved adult supervisor who meets proctoring requirements. Proctors are responsible for enforcing time limits, monitoring for prohibited materials, verifying student identity, and certifying the integrity of each student's work.",
  },
  {
    title: "Webcam and session monitoring",
    text: "When competing through the RMC online platform, students are required to grant webcam access for the duration of each round. The webcam feed is used to verify that the registered participant is present and working independently. Students who decline webcam access will not be permitted to submit answers through the platform. In addition to webcam monitoring, the platform records session activity including: timestamps of answer submissions, time spent on each problem, tab focus and visibility state, and browser environment metadata. Switching away from the competition tab during an active round is flagged automatically. Flagged sessions are reviewed by the competition committee and may result in score invalidation.",
  },
  {
    title: "Platform integrity detection",
    text: "The RMC submission platform employs multiple layers of integrity detection. Answer submission timestamps are recorded with millisecond precision and analyzed for patterns inconsistent with genuine problem-solving — such as submitting answers to multiple difficult problems within implausibly short intervals, or entering answers in bulk rather than sequentially. The platform tracks tab visibility: if you navigate away from the competition window, the system logs the duration and frequency of each departure. Repeated or extended departures trigger automatic flags. Browser environment checks detect the presence of screen-sharing software, virtual machines, remote desktop connections, and known automation tools. None of these measures are designed to catch honest mistakes — they exist to identify deliberate attempts to gain an unfair advantage.",
  },
  {
    title: "Prohibited conduct",
    text: "The following actions are strictly prohibited during any active competition round: accessing the internet for any reason other than the RMC platform itself; using calculators, computer algebra systems, AI tools (including but not limited to ChatGPT, Wolfram Alpha, Gemini, Claude, or any large language model), or any computational software; communicating with anyone other than your registered team members during team rounds, or with anyone at all during individual and sprint rounds; using pre-written notes, formula sheets, textbooks, or reference materials of any kind; photographing, screenshotting, or otherwise copying competition problems for distribution during the competition window; having another person complete any portion of the competition on your behalf; using a phone, smartwatch, or any electronic device other than the computer running the competition platform.",
  },
  {
    title: "Allowed materials",
    text: "Pencils, erasers, and blank scratch paper only. Straightedges without measurement markings are permitted. All scratch paper must be blank at the start of each round — proctors are responsible for verifying this. No other tools, aids, or reference materials are allowed.",
  },
  {
    title: "Consequences of violations",
    text: "Any confirmed violation of the honor code will result in immediate disqualification of the individual student from all rounds. If a team member is disqualified, the team's eligibility for team awards and buzzer finals will be reviewed on a case-by-case basis. Confirmed violations are reported to the student's school coordinator and, where applicable, to the parent or guardian on file. Students who are disqualified may be barred from future editions of RMC. There is no appeal process for confirmed cheating — the evidence review is conducted before any action is taken, and decisions are final.",
  },
  {
    title: "Scoring methodology",
    text: "Individual round: 10 points per correct answer, no deduction for incorrect or blank answers (180 points maximum). Sprint round: 1 point per correct answer (30 points maximum). Team round: scored separately as a team total. Buzzer finals: moderator-controlled scoring with variable point values per question. All scores are computed server-side from verified submissions. Manual score adjustments require committee approval and are logged.",
  },
  {
    title: "Tiebreaker procedures",
    text: "Individual ties are broken in order by: individual round score, then sprint round score, then earliest correct submission timestamp on the hardest solved problem. Team ties are broken by the sum of individual scores of team members. Buzzer final ties are resolved by a sudden-death tiebreaker question.",
  },
  {
    title: "Appeals",
    text: "Scoring disputes (not cheating disputes) must be submitted within 48 hours of results release. Appeals should include the problem number, the submitted answer, and a clear mathematical justification. The competition committee reviews all appeals and issues final rulings within one week. Appeals regarding answer correctness are reviewed against the official solution set. Appeals regarding platform issues (submission failures, connectivity problems) require supporting evidence such as proctor attestation or session logs.",
  },
  {
    title: "Code of conduct",
    text: "Participants, coaches, proctors, and volunteers are expected to behave respectfully toward all competition staff, fellow competitors, and each other. Harassment, intimidation, bullying, or unsportsmanlike conduct — whether in person, on the platform, or in any communication related to RMC — will result in immediate removal and possible disqualification. The competition reserves the right to disqualify any participant or team for violations of these rules at any time, including retroactively after results are published.",
  },
];

export const faq = [
  {
    question: "Who can participate in RMC?",
    answer:
      "Any student in grades 6 through 12 is eligible. The competition has two divisions: Middle School (grades 6\u20138) and Upper School (grades 9\u201312). Students from any school, homeschool program, or math circle may register. International students are welcome.",
  },
  {
    question: "How do I form a team?",
    answer:
      "Teams consist of 4 to 6 students, typically from the same school or math program. One student or coach should register the team, and individual team members register separately with a matching team preference. For the inaugural year, mixed teams from different schools are permitted with prior approval.",
  },
  {
    question: "Can I compete individually without a team?",
    answer:
      "Yes. All students participate in the individual round and the sprint round regardless of team membership. Students without a team may request placement with other individual registrants if seats are available. Team round participation requires a registered team.",
  },
  {
    question: "What if my school does not have a math team?",
    answer:
      "You may register independently. We encourage you to ask a teacher or parent to serve as your proctor. Independent students can also request team placement through the registration form. We are working to expand access and welcome inquiries about starting a team at your school.",
  },
  {
    question: "What should I bring on competition day?",
    answer:
      "Pencils, erasers, and blank scratch paper. A straightedge without measurement markings is permitted. Do not bring calculators, phones, smartwatches, or any electronic devices. No pre-written notes or formula sheets are allowed. Your proctor will supply or verify scratch paper.",
  },
  {
    question: "How is scoring calculated?",
    answer:
      "Individual round: 10 points per correct answer with no penalty for incorrect or blank answers, for a maximum of 180 points. Sprint round: 1 point per correct answer, maximum 30 points. Team round: scored as a team total, separate from individual scores. Buzzer finals: variable points controlled by the moderator.",
  },
  {
    question: "What happens if I lose internet during an online round?",
    answer:
      "Contact your proctor immediately. If the disconnection is brief and verifiable, the proctor may allow you to continue. Extended outages may require rescheduling at the discretion of the competition committee. Document the issue with a timestamp and notify us through the registration email.",
  },
  {
    question: "How are ties broken?",
    answer:
      "Individual ties are broken in order by: individual round score, then sprint round score, then the earliest correct submission timestamp on the hardest solved problem. Team ties are broken by the combined individual scores of team members. Buzzer final ties are resolved by a tiebreaker question.",
  },
  {
    question: "When are results released?",
    answer:
      "Results are released within one week of the final round. Individual scores, team standings, division rankings, and award recipients will be published on the archive page. Students and coaches are notified by email.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "The inaugural edition of RMC has no registration fee. We want to remove financial barriers and make the competition accessible to as many students as possible. Future editions may introduce a nominal fee, with fee waivers available for students who need them.",
  },
  {
    question: "How can my teacher or school get involved?",
    answer:
      "Teachers and coaches can serve as proctors, nominate students, and coordinate team registration. Schools are encouraged to designate one adult coordinator through the registration page. Adults interested in volunteering as proctors or problem reviewers can fill out the volunteer interest form.",
  },
  {
    question: "How should I prepare?",
    answer:
      "Start with the sample problems on the Problems page and the practice packets in the Archive. The difficulty ranges from AMC 10 to introductory AIME level. Familiarity with AMC 10, AMC 12, and MATHCOUNTS content is strong preparation. Practice working under timed conditions and review solutions carefully to understand the reasoning, not just the answers.",
  },
];

export const buzzerQualification =
  "The top teams by combined score (sum of individual scores of all team members plus team round score) advance to the buzzer finals. The exact number of qualifying teams depends on registration size and is announced after the written rounds conclude. Tiebreakers for qualification follow the same rules as team standings.";

export const advisoryBoard = [
  {
    name: "Dr. Jane Doe",
    role: "Problem Committee Chair",
    credentials: "MIT Math PhD, Former IMO Team USA Medalist",
  },
  {
    name: "John Smith",
    role: "Senior Problem Reviewer",
    credentials: "Putnam Fellow, Quantitative Researcher at Top Fund",
  },
];

export const industryPartners = [
  { name: "Jane Street", placeholder: true },
  { name: "Citadel", placeholder: true },
  { name: "Hudson River Trading", placeholder: true }
];

export const reachMetrics = [
  { label: "Target Audience", value: "Top high school talent nationwide" },
  { label: "Pipeline", value: "Direct path to top STEM universities" },
  { label: "Reach", value: "Students from 40+ states" },
];
