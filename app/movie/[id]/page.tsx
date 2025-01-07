'use client';

import Poster from "@/app/components/Poster/Poster";

import {
  getBackdropUrl,
  getPosterUrl,
} from "@/config";
import { useQuery } from "@apollo/client";
import { useParams } from 'next/navigation'
import gql from "graphql-tag";

const getMovie = gql`
  query GetMovie($movieId: ID!) {
  getMovie(movieId: $movieId) {
    id
    overview
    poster_path
    backdrop_path
    title
    vote_average
    credits {
      cast {
        character
        name
        profile_path
      }
      crew {
        job
        name
      }
    }
  }
}
`

async function getData(url: string) {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default function Page() {
  const {id} = useParams<{ id: string; }>()
  
  const { data, loading } = useQuery(getMovie, { variables: { movieId: Number(id) } })
  // const imageUrl = movie.poster_path
  //   ? getPosterUrl(movie.poster_path)
  //   : "/no_image.jpeg";
  if (loading) 
    return (<>Loading...</>)

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('${getBackdropUrl(data.getMovie.backdrop_path)}')`,
        }}
        className="flex w-screen h-[38rem] bg-no-repeat bg-cover bg-top"
      >
        <div className="w-full h-full bg-slate-600 opacity-95 px-24 flex items-center">
          <div className="flex grow gap-10">
            <div className="h-2/3">
              <Poster imageUrl={""} title={data.getMovie.title} />
            </div>
            <div>
              <h1 className="text-4xl text-white font-bold">{data.getMovie.title}</h1>
              <span>{`${data.getMovie.vote_average} User Score`}</span>
              <h3 className="text-xl">Overview</h3>
              <p>{data.getMovie.overview}</p>
              <div className="flex w-full justify-between mt-10 flex-wrap">
                {data.getMovie.credits.crew
                  .filter((e: any) => e.job === "Director" || e.job === "Screenplay")
                  .map((e: any) => (
                    <div key={e.name} className="mt-4">
                      <div>{e.name}</div>
                      <div>{e.job}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-center items-center mt-10">
        {data.getMovie.credits.cast.map((e: any) => (
          <div
            key={e.name}
            style={{ width: "240px", height: "auto" }}
            className="rounded-lg"
          >
            <Poster
              imageUrl={
                e.profile_path ? getPosterUrl(e.profile_path) : "/no_image.jpeg"
              }
              title={e.name}
            />
            <div className="text-ellipsis truncate text-lg text-center text-zinc-950">
              {e.name}
            </div>
            <div className="text-ellipsis truncate text-sm text-center text-zinc-950">
              As
            </div>
            <div className="text-ellipsis truncate text-lg text-center text-zinc-950">
              {e.character}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-28">
        {/* <CommentsSection movieId={data.getMovie.id} /> */}
      </div>
    </div>
  );
}
