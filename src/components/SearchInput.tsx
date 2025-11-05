import { useState, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search candidates",
  debounceMs = 300,
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange]);

  return (
    <div className="relative flex items-center grow bg-white border border-[#E4E7E5] rounded-xs w-full">
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <svg
          className="w-4 h-4 text-[#909090]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        type="text"
        className="pl-7 pr-1 py-1 text-md w-full outline-none text-[#15372C]"
        placeholder={placeholder}
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
      />
    </div>
  );
};
