import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Loader2, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
// DEV_NOTE: We'll need to handle styling for ReactMarkdown, e.g. using tailwind typography plugin or custom CSS.

// DEV_NOTE: Base API URL - should be in an env variable in a real app
const API_BASE_URL = '/api/v1/curriculum'; // Using relative path for proxy

interface SelectionItem {
  id: string;
  name: string; // For display, can be same as id if user-friendly
}

export const LearningView: React.FC = () => {
  const [gradeLevels, setGradeLevels] = useState<SelectionItem[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<SelectionItem | null>(null);

  const [subjects, setSubjects] = useState<SelectionItem[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<SelectionItem | null>(null);

  const [lessons, setLessons] = useState<SelectionItem[]>([]);
  const [selectedLessonFile, setSelectedLessonFile] = useState<SelectionItem | null>(null);

  const [lessonContent, setLessonContent] = useState<string | null>(null);

  const [loadingState, setLoadingState] = useState<'grades' | 'subjects' | 'lessons' | 'content' | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch Grade Levels
  useEffect(() => {
    const fetchGradeLevels = async () => {
      setLoadingState('grades');
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/grade-levels`);
        if (!response.ok) throw new Error(`Failed to fetch grade levels: ${response.statusText}`);
        const data: string[] = await response.json();
        setGradeLevels(data.map(g => ({ id: g, name: g.replace(/_/g, ' ') }))); // Simple name conversion
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching grade levels:", err);
      } finally {
        setLoadingState(null);
      }
    };
    fetchGradeLevels();
  }, []);

  // Fetch Subjects when selectedGrade changes
  useEffect(() => {
    if (!selectedGrade) {
      setSubjects([]);
      setSelectedSubject(null); // Reset subject when grade changes
      return;
    }
    const fetchSubjects = async () => {
      setLoadingState('subjects');
      setError(null);
      setSubjects([]); // Clear previous subjects
      try {
        const response = await fetch(`${API_BASE_URL}/${selectedGrade.id}/subjects`);
        if (!response.ok) throw new Error(`Failed to fetch subjects: ${response.statusText}`);
        const data: string[] = await response.json();
        setSubjects(data.map(s => ({ id: s, name: s.replace(/_/g, ' ') })));
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching subjects:", err);
      } finally {
        setLoadingState(null);
      }
    };
    fetchSubjects();
  }, [selectedGrade]);

  // Fetch Lessons when selectedSubject changes
  useEffect(() => {
    if (!selectedGrade || !selectedSubject) {
      setLessons([]);
      setSelectedLessonFile(null); // Reset lesson when subject changes
      return;
    }
    const fetchLessons = async () => {
      setLoadingState('lessons');
      setError(null);
      setLessons([]); // Clear previous lessons
      try {
        const response = await fetch(`${API_BASE_URL}/${selectedGrade.id}/${selectedSubject.id}/lessons`);
        if (!response.ok) throw new Error(`Failed to fetch lessons: ${response.statusText}`);
        const data: string[] = await response.json();
        // Make lesson names more readable (remove .md, replace underscores)
        setLessons(data.map(l => ({ id: l, name: l.replace(/\.md$/, '').replace(/_/g, ' ') })));
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching lessons:", err);
      } finally {
        setLoadingState(null);
      }
    };
    fetchLessons();
  }, [selectedGrade, selectedSubject]);

  // Fetch Lesson Content when selectedLessonFile changes
  useEffect(() => {
    if (!selectedGrade || !selectedSubject || !selectedLessonFile) {
      setLessonContent(null); // Clear content when lesson changes
      return;
    }
    const fetchLessonContent = async () => {
      setLoadingState('content');
      setError(null);
      setLessonContent(null); // Clear previous content
      try {
        const response = await fetch(`${API_BASE_URL}/${selectedGrade.id}/${selectedSubject.id}/${selectedLessonFile.id}`);
        if (!response.ok) throw new Error(`Failed to fetch lesson content: ${response.statusText}`);
        const data = await response.text(); // Markdown content is plain text
        setLessonContent(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching lesson content:", err);
      } finally {
        setLoadingState(null);
      }
    };
    fetchLessonContent();
  }, [selectedGrade, selectedSubject, selectedLessonFile]);

  const handleSelectGrade = (grade: SelectionItem) => {
    setSelectedGrade(grade);
    setSelectedSubject(null);
    setSelectedLessonFile(null);
    setLessonContent(null);
  };

  const handleSelectSubject = (subject: SelectionItem) => {
    setSelectedSubject(subject);
    setSelectedLessonFile(null);
    setLessonContent(null);
  };

  const handleSelectLesson = (lessonFile: SelectionItem) => {
    setSelectedLessonFile(lessonFile);
  };

  const renderLoadingIndicator = (type: 'grades' | 'subjects' | 'lessons' | 'content') => {
    if (loadingState === type) {
      return <Loader2 className="animate-spin h-5 w-5 text-indigo-600 inline-block ml-2" />;
    }
    return null;
  };

  const renderColumn = (title: string, items: SelectionItem[], selectedItem: SelectionItem | null, handler: (item: SelectionItem) => void, loadingType: 'grades' | 'subjects' | 'lessons') => (
    <div className="flex-1 p-3 border-r border-gray-200 min-w-[200px] max-w-[300px] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-700 mb-2 sticky top-0 bg-gray-50 py-2">
        {title} {renderLoadingIndicator(loadingType)}
      </h3>
      {items.length === 0 && loadingState !== loadingType && <p className="text-sm text-gray-500">No {title.toLowerCase()} found.</p>}
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item.id}>
            <button
              onClick={() => handler(item)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm flex justify-between items-center
                          ${selectedItem?.id === item.id ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              {item.name}
              {selectedItem?.id === item.id && <ChevronRight className="h-4 w-4 text-indigo-600" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]"> {/* Adjust height based on header height */}
      <h2 className="text-2xl font-bold text-gray-800 p-4 border-b border-gray-200">My Learning</h2>

      {error && (
        <div className="m-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" /> {error}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Grade Levels Column */}
        {renderColumn("Grade Levels", gradeLevels, selectedGrade, handleSelectGrade, 'grades')}

        {/* Subjects Column - only show if a grade is selected */}
        {selectedGrade && renderColumn("Subjects", subjects, selectedSubject, handleSelectSubject, 'subjects')}

        {/* Lessons Column - only show if a subject is selected */}
        {selectedSubject && renderColumn("Lessons", lessons, selectedLessonFile, handleSelectLesson, 'lessons')}

        {/* Lesson Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {loadingState === 'content' && <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /> <span className="ml-2">Loading content...</span></div>}
          {!loadingState && !selectedLessonFile && !lessonContent && (
            <div className="text-center text-gray-500 pt-10">
              <BookOpen className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Select a grade, subject, and lesson to view its content.</p>
            </div>
          )}
          {lessonContent && (
            <article className="prose lg:prose-xl max-w-none">
              {/* DEV_NOTE: react-markdown will render the content.
                  Ensure Tailwind Typography plugin is set up for styling, or provide custom styles.
                  Example: className="prose prose-indigo max-w-none"
                  For now, using a basic article tag.
              */}
              <ReactMarkdown>{lessonContent}</ReactMarkdown>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};
