import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  IoPerson, IoSearch } from 'react-icons/io5';
import { MdDescription } from 'react-icons/md';
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../Redux/actions/courseActions';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box boxShadow={3} className="course-card" borderRadius={5} bgcolor="white" display="flex" flexDirection="column">
        <div style={{ width: '400px', height: '280px', overflow: 'hidden', backgroundSize: 'cover' }}>
          {course.imgUrl && (
            <img src={course.imgUrl} alt={course.name} className='card-img' style={{ width: '100%', height: '280px', borderRadius: '20px 20px 0px 0px' }} />
          )}
        </div>

        <div style={{ padding: '18px', marginLeft: '15px' }}>
          <Typography variant="h6" component="div">
            {course.name}
          </Typography>
          <Typography color="text.secondary" className="details" style={{ alignItems: 'start' }}>
            <MdDescription style={{ marginRight: '8px' }} /> {course.description}
          </Typography>
          <div className="course-details">
            <Typography color="text.secondary" className="details">
              <IoPerson style={{ marginRight: '8px' }} />
              {course.instructor}{' '}
            </Typography>
            <Typography color="text.secondary" className="details">
              <SlCalender style={{ marginRight: '8px' }} /> {course.duration}{' '}
            </Typography>
            <Typography color="text.secondary" className="details">
              <FaLocationDot style={{ marginRight: '8px' }} /> {course.location}{' '}
            </Typography>
          </div>
        </div>
      </Box>
    </Link>
  );
};

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Dispatch the action to fetch courses
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredCourses = courses.filter((course) => {
    const statusMatch = filter === 'All' || course.enrollmentStatus === filter;
    const searchMatch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  return (
    <div style={{ display: 'flex' ,flexDirection: 'column', alignItems: 'center', margin: '20px 0px' }}>
      <div style={{ display: 'flex' , flexWrap:'wrap' }}>
        <span className='searchbar'>
          <IoSearch style={{ marginRight: '10px' }} />
          <input
            type="text"
            placeholder="Search by Course or Instructor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '450px', outline: '0' }}
          />
        </span>
        <button className='filter-btn' onClick={() => handleFilterChange('All')}>All</button>
        <button className='filter-btn' onClick={() => handleFilterChange('Open')}>Open</button>
        <button className='filter-btn' onClick={() => handleFilterChange('In Progress')}>In Progress</button>
        <button className='filter-btn' onClick={() => handleFilterChange('Closed')}>Closed</button>
      </div>

      <Box className="course-list">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} className="p-5 m-2" />
        ))}
      </Box>
    </div>
  );
};

export default CourseList;
