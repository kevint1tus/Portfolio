import { useEffect, useState, useRef } from "react";
import Filter from "bad-words";
import { MENULINKS } from "../../constants";
import toast, { Toaster } from "react-hot-toast";
import gsap from "gsap";
import styles from "./Contact.module.scss";

const filter = new Filter();
filter.removeWords("hell", "god", "shit", "tit");

const empty = () =>
  toast.error("Please fill the required fields", {
    id: "error",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

const error = () =>
  toast.error("Error sending your message", {
    id: "error",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

const success = () =>
  toast.success("Message sent successfully", {
    id: "success",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

const Contact = () => {
  const initialState = { name: "", email: "", message: "" };
  const [formData, setFormData] = useState(initialState);
  const [mailerResponse, setMailerResponse] = useState("not initiated");
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const buttonEl = useRef(null);

  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s]{2,30}$/;
    return nameRegex.test(name);
  };
  
  const handleChange = ({ target }) => {
    const { id, value } = target;
    value.length === 0 ? setIsSending(false) : setIsSending(true);
  
    setFormData((prevVal) => {
      if (value.trim() !== prevVal[id] && value.trim().length > prevVal[id].trim().length) {
        let cleanedValue = filter.clean(value.trim());
        if (id === 'name' && !isValidName(cleanedValue)) {
          setErrorMsg('Invalid name format');
        } else if (id === 'email' && !isValidEmail(cleanedValue)) {
          setErrorMsg('Invalid email format');
        } else {
          setErrorMsg('');
        }
  
        return { ...prevVal, [id]: cleanedValue };
      } else {
        return { ...prevVal, [id]: value };
      }
    });
  };
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const emptyForm = () => {
    setFormData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (name === "" || email === "" || message === "") {
      empty();
      return setMailerResponse("empty");
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setMailerResponse("success");
        emptyForm();
      } else {
        setMailerResponse("error");
      }
    } catch (err) {
      setMailerResponse("error");
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMailerResponse("not initiated");
    }, 10000);
  }, [mailerResponse]);

  useEffect(() => {
    buttonEl.current.addEventListener("click", (e) => {
      if (!buttonEl.current.classList.contains("active")) {
        buttonEl.current.classList.add("active");

        gsap.to(buttonEl.current, {
          keyframes: [
            {
              "--left-wing-first-x": 50,
              "--left-wing-first-y": 100,
              "--right-wing-second-x": 50,
              "--right-wing-second-y": 100,
              duration: 0.2,
              onComplete() {
                gsap.set(buttonEl.current, {
                  "--left-wing-first-y": 0,
                  "--left-wing-second-x": 40,
                  "--left-wing-second-y": 100,
                  "--left-wing-third-x": 0,
                  "--left-wing-third-y": 100,
                  "--left-body-third-x": 40,
                  "--right-wing-first-x": 50,
                  "--right-wing-first-y": 0,
                  "--right-wing-second-x": 60,
                  "--right-wing-second-y": 100,
                  "--right-wing-third-x": 100,
                  "--right-wing-third-y": 100,
                  "--right-body-third-x": 60,
                });
              },
            },
            {
              "--left-wing-third-x": 20,
              "--left-wing-third-y": 90,
              "--left-wing-second-y": 90,
              "--left-body-third-y": 90,
              "--right-wing-third-x": 80,
              "--right-wing-third-y": 90,
              "--right-body-third-y": 90,
              "--right-wing-second-y": 90,
              duration: 0.2,
            },
            {
              "--rotate": 50,
              "--left-wing-third-y": 95,
              "--left-wing-third-x": 27,
              "--right-body-third-x": 45,
              "--right-wing-second-x": 45,
              "--right-wing-third-x": 60,
              "--right-wing-third-y": 83,
              duration: 0.25,
            },
            {
              "--rotate": 60,
              "--plane-x": -8,
              "--plane-y": 40,
              duration: 0.2,
            },
            {
              "--rotate": 40,
              "--plane-x": 45,
              "--plane-y": -300,
              "--plane-opacity": 0,
              duration: 0.375,
              onComplete() {
                setTimeout(() => {
                  buttonEl.current.removeAttribute("style");
                  gsap.fromTo(
                    buttonEl.current,
                    {
                      opacity: 0,
                      y: -8,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      clearProps: true,
                      duration: 0.3,
                      onComplete() {
                        buttonEl.current.classList.remove("active");
                      },
                    }
                  );
                }, 1800);
              },
            },
          ],
        });

        gsap.to(buttonEl.current, {
          keyframes: [
            {
              "--text-opacity": 0,
              "--border-radius": 0,
              "--left-wing-background": "#9f55ff",
              "--right-wing-background": "#9f55ff",
              duration: 0.11,
            },
            {
              "--left-wing-background": "#8b31ff",
              "--right-wing-background": "#8b31ff",
              duration: 0.14,
            },
            {
              "--left-body-background": "#9f55ff",
              "--right-body-background": "#9f55ff",
              duration: 0.25,
              delay: 0.1,
            },
            {
              "--trails-stroke": 171,
              duration: 0.22,
              delay: 0.22,
            },
            {
              "--success-opacity": 1,
              "--success-x": 0,
              duration: 0.2,
              delay: 0.15,
            },
            {
              "--success-stroke": 0,
              duration: 0.15,
            },
          ],
        });
      }
    });
  }, [buttonEl]);

  return (
    <section
      className="mt-30 w-full relative select-none bg-gray-dark-4 pt-20 sm:pt-10 md:pt-5 lg:pt-1 pb-20"
      id={MENULINKS[5].ref}
    >
      <div>
        <Toaster />
      </div>
      <div className="section-container flex flex-col justify-center">
        <div className="flex flex-col work-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 seq">
              CONTACT
            </p>
            <h1 className="text-6xl mt-2 font-medium text-gradient w-fit seq">
              Contact
            </h1>
          </div>
          <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 seq">
            Get In Touch.{" "}
          </h2>
          <div className="w-full flex justify-center">
            <div className="w-full md:max-w-lg mt-8 mb-6">
              <div className="pgp-card flex items-start gap-3 border border-blue-400/30 rounded-xl p-5 shadow-2xl backdrop-blur-xl backdrop-saturate-200 bg-white/10 transition-all duration-300 hover:shadow-blue-400/30 hover:border-blue-400/60 hover:scale-[1.025] focus-within:shadow-blue-400/40 focus-within:border-blue-400/80 focus-within:scale-[1.03]">
                <div className="flex-shrink-0 mt-1 text-blue-400">
                  {/* Lock icon SVG */}
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Privacy</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-8-2a4 4 0 118 0v2H8V9z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-white text-base mb-1">Want extra privacy?</div>
                  <div className="text-gray-200 text-sm leading-relaxed">
                    You can send me encrypted messages using
                    <a
                      href="/pgp"
                      className="link font-semibold underline text-blue-400 hover:text-blue-300 transition-all duration-200 px-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer inline-block hover:scale-110 focus:scale-110 hover:underline focus:underline"
                      style={{textUnderlineOffset: '3px'}}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PGP
                    </a>
                    for secure communication.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form className="pt-10 sm:mx-auto sm:w-[30rem] md:w-[35rem]">
  <div className="animate__animated animate__fadeInUp">
            <div className="relative">
              <input
                type="text"
                id="name"
                className="block w-full h-12 sm:h-14 px-4 text-xl sm:text-2xl font-mono outline-none border-2 border-purple bg-transparent rounded-[0.6rem] transition-all duration-200 focus:bg-gray-dark-5  active:bg-gray-dark-5"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="name"
                className="absolute top-0 left-0 h-full flex items-center pl-4 text-lg font-mono transform transition-all"
              >
                Name
              </label>
            </div>

            <div className="relative mt-14">
    <input
      type="text"
      id="email"
      className="block w-full h-12 sm:h-14 px-4 text-xl sm:text-2xl font-mono outline-none border-2 border-purple bg-transparent rounded-[0.6rem] transition-all duration-200 focus:bg-gray-dark-5  active:bg-gray-dark-5"
      value={formData.email}
      onChange={handleChange}
      required
    />
    <label
      htmlFor="email"
      className="absolute top-0 left-0 h-full flex items-center pl-4 text-lg font-mono transform transition-all"
    >
      Email
    </label>
  </div>

  {/* Display the error message */}
  {errorMsg && <p className="text-red-500">{errorMsg}</p>}

            <div className="relative mt-14">
              <textarea
                id="message"
                className="block w-full h-auto min-h-[10rem] max-h-[20rem] sm:h-14 py-2 px-4 text-xl sm:text-2xl font-mono outline-none border-2 border-purple bg-transparent rounded-[0.6rem] transition-all duration-200 focus:bg-gray-dark-5  active:bg-gray-dark-5"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="message"
                className="absolute top-0 left-0 h-14 flex items-center pl-4 text-lg font-mono transform transition-all"
              >
                Message
              </label>
            </div>
          </div>

          {mailerResponse !== "not initiated" &&
            (mailerResponse === "success" ? (
              <div className="hidden">{success()}</div>
            ) : (
              <div className="hidden">{error()}</div>
            ))}
        </form>
        <div className="mt-9 mx-auto link">
          <button
            className={styles.button}
            ref={buttonEl}
            disabled={
              formData.name === "" ||
              formData.email === "" ||
              formData.message === ""
                ? true
                : false
            }
            onClick={handleSubmit}
          >
            <span className={styles.default}>Send -&gt;</span>
            <span className={styles.success}>
              <svg viewBox="0 0 16 16">
                <polyline points="3.75 9 7 12 13 5"></polyline>
              </svg>
              Sent
            </span>
            <svg className={styles.trails} viewBox="0 0 33 64">
              <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
              <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
            </svg>
            <div className={styles.plane}>
              <div className={styles.left}></div>
              <div className={styles.right}></div>
            </div>
          </button>
        </div>
      </div>
      <style jsx global>{`
        input,
        label,
        textarea {
          cursor: none;
        }

        input:hover,
        textarea:hover {
          box-shadow: 0 0 0.3rem #7000ff;
        }

        input:active,
        input:focus,
        textarea:active,
        textarea:focus {
          box-shadow: 0 0 0.3rem #120e16;
        }

        input:focus + label,
        input:valid + label {
          height: 50%;
          padding-left: 0;
          transform: translateY(-100%);
        }

        textarea:focus + label,
        textarea:valid + label {
          height: 17%;
          padding-left: 0;
          transform: translateY(-100%);
        }
      `}</style>
    </section>
  );
};

export default Contact;
