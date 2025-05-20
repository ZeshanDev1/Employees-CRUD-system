import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://3.95.178.211:5000"; // Replace with process.env.REACT_APP_YOUR_HOSTNAME if using .env

const Record = (props) => {
  return (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.position}</td>
      <td>{props.record.level}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
          Edit
        </Link>{" "}
        |
        <button
          className="btn btn-link"
          onClick={() => props.deleteRecord(props.record._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`${API_BASE_URL}/record/`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const records = await response.json();
        setRecords(records);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getRecords();
  }, []);

  async function deleteRecord(id) {
    const result = window.confirm("Will this employee be removed from the list?");
    if (!result) return;

    try {
      const response = await fetch(`${API_BASE_URL}/record/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }

      const deleted = await response.json();
      console.log("Deleted:", deleted);

      const newRecords = records.filter((record) => record._id !== id);
      setRecords(newRecords);
    } catch (error) {
      console.error("Error deleting record:", error);
      window.alert("Failed to delete the record.");
    }
  }

  function recordList() {
    return records.map((record) => (
      <Record
        key={record._id}
        record={record}
        deleteRecord={deleteRecord}
      />
    ));
  }

  return (
    <div>
      <h3 className="ps-2">Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
