/**
 * CollapsibleSection Component - SKELETON/STARTING POINT
 *
 * This is an incomplete component provided as a reference.
 * You need to implement the expand/collapse functionality.
 *
 * Requirements:
 * - Should expand/collapse when clicked
 * - Chevron should rotate 90 degrees when collapsed (point right) vs expanded (point down)
 * - Should have proper border styling
 * - Children should only show when expanded
 *
 * Design specs:
 * - Border: border-b border-[#e1e1e1]
 * - Button padding: py-3
 * - Font: text-[14px] font-medium text-[#15372c] leading-[19.5px]
 * - Chevron size: w-3.5 h-3.5
 * - Hover: hover:bg-gray-50
 */

import React, { useState } from "react";
import type { ReactNode } from "react";

interface CollapsibleSectionProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#e1e1e1]" id={id}>
      <button
        type="button"
        className="w-full flex items-center justify-between py-3 text-[14px] font-medium text-[#15372c] hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="leading-[19.5px]">{title}</span>
        <svg
          // className="w-3.5 h-3.5 transition-transform"
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-90" : "rotate-0"}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      {isOpen && children && (
        <div className="pb-3 px-2" aria-hidden={!isOpen}>
          {children}
        </div>
      )}
    </div>
  );
};
