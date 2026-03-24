export const archiveEntries = [
  {
    title: "2026 Practice set",
    year: "2026",
    description:
      "A short written packet used to introduce the tone and style of the inaugural event.",
    href: "/problems",
    action: "View sample problems",
  },
  {
    title: "2026 Team demo packet",
    year: "2026",
    description:
      "A preview of the longer collaborative style planned for the team round.",
    href: "/team",
    action: "Open team round page",
  },
  {
    title: "2026 Buzzer demo room",
    year: "2026",
    description:
      "A live room system for moderators and teams to test buzzer flow before the official event.",
    href: "/buzzer",
    action: "Open buzzer platform",
  },
];

export type ArchiveProblem = {
  number: number;
  statement: string;
  answer: string;
  solution?: string;
};

export type ArchivePacket = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problemCount: number;
  problems: ArchiveProblem[];
};

export const archivePackets: ArchivePacket[] = [
  {
    id: "individual-practice",
    title: "Practice Set I \u2014 Individual Round Style",
    subtitle: "10 problems \u2014 increasing difficulty",
    description:
      "A full-length practice set in the style of the individual round. Covers algebra, combinatorics, geometry, and number theory from AMC 10 through introductory AIME difficulty. Complete answer key and solutions provided.",
    problemCount: 10,
    problems: [
      {
        number: 1,
        statement: "Compute 1 + 2 + 3 + \u2026 + 50.",
        answer: "1275",
        solution:
          "Using the formula n(n+1)/2 with n = 50, we get 50 \u00b7 51 / 2 = 1275.",
      },
      {
        number: 2,
        statement: "How many factors does 360 have?",
        answer: "24",
        solution:
          "The prime factorization of 360 is 2\u00b3 \u00b7 3\u00b2 \u00b7 5\u00b9. The number of factors is (3+1)(2+1)(1+1) = 4 \u00b7 3 \u00b7 2 = 24.",
      },
      {
        number: 3,
        statement:
          "What is the area of a triangle with vertices at (0,0), (6,0), and (3,4)?",
        answer: "12",
        solution:
          "Using the base-height formula, the base along the x-axis has length 6 and the height is the y-coordinate of the third vertex, which is 4. Area = 6 \u00b7 4 / 2 = 12.",
      },
      {
        number: 4,
        statement:
          "Find the sum of the first 5 terms of the geometric sequence 3, 6, 12, 24, \u2026",
        answer: "93",
        solution:
          "The first term is a = 3 and the common ratio is r = 2. The sum of the first 5 terms is a(r\u2075 \u2212 1)/(r \u2212 1) = 3(32 \u2212 1)/(2 \u2212 1) = 3 \u00b7 31 = 93.",
      },
      {
        number: 5,
        statement:
          "How many 3-element subsets of {1, 2, 3, 4, 5, 6, 7} have the property that no two elements are consecutive?",
        answer: "10",
        solution:
          "Map each valid subset {a, b, c} with a < b < c and no two consecutive to {a, b\u22121, c\u22122}, which is a 3-element subset of {1, 2, 3, 4, 5}. This is a bijection, so the count is C(5, 3) = 10. The subsets are: {1,3,5}, {1,3,6}, {1,3,7}, {1,4,6}, {1,4,7}, {1,5,7}, {2,4,6}, {2,4,7}, {2,5,7}, {3,5,7}.",
      },
      {
        number: 6,
        statement:
          "Find the positive integer n such that n\u00b2 + n = 156.",
        answer: "12",
        solution:
          "We solve n\u00b2 + n \u2212 156 = 0. Factoring gives (n + 13)(n \u2212 12) = 0. Since n is a positive integer, n = 12. Check: 12\u00b2 + 12 = 144 + 12 = 156.",
      },
      {
        number: 7,
        statement:
          "In a triangle with sides 7, 24, and 25, what is the length of the altitude to the longest side?",
        answer: "168/25",
        solution:
          "Since 7\u00b2 + 24\u00b2 = 49 + 576 = 625 = 25\u00b2, the triangle is a right triangle with hypotenuse 25. The area is 7 \u00b7 24 / 2 = 84. Using area = base \u00b7 height / 2 with the hypotenuse as base: 84 = 25h / 2, so h = 168/25.",
      },
      {
        number: 8,
        statement:
          "How many integers between 1 and 1000 inclusive are divisible by neither 6 nor 10?",
        answer: "767",
        solution:
          "By inclusion-exclusion: divisible by 6: \u230a1000/6\u230b = 166. Divisible by 10: \u230a1000/10\u230b = 100. Divisible by lcm(6,10) = 30: \u230a1000/30\u230b = 33. Divisible by 6 or 10: 166 + 100 \u2212 33 = 233. Divisible by neither: 1000 \u2212 233 = 767.",
      },
      {
        number: 9,
        statement:
          "Let p(x) = x\u00b3 \u2212 6x\u00b2 + 11x \u2212 6. Find the sum of the squares of the roots of p.",
        answer: "14",
        solution:
          "By Vieta\u2019s formulas, if the roots are r, s, t then r+s+t = 6, rs+rt+st = 11, and rst = 6. The sum of squares is (r+s+t)\u00b2 \u2212 2(rs+rt+st) = 36 \u2212 22 = 14.",
      },
      {
        number: 10,
        statement:
          "A 3\u00d73 grid is to be filled with the digits 1 through 9, each used exactly once, so that each row has an increasing sequence from left to right. How many such arrangements are possible?",
        answer: "1680",
        solution:
          "Choose which 3 of the 9 digits go in each row. Each row\u2019s digits must be arranged in increasing order, which uniquely determines their positions within that row. The number of ways to partition 9 digits into three ordered groups of 3 is C(9,3) \u00b7 C(6,3) \u00b7 C(3,3) = 84 \u00b7 20 \u00b7 1 = 1680.",
      },
    ],
  },
  {
    id: "sprint-practice",
    title: "Practice Set II \u2014 Sprint Round Style",
    subtitle: "15 problems \u2014 rapid fire",
    description:
      "Short-statement problems designed for speed. Difficulty increases from AMC 8 level through late AMC 10 under time pressure. Answer key provided.",
    problemCount: 15,
    problems: [
      {
        number: 1,
        statement: "What is 25% of 120?",
        answer: "30",
      },
      {
        number: 2,
        statement: "How many prime numbers are less than 20?",
        answer: "8",
      },
      {
        number: 3,
        statement:
          "What is the perimeter of a rectangle with area 24 and width 4?",
        answer: "20",
      },
      {
        number: 4,
        statement: "Simplify: 3\u2074 \u2212 2\u2074.",
        answer: "65",
      },
      {
        number: 5,
        statement:
          "A shirt costs $40 after a 20% discount. What was the original price?",
        answer: "50",
      },
      {
        number: 6,
        statement: "How many diagonals does a hexagon have?",
        answer: "9",
      },
      {
        number: 7,
        statement: "What is the median of {3, 7, 1, 9, 5}?",
        answer: "5",
      },
      {
        number: 8,
        statement:
          "Find the slope of the line passing through (2, 5) and (6, 13).",
        answer: "2",
      },
      {
        number: 9,
        statement:
          "What is the units digit of 3\u00b2\u2070\u00b2\u2075?",
        answer: "3",
      },
      {
        number: 10,
        statement:
          "A bag contains 4 red and 6 blue marbles. What is the probability of drawing 2 red marbles without replacement?",
        answer: "2/15",
      },
      {
        number: 11,
        statement:
          "What is the smallest positive integer n such that 12n is a perfect square?",
        answer: "3",
      },
      {
        number: 12,
        statement:
          "How many integers from 1 to 100 have exactly three positive divisors?",
        answer: "4",
      },
      {
        number: 13,
        statement:
          "In triangle ABC, angle A = 40\u00b0 and angle B = 75\u00b0. Find angle C in degrees.",
        answer: "65",
      },
      {
        number: 14,
        statement:
          "If f(x) = 2x + 1 and g(x) = x\u00b2, find f(g(3)).",
        answer: "19",
      },
      {
        number: 15,
        statement:
          "How many positive integer solutions does x + y + z = 10 have?",
        answer: "36",
      },
    ],
  },
  {
    id: "team-demo",
    title: "Team Demo Packet",
    subtitle: "5 collaborative problems",
    description:
      "Multi-step problems designed for team discussion. These problems reward careful setup and communication over raw speed. Full solutions provided.",
    problemCount: 5,
    problems: [
      {
        number: 1,
        statement:
          "A rectangular box has dimensions l, w, h with l + w + h = 12 and lw + wh + hl = 47. What is l\u00b2 + w\u00b2 + h\u00b2?",
        answer: "50",
        solution:
          "Expanding (l + w + h)\u00b2 = l\u00b2 + w\u00b2 + h\u00b2 + 2(lw + wh + hl). Substituting: 12\u00b2 = l\u00b2 + w\u00b2 + h\u00b2 + 2(47), so 144 = l\u00b2 + w\u00b2 + h\u00b2 + 94, giving l\u00b2 + w\u00b2 + h\u00b2 = 50.",
      },
      {
        number: 2,
        statement:
          "Seven students stand in a line. In how many ways can they arrange themselves so that the tallest and shortest students are not adjacent?",
        answer: "3600",
        solution:
          "Total arrangements: 7! = 5040. Arrangements where the tallest and shortest are adjacent: treat them as a single unit, giving 6! arrangements of units, times 2 for the internal order of the pair: 6! \u00b7 2 = 720 \u00b7 2 = 1440. Subtracting: 5040 \u2212 1440 = 3600.",
      },
      {
        number: 3,
        statement:
          "Find all pairs of positive integers (a, b) with a \u2264 b such that 1/a + 1/b = 1/6.",
        answer: "5 pairs: (7, 42), (8, 24), (9, 18), (10, 15), (12, 12)",
        solution:
          "Rewriting: 1/a + 1/b = 1/6 gives 6(a + b) = ab. Rearranging: ab \u2212 6a \u2212 6b = 0. Adding 36 to both sides: (a \u2212 6)(b \u2212 6) = 36. With a \u2264 b, we need a \u2212 6 \u2264 b \u2212 6 and both factors positive. The factor pairs of 36 are (1, 36), (2, 18), (3, 12), (4, 9), (6, 6), giving (a, b) = (7, 42), (8, 24), (9, 18), (10, 15), (12, 12).",
      },
      {
        number: 4,
        statement:
          "A circle of radius 3 is tangent internally to a circle of radius 8. What is the length of the longest chord of the larger circle that is also tangent to the smaller circle?",
        answer: "16",
        solution:
          "Place the larger circle at the origin with radius 8 and the smaller circle centered at (5, 0) with radius 3, since the distance between centers for internal tangency is 8 \u2212 3 = 5. The line 3x + 4y = 0 passes through the origin and has distance |3(5) + 4(0)| / \u221a(9 + 16) = 15/5 = 3 from the point (5, 0), so it is tangent to the smaller circle. Since this line passes through the center of the larger circle, the chord is a diameter of the larger circle with length 2 \u00b7 8 = 16. No chord can be longer than a diameter, so 16 is the maximum.",
      },
      {
        number: 5,
        statement:
          "Find the sum of all positive integers n less than 100 such that n\u00b2 \u2212 1 is divisible by 24.",
        answer: "1633",
        solution:
          "We need n\u00b2 \u2261 1 (mod 24). Since 24 = 8 \u00b7 3, this requires n\u00b2 \u2261 1 (mod 8) and n\u00b2 \u2261 1 (mod 3). The first condition holds when n is odd, and the second holds when n is not divisible by 3. The sum of all odd numbers from 1 to 99 is 50\u00b2 = 2500. The odd multiples of 3 from 3 to 99 are 3, 9, 15, \u2026, 99, which is 3(1 + 3 + 5 + \u2026 + 33) = 3 \u00b7 17\u00b2 = 3 \u00b7 289 = 867. The answer is 2500 \u2212 867 = 1633.",
      },
    ],
  },
  {
    id: "buzzer-demo",
    title: "Buzzer Demo Set",
    subtitle: "10 rapid-fire questions",
    description:
      "Quick-fire oral math questions for buzzer practice. Each question is designed to be solvable within 30 to 60 seconds. Answers provided.",
    problemCount: 10,
    problems: [
      {
        number: 1,
        statement: "What is 13 squared?",
        answer: "169",
      },
      {
        number: 2,
        statement: "How many sides does a dodecagon have?",
        answer: "12",
      },
      {
        number: 3,
        statement: "What is the next prime after 29?",
        answer: "31",
      },
      {
        number: 4,
        statement: "Convert 0.375 to a fraction in lowest terms.",
        answer: "3/8",
      },
      {
        number: 5,
        statement: "What is the volume of a cube with edge length 5?",
        answer: "125",
      },
      {
        number: 6,
        statement:
          "If a triangle has angles in the ratio 2:3:4, what is the largest angle in degrees?",
        answer: "80",
      },
      {
        number: 7,
        statement:
          "What is the sum of the interior angles of a pentagon in degrees?",
        answer: "540",
      },
      {
        number: 8,
        statement: "What is log base 2 of 64?",
        answer: "6",
      },
      {
        number: 9,
        statement:
          "How many ways can you arrange the letters in the word MATH?",
        answer: "24",
      },
      {
        number: 10,
        statement: "What is the product of the first four prime numbers?",
        answer: "210",
      },
    ],
  },
  {
    id: "preview-sampler",
    title: "Preview Round Sampler",
    subtitle: "8 mixed problems from all round types",
    description:
      "A sampler of problems drawn from different round formats to give students a taste of the full competition experience. Answer key provided.",
    problemCount: 8,
    problems: [
      {
        number: 1,
        statement: "Find the value of x if 3(2x \u2212 1) = 4x + 7.",
        answer: "5",
      },
      {
        number: 2,
        statement: "What is the least common multiple of 12 and 18?",
        answer: "36",
      },
      {
        number: 3,
        statement:
          "A regular hexagon has side length 6. What is its area?",
        answer: "54\u221a3",
      },
      {
        number: 4,
        statement: "How many two-digit palindromes are there?",
        answer: "9",
      },
      {
        number: 5,
        statement:
          "In how many ways can 5 books be arranged on a shelf if two specific books must be next to each other?",
        answer: "48",
      },
      {
        number: 6,
        statement:
          "What is the remainder when 2\u00b9\u2070 + 3\u00b9\u2070 is divided by 7?",
        answer: "6",
      },
      {
        number: 7,
        statement:
          "If the average of 5 numbers is 12, what is their sum?",
        answer: "60",
      },
      {
        number: 8,
        statement:
          "How many distinct ways can you make change for 25 cents using only nickels and dimes?",
        answer: "3",
      },
    ],
  },
];
