import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/FYJLogo.png";

import { UserContext } from "../Context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchUser } = useContext(UserContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("https://findyourjob.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 400) {
        toast.error(data.message);
      } else if (response.status === 200) {
        fetchUser();
        toast.success("Logged in successfully");
        navigate("/jobs");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[83vh] bg-gray-100"
    >
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Card color="white" shadow={true} className="p-8 items-center">
        <Typography variant="h4" color="blue-gray">
          Login To
        </Typography>
        <img src={Logo} alt="Logo" className="w-44" />
        <form
          onSubmit={loginHandler}
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

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
