// Sidebar.tsx
import React, { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { CollapsibleSection } from "./CollapsibleSection";
import { CustomSelect } from "./CustomSelect";

const titles = ["Jobs", "CRM", "Profile Details", "Responsibility", "Pipeline Tasks", "Education"];

// // Sort options
// const sortOptions = [
//   {
//     value: "last_activity_desc",
//     label: "Last Activity (new to old)",
//     sortBy: "last_activity",
//     sortOrder: "desc",
//   },
//   {
//     value: "last_activity_asc",
//     label: "Last Activity (old to new)",
//     sortBy: "last_activity",
//     sortOrder: "asc",
//   },
//   { value: "name_asc", label: "Name (A to Z)", sortBy: "name", sortOrder: "asc" },
//   { value: "name_desc", label: "Name (Z to A)", sortBy: "name", sortOrder: "desc" },
// ];

interface SidebarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  fullTextSearch: boolean;
  onFullTextToggle: (value: boolean) => void;
  applicationTypeFilters: string[];
  onApplicationTypeChange: (values: string[]) => void;
  sourceFilters: string[];
  onSourceChange: (values: string[]) => void;
  sortValue: string;
  sortOptions: { label: string; value: string; sortBy: string; sortOrder: string }[];
  onSortChange: (value: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchValue,
  onSearchChange,
  fullTextSearch,
  onFullTextToggle,
  applicationTypeFilters,
  onApplicationTypeChange,
  sourceFilters,
  onSourceChange,
  sortValue,
  sortOptions,
  onSortChange,
}) => {
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [applicationTypeData, setApplicationTypeData] = useState<string[]>([]);
  const [sourceData, setSourceData] = useState<string[]>([]);
  // const [error, setError] = useState<string>("");
  // const sortOptions = [
  //   {
  //     label: "Last Activity (new to old)",
  //     value: "new_to_old",
  //     sortBy: "last_activity",
  //     sortOrder: "desc",
  //   },
  //   {
  //     label: "Last Activity (old to new)",
  //     value: "old_to_new",
  //     sortBy: "last_activity",
  //     sortOrder: "desc",
  //   },
  // ];
  // const [sort, setSort] = useState("new_to_old");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(`http://0.0.0.0:8000/api/sources`)
        .then(res => res.json())
        .then(data => {
          // console.log("data", data.sources);
          setSourceData(data.sources);
        })
        .catch(err => {
          console.error(err);
          // setError("Failed to load candidates");
        })
        .finally(() => setLoading(false));

      setLoading(true);

      await fetch(`http://0.0.0.0:8000/api/application_type`)
        .then(res => res.json())
        .then(data => {
          // console.log("data", data.application_type);
          setApplicationTypeData(data.application_type);
        })
        .catch(err => {
          console.error(err);
          // setError("Failed to load candidates");
        })
        .finally(() => setLoading(false));
    };
    fetchData();
  }, []);

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
      <CustomSelect
        options={sortOptions.map(o => ({ label: o.label, value: o.value }))}
        value={sortValue}
        onChange={onSortChange}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-6">
          <CollapsibleSection title="Application Type">
            <div className="pt-1">
              {applicationTypeData.map(t => (
                <label key={t} className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={applicationTypeFilters?.includes(t) || false}
                    onChange={e => {
                      const newFilters = e.target.checked
                        ? [...applicationTypeFilters, t] // add if checked
                        : applicationTypeFilters.filter(f => f !== t); // remove if unchecked
                      onApplicationTypeChange(newFilters);
                    }}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Sources">
            <div className="pt-1">
              {sourceData.map(t => (
                <label key={t} className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={sourceFilters?.includes(t) || false}
                    onChange={e => {
                      const newFilters = e.target.checked
                        ? [...sourceFilters, t] // add if checked
                        : sourceFilters.filter(f => f !== t); // remove if unchecked
                      onSourceChange(newFilters);
                    }}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </CollapsibleSection>

          {/* Collapsible Filter Sections */}

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
      )}
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
