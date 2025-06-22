import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like .toBeVisible()
import { TreeNode, CurriculumNodeData } from './TreeNode';
import { BookOpen, Folder, ChevronRight, ChevronDown } from 'lucide-react';

// Mock lucide-react icons
jest.mock('lucide-react', () => {
    const originalModule = jest.requireActual('lucide-react');
    return {
        ...originalModule,
        BookOpen: () => <svg data-testid="icon-bookopen" />,
        Folder: () => <svg data-testid="icon-folder" />,
        ChevronRight: () => <svg data-testid="icon-chevronright" />,
        ChevronDown: () => <svg data-testid="icon-chevrondown" />,
    };
});

describe('TreeNode Component', () => {
    const mockLessonClick = jest.fn();

    const lessonNode: CurriculumNodeData = {
        id: 'lesson1',
        name: 'Introduction to React',
        type: 'lesson',
        path: 'course1/module1/lesson1.md',
    };

    const folderNodeWithChildren: CurriculumNodeData = {
        id: 'folder1',
        name: 'Course 1',
        type: 'subject-area',
        children: [lessonNode],
    };

    const emptyFolderNode: CurriculumNodeData = {
        id: 'folder2',
        name: 'Empty Course',
        type: 'subject-area',
        children: [], // Explicitly empty
    };

    const folderNodeNoChildrenProperty: CurriculumNodeData = {
        id: 'folder3',
        name: 'Course No Children Prop',
        type: 'grade-level',
        // children property is undefined or null
    };


    beforeEach(() => {
        mockLessonClick.mockClear();
    });

    test('renders lesson node correctly', () => {
        render(<TreeNode node={lessonNode} onLessonClick={mockLessonClick} level={0} />);
        expect(screen.getByText('Introduction to React')).toBeInTheDocument();
        expect(screen.getByTestId('icon-bookopen')).toBeInTheDocument();
        // No chevron for lessons
        expect(screen.queryByTestId('icon-chevronright')).not.toBeInTheDocument();
        expect(screen.queryByTestId('icon-chevrondown')).not.toBeInTheDocument();
    });

    test('renders folder node with children (closed by default for level > 0)', () => {
        render(<TreeNode node={folderNodeWithChildren} onLessonClick={mockLessonClick} level={1} />);
        expect(screen.getByText('Course 1')).toBeInTheDocument();
        expect(screen.getByTestId('icon-folder')).toBeInTheDocument();
        expect(screen.getByTestId('icon-chevronright')).toBeInTheDocument(); // Starts closed
        // Children should not be visible initially if closed
        expect(screen.queryByText('Introduction to React')).not.toBeInTheDocument();
    });

    test('renders folder node with children (open by default for level 0)', () => {
        render(<TreeNode node={folderNodeWithChildren} onLessonClick={mockLessonClick} level={0} />);
        expect(screen.getByText('Course 1')).toBeInTheDocument();
        expect(screen.getByTestId('icon-folder')).toBeInTheDocument();
        expect(screen.getByTestId('icon-chevrondown')).toBeInTheDocument(); // Starts open
        expect(screen.getByText('Introduction to React')).toBeVisible();
    });

    test('toggles open/close state for folder with children on click', () => {
        render(<TreeNode node={folderNodeWithChildren} onLessonClick={mockLessonClick} level={1} />);
        const folderDiv = screen.getByText('Course 1').closest('div[role="button"]');
        expect(folderDiv).toBeInTheDocument();

        // Initial state (closed for level 1)
        expect(screen.getByTestId('icon-chevronright')).toBeInTheDocument();
        expect(screen.queryByText('Introduction to React')).not.toBeInTheDocument();

        // Click to open
        if (folderDiv) fireEvent.click(folderDiv);
        expect(screen.getByTestId('icon-chevrondown')).toBeInTheDocument();
        expect(screen.getByText('Introduction to React')).toBeVisible();

        // Click to close
        if (folderDiv) fireEvent.click(folderDiv);
        expect(screen.getByTestId('icon-chevronright')).toBeInTheDocument();
        // For some reason, queryByText still finds it if it was ever rendered.
        // Better to check for visibility or absence based on how component handles it.
        // The component re-renders children, so it should not be in document if closed.
        expect(screen.queryByText('Introduction to React')).not.toBeInTheDocument();
    });

    test('calls onLessonClick when a lesson node is clicked', () => {
        render(<TreeNode node={lessonNode} onLessonClick={mockLessonClick} level={0} />);
        const lessonDiv = screen.getByText('Introduction to React').closest('div[role="button"]');
        expect(lessonDiv).toBeInTheDocument();
        if (lessonDiv) fireEvent.click(lessonDiv);
        expect(mockLessonClick).toHaveBeenCalledTimes(1);
        expect(mockLessonClick).toHaveBeenCalledWith(lessonNode);
    });

    test('does not call onLessonClick when a folder node is clicked (it toggles instead)', () => {
        render(<TreeNode node={folderNodeWithChildren} onLessonClick={mockLessonClick} level={0} />);
        const folderDiv = screen.getByText('Course 1').closest('div[role="button"]');
        expect(folderDiv).toBeInTheDocument();
        if (folderDiv) fireEvent.click(folderDiv);
        expect(mockLessonClick).not.toHaveBeenCalled();
    });

    test('renders empty folder node correctly (no chevron, folder icon)', () => {
        render(<TreeNode node={emptyFolderNode} onLessonClick={mockLessonClick} level={0} />);
        expect(screen.getByText('Empty Course')).toBeInTheDocument();
        expect(screen.getByTestId('icon-folder')).toBeInTheDocument();
        expect(screen.queryByTestId('icon-chevronright')).not.toBeInTheDocument();
        expect(screen.queryByTestId('icon-chevrondown')).not.toBeInTheDocument();
    });

    test('renders folder node with no children property correctly', () => {
        render(<TreeNode node={folderNodeNoChildrenProperty} onLessonClick={mockLessonClick} level={0} />);
        expect(screen.getByText('Course No Children Prop')).toBeInTheDocument();
        expect(screen.getByTestId('icon-folder')).toBeInTheDocument();
        expect(screen.queryByTestId('icon-chevronright')).not.toBeInTheDocument();
    });
});

