import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/userContext";

import {
  ArrowLongRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Button, Card } from "@material-tailwind/react";

const JobCard = ({
  job: { company, position, workLocation, locationType, id, author, authorId },
}) => {
  const [navigate, setNavigate] = useState(false);
  const { user } = useContext(UserContext);

  const handleDelete = async () => {
    try {
      await fetch(`https://job-portal-app-kzk0.onrender.com/deleteJob/${id}`, {
        method: "DELETE",
      });
      setNavigate(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (navigate) {
    return window.location.reload();
  }

  return (
    <div className="w-full md:w-1/2 px-4 mb-8">
      <Card className="rounded-lg overflow-hidden">
        <div className="px-6 my-5">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold font-heading">{position}</p>
            <p className="text-gray-800 text-sm">
              {workLocation} - {locationType}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <h3 className=" font-bold font-heading text-gray-900">{company}</h3>
          </div>

          <hr className="mt-5 mb-2 text-black" />

          <div className="flex items-center justify-around gap-3">
            <div>
              Posted By <span>{author}</span>
            </div>
            {user.id === authorId ? (
              <div>
                <Link to={`/edit/${id}`}>
                  <Button variant="text" className="t">
                    <PencilSquareIcon strokeWidth={2} className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="text" onClick={handleDelete}>
                  <TrashIcon strokeWidth={2} className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobCard;
