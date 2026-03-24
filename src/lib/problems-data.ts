export type SampleProblem = {
  id: string;
  round: "Individual" | "Sprint" | "Team" | "Buzzer";
  topic: "Algebra" | "Combinatorics" | "Geometry" | "Number Theory" | "Mixed";
  difficulty: string;
  statement: string;
  answer: string;
  solution: string;
};

export const sampleProblems: SampleProblem[] = [
  {
    id: "ind-1",
    round: "Individual",
    topic: "Algebra",
    difficulty: "AMC 10 mid",
    statement:
      "If 2^x + 2^x + 2^x + 2^x = 2^{16}, what is x?",
    answer: "14",
    solution:
      "The left side is 4 \\cdot 2^x = 2^2 \\cdot 2^x = 2^{x+2}. Setting 2^{x+2} = 2^{16} gives x + 2 = 16, so x = 14.",
  },
  {
    id: "ind-2",
    round: "Individual",
    topic: "Number Theory",
    difficulty: "AMC 10 late",
    statement:
      "How many positive integers less than 100 are divisible by 3 but not by 5?",
    answer: "27",
    solution:
      "Positive integers less than 100 divisible by 3: \\lfloor 99/3 \\rfloor = 33. Divisible by both 3 and 5 (i.e., by 15): \\lfloor 99/15 \\rfloor = 6. By inclusion-exclusion, divisible by 3 but not 5: 33 - 6 = 27.",
  },
  {
    id: "ind-3",
    round: "Individual",
    topic: "Geometry",
    difficulty: "AMC 12 mid",
    statement:
      "In triangle ABC, AB = 13, BC = 14, and CA = 15. What is the area of triangle ABC?",
    answer: "84",
    solution:
      "Using Heron's formula with s = (13 + 14 + 15)/2 = 21. Area = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{21 \\cdot 8 \\cdot 42} = \\sqrt{7056} = 84.",
  },
  {
    id: "ind-4",
    round: "Individual",
    topic: "Combinatorics",
    difficulty: "AMC 12 late",
    statement:
      "In how many ways can 8 people be seated around a circular table if two specific people, Alice and Bob, must not sit next to each other?",
    answer: "3600",
    solution:
      "Total circular arrangements of 8 people: 7! = 5040. Arrangements where Alice and Bob are adjacent: treat them as one unit, giving 6! circular arrangements times 2 for internal order = 720 \\cdot 2 = 1440. Subtracting: 5040 - 1440 = 3600.",
  },
  {
    id: "ind-5",
    round: "Individual",
    topic: "Algebra",
    difficulty: "AIME introductory",
    statement:
      "Let f(x) = x^2 - 4x + 3. Find the sum of all real values of x such that f(f(x)) = 3.",
    answer: "8",
    solution:
      "f(f(x)) = 3 means f(x) must satisfy f(t) = 3. Solving t^2 - 4t + 3 = 3 gives t^2 - 4t = 0, so t(t - 4) = 0, meaning t = 0 or t = 4. Case 1: f(x) = 0 gives x^2 - 4x + 3 = 0, so (x - 1)(x - 3) = 0, meaning x = 1 or x = 3. Case 2: f(x) = 4 gives x^2 - 4x + 3 = 4, so x^2 - 4x - 1 = 0. By Vieta's formulas, the sum of roots is 4. Total sum: 1 + 3 + 4 = 8.",
  },
  {
    id: "ind-6",
    round: "Individual",
    topic: "Number Theory",
    difficulty: "AIME mid",
    statement:
      "Find the remainder when 2^{100} is divided by 101.",
    answer: "1",
    solution:
      "By Fermat's Little Theorem, since 101 is prime and \\gcd(2, 101) = 1, we have 2^{100} \\equiv 1 \\pmod{101}. The remainder is 1.",
  },
  {
    id: "spr-1",
    round: "Sprint",
    topic: "Algebra",
    difficulty: "Sprint easy",
    statement:
      "What is the value of 1/2 + 1/4 + 1/8 + 1/16?",
    answer: "15/16",
    solution:
      "This is a geometric series with first term 1/2, ratio 1/2, and 4 terms. Sum = (1/2)(1 - (1/2)^4)/(1 - 1/2) = (1/2)(15/16)/(1/2) = 15/16. Alternatively: 8/16 + 4/16 + 2/16 + 1/16 = 15/16.",
  },
  {
    id: "spr-2",
    round: "Sprint",
    topic: "Number Theory",
    difficulty: "Sprint easy",
    statement:
      "What is the greatest common divisor of 84 and 126?",
    answer: "42",
    solution:
      "126 = 84 \\cdot 1 + 42. Then 84 = 42 \\cdot 2 + 0. By the Euclidean algorithm, \\gcd(84, 126) = 42.",
  },
  {
    id: "spr-3",
    round: "Sprint",
    topic: "Geometry",
    difficulty: "Sprint medium",
    statement:
      "A square has a diagonal of length 10. What is its area?",
    answer: "50",
    solution:
      "If the side length is s, then the diagonal is s\\sqrt{2} = 10, so s = 10/\\sqrt{2}. The area is s^2 = 100/2 = 50.",
  },
  {
    id: "spr-4",
    round: "Sprint",
    topic: "Combinatorics",
    difficulty: "Sprint medium",
    statement:
      "How many three-letter strings can be formed from the letters A, B, C if repetition is allowed?",
    answer: "27",
    solution:
      "There are 3 choices for each of 3 positions: 3 \\times 3 \\times 3 = 27.",
  },
  {
    id: "spr-5",
    round: "Sprint",
    topic: "Algebra",
    difficulty: "Sprint hard",
    statement:
      "If the roots of x^2 - 7x + k = 0 are both positive integers, how many possible values of k are there?",
    answer: "3",
    solution:
      "If roots are a and b with a + b = 7 and a \\cdot b = k, and both are positive integers, the unordered pairs (a, b) are: (1, 6), (2, 5), (3, 4). This gives k = 6, 10, or 12. There are 3 possible values.",
  },
  {
    id: "spr-6",
    round: "Sprint",
    topic: "Geometry",
    difficulty: "Sprint hard",
    statement:
      "What is the area of the region enclosed by the graph of |x| + |y| = 4?",
    answer: "32",
    solution:
      "The equation |x| + |y| = 4 describes a square rotated 45\\degree with vertices at (4, 0), (0, 4), (-4, 0), and (0, -4). The diagonals of this square have length 8 each. Area = (d_1 \\cdot d_2)/2 = (8 \\cdot 8)/2 = 32.",
  },
  {
    id: "team-1",
    round: "Team",
    topic: "Algebra",
    difficulty: "Team mid",
    statement:
      "A sequence is defined by a_1 = 1, a_2 = 3, and a_n = 2a_{n-1} - a_{n-2} + 2 for n \\geq 3. Find a_{10}.",
    answer: "91",
    solution:
      "Computing the recurrence: a_1 = 1, a_2 = 3, a_3 = 2(3) - 1 + 2 = 7, a_4 = 2(7) - 3 + 2 = 13, a_5 = 2(13) - 7 + 2 = 21, a_6 = 2(21) - 13 + 2 = 31, a_7 = 2(31) - 21 + 2 = 43, a_8 = 2(43) - 31 + 2 = 57, a_9 = 2(57) - 43 + 2 = 73, a_{10} = 2(73) - 57 + 2 = 91. The differences between consecutive terms are 2, 4, 6, 8, 10, 12, 14, 16, 18 with constant second difference 2, giving the closed form a_n = n^2 - n + 1. Thus a_{10} = 100 - 10 + 1 = 91.",
  },
  {
    id: "team-2",
    round: "Team",
    topic: "Geometry",
    difficulty: "Team hard",
    statement:
      "A circle is inscribed in a right triangle with legs 5 and 12. What is the distance from the center of the inscribed circle to the vertex of the right angle?",
    answer: "2\\sqrt{2}",
    solution:
      "The hypotenuse is \\sqrt{25 + 144} = 13. The inradius is r = (a + b - c)/2 = (5 + 12 - 13)/2 = 2. Place the right angle at the origin with legs along the axes. The incircle center is at (r, r) = (2, 2). The distance from the origin to (2, 2) is \\sqrt{4 + 4} = 2\\sqrt{2}.",
  },
  {
    id: "team-3",
    round: "Team",
    topic: "Combinatorics",
    difficulty: "Team hard",
    statement:
      "How many ways can you place 3 non-attacking rooks on a 4 \\times 4 chessboard?",
    answer: "96",
    solution:
      "Non-attacking means no two rooks share a row or column. Choose 3 of 4 rows: \\binom{4}{3} = 4. Choose 3 of 4 columns: \\binom{4}{3} = 4. Assign each selected row a distinct selected column: 3! = 6. Total: 4 \\times 4 \\times 6 = 96.",
  },
  {
    id: "team-4",
    round: "Team",
    topic: "Number Theory",
    difficulty: "Team hard",
    statement: "Find the last two digits of 7^{2025}.",
    answer: "07",
    solution:
      "We need 7^{2025} \\mod 100. Computing powers of 7 modulo 100: 7^1 = 7, 7^2 = 49, 7^3 = 343 \\equiv 43 \\pmod{100}, 7^4 = 7 \\cdot 43 = 301 \\equiv 1 \\pmod{100}. Since 7^4 \\equiv 1 \\pmod{100} and 2025 = 4 \\cdot 506 + 1, we have 7^{2025} \\equiv 7^1 = 7 \\pmod{100}. The last two digits are 07.",
  },
  {
    id: "buz-1",
    round: "Buzzer",
    topic: "Mixed",
    difficulty: "Buzzer quick",
    statement: "What is 17 \\times 23?",
    answer: "391",
    solution:
      "17 \\times 23 = 17 \\times 20 + 17 \\times 3 = 340 + 51 = 391.",
  },
  {
    id: "buz-2",
    round: "Buzzer",
    topic: "Mixed",
    difficulty: "Buzzer recall",
    statement: "What is the only prime number that is even?",
    answer: "2",
    solution:
      "By definition, 2 is divisible only by 1 and itself. Every other even number is divisible by 2 and therefore not prime.",
  },
  {
    id: "buz-3",
    round: "Buzzer",
    topic: "Mixed",
    difficulty: "Buzzer observation",
    statement:
      "How many perfect squares are there between 100 and 400, inclusive?",
    answer: "11",
    solution:
      "10^2 = 100 and 20^2 = 400. The perfect squares are 10^2, 11^2, 12^2, \\ldots, 20^2. That is 20 - 10 + 1 = 11 perfect squares.",
  },
  {
    id: "buz-4",
    round: "Buzzer",
    topic: "Mixed",
    difficulty: "Buzzer medium",
    statement:
      "A fair six-sided die is rolled twice. What is the probability that the sum is 7?",
    answer: "1/6",
    solution:
      "There are 36 equally likely outcomes. The pairs summing to 7 are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) \u2014 that is 6 outcomes. The probability is 6/36 = 1/6.",
  },
];
