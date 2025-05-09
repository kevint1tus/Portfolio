import { useEffect, useRef } from "react";
import Image from "next/image";

const ProjectTile = ({ project, isDesktop }) => {
  const { name, image, blurImage, description, gradient, url, tech } = project;
  const projectCard = useRef(null);

  return (
    <a
      href={url}
      className="group block overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] bg-gray-dark-4 relative shadow-lg"
      ref={projectCard}
      target="_blank"
      rel="noreferrer"
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
      }}
    >
      {/* SVG background effect */}
      <img
        src="/project-bg.svg"
        alt="project background"
        className="absolute w-full h-full top-0 left-0 object-cover opacity-10 pointer-events-none select-none z-0"
        aria-hidden="true"
      />
      <div className="relative z-10 pt-6 px-6 pb-0 flex flex-col items-center">
        <div className="relative w-full max-w-[95%] rounded-xl overflow-hidden shadow-md" style={{background: 'rgba(0,0,0,0.10)'}}>
          <div className="relative h-[260px] md:h-[300px] w-full">
            <Image
              placeholder="blur"
              blurDataURL={blurImage}
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 p-6 pt-4">
        <h3 className="text-2xl font-semibold mb-3 text-white">
          {name}
        </h3>
        <p className="text-gray-light-2 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tech.map((technology) => (
            <span
              key={technology}
              className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm rounded-full text-gray-light-2"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-20"
      />
    </a>
  );
};

export default ProjectTile;