// DEV_NOTES:
// - These tests cover basic rendering and interaction for TreeNode.
// - More complex scenarios, like deeply nested trees or performance for very large trees, are not covered.
// - Styling aspects (indentation) are not directly tested but assumed to be handled by CSS/inline styles.
// - To run: `npm test TreeNode.test.tsx` (or `yarn test TreeNode.test.tsx`) in the `frontend/` directory.
//   Ensure Jest is configured correctly in package.json (usually via react-scripts).
//
// The queryByText(...).not.toBeInTheDocument() might be tricky if the element is merely hidden by CSS.
// If children are conditionally rendered (i.e., not in DOM when closed), then .not.toBeInTheDocument() is correct.
// The TreeNode component conditionally renders children: `{hasChildren && isOpen && (...) }` so this is correct.
//
// One test for level 0 folder (folderNodeWithChildren) expects it to be open by default.
// The logic is `useState(level < 1)`. For level 0, this is true. For level 1, it's false. This looks correct.
//
// For the case `expect(screen.queryByText('Introduction to React')).not.toBeInTheDocument();` after closing,
// it's important that the child component <TreeNode key={childNode.id} node={childNode} ... /> is unmounted.
// React's conditional rendering `{isOpen && ...}` ensures this.
//
// The `folderNodeNoChildrenProperty` test is important because `node.children && node.children.length > 0`
// needs to handle `node.children` being `undefined` or `null`.
// `hasChildren` is `node.children && node.children.length > 0;`
// If `node.children` is `null` or `undefined`, `node.children` is falsy, so `hasChildren` is false. This is correct.
// The `TreeNode` component uses `node.children?.map(...)` which correctly handles `null` or `undefined` `children`.
// So, these cases should render as if there are no children (no chevron).
// The icon logic `IconToRender = Folder;` for non-lessons is also correct.
// This looks good.
