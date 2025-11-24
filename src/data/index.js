import { Star, PlayCircle } from 'lucide-react';

export const userData = {
  name: 'Alex',
  progress: {
    'algebra-basics': 0.8,
    'geometry-intro': 0.5,
    'fractions': 0.95,
    'calculus-1': 0.2,
    'k-math-1': 0.1,
  },
  achievements: [
    { id: 1, name: 'Algebra Adept', icon: Star, date: '2024-06-20' },
    { id: 2, name: 'Fraction Fanatic', icon: Star, date: '2024-06-18' },
    { id: 3, name: 'First Steps', icon: PlayCircle, date: '2024-06-15' },
  ],
};

export const curriculumData = {
  "K": {
    "Math": [
      { id: 'k-math-1', name: 'Unit 1: Counting 0-5', description: 'Counting and numbers 0-5.', subtopics: ['Counting to 5', 'Writing 0-5', 'Comparing sets'] },
      { id: 'k-math-2', name: 'Unit 2: Shapes', description: 'Exploring 2D and 3D shapes.', subtopics: ['Circles & Squares', 'Triangles', '3D Shapes'] },
      { id: 'k-math-3', name: 'Unit 3: Counting 6-10', description: 'Expanding number sense to 10.', subtopics: ['Counting to 10', 'Writing 6-10', 'Comparing to 10'] },
      { id: 'k-math-4', name: 'Unit 4: Add/Sub within 5', description: 'Introduction to addition and subtraction.', subtopics: ['Adding to 5', 'Subtracting from 5'] },
      { id: 'k-math-5', name: 'Unit 5: Measurement', description: 'Length, weight, and sorting.', subtopics: ['Longer vs Shorter', 'Heavier vs Lighter', 'Sorting'] },
      { id: 'k-math-6', name: 'Unit 6: Numbers 11-19', description: 'Introduction to place value.', subtopics: ['Teens', 'Ten and more'] },
    ],
    "Language Arts": [
      { id: 'k-la-1', name: 'Unit 1: World of Words', description: 'Oral language and print awareness.', subtopics: ['Listening', 'Book Parts', 'Direction of Print'] },
      { id: 'k-la-2', name: 'Unit 2: Sounds Around Us', description: 'Phonological awareness.', subtopics: ['Rhyming', 'Syllables', 'Sounds in Words'] },
      { id: 'k-la-3', name: 'Unit 3: ABCs', description: 'Letter recognition and sounds.', subtopics: ['Alphabet', 'Letter Sounds', 'Vowels'] },
      { id: 'k-la-4', name: 'Unit 4: Reading Together', description: 'Shared and emergent reading.', subtopics: ['Story Details', 'Retelling', 'Sight Words'] },
      { id: 'k-la-5', name: 'Unit 5: My First Stories', description: 'Emergent writing.', subtopics: ['Drawing & Writing', 'Opinion', 'Narrative'] },
      { id: 'k-la-6', name: 'Unit 6: Book Types', description: 'Genres and text features.', subtopics: ['Fiction vs Non-fiction', 'Author & Illustrator'] },
    ],
    "Science": [
      { id: 'k-sci-1', name: 'Unit 1: Senses & Objects', description: 'Observing with senses and sorting.', subtopics: ['Five Senses', 'Describing Objects', 'Sorting'] },
      { id: 'k-sci-2', name: 'Unit 2: Pushes and Pulls', description: 'Forces and motion.', subtopics: ['Push vs Pull', 'Speed', 'Direction'] },
      { id: 'k-sci-3', name: 'Unit 3: Sunshine', description: 'Energy from the sun.', subtopics: ['Sunlight', 'Warmth', 'Shade'] },
      { id: 'k-sci-4', name: 'Unit 4: Living Things', description: 'Plants and animals.', subtopics: ['Plants', 'Animals', 'Needs'] },
      { id: 'k-sci-5', name: 'Unit 5: Weather', description: 'Watching the weather.', subtopics: ['Weather Types', 'Seasons', 'Clothing'] },
      { id: 'k-sci-6', name: 'Unit 6: Our Earth', description: 'Caring for the environment.', subtopics: ['Helping Earth', 'Habitats'] },
    ]
  },
  "1": {
    "Math": [
      { id: '1-math-1', name: 'Unit 1: Add/Sub within 10', description: 'Concepts and word problems.', subtopics: ['Word Problems', 'Properties', 'Unknown Addends'] },
      { id: '1-math-2', name: 'Unit 2: Place Value', description: 'Counting to 120 and tens/ones.', subtopics: ['Count to 120', 'Tens and Ones', 'Comparing'] },
      { id: '1-math-3', name: 'Unit 3: Strategies', description: 'Fluency within 20.', subtopics: ['Counting On', 'Making Ten', 'Doubles'] },
      { id: '1-math-4', name: 'Unit 4: 2-Digit Ops', description: 'Adding and subtracting larger numbers.', subtopics: ['Add within 100', 'Mentally +/- 10'] },
      { id: '1-math-5', name: 'Unit 5: Measure & Time', description: 'Length and clocks.', subtopics: ['Ordering Length', 'Measuring', 'Telling Time'] },
      { id: '1-math-6', name: 'Unit 6: Geometry', description: 'Shapes and attributes.', subtopics: ['Defining Attributes', 'Composing Shapes', 'Halves/Fourths'] },
    ]
  },
  "2": {
    "Math": [{ id: '2-math-1', name: 'Unit 1: Place Value to 1,000', description: 'Understanding hundreds, tens, and ones.', subtopics: ['Hundreds', 'Counting by 5s, 10s, 100s', 'Comparing Numbers'] }],
    "Language Arts": [{ id: '2-la-1', name: 'Unit 1: Phonics & Fluency', description: 'Decoding and reading with expression.', subtopics: ['Vowel Teams', 'Two-Syllable Words', 'Reading Speed'] }],
    "Science": [{ id: '2-sci-1', name: 'Unit 1: Properties of Matter', description: 'Solids, liquids, and gases.', subtopics: ['Solids', 'Liquids', 'Reversible Changes'] }]
  },
  "3": {
    "Math": [{ id: '3-math-1', name: 'Unit 1: Multiplication', description: 'Introduction to equal groups and arrays.', subtopics: ['Repeated Addition', 'Arrays', 'Facts 0-5'] }],
    "Language Arts": [{ id: '3-la-1', name: 'Unit 1: Sentences', description: 'Grammar and sentence structure.', subtopics: ['Subjects', 'Predicates', 'Compound Sentences'] }],
    "Science": [{ id: '3-sci-1', name: 'Unit 1: Life Cycles', description: 'How organisms grow and change.', subtopics: ['Plant Life Cycle', 'Animal Life Cycle', 'Inheritance'] }]
  },
  "4": {
    "Math": [{ id: '4-math-1', name: 'Unit 1: Factors & Multiples', description: 'Number patterns and properties.', subtopics: ['Factor Pairs', 'Prime vs Composite', 'Patterns'] }],
    "Language Arts": [{ id: '4-la-1', name: 'Unit 1: Main Idea', description: 'Reading comprehension strategies.', subtopics: ['Key Details', 'Summarizing', 'Inference'] }],
    "Science": [{ id: '4-sci-1', name: 'Unit 1: Energy', description: 'Forms and transfer of energy.', subtopics: ['Speed & Energy', 'Light', 'Sound'] }]
  },
  "5": {
    "Math": [{ id: 'fractions', name: 'Fractions', description: 'Understanding parts of a whole.', subtopics: ['Adding Fractions', 'Multiplying Fractions', 'Decimals'] }],
    "Language Arts": [{ id: '5-la-1', name: 'Unit 1: Essay Structure', description: 'Writing opinion and informative essays.', subtopics: ['Introductions', 'Body Paragraphs', 'Conclusions'] }],
    "Science": [{ id: '5-sci-1', name: 'Unit 1: Earth Systems', description: 'Geosphere, biosphere, hydrosphere, atmosphere.', subtopics: ['Water Cycle', 'Earth Spheres', 'Space'] }]
  },
  "6": {
    "Math": [{ id: '6-math-1', name: 'Unit 1: Ratios', description: 'Relationships between quantities.', subtopics: ['Ratio Language', 'Unit Rates', 'Percentages'] }],
    "Language Arts": [{ id: '6-la-1', name: 'Unit 1: Plot & Setting', description: 'Analyzing story elements.', subtopics: ['Exposition', 'Climax', 'Resolution'] }],
    "Science": [{ id: '6-sci-1', name: 'Unit 1: Cells', description: 'Basic units of life.', subtopics: ['Cell Theory', 'Organelles', 'Microscope'] }]
  },
  "7": {
    "Math": [{ id: '7-math-1', name: 'Unit 1: Rational Numbers', description: 'Operations with negative numbers.', subtopics: ['Integers', 'Number Line', 'Absolute Value'] }],
    "Language Arts": [{ id: '7-la-1', name: 'Unit 1: Point of View', description: 'Analyzing perspective in literature.', subtopics: ['First Person', 'Third Person', 'Evidence'] }],
    "Science": [{ id: '7-sci-1', name: 'Unit 1: Ecosystems', description: 'Interactions within environments.', subtopics: ['Food Webs', 'Energy Flow', 'Populations'] }]
  },
  "8": {
    "Math": [{ id: '8-math-1', name: 'Unit 1: Linear Equations', description: 'Slope and graphing.', subtopics: ['Slope-Intercept Form', 'Solving Equations', 'Systems'] }],
    "Language Arts": [{ id: '8-la-1', name: 'Unit 1: Argumentative Writing', description: 'Building a strong case.', subtopics: ['Claims', 'Counterclaims', 'Rebuttal'] }],
    "Science": [{ id: '8-sci-1', name: 'Unit 1: Forces & Motion', description: 'Newton\'s laws.', subtopics: ['Inertia', 'Acceleration', 'Action/Reaction'] }]
  },
  "9": {
    "Math": [
      { id: 'algebra-basics', name: 'Algebra I', description: 'Introduction to variables and equations.', subtopics: ['Variables', 'Linear Equations', 'Inequalities'] }
    ],
    "Science": [{ id: '9-sci-1', name: 'Biology', description: 'Cellular processes and genetics.', subtopics: ['Mitosis', 'DNA', 'Heredity'] }],
    "Language Arts": [{ id: '9-la-1', name: 'Literature I', description: 'Analysis of world literature.', subtopics: ['Short Stories', 'Poetry', 'Drama'] }]
  },
  "10": {
    "Math": [
      { id: 'geometry-intro', name: 'Geometry', description: 'Exploring shapes, angles, and space.', subtopics: ['Points & Lines', 'Angles', 'Triangles', 'Circles'] }
    ],
    "Science": [{ id: '10-sci-1', name: 'Chemistry', description: 'Atomic structure and reactions.', subtopics: ['Periodic Table', 'Bonding', 'Stoichiometry'] }],
    "History": [{ id: '10-hist-1', name: 'World History', description: 'Civilizations and global changes.', subtopics: ['Renaissance', 'Industrial Revolution', 'Modern Era'] }]
  },
  "11": {
    "Math": [
      { id: 'trigonometry', name: 'Trigonometry', description: 'Relationships between side lengths and angles.', subtopics: ['Sine', 'Cosine', 'Tangent'] }
    ],
    "Science": [{ id: '11-sci-1', name: 'Physics', description: 'Mechanics and thermodynamics.', subtopics: ['Kinematics', 'Dynamics', 'Energy'] }],
    "History": [{ id: '11-hist-1', name: 'US History', description: 'Founding to present day.', subtopics: ['Revolution', 'Civil War', 'Civil Rights'] }]
  },
  "12": {
    "Math": [
      { id: 'calculus-1', name: 'Calculus', description: 'The study of continuous change.', subtopics: ['Limits', 'Derivatives', 'Integration'] }
    ],
    "Government": [{ id: '12-gov-1', name: 'US Government', description: 'Structures and functions of government.', subtopics: ['Constitution', 'Branches', 'Rights'] }],
    "Economics": [{ id: '12-econ-1', name: 'Economics', description: 'Micro and macroeconomics.', subtopics: ['Supply & Demand', 'Markets', 'Fiscal Policy'] }]
  },
  "GED": {
    "Math": [{ id: 'ged-math-1', name: 'GED Math', description: 'Mathematical reasoning for the GED.', subtopics: ['Quantitative Problem Solving', 'Algebraic Problem Solving'] }],
    "Language Arts": [{ id: 'ged-rla-1', name: 'Reasoning Through Language Arts', description: 'Reading, writing, and language.', subtopics: ['Reading Comprehension', 'Argument Analysis', 'Grammar'] }],
    "Science": [{ id: 'ged-sci-1', name: 'GED Science', description: 'Life, physical, and earth and space science.', subtopics: ['Life Science', 'Physical Science', 'Earth Science'] }],
    "Social Studies": [{ id: 'ged-soc-1', name: 'GED Social Studies', description: 'Civics, government, history, economics, geography.', subtopics: ['Civics', 'History', 'Economics'] }]
  },
  "Advanced": {
    "AI": [{ id: 'ai-1', name: 'Intro to Artificial Intelligence', description: 'Concepts of AI and ML.', subtopics: ['Machine Learning', 'Neural Networks', 'Ethics in AI'] }],
    "Quantum": [{ id: 'quant-1', name: 'Quantum Computing', description: 'Introduction to quantum mechanics in computing.', subtopics: ['Superposition', 'Entanglement', 'Qubits'] }],
    "STEAM": [
        { id: 'steam-rob-1', name: 'Robotics', description: 'Design and programming of robots.', subtopics: ['Sensors', 'Actuators', 'Control Systems'] },
        { id: 'steam-art-1', name: 'Digital Arts', description: 'Intersection of art and technology.', subtopics: ['Graphic Design', '3D Modeling', 'Animation'] }
    ]
  }
};

