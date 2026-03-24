import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync, existsSync } from "fs";
import { join } from "path";

const BASE_DIR = join(import.meta.dirname, "..", "public", "archive");

const YEARS = [2023, 2024, 2025];
const ROUNDS = ["individual", "team", "sprint", "buzzer"];

const ROUND_LABELS = {
  individual: "Individual Round",
  team: "Team Round",
  sprint: "Sprint Round",
  buzzer: "Buzzer Round",
};

const ROUND_INSTRUCTIONS = {
  individual: {
    time: "75 minutes",
    problems: 8,
    scoring: "10 points per problem. No partial credit.",
    extra: "No calculators, books, or electronic devices permitted. Show all work for full credit.",
  },
  team: {
    time: "55 minutes",
    problems: 5,
    scoring: "20 points per problem. Partial credit may be awarded.",
    extra:
      "Teams of up to 4 members. One answer sheet per team. No calculators permitted.",
  },
  sprint: {
    time: "40 minutes",
    problems: 15,
    scoring: "1 point per problem. No partial credit.",
    extra:
      "Answer each problem as quickly and accurately as possible. No calculators permitted.",
  },
  buzzer: {
    time: "Varies (moderator-paced)",
    problems: 10,
    scoring:
      "10 points for a correct buzz. 5-point deduction for an incorrect buzz.",
    extra:
      "Teams compete head-to-head. The moderator reads each question aloud. No calculators permitted.",
  },
};

