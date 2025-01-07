"use client";
import { Results } from "@/common/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import gql from "graphql-tag";
import Pagination from "../Pagination/Pagination";
import { useQuery } from "@apollo/client";

const getPopularMovies = gql`
  query PopularMovies($page: Int!) {
  popularMovies(page: $page) {
    page
    results {
      id
      title
      poster_path
      
    }
    total_pages
  }
}
`

const MovieList = () => {
  const searchParams = useSearchParams();
  const page = searchParams ? searchParams.get("page") : 1;
  const { data, loading, error, refetch } = useQuery(getPopularMovies, { variables: { page: Number(page) } });
  const searchQuery = searchParams ? searchParams.get("q") : "";
  
  // const [data, setData] = React.useState<Results>();

  

  React.useEffect(() => {
    refetch({variables: { page: Number(page) }})
  }, [searchQuery, page]);
  if(loading) {
    return <>Loading....</>
  }
  return(
    <div className="flex flex-row flex-wrap w-screen mt-5">
      <div className="flex flex-row flex-wrap gap-5 justify-center">
        {data?.popularMovies?.results?.length &&
          data.popularMovies.results.map((e: any) => (
            <Link key={e.id} href={`/movie/${e.id}`}>
              <MovieCard {...e} />
            </Link>
          ))}
      </div>
      <Pagination totalPages={data?.popularMovies?.total_pages || 0} />
    </div>
  );
};

export default MovieList;
