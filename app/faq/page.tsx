"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

export default function Home() {
  var [dropdownIdx, setDropdownIdx] = useState(-1);

  const router = useRouter();

  function handleDropdown(idx: number) {
    if (dropdownIdx === idx) {
      setDropdownIdx(-1);
    } else {
      setDropdownIdx(idx);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-screen max-w-[600px] p-3">
        <button onClick={() => router.back()} className="text-violet-400">
          Exit
        </button>
        <h1 className="mt-4 mb-7 text-2xl text-left">Password Manager FAQ</h1>
        <button
          onClick={() => handleDropdown(0)}
          className="p-3 mb-1 bg-violet-600 text-white text-left w-full flex items-center justify-between rounded"
        >
          <h1 className="text-xl">How to choose a good password?</h1>
          {dropdownIdx === 0 ? (
            <IoIosArrowDropdown size={30} className="min-w-[30px] rotate-180" />
          ) : (
            <IoIosArrowDropdown size={30} className="min-w-[30px] " />
          )}
        </button>
        {dropdownIdx === 0 ? (
          <div className="p-3 mb-1 bg-white text-black w-full rounded">
            <h2 className="font-bold text-xl">Length</h2>
            <p className="mb-2">
              Your password should be at least 9 characters long. Any less can
              be easily{" "}
              <a
                className="underline text-blue-500"
                href="https://en.wikipedia.org/wiki/Brute-force_attack"
                target="_blank"
              >
                brute-forced
              </a>
              .
            </p>
            <h2 className="font-bold text-xl">Content</h2>
            <p className="mb-2">
              A good practice is to use a series of words joined together.
              However, if you use common words your password is susceptible to a{" "}
              <a
                className="underline text-blue-500"
                href="https://en.wikipedia.org/wiki/Dictionary_attack"
                target="_blank"
              >
                dictionary attack
              </a>
              . Combine at least four words together that are unique to you, add
              non-alphabetic characters and you have created a near unbreakable
              password.
            </p>
            <h2 className="font-bold text-xl">Entropy</h2>
            <p>
              Password entropy is a concept used to measure the strength of a
              password in terms of its resistance to various types of attacks,
              particularly brute-force attacks. The higher the password entropy,
              the harder it is to guess or crack the password using brute-force
              methods or by trying all possible combinations. You can increase
              your password entropy by using a longer password with uppercase
              letters, digits, and special characters.
            </p>
          </div>
        ) : null}
        <button
          onClick={() => handleDropdown(1)}
          className="p-3 mb-1 bg-violet-600 text-white text-left w-full flex items-center justify-between rounded"
        >
          <h1 className="text-xl">How are my password stored?</h1>
          {dropdownIdx === 1 ? (
            <IoIosArrowDropdown size={30} className="min-w-[30px] rotate-180" />
          ) : (
            <IoIosArrowDropdown size={30} className="min-w-[30px] " />
          )}
        </button>
        {dropdownIdx === 1 ? (
          <div className="p-3 mb-1 bg-white text-black w-full rounded">
            <h2 className="font-bold text-xl">Login</h2>
            <p className="mb-2">
              When you enter your password to login, it is encrypted using the
              cryptographic key derivation function{" "}
              <a
                className="underline text-blue-500"
                href="https://www.ssltrust.com.au/blog/pbkdf2-password-key-derivation"
                target="_blank"
              >
                PBKDF2
              </a>
              . This function will hash your password 5000 times, making it
              resistant to dictionary attacks and rainbow table attacks.
            </p>
            <h2 className="font-bold text-xl">Storing your passwords</h2>
            <p>
              When you add a password to your list, it is encrypted into your
              vault using the symmetric block cipher algorithm{" "}
              <a
                className="underline text-blue-500"
                href="https://www.simplilearn.com/tutorials/cryptography-tutorial/aes-encryption"
                target="_blank"
              >
                Advanced Encryption Standard (AES)
              </a>
              . This encryption is done using a key generated from your password
              so only you can access and decrypt your vault.
            </p>
          </div>
        ) : null}
        <button
          onClick={() => handleDropdown(2)}
          className="p-3 mb-1 bg-violet-600 text-white text-left w-full flex items-center justify-between rounded"
        >
          <h1 className="text-xl">
            What are some resources for password managers?
          </h1>
          {dropdownIdx === 2 ? (
            <IoIosArrowDropdown size={30} className="min-w-[30px] rotate-180" />
          ) : (
            <IoIosArrowDropdown size={30} className="min-w-[30px] " />
          )}
        </button>
        {dropdownIdx === 2 ? (
          <div className="p-3 mb-1 bg-white text-black w-full rounded">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/w68BBPDAWr8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : null}
      </div>
    </div>
  );
}
