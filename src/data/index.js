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
  "High School": {
    "Math": [
      { id: 'algebra-basics', name: 'Algebra Basics', description: 'Introduction to variables and equations.', subtopics: ['Variables', 'Linear Equations', 'Inequalities'] },
      { id: 'geometry-intro', name: 'Geometry Intro', description: 'Exploring shapes, angles, and space.', subtopics: ['Points & Lines', 'Angles', 'Triangles', 'Circles'] },
      { id: 'fractions', name: 'Fractions', description: 'Understanding parts of a whole.', subtopics: ['What is a Fraction?', 'Adding Fractions', 'Multiplying Fractions'] },
      { id: 'calculus-1', name: 'Calculus I', description: 'The study of continuous change.', subtopics: ['Limits', 'Derivatives', 'Integration'] },
      { id: 'trigonometry', name: 'Trigonometry', description: 'Relationships between side lengths and angles of triangles.', subtopics: ['Sine', 'Cosine', 'Tangent'] },
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
    { id: 'km1-1', type: 'mcq', question: 'How many apples?', options: ['1', '2', '3'], answer: '3', hint: 'Count them one by one.' }, // Ideally would have an image
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
  ]
};
