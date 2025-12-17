import React, { useState, useEffect } from "react";
import "../App.css";
import { useTodoContext } from "../hooks/useTodoContext";

const Updatetodo = ({ selectedToDo, clearSelectedToDo }) => {

  const { dispatch } = useTodoContext();

  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("to-do");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (selectedToDo && Array.isArray(selectedToDo.desc)) {
      setDesc(selectedToDo.desc.join("\n"));
      setStatus(selectedToDo.status);
      setError(null);
      setSuccess(null);
    }
  }, [selectedToDo]);

  if (!selectedToDo) {
    return (
      <h1 style={{ textAlign: "center", margin: "20px" }}>
        Select a to-do to edit or Search.
      </h1>
    );
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

   const descArray = desc
  .split("\n")
  .map(line => line.trim())
  .filter(Boolean);

  const payload = { 
    data: { 
      desc: descArray, 
      status 
    }};

    try {
      const response = await fetch(
        `/to-dos/${encodeURIComponent(selectedToDo.title)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.message || "Something went wrong");
        return;
      }

      if(json.deleted){
        dispatch({ type: "DELETE_TODO", payload: selectedToDo });
        clearSelectedToDo();
      } else{
        dispatch({ type: "UPDATE_TODO", payload: json.data });
        setSuccess("To-Do updated successfully!");
      }
      setError(null);
      clearSelectedToDo();

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="heading">
        <h2>Update To-Do</h2>
      </div>

      {/* READ-ONLY TITLE */}
      <div className="field">
        <label><strong>Title:</strong></label>
        <input
          type="text"
          value={selectedToDo.title}
          disabled
        />
      </div>


      <div className="field">
        <label><strong>Description:</strong></label>
        <textarea
          rows="5"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter tasks, one per line"
        />

        <label><strong>Status:</strong></label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>to-do</option>
          <option>in-progress</option>
          <option>completed</option>
        </select>
      </div>

      <button type="submit" className="btn" disabled={!desc.trim()}>Update</button>

      {error && <div className="error">{error}</div>}

      {success && <div className="mesg">{success}</div>}
      
    </form>
  );
};

export default Updatetodo;