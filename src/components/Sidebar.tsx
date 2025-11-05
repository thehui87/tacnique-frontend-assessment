// Sidebar.tsx
import React, { useState } from "react";
import { SearchInput } from "./SearchInput";
import { CollapsibleSection } from "./CollapsibleSection";

const titles = [
  "Application Type",
  "Jobs",
  "CRM",
  "Profile Details",
  "Source",
  "Responsibility",
  "Pipeline Tasks",
  "Education",
];

interface SidebarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  fullTextSearch: boolean;
  onFullTextToggle: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchValue,
  onSearchChange,
  fullTextSearch,
  onFullTextToggle,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <aside className="w-[248px] bg-[#f7f8f7] min-h-screen px-6 py-6">
      {/* Search Input */}
      <SearchInput value={searchValue} onChange={onSearchChange} />
      {/* Full Text Search Toggle */}
      <div className="mt-3">
        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="fullTextSearch"
              checked={fullTextSearch}
              onChange={e => onFullTextToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-[50px] h-[25px] bg-[#ccd4d1] rounded-full peer peer-checked:bg-[#047957] transition-colors duration-200 ease-in-out relative">
              <div
                className={`absolute left-0 top-0 w-[25px] h-[25px] bg-white border-[3px] rounded-full transition-transform duration-200 ease-in-out ${
                  fullTextSearch
                    ? "translate-x-[25px] border-[#047957]"
                    : "translate-x-0 border-[#ccd4d1]"
                }`}
              ></div>
            </div>
          </label>
          <label
            htmlFor="fullTextSearch"
            className="text-[13px] font-medium text-[#15372c] cursor-pointer leading-[19.5px]"
          >
            Full Text Search
          </label>
        </div>
        <p className="text-[11.6px] text-[#909090] font-light leading-[3] mt-1">
          (Includes resumes and notes)
        </p>
      </div>
      {/* Sort Dropdown */}
      <div className="mt-4 relative w-auto">
        {/* Dropdown Header */}
        <div
          className="w-full px-3 py-2 flex items-center justify-between border border-[#e1e1e1] bg-white rounded text-[14px] text-[#333333] cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className="truncate">Last Activity (new to old)</span>
          <svg
            className={`w-3.5 h-3.5 text-[#909090] shrink-0 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute mt-1 w-full bg-white border border-[#e1e1e1] rounded shadow-md z-10">
            <div className="py-2 text-[14px] text-[#333333] cursor-pointer hover:bg-gray-100 px-3">
              Option 1
            </div>
            <div className="py-2 text-[14px] text-[#333333] cursor-pointer hover:bg-gray-100 px-3">
              Option 2
            </div>
            <div className="py-2 text-[14px] text-[#333333] cursor-pointer hover:bg-gray-100 px-3">
              Option 3
            </div>
          </div>
        )}
      </div>

      {/* Collapsible Filter Sections */}
      <div className="mt-6">
        {titles.map(t => (
          <CollapsibleSection key={t} title={t}>
            <div className="pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" />
                <span>Example option</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <input type="checkbox" />
                <span>Example option</span>
              </label>
            </div>
          </CollapsibleSection>
        ))}
      </div>
      {/* Reset Filters */}
      <button className="mt-6 w-full px-4 py-2 text-[#3574d6] text-[13.9px] font-light flex items-center justify-center gap-2 hover:underline">
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_8_1560)">
            <path
              d="M1.59229 7.23169L4.19755 11.1396L7.23702 7.6659"
              stroke="#2975CA"
              strokeWidth="1.15789"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.20243 11.1395C3.78038 5.58164 7.58927 1.75972 12.1433 1.59212C16.6964 1.42451 20.5244 4.97983 20.6903 9.53296C20.8605 14.087 17.3034 17.9141 12.7503 18.0808"
              stroke="#2975CA"
              strokeWidth="1.15789"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_8_1560">
              <rect width="22" height="19.6842" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>Reset Filters</span>
      </button>
    </aside>
  );
};
