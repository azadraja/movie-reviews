"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    searchParams ? searchParams.get("q") : ""
  );
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/?q=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch} className="flex justify-end">
      <input
        value={searchQuery || ""}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="px-5 py-1 w-64 sm:py-3 text-neutral-900 bg-white focus:bg-white rounded-full border-solid border border-green-300 focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-800"
        type="text"
        placeholder="Search movies..."
      />
    </form>
  );
};

export default SearchInput;
