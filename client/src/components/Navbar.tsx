import React from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext" 

const NavBar = (): React.ReactElement => {
    return(
        <header className='nav'>
			<Link to='/'>
				<h1>Reels</h1> {/* replace with svg? */}
			</Link>
			{	currentUser 
				? 	<div className='nav-right'>
						<Link to='/add'><FaPlus size={30}/></Link> 
						
						<div className='nav-user'>
							<Link to={`/u/${currentUser.uid}`}>
								<FaCircleUser size={30}/>
							</Link>
							<a onClick={doLogOut}>Logout</a>
						</div>
					</div>
				: 	<Link to={'/signin'}>
						<FaCircleUser size={30}/>
					</Link>
			}
		</header>
    );
}

export default NavBar;