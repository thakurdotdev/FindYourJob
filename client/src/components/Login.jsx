import { Link } from "react-router-dom";
import Logo from "../assets/FYJLogo.png";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[83vh]">
      <Card color="transparent" shadow={true} className="p-8 items-center">
        <Typography variant="h4" color="blue-gray">
          Login To
        </Typography>
        <img src={Logo} alt="Logo" className="w-44" />
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>
          <Button className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <Link
              to={"/register"}
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Register
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
