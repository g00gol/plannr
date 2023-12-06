import React from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext" 
import logo from "../assets/logo_transparent.png"
import { FaCircle, FaCircleUser} from 'react-icons/fa6';

const NavBar = (): React.ReactElement => {
    const currentUser = React.useContext(AuthContext);

    return(
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <img className="h-14 w-auto" src={logo} alt=""></img>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link to="/">
                        <FaCircleUser size={35} />
                    </Link>
                    {/* <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Log in</a> */}
                </div>
            </nav>
        </header>
    );
}

export default NavBar;