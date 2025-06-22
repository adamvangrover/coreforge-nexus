import React from 'react';

// DEV_NOTE: This is a placeholder for the Resources view.
// It will provide access to glossaries, subject-specific tools, help guides, etc.

export const ResourcesView: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800">Resources</h1>
      <p className="mt-2 text-gray-600">
        Welcome to the Resources section. Here you will find helpful tools, guides, and supplementary materials.
      </p>
      {/* DEV_NOTE: Future content will include:
          - Glossary
          - Subject-specific tools (e.g., calculator, periodic table)
          - Platform Help Guides / FAQs
          - Study Skills Tips
      */}
    </div>
  );
};
