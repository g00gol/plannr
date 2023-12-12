import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const NavDropdown = (): React.ReactElement => {
  const currentUser = React.useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end justify-between p-4">
      <p className="text-lg leading-6 text-gray-900 pr-4 pt-4">Hello, <span className="font-bold">{currentUser ? currentUser.email : "Guest"}</span></p>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
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
          'aria-labelledby': 'basic-button',
        }}
      >
        {currentUser ? (
          <>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose}>
              About plannr
              <InfoIcon className="ml-2" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/signin">Sign in</Link>
              <LoginIcon className="ml-2" />
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  )
}

export default NavDropdown;