export const problemsData = {
  // Existing
  'algebra-basics': [
    { id: 'ab-1', type: 'mcq', question: 'What is the value of x in the equation 2x + 5 = 15?', options: ['3', '5', '10', '-5'], answer: '5', hint: 'Try subtracting 5 from both sides first.' },
    { id: 'ab-2', type: 'input', question: 'Solve for y: 3y - 7 = 14', answer: '7', hint: 'Add 7 to both sides, then divide by 3.' },
  ],
  'geometry-intro': [
    { id: 'gi-1', type: 'mcq', question: 'How many degrees are in a right angle?', options: ['45', '90', '180', '360'], answer: '90', hint: 'A right angle is like the corner of a square.' },
  ],
  'fractions': [
      { id: 'fr-1', type: 'mcq', question: 'What is 1/2 + 1/2?', options: ['1/4', '2/4', '1', '2'], answer: '1', hint: 'Add the numerators.'}
  ],
  'calculus-1': [
      { id: 'calc-1', type: 'mcq', question: 'What is the derivative of x^2?', options: ['x', '2x', 'x^3', '2'], answer: '2x', hint: 'Power rule: nx^(n-1).'}
  ],
  'trigonometry': [
      { id: 'trig-1', type: 'mcq', question: 'What is sin(90 degrees)?', options: ['0', '1', '-1', '0.5'], answer: '1', hint: 'Think of the unit circle.'}
  ],

  // K Math
  'k-math-1': [
    { id: 'km1-1', type: 'mcq', question: 'How many apples?', options: ['1', '2', '3'], answer: '3', hint: 'Count them one by one.' },
    { id: 'km1-2', type: 'mcq', question: 'What number comes after 2?', options: ['1', '3', '4'], answer: '3', hint: '1, 2, ...' },
    { id: 'km1-3', type: 'mcq', question: 'Which group has more?', options: ['2 cats', '5 dogs'], answer: '5 dogs', hint: 'Which number is bigger?' },
  ],
  'k-math-2': [
    { id: 'km2-1', type: 'mcq', question: 'Which shape has 3 sides?', options: ['Square', 'Triangle', 'Circle'], answer: 'Triangle', hint: 'Tri means three.' },
    { id: 'km2-2', type: 'mcq', question: 'Is a ball flat or solid?', options: ['Flat', 'Solid'], answer: 'Solid', hint: 'Can you roll it?' },
  ],
  'k-math-3': [
    { id: 'km3-1', type: 'mcq', question: 'What comes after 9?', options: ['8', '10', '11'], answer: '10', hint: 'Count up from 9.' },
    { id: 'km3-2', type: 'input', question: 'Type the number ten.', answer: '10', hint: 'It has a 1 and a 0.' },
  ],
  'k-math-4': [
    { id: 'km4-1', type: 'mcq', question: 'What is 1 + 1?', options: ['1', '2', '3'], answer: '2', hint: 'One finger and another finger.' },
    { id: 'km4-2', type: 'mcq', question: 'If you have 3 cookies and eat 1, how many are left?', options: ['1', '2', '3'], answer: '2', hint: '3 take away 1.' },
  ],
  'k-math-5': [
    { id: 'km5-1', type: 'mcq', question: 'Which is heavier?', options: ['A feather', 'A rock'], answer: 'A rock', hint: 'Which one is harder to lift?' },
    { id: 'km5-2', type: 'mcq', question: 'Which is longer?', options: ['A pencil', 'A car'], answer: 'A car', hint: 'Think about their size.' },
  ],
  'k-math-6': [
    { id: 'km6-1', type: 'mcq', question: 'What number is 10 + 1?', options: ['10', '11', '12'], answer: '11', hint: 'Eleven.' },
    { id: 'km6-2', type: 'mcq', question: 'How many tens in 15?', options: ['1', '5', '15'], answer: '1', hint: 'The first digit.' },
  ],

  // K Language Arts
  'k-la-1': [
      { id: 'kla1-1', type: 'mcq', question: 'Where do we start reading a page?', options: ['Top left', 'Bottom right', 'Middle'], answer: 'Top left', hint: 'We read from left to right, top to bottom.'},
      { id: 'kla1-2', type: 'mcq', question: 'What does the author do?', options: ['Draws the pictures', 'Writes the words'], answer: 'Writes the words', hint: 'The illustrator draws.'}
  ],
  'k-la-2': [
      { id: 'kla2-1', type: 'mcq', question: 'What rhymes with Cat?', options: ['Dog', 'Hat', 'Car'], answer: 'Hat', hint: 'Cat, Hat, Bat...'},
      { id: 'kla2-2', type: 'mcq', question: 'How many syllables in "Banana"?', options: ['1', '2', '3'], answer: '3', hint: 'Ba-na-na.'}
  ],
  'k-la-3': [
      { id: 'kla3-1', type: 'mcq', question: 'Which letter makes the /b/ sound?', options: ['A', 'B', 'C'], answer: 'B', hint: 'Ball, Bat, Boy.'},
      { id: 'kla3-2', type: 'mcq', question: 'Is "A" a vowel or consonant?', options: ['Vowel', 'Consonant'], answer: 'Vowel', hint: 'A, E, I, O, U.'}
  ],
  'k-la-4': [
      { id: 'kla4-1', type: 'mcq', question: 'Who is the person in the story?', options: ['Setting', 'Character'], answer: 'Character', hint: 'The setting is where it happens.'},
      { id: 'kla4-2', type: 'mcq', question: 'Read this word: THE', options: ['the', 'and', 'is'], answer: 'the', hint: 'It starts with T.'}
  ],
  'k-la-5': [
      { id: 'kla5-1', type: 'mcq', question: 'What do we use to end a sentence?', options: ['Period', 'Letter', 'Space'], answer: 'Period', hint: 'A dot at the end.'},
      { id: 'kla5-2', type: 'mcq', question: 'Can we tell a story with pictures?', options: ['Yes', 'No'], answer: 'Yes', hint: 'Drawings can show what happens.'}
  ],
  'k-la-6': [
      { id: 'kla6-1', type: 'mcq', question: 'Is a story about talking animals fiction or non-fiction?', options: ['Fiction', 'Non-fiction'], answer: 'Fiction', hint: 'Fiction is made up.'},
  ],

  // K Science
  'k-sci-1': [
      { id: 'ksci1-1', type: 'mcq', question: 'Which sense do you use to smell flowers?', options: ['Sight', 'Smell', 'Touch'], answer: 'Smell', hint: 'Use your nose.'},
      { id: 'ksci1-2', type: 'mcq', question: 'Is a lemon sour or sweet?', options: ['Sour', 'Sweet'], answer: 'Sour', hint: 'It makes your lips pucker.'}
  ],
  'k-sci-2': [
      { id: 'ksci2-1', type: 'mcq', question: 'If you push a toy car, does it move?', options: ['Yes', 'No'], answer: 'Yes', hint: 'A push is a force.'},
      { id: 'ksci2-2', type: 'mcq', question: 'To stop a moving ball, you need to...', options: ['Apply a force', 'Watch it'], answer: 'Apply a force', hint: 'Push or pull it.'}
  ],
  'k-sci-3': [
      { id: 'ksci3-1', type: 'mcq', question: 'What gives us light and heat during the day?', options: ['The Moon', 'The Sun'], answer: 'The Sun', hint: 'It is bright and hot.'},
      { id: 'ksci3-2', type: 'mcq', question: 'If you stand in the shade, is it cooler?', options: ['Yes', 'No'], answer: 'Yes', hint: 'The sun is blocked.'}
  ],
  'k-sci-4': [
      { id: 'ksci4-1', type: 'mcq', question: 'What do plants need to grow?', options: ['Candy', 'Water and Sun'], answer: 'Water and Sun', hint: 'They drink water.'},
      { id: 'ksci4-2', type: 'mcq', question: 'Is a dog a living thing?', options: ['Yes', 'No'], answer: 'Yes', hint: 'It grows and breathes.'}
  ],
  'k-sci-5': [
      { id: 'ksci5-1', type: 'mcq', question: 'If it is raining, what should you wear?', options: ['Swimsuit', 'Raincoat'], answer: 'Raincoat', hint: 'To stay dry.'},
      { id: 'ksci5-2', type: 'mcq', question: 'Can we see the wind?', options: ['Yes', 'No'], answer: 'No', hint: 'We see things move, but not the wind itself.'}
  ],
  'k-sci-6': [
      { id: 'ksci6-1', type: 'mcq', question: 'Where should we put trash?', options: ['On the ground', 'In the trash can'], answer: 'In the trash can', hint: 'Keep the earth clean.'},
  ],

  // 1 Math
  '1-math-1': [
      { id: '1m1-1', type: 'input', question: 'What is 5 + 3?', answer: '8', hint: 'Count on 3 from 5.'},
      { id: '1m1-2', type: 'mcq', question: 'If 3 + 4 = 7, what is 4 + 3?', options: ['6', '7', '8'], answer: '7', hint: 'The order does not matter.'}
  ],
  '1-math-2': [
      { id: '1m2-1', type: 'input', question: 'What number is 2 tens and 3 ones?', answer: '23', hint: 'Put 2 in the tens place and 3 in the ones place.'},
      { id: '1m2-2', type: 'mcq', question: 'Which is bigger: 45 or 54?', options: ['45', '54'], answer: '54', hint: 'Look at the tens place.'}
  ],
  '1-math-3': [
      { id: '1m3-1', type: 'input', question: 'What is 8 + 8?', answer: '16', hint: 'Doubles.'},
      { id: '1m3-2', type: 'input', question: 'What is 10 + 5?', answer: '15', hint: 'Ten plus five.'}
  ],
  '1-math-4': [
      { id: '1m4-1', type: 'input', question: 'What is 20 + 30?', answer: '50', hint: '2 tens + 3 tens.'},
      { id: '1m4-2', type: 'input', question: 'What is 10 more than 25?', answer: '35', hint: 'Add 1 to the tens digit.'}
  ],
  '1-math-5': [
      { id: '1m5-1', type: 'mcq', question: 'Which hand on the clock shows hours?', options: ['Short hand', 'Long hand'], answer: 'Short hand', hint: 'The little one.'},
      { id: '1m5-2', type: 'mcq', question: 'How many inches in a foot (standard)?', options: ['10', '12', '100'], answer: '12', hint: 'A ruler.'}
  ],
  '1-math-6': [
      { id: '1m6-1', type: 'mcq', question: 'How many equal parts in a half?', options: ['2', '4'], answer: '2', hint: 'Split in two.'},
      { id: '1m6-2', type: 'mcq', question: 'A shape with 4 equal sides and 4 right angles is a...', options: ['Square', 'Rectangle', 'Rhombus'], answer: 'Square', hint: 'All sides same.'}
  ],

  // 2 Math, LA, Sci
  '2-math-1': [{ id: '2m1-1', type: 'input', question: 'What is the value of the 5 in 502?', answer: '500', hint: 'Hundreds place.' }],
  '2-la-1': [{ id: '2la1-1', type: 'mcq', question: 'Which word has 2 syllables?', options: ['Dog', 'Pencil', 'Cat'], answer: 'Pencil', hint: 'Pen-cil.' }],
  '2-sci-1': [{ id: '2sci1-1', type: 'mcq', question: 'Ice is a...', options: ['Solid', 'Liquid', 'Gas'], answer: 'Solid', hint: 'It is hard.' }],

  // 3 Math, LA, Sci
  '3-math-1': [{ id: '3m1-1', type: 'input', question: 'What is 3 x 4?', answer: '12', hint: '3 groups of 4.' }],
  '3-la-1': [{ id: '3la1-1', type: 'mcq', question: 'Identify the subject: "The dog ran."', options: ['The dog', 'ran'], answer: 'The dog', hint: 'Who did the action?' }],
  '3-sci-1': [{ id: '3sci1-1', type: 'mcq', question: 'What grows from a seed?', options: ['Rock', 'Plant'], answer: 'Plant', hint: 'It needs water and sun.' }],

  // 4 Math, LA, Sci
  '4-math-1': [{ id: '4m1-1', type: 'mcq', question: 'Is 7 a prime number?', options: ['Yes', 'No'], answer: 'Yes', hint: 'It only has factors 1 and 7.' }],
  '4-la-1': [{ id: '4la1-1', type: 'mcq', question: 'What is the main idea?', options: ['A small detail', 'What the text is mostly about'], answer: 'What the text is mostly about', hint: 'The big picture.' }],
  '4-sci-1': [{ id: '4sci1-1', type: 'mcq', question: 'Sound travels in...', options: ['Waves', 'Lines'], answer: 'Waves', hint: 'Vibrations.' }],

  // 5 Math (Fractions already defined above as 'fractions'), LA, Sci
  '5-la-1': [{ id: '5la1-1', type: 'mcq', question: 'An essay usually starts with an...', options: ['Introduction', 'Conclusion'], answer: 'Introduction', hint: 'The beginning.' }],
  '5-sci-1': [{ id: '5sci1-1', type: 'mcq', question: 'Which sphere contains all water?', options: ['Atmosphere', 'Hydrosphere'], answer: 'Hydrosphere', hint: 'Hydro means water.' }],

  // 6 Math, LA, Sci
  '6-math-1': [{ id: '6m1-1', type: 'input', question: 'If the ratio of apples to oranges is 2:3 and there are 6 oranges, how many apples?', answer: '4', hint: 'Multiply 2 by 2.' }],
  '6-la-1': [{ id: '6la1-1', type: 'mcq', question: 'The turning point of a story is the...', options: ['Climax', 'Exposition'], answer: 'Climax', hint: 'The most exciting part.' }],
  '6-sci-1': [{ id: '6sci1-1', type: 'mcq', question: 'The powerhouse of the cell is the...', options: ['Nucleus', 'Mitochondria'], answer: 'Mitochondria', hint: 'Energy producer.' }],

  // 7 Math, LA, Sci
  '7-math-1': [{ id: '7m1-1', type: 'input', question: 'What is -5 + 3?', answer: '-2', hint: 'Start at -5 and move right 3.' }],
  '7-la-1': [{ id: '7la1-1', type: 'mcq', question: 'I, me, my indicates which point of view?', options: ['First Person', 'Third Person'], answer: 'First Person', hint: 'The speaker is involved.' }],
  '7-sci-1': [{ id: '7sci1-1', type: 'mcq', question: 'An animal that eats plants is a...', options: ['Herbivore', 'Carnivore'], answer: 'Herbivore', hint: 'Herbs/plants.' }],

  // 8 Math, LA, Sci
  '8-math-1': [{ id: '8m1-1', type: 'input', question: 'Find the slope: y = 2x + 1', answer: '2', hint: 'The coefficient of x.' }],
  '8-la-1': [{ id: '8la1-1', type: 'mcq', question: 'A claim is...', options: ['A fact', 'An arguable statement'], answer: 'An arguable statement', hint: 'Something you prove.' }],
  '8-sci-1': [{ id: '8sci1-1', type: 'mcq', question: 'For every action, there is an equal and opposite...', options: ['Reaction', 'Force'], answer: 'Reaction', hint: 'Newton\'s 3rd Law.' }],

  // 9 Sci, Lit (Math is algebra-basics)
  '9-sci-1': [{ id: '9sci1-1', type: 'mcq', question: 'DNA is found in the...', options: ['Nucleus', 'Membrane'], answer: 'Nucleus', hint: 'Center of the cell.' }],
  '9-la-1': [{ id: '9la1-1', type: 'mcq', question: 'A poem with 14 lines is often a...', options: ['Haiku', 'Sonnet'], answer: 'Sonnet', hint: 'Shakespeare wrote many.' }],

  // 10 Sci, Hist (Math is geometry-intro)
  '10-sci-1': [{ id: '10sci1-1', type: 'mcq', question: 'Water is H2O. What is H?', options: ['Helium', 'Hydrogen'], answer: 'Hydrogen', hint: 'Element 1.' }],
  '10-hist-1': [{ id: '10hist1-1', type: 'mcq', question: 'The Industrial Revolution began with...', options: ['Steam engines', 'Computers'], answer: 'Steam engines', hint: 'Coal power.' }],

  // 11 Sci, Hist (Math is trigonometry)
  '11-sci-1': [{ id: '11sci1-1', type: 'mcq', question: 'F = ma is associated with...', options: ['Newton', 'Einstein'], answer: 'Newton', hint: 'Laws of motion.' }],
  '11-hist-1': [{ id: '11hist1-1', type: 'mcq', question: 'The Declaration of Independence was signed in...', options: ['1776', '1789'], answer: '1776', hint: 'July 4th.' }],

  // 12 Gov, Econ (Math is calculus-1)
  '12-gov-1': [{ id: '12gov1-1', type: 'mcq', question: 'How many branches of US government?', options: ['2', '3', '4'], answer: '3', hint: 'Legislative, Executive, Judicial.' }],
  '12-econ-1': [{ id: '12econ1-1', type: 'mcq', question: 'When demand goes up and supply stays same, price...', options: ['Goes up', 'Goes down'], answer: 'Goes up', hint: 'Scarcity.' }],

  // GED
  'ged-math-1': [{ id: 'gedm1-1', type: 'input', question: 'Evaluate: 3(4+2) - 5', answer: '13', hint: 'Order of operations.' }],
  'ged-rla-1': [{ id: 'gedrla1-1', type: 'mcq', question: 'Identify the thesis statement.', options: ['The main argument', 'A supporting detail'], answer: 'The main argument', hint: 'Usually at the end of the intro.' }],
  'ged-sci-1': [{ id: 'gedsci1-1', type: 'mcq', question: 'Photosynthesis requires...', options: ['Sunlight', 'Darkness'], answer: 'Sunlight', hint: 'Photo means light.' }],
  'ged-soc-1': [{ id: 'gedsoc1-1', type: 'mcq', question: 'The Bill of Rights is the first ___ amendments.', options: ['5', '10'], answer: '10', hint: 'Decimal base.' }],

  // Advanced
  'ai-1': [{ id: 'ai1-1', type: 'mcq', question: 'What does ML stand for?', options: ['Machine Learning', 'Maximum Load'], answer: 'Machine Learning', hint: 'Computers learning from data.' }],
  'quant-1': [{ id: 'quant1-1', type: 'mcq', question: 'A quantum bit is called a...', options: ['Bit', 'Qubit'], answer: 'Qubit', hint: 'Quantum bit.' }],
  'steam-rob-1': [{ id: 'srob1-1', type: 'mcq', question: 'Which component detects the environment?', options: ['Motor', 'Sensor'], answer: 'Sensor', hint: 'Like eyes or ears.' }],
  'steam-art-1': [{ id: 'sart1-1', type: 'mcq', question: 'RGB stands for...', options: ['Red Green Blue', 'Real Good Bit'], answer: 'Red Green Blue', hint: 'Colors of light.' }],
};
