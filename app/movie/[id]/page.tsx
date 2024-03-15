import CommentsSection from "@/app/components/CommentsSection/CommentsSection";
import Poster from "@/app/components/Poster/Poster";
import { Credits, Movie } from "@/common/types";
import {
  getBackdropUrl,
  getCreditsUrl,
  getMovieUrl,
  getPosterUrl,
} from "@/config";

async function getData(url: string) {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const movieEndpoint: string = getMovieUrl(params.id);
  const creditsEndpoint: string = getCreditsUrl(params.id);
  const movie: Movie = await getData(movieEndpoint);
  const credits: Credits = await getData(creditsEndpoint);
  const imageUrl = movie.poster_path
    ? getPosterUrl(movie.poster_path)
    : "/no_image.jpeg";

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('${getBackdropUrl(movie.backdrop_path)}')`,
        }}
        className="flex w-screen h-[38rem] bg-no-repeat bg-cover bg-top"
      >
        <div className="w-full h-full bg-slate-600 opacity-95 px-24 flex items-center">
          <div className="flex grow gap-10">
            <div className="h-2/3">
              <Poster imageUrl={imageUrl} title={movie.title} />
            </div>
            <div>
              <h1 className="text-4xl text-white font-bold">{movie.title}</h1>
              <span>{`${movie.vote_average} User Score`}</span>
              <h3 className="text-xl">Overview</h3>
              <p>{movie.overview}</p>
              <div className="flex w-full justify-between mt-10 flex-wrap">
                {credits.crew
                  .filter((e) => e.job === "Director" || e.job === "Screenplay")
                  .map((e) => (
                    <div key={e.credit_id} className="mt-4">
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
        {credits.cast.map((e) => (
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
        <h1 className="text-2xl text-zinc-950">Comments</h1>
        <CommentsSection movieId={movie.id} />
      </div>
    </div>
  );
}
