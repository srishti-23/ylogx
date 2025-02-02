import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatusModal = ({ stage, setShowStatusModal }) => {
    const [statuses, setStatuses] = useState(stage?.statuses || []);
    const [newStatus, setNewStatus] = useState('');
  
    const handleAddStatus = async () => {
      try {
        const res = await axios.post(`http://localhost:5000/api/status`, { stageId: stage.id, status: newStatus });
        setStatuses([...statuses, res.data]);
        setNewStatus('');
      } catch (error) {
        console.error("Error adding status:", error);
      }
    };
  
    const handleDeleteStatus = async (status) => {
      try {
        await axios.delete(`http://localhost:5000/api/status/${statusId}`)
        setStatuses(statuses.filter(s => s !== status));
      } catch (error) {
        console.error("Error deleting status:", error);
      }
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-bold mb-4">Manage Statuses for {stage.name}</h3>
          <ul className="space-y-2 mb-4">
            {statuses.map((status, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg">
                {status}
                <button
                  onClick={() => handleDeleteStatus(status)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="New Status"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddStatus}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowStatusModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

export default StatusModal;