const PROBLEMS = {
  2023: {
    individual: [
      { q: "Compute 2^10 - 10^2.", a: "924", hint: "1024 - 100 = 924" },
      {
        q: "How many integers from 1 to 200 are divisible by 3 or 5?",
        a: "93",
        hint: "66 + 40 - 13 = 93 by inclusion-exclusion",
      },
      {
        q: "A circle has circumference 12\u03C0. What is its area?",
        a: "36\u03C0",
        hint: "r = 6, A = \u03C0r\u00B2 = 36\u03C0",
      },
      {
        q: "If f(x) = 3x - 2, find f(f(5)).",
        a: "37",
        hint: "f(5) = 13, f(13) = 37",
      },
      {
        q: "How many diagonals does an octagon have?",
        a: "20",
        hint: "n(n-3)/2 = 8(5)/2 = 20",
      },
      {
        q: "Find the sum of all prime factors of 2310.",
        a: "28",
        hint: "2310 = 2 \u00D7 3 \u00D7 5 \u00D7 7 \u00D7 11; sum = 28",
      },
      {
        q: "In a right triangle, the legs are 9 and 40. Find the hypotenuse.",
        a: "41",
        hint: "\u221A(81 + 1600) = \u221A1681 = 41",
      },
      {
        q: "How many 4-digit numbers have all distinct digits?",
        a: "4536",
        hint: "9 \u00D7 9 \u00D7 8 \u00D7 7 = 4536",
      },
    ],
    team: [
      {
        q: "A rectangle has perimeter 40 and diagonal 2\u221A52. Find its area.",
        a: "96",
        hint: "l + w = 20, l\u00B2 + w\u00B2 = 208, lw = (400 - 208)/2 = 96",
      },
      {
        q: "Find the number of positive integers n \u2264 100 such that n and n + 2 are both prime.",
        a: "8",
        hint: "(3,5), (5,7), (11,13), (17,19), (29,31), (41,43), (59,61), (71,73)",
      },
      {
        q: "If x + 1/x = 5, find x\u00B2 + 1/x\u00B2.",
        a: "23",
        hint: "(x + 1/x)\u00B2 = x\u00B2 + 2 + 1/x\u00B2, so 25 - 2 = 23",
      },
      {
        q: "How many ways can 5 people sit in a row of 7 chairs?",
        a: "2520",
        hint: "P(7,5) = 7!/2! = 2520",
      },
      {
        q: "A triangle has sides 13, 14, 15. Find the length of the altitude to the side of length 14.",
        a: "12",
        hint: "s = 21, Area = \u221A(21\u00D78\u00D77\u00D76) = 84, h = 2(84)/14 = 12",
      },
    ],
    sprint: [
      { q: "What is 7 \u00D7 13?", a: "91" },
      { q: "How many vertices does a cube have?", a: "8" },
      { q: "What is the GCD of 48 and 36?", a: "12" },
      { q: "If 3x + 7 = 22, find x.", a: "5" },
      { q: "What is 25% of 320?", a: "80" },
      { q: "How many prime numbers are between 30 and 50?", a: "4" },
      {
        q: "What is the area of a triangle with base 10 and height 7?",
        a: "35",
      },
      { q: "Compute 2^8.", a: "256" },
      { q: "If a square has area 144, what is its perimeter?", a: "48" },
      { q: "What is the LCM of 6 and 8?", a: "24" },
      { q: "How many subsets does a set of 4 elements have?", a: "16" },
      {
        q: "Find the slope of the line through (1, 3) and (4, 12).",
        a: "3",
      },
      { q: "What is the remainder when 100 is divided by 7?", a: "2" },
      {
        q: "A coin is flipped 3 times. How many outcomes are there?",
        a: "8",
      },
      { q: "If f(x) = x\u00B2 + 1, find f(7).", a: "50" },
    ],
    buzzer: [
      { q: "What is 15 squared?", a: "225" },
      { q: "How many sides does a nonagon have?", a: "9" },
      { q: "What is the sum of the first 10 positive integers?", a: "55" },
      {
        q: "Name the theorem: a\u00B2 + b\u00B2 = c\u00B2 for right triangles.",
        a: "Pythagorean theorem",
      },
      { q: "What is 1000 divided by 8?", a: "125" },
      { q: "What is the smallest perfect square greater than 50?", a: "64" },
      { q: "How many zeros does 10! end with?", a: "2" },
      { q: "What is the area of a circle with diameter 10?", a: "25\u03C0" },
      { q: "What is 3^5?", a: "243" },
      {
        q: "If a polygon has 5 sides, what is the sum of its interior angles?",
        a: "540",
      },
    ],
  },
  2024: {
    individual: [
      {
        q: "Find the sum 1 + 3 + 5 + \u2026 + 99.",
        a: "2500",
        hint: "50 terms, sum = 50\u00B2 = 2500",
      },
      {
        q: "A bag has 5 red and 3 blue marbles. Two are drawn without replacement. What is the probability both are red?",
        a: "5/14",
        hint: "(5/8)(4/7) = 20/56 = 5/14",
      },
      {
        q: "Find the remainder when 3^100 is divided by 4.",
        a: "1",
        hint: "3\u00B2 \u2261 1 (mod 4), 100 is even, so 3^100 \u2261 1",
      },
      {
        q: "Compute C(10, 4).",
        a: "210",
        hint: "10!/(4!\u00B76!) = 210",
      },
      {
        q: "A trapezoid has parallel sides 8 and 14 and height 5. Find its area.",
        a: "55",
        hint: "(8 + 14) \u00D7 5 / 2 = 55",
      },
      {
        q: "How many positive integers less than 1000 are perfect cubes?",
        a: "9",
        hint: "1\u00B3 through 9\u00B3 (1, 8, 27, \u2026, 729)",
      },
      {
        q: "Find the product of the roots of x\u00B2 - 7x + 12 = 0.",
        a: "12",
        hint: "By Vieta\u2019s formulas, product = c/a = 12",
      },
      {
        q: "A regular hexagon has side 4. What is its perimeter?",
        a: "24",
        hint: "6 \u00D7 4 = 24",
      },
    ],
    team: [
      {
        q: "Find all integer solutions to x\u00B2 - y\u00B2 = 45 with x > y > 0. How many such pairs (x, y) exist?",
        a: "3 pairs: (7, 2), (9, 6), (23, 22)",
        hint: "(x+y)(x-y) = 45. Factor pairs give (23,22), (9,6), (7,2).",
      },
      {
        q: "How many three-digit numbers are palindromes?",
        a: "90",
        hint: "First digit: 1\u20139, middle: 0\u20139, last = first. 9 \u00D7 10 = 90",
      },
      {
        q: "In triangle ABC, AB = 10, BC = 8, angle B = 60\u00B0. Find AC.",
        a: "2\u221A21",
        hint: "AC\u00B2 = 100 + 64 - 2(10)(8)(1/2) = 84. AC = 2\u221A21",
      },
      {
        q: "A committee of 3 is chosen from 5 men and 4 women. How many committees have at least one woman?",
        a: "74",
        hint: "C(9,3) - C(5,3) = 84 - 10 = 74",
      },
      {
        q: "Find the largest prime factor of 1001.",
        a: "13",
        hint: "1001 = 7 \u00D7 11 \u00D7 13",
      },
    ],
    sprint: [
      { q: "What is 12 \u00D7 15?", a: "180" },
      { q: "How many edges does a triangular prism have?", a: "9" },
      { q: "Simplify: 5!/3!", a: "20" },
      { q: "What is the absolute value of -17?", a: "17" },
      {
        q: "A car travels 60 mph for 2.5 hours. How far does it go?",
        a: "150 miles",
      },
      { q: "What is the next term in 2, 6, 18, 54, \u2026?", a: "162" },
      { q: "Find the midpoint of (2, 8) and (10, 4).", a: "(6, 6)" },
      { q: "How many factors does 100 have?", a: "9" },
      { q: "What is 0.125 as a fraction?", a: "1/8" },
      {
        q: "If the angles of a triangle are x, 2x, and 3x, find x.",
        a: "30",
      },
      { q: "What is the surface area of a cube with edge 3?", a: "54" },
      { q: "How many ways can 3 books be arranged on a shelf?", a: "6" },
      { q: "What is the value of |-3| + |5| - |-2|?", a: "6" },
      { q: "Find the distance between (0, 0) and (3, 4).", a: "5" },
      { q: "What is the median of {2, 8, 4, 6, 10}?", a: "6" },
    ],
    buzzer: [
      { q: "What is 18 \u00D7 22?", a: "396" },
      { q: "How many faces does a dodecahedron have?", a: "12" },
      { q: "What is the square root of 196?", a: "14" },
      { q: "What is the only even prime?", a: "2" },
      { q: "Compute 11\u00B2.", a: "121" },
      { q: "How many degrees in a straight angle?", a: "180" },
      { q: "What is the next prime after 37?", a: "41" },
      { q: "How many millimeters in a meter?", a: "1000" },
      { q: "What is 4 factorial?", a: "24" },
      { q: "What is the sum of angles in a quadrilateral?", a: "360" },
    ],
  },
  2025: {
    individual: [
      {
        q: "Solve for x: 5(x - 3) = 2(x + 6).",
        a: "9",
        hint: "5x - 15 = 2x + 12, 3x = 27, x = 9",
      },
      {
        q: "How many ways can 6 students line up in a row?",
        a: "720",
        hint: "6! = 720",
      },
      {
        q: "A cylinder has radius 3 and height 10. Find its volume.",
        a: "90\u03C0",
        hint: "\u03C0r\u00B2h = \u03C0(9)(10) = 90\u03C0",
      },
      {
        q: "Find the sum of the geometric series: 1 + 1/3 + 1/9 + 1/27 + 1/81.",
        a: "121/81",
        hint: "(1 - (1/3)^5)/(1 - 1/3) = (242/243)/(2/3) = 121/81",
      },
      {
        q: "How many lattice points (x, y) satisfy |x| + |y| \u2264 3?",
        a: "25",
        hint: "k=0: 1, k=1: 4, k=2: 8, k=3: 12. Total = 25",
      },
      {
        q: "What is the last digit of 7^100?",
        a: "1",
        hint: "Cycle: 7, 9, 3, 1. Period 4, 100/4 = 25 remainder 0, last digit = 1",
      },
      {
        q: "In a class of 30, 18 play soccer, 15 play basketball, and 5 play neither. How many play both?",
        a: "8",
        hint: "18 + 15 - both + 5 = 30, both = 8",
      },
      {
        q: "Find the number of distinct prime factors of 360.",
        a: "3",
        hint: "360 = 2\u00B3 \u00D7 3\u00B2 \u00D7 5. Three distinct primes.",
      },
    ],
    team: [
      {
        q: "The average of 5 numbers is 20. When a sixth number is added, the average becomes 22. Find the sixth number.",
        a: "32",
        hint: "Sum of 5 = 100, sum of 6 = 132, sixth = 32",
      },
      {
        q: "How many ordered pairs (a, b) of positive integers satisfy 1/a + 1/b = 1/4?",
        a: "5",
        hint: "(a-4)(b-4) = 16. Factor pairs: (1,16),(2,8),(4,4),(8,2),(16,1) giving 5 pairs.",
      },
      {
        q: "A 5\u00D75 grid has each cell colored black or white. How many ways to color it so that each row has exactly 2 black cells?",
        a: "100000",
        hint: "C(5,2)^5 = 10^5 = 100000",
      },
      {
        q: "Find the area of the triangle with vertices (0, 0), (5, 0), (2, 6).",
        a: "15",
        hint: "Area = (1/2)|5 \u00D7 6 - 0| = 15",
      },
      {
        q: "If p and q are prime and p\u00B2 + q\u00B2 = 50, find pq.",
        a: "25",
        hint: "Only solution: p = q = 5. pq = 25.",
      },
    ],
    sprint: [
      { q: "What is 16 \u00D7 25?", a: "400" },
      {
        q: "How many degrees in each angle of an equilateral triangle?",
        a: "60",
      },
      { q: "Simplify: \u221A50.", a: "5\u221A2" },
      { q: "What is 1/3 + 1/4?", a: "7/12" },
      {
        q: "A rectangle has length 12 and width 5. Find its diagonal.",
        a: "13",
      },
      { q: "How many two-digit prime numbers are there?", a: "21" },
      { q: "What is the 10th triangular number?", a: "55" },
      { q: "If 2^x = 64, what is x?", a: "6" },
      {
        q: "What is the perimeter of a regular pentagon with side 8?",
        a: "40",
      },
      { q: "Compute: 1\u00B2 + 2\u00B2 + 3\u00B2 + 4\u00B2.", a: "30" },
      { q: "What fraction of 60 is 15?", a: "1/4" },
      {
        q: "How many integers between 1 and 50 are perfect squares?",
        a: "7",
      },
      { q: "If a:b = 3:5 and b:c = 5:7, what is a:c?", a: "3:7" },
      {
        q: "What is the volume of a sphere with radius 3? (Leave in terms of \u03C0.)",
        a: "36\u03C0",
      },
      {
        q: "Find the 7th term of the sequence 2, 5, 8, 11, \u2026",
        a: "20",
      },
    ],
    buzzer: [
      { q: "What is 14 \u00D7 16?", a: "224" },
      { q: "What is the Roman numeral for 49?", a: "XLIX" },
      { q: "How many prime numbers less than 10?", a: "4" },
      { q: "What is the cube root of 125?", a: "5" },
      {
        q: "What angle does each internal angle of a regular hexagon measure?",
        a: "120",
      },
      { q: "What is 7! divided by 5!?", a: "42" },
      { q: "What is the smallest 3-digit palindrome?", a: "101" },
      { q: "How many seconds in an hour?", a: "3600" },
      { q: "What is the sum 1 + 2 + 3 + \u2026 + 20?", a: "210" },
      { q: "What is gcd(24, 36)?", a: "12" },
    ],
  },
};

