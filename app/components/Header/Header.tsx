import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-white border-gray-950 shadow-2xl px-4 lg:px-6 py-2.5 h-20 flex justify-between items-center">
      <Link href={"/"}>
        <span className="text-zinc-900">Movie</span>
      </Link>
      <SearchInput />
    </nav>
  );
};

export default Header;
