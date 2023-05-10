import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../assets/FYJLogo.png";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

import { UserContext } from "../Context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
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
        setTimeout(() => {
          setRedirect(true);
        }, 100);
      } else {
        showMessage(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[83vh] bg-gray-100">
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
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              {message ? (
                <p className="text-red-500 text-center mt-2">
                  Invalid Credentials
                </p>
              ) : null}
            </div>
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
    </div>
  );
};

export default Login;
