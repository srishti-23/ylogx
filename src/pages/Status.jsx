import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StageColumn from '../components/StageColumn';

const Status = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch roles from the API when the page loads
  const fetchRoles = async () => {
    try {
      // Replace with your actual backend API endpoint
      const response = await axios.get('http://localhost:5000/api/status'); // Or any other route your API provides
      setRoles(response.data);  // Assume roles data is in the same format we discussed
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roles data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []); // Empty dependency array to fetch data only on mount

  if (loading) return <div>Loading...</div>; // Loading state

  return (
    <div className="status-page">
      <h1>Status Overview</h1>
      <div className="role-board">
        {roles.map((roleData, index) => (
          <div key={index} className="role-column">
            <h3>{roleData.role}</h3>
            <div className="stage-container">
              {['Requirement Creation', 'Sourcing', 'Interview'].map((stage, idx) => {
                const candidatesInStage = roleData.candidates.filter(candidate => candidate.stage === stage).length;
                return (
                  <StageColumn key={idx} stage={stage} candidateCount={candidatesInStage} />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
