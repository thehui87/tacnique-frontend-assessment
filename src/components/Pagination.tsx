// Pagination.tsx
import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
};

export const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center py-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-full disabled:opacity-40 disabled:[&>svg>path]:fill-[#E8C7D1] hover:bg-gray-200"
      >
        <svg
          width="34"
          height="36"
          viewBox="0 0 34 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.6987 11.3496C18.8054 11.3497 18.9097 11.3814 18.9983 11.4407C19.087 11.5 19.156 11.5843 19.1969 11.6828C19.2377 11.7814 19.2484 11.8898 19.2276 11.9945C19.2068 12.0991 19.1555 12.1952 19.0801 12.2707L13.6741 17.6767C13.6322 17.7185 13.599 17.7681 13.5763 17.8228C13.5536 17.8774 13.542 17.936 13.542 17.9951C13.542 18.0542 13.5536 18.1129 13.5763 18.1675C13.599 18.2221 13.6322 18.2718 13.6741 18.3135L19.0801 23.7195C19.1755 23.8218 19.2273 23.9571 19.2249 24.097C19.2224 24.2368 19.1658 24.3702 19.0668 24.4691C18.968 24.568 18.8346 24.6246 18.6947 24.627C18.5549 24.6295 18.4196 24.5776 18.3173 24.4823L12.2133 18.3792C12.173 18.3398 12.1393 18.2943 12.1135 18.2443C12.0609 18.1425 12.042 18.0267 12.0597 17.9135C12.0773 17.8002 12.1305 17.6956 12.2115 17.6146L18.3173 11.5079C18.4184 11.4067 18.5556 11.3497 18.6987 11.3496Z"
            fill="#15372C"
          />
        </svg>
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 ${
            p === currentPage ? "bg-gray-200 font-semibold" : " hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-full disabled:opacity-40 disabled:[&>svg>path]:fill-[#E8C7D1] hover:bg-gray-200"
      >
        <svg
          width="34"
          height="36"
          viewBox="0 0 34 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2814 24.6404C15.1747 24.6403 15.0705 24.6086 14.9818 24.5492C14.8932 24.4899 14.8241 24.4057 14.7832 24.3071C14.7424 24.2085 14.7317 24.1001 14.7525 23.9955C14.7733 23.8908 14.8246 23.7947 14.9 23.7193L20.306 18.3133C20.3479 18.2714 20.3811 18.2218 20.4038 18.1672C20.4265 18.1125 20.4382 18.054 20.4382 17.9948C20.4382 17.9357 20.4265 17.8771 20.4038 17.8224C20.3811 17.7678 20.3479 17.7182 20.306 17.6764L14.9 12.2704C14.8047 12.1681 14.7528 12.0328 14.7553 11.893C14.7577 11.7531 14.8144 11.6197 14.9133 11.5209C15.0121 11.422 15.1455 11.3653 15.2854 11.3629C15.4252 11.3604 15.5605 11.4123 15.6628 11.5076L21.7668 17.6108C21.8071 17.6501 21.8408 17.6956 21.8666 17.7457C21.9193 17.8475 21.9381 17.9633 21.9205 18.0765C21.9029 18.1897 21.8496 18.2944 21.7686 18.3753L15.6628 24.482C15.5617 24.5832 15.4245 24.6402 15.2814 24.6404Z"
            fill="#15372C"
          />
        </svg>
      </button>
    </div>
  );
};
