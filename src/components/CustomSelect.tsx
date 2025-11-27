import { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function CustomSelect({ options, value, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const selectedLabel = options.find(o => o.value === value)?.label || "Select...";

  return (
    <div className="relative w-60" ref={selectRef}>
      {/* Dropdown Header */}
      <div
        className="w-[210px] px-2 py-2 flex items-center justify-between border border-[#e1e1e1] bg-white rounded text-[14px] text-[#333333] cursor-pointer"
        onClick={() => setOpen(prev => !prev)}
      >
        <span className="truncate">{selectedLabel}</span>
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
        <div className="absolute mt-1 bg-white border border-[#e1e1e1] rounded shadow-md z-10 w-[210px]">
          {options.map(opt => (
            <div
              key={opt.value}
              className={`py-2 text-[14px] px-3 cursor-pointer hover:bg-gray-100 ${
                value === opt.value ? "bg-gray-100 font-medium" : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
