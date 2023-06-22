import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/userContext";

import {
  ArrowLongRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { Button, Card } from "@material-tailwind/react";
import { formatDate } from "../Constants/Date";

const JobCard = ({
  job: { company, position, workLocation, locationType, id, author, updatedAt },
}) => {
  const { user } = useContext(UserContext);
  const DateDiff = formatDate(updatedAt);

  return (
    <div className="w-full md:w-1/2 px-4 mb-8">
      <Card
        shadow={false}
        className="rounded-lg bg-white border-b-2 border-b-blue-500 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <p className="md:text-2xl  text-black font-bold">{position}</p>
            <p className="text-gray-900 text-sm">
              {workLocation} - {locationType}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <h3 className="font-sans text-gray-900 text-sm md:text-lg">
              {company}
            </h3>
          </div>

          <hr className="mt-5 mb-2 border-t-2 border-gray-200" />

          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <span className="font-serif text-sm">{DateDiff}</span>
            </div>

            {user.id === author ? (
              <div className="flex items-center gap-2">
                <Link to={`/edit/${id}`}>
                  <Button
                    variant="text"
                    className="text-light-blue-600 hover:text-light-blue-800 transition duration-200"
                  >
                    <PencilSquareIcon strokeWidth={2} className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to={`/job/${id}`}>
                <Button
                  variant="text"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  view details
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
