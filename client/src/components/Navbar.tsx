import React from "react";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { Typewriter } from "react-simple-typewriter";
import logo_cropped from "../assets/logo_cropped.png";
import { AuthContext } from "../contexts/AuthContext";
import NavDropdown from "./NavDropdown";

const NavBar = (): React.ReactElement => {
  const currentUser = React.useContext(AuthContext);
  const wordsList: string[] = [
    " go on a date",
    " take a hike",
    " eat at a restaurant",
    " hit a bar",
    " sing karaoke",
    " play games with friends",
    " try a new coffee shop",
    " get some boba",
    " explore the city",
  ];

  const blam = async (): Promise<void> => {
    try {
      const token = await currentUser?.getIdToken();
      console.log(token);
      console.log("uid", currentUser?.uid);
    } catch (e) {
      console.log("err");
      console.log(e);
    }
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            {/* <img className="h-14 w-auto" src={logo_transparent} alt=""></img> */}
            <img
              className="h-14 w-auto rounded-full"
              src={logo_cropped}
              alt=""
            ></img>
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button onClick={blam}>Test Token</button>
          <Link to="/signin">
            <FaCircleUser size={35} />
          </Link>
          {/* <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Log in</a> */}
        </div>
        <div>
          <h1 className="text-3xl">
            Today, I want to
            <span className="font-bold text-blue-500 text-3xl">
              <Typewriter
                words={wordsList}
                loop={Infinity}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={70}
                delaySpeed={1000}
              />
            </span>
          </h1>
        </div>
        <NavDropdown />
      </nav>
    </header>
  );
};

export default NavBar;
