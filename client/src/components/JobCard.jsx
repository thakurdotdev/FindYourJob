import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/userContext";

import {
  ArrowLongRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Button, Card } from "@material-tailwind/react";
import { formatDate } from "../Constants/Date";

const JobCard = ({
  job: {
    company,
    position,
    workLocation,
    locationType,
    id,
    author,
    authorId,
    updatedAt,
  },
}) => {
  const [reload, setReload] = useState(false);
  const { user } = useContext(UserContext);

  const DateDiff = formatDate(updatedAt);

  const handleDelete = async () => {
    try {
      await fetch(`https://job-portal-app-kzk0.onrender.com/deleteJob/${id}`, {
        method: "DELETE",
      });
      setReload(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (reload) {
    window.location.reload();
  }

  return (
    <div className="w-full md:w-1/2 px-4 mb-8">
      <Card
        shadow={false}
        className="rounded-lg ring-1 ring-gray-400 overflow-hidden"
      >
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold font-heading">{position}</p>
            <p className="text-gray-800 text-sm">
              {workLocation} - {locationType}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <h3 className="font-bold font-heading text-gray-900 text-lg">
              {company}
            </h3>
          </div>

          <hr className="mt-5 mb-2 border-t-2 border-gray-200" />

          <div className="flex items-center justify-between">
            {user.id === authorId ? (
              <div className="text-gray-600">
                Posted By <span className="font-bold">{author}</span>
              </div>
            ) : (
              <div className="text-gray-600">
                Posted <span className="font-bold">{DateDiff}</span>
              </div>
            )}
            {user.id === authorId ? (
              <div className="flex items-center gap-2">
                <Link to={`/edit/${id}`}>
                  <Button
                    variant="text"
                    className="text-gray-600 hover:text-gray-800 transition duration-200"
                  >
                    <PencilSquareIcon strokeWidth={2} className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="text" onClick={handleDelete}>
                  <TrashIcon strokeWidth={2} className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            ) : (
              <Link to={`/job/${id}`}>
                <Button variant="text" className="flex items-center gap-2">
                  View Details
                  <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobCard;
