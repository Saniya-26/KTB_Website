import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar component
import { Link } from "react-router-dom";
import "../styles/home.css"; // Import CSS file
import Footer from "../components/Footer";
import logoimg from "../assets/images/frame.png";
import bgimg from "../assets/images/bg.png";

const Home = () => {
  // // Function to check if the user is logged in
  // const isLoggedIn = () => {
  //   return localStorage.getItem("token") !== null;
  // };

  return (
    <>
        <div className="grid max-w-screen-xl px-4 pt-0 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-2 lg:grid-cols-12 lg:pt-1">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Kill The
              <br />
              Boredom.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Help to connect with yourself and the world
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={bgimg} alt="group image" className="center" />
          </div>
        </div>
   <Footer />
   </>
  );
};

export default Home;
