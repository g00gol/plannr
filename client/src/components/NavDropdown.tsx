import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Dialog, Menu, MenuItem } from "@mui/material";
import * as React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { AuthContext } from "../contexts/AuthContext";

export default function NavDropdown(): React.ReactElement {
  const currentUser = React.useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openSignOutModal, setOpenSignOutModal] = React.useState(false);
  const [openSignOutNotification, setOpenSignOutNotification] = React.useState(false);

  const handleOpenSignOutModal = () => setOpenSignOutModal(true);
  const handleCloseSignOutModal = () => { setOpenSignOutModal(false); }

  const handleOpenSignOutNotification = () => setOpenSignOutNotification(true);
  const handleCloseSignOutNotification = () => setOpenSignOutNotification(false);

  // const blam = async (): Promise<void> => {
  //   // const headers = {
  //   //   "Content-Type": "application/json",
  //   //   Authorization: "Bearer " + (await currentUser?.getIdToken()),
  //   // };

  //   // const data = await fetch("http://localhost:8000/user", {
  //   //   method: "POST",
  //   //   headers: headers,
  //   // });
  //   // console.log(await data.json());

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

      handleCloseSignOutModal();
      handleOpenSignOutNotification();
      // refresh page?
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  };

  // Get the current time of day
  const today = new Date();
  const time = today.getHours();

  const greeting = (): string => {
    if (time < 12) {
      return "Good morning,";
    } else if (time < 18) {
      return "Good afternoon,";
    } else {
      return "Good evening,";
    }
  }

  return (
    <div className="hidden justify-between p-4 lg:flex lg:flex-1 lg:justify-end">
      {/* <button onClick={blam}>Test Token</button> */}

      <p className="pr-4 pt-4 text-lg leading-6 text-gray-900">
        { greeting() }{" "}
        <span className="font-bold">
          {currentUser ? currentUser.displayName || currentUser.email : "Guest"}
        </span>
      </p>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
      >
        <FaCircleUser size={40} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {currentUser ? (
          <div>
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <Link to="/about">
              <MenuItem onClick={handleClose}>
                About plannr
                <InfoIcon className="ml-2" />
              </MenuItem>
            </Link>
            <MenuItem onClick={handleOpenSignOutModal}>
              Sign Out
              <LogoutIcon className="ml-2" />
            </MenuItem>
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

      <Dialog open={openSignOutModal} onClose={handleCloseSignOutModal}>
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="text-3xl font-bold"> Sign Out </h1>
          <p className="text-xl">Are you sure you want to sign out?</p>
          <p className="text-l italic">
            Unsaved changes in your trip will be lost.
          </p>
          <div className="flex flex-row gap-2 pt-2">
            <Button
              variant="text"
              color="inherit"
              onClick={handleCloseSignOutModal}
            >
              Cancel
            </Button>
            <Button variant="text" color="error" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </Dialog>
        
      <Dialog open={openSignOutNotification} onClose={handleCloseSignOutNotification}>
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="text-3xl font-bold"> Sign Out </h1>
          <p className="text-xl">You have successfully signed out.</p>
          <div className="flex flex-row gap-2 pt-2">
            <Button
              variant="text"
              color="inherit"
              onClick={handleCloseSignOutNotification}
            >
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
