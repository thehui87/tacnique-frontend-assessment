import React, { useState, useRef, useEffect } from "react";
import type { Candidate } from "../types/candidate";

type Props = {
  candidate: Candidate;
  onNameClick?: (id: number) => void;
};

export const CandidateCard: React.FC<Props> = ({ candidate, onNameClick }) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown !== null &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown]?.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <div className="border-t border-gray-200 px-6 py-3 hover:bg-gray-50 transition flex flex-col gap-3">
      {/* Main 2-column content */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="flex flex-col">
          <div
            onClick={() => onNameClick?.(candidate.id)}
            className="cursor-pointer text-[15px] font-normal text-gray-800 text-left hover:underline hover:text-blue-400"
          >
            {candidate.name}
          </div>
          <span className="text-[12px] text-gray-400">
            {candidate.position}
            {candidate.company && (
              <>
                {" "}
                at <span className="text-gray-400">{candidate.company}</span>
              </>
            )}
          </span>
        </div>

        {/* Right column */}
        <div className="flex flex-col">
          <span className="text-[14px] text-gray-800 font-normal">{candidate.job_title}</span>
          <span className="text-[12px] text-gray-400">
            {candidate.status_type === "stage" ? candidate.status : `Role: ${candidate.status}`}
          </span>
          <a
            href="#"
            className="text-[12px] text-[#207868] hover:underline"
            onClick={e => e.preventDefault()}
          >
            {candidate.action_link}
          </a>
        </div>
      </div>

      {/* Full-width Availability + Interviews */}
      {(candidate.has_availability || candidate.interviews?.length) && (
        <div className="bg-gray-100 px-4 py-3 rounded-md w-full">
          {candidate.has_availability && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <h4 className="text-[13px] font-medium text-gray-700">Availability:</h4>
              {candidate.has_availability ? (
                <div className="w-full">
                  {candidate.availability_status ? (
                    <div className="flex justify-between items-center gap-3">
                      <span
                        className={`inline-block ${
                          candidate.availability_status === "Available"
                            ? "bg-green-100"
                            : candidate.availability_status === "Requested"
                            ? "bg-amber-100"
                            : candidate.availability_status === "Not Requested"
                            ? "bg-gray-100"
                            : ""
                        } text-gray-600 px-2 py-0.5 rounded-md text-[11px]`}
                      >
                        {candidate.availability_status}
                      </span>
                      {candidate.availability_status === "Not Requested" && (
                        <button
                          className="ml-2 text-[#207868] hover:underline"
                          onClick={() => alert("Send request clicked")}
                        >
                          Request availability
                        </button>
                      )}
                    </div>
                  ) : (
                    <span
                      className={`inline-block bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-[11px]`}
                    >
                      "NA"
                    </span>
                  )}
                </div>
              ) : (
                <a
                  href="#"
                  className="text-[#207868] hover:underline border-r pr-4 border-gray-200 cursor-pointer"
                >
                  Request Availability
                </a>
              )}
            </div>
          )}

          {candidate.interviews?.length && (
            <div className="w-full">
              <h4 className="text-[13px] font-medium text-gray-700 mb-1">Interviews</h4>
              {candidate.interviews.map((interview, idx) => (
                <div key={idx} className="py-1">
                  {/* border-b is on this div, and last:border-b-0 removes it for the last row */}
                  <div className="text-[12px] pb-1 last:border-b-0">
                    <div className="flex justify-between items-center gap-3 border-b border-gray-200 pb-1">
                      {interview.scheduled ? (
                        <div>
                          <span className="inline-block bg-green-100 text-gray-600 px-2 py-0.5 rounded-md text-[11px]">
                            {interview.name}
                          </span>
                          {" – Scheduled "}
                        </div>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-[11px]">
                          {interview.name}
                        </span>
                      )}
                      <div className="flex items-center">
                        {!interview.scheduled && (
                          <span className="text-gray-500 flex gap-3 text-right">
                            <a
                              href="#"
                              className="text-[#207868] hover:underline border-r pr-4 border-gray-200"
                            >
                              Schedule manually
                            </a>

                            <a
                              href="#"
                              className="text-[#207868] hover:underline border-r pr-4 border-gray-200"
                            >
                              Automated scheduling
                            </a>
                          </span>
                        )}
                        <div
                          className="relative inline-block text-left"
                          ref={el => {
                            dropdownRefs.current[idx] = el;
                          }}
                        >
                          <button
                            className="cursor-pointer hover:bg-gray-200 rounded-full p-1 ml-2"
                            onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-gray-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <circle cx="5" cy="12" r="1.5" />
                              <circle cx="12" cy="12" r="1.5" />
                              <circle cx="19" cy="12" r="1.5" />
                            </svg>
                          </button>

                          {openDropdown === idx && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              <ul className="py-1 text-sm text-gray-700">
                                {interview.scheduled ? (
                                  <li>
                                    <button
                                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                      onClick={() => alert("Edit clicked")}
                                    >
                                      Edit
                                    </button>
                                  </li>
                                ) : (
                                  <li>
                                    <button
                                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                      onClick={() => alert("New clicked")}
                                    >
                                      New
                                    </button>
                                  </li>
                                )}
                                <li>
                                  <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => alert("Delete clicked")}
                                  >
                                    Delete
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => alert("View clicked")}
                                  >
                                    View
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
