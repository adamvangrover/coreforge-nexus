import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
// DEV_NOTES: Consider adding 'remark-gfm' for GitHub Flavored Markdown support if needed.
// import remarkGfm from 'remark-gfm';

// --- Types for API data ---
interface ApiLessonFile {
    name: string;
    path: string; // e.g., "High_9-12/Mathematics/Algebra1_NYSNextGen.md"
}

interface ApiLessonContent {
    title: string;
    path: string;
    content: string;
}

export const LearningView: React.FC = () => {
    const [gradeLevels, setGradeLevels] = useState<string[]>([]);
    const [selectedGradeLevel, setSelectedGradeLevel] = useState<string | null>(null);

    const [subjectAreas, setSubjectAreas] = useState<string[]>([]);
    const [selectedSubjectArea, setSelectedSubjectArea] = useState<string | null>(null);

    const [lessons, setLessons] = useState<ApiLessonFile[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<ApiLessonFile | null>(null);

    const [lessonContent, setLessonContent] = useState<ApiLessonContent | null>(null);

    const [loading, setLoading] = useState<string | null>(null); // To indicate what's loading
    const [error, setError] = useState<string | null>(null);

    // Fetch Grade Levels
    useEffect(() => {
        const fetchGradeLevels = async () => {
            setLoading("gradeLevels");
            setError(null);
            try {
                const response = await fetch('/api/curriculum/grade-levels');
                if (!response.ok) throw new Error(`Failed to fetch grade levels: ${response.statusText}`);
                const data: string[] = await response.json();
                setGradeLevels(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(null);
            }
        };
        fetchGradeLevels();
    }, []);

    // Fetch Subject Areas when Grade Level changes
    useEffect(() => {
        if (!selectedGradeLevel) {
            setSubjectAreas([]);
            setSelectedSubjectArea(null);
            return;
        }
        const fetchSubjectAreas = async () => {
            setLoading("subjectAreas");
            setError(null);
            setLessons([]); // Clear lessons when subject area changes
            setSelectedLesson(null);
            setLessonContent(null);
            try {
                const response = await fetch(`/api/curriculum/subject-areas/${encodeURIComponent(selectedGradeLevel)}`);
                if (!response.ok) throw new Error(`Failed to fetch subject areas for ${selectedGradeLevel}: ${response.statusText}`);
                const data: string[] = await response.json();
                setSubjectAreas(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(null);
            }
        };
        fetchSubjectAreas();
    }, [selectedGradeLevel]);

    // Fetch Lessons when Subject Area changes
    useEffect(() => {
        if (!selectedGradeLevel || !selectedSubjectArea) {
            setLessons([]);
            setSelectedLesson(null);
            return;
        }
        const fetchLessons = async () => {
            setLoading("lessons");
            setError(null);
            setLessonContent(null); // Clear content when lesson list changes
            try {
                const response = await fetch(`/api/curriculum/lessons/${encodeURIComponent(selectedGradeLevel)}/${encodeURIComponent(selectedSubjectArea)}`);
                if (!response.ok) throw new Error(`Failed to fetch lessons for ${selectedGradeLevel}/${selectedSubjectArea}: ${response.statusText}`);
                const data: ApiLessonFile[] = await response.json();
                setLessons(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(null);
            }
        };
        fetchLessons();
    }, [selectedGradeLevel, selectedSubjectArea]);

    // Fetch Lesson Content when Lesson is selected
    useEffect(() => {
        if (!selectedLesson) {
            setLessonContent(null);
            return;
        }
        const fetchLessonContent = async () => {
            setLoading("lessonContent");
            setError(null);
            try {
                // Path for lesson content is constructed from selectedLesson.path which should be like "Grade/Subject/File.md"
                // The API endpoint is /api/curriculum/lesson-content/{grade_level}/{subject_area}/{lesson_filename}
                const pathParts = selectedLesson.path.split('/');
                if (pathParts.length < 3) throw new Error("Invalid lesson path format.");
                const [grade, subject, ...filenameParts] = pathParts;
                const filename = filenameParts.join('/'); // In case filename had slashes, though API expects it as last part

                const response = await fetch(`/api/curriculum/lesson-content/${encodeURIComponent(grade)}/${encodeURIComponent(subject)}/${encodeURIComponent(filename)}`);
                if (!response.ok) throw new Error(`Failed to fetch lesson content for ${selectedLesson.name}: ${response.statusText}`);
                const data: ApiLessonContent = await response.json();
                setLessonContent(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(null);
            }
        };
        fetchLessonContent();
    }, [selectedLesson]);

    const handleResetSelections = () => {
        setSelectedGradeLevel(null);
        setSelectedSubjectArea(null);
        setSelectedLesson(null);
        setSubjectAreas([]);
        setLessons([]);
        setLessonContent(null);
        setError(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Learning Zone</h1>
                <button
                    onClick={handleResetSelections}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Reset Selections
                </button>
            </div>

            {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">{error}</div>}

            {/* Selection UI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Grade Level Selection */}
                <div>
                    <label htmlFor="gradeLevelSelect" className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                    <select
                        id="gradeLevelSelect"
                        value={selectedGradeLevel || ""}
                        onChange={(e) => setSelectedGradeLevel(e.target.value || null)}
                        disabled={loading === "gradeLevels"}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                    >
                        <option value="">-- Select Grade Level --</option>
                        {gradeLevels.map(gl => <option key={gl} value={gl}>{gl.replace(/_/g, ' ')}</option>)}
                    </select>
                </div>

                {/* Subject Area Selection */}
                <div>
                    <label htmlFor="subjectAreaSelect" className="block text-sm font-medium text-gray-700 mb-1">Subject Area</label>
                    <select
                        id="subjectAreaSelect"
                        value={selectedSubjectArea || ""}
                        onChange={(e) => setSelectedSubjectArea(e.target.value || null)}
                        disabled={!selectedGradeLevel || loading === "subjectAreas"}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                    >
                        <option value="">-- Select Subject Area --</option>
                        {subjectAreas.map(sa => <option key={sa} value={sa}>{sa.replace(/([A-Z])/g, ' $1').trim()}</option>)}
                    </select>
                </div>

                {/* Lesson Selection */}
                <div>
                    <label htmlFor="lessonSelect" className="block text-sm font-medium text-gray-700 mb-1">Lesson</label>
                    <select
                        id="lessonSelect"
                        value={selectedLesson?.path || ""}
                        onChange={(e) => {
                            const lessonPath = e.target.value;
                            setSelectedLesson(lessons.find(l => l.path === lessonPath) || null);
                        }}
                        disabled={!selectedSubjectArea || loading === "lessons"}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                    >
                        <option value="">-- Select Lesson --</option>
                        {lessons.map(l => <option key={l.path} value={l.path}>{l.name.replace('.md', '').replace(/_/g, ' ')}</option>)}
                    </select>
                </div>
            </div>

            {loading && <div className="text-center py-4 text-indigo-600">Loading {loading}...</div>}

            {/* Lesson Content Display */}
            {selectedLesson && lessonContent && (
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{lessonContent.title.replace('.md', '').replace(/_/g, ' ')}</h2>
                    <article className="prose prose-indigo lg:prose-xl max-w-none">
                        {/* DEV_NOTES: Add remarkPlugins={[remarkGfm]} to ReactMarkdown for full GFM support if needed */}
                        <ReactMarkdown>{lessonContent.content}</ReactMarkdown>
                    </article>
                </div>
            )}

            {!selectedLesson && !loading && selectedGradeLevel && selectedSubjectArea && lessons.length === 0 && (
                <div className="p-4 text-center text-gray-500">No lessons found for the selected criteria.</div>
            )}
             {!selectedLesson && !loading && selectedGradeLevel && selectedSubjectArea && lessons.length > 0 && (
                <div className="p-4 text-center text-gray-500">Please select a lesson to view its content.</div>
            )}
            {!selectedGradeLevel && !loading && (
                 <div className="p-4 text-center text-gray-500">Please select a grade level to begin.</div>
            )}

            {/* DEV_NOTES:
                - UI can be improved with better loading indicators (skeletons?).
                - Error handling per fetch could be more granular.
                - Consider using a state management library for more complex scenarios (though useState is fine here).
                - The 'prose' classes from @tailwindcss/typography are used for Markdown styling. Ensure this plugin is installed and configured if not already.
                - Add accessibility improvements (ARIA attributes, focus management).
            */}
        </div>
    );
};
