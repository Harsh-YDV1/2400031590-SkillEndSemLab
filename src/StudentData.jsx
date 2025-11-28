import React, { useEffect, useState } from "react";
import "./StudentData.css";  // <-- import CSS

function StudentData() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="loading">Loading student data...</h2>;
  if (error) return <h2 className="error">Error: {error}</h2>;

  return (
    <div className="container">
      <h1 className="title">Student Details</h1>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>

        <tbody>
          {students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>{stu.email}</td>
              <td>{stu.address?.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentData;
