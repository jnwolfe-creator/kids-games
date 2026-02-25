import { useState, useEffect } from "react";

const STORAGE_KEY = "kids-game-stats-v2";

// ── QUESTION BANK ────────────────────────────────────────────────────────────

const QUESTIONS = {
  geography: {
    2: [
      { q: "What is the capital of France?", a: "Paris", choices: ["London", "Paris", "Berlin", "Rome"], fact: "Paris is called the City of Light!" },
      { q: "Which ocean is the biggest?", a: "Pacific", choices: ["Atlantic", "Pacific", "Indian", "Arctic"], fact: "The Pacific Ocean is bigger than all land on Earth combined!" },
      { q: "What country is the Eiffel Tower in?", a: "France", choices: ["Italy", "France", "Spain", "Germany"], fact: "The Eiffel Tower was built in 1889!" },
      { q: "What is the largest country in the world?", a: "Russia", choices: ["USA", "China", "Russia", "Canada"], fact: "Russia spans 11 time zones!" },
      { q: "Which continent is Egypt in?", a: "Africa", choices: ["Asia", "Europe", "Africa", "Australia"], fact: "Egypt is also partly in Asia via the Sinai Peninsula!" },
      { q: "What is the capital of Japan?", a: "Tokyo", choices: ["Osaka", "Tokyo", "Kyoto", "Seoul"], fact: "Tokyo is the most populous city in the world!" },
      { q: "Which is the longest river in the world?", a: "Nile", choices: ["Amazon", "Nile", "Mississippi", "Congo"], fact: "The Nile flows through 11 countries!" },
      { q: "What country is known for kangaroos?", a: "Australia", choices: ["Brazil", "India", "Australia", "South Africa"], fact: "There are more kangaroos than people in Australia!" },
      { q: "What is the capital of the USA?", a: "Washington D.C.", choices: ["New York", "Los Angeles", "Washington D.C.", "Chicago"], fact: "Washington D.C. was named after President George Washington!" },
      { q: "Which country has a red maple leaf on its flag?", a: "Canada", choices: ["USA", "Canada", "UK", "Australia"], fact: "Canada has more lakes than any other country!" },
      { q: "What is the tallest mountain in the world?", a: "Mount Everest", choices: ["K2", "Mount Everest", "Kilimanjaro", "Mont Blanc"], fact: "Mount Everest grows about 4mm taller every year!" },
      { q: "Which continent is Brazil in?", a: "South America", choices: ["North America", "Africa", "South America", "Europe"], fact: "Brazil is the largest country in South America!" },
      { q: "What is the capital of Italy?", a: "Rome", choices: ["Milan", "Venice", "Rome", "Naples"], fact: "Rome is called the Eternal City!" },
      { q: "What is the smallest continent?", a: "Australia", choices: ["Europe", "Antarctica", "Australia", "South America"], fact: "Australia is both a continent and a country!" },
      { q: "Which country does the Amazon rainforest mostly cover?", a: "Brazil", choices: ["Peru", "Colombia", "Brazil", "Venezuela"], fact: "The Amazon produces 20% of the world's oxygen!" },
      { q: "What is the capital of China?", a: "Beijing", choices: ["Shanghai", "Beijing", "Hong Kong", "Guangzhou"], fact: "Beijing has been China's capital for over 700 years!" },
      { q: "Which is the hottest continent?", a: "Africa", choices: ["Asia", "Australia", "Africa", "South America"], fact: "The highest recorded temperature was in Africa — 58°C in Libya!" },
      { q: "What country is the Great Wall in?", a: "China", choices: ["Japan", "China", "Korea", "India"], fact: "The Great Wall is over 13,000 miles long!" },
      { q: "What is the capital of Mexico?", a: "Mexico City", choices: ["Guadalajara", "Cancún", "Mexico City", "Monterrey"], fact: "Mexico City is one of the largest cities in the world!" },
      { q: "Which country is shaped like a boot?", a: "Italy", choices: ["Spain", "Italy", "Greece", "Portugal"], fact: "Italy also includes the islands of Sicily and Sardinia!" },
    ],
    6: [
      { q: "What is the capital of Australia?", a: "Canberra", choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"], fact: "Many people think Sydney is the capital, but it's Canberra!" },
      { q: "Which country has the most natural lakes?", a: "Canada", choices: ["Russia", "USA", "Finland", "Canada"], fact: "Canada has about 60% of the world's natural lakes!" },
      { q: "What is the capital of Brazil?", a: "Brasília", choices: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], fact: "Brasília was purpose-built as the capital in 1960!" },
      { q: "Which mountain range separates Europe from Asia?", a: "Ural Mountains", choices: ["Alps", "Himalayas", "Ural Mountains", "Caucasus"], fact: "The Ural Mountains stretch 1,500 miles through Russia!" },
      { q: "What is the capital of South Africa?", a: "Pretoria", choices: ["Cape Town", "Johannesburg", "Pretoria", "Durban"], fact: "South Africa has three capitals!" },
      { q: "Which country has the most people?", a: "India", choices: ["China", "India", "USA", "Indonesia"], fact: "India surpassed China as the most populous country in 2023!" },
      { q: "What is the longest mountain range in the world?", a: "Andes", choices: ["Himalayas", "Rockies", "Andes", "Alps"], fact: "The Andes stretch 4,300 miles along South America's west coast!" },
      { q: "Which African country has the most pyramids?", a: "Sudan", choices: ["Egypt", "Sudan", "Libya", "Ethiopia"], fact: "Sudan has over 200 ancient pyramids — more than Egypt!" },
      { q: "What is the capital of Canada?", a: "Ottawa", choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"], fact: "Ottawa was chosen as capital to settle a rivalry between Toronto and Montreal!" },
      { q: "Which sea is the saltiest in the world?", a: "Dead Sea", choices: ["Red Sea", "Dead Sea", "Caspian Sea", "Black Sea"], fact: "The Dead Sea is so salty you float without trying!" },
      { q: "What is the capital of Argentina?", a: "Buenos Aires", choices: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"], fact: "Buenos Aires means 'fair winds' in Spanish!" },
      { q: "Which country is home to the ancient city of Petra?", a: "Jordan", choices: ["Egypt", "Jordan", "Israel", "Saudi Arabia"], fact: "Petra was carved into rose-red cliffs over 2,000 years ago!" },
      { q: "What is the capital of Turkey?", a: "Ankara", choices: ["Istanbul", "Ankara", "Izmir", "Bursa"], fact: "Most people think Istanbul is the capital, but it's Ankara!" },
      { q: "Which country does Greenland belong to?", a: "Denmark", choices: ["Norway", "Iceland", "Canada", "Denmark"], fact: "Greenland is the world's largest island!" },
      { q: "What is the capital of India?", a: "New Delhi", choices: ["Mumbai", "Kolkata", "New Delhi", "Bangalore"], fact: "New Delhi was purpose-built as India's capital!" },
      { q: "Which country is the world's largest producer of coffee?", a: "Brazil", choices: ["Colombia", "Ethiopia", "Vietnam", "Brazil"], fact: "Brazil has been the top coffee producer for 150+ years!" },
      { q: "What is the capital of New Zealand?", a: "Wellington", choices: ["Auckland", "Christchurch", "Wellington", "Queenstown"], fact: "Wellington is the world's southernmost capital city!" },
      { q: "Which country does the Galapagos Islands belong to?", a: "Ecuador", choices: ["Peru", "Chile", "Colombia", "Ecuador"], fact: "Darwin's visit inspired his theory of evolution!" },
      { q: "What is the capital of Nigeria?", a: "Abuja", choices: ["Lagos", "Kano", "Abuja", "Ibadan"], fact: "Abuja replaced Lagos as Nigeria's capital in 1991!" },
      { q: "Which river flows through London?", a: "Thames", choices: ["Seine", "Rhine", "Severn", "Thames"], fact: "The Thames has over 200 bridges!" },
    ],
    8: [
      { q: "What is the capital of Kazakhstan?", a: "Astana", choices: ["Almaty", "Astana", "Shymkent", "Karaganda"], fact: "Astana was renamed from Nur-Sultan back to Astana in 2022!" },
      { q: "Which country has the most UNESCO World Heritage Sites?", a: "Italy", choices: ["China", "Spain", "France", "Italy"], fact: "Italy edges out China for the most UNESCO sites!" },
      { q: "What is the Tropic of Capricorn?", a: "A line of latitude at 23.5°S", choices: ["A line of longitude at 23.5°W", "A line of latitude at 23.5°S", "The equator", "A line at 66.5°S"], fact: "The Tropic of Capricorn marks the sun's southernmost point!" },
      { q: "Which strait separates Europe from Africa?", a: "Strait of Gibraltar", choices: ["Strait of Hormuz", "Bering Strait", "Strait of Gibraltar", "Strait of Malacca"], fact: "The Strait of Gibraltar is only 9 miles wide at its narrowest!" },
      { q: "What is the capital of Ukraine?", a: "Kyiv", choices: ["Lviv", "Odesa", "Kharkiv", "Kyiv"], fact: "Kyiv is one of the oldest cities in Eastern Europe!" },
      { q: "Which country has the longest coastline?", a: "Canada", choices: ["Russia", "Indonesia", "Norway", "Canada"], fact: "Canada's coastline would circle the Earth over 6 times!" },
      { q: "What is the Sahel?", a: "A semi-arid region south of the Sahara", choices: ["A river in West Africa", "A semi-arid region south of the Sahara", "A mountain range in North Africa", "A coastal zone in East Africa"], fact: "The Sahel means 'shore' or 'coast' in Arabic!" },
      { q: "Which country is the Strait of Hormuz most critical to?", a: "Iran", choices: ["Saudi Arabia", "Iran", "UAE", "Oman"], fact: "About 20% of the world's oil passes through the Strait of Hormuz!" },
      { q: "What is the driest non-polar desert?", a: "Atacama Desert", choices: ["Sahara", "Gobi", "Atacama Desert", "Arabian Desert"], fact: "Some parts of the Atacama have never recorded rainfall!" },
      { q: "Which ocean current keeps Western Europe warm?", a: "Gulf Stream", choices: ["Humboldt Current", "Gulf Stream", "Kuroshio Current", "Canary Current"], fact: "Without the Gulf Stream, London would be as cold as Moscow!" },
      { q: "What is the capital of Myanmar?", a: "Naypyidaw", choices: ["Yangon", "Naypyidaw", "Mandalay", "Bago"], fact: "Myanmar moved its capital from Yangon to Naypyidaw in 2006!" },
      { q: "Which country has the largest freshwater lake by volume?", a: "Russia", choices: ["USA", "Canada", "Russia", "Tanzania"], fact: "Lake Baikal in Russia holds 20% of the world's fresh surface water!" },
      { q: "What is the Ring of Fire?", a: "A zone of volcanoes around the Pacific Ocean", choices: ["A desert in Australia", "A zone of volcanoes around the Pacific Ocean", "A mountain range in South America", "A current in the Indian Ocean"], fact: "About 75% of the world's volcanoes are in the Ring of Fire!" },
      { q: "Which country is the Mekong River's source in?", a: "China", choices: ["Myanmar", "Laos", "China", "Vietnam"], fact: "The Mekong flows through 6 countries before reaching the South China Sea!" },
      { q: "What is a fjord?", a: "A narrow sea inlet between cliffs", choices: ["A type of glacier", "A narrow sea inlet between cliffs", "A volcanic island", "A river delta"], fact: "Norway has over 1,000 fjords!" },
      { q: "Which country has the most active volcanoes?", a: "Indonesia", choices: ["Japan", "USA", "Chile", "Indonesia"], fact: "Indonesia has over 130 active volcanoes!" },
      { q: "What is the capital of Saudi Arabia?", a: "Riyadh", choices: ["Mecca", "Jeddah", "Riyadh", "Medina"], fact: "Riyadh means 'gardens' in Arabic, despite being in the desert!" },
      { q: "Which two continents does the Panama Canal connect?", a: "North and South America", choices: ["North America and Europe", "North and South America", "South America and Africa", "Central and North America"], fact: "The Panama Canal saves ships 8,000 miles of travel!" },
      { q: "What is the capital of the Philippines?", a: "Manila", choices: ["Cebu", "Davao", "Quezon City", "Manila"], fact: "The Philippines is an archipelago of over 7,600 islands!" },
      { q: "Which country is Mount Kilimanjaro in?", a: "Tanzania", choices: ["Kenya", "Uganda", "Ethiopia", "Tanzania"], fact: "Kilimanjaro is the highest free-standing mountain in the world!" },
    ],
  },

  math: {
    2: [
      { q: "What is 8 + 7?", a: "15", choices: ["13", "14", "15", "16"], fact: "Addition is one of the four basic math operations!" },
      { q: "What is 12 - 5?", a: "7", choices: ["5", "6", "7", "8"], fact: "Subtraction is the opposite of addition!" },
      { q: "What is 3 × 4?", a: "12", choices: ["10", "11", "12", "13"], fact: "Multiplication is repeated addition — 3+3+3+3 = 12!" },
      { q: "What is half of 20?", a: "10", choices: ["5", "8", "10", "12"], fact: "Half means dividing into two equal parts!" },
      { q: "What is 15 + 13?", a: "28", choices: ["26", "27", "28", "29"], fact: "You can add the tens first: 10+10=20, then 5+3=8!" },
      { q: "How many sides does a triangle have?", a: "3", choices: ["2", "3", "4", "5"], fact: "The word triangle comes from Latin meaning three angles!" },
      { q: "What is 24 ÷ 4?", a: "6", choices: ["4", "5", "6", "8"], fact: "Division splits numbers into equal groups!" },
      { q: "What is 9 × 3?", a: "27", choices: ["24", "25", "27", "28"], fact: "A trick: the digits of 9's multiples always add up to 9! (2+7=9)" },
      { q: "What comes after 99?", a: "100", choices: ["90", "100", "101", "109"], fact: "100 is called a century when counting years!" },
      { q: "What is 50 + 50?", a: "100", choices: ["90", "95", "100", "110"], fact: "100 cents make one dollar!" },
      { q: "How many minutes are in an hour?", a: "60", choices: ["30", "45", "60", "100"], fact: "The ancient Babylonians invented the 60-minute hour!" },
      { q: "What is 7 × 7?", a: "49", choices: ["42", "45", "49", "56"], fact: "7×7 is called seven squared!" },
      { q: "What is 100 - 37?", a: "63", choices: ["53", "63", "67", "73"], fact: "You can count up from 37 to 100 to check your answer!" },
      { q: "How many sides does a square have?", a: "4", choices: ["3", "4", "5", "6"], fact: "A square is a special rectangle where all sides are equal!" },
      { q: "What is 6 × 8?", a: "48", choices: ["42", "46", "48", "54"], fact: "6×8 is the same as 8×6 — order doesn't matter in multiplication!" },
      { q: "What is 1/2 + 1/2?", a: "1", choices: ["1/4", "1/2", "1", "2"], fact: "Two halves always make a whole!" },
      { q: "What is 5²?", a: "25", choices: ["10", "15", "25", "30"], fact: "Squaring means multiplying a number by itself!" },
      { q: "What is the value of a quarter in cents?", a: "25", choices: ["10", "20", "25", "50"], fact: "Four quarters make one dollar!" },
      { q: "What is 11 × 11?", a: "121", choices: ["111", "121", "131", "132"], fact: "All numbers from 11×11 to 99×99 follow a cool pattern!" },
      { q: "How many days are in a leap year?", a: "366", choices: ["364", "365", "366", "367"], fact: "Leap years happen every 4 years to keep our calendar aligned!" },
    ],
    6: [
      { q: "What is 15% of 200?", a: "30", choices: ["20", "25", "30", "35"], fact: "Percent means 'per hundred' — 15% = 15/100!" },
      { q: "What is the area of a rectangle 8cm × 5cm?", a: "40cm²", choices: ["26cm²", "30cm²", "40cm²", "45cm²"], fact: "Area = length × width!" },
      { q: "Solve: 3x = 21. What is x?", a: "7", choices: ["6", "7", "8", "9"], fact: "To solve, divide both sides by 3!" },
      { q: "What is the perimeter of a square with sides of 6cm?", a: "24cm", choices: ["12cm", "18cm", "24cm", "36cm"], fact: "Perimeter = 4 × side length for a square!" },
      { q: "What is 2³?", a: "8", choices: ["6", "8", "9", "12"], fact: "2³ means 2×2×2 = 8!" },
      { q: "What is the LCM of 4 and 6?", a: "12", choices: ["8", "10", "12", "24"], fact: "LCM stands for Least Common Multiple!" },
      { q: "What is 3/4 as a decimal?", a: "0.75", choices: ["0.25", "0.50", "0.70", "0.75"], fact: "Divide 3 by 4 to convert a fraction to decimal!" },
      { q: "What is the mean of 4, 8, 12, 16?", a: "10", choices: ["8", "9", "10", "12"], fact: "Mean = sum of all numbers ÷ how many numbers there are!" },
      { q: "What is 20% of 150?", a: "30", choices: ["20", "25", "30", "35"], fact: "20% is the same as dividing by 5!" },
      { q: "A triangle has angles of 60° and 70°. What is the third?", a: "50°", choices: ["40°", "50°", "60°", "70°"], fact: "All angles in a triangle always add up to 180°!" },
      { q: "What is √144?", a: "12", choices: ["11", "12", "13", "14"], fact: "12×12 = 144, so the square root of 144 is 12!" },
      { q: "What is 4/5 + 1/5?", a: "1", choices: ["5/10", "5/5", "1", "6/5"], fact: "When fractions have the same denominator, just add the numerators!" },
      { q: "What is 7 × 8 × 0?", a: "0", choices: ["0", "15", "56", "560"], fact: "Any number multiplied by zero equals zero!" },
      { q: "What is the GCF of 12 and 18?", a: "6", choices: ["2", "3", "6", "9"], fact: "GCF means the Greatest Common Factor!" },
      { q: "If a shirt costs $24 and is 25% off, what do you pay?", a: "$18", choices: ["$6", "$16", "$18", "$20"], fact: "25% off means you pay 75% of the price!" },
      { q: "What is 5/8 as a percentage?", a: "62.5%", choices: ["55%", "58%", "62.5%", "65%"], fact: "Divide 5 by 8, then multiply by 100!" },
      { q: "What is the volume of a cube with sides of 3cm?", a: "27cm³", choices: ["9cm³", "18cm³", "27cm³", "36cm³"], fact: "Volume of a cube = side³!" },
      { q: "Solve: 2x + 5 = 13. What is x?", a: "4", choices: ["3", "4", "5", "6"], fact: "Subtract 5 from both sides first, then divide by 2!" },
      { q: "What is the ratio 15:25 in simplest form?", a: "3:5", choices: ["1:2", "3:5", "5:8", "6:10"], fact: "Divide both numbers by their GCF (5) to simplify!" },
      { q: "A car travels 60 mph for 2.5 hours. How far does it go?", a: "150 miles", choices: ["120 miles", "130 miles", "150 miles", "160 miles"], fact: "Distance = speed × time!" },
    ],
    8: [
      { q: "What is the slope of a line through (0,0) and (3,6)?", a: "2", choices: ["1", "2", "3", "6"], fact: "Slope = rise ÷ run = (6-0)/(3-0) = 2!" },
      { q: "What is √(-1) called?", a: "i (imaginary unit)", choices: ["0", "undefined", "i (imaginary unit)", "-1"], fact: "Imaginary numbers are used in electrical engineering and physics!" },
      { q: "Solve: x² - 9 = 0. What are the values of x?", a: "3 and -3", choices: ["3 only", "-3 only", "3 and -3", "9 and -9"], fact: "This is a difference of squares: (x+3)(x-3) = 0!" },
      { q: "What is the Pythagorean theorem?", a: "a² + b² = c²", choices: ["a + b = c", "a² + b² = c²", "a² × b² = c²", "a² - b² = c²"], fact: "This theorem was known to ancient Babylonians 1,000 years before Pythagoras!" },
      { q: "What is the circumference of a circle with radius 5? (use π≈3.14)", a: "31.4", choices: ["15.7", "25", "31.4", "78.5"], fact: "Circumference = 2πr!" },
      { q: "What is 2⁻³?", a: "1/8", choices: ["1/6", "1/8", "-8", "-6"], fact: "Negative exponents mean 1 divided by the positive power!" },
      { q: "What is the quadratic formula?", a: "x = (-b ± √(b²-4ac)) / 2a", choices: ["x = -b/2a", "x = (-b ± √(b²-4ac)) / 2a", "x = (b ± √(b²+4ac)) / 2a", "x = b²-4ac"], fact: "The quadratic formula works for any ax²+bx+c=0!" },
      { q: "What is sin(90°)?", a: "1", choices: ["0", "0.5", "1", "√2/2"], fact: "On the unit circle, sin(90°) = 1 because the y-coordinate is 1!" },
      { q: "Expand (x+3)²", a: "x²+6x+9", choices: ["x²+9", "x²+3x+9", "x²+6x+9", "x²+6x+6"], fact: "(a+b)² = a²+2ab+b² — a formula worth memorizing!" },
      { q: "What is the area of a circle with radius 4? (use π≈3.14)", a: "50.24", choices: ["25.12", "50.24", "100.48", "12.56"], fact: "Area = πr²!" },
      { q: "What is the sum of interior angles of a hexagon?", a: "720°", choices: ["540°", "630°", "720°", "810°"], fact: "Formula: (n-2) × 180°, where n = number of sides!" },
      { q: "What is log₁₀(1000)?", a: "3", choices: ["2", "3", "10", "100"], fact: "log₁₀(1000) asks: 10 to what power equals 1000? Answer: 3!" },
      { q: "A line has equation y = 2x + 5. What is its y-intercept?", a: "5", choices: ["2", "5", "7", "10"], fact: "In y=mx+b, b is always the y-intercept!" },
      { q: "What is the probability of flipping heads twice in a row?", a: "1/4", choices: ["1/2", "1/3", "1/4", "1/8"], fact: "Multiply the probabilities: 1/2 × 1/2 = 1/4!" },
      { q: "What is the volume of a cylinder, radius 3, height 5? (π≈3.14)", a: "141.3", choices: ["94.2", "141.3", "188.4", "45"], fact: "Volume = πr²h!" },
      { q: "Simplify: (x³ × x⁴)", a: "x⁷", choices: ["x⁷", "x¹²", "x⁸", "2x⁷"], fact: "When multiplying same bases, add the exponents!" },
      { q: "What is the median of: 3, 7, 9, 2, 5?", a: "5", choices: ["3", "5", "7", "9"], fact: "Sort the numbers first: 2,3,5,7,9 — the middle value is 5!" },
      { q: "What is 5! (5 factorial)?", a: "120", choices: ["25", "60", "100", "120"], fact: "5! = 5×4×3×2×1 = 120!" },
      { q: "What is the distance between (1,2) and (4,6)?", a: "5", choices: ["3", "4", "5", "7"], fact: "Distance = √((4-1)²+(6-2)²) = √(9+16) = √25 = 5!" },
      { q: "Solve: |x - 3| = 7. What are the solutions?", a: "x = 10 or x = -4", choices: ["x = 10", "x = -4", "x = 10 or x = -4", "x = 4 or x = -10"], fact: "Absolute value equations have two solutions!" },
    ],
  },

  english: {
    2: [
      { q: "What is a noun?", a: "A person, place, or thing", choices: ["An action word", "A describing word", "A person, place, or thing", "A connecting word"], fact: "Your name is a noun — it's a proper noun!" },
      { q: "Which word is spelled correctly?", a: "because", choices: ["becaus", "becuase", "because", "becawse"], fact: "A trick: Big Elephants Can Always Understand Small Elephants!" },
      { q: "What punctuation ends a question?", a: "?", choices: [".", "!", "?", ","], fact: "The question mark was invented by medieval monks!" },
      { q: "What is the plural of 'mouse'?", a: "mice", choices: ["mouses", "mouse", "mices", "mice"], fact: "Irregular plurals don't follow the normal -s rule!" },
      { q: "Which is a verb?", a: "run", choices: ["happy", "run", "blue", "dog"], fact: "Verbs are action words — they show what something does!" },
      { q: "What is a synonym for 'happy'?", a: "joyful", choices: ["sad", "angry", "joyful", "tired"], fact: "English has more synonyms than almost any other language!" },
      { q: "What is the opposite of 'hot'?", a: "cold", choices: ["warm", "cool", "cold", "chilly"], fact: "Opposites are called antonyms!" },
      { q: "Which sentence uses correct punctuation?", a: "She ran fast.", choices: ["she ran fast.", "She ran fast", "She ran fast.", "she Ran fast."], fact: "Every sentence starts with a capital letter!" },
      { q: "What is an adjective?", a: "A word that describes a noun", choices: ["An action word", "A word that describes a noun", "A connecting word", "A naming word"], fact: "Colors, sizes, and feelings are all adjectives!" },
      { q: "What is the past tense of 'run'?", a: "ran", choices: ["runned", "run", "runs", "ran"], fact: "Irregular verbs change their form in the past tense!" },
      { q: "Which word is an antonym for 'big'?", a: "tiny", choices: ["large", "huge", "giant", "tiny"], fact: "Antonym comes from the Greek word meaning opposite!" },
      { q: "How many syllables are in 'elephant'?", a: "3", choices: ["2", "3", "4", "5"], fact: "El-e-phant — clap once for each syllable!" },
      { q: "What is the plural of 'child'?", a: "children", choices: ["childs", "childes", "children", "child"], fact: "Children is one of the oldest English words!" },
      { q: "Which word is a conjunction?", a: "and", choices: ["run", "and", "happy", "cat"], fact: "Conjunctions join words or sentences together!" },
      { q: "What does a comma do?", a: "Creates a pause in a sentence", choices: ["Ends a sentence", "Shows excitement", "Creates a pause in a sentence", "Shows ownership"], fact: "The comma was invented by Aldus Manutius in the 1490s!" },
      { q: "What is the subject of: 'The dog barked loudly'?", a: "The dog", choices: ["barked", "loudly", "The dog", "dog barked"], fact: "The subject is who or what the sentence is about!" },
      { q: "Which word rhymes with 'cat'?", a: "hat", choices: ["dog", "cup", "hat", "bin"], fact: "Words that rhyme have the same ending sound!" },
      { q: "What does 'enormous' mean?", a: "Very large", choices: ["Very small", "Very fast", "Very loud", "Very large"], fact: "Enormous comes from the Latin word meaning out of the norm!" },
      { q: "What is a simile?", a: "Comparing two things using 'like' or 'as'", choices: ["A type of poem", "An exaggeration", "Comparing two things using 'like' or 'as'", "A made-up word"], fact: "Example: She runs like the wind!" },
      { q: "What is the contraction of 'do not'?", a: "don't", choices: ["dont", "do'nt", "don't", "d'ont"], fact: "The apostrophe takes the place of the missing letter!" },
    ],
    6: [
      { q: "What is a metaphor?", a: "Saying one thing IS another to make a comparison", choices: ["A type of rhyme", "An exaggeration", "Saying one thing IS another to make a comparison", "A comparing word"], fact: "Example: Life is a rollercoaster!" },
      { q: "What is the theme of a story?", a: "The central message or lesson", choices: ["The main character", "Where the story is set", "The central message or lesson", "The beginning of the story"], fact: "Themes are universal ideas like friendship, courage, or justice!" },
      { q: "What is an adverb?", a: "A word that modifies a verb, adjective, or other adverb", choices: ["A naming word", "A word that modifies a verb, adjective, or other adverb", "A connecting word", "A describing word for nouns"], fact: "Many adverbs end in -ly, like quickly or loudly!" },
      { q: "What does 'protagonist' mean?", a: "The main character in a story", choices: ["The villain", "The narrator", "The main character in a story", "The setting"], fact: "Protagonist comes from Greek meaning 'first actor'!" },
      { q: "What is alliteration?", a: "Repeated consonant sounds at the start of words", choices: ["Words that rhyme", "A type of metaphor", "Repeated consonant sounds at the start of words", "An exaggeration"], fact: "Peter Piper picked a peck of pickled peppers!" },
      { q: "What is the difference between 'their', 'there', and 'they're'?", a: "'Their' = possessive, 'there' = place, 'they're' = they are", choices: ["They all mean the same thing", "'Their' = place, 'there' = possessive", "'Their' = possessive, 'there' = place, 'they're' = they are", "Only 'there' is a real word"], fact: "These are called homophones — words that sound the same but have different meanings!" },
      { q: "What is the point of view of a story told using 'I'?", a: "First person", choices: ["Second person", "Third person", "First person", "Omniscient"], fact: "First person narration puts the reader inside the character's head!" },
      { q: "What is foreshadowing?", a: "Hints about what will happen later in the story", choices: ["A type of setting description", "A flashback scene", "Hints about what will happen later in the story", "The story's climax"], fact: "Authors use foreshadowing to build suspense!" },
      { q: "What is hyperbole?", a: "An extreme exaggeration for effect", choices: ["A type of rhyme", "A comparison using like or as", "An extreme exaggeration for effect", "A word that sounds like its meaning"], fact: "Example: I've told you a million times!" },
      { q: "What is the climax of a story?", a: "The turning point or most exciting moment", choices: ["The beginning", "The resolution", "The turning point or most exciting moment", "The setting"], fact: "The climax is where all the story's tension comes to a head!" },
      { q: "What does 'inference' mean in reading?", a: "Using clues to figure out what isn't directly stated", choices: ["Reading very carefully", "Summarizing the text", "Using clues to figure out what isn't directly stated", "Finding the main idea"], fact: "Good readers make inferences all the time without realizing it!" },
      { q: "What is a compound sentence?", a: "Two independent clauses joined by a conjunction", choices: ["A sentence with one clause", "Two independent clauses joined by a conjunction", "A sentence with a dependent clause", "A sentence with no verbs"], fact: "Example: I like cats, and my sister likes dogs!" },
      { q: "What does 'context clues' mean?", a: "Using surrounding words to figure out an unknown word's meaning", choices: ["Reading the dictionary", "Asking a teacher", "Using surrounding words to figure out an unknown word's meaning", "Looking at pictures"], fact: "Context clues are one of the most powerful reading skills!" },
      { q: "What is onomatopoeia?", a: "A word that sounds like what it describes", choices: ["A type of metaphor", "A word that sounds like what it describes", "A repeated sound at word beginnings", "An extreme exaggeration"], fact: "Buzz, crash, sizzle — all onomatopoeia!" },
      { q: "What is a dependent clause?", a: "A clause that cannot stand alone as a sentence", choices: ["A complete sentence", "A clause that cannot stand alone as a sentence", "A sentence with two verbs", "The main idea of a paragraph"], fact: "'Because I was tired' is a dependent clause — it needs more!" },
      { q: "What is the difference between 'affect' and 'effect'?", a: "'Affect' is usually a verb; 'effect' is usually a noun", choices: ["They mean the same thing", "'Affect' is a noun; 'effect' is a verb", "'Affect' is usually a verb; 'effect' is usually a noun", "Both are adjectives"], fact: "Trick: RAVEN — Remember Affect Verb Effect Noun!" },
      { q: "What is an author's purpose?", a: "To persuade, inform, or entertain", choices: ["To confuse the reader", "To use big words", "To persuade, inform, or entertain", "To write as long as possible"], fact: "Remember PIE: Persuade, Inform, Entertain!" },
      { q: "What is personification?", a: "Giving human qualities to non-human things", choices: ["A type of rhyme scheme", "Giving human qualities to non-human things", "A comparison using 'like'", "A repeated idea"], fact: "Example: The wind whispered through the trees!" },
      { q: "What is a thesis statement?", a: "The main argument or point of an essay", choices: ["The conclusion of an essay", "The first sentence of any paragraph", "The main argument or point of an essay", "A summary of research"], fact: "A strong thesis statement tells the reader exactly what to expect!" },
      { q: "What is the difference between a biography and an autobiography?", a: "A biography is written by someone else; autobiography by yourself", choices: ["They are the same thing", "A biography is fiction; autobiography is nonfiction", "A biography is written by someone else; autobiography by yourself", "An autobiography is about a fictional character"], fact: "Auto means self in Greek — so autobiography = writing about yourself!" },
    ],
    8: [
      { q: "What is a soliloquy in drama?", a: "A speech where a character speaks thoughts aloud alone on stage", choices: ["A conversation between two characters", "A speech where a character speaks thoughts aloud alone on stage", "A song in a play", "The opening narration"], fact: "Hamlet's 'To be or not to be' is the most famous soliloquy!" },
      { q: "What is the difference between denotation and connotation?", a: "Denotation is literal meaning; connotation is emotional association", choices: ["They mean the same thing", "Denotation is emotional; connotation is literal", "Denotation is literal meaning; connotation is emotional association", "Both refer to dictionary definitions"], fact: "'Home' and 'house' have the same denotation but different connotations!" },
      { q: "What is a foil character?", a: "A character who contrasts with the protagonist to highlight traits", choices: ["The villain of a story", "A minor character with no importance", "A character who contrasts with the protagonist to highlight traits", "A character who narrates the story"], fact: "Draco Malfoy is a foil to Harry Potter!" },
      { q: "What is a paradox?", a: "A statement that seems contradictory but reveals a truth", choices: ["An extreme exaggeration", "A comparison using like or as", "A statement that seems contradictory but reveals a truth", "A repeated sound"], fact: "Example: The more you know, the more you realize you don't know!" },
      { q: "What is the difference between syntax and diction?", a: "Syntax is sentence structure; diction is word choice", choices: ["They mean the same thing", "Syntax is word choice; diction is sentence structure", "Syntax is sentence structure; diction is word choice", "Both refer to grammar rules"], fact: "Together, syntax and diction create an author's unique voice!" },
      { q: "What is an unreliable narrator?", a: "A narrator whose credibility is compromised", choices: ["A narrator who tells the story in third person", "A narrator whose credibility is compromised", "A narrator who knows everything", "A narrator who is the main character"], fact: "Gone Girl and The Catcher in the Rye both use unreliable narrators!" },
      { q: "What is dramatic irony?", a: "When the audience knows something a character doesn't", choices: ["When a character says the opposite of what they mean", "When a surprising event occurs", "When the audience knows something a character doesn't", "When two characters disagree"], fact: "Romeo and Juliet is full of dramatic irony!" },
      { q: "What is a Shakespearean sonnet's rhyme scheme?", a: "ABAB CDCD EFEF GG", choices: ["AABB CCDD EEFF GG", "ABBA CDDC EFFE GG", "ABAB CDCD EFEF GG", "ABCD ABCD ABCD AA"], fact: "The final couplet (GG) always delivers the poem's main insight!" },
      { q: "What does 'in medias res' mean?", a: "Starting a story in the middle of the action", choices: ["The climax of a story", "Starting a story in the middle of the action", "A type of flashback", "The story's resolution"], fact: "Homer's Iliad and Odyssey both begin in medias res!" },
      { q: "What is the difference between mood and tone?", a: "Tone is the author's attitude; mood is how the reader feels", choices: ["They are the same thing", "Mood is the author's attitude; tone is how the reader feels", "Tone is the author's attitude; mood is how the reader feels", "Both refer to the setting's atmosphere"], fact: "Same text can have a sarcastic tone but create an eerie mood!" },
      { q: "What is an extended metaphor?", a: "A metaphor developed over several lines or an entire piece", choices: ["A very long simile", "A metaphor developed over several lines or an entire piece", "Using multiple metaphors in one sentence", "A metaphor that uses 'like' or 'as'"], fact: "Emily Dickinson's 'Hope is the thing with feathers' is a famous extended metaphor!" },
      { q: "What is the 'hero's journey'?", a: "A narrative pattern where a hero goes on an adventure and returns transformed", choices: ["Any story about a superhero", "A narrative pattern where a hero goes on an adventure and returns transformed", "A story told from the villain's perspective", "A three-act structure"], fact: "Joseph Campbell identified this pattern across myths worldwide!" },
      { q: "What is a rhetorical question?", a: "A question asked for effect, not expecting an answer", choices: ["A question in a speech", "A question asked for effect, not expecting an answer", "A question with multiple correct answers", "An unanswerable question"], fact: "Can you believe how common rhetorical questions are?" },
      { q: "What does 'verisimilitude' mean in literature?", a: "The appearance of being true or real", choices: ["A type of metaphor", "A story's moral lesson", "The appearance of being true or real", "An unresolved ending"], fact: "From Latin 'verus' (true) + 'similis' (like)!" },
      { q: "What is assonance?", a: "Repetition of vowel sounds in nearby words", choices: ["Repetition of consonants at word beginnings", "Words that rhyme perfectly", "Repetition of vowel sounds in nearby words", "A type of exaggeration"], fact: "Example: 'The rain in Spain stays mainly in the plain!'" },
      { q: "What is stream of consciousness?", a: "A narrative technique that presents a character's thoughts as they occur", choices: ["Writing about nature", "A narrative technique that presents a character's thoughts as they occur", "A type of poem with no punctuation", "Third-person omniscient narration"], fact: "James Joyce pioneered this technique in Ulysses!" },
      { q: "What is a Bildungsroman?", a: "A novel about a character's moral and psychological growth", choices: ["A German fairy tale", "A novel about a character's moral and psychological growth", "A mystery novel", "A historical fiction novel"], fact: "Great Expectations and Jane Eyre are classic Bildungsromans!" },
      { q: "What does 'juxtaposition' mean?", a: "Placing two contrasting things side by side for effect", choices: ["An extreme exaggeration", "Placing two contrasting things side by side for effect", "Using very complex vocabulary", "A type of dialogue"], fact: "Dickens' A Tale of Two Cities opens with the ultimate juxtaposition!" },
      { q: "What is an epistolary novel?", a: "A novel told through letters, diary entries, or documents", choices: ["A novel with no dialogue", "A novel told through letters, diary entries, or documents", "A novel with multiple narrators", "A novel written in verse"], fact: "Bram Stoker's Dracula is a famous epistolary novel!" },
      { q: "What is the difference between 'showing' and 'telling' in writing?", a: "'Showing' uses description and action; 'telling' states facts directly", choices: ["They are the same technique", "'Showing' is faster; 'telling' is slower", "'Showing' uses description and action; 'telling' states facts directly", "'Telling' is always better writing"], fact: "Example: 'She was nervous' (telling) vs 'Her hands trembled' (showing)!" },
    ],
  },

  science: {
    2: [
      { q: "What do plants need to make food?", a: "Sunlight, water, and carbon dioxide", choices: ["Just water", "Sunlight and soil only", "Sunlight, water, and carbon dioxide", "Rain and wind"], fact: "Plants make their own food through photosynthesis!" },
      { q: "What is the closest star to Earth?", a: "The Sun", choices: ["Sirius", "The Moon", "The Sun", "Polaris"], fact: "Light from the Sun takes about 8 minutes to reach us!" },
      { q: "How many bones are in the adult human body?", a: "206", choices: ["106", "156", "206", "256"], fact: "Babies are born with about 270 bones — they fuse as we grow!" },
      { q: "What is the process by which water turns to vapor called?", a: "Evaporation", choices: ["Condensation", "Precipitation", "Evaporation", "Freezing"], fact: "Evaporation is how the water cycle begins!" },
      { q: "Which planet is closest to the Sun?", a: "Mercury", choices: ["Venus", "Earth", "Mars", "Mercury"], fact: "A year on Mercury is only 88 Earth days long!" },
      { q: "What gas do humans breathe out?", a: "Carbon dioxide", choices: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], fact: "Plants love carbon dioxide — it's food for them!" },
      { q: "What is the hardest natural substance on Earth?", a: "Diamond", choices: ["Gold", "Iron", "Diamond", "Quartz"], fact: "Diamonds are made of pure carbon, just like pencil graphite!" },
      { q: "How many chambers does the human heart have?", a: "4", choices: ["2", "3", "4", "6"], fact: "The heart beats about 100,000 times every day!" },
      { q: "What type of animal is a whale?", a: "Mammal", choices: ["Fish", "Reptile", "Mammal", "Amphibian"], fact: "Whales breathe air and nurse their young with milk!" },
      { q: "What is the boiling point of water?", a: "100°C", choices: ["0°C", "50°C", "100°C", "212°F"], fact: "At the top of Mount Everest, water boils at only 70°C!" },
      { q: "What force keeps us on the ground?", a: "Gravity", choices: ["Magnetism", "Friction", "Gravity", "Pressure"], fact: "Gravity is the same force that keeps the Moon orbiting Earth!" },
      { q: "What is the largest organ in the human body?", a: "Skin", choices: ["Brain", "Liver", "Skin", "Lungs"], fact: "The skin of an adult covers about 21 square feet!" },
      { q: "What is a group of stars forming a pattern called?", a: "Constellation", choices: ["Galaxy", "Nebula", "Constellation", "Solar system"], fact: "There are 88 officially recognized constellations!" },
      { q: "What do caterpillars turn into?", a: "Butterflies or moths", choices: ["Beetles", "Bees", "Butterflies or moths", "Dragonflies"], fact: "Inside the chrysalis, the caterpillar completely dissolves and reforms!" },
      { q: "What is the freezing point of water?", a: "0°C", choices: ["-10°C", "0°C", "10°C", "32°F"], fact: "Salt water freezes at a lower temperature than fresh water!" },
      { q: "How many planets are in our solar system?", a: "8", choices: ["7", "8", "9", "10"], fact: "Pluto was reclassified as a dwarf planet in 2006!" },
      { q: "What is the main gas in Earth's atmosphere?", a: "Nitrogen", choices: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], fact: "Nitrogen makes up about 78% of the air we breathe!" },
      { q: "What part of the plant makes seeds?", a: "Flower", choices: ["Leaf", "Root", "Stem", "Flower"], fact: "Flowers attract insects to help with pollination!" },
      { q: "What is the speed of light?", a: "300,000 km/s", choices: ["3,000 km/s", "30,000 km/s", "300,000 km/s", "3,000,000 km/s"], fact: "Nothing in the universe travels faster than light!" },
      { q: "What is the center of an atom called?", a: "Nucleus", choices: ["Electron", "Proton", "Nucleus", "Neutron"], fact: "The nucleus contains protons and neutrons!" },
    ],
    6: [
      { q: "What is Newton's First Law of Motion?", a: "An object stays at rest or in motion unless acted on by a force", choices: ["Force equals mass times acceleration", "Every action has an equal and opposite reaction", "An object stays at rest or in motion unless acted on by a force", "Objects fall at the same rate"], fact: "This is also called the Law of Inertia!" },
      { q: "What is photosynthesis?", a: "The process plants use to convert light into food", choices: ["How plants absorb water", "How plants reproduce", "The process plants use to convert light into food", "How plants breathe"], fact: "Photosynthesis produces the oxygen we breathe!" },
      { q: "What is the chemical symbol for gold?", a: "Au", choices: ["Go", "Gd", "Au", "Ag"], fact: "Au comes from the Latin word 'aurum' meaning gold!" },
      { q: "What type of rock is formed from cooled lava?", a: "Igneous rock", choices: ["Sedimentary rock", "Metamorphic rock", "Igneous rock", "Limestone"], fact: "Igneous comes from the Latin word for fire!" },
      { q: "What is the powerhouse of the cell?", a: "Mitochondria", choices: ["Nucleus", "Ribosome", "Mitochondria", "Cell membrane"], fact: "Mitochondria convert food into energy cells can use!" },
      { q: "What is the formula for water?", a: "H₂O", choices: ["HO", "H₂O", "H₂O₂", "HO₂"], fact: "Two hydrogen atoms bonded to one oxygen atom!" },
      { q: "What causes the seasons on Earth?", a: "Earth's tilt on its axis", choices: ["Earth's distance from the Sun", "The Moon's gravity", "Earth's tilt on its axis", "Solar flares"], fact: "Earth is actually slightly closer to the Sun in winter!" },
      { q: "What is the difference between a physical and chemical change?", a: "Physical changes don't create new substances; chemical changes do", choices: ["Physical changes are bigger", "Physical changes don't create new substances; chemical changes do", "Chemical changes are reversible; physical changes are not", "They are the same thing"], fact: "Burning paper is a chemical change — you can't unburn it!" },
      { q: "What is an ecosystem?", a: "All living and non-living things interacting in an area", choices: ["A type of habitat", "Just the animals in an area", "All living and non-living things interacting in an area", "A food chain"], fact: "The Amazon rainforest is one of Earth's most complex ecosystems!" },
      { q: "What is DNA?", a: "The molecule that carries genetic information", choices: ["A type of protein", "A cell membrane", "The molecule that carries genetic information", "A type of virus"], fact: "Your DNA would stretch from Earth to the Sun and back 300 times!" },
      { q: "What is the law of conservation of energy?", a: "Energy cannot be created or destroyed, only transformed", choices: ["Energy always runs out eventually", "Heat is the highest form of energy", "Energy cannot be created or destroyed, only transformed", "Energy moves in one direction only"], fact: "Einstein showed that mass and energy are actually interchangeable!" },
      { q: "What is the function of red blood cells?", a: "Carry oxygen around the body", choices: ["Fight infection", "Carry oxygen around the body", "Clot wounds", "Produce antibodies"], fact: "Red blood cells live for only about 120 days!" },
      { q: "What is a food web?", a: "Interconnected food chains in an ecosystem", choices: ["What spiders eat", "A single predator-prey relationship", "Interconnected food chains in an ecosystem", "A diagram of plant nutrition"], fact: "Remove any species from a food web and the whole system is affected!" },
      { q: "What planet is known as the Red Planet?", a: "Mars", choices: ["Venus", "Jupiter", "Mars", "Saturn"], fact: "Mars is red because its soil is rich in iron oxide — rust!" },
      { q: "What is the difference between a mixture and a compound?", a: "Compounds are chemically bonded; mixtures are not", choices: ["They are the same thing", "Compounds are chemically bonded; mixtures are not", "Mixtures can't be separated; compounds can", "Compounds are liquids; mixtures are solids"], fact: "Saltwater is a mixture; salt itself (NaCl) is a compound!" },
      { q: "What is the role of the ozone layer?", a: "Protect Earth from harmful UV radiation", choices: ["Keep Earth warm", "Produce oxygen", "Protect Earth from harmful UV radiation", "Regulate rainfall"], fact: "The ozone layer is found in the stratosphere, 15-35km above Earth!" },
      { q: "What is a hypothesis?", a: "A testable prediction or educated guess", choices: ["The conclusion of an experiment", "A proven scientific fact", "A testable prediction or educated guess", "The equipment used in an experiment"], fact: "A good hypothesis can be tested and potentially proven wrong!" },
      { q: "What is the difference between weather and climate?", a: "Weather is short-term conditions; climate is long-term patterns", choices: ["They mean the same thing", "Climate is daily; weather is yearly", "Weather is short-term conditions; climate is long-term patterns", "Weather is measured in degrees; climate is not"], fact: "Climate is what you expect; weather is what you get!" },
      { q: "What is refraction?", a: "The bending of light as it passes through different materials", choices: ["Light bouncing off a surface", "Light being absorbed", "The bending of light as it passes through different materials", "The splitting of white light"], fact: "Refraction is why a straw looks bent in a glass of water!" },
      { q: "What is natural selection?", a: "The process where organisms best suited to their environment survive and reproduce", choices: ["Humans choosing which animals to breed", "Random mutation only", "The process where organisms best suited to their environment survive and reproduce", "Animals choosing their habitat"], fact: "Charles Darwin described natural selection in On the Origin of Species in 1859!" },
    ],
    8: [
      { q: "What is the difference between mitosis and meiosis?", a: "Mitosis produces 2 identical cells; meiosis produces 4 genetically unique cells", choices: ["They are the same process", "Meiosis produces 2 cells; mitosis produces 4", "Mitosis produces 2 identical cells; meiosis produces 4 genetically unique cells", "Only plants use mitosis"], fact: "Meiosis is how sex cells (eggs and sperm) are created!" },
      { q: "What is the Periodic Table organized by?", a: "Increasing atomic number", choices: ["Alphabetical order", "Atomic mass", "Increasing atomic number", "Date of discovery"], fact: "Mendeleev created the first periodic table in 1869 and left gaps for undiscovered elements!" },
      { q: "What is Newton's Second Law?", a: "Force = mass × acceleration (F=ma)", choices: ["Objects in motion stay in motion", "Every action has an equal reaction", "Force = mass × acceleration (F=ma)", "Energy is conserved"], fact: "F=ma is one of the most important equations in all of physics!" },
      { q: "What is a covalent bond?", a: "A bond formed by sharing electrons between atoms", choices: ["A bond formed by transferring electrons", "A bond formed by sharing electrons between atoms", "A weak attraction between molecules", "A bond between metals only"], fact: "Water (H₂O) is held together by covalent bonds!" },
      { q: "What is the difference between fission and fusion?", a: "Fission splits atoms; fusion joins atoms together", choices: ["They are the same process", "Fusion splits atoms; fission joins them", "Fission splits atoms; fusion joins atoms together", "Both involve splitting atoms"], fact: "The Sun produces energy through nuclear fusion!" },
      { q: "What is the Doppler effect?", a: "The change in frequency of a wave as its source moves", choices: ["Light bending through a lens", "Sound bouncing off surfaces", "The change in frequency of a wave as its source moves", "The spreading of waves in water"], fact: "The Doppler effect is why a siren sounds higher as it approaches you!" },
      { q: "What is CRISPR?", a: "A gene-editing technology", choices: ["A type of bacteria", "A protein in cells", "A gene-editing technology", "A DNA sequencing method"], fact: "CRISPR could one day cure genetic diseases!" },
      { q: "What is entropy?", a: "The measure of disorder or randomness in a system", choices: ["The measure of heat in a system", "The speed of a chemical reaction", "The measure of disorder or randomness in a system", "The energy stored in bonds"], fact: "The Second Law of Thermodynamics says entropy always increases!" },
      { q: "What is the difference between an acid and a base on the pH scale?", a: "Acids are below 7; bases are above 7", choices: ["Acids are above 7; bases are below 7", "Acids are below 7; bases are above 7", "Both are below 7", "pH doesn't distinguish them"], fact: "pH 7 is neutral — pure water is pH 7!" },
      { q: "What is the strong nuclear force?", a: "The force that holds protons and neutrons together in the nucleus", choices: ["The force between electrons", "Gravity at the atomic level", "The force that holds protons and neutrons together in the nucleus", "The force between magnets"], fact: "The strong nuclear force is the most powerful force in nature!" },
      { q: "What is a black hole?", a: "A region of space where gravity is so strong nothing can escape", choices: ["A star that has gone cold", "An empty region of space", "A region of space where gravity is so strong nothing can escape", "A dark nebula"], fact: "The first image of a black hole was captured in 2019!" },
      { q: "What is the difference between genotype and phenotype?", a: "Genotype is genetic makeup; phenotype is observable traits", choices: ["They mean the same thing", "Phenotype is genetic makeup; genotype is observable traits", "Genotype is genetic makeup; phenotype is observable traits", "Genotype is only from the mother"], fact: "Your eye color is a phenotype determined by your genotype!" },
      { q: "What is Avogadro's number?", a: "6.022 × 10²³", choices: ["3.14 × 10¹⁵", "6.022 × 10²³", "1.38 × 10⁻²³", "9.8 × 10⁴"], fact: "Avogadro's number tells us how many particles are in one mole of a substance!" },
      { q: "What is the difference between renewable and non-renewable energy?", a: "Renewable energy naturally replenishes; non-renewable doesn't", choices: ["Renewable energy is always cheaper", "Renewable energy naturally replenishes; non-renewable doesn't", "Non-renewable energy is better for the environment", "They are the same thing"], fact: "Solar energy could power the entire Earth thousands of times over!" },
      { q: "What is electromagnetic radiation?", a: "Energy that travels as waves through electric and magnetic fields", choices: ["Radiation only from nuclear reactions", "Sound waves", "Energy that travels as waves through electric and magnetic fields", "The heat given off by magnets"], fact: "Visible light, X-rays, and radio waves are all electromagnetic radiation!" },
      { q: "What is the theory of plate tectonics?", a: "Earth's crust is divided into moving plates that shape the surface", choices: ["The Earth expands over time", "Continents don't move", "Earth's crust is divided into moving plates that shape the surface", "Volcanoes create new crust only at the poles"], fact: "Plates move about as fast as your fingernails grow!" },
      { q: "What is homeostasis?", a: "The ability of an organism to maintain a stable internal environment", choices: ["The process of digestion", "Cell division", "The ability of an organism to maintain a stable internal environment", "The way organisms adapt to climate"], fact: "Your body maintaining 37°C is an example of homeostasis!" },
      { q: "What is the photoelectric effect?", a: "The emission of electrons when light hits a material", choices: ["Light bending through glass", "The absorption of light by plants", "The emission of electrons when light hits a material", "Light reflecting off mirrors"], fact: "Einstein won the Nobel Prize for explaining the photoelectric effect — not relativity!" },
      { q: "What is a catalyst?", a: "A substance that speeds up a reaction without being consumed", choices: ["A substance that slows reactions", "A product of a chemical reaction", "A substance that speeds up a reaction without being consumed", "A type of acid"], fact: "Enzymes in your body are biological catalysts!" },
      { q: "What does E=mc² mean?", a: "Energy equals mass times the speed of light squared", choices: ["Electricity equals mass times current", "Energy equals mass times the speed of light squared", "Entropy equals molecular composition squared", "Energy equals momentum times velocity squared"], fact: "This equation shows that a tiny amount of mass contains enormous energy!" },
    ],
  },
};

