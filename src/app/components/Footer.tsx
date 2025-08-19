import React from "react";
import { AtSymbolIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-200 mt-10">
      {/* FOOTER WIDGET AREA */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Widget 1 */}
            <div>
              <div className="mb-4 text-3xl font-bold bg-gradient-to-b from-[#9352B3] to-[#7a3f9c] bg-clip-text text-transparent">
                Martin&apos;s Movies
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Itaque, ducimus, atque. Praesentium suscipit provident explicabo
                dignissimos nostrum numquam deserunt earum accusantium et fugit.
              </p>
            </div>

            {/* Widget 2 */}
            <div>
              <h4 className="text-2xl font-semibold mb-4">Useful Links</h4>
              <ul className="space-y-2">
                <li className="hover:text-purple-500 transform hover:translate-x-3 transition-all duration-200">
                  <a href="#">About Movify</a>
                </li>
                <li className="hover:text-purple-500 transform hover:translate-x-3 transition-all duration-200">
                  <a href="#">Blog</a>
                </li>
                <li className="hover:text-purple-500 transform hover:translate-x-3 transition-all duration-200">
                  <a href="#">Forum</a>
                </li>
                <li className="hover:text-purple-500 transform hover:translate-x-3 transition-all duration-200">
                  <a href="#">My Account</a>
                </li>
                <li className="hover:text-purple-500 transform hover:translate-x-3 transition-all duration-200">
                  <a href="#">Watch List</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-semibold mb-4">Latest News</h4>
              <ul className="space-y-2 text">
                <li>
                  <a href="#" className="hover:text-purple-500">
                    Blog Post 1
                  </a>{" "}
                  <span className="block text-gray-400 text-xs uppercase">
                    January 13, 2018
                  </span>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-500">
                    Blog Post 2
                  </a>{" "}
                  <span className="block text-gray-400 text-xs uppercase">
                    January 13, 2018
                  </span>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-500">
                    Blog Post 3
                  </a>{" "}
                  <span className="block text-gray-400 text-xs uppercase">
                    January 13, 2018
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-semibold mb-4">Follow Us</h4>
              <p className="text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Itaque, ducimus, atque.
              </p>
              <div className="flex space-x-3 mt-4">
                <a className="relative w-10 h-10 rounded-full border-1 border-gray-500 text-gray-300 flex items-center justify-center overflow-hidden group transition-all duration-300 hover:border-0">
                  {/* Background fill */}
                  <span className="absolute inset-0 bg-purple-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"></span>

                  {/* Icon */}
                  <span className="relative w-5 h-5 overflow-hidden">
                    <AtSymbolIcon className="absolute inset-0 h-5 w-5 text-gray-500 transform transition-transform duration-300 group-hover:-translate-x-full" />
                    <AtSymbolIcon className="absolute inset-0 h-5 w-5 text-white transform translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-500" />
      <div className="bg-gray-700 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
          <ul className="flex flex-wrap gap-4 mb-2 md:mb-0">
            <li>
              <a href="#" className="hover:text-purple-500">
                Privacy &amp; Cookies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Legal Disclaimer
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500">
                Community
              </a>
            </li>
          </ul>
          <div>
            All Rights Reserved by{" "}
            <a href="#" className="hover:text-purple-500">
              Movify
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
