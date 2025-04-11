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

    const innerContainer = targetSection.current.querySelector(".inner-container");
    const projectWrapper = targetSection.current.querySelector(".project-wrapper");
    
    if (!innerContainer || !projectWrapper) return [null, null];

    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    const sidePadding = document.body.clientWidth - innerContainer.clientWidth;
    const elementWidth = sidePadding + projectWrapper.clientWidth;
    
    targetSection.current.style.width = `${elementWidth}px`;
    const width = window.innerWidth - elementWidth;
    const duration = `${(elementWidth / window.innerHeight) * 100}%`;
    
    timeline
      .to(targetSection.current, { 
        x: width,
        ease: "power1.inOut",
        duration: 1
      })
      .to(sectionTitle.current, { 
        x: -width,
        ease: "power1.inOut",
        duration: 1
      }, "<");

    const scrollTrigger = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top 95%",
      end: duration,
      scrub: 0.1,
      pin: true,
      animation: timeline,
      pinSpacing: "margin",
      invalidateOnRefresh: true,
      anticipatePin: 1,
      fastScrollEnd: true
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
      if (isDesktop && PROJECTS.length > 2) {
        [projectsTimeline, projectsScrollTrigger] = getProjectsSt();
      } else {
        const projectWrapper = targetSection.current?.querySelector(".project-wrapper");
        if (projectWrapper) {
          projectWrapper.style.width = "100%";
          projectWrapper.style.overflowX = "auto";
          projectWrapper.style.scrollSnapType = "x mandatory";
        }
      }

      [revealTimeline, revealScrollTrigger] = getRevealSt();

      // Refresh ScrollTrigger on window resize and scroll
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      const handleScroll = () => {
        ScrollTrigger.update();
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

      return () => {
        projectsScrollTrigger?.kill();
        projectsTimeline?.kill();
        revealScrollTrigger?.kill();
        revealTimeline?.progress(1);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (error) {
      console.error('Error in Projects animation setup:', error);
    }
  }, [isDesktop, getProjectsSt, getRevealSt, isMounted]);

  return (
    <section
      ref={targetSection}
      className={`${
        isDesktop ? "min-h-screen" : "min-h-[50vh]"
      } w-full relative select-none section-container transform-gpu`}
      id={MENULINKS[2].ref}
    >
      <div className="flex flex-col py-8 justify-center h-full">
        <div
          className="flex flex-col inner-container transform-gpu"
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
          className={`${
            clientHeight > 650 ? "mt-12" : "mt-8"
          } flex project-wrapper w-full seq ${PROJECTS.length <= 2 ? "justify-center" : ""}`}
        >
          {PROJECTS.map((project, index) => (
            <ProjectTile
              classes={
                index === PROJECTS.length - 1 ? "" : "mr-10 xs:mr-12 sm:mr-16"
              }
              project={project}
              key={project.name}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
      <style jsx global>{`
        .project-wrapper::-webkit-scrollbar {
          display: none;
        }
        .project-wrapper {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
