import Image from "next/image";

const Poster = ({ imageUrl, title }: { imageUrl: string; title: string }) => {
  return (
    <Image
      className="grow"
      src={imageUrl}
      alt={title}
      width="240"
      height="80"
    />
  );
};

export default Poster;
