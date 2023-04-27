import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      if (jsonData.token) {
        localStorage.setItem("token", jsonData.token);
        setRedirect(true);
      }
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (redirect) {
    return <Link to="/login" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[83vh]">
      <Card color="transparent" shadow={true} className="items-center p-8">
        <Typography variant="h4" color="blue-gray">
          Register
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={register}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
              label="Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              label="Email"
            />
            <Input
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
              type="password"
              size="lg"
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
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
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
