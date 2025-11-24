import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Loader2, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useParams, useNavigate } from 'react-router-dom';

// DEV_NOTE: Base API URL - should be in an env variable in a real app
const API_BASE_URL = '/api/v1/curriculum';

interface SelectionItem {
  id: string;
  name: string;
}

export const LearningView: React.FC = () => {
  const { gradeId, subjectId, lessonId } = useParams<{ gradeId: string; subjectId: string; lessonId: string }>();
  const navigate = useNavigate();

  const [gradeLevels, setGradeLevels] = useState<SelectionItem[]>([]);
  const [subjects, setSubjects] = useState<SelectionItem[]>([]);
  const [lessons, setLessons] = useState<SelectionItem[]>([]);

  const [lessonContent, setLessonContent] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<'grades' | 'subjects' | 'lessons' | 'content' | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper to convert IDs to names
  const formatName = (id: string) => id.replace(/_/g, ' ').replace(/\.md$/, '');

  // 1. Fetch Grade Levels (Always)
  useEffect(() => {
    const fetchGradeLevels = async () => {
      setLoadingState('grades');
      try {
        const response = await fetch(`${API_BASE_URL}/grade-levels`);
        if (!response.ok) throw new Error(`Failed to fetch grade levels`);
        const data: string[] = await response.json();
        setGradeLevels(data.map(g => ({ id: g, name: formatName(g) })));
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching grade levels:", err);
      } finally {
        setLoadingState(null);
      }
    };
    fetchGradeLevels();
  }, []);

  // 2. Fetch Subjects when gradeId is present
  useEffect(() => {
    if (!gradeId) {
      setSubjects([]);
      return;
    }
    const fetchSubjects = async () => {
      setLoadingState('subjects');
      setSubjects([]);
      try {
        const response = await fetch(`${API_BASE_URL}/${gradeId}/subjects`);
        if (response.status === 404) {
             setError("Grade level not found.");
             return;
        }
        if (!response.ok) throw new Error(`Failed to fetch subjects`);
        const data: string[] = await response.json();
        setSubjects(data.map(s => ({ id: s, name: formatName(s) })));
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching subjects:", err);
      } finally {
        setLoadingState(null);
      }
    };
    fetchSubjects();
  }, [gradeId]);

  // 3. Fetch Lessons when subjectId is present
  useEffect(() => {
    if (!gradeId || !subjectId) {
      setLessons([]);
      return;
    }
    const fetchLessons = async () => {
      setLoadingState('lessons');
      setLessons([]);
      try {
        const response = await fetch(`${API_BASE_URL}/${gradeId}/${subjectId}/lessons`);
        if (response.status === 404) {
             setError("Subject not found.");
             return;
        }
        if (!response.ok) throw new Error(`Failed to fetch lessons`);
        const data: string[] = await response.json();
        setLessons(data.map(l => ({ id: l, name: formatName(l) })));
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching lessons:", err);
      } finally {
        setLoadingState(null);
      }
    };
    fetchLessons();
  }, [gradeId, subjectId]);

  // 4. Fetch Content when lessonId is present
  useEffect(() => {
    if (!gradeId || !subjectId || !lessonId) {
      setLessonContent(null);
      return;
    }
    const fetchContent = async () => {
      setLoadingState('content');
      setLessonContent(null);
      try {
        // Try exact match first
        let response = await fetch(`${API_BASE_URL}/${gradeId}/${subjectId}/${lessonId}`);

        // If 404, try appending .md (if not present) as a fallback,
        // in case URL comes from a place that stripped it but file system needs it.
        if (response.status === 404 && !lessonId.endsWith('.md')) {
            const retryResponse = await fetch(`${API_BASE_URL}/${gradeId}/${subjectId}/${lessonId}.md`);
            if (retryResponse.ok) {
                response = retryResponse;
            }
        }

        if (response.status === 404) {
             setError("Lesson content not found.");
             return;
        }
        if (!response.ok) throw new Error(`Failed to fetch content`);

        const data = await response.text();
        setLessonContent(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching lesson content:", err);
      } finally {
        setLoadingState(null);
      }
    };
    fetchContent();
  }, [gradeId, subjectId, lessonId]);


  const handleSelectGrade = (item: SelectionItem) => {
    setError(null);
    navigate(`/learning/${item.id}`);
  };

  const handleSelectSubject = (item: SelectionItem) => {
    setError(null);
    navigate(`/learning/${gradeId}/${item.id}`);
  };

  const handleSelectLesson = (item: SelectionItem) => {
    setError(null);
    navigate(`/learning/${gradeId}/${subjectId}/${item.id}`);
  };

  const renderLoadingIndicator = (type: string) => {
    if (loadingState === type) {
      return <Loader2 className="animate-spin h-5 w-5 text-indigo-600 inline-block ml-2" />;
    }
    return null;
  };

  const renderColumn = (
      title: string,
      items: SelectionItem[],
      selectedId: string | undefined,
      handler: (item: SelectionItem) => void,
      loadingType: string
  ) => (
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
                          ${selectedId === item.id || (title === "Lessons" && selectedId === item.id.replace('.md','')) ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              {item.name}
              {(selectedId === item.id || (title === "Lessons" && selectedId === item.id.replace('.md',''))) && <ChevronRight className="h-4 w-4 text-indigo-600" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <h2 className="text-2xl font-bold text-gray-800 p-4 border-b border-gray-200">My Learning</h2>

      {error && (
        <div className="m-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" /> {error}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Grade Levels Column */}
        {renderColumn("Grade Levels", gradeLevels, gradeId, handleSelectGrade, 'grades')}

        {/* Subjects Column */}
        {gradeId && renderColumn("Subjects", subjects, subjectId, handleSelectSubject, 'subjects')}

        {/* Lessons Column */}
        {subjectId && renderColumn("Lessons", lessons, lessonId, handleSelectLesson, 'lessons')}

        {/* Lesson Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white">
          {loadingState === 'content' && <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /> <span className="ml-2">Loading content...</span></div>}

          {!loadingState && !lessonId && (
            <div className="text-center text-gray-500 pt-10">
              <BookOpen className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Select a grade, subject, and lesson to view its content.</p>
            </div>
          )}

          {lessonContent && (
            <article className="prose lg:prose-xl max-w-none">
                {/*
                    DEV_NOTE: Frontmatter is at the top of the file.
                    ReactMarkdown might render it as a horizontal rule + table or similar.
                    Ideally, we should parse it out, but for now we display it or let it render.
                    If we want to hide it or display it nicely, we'd parse it here.
                    The requirement was to update the Static Browser to parse Frontmatter,
                    but for React App it just says "Fetch lesson content".
                    However, showing raw frontmatter is ugly.
                    I will try to strip it for display or let it be.
                    Given "Refactor... Remove hardcoded/mock data", I'll just render it for now.
                */}
              <ReactMarkdown>{lessonContent}</ReactMarkdown>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};
