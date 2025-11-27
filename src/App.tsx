import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { CandidateCard } from "./components/CandidateCard";
import { Pagination } from "./components/Pagination";
import type { Candidate } from "./types/candidate";
import { FilterTags } from "./components/FilterTags";

function App() {
  const [headerSearchValue, setHeaderSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const [query, setQuery] = useState({ search: "", page: 1 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullTextSearch, setFullTextSearch] = useState(false);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("last_activity");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [applicationTypeFilters, setApplicationTypeFilters] = useState<string[]>([]);
  const [sourceFilters, setSourceFilters] = useState<string[]>([]);

  const sortOptions = [
    {
      label: "Last Activity (new to old)",
      value: "new_to_old",
      sortBy: "last_activity",
      sortOrder: "desc",
    },
    {
      label: "Last Activity (old to new)",
      value: "old_to_new",
      sortBy: "last_activity",
      sortOrder: "asc",
    },
  ];
  const [sortValue, setSortValue] = useState("new_to_old");

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    console.log(`search: ${value}`);
  };

  const handlePage = (p: number) => {
    setPage(p);
  };

  const handleApplicationTypeChange = (filters: string[]) => {
    setApplicationTypeFilters(filters);
    setPage(1);
  };

  const handleSourceChange = (filters: string[]) => {
    setSourceFilters(filters);
    setPage(1);
  };

  const handleSort = (value: string) => {
    setSortValue(value);
    const selected = sortOptions.find(s => s.value === value);
    if (selected) {
      setSortBy(selected.sortBy);
      setSortOrder(selected.sortOrder);
      setPage(1);
    }
  };
  // Only **one useEffect** to fetch candidates
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: "5",
          sort_by: sortBy,
          sort_order: sortOrder,
        });

        if (search.trim()) params.append("search", search.trim());
        applicationTypeFilters.forEach(f => params.append("application_type", f));
        sourceFilters.forEach(f => params.append("source", f));

        const res = await fetch(`http://0.0.0.0:8000/api/candidates?${params}`);
        const data = await res.json();

        setFilteredCandidates(data.data ?? []);
        setTotalPages(data.meta.total_pages ?? 1);
      } catch (err) {
        console.error(err);
        setError("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, applicationTypeFilters, sourceFilters, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-[#f7f8f7]">
      <Header
        searchValue={headerSearchValue}
        onSearchChange={setHeaderSearchValue}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            searchValue={search}
            onSearchChange={handleSearch}
            // onSearchChange={() => {}}
            fullTextSearch={fullTextSearch}
            onFullTextToggle={setFullTextSearch}
            applicationTypeFilters={applicationTypeFilters}
            onApplicationTypeChange={handleApplicationTypeChange}
            sourceFilters={sourceFilters}
            onSourceChange={handleSourceChange}
            sortValue={sortValue}
            sortOptions={sortOptions}
            onSortChange={handleSort}
          />
        </div>
        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-[248px] bg-[#f7f8f7] h-full shadow-lg">
            <Sidebar
              searchValue={search}
              onSearchChange={handleSearch}
              fullTextSearch={fullTextSearch}
              onFullTextToggle={setFullTextSearch}
              applicationTypeFilters={applicationTypeFilters}
              onApplicationTypeChange={handleApplicationTypeChange}
              sourceFilters={sourceFilters}
              onSourceChange={handleSourceChange}
              sortValue={sortValue}
              sortOptions={sortOptions}
              onSortChange={handleSort}
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-1 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 px-6 py-6">
          <div className="min-h-screen bg-[#F7F8F7]">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col order-2 pt-4 md:pt-0 md:order-1">
                <div className="text-[13px]">
                  Showing {filteredCandidates.length} candidate
                  {filteredCandidates.length !== 1 ? "s" : ""} applications
                </div>
                <div className="flex items-center gap-2 text-sm py-3">
                  <FilterTags title="Active" />
                  <FilterTags title="Open Jobs" />
                </div>
              </div>
              <div className="flex justify-end items-center gap-2 order-1 md:order-2">
                <button className="flex items-center gap-1.5 border border-[#207868] text-[#207868] bg-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-200 hover:shadow-md transition h-[38px] cursor-pointer">
                  Generate Report
                </button>
                <button className="flex items-center gap-1.5 border border-[#207868] text-[#207868] bg-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-200 hover:shadow-md transition h-[38px] cursor-pointer">
                  <span className="text-base font-bold">+</span> Add Candidate
                </button>
                <button className="flex items-center gap-1.5 border border-[#207868] text-[#207868] bg-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-200 hover:shadow-md transition h-[38px] cursor-pointer">
                  Bulk Actions
                </button>
              </div>
            </div>

            <main className="flex-1 rounded">
              <div className="bg-white border border-gray-200">
                <div className="grid grid-cols-2 text-sm font-medium text-gray-500 bg-gray-50 px-6 border-b border-gray-100">
                  <span className="py-3">Name</span>
                  <span className="py-3 border-l border-gray-200 pl-5">Job/Status</span>
                </div>

                {loading ? (
                  <div className="p-6 text-center text-sm text-gray-500">Loading...</div>
                ) : error ? (
                  <div className="p-6 text-center text-sm text-red-500">{error}</div>
                ) : filteredCandidates.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-500">No candidates found</div>
                ) : (
                  filteredCandidates.map(c => <CandidateCard key={c.id} candidate={c} />)
                )}
              </div>

              <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePage} />
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
