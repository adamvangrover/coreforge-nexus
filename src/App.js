import React, { useState, useEffect, useRef } from 'react';
import { Target, BarChart2, BookOpen, Star, PlayCircle, BrainCircuit, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

// Mock Data for the application
const mockData = {
  user: {
    name: 'Alex',
    progress: {
      'algebra-basics': 0.8,
      'geometry-intro': 0.5,
      'fractions': 0.95,
      'calculus-1': 0.2,
    },
    achievements: [
      { id: 1, name: 'Algebra Adept', icon: Star, date: '2024-06-20' },
      { id: 2, name: 'Fraction Fanatic', icon: Star, date: '2024-06-18' },
      { id: 3, name: 'First Steps', icon: PlayCircle, date: '2024-06-15' },
    ],
  },
  curriculum: [
    { id: 'algebra-basics', name: 'Algebra Basics', description: 'Introduction to variables and equations.', subtopics: ['Variables', 'Linear Equations', 'Inequalities'] },
    { id: 'geometry-intro', name: 'Geometry Intro', description: 'Exploring shapes, angles, and space.', subtopics: ['Points & Lines', 'Angles', 'Triangles', 'Circles'] },
    { id: 'fractions', name: 'Fractions', description: 'Understanding parts of a whole.', subtopics: ['What is a Fraction?', 'Adding Fractions', 'Multiplying Fractions'] },
    { id: 'calculus-1', name: 'Calculus I', description: 'The study of continuous change.', subtopics: ['Limits', 'Derivatives', 'Integration'] },
    { id: 'trigonometry', name: 'Trigonometry', description: 'Relationships between side lengths and angles of triangles.', subtopics: ['Sine', 'Cosine', 'Tangent'] },
  ],
  problems: {
    'algebra-basics': [
      { id: 'ab-1', type: 'mcq', question: 'What is the value of x in the equation 2x + 5 = 15?', options: ['3', '5', '10', '-5'], answer: '5', hint: 'Try subtracting 5 from both sides first.' },
      { id: 'ab-2', type: 'input', question: 'Solve for y: 3y - 7 = 14', answer: '7', hint: 'Add 7 to both sides, then divide by 3.' },
    ],
    'geometry-intro': [
      { id: 'gi-1', type: 'mcq', question: 'How many degrees are in a right angle?', options: ['45', '90', '180', '360'], answer: '90', hint: 'A right angle is like the corner of a square.' },
    ],
  },
};


// Main App Component
const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(mockData.user);
  const [currentTopic, setCurrentTopic] = useState(null);

  const navigateTo = (view, topicId = null) => {
    setActiveView(view);
    if (topicId) {
      const topic = mockData.curriculum.find(t => t.id === topicId);
      setCurrentTopic(topic);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={currentUser} navigateTo={navigateTo} />;
      case 'learningZone':
        return <LearningZone topic={currentTopic} />;
      case 'progressCenter':
        return <ProgressCenter user={currentUser} navigateTo={navigateTo}/>;
      case 'explorationZone':
        return <ExplorationZone />;
      default:
        return <Dashboard user={currentUser} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
};

// Header Component
const Header = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'progressCenter', label: 'Progress', icon: BarChart2 },
    { id: 'explorationZone', label: 'Explore', icon: BrainCircuit },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-800">MathQuest</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === item.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="md:hidden">
             <select onChange={(e) => setActiveView(e.target.value)} value={activeView} className="bg-gray-100 border-gray-300 rounded-md">
                 {navItems.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
             </select>
          </div>
        </div>
      </div>
    </header>
  );
};


