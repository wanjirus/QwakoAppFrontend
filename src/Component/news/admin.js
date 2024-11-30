// src/components/AdminPanel.js
import React, { useState } from "react";
import NewsForm from "./newsform";

const AdminPanel = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);

  const toggleForm = () => {
    setIsAdding(!isAdding);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={toggleForm}>
        {isAdding ? "Cancel" : "Add News"}
      </button>
      {isAdding && <NewsForm onAdd={onAdd} />}
    </div>
  );
};

export default AdminPanel;
