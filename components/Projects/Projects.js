'use client';

import { useEffect, useRef, useCallback, useState } from "react";
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

  const getProjectsSt = useCallback(() => {
    if (!targetSection.current || !sectionTitle.current) return [null, null];

    const projectWrapper = targetSection.current.querySelector(".project-wrapper");
    if (!projectWrapper) return [null, null];

    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    const projectWidth = projectWrapper.querySelector(".project-tile").offsetWidth;
    const totalWidth = (projectWidth + 120) * (PROJECTS.length - 1) + projectWidth;
    const scrollDistance = totalWidth - (window.innerWidth * 0.6);
    
    timeline.fromTo(projectWrapper,
      { x: 0 },
      {
        x: -scrollDistance,
        ease: "none",
        duration: 1
      }
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top top",
      end: `+=${scrollDistance + (window.innerHeight)}`,
      scrub: 0.6,
      pin: true,
      animation: timeline,
      pinSpacing: true,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onEnter: () => {
        if (projectWrapper) {
          projectWrapper.style.opacity = 1;
        }
      }
    });

    return [timeline, scrollTrigger];
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let projectsScrollTrigger;
    let projectsTimeline;
    let revealScrollTrigger;
    let revealTimeline;

    try {
      [projectsTimeline, projectsScrollTrigger] = getProjectsSt();
      [revealTimeline, revealScrollTrigger] = getRevealSt();

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        projectsScrollTrigger?.kill();
        projectsTimeline?.kill();
        revealScrollTrigger?.kill();
        revealTimeline?.progress(1);
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error in Projects animation setup:', error);
    }
  }, [getProjectsSt, getRevealSt, isMounted]);

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
          className="flex flex-col inner-container transform-gpu mb-8"
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
        <div
          className="flex project-wrapper w-full seq items-center"
          style={{
            opacity: 0,
            minWidth: '100%',
            paddingLeft: '10%',
            paddingRight: '30%'
          }}
        >
          {PROJECTS.map((project, index) => (
            <ProjectTile
              classes={`project-tile ${index !== PROJECTS.length - 1 ? 'mr-28 md:mr-32 lg:mr-36' : ''}`}
              project={project}
              key={project.name}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
      <style jsx global>{`
        .project-wrapper {
          overflow: visible;
        }
        .project-tile {
          flex: 0 0 auto;
          width: 80%;
          max-width: 650px;
        }
      `}</style>
    </section>
  );
};

export default Projects;
