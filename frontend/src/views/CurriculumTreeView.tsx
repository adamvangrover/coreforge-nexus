import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { TreeNode, CurriculumNodeData } from '../components/TreeNode'; // TreeNode component

// Matches backend LessonContent model
interface ApiLessonContent {
    title: string;
    path: string;
    content: string;
}

export const CurriculumTreeView: React.FC = () => {
    const [treeData, setTreeData] = useState<CurriculumNodeData[]>([]);
    const [selectedLessonContent, setSelectedLessonContent] = useState<ApiLessonContent | null>(null);
    const [loading, setLoading] = useState<'tree' | 'lessonContent' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentLessonTitle, setCurrentLessonTitle] = useState<string | null>(null);


    // Fetch full curriculum structure
    useEffect(() => {
        const fetchTreeData = async () => {
            setLoading('tree');
            setError(null);
            try {
                const response = await fetch('/api/curriculum/full-structure');
                if (!response.ok) {
                    throw new Error(`Failed to fetch curriculum structure: ${response.statusText} (status: ${response.status})`);
                }
                const data: CurriculumNodeData[] = await response.json();
                setTreeData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
                console.error("Error fetching tree data:", err);
            } finally {
                setLoading(null);
            }
        };
        fetchTreeData();
    }, []);

    const handleLessonClick = async (lessonNode: CurriculumNodeData) => {
        if (!lessonNode.path) {
            setError("Lesson path is missing.");
            return;
        }
        setLoading('lessonContent');
        setError(null);
        setSelectedLessonContent(null); // Clear previous content
        setCurrentLessonTitle(lessonNode.name); // Set title while loading

        try {
            // The lessonNode.path is expected to be "GradeLevel/SubjectArea/Filename.md"
            const pathParts = lessonNode.path.split('/');
            if (pathParts.length < 3) throw new Error("Invalid lesson path format for API call.");

            const grade = pathParts[0];
            const subject = pathParts[1];
            const filename = pathParts.slice(2).join('/'); // Handle cases where filename might have slashes (though not in current structure)

            const response = await fetch(`/api/curriculum/lesson-content/${encodeURIComponent(grade)}/${encodeURIComponent(subject)}/${encodeURIComponent(filename)}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch lesson content for ${lessonNode.name}: ${response.statusText} (status: ${response.status})`);
            }
            const data: ApiLessonContent = await response.json();
            setSelectedLessonContent(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
            console.error("Error fetching lesson content:", err);
            setCurrentLessonTitle(null); // Clear title on error
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-120px)]"> {/* Adjust height based on header/footer */}
            {/* Tree View Panel (Scrollable) */}
            <div className="md:w-1/3 lg:w-1/4 h-full overflow-y-auto bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">Curriculum Explorer</h2>
                {loading === 'tree' && <p className="text-gray-500">Loading curriculum tree...</p>}
                {error && !treeData.length && <p className="text-red-500">Error loading tree: {error}</p>}
                {!loading && !treeData.length && !error && <p className="text-gray-500">No curriculum structure found.</p>}
                {treeData.map(rootNode => (
                    <TreeNode key={rootNode.id} node={rootNode} onLessonClick={handleLessonClick} level={0} />
                ))}
            </div>

            {/* Content Display Panel (Scrollable) */}
            <div className="md:w-2/3 lg:w-3/4 h-full overflow-y-auto bg-white p-6 rounded-lg shadow">
                {loading === 'lessonContent' && (
                    <div className="text-center py-10">
                        <p className="text-indigo-600 text-lg">Loading lesson: {currentLessonTitle || 'Content'}...</p>
                        {/* DEV_NOTES: Consider a more sophisticated loading skeleton here */}
                    </div>
                )}
                {error && loading !== 'lessonContent' && <p className="text-red-500 p-4">Error displaying content: {error}</p>}

                {selectedLessonContent && loading !== 'lessonContent' && (
                    <>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-3">{selectedLessonContent.title}</h1>
                        <article className="prose prose-indigo lg:prose-xl max-w-none">
                            {/* DEV_NOTES: Add remarkPlugins={[remarkGfm]} to ReactMarkdown for full GFM support if needed */}
                            <ReactMarkdown>{selectedLessonContent.content}</ReactMarkdown>
                        </article>
                    </>
                )}
                {!selectedLessonContent && !loading && !error && (
                    <div className="text-center text-gray-500 pt-10">
                        <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-xl">Select a lesson from the tree to view its content.</p>
                    </div>
                )}
            </div>
             {/* DEV_NOTES:
                - Add GFM support for markdown if required.
                - Improve loading states (skeletons).
                - Enhance error messages.
                - Ensure @tailwindcss/typography is set up for prose styles.
                - Accessibility: keyboard navigation for tree, ARIA attributes.
            */}
        </div>
    );
};
