import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StageModal from '../components/StageModal';
import StatusModal from '../components/StatusModal';

const Stage = () => {
  const [stages, setStages] = useState([]);
  const [showStageModal, setShowStageModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stages"); // ✅ Now this API exists
        setStages(res.data);
      } catch (error) {
        console.error("Error fetching stages:", error);
      }
    };
    fetchStages();
  }, []);
  

  const handleDeleteStage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stages/${id}`);
      setStages(stages.filter(stage => stage.id !== id));
    } catch (error) {
      console.error("Error deleting stage:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Stage Management</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => setShowStageModal(true)}
        >
          Add New Stage
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Stage Name</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((stage) => (
              <tr key={stage.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4 text-black">{stage.name}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    onClick={() => { setSelectedStage(stage); setShowStageModal(true); }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    onClick={() => handleDeleteStage(stage.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    onClick={() => { setSelectedStage(stage); setShowStatusModal(true); }}
                  >
                    Manage Statuses
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showStageModal && (
        <StageModal
          stage={selectedStage}
          setShowStageModal={setShowStageModal}
          setStages={setStages}
        />
      )}
      {showStatusModal && (
        <StatusModal
          stage={selectedStage}
          setShowStatusModal={setShowStatusModal}
        />
      )}
    </div>
  );
};

export default Stage;
