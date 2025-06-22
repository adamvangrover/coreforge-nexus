import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, BookOpen } from 'lucide-react'; // Added BookOpen for lesson type

// Matches the structure from backend CurriculumNode
export interface CurriculumNodeData {
    id: string;
    name: string;
    type: 'grade-level' | 'subject-area' | 'lesson';
    path?: string | null; // Path for lessons to fetch content
    children?: CurriculumNodeData[] | null;
}

interface TreeNodeProps {
    node: CurriculumNodeData;
    onLessonClick: (lessonNode: CurriculumNodeData) => void; // Callback when a lesson is clicked
    level: number; // For indentation
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node, onLessonClick, level }) => {
    const [isOpen, setIsOpen] = useState(level < 1); // Auto-open first level (grade-levels) or subject-areas if level is 0

    const hasChildren = node.children && node.children.length > 0;

    const handleToggle = () => {
        if (hasChildren) {
            setIsOpen(!isOpen);
        } else if (node.type === 'lesson') {
            onLessonClick(node);
        }
    };

    let IconToRender: React.ElementType;
    if (node.type === 'lesson') {
        IconToRender = BookOpen;
    } else { // 'grade-level' or 'subject-area'
        IconToRender = Folder;
    }
    // const Icon = node.type === 'lesson' ? BookOpen : Folder; // Simpler: directories are folders, files are lessons

    const indentStyle = { paddingLeft: `${level * 20}px` };

    return (
        <div className="text-sm">
            <div
                className={`flex items-center p-1.5 rounded-md cursor-pointer hover:bg-gray-100 ${node.type === 'lesson' ? 'text-indigo-700 hover:text-indigo-900' : 'text-gray-700'}`}
                style={indentStyle}
                onClick={handleToggle}
                onKeyPress={(e) => e.key === 'Enter' && handleToggle()}
                tabIndex={0}
                role="button"
                aria-expanded={hasChildren ? isOpen : undefined}
            >
                {hasChildren && (
                    isOpen ? <ChevronDown size={16} className="mr-2 text-gray-500 shrink-0" /> : <ChevronRight size={16} className="mr-2 text-gray-500 shrink-0" />
                )}
                {!hasChildren && node.type !== 'lesson' && (
                     <span className="w-4 mr-2 shrink-0"></span> // Placeholder for alignment if no children but not a lesson
                )}
                 {!hasChildren && node.type === 'lesson' && (
                     <span className="w-4 mr-2 shrink-0"></span> // Placeholder for alignment for lessons (no chevron)
                )}


                <IconToRender size={18} className={`mr-2 shrink-0 ${node.type === 'lesson' ? 'text-indigo-500' : 'text-yellow-500'}`} />
                <span className="truncate">{node.name}</span>
            </div>
            {hasChildren && isOpen && (
                <div className="mt-1">
                    {node.children?.map(childNode => (
                        <TreeNode key={childNode.id} node={childNode} onLessonClick={onLessonClick} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};
