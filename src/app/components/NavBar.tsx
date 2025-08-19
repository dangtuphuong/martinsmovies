import React from "react";
import Link from "next/link";

const underlineStyle = `
  relative text-gray-700 transition
  after:content-[''] after:absolute after:left-0 after:bottom-[-2px]
  after:w-0 after:h-[1.5px] after:bg-current after:transition-all after:duration-300
  hover:after:w-full
`;

const Navbar = () => {
  const links = [{ name: "Home", path: "/" }];

  return (
    <nav className="bg-white shadow-md px-8 py-3 flex items-center justify-between">
      {/* Logo / Brand */}
      <div className="text-xl font-bold bg-gradient-to-b from-[#9352B3] to-[#7a3f9c] bg-clip-text text-transparent">
        Martin&apos;s Movies
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`${underlineStyle} text-xl`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <Link href="/login">
        <button className="px-4 py-2 rounded-sm cursor-pointer flex gap-2 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            strokeWidth={1}
            stroke="currentColor"
            className="size-4"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          LOGIN
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
