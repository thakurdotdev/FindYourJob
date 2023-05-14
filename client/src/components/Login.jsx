import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../assets/FYJLogo.png";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { motion } from "framer-motion";

import { UserContext } from "../Context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [emailError, showemailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, showMessage] = useState(false);

  const { setUser } = useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "https://job-portal-app-kzk0.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        showMessage(true);
        setTimeout(() => {
          setRedirect(true);
        }, 2000);
      } else if (response.status === 402) {
        setPasswordError(true);
        setTimeout(() => {
          setPasswordError(false);
        }, 2000);
      } else if (response.status === 401) {
        showemailError(true);
        setTimeout(() => {
          showemailError(false);
        }, 2000);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  if (redirect) {
    return <Navigate to={"/jobs"} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[83vh] bg-gray-100"
    >
      {message && (
        <Alert
          color="green"
          className="w-80 max-w-screen-lg sm:w-96 text-center font-normal"
        >
          <Typography color="white">
            Login Successful! Please Wait...
          </Typography>
        </Alert>
      )}
      <Card color="white" shadow={true} className="p-8 items-center">
        <Typography variant="h4" color="blue-gray">
          Login To
        </Typography>
        <img src={Logo} alt="Logo" className="w-44" />
        <form
          onSubmit={handleLogin}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && (
              <Typography color="red" className="font-thin">
                Email not found!
              </Typography>
            )}
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && (
              <Typography color="red" className="font-thin">
                Incorrect Password!
              </Typography>
            )}
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <Link
              to={"/register"}
              className="font-medium ml-2 text-blue-500 transition-colors hover:text-blue-700"
            >
              Register
            </Link>
          </Typography>
        </form>
      </Card>
    </motion.div>
  );
};

export default Login;
