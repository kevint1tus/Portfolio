import { useEffect } from 'react';
import Image from "next/image";

const Header = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLogoClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    scrollToTop();
  };

  return (
    <nav className="w-full fixed top-0 py-8 z-50 select-none bg-gradient-to-b from-gray-dark-5 shadow-gray-dark-5 transition-all duration-300">
      <div className="animate__animated animate__fadeIn" />
      <div className="flex justify-between section-container">
        <a href="/" className="link" onClick={handleLogoClick}>
          <Image
            src="/logo.svg"
            alt="Logo - Kevin Titus"
            width={150}
            height={60}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </a>

        <div className="outer-menu relative">
          <input
            aria-labelledby="menu"
            className="checkbox-toggle link absolute top-0 right-0 w-6 h-6 opacity-0"
            type="checkbox"
            aria-label="menu"
          />

          <div className="hamburger absolute top-2 right-0 w-6 h-6 flex items-center justify-center">
            <div className="relative flex-none w-full bg-white duration-300 flex items-center justify-center" />
          </div>
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Header;
