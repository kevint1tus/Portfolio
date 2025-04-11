import { useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const About2 = ({ clientHeight }) => {
  const quoteRef = useRef(null);
  const targetSection = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone },
    });

    timeline
      .to(quoteRef.current, { opacity: 1, duration: 1 })
      .to(quoteRef.current.querySelector(".about-3"), {
        backgroundPositionX: "100%",
        duration: 0.8,
      });

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top 90%",
      end: "top 30%",
      scrub: 1,
      animation: timeline,
    });
  }, []);

  return (
    <section className="w-full relative select-none" ref={targetSection}>
      <div
        className={`${
          clientHeight > 650 ? "py-80" : "py-72"
        } section-container`}
      >
        <h1
          ref={quoteRef}
          className="font-medium text-[2.70rem] md:text-6xl lg:text-[4rem] text-center"
          style={{ opacity: 0 }}
        >
          Harmonizing my <span className="about-3 font-bold">passions</span> for music, code, and everything in between.
        </h1>
      </div>
      <style jsx global>{`
        .about-3 {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 50%,
            #8b31ff 51%,
            #7000ff 102%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default About2;
