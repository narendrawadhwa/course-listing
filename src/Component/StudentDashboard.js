// StudentDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [courseIds, setCourseIds] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCourseIds();
  }, []);

  const fetchCourseIds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/courses-applied', {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${token}`,
        },
        withCredentials: true,
      });

      setCourseIds(response.data.courseIds);
    } catch (error) {
      console.error('Error fetching courseIds:', error);
      // Handle authentication errors or redirect to login
      if (error.response && error.response.status === 401) {
        // Add your logic here, like redirecting to the login page
        console.log('User not authenticated');
      }
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>Your Courses:</h2>
      <ul>
        {courseIds.map(courseId => (
          <li key={courseId}>{courseId}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
