"use client";
import { Results } from "@/common/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";

const MovieList = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get("q") : "";
  const page = searchParams ? searchParams.get("page") : 1;
  const [data, setData] = React.useState<Results>();

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `/popular?q=${searchQuery ?? ""}&page=${page ?? 1}`
        );
        const data: any = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error occured 😱", error);
      }
    })();
  }, [searchQuery, page]);
  return (
    <div className="flex flex-row flex-wrap w-screen mt-5">
      <div className="flex flex-row flex-wrap gap-5 justify-center">
        {data?.results?.length &&
          data.results.map((e) => (
            <Link key={e.id} href={`/movie/${e.id}`}>
              <MovieCard {...e} />
            </Link>
          ))}
      </div>
      <Pagination totalPages={data?.total_pages || 0} />
    </div>
  );
};

export default MovieList;