// Dashboard Component
const Dashboard = ({ user, navigateTo }) => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">{getGreeting()}, {user.name}!</h2>
                <p className="text-gray-500 mt-1">Ready to solve some problems?</p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Continue Learning & Recommendations */}
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Continue Learning" icon={PlayCircle}>
                         <div className="space-y-4">
                            {mockData.curriculum.slice(0, 2).map(topic => (
                                <div key={topic.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                                        <p className="text-sm text-gray-500">{topic.description}</p>
                                        <ProgressRing progress={user.progress[topic.id] || 0} />
                                    </div>
                                    <button
                                        onClick={() => navigateTo('learningZone', topic.id)}
                                        className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-transform transform hover:scale-105">
                                        Start
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                     <Card title="Recommended For You" icon={Lightbulb}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockData.curriculum.slice(2, 4).map(topic => (
                                <div key={topic.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateTo('learningZone', topic.id)}>
                                     <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                                     <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Achievements */}
                <div className="lg:col-span-1">
                     <Card title="Achievements" icon={Star}>
                        <ul className="space-y-4">
                            {user.achievements.map(ach => (
                                <li key={ach.id} className="flex items-center space-x-4">
                                    <div className="bg-yellow-100 p-2 rounded-full">
                                        <ach.icon className="h-6 w-6 text-yellow-500" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{ach.name}</p>
                                        <p className="text-sm text-gray-400">Earned on {ach.date}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// LearningZone Component
const LearningZone = ({ topic }) => {
    const [problemIndex, setProblemIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null); // null, 'correct', 'incorrect'
    const [showHint, setShowHint] = useState(false);

    const problems = mockData.problems[topic.id] || [];
    const currentProblem = problems[problemIndex];

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userAnswer.toLowerCase().trim() === currentProblem.answer.toLowerCase().trim()) {
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
    };

    const handleNext = () => {
        setFeedback(null);
        setUserAnswer('');
        setShowHint(false);
        setProblemIndex(prev => (prev + 1) % problems.length);
    }

    if (!currentProblem) {
        return <div className="text-center p-8 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800">No problems available for {topic.name} yet.</h2>
            <p className="text-gray-500 mt-2">Check back soon for new challenges!</p>
        </div>
    }

    return (
        <div className="max-w-2xl mx-auto">
             <Card title={topic.name}>
                <div className="p-2 sm:p-6">
                    <p className="text-gray-500 text-sm mb-1">Problem {problemIndex + 1} of {problems.length}</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{currentProblem.question}</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {currentProblem.type === 'mcq' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {currentProblem.options.map(option => (
                                    <button key={option} type="button" onClick={() => setUserAnswer(option)}
                                        className={`p-4 rounded-lg text-left transition-all ${userAnswer === option ? 'bg-indigo-200 ring-2 ring-indigo-500' : 'bg-gray-100 hover:bg-gray-200'}`}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                        {currentProblem.type === 'input' && (
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Type your answer here"
                            />
                        )}
                         <button type="submit" disabled={!userAnswer || feedback} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Check Answer
                        </button>
                    </form>

                    <div className="mt-4">
                        <button onClick={() => setShowHint(!showHint)} className="text-sm text-indigo-600 hover:underline flex items-center">
                            <Lightbulb className="w-4 h-4 mr-1"/>
                            {showHint ? 'Hide Hint' : 'Need a hint?'}
                        </button>
                        {showHint && <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">{currentProblem.hint}</div>}
                    </div>

                    {feedback && (
                        <div className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${feedback === 'correct' ? 'bg-green-100' : 'bg-red-100'}`}>
                            {feedback === 'correct' ?
                                <CheckCircle className="h-8 w-8 text-green-600"/> :
                                <XCircle className="h-8 w-8 text-red-600"/>
                            }
                            <div>
                                <h4 className="font-bold">{feedback === 'correct' ? "That's right!" : "Not quite..."}</h4>
                                {feedback === 'incorrect' && <p className="text-sm">The correct answer is {currentProblem.answer}. Try again or move to the next problem.</p>}
                            </div>
                            <button onClick={handleNext} className="ml-auto bg-white px-4 py-2 rounded-lg shadow-sm font-semibold text-sm">Next</button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

// ProgressCenter Component
const ProgressCenter = ({ user, navigateTo }) => (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Your Progress</h2>
        <Card title="Skills Map" icon={BarChart2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockData.curriculum.map(topic => {
                    const progress = user.progress[topic.id] || 0;
                    const getBackgroundColor = (p) => {
                        if (p >= 0.9) return 'bg-green-100 border-green-400';
                        if (p >= 0.5) return 'bg-blue-100 border-blue-400';
                        if (p > 0) return 'bg-yellow-100 border-yellow-400';
                        return 'bg-gray-100 border-gray-300';
                    };
                    return (
                        <div
                           key={topic.id}
                           className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-lg transition-shadow ${getBackgroundColor(progress)}`}
                           onClick={() => navigateTo('learningZone', topic.id)}
                        >
                            <h3 className="font-bold text-gray-800">{topic.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress * 100}%` }}></div>
                            </div>
                             <p className="text-right text-sm font-semibold mt-1 text-indigo-800">{(progress * 100).toFixed(0)}% Mastered</p>
                        </div>
                    )
                })}
            </div>
        </Card>
    </div>
);


// ExplorationZone Component
const ExplorationZone = () => {
  const [equation, setEquation] = useState('x^2');
  const canvasRef = useRef(null);

  useEffect(() => {
    drawGraph();
  }, [equation]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2); // X-axis
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height); // Y-axis
    ctx.strokeStyle = '#ccc';
    ctx.stroke();

    // Draw function
    ctx.beginPath();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;

    const scale = 20;

    for (let i = 0; i < width; i++) {
      try {
        const x = (i - width / 2) / scale;
        // Super simple parser for x, x^2, x^3
        let y;
        if (equation.includes('^2')) {
            y = Math.pow(x, 2);
        } else if (equation.includes('^3')) {
            y = Math.pow(x, 3);
        } else if (equation.includes('sin(x)')) {
            y = Math.sin(x);
        } else if (equation.includes('cos(x)')) {
            y = Math.cos(x);
        } else {
            y = x; // default to y = x
        }

        const canvasX = i;
        const canvasY = height / 2 - y * scale;
        if (i === 0) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
      } catch (error) {
          console.error("Couldn't parse equation:", error);
          break;
      }
    }
    ctx.stroke();
  };

  const handleEquationChange = (e) => {
    e.preventDefault();
    const newEquation = e.target.elements.equation.value;
    setEquation(newEquation);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Exploration Zone</h2>
      <Card title="Interactive Graphing Calculator" icon={BrainCircuit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <canvas ref={canvasRef} width="500" height="400" className="w-full bg-white border border-gray-200 rounded-lg"></canvas>
          </div>
          <div className="md:col-span-1 space-y-4">
              <form onSubmit={handleEquationChange} className="space-y-2">
                <label htmlFor="equation" className="font-semibold text-gray-700">y =</label>
                <input
                  type="text"
                  id="equation"
                  name="equation"
                  defaultValue={equation}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Plot Function
                </button>
              </form>
              <div>
                  <h4 className="font-semibold mb-2">Examples:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>x</li>
                      <li>x^2</li>
                      <li>x^3</li>
                      <li>sin(x)</li>
                      <li>cos(x)</li>
                  </ul>
              </div>
          </div>
        </div>
      </Card>
    </div>
  );
};


// Reusable Components
const Card = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center space-x-3">
            {Icon && <Icon className="h-6 w-6 text-indigo-500" />}
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <div className="p-4 sm:p-6">
            {children}
        </div>
    </div>
);

const ProgressRing = ({ progress }) => {
    const size = 60;
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress * circumference);

    return (
        <div className="relative flex items-center justify-center" style={{width: size, height: size}}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="transparent" />
                <circle cx={size/2} cy={size/2} r={radius} stroke="#4f46e5" strokeWidth={strokeWidth} fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-sm font-bold text-indigo-700">
                {`${(progress * 100).toFixed(0)}%`}
            </span>
        </div>
    );
};

export default App;
