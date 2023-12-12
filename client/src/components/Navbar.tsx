import React from "react";
import { Link } from "react-router-dom";
import logo_cropped from "../assets/logo_cropped.png";
import { AuthContext } from "../contexts/AuthContext";
import NavDropdown from "./NavDropdown";

const NavBar = (): React.ReactElement => {
    const currentUser = React.useContext(AuthContext);

    return(
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        {/* <img className="h-14 w-auto" src={logo_transparent} alt=""></img> */}
                        <img className="h-14 w-auto rounded-full" src={logo_cropped} alt=""></img>
                    </Link>
                </div>
                {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end justify-between p-4">
                    <p className="text-lg leading-6 text-gray-900 pr-4 pt-2">Hello, <span className="font-bold">{currentUser ? currentUser.email : "Guest"}</span></p>
                    <Link to="/signin">
                        <FaCircleUser size={40} />
                    </Link>
                    {/* <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Log in</a> }
                </div> */}
                <NavDropdown />
            </nav>
        </header>
    );
}

export default NavBar;