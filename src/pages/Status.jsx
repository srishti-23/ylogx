import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StageColumn from '../components/StageColumn';

const Status = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch roles from the API when the page loads
  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/status'); // Replace with your actual API
      setRoles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roles data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  if (loading) return <div className="text-center text-gray-500 mt-4">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Status Overview</h1>

      <div className="flex gap-6 overflow-x-auto">
        {roles.map((roleData, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4 min-w-[300px]">
            <h3 className="text-xl font-semibold text-gray-700">{roleData.role}</h3>

            <div className="mt-4 flex flex-col gap-4">
              {['Requirement Creation', 'Sourcing', 'Interview'].map((stage, idx) => {
                const candidatesInStage = roleData.candidates.filter(
                  (candidate) => candidate.stage === stage
                ).length;
                return <StageColumn key={idx} stage={stage} candidateCount={candidatesInStage} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
