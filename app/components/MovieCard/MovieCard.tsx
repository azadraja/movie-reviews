import { Result } from "@/common/types";
import { getPosterUrl } from "@/config";
import Poster from "../Poster/Poster";
import styles from "./MovieCard.module.css";

const MovieCard = (props: Result) => {
  const imageUrl = props.poster_path
    ? getPosterUrl(props.poster_path)
    : "/no_image.jpeg";
  return (
    <div
      className={`${styles.topCardContainer} cursor-pointer shadow-lg shadow-slate-600 rounded-md `}
    >
      <div className="flex flex-col h-full">
        <Poster imageUrl={imageUrl} title={props.title} />
        <div className=" w-full bottom-0 px-4 py-2 bg-zinc-800">
          <h2
            title={props.title}
            className="text-white text-center text-sm truncate text-ellipsis hover:text-green-600"
          >
            {props.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
