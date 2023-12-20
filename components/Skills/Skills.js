/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import Image from "next/image";
import { MENULINKS, SKILLS } from "../../constants";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Skills = () => {
  const targetSection = useRef(null);

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    ScrollTrigger.create({
      trigger: targetSection.current.querySelector(".skills-wrapper"),
      start: "100px bottom",
      end: `center center`,
      animation: revealTl,
      scrub: 0,
    });
  }, [targetSection]);

  return (
    <section
      className="w-full relative select-none mt-44"
      id={MENULINKS[1].ref}
      ref={targetSection}
    >
      <div className="section-container py-16 flex flex-col justify-center">
        <img
          src="/right-pattern.svg"
          alt=""
          className="absolute hidden right-0 bottom-2/4 w-2/12 max-w-xs md:block"
          loading="lazy"
          height={700}
          width={320}
        />
        <div className="flex flex-col skills-wrapper">
  <div className="flex flex-col">
    <p className="uppercase tracking-widest text-gray-light-1 seq">
      SKILLS
    </p>
    <h1 className="text-6xl mt-2 font-medium text-gradient w-fit seq">
      Tools & Languages
    </h1>
    <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 seq">
      My current favourite technologies are:{" "}
    </h2>
  </div>
  <div className="mt-10">
    <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 seq">
      LANGUAGES AND TOOLS
    </h3>
    <div className="grid grid-cols-2 gap-1 seq">
      {[
        "VB.NET (Visual Basic)",
        "C#",
        "Java",
        "SQL (MySQL)",
        "Javascript",
        "HTML/CSS",
        "PHP",
      ].map((skill) => (
        <div
          key={skill}
          className="list-none cursor-pointer transition-all transform hover:scale-105 hover:font-bold hover:text-blue-500"
        >
          <span className="font-bold text-lg">•</span> {skill}
        </div>
      ))}
    </div>
  </div>
  <div className="mt-10">
    <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 seq">
      LIBRARIES AND FRAMEWORKS
    </h3>
    <div className="grid grid-cols-2 gap-0.5 seq">
      {SKILLS.librariesAndFrameworks.map((skill) => (
        <div
          key={skill}
          className="list-none cursor-pointer transition-all transform hover:scale-105 hover:font-bold hover:text-blue-500"
        >
          <span className="font-bold text-lg">•</span> {skill}
        </div>
      ))}
    </div>
  </div>
  <div className="flex flex-wrap mt-10">
    <div className="mr-16 xs:mr-20 mb-6">
      <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 seq">
        DATABASES
      </h3>
      <div className="grid grid-cols-2 gap-0.5 seq">
        {SKILLS.databases.map((skill) => (
          <div
            key={skill}
            className="list-none cursor-pointer transition-all transform hover:scale-105 hover:font-bold hover:text-blue-500"
          >
            <span className="font-bold text-lg">•</span> {skill}
          </div>
        ))}
      </div>
    </div>
    <div>
      <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 seq">
        Other
      </h3>
      <div className="grid grid-cols-2 gap-0.5 seq">
        {SKILLS.other.map((skill) => (
          <div
            key={skill}
            className="list-none cursor-pointer transition-all transform hover:scale-105 hover:font-bold hover:text-blue-500"
          >
            <span className="font-bold text-lg">•</span> {skill}
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default Skills;