function writePdf(doc, filePath) {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(filePath);
    doc.pipe(stream);
    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

function drawCenteredText(doc, text, y, opts = {}) {
  const fontSize = opts.fontSize || 12;
  const font = opts.font || "Helvetica";
  doc.font(font).fontSize(fontSize);
  doc.text(text, 72, y, { width: 468, align: "center" });
}

function drawInstructionsBox(doc, round, y) {
  const info = ROUND_INSTRUCTIONS[round];
  const boxX = 72;
  const boxWidth = 468;
  const padding = 12;

  const lines = [
    `Time Limit: ${info.time}`,
    `Number of Problems: ${info.problems}`,
    `Scoring: ${info.scoring}`,
    `${info.extra}`,
  ];

  doc.font("Helvetica-Bold").fontSize(10);
  const titleHeight = 16;
  doc.font("Helvetica").fontSize(9);

  let textHeight = 0;
  for (const line of lines) {
    textHeight += doc.heightOfString(line, { width: boxWidth - 2 * padding });
    textHeight += 2;
  }

  const boxHeight = titleHeight + textHeight + 2 * padding + 8;

  doc
    .rect(boxX, y, boxWidth, boxHeight)
    .lineWidth(1)
    .stroke("#333333");

  let curY = y + padding;
  doc.font("Helvetica-Bold").fontSize(10).fillColor("#000000");
  doc.text("Instructions", boxX + padding, curY, {
    width: boxWidth - 2 * padding,
    align: "center",
  });
  curY += titleHeight + 4;

  doc.font("Helvetica").fontSize(9).fillColor("#333333");
  for (const line of lines) {
    doc.text(line, boxX + padding, curY, { width: boxWidth - 2 * padding });
    curY += doc.heightOfString(line, { width: boxWidth - 2 * padding }) + 2;
  }

  doc.fillColor("#000000");
  return y + boxHeight + 16;
}

function generateProblemPdf(year, round) {
  const doc = new PDFDocument({
    size: "letter",
    margins: { top: 72, bottom: 72, left: 72, right: 72 },
  });

  const filePath = join(BASE_DIR, String(year), `rmc-${year}-${round}.pdf`);
  const problems = PROBLEMS[year][round];

  drawCenteredText(doc, `Rule Mathematics Competition ${year}`, 72, {
    fontSize: 18,
    font: "Helvetica-Bold",
  });

  drawCenteredText(doc, ROUND_LABELS[round], 100, {
    fontSize: 14,
    font: "Helvetica",
  });

  doc
    .moveTo(72, 122)
    .lineTo(540, 122)
    .lineWidth(0.5)
    .stroke("#999999");

  let curY = drawInstructionsBox(doc, round, 134);

  curY += 8;

  doc.font("Helvetica").fontSize(11).fillColor("#000000");

  for (let i = 0; i < problems.length; i++) {
    const label = `${i + 1}. `;
    const text = problems[i].q;

    const estimatedHeight = doc.heightOfString(`${label}${text}`, {
      width: 440,
    });

    if (curY + estimatedHeight + 40 > 720) {
      doc.addPage();
      curY = 72;
    }

    doc.font("Helvetica-Bold").fontSize(11);
    doc.text(label, 72, curY, { continued: true, width: 440 });
    doc.font("Helvetica").fontSize(11);
    doc.text(text, { width: 440 });

    curY += estimatedHeight + 28;
  }

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#999999");
  doc.text(
    `RMC ${year} \u2014 ${ROUND_LABELS[round]}`,
    72,
    740,
    { width: 468, align: "center" }
  );
  doc.fillColor("#000000");

  return writePdf(doc, filePath).then(() => filePath);
}

function generateAnswerPdf(year, round) {
  const doc = new PDFDocument({
    size: "letter",
    margins: { top: 72, bottom: 72, left: 72, right: 72 },
  });

  const filePath = join(
    BASE_DIR,
    String(year),
    `rmc-${year}-${round}-answers.pdf`
  );
  const problems = PROBLEMS[year][round];
  const showHints = round === "individual" || round === "team";

  drawCenteredText(
    doc,
    `RMC ${year} \u2014 ${ROUND_LABELS[round]} Answer Key`,
    72,
    { fontSize: 16, font: "Helvetica-Bold" }
  );

  doc
    .moveTo(72, 98)
    .lineTo(540, 98)
    .lineWidth(0.5)
    .stroke("#999999");

  let curY = 118;

  const colNumW = 30;
  const colAnsW = showHints ? 140 : 380;
  const colHintW = showHints ? 298 : 0;

  doc.font("Helvetica-Bold").fontSize(10).fillColor("#333333");
  doc.text("#", 72, curY, { width: colNumW });
  doc.text("Answer", 72 + colNumW, curY, { width: colAnsW });
  if (showHints) {
    doc.text("Solution Note", 72 + colNumW + colAnsW, curY, {
      width: colHintW,
    });
  }

  curY += 18;
  doc
    .moveTo(72, curY)
    .lineTo(540, curY)
    .lineWidth(0.5)
    .stroke("#cccccc");
  curY += 8;

  doc.fillColor("#000000");

  for (let i = 0; i < problems.length; i++) {
    const p = problems[i];
    const hint = p.hint || "";

    const rowHeight = showHints && hint
      ? Math.max(
          20,
          doc.font("Helvetica").fontSize(10).heightOfString(hint, { width: colHintW - 8 }) + 8
        )
      : 22;

    if (curY + rowHeight + 10 > 720) {
      doc.addPage();
      curY = 72;
    }

    if (i % 2 === 0) {
      doc
        .rect(72, curY - 3, 468, rowHeight + 4)
        .fill("#f5f5f5");
    }

    doc.font("Helvetica-Bold").fontSize(10).fillColor("#000000");
    doc.text(`${i + 1}.`, 72, curY, { width: colNumW });

    doc.font("Helvetica").fontSize(10).fillColor("#000000");
    doc.text(p.a, 72 + colNumW, curY, { width: colAnsW });

    if (showHints && hint) {
      doc.font("Helvetica").fontSize(9).fillColor("#555555");
      doc.text(hint, 72 + colNumW + colAnsW, curY, { width: colHintW - 8 });
    }

    curY += rowHeight + 6;
  }

  doc.fillColor("#000000");

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#999999");
  doc.text(
    `RMC ${year} \u2014 ${ROUND_LABELS[round]} \u2014 Answer Key`,
    72,
    740,
    { width: 468, align: "center" }
  );

  return writePdf(doc, filePath).then(() => filePath);
}

async function main() {
  const tasks = [];

  for (const year of YEARS) {
    const dir = join(BASE_DIR, String(year));
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    for (const round of ROUNDS) {
      tasks.push(generateProblemPdf(year, round));
      tasks.push(generateAnswerPdf(year, round));
    }
  }

  const results = await Promise.all(tasks);
  console.log(`Generated ${results.length} PDFs:`);
  for (const r of results) {
    console.log(`  ${r}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
