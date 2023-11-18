import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IoTime, IoPerson } from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';
import axios from 'axios';
import { FaLocationDot } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { fetchCourseDetails } from '../Redux/actions/courseDetailsaction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector((state) => state.courseDetails.course);
  const loading = useSelector((state) => state.courseDetails.loading);
  const error = useSelector((state) => state.courseDetails.error);
  const token = localStorage.getItem('token');
  const [syllabusExpanded, setSyllabusExpanded] = React.useState(false);
  const notifySuccess = () => toast.success(`Successfully applied for ${course.name} course!`);

  console.log('Token:', token);

  
  const handleApplyClick = async () => {
    // Check if the user is authenticated
    if (!token) {
      console.log('No token available');
      alert('Please log in to apply for the course.');
      // Or navigate to the login page
      navigate('/login');
      return;
    }



    // Check if enrollment is closed
    if (course.enrollmentStatus.toLowerCase() === 'closed') {
      // Show a warning that enrollment is closed
      alert('Enrollment is closed. You cannot apply for this course.');
      return;
    }
    console.log({ courseId: course.id });

    try {
      await axios.post('http://localhost:5000/api/courses/apply', { courseId: course.id });
      console.log(`Successfully applied for the course with ID ${course.id}`);
      notifySuccess();
    } catch (error) {
      console.error('Error applying for the course:', error.message);
  
      if (error.response && error.response.status === 400) {
        // If the response status is 400, show a toast indicating that the user has already applied
        toast.error('You have already applied for this course.', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        // If the response contains an error and the status is not 400, show a generic error toast
        toast.error(error.response ? error.response.data.error : 'Error applying for the course.', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
    
  };
  
  const handleSyllabusToggle = () => {
    setSyllabusExpanded(!syllabusExpanded);
  };

  useEffect(() => {
    dispatch(fetchCourseDetails(id));
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <Box boxShadow={3} borderRadius={5} bgcolor="white" display="flex" flexDirection="column" p={2}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '500px', backgroundSize: 'cover' }}>
          {course.imgUrl && (
            <img
              src={course.imgUrl}
              alt={course.name}
              style={{ width: '100%', height: '90vh'}}
            />
          )}
        </div>

        <div style={{ padding: '18px', marginLeft: '15px', width: '45%' }}>
          <Typography variant="h4" component="div" style={{margin:'10px 20px'}}>
            {course.name}
          </Typography>
          <Typography color="text.secondary" className='course-details' style={{ alignItems: 'start', margin:'10px 20px' }}>
           Description:<br/> {course.description}
          </Typography>
          <div>
            <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap'}}>
            <Typography color="text.secondary" className='course-details' style={{margin:'10px 20px'}}>
              <IoPerson style={{ marginRight: '8px' }} />
              {course.instructor}
            </Typography>
            <Typography color="text.secondary" className='course-details'  style={{margin:'10px 20px'}}>
              <SlCalender style={{ marginRight: '8px' }} /> {course.duration}
            </Typography>
            <Typography color="text.secondary" className='course-details' style={{margin:'10px 20px'}}>
              <IoTime style={{ marginRight: '8px' }} /> {course.schedule}
            </Typography>
            <Typography color="text.secondary" className='course-details' style={{margin:'10px 20px'}}>
              <FaLocationDot style={{ marginRight: '8px' }} /> {course.location}
            </Typography>
            </div>
            <Typography color="text.secondary" className='course-details' style={{margin:'10px 20px'}}>
              Due Date : {course.duedate}
            </Typography>
            <Typography color="text.secondary" className='course-details' style={{margin:'10px 20px'}}>
              Enrollment Status: {course.enrollmentStatus}
            </Typography>
            <Typography color="text.secondary" className='course-details' style={{margin:'10px 20px'}}>
              Prerequisites: {course.prerequisites.join(', ')}
            </Typography>
            <Typography color="text.secondary" style={{margin:'10px 20px', padding:'8px',border:'1px solid #ccc', borderRadius:'7px' }}>
                <span style={{display:'flex', justifyContent:'space-between', padding:'10px'}}>
                Syllabus
  <button onClick={handleSyllabusToggle}>
    {syllabusExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    {' '}
  </button>
                </span>

  <Collapse in={syllabusExpanded}>
    <div>
      {course.syllabus.map((item, index) => (
        <>
          <hr/>
        <Typography key={index} variant="body2" style={{padding:'20px'}}>
          {item}
        </Typography>
                
        </>
      ))}
    </div>
  </Collapse>
</Typography>
          </div>
        </div>
        <div style={{ width: '25%' }}>
          {course.enrollmentStatus.toLowerCase() === 'closed' && (
            <div style={{ color: 'red', marginBottom: '20px' }}>
              Enrollment is closed because of seats full or applying date is due. You cannot apply for this course.
            </div>
          )}
          <button
      onClick={handleApplyClick}
      disabled={course.enrollmentStatus.toLowerCase() === 'closed'}
      style={{
        background: '#000',
        color: '#fff',
        padding: '10px 20px',
        marginTop: '50px',
        borderRadius: '30px',
        cursor: course.enrollmentStatus.toLowerCase() === 'closed' ? 'not-allowed' : 'pointer',
      }}
    >
            Apply for the Course
          </button>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Box>
  );
};

export default CourseDetails;
