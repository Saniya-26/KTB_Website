import React from "react";
import logoimg from '../assets/images/frame.png';

const Footer = () => {
  console.log("Rendering Footer");
  return (
    <>
    <footer>
      <footer className="bg-white dark:bg-gray-800 w-full md:block">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="text-center">
          <a
            href="#"
            className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img src={logoimg} className="h-6 mr-3 sm:h-9" alt="KTB Logo" />
            KTB
          </a>
          <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
            © 2023-2024 KTB™. All Rights Reserved.
          </span>
          
        </div>
      </footer>
      </footer>
    </>
  );
};

export default Footer;
