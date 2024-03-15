"use client";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();
  const rangeSize = 5;
  const startPage = Math.max(currentPage - Math.floor(rangeSize / 2), 1);
  const endPage = Math.min(startPage + rangeSize - 1, totalPages);
  const handlePageClick = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace("?" + params.toString());
  };
  return (
    <div className="flex grow my-6">
      <nav className="flex justify-center align-middle grow">
        <ul className="pagination flex justify-center align-middle gap-12 text-base font-medium">
          {startPage > 1 && (
            <li
              className="cursor-pointer p-1 text-zinc-900"
              onClick={() => handlePageClick(1)}
            >
              1
            </li>
          )}
          {startPage > 2 && <li className="text-zinc-900">...</li>}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => i + startPage
          ).map((page) => (
            <li
              key={page}
              onClick={() => handlePageClick(page)}
              className={`
                ${
                  page.toString() === currentPage.toString()
                    ? "bg-sky-500"
                    : "text-zinc-900"
                }
                cursor-pointer p-1 
                `}
            >
              {page}
            </li>
          ))}
          {endPage < totalPages - 1 && <li className="text-zinc-900">...</li>}
          {endPage < totalPages && (
            <li
              className="cursor-pointer p-1 text-zinc-900"
              onClick={() => handlePageClick(totalPages)}
            >
              {totalPages}
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
