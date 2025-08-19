import React from "react";
import Link from "next/link";

import { UserIcon } from "@heroicons/react/24/outline";
import {
  GlobeAsiaAustraliaIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

const underlineStyle = `
  relative text-gray-700 transition
  after:content-[''] after:absolute after:left-0 after:bottom-[-2px]
  after:w-0 after:h-[1.5px] after:bg-current after:transition-all after:duration-300
  hover:after:w-full
`;

const Navbar = () => {
  const links = [
    {
      name: "Home",
      path: "/",
      sublinks: [
        {
          name: "Home Versions",
          sublinks: [
            { name: "Home Version 1", path: "/" },
            { name: "Home Version 2", path: "/#" },
            { name: "Home Version 3", path: "/#" },
            { name: "Home Version 4", path: "/#" },
          ],
        },
      ],
    },
    {
      name: "Pages",
      path: "/#",
      sublinks: [
        {
          name: "General Pages",
          sublinks: [
            { name: "404 Page", path: "/#" },
            { name: "Coming Soon", path: "/#" },
            { name: "Pricing Plan", path: "/#" },
            { name: "Login - Register", path: "/#" },
            { name: "Testimonials", path: "/#" },
            { name: "Contact Us", path: "/#" },
          ],
        },
        {
          name: "Celebrities",
          sublinks: [
            { name: "Celebrities List", path: "/#" },
            { name: "Celebrities Grid", path: "/#" },
            { name: "Celebrity Detail", path: "/#" },
          ],
        },
      ],
    },
    {
      name: "Movies & TV Shows",
      path: "/#",
      sublinks: [
        {
          name: "Movie Lists",
          sublinks: [
            { name: "Movie List 1", path: "/#" },
            { name: "Movie List 2", path: "/#" },
          ],
        },
        {
          name: "Movie Grids",
          sublinks: [
            { name: "Movie Grid 1", path: "/#" },
            { name: "Movie Grid 2", path: "/#" },
            { name: "Movie Grid 3", path: "/#" },
            { name: "Movie Grid 4", path: "/#" },
          ],
        },
        {
          name: "Movie Details",
          sublinks: [
            { name: "Movie Detail", path: "/#" },
            { name: "Movie Detail 2", path: "/#" },
          ],
        },
        {
          name: "Other",
          sublinks: [{ name: "Watch Later", path: "/#" }],
        },
      ],
    },
    {
      name: "Blog",
      path: "/#",
      sublinks: [
        {
          name: "Blog Lists",
          sublinks: [
            { name: "Blog List", path: "/#" },
            { name: "Blog List Fullwidth", path: "/#" },
          ],
        },
        {
          name: "Blog Details",
          sublinks: [
            { name: "Blog Detail", path: "/#" },
            { name: "Blog Detail Fullwidth", path: "/#" },
          ],
        },
      ],
    },
    { name: "Contact Us", path: "/#" },
  ];

  return (
    <nav className="bg-white shadow-md px-8 py-3 flex items-center justify-between">
      {/* Logo / Brand */}
      <div className="text-xl font-bold bg-gradient-to-b from-[#9352B3] to-[#7a3f9c] bg-clip-text text-transparent">
        Martin&apos;s Movies
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 relative">
        {links.map((link) => (
          <div key={link.name} className="relative group">
            <Link
              href={link.path}
              className={`${underlineStyle} text-l flex items-center`}
            >
              {link.name}
              {link.sublinks && <ChevronDownIcon className="w-4 h-4 ml-1" />}
            </Link>

            {/* Dropdown */}
            {link.sublinks && (
              <div className="absolute left-0 mt-2 w-50 bg-white shadow-lg rounded-sm opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {link.sublinks.map((sublink, idx) => (
                  <div key={sublink.name}>
                    {idx > 0 && <hr className="border-t border-gray-200" />}
                    <div className="px-2 py-1">
                      {sublink.sublinks.map((child) => (
                        <Link
                          key={child.name}
                          href={child.path}
                          className="block px-2 py-1 text-gray-700 hover:text-[#7a3f9c]"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/#">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </Link>

        <Link href="/#">
          <GlobeAsiaAustraliaIcon className="w-5 h-5" />
        </Link>

        <Link href="/login">
          <button className="px-4 py-2 rounded-sm cursor-pointer flex gap-2 justify-center items-center">
            <UserIcon className="w-4 h-4" />
            LOGIN
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
