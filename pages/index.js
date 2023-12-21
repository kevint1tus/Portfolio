import { useEffect, useState } from "react";

import About1 from "@/components/About/About1";
import About2 from "@/components/About/About2";
import Collaboration from "@/components/Collaboration/Collabaration";
import Contact from "@/components/Contact/Contact";
import Cursor from "@/components/Cursor/Cursor";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Menu from "@/components/Header/Menu/Menu";
import Meta from "@/components/Seo/Meta";
import ProgressIndicator from "@/components/ProgressIndicator/ProgressIndicator";
import Projects from "@/components/Projects/Projects";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Skills from "@/components/Skills/Skills";
import { displayFancyLogs } from "@/utils";
import { gsap } from "gsap";

export default function Home() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });

    const [isDesktop, setIsDesktop] = useState(true);
    const [clientHeight, setClientHeight] = useState(0);
    const [clientWidth, setClientWidth] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState('Student'); // Initial word

    const wordsArray = ['Student', 'Nerd', 'Developer', 'Musician', 'Designer'];

    useEffect(() => {
        const { innerWidth, innerHeight, orientation, history } = window;

        const result =
            typeof orientation === "undefined" &&
            navigator.userAgent.indexOf("IEMobile") === -1;
        history.scrollRestoration = "manual";

        setIsDesktop(result);
        setClientHeight(innerHeight);
        setClientWidth(innerWidth);

        displayFancyLogs();
    }, [isDesktop]);

    useEffect(() => {
        // Update the word every 3 seconds with fade-in/fade-out transition
        const intervalId = setInterval(() => {
            gsap.to('.changing-word', {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsArray.length);
                    setCurrentWord(wordsArray[currentWordIndex]);
                    gsap.to('.changing-word', { opacity: 0.2, duration: 0.5 });
                },
            });
        }, 3000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, [currentWordIndex]);

    return (
        <>
            <Meta>
                <>
                    <Header>
                        <Menu />
                    </Header>
                    <ProgressIndicator />
                    <Cursor isDesktop={isDesktop} />
                    <main className="flex flex-col">
                        {/* Updated styles for consistent alignment and added a fade-in class */}
                        <div
                            role="img"
                            className="text-gray-light-1 opacity-10 sm:text-9xl xs:text-8xl inline-block -z-10 absolute rotate-90 right-0 md:top-52 xs:top-96 w-[200px] changing-word animate-fade-in" // Adjust the width as needed
                        >
                            {currentWord}
                        </div>
                        <div className="fixed top-0 left-0 h-screen w-screen -z-1"></div>
                        <Hero />
                        <About1 clientHeight={clientHeight} />
                        <Skills />
                        <About2 clientHeight={clientHeight} />
                        <Projects isDesktop={isDesktop} clientHeight={clientHeight} />
                        <Collaboration clientHeight={clientHeight} />
                        <div className="pt-10 sm:pt-16 bg-gray-dark-4"></div>
                        <Contact />
                    </main>
                    <Footer />

                </>
            </Meta>
        </>
    );
}
