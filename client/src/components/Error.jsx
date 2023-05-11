import { Button } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div class="min-h-screen flex flex-col justify-center items-center">
      <h1 class="mt-4 text-5xl font-extrabold leading-tight text-center ">
        You&#x27;re alone here
      </h1>
      <p class="font-extrabold text-8xl my-6 animate-bounce">404</p>

      <Link to={"/"}>
        <Button
          color="blue"
          variant="filled"
          ripple="light"
          fullWidth={true}
          className=" flex items-center gap-2"
        >
          Go To Home
        </Button>
      </Link>
    </div>
  );
};

export default Error;
