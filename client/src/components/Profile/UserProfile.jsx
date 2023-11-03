import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { Loader } from "../Loader";
import Sidebar from "./Sidebar";

const UserProfile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col p-10">
        <div className="flex flex-col p-10 items-center justify-center ring-1 shadow-md">
          <div className="flex flex-row items-center justify-center">
            <img
              src={"https://pankajktech.me/assets/about-3c428769.webp"}
              alt="avatar"
              className="rounded-full h-32 w-32"
            />
            <div className="flex flex-col p-5 items-center justify-center">
              <h1 className="text-2xl font-bold">{user.name}</h1>

              <h1 className="text-2xl mt-3 font-thin">{user.email}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-10 mt-10">
          <div class="flex flex-col p-10 ring-1 shadow-md">
            <h2 class="text-xl font-bold mb-4">Education</h2>

            <div class="mb-4">
              <h3 class="text-lg font-semibold">University of Tailwind</h3>
              <p class="text-gray-600">
                Bachelor of Science in Web Development
              </p>
              <p class="text-sm text-gray-500">2018 - 2022</p>
            </div>

            <div class="mb-4">
              <h3 class="text-lg font-semibold">Tailwind Community College</h3>
              <p class="text-gray-600">Associate Degree in Design</p>
              <p class="text-sm text-gray-500">2015 - 2017</p>
            </div>
          </div>
          <div class="flex flex-col p-10  ring-1 shadow-md">
            <h2 class="text-xl font-bold mb-4">Skills</h2>

            <div class="mb-4">
              <h3 class="text-lg font-semibold">Web Development</h3>
              <p class="text-gray-600">HTML, CSS, JavaScript, React, Node.js</p>
            </div>

            <div class="mb-4">
              <h3 class="text-lg font-semibold">Graphic Design</h3>
              <p class="text-gray-600">
                Adobe Photoshop, Illustrator, UI/UX Design
              </p>
            </div>

            <div class="mb-4">
              <h3 class="text-lg font-semibold">Project Management</h3>
              <p class="text-gray-600">
                Agile Methodologies, Scrum, Team Leadership
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
