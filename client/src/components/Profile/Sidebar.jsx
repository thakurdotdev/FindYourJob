import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  DocumentIcon,
  PhoneArrowDownLeftIcon,
} from "@heroicons/react/24/solid";

import { useContext } from "react";

import { UserContext } from "../../Context/userContext";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Import NavLink from react-router-dom

const Sidebar = () => {
  const { Logout } = useContext(UserContext);
  const Navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Card className="h-[calc(100vh-8rem)] w-full hidden md:block max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Profile
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem onClick={() => Navigate("/jobs")}>
          <ListItemPrefix>
            <PhoneArrowDownLeftIcon className="h-5 w-5" />
          </ListItemPrefix>
          Apply for Jobs
        </ListItem>
        <Link
          to="https://drive.google.com/file/d/1Yd3Z6GO8-vxHOldYckjj42sf8mjP2SgP/view"
          target="_blank"
        >
          <ListItem>
            <ListItemPrefix>
              <DocumentIcon className="h-5 w-5" />
            </ListItemPrefix>
            Resume
          </ListItem>
        </Link>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink
            activeClassName="bg-blue-800" // Apply a darker background color for the active link
          >
            <button>Logout</button>
          </NavLink>
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
