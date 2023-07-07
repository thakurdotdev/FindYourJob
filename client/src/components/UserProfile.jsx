import React, { useContext } from "react";
import { UserContext } from "../Context/userContext";
import { Loader } from "./Loader";

const UserProfile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[83vh] bg-gray-100">
      <div className="flex relative flex-col items-center justify-center bg-blue-gray-50 min-h-[30vh] mb-10 text-black drop-shadow-xl p-5">
        <img
          src={"https://www.pankajktech.me/assets/about-3c428769.webp"}
          loading="lazy"
          alt={user?.name}
          className="absolute -top-10 w-32 h-32 rounded-full border-4 border-white"
        />
        <h2 className="text-xl md:text-3xl text-center font-bold font-heading tracking-px-n leading-none mt-5 mb-2">
          {user?.name}
        </h2>
        <p className="text-center text-lg md:text-xl font-semibold mb-6">
          {user?.email}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
