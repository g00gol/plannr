import React from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext" 
import logo from "../assets/logo_transparent.png"

const NavBar = (): React.ReactElement => {
    // const { currentUser } = React.useContext(AuthContext);

    return(
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <img className="h-8 w-auto" src={logo} alt=""></img>
                    </a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;