import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

import Logo from "../assets/FYJLogo.png";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  BriefcaseIcon,
  PencilSquareIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const Navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  //Function to fetch user data
  const fetchUser = async () => {
    const response = await fetch(
      "https://cute-erin-cobra-kit.cyclic.app/profile",
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    setUser(data);
  };

  //Function to logout user
  const Logout = async () => {
    try {
      const response = await fetch(
        "https://cute-erin-cobra-kit.cyclic.app/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const id = user?.id;

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-2">
      <div className="flex items-center justify-around text-blue-gray-900">
        <Link to={"/"}>
          <img src={Logo} alt="" className="w-44" />
        </Link>
        <div className="flex items-center gap-4">
          {id && (
            <>
              <Link to={"/addjob"}>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="hidden lg:flex items-center gap-2"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                  Post a Job
                </Button>
              </Link>
              <Link to={"/jobs"}>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="hidden lg:flex items-center gap-2"
                >
                  <BriefcaseIcon className="h-5 w-5" />
                  Jobs
                </Button>
              </Link>

              <Menu placement="bottom-end" className="">
                <MenuHandler className="">
                  <Button variant="text" size="sm" className="p-2">
                    <Avatar
                      src={"https://pankajktech.me/assets/about-3c428769.webp"}
                      withBorder={true}
                      size="sm"
                      alt="logo"
                      className="p-0.5"
                    />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    onClick={() => Navigate(`/user/profile`)}
                    className="flex items-center gap-2"
                  >
                    <UserCircleIcon className="w-5" />
                    Profile
                  </MenuItem>

                  <MenuItem>
                    <Link to={"/addjob"} className="flex gap-2">
                      <PencilSquareIcon className="h-5 w-5" />
                      Post a Job
                    </Link>
                  </MenuItem>

                  <MenuItem
                    onClick={Logout}
                    className="flex items-center gap-2"
                  >
                    <PowerIcon className="h-5 w-5" />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}

          {!id && (
            <>
              <Link to={"/jobs"}>
                <Button
                  variant="text"
                  className="hidden lg:flex items-center gap-2"
                >
                  <BriefcaseIcon className="h-5 w-5" />
                  Jobs
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button variant="text" className="hidden lg:inline-block">
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button
                  variant="gradient"
                  color="blue"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  Register
                </Button>
              </Link>
            </>
          )}

          {!id && (
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          )}
        </div>
      </div>

      <Collapse open={openNav} className="">
        <hr />

        <>
          <Link to={"/register"}>
            <Button variant="gradient" size="sm" fullWidth className="my-5">
              <span>Register</span>
            </Button>
          </Link>
          <Link to={"/login"}>
            <Button variant="gradient" size="sm" fullWidth className="my-5">
              <span>Login</span>
            </Button>
          </Link>
        </>
      </Collapse>
    </Navbar>
  );
};

export default Header;
