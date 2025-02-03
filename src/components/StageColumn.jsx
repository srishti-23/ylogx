import React from 'react';

const StageColumn = ({ stage, candidateCount }) => {
  return (
    <div className="bg-gray-100 p-4 border border-gray-300 rounded-md shadow-sm">
      <h4 className="text-lg font-semibold text-gray-800">{stage}</h4>
      <div className="mt-2 text-sm font-medium text-gray-600">
        {candidateCount} candidates
      </div>
    </div>
  );
};

export default StageColumn;
