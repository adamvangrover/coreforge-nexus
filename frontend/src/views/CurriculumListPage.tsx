import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { CurriculumNodeData } from '../components/TreeNode'; // Re-use the node data type
import { BookOpen, Search, Layers, FileText } from 'lucide-react'; // Added Layers for grade/subject, FileText for lesson

// Matches backend LessonContent model
interface ApiLessonContent {
    title: string;
    path: string;
    content: string;
}

interface FlatListItem extends CurriculumNodeData {
    // Could add breadcrumbs or parent info if needed for display
    level: number; // To represent depth, can be used for styling or filtering
}

export const CurriculumListPage: React.FC = () => {
    const [fullStructure, setFullStructure] = useState<CurriculumNodeData[]>([]);
    const [flatList, setFlatList] = useState<FlatListItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedLessonContent, setSelectedLessonContent] = useState<ApiLessonContent | null>(null);
    const [loading, setLoading] = useState<'structure' | 'lessonContent' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentLessonTitle, setCurrentLessonTitle] = useState<string | null>(null);

    // Fetch full curriculum structure
    useEffect(() => {
        const fetchFullStructure = async () => {
            setLoading('structure');
            setError(null);
            try {
                const response = await fetch('/api/curriculum/full-structure');
                if (!response.ok) throw new Error(`Failed to fetch curriculum structure: ${response.statusText}`);
                const data: CurriculumNodeData[] = await response.json();
                setFullStructure(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(null);
            }
        };
        fetchFullStructure();
    }, []);

    // Flatten the tree structure for list display
    useEffect(() => {
        const newFlatList: FlatListItem[] = [];
        const flatten = (nodes: CurriculumNodeData[], level: number) => {
            nodes.forEach(node => {
                newFlatList.push({ ...node, level });
                if (node.children) {
                    flatten(node.children, level + 1);
                }
            });
        };
        flatten(fullStructure, 0);
        setFlatList(newFlatList);
    }, [fullStructure]);

    const filteredList = useMemo(() => {
        if (!searchTerm) return flatList;
        return flatList.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [flatList, searchTerm]);

    const handleLessonClick = async (lessonNode: CurriculumNodeData) => {
        if (lessonNode.type !== 'lesson' || !lessonNode.path) {
            // Only fetch content for lessons with a path
            setSelectedLessonContent(null); // Clear any existing content if a non-lesson is clicked
            setCurrentLessonTitle(null);
            return;
        }

        setLoading('lessonContent');
        setError(null);
        setSelectedLessonContent(null);
        setCurrentLessonTitle(lessonNode.name);

        try {
            const pathParts = lessonNode.path.split('/');
            if (pathParts.length < 3) throw new Error("Invalid lesson path format.");
            const [grade, subject, ...filenameParts] = pathParts;
            const filename = filenameParts.join('/');

            const response = await fetch(`/api/curriculum/lesson-content/${encodeURIComponent(grade)}/${encodeURIComponent(subject)}/${encodeURIComponent(filename)}`);
            if (!response.ok) throw new Error(`Failed to fetch lesson content for ${lessonNode.name}: ${response.statusText}`);
            const data: ApiLessonContent = await response.json();
            setSelectedLessonContent(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
            setCurrentLessonTitle(null);
        } finally {
            setLoading(null);
        }
    };

    const getItemIcon = (type: 'grade-level' | 'subject-area' | 'lesson') => {
        switch(type) {
            case 'grade-level': return <Layers size={18} className="text-blue-500" />;
            case 'subject-area': return <Layers size={18} className="text-green-500" />;
            case 'lesson': return <FileText size={18} className="text-indigo-500" />;
            default: return <FileText size={18} />;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-120px)]">
            {/* List Panel */}
            <div className="md:w-1/3 lg:w-1/4 h-full flex flex-col bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">Curriculum List</h2>
                <div className="relative mb-3">
                    <input
                        type="text"
                        placeholder="Search curriculum..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {loading === 'structure' && <p className="text-gray-500">Loading curriculum...</p>}
                {error && !filteredList.length && <p className="text-red-500">Error: {error}</p>}

                <div className="flex-grow overflow-y-auto text-sm">
                    {filteredList.map(item => (
                        <div
                            key={item.id}
                            onClick={() => handleLessonClick(item)}
                            style={{ paddingLeft: `${item.level * 15}px` }}
                            className={`flex items-center p-1.5 rounded-md cursor-pointer hover:bg-gray-100 ${item.type === 'lesson' ? 'font-medium text-indigo-700' : 'text-gray-700'}`}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && handleLessonClick(item)}
                        >
                            <span className="mr-2 shrink-0">{getItemIcon(item.type)}</span>
                            <span className="truncate">{item.name}</span>
                        </div>
                    ))}
                    {!loading && !filteredList.length && searchTerm && <p className="text-gray-500 p-2">No results for "{searchTerm}".</p>}
                    {!loading && !filteredList.length && !searchTerm && !error && <p className="text-gray-500 p-2">No curriculum items found.</p>}
                </div>
            </div>

            {/* Content Display Panel */}
            <div className="md:w-2/3 lg:w-3/4 h-full overflow-y-auto bg-white p-6 rounded-lg shadow">
                {loading === 'lessonContent' && (
                    <div className="text-center py-10"><p className="text-indigo-600 text-lg">Loading: {currentLessonTitle || 'Lesson'}...</p></div>
                )}
                {error && loading !== 'lessonContent' && <p className="text-red-500 p-4">Error: {error}</p>}

                {selectedLessonContent && loading !== 'lessonContent' && (
                    <>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 border-b pb-3">{selectedLessonContent.title}</h1>
                        <article className="prose prose-indigo lg:prose-xl max-w-none">
                            <ReactMarkdown>{selectedLessonContent.content}</ReactMarkdown>
                        </article>
                    </>
                )}
                {!selectedLessonContent && !loading && !error && (
                    <div className="text-center text-gray-500 pt-10">
                        <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-xl">Select a lesson from the list to view its content.</p>
                        <p className="text-sm mt-1">(Non-lesson items like grade levels or subject areas won't display content here.)</p>
                    </div>
                )}
            </div>
        </div>
    );
};
