import { Suspense } from "react";
import MovieList from "./components/MovieList/MovieList";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<>Loading...</>}>
        <MovieList />
      </Suspense>
    </main>
  );
}
