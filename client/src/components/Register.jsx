import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../assets/FYJLogo.png";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [redirect, setRedirect] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch(
        "https://job-portal-app-kzk0.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const jsonData = await response.json();
      setRedirect(true);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[83vh] bg-gray-100">
      <Card color="white" shadow={true} className="items-center p-8">
        <Typography variant="h4" color="blue-gray">
          Register To
        </Typography>
        <img src={Logo} alt="Logo" className="w-44" />
        <form
          onSubmit={register}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            <Input
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
              type="password"
              label="Password"
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?
            <Link
              to={"/login"}
              className="font-medium ml-2 text-blue-500 transition-colors hover:text-blue-700"
            >
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Register;
