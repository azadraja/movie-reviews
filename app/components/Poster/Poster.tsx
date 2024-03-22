import Image from "next/image";

const Poster = ({ imageUrl, title }: { imageUrl: string; title: string }) => {
  return (
    <div style={{ position: "relative", height: "400px" }}>
      <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} />
    </div>
  );
};

export default Poster;
