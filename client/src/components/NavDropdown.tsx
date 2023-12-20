import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { AuthContext } from "../contexts/AuthContext";

export default function NavDropdown(): React.ReactElement {
  const currentUser = React.useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const blam = async (): Promise<void> => {
  //   try {
  //     const token = await currentUser?.getIdToken();
  //     console.log(token);
  //     console.log("uid", currentUser?.uid);
  //   } catch (e) {
  //     console.log("err");
  //     console.log(e);
  //   }
  // };

  const signOut = async (): Promise<void> => {
    try {
      await logout();
      // refresh page?
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  }

  return (
    <div className="hidden justify-between p-4 lg:flex lg:flex-1 lg:justify-end">
      {/* <button onClick={blam}>Test Token</button> */}

      <p className="pr-4 pt-4 text-lg leading-6 text-gray-900">
        Hello,{" "}
        <span className="font-bold">
          {currentUser ? (currentUser.displayName || currentUser.email) : "Guest"}
        </span>
      </p>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FaCircleUser size={40} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {currentUser ? (
          <div>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={signOut}>Sign out</MenuItem>
          </div>
        ) : (
          <div>
            <Link to="/about">
              <MenuItem onClick={handleClose}>
                About plannr
                <InfoIcon className="ml-2" />
              </MenuItem>
            </Link>
            <Link to="/signin">
              <MenuItem onClick={handleClose}>
                Sign in
                <LoginIcon className="ml-2" />
              </MenuItem>
            </Link>
          </div>
        )}
      </Menu>
    </div>
  );
}
