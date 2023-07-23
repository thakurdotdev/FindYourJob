import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/FYJLogo.png";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

import { UserContext } from "../Context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, showemailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, showMessage] = useState(false);

  const { setUser } = useContext(UserContext);

  const login = async (email, password) => {
    const body = { email, password };
    const response = await fetch(
      "https://cute-erin-cobra-kit.cyclic.app/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );
    return response;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      switch (response.status) {
        case 200:
          const data = await response.json();
          setUser(data);
          showMessage(true);
          setTimeout(() => {
            window.location.href = "/jobs";
          }, 1000);
          break;
        case 401:
          showemailError(true);
          setTimeout(() => {
            showemailError(false);
          }, 2000);
          break;
        case 402:
          setPasswordError(true);
          setTimeout(() => {
            setPasswordError(false);
          }, 2000);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[83vh] bg-gray-100"
    >
      {message &&
        (toast("Login Successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        }),
        (<ToastContainer />))}
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
              <Typography color="red" className="font-thin text-sm">
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
