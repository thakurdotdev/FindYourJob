import React from "react";

import { Avatar, Typography, Rating } from "@material-tailwind/react";

const Ratings = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-32 mb-10">
      <Typography
        color="blue-gray"
        className="mb-10 text-2xl md:text-4xl p-5 border-b-2 border-b-light-blue-700 font-bold"
      >
        What our users are saying
      </Typography>

      <div className="flex flex-wrap justify-center items-center gap-10">
        {Array(5)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className="px-8 text-center max-w-md bg-white shadow bg-opacity-30 backdrop-blur-md p-5"
            >
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-6 font-semibold"
              >
                &quot;This is an excellent product, the documentation is
                excellent and helped me get things done more efficiently.&quot;
              </Typography>
              <Avatar
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image"
                size="lg"
              />
              <Typography variant="h6" className="mt-4">
                Candic Wu
              </Typography>
              <Typography color="gray" className="mb-4 font-normal">
                Lead Frontend Developer
              </Typography>
              <Rating value={5} readonly />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Ratings;
