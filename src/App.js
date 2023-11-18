import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Component/HomePage'; 
import CourseList from './Component/Courses';
import CourseDetailsScreen from './Component/CourseDetails';
import Register from './Component/Register';
import Login from './Component/Login';
import StudentDashboard from './Component/StudentDashboard';
import { Link } from 'react-router-dom';
function App() {

  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;


  return (
    <div className='flex'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetailsScreen />} />
          <Route
        path="/student-dashboard" element={<StudentDashboard />}
      />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
