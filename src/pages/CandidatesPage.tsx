// CandidatesPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { CandidateCard } from "../components/CandidateCard";
import { Pagination } from "../components/Pagination";
import type { Candidate } from "../types/candidate";
import { FilterTags } from "../components/FilterTags";

const PAGE_SIZE = 5;

interface CandidatesPageProps {
  search: string; // value from sidebar
  fullTextSearch?: boolean; // whether full-text search is enabled
}

export const CandidatesPage: React.FC<CandidatesPageProps> = ({ search, fullTextSearch }) => {
  const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch once (from local JSON)
  useEffect(() => {
    setLoading(true);
    fetch("/candidates.json")
      .then(res => res.json())
      .then(data => {
        setAllCandidates(data.candidates ?? []);
        setFilteredCandidates(data.candidates ?? []);
        setPage(1);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load candidates");
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Client-side filter (debounced naturally via SearchInput)
  useEffect(() => {
    if (!search.trim()) {
      setFilteredCandidates(allCandidates);
      return;
    }

    const term = search.toLowerCase();

    const filtered = allCandidates.filter(candidate => {
      if (fullTextSearch) {
        return (
          candidate.name.toLowerCase().includes(term) ||
          candidate.position?.toLowerCase().includes(term) ||
          candidate.company?.toLowerCase().includes(term) ||
          candidate.job_title?.toLowerCase().includes(term) ||
          candidate.status.toLowerCase().includes(term)
          // candidate.resume?.toLowerCase().includes(term) ||
          // candidate.notes?.toLowerCase().includes(term)
        );
      } else {
        return (
          candidate.name.toLowerCase().includes(term) ||
          candidate.position?.toLowerCase().includes(term) ||
          candidate.company?.toLowerCase().includes(term) ||
          candidate.job_title?.toLowerCase().includes(term) ||
          candidate.status.toLowerCase().includes(term)
        );
      }
    });

    setFilteredCandidates(filtered);
    setPage(1);
  }, [search, fullTextSearch, allCandidates]);

  const total = filteredCandidates.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const visible = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCandidates.slice(start, start + PAGE_SIZE);
  }, [filteredCandidates, page]);

  return (
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

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-2 order-1 md:order-2">
          <button
            className="flex items-center gap-1.5 border border-[#207868] text-[#207868] bg-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-200 hover:shadow-md transition h-[38px] cursor-pointer"
            onClick={() => alert("Generate Report clicked")}
          >
            Generate Report
          </button>
          <button
            className="flex items-center gap-1.5 border border-[#207868] text-[#207868] bg-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-200 hover:shadow-md transition h-[38px] cursor-pointer"
            onClick={() => alert("Add Candidate clicked")}
          >
            <span className="text-base font-bold">+</span> Add Candidate
          </button>
          <button
            className="flex items-center gap-1.5 border border-[#207868] text-[#207868] bg-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-200 hover:shadow-md transition h-[38px] cursor-pointer"
            onClick={() => alert("Bulk Actions clicked")}
          >
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
          ) : visible.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">No candidates found</div>
          ) : (
            visible.map(c => <CandidateCard key={c.id} candidate={c} />)
          )}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </main>
    </div>
  );
};
