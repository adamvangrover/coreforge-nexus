import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LearningView } from './LearningView';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn();

// Mock react-markdown
jest.mock('react-markdown', () => (props: any) => {
  return <>{props.children}</>;
});

describe('LearningView', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('renders grade levels on mount', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ['Grade_1', 'Grade_2'],
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <LearningView />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/My Learning/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Grade 1')).toBeInTheDocument());
    expect(screen.getByText('Grade 2')).toBeInTheDocument();
  });

  test('renders subjects when grade is selected (via URL)', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ // Grade levels
        ok: true,
        json: async () => ['Grade_1'],
      })
      .mockResolvedValueOnce({ // Subjects
        ok: true,
        json: async () => ['Math', 'Science'],
      });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/learning/Grade_1']}>
          <Routes>
            <Route path="/learning/:gradeId" element={<LearningView />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(screen.getByRole('button', { name: /Math/i })).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Science/i })).toBeInTheDocument();
  });

  test('renders lesson content when lesson is selected (via URL)', async () => {
     (global.fetch as jest.Mock)
        .mockResolvedValueOnce({ ok: true, json: async () => ['Grade_1'] }) // Grades
        .mockResolvedValueOnce({ ok: true, json: async () => ['Math'] }) // Subjects
        .mockResolvedValueOnce({ ok: true, json: async () => ['Lesson_1.md'] }) // Lessons
        .mockResolvedValueOnce({ ok: true, text: async () => '# Lesson 1 Content' }); // Content

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/learning/Grade_1/Math/Lesson_1.md']}>
          <Routes>
               <Route path="/learning/:gradeId/:subjectId/:lessonId" element={<LearningView />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Check for text content since mock returns raw children (including #)
    await waitFor(() => expect(screen.getByText(/Lesson 1 Content/i)).toBeInTheDocument());
  });
});
