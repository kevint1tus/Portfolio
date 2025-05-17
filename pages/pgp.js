import { useEffect, useState } from "react";
import Meta from "@/components/Seo/Meta";
import Cursor from "@/components/Cursor/Cursor";

const PGP_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEaCe/IhYJKwYBBAHaRw8BAQdARDrekOX/958lonaUAHblslPGWY/ZlWYDk2LI
Aa/TTmC0JUtldmluIFRpdHVzIDxrZXZpbi50aXR1c0Bob3RtYWlsLmNvbT6ImQQT
FgoAQRYhBB/H6GZtrAHkFaRjC9GpBBFuh5+DBQJoJ78iAhsDBQkHhM4ABQsJCAcC
AiICBhUKCQgLAgQWAgMBAh4HAheAAAoJENGpBBFuh5+DzEcA/A++20tvQzLSw6h7
jPvKnx+Xcm77BdrANAlequWA6nEiAP9+R2ThHHig1b64qhHpv/LwDotP5owJmdPI
rGQvLkZmBrg4BGgnvyISCisGAQQBl1UBBQEBB0B0ej7h5zeaa3v2+jsHChxePUFG
mTSkK5PSSp1WCA5sYgMBCAeIfgQYFgoAJhYhBB/H6GZtrAHkFaRjC9GpBBFuh5+D
BQJoJ78iAhsMBQkHhM4AAAoJENGpBBFuh5+D44sA/iRQOa3XjzqhF+Dv41dmj9HG
CiYXNx4gigsW4iEnVMA1AP9zKfid8CdiXvnQEckWEyvtZPmUAbRvCjRU6meDknb/
AQ==
=lBcl
-----END PGP PUBLIC KEY BLOCK-----`;

export default function PGPPage() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    const { orientation } = window;
    const result =
      typeof orientation === "undefined" &&
      navigator.userAgent.indexOf("IEMobile") === -1;
    setIsDesktop(result);
  }, []);

  const handleCopy = async () => {
    if (!document.hasFocus()) {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
      return;
    }
    try {
      await navigator.clipboard.writeText(PGP_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // Fallback for older browsers or if clipboard API fails
      try {
        const textarea = document.createElement('textarea');
        textarea.value = PGP_KEY;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
          return;
        }
        throw new Error('Fallback copy failed');
      } catch (fallbackErr) {
        setCopyError(true);
        setTimeout(() => setCopyError(false), 2000);
      }
    }
  };

  return (
    <Meta>
      <Cursor isDesktop={isDesktop} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4">
        <h1 className="text-3xl font-bold mb-6">Kevin Titus - PGP Public Key</h1>
        <button
          type="button"
          onClick={handleCopy}
          className="mb-3 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-green-400 border border-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm font-mono"
        >
          {copied ? "Copied!" : "Copy Public Key"}
        </button>
        {copyError && (
          <div className="mb-2 text-red-400 text-xs">Failed to copy. Make sure the page is focused and try again.</div>
        )}
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs md:text-base max-w-full border border-gray-700 shadow-lg">
          {PGP_KEY}
        </pre>
        <p className="mt-6 text-gray-300 text-center text-sm">For secure communication, use the above PGP public key.<br/>Email: <a href="mailto:hello@titusk.me" className="underline text-blue-400">hello@titusk.me</a></p>
        <p className="mt-4 text-gray-400 text-center text-sm max-w-xl">
          You can send (relatively) secure messages directly to me by encrypting your message using my public PGP key before sending it over the internet via socials, email, etc. You can also sign it using your private key for extra security, which also helps me identify the sender.<br/><br/>
          I'd recommend using <a href="https://gpg4win.org/" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">gpg4win</a> to encrypt your messages securely, or you can use an online signing site, in which case I'd recommend <a href="https://www.codref.org/pgp/sign" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">codref.org</a>, but as always, DYOR.
        </p>
      </div>
    </Meta>
  );
} 