import Image from "next/image";

const Cover = ({ children, background }) => {
  return (
    <div className="h-screen text-white bg-slate-800 relative min-h-[400px] flex justify-center items-center ">
      <Image
        alt="cover"
        src={background}
        layout="fill"
        objectFit="cover"
        className="mix-blend-soft-light"
      />
      <div className="max-w-5xl mx-auto z-10">{children}</div>
    </div>
  );
};

export default Cover;