const SUBJECTS = [
  { id: "geography", label: "Geography", emoji: "🌍", color: "#2196f3", bg: "#e3f2fd" },
  { id: "math",      label: "Math",      emoji: "🔢", color: "#9c27b0", bg: "#f3e5f5" },
  { id: "english",   label: "English",   emoji: "📚", color: "#e91e63", bg: "#fce4ec" },
  { id: "science",   label: "Science",   emoji: "🔬", color: "#4caf50", bg: "#e8f5e9" },
];

const GRADES = [
  { id: 2, label: "2nd Grade", emoji: "⭐", desc: "Ages 7–8" },
  { id: 6, label: "6th Grade", emoji: "🌟", desc: "Ages 11–12" },
  { id: 8, label: "8th Grade", emoji: "🚀", desc: "Ages 13–14" },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const getRank = (score, total) => {
  const pct = score / (total * 15) * 100;
  if (pct >= 90) return { title: "Genius! 🧠", color: "#f0c040" };
  if (pct >= 70) return { title: "Star Student 🌟", color: "#4caf50" };
  if (pct >= 50) return { title: "Good Job! 👍", color: "#2196f3" };
  return { title: "Keep Practicing! 💪", color: "#ff9800" };
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [subject, setSubject] = useState(null);
  const [grade, setGrade] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(15);
  const [feedback, setFeedback] = useState(null);
  const [roundLog, setRoundLog] = useState([]);
  const [particles, setParticles] = useState([]);
  const [allStats, setAllStats] = useState({});
  const timerRef = React.useRef(null);

  useEffect(() => {
    (async () => { try { const r = await window.storage.get(STORAGE_KEY, true); if (r) setAllStats(JSON.parse(r.value)); } catch {} })();
  }, []);

  const saveStats = async (stats) => { try { await window.storage.set(STORAGE_KEY, JSON.stringify(stats), true); } catch {} };

  const startGame = () => {
    const pool = QUESTIONS[subject][grade];
    const qs = shuffle(pool).slice(0, 10).map(q => ({ ...q, choices: shuffle(q.choices) }));
    setQuestions(qs); setQIndex(0); setScore(0); setStreak(0);
    setSelected(null); setFeedback(null); setRoundLog([]);
    setTimer(15); setParticles([]);
    setScreen("game");
  };

  useEffect(() => {
    if (screen !== "game" || feedback || selected) return;
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleAnswer("__timeout__"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, qIndex, feedback, selected]);

  const triggerParticles = (correct) => {
    setParticles(Array.from({ length: 10 }, (_, i) => ({
      id: i, x: Math.random() * 100, delay: Math.random() * 0.3,
      emoji: correct ? ["⭐","✨","🎊","💫","🌟"][i % 5] : ["💀","😵","💥","🤦","🙈"][i % 5]
    })));
    setTimeout(() => setParticles([]), 1400);
  };

  const handleAnswer = (choice) => {
    if (selected) return;
    clearInterval(timerRef.current);
    const q = questions[qIndex];
    const correct = choice === q.a;
    setSelected(choice);
    let pts = 0;
    if (correct) {
      pts = 10 + (timer >= 10 ? 5 : 0) + (streak >= 2 ? 5 : 0);
      setScore(s => s + pts); setStreak(s => s + 1);
    } else { setStreak(0); }
    triggerParticles(correct);
    setFeedback({ correct, pts, fact: q.fact, timedOut: choice === "__timeout__" });
    setRoundLog(l => [...l, { q: q.q, correct, points: pts }]);
  };

  const nextQuestion = () => {
    if (qIndex + 1 >= questions.length) endGame();
    else { setQIndex(i => i + 1); setSelected(null); setFeedback(null); setTimer(15); }
  };

  const endGame = async () => {
    const correct = roundLog.filter(r => r.correct).length + (feedback?.correct ? 1 : 0);
    const key = `${playerName}__${subject}__${grade}`;
    const updated = { ...allStats };
    if (!updated[key]) updated[key] = { name: playerName, subject, grade, games: 0, totalScore: 0, best: 0, totalCorrect: 0, totalQ: 0 };
    updated[key].games += 1; updated[key].totalScore += score;
    updated[key].best = Math.max(updated[key].best, score);
    updated[key].totalCorrect += correct; updated[key].totalQ += questions.length;
    setAllStats(updated); await saveStats(updated);
    setScreen("results");
  };

  const subjectInfo = SUBJECTS.find(s => s.id === subject);
  const q = questions[qIndex];
  const timerColor = timer > 8 ? "#4caf50" : timer > 4 ? "#ff9800" : "#f44336";

  // HOME
  if (screen === "home") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 60, marginBottom: 8 }}>🎓</div>
        <h1 style={{ fontSize: 30, margin: "0 0 4px", background: "linear-gradient(90deg,#f0c040,#ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Brain Quest</h1>
        <p style={{ color: "#aaa", margin: "0 0 28px" }}>The Ultimate Kids Quiz Game</p>
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ color: "#ddd", fontSize: 14, marginBottom: 12 }}>Who's playing?</p>
          <input value={playerName} onChange={e => setPlayerName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && playerName.trim() && setScreen("subject")}
            placeholder="Enter your name..." maxLength={20}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "none", fontSize: 16, textAlign: "center", background: "rgba(255,255,255,0.15)", color: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "Georgia, serif" }} />
          <button onClick={() => playerName.trim() && setScreen("subject")} disabled={!playerName.trim()}
            style={{ marginTop: 16, width: "100%", padding: 14, borderRadius: 10, border: "none", background: playerName.trim() ? "linear-gradient(90deg,#f0c040,#ff6b6b)" : "#555", color: "#1a1a2e", fontWeight: 700, fontSize: 16, cursor: playerName.trim() ? "pointer" : "not-allowed", fontFamily: "Georgia, serif" }}>
            Let's Go! →
          </button>
        </div>
        <button onClick={() => setScreen("leaderboard")} style={{ marginTop: 16, background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#aaa", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "Georgia, serif" }}>
          🏆 Leaderboard
        </button>
      </div>
    </div>
  );

  // SUBJECT SELECT
  if (screen === "subject") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center", color: "#fff" }}>
        <p style={{ color: "#aaa", margin: "0 0 6px", fontSize: 14 }}>Hi {playerName}! Choose a subject:</p>
        <h2 style={{ margin: "0 0 24px", fontSize: 22 }}>What do you want to play? 🎯</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {SUBJECTS.map(s => (
            <button key={s.id} onClick={() => { setSubject(s.id); setScreen("grade"); }}
              style={{ padding: "28px 16px", borderRadius: 16, border: `2px solid ${s.color}`, background: `rgba(255,255,255,0.06)`, cursor: "pointer", transition: "all 0.2s", fontFamily: "Georgia, serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = s.color + "33"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "scale(1)"; }}>
              <div style={{ fontSize: 44 }}>{s.emoji}</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 17, marginTop: 8 }}>{s.label}</div>
            </button>
          ))}
        </div>
        <button onClick={() => setScreen("home")} style={{ marginTop: 20, background: "none", border: "none", color: "#aaa", cursor: "pointer", textDecoration: "underline", fontFamily: "Georgia, serif" }}>← Back</button>
      </div>
    </div>
  );

  // GRADE SELECT
  if (screen === "grade") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{subjectInfo?.emoji}</div>
        <h2 style={{ margin: "0 0 6px", fontSize: 22 }}>{subjectInfo?.label}</h2>
        <p style={{ color: "#aaa", margin: "0 0 24px", fontSize: 14 }}>Choose your difficulty level:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {GRADES.map(g => (
            <button key={g.id} onClick={() => { setGrade(g.id); startGame(); }}
              style={{ padding: "20px 24px", borderRadius: 14, border: `2px solid ${subjectInfo?.color}`, background: "rgba(255,255,255,0.06)", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "all 0.2s", fontFamily: "Georgia, serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = subjectInfo?.color + "33"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "scale(1)"; }}>
              <span style={{ fontSize: 32 }}>{g.emoji}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>{g.label}</div>
                <div style={{ color: "#aaa", fontSize: 13 }}>{g.desc}</div>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setScreen("subject")} style={{ marginTop: 20, background: "none", border: "none", color: "#aaa", cursor: "pointer", textDecoration: "underline", fontFamily: "Georgia, serif" }}>← Back</button>
      </div>
    </div>
  );

  // GAME
  if (screen === "game" && q) {
    const pct = (timer / 15) * 100;
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", fontFamily: "Georgia, serif", padding: "20px 16px", position: "relative", overflow: "hidden" }}>
        <style>{`@keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-160px) scale(1.4)}} @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}} @keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
        {particles.map(p => <div key={p.id} style={{ position:"fixed", left:`${p.x}%`, top:"45%", fontSize:26, animationDelay:`${p.delay}s`, animation:"floatUp 1.2s ease-out forwards", pointerEvents:"none", zIndex:100 }}>{p.emoji}</div>)}
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", marginBottom: 12 }}>
            <div><div style={{ fontSize: 11, color: "#aaa" }}>Player</div><div style={{ fontWeight: 700 }}>{playerName}</div></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 11, color: "#aaa" }}>{subjectInfo?.emoji} {subjectInfo?.label} · Grade {grade}</div><div style={{ fontWeight: 700 }}>Q {qIndex + 1} / {questions.length}</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "#aaa" }}>Score</div><div style={{ fontSize: 20, fontWeight: 700, color: "#f0c040" }}>{score}</div></div>
          </div>
          {streak >= 2 && <div style={{ textAlign: "center", color: "#ff6b6b", fontSize: 13, marginBottom: 6 }}>🔥 {streak} streak! +5 bonus active!</div>}
          <div style={{ height: 7, background: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: timerColor, borderRadius: 4, transition: "width 1s linear, background 0.3s" }} />
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.12)", marginBottom: 16, textAlign: "center", animation: feedback ? (feedback.correct ? "bounce 0.4s" : "shake 0.4s") : "none" }}>
            <div style={{ color: "#ddd", fontSize: 13, marginBottom: 8 }}>⏱ {timer}s</div>
            <h2 style={{ color: "#fff", fontSize: 19, margin: 0, lineHeight: 1.4 }}>{q.q}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {q.choices.map((c, i) => {
              const isSelected = selected === c, isCorrect = c === q.a, shown = !!selected;
              let bg = "rgba(255,255,255,0.08)", border = "1px solid rgba(255,255,255,0.12)", color = "#fff";
              if (shown && isCorrect) { bg = "rgba(76,175,80,0.3)"; border = "1px solid #4caf50"; }
              else if (shown && isSelected && !isCorrect) { bg = "rgba(244,67,54,0.3)"; border = "1px solid #f44336"; }
              return (
                <button key={i} onClick={() => handleAnswer(c)} disabled={!!selected}
                  style={{ padding: "14px 10px", borderRadius: 12, border, background: bg, color, fontSize: 13.5, cursor: selected ? "default" : "pointer", fontFamily: "Georgia, serif", lineHeight: 1.3 }}
                  onMouseEnter={e => { if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                  onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
                  <span style={{ fontSize: 16, marginRight: 5 }}>{"ABCD"[i]}</span>{c}{shown && isCorrect && " ✅"}{shown && isSelected && !isCorrect && " ❌"}
                </button>
              );
            })}
          </div>
          {feedback && (
            <div style={{ background: feedback.correct ? "rgba(76,175,80,0.2)" : "rgba(244,67,54,0.2)", border: `1px solid ${feedback.correct ? "#4caf50" : "#f44336"}`, borderRadius: 12, padding: "14px 18px", textAlign: "center", color: "#fff" }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                {feedback.timedOut ? "⏰ Time's up!" : feedback.correct ? `Correct! +${feedback.pts} pts` : `Not quite! The answer was: ${q.a}`}
              </div>
              <div style={{ fontSize: 13, color: "#bbb", fontStyle: "italic", marginBottom: 10 }}>💡 {feedback.fact}</div>
              <button onClick={nextQuestion} style={{ padding: "9px 24px", borderRadius: 8, border: "none", background: "#f0c040", color: "#1a1a2e", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Georgia, serif" }}>
                {qIndex + 1 >= questions.length ? "See Results 🏆" : "Next →"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // RESULTS
  if (screen === "results") {
    const correct = roundLog.filter(r => r.correct).length;
    const rank = getRank(score, questions.length);
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", fontFamily: "Georgia, serif", padding: "32px 16px", color: "#fff" }}>
        <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 60, animation: "spin 2s linear" }}>🏆</div>
          <h1 style={{ fontSize: 26, margin: "12px 0 4px" }}>Well done, {playerName.split(" ")[0]}!</h1>
          <div style={{ fontSize: 18, color: rank.color, marginBottom: 20, fontWeight: 700 }}>{rank.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[{ label: "Score", value: score, emoji: "⭐" }, { label: "Correct", value: `${correct}/${questions.length}`, emoji: "✅" }, { label: "Accuracy", value: `${Math.round(correct / questions.length * 100)}%`, emoji: "🎯" }].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 22 }}>{s.emoji}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#f0c040" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 14, marginBottom: 18, textAlign: "left", maxHeight: 220, overflowY: "auto" }}>
            <div style={{ fontSize: 12, color: "#aaa", textAlign: "center", marginBottom: 8 }}>Question Recap</div>
            {roundLog.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: i < roundLog.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <span>{r.correct ? "✅" : "❌"}</span>
                <span style={{ fontSize: 12, color: "#ccc", flex: 1 }}>{r.q}</span>
                <span style={{ fontSize: 12, color: "#f0c040", fontWeight: 700 }}>{r.correct ? `+${r.points}` : "0"}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={startGame} style={{ padding: "11px 22px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#f0c040,#ff6b6b)", color: "#1a1a2e", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "Georgia, serif" }}>🔄 Play Again</button>
            <button onClick={() => setScreen("subject")} style={{ padding: "11px 22px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "none", color: "#fff", fontSize: 15, cursor: "pointer", fontFamily: "Georgia, serif" }}>🎯 New Subject</button>
            <button onClick={() => setScreen("leaderboard")} style={{ padding: "11px 22px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "none", color: "#fff", fontSize: 15, cursor: "pointer", fontFamily: "Georgia, serif" }}>📊 Leaderboard</button>
          </div>
        </div>
      </div>
    );
  }

  // LEADERBOARD
  if (screen === "leaderboard") {
    const entries = Object.values(allStats).sort((a, b) => b.best - a.best);
    const medals = ["🥇","🥈","🥉"];
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", fontFamily: "Georgia, serif", padding: "32px 16px", color: "#fff" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", textDecoration: "underline", fontFamily: "Georgia, serif", marginBottom: 16 }}>← Home</button>
          <h1 style={{ textAlign: "center", fontSize: 26, margin: "0 0 4px" }}>🏆 Leaderboard</h1>
          <p style={{ textAlign: "center", color: "#aaa", fontSize: 13, marginBottom: 24 }}>Best scores across all subjects & grades</p>
          {entries.length === 0
            ? <p style={{ textAlign: "center", color: "#555", padding: 40 }}>No games yet — be the first! 🎓</p>
            : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {entries.map((e, i) => {
                  const subj = SUBJECTS.find(s => s.id === e.subject);
                  const acc = e.totalQ > 0 ? Math.round(e.totalCorrect / e.totalQ * 100) : 0;
                  return (
                    <div key={i} style={{ background: i === 0 ? "rgba(240,192,64,0.1)" : "rgba(255,255,255,0.06)", border: `1px solid ${i === 0 ? "#f0c040" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ fontSize: 26, width: 32, textAlign: "center" }}>{medals[i] || i + 1}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700 }}>{e.name}</div>
                        <div style={{ fontSize: 12, color: "#aaa" }}>{subj?.emoji} {subj?.label} · Grade {e.grade} · {e.games} game{e.games !== 1 ? "s" : ""} · {acc}% accuracy</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 22, fontWeight: 700, color: "#f0c040" }}>{e.best}</div>
                        <div style={{ fontSize: 11, color: "#aaa" }}>best</div>
                      </div>
                    </div>
                  );
                })}
              </div>}
        </div>
      </div>
    );
  }

  return null;
}
