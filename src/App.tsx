import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { CandidatesPage } from "./pages/CandidatesPage";

function App() {
  const [headerSearchValue, setHeaderSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullTextSearch, setFullTextSearch] = useState(false);

  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f7f8f7]">
      {/* Page Title */}
      <Header
        searchValue={headerSearchValue}
        onSearchChange={setHeaderSearchValue}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        {/* Sidebar - Pre-built component with search, toggle, dropdown */}
        <div className="hidden lg:block">
          <Sidebar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            fullTextSearch={fullTextSearch}
            onFullTextToggle={setFullTextSearch}
          />
        </div>
        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar Drawer */}
          <div className="relative w-[248px] bg-[#f7f8f7] h-full shadow-lg">
            <Sidebar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              fullTextSearch={fullTextSearch}
              onFullTextToggle={setFullTextSearch}
            />

            {/* Close Button */}
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
          {/* TODO: Add action buttons here (Generate Report, + Add Candidate, Bulk Actions) */}
          {/* TODO: Add candidate list here */}
          {/* TODO: Add pagination here */}
          <CandidatesPage search={searchValue} fullTextSearch={fullTextSearch} />
        </main>
      </div>
    </div>
  );
}

export default App;
