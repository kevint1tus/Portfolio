import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Collaboration = ({ clientHeight }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Animate the gradient text
      gsap.fromTo(
        gradientRef.current,
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "100% 50%",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Animate the floating text
      const floatingTexts = sectionRef.current.querySelectorAll(".floating-text");
      floatingTexts.forEach((text, index) => {
        gsap.fromTo(
          text,
          { 
            opacity: 0,
            y: 50,
          },
          {
            opacity: 0.4,
            y: 0,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full relative select-none py-20 md:py-32 overflow-hidden bg-gray-dark-4"
    >
      <div className="section-container">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Top floating text */}
          <div className="floating-text opacity-0 text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-light-1 whitespace-nowrap">
            Software Engineering • Problem Solving • Computer Science
          </div>

          {/* Main heading */}
          <h2 
            ref={textRef}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-center"
          >
            Interested in{" "}
            <span 
              ref={gradientRef}
              className="text-strong font-semibold"
            >
              Collaboration
            </span>
            ?
          </h2>

          {/* Bottom floating text */}
          <div className="floating-text opacity-0 text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-light-1 whitespace-nowrap">
            Communication • Teamwork • Leadership • Adaptability
          </div>
        </div>
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
