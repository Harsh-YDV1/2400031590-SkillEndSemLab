import React, { useEffect, useState } from "react";

function StudentData() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function loadStudents() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://jsonplaceholder.typicode.com/users", { signal });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        if (err.name === "AbortError") {
          // request was cancelled — ignore
          return;
        }
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadStudents();

    // cleanup on unmount
    return () => controller.abort();
  }, []); // run once on mount

  if (loading) return <h2 aria-live="polite">Loading student data...</h2>;
  if (error) return <h2 role="alert">Error: {error}</h2>;

  return (
    <div>
      <h1>Student Details</h1>
      <table border="1" cellPadding="10" aria-describedby="students-caption" style={{ width: "100%", borderCollapse: "collapse" }}>
        <caption id="students-caption" style={{ textAlign: "left", marginBottom: 8 }}>List of students fetched from API</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
          </tr>
        </thead>

        <tbody>
          {students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>
                <a href={`mailto:${stu.email}`}>{stu.email}</a>
              </td>
              <td>{stu.address?.city ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentData;
