import { createContext, useContext, useState, useEffect } from "react";

const StageContext = createContext();

export function useStages() {
  return useContext(StageContext);
}

export function StageProvider({ children }) {
  const [stages, setStages] = useState([]);

  // Backend se Stages fetch karega
  useEffect(() => {
    fetch("http://localhost:5000/api/stages")
      .then((res) => res.json())
      .then((data) => {
        setStages(data);  // Stages update kar raha hai
      })
      .catch((err) => console.error("Error fetching stages:", err));
  }, []);

  // Naya stage add karne ka function
  const addStage = async (newStage) => {
    try {
      const res = await fetch("http://localhost:5000/api/stages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStage),
      });

      const data = await res.json();
      setStages([...stages, data]); // UI update karega
    } catch (error) {
      console.error("Error adding stage:", error);
    }
  };

  return (
    <StageContext.Provider value={{ stages, addStage }}>
      {children}
    </StageContext.Provider>
  );
}
