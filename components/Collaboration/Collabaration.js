import { useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Collaboration = ({ clientHeight }) => {
  const quoteRef = useRef(null);
  const targetSection = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone },
    });

    // Set initial states
    gsap.set(quoteRef.current, { opacity: 0 });
    gsap.set(quoteRef.current.querySelector(".text-strong"), { backgroundPositionX: "0%" });
    gsap.set(targetSection.current.querySelector(".ui-left"), { xPercent: 0 });
    gsap.set(targetSection.current.querySelector(".ui-right"), { xPercent: 0 });

    // Create main animation timeline
    timeline
      .to(quoteRef.current, { 
        opacity: 1, 
        duration: 0.5 
      })
      .to(quoteRef.current.querySelector(".text-strong"), {
        backgroundPositionX: "100%",
        duration: 0.5
      }, ">");

    // Create sliding animations timeline
    const slidingTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    slidingTl
      .to(targetSection.current.querySelector(".ui-left"), {
        xPercent: -70,
        duration: 1
      })
      .to(targetSection.current.querySelector(".ui-right"), {
        xPercent: -79,
        duration: 1
      }, "<");

    // Main scroll trigger
    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top 15%",
      end: "center center",
      scrub: 2,
      animation: timeline,
    });

    // Sliding text scroll trigger
    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top 15%",
      end: "center center",
      scrub: 2.5,
      animation: slidingTl,
    });

    return () => {
      timeline.kill();
      slidingTl.kill();
    };
  }, []);

  return (
    <section className="w-full relative select-none my-20" ref={targetSection}>
      <div
        className={`${
          clientHeight > 650 ? "py-20" : "py-24"
        } section-container flex flex-col justify-center min-h-[80vh]`}
      >
        <p className="opacity-40 text-6xl sm:text-7xl font-semibold whitespace-nowrap ui-left transform-gpu">
          {Array(5)
            .fill(
              " Software Engineering Problem Solving Computer Science "
            )
            .reduce((str, el) => str.concat(el), "")}{" "}
        </p>

        <h1
          ref={quoteRef}
          className="mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center"
          style={{ opacity: 0 }}
        >
          Interested in{" "}
          <span className="text-strong font-semibold">Collaboration</span>?
        </h1>

        <p className="mt-6 md:mt-8 opacity-40 text-6xl sm:text-7xl font-semibold whitespace-nowrap ui-right transform-gpu">
          {Array(5)
            .fill(
              " Communication Teamwork Leadership Adaptability "
            )
            .reduce((str, el) => str.concat(el), "")}{" "}
        </p>
      </div>
      <style jsx global>{`
        .text-strong {
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

export default Collaboration;
