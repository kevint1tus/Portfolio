'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectTile from "./ProjectTile/ProjectTile";

const Projects = ({ isDesktop, clientHeight }) => {
  const targetSection = useRef(null);
  const sectionTitle = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const getRevealSt = useCallback(() => {
    if (!targetSection.current) return [null, null];

    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    const elements = targetSection.current.querySelectorAll(".seq");
    
    if (elements.length === 0) return [null, null];

    revealTl.from(
      elements,
      { 
        opacity: 0, 
        duration: 0.2, 
        stagger: 0.05,
        ease: "power1.out"
      },
      "<"
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top 98%",
      end: "top 60%",
      scrub: 0.1,
      animation: revealTl,
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
      fastScrollEnd: true
    });

    return [revealTl, scrollTrigger];
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let revealScrollTrigger;
    let revealTimeline;

    try {
      [revealTimeline, revealScrollTrigger] = getRevealSt();

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        revealScrollTrigger?.kill();
        revealTimeline?.progress(1);
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error in Projects animation setup:', error);
    }
  }, [getRevealSt, isMounted]);

  return (
    <section
      ref={targetSection}
      className={`${
        isDesktop ? "min-h-screen" : "min-h-[50vh]"
      } w-full relative select-none section-container transform-gpu mb-40`}
      id={MENULINKS[2].ref}
    >
      <div className="flex flex-col py-8 justify-center h-full">
        <div
          className="flex flex-col inner-container transform-gpu mb-12"
          ref={sectionTitle}
        >
          <p className="uppercase tracking-widest text-gray-light-1 seq">
            PROJECTS
          </p>
          <h1 className="text-6xl mt-2 font-medium text-gradient w-fit seq">
            Things I've been working on
          </h1>
          <h2 className="text-[1.65rem] font-medium md:max-w-lg max-w-sm mt-2 seq">
            The list only gets longer from here! 🚀
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 seq">
          {PROJECTS.map((project) => (
            <ProjectTile
              key={project.name}
              project={project}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
