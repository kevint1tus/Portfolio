import { useState, useEffect } from 'react';
import Cursor from "@/components/Cursor/Cursor";
import styles from '@/components/Contact/Contact.module.scss'; 
import Header from "@/components/Header/Header";

export default function Login() {
    const [isDesktop, setIsDesktop] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 767);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => window.removeEventListener('resize', handleResize);
    }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Login successful:', data);
    } else {
      console.error('Login failed:', data.message);
    }
  };

  const shouldLabelMove = (value) => value.length > 0;

  return (
    <>
        <Header />
        <main className="flex flex-col justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-gray-dark-4 p-8 rounded-lg shadow-lg sm:mx-auto sm:w-[30rem] md:w-[35rem]">
                <div className="relative mt-14">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full h-12 sm:h-14 px-4 text-xl sm:text-2xl font-mono outline-none border-2 border-purple bg-transparent rounded-[0.6rem] transition-all duration-200 focus:bg-gray-dark-5 active:bg-gray-dark-5"
                        required
                    />
                    <label htmlFor="username" className={`absolute left-0 h-full flex items-center pl-4 text-lg font-mono transform transition-all duration-200 ${shouldLabelMove(username) ? 'top-[-20px] text-sm' : 'top-0'}`}>
                        Username
                    </label>
                </div>
                <div className="relative mt-14">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full h-12 sm:h-14 px-4 text-xl sm:text-2xl font-mono outline-none border-2 border-purple bg-transparent rounded-[0.6rem] transition-all duration-200 focus:bg-gray-dark-5 active:bg-gray-dark-5"
                        required
                    />
                    <label htmlFor="password" className={`absolute left-0 h-full flex items-center pl-4 text-lg font-mono transform transition-all duration-200 ${shouldLabelMove(password) ? 'top-[-20px] text-sm' : 'top-0'}`}>
                        Password
                    </label>
                </div>
                <div className="mt-9 mx-auto link">
                    <button className={styles.button} type="submit">
                        <span className={styles.default}>Log In -&gt;</span>
                    </button>
                </div>
            </form>
        </main>
        <Cursor isDesktop={isDesktop} />
    </>
);
}