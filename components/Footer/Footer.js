/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Howl } from "howler";
import Button from "../Button/Button";
import FooterBg from "./FooterBg/FooterBg";
import Profiles from "../Profiles/Profiles";
import { MENULINKS } from "../../constants";

const Footer = () => {
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const targetSection = useRef(null);

  const heartClickSound = new Howl({
    src: ["/sounds/glug-a.mp3"],
    rate: playbackRate,
    volume: 0.5,
  });

  const handleClick = () => {
    setPlaybackRate((rate) => rate + 0.1);
    heartClickSound.play();
  };

  const handleLinkedInClick = () => {
    window.location.href = 'https://www.linkedin.com/in/kevint1tus/';
  };

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.to(targetSection.current.querySelectorAll(".seq"), { 
      opacity: 1, 
      duration: 0.5,
      stagger: 0.2
    });

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top bottom",
      end: "bottom bottom",
      animation: revealTl,
      scrub: false,
    });
  }, []);

  return (
    <footer
      className="w-full relative select-none bg-cover"
      ref={targetSection}
    >
      <FooterBg />
      <div className="w-full h-full pt-32">
        <div className="section-container flex flex-col h-full justify-end z-10 items-center py-12">
          <h1 className="font-medium text-3xl md:text-4xl text-center seq" style={{ opacity: 0 }}>
            Feel free to connect on social media.
          </h1>
          <div className="text-center seq" style={{ opacity: 0 }}>
            <Profiles />
          </div>
          <div className="seq pt-4 text-center" style={{ opacity: 0 }}>
            <Button
              onClick={handleClick}
              classes="link"
              type="secondary"
            >
              Let&apos;s Talk
            </Button>
          </div>
          <p className="text-center text-white text-sm sm:text-base font-medium tracking-wide mt-8">
            Developed by{' '}
            <button
              type="button"
              className="developer-name"
              onClick={handleLinkedInClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleLinkedInClick();
                }
              }}
            >
              Kevin Titus
            </button>
          </p>
        </div>
      </div>
      <img
        src="/footer-curve.svg"
        className="w-full rotate-180"
        alt=""
        loading="eager"
        height={180}
      />
      <style jsx global>{`
        footer {
          background-image: linear-gradient(270deg, #9f55ff, #7000ff, #8b31ff);
        }

        .developer-name {
          cursor: pointer;
          font-weight: normal;
        }

        .developer-name:hover {
          font-weight: bold;
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
