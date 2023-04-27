import { Link } from "react-router-dom";

const JobCard = ({
  job: { company, position, workLocation, locationType, id },
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold font-heading text-white">
              {position}
            </p>
            <p className="text-gray-200 text-sm">
              {workLocation} - {locationType}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <h3 className=" font-bold font-heading text-gray-200">{company}</h3>
          </div>

          <div className="flex items-center justify-between mt-6 gap-3">
            <Link to={`/edit/${id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
