import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StageModal = ({ stage, setShowStageModal, setStages }) => {
  const [stageName, setStageName] = useState(stage ? stage.name : '');

  useEffect(() => {
    if (stage) {
      setStageName(stage.name);
    }
  }, [stage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stageData = { name: stageName };
    
    try {
      if (stage) {
        // Update stage
        const res = await axios.put(`http://localhost:5000/api/stages/${stage.id}`, stageData);
        setStages((prevStages) => prevStages.map(s => (s.id === stage.id ? res.data : s)));
      } else {
        // Create stage
        const res = await axios.post(`http://localhost:5000/api/stages/create`, stageData);
        setStages((prevStages) => [...prevStages, res.data]);
      }
      setShowStageModal(false);
    } catch (error) {
      console.error("Error saving stage:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">{stage ? 'Edit Stage' : 'Create New Stage'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700">Stage Name:</label>
          <input
            type="text"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {stage ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => setShowStageModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StageModal