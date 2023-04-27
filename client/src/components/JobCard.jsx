import React from "react";

const JobCard = ({
  job: { company, position, workLocation, locationType },
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold font-heading">{company}</h3>

            <p className="text-sm text-gray-600 mt-1">{position}</p>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-gray-800 text-sm">{workLocation}</p>
            <p className="text-gray-600 text-sm">{locationType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
