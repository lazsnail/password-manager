"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

export default function Home() {
  var [dropdownIdx, setDropdownIdx] = useState(-1);

  const router = useRouter();

  function handleDropdown(idx : number) {
    if (dropdownIdx === idx) {
        setDropdownIdx(-1);
    }
    else {
        setDropdownIdx(idx);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-screen max-w-[600px] p-3">
        <button onClick={() => router.back()} className="text-violet-400">
            Exit
        </button>
        <h1 className="mt-4 mb-7 text-2xl text-left">
          Password Manager FAQ
        </h1>
        <button onClick={() => handleDropdown(0)} className="p-3 mb-1 bg-violet-600 text-white text-left w-full flex items-center justify-between rounded">
          <h1 className="text-xl">How to choose a good password?</h1>
          {dropdownIdx === 0 ? (<IoIosArrowDropdown size={30} className="min-w-[30px] rotate-180"/>) : (<IoIosArrowDropdown size={30} className="min-w-[30px] "/>)}
        </button>
        {dropdownIdx === 0 ? (
          <p className="p-3 mb-1 bg-white text-black w-full rounded">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel
            risus ac lorem rhoncus rhoncus id ac arcu. Nunc nec convallis ex.
            Pellentesque rhoncus urna sit amet turpis tempor, et suscipit dolor
            fringilla. Ut porttitor elementum risus ac eleifend. Sed bibendum
            neque ut fringilla pretium. Proin sed arcu volutpat lectus gravida
            mollis id in enim. Proin egestas blandit velit, non imperdiet eros
            porttitor nec. Praesent sodales eleifend elit dapibus tempus. Sed
            vitae quam diam. Sed et consectetur ligula. Suspendisse eget leo
            bibendum ipsum pretium elementum volutpat id risus.
          </p>
        ) : null}
        <button onClick={() => handleDropdown(1)} className="p-3 mb-1 bg-violet-600 text-white text-left w-full flex items-center justify-between rounded">
          <h1 className="text-xl">How are my password stored?</h1>
          {dropdownIdx === 1 ? (<IoIosArrowDropdown size={30} className="min-w-[30px] rotate-180"/>) : (<IoIosArrowDropdown size={30} className="min-w-[30px] "/>)}
        </button>
        {dropdownIdx === 1 ? (
          <p className="p-3 mb-1 bg-white text-black w-full rounded">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel
            risus ac lorem rhoncus rhoncus id ac arcu. Nunc nec convallis ex.
            Pellentesque rhoncus urna sit amet turpis tempor, et suscipit dolor
            fringilla. Ut porttitor elementum risus ac eleifend. Sed bibendum
            neque ut fringilla pretium. Proin sed arcu volutpat lectus gravida
            mollis id in enim. Proin egestas blandit velit, non imperdiet eros
            porttitor nec. Praesent sodales eleifend elit dapibus tempus. Sed
            vitae quam diam. Sed et consectetur ligula. Suspendisse eget leo
            bibendum ipsum pretium elementum volutpat id risus.
          </p>
        ) : null}
        <button onClick={() => handleDropdown(2)} className="p-3 mb-1 bg-violet-600 text-white text-left w-full flex items-center justify-between rounded">
          <h1 className="text-xl">What are some resources for password managers?</h1>
          {dropdownIdx === 2 ? (<IoIosArrowDropdown size={30} className="min-w-[30px] rotate-180"/>) : (<IoIosArrowDropdown size={30} className="min-w-[30px] "/>)}
        </button>
        {dropdownIdx === 2 ? (
          <p className="p-3 mb-1 bg-white text-black w-full rounded">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel
            risus ac lorem rhoncus rhoncus id ac arcu. Nunc nec convallis ex.
            Pellentesque rhoncus urna sit amet turpis tempor, et suscipit dolor
            fringilla. Ut porttitor elementum risus ac eleifend. Sed bibendum
            neque ut fringilla pretium. Proin sed arcu volutpat lectus gravida
            mollis id in enim. Proin egestas blandit velit, non imperdiet eros
            porttitor nec. Praesent sodales eleifend elit dapibus tempus. Sed
            vitae quam diam. Sed et consectetur ligula. Suspendisse eget leo
            bibendum ipsum pretium elementum volutpat id risus.
          </p>
        ) : null}
      </div>
    </div>
  );
}
