"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Results } from "./common/types";
import MovieCard from "./components/MovieCard/MovieCard";
import Pagination from "./components/Pagination/Pagination";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get("q") : "";
  const page = searchParams ? searchParams.get("page") : 1;
  const [data, setData] = React.useState<Results>();

  React.useEffect(() => {
    (async () => {
      console.log(searchParams, searchQuery, page);
      const res = await fetch(
        `/popular?q=${searchQuery ?? ""}&page=${page ?? 1}`
      );
      const data: any = await res.json();
      console.log(data);
      setData(data);
    })();
  }, [searchQuery, page]);

  return (
    <main className="flex flex-row flex-wrap w-screen mt-5">
      <div className="flex flex-row flex-wrap gap-5 justify-center">
        {data?.results?.length &&
          data.results.map((e) => (
            <Link key={e.id} href={`/movie/${e.id}`}>
              <MovieCard {...e} />
            </Link>
          ))}
      </div>
      <Pagination totalPages={data?.total_pages || 0} />
    </main>
  );
}
