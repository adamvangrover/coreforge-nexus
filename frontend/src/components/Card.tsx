import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon?: React.ElementType; // Lucide icons are components (React.FC or similar)
  children: ReactNode;
  className?: string; // Optional additional className for the card itself
  titleClassName?: string; // Optional className for the title
  contentClassName?: string; // Optional className for the content area
}

export const Card: React.FC<CardProps> = ({
  title,
  icon: Icon,
  children,
  className = "",
  titleClassName = "",
  contentClassName = ""
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Card Header */}
      <div className={`p-4 sm:p-5 border-b border-gray-200 flex items-center space-x-3 ${titleClassName}`}>
        {Icon && <Icon className="h-6 w-6 text-indigo-600 shrink-0" />}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight">{title}</h3>
      </div>
      {/* Card Content */}
      <div className={`p-4 sm:p-5 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